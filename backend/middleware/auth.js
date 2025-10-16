const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes - verifies JWT token
 * Add this middleware to any route that requires authentication
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer TOKEN"
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (exclude password)
      req.user = await User.findById(decoded.id);

      // Check if user still exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'User no longer exists'
        });
      }

      // Check if user is verified
      if (!req.user.isVerified) {
        return res.status(401).json({
          success: false,
          error: 'Please verify your email first'
        });
      }

      next(); // Continue to next middleware/route handler
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error in authentication'
    });
  }
};

/**
 * Generate JWT token
 */
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
