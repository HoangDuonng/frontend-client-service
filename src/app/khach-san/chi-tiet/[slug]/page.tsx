import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OverviewSection from '@/components/HotelDetail/OverviewSection';
import TabClientWrapper from '@/components/HotelDetail/TabClientWrapper';
import ChatPopup from '@/components/layout/chatPopup';
import BackToTop from '@/components/layout/backToTop';

// Dữ liệu mẫu, nên tách ra file riêng nếu dùng thực tế
const HOTELS = [
    {
        slug: 'liberty-central-saigon-riverside',
        name: 'Liberty Central Saigon Riverside Hotel',
        address: '17 Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh',
        rating: 8.7,
        reviews: 1483,
        price: 2300000,
        image: '/images/banner/banner-1.webp',
        tags: ['Trung tâm', 'Ăn sáng', 'Hồ bơi', 'Wifi miễn phí'],
        stars: 4,
        facilities: ['Wifi', 'Ăn sáng', 'Hồ bơi'],
        flexible: ['Miễn phí hủy'],
    },
    {
        slug: 'hotel-nikko-saigon',
        name: 'Hotel Nikko Saigon',
        address: '235 Nguyễn Văn Cừ, Quận 1, TP. Hồ Chí Minh',
        rating: 9.1,
        reviews: 2034,
        price: 3100000,
        image: '/images/banner/banner-2.webp',
        tags: ['5 sao', 'Ăn sáng', 'Hồ bơi', 'Wifi miễn phí'],
        stars: 5,
        facilities: ['Wifi', 'Ăn sáng', 'Hồ bơi'],
        flexible: ['Miễn phí hủy', 'Thanh toán tại KS'],
    },
    {
        slug: 'the-reverie-saigon',
        name: 'The Reverie Saigon',
        address: '22-36 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        rating: 9.5,
        reviews: 1120,
        price: 5800000,
        image: '/images/banner/banner-3.webp',
        tags: ['Sang trọng', 'Ăn sáng', 'Hồ bơi', 'Wifi miễn phí'],
        stars: 5,
        facilities: ['Wifi', 'Ăn sáng', 'Hồ bơi'],
        flexible: ['Thanh toán tại KS'],
    },
];

const ROOMS = [
    {
        name: 'Deluxe Twin',
        price: 2500000,
        image: '/images/banner/banner-1.webp',
        description: 'Phòng 2 giường đơn, diện tích 28m², view thành phố, bao gồm ăn sáng.',
        facilities: ['Wifi miễn phí', 'Điều hòa', 'Tủ lạnh', 'Bồn tắm'],
        refundable: true,
        payAtHotel: true,
    },
    {
        name: 'Executive Suite',
        price: 4200000,
        image: '/images/banner/banner-2.webp',
        description: 'Phòng suite cao cấp, diện tích 45m², view sông, bao gồm ăn sáng.',
        facilities: ['Wifi miễn phí', 'Điều hòa', 'Bồn tắm', 'Két sắt'],
        refundable: false,
        payAtHotel: true,
    },
];

const HOTEL_POLICIES = [
    { title: 'Nhận phòng', content: 'Từ 14:00 mỗi ngày.' },
    { title: 'Trả phòng', content: 'Trước 12:00 trưa.' },
    { title: 'Chính sách hủy', content: 'Hủy miễn phí trước 24h nhận phòng đối với một số loại phòng.' },
    { title: 'Thanh toán', content: 'Chấp nhận tiền mặt, thẻ tín dụng, chuyển khoản.' },
];

const HOTEL_FACILITIES = [
    'Wifi miễn phí',
    'Hồ bơi',
    'Nhà hàng',
    'Lễ tân 24h',
    'Chỗ đậu xe',
    'Thang máy',
    'Điều hòa',
    'Dịch vụ phòng',
];

export default function HotelDetailPage({ params }: { params: { slug: string } }) {
    const hotel = HOTELS.find(h => h.slug === params.slug);
    if (!hotel) return notFound();

    return (
        <>
            <Header transparentByDefault={false}/>
            <div className="container mx-auto py-8 px-4">
                <OverviewSection hotel={hotel} />
                <TabClientWrapper hotel={hotel} rooms={ROOMS} facilities={HOTEL_FACILITIES} policies={HOTEL_POLICIES} />
            </div>
            <ChatPopup />
            <BackToTop />
            <Footer />
        </>
    );
} 
