import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

const API_CMS_URL = env.NEXT_PUBLIC_API_CMS_URL;

const FALLBACK_BANNERS = [
    {
        image: '/images/banner/banner-1.webp',
        caption: 'Khám phá Sài Gòn',
        order: 1,
        buttonText: 'Khám phá ngay',
        buttonUrl: '/kham-pha',
    },
];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'vi';
    const isActive = searchParams.get('isActive') || 'true';
    const backendUrl = `${API_CMS_URL}/api/layouts/banners/position/header_banner_1?language=${language}&isActive=${isActive}`;
    try {
        const response = await fetch(backendUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ fallback: true, data: FALLBACK_BANNERS }, { status: 200 });
    }
} 
