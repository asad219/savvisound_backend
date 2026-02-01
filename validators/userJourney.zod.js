const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const userJourneyCreateSchema = z.object({
  userId: objectId,
  journeyId: objectId,
  journeyDate: z.coerce.date(),
  notes: z.string().optional(),
});

const userJourneyUpdateSchema = z.object({
  userId: objectId.optional(),
  journeyId: objectId.optional(),
  journeyDate: z.coerce.date().optional(),
  notes: z.string().optional(),
});

const parseUserJourneyCreate = (data) => {
  try {
    return userJourneyCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseUserJourneyUpdate = (data) => {
  try {
    return userJourneyUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  userJourneyCreateSchema,
  userJourneyUpdateSchema,
  parseUserJourneyCreate,
  parseUserJourneyUpdate,
};
