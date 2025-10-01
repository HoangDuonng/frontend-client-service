'use client'

import { useState, useRef, useEffect, useCallback } from 'react';

interface SessionInfo {
    sessionId: string | null;
    lastActivity: Date;
    messageCount: number;
}

interface UseChatSessionOptions {
    inactivityTimeout?: number; // milliseconds
    maxSessionTime?: number; // milliseconds
    checkInterval?: number; // milliseconds
}

export const useChatSession = (options: UseChatSessionOptions = {}) => {
    const {
        inactivityTimeout = 30 * 60 * 1000, // 30 minutes
        maxSessionTime = 2 * 60 * 60 * 1000, // 2 hours
        checkInterval = 5 * 60 * 1000 // 5 minutes
    } = options;

    const [sessionInfo, setSessionInfo] = useState<SessionInfo>({
        sessionId: null,
        lastActivity: new Date(),
        messageCount: 0
    });

    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startNewSession = useCallback(async () => {
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
                setSessionInfo(prev => ({
                    ...prev,
                    sessionId: data.sessionId,
                    lastActivity: new Date(),
                    messageCount: 0
                }));
                return data.sessionId;
            }
        } catch (error) {
            console.error('Error starting session:', error);
        }
        return null;
    }, []);

    const endSession = useCallback(async () => {
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

        setSessionInfo({
            sessionId: null,
            lastActivity: new Date(),
            messageCount: 0
        });

        // Clear timeouts
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current);
        }
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }
    }, [sessionInfo.sessionId]);

    const updateActivity = useCallback(() => {
        setSessionInfo(prev => ({
            ...prev,
            lastActivity: new Date(),
            messageCount: prev.messageCount + 1
        }));
    }, []);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
        }

        inactivityTimeoutRef.current = setTimeout(() => {
            console.log('Session ended due to inactivity');
            endSession();
        }, inactivityTimeout);
    }, [inactivityTimeout, endSession]);

    const checkSessionTimeout = useCallback(() => {
        const now = new Date();
        const timeSinceLastActivity = now.getTime() - sessionInfo.lastActivity.getTime();

        if (timeSinceLastActivity > maxSessionTime) {
            console.log('Session ended due to timeout');
            endSession();
        }
    }, [sessionInfo.lastActivity, maxSessionTime, endSession]);

    // Check session timeout periodically
    useEffect(() => {
        const timeoutCheckInterval = setInterval(checkSessionTimeout, checkInterval);

        return () => {
            clearInterval(timeoutCheckInterval);
        };
    }, [checkSessionTimeout, checkInterval]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sessionTimeoutRef.current) {
                clearTimeout(sessionTimeoutRef.current);
            }
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
            if (sessionInfo.sessionId) {
                endSession();
            }
        };
    }, [sessionInfo.sessionId, endSession]);

    return {
        sessionInfo,
        startNewSession,
        endSession,
        updateActivity,
        resetInactivityTimer
    };
}; 
