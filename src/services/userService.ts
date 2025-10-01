import { UserRegistrationRequest, UserRegistrationResponse, LoginRequest, LoginResponse } from '@/types/user';

export const userService = {
    async register(userData: UserRegistrationRequest): Promise<UserRegistrationResponse> {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                const error = new Error(data.message || 'Đăng ký thất bại');
                (error as any).fieldErrors = data.fieldErrors;
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    async login(loginData: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Đăng nhập thất bại');
            }

            return data.data;
        } catch (error) {
            throw error;
        }
    },
}; 
