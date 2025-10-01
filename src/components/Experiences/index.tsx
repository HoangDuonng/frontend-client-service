import Link from "next/link";

const experiences = [
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-1.webp",
        alt: "Trải nghiệm 1",
        title: "Khám phá văn hóa",
        description: "Trải nghiệm văn hóa đa dạng và phong phú của thành phố Hồ Chí Minh",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-1",
    },
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-2.webp",
        alt: "Trải nghiệm 2",
        title: "Ẩm thực đường phố",
        description: "Thưởng thức những món ăn ngon và đặc trưng của Sài Gòn",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-2",
    },
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-3.webp",
        alt: "Trải nghiệm 3",
        title: "Du lịch mạo hiểm",
        description: "Khám phá những địa điểm thú vị và hoạt động mạo hiểm",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-3",
    },
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-4.webp",
        alt: "Trải nghiệm 4",
        title: "Little Japan Town",
        description: "Phố Nhật đẹp \"Hú hồn\" thu hút giới trẻ",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-4",
    },
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-5.webp",
        alt: "Trải nghiệm 5",
        title: "Rừng Sác Cần Giờ",
        description: "Điểm đến Hoang Dã đầy hấp dẫn",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-5",
    },
    {
        image: "/images/experience/song-dong-tung-trai-nghiem-6.webp",
        alt: "Trải nghiệm 6",
        title: "Hồ Bán Nguyệt",
        description: "Khám phá nhanh công viên cầu Ánh Sao",
        url: "/tin-tuc/song-dong-tung-trai-nghiem-6",
    },
];

export default function Experiences() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sống động từng trải nghiệm
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Khám phá những trải nghiệm độc đáo và đáng nhớ tại thành phố Hồ Chí Minh
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {experiences.map((exp, idx) => (
                        <Link
                            key={idx}
                            href={exp.url}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                <img src={exp.image} alt={exp.alt} className="object-cover w-full h-full" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{exp.title}</h3>
                                <p className="text-gray-600">{exp.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
} 
