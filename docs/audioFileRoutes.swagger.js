/**
 * @swagger
 * components:
 *   schemas:
 *     AudioFile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Audio file ID
 *         audioUrl:
 *           type: string
 *           description: URL of the audio file
 *         colorId:
 *           type: string
 *           description: Color ID
 *         isActive:
 *           type: boolean
 *           description: Whether the audio file is active
 *         name:
 *           type: string
 *           description: Display name
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AudioFileCreate:
 *       type: object
 *       required:
 *         - audioUrl
 *         - colorId
 *         - name
 *       properties:
 *         audioUrl:
 *           type: string
 *           description: URL of the audio file
 *         colorId:
 *           type: string
 *           description: Color ID (24-char hex ObjectId)
 *         name:
 *           type: string
 *           description: Display name
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the audio file is active
 *     AudioFileUpdate:
 *       type: object
 *       properties:
 *         audioUrl:
 *           type: string
 *           description: URL of the audio file
 *         colorId:
 *           type: string
 *           description: Color ID (24-char hex ObjectId)
 *         name:
 *           type: string
 *           description: Display name
 *         isActive:
 *           type: boolean
 *           description: Whether the audio file is active
 *
 * /audio-file/create:
 *   post:
 *     summary: Create an audio file (admin only)
 *     tags: [AudioFile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudioFileCreate'
 *     responses:
 *       201:
 *         description: Audio file created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 audioFile:
 *                   $ref: '#/components/schemas/AudioFile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 *
 * /audio-file:
 *   get:
 *     summary: Get all audio files (admin only)
 *     tags: [AudioFile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Audio files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 audioFiles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       color:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       url:
 *                         type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 *
 * /audio-file/{colorId}:
 *   get:
 *     summary: Get audio file by color ID
 *     tags: [AudioFile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Color ID
 *     responses:
 *       200:
 *         description: Audio file retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 audioFile:
 *                   $ref: '#/components/schemas/AudioFile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Audio file not found
 *       500:
 *         description: Server error
 *
 * /audio-file/{audioFileId}:
 *   put:
 *     summary: Update an audio file (admin only)
 *     tags: [AudioFile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: audioFileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Audio file ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudioFileUpdate'
 *     responses:
 *       200:
 *         description: Audio file updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 audioFile:
 *                   $ref: '#/components/schemas/AudioFile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       400:
 *         description: Validation error
 *       404:
 *         description: Audio file not found
 *       500:
 *         description: Server error
 */
