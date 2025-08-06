import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || 'vi';

        const apiUrl = `${process.env.NEXT_PUBLIC_API_CMS_URL}/api/header?language=${language}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching header data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch header data' },
            { status: 500 }
        );
    }
}
