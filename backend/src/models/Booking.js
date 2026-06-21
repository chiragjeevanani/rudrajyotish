import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    service: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true }, // in minutes
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },
    additionalInfo: {
      birthDate: { type: String, trim: true },
      birthTime: { type: String, trim: true },
      birthPlace: { type: String, trim: true },
      vastuAddress: { type: String, trim: true },
      notes: { type: String, trim: true },
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      trim: true,
    },
    razorpayOrderId: {
      type: String,
      trim: true,
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
