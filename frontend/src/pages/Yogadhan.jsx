import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Sun, Star, Award, ShieldAlert, Heart, Calendar } from 'lucide-react';

const iconMapper = {
  Compass: <Compass size={24} style={{ color: 'var(--color-indigo)' }} />,
  Sparkles: <Sparkles size={24} style={{ color: 'var(--color-purple)' }} />,
  Sun: <Sun size={24} style={{ color: 'var(--color-gold)' }} />,
  Star: <Star size={24} style={{ color: 'var(--color-gold)' }} />,
  Award: <Award size={24} style={{ color: 'var(--color-purple)' }} />
};

const defaultYogadhanContent = {
  hero: {
    badge: 'THE DIVINE SCIENCE',
    title: 'Yogadhan System',
    description: 'Yogadhan is an integrated, scientific method developed by Rudra Ji. It unites ancient Vastu-Shastra, vibrational Numerology, and Horoscope Astrology into a single cohesive framework.'
  },
  split: {
    title: 'Why Yogadhan?',
    desc1: "Standard Vastu often treats spaces in isolation. Yogadhan recognizes that a house is connected to the birth chart (Kundli) of its residents. If a resident's destiny numbers mismatch the home's primary direction, blockages occur.",
    desc2: "Our methodology rectifies this mismatch through logical, non-demolition energy balancing. By matching name numbers and planetary coordinates, Yogadhan creates an abundant ecosystem."
  },
  pillars: [
    {
      title: 'Earth Energy Grid',
      desc: 'Mapping subtle electromagnetic and telluric currents of the plot. By balancing natural planetary lines (invisible energy grids), we clean the spatial template.',
      iconName: 'Compass',
      color: 'var(--color-indigo)',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.3)',
      shadow: 'rgba(16, 185, 129, 0.12)'
    },
    {
      title: 'Vibrational Numerology',
      desc: 'Matching personal or business name frequencies to the DOB destiny grid. Alignment blocks natural energy bottlenecks, accelerating smooth financial cycles.',
      iconName: 'Sparkles',
      color: 'var(--color-purple)',
      bg: 'rgba(59, 130, 246, 0.08)',
      border: 'rgba(59, 130, 246, 0.3)',
      shadow: 'rgba(59, 130, 246, 0.12)'
    },
    {
      title: 'Planetary Horoscope',
      desc: 'Looking into major/minor period star positions of the main resident. We place customized metal/color cures at high-frequency spatial hotspots.',
      iconName: 'Sun',
      color: 'var(--color-gold)',
      bg: 'rgba(255, 51, 51, 0.08)',
      border: 'rgba(255, 51, 51, 0.3)',
      shadow: 'rgba(255, 51, 51, 0.12)'
    }
  ],
  cta: {
    title: 'Calibrate Your Spatial Energies',
    description: 'Unlock the powerful abundant frequency inside your personal workspace or home. Get a remote Yogadhan assessment directly.',
    ctaText: 'Book Yogadhan Consult'
  }
};

export default function Yogadhan() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail || localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  const activeContent = defaultYogadhanContent;

  const pillars = activeContent.pillars.map(p => ({
    ...p,
    icon: iconMapper[p.iconName] || <Compass size={24} style={{ color: p.color }} />
  }));

  return (
    <div style={{ padding: '45px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. Hero Section */}
      <section style={{ textAlign: 'center', padding: '0 0 20px' }} className="reveal-zoom-out">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', width: 'fit-content', margin: '0 auto 20px' }}>
          <Sparkles size={14} style={{ color: 'var(--color-purple)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--color-purple)' }}>{activeContent.hero.badge}</span>
        </div>
        <h1 style={{ fontSize: '2.3rem', marginBottom: '15px' }} className="gold-gradient-text">{activeContent.hero.title}</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
          {activeContent.hero.description}
        </p>
      </section>
 
      {/* 2. Visual Split */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center', padding: '20px 0' }}>
        
        <div className="reveal-left">
          <div className="glass-panel magnetic-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', borderColor: 'var(--color-purple)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-purple)' }}>{activeContent.split.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              {activeContent.split.desc1}
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              {activeContent.split.desc2}
            </p>
          </div>
        </div>

        <div className="reveal-right" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel magnetic-hover" style={{ padding: '12px', borderColor: 'var(--color-purple)', boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src="/rudrajyotishlogo.png" 
              alt="Yogadhan Emblem" 
              style={{ width: '100%', maxWidth: '340px', borderRadius: '12px', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

      </section>

      {/* 3. The Three Pillars of Yogadhan */}
      <section style={{ padding: '60px 0' }}>
        <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '40px' }} className="gold-gradient-text">The Three Pillars</h2>
        
        <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {pillars.map((p, idx) => (
            <div key={idx} className="glass-panel reveal-flip magnetic-hover" style={{ padding: '45px 30px', display: 'flex', flexDirection: 'column', gap: '20px', borderColor: p.border, boxShadow: `0 8px 32px ${p.shadow}` }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${p.color}` }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: p.color }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact Block */}
      <section className="glass-panel reveal-scale" style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', borderColor: 'var(--color-indigo)', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)' }}>
        <h2 style={{ fontSize: '2rem' }} className="gold-gradient-text">{activeContent.cta.title}</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '550px', lineHeight: '1.6' }}>
          {activeContent.cta.description}
        </p>
        <Link to="/contact" className="cosmic-button" style={{ marginTop: '10px' }}>
          <Calendar size={18} /> Inquire About Yogadhan
        </Link>
      </section>

    </div>
  );
}

