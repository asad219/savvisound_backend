/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationSettings:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the notification settings
 *         userId:
 *           type: string
 *           description: The user ID associated with these settings
 *         notificationStatus:
 *           type: boolean
 *           description: Enable/disable notifications
 *           default: true
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Deletion timestamp
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         _id: "60f7b3b3b3f3b3b3b3f3b3b3"
 *         userId: "60f7b3b3b3f3b3b3b3f3b3b1"
 *         notificationStatus: true
 *         deletedAt: "2026-01-08T12:00:00.000Z"
 *     NotificationSettingsCreate:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID for the notification settings
 *         notificationStatus:
 *           type: boolean
 *           description: Enable/disable notifications
 *           default: true
 *       example:
 *         userId: "60f7b3b3b3f3b3b3b3f3b3b1"
 *         notificationStatus: true
 *     NotificationSettingsUpdate:
 *       type: object
 *       properties:
 *         notificationStatus:
 *           type: boolean
 *           description: Enable/disable notifications
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Deletion timestamp
 *       example:
 *         notificationStatus: false
 */

/**
 * @swagger
 * tags:
 *   - name: NotificationSettings
 *     description: Notification settings management
 */

/**
 * @swagger
 * /notification-settings/{userId}:
 *   get:
 *     summary: Get notification settings by user ID
 *     tags:
 *       - NotificationSettings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get notification settings for
 *     responses:
 *       200:
 *         description: Notification settings retrieved successfully
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
 *                   example: "Notification settings retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/NotificationSettings'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification settings not found for this user
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification-settings:
 *   post:
 *     summary: Create notification settings
 *     tags:
 *       - NotificationSettings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationSettingsCreate'
 *     responses:
 *       201:
 *         description: Notification settings created successfully
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
 *                   example: "Notification created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/NotificationSettings'
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification-settings/{userId}:
 *   put:
 *     summary: Update notification settings by ID
 *     tags:
 *       - NotificationSettings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification settings ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationSettingsUpdate'
 *     responses:
 *       200:
 *         description: Notification settings updated successfully
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
 *                   example: "Notification updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/NotificationSettings'
 *       400:
 *         description: Bad request - Validation error or Invalid ID format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
