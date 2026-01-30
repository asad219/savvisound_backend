const { z } = require("zod");

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const journeyOptionCreateSchema = z.object({
  journeyId: objectId,
  option: z.string().min(1, { message: "option is required" }),
});

const journeyOptionUpdateSchema = z.object({
  journeyId: objectId.optional(),
  option: z.string().min(1).optional(),
});

const parseJourneyOptionCreate = (data) => {
  try {
    return journeyOptionCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseJourneyOptionUpdate = (data) => {
  try {
    return journeyOptionUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  journeyOptionCreateSchema,
  journeyOptionUpdateSchema,
  parseJourneyOptionCreate,
  parseJourneyOptionUpdate,
};
