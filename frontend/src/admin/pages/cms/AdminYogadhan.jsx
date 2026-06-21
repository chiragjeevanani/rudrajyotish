import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Edit, Save, CheckCircle, AlertCircle, RefreshCw, Eye, Sparkles, Compass, Sun, Star, Award
} from 'lucide-react';

export default function AdminYogadhan() {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchYogadhanContent = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/yogadhan');
      setContent(data);
    } catch (error) {
      console.error('Error fetching yogadhan content:', error);
      setErrorMsg('Failed to load yogadhan page content settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYogadhanContent();
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

  const handlePillarChange = (index, field, value) => {
    setContent(prev => {
      const updatedPillars = [...prev.pillars];
      updatedPillars[index] = {
        ...updatedPillars[index],
        [field]: value
      };
      return {
        ...prev,
        pillars: updatedPillars
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');
      const { data } = await api.put('/yogadhan', content);
      setContent(data);
      setSuccessMsg('Yogadhan page content updated successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Failed to save yogadhan content:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update yogadhan page settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '100px 0' }}>
        <RefreshCw size={32} className="spin" style={{ display: 'block', margin: '0 auto 16px', animation: 'spin 1.5s linear infinite' }} />
        Loading yogadhan page configurations...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', border: '1px solid #ff4d4d' }}>
        <AlertCircle size={40} style={{ color: '#ff4d4d', marginBottom: '16px' }} />
        <h3 style={{ color: '#fff', margin: 0 }}>Error Loading Configurations</h3>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', name: 'Hero Banner', icon: <Eye size={16} /> },
    { id: 'split', name: 'Methodology Grid', icon: <Sparkles size={16} /> },
    { id: 'pillars', name: 'Three Pillars', icon: <Compass size={16} /> },
    { id: 'cta', name: 'Call To Action', icon: <Sun size={16} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Yogadhan Page Sections
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Customize all promotional banners, badge subheadings, descriptions, and the three main system pillars.
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
            transition: 'all 0.25s'
          }}
        >
          {saving ? <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} /> : <Save size={16} />}
          Save Settings
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '12px 18px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--color-indigo)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '12px 18px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ff4d4d', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <div className="admin-cms-split-layout">
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
                cursor: 'pointer'
              }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Hero Header Settings</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Hero Badge Subheading</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) => handleNestedChange('hero', 'badge', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Main Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => handleNestedChange('hero', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Introductory Paragraph</label>
                <textarea
                  rows="4"
                  value={content.hero.description}
                  onChange={(e) => handleNestedChange('hero', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'split' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Methodology Showcase Grid</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Grid Heading</label>
                <input
                  type="text"
                  value={content.split.title}
                  onChange={(e) => handleNestedChange('split', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Showcase Paragraph 1</label>
                <textarea
                  rows="4"
                  value={content.split.desc1}
                  onChange={(e) => handleNestedChange('split', 'desc1', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Showcase Paragraph 2</label>
                <textarea
                  rows="4"
                  value={content.split.desc2}
                  onChange={(e) => handleNestedChange('split', 'desc2', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'pillars' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Three Pillars Configuration</h3>
              {content.pillars.map((pillar, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(255, 255, 255, 0.01)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>PILLAR #{idx + 1} Settings</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Pillar Title</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Icon Name</label>
                      <select
                        value={pillar.iconName}
                        onChange={(e) => handlePillarChange(idx, 'iconName', e.target.value)}
                        style={{ width: '100%', padding: '8px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}
                      >
                        <option value="Compass">Compass</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Sun">Sun</option>
                        <option value="Star">Star</option>
                        <option value="Award">Award</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-gold)', marginBottom: '4px' }}>Description</label>
                    <textarea
                      rows="3"
                      value={pillar.desc}
                      onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                      style={{ width: '100%', padding: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: '#fff', resize: 'vertical' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Bottom Call to Action Banner</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Section Title</label>
                <input
                  type="text"
                  value={content.cta.title}
                  onChange={(e) => handleNestedChange('cta', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Section Subtitle</label>
                <textarea
                  rows="4"
                  value={content.cta.description}
                  onChange={(e) => handleNestedChange('cta', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>CTA Button Text</label>
                <input
                  type="text"
                  value={content.cta.ctaText}
                  onChange={(e) => handleNestedChange('cta', 'ctaText', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
