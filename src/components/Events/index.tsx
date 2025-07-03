export default function Events() {
    const months = [
        '01/2025', '02/2025', '03/2025', '04/2025', '05/2025', '06/2025',
        '07/2025', '08/2025', '09/2025', '10/2025', '11/2025', '12/2025'
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sắc màu lễ hội và sự kiện
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Khám phá những sự kiện và lễ hội đặc sắc diễn ra quanh năm
                    </p>
                </div>

                {/* Month Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {months.map((month, index) => (
                        <button
                            key={index}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${index === 0
                                    ? 'bg-blue-400 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Event Card 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh sự kiện 1</div>
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-blue-600 font-medium mb-2">15/01/2025</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Lễ hội hoa xuân
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Khám phá vẻ đẹp của những loài hoa đặc trưng mùa xuân
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Xem chi tiết →
                            </button>
                        </div>
                    </div>

                    {/* Event Card 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh sự kiện 2</div>
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-blue-600 font-medium mb-2">20/02/2025</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Festival ẩm thực
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Thưởng thức những món ăn ngon từ khắp các vùng miền
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Xem chi tiết →
                            </button>
                        </div>
                    </div>

                    {/* Event Card 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-gray-500 text-lg">Hình ảnh sự kiện 3</div>
                        </div>
                        <div className="p-6">
                            <div className="text-sm text-blue-600 font-medium mb-2">10/03/2025</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Marathon quốc tế
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tham gia giải chạy marathon lớn nhất Việt Nam
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Xem chi tiết →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
