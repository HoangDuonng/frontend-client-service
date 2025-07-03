"use client";

import React from "react";
import Gallery from "./Gallery";

const GALLERY = [
    '/images/banner/banner-1.webp',
    '/images/banner/banner-2.webp',
    '/images/banner/banner-3.webp',
    '/images/banner/banner-1.webp',
    '/images/banner/banner-2.webp',
];

export default function OverviewSection({ hotel }: { hotel: any }) {
    const images = hotel.images || GALLERY;
    return (
        <div className="mb-8 mt-24">
            {/* Breadcrumb */}
            <div className="mb-6 w-full">
                <nav className="flex items-center text-sm text-gray-500 gap-2">
                    <a href="#" className="hover:underline">Khách sạn</a>
                    <span>/</span>
                    <a href="#" className="hover:underline">Thành phố Hồ Chí Minh</a>
                    <span>/</span>
                    <a href="#" className="hover:underline">Quận 1</a>
                    <span>/</span>
                    <span className="font-semibold text-blue-700">{hotel.name}</span>
                </nav>
            </div>
            {/* Gallery full width */}
            <div className="w-full">
                <Gallery images={images} hotelName={hotel.name} />
            </div>
            {/* Info dưới gallery, flex-row */}
            <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mt-10 gap-6">
                {/* Info bên trái */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h1 className="text-3xl font-bold mb-0 text-left break-words">{hotel.name}</h1>
                        </div>
                        <div className="text-gray-600 text-left">{hotel.address}</div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-600 font-semibold text-lg">{hotel.rating}</span>
                            <span className="text-yellow-400">{'★'.repeat(hotel.stars)}</span>
                            <span className="text-xs text-gray-400">({hotel.reviews} đánh giá)</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {hotel.tags.map((tag: string, i: number) => (
                                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                            ))}
                        </div>
                        <div className="mb-2 text-gray-700 text-left">Khách sạn {hotel.name} là lựa chọn lý tưởng cho chuyến đi của bạn tại {hotel.address}. Tận hưởng các tiện nghi hiện đại, dịch vụ chuyên nghiệp và vị trí thuận tiện.</div>
                    </div>
                </div>
                {/* Giá và nút đặt phòng */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:justify-end gap-2 md:gap-4">
                    <div className="flex flex-col items-end md:items-end">
                        <span className="text-sm text-gray-400 md:text-right">Giá/phòng/đêm từ</span>
                        <span className="text-2xl font-bold text-green-600 md:text-right">{hotel.price.toLocaleString()} VND</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 text-lg w-full md:w-auto">Đặt phòng ngay</button>
                </div>
            </div>
        </div>
    );
} 
