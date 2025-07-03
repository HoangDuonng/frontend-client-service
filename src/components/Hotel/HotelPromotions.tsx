'use client';

import React, { useState } from 'react';
import { FaCopy, FaFire } from 'react-icons/fa';

export default function HotelPromotions() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const promotions = [
        {
            id: 'KSMEGA77VN',
            title: 'Giảm đến 600k cho nội địa',
            description: 'Giảm đến 200k, đặt từ 2,2 triệu Giảm đến 600k, đặt từ 3 triệu',
            isHot: true,
            isExpiring: true
        },
        {
            id: 'KSMEGA77DNA',
            title: 'Giảm đến 600k cho Đông Nam Á',
            description: 'Giảm đến 200k, đặt từ 2,6 triệu Giảm đến 600k, đặt từ 3,5 triệu',
            isHot: true,
            isExpiring: false
        },
        {
            id: 'KSMEGA77QT',
            title: 'Giảm đến 600k cho các nước quốc tế khác',
            description: 'Giảm đến 200k, đặt từ 3 triệu Giảm đến 600k, đặt từ 5 triệu',
            isHot: false,
            isExpiring: false
        }
    ];

    const copyToClipboard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Mã giảm 7.7 đến 50%
                        </h2>
                        <p className="text-lg text-gray-600">
                            Chỉ áp dụng trên App!
                        </p>
                    </div>

                    {/* Promotions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {promotions.map((promo) => (
                            <div key={promo.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        {promo.isHot && (
                                            <FaFire className="text-red-500 text-lg" />
                                        )}
                                        <span className="text-sm font-medium text-gray-500">
                                            Mã giảm hot
                                        </span>
                                    </div>
                                    {promo.isExpiring && (
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                            Sắp hết mã
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {promo.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4">
                                    {promo.description}
                                </p>

                                {/* Code */}
                                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold text-lg text-gray-800">
                                            {promo.id}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(promo.id)}
                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            <FaCopy className="text-sm" />
                                            <span className="text-sm">
                                                {copiedCode === promo.id ? 'Đã copy!' : 'Copy'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                    Áp dụng ngay
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            * Áp dụng cho đặt phòng từ 2.2 triệu đồng trở lên
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
} 
