import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import { sendBookingEmails } from '../utils/emailService.js';

// Initialize Razorpay
// Note: If keys are missing, we log a warning but don't crash, allowing simulation or configuration later.
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    console.warn('Razorpay Key ID or Key Secret is missing. Payments will fail or run in simulation.');
    return null;
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

// @desc    Create Razorpay Order
// @route   POST /api/v1/payments/create-order
// @access  Public
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  if (!bookingId) {
    res.status(400);
    throw new Error('Booking ID is required');
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const amountInPaisa = booking.service.price * 100; // Razorpay expects amount in paise

  const razorpay = getRazorpayInstance();
  if (!razorpay) {
    // If Razorpay instance is not initialized, mock order creation for smooth simulation
    console.log('Using simulated payment order due to missing/invalid Razorpay configuration');
    const mockOrderId = `order_mock_${Math.random().toString(36).substring(2, 15)}`;
    
    booking.razorpayOrderId = mockOrderId;
    await booking.save();

    res.json({
      id: mockOrderId,
      amount: amountInPaisa,
      currency: 'INR',
      receipt: `receipt_${booking._id}`,
      simulated: true,
    });
    return;
  }

  try {
    const options = {
      amount: amountInPaisa,
      currency: 'INR',
      receipt: `receipt_${booking._id}`,
    };

    const order = await razorpay.orders.create(options);

    // Save Razorpay order ID to booking
    booking.razorpayOrderId = order.id;
    await booking.save();

    // Create a payment record in pending status
    await Payment.create({
      bookingId: booking._id,
      razorpayOrderId: order.id,
      amount: booking.service.price,
      currency: 'INR',
      status: 'created',
    });

    res.json(order);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500);
    throw new Error(`Razorpay order creation failed: ${error.message}`);
  }
});

// @desc    Verify Razorpay Signature
// @route   POST /api/v1/payments/verify
// @access  Public
export const verifyRazorpaySignature = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

  if (!razorpayOrderId || !bookingId) {
    res.status(400);
    throw new Error('razorpayOrderId and bookingId are required');
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Handle simulation mode
  if (razorpayOrderId.startsWith('order_mock_') || !process.env.RAZORPAY_KEY_SECRET) {
    console.log('Simulating payment verification...');
    booking.paymentStatus = 'paid';
    booking.transactionId = razorpayPaymentId || `pay_mock_${Math.random().toString(36).substring(2, 10)}`;
    booking.razorpayPaymentId = booking.transactionId;
    await booking.save();

    // Create / Update payment record
    await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        razorpayOrderId: booking.razorpayOrderId,
        razorpayPaymentId: booking.transactionId,
        amount: booking.service.price,
        status: 'captured',
        metadata: { simulation: true },
      },
      { upsert: true, new: true }
    );

    // Trigger confirmation emails (customer + admin)
    await sendBookingEmails(booking);

    res.json({ status: 'success', message: 'Simulated payment verified' });
    return;
  }

  // Live Razorpay validation
  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const digest = shasum.digest('hex');

  if (digest === razorpaySignature) {
    // 1. Update booking
    booking.paymentStatus = 'paid';
    booking.transactionId = razorpayPaymentId;
    booking.razorpayPaymentId = razorpayPaymentId;
    await booking.save();

    // 2. Update/create payment record
    await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        status: 'captured',
        metadata: req.body,
      },
      { upsert: true }
    );

    // 3. Send email confirmations (customer + admin)
    await sendBookingEmails(booking);

    res.json({ status: 'success', message: 'Payment verified successfully' });
  } else {
    // Mark booking payment status as failed
    booking.paymentStatus = 'failed';
    await booking.save();

    // Update payment record as failed
    await Payment.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: 'failed',
        metadata: req.body,
      },
      { upsert: true }
    );

    res.status(400);
    throw new Error('Invalid signature, payment verification failed');
  }
});

// @desc    Get all payments
// @route   GET /api/v1/payments
// @access  Private (Admin)
export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({})
    .populate('bookingId')
    .sort({ createdAt: -1 });
  res.json(payments);
});
