const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const userJourneyResponseCreateSchema = z.object({
  journeyId: objectId,
  journeyOptionId: objectId,
  value: z.number().int(),
});

const userJourneyResponseUpdateSchema = z.object({
  journeyId: objectId.optional(),
  journeyOptionId: objectId.optional(),
  value: z.number().int().optional(),
});

const parseUserJourneyResponseCreate = (data) => {
  try {
    return userJourneyResponseCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseUserJourneyResponseUpdate = (data) => {
  try {
    return userJourneyResponseUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  userJourneyResponseCreateSchema,
  userJourneyResponseUpdateSchema,
  parseUserJourneyResponseCreate,
  parseUserJourneyResponseUpdate,
};
