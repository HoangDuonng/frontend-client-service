"use client";
import Image from 'next/image';

export default function CityInfo() {
    return (
        <section className="mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-primary">Về Thành phố Hồ Chí Minh</h2>
                <p className="text-muted-foreground text-lg mb-2 text-justify">
                    Thành phố Hồ Chí Minh là đô thị trẻ bởi lịch sử hình thành và phát triển chỉ mới hơn 300 năm. Được biết đến nhiều với tên gọi Sài Gòn, Thành phố sôi động này được ví như "Hòn ngọc Viễn Đông" bởi những công trình kiến trúc di sản quyến rũ, không khí năng động, sôi động, náo nhiệt và con người thân thiện. Đây là những đặc điểm giúp Thành phố Hồ Chí Minh trở thành một điểm đến thu hút với du khách trong nước và quốc tế.
                </p>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-xs aspect-[4/3]">
                    <Image
                        src="/images/hero/uy-ban-nhan-dan.webp"
                        alt="TP.HCM"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                        className="rounded-xl shadow object-cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
        </section>
    );
} 
