import mongoose from 'mongoose';

const aboutContentSchema = new mongoose.Schema(
  {
    header: {
      badge: { type: String, default: 'COSMIC JOURNEY' },
      title: { type: String, default: 'About Rudra Ji' },
      description: { type: String, default: 'Meet the founder of Rudra Jyotish—a professional Vastu, Numerology, and Astrology consultant transforming lives across residences, commercial offices, and industrial hubs.' }
    },
    profile: {
      badge: { type: String, default: 'FOUNDER PROFILE' },
      title: { type: String, default: 'Rudra Ji' },
      subtitle: { type: String, default: 'Professional Vastu, Numerology & Astrology Consultant' },
      desc1: { type: String, default: 'I truly believe in the miraculous powers of the nature. The entire universe is there to take care of all our needs and help us to live a healthy and prosperous life. I am a firm believer in the fact that there is something more that meets the eye. Some more powers of the nature, that lie hidden and come forth when no scientific theories can prove their existence.' },
      desc2: { type: String, default: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, I bridge ancient cosmic structures with logical scientific metrics.' },
      imageUrl: { type: String, default: '/uploads/defaults/profile.png' }
    },
    doDont: {
      doTitle: { type: String, default: 'What I Do' },
      doList: [
        {
          title: { type: String, required: true },
          desc: { type: String, required: true }
        }
      ],
      dontTitle: { type: String, default: "What I Don't Do" },
      dontList: [
        {
          title: { type: String, required: true },
          desc: { type: String, required: true }
        }
      ]
    },
    journey: {
      badge: { type: String, default: 'THE PATH OF ALIGNMENT' },
      title: { type: String, default: 'My Journey' },
      subtitle: { type: String, default: 'Professional Vastu, Numerology & Astrology Consultant' },
      desc1: { type: String, default: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, Rudra Ji is a successful figure during the course of her journey performing her duties very effectively.' },
      desc2: { type: String, default: 'Rudra Ji has a great sense of judgment and patience that comes from her initial start of career as an Cabin Crew, followed by a progressive career in the Real Estate Industry where she managed people and business with singular responsibilities. She is an excellent networker and possesses the quality of simplicity with brains.' },
      desc3: { type: String, default: 'Rudra Ji is MBA by qualification and thoroughly enjoys her working for social and professional reasons, bridging corporate strategy with elemental cosmic geometry.' },
      desc4: { type: String, default: 'Her years of learning practice, mentoring, and guiding hundreds of clients through Vastu shifts, balanced numbers, and Astrology remedies make her calculations unparalleled. Her attention to detail has built a legacy of reliance and success.' },
      ctaText: { type: String, default: 'Book Call with Rudra Ji' },
      imageUrl: { type: String, default: '/uploads/defaults/journey.png' }
    }
  },
  {
    timestamps: true
  }
);

const AboutContent = mongoose.model('AboutContent', aboutContentSchema);
export default AboutContent;
