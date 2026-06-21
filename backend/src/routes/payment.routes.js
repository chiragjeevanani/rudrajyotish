import express from 'express';
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  getPayments,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyRazorpaySignature);
router.get('/', protect, getPayments);

export default router;
