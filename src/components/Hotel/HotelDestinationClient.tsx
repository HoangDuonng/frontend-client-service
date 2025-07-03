"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/layout/backToTop';
import ChatPopup from '@/components/layout/chatPopup';
import Link from 'next/link';
import { FaChevronRight, FaStar, FaMapMarkerAlt, FaWifi, FaUtensils, FaSwimmer, FaCheckCircle } from 'react-icons/fa';
import HotelSearch from './HotelSearch';

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
        descriptionShort: 'Khách sạn Liberty Central Saigon Riverside Hotel là lựa chọn lý tưởng cho chuyến đi của bạn tại 17 Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh. Tận hưởng các tiện nghi hiện đại, dịch vụ chuyên nghiệp và vị trí thuận tiện.'
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
        descriptionShort: 'Hotel Nikko Saigon là lựa chọn lý tưởng cho chuyến đi của bạn tại 235 Nguyễn Văn Cừ, Quận 1, TP. Hồ Chí Minh. Tận hưởng các tiện nghi hiện đại, dịch vụ chuyên nghiệp và vị trí thuận tiện.'
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
        descriptionShort: 'The Reverie Saigon là lựa chọn lý tưởng cho chuyến đi của bạn tại 22-36 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh. Tận hưởng các tiện nghi hiện đại, dịch vụ chuyên nghiệp và vị trí thuận tiện.'
    },
];

const FACILITY_OPTIONS = [
    { label: 'Wifi', icon: <FaWifi /> },
    { label: 'Ăn sáng', icon: <FaUtensils /> },
    { label: 'Hồ bơi', icon: <FaSwimmer /> },
];
const FLEXIBLE_OPTIONS = ['Miễn phí hủy', 'Thanh toán tại KS'];

