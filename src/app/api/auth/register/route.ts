import { NextRequest, NextResponse } from 'next/server';
import { UserRegistrationRequest } from '@/types/user';
import { env } from '@/env.mjs';

const API_USER_URL = env.NEXT_PUBLIC_API_USER_URL;

export async function POST(request: NextRequest) {
    try {
        const body: UserRegistrationRequest = await request.json();

        // Validate required fields
        const { username, email, password, fullName, first_name, last_name, phone } = body;

        if (!username || !email || !password || !fullName || !first_name || !last_name || !phone) {
            return NextResponse.json(
                { success: false, message: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        // Call backend API
        const response = await fetch(`${API_USER_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                fullName,
                first_name,
                last_name,
                phone,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Map backend error messages to Vietnamese
            let vietnameseMessage = 'Đăng ký thất bại';
            let fieldErrors: Record<string, string> = {};

            if (data.message) {
                if (data.message.includes('username') && data.message.includes('already exists')) {
                    vietnameseMessage = 'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác';
                    fieldErrors.username = 'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác';
                } else if ((data.message.includes('email') && data.message.includes('already exists')) || data.message.includes('Email already exists')) {
                    vietnameseMessage = 'Email đã được sử dụng, vui lòng chọn email khác';
                    fieldErrors.email = 'Email đã được sử dụng, vui lòng chọn email khác';
                } else if (data.message.includes('Validation failed')) {
                    // Parse validation errors from backend
                    if (data.message.includes('password')) {
                        if (data.message.includes('Pattern')) {
                            vietnameseMessage = 'Mật khẩu không đúng định dạng';
                            fieldErrors.password = 'Mật khẩu phải chứa ít nhất 1 số, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (@#$%^&+=)';
                        }
                    } else if (data.message.includes('phone')) {
                        if (data.message.includes('Pattern')) {
                            vietnameseMessage = 'Số điện thoại không đúng định dạng';
                            fieldErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
                        }
                    } else if (data.message.includes('email')) {
                        if (data.message.includes('Pattern')) {
                            vietnameseMessage = 'Email không đúng định dạng';
                            fieldErrors.email = 'Email không hợp lệ';
                        }
                    } else if (data.message.includes('fullName')) {
                        vietnameseMessage = 'Họ tên không hợp lệ';
                        fieldErrors.fullName = 'Họ tên không được để trống';
                    } else if (data.message.includes('username')) {
                        if (data.message.includes('Pattern')) {
                            vietnameseMessage = 'Tên đăng nhập không đúng định dạng';
                            fieldErrors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
                        }
                    } else {
                        vietnameseMessage = 'Thông tin không hợp lệ';
                    }
                } else {
                    vietnameseMessage = data.message;
                }
            }

            return NextResponse.json(
                {
                    success: false,
                    message: vietnameseMessage,
                    fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Đăng ký thành công',
            data: data.data || data,
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: 'Lỗi server' },
            { status: 500 }
        );
    }
} 
