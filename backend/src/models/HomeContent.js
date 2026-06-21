import mongoose from 'mongoose';

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      badge: { type: String, default: 'CELESTIAL HARMONY' },
      titleLine1: { type: String, default: 'Rudra Jyotish' },
      titleLine2: { type: String, default: 'Transforming Spaces & Destiny' },
      description: { type: String, default: 'Unlock peace, wealth, and abundance through logical, scientific Vastu alignments and supportive numerological frequency corrections.' },
      imageUrl: { type: String, default: '/uploads/defaults/hero.png' },
      ctaText: { type: String, default: 'Book a Consultation' },
      compassCtaText: { type: String, default: 'Align Your Compass' }
    },
    compass: {
      badge: { type: String, default: 'INTERACTIVE STABILITY' },
      title: { type: String, default: 'Test Your Energy Direction' },
      description: { type: String, default: 'Our universe works through direct currents. Tap the Vastu Chakra on the left to rotate and align the spatial flow. In ancient Vastu, each of the 16 sectors governs a key area of life.' },
      successText: { type: String, default: 'Vastu Energy Flow Fully Calibrated!' },
      instructionText: { type: String, default: 'Tap the Vastu Chakra to calibrate space flow.' }
    },
    methodology: {
      title: { type: String, default: 'Our Three-Step Scientific Flow' },
      steps: [
        {
          num: { type: String, required: true },
          title: { type: String, required: true },
          desc: { type: String, required: true },
          icon: { type: String, default: 'Sparkles' } // e.g. "Compass", "Sparkles", "Sun"
        }
      ]
    },
    whyUs: {
      badge: { type: String, default: 'TRUST PRINCIPLES' },
      title: { type: String, default: 'Why Align With Us?' },
      description: { type: String, default: 'We provide clear, practical guides that adapt Vastu and Numerology principles to contemporary living standards.' },
      benefits: [
        {
          text: { type: String, required: true },
          color: { type: String, default: 'var(--color-purple)' }
        }
      ],
      stats: [
        {
          target: { type: Number, required: true },
          suffix: { type: String, default: '' },
          text: { type: String, required: true },
          border: { type: String, default: 'var(--color-purple)' },
          shadow: { type: String, default: 'rgba(59, 130, 246, 0.12)' }
        }
      ]
    },
    testimonialSpotlight: {
      quote: { type: String, default: '"Through your guidance in Vastu, Astrology, and Numerology, I not only received the right direction but also gained confidence and mental peace. Your suggestions led to absolute clarity, balance, and positive changes in my life."' },
      author: { type: String, default: 'POOJA KASHYAP' },
      role: { type: String, default: 'Client & Testimony' },
      ctaText: { type: String, default: 'Read More Reviews' }
    },
    ctaSection: {
      title: { type: String, default: 'Ready to Align Your Life?' },
      description: { type: String, default: 'Take the first step towards a balanced environment. Request your directional mapping consult today.' },
      ctaText: { type: String, default: 'Schedule Consultation Now' }
    }
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.model('HomeContent', homeContentSchema);
export default HomeContent;
