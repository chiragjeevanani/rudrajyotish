import mongoose from 'mongoose';

const vastuElementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    zone: {
      type: String,
      required: true,
      trim: true,
    },
    colorHex: {
      type: String,
      required: true,
      trim: true,
    },
    bgCode: {
      type: String,
      required: true,
      trim: true,
    },
    iconName: {
      type: String,
      required: true,
      trim: true,
    },
    benefit: {
      type: String,
      required: true,
      trim: true,
    },
    colors: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 1,
    }
  },
  {
    timestamps: true,
  }
);

const VastuElement = mongoose.model('VastuElement', vastuElementSchema);

export default VastuElement;
