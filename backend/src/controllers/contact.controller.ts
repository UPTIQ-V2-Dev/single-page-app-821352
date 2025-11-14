import { contactService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createContactSubmission = catchAsync(async (req, res) => {
    const { name, email, subject, message } = req.body;
    await contactService.createContactSubmission(name, email, subject, message);
    res.status(httpStatus.OK).send({
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours."
    });
});

const getContactSubmissions = catchAsyncWithAuth(async (req, res) => {
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await contactService.queryContactSubmissions({}, options);
    res.send(result);
});

const getContactSubmissionById = catchAsyncWithAuth(async (req, res) => {
    const contactSubmission = await contactService.getContactSubmissionById(parseInt(req.params.contactId));
    if (!contactSubmission) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact submission not found');
    }
    res.send(contactSubmission);
});

const deleteContactSubmission = catchAsyncWithAuth(async (req, res) => {
    await contactService.deleteContactSubmissionById(parseInt(req.params.contactId));
    res.status(httpStatus.OK).send({});
});

const subscribeNewsletter = catchAsync(async (req, res) => {
    const { email } = req.body;
    await contactService.subscribeToNewsletter(email);
    res.status(httpStatus.OK).send({
        success: true,
        message: "Successfully subscribed to our newsletter! Welcome aboard!"
    });
});

const getNewsletterSubscribers = catchAsyncWithAuth(async (req, res) => {
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await contactService.queryNewsletterSubscribers({}, options);
    res.send(result);
});

const getNewsletterSubscriberById = catchAsyncWithAuth(async (req, res) => {
    const subscriber = await contactService.getNewsletterSubscriberById(parseInt(req.params.subscriptionId));
    if (!subscriber) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Newsletter subscriber not found');
    }
    res.send(subscriber);
});

const deleteNewsletterSubscription = catchAsyncWithAuth(async (req, res) => {
    await contactService.deleteNewsletterSubscriptionById(parseInt(req.params.subscriptionId));
    res.status(httpStatus.OK).send({});
});

export default {
    createContactSubmission,
    getContactSubmissions,
    getContactSubmissionById,
    deleteContactSubmission,
    subscribeNewsletter,
    getNewsletterSubscribers,
    getNewsletterSubscriberById,
    deleteNewsletterSubscription
};