import mongoose from 'mongoose';

const yogadhanContentSchema = new mongoose.Schema(
  {
    hero: {
      badge: { type: String, default: 'THE DIVINE SCIENCE' },
      title: { type: String, default: 'Yogadhan System' },
      description: { type: String, default: 'Yogadhan is an integrated, scientific method developed by Rudra Ji. It unites ancient Vastu-Shastra, vibrational Numerology, and Horoscope Astrology into a single cohesive framework.' }
    },
    split: {
      title: { type: String, default: 'Why Yogadhan?' },
      desc1: { type: String, default: "Standard Vastu often treats spaces in isolation. Yogadhan recognizes that a house is connected to the birth chart (Kundli) of its residents. If a resident's destiny numbers mismatch the home's primary direction, blockages occur." },
      desc2: { type: String, default: "Our methodology rectifies this mismatch through logical, non-demolition energy balancing. By matching name numbers and planetary coordinates, Yogadhan creates an abundant ecosystem." }
    },
    pillars: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        iconName: { type: String, default: 'Compass' }, // String representation of Lucide icon (Compass, Sparkles, Sun)
        color: { type: String, default: 'var(--color-indigo)' },
        bg: { type: String, default: 'rgba(16, 185, 129, 0.08)' },
        border: { type: String, default: 'rgba(16, 185, 129, 0.3)' },
        shadow: { type: String, default: 'rgba(16, 185, 129, 0.12)' }
      }
    ],
    cta: {
      title: { type: String, default: 'Calibrate Your Spatial Energies' },
      description: { type: String, default: 'Unlock the powerful abundant frequency inside your personal workspace or home. Get a remote Yogadhan assessment directly.' },
      ctaText: { type: String, default: 'Book Yogadhan Consult' }
    }
  },
  {
    timestamps: true
  }
);

const YogadhanContent = mongoose.model('YogadhanContent', yogadhanContentSchema);
export default YogadhanContent;
