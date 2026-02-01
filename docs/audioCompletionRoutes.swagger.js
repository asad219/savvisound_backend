/**
 * @swagger
 * components:
 *   schemas:
 *     AudioCompletion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio completion ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID reference (MongoDB ObjectId)
 *         audioId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio file ID reference (MongoDB ObjectId)
 *         date:
 *           type: string
 *           format: date-time
 *           description: Completion timestamp
 *         completedDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Completion date (YYYY-MM-DD)
 *         completedTime:
 *           type: string
 *           nullable: true
 *           description: Completion time (HH:mm:ss)
 *         scheduleId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           nullable: true
 *           description: Schedule ID reference (MongoDB ObjectId)
 *         autorun:
 *           type: boolean
 *           default: false
 *           description: Whether completion was auto-run
 *         createdAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Creation timestamp
 *     AudioCompletionCreate:
 *       type: object
 *       required:
 *         - userId
 *         - audioId
 *         - date
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *         audioId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio file ID (24-char hex ObjectId)
 *         date:
 *           type: string
 *           format: date-time
 *           description: Completion timestamp (ISO 8601)
 *         scheduleId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           nullable: true
 *           description: Optional schedule ID
 *         autorun:
 *           type: boolean
 *           description: Whether completion was auto-run
 *     AudioCompletionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         audioCompletion:
 *           $ref: '#/components/schemas/AudioCompletion'
 *     AudioCompletionListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         audioCompletions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AudioCompletion'
 */

/**
 * @swagger
 * /audio-completions:
 *   post:
 *     summary: Create a new audio completion
 *     tags: [Audio Completions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudioCompletionCreate'
 *     responses:
 *       201:
 *         description: Audio completion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioCompletionResponse'
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
 * /audio-completions/{userId}:
 *   get:
 *     summary: Get audio completions by user ID
 *     tags: [Audio Completions]
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
 *         description: Audio completions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioCompletionListResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */
