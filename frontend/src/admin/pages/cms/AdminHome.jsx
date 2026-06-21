import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Home, Edit, Save, CheckCircle, AlertCircle, Sparkles, Compass, Sun, RefreshCw, Layers, Eye, Users, Quote, Upload
} from 'lucide-react';

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/home');
      setContent(data);
    } catch (error) {
      console.error('Error fetching home content:', error);
      setErrorMsg('Failed to load home page content settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const handleNestedChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, field, index, subfield, value) => {
    setContent(prev => {
      const updatedArray = [...prev[section][field]];
      updatedArray[index] = {
        ...updatedArray[index],
        [subfield]: value
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray
        }
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      setErrorMsg('');
      setSuccessMsg('');
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleNestedChange('hero', 'imageUrl', data.url);
      setSuccessMsg('Image uploaded successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');
      const { data } = await api.put('/home', content);
      setContent(data);
      setSuccessMsg('Homepage content updated successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Failed to save home content:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update homepage settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '100px 0' }}>
        <RefreshCw size={32} className="spin" style={{ display: 'block', margin: '0 auto 16px', animation: 'spin 1.5s linear infinite' }} />
        Loading homepage content configurations...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px solid #ff4d4d' }}>
        <AlertCircle size={40} style={{ color: '#ff4d4d', marginBottom: '16px' }} />
        <h3 style={{ color: '#fff', margin: 0 }}>Error Loading Configurations</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
          Please make sure the backend server is running and the database seeder was executed successfully.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', name: 'Hero Banner', icon: <Eye size={16} /> },
    { id: 'compass', name: 'Compass Section', icon: <Compass size={16} /> },
    { id: 'methodology', name: 'Methodology Steps', icon: <Layers size={16} /> },
    { id: 'whyUs', name: 'Why Us & Stats', icon: <Users size={16} /> },
    { id: 'testimonial', name: 'Spotlight Testimonial', icon: <Quote size={16} /> },
    { id: 'cta', name: 'Bottom Callout', icon: <Sparkles size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Home Page Sections
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Customize all promotional banners, badges, descriptions, methodology cards, trust statistics, and calls to action.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--color-gold)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            boxShadow: '0 4px 15px rgba(197, 168, 128, 0.2)',
            transition: 'all 0.25s'
          }}
        >
          {saving ? <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Message Banners */}
      {successMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 18px',
          borderRadius: '8px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--color-indigo)',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          <CheckCircle size={18} />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 18px',
          borderRadius: '8px',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ff4d4d',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* Tabs Layout */}
      <div className="admin-cms-split-layout">
        
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '8px',
                textAlign: 'left',
                border: activeTab === tab.id ? '1px solid rgba(197, 168, 128, 0.3)' : '1px solid transparent',
                background: activeTab === tab.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-gold)' : 'var(--text-muted)',
                fontWeight: activeTab === tab.id ? 'bold' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          
          {/* TAB: HERO */}
          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                1. Hero Header Section
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Badge Header Text</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => handleNestedChange('hero', 'badge', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Banner Image</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={content.hero.imageUrl}
                      onChange={(e) => handleNestedChange('hero', 'imageUrl', e.target.value)}
                      placeholder="Paste image URL..."
                      style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '6px',
                      color: 'var(--color-gold)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      whiteSpace: 'nowrap'
                    }}>
                      {uploading ? <RefreshCw size={14} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Upload size={14} />}
                      {uploading ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Title Line 1</label>
                  <input
                    type="text"
                    value={content.hero.titleLine1}
                    onChange={(e) => handleNestedChange('hero', 'titleLine1', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Title Line 2</label>
                  <input
                    type="text"
                    value={content.hero.titleLine2}
                    onChange={(e) => handleNestedChange('hero', 'titleLine2', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Introductory Paragraph / Subtext</label>
                <textarea
                  rows="4"
                  value={content.hero.description}
                  onChange={(e) => handleNestedChange('hero', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Consultation CTA Button Text</label>
                  <input
                    type="text"
                    value={content.hero.ctaText}
                    onChange={(e) => handleNestedChange('hero', 'ctaText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Compass Anchor Button Text</label>
                  <input
                    type="text"
                    value={content.hero.compassCtaText}
                    onChange={(e) => handleNestedChange('hero', 'compassCtaText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPASS */}
          {activeTab === 'compass' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                2. Vastu Chakra Compass Tool Section
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Badge Header Text</label>
                  <input
                    type="text"
                    value={content.compass.badge}
                    onChange={(e) => handleNestedChange('compass', 'badge', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Title</label>
                  <input
                    type="text"
                    value={content.compass.title}
                    onChange={(e) => handleNestedChange('compass', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Compass Tool Description</label>
                <textarea
                  rows="4"
                  value={content.compass.description}
                  onChange={(e) => handleNestedChange('compass', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Calibrated Success Text</label>
                  <input
                    type="text"
                    value={content.compass.successText}
                    onChange={(e) => handleNestedChange('compass', 'successText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Tap Instruction Note</label>
                  <input
                    type="text"
                    value={content.compass.instructionText}
                    onChange={(e) => handleNestedChange('compass', 'instructionText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                3. Detailed Scientific Flow Methodology (3 Steps)
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Main Title</label>
                <input
                  type="text"
                  value={content.methodology.title}
                  onChange={(e) => handleNestedChange('methodology', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                />
              </div>

              {/* Loop through 3 Steps */}
              {content.methodology.steps.map((step, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(255, 255, 255, 0.01)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>Step Label: {step.num}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Icon Select:</label>
                      <select
                        value={step.icon}
                        onChange={(e) => handleArrayItemChange('methodology', 'steps', idx, 'icon', e.target.value)}
                        style={{ padding: '4px 8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        <option value="Compass">Compass</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Sun">Sun</option>
                        <option value="Star">Star</option>
                        <option value="Award">Award</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Step No.</label>
                      <input
                        type="text"
                        value={step.num}
                        onChange={(e) => handleArrayItemChange('methodology', 'steps', idx, 'num', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Step Title</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleArrayItemChange('methodology', 'steps', idx, 'title', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Description</label>
                    <textarea
                      rows="2"
                      value={step.desc}
                      onChange={(e) => handleArrayItemChange('methodology', 'steps', idx, 'desc', e.target.value)}
                      style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none', resize: 'vertical', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: WHY US & STATS */}
          {activeTab === 'whyUs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                4. Why Us (Benefits List & Stats Counter Panel)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Badge</label>
                  <input
                    type="text"
                    value={content.whyUs.badge}
                    onChange={(e) => handleNestedChange('whyUs', 'badge', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Title</label>
                  <input
                    type="text"
                    value={content.whyUs.title}
                    onChange={(e) => handleNestedChange('whyUs', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Description Paragraph</label>
                <textarea
                  rows="3"
                  value={content.whyUs.description}
                  onChange={(e) => handleNestedChange('whyUs', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Benefits (4 items) */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0 0 12px' }}>Why Us Bullets (Benefits Grid):</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {content.whyUs.benefits.map((ben, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', flexDirection: 'column', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '12px', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>Benefit #{idx + 1}</span>
                        <select
                          value={ben.color}
                          onChange={(e) => handleArrayItemChange('whyUs', 'benefits', idx, 'color', e.target.value)}
                          style={{ padding: '2px 6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          <option value="var(--color-purple)">Purple Icon</option>
                          <option value="var(--color-yellow)">Yellow Icon</option>
                          <option value="var(--color-indigo)">Teal/Indigo Icon</option>
                          <option value="var(--color-gold)">Gold Icon</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={ben.text}
                        onChange={(e) => handleArrayItemChange('whyUs', 'benefits', idx, 'text', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Counters (4 items) */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: '0 0 12px' }}>Beautiful Counter Metrics (4 Stats):</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {content.whyUs.stats.map((stat, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>Metric Stat #{idx + 1}</span>
                        <select
                          value={stat.border}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Update border & derive shadow appropriately
                            const shadows = {
                              'var(--color-purple)': 'rgba(59, 130, 246, 0.12)',
                              'var(--color-indigo)': 'rgba(16, 185, 129, 0.12)',
                              'var(--color-yellow)': 'rgba(251, 191, 36, 0.12)',
                              'var(--color-gold)': 'rgba(255, 51, 51, 0.12)'
                            };
                            setContent(prev => {
                              const updatedStats = [...prev.whyUs.stats];
                              updatedStats[idx] = {
                                ...updatedStats[idx],
                                border: val,
                                shadow: shadows[val] || 'rgba(255,255,255,0.05)'
                              };
                              return {
                                ...prev,
                                whyUs: {
                                  ...prev.whyUs,
                                  stats: updatedStats
                                }
                              };
                            });
                          }}
                          style={{ padding: '2px 6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          <option value="var(--color-purple)">Purple Theme</option>
                          <option value="var(--color-indigo)">Green Theme</option>
                          <option value="var(--color-yellow)">Yellow Theme</option>
                          <option value="var(--color-gold)">Gold/Red Theme</option>
                        </select>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target Val (Number)</label>
                          <input
                            type="number"
                            value={stat.target}
                            onChange={(e) => handleArrayItemChange('whyUs', 'stats', idx, 'target', Number(e.target.value))}
                            style={{ width: '100%', padding: '6px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Suffix</label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={(e) => handleArrayItemChange('whyUs', 'stats', idx, 'suffix', e.target.value)}
                            style={{ width: '100%', padding: '6px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Description / Title</label>
                        <input
                          type="text"
                          value={stat.text}
                          onChange={(e) => handleArrayItemChange('whyUs', 'stats', idx, 'text', e.target.value)}
                          style={{ width: '100%', padding: '6px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIAL SPOTLIGHT */}
          {activeTab === 'testimonial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                5. Highlight Testimonial Spotlight
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Featured Quote Text</label>
                <textarea
                  rows="5"
                  value={content.testimonialSpotlight.quote}
                  onChange={(e) => handleNestedChange('testimonialSpotlight', 'quote', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Author Name</label>
                  <input
                    type="text"
                    value={content.testimonialSpotlight.author}
                    onChange={(e) => handleNestedChange('testimonialSpotlight', 'author', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Author Subtitle / Role</label>
                  <input
                    type="text"
                    value={content.testimonialSpotlight.role}
                    onChange={(e) => handleNestedChange('testimonialSpotlight', 'role', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Read More Button Text</label>
                  <input
                    type="text"
                    value={content.testimonialSpotlight.ctaText}
                    onChange={(e) => handleNestedChange('testimonialSpotlight', 'ctaText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: CTA */}
          {activeTab === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>
                6. Bottom High-Converting Call to Action Banner
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Section Title</label>
                  <input
                    type="text"
                    value={content.ctaSection.title}
                    onChange={(e) => handleNestedChange('ctaSection', 'title', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Button Label CTA Text</label>
                  <input
                    type="text"
                    value={content.ctaSection.ctaText}
                    onChange={(e) => handleNestedChange('ctaSection', 'ctaText', e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Banner Description</label>
                <textarea
                  rows="4"
                  value={content.ctaSection.description}
                  onChange={(e) => handleNestedChange('ctaSection', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
