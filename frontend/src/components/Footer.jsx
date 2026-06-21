import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail || localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  return (
    <footer className="glass-panel" style={{ marginTop: '80px', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '40px 40px 0 0', padding: '60px 40px 30px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/rudrajyotishlogo.png" 
              alt="Logo" 
              style={{ width: '120px', height: '120px', objectFit: 'contain' }} 
            />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>RUDRA JYOTISH</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.15em' }}>VASTU & NUMEROLOGY</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Transforming lives, healing spaces, and guiding destiny through deep, practical applications of Vastu, Astrology, and Numerology.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '24px', letterSpacing: '0.05em' }}>Useful Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
            <li><Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">Home</Link></li>
            <li><Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">About Us</Link></li>
            <li><Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">Services</Link></li>
            <li><Link to="/yogadhan" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">Yogadhan</Link></li>
            <li><Link to="/testimonials" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">Testimonials</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="footer-link">Book Consultation</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', marginBottom: '24px', letterSpacing: '0.05em' }}>Contact Info</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
            <li style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              <MapPin size={24} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <div>
                <strong>Office Location</strong>
                <p>Moti Tabela Rd, near Collector Office, near Sandeep Kirana, Maruti Chamber, Moti Tabela, Indore, Madhya Pradesh 452007</p>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <MessageCircle size={18} style={{ color: 'var(--color-gold)' }} />
              <a 
                href="https://wa.me/919179622537" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                +91 91796 22537 (WhatsApp)
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div style={{ borderTop: '1px solid var(--border-glass)', marginTop: '50px', paddingTop: '24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Rudra Jyotish. All Rights Reserved. Designed for Cosmic Alignment.
        </p>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-gold) !important;
          padding-left: 4px;
        }
      `}</style>
    </footer>
  );
}
