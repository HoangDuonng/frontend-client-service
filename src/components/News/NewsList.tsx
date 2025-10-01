"use client";

import Image from 'next/image';
import Link from 'next/link';

export interface NewsItem {
    id: number;
    title: string;
    summary: string;
    image: string;
    date: string;
    slug: string;
}

interface NewsListProps {
    news: NewsItem[];
}

export default function NewsList({ news }: NewsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16 mb-16 mt-10">
            {news.map((item) => (
                <Link key={item.id} href={`/tin-tuc/${item.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="relative w-full h-48">
                            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="p-4">
                            <div className="text-xs text-gray-500 mb-2">{new Date(item.date).toLocaleDateString('vi-VN')}</div>
                            <h2 className="text-lg font-semibold mb-2 text-[#1565c0]">{item.title}</h2>
                            <p className="text-gray-700 text-sm">{item.summary}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
} 
