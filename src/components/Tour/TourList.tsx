import { Tour } from "@/types/tour";
import TourCard from "./TourCard";

export default function TourList({ tours }: { tours: Tour[] }) {
    return (
        <div>
            {tours.map((tour) => (
                <TourCard key={tour.tourId} tour={tour} />
            ))}
        </div>
    );
} 
