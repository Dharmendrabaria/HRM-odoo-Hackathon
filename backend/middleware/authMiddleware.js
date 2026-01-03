const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Check if token exists after split
            if (!token || token === 'undefined' || token === 'null') {
                return res.status(401).json({ 
                    success: false,
                    message: 'Not authorized, invalid token format' 
                });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    success: false,
                    message: 'Invalid token. Please login again.' 
                });
            }
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false,
                    message: 'Token expired. Please login again.' 
                });
            }

            return res.status(401).json({ 
                success: false,
                message: 'Not authorized, authentication failed' 
            });
        }
    } else {
        return res.status(401).json({ 
            success: false,
            message: 'Not authorized, no token provided' 
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role ${req.user.role} is not authorized to access this route`);
        }
        next();
    };
};

module.exports = { protect, authorize };
