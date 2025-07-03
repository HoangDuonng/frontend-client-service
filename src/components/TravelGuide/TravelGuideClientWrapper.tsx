"use client";

import GuideBanner from './GuideBanner';
import CityInfo from './CityInfo';
import FAQ from './FAQ';
import SupportStation from './SupportStation';
import PublicationList from './PublicationList';

export default function TravelGuideClientWrapper() {
    return (
        <main className="mx-auto">
            <GuideBanner />
            <div className="container mx-auto px-4">
                <CityInfo />
                <FAQ />
                <SupportStation />
                <PublicationList />
            </div>
        </main>
    );
} 
