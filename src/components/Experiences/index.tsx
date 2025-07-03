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
                    {/* Experience Card 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh trải nghiệm 1</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Khám phá văn hóa
                            </h3>
                            <p className="text-gray-600">
                                Trải nghiệm văn hóa đa dạng và phong phú của thành phố Hồ Chí Minh
                            </p>
                        </div>
                    </div>

                    {/* Experience Card 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh trải nghiệm 2</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Ẩm thực đường phố
                            </h3>
                            <p className="text-gray-600">
                                Thưởng thức những món ăn ngon và đặc trưng của Sài Gòn
                            </p>
                        </div>
                    </div>

                    {/* Experience Card 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh trải nghiệm 3</div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Du lịch mạo hiểm
                            </h3>
                            <p className="text-gray-600">
                                Khám phá những địa điểm thú vị và hoạt động mạo hiểm
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
