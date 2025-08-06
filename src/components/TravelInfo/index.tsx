export default function TravelInfo() {
    const travelTips = [
        {
            title: "Thời tiết",
            description: "Khám phá thông tin thời tiết và thời điểm tốt nhất để du lịch",
            icon: "🌤️"
        },
        {
            title: "Phương tiện",
            description: "Hướng dẫn di chuyển và các phương tiện công cộng",
            icon: "🚌"
        },
        {
            title: "Lưu trú",
            description: "Gợi ý các khách sạn và nơi lưu trú phù hợp",
            icon: "🏨"
        },
        {
            title: "Ẩm thực",
            description: "Những món ăn đặc trưng và địa điểm ăn uống nổi tiếng",
            icon: "🍜"
        },
        {
            title: "Văn hóa",
            description: "Tìm hiểu về văn hóa và phong tục tập quán địa phương",
            icon: "🏛️"
        },
        {
            title: "An toàn",
            description: "Những lưu ý về an toàn và sức khỏe khi du lịch",
            icon: "🛡️"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Thông tin du lịch cần biết
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Những thông tin hữu ích giúp bạn có chuyến du lịch hoàn hảo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {travelTips.map((tip, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">{tip.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {tip.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {tip.description}
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Tìm hiểu thêm →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 
