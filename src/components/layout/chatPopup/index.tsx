"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
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
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "Cảm ơn bạn đã hỏi! Tôi có thể giúp bạn tìm hiểu về các điểm du lịch nổi tiếng, đặt khách sạn, hoặc tư vấn về lịch trình du lịch.",
                "Đây là một câu hỏi rất hay! Dựa trên kinh nghiệm của tôi, tôi khuyên bạn nên tham khảo các đánh giá từ khách hàng trước khi đưa ra quyết định.",
                "Tôi hiểu câu hỏi của bạn. Hãy để tôi tìm kiếm thông tin chi tiết nhất cho bạn về vấn đề này.",
                "Cảm ơn bạn đã quan tâm! Tôi có thể cung cấp thông tin về các khuyến mãi hiện tại, điểm du lịch hot, hoặc tư vấn về thời gian du lịch phù hợp.",
                "Đây là một lựa chọn tuyệt vời! Tôi có thể giúp bạn lên kế hoạch chi tiết cho chuyến đi của mình."
            ];

            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
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
                                <span className="font-semibold">AI Du lịch</span>
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
