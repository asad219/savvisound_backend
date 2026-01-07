const { User } = require('../models/userModel');
const { parseUserCreate, parseUserLogin } = require('../validators/user.zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        // Validate request body with Zod
        const validatedData = parseUserCreate(req.body);
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists with this email' 
            });
        }
        
        // Prepare user data
        let userData = { ...validatedData };
        
        // Hash password if provided
        if (validatedData.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);
            userData.passwordHash = hashedPassword;
            delete userData.password; // Remove plain password
        }
        
        // Create new user
        const newUser = new User(userData);
        
        await newUser.save();
        
        // Remove passwordHash from response
        const userResponse = newUser.toObject();
        delete userResponse.passwordHash;
        delete userResponse.passwordHash;
        
        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        // Validate request body with Zod
        const validatedData = parseUserLogin(req.body);
        
        // Find user by email
        const user = await User.findOne({ email: validatedData.email });
        
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
        
        // Check if user has a password
        if (!user.passwordHash) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
        
        // Verify password
        const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        // Remove passwordHash from response
        const userResponse = user.toObject();
        delete userResponse.passwordHash;
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getUserById,
    registerUser,
    loginUser
};