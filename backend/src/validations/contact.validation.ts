import Joi from 'joi';

const createContactSubmission = {
    body: Joi.object().keys({
        name: Joi.string().required().max(255),
        email: Joi.string().required().email(),
        subject: Joi.string().required().max(255),
        message: Joi.string().required().max(2000)
    })
};

const getContactSubmissions = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};

const getContactSubmissionById = {
    params: Joi.object().keys({
        contactId: Joi.string().pattern(/^\d+$/).message('contactId must be a valid integer')
    })
};

const deleteContactSubmission = {
    params: Joi.object().keys({
        contactId: Joi.string().pattern(/^\d+$/).message('contactId must be a valid integer')
    })
};

const subscribeNewsletter = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
};

const getNewsletterSubscribers = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};

const getNewsletterSubscriberById = {
    params: Joi.object().keys({
        subscriptionId: Joi.string().pattern(/^\d+$/).message('subscriptionId must be a valid integer')
    })
};

const deleteNewsletterSubscription = {
    params: Joi.object().keys({
        subscriptionId: Joi.string().pattern(/^\d+$/).message('subscriptionId must be a valid integer')
    })
};

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