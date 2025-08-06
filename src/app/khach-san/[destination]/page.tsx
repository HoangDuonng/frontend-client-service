import React from 'react';
import { notFound } from 'next/navigation';
import HotelDestinationClient from '@/components/Hotel/HotelDestinationClient';

function slugify(str: string) {
    return str
        .normalize('NFD')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

const DESTINATIONS = [
    'Phường Sài Gòn',
    'Phường Nhiêu Lộc',
    'Phường Chợ Lớn',
    'Phường Phú Mỹ',
    'Phường 22',
    'Phường Phú Nhuận',
    'Phường Bảy Hiền',
    'Phường Thủ Đức',
];

export default function DestinationPage({ params }: { params: { destination: string } }) {
    const paramSlug = slugify(decodeURIComponent(params.destination));
    const found = DESTINATIONS.find(d => slugify(d) === paramSlug);
    if (!found) {
        notFound();
    }
    const destinationName = found;
    return <HotelDestinationClient destinationName={destinationName} />;
} 
