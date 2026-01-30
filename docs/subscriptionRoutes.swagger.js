/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Subscription ID (MongoDB ObjectId)
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID reference (MongoDB ObjectId)
 *         packageId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           nullable: true
 *           description: Package ID reference (MongoDB ObjectId)
 *         price:
 *           type: number
 *           description: Subscription price
 *         discount:
 *           type: number
 *           description: Discount amount
 *         total:
 *           type: number
 *           description: Total amount after discount
 *         couponId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           nullable: true
 *           description: Coupon ID reference (MongoDB ObjectId)
 *         subscriptionStatus:
 *           type: string
 *           enum: [active, expired, cacelled]
 *           description: Subscription status
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Subscription expiration date
 *         cancelDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Subscription cancellation date
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     SubscriptionCreate:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *         packageId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Package ID (24-char hex ObjectId)
 *         price:
 *           type: number
 *           description: Subscription price
 *         discount:
 *           type: number
 *           description: Discount amount
 *         total:
 *           type: number
 *           description: Total amount after discount
 *         couponId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Coupon ID (24-char hex ObjectId)
 *         subscriptionStatus:
 *           type: string
 *           enum: [active, expired, cacelled]
 *           description: Subscription status
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           description: Subscription expiration date
 
 *     SubscriptionUpdate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *         packageId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Package ID (24-char hex ObjectId)
 *         price:
 *           type: number
 *           description: Subscription price
 *         discount:
 *           type: number
 *           description: Discount amount
 *         total:
 *           type: number
 *           description: Total amount after discount
 *         couponId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Coupon ID (24-char hex ObjectId)
 *         subscriptionStatus:
 *           type: string
 *           enum: [active, expired, cacelled]
 *           description: Subscription status
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           description: Subscription expiration date
 *         cancelDate:
 *           type: string
 *           format: date-time
 *           description: Subscription cancellation date
 *     SubscriptionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Subscription retrieved successfully
 *         subscription:
 *           $ref: '#/components/schemas/Subscription'
 *     SubscriptionsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         subscriptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subscription'
 */

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscriptions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionsResponse'
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
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionCreate'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
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
 * /subscriptions/{userId}:
 *   get:
 *     summary: Get subscription by user ID
 *     tags: [Subscriptions]
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
 *         description: Subscription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subscriptions/{id}:
 *   put:
 *     summary: Update subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Subscription ID (24-char hex ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionUpdate'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: Invalid subscription ID format or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subscriptions/cancel/{id}:
 *   put:
 *     summary: Cancel subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Subscription ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: Invalid subscription ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */
