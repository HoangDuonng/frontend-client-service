import { NextRequest, NextResponse } from 'next/server';
import { LoginRequest } from '@/types/user';
import { env } from '@/env.mjs';

const API_AUTH_URL = env.NEXT_PUBLIC_API_AUTH_URL;

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequest = await request.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email và mật khẩu là bắt buộc' },
                { status: 400 }
            );
        }

        const response = await fetch(`${API_AUTH_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });


        // Handle both JSON and plain text responses
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const textData = await response.text();
            console.log('Response text:', textData);
            data = { message: textData };
        }

        if (!response.ok) {
            let vietnameseMessage = 'Đăng nhập thất bại';

            if (data.message) {
                if (data.message.includes('Invalid credentials') || data.message.includes('Bad credentials') ||
                    data.message.includes('Email or password is incorrect') || data.message.includes('Invalid email or password')) {
                    vietnameseMessage = 'Email hoặc mật khẩu không đúng';
                } else if (data.message.includes('User not found')) {
                    vietnameseMessage = 'Tài khoản không tồn tại';
                } else if (data.message.includes('Account is not activated')) {
                    vietnameseMessage = 'Tài khoản chưa được kích hoạt';
                } else if (data.message.includes('Bad Request')) {
                    vietnameseMessage = 'Email hoặc mật khẩu không đúng';
                } else {
                    vietnameseMessage = data.message;
                }
            } else if (response.status === 500) {
                vietnameseMessage = 'Lỗi server, vui lòng thử lại sau';
            } else if (response.status === 401) {
                vietnameseMessage = 'Email hoặc mật khẩu không đúng';
            } else if (response.status === 404) {
                vietnameseMessage = 'Tài khoản không tồn tại';
            }

            return NextResponse.json(
                { success: false, message: vietnameseMessage },
                { status: 200 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Đăng nhập thành công',
            data: data,
        });

    } catch (error) {
        console.error('Login error:', error);

        if (error instanceof TypeError && error.message.includes('fetch')) {
            return NextResponse.json(
                { success: false, message: 'Không thể kết nối đến server, vui lòng thử lại sau' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 200 }
        );
    }
} 
