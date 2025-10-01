export default function Share() {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Góc chia sẻ
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                    Hãy cùng chia sẻ những khoảnh khắc #VibrantHoChiMinhCity của bạn!
                </p>

                {/* Social Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Instagram Feed Placeholder */}
                    <div className="bg-white bg-opacity-20 rounded-lg p-6">
                        <div className="text-4xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold mb-3">Instagram</h3>
                        <p className="mb-4">Theo dõi những khoảnh khắc đẹp nhất</p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Theo dõi
                        </button>
                    </div>

                    {/* Facebook Feed Placeholder */}
                    <div className="bg-white bg-opacity-20 rounded-lg p-6">
                        <div className="text-4xl mb-4">📘</div>
                        <h3 className="text-xl font-semibold mb-3">Facebook</h3>
                        <p className="mb-4">Kết nối với cộng đồng du lịch</p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Tham gia
                        </button>
                    </div>

                    {/* TikTok Feed Placeholder */}
                    <div className="bg-white bg-opacity-20 rounded-lg p-6">
                        <div className="text-4xl mb-4">🎵</div>
                        <h3 className="text-xl font-semibold mb-3">TikTok</h3>
                        <p className="mb-4">Khám phá những video ngắn thú vị</p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Khám phá
                        </button>
                    </div>
                </div>

                {/* Hashtag Section */}
                <div className="bg-white bg-opacity-20 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Chia sẻ trải nghiệm của bạn</h3>
                    <div className="text-3xl font-bold text-yellow-300 mb-4">
                        #VibrantHoChiMinhCity
                    </div>
                    <p className="text-lg mb-6">
                        Tag chúng tôi trong những bức ảnh và video của bạn để có cơ hội xuất hiện trên trang chủ!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                            Chia sẻ ngay
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-colors">
                            Xem gallery
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
} 
