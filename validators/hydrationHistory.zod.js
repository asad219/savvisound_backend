const { z } = require("zod");

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const hydrationHistoryCreateSchema = z.object({
  userId: objectId,
  date: z.coerce.date(),
  quantity: z.number().int().min(0).optional(),
  unit: z.enum(["oz", "ml"]).optional(),
  glassSizeId: objectId.nullable().optional(),
});

const hydrationHistoryUpdateSchema = z.object({
  userId: objectId.optional(),
  date: z.coerce.date().optional(),
  quantity: z.number().int().min(0).optional(),
  unit: z.enum(["oz", "ml"]).optional(),
  glassSizeId: objectId.nullable().optional(),
});

const parseHydrationHistoryCreate = (data) => {
  try {
    return hydrationHistoryCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseHydrationHistoryUpdate = (data) => {
  try {
    return hydrationHistoryUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  hydrationHistoryCreateSchema,
  hydrationHistoryUpdateSchema,
  parseHydrationHistoryCreate,
  parseHydrationHistoryUpdate,
};
