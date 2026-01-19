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
 *         quizId:
 *           type: string
 *           description: Quiz ID
 *         title:
 *           type: string
 *           description: Option title
 *         colorId:
 *           type: string
 *           description: Color ID
 *         order:
 *           type: integer
 *           description: Display order
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     QuizOptionCreate:
 *       type: object
 *       required:
 *         - colorId
 *       properties:
 *         quizId:
 *           type: string
 *         title:
 *           type: string
 *         colorId:
 *           type: string
 *         order:
 *           type: integer
 *
 * /quiz-option/create:
 *   post:
 *     summary: Create a quiz option (admin only)
 *     tags: [QuizOption]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizOptionCreate'
 *     responses:
 *       201:
 *         description: Quiz option created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 quizOption:
 *                   $ref: '#/components/schemas/QuizOption'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
