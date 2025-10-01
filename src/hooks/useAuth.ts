'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Set cookie function
    const setCookie = (name: string, value: string, days: number = 7) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    };

    // Get cookie function
    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    // Remove cookie function
    const removeCookie = (name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    };

    // Login function
    const login = (userData: { user: User; accessToken: string; refreshToken: string }) => {
        setCookie('accessToken', userData.accessToken, 7);
        setCookie('refreshToken', userData.refreshToken, 30);
        setCookie('user', JSON.stringify(userData.user), 7);

        setAuthState({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    // Logout function
    const logout = () => {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('user');

        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    // Initialize auth state from cookies
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const userStr = getCookie('user');

        if (accessToken && userStr) {
            try {
                const user = JSON.parse(userStr);
                setAuthState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } catch (error) {
                console.error('Error parsing user data from cookie:', error);
                logout();
            }
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    return {
        ...authState,
        login,
        logout,
        setCookie,
        getCookie,
        removeCookie,
    };
} 
