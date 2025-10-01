export interface HeaderData {
    logo?: {
        url: string;
        alt?: string;
    };
    navigation?: Array<{
        title: string;
        href: string;
    }>;
    languages?: Array<{
        value: string;
        label: string;
    }>;
}

export const headerService = {
    async getHeaderData(language: string = 'vi'): Promise<HeaderData> {
        try {
            const response = await fetch(`/api/header?language=${language}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching header data:', error);
            throw error;
        }
    },
};
