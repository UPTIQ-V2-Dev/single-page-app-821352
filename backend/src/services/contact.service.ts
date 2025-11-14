import prisma from '../client.ts';
import { ContactSubmission, Newsletter } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a contact submission
 * @param {Object} contactData
 * @returns {Promise<ContactSubmission>}
 */
const createContactSubmission = async (
    name: string,
    email: string,
    subject: string,
    message: string
): Promise<ContactSubmission> => {
    return prisma.contactSubmission.create({
        data: {
            name,
            email,
            subject,
            message
        }
    });
};

/**
 * Query for contact submissions with pagination
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContactSubmissions = async <Key extends keyof ContactSubmission>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt'] as Key[]
): Promise<{
    results: Pick<ContactSubmission, Key>[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    
    // Parse sortBy if it includes direction (e.g., "createdAt:desc")
    let orderBy: any = undefined;
    if (sortBy) {
        const [field, direction] = sortBy.split(':');
        orderBy = { [field]: direction === 'asc' ? 'asc' : 'desc' };
    }

    const skip = (page - 1) * limit;
    
    const [contactSubmissions, totalResults] = await Promise.all([
        prisma.contactSubmission.findMany({
            where: filter,
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
            skip,
            take: limit,
            orderBy: orderBy || { createdAt: 'desc' }
        }),
        prisma.contactSubmission.count({ where: filter })
    ]);
    
    const totalPages = Math.ceil(totalResults / limit);
    
    return {
        results: contactSubmissions as Pick<ContactSubmission, Key>[],
        page,
        limit,
        totalPages,
        totalResults
    };
};

/**
 * Get contact submission by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<ContactSubmission, Key> | null>}
 */
const getContactSubmissionById = async <Key extends keyof ContactSubmission>(
    id: number,
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt'] as Key[]
): Promise<Pick<ContactSubmission, Key> | null> => {
    return (await prisma.contactSubmission.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<ContactSubmission, Key> | null>;
};

/**
 * Delete contact submission by id
 * @param {number} contactId
 * @returns {Promise<ContactSubmission>}
 */
const deleteContactSubmissionById = async (contactId: number): Promise<ContactSubmission> => {
    const contactSubmission = await getContactSubmissionById(contactId);
    if (!contactSubmission) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact submission not found');
    }
    await prisma.contactSubmission.delete({ where: { id: contactId } });
    return contactSubmission;
};

/**
 * Subscribe to newsletter
 * @param {string} email
 * @returns {Promise<Newsletter>}
 */
const subscribeToNewsletter = async (email: string): Promise<Newsletter> => {
    // Check if email is already subscribed
    const existingSubscription = await prisma.newsletter.findUnique({
        where: { email }
    });
    
    if (existingSubscription) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already subscribed');
    }
    
    return prisma.newsletter.create({
        data: { email }
    });
};

/**
 * Query for newsletter subscribers with pagination
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNewsletterSubscribers = async <Key extends keyof Newsletter>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'email', 'createdAt'] as Key[]
): Promise<{
    results: Pick<Newsletter, Key>[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    
    // Parse sortBy if it includes direction (e.g., "createdAt:desc")
    let orderBy: any = undefined;
    if (sortBy) {
        const [field, direction] = sortBy.split(':');
        orderBy = { [field]: direction === 'asc' ? 'asc' : 'desc' };
    }

    const skip = (page - 1) * limit;
    
    const [newsletters, totalResults] = await Promise.all([
        prisma.newsletter.findMany({
            where: filter,
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
            skip,
            take: limit,
            orderBy: orderBy || { createdAt: 'desc' }
        }),
        prisma.newsletter.count({ where: filter })
    ]);
    
    const totalPages = Math.ceil(totalResults / limit);
    
    return {
        results: newsletters as Pick<Newsletter, Key>[],
        page,
        limit,
        totalPages,
        totalResults
    };
};

/**
 * Get newsletter subscriber by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Newsletter, Key> | null>}
 */
const getNewsletterSubscriberById = async <Key extends keyof Newsletter>(
    id: number,
    keys: Key[] = ['id', 'email', 'createdAt'] as Key[]
): Promise<Pick<Newsletter, Key> | null> => {
    return (await prisma.newsletter.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<Newsletter, Key> | null>;
};

/**
 * Delete newsletter subscription by id
 * @param {number} subscriptionId
 * @returns {Promise<Newsletter>}
 */
const deleteNewsletterSubscriptionById = async (subscriptionId: number): Promise<Newsletter> => {
    const subscription = await getNewsletterSubscriberById(subscriptionId);
    if (!subscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
    }
    await prisma.newsletter.delete({ where: { id: subscriptionId } });
    return subscription;
};

export default {
    createContactSubmission,
    queryContactSubmissions,
    getContactSubmissionById,
    deleteContactSubmissionById,
    subscribeToNewsletter,
    queryNewsletterSubscribers,
    getNewsletterSubscriberById,
    deleteNewsletterSubscriptionById
};