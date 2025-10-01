export interface Banner {
    title: string;
    subtitle: string;
    desc: string;
    video: string;
}

export interface HomeImageBanner {
    image: string;
    caption: string;
    order: number;
    buttonText?: string;
    buttonUrl?: string;
}
