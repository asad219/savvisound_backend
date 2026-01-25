const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const scheduleCreateSchema = z.object({
  userId: objectId,
  audioId: objectId,
  type: z.string().optional(),
  weekday: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  hours: z.number().int().optional(),
  minutes: z.number().int().optional(),
  seconds: z.number().int().optional(),
  repeat: z.number().int().optional(),
  status: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

const scheduleUpdateSchema = z.object({
  userId: objectId.optional(),
  audioId: objectId.optional(),
  type: z.string().optional(),
  weekday: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  hours: z.number().int().optional(),
  minutes: z.number().int().optional(),
  seconds: z.number().int().optional(),
  repeat: z.number().int().optional(),
  status: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

const parseScheduleCreate = (data) => {
  try {
    return scheduleCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

const parseScheduleUpdate = (data) => {
  try {
    return scheduleUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
  }
};

module.exports = {
  scheduleCreateSchema,
  scheduleUpdateSchema,
  parseScheduleCreate,
  parseScheduleUpdate,
};
