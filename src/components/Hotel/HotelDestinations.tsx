'use client';

import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

function slugify(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

function getDistrictImage(name: string) {
    const slug = slugify(name);
    return `/images/hotel/${slug}.webp`;
}

export default function HotelDestinations() {
    const destinations = [
        {
            name: 'Phường Sài Gòn',
            hotelCount: 520,
            isHot: true
        },
        {
            name: 'Phường Nhiêu Lộc',
            hotelCount: 210,
            isHot: false
        },
        {
            name: 'Phường Chợ Lớn',
            hotelCount: 180,
            isHot: false
        },
        {
            name: 'Phường Phú Mỹ',
            hotelCount: 150,
            isHot: true
        },
        {
            name: 'Phường 22',
            hotelCount: 130,
            isHot: false
        },
        {
            name: 'Phường Phú Nhuận',
            hotelCount: 90,
            isHot: false
        },
        {
            name: 'Phường Bảy Hiền',
            hotelCount: 110,
            isHot: false
        },
        {
            name: 'Phường Thủ Đức',
            hotelCount: 75,
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
                                            src={getDistrictImage(destination.name)}
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
