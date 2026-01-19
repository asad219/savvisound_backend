const { z } = require('zod');

const quizCreateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1, { message: 'Slug is required' }),
  order: z.number().int().optional(),
});

const quizUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  order: z.number().int().optional(),
});

const parseQuizCreate = (data) => {
  try {
    return quizCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseQuizUpdate = (data) => {
  try {
    return quizUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  quizCreateSchema,
  quizUpdateSchema,
  parseQuizCreate,
  parseQuizUpdate,
};
