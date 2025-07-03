'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from "next/navigation";

type HeaderProps = {
    transparentByDefault?: boolean;
  };
  
  export default function Header({
    transparentByDefault = true
  }: HeaderProps) {
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(transparentByDefault);
    const pathname = usePathname();

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
                            src="/images/logo.svg"
                            alt="Logo"
                            width={300}
                            height={120}
                            className="h-20 w-auto"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="/kham-pha"
                            className={`
                                px-3 py-1 rounded-full transition
                                ${pathname === '/kham-pha'
                                    ? 'bg-primary/10 text-primary font-semibold shadow'
                                    : isTransparent ? 'text-white' : 'text-foreground'}
                                hover:bg-primary/10 hover:text-primary
                            `}
                        >
                            Khám phá
                        </a>
                        <a
                            href="/khach-san"
                            className={`
                                px-3 py-1 rounded-full transition
                                ${pathname === '/khach-san'
                                    ? 'bg-primary/10 text-primary font-semibold shadow'
                                    : isTransparent ? 'text-white' : 'text-foreground'}
                                hover:bg-primary/10 hover:text-primary
                            `}
                        >
                            Khách sạn
                        </a>
                        <a
                            href="/le-hoi-va-su-kien"
                            className={`
                                px-3 py-1 rounded-full transition
                                ${pathname === '/le-hoi-va-su-kien'
                                    ? 'bg-primary/10 text-primary font-semibold shadow'
                                    : isTransparent ? 'text-white' : 'text-foreground'}
                                hover:bg-primary/10 hover:text-primary
                            `}
                        >
                            Lễ hội và sự kiện
                        </a>
                        <a href="#" className={`${isTransparent ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors text-lg font-medium`}>
                            Tin tức
                        </a>
                        <a
                            href="/cam-nang-du-lich"
                            className={`
                                px-3 py-1 rounded-full transition
                                ${pathname === '/cam-nang-du-lich'
                                    ? 'bg-primary/10 text-primary font-semibold shadow'
                                    : isTransparent ? 'text-white' : 'text-foreground'}
                                hover:bg-primary/10 hover:text-primary
                            `}
                        >
                            Cẩm nang du lịch
                        </a>
                    </nav>

                    {/* Language Selector */}
                    <div className="hidden md:flex items-center space-x-4">
                        <select className={`border rounded px-4 py-2 text-base ${isTransparent ? 'border-white text-white bg-transparent' : 'border-border text-foreground bg-white'}`}>
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                        </select>
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
                            <a href="/kham-pha" className="text-foreground hover:text-primary transition-colors text-lg">
                                Khám phá
                            </a>
                            <a href="/khach-san" className="text-foreground hover:text-primary transition-colors text-lg">
                                Khách sạn
                            </a>
                            <a href="/le-hoi-va-su-kien" className="text-foreground hover:text-primary transition-colors text-lg">
                                Lễ hội và sự kiện
                            </a>
                            <a href="/cam-nang-du-lich" className="text-foreground hover:text-primary transition-colors text-lg">
                                Cẩm nang du lịch
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
} 
