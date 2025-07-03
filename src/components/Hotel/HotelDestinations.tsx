'use client';

import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

function slugify(str: string) {
    return str.normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

export default function HotelDestinations() {
    const destinations = [
        {
            name: 'Hồ Chí Minh',
            hotelCount: 1527,
            image: '/images/banner/banner-1.webp',
            isHot: false
        },
        {
            name: 'Đà Nẵng',
            hotelCount: 763,
            image: '/images/hero/hero-2.webp',
            isHot: true
        },
        {
            name: 'Nha Trang',
            hotelCount: 569,
            image: '/images/banner/banner-2.webp',
            isHot: true
        },
        {
            name: 'Phú Quốc',
            hotelCount: 381,
            image: '/images/banner/banner-3.webp',
            isHot: true
        },
        {
            name: 'Vũng Tàu',
            hotelCount: 339,
            image: '/images/hero/hero-1.webp',
            isHot: false
        },
        {
            name: 'Hà Nội',
            hotelCount: 1049,
            image: '/images/hero/hero-2.webp',
            isHot: false
        },
        {
            name: 'Đà Lạt',
            hotelCount: 591,
            image: '/images/banner/banner-1.webp',
            isHot: false
        },
        {
            name: 'Hội An',
            hotelCount: 553,
            image: '/images/banner/banner-2.webp',
            isHot: false
        },
        {
            name: 'Phan Thiết',
            hotelCount: 243,
            image: '/images/banner/banner-3.webp',
            isHot: false
        },
        {
            name: 'Quy Nhơn',
            hotelCount: 80,
            image: '/images/hero/hero-1.webp',
            isHot: false
        },
        {
            name: 'Huế',
            hotelCount: 243,
            image: '/images/hero/hero-2.webp',
            isHot: false
        },
        {
            name: 'Hạ Long',
            hotelCount: 230,
            image: '/images/banner/banner-2.webp',
            isHot: false
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Điểm đến hot nhất
                        </h2>
                        <p className="text-lg text-gray-600">
                            Khám phá những thành phố du lịch nổi tiếng với nhiều khách sạn chất lượng
                        </p>
                    </div>

                    {/* Destinations Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {destinations.map((destination, index) => (
                            <Link
                                key={index}
                                href={`/khach-san/${slugify(destination.name)}`}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    {/* Image */}
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={destination.image}
                                            alt={destination.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Hot Badge */}
                                        {destination.isHot && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                    HOT
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FaMapMarkerAlt className="text-sm" />
                                            <h3 className="font-semibold text-lg">
                                                {destination.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm opacity-90">
                                            Có {destination.hotelCount.toLocaleString()} khách sạn
                                        </p>
                                        <button className="mt-2 text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors">
                                            Xem khách sạn
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                            Xem tất cả điểm đến
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
} 
