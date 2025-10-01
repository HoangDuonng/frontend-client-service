"use client";

import { useState, useMemo } from 'react';
import MonthFilter from './MonthFilter';
import Link from 'next/link';
import { FaRegCalendarTimes } from 'react-icons/fa';

const months = [
    '01/2025', '02/2025', '03/2025', '04/2025', '05/2025', '06/2025',
    '07/2025', '08/2025', '09/2025', '10/2025', '11/2025', '12/2025'
];

const eventsByMonth: Record<string, { date: string; title: string; description: string; link: string; image: string }> = {
    '03/2025': {
        date: '10/03/2025',
        title: 'Marathon quốc tế',
        description: 'Tham gia giải chạy marathon lớn nhất Việt Nam',
        link: '/su-kien/marathon-quoc-te',
        image: '/images/festivals-and-events/le-hoi-va-su-kien-3.webp',
    },
    '04/2025': {
        date: '04-10/04/2025',
        title: 'Tuần Lễ Du Lịch Thành Phố Hồ Chí Minh Lần Thứ 5 Năm 2025',
        description: '',
        link: '/su-kien/tuan-le-du-lich-tphcm',
        image: '/images/festivals-and-events/le-hoi-va-su-kien-4.webp',
    },
    '09/2025': {
        date: '02/09/2025',
        title: 'Lễ Quốc Khánh',
        description: 'Sự kiện lớn mừng Quốc Khánh Việt Nam',
        link: '/su-kien/le-quoc-khanh',
        image: '/images/festivals-and-events/le-hoi-va-su-kien-9.webp',
    },
    '12/2025': {
        date: '24/12/2025',
        title: 'Lễ hội Giáng Sinh',
        description: 'Không khí lễ hội rộn ràng khắp thành phố',
        link: '/su-kien/le-hoi-giang-sinh',
        image: '/images/festivals-and-events/le-hoi-va-su-kien-12.webp',
    },
};

const VISIBLE_COUNT = 6;

function getCurrentMonthString(months: string[]): string {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const current = `${mm}/${yyyy}`;
    return months.includes(current) ? current : months[0];
}

function getInitialStartIndex(months: string[], selectedMonth: string): number {
    const idx = months.indexOf(selectedMonth);
    if (idx === -1) return 0;
    if (months.length <= VISIBLE_COUNT) return 0;
    const half = Math.floor(VISIBLE_COUNT / 2);
    if (idx <= half) return 0;
    if (idx >= months.length - half) return months.length - VISIBLE_COUNT;
    return idx - half;
}

export default function Events() {
    const initialMonth = useMemo(() => getCurrentMonthString(months), []);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);
    const [startIndex, setStartIndex] = useState(() => getInitialStartIndex(months, initialMonth));

    const event = eventsByMonth[selectedMonth];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sắc màu lễ hội và sự kiện
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Khám phá những sự kiện và lễ hội đặc sắc diễn ra quanh năm
                    </p>
                </div>

                {/* Month Navigation */}
                <MonthFilter
                    months={months}
                    selectedMonth={selectedMonth}
                    onChange={(month) => {
                        setSelectedMonth(month);
                        setStartIndex(getInitialStartIndex(months, month));
                    }}
                    eventMonths={Object.keys(eventsByMonth)}
                    startIndex={startIndex}
                    setStartIndex={setStartIndex}
                />

                {/* Events Grid */}
                <div className="mt-8">
                    {event ? (
                        <Link href={event.link} className="block max-w-lg mx-auto">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-72 object-cover object-center rounded-2xl"
                                />
                                <div className="absolute inset-0 bottom-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
                                <div className="absolute left-0 bottom-0 w-full p-8 pb-12 z-10 flex flex-col gap-2">
                                    <div className="text-white text-sm font-light">
                                        NGÀY
                                    </div>
                                    <div className="text-xl font-bold text-white tracking-wide">
                                        {event.date}
                                    </div>
                                    <div className="text-lg md:text-xl font-semibold text-white mb-1">
                                        {event.title}
                                    </div>
                                    {event.description && (
                                        <div className="text-white text-base opacity-80 mb-2">
                                            {event.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-gray-500 text-lg py-16 gap-4">
                            <FaRegCalendarTimes className="text-5xl text-blue-300 mx-auto" />
                            <div>Không có sự kiện nào trong tháng {selectedMonth}</div>
                            <div className="text-base text-gray-400">Hãy tận hưởng thời gian rảnh rỗi hoặc khám phá các hoạt động khác nhé!</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
} 
