import React from "react";
import { FaRunning } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Grid 2 cột */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                        {/* Cột trái: Icon + Tiêu đề */}
                        <div>
                            <div className="w-full md:w-1/2 flex justify-center mb-4">
                                <img src="/images/hero/hero-2.webp" alt="Marathon" className="max-h-72 w-full md:w-auto" />
                            </div>
                            <h1 className="text-4xl md:text-4xl font-bold text-red-700 mb-2 md:mb-4">
                                ẤN TƯỢNG
                            </h1>
                            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                                GIẢI MARATHON QUỐC TẾ
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">
                                THÀNH PHỐ HỒ CHÍ MINH 2023
                            </h3>
                        </div>
                        {/* Cột phải: Mô tả ngắn */}
                        <div>
                            <p className="text-base md:text-lg font-semibold leading-relaxed text-justify">
                                <span className="text-red-600">Giải Marathon Quốc tế Thành phố Hồ Chí Minh</span> đã được đưa vào hệ thống thi đấu giải quốc gia từ năm 2020, được ghi nhận trong hệ thống thi đấu Quốc gia và là thành viên của Hiệp hội Marathon Quốc tế (AIMS), đạt chứng nhận của Liên đoàn Điền kinh Thế giới (IAAF). Đây là sự kiện chạy bộ lớn nhất từ trước đến nay tại Việt Nam và trong khu vực, với lộ trình chạy qua những cung đường của 5 quận và 1 thành phố, các địa điểm gắn liền với lịch sử hình thành và phát triển của Thành phố cũng như các điểm ngắm cảnh quan Thành phố tuyệt đẹp, chắc chắn rằng mỗi vận động viên tham gia đều có những kỷ niệm khó quên sau khi tham gia giải chạy.
                            </p>
                        </div>
                    </div>

                    {/* Ảnh/Video + Statistics */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Ảnh minh họa */}
                        <div className="w-full md:w-2/3 flex justify-center">
                            <img
                                src="/images/hero/hero-1.webp"
                                alt="Marathon"
                                className="max-h-[300px] w-full object-cover"
                            />
                        </div>
                        {/* Statistics */}
                        <div className="w-full md:w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <FaRunning className="text-red-500 text-5xl mb-2" />
                                <div className="text-5xl font-bold text-red-500 mb-2">15K+</div>
                                <div className="text-lg text-gray-900">Vận động viên</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <BsGlobe2 className="text-red-500 text-5xl mb-2" />
                                <div className="text-5xl font-bold text-red-500 mb-2">91</div>
                                <div className="text-lg text-gray-900">Quốc gia và vùng lãnh thổ</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaDonate className="text-red-500 text-5xl mb-2" />
                                <div className="text-5xl font-bold text-red-500 mb-2">3,4</div>
                                <div className="text-lg text-gray-900">Tỷ đồng được quyên góp cho các quỹ từ thiện</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
