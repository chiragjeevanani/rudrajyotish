import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
      if (favicon) {
        favicon.href = '/rudrajyotishlogo.png';
      }
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
      if (favicon) {
        favicon.href = '/rudrajyotishlogo.png';
      }
    }
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Yogadhan', path: '/yogadhan' },
    { name: 'Vastu Tips', path: '/vastu-tips' },
    { name: 'Teaching', path: '/teaching' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-panel" style={{ borderRadius: '24px', padding: '16px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/rudrajyotishlogo.png" 
            alt="Logo" 
            style={{ 
              width: '105px', 
              height: '105px', 
              objectFit: 'contain', 
              marginTop: '-30px', 
              marginBottom: '-30px', 
              position: 'relative', 
              top: '6px' 
            }} 
          />
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              RUDRA JYOTISH
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.2em' }}>
              VASTU & NUMEROLOGY
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{ 
                  color: isActive ? 'var(--color-gold)' : 'var(--text-primary)', 
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  paddingBottom: '4px'
                }}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Theme Toggle Switcher */}
          <button
            onClick={toggleTheme}
            style={{
              width: '38px',
              height: '38px',
              border: 'none',
              padding: 0
            }}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', paddingBottom: '10px' }} className="mobile-menu-container">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              style={{ 
                color: location.pathname === item.path ? 'var(--color-gold)' : 'var(--text-primary)',
                fontSize: '1rem',
                padding: '8px 0'
              }}
            >
              {item.name}
            </Link>
          ))}
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px' }}>
            <button
              onClick={toggleTheme}
              style={{
                width: '44px',
                height: '44px',
                border: 'none',
                padding: 0
              }}
              className="theme-toggle-btn"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Simple style inject for responsive navbar */}
      <style>{`
        @media (max-width: 991px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
