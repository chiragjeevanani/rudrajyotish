import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract from cookies first
  const cookies = req.headers.cookie ? req.headers.cookie.split(';').reduce((acc, c) => {
    const parts = c.split('=');
    if (parts[0]) {
      acc[parts[0].trim()] = parts[1] ? parts[1].trim() : '';
    }
    return acc;
  }, {}) : {};

  if (cookies.adminToken) {
    token = cookies.adminToken;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rudra_jwt_secret_2026');

      // Get user from token and exclude password
      req.user = await Admin.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, admin user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token verification failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});
