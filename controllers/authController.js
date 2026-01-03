const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        console.log("Register Request:", req.body);
        const { name, email, password, role, employeeId, department, designation } = req.body;

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            role,
            employeeId,
            department,
            designation
        });

        if (user) {
            console.log("User Created:", user._id);
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.role),
                }
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        console.error("Register Error:", error.message);
        next(error);
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        console.log("Login Request:", req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (user && (await user.matchPassword(password))) {
            console.log("Login Success:", user.email);
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.role),
                }
            });
        } else {
            console.log("Login Failed: Invalid credentials");
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        console.error("Login Error:", error.message);
        next(error);
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404);
            throw new Error('User not found with that email');
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP and save to DB (Simple hash for demo, or saving plain for 10m validity is OK too but hashed is better)
        // For simplicity in this interaction, we will save plain OTP but production should hash it.
        // Let's stick to saving it directly to make "Login using OTP" easier if needed later, 
        // but since this is "Forgot Password", we'll just save it.
        user.resetPasswordOtp = otp;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

        await user.save({ validateBeforeSave: false });

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \n\n Your OTP is: ${otp} \n\n This OTP is valid for 10 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Dayflow HRMS - Password Reset OTP',
                message,
            });

            res.status(200).json({
                success: true,
                data: 'Email sent',
            });
        } catch (error) {
            user.resetPasswordOtp = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            res.status(500);
            throw new Error('Email could not be sent');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Reset Password using OTP
// @route   PUT /api/auth/resetpassword
// @access  Public
const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            res.status(400);
            throw new Error('Please provide email, OTP and new password');
        }

        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400);
            throw new Error('Invalid OTP or OTP expired');
        }

        // Set new password
        user.password = password;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
};
