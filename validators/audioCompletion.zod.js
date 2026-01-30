const { z } = require("zod");

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const audioCompletionCreateSchema = z.object({
  userId: objectId,
  audioId: objectId,
  date: z.coerce.date(),
  scheduleId: objectId.optional().nullable(),
  autorun: z.boolean().optional(),
});

const audioCompletionUpdateSchema = z.object({
  userId: objectId.optional(),
  audioId: objectId.optional(),
  date: z.coerce.date().optional(),
  scheduleId: objectId.optional().nullable(),
  autorun: z.boolean().optional(),
});

const parseAudioCompletionCreate = (data) => {
  try {
    return audioCompletionCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseAudioCompletionUpdate = (data) => {
  try {
    return audioCompletionUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  audioCompletionCreateSchema,
  audioCompletionUpdateSchema,
  parseAudioCompletionCreate,
  parseAudioCompletionUpdate,
};
