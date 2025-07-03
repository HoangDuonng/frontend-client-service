'use client';

import React from 'react';
import Image from 'next/image';

export default function HotelHero() {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero/hero-1.webp"
                    alt="Hotel Background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mt-20">
                        Tìm & đặt phòng khách sạn giá rẻ chỉ với 3 bước đơn giản!
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Khám phá ngay những ưu đãi tốt nhất dành cho bạn!
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-3xl font-bold text-yellow-300">10,000+</div>
                            <div className="text-sm opacity-80">Khách sạn</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-3xl font-bold text-yellow-300">50+</div>
                            <div className="text-sm opacity-80">Thành phố</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <div className="text-3xl font-bold text-yellow-300">24/7</div>
                            <div className="text-sm opacity-80">Hỗ trợ</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
