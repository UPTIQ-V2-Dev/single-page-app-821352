import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z
        .string()
        .email('Please enter a valid email address'),
    subject: z
        .string()
        .min(5, 'Subject must be at least 5 characters')
        .max(200, 'Subject must be less than 200 characters'),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),
});

export const newsletterSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address'),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
export type NewsletterSchema = z.infer<typeof newsletterSchema>;