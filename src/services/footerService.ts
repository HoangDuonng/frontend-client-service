import { Footer } from "@/types/footer";

export const footerService = {
    async getFooter(language: string = 'vi'): Promise<Footer> {
        try {
            const response = await fetch(`/api/footer?language=${language}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const result = await response.json();
            if (result.fallback) return result.data;
            return result.data || result;
        } catch (error) {
            console.error('Error fetching footer:', error);
            throw error;
        }
    },
}; 
