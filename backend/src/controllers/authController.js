import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/v1/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please provide username and password');
  }

  // Find admin by username
  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    const token = generateToken(admin._id);
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      _id: admin._id,
      username: admin.username,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Get current admin profile
// @route   GET /api/v1/auth/me
// @access  Private
// @desc    Logout admin / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
export const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie('adminToken', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});
