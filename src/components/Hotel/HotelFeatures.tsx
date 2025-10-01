'use client';

import React from 'react';
import { FaShieldAlt, FaCreditCard, FaHeadset, FaStar } from 'react-icons/fa';

export default function HotelFeatures() {
    const features = [
        {
            icon: FaShieldAlt,
            title: 'Giá rẻ mỗi ngày với ưu đãi đặc biệt',
            description: 'Đặt phòng qua ứng dụng để nhận giá tốt nhất với các khuyến mãi tuyệt vời!',
            color: 'text-green-600'
        },
        {
            icon: FaCreditCard,
            title: 'Phương thức thanh toán an toàn và linh hoạt',
            description: 'Giao dịch trực tuyến an toàn với nhiều lựa chọn như thanh toán tại cửa hàng tiện lợi, chuyển khoản ngân hàng, thẻ tín dụng đến Internet Banking.',
            color: 'text-blue-600'
        },
        {
            icon: FaHeadset,
            title: 'Hỗ trợ khách hàng 24/7',
            description: 'Đội ngũ nhân viên hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn trong từng bước của quá trình đặt phòng.',
            color: 'text-purple-600'
        },
        {
            icon: FaStar,
            title: 'Khách thực, đánh giá thực',
            description: 'Hơn 10.000.000 đánh giá, bình chọn đã được xác thực từ du khách sẽ giúp bạn đưa ra lựa chọn đúng đắn.',
            color: 'text-yellow-600'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Tại sao nên đặt chỗ với chúng tôi?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Trải nghiệm đặt phòng khách sạn tuyệt vời với những ưu đãi độc quyền
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                                <div className="flex items-start space-x-4">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${feature.color}`}>
                                        <feature.icon className="text-2xl" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Benefits */}
                    <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
                                <div className="text-gray-600">Phí giao dịch</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                                <div className="text-gray-600">Hoàn tiền nếu hủy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                                <div className="text-gray-600">Hỗ trợ khách hàng</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Sẵn sàng đặt phòng khách sạn?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Khám phá hàng nghìn khách sạn chất lượng với giá tốt nhất
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 text-lg">
                            Bắt đầu tìm kiếm ngay
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
} 
