"use client";
import React from "react";

export default function RoomListSection({ rooms }: { rooms: any[] }) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Danh sách phòng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room, idx) => (
                    <div key={idx} className="border rounded-xl p-4 flex gap-4 bg-white shadow">
                        <img src={room.image} alt={room.name} className="w-32 h-32 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                                <div className="text-gray-600 text-sm mb-1">{room.description}</div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {room.facilities.map((f: string, i: number) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{f}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-lg font-bold text-green-600">{room.price.toLocaleString()} VND / đêm</span>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">Chọn phòng</button>
                            </div>
                            <div className="flex gap-2 mt-2 text-xs">
                                {room.refundable && <span className="text-green-600">Hủy miễn phí</span>}
                                {room.payAtHotel && <span className="text-blue-600">Thanh toán tại khách sạn</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 
