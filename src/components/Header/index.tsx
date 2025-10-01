'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { headerService, HeaderData } from '@/services/headerService';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';

type HeaderProps = {
    transparentByDefault?: boolean;
};

export default function Header({
    transparentByDefault = true
}: HeaderProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(transparentByDefault);
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!transparentByDefault) {
            setIsTransparent(false);
            return;
        }
        const handleScroll = () => {
            setIsTransparent(window.scrollY === 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparentByDefault]);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                setIsLoading(true);
                const data = await headerService.getHeaderData('vi');
                setHeaderData(data);
            } catch (error) {
                console.error('Failed to fetch header data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    if (isLoading) {
        return (
            <header className="fixed top-0 left-0 w-full z-50 bg-background shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-24">
                        <div className="h-20 w-80 bg-gray-200 animate-pulse rounded"></div>
                        <div className="hidden md:flex items-center space-x-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center space-x-3">
                            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${isTransparent ? 'bg-transparent shadow-none' : 'bg-background shadow-sm'}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <a href="/" className="flex items-center hover:cursor-pointer">
                        <Image
                            src={headerData?.logo?.url || '/images/logo.svg'}
                            alt={headerData?.logo?.alt || 'Logo'}
                            width={300}
                            height={120}
                            className="h-20 w-auto"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {headerData?.navigation?.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`
                                    px-3 py-1 rounded-full transition
                                    ${pathname === item.href
                                        ? 'bg-primary/10 text-primary font-semibold shadow'
                                        : isTransparent ? 'text-white' : 'text-foreground'}
                                    hover:bg-primary/10 hover:text-primary
                                `}
                            >
                                {item.title}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated && user ? (
                            <UserMenu user={user} onLogout={logout} isTransparent={isTransparent} />
                        ) : (
                            <>
                                <a
                                    href="/auth/signin"
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isTransparent
                                        ? 'text-white hover:bg-white/20 border border-white/30'
                                        : 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                                        }`}
                                >
                                    Đăng nhập
                                </a>
                                <a
                                    href="/auth/signup"
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isTransparent
                                        ? 'bg-white text-blue-600 hover:bg-white/90'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Đăng ký
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className={`w-8 h-8 ${isTransparent ? 'text-white' : 'text-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-6 border-t">
                        <nav className="flex flex-col space-y-4">
                            <a href="/" className="text-foreground hover:text-primary transition-colors text-lg">
                                Trang chủ
                            </a>
                            {headerData?.navigation?.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-foreground hover:text-primary transition-colors text-lg"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </nav>

                        {/* Mobile Auth Section */}
                        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col space-y-3">
                            {isAuthenticated && user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                                            {user.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    alt={user.fullName || user.email}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white text-sm font-medium">
                                                    {(user.fullName || user.email).charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user.fullName || user.email}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full text-center px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <a
                                        href="/auth/signin"
                                        className="w-full text-center px-4 py-3 rounded-lg font-medium text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                                    >
                                        Đăng nhập
                                    </a>
                                    <a
                                        href="/auth/signup"
                                        className="w-full text-center px-4 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Đăng ký
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 
