"use client";
import Image from 'next/image';

const publications = [
    {
        image: '/images/banner/banner-1.webp',
        title: 'Tân Bình - So Near, So Close',
        desc: 'Cẩm nang du lịch khu vực Tân Bình, gần sân bay và trung tâm.'
    },
    {
        image: '/images/banner/banner-2.webp',
        title: 'Xin chào Thành phố Hồ Chí Minh',
        desc: 'Giới thiệu tổng quan về TP.HCM cho du khách lần đầu.'
    },
    {
        image: '/images/banner/banner-3.webp',
        title: 'Heritage Guide "150 quán ngon cho tín đồ mê ẩm thực Sài Gòn"',
        desc: 'Danh sách các quán ăn ngon nổi bật tại Sài Gòn.'
    },
    {
        image: '/images/banner/banner-1.webp',
        title: 'Heritage Guide Thành phố Hồ Chí Minh',
        desc: 'Cẩm nang di sản, điểm đến, văn hóa, lịch sử TP.HCM.'
    },
];

export default function PublicationList() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Ấn phẩm du lịch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {publications.map((pub, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                        <div className="w-full aspect-[16/9] relative mb-4 rounded overflow-hidden">
                            <Image
                                src={pub.image}
                                alt={pub.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center">{pub.title}</h3>
                        <p className="text-center text-muted-foreground mb-2">{pub.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
} 
