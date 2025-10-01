"use client";

import { useEffect } from "react";
// import Modal from "@/components/Tour/Modal";

declare global {
    interface Window {
        embedpano?: any;
        removepano?: any;
    }
}

interface TourViewerProps {
    xmlUrl: string;
    jsUrl: string;
    baseUrl: string;
    onClose: () => void;
}

export default function TourViewer({ xmlUrl, jsUrl, baseUrl, onClose }: TourViewerProps) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = jsUrl;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            if (window.embedpano) {
                window.embedpano({
                    swf: null,
                    xml: xmlUrl,
                    target: "pano-viewer",
                    base: baseUrl,
                    html5: "only",
                    id: "krpano-tour"
                });
            }
        };
        return () => {
            script.remove();
            if (window.removepano) window.removepano("krpano-tour");
        };
    }, [xmlUrl, jsUrl]);

    return (
        // <Modal onClose={onClose}>
        //     <div id="pano-viewer" style={{ width: '80vw', height: '80vh', maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden', margin: 'auto' }} />
        // </Modal>
        <div id="pano-viewer" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden', zIndex: 100 }} />
    );
} 
