const {z} = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const quizResponseSubSchema = z.object({
    quizId: objectId,
    quizOptionId: z.array(objectId).min(1, 'At least one quiz option is required')
});

const quizResponseCreateSchema = z.object({
    userId: objectId,
    quizDate: z.coerce.date(),
    response: z.array(quizResponseSubSchema).min(1, 'At least one response is required')
});

const parseQuizResponseCreate = (data) => {
    try {
        return quizResponseCreateSchema.parse(data);
    } catch (error) {
        throw new Error(`Validation failed: ${
            error.errors.map((e) => e.message).join(', ')
        }`);
    }
};

module.exports = {
    quizResponseCreateSchema,
    quizResponseSubSchema,
    parseQuizResponseCreate
};
