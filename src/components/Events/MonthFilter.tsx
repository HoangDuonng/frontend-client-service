"use client";

import { useState } from "react";

interface MonthFilterProps {
    months: string[];
    selectedMonth: string;
    onChange: (month: string) => void;
    eventMonths?: string[];
    startIndex?: number;
    setStartIndex?: (idx: number) => void;
}

const VISIBLE_COUNT = 6;

export default function MonthFilter({ months, selectedMonth, onChange, eventMonths = [], startIndex: controlledStartIndex, setStartIndex: controlledSetStartIndex }: MonthFilterProps) {
    const [uncontrolledStartIndex, setUncontrolledStartIndex] = useState(0);
    const startIndex = controlledStartIndex !== undefined ? controlledStartIndex : uncontrolledStartIndex;
    const setStartIndex = controlledSetStartIndex || setUncontrolledStartIndex;
    const endIndex = Math.min(startIndex + VISIBLE_COUNT, months.length);
    const canPrev = startIndex > 0;
    const canNext = endIndex < months.length;

    const handlePrev = () => {
        if (canPrev) setStartIndex(startIndex - 1);
    };
    const handleNext = () => {
        if (canNext) setStartIndex(startIndex + 1);
    };

    return (
        <div className="flex items-center justify-center gap-2 mb-12">
            <button
                onClick={handlePrev}
                disabled={!canPrev}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl border transition-colors bg-white ${canPrev ? 'text-gray-900 border-gray-300 hover:bg-blue-50' : 'text-gray-300 border-gray-100 cursor-not-allowed'}`}
                aria-label="Tháng trước"
            >
                &#8592;
            </button>
            <div className="flex gap-4 bg-transparent">
                {months.slice(startIndex, endIndex).map((month) => {
                    const hasEvent = eventMonths.includes(month);
                    const isSelected = month === selectedMonth;
                    return (
                        <button
                            key={month}
                            type="button"
                            className={`px-6 py-3 rounded-full text-base font-medium transition-colors flex items-center gap-2 focus:outline-none border
                                ${isSelected
                                    ? 'bg-blue-100 border-blue-400 text-blue-700 font-bold shadow-md'
                                    : 'bg-white border-gray-200 text-gray-800 hover:bg-blue-50'}
                            `}
                            onClick={() => onChange(month)}
                        >
                            {hasEvent && <span className="mr-1 text-lg" title="Có lễ hội">🎉</span>}
                            {month}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={handleNext}
                disabled={!canNext}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl border transition-colors bg-white ${canNext ? 'text-gray-900 border-gray-300 hover:bg-blue-50' : 'text-gray-300 border-gray-100 cursor-not-allowed'}`}
                aria-label="Tháng sau"
            >
                &#8594;
            </button>
        </div>
    );
} 
