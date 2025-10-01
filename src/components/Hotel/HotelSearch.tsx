'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUsers, FaBed } from 'react-icons/fa';
import { format, addDays } from 'date-fns';

type HotelSearchProps = {
    defaultCheckIn?: string;
    defaultCheckOut?: string;
};

const today = format(new Date(), "yyyy-MM-dd");
const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

export default function HotelSearch(props: HotelSearchProps) {
    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: today,
        checkOut: tomorrow,
        guests: 1,
        rooms: 1
    });

    useEffect(() => {
        if (props.defaultCheckIn) setSearchData(data => ({ ...data, checkIn: props.defaultCheckIn! }));
        if (props.defaultCheckOut) setSearchData(data => ({ ...data, checkOut: props.defaultCheckOut! }));
    }, [props.defaultCheckIn, props.defaultCheckOut]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search data:', searchData);
    };

    return (
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-xl p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Destination */}
                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thành phố, địa điểm hoặc tên khách sạn
                    </label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Bạn muốn đi đâu?"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchData.destination}
                            onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                        />
                    </div>
                </div>

                {/* Check-in Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhận phòng
                    </label>
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchData.checkIn}
                            onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                        />
                    </div>
                </div>

                {/* Check-out Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trả phòng
                    </label>
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchData.checkOut}
                            onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                        />
                    </div>
                </div>

                {/* Guests and Rooms */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Khách và Phòng
                    </label>
                    <div className="relative">
                        <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchData.guests}
                            onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num} khách</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-300 text-lg"
                >
                    Tìm khách sạn
                </button>
            </div>

            {/* Payment Option */}
            <div className="mt-4 text-center">
                <label className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" />
                    <span>Thanh Toán Tại Khách Sạn</span>
                </label>
            </div>
        </form>
    );
} 
