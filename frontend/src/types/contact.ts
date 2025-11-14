export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface NewsletterData {
    email: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

export interface NewsletterResponse {
    success: boolean;
    message: string;
}