import { Tour } from '@/types/tour';

const API_FILE_URL = process.env.NEXT_PUBLIC_API_FILE_URL;

if (!API_FILE_URL) {
    throw new Error('NEXT_PUBLIC_API_FILE_URL is not defined in .env.local');
}

export async function getTours(): Promise<Tour[]> {
    const res = await fetch(`${API_FILE_URL}/api/tours`);
    if (!res.ok) throw new Error('Failed to fetch tours');
    const data = await res.json();
    return data.data || [];
}

export async function getTourDetail(tourId: string): Promise<Tour> {
    const res = await fetch(`${API_FILE_URL}/api/tours/${tourId}`);
    if (!res.ok) throw new Error('Failed to fetch tour detail');
    const data = await res.json();
    return data.data;
}
