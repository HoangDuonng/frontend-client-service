import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

const API_FOOTER_URL = env.NEXT_PUBLIC_API_CMS_URL;

export const dynamic = 'force-dynamic';

const FALLBACK_FOOTER = {
    description: "Khám phá vẻ đẹp và sự sôi động của thành phố Hồ Chí Minh - nơi hội tụ của văn hóa, ẩm thực và những trải nghiệm độc đáo.",
    socials: [
        { type: 'facebook', url: '#' },
        { type: 'instagram', url: '#' },
        { type: 'youtube', url: '#' },
        { type: 'twitter', url: '#' },
    ],
    quickLinks: [
        { label: 'Trang chủ', url: '#' },
        { label: 'Khám phá', url: '#' },
        { label: 'Sự kiện', url: '#' },
        { label: 'Thông tin', url: '#' },
        { label: 'Liên hệ', url: '#' },
    ],
    newsletter: {
        title: 'Đăng ký nhận tin',
        description: 'Nhận những câu chuyện du lịch mới từ thành phố Hồ Chí Minh đến hộp thư của bạn.',
        placeholder: 'Email của bạn',
        buttonLabel: 'Đăng ký',
    },
    copyright: '© Hoang Duong. All rights reserved.'
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'vi';
    const backendUrl = `${API_FOOTER_URL}/api/footer?language=${language}`;
    try {
        const response = await fetch(backendUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ fallback: true, data: FALLBACK_FOOTER }, { status: 200 });
    }
} 
