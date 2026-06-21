import express from 'express';
import { loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);
router.get('/me', protect, getAdminProfile);

export default router;
