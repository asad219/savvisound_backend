/**
 * @swagger
 * components:
 *   schemas:
 *     UserJourneyResponseCreate:
 *       type: object
 *       required:
 *         - journeyId
 *         - journeyOptionId
 *         - value
 *       properties:
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User Journey ID (24-char hex ObjectId)
 *         journeyOptionId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey Option ID (24-char hex ObjectId)
 *         value:
 *           type: integer
 *           description: Response value
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
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User Journey ID reference
 *         journeyOptionId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey Option ID reference
 *         value:
 *           type: integer
 *           description: Response value
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
 *           example: 'Successfully saved 2 out of 2 responses'
 *         userJourneyResponses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserJourneyResponse'
 *         validationErrors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValidationError'
 */

/**
 * @swagger
 * /user-journey-response:
 *   post:
 *     summary: Create user journey responses (bulk insert)
 *     description: Create multiple user journey responses in a single request. Pass an array of response objects. Each object is validated and saved independently. Returns successfully saved items and any validation errors.
 *     tags: [User Journey Response]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/UserJourneyResponseCreate'
 *           example:
 *             - journeyId: '507f1f77bcf86cd799439011'
 *               journeyOptionId: '507f1f77bcf86cd799439012'
 *               value: 5
 *             - journeyId: '507f1f77bcf86cd799439013'
 *               journeyOptionId: '507f1f77bcf86cd799439014'
 *               value: 3
 *     responses:
 *       201:
 *         description: User journey responses created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserJourneyResponseCreateResponse'
 *       400:
 *         description: Bad request - Invalid array format, empty array, or all items failed validation
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *     description: Retrieves all user journey responses for a specific user. Results are sorted by journeyDate in descending order (most recent first).
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
