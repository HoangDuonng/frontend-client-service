import Link from "next/link";
import { Tour } from "@/types/tour";

export default function TourCard({ tour }: { tour: Tour }) {
    return (
        <div className="border rounded p-4 mb-2">
            <div className="font-bold text-lg mb-1">{tour.title}</div>
            <div className="text-gray-600 mb-1">{tour.description}</div>
            <div className="text-xs text-gray-400 mb-2">ID: {tour.tourId}</div>
            <div className="flex flex-wrap gap-2 mb-2">
                {tour.tags && tour.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
            </div>
            <Link href={`/tour/${tour.tourId}`}>
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">Xem tour</button>
            </Link>
        </div>
    );
} 
