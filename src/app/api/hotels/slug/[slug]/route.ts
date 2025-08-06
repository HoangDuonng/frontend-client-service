import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';

const API_HOTEL_URL = env.NEXT_PUBLIC_API_HOTEL_URL;

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const backendRes = await fetch(`${API_HOTEL_URL}/api/hotels/slug/${slug}`);
    const data = await backendRes.json();
    return NextResponse.json(data);
}
