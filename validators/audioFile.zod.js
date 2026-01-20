const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const audioFileCreateSchema = z.object({
  audioUrl: z.string().min(1, { message: 'audioUrl is required' }),
  colorId: objectId,
  isActive: z.boolean().optional(),
  name: z.string().min(1, { message: 'name is required' }),
});

const audioFileUpdateSchema = z.object({
  audioUrl: z.string().min(1).optional(),
  colorId: objectId.optional(),
  isActive: z.boolean().optional(),
  name: z.string().min(1).optional(),
});

const parseAudioFileCreate = (data) => {
  try {
    return audioFileCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseAudioFileUpdate = (data) => {
  try {
    return audioFileUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  audioFileCreateSchema,
  audioFileUpdateSchema,
  parseAudioFileCreate,
  parseAudioFileUpdate,
};
