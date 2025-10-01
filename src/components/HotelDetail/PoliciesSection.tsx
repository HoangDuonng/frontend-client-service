import React from "react";

export default function PoliciesSection({ policies }: { policies: { title: string, content: string }[] }) {
    return (
        <div className="mb-8">
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
    );
} 
