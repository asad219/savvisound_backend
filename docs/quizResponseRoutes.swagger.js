/**
 * @swagger
 * components:
 *   schemas:
 *     QuizOption:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz option ID
 *         option:
 *           type: string
 *           description: Quiz option title
 *     QuizResponseItem:
 *       type: object
 *       properties:
 *         quizId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Quiz ID
 *             title:
 *               type: string
 *               description: Quiz title
 *         quizOptionId:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizOption'
 *           description: Array of selected quiz options
 *     QuizResponseCreate:
 *       type: object
 *       required:
 *         - userId
 *         - quizDate
 *         - response
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID (24-char hex ObjectId)
 *         quizDate:
 *           type: string
 *           format: date-time
 *           description: Date of quiz completion
 *         response:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - quizId
 *               - quizOptionId
 *             properties:
 *               quizId:
 *                 type: string
 *                 description: Quiz ID
 *               quizOptionId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of selected quiz option IDs
 *           description: Array of quiz responses
 *     QuizResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz response ID
 *         id:
 *           type: string
 *           description: Quiz response ID (virtual field)
 *         userId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *         quizDate:
 *           type: string
 *           format: date
 *           description: Date of quiz completion (formatted as YYYY-MM-DD)
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizResponseItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizResponseAdmin:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz response ID
 *         userId:
 *           type: string
 *           description: User ID
 *         quizDate:
 *           type: string
 *           format: date-time
 *         response:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               quizOptionId:
 *                 type: array
 *                 items:
 *                   type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /quizResponse:
 *   post:
 *     summary: Create a new quiz response
 *     tags: [Quiz Response]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizResponseCreate'
 *     responses:
 *       201:
 *         description: Quiz response created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 quizResponse:
 *                   $ref: '#/components/schemas/QuizResponseAdmin'
 *       400:
 *         description: Invalid request body or validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all quiz responses (admin only)
 *     tags: [Quiz Response]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz responses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 quizResponses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizResponseAdmin'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 *
 * /quizResponse/user/{userId}:
 *   get:
 *     summary: Get quiz response by user ID
 *     tags: [Quiz Response]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (24-char hex ObjectId)
 *     responses:
 *       200:
 *         description: Quiz response retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 quizResponse:
 *                   $ref: '#/components/schemas/QuizResponse'
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - You can only view your own quiz responses
 *       404:
 *         description: Quiz response not found
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *       500:
 *         description: Server error
 */
