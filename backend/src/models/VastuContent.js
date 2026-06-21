import mongoose from 'mongoose';

const vastuContentSchema = new mongoose.Schema(
  {
    hero: {
      badge: { type: String, default: 'HARMONIZE YOUR ENVIRONMENT' },
      title: { type: String, default: 'Ancient Vastu Shastra Tips' },
      description: { type: String, default: 'Align your home and workplace with the five natural elements — Panchtattva — for lasting health, wealth, and peace. Explore room-by-room guidance, an interactive compass, common Vastu doshas, and simple non-demolition remedies.' }
    },
    bookMeta: {
      coverTitle: { type: String, default: 'Vastu Shastra\nTips Book' },
      coverSubtitle: { type: String, default: 'Sacred Wisdom' },
      coverLogo: { type: String, default: '/rudralogodark.png' },
      introTitle: { type: String, default: 'Introduction' },
      introText: { type: String, default: '"Harmonize your environment to balance the five natural elements, opening the doors to happiness and health."' },
      outroTitle: { type: String, default: 'Rudra Jyotish' },
      outroText: { type: String, default: 'Bringing ancient cosmic wisdom to contemporary homes and offices.' },
      endTitle: { type: String, default: 'RUDRA JYOTISH' },
      endSubtitle: { type: String, default: 'PEACE • WEALTH • HARMONY' },
      endLogo: { type: String, default: '/rudralogodark.png' }
    }
  },
  {
    timestamps: true
  }
);

const VastuContent = mongoose.model('VastuContent', vastuContentSchema);
export default VastuContent;
