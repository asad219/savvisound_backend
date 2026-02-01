const { z } = require("zod");

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const subscriptionCreateSchema = z.object({
  userId: objectId,
  packageId: objectId.optional(),
  price: z.number().optional(),
  discount: z.number().optional(),
  total: z.number().optional(),
  couponId: objectId.optional(),
  subscriptionStatus: z.enum(["active", "expired", "cacelled"]).optional(),
  paymentReference: z.string().optional(),
  paymentDate: z.coerce.date().optional(),
  expirationDate: z.coerce.date().optional(),
  cancelDate: z.coerce.date().optional(),
});

const subscriptionUpdateSchema = z.object({
  userId: objectId.optional(),
  packageId: objectId.optional(),
  price: z.number().optional(),
  discount: z.number().optional(),
  total: z.number().optional(),
  couponId: objectId.optional(),
  subscriptionStatus: z.enum(["active", "expired", "cacelled"]).optional(),
  paymentReference: z.string().optional(),
  paymentDate: z.coerce.date().optional(),
  expirationDate: z.coerce.date().optional(),
  cancelDate: z.coerce.date().optional(),
});

const parseSubscriptionCreate = (data) => {
  try {
    return subscriptionCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseSubscriptionUpdate = (data) => {
  try {
    return subscriptionUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  subscriptionCreateSchema,
  subscriptionUpdateSchema,
  parseSubscriptionCreate,
  parseSubscriptionUpdate,
};
