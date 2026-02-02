const {z} = require("zod");

// MongoDB ObjectId as 24-hex string
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

// Base user schema that mirrors the Mongoose model fields
const baseUserFields = {
    email: z.string().email(
        {message: 'Invalid email address'}
    ),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {message: 'Password must contain uppercase, lowercase, number, and special character'}),

    // In last API, Lee instructed to remove strong password requirement
    // password: z.string().min(1, { message: "Password must be at least 1 character" }),
    name: z.string().min(1).optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().min(3).optional(),
    profilePicUrl: z.string().url().optional(),
    weight: z.number().positive().optional(),
    weightSymbol: z.string().min(1).optional(),
    customerId: objectId.optional(),
    quizResponseId: objectId.optional(),
    role: z.enum(
        ['admin', 'user']
    ).optional(),
    colorId: objectId.optional()
};

// Strict create schema: requires email, others optional to match model
const userCreateSchema = z.object({
    ... baseUserFields
});

// Update schema: all fields optional for partial updates
const userUpdateSchema = z.object(baseUserFields).partial();

// Login schema: requires email and password
const userLoginSchema = z.object({
    email: z.string().email(
        {message: "Invalid email address"}
    ),
    password: z.string().min(1, {message: "Password is required"})
});

// Convenience helpers
const parseUserCreate = (data) => userCreateSchema.parse(data);
const parseUserUpdate = (data) => userUpdateSchema.parse(data);
const parseUserLogin = (data) => userLoginSchema.parse(data);

module.exports = {
    objectId,
    userCreateSchema,
    userUpdateSchema,
    userLoginSchema,
    parseUserCreate,
    parseUserUpdate,
    parseUserLogin
};
