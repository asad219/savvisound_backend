/**
 * @swagger
 * components:
 *   schemas:
 *     UserJourneyUser:
 *       type: object
 *       description: Populated user fields (subset)
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *     UserJourneyJourney:
 *       type: object
 *       description: Populated journey fields (subset)
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID
 *         title:
 *           type: string
 *         description:
 *           type: string
 *     UserJourney:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User journey ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         userId:
 *           oneOf:
 *             - type: string
 *               pattern: '^[0-9a-fA-F]{24}$'
 *             - $ref: '#/components/schemas/UserJourneyUser'
 *           description: User ID or populated user object
 *         journeyId:
 *           oneOf:
 *             - type: string
 *               pattern: '^[0-9a-fA-F]{24}$'
 *             - $ref: '#/components/schemas/UserJourneyJourney'
 *           description: Journey ID or populated journey object
 *         journeyDate:
 *           type: string
 *           format: date-time
 *           description: Journey date (ISO 8601)
 *         notes:
 *           type: string
 *           nullable: true
 *           description: Optional notes
 *         journeyDateOnly:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Journey date (YYYY-MM-DD)
 *         journeyTime:
 *           type: string
 *           nullable: true
 *           description: Journey time (HH:mm:ss)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     UserJourneyCreate:
 *       type: object
 *       required:
 *         - userId
 *         - journeyId
 *         - journeyDate
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID (24-char hex ObjectId)
 *         journeyDate:
 *           type: string
 *           format: date-time
 *           description: Journey date (ISO 8601)
 *         notes:
 *           type: string
 *           nullable: true
 *           description: Optional notes
 *     UserJourneyResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         userJourney:
 *           $ref: '#/components/schemas/UserJourney'
 *     UserJourneyListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         userJourneys:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserJourney'
 */

/**
 * @swagger
 * /user-journey:
 *   get:
 *     summary: Get all user journeys (admin only)
 *     tags: [User Journey]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User journeys retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserJourneyListResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user-journey:
 *   post:
 *     summary: Create a new user journey
 *     tags: [User Journey]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserJourneyCreate'
 *     responses:
 *       201:
 *         description: User journey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserJourneyResponse'
 *       400:
 *         description: Bad request - Validation error or invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user-journey/{userId}:
 *   get:
 *     summary: Get user journeys by user ID
 *     tags: [User Journey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: User ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: User journeys retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserJourneyListResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */
