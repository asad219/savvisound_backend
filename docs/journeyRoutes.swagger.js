/**
 * @swagger
 * components:
 *   schemas:
 *     Journey:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Journey ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         title:
 *           type: string
 *           description: Journey title
 *         slug:
 *           type: string
 *           description: Journey slug (unique)
 *         needOtherOption:
 *           type: boolean
 *           description: Whether additional option is required
 *           default: false
 *         maximumOption:
 *           type: integer
 *           description: Maximum number of options allowed
 *           default: 1
 *         order:
 *           type: integer
 *           description: Sort order
 *     JourneyCreate:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         title:
 *           type: string
 *           description: Journey title
 *         slug:
 *           type: string
 *           description: Journey slug (unique)
 *         needOtherOption:
 *           type: boolean
 *           description: Whether additional option is required
 *         maximumOption:
 *           type: integer
 *           description: Maximum number of options allowed
 *         order:
 *           type: integer
 *           description: Sort order
 *     JourneyUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Journey title
 *         slug:
 *           type: string
 *           description: Journey slug (unique)
 *         needOtherOption:
 *           type: boolean
 *           description: Whether additional option is required
 *         maximumOption:
 *           type: integer
 *           description: Maximum number of options allowed
 *         order:
 *           type: integer
 *           description: Sort order
 *     JourneyResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Journey retrieved successfully
 *         journey:
 *           $ref: '#/components/schemas/Journey'
 *     JourneysResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         journeys:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Journey'
 */

/**
 * @swagger
 * /journey:
 *   post:
 *     summary: Create a new journey (admin only)
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyCreate'
 *     responses:
 *       201:
 *         description: Journey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneyResponse'
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
 * /journey:
 *   get:
 *     summary: Get all journeys
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Journeys retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneysResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /journey/{journeyId}:
 *   put:
 *     summary: Update journey by ID (admin only)
 *     tags: [Journey]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyUpdate'
 *     responses:
 *       200:
 *         description: Journey updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JourneyResponse'
 *       400:
 *         description: Invalid journey ID format or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Journey not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /journey/{journeyId}:
 *   get:
 *     summary: Get journey with options by ID
 *     tags: [Journey]
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
 *         description: Journey retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 journey:
 *                   $ref: '#/components/schemas/Journey'
 *       400:
 *         description: Invalid journey ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Journey not found
 *       500:
 *         description: Server error
 */
