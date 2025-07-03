"use client"

import { useEffect, useState } from "react";

const slides = [
    {
        title: "Khám phá",
        subtitle: "Thành phố Hồ Chí Minh",
        desc: "Nơi hội tụ của văn hóa, ẩm thực và những trải nghiệm độc đáo",
        video: "/videos/saigon-short.mp4",
    },
    {
        title: "Ẩm thực",
        subtitle: "Đậm đà bản sắc",
        desc: "Thưởng thức những món ăn đặc trưng của Sài Gòn",
        video: "/videos/saigon-short.mp4",
    },
    {
        title: "Văn hóa",
        subtitle: "Đa dạng & Sôi động",
        desc: "Trải nghiệm các lễ hội và sự kiện hấp dẫn quanh năm",
        video: "/videos/saigon-short.mp4",
    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative flex items-center justify-center h-screen min-h-[500px] max-h-[100vh] pt-24">
            {/* Background Video */}
            <video
                key={slides[current].video}
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={slides[current].video}
                autoPlay
                loop
                muted
                playsInline
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/10 z-10">
                <div className="absolute inset-0 bg-white/5"></div>
            </div>
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
} 
