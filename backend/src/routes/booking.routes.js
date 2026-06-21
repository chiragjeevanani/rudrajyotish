import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.route('/:id')
  .get(protect, getBookingById)
  .delete(protect, deleteBooking);

export default router;
