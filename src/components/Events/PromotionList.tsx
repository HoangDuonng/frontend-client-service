"use client";

interface PromotionListProps {
    promotions: string[];
}
export default function PromotionList({ promotions }: PromotionListProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Các ưu đãi liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {promotions.map((promo, idx) => (
                    <div key={idx} className="bg-primary/10 rounded-lg p-6 text-center">{promo}</div>
                ))}
            </div>
        </section>
    );
} 
