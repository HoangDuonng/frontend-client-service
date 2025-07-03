"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return visible ? (
        <button
            onClick={scrollToTop}
            className="fixed items-center justify-center bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-400 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 flex"
            aria-label="Back to top"
        >
            <FaArrowUp className="w-5 h-5" />
        </button>
    ) : null;
};

export default BackToTop;
