import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from "@/components/layout/backToTop";
import ChatPopup from "@/components/layout/chatPopup";
import Link from 'next/link';

const mockNews = [
    {
        id: 1,
        slug: 'thanh-pho-ho-chi-minh-lot-vao-danh-sach-25-diem-den-dang-trai-nghiem-nhat-nam-2025-cua-conde-nast-traveler',
        title: 'Thành phố Hồ Chí Minh lọt vào danh sách "25 Điểm đến đáng trải nghiệm nhất năm 2025" của Condé Nast Traveler',
        summary: 'Thành phố Hồ Chí Minh vừa xuất sắc ghi danh vào danh sách "25 Best Places to Go in 2025 - 25 Điểm đến đáng trải nghiệm nhất năm 2025" của tạp chí du lịch danh tiếng Condé Nast Traveler, tự hào là điểm đến châu Á duy nhất lọt vào Top 10. Thành tích này không chỉ khẳng định vị thế của Thành phố trên bản đồ du lịch thế giới mà còn phản ánh sức hút đến từ sự kết hợp hài hòa giữa truyền thống và hiện đại.\n\nTheo đánh giá của các chuyên gia, Thành phố Hồ Chí Minh là "một trong những trung tâm du lịch phát triển nhanh nhất thế giới". Năm 2025, nhân kỷ niệm 50 năm thống nhất đất nước, Thành phố dự kiến tổ chức loạt sự kiện và triển lãm đặc sắc, là dịp để du khách tìm hiểu chiều sâu lịch sử Việt Nam, từ dấu ấn chiến tranh đến hành trình đổi mới và phát triển vượt bậc.\n\nKhông chỉ dừng lại ở các sự kiện, Thành phố Hồ Chí Minh còn mang đến những bước tiến vượt bậc trong hạ tầng du lịch. Việc khai trương nhà ga số 3 tại sân bay Tân Sơn Nhất và tuyến metro đầu tiên sẽ nâng cao đáng kể trải nghiệm di chuyển của du khách. Bên cạnh đó, các khách sạn mới như Hotel Indigo và Kempinski Saigon River – với thiết kế tinh tế từ kiến trúc sư Kengo Kuma – cùng sự nâng cấp của Sheraton Saigon Grand Opera, mang lại không gian nghỉ dưỡng đẳng cấp quốc tế.\n\nVề ẩm thực, Thành phố Hồ Chí Minh tiếp tục khẳng định danh tiếng với nhà hàng Anan Saigon – nơi đầu tiên tại Việt Nam được trao sao Michelin, cùng với sự sáng tạo không ngừng của đầu bếp Peter Cuong Franklin qua nhà hàng Pot Au Pho, chuyên phục vụ phở theo phong cách độc đáo.\n\nThành phố Hồ Chí Minh không chỉ là một điểm đến, mà còn là hành trình khám phá đầy cảm hứng, nơi du khách có thể cảm nhận trọn vẹn nhịp sống sôi động và sức sống mãnh liệt của một đô thị đang vươn mình ra thế giới. Hãy để năm 2025 trở thành dấu ấn đáng nhớ trong hành trình du lịch của bạn tại Thành phố năng động và cuốn hút bậc nhất Việt Nam!',
        image: '/images/banner/banner-1.webp',
        date: '2024-06-01',
    },
    {
        id: 2,
        slug: 'chinh-phuc-vi-giac-voi-cac-nha-hang-michelin-tai-tphcm',
        title: 'Chinh phục vị giác với các nhà hàng Michelin tại TP.HCM',
        summary: 'Khám phá các nhà hàng đạt sao Michelin tại thành phố.',
        image: '/images/banner/banner-2.webp',
        date: '2024-05-28',
    },
    {
        id: 3,
        slug: 'hoi-nghi-chinh-quyen-dia-phuong-va-khu-vuc-dong-a-lan-thu-14',
        title: 'THÔNG CÁO BÁO CHÍ: HỘI NGHỊ CHÍNH QUYỀN ĐỊA PHƯƠNG VÀ KHU VỰC ĐÔNG Á LẦN THỨ 14',
        summary: 'Sự kiện nổi bật trong khu vực Đông Á.',
        image: '/images/banner/banner-3.webp',
        date: '2024-05-20',
    },
];

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
    const news = mockNews.find(n => n.slug === params.slug);
    if (!news) return notFound();

    return (
        <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
            <Header transparentByDefault={false} />
            {/* Breadcrumb */}
            <div className="pt-24">
                <nav className="max-w-3xl mx-auto px-4 md:px-0 py-2 text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/tin-tuc" className="hover:underline text-primary">Tin tức</Link>
                    <span>/</span>
                    <span className="truncate" title={news.title}>{news.title}</span>
                </nav>
            </div>
            <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-0">
                <div className="mb-8">
                    <Image src={news.image} alt={news.title} width={800} height={400} className="rounded-xl object-cover w-full h-64 md:h-80" />
                </div>
                <div className="mb-4 text-xs text-gray-500">{new Date(news.date).toLocaleDateString('vi-VN')}</div>
                <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#1565c0]">{news.title}</h1>
                <div className="text-gray-800 text-lg whitespace-pre-line mb-8 text-justify">{news.summary}</div>
            </div>
            <Footer />
            <BackToTop />
            <ChatPopup />
        </div>
    );
} 
