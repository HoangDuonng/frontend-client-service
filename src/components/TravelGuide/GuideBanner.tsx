"use client";
import Image from 'next/image';

export default function GuideBanner() {
    return (
        <section className="h-screen min-h-[500px] max-h-[100vh] pt-24 relative w-full h-[60vw] flex items-center justify-center overflow-hidden rounded-xl shadow mb-12">
            <Image
                src="/images/hero/hero-1.webp"
                alt="Cẩm nang du lịch TP.HCM"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold drop-shadow mb-2">Cẩm nang du lịch</h1>
                <p className="text-lg drop-shadow">Khám phá thông tin hữu ích, FAQ, trạm hỗ trợ, ấn phẩm du lịch và nhiều hơn nữa về TP.HCM</p>
            </div>
        </section>
    );
} 
