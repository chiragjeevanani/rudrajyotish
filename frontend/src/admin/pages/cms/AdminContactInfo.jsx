import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Edit, Save, CheckCircle, AlertCircle, RefreshCw, Eye, MessageCircle, MapPin, Clock, Trash2
} from 'lucide-react';

export default function AdminContactInfo() {
  const [activeTab, setActiveTab] = useState('header');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/contact-info');
      setContent(data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setErrorMsg('Failed to load contact info settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
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

  const handleAddressLineChange = (index, value) => {
    setContent(prev => {
      const updatedLines = [...prev.location.addressLines];
      updatedLines[index] = value;
      return {
        ...prev,
        location: {
          ...prev.location,
          addressLines: updatedLines
        }
      };
    });
  };

  const addAddressLine = () => {
    setContent(prev => {
      const updatedLines = [...prev.location.addressLines, ''];
      return {
        ...prev,
        location: {
          ...prev.location,
          addressLines: updatedLines
        }
      };
    });
  };

  const removeAddressLine = (index) => {
    setContent(prev => {
      const updatedLines = prev.location.addressLines.filter((_, idx) => idx !== index);
      return {
        ...prev,
        location: {
          ...prev.location,
          addressLines: updatedLines
        }
      };
    });
  };

  const handleSlotChange = (index, value) => {
    setContent(prev => {
      const updatedSlots = [...prev.slots];
      updatedSlots[index] = value;
      return {
        ...prev,
        slots: updatedSlots
      };
    });
  };

  const addSlot = () => {
    setContent(prev => {
      const updatedSlots = [...prev.slots, ''];
      return {
        ...prev,
        slots: updatedSlots
      };
    });
  };

  const removeSlot = (index) => {
    setContent(prev => {
      const updatedSlots = prev.slots.filter((_, idx) => idx !== index);
      return {
        ...prev,
        slots: updatedSlots
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');
      const { data } = await api.put('/contact-info', content);
      setContent(data);
      setSuccessMsg('Contact information updated successfully!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Failed to save contact info:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to update contact info settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '100px 0' }}>
        <RefreshCw size={32} className="spin" style={{ display: 'block', margin: '0 auto 16px', animation: 'spin 1.5s linear infinite' }} />
        Loading contact info configurations...
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
    { id: 'header', name: 'Header & Description', icon: <Eye size={16} /> },
    { id: 'location', name: 'Office Address', icon: <MapPin size={16} /> },
    { id: 'whatsapp', name: 'WhatsApp Link', icon: <MessageCircle size={16} /> },
    { id: 'slots', name: 'Time Slots', icon: <Clock size={16} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            CMS: Contact Us Page Details
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure headers, office headquarters physical location coordinates, WhatsApp link parameters, and booking time slots.
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
          {activeTab === 'header' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Header Banner Settings</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Badge Header</label>
                <input
                  type="text"
                  value={content.header.badge}
                  onChange={(e) => handleNestedChange('header', 'badge', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Section Main Title</label>
                <input
                  type="text"
                  value={content.header.title}
                  onChange={(e) => handleNestedChange('header', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Introductory Paragraph</label>
                <textarea
                  rows="4"
                  value={content.header.description}
                  onChange={(e) => handleNestedChange('header', 'description', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Office Headquarters Location Details</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Location Category Title</label>
                <input
                  type="text"
                  value={content.location.title}
                  onChange={(e) => handleNestedChange('location', 'title', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Location Specific Label</label>
                <input
                  type="text"
                  value={content.location.label}
                  onChange={(e) => handleNestedChange('location', 'label', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                  Headquarters Mailing Address Lines
                  <button type="button" onClick={addAddressLine} style={{ background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.2)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>+ Add Line</button>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {content.location.addressLines.map((line, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleAddressLineChange(idx, e.target.value)}
                        style={{ flex: 1, padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                      />
                      <button type="button" onClick={() => removeAddressLine(idx)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>WhatsApp Link Parameters</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>WhatsApp Label</label>
                <input
                  type="text"
                  value={content.whatsapp.label}
                  onChange={(e) => handleNestedChange('whatsapp', 'label', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Display Number</label>
                <input
                  type="text"
                  value={content.whatsapp.number}
                  onChange={(e) => handleNestedChange('whatsapp', 'number', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '6px' }}>Action Trigger URL Link</label>
                <input
                  type="text"
                  value={content.whatsapp.link}
                  onChange={(e) => handleNestedChange('whatsapp', 'link', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'slots' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-serif)' }}>Time Slots Configuration</h3>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '8px' }}>
                  Available Booking Slots
                  <button type="button" onClick={addSlot} style={{ background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.2)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>+ Add Slot</button>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {content.slots.map((slot, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-glass)', borderRadius: '4px', padding: '4px 8px' }}>
                      <input
                        type="text"
                        value={slot}
                        onChange={(e) => handleSlotChange(idx, e.target.value)}
                        style={{ width: '85px', background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem', textAlign: 'center' }}
                      />
                      <button type="button" onClick={() => removeSlot(idx)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '0 2px', fontSize: '0.85rem', fontWeight: 'bold' }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
