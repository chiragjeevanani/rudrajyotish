import React, { useState } from 'react';
import { BookOpen, GraduationCap, Check, HelpCircle, Send, Star, Compass, Shield } from 'lucide-react';

export default function Teaching() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    experience: 'None',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name check
    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone check - restricted to exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    // Message check
    if (!form.message || form.message.trim().length < 15) {
      newErrors.message = 'Statement of purpose must be at least 15 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api/v1'}/teaching/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: `${form.countryCode} ${form.phone.trim()}`,
          experience: form.experience,
          message: form.message.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit teaching application.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '45px 20px 60px', maxWidth: '1240px', margin: '0 auto' }}>
      
      {/* ── HERO HEADER ── */}
      <section style={{ textAlign: 'center', padding: '0 0 40px' }} className="reveal">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '20px', background: 'rgba(197,168,128,0.1)', border: '1px solid rgba(197,168,128,0.25)', margin: '0 auto 20px' }}>
          <GraduationCap size={15} style={{ color: 'var(--color-gold)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--color-gold)' }}>COSMIC TEACHING INITIATIVE</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '18px' }} className="gold-gradient-text">
          Learn the Art & Teach the Wisdom
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto 10px', lineHeight: '1.8', fontSize: '1rem' }}>
          Become a certified carrier of ancient Vedic knowledge. Learn directly from Rudra Ji, master the intricacies of Vastu & Numerology, and build the foundation to teach and guide others in your own community.
        </p>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', marginTop: '30px' }} className="teaching-grid">
        
        {/* Left Column: Program Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Program Overview */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Star size={20} /> Mentorship & Teacher Training
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Our train-the-trainer cosmic course is crafted for individuals who possess a strong sense of purpose to share wisdom. This is more than a standard certification; it is a spiritual mentorship path.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <Compass size={18} style={{ color: 'var(--color-indigo)' }} />, title: 'Advanced Vastu Shastra', desc: 'Go deep into directional alignments, planetary layouts, and remedial corrections without demolition.' },
                { icon: <BookOpen size={18} style={{ color: 'var(--color-purple)' }} />, title: 'Numerology & Sounds', desc: 'Understand the power of grids, phonetic frequencies, and name correction methods.' },
                
                
                
                // { icon: <Shield size={18} style={{ color: 'var(--color-gold)' }} />, title: 'Pedagogical Training', desc: 'Acquire the tools, curriculum, and structure to confidently host your own workshops and courses.' }
              
              
              
              ].map((pill, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '3px' }}>{pill.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{pill.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.5' }}>{pill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Requirements */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={18} style={{ color: 'var(--color-purple)' }} /> Who is this for?
            </h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Aspiring coaches, educators, or consultants wanting a certified niche.',
                'Practitioners seeking to deepen their understanding under individual review.',
                'Passionate individuals with a clean, selfless intent to heal and guide societies.',
                'Willingness to dedicate 6+ hours weekly for training and practicum sessions.'
              ].map((req, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <Check size={16} style={{ color: 'var(--color-gold)', marginTop: '2px', flexShrink: 0 }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Application Form */}
        <div className="glass-panel" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column' }}>
          
          {submitted ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', padding: '50px 0', margin: 'auto' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', border: '1.5px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <Check size={32} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)' }}>Application Received</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto' }}>
                Thank you for your interest, <strong>{form.name}</strong>. Your application to join our teaching initiative has been submitted. Rudra Ji and our academic team will review your profile and reach out within 3 to 5 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: '0 0 6px' }}>Apply to Learn & Teach</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Please fill in this application form to request review for the upcoming cohort.</p>
              </div>

              {error && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255, 77, 77, 0.08)', border: '1px solid rgba(255, 77, 77, 0.2)', color: '#ff4d4d', fontSize: '0.85rem' }}>
                  {error}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: errors.name ? '#ff4d4d' : 'var(--color-indigo)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    background: 'var(--bg-dark)', 
                    border: errors.name ? '1px solid #ff4d4d' : '1px solid var(--border-glass)', 
                    color: 'var(--text-primary)', 
                    fontSize: '0.95rem',
                    outline: 'none'
                  }} 
                  placeholder="Rahul Sharma"
                />
                {errors.name && (
                  <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: errors.email ? '#ff4d4d' : 'var(--color-indigo)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    background: 'var(--bg-dark)', 
                    border: errors.email ? '1px solid #ff4d4d' : '1px solid var(--border-glass)', 
                    color: 'var(--text-primary)', 
                    fontSize: '0.95rem',
                    outline: 'none'
                  }} 
                  placeholder="name@email.com"
                />
                {errors.email && (
                  <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: errors.phone ? '#ff4d4d' : 'var(--color-indigo)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Phone Number</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    value={form.countryCode}
                    onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                    style={{ 
                      width: '90px', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      background: 'var(--bg-dark)', 
                      border: errors.phone ? '1px solid #ff4d4d' : '1px solid var(--border-glass)', 
                      color: 'var(--text-primary)', 
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+971">+971 (AE)</option>
                    <option value="+65">+65 (SG)</option>
                    <option value="+966">+966 (SA)</option>
                    <option value="+974">+974 (QA)</option>
                    <option value="+977">+977 (NP)</option>
                    <option value="+880">+880 (BD)</option>
                    <option value="+94">+94 (LK)</option>
                  </select>
                  <input 
                    type="tel" 
                    required 
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // restrict to only digits
                      if (val.length <= 10) {
                        setForm({ ...form, phone: val });
                      }
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    maxLength={10}
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      borderRadius: '8px', 
                      background: 'var(--bg-dark)', 
                      border: errors.phone ? '1px solid #ff4d4d' : '1px solid var(--border-glass)', 
                      color: 'var(--text-primary)', 
                      fontSize: '0.95rem',
                      outline: 'none'
                    }} 
                    placeholder="99000 00000"
                  />
                </div>
                {errors.phone && (
                  <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.phone}</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-indigo)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Current Occult Experience</label>
                <select 
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                >
                  <option value="None">None (Absolute Beginner)</option>
                  <option value="Beginner">Beginner (Read books / online material)</option>
                  <option value="Intermediate">Intermediate (Practicing basic adjustments)</option>
                  <option value="Professional">Professional (Working Vastu Consultant / Astrologer)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: errors.message ? '#ff4d4d' : 'var(--color-indigo)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Statement of Purpose</label>
                <textarea 
                  rows="5" 
                  required
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    background: 'var(--bg-dark)', 
                    border: errors.message ? '1px solid #ff4d4d' : '1px solid var(--border-glass)', 
                    color: 'var(--text-primary)', 
                    fontSize: '0.95rem', 
                    resize: 'vertical', 
                    lineHeight: '1.5',
                    outline: 'none'
                  }} 
                  placeholder="Explain why you wish to learn these skills and how you plan to teach/guide others in the future..."
                />
                {errors.message && (
                  <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="cosmic-button" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Submitting Application...' : (
                  <>
                    <Send size={16} /> Submit Application
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </section>

      <style>{`
        @media (max-width: 768px) {
          .teaching-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
