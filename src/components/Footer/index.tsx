import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <a href="/">
                                <img src="/images/logo.svg" alt="Logo" className="h-10" />
                            </a>
                        </div>
                        <p className="text-foreground mb-6 max-w-md">
                            Khám phá vẻ đẹp và sự sôi động của thành phố Hồ Chí Minh - nơi hội tụ của văn hóa,
                            ẩm thực và những trải nghiệm độc đáo.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="Facebook">
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="Instagram">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="YouTube">
                                <FaYoutube className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-primary hover:text-accent transition-colors" aria-label="Twitter">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-foreground hover:text-primary transition-colors">Trang chủ</a></li>
                            <li><a href="#" className="text-foreground hover:text-primary transition-colors">Khám phá</a></li>
                            <li><a href="#" className="text-foreground hover:text-primary transition-colors">Sự kiện</a></li>
                            <li><a href="#" className="text-foreground hover:text-primary transition-colors">Thông tin</a></li>
                            <li><a href="#" className="text-foreground hover:text-primary transition-colors">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
                        <p className="text-foreground mb-4 ">
                            Nhận những câu chuyện du lịch mới từ thành phố Hồ Chí Minh đến hộp thư của bạn.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="flex-1 px-4 py-2 rounded-l-lg text-foreground focus:outline-none"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg hover:bg-accent transition-colors">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-border mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-foreground text-sm md:mb-0">
                            © Hoang Duong. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 
