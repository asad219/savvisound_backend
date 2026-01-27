/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - userId
 *         - audioId
 *       properties:
 *         _id:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Schedule ID (MongoDB ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         id:
 *           type: string
 *           description: Virtual ID field (same as _id)
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID reference (MongoDB ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         audioId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio File ID reference (MongoDB ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         type:
 *           type: string
 *           enum: [recurring, once]
 *           nullable: true
 *           description: Schedule type (recurring or once)
 *         weekday:
 *           type: string
 *           enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *           nullable: true
 *           description: Weekday for recurring schedules
 *         date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Specific date for one-time schedules (ISO 8601 date-time string)
 *         time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Time for the schedule (ISO 8601 date-time string)
 *         hours:
 *           type: integer
 *           nullable: true
 *           description: Hours component of duration
 *         minutes:
 *           type: integer
 *           nullable: true
 *           description: Minutes component of duration
 *         seconds:
 *           type: integer
 *           nullable: true
 *           description: Seconds component of duration
 *         repeat:
 *           type: integer
 *           nullable: true
 *           description: Number of times to repeat
 *         status:
 *           type: boolean
 *           default: true
 *           description: Schedule active status
 *         isDefault:
 *           type: boolean
 *           default: false
 *           description: Whether this is a default schedule
 *         isDeleted:
 *           type: boolean
 *           default: false
 *           description: Soft delete flag
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           default: null
 *           description: Timestamp when schedule was soft deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp (auto-generated)
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp (auto-generated)
 *     ScheduleCreate:
 *       type: object
 *       required:
 *         - userId
 *         - audioId
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         audioId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio File ID (24-char hex ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         type:
 *           type: string
 *           enum: [recurring, once]
 *           description: Schedule type (recurring or once)
 *         weekday:
 *           type: string
 *           enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *           description: Weekday for recurring schedules
 *         date:
 *           type: string
 *           format: date-time
 *           description: Specific date for one-time schedules (ISO 8601 date-time string)
 *         time:
 *           type: string
 *           format: date-time
 *           description: Time for the schedule (ISO 8601 date-time string)
 *         hours:
 *           type: integer
 *           description: Hours component of duration
 *         minutes:
 *           type: integer
 *           description: Minutes component of duration
 *         seconds:
 *           type: integer
 *           description: Seconds component of duration
 *         repeat:
 *           type: integer
 *           description: Number of times to repeat
 *         status:
 *           type: boolean
 *           default: true
 *           description: Schedule active status
 *         isDefault:
 *           type: boolean
 *           default: false
 *           description: Whether this is a default schedule
 *         isDeleted:
 *           type: boolean
 *           default: false
 *           description: Soft delete flag
 *     ScheduleUpdate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: User ID (24-char hex ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         audioId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           description: Audio File ID (24-char hex ObjectId)
 *           example: '507f1f77bcf86cd799439011'
 *         type:
 *           type: string
 *           enum: [recurring, once]
 *           description: Schedule type (recurring or once)
 *         weekday:
 *           type: string
 *           enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *           description: Weekday for recurring schedules
 *         date:
 *           type: string
 *           format: date-time
 *           description: Specific date for one-time schedules (ISO 8601 date-time string)
 *         time:
 *           type: string
 *           format: date-time
 *           description: Time for the schedule (ISO 8601 date-time string)
 *         hours:
 *           type: integer
 *           description: Hours component of duration
 *         minutes:
 *           type: integer
 *           description: Minutes component of duration
 *         seconds:
 *           type: integer
 *           description: Seconds component of duration
 *         repeat:
 *           type: integer
 *           description: Number of times to repeat
 *         status:
 *           type: boolean
 *           description: Schedule active status
 *         isDefault:
 *           type: boolean
 *           description: Whether this is a default schedule
 *         isDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *     ScheduleResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *         - schedule
 *       properties:
 *         success:
 *           type: boolean
 *           description: Operation success status
 *           example: true
 *         message:
 *           type: string
 *           description: Response message
 *           example: 'Schedule retrieved successfully'
 *         schedule:
 *           $ref: '#/components/schemas/Schedule'
 *     SchedulesResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *         - schedules
 *       properties:
 *         success:
 *           type: boolean
 *           description: Operation success status
 *           example: true
 *         message:
 *           type: string
 *           description: Response message
 *           example: 'Schedules retrieved successfully'
 *         schedules:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Schedule'
 */

/**
 * @swagger
 * /schedule/defaults:
 *   post:
 *     summary: Create default recurring schedules for full week
 *     description: >
 *       Creates 14 schedules for the given user and audio:
 *       one for each weekday at 06:30:00 and 21:00:00 with type `recurring`.
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - audioId
 *             properties:
 *               userId:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: User ID (24-char hex ObjectId)
 *                 example: '507f1f77bcf86cd799439011'
 *               audioId:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 description: Audio File ID (24-char hex ObjectId)
 *                 example: '507f1f77bcf86cd799439011'
 *     responses:
 *       201:
 *         description: Default schedules created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulesResponse'
 *       400:
 *         description: Validation error or invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /schedule/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Schedule ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       400:
 *         description: Invalid schedule ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /schedule/user/{userId}:
 *   get:
 *     summary: Get all schedules by user ID
 *     tags: [Schedule]
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
 *         description: Schedules retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchedulesResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /schedule/create:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleCreate'
 *           example:
 *             userId: '507f1f77bcf86cd799439011'
 *             audioId: '507f1f77bcf86cd799439011'
 *             type: 'recurring'
 *             weekday: 'monday'
 *             date: '2026-01-27T06:00:14.151Z'
 *             time: '2026-01-27T06:00:14.151Z'
 *             hours: 0
 *             minutes: 0
 *             seconds: 0
 *             repeat: 1
 *             status: true
 *             isDefault: false
 *             isDeleted: false
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
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
 * /schedule/{id}:
 *   put:
 *     summary: Update schedule by ID
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Schedule ID (24-char hex ObjectId)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleUpdate'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       400:
 *         description: Invalid schedule ID format or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /schedule/delete/{id}:
 *   put:
 *     summary: Delete schedule by ID
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Schedule ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       400:
 *         description: Invalid schedule ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
