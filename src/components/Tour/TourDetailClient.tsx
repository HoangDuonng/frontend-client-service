"use client";

import { useEffect, useState } from "react";
import { getTourDetail } from '@/services/tourService';
import TourViewer from "./TourViewer";
import { Tour } from "@/types/tour";
import { env } from '@/env.mjs';
import Loading from '@/app/loading';

export default function TourDetailClient({
    tourId,
}: {
    tourId: string;
}) {
    const [tour, setTour] = useState<Tour | null>(null);
    // const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getTourDetail(tourId)
            .then(setTour)
            .catch((e) => setError(e.message));
    }, [tourId]);

    if (error) return <div className="text-red-500 mb-4">{error}</div>;
    if (!tour) return <Loading />;

    const base = `${env.NEXT_PUBLIC_TOUR_STATIC_BASE_URL}/${tour.storageSubPath.replace(/\\/g, "/")}`;
    const xmlUrl = `${base}/tour.xml`;
    const jsUrl = `${base}/tour.js`;

    return (
        // <main className="max-w-2xl mx-auto py-8 px-4">
        //     <a href="/" className="text-blue-600 hover:underline">← Quay lại danh sách tour</a>
        //     <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>
        //     <div className="text-gray-600 mb-2">{tour.description}</div>
        //     <div className="mb-2 text-xs text-gray-400">ID: {tour.tourId}</div>
        //     <div className="flex flex-wrap gap-2 mb-4">
        //         {tour.tags && tour.tags.map((tag) => (
        //             <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
        //         ))}
        //     </div>
        //     <button
        //         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        //         onClick={() => setShowModal(true)}
        //     >
        //         Xem tour 360°
        //     </button>
        //     {showModal && (
        //         <TourViewer xmlUrl={xmlUrl} jsUrl={jsUrl} baseUrl={base} onClose={() => setShowModal(false)} />
        //     )}
        // </main>
        <div className="fixed inset-0 z-50 bg-black">
            <TourViewer xmlUrl={xmlUrl} jsUrl={jsUrl} baseUrl={base} onClose={() => { }} />
        </div>
    );
}
