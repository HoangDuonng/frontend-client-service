import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_BANNERS = [
    {
        title: 'Khám phá',
        subtitle: 'Thành phố Hồ Chí Minh',
        desc: 'Nơi hội tụ của văn hóa, ẩm thực và những trải nghiệm độc đáo',
        video: '/videos/saigon-short.mp4',
    },
];

export async function GET(request: NextRequest, { params }: { params: { position: string } }) {
    const { position } = params;
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'vi';
    const isActive = searchParams.get('isActive') || 'true';
    const backendUrl = `${process.env.NEXT_PUBLIC_API_CMS_URL}/api/layouts/banners/position/${position}?language=${language}&isActive=${isActive}`;
    try {
        const response = await fetch(backendUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ fallback: true, data: FALLBACK_BANNERS }, { status: 200 });
    }
} 