export default function HotelDestinationClient({ destinationName }: { destinationName: string }) {
    // Filter state
    const [starFilter, setStarFilter] = useState<number[]>([]);
    const [facilityFilter, setFacilityFilter] = useState<string[]>([]);
    const [flexibleFilter, setFlexibleFilter] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    // Filtering logic
    const filteredHotels = HOTELS.filter(hotel => {
        if (starFilter.length && !starFilter.includes(hotel.stars)) return false;
        if (facilityFilter.length && !facilityFilter.every(f => hotel.facilities.includes(f))) return false;
        if (flexibleFilter.length && !flexibleFilter.every(f => hotel.flexible.includes(f))) return false;
        if (search && !hotel.name.toLowerCase().includes(search.toLowerCase()) && !hotel.address.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {/* Banner full width */}
            <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 h-80 md:h-[420px] mb-0">
                <img
                    src="/images/banner/banner-1.webp"
                    alt={`Banner ${destinationName}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold drop-shadow text-center">Khám phá khách sạn tại {destinationName}</h2>
                </div>
            </div>
            {/* Floating search bar */}
            <div className="relative z-10 flex justify-center -mt-20 mb-6">
                {/* <div className="w-full max-w-3xl"> */}
                <HotelSearch
                />
                {/* </div> */}
            </div>
            <main className="container mx-auto px-4 pb-24 flex flex-col md:flex-row gap-8">
                {/* Sidebar filter */}
                <aside className="w-full md:w-64 bg-white rounded-xl shadow p-4 mb-4 md:mb-0 border border-gray-100 h-fit sticky top-24 self-start">
                    <h2 className="font-semibold text-lg mb-4">Bộ lọc</h2>
                    <div className="mb-3">
                        <div className="font-medium mb-1">Đánh giá sao</div>
                        <div className="flex gap-2 flex-wrap">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    className={`flex items-center gap-1 px-2 py-1 border rounded hover:bg-blue-50 ${starFilter.includes(star) ? 'bg-blue-100 border-blue-400' : ''}`}
                                    onClick={() => setStarFilter(starFilter.includes(star) ? starFilter.filter(s => s !== star) : [...starFilter, star])}
                                >
                                    <FaStar className="text-yellow-400" /> {star}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="font-medium mb-1">Tiện nghi</div>
                        <div className="flex gap-2 flex-wrap">
                            {FACILITY_OPTIONS.map(opt => (
                                <button
                                    key={opt.label}
                                    className={`flex items-center gap-1 px-2 py-1 border rounded hover:bg-blue-50 ${facilityFilter.includes(opt.label) ? 'bg-blue-100 border-blue-400' : ''}`}
                                    onClick={() => setFacilityFilter(facilityFilter.includes(opt.label) ? facilityFilter.filter(f => f !== opt.label) : [...facilityFilter, opt.label])}
                                >
                                    {opt.icon} {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="font-medium mb-1">Linh hoạt</div>
                        <div className="flex gap-2 flex-wrap">
                            {FLEXIBLE_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    className={`px-2 py-1 border rounded hover:bg-blue-50 ${flexibleFilter.includes(opt) ? 'bg-blue-100 border-blue-400' : ''}`}
                                    onClick={() => setFlexibleFilter(flexibleFilter.includes(opt) ? flexibleFilter.filter(f => f !== opt) : [...flexibleFilter, opt])}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="font-medium mb-1">Khoảng giá</div>
                        <input type="range" min="500000" max="6000000" className="w-full" disabled />
                        <div className="flex justify-between text-xs mt-1">
                            <span>500k</span><span>6tr+</span>
                        </div>
                    </div>
                </aside>
                {/* Main content */}
                <section className="flex-1">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                        <Link href="/khach-san" className="hover:underline">Hotel</Link>
                        <FaChevronRight className="inline mx-1" />
                        <Link href="#" className="hover:underline">Việt Nam</Link>
                        <FaChevronRight className="inline mx-1" />
                        <span className="font-semibold text-blue-700">{destinationName}</span>
                    </nav>
                    {/* Title & Desc */}
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Khách sạn {destinationName}
                        </h1>
                        <p className="text-lg text-gray-600">
                            Hãy khám phá những khách sạn tốt nhất tại {destinationName}, để bắt đầu chuyến hành trình kì diệu của bạn
                        </p>
                    </div>
                    {/* Hotel list */}
                    <div className="grid grid-cols-1 gap-6">
                        {filteredHotels.length === 0 && (
                            <div className="col-span-full text-center text-gray-400 py-12">Không tìm thấy khách sạn phù hợp.</div>
                        )}
                        {filteredHotels.map((hotel, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow p-4 grid grid-cols-[auto,1fr,auto] items-center gap-6">
                                {/* Ảnh khách sạn */}
                                <img src={hotel.image} alt={hotel.name} className="w-84 h-56 object-cover rounded-lg self-stretch" />
                                {/* Thông tin */}
                                <div className="min-w-0 flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mb-0.5">
                                            <FaMapMarkerAlt className="mr-1" />{hotel.address}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-1">
                                            {hotel.tags.map((tag, i) => (
                                                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                                                    <FaCheckCircle className="text-green-400" />{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {hotel.descriptionShort && (
                                        <div className="mt-2 text-gray-700 text-left text-base line-clamp-2" title={hotel.descriptionShort}>
                                            {hotel.descriptionShort}
                                        </div>
                                    )}
                                </div>
                                {/* Giá + nút */}
                                <div className="flex flex-col items-end justify-end h-full gap-2">
                                    <div className="text-right">
                                        <div className="text-gray-400 text-base font-semibold">Giá trung bình</div>
                                        <div className="text-2xl font-bold text-[#FF5722]">{hotel.price.toLocaleString()} VND</div>
                                        <div className="text-gray-400 text-base">/phòng/đêm</div>
                                    </div>
                                    <Link href={`/khach-san/chi-tiet/${hotel.slug}`} legacyBehavior>
                                        <a className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 mt-2">Xem phòng trống</a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Section: Tại sao nên đặt phòng */}
                    <div className="mt-12 bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">Tại sao nên đặt phòng khách sạn với Vivu360?</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            <li>Hỗ trợ khách hàng 24/7 qua chat, email, điện thoại</li>
                            <li>Nhiều lựa chọn đa dạng, linh hoạt: hủy miễn phí, thanh toán tại khách sạn</li>
                            <li>Phương thức thanh toán đa dạng và an toàn</li>
                            <li>Đánh giá thực tế từ khách hàng</li>
                        </ul>
                    </div>
                    {/* Section: Loại hình lưu trú khác */}
                    <div className="mt-8 bg-white rounded-xl shadow p-6">
                        <h2 className="font-bold text-lg mb-2">Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác</h2>
                        <div className="flex gap-4 flex-wrap">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">Biệt thự ở Hồ Chí Minh</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">Căn hộ Hồ Chí Minh</span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <BackToTop />
            <ChatPopup />
        </div>
    );
} 
