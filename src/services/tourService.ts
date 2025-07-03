import { Tour } from '@/types/tour';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in .env.local');
}

export async function getTours(): Promise<Tour[]> {
    const res = await fetch(`${API_BASE_URL}/tours`);
    if (!res.ok) throw new Error('Failed to fetch tours');
    const data = await res.json();
    return data.data || [];
}

export async function getTourDetail(tourId: string): Promise<Tour> {
    const res = await fetch(`${API_BASE_URL}/tours/${tourId}`);
    if (!res.ok) throw new Error('Failed to fetch tour detail');
    const data = await res.json();
    return data.data;
}
