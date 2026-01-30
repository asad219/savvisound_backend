const { z } = require("zod");

const couponCreateSchema = z.object({
  couponCode: z.string().min(1, { message: "couponCode is required" }),
  description: z.string().optional(),
  discountType: z.enum(["fixed", "percentage"], { message: "discountType must be 'fixed' or 'percentage'" }),
  discountValue: z.number({ message: "discountValue must be a number" }),
  isActive: z.boolean().optional(),
  expiryDate: z.coerce.date().optional(),
});

const couponUpdateSchema = z.object({
  couponCode: z.string().min(1).optional(),
  description: z.string().optional(),
  discountType: z.enum(["fixed", "percentage"]).optional(),
  discountValue: z.number().optional(),
  isActive: z.boolean().optional(),
  expiryDate: z.coerce.date().optional(),
});

const parseCouponCreate = (data) => {
  try {
    return couponCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parseCouponUpdate = (data) => {
  try {
    return couponUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  couponCreateSchema,
  couponUpdateSchema,
  parseCouponCreate,
  parseCouponUpdate,
};
