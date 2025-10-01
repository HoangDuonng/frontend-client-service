"use client";

import React, { useRef, useState, useEffect, RefObject } from "react";
import RoomListSection from "./RoomListSection";

const TAB_LIST = [
    { key: 'tong-quan', label: 'Tổng quan' },
    { key: 'phong', label: 'Phòng' },
    { key: 'tien-ich', label: 'Tiện ích' },
    { key: 'chinh-sach', label: 'Chính sách' },
] as const;
type TabKey = typeof TAB_LIST[number]["key"];

export default function TabClientWrapper({ hotel, rooms, facilities, policies }: { hotel: any, rooms: any[], facilities: string[], policies: { title: string, content: string }[] }) {
    const tongQuanRef = useRef<HTMLDivElement>(null);
    const phongRef = useRef<HTMLDivElement>(null);
    const tienIchRef = useRef<HTMLDivElement>(null);
    const chinhSachRef = useRef<HTMLDivElement>(null);

    const sectionRefs: Record<TabKey, RefObject<HTMLDivElement>> = {
        'tong-quan': tongQuanRef,
        'phong': phongRef,
        'tien-ich': tienIchRef,
        'chinh-sach': chinhSachRef,
    };

    const SCROLL_OFFSET = 90;
    const SCROLL_MT = 160;

    const [activeTab, setActiveTab] = useState<TabKey>('tong-quan');

    useEffect(() => {
        const handleScroll = () => {
            let current: TabKey = TAB_LIST[0].key;
            let maxTop = 300;
            for (const tab of TAB_LIST) {
                const ref = sectionRefs[tab.key];
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < maxTop) {
                        maxTop = rect.top;
                        current = tab.key;
                    }
                }
            }
            setActiveTab(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTabClick = (ref: RefObject<HTMLDivElement>, key: TabKey) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveTab(key);
        }
    };

    return (
        <div className="w-full">
            {/* Tabs ngang đẹp */}
            <div className="flex flex-row gap-2 mb-8 px-2 py-2 bg-white rounded-xl border shadow-sm sticky top-[100px] z-30">
                {TAB_LIST.map(tab => (
                    <button
                        key={tab.key}
                        className={`py-2 px-4 rounded-lg font-semibold transition-all duration-200
                            ${activeTab === tab.key ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50 font-bold shadow' : 'text-gray-600 hover:text-blue-600 bg-transparent'}`}
                        onClick={() => handleTabClick(sectionRefs[tab.key], tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Nội dung các tab */}
            <div className="space-y-8">
                <div ref={tongQuanRef} id="tong-quan" className="scroll-mt-40">
                    <h2 className="text-xl font-bold mb-2">Giới thiệu</h2>
                    <p className="text-gray-700 mb-2">Khách sạn {hotel.name} tọa lạc tại vị trí trung tâm, thuận tiện di chuyển đến các điểm du lịch nổi tiếng của thành phố. Dịch vụ chuyên nghiệp, phòng nghỉ hiện đại, tiện nghi đa dạng.</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Hồ bơi ngoài trời, nhà hàng sang trọng, phòng gym hiện đại</li>
                        <li>Hỗ trợ khách hàng 24/7, dịch vụ phòng tận nơi</li>
                        <li>Chính sách linh hoạt: hủy miễn phí, thanh toán tại khách sạn</li>
                    </ul>
                </div>
                <div ref={phongRef} id="phong" className="scroll-mt-40">
                    <RoomListSection rooms={rooms} />
                </div>
                <div ref={tienIchRef} id="tien-ich" className="scroll-mt-40">
                    <h2 className="text-xl font-bold mb-4">Tiện ích nổi bật</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {facilities.map((f, i) => (
                            <li key={i} className="bg-gray-50 rounded p-3 text-gray-700 flex items-center">{f}</li>
                        ))}
                    </ul>
                </div>
                <div ref={chinhSachRef} id="chinh-sach" className="scroll-mt-40">
                    <h2 className="text-xl font-bold mb-4">Chính sách khách sạn</h2>
                    <ul className="space-y-2">
                        {policies.map((p, i) => (
                            <li key={i}>
                                <span className="font-semibold">{p.title}: </span>
                                <span>{p.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
} 
