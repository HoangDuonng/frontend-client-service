'use client';

import { useEffect, useState } from 'react';
import { footerService } from '@/services/footerService';
import type { Footer } from '@/types/footer';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const SOCIAL_ICONS: Record<string, JSX.Element> = {
    facebook: <FaFacebook className="w-6 h-6" />,
    instagram: <FaInstagram className="w-6 h-6" />,
    youtube: <FaYoutube className="w-6 h-6" />,
    twitter: <FaTwitter className="w-6 h-6" />,
};

export default function Footer() {
    const [data, setData] = useState<Footer | null>(null);

    useEffect(() => {
        footerService.getFooter()
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return null;

    return (
        <footer className="bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <a href="/">
                                <img src="/images/logo.svg" alt="Logo" className="h-10" />
                            </a>
                        </div>
                        <p className="text-foreground mb-6 max-w-md">
                            {data.description}
                        </p>
                        <div className="flex space-x-4">
                            {data.socials.map((s, i) => (
                                <a key={i} href={s.url} className="text-primary hover:text-accent transition-colors" aria-label={s.type} target="_blank" rel="noopener noreferrer">
                                    {SOCIAL_ICONS[s.type] || null}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            {data.quickLinks.map((link, i) => (
                                <li key={i}><a href={link.url} className="text-foreground hover:text-primary transition-colors">{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{data.newsletter.title}</h3>
                        <p className="text-foreground mb-4 ">{data.newsletter.description}</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder={data.newsletter.placeholder}
                                className="flex-1 px-4 py-2 rounded-l-lg text-foreground focus:outline-none"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg hover:bg-accent transition-colors">
                                {data.newsletter.buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-border mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-foreground text-sm md:mb-0">
                            {data.copyright}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 
