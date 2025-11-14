import { contactController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { contactValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Contact routes
router
    .route('/contact')
    .post(validate(contactValidation.createContactSubmission), contactController.createContactSubmission)
    .get(auth('manageContacts'), validate(contactValidation.getContactSubmissions), contactController.getContactSubmissions);

router
    .route('/contact/:contactId')
    .get(auth('manageContacts'), validate(contactValidation.getContactSubmissionById), contactController.getContactSubmissionById)
    .delete(auth('manageContacts'), validate(contactValidation.deleteContactSubmission), contactController.deleteContactSubmission);

// Newsletter routes
router
    .route('/newsletter')
    .post(validate(contactValidation.subscribeNewsletter), contactController.subscribeNewsletter)
    .get(auth('manageContacts'), validate(contactValidation.getNewsletterSubscribers), contactController.getNewsletterSubscribers);

router
    .route('/newsletter/:subscriptionId')
    .get(auth('manageContacts'), validate(contactValidation.getNewsletterSubscriberById), contactController.getNewsletterSubscriberById)
    .delete(auth('manageContacts'), validate(contactValidation.deleteNewsletterSubscription), contactController.deleteNewsletterSubscription);

export default router;

/**
 * @swagger
 * tags:
 *   name: Contact & Newsletter
 *   description: Contact form submissions and newsletter subscription management
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form message
 *     description: Submit a contact form message (public endpoint).
 *     tags: [Contact & Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *                 maxLength: 255
 *               message:
 *                 type: string
 *                 maxLength: 2000
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               subject: Inquiry
 *               message: Hello, I have a question about your services.
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Thank you for your message! We'll get back to you within 24 hours.
 *       "422":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   get:
 *     summary: Get all contact submissions
 *     description: Get all contact submissions with pagination (admin only).
 *     tags: [Contact & Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         default: 10
 *         description: Maximum number of contact submissions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       subject:
 *                         type: string
 *                       message:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/newsletter:
 *   post:
 *     summary: Subscribe to newsletter
 *     description: Subscribe to newsletter with email (public endpoint).
 *     tags: [Contact & Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: john@example.com
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully subscribed to our newsletter! Welcome aboard!
 *       "400":
 *         description: Email already subscribed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Email already subscribed
 *       "422":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 *
 *   get:
 *     summary: Get all newsletter subscribers
 *     description: Get all newsletter subscribers with pagination (admin only).
 *     tags: [Contact & Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         default: 10
 *         description: Maximum number of subscribers
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       email:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/newsletter/{subscriptionId}:
 *   delete:
 *     summary: Unsubscribe from newsletter
 *     description: Unsubscribe from newsletter by subscription ID (admin only).
 *     tags: [Contact & Newsletter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Newsletter subscription ID
 *     responses:
 *       "200":
 *         description: Successfully unsubscribed
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */