"use client";
import Image from 'next/image';

export default function CityInfo() {
    return (
        <section className="mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-primary">Về Thành phố Hồ Chí Minh</h2>
                <p className="text-muted-foreground text-lg mb-2">
                    Thành phố Hồ Chí Minh là đô thị trẻ bởi lịch sử hình thành và phát triển chỉ mới hơn 300 năm. Được biết đến nhiều với tên gọi Sài Gòn, Thành phố sôi động này được ví như "Hòn ngọc Viễn Đông" bởi những công trình kiến trúc di sản quyến rũ, không khí năng động, sôi động, náo nhiệt và con người thân thiện. Đây là những đặc điểm giúp Thành phố Hồ Chí Minh trở thành một điểm đến thu hút với du khách trong nước và quốc tế.
                </p>
            </div>
            <div className="flex-1 flex justify-center">
                <Image src="/images/hero/hero-2.webp" alt="TP.HCM" width={400} height={260} className="rounded-xl shadow object-cover" />
            </div>
        </section>
    );
} 
