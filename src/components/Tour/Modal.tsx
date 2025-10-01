import { ReactNode } from "react";

export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-60">
            <div className="relative bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col">
                <button
                    className="absolute top-2 right-2 text-black text-2xl font-bold z-10"
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ✖️
                </button>
                {children}
            </div>
        </div>
    );
} 
