const { z } = require("zod");

const journeyCreateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().min(1, { message: "slug is required" }),
  needOtherOption: z.boolean().optional(),
  maximumOption: z.number().int().min(1).optional(),
  order: z.number().int().optional(),
});

const journeyUpdateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().min(1).optional(),
  needOtherOption: z.boolean().optional(),
  maximumOption: z.number().int().min(1).optional(),
  order: z.number().int().optional(),
});

const parseJourneyCreate = (data) => {
  try {
    return journeyCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseJourneyUpdate = (data) => {
  try {
    return journeyUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  journeyCreateSchema,
  journeyUpdateSchema,
  parseJourneyCreate,
  parseJourneyUpdate,
};
