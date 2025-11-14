import { ContactResponse, NewsletterResponse } from '@/types/contact';

export const mockContactSubmissionResponse: ContactResponse = {
    success: true,
    message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
};

export const mockNewsletterSubscriptionResponse: NewsletterResponse = {
    success: true,
    message: 'Successfully subscribed to our newsletter! Welcome aboard!',
};