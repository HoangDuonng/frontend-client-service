import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsList from '@/components/News/NewsList';
import NewsBanner from '@/components/News/NewsBanner';
import BackToTop from "@/components/layout/backToTop";
import ChatPopup from "@/components/layout/chatPopup";

const mockNews = [
    {
        id: 1,
        slug: 'thanh-pho-ho-chi-minh-lot-vao-danh-sach-25-diem-den-dang-trai-nghiem-nhat-nam-2025-cua-conde-nast-traveler',
        title: 'THÀNH PHỐ HỒ CHÍ MINH ĐƯỢC ĐỀ CỬ TẠI GIẢI THƯỞNG WORLD MICE AWARDS 2025',
        summary: 'Củng cố vị thế điểm đến MICE hàng đầu khu vực.',
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

export default function NewsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
            <Header />
            <NewsBanner />
            <main className="flex-1">
                <NewsList news={mockNews} />
            </main>
            <Footer />
            <BackToTop />
            <ChatPopup />
        </div>
    );
} 
