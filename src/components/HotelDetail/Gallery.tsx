"use client";

import React, { useState } from "react";

export default function Gallery({ images, hotelName }: { images: string[], hotelName: string }) {
    const [showModal, setShowModal] = useState(false);
    const [current, setCurrent] = useState(0);
    // Đảm bảo có đủ 5 ảnh cho layout ngoài
    const gallery = [...images];
    while (gallery.length < 5) gallery.push(images[gallery.length % images.length]);

    return (
        <>
            <div className="w-full flex gap-2 mt-2">
                {/* Ảnh lớn bên trái */}
                <div className="w-2/3 relative">
                    <img src={gallery[0]} alt={hotelName} className="w-full h-80 object-cover rounded-xl" />
                </div>
                {/* 4 ảnh nhỏ bên phải */}
                <div className="w-1/3 flex flex-col gap-2">
                    <div className="flex gap-2 h-2/4">
                        <img src={gallery[1]} alt={hotelName + " 2"} className="w-1/2 h-40 object-cover rounded-xl" />
                        <img src={gallery[2]} alt={hotelName + " 3"} className="w-1/2 h-40 object-cover rounded-xl" />
                    </div>
                    <div className="flex gap-2 h-2/4 relative">
                        <img src={gallery[3]} alt={hotelName + " 4"} className="w-1/2 h-40 object-cover rounded-xl" />
                        <div className="w-1/2 h-40 relative">
                            <img src={gallery[4]} alt={hotelName + " 5"} className="w-full h-40 object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center cursor-pointer" onClick={() => { setShowModal(true); setCurrent(0); }}>
                                <span className="text-white font-semibold">Xem tất cả hình ảnh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal gallery */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
                    <button className="absolute top-4 right-8 text-white text-3xl font-bold" onClick={() => setShowModal(false)}>&times;</button>
                    <div className="flex items-center justify-center w-full max-w-2xl relative">
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl px-4" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&#8592;</button>
                        <img src={images[current]} alt={hotelName + current} className="max-h-[60vh] max-w-full rounded-xl mx-auto" />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl px-4" onClick={() => setCurrent((current + 1) % images.length)}>&#8594;</button>
                    </div>
                    <div className="text-white mt-2 mb-4">{current + 1}/{images.length}</div>
                    <div className="flex gap-2 overflow-x-auto max-w-2xl pb-2">
                        {images.map((img, i) => (
                            <img key={i} src={img} alt={hotelName + i} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${i === current ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setCurrent(i)} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
} 
