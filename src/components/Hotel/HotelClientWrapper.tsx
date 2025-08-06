'use client';

import React from 'react';
import Header from "@/components/Header";
import HotelHero from "@/components/Hotel/HotelHero";
import HotelSearch from "@/components/Hotel/HotelSearch";
import HotelPromotions from "@/components/Hotel/HotelPromotions";
import HotelDestinations from "@/components/Hotel/HotelDestinations";
import HotelFeatures from "@/components/Hotel/HotelFeatures";
import HotelFAQ from "@/components/Hotel/HotelFAQ";
import Footer from "@/components/Footer";
import BackToTop from "@/components/layout/backToTop";
import ChatPopup from "@/components/layout/chatPopup";

export default function HotelClientWrapper() {
    return (
        <div className="min-h-screen">
            <Header />
            <HotelHero />
            {/* Đưa search xuống dưới banner */}
            <div className="w-full max-w-6xl mx-auto mb-10 relative z-10 mt-10">
                <HotelSearch />
            </div>
            <HotelPromotions />
            <HotelDestinations />
            <HotelFeatures />
            <HotelFAQ />
            <Footer />
            <BackToTop />
            <ChatPopup />
        </div>
    );
} 
