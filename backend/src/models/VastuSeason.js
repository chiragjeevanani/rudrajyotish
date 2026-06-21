import mongoose from 'mongoose';

const vastuSeasonSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    months: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String, // lucide-react icon name, e.g. "Sun", "Leaf"
      default: "Leaf",
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
    tips: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const VastuSeason = mongoose.model('VastuSeason', vastuSeasonSchema);
export default VastuSeason;
