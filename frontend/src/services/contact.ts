import { apiClient } from '@/lib/api';
import type { ContactFormData, ContactResponse, NewsletterData, NewsletterResponse } from '@/types/contact';
import { mockContactSubmissionResponse, mockNewsletterSubscriptionResponse } from '@/data/contactData';

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        return mockContactSubmissionResponse;
    }

    const response = await apiClient.post<ContactResponse>('/api/contact', data);
    return response.data;
};

export const subscribeToNewsletter = async (data: NewsletterData): Promise<NewsletterResponse> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockNewsletterSubscriptionResponse;
    }

    const response = await apiClient.post<NewsletterResponse>('/api/newsletter', data);
    return response.data;
};