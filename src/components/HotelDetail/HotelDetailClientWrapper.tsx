"use client";

import React, { useEffect, useState } from "react";
import OverviewSection from "./OverviewSection";
import TabClientWrapper from "./TabClientWrapper";
import ChatPopup from "@/components/layout/chatPopup";
import BackToTop from "@/components/layout/backToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DEFAULT_HOTEL = {
    name: "Khách sạn không tên",
    address: "Địa chỉ chưa cập nhật",
    rating: 8.0,
    stars: 3,
    reviews: 0,
    tags: ["Wifi miễn phí", "Ăn sáng", "Hồ bơi"],
    price: 1000000,
    images: [
        "/images/banner/banner-1.webp",
        "/images/banner/banner-2.webp",
        "/images/banner/banner-3.webp",
    ],
};

const ROOMS = [
    {
        name: "Deluxe Twin",
        price: 2500000,
        image: "/images/banner/banner-1.webp",
        description: "Phòng 2 giường đơn, diện tích 28m², view thành phố, bao gồm ăn sáng.",
        facilities: ["Wifi miễn phí", "Điều hòa", "Tủ lạnh", "Bồn tắm"],
        refundable: true,
        payAtHotel: true,
    },
    {
        name: "Executive Suite",
        price: 4200000,
        image: "/images/banner/banner-2.webp",
        description: "Phòng suite cao cấp, diện tích 45m², view sông, bao gồm ăn sáng.",
        facilities: ["Wifi miễn phí", "Điều hòa", "Bồn tắm", "Két sắt"],
        refundable: false,
        payAtHotel: true,
    },
];

const HOTEL_POLICIES = [
    { title: "Nhận phòng", content: "Từ 14:00 mỗi ngày." },
    { title: "Trả phòng", content: "Trước 12:00 trưa." },
    { title: "Chính sách hủy", content: "Hủy miễn phí trước 24h nhận phòng đối với một số loại phòng." },
    { title: "Thanh toán", content: "Chấp nhận tiền mặt, thẻ tín dụng, chuyển khoản." },
];

const HOTEL_FACILITIES = [
    "Wifi miễn phí",
    "Hồ bơi",
    "Nhà hàng",
    "Lễ tân 24h",
    "Chỗ đậu xe",
    "Thang máy",
    "Điều hòa",
    "Dịch vụ phòng",
];

export default function HotelDetailClientWrapper({ slug }: { slug: string }) {
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/hotels/slug/${slug}`)
            .then(res => res.json())
            .then(data => {
                const apiHotel = data.data;
                // Map các trường từ API về đúng format FE, ưu tiên API, thiếu thì fallback FE
                const mappedHotel = {
                    name: apiHotel?.displayName || DEFAULT_HOTEL.name,
                    address: apiHotel?.region || DEFAULT_HOTEL.address,
                    rating: apiHotel?.userRating ? Number(apiHotel.userRating) : DEFAULT_HOTEL.rating,
                    stars: apiHotel?.starRating ? Number(apiHotel.starRating) : DEFAULT_HOTEL.stars,
                    reviews: apiHotel?.numReviews ? Number(apiHotel.numReviews) : DEFAULT_HOTEL.reviews,
                    tags: apiHotel?.hotelFeatures?.length ? apiHotel.hotelFeatures : DEFAULT_HOTEL.tags,
                    price: apiHotel?.price ? Number(apiHotel.price) : DEFAULT_HOTEL.price,
                    images: apiHotel?.imageUrls?.length ? apiHotel.imageUrls : DEFAULT_HOTEL.images,
                    // Có thể bổ sung các trường khác nếu cần
                };
                setHotel(mappedHotel);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!hotel) return <div>Không tìm thấy khách sạn</div>;

    return (
        <>
            <Header transparentByDefault={false} />
            <div className="container mx-auto py-8 px-4">
                <OverviewSection hotel={hotel} />
                <TabClientWrapper
                    hotel={hotel}
                    rooms={ROOMS}
                    facilities={hotel.tags || HOTEL_FACILITIES}
                    policies={HOTEL_POLICIES}
                />
            </div>
            <ChatPopup />
            <BackToTop />
            <Footer />
        </>
    );
} 
