'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { User } from '@/types/user';

interface UserMenuProps {
    user: User;
    onLogout: () => void;
    isTransparent: boolean;
}

export default function UserMenu({ user, onLogout, isTransparent }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getDisplayName = () => {
        if (user.fullName) return user.fullName;
        if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
        if (user.username) return user.username;
        return user.email;
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${isTransparent
                        ? 'text-white border border-white/30'
                        : 'text-foreground border border-gray-200'
                    }`}
            >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={getDisplayName()}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white text-sm font-medium">
                            {getUserInitials(getDisplayName())}
                        </span>
                    )}
                </div>

                <span className="hidden sm:block text-sm font-medium max-w-32 truncate">
                    {getDisplayName()}
                </span>

                <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {getDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>

                    <div className="py-1">
                        <a
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiUser className="w-4 h-4 mr-3" />
                            Hồ sơ
                        </a>
                        <a
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiSettings className="w-4 h-4 mr-3" />
                            Cài đặt
                        </a>
                        <button
                            onClick={() => {
                                onLogout();
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <FiLogOut className="w-4 h-4 mr-3" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 
