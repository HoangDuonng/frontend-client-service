"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/layout/backToTop";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <div className="flex flex-1">
                <main className="pt-16 p-4 md:p-8 flex-1 flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 md:ml-52 transition-all duration-300">
                    {children}
                </main>
            </div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default ClientLayout;
