import axios from 'axios';
import { env } from '@/env.mjs';

const axiosFe = axios.create({
    baseURL: env.NEXT_PUBLIC_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosFe.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log lỗi ra console
        console.error('❌ Client-side response error:', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
        });
        return Promise.reject(error);
    }
);

export default axiosFe; 
