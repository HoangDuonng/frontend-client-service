export interface Footer {
    description: string;
    socials: { type: string; url: string }[];
    quickLinks: { label: string; url: string }[];
    newsletter: {
        title: string;
        description: string;
        placeholder: string;
        buttonLabel: string;
    };
    copyright: string;
}
