"use client";

import Image from 'next/image';

export default function EventBanner() {
    return (
        <section className="
            relative w-full h-screen min-h-[500px] max-h-[100vh]
            flex items-center justify-center overflow-hidden select-none
            pt-24
        ">
            {/* Ảnh nền */}
            <Image
                src="/images/banner/banner-2.webp"
                alt="Lễ hội & Sự kiện TP.HCM"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
            />
            {/* Overlay gradient xanh đậm -> trong suốt */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 via-blue-900/60 to-transparent z-10" />
            {/* Nội dung trung tâm */}
            <div className="absolute inset-0 flex flex-col items-start justify-center z-20 px-4">
                <button className="mb-6 px-6 py-2 bg-red-600 text-white font-bold rounded-full text-sm shadow-lg hover:bg-red-700 transition">VĂN HÓA & LỊCH SỬ</button>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white text-left drop-shadow mb-6 leading-tight">
                    Những địa điểm du lịch ít người biết ở TPHCM<br />đang cần bạn khám phá
                </h1>
                {/* Dot chuyển slide (placeholder) */}
                <div className="flex gap-2 justify-center mt-2">
                    <span className="w-3 h-3 rounded-full bg-white/80" />
                    <span className="w-3 h-3 rounded-full bg-white/40" />
                    <span className="w-3 h-3 rounded-full bg-white/40" />
                    <span className="w-3 h-3 rounded-full bg-white/40" />
                </div>
            </div>
        </section>
    );
} 
