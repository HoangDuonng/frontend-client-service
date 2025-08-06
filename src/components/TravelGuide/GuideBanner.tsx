"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { bannerService } from "@/services/bannerService";
import type { HomeImageBanner } from "@/types/banner";

const FALLBACK_SLIDES: HomeImageBanner[] = [
    {
        image: "/images/banner/banner-2.webp",
        caption: "Cẩm nang du lịch Sài Gòn",
        order: 1,
    },
];

export default function GuideBanner() {
    const [slides, setSlides] = useState<HomeImageBanner[]>(FALLBACK_SLIDES);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        bannerService.getHeaderBanner5()
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) setSlides(data);
            })
            .catch(() => setSlides(FALLBACK_SLIDES));
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (idx: number) => setCurrent(idx);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

    return (
        <section className="aspect-[16/9] w-full relative flex items-center justify-center overflow-hidden rounded-xl shadow mb-12 pt-24 max-h-[100vh] min-h-[300px]">
            <Image
                src={slides[current].image}
                alt={slides[current].caption}
                fill
                sizes="100vw"
                className="object-cover transition-all duration-700"
                priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {/* Caption */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-full flex items-center">
                <div className="text-4xl md:text-6xl font-extrabold drop-shadow text-white text-left w-full px-12">
                    Cẩm nang du lịch<br />Sài Gòn
                </div>
            </div>
            {/* Prev/Next buttons & dots */}
            {slides.length > 1 && (
                <>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'} transition`}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Chuyển đến slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-20"
                        onClick={prevSlide}
                        aria-label="Slide trước"
                    >
                        &#8592;
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-20"
                        onClick={nextSlide}
                        aria-label="Slide sau"
                    >
                        &#8594;
                    </button>
                </>
            )}
        </section>
    );
} 
