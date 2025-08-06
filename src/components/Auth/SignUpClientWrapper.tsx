'use client';

import { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ConfigProvider } from 'antd';
import { userService } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpClientWrapper() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ tên là bắt buộc';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Tên đăng nhập là bắt buộc';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất 1 số, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@#$%^&+=)';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (!agreeToTerms) {
            newErrors.terms = 'Bạn vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const firstName = formData.fullName.split(' ')[0] || '';
            const lastName = formData.fullName.split(' ').slice(1).join(' ') || '';

            const response = await userService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                first_name: firstName,
                last_name: lastName,
                phone: formData.phone,
            });

            setSuccessMessage('Đăng ký thành công! Đang chuyển hướng...');

            // Reset form
            setFormData({
                fullName: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
            });

            // Reset checkbox
            setAgreeToTerms(false);

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                router.push('/auth/signin');
            }, 2000);

        } catch (error: any) {
            // Parse backend error and map to specific fields
            const errorMessage = error.message || 'Đăng ký thất bại. Vui lòng thử lại.';

            // Check if error has fieldErrors from API
            if (error.fieldErrors) {
                setErrors(prev => ({ ...prev, ...error.fieldErrors }));
            } else if (errorMessage.includes('Username already exists') || errorMessage.includes('Tên đăng nhập đã tồn tại')) {
                setErrors(prev => ({ ...prev, username: 'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác' }));
                // Focus vào field username
                setTimeout(() => {
                    const usernameInput = document.getElementById('username');
                    if (usernameInput) {
                        usernameInput.focus();
                        usernameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else if (errorMessage.includes('Email already exists') || errorMessage.includes('Email đã được sử dụng')) {
                setErrors(prev => ({ ...prev, email: 'Email đã được sử dụng, vui lòng chọn email khác' }));
                // Focus vào field email
                setTimeout(() => {
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        emailInput.focus();
                        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else if (errorMessage.includes('Mật khẩu không đúng định dạng')) {
                setErrors(prev => ({ ...prev, password: 'Mật khẩu phải chứa ít nhất 1 số, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@#$%^&+=)' }));
            } else if (errorMessage.includes('Số điện thoại không đúng định dạng')) {
                setErrors(prev => ({ ...prev, phone: 'Số điện thoại phải có 10-11 chữ số' }));
            } else if (errorMessage.includes('Email không đúng định dạng')) {
                setErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
            } else if (errorMessage.includes('Họ tên không hợp lệ')) {
                setErrors(prev => ({ ...prev, fullName: 'Họ tên không được để trống' }));
            } else if (errorMessage.includes('Tên đăng nhập không đúng định dạng')) {
                setErrors(prev => ({ ...prev, username: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới' }));
            } else if (errorMessage.includes('Thông tin không hợp lệ')) {
                // Only show general error if no specific field errors
                setErrors(prev => ({
                    ...prev,
                    general: 'Vui lòng kiểm tra lại thông tin đã nhập'
                }));
            } else {
                // For other errors, use the message component
                // message.error(errorMessage);
                setErrors(prev => ({
                    ...prev,
                    general: errorMessage
                }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tooltip: {
                        zIndexPopup: 0,
                    },
                },
            }}
        >
            <div className="min-h-screen relative flex" style={{ isolation: 'isolate' }}>
                {/* Full Screen Background Image - Fixed */}
                <div className="fixed inset-0">
                    <Image
                        src="/images/signin-signup.webp"
                        alt="Du lịch Việt Nam"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Gradient Overlay - chìm dưới và sáng dần từ trái qua phải */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

                    {/* Decorative Elements */}
                    <div className="absolute inset-0">
                        {/* Curved Line */}
                        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 400 600" fill="none">
                            <path
                                d="M 350 50 Q 300 150 320 300 Q 340 450 280 550"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                opacity="0.4"
                            />
                        </svg>

                        {/* Logo */}
                        <div className="absolute bottom-8 right-8">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">VN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Overlay */}
                <div className="relative z-10 w-full max-w-md ml-8 lg:ml-16 mt-20">
                    <div className="p-8 lg:p-12 min-h-[800px]">
                        {/* Header */}
                        <div className="mb-12">
                            <Link
                                href="/"
                                className="inline-flex items-center text-white hover:text-blue-200 mb-8 transition-colors"
                            >
                                <FiArrowLeft className="mr-2" />
                                Quay lại trang chủ
                            </Link>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Tạo tài khoản mới
                                <span className="text-blue-400">.</span>
                            </h1>
                            <p className="text-gray-200">
                                Đã có tài khoản?{' '}
                                <Link href="/auth/signin" className="text-blue-300 hover:text-blue-200 font-medium">
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            {successMessage && (
                                <div className="bg-green-500/20 border border-green-400 rounded-lg p-3">
                                    <p className="text-green-400 text-sm flex items-center">
                                        <span className="mr-2">✅</span>
                                        {successMessage}
                                    </p>
                                </div>
                            )}
                            {errors.general && !errors.username && !errors.email && !errors.password && !errors.phone && !errors.fullName && !errors.terms && (
                                <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
                                    <p className="text-red-400 text-sm flex items-center">
                                        <span className="mr-2">⚠</span>
                                        {errors.general}
                                    </p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4 h-24">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                                        Họ
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.fullName.split(' ')[0] || ''}
                                            onChange={(e) => {
                                                const lastName = formData.fullName.split(' ').slice(1).join(' ');
                                                setFormData(prev => ({
                                                    ...prev,
                                                    fullName: `${e.target.value} ${lastName}`.trim()
                                                }));
                                            }}
                                            autoComplete="given-name"
                                            className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.fullName ? 'border-red-400' : 'border-white/30'}`}
                                            placeholder="Họ"
                                        />
                                        <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                    </div>
                                    {errors.fullName && (
                                        <p className="text-red-400 text-xs mt-1 flex items-center">
                                            <span className="mr-1">⚠</span>
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                                        Tên
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.fullName.split(' ').slice(1).join(' ') || ''}
                                            onChange={(e) => {
                                                const firstName = formData.fullName.split(' ')[0] || '';
                                                setFormData(prev => ({
                                                    ...prev,
                                                    fullName: `${firstName} ${e.target.value}`.trim()
                                                }));
                                            }}
                                            autoComplete="family-name"
                                            className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.fullName ? 'border-red-400' : 'border-white/30'}`}
                                            placeholder="Tên"
                                        />
                                        <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                    </div>
                                    {errors.fullName && (
                                        <p className="text-red-400 text-xs mt-1 flex items-center">
                                            <span className="mr-1">⚠</span>
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={`h-24 ${errors.username ? 'animate-pulse' : ''}`}>
                                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                                    Tên đăng nhập
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        autoComplete="username"
                                        className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.username ? 'border-red-400 ring-2 ring-red-400' : 'border-white/30'}`}
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                    <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                </div>
                                {errors.username && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div className={`h-24 ${errors.email ? 'animate-pulse' : ''}`}>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.email ? 'border-red-400 ring-2 ring-red-400' : 'border-white/30'}`}
                                        placeholder="Nhập email của bạn"
                                    />
                                    <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="h-24">
                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                    Số điện thoại
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        autoComplete="tel"
                                        className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.phone ? 'border-red-400' : 'border-white/30'}`}
                                        placeholder="Nhập số điện thoại"
                                    />
                                    <FiPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="h-24">
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoComplete="new-password"
                                        className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.password ? 'border-red-400' : 'border-white/30'}`}
                                        placeholder="Tạo mật khẩu"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.password}
                                    </p>
                                )}
                                <p className="text-xs text-gray-300 mt-1">
                                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm: số, chữ hoa, chữ thường và ký tự đặc biệt (@#$%^&+=)
                                </p>
                            </div>

                            <div className="h-24">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                    Xác nhận mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        autoComplete="new-password"
                                        className={`w-full px-4 py-4 bg-white/20 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 ${errors.confirmPassword ? 'border-red-400' : 'border-white/30'}`}
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1 flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeToTerms}
                                    onChange={(e) => {
                                        setAgreeToTerms(e.target.checked);
                                        if (errors.terms) {
                                            setErrors(prev => ({ ...prev, terms: '' }));
                                        }
                                    }}
                                    className={`mt-1 rounded border-white/30 bg-white/20 text-blue-400 focus:ring-blue-400 focus:ring-offset-transparent ${errors.terms ? 'border-red-400' : ''}`}
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-200">
                                    Tôi đồng ý với{' '}
                                    <Link href="/terms" className="text-blue-300 hover:text-blue-200">
                                        Điều khoản sử dụng
                                    </Link>{' '}
                                    và{' '}
                                    <Link href="/privacy" className="text-blue-300 hover:text-blue-200">
                                        Chính sách bảo mật
                                    </Link>
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-red-400 text-xs mt-1 flex items-center">
                                    <span className="mr-1">⚠</span>
                                    {errors.terms}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-500/80 backdrop-blur-sm text-white py-4 px-6 rounded-lg hover:bg-blue-600/80 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg border border-white/20"
                            >
                                {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </ConfigProvider>
    );
} 
