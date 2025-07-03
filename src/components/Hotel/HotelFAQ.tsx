'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function HotelFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'Làm sao để biết khách sạn có các tiện ích nào?',
            answer: 'Thông thường, để xem các tiện ích của khách sạn, du khách phải truy cập website của khách sạn hoặc gọi điện trực tiếp – điều này khá bất tiện, đặc biệt khi không phải khách sạn nào cũng có trang web. Với chúng tôi, mọi thứ trở nên đơn giản hơn. Khi đặt phòng, bạn có thể dễ dàng xem đầy đủ danh sách tiện ích trong phần mô tả khách sạn hoặc mục "Tiện ích", giúp bạn nắm rõ thông tin và lựa chọn nơi lưu trú phù hợp nhất một cách nhanh chóng.'
        },
        {
            question: 'Đặt khách sạn có được thanh toán sau không?',
            answer: 'Khác với việc đặt khách sạn bên ngoài thường yêu cầu đặt cọc hoặc thanh toán trước, khi đặt phòng qua chúng tôi, bạn có thể linh hoạt hơn với một số khách sạn cho phép thanh toán sau tại quầy lễ tân. Bạn chỉ cần kiểm tra hình thức thanh toán được hiển thị rõ ràng trong phần chi tiết đặt phòng trước khi xác nhận, giúp bạn chủ động lựa chọn phương thức phù hợp và yên tâm hơn khi lên kế hoạch chuyến đi.'
        },
        {
            question: 'Có bao nhiêu phương thức thanh toán?',
            answer: 'Thanh toán nhanh chóng và an toàn với 8 phương thức phổ biến, linh hoạt cho mọi nhu cầu của bạn: Mã Viet QR, chuyển khoản (VietinBank, Vietcombank), Ví Momo, Thẻ ATM nội địa, Home PayLater, Thẻ thanh toán quốc tế (VISA, MasterCard) và Thanh toán trực tiếp tại khách sạn.'
        },
        {
            question: 'Hướng dẫn cách đặt phòng đơn giản?',
            answer: 'Hướng dẫn đặt phòng khách sạn đơn giản và nhanh chóng: Bước 1: Truy cập website hoặc ứng dụng. Bước 2: Nhập điểm đến, ngày nhận/trả phòng và số lượng khách. Bước 3: Xem danh sách khách sạn, sử dụng bộ lọc để tìm phòng phù hợp. Bước 4: Chọn khách sạn, kiểm tra thông tin chi tiết và nhấn "Đặt ngay". Bước 5: Nhập thông tin đặt phòng và chọn phương thức thanh toán phù hợp. Bước 6: Xác nhận thanh toán, nhận phiếu điện tử qua email/app.'
        },
        {
            question: 'Có chương trình khách hàng thân thiết không?',
            answer: 'Nếu bạn là tín đồ du lịch và thường xuyên đặt vé máy bay, khách sạn hay các dịch vụ khác, thì chắc chắn không nên bỏ lỡ chương trình khách hàng thân thiết. Chương trình hoạt động theo hệ thống cấp bậc (Bronze, Silver, Gold, Platinum, Diamond), dựa trên tổng chi tiêu của bạn trên nền tảng. Càng sử dụng nhiều, bạn càng dễ thăng hạng và nhận thêm nhiều quyền lợi.'
        },
        {
            question: 'Làm sao để săn mã giảm giá khách sạn?',
            answer: 'Để săn mã giảm giá khách sạn, bạn có thể truy cập trang khuyến mãi, theo dõi các kênh truyền thông chính thức hoặc đăng ký nhận thông báo qua email. Chúng tôi thường xuyên cập nhật các mã giảm giá mới và ưu đãi đặc biệt cho khách hàng.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Câu hỏi thường gặp
                        </h2>
                        <p className="text-lg text-gray-600">
                            Tìm hiểu thêm về dịch vụ đặt phòng khách sạn của chúng tôi
                        </p>
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </span>
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <FaChevronDown className="text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Bạn cần hỗ trợ?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                                Liên hệ ngay
                            </button>
                            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                                Chat với chúng tôi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
