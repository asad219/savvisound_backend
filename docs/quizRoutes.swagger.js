/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz ID
 *         title:
 *           type: string
 *           description: Quiz title
 *         slug:
 *           type: string
 *           description: Unique quiz slug
 *         order:
 *           type: integer
 *           description: Display order
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizOptionWithColor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz option ID
 *         quizId:
 *           type: string
 *           description: Quiz ID
 *         title:
 *           type: string
 *           description: Option title
 *         colorId:
 *           type: string
 *           description: Color ID
 *         color:
 *           type: string
 *           description: Color name
 *         order:
 *           type: integer
 *           description: Display order
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizWithOptions:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Quiz ID
 *         title:
 *           type: string
 *           description: Quiz title
 *         slug:
 *           type: string
 *           description: Unique quiz slug
 *         order:
 *           type: integer
 *           description: Display order
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizOptionWithColor'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizCreate:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         title:
 *           type: string
 *         slug:
 *           type: string
 *         order:
 *           type: integer
 *
 * /quiz:
 *   get:
 *     summary: Get all quizzes with options and colors
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: Quizzes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 quizzes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizWithOptions'
 *       500:
 *         description: Server error
 *
 * /quiz/create:
 *   post:
 *     summary: Create a quiz (admin only)
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizCreate'
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 quiz:
 *                   $ref: '#/components/schemas/Quiz'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
