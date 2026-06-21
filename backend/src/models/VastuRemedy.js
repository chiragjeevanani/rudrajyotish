import mongoose from 'mongoose';

const vastuRemedySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // lucide-react icon name, e.g. "Shield", "Leaf"
      default: "Sparkles",
    },
    color: {
      type: String,
      trim: true,
    },
    bg: {
      type: String,
      trim: true,
    },
    border: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const VastuRemedy = mongoose.model('VastuRemedy', vastuRemedySchema);
export default VastuRemedy;
