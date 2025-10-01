import TourDetailClient from "@/components/Tour/TourDetailClient";

export default async function TourDetailPage({ params }: { params: Promise<{ tourId: string }> }) {
    const resolvedParams = await params;
    return (
        <TourDetailClient tourId={resolvedParams.tourId} />
    );
}

