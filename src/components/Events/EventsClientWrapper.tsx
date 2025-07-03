"use client";

import { useState } from "react";
import EventBanner from "./EventBanner";
import MonthFilter from "./MonthFilter";
import EventList from "./EventList";
import PromotionList from "./PromotionList";

const months = [
    "01/2025", "02/2025", "03/2025", "04/2025", "05/2025", "06/2025",
    "07/2025", "08/2025", "09/2025", "10/2025", "11/2025", "12/2025",
];

const events = [
    {
        title: "Lễ hội Ánh sáng Sài Gòn",
        date: "15/03/2025",
        image: "/images/banner/banner-1.webp",
        desc: "Trải nghiệm không gian ánh sáng rực rỡ tại trung tâm thành phố với nhiều hoạt động nghệ thuật đặc sắc.",
    },
    {
        title: "Sự kiện Ẩm thực Đường phố",
        date: "22/04/2025",
        image: "/images/banner/banner-2.webp",
        desc: "Khám phá các món ăn đặc trưng và chương trình biểu diễn ẩm thực hấp dẫn.",
    },
    {
        title: "Lễ hội Văn hóa Nhật Bản",
        date: "10/05/2025",
        image: "/images/banner/banner-3.webp",
        desc: "Giao lưu văn hóa, thưởng thức nghệ thuật và ẩm thực Nhật Bản ngay tại TP.HCM.",
    },
];

const promotions = [
    "Ưu đãi khách sạn 5*",
    "Giảm giá tour du lịch nội thành",
    "Voucher ẩm thực đặc biệt",
];

export default function EventsClientWrapper() {
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    // Có thể filter events theo selectedMonth nếu muốn

    return (
        <main className="mx-auto">
            <EventBanner />
            <MonthFilter
                months={months}
                selectedMonth={selectedMonth}
                onSelect={setSelectedMonth}
            />
            <EventList events={events} />
            <PromotionList promotions={promotions} />
        </main>
    );
} 
