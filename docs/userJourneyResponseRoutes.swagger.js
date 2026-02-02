/**
 * @swagger
 * components:
 *   schemas:
 *     UserJourneyResponseSubSchema:
 *       type: object
 *       required:
 *         - journeyId
 *         - journeyOptionId
 *         - value
 *       properties:
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID (24-char hex ObjectId)
 *         journeyOptionId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey Option ID (24-char hex ObjectId)
 *         value:
 *           type: integer
 *           description: Response value
 *     UserJourneyResponseCreate:
 *       type: object
 *       required:
 *         - userId
 *         - journeyDate
 *         - response
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *         journeyDate:
 *           type: string
 *           format: date-time
 *           description: Date of the journey
 *         response:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/UserJourneyResponseSubSchema'
 *           description: Array of response objects (journeyId, journeyOptionId, value)
 *     UserJourneyResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User journey response ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID reference
 *         journeyDate:
 *           type: string
 *           format: date-time
 *           description: Date of the journey
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserJourneyResponseSubSchema'
 *           description: Array of response objects (journeyId, journeyOptionId, value)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     ValidationError:
 *       type: object
 *       properties:
 *         index:
 *           type: integer
 *           description: Index of the failed item in the array
 *         data:
 *           type: object
 *           description: The data that failed validation
 *         error:
 *           type: string
 *           description: Error message
 *     UserJourneyResponseCreateResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 'Successfully saved 3 responses'
 *         userJourneyResponse:
 *           $ref: '#/components/schemas/UserJourneyResponse'
 */

/**
 * @swagger
 * /user-journey-response:
 *   post:
 *     summary: Create user journey responses
 *     description: Create a single user journey response document. Send one object with userId, journeyDate, and response (array of objects with journeyId, journeyOptionId, value). All responses are saved in one document. Returns the saved document.
 *     tags: [User Journey Response]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserJourneyResponseCreate'
 *           example:
 *             userId: '507f1f77bcf86cd799439011'
 *             journeyDate: '2026-03-02T04:50:02.642Z'
 *             response:
 *               - journeyId: '697d1a77d17f35d4c6f2345c'
 *                 journeyOptionId: '697d1ad3d17f35d4c6f2345e'
 *                 value: 50
 *               - journeyId: '697d1a77d17f35d4c6f2345c'
 *                 journeyOptionId: '697d1ae1d17f35d4c6f23460'
 *                 value: 60
 *               - journeyId: '697d1a77d17f35d4c6f2345c'
 *                 journeyOptionId: '697d1aefd17f35d4c6f23462'
 *                 value: 70
 *     responses:
 *       201:
 *         description: User journey responses created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserJourneyResponseCreateResponse'
 *       400:
 *         description: Bad request - Invalid body (missing userId, journeyDate, or response array; empty response array; or validation failed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Validation failed: ...'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user-journey-response:
 *   get:
 *     summary: Get all user journey responses (admin only)
 *     description: Returns all user journey responses for all users. Sorted by journeyDate descending. journeyDate is formatted as YYYY-MM-DD. Requires admin role.
 *     tags: [User Journey Response]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User journey responses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userJourneyResponses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserJourneyResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin role required
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user-journey-response/id/{id}:
 *   get:
 *     summary: Get user journey response by ID (admin only)
 *     description: Returns a single user journey response document by its ID. The document contains an array of responses (all responses for that userId + journeyDate). journeyDate is formatted as YYYY-MM-DD. Requires admin role.
 *     tags: [User Journey Response]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: User journey response ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: User journey response retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userJourneyResponse:
 *                   $ref: '#/components/schemas/UserJourneyResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User journey response not found
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user-journey-response/{userId}:
 *   get:
 *     summary: Get user journey responses by user ID
 *     description: Returns all user journey responses for the given user, sorted by journeyDate descending (most recent first). Each item includes the response object (journeyId, journeyOptionId, value).
 *     tags: [User Journey Response]
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
 *         description: User journey responses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userJourneyResponses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserJourneyResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */
