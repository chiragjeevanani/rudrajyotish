import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShieldAlert, Award, Compass, Sparkles, Star, Check } from 'lucide-react';
import { getImageUrl } from '../utils/image';

const defaultAboutContent = {
  header: {
    badge: 'COSMIC JOURNEY',
    title: 'About Rudra Ji',
    description: 'Meet the founder of Rudra Jyotish—a professional Vastu, Numerology, and Astrology consultant transforming lives across residences, commercial offices, and industrial hubs.'
  },
  profile: {
    badge: 'FOUNDER PROFILE',
    title: 'Rudra Ji',
    subtitle: 'Professional Vastu, Numerology & Astrology Consultant',
    desc1: 'I truly believe in the miraculous powers of the nature. The entire universe is there to take care of all our needs and help us to live a healthy and prosperous life. I am a firm believer in the fact that there is something more that meets the eye. Some more powers of the nature, that lie hidden and come forth when no scientific theories can prove their existence.',
    desc2: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, I bridge ancient cosmic structures with logical scientific metrics.',
    imageUrl: '/about_photo.jpeg'
  },
  doDont: {
    doTitle: 'What I Do',
    doList: [
      { title: 'Vastu & Earth Energy:', desc: 'Balance houses, offices, and factories by studying earth energy networks completely without demolition.' },
      { title: 'Numerology Alignment:', desc: 'Map birth dates and corrections for name tuning, corporate titles, or branding flow using classic Lo Shu Grids.' },
      { title: 'Astrology Guidance:', desc: 'Conduct detailed horoscope and Kundli readings focusing on planetary periods and remedies.' }
    ],
    dontTitle: "What I Don't Do",
    dontList: [
      { title: 'No Major Demolitions:', desc: 'We avoid recommending structural breakdowns or architectural rebuilds in 98% of Vastu cases.' },
      { title: 'No Forced Remedies:', desc: 'We do not advocate for expensive planetary symbols or forced prescriptions. All solutions are logical.' },
      { title: 'No Superstitions:', desc: 'Our processes are scientific energy alignments backed by structural geometry.' }
    ]
  },
  journey: {
    badge: 'THE PATH OF ALIGNMENT',
    title: 'My Journey',
    subtitle: 'Professional Vastu, Numerology & Astrology Consultant',
    desc1: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, Rudra Ji is a successful figure during the course of her journey performing her duties very effectively.',
    desc2: 'Rudra Ji has a great sense of judgment and patience that comes from her initial start of career as an Cabin Crew, followed by a progressive career in the Real Estate Industry where she managed people and business with singular responsibilities. She is an excellent networker and possesses the quality of simplicity with brains.',
    desc3: 'Rudra Ji is MBA by qualification and thoroughly enjoys her working for social and professional reasons, bridging corporate strategy with elemental cosmic geometry.',
    desc4: 'Her years of learning practice, mentoring, and guiding hundreds of clients through Vastu shifts, balanced numbers, and Astrology remedies make her calculations unparalleled. Her attention to detail has built a legacy of reliance and success.',
    ctaText: 'Contact Rudra Ji',
    imageUrl: '/about_journey.png'
  }
};

export default function About() {
  const activeContent = defaultAboutContent;

  return (
    <div style={{ padding: '45px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. Header Section */}
      <section style={{ textAlign: 'center', padding: '0 0 20px' }} className="reveal-zoom-out">
        <span style={{ color: 'var(--color-purple)', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 'bold' }}>{activeContent.header.badge}</span>
        <h1 style={{ fontSize: '2.3rem', marginTop: '10px', marginBottom: '15px' }} className="gold-gradient-text">{activeContent.header.title}</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
          {activeContent.header.description}
        </p>
      </section>

      {/* 2. Main Profile Spotlight */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', padding: '30px 0' }}>
        
        <div className="reveal-blur">
          <div className="glass-panel magnetic-hover" style={{ padding: '10px', border: '1px solid var(--border-active)' }}>
            <img 
              src={getImageUrl(activeContent.profile.imageUrl)} 
              alt="Rudra Ji Profile" 
              style={{ width: '100%', borderRadius: '12px', height: '420px', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="reveal-right">
          <span style={{ color: 'var(--color-gold)', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: 'bold' }}>{activeContent.profile.badge}</span>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>{activeContent.profile.title}</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '-10px' }}>
            {activeContent.profile.subtitle}
          </span>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            {activeContent.profile.desc1}
          </p>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            {activeContent.profile.desc2}
          </p>
        </div>

      </section>

      {/* 3. Deep Dive: What I Do vs. What I Don't Do */}
      <section className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '40px' }}>
        
        {/* What I Do */}
        <div className="glass-panel reveal-left magnetic-hover" style={{ padding: '24px 30px' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} /> {activeContent.doDont.doTitle}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeContent.doDont.doList.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: 'var(--color-gold)', marginTop: '3px' }}><Check size={14} /></div>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  <strong>{item.title}</strong> {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* What I Don't Do */}
        <div className="glass-panel reveal-right magnetic-hover" style={{ padding: '24px 30px' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: '#ef4444', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={18} style={{ color: '#ef4444' }} /> {activeContent.doDont.dontTitle}
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeContent.doDont.dontList.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: '#ef4444', marginTop: '3px' }}><Check size={14} /></div>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  <strong>{item.title}</strong> {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* 4. My Journey Section */}
      <section className="glass-panel reveal-scale" style={{ padding: '30px', marginTop: '40px' }}>
        <span style={{ color: 'var(--color-indigo)', letterSpacing: '0.15em', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', textAlign: 'center', marginBottom: '8px' }}>{activeContent.journey.badge}</span>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', textAlign: 'center', marginBottom: '30px' }}>{activeContent.journey.title}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'center' }}>
          {/* Journey Image Column */}
          <div className="reveal-blur delay-100" style={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '2px solid rgba(217, 125, 100, 0.3)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(217, 125, 100, 0.05)',
            background: 'var(--bg-dark)',
            width: '100%',
            aspectRatio: '4/3'
          }}>
            <img 
              src={getImageUrl(activeContent.journey.imageUrl)} 
              alt="Rudra Ji - My Journey" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Journey Text Column */}
          <div className="reveal-right delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
              {activeContent.journey.subtitle}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
              {activeContent.journey.desc1}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
              {activeContent.journey.desc2}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
              {activeContent.journey.desc3}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
              {activeContent.journey.desc4}
            </p>
            <div style={{ marginTop: '10px' }}>
              <Link to="/contact" className="cosmic-button" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>{activeContent.journey.ctaText}</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

