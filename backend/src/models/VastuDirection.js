import mongoose from 'mongoose';

const vastuDirectionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // N, NE, E, SE, S, SW, W, NW
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    deity: {
      type: String,
      required: true,
      trim: true,
    },
    element: {
      type: String,
      required: true,
      trim: true,
    },
    elementColor: {
      type: String,
      trim: true,
    },
    elementBg: {
      type: String,
      trim: true,
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },
    dos: {
      type: [String],
      default: [],
    },
    donts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const VastuDirection = mongoose.model('VastuDirection', vastuDirectionSchema);
export default VastuDirection;
