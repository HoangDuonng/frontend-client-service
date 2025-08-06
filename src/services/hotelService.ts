import { Hotel } from '@/types/hotel';

export const hotelService = {
    async getHotels(): Promise<Hotel[]> {
        const res = await fetch('/api/hotels');
        if (!res.ok) throw new Error('Failed to fetch hotels');
        const result = await res.json();
        return result.data;
    },
    
    async getHotelBySlug(slug: string) {
        const res = await fetch(`/api/hotels/slug/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch hotel detail');
        const result = await res.json();
        return result.data;
    },
}; 
