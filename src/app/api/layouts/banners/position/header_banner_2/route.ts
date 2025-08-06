import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

export const dynamic = 'force-dynamic';

const API_CMS_URL = env.NEXT_PUBLIC_API_CMS_URL;

const FALLBACK_BANNERS = [
    {
        image: '/images/banner/banner-2.webp',
        caption: 'Khách sạn nổi bật tại Sài Gòn',
        order: 1,
        buttonText: 'Xem khách sạn',
        buttonUrl: '/khach-san',
    },
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'vi';
    const isActive = searchParams.get('isActive') || 'true';
    const backendUrl = `${API_CMS_URL}/api/layouts/banners/position/header_banner_2?language=${language}&isActive=${isActive}`;
    try {
        const response = await fetch(backendUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ fallback: true, data: FALLBACK_BANNERS }, { status: 200 });
    }
} 
