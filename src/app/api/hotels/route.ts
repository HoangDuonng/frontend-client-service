import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_HOTEL_URL}/api/hotels`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
    }
} 
