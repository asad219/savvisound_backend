const { z } = require('zod');

// Schema for creating notification settings
const notificationSettingsCreateSchema = z.object({
  userId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
  notificationStatus: z.boolean()
    .default(true),
  deletedAt: z.date()
    .optional()
    .default(() => new Date())
});

// Schema for updating notification settings
const notificationSettingsUpdateSchema = z.object({
  userId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')
    .optional(),
  notificationStatus: z.boolean()
    .optional(),
  deletedAt: z.date()
    .optional()
});

// Schema for notification settings query parameters
const notificationSettingsQuerySchema = z.object({
  userId: z.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')
    .optional(),
  notificationStatus: z.boolean()
    .optional(),
  page: z.string()
    .regex(/^\d+$/, 'Page must be a number')
    .transform(Number)
    .optional(),
  limit: z.string()
    .regex(/^\d+$/, 'Limit must be a number')
    .transform(Number)
    .optional()
});

// Parse functions
const parseNotificationSettingsCreate = (data) => {
  try {
    return notificationSettingsCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
  }
};

const parseNotificationSettingsUpdate = (data) => {
  try {
    return notificationSettingsUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
  }
};

const parseNotificationSettingsQuery = (data) => {
  try {
    return notificationSettingsQuerySchema.parse(data);
  } catch (error) {
    throw new Error(`Query validation failed: ${error.errors.map(e => e.message).join(', ')}`);
  }
};

module.exports = {
  notificationSettingsCreateSchema,
  notificationSettingsUpdateSchema,
  notificationSettingsQuerySchema,
  parseNotificationSettingsCreate,
  parseNotificationSettingsUpdate,
  parseNotificationSettingsQuery
};