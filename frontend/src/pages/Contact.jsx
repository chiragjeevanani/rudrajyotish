import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Sparkles, Send } from 'lucide-react';

const defaultContactInfo = {
  header: {
    badge: 'CONNECT WITH US',
    title: 'Start Your Divine Alignment',
    description: 'Connect directly with Rudra Ji to align your space, numbers, and destiny. Reach out to our headquarters or connect instantly on WhatsApp.'
  },
  location: {
    title: 'Our Headquarters',
    label: 'Office Location',
    addressLines: [
      'Maruti Chamber, Moti Tabela,',
      'Near Collector Office, Near Sandeep Kirana,',
      'Moti Tabela Rd, Indore, MP 452007'
    ]
  },
  whatsapp: {
    label: 'WhatsApp Number',
    number: '+91 91796 22537',
    link: 'https://wa.me/919179622537'
  }
};

export default function Contact() {
  const activeInfo = defaultContactInfo;

  return (
    <div style={{ padding: '60px 20px 80px', maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Title / Header Section */}
      <section style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal-zoom-out">
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 16px', 
          borderRadius: '20px', 
          background: 'rgba(217, 125, 100, 0.1)', 
          border: '1px solid rgba(217, 125, 100, 0.25)', 
          margin: '0 auto 20px' 
        }}>
          <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', color: 'var(--color-gold)' }}>
            {activeInfo.header.badge}
          </span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '15px' }} className="gold-gradient-text">
          {activeInfo.header.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontSize: '1rem' }}>
          {activeInfo.header.description}
        </p>
      </section>

      {/* Premium Contact Details Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '30px',
        marginTop: '20px' 
      }}>
        
        {/* Address Card */}
        {activeInfo.location?.addressLines?.some(line => line && line.trim()) && (
          <div className="glass-panel reveal-left magnetic-hover" style={{ 
            padding: '40px 30px', 
            borderRadius: '24px', 
            border: '1px solid rgba(217, 125, 100, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(217, 125, 100, 0.02)'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '20px', 
              background: 'rgba(217, 125, 100, 0.1)', 
              border: '1px solid var(--color-gold)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-gold)'
            }}>
              <MapPin size={28} />
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.4rem', 
                fontFamily: 'var(--font-serif)', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {activeInfo.location.title || 'Our Headquarters'}
              </h3>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-gold)', 
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '15px'
              }}>
                {activeInfo.location.label || 'Office Location'}
              </span>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.95rem', 
                lineHeight: '1.7',
                margin: 0
              }}>
                {activeInfo.location.addressLines.filter(line => line && line.trim()).map((line, idx, filtered) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < filtered.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp Card */}
        {activeInfo.whatsapp?.number?.trim() && (
          <div className="glass-panel reveal-right magnetic-hover" style={{ 
            padding: '40px 30px', 
            borderRadius: '24px', 
            border: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(59, 130, 246, 0.02)'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '20px', 
              background: 'rgba(59, 130, 246, 0.1)', 
              border: '1px solid var(--color-indigo)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-indigo)'
            }}>
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.4rem', 
                fontFamily: 'var(--font-serif)', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Direct Connection
              </h3>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-indigo)', 
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '15px'
              }}>
                {activeInfo.whatsapp.label || 'WhatsApp Number'}
              </span>
              <p style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: 'var(--text-primary)',
                letterSpacing: '0.05em',
                marginBottom: '20px'
              }}>
                {activeInfo.whatsapp.number}
              </p>
              
              <a 
                href={activeInfo.whatsapp.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gold-button"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(217, 125, 100, 0.2)'
                }}
              >
                <Send size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
