import mongoose from 'mongoose';

const teachingApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      enum: ['None', 'Beginner', 'Intermediate', 'Professional'],
      default: 'None',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'accepted', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const TeachingApplication = mongoose.model('TeachingApplication', teachingApplicationSchema);
export default TeachingApplication;
