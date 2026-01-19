const { User } = require('../models/userModel');
const { parseUserCreate, parseUserLogin } = require('../validators/user.zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { sanitizeUserResponse } = require('../utils/userUtils');
const config = require('../config');

const getUserById = asyncHandler(async (req, res) => {
    // Remove try-catch, let middleware handle errors
    const user = await User.findById(req.params.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    const userResponse = sanitizeUserResponse(user);
    
    res.status(200).json(userResponse);
});

const registerUser = asyncHandler(async (req, res) => {
    // Validate request body with Zod
    const validatedData = parseUserCreate(req.body);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    
    if (existingUser) {
        res.status(400);
        throw new Error('User already exists with this email');
    }
    
    // Prepare user data
    let userData = { ...validatedData };
    
    // Hash password if provided
    if (validatedData.password) {
        const hashedPassword = await bcrypt.hash(validatedData.password, config.security.bcryptRounds);
        userData.passwordHash = hashedPassword;
        delete userData.password; // Remove plain password
    }
    
    // Create new user
    const newUser = new User(userData);
    
    await newUser.save();
    
    const userResponse = sanitizeUserResponse(newUser);
    
    res.status(201).json({
        message: 'User registered successfully',
        user: userResponse
    });
});

const loginUser = asyncHandler(async (req, res) => {
    // Validate request body with Zod
    const validatedData = parseUserLogin(req.body);
    
    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    
    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
    // Check if user has a password
    if (!user.passwordHash) {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);
    
    if (!isValidPassword) {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
    
    const userResponse = sanitizeUserResponse(user);
    
    res.status(200).json({
        message: 'Login successful',
        token,
        user: userResponse
    });
});

module.exports = {
    getUserById,
    registerUser,
    loginUser
};