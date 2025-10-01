"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface SessionInfo {
    sessionId: string | null;
    lastActivity: Date;
    messageCount: number;
    wasRefreshed: boolean;
}

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Xin chào! Tôi là trợ lý AI du lịch. Tôi có thể giúp bạn tìm hiểu về các điểm du lịch, đặt khách sạn, hoặc trả lời các câu hỏi về du lịch. Bạn cần tôi giúp gì?",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [showRefreshMessage, setShowRefreshMessage] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
        sessionId: null,
        lastActivity: new Date(),
        messageCount: 0,
        wasRefreshed: false
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Session management functions
    const startNewSession = async () => {
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'start_session' })
            });

            if (response.ok) {
                const data = await response.json();
                setSessionInfo(prev => {
                    const wasRefreshed = prev.wasRefreshed;

                    // Show refresh message only if session was actually refreshed due to timeout
                    if (wasRefreshed) {
                        setShowRefreshMessage(true);
                        setTimeout(() => setShowRefreshMessage(false), 5000); // Hide after 5 seconds
                    }

                    return {
                        ...prev,
                        sessionId: data.sessionId,
                        lastActivity: new Date(),
                        messageCount: 0,
                        wasRefreshed: false
                    };
                });
            }
        } catch (error) {
            console.error('Error starting session:', error);
        }
    };

    const endSession = async () => {
        if (sessionInfo.sessionId) {
            try {
                await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'end_session',
                        sessionId: sessionInfo.sessionId
                    })
                });
            } catch (error) {
                console.error('Error ending session:', error);
            }
        }

        // Reset session info
        setSessionInfo({
            sessionId: null,
            lastActivity: new Date(),
            messageCount: 0,
            wasRefreshed: true
        });

        // Clear timeouts
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current);
        }
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }
    };

    const resetInactivityTimer = () => {
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }

        // Set inactivity timeout (5 minutes) - runs even when chat is closed
        inactivityTimeoutRef.current = setTimeout(() => {
            console.log('Session ended due to inactivity (5 minutes)');
            endSession();
        }, 5 * 60 * 1000); // 5 minutes
    };

    const checkSessionTimeout = () => {
        const now = new Date();
        const timeSinceLastActivity = now.getTime() - sessionInfo.lastActivity.getTime();
        const maxSessionTime = 5 * 60 * 1000; // 5 minutes

        if (timeSinceLastActivity > maxSessionTime) {
            console.log('Session ended due to timeout (5 minutes)');
            endSession();
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }

        // Start session when chat opens for the first time
        if (isOpen && !sessionInfo.sessionId) {
            startNewSession();
        }

        // Don't reset inactivity timer when chat opens - let it continue running

        // Check session timeout every 1 minute only when chat is open
        let timeoutCheckInterval: NodeJS.Timeout | null = null;
        if (isOpen) {
            timeoutCheckInterval = setInterval(checkSessionTimeout, 1 * 60 * 1000);
        }

        return () => {
            if (timeoutCheckInterval) {
                clearInterval(timeoutCheckInterval);
            }
        };
    }, [isOpen, sessionInfo.sessionId]);

    // Separate effect for inactivity timer - runs even when chat is closed
    useEffect(() => {
        // Start inactivity timer when session exists
        if (sessionInfo.sessionId) {
            resetInactivityTimer();
        }

        return () => {
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
        };
    }, [sessionInfo.sessionId]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sessionTimeoutRef.current) {
                clearTimeout(sessionTimeoutRef.current);
            }
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
            // End session when component unmounts
            if (sessionInfo.sessionId) {
                endSession();
            }
        };
    }, [sessionInfo.sessionId]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isTyping) return;

        // Update session activity
        setSessionInfo(prev => ({
            ...prev,
            lastActivity: new Date(),
            messageCount: prev.messageCount + 1
        }));

        // Reset inactivity timer when user actually sends a message
        resetInactivityTimer();

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        try {
            // Call the Next.js API endpoint which forwards to Flask
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputText,
                    sessionId: sessionInfo.sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response || data.message || "Xin lỗi, tôi không thể xử lý câu hỏi của bạn ngay lúc này.",
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Xin lỗi, có lỗi xảy ra khi kết nối với chatbot. Vui lòng thử lại sau.",
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-blue-400 text-white shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
                aria-label="Chat with AI"
            >
                <FaComments className="w-5 h-5" />
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Chat Window */}
                    <div className="relative w-full max-w-sm h-[600px] bg-white rounded-lg shadow-2xl flex flex-col mr-20">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-t-lg">
                            <div className="flex items-center space-x-2">
                                <FaRobot className="w-5 h-5" />
                                <span className="font-semibold">AI hỗ trợ thông tin du lịch</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Refresh notification */}
                            {showRefreshMessage && (
                                <div className="flex justify-center">
                                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-lg text-sm">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                            </svg>
                                            <span>Phiên chat đã được làm mới. Thông tin trước đó đã được xóa.</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start space-x-2 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isUser
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-green-400 text-white'
                                            }`}>
                                            {message.isUser ? <FaUser className="w-4 h-4" /> : <FaRobot className="w-4 h-4" />}
                                        </div>
                                        <div className={`rounded-lg px-3 py-2 ${message.isUser
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            <p className="text-sm">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-start space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                            <FaRobot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-gray-100 rounded-lg px-3 py-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputText.trim() || isTyping}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    <FaPaperPlane className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatPopup; 
