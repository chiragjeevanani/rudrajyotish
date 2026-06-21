import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import { sendBookingEmails } from '../utils/emailService.js';

// @desc    Get all bookings (paginated, filterable)
// @route   GET /api/v1/bookings
// @access  Private (Admin)
export const getBookings = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  // Filters
  const keyword = req.query.keyword
    ? {
        $or: [
          { 'customer.name': { $regex: req.query.keyword, $options: 'i' } },
          { 'customer.email': { $regex: req.query.keyword, $options: 'i' } },
          { 'customer.phone': { $regex: req.query.keyword, $options: 'i' } },
          { 'service.title': { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const paymentStatus = req.query.paymentStatus
    ? { paymentStatus: req.query.paymentStatus }
    : {};

  const serviceTitle = req.query.serviceTitle
    ? { 'service.title': req.query.serviceTitle }
    : {};

  const count = await Booking.countDocuments({ ...keyword, ...paymentStatus, ...serviceTitle });
  const bookings = await Booking.find({ ...keyword, ...paymentStatus, ...serviceTitle })
    .sort({ appointmentDate: -1, createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ bookings, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get booking by ID
// @route   GET /api/v1/bookings/:id
// @access  Private (Admin)
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Create a new booking (public)
// @route   POST /api/v1/bookings
// @access  Public
export const createBooking = asyncHandler(async (req, res) => {
  const {
    service,
    appointmentDate,
    timeSlot,
    customer,
    additionalInfo,
    paymentStatus,
    transactionId,
    razorpayOrderId,
    razorpayPaymentId,
  } = req.body;

  if (!service || !appointmentDate || !timeSlot || !customer || !customer.name || !customer.email || !customer.phone) {
    res.status(400);
    throw new Error('Please fill in all required fields (service, appointmentDate, timeSlot, customer details)');
  }

  const booking = new Booking({
    service,
    appointmentDate,
    timeSlot,
    customer,
    additionalInfo,
    paymentStatus: paymentStatus || 'pending',
    transactionId,
    razorpayOrderId,
    razorpayPaymentId,
  });

  const createdBooking = await booking.save();

  // If the booking is created as paid directly (e.g. simulation or already processed),
  // notify both the customer and the admin.
  if (createdBooking.paymentStatus === 'paid') {
    await sendBookingEmails(createdBooking);
  }

  res.status(201).json(createdBooking);
});

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private (Admin)
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: 'Booking removed successfully' });
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});
