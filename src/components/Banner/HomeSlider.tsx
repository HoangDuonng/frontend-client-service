"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
    {
        image: "/images/banner/banner-1.webp",
        caption: "Ẩm thực đường phố Sài Gòn",
    },
    {
        image: "/images/banner/banner-2.webp",
        caption: "Văn hóa & Lịch sử đặc sắc",
    },
    {
        image: "/images/banner/banner-3.webp",
        caption: "Sự kiện & Lễ hội quanh năm",
    },
];

export default function HomeSlider({ onSlideClick, slideLinks }: { onSlideClick?: (idx: number) => void, slideLinks?: string[] }) {
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (idx: number) => setCurrent(idx);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

    const handleClick = () => {
        if (onSlideClick) {
            onSlideClick(current);
        } else if (slideLinks && slideLinks[current]) {
            router.push(slideLinks[current]);
        }
    };

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-24">
                <div className="relative w-full h-[60vw] max-h-[600px] min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl select-none">
                    <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={handleClick}
                        tabIndex={0}
                        role="button"
                        aria-label="Chuyển đến nội dung slide"
                    >
                        <Image
                            src={slides[current].image}
                            alt={slides[current].caption}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover w-full h-full transition-all duration-700"
                            priority
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        {/* Caption */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center text-white">
                            <div className="text-xl md:text-2xl font-bold drop-shadow mb-2">{slides[current].caption}</div>
                            <div className="flex gap-2 justify-center mt-2">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'} transition`}
                                        onClick={(e) => { e.stopPropagation(); goToSlide(idx); }}
                                        aria-label={`Chuyển đến slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Prev/Next buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-20"
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        aria-label="Slide trước"
                    >
                        &#8592;
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-20"
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        aria-label="Slide sau"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
} 
