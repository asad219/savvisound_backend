/**
 * @swagger
 * components:
 *   schemas:
 *     HydrationHistoryUser:
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
 *     HydrationHistoryGlassSize:
 *       type: object
 *       description: Populated glass size fields (subset)
 *       nullable: true
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Glass size ID
 *         name:
 *           type: string
 *         volume:
 *           type: number
 *         unit:
 *           type: string
 *           enum: [oz, ml]
 *     HydrationHistory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Hydration history ID
 *         userId:
 *           oneOf:
 *             - type: string
 *               pattern: '^[0-9a-fA-F]{24}$'
 *             - $ref: '#/components/schemas/HydrationHistoryUser'
 *           description: User ID or populated user (name, email, firstName, lastName)
 *         glassSizeId:
 *           oneOf:
 *             - type: string
 *               pattern: '^[0-9a-fA-F]{24}$'
 *               nullable: true
 *             - $ref: '#/components/schemas/HydrationHistoryGlassSize'
 *           description: Glass size ID or populated glass size (name, volume, unit), nullable
 *         date:
 *           type: string
 *           format: date-time
 *         quantity:
 *           type: number
 *           default: 0
 *         unit:
 *           type: string
 *           enum: [oz, ml]
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     HydrationHistoryCreate:
 *       type: object
 *       required:
 *         - userId
 *         - date
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the hydration entry (ISO 8601)
 *         quantity:
 *           type: integer
 *           minimum: 0
 *           description: Amount consumed
 *         unit:
 *           type: string
 *           enum: [oz, ml]
 *           description: Unit for quantity
 *         glassSizeId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           nullable: true
 *           description: Optional glass size ID reference
 *     HydrationHistoryListResponse:
 *       type: object
 *       required:
 *         - success
 *         - hydrationHistory
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         hydrationHistory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HydrationHistory'
 *     HydrationHistoryCreateResponse:
 *       type: object
 *       required:
 *         - success
 *         - hydrationHistory
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         hydrationHistory:
 *           $ref: '#/components/schemas/HydrationHistory'
 *     HydrationHistoryDeleteResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 'Hydration history deleted successfully'
 */

/**
 * @swagger
 * /hydration-history/create:
 *   post:
 *     summary: Create hydration history entry
 *     description: Create a new hydration history record for the authenticated user.
 *     tags: [Hydration History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HydrationHistoryCreate'
 *           example:
 *             userId: '507f1f77bcf86cd799439011'
 *             date: '2025-01-30T12:00:00.000Z'
 *             quantity: 8
 *             unit: 'oz'
 *             glassSizeId: '507f1f77bcf86cd799439012'
 *     responses:
 *       201:
 *         description: Hydration history created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HydrationHistoryCreateResponse'
 *       400:
 *         description: Validation error - invalid or missing fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /hydration-history/{userId}:
 *   get:
 *     summary: Get hydration history by user ID
 *     description: Returns all hydration history entries for the given user, sorted by createdAt descending. Populates userId (name, email, firstName, lastName) and glassSizeId (name, volume, unit).
 *     tags: [Hydration History]
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
 *         description: Hydration history list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HydrationHistoryListResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /hydration-history/{hydrationHistoryId}:
 *   delete:
 *     summary: Delete hydration history by ID
 *     description: Permanently delete a hydration history entry.
 *     tags: [Hydration History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hydrationHistoryId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Hydration history ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Hydration history deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HydrationHistoryDeleteResponse'
 *       400:
 *         description: Invalid hydration history ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
