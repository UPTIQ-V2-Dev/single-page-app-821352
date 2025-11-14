import { contactService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const contactSubmissionSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
    createdAt: z.string()
});

const newsletterSubscriberSchema = z.object({
    id: z.number(),
    email: z.string(),
    createdAt: z.string()
});

const createContactSubmissionTool: MCPTool = {
    id: 'contact_create_submission',
    name: 'Create Contact Submission',
    description: 'Create a new contact form submission',
    inputSchema: z.object({
        name: z.string().max(255),
        email: z.string().email(),
        subject: z.string().max(255),
        message: z.string().max(2000)
    }),
    outputSchema: contactSubmissionSchema,
    fn: async (inputs: { name: string; email: string; subject: string; message: string }) => {
        const contact = await contactService.createContactSubmission(
            inputs.name,
            inputs.email,
            inputs.subject,
            inputs.message
        );
        return contact;
    }
};

const getContactSubmissionsTool: MCPTool = {
    id: 'contact_get_all_submissions',
    name: 'Get All Contact Submissions',
    description: 'Get all contact submissions with optional filters and pagination',
    inputSchema: z.object({
        sortBy: z.string().optional(),
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: z.object({
        results: z.array(contactSubmissionSchema),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalResults: z.number()
    }),
    fn: async (inputs: { sortBy?: string; limit?: number; page?: number }) => {
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        const result = await contactService.queryContactSubmissions({}, options);
        return result;
    }
};

const getContactSubmissionByIdTool: MCPTool = {
    id: 'contact_get_submission_by_id',
    name: 'Get Contact Submission By ID',
    description: 'Get a single contact submission by its ID',
    inputSchema: z.object({
        contactId: z.number().int()
    }),
    outputSchema: contactSubmissionSchema,
    fn: async (inputs: { contactId: number }) => {
        const contact = await contactService.getContactSubmissionById(inputs.contactId);
        if (!contact) {
            throw new Error('Contact submission not found');
        }
        return contact;
    }
};

const deleteContactSubmissionTool: MCPTool = {
    id: 'contact_delete_submission',
    name: 'Delete Contact Submission',
    description: 'Delete a contact submission by its ID',
    inputSchema: z.object({
        contactId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { contactId: number }) => {
        await contactService.deleteContactSubmissionById(inputs.contactId);
        return { success: true };
    }
};

const subscribeNewsletterTool: MCPTool = {
    id: 'newsletter_subscribe',
    name: 'Subscribe to Newsletter',
    description: 'Subscribe an email address to the newsletter',
    inputSchema: z.object({
        email: z.string().email()
    }),
    outputSchema: newsletterSubscriberSchema,
    fn: async (inputs: { email: string }) => {
        const subscription = await contactService.subscribeToNewsletter(inputs.email);
        return subscription;
    }
};

const getNewsletterSubscribersTool: MCPTool = {
    id: 'newsletter_get_all_subscribers',
    name: 'Get All Newsletter Subscribers',
    description: 'Get all newsletter subscribers with optional filters and pagination',
    inputSchema: z.object({
        sortBy: z.string().optional(),
        limit: z.number().int().min(1).max(100).optional(),
        page: z.number().int().min(1).optional()
    }),
    outputSchema: z.object({
        results: z.array(newsletterSubscriberSchema),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalResults: z.number()
    }),
    fn: async (inputs: { sortBy?: string; limit?: number; page?: number }) => {
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        const result = await contactService.queryNewsletterSubscribers({}, options);
        return result;
    }
};

const getNewsletterSubscriberByIdTool: MCPTool = {
    id: 'newsletter_get_subscriber_by_id',
    name: 'Get Newsletter Subscriber By ID',
    description: 'Get a single newsletter subscriber by their ID',
    inputSchema: z.object({
        subscriptionId: z.number().int()
    }),
    outputSchema: newsletterSubscriberSchema,
    fn: async (inputs: { subscriptionId: number }) => {
        const subscriber = await contactService.getNewsletterSubscriberById(inputs.subscriptionId);
        if (!subscriber) {
            throw new Error('Newsletter subscriber not found');
        }
        return subscriber;
    }
};

const deleteNewsletterSubscriptionTool: MCPTool = {
    id: 'newsletter_delete_subscription',
    name: 'Delete Newsletter Subscription',
    description: 'Delete a newsletter subscription by its ID',
    inputSchema: z.object({
        subscriptionId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { subscriptionId: number }) => {
        await contactService.deleteNewsletterSubscriptionById(inputs.subscriptionId);
        return { success: true };
    }
};

export const contactTools: MCPTool[] = [
    createContactSubmissionTool,
    getContactSubmissionsTool,
    getContactSubmissionByIdTool,
    deleteContactSubmissionTool,
    subscribeNewsletterTool,
    getNewsletterSubscribersTool,
    getNewsletterSubscriberByIdTool,
    deleteNewsletterSubscriptionTool
];