export default function Partners() {
    const partners = [
        { name: "Đối tác 1", logo: "🏢" },
        { name: "Đối tác 2", logo: "🏭" },
        { name: "Đối tác 3", logo: "🏪" },
        { name: "Đối tác 4", logo: "🏨" },
        { name: "Đối tác 5", logo: "✈️" },
        { name: "Đối tác 6", logo: "🚌" }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Đối tác
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Những đối tác tin cậy đồng hành cùng chúng tôi
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {partners.map((partner, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-gray-100 rounded-lg p-8 mb-4 hover:bg-gray-200 transition-colors">
                                <div className="text-4xl mb-2">{partner.logo}</div>
                                <div className="text-sm text-gray-600">{partner.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Become Partner */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">
                            Trở thành đối tác
                        </h3>
                        <p className="text-lg mb-6">
                            Bạn muốn hợp tác với chúng tôi? Hãy liên hệ để tìm hiểu thêm về cơ hội hợp tác.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Liên hệ ngay
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
} 
