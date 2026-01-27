const {z} = require('zod');

/**
 * MongoDB ObjectId validation
 */
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

/**
 * Date-only validation (YYYY-MM-DD)
 */
const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD').optional().nullable();

/**
 * Time-only validation (HH:mm:ss)
 */
const timeOnlySchema = z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Invalid time format. Use HH:mm:ss').optional().nullable();

/**
 * Common weekday enum
 */
const weekdayEnum = z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
]);

/**
 * Schedule type enum
 */
const scheduleTypeEnum = z.enum(['recurring', 'once']);

/**
 * Schedule CREATE schema
 */
const scheduleCreateSchema = z.object({
    userId: objectId,
    audioId: objectId,

    type: scheduleTypeEnum.optional(),
    weekday: weekdayEnum.optional().nullable(),

    date: dateOnlySchema,
    time: timeOnlySchema,

    hours: z.number().int().min(0).optional().nullable(),
    minutes: z.number().int().min(0).max(59).optional().nullable(),
    seconds: z.number().int().min(0).max(59).optional().nullable(),

    repeat: z.number().int().min(1).optional().nullable(),

    status: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    isDeleted: z.boolean().optional()
});

/**
 * Schedule UPDATE schema
 */
const scheduleUpdateSchema = z.object({
    userId: objectId.optional(),
    audioId: objectId.optional(),

    type: scheduleTypeEnum.optional(),
    weekday: weekdayEnum.optional().nullable(),

    date: dateOnlySchema,
    time: timeOnlySchema,

    hours: z.number().int().min(0).optional().nullable(),
    minutes: z.number().int().min(0).max(59).optional().nullable(),
    seconds: z.number().int().min(0).max(59).optional().nullable(),

    repeat: z.number().int().min(1).optional().nullable(),

    status: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    isDeleted: z.boolean().optional()
});

/**
 * Schema for creating default schedules in bulk
 * Body: { userId, audioId }
 */
const scheduleDefaultsCreateSchema = z.object({
    userId: objectId,
    audioId: objectId
});

/**
 * Safe parse helpers (Zod v4 compatible)
 */
const parseScheduleCreate = (data) => {
    try {
        return scheduleCreateSchema.parse(data);
    } catch (error) {
        throw new Error(`Validation failed: ${
            error.issues.map((e) => e.message).join(', ')
        }`);
    }
};

const parseScheduleUpdate = (data) => {
    try {
        return scheduleUpdateSchema.parse(data);
    } catch (error) {
        throw new Error(`Validation failed: ${
            error.issues.map((e) => e.message).join(', ')
        }`);
    }
};

const parseScheduleDefaultsCreate = (data) => {
    try {
        return scheduleDefaultsCreateSchema.parse(data);
    } catch (error) {
        throw new Error(`Validation failed: ${
            error.issues.map((e) => e.message).join(', ')
        }`);
    }
};

module.exports = {
    scheduleCreateSchema,
    scheduleUpdateSchema,
    scheduleDefaultsCreateSchema,
    parseScheduleCreate,
    parseScheduleUpdate,
    parseScheduleDefaultsCreate
};
