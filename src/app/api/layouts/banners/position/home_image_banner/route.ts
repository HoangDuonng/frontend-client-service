import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

const API_CMS_URL = env.NEXT_PUBLIC_API_CMS_URL;

export const dynamic = 'force-dynamic';

const FALLBACK_BANNERS = [
    {
        image: '/images/banner/banner-1.webp',
        caption: 'Ẩm thực đường phố Sài Gòn',
        order: 1,
    },
    {
        image: '/images/banner/banner-2.webp',
        caption: 'Văn hóa & Lịch sử đặc sắc',
        order: 2,
    },
    {
        image: '/images/banner/banner-3.webp',
        caption: 'Sự kiện & Lễ hội quanh năm',
        order: 3,
    },
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'vi';
    const isActive = searchParams.get('isActive') || 'true';
    const backendUrl = `${API_CMS_URL}/api/layouts/banners/position/home_image_banner?language=${language}&isActive=${isActive}`;
    try {
        const response = await fetch(backendUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ fallback: true, data: FALLBACK_BANNERS }, { status: 200 });
    }
} 
