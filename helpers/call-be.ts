import axios, { AxiosInstance } from 'axios';
import { env } from '@/env.mjs';

export function createServerAxios(): AxiosInstance {
    const axiosInstance = axios.create({
        baseURL: env.NEXT_PUBLIC_BACKEND_DOMAIN,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Log lỗi response server-side
            console.error('❌ Server-side response error:', {
                status: error.response?.status,
                url: error.config?.url,
                message: error.message,
                data: error.response?.data,
            });
            return Promise.reject(error);
        }
    );

    return axiosInstance;
} 
