import mongoose from 'mongoose';

const vastuMistakeSchema = new mongoose.Schema(
  {
    mistake: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    impact: {
      type: String,
      required: true,
    },
    remedy: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    color: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const VastuMistake = mongoose.model('VastuMistake', vastuMistakeSchema);
export default VastuMistake;
