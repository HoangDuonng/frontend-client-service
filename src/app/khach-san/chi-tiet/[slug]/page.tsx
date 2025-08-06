import HotelDetailClientWrapper from '@/components/HotelDetail/HotelDetailClientWrapper';

export default function HotelDetailPage({ params }: { params: { slug: string } }) {
    return <HotelDetailClientWrapper slug={params.slug} />;
} 
