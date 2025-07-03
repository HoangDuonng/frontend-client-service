"use client";

export default function SupportStation() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Trạm Thông tin & Hỗ trợ Khách Du lịch</h2>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Cung cấp ấn phẩm đa ngôn ngữ, cẩm nang du lịch và bản đồ.</li>
                <li>Hỗ trợ đặt tour, vé tàu, ăn tối du ngoạn trên sông…</li>
                <li>Hỗ trợ thông tin về lưu trú và dịch vụ liên quan.</li>
                <li>Wifi miễn phí, màn hình cảm ứng, trụ sạc điện thoại.</li>
                <li>Hỗ trợ giải quyết vấn đề về an toàn du lịch.</li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="font-semibold">Địa chỉ:</div>
                    <div>Công viên 23/9, Góc đường Phạm Ngũ Lão và Đề Thám, Quận 1</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="font-semibold">Giờ hoạt động:</div>
                    <div>8:00 - 20:30 (tất cả các ngày trong tuần)</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="font-semibold">Điện thoại:</div>
                    <div>(+8428) 3920 3040</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="font-semibold">Email:</div>
                    <div>hotline@visithcmc.vn</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="font-semibold">Đường dây nóng:</div>
                    <div>1087 (miễn phí, 24/7)</div>
                </div>
            </div>
        </section>
    );
} 
