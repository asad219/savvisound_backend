const { z } = require("zod");

const glassSizeCreateSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  volume: z.number().int().positive({ message: "volume must be a positive integer" }),
  unit: z.enum(["oz", "ml"], { message: "unit must be 'oz' or 'ml'" }),
});

const glassSizeUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  volume: z.number().int().positive().optional(),
  unit: z.enum(["oz", "ml"]).optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

const parseGlassSizeCreate = (data) => {
  try {
    return glassSizeCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseGlassSizeUpdate = (data) => {
  try {
    return glassSizeUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  glassSizeCreateSchema,
  glassSizeUpdateSchema,
  parseGlassSizeCreate,
  parseGlassSizeUpdate,
};
