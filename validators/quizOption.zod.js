const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const quizOptionCreateSchema = z.object({
  quizId: objectId.optional(),
  title: z.string().min(1).optional(),
  colorId: objectId,
  order: z.number().int().optional(),
});

const quizOptionUpdateSchema = z.object({
  quizId: objectId.optional(),
  title: z.string().min(1).optional(),
  colorId: objectId.optional(),
  order: z.number().int().optional(),
});

const parseQuizOptionCreate = (data) => {
  try {
    return quizOptionCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseQuizOptionUpdate = (data) => {
  try {
    return quizOptionUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  quizOptionCreateSchema,
  quizOptionUpdateSchema,
  parseQuizOptionCreate,
  parseQuizOptionUpdate,
};
