const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const userJourneyResponseSubSchema = z.object({
  journeyId: objectId,
  journeyOptionId: objectId,
  value: z.number().int(),
});

const userJourneyResponseCreateSchema = z.object({
  userId: objectId,
  journeyDate: z.coerce.date(),
  response: z.array(userJourneyResponseSubSchema).min(1, 'At least one response is required'),
});

const parseUserJourneyResponseCreate = (data) => {
  try {
    return userJourneyResponseCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  userJourneyResponseCreateSchema,
  userJourneyResponseSubSchema,
  parseUserJourneyResponseCreate,
};
