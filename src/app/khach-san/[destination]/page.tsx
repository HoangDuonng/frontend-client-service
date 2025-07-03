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
    'Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Nha Trang',
    'Phú Quốc',
    'Vũng Tàu',
    'Hạ Long',
    'Đà Lạt',
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
