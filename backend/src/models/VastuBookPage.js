import mongoose from 'mongoose';

const vastuBookPageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const VastuBookPage = mongoose.model('VastuBookPage', vastuBookPageSchema);
export default VastuBookPage;
