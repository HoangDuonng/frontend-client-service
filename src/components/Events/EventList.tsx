"use client";
import Image from 'next/image';

interface Event {
    title: string;
    date: string;
    image: string;
    desc: string;
}
interface EventListProps {
    events: Event[];
    onDetail?: (event: Event) => void;
}
export default function EventList({ events, onDetail }: EventListProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Sự kiện nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <Image src={event.image} alt={event.title} width={320} height={180} className="rounded mb-4 object-cover w-full h-[180px]" />
                        <h3 className="text-lg font-bold mb-2 text-center">{event.title}</h3>
                        <div className="text-sm text-muted-foreground mb-2">{event.date}</div>
                        <p className="text-center text-muted-foreground mb-2">{event.desc}</p>
                        <button className="mt-auto px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition" onClick={() => onDetail?.(event)}>Xem chi tiết</button>
                    </div>
                ))}
            </div>
        </section>
    );
} 
