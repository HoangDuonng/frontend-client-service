"use client";

interface MonthFilterProps {
    months: string[];
    selectedMonth: string;
    onSelect: (month: string) => void;
}
export default function MonthFilter({ months, selectedMonth, onSelect }: MonthFilterProps) {
    return (
        <section className="mb-8 flex flex-wrap gap-2 justify-center mt-12">
            {months.map((month) => (
                <button
                    key={month}
                    className={`px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition ${selectedMonth === month ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => onSelect(month)}
                >
                    {month}
                </button>
            ))}
        </section>
    );
} 
