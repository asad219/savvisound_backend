/**
 * @swagger
 * components:
 *   schemas:
 *     JourneyOption:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey option ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID reference (MongoDB ObjectId)
 *         option:
 *           type: string
 *           description: Option value
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     JourneyOptionCreate:
 *       type: object
 *       required:
 *         - journeyId
 *         - option
 *       properties:
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID (24-char hex ObjectId)
 *         option:
 *           type: string
 *           description: Option value
 *     JourneyOptionUpdate:
 *       type: object
 *       properties:
 *         journeyId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID (24-char hex ObjectId)
 *         option:
 *           type: string
 *           description: Option value
 *     JourneyOptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Journey option retrieved successfully
 *         journeyOption:
 *           $ref: '#/components/schemas/JourneyOption'
 *     JourneyOptionsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         journeyOptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/JourneyOption'
 */

/**
 * @swagger
 * /journey-option:
 *   post:
 *     summary: Create a new journey option (admin only)
 *     tags: [JourneyOption]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyOptionCreate'
 *     responses:
 *       201:
 *         description: Journey option created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneyOptionResponse'
 *       400:
 *         description: Bad request - Validation error or invalid data
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
 * /journey-option/{journeyOptionId}:
 *   put:
 *     summary: Update journey option by ID (admin only)
 *     tags: [JourneyOption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: journeyOptionId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Journey option ID (24-char hex ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyOptionUpdate'
 *     responses:
 *       200:
 *         description: Journey option updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneyOptionResponse'
 *       400:
 *         description: Invalid journey option ID format or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Journey option not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /journey-option/{journeyId}:
 *   get:
 *     summary: Get all journey options by journey ID
 *     tags: [JourneyOption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: journeyId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Journey ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Journey options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneyOptionsResponse'
 *       400:
 *         description: Invalid journey ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
