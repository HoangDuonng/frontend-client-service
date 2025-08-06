import { Banner, HomeImageBanner } from "@/types/banner";

export const bannerService = {
    async getHomeVideoBanner(language: string = 'vi', isActive: boolean = true): Promise<Banner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/home_video_banner?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            // Map API data to Banner[]
            if (Array.isArray(result.data)) {
                return result.data.map((item: any) => ({
                    title: item.content?.title || '',
                    subtitle: '',
                    desc: item.content?.description || '',
                    video: item.content?.url || '',
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching home video banner:', error);
            throw error;
        }
    },
    async getHomeImageBanner(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/home_image_banner?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching home image banner:', error);
            throw error;
        }
    },

    async getHeaderBanner1(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/header_banner_1?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching header banner 1:', error);
            throw error;
        }
    },

    async getHeaderBanner2(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/header_banner_2?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching header banner 2:', error);
            throw error;
        }
    },

    async getHeaderBanner3(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/header_banner_3?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching header banner 3:', error);
            throw error;
        }
    },

    async getHeaderBanner4(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/header_banner_4?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching header banner 4:', error);
            throw error;
        }
    },

    async getHeaderBanner5(language: string = 'vi', isActive: boolean = true): Promise<HomeImageBanner[]> {
        try {
            const response = await fetch(`/api/layouts/banners/position/header_banner_5?language=${language}&isActive=${isActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            if (Array.isArray(result.data)) {
                return result.data
                    .map((item: any) => ({
                        image: item.content?.url || '',
                        caption: item.content?.title || '',
                        order: item.order || 0,
                        buttonText: item.content?.buttonText || '',
                        buttonUrl: item.content?.buttonUrl || '',
                    }))
                    .sort((a: HomeImageBanner, b: HomeImageBanner) => a.order - b.order);
            }
            return [];
        } catch (error) {
            console.error('Error fetching header banner 5:', error);
            throw error;
        }
    },
}; 
