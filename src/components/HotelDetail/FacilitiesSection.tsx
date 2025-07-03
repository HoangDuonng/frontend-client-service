import React from "react";

export default function FacilitiesSection({ facilities }: { facilities: string[] }) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tiện ích nổi bật</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facilities.map((f, i) => (
                    <li key={i} className="bg-gray-50 rounded p-3 text-gray-700 flex items-center">{f}</li>
                ))}
            </ul>
        </div>
    );
} 
