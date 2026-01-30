const { z } = require("zod");

const packageCreateSchema = z.object({
  packageName: z.string().min(1, { message: "packageName is required" }),
  price: z.number({ message: "price must be a number" }),
});

const packageUpdateSchema = z.object({
  packageName: z.string().min(1).optional(),
  price: z.number().optional(),
});

const parsePackageCreate = (data) => {
  try {
    return packageCreateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

const parsePackageUpdate = (data) => {
  try {
    return packageUpdateSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`);
  }
};

module.exports = {
  packageCreateSchema,
  packageUpdateSchema,
  parsePackageCreate,
  parsePackageUpdate,
};
