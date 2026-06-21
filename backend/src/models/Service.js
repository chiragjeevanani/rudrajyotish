import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sub: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // duration in minutes
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    imgUrl: {
      type: String,
      trim: true,
    },
    list: {
      type: [String], // Array of service points/features
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    availability: {
      activeDays: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      slots: [
        {
          label: { type: String, default: 'Morning slots' },
          times: { type: [String], default: [] }
        }
      ]
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
