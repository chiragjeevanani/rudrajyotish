import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Mail, Trash2, CheckCircle, Eye, X, Phone, User, Calendar, Award, BookOpen 
} from 'lucide-react';

export default function AdminTeaching() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/teaching/applications');
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching teaching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await api.patch(`/teaching/applications/${id}/status`, { status: newStatus });
      setApplications(applications.map(app => app._id === id ? data : app));
      if (selectedApp?._id === id) {
        setSelectedApp(data);
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teaching application permanently?')) {
      try {
        await api.delete(`/teaching/applications/${id}`);
        setApplications(applications.filter(app => app._id !== id));
        if (selectedApp?._id === id) {
          setSelectedApp(null);
        }
      } catch (error) {
        alert('Failed to delete teaching application');
      }
    }
  };

  const handleOpenDetail = async (app) => {
    setSelectedApp(app);
    // Auto-mark as reviewed if new
    if (app.status === 'new') {
      await updateStatus(app._id, 'reviewed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
          Teaching Applications
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          Manage and review candidates who wish to learn Vastu & Numerology to teach it in the future.
        </p>
      </div>

      {/* List Panel */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Applicant</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Experience</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>SOP Excerpt</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Submitted On</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading teaching applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No teaching applications found!
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px', fontWeight: app.status === 'new' ? 'bold' : 'normal' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {app.status === 'new' && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4d4d', display: 'inline-block' }} />
                      )}
                      {app.name}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{app.experience}</td>
                  <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {app.message}
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 
                        app.status === 'accepted' ? 'rgba(16, 185, 129, 0.08)' : 
                        app.status === 'rejected' ? 'rgba(255, 77, 77, 0.08)' : 
                        app.status === 'contacted' ? 'rgba(59, 130, 246, 0.08)' : 
                        app.status === 'reviewed' ? 'rgba(251, 191, 36, 0.08)' : 'rgba(255, 51, 51, 0.08)',
                      color: 
                        app.status === 'accepted' ? 'var(--color-indigo)' : 
                        app.status === 'rejected' ? '#ff4d4d' : 
                        app.status === 'contacted' ? '#3B82F6' : 
                        app.status === 'reviewed' ? 'var(--color-gold)' : '#FF3333',
                      border: `1px solid ${
                        app.status === 'accepted' ? 'rgba(16, 185, 129, 0.15)' : 
                        app.status === 'rejected' ? 'rgba(255, 77, 77, 0.15)' : 
                        app.status === 'contacted' ? 'rgba(59, 130, 246, 0.15)' : 
                        app.status === 'reviewed' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 51, 51, 0.15)'
                      }`,
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleOpenDetail(app)}
                        style={{
                          background: 'rgba(197, 168, 128, 0.1)',
                          border: '1px solid rgba(197, 168, 128, 0.2)',
                          color: 'var(--color-gold)',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                        }}
                      >
                        <Eye size={13} /> Open
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        style={{
                          background: 'rgba(255, 77, 77, 0.08)',
                          border: '1px solid rgba(255, 77, 77, 0.18)',
                          color: '#ff4d4d',
                          padding: '6px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
        }}>
          <div className="glass-panel" style={{
            maxWidth: '560px',
            width: '100%',
            padding: '30px',
            borderRadius: '16px',
            position: 'relative',
          }}>
            <button
              onClick={() => setSelectedApp(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', marginBottom: '4px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              Application Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              {/* Applicant Profile */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Candidate Profile</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={13} style={{ color: '#888' }} /> {selectedApp.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={13} style={{ color: '#888' }} /> {selectedApp.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={13} style={{ color: '#888' }} /> {selectedApp.phone}</span>
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Submission Info</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} style={{ color: '#888' }} /> {new Date(selectedApp.createdAt).toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={13} style={{ color: '#888' }} /> Exp: {selectedApp.experience}</span>
                  </div>
                </div>
              </div>

              {/* Statement of purpose */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
                <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px' }}>Statement of Purpose</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.01)', padding: '14px', border: '1px solid var(--border-glass)', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                  {selectedApp.message}
                </p>
              </div>

              {/* Status workflow selection */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Status: </span>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: 
                      selectedApp.status === 'accepted' ? 'var(--color-indigo)' : 
                      selectedApp.status === 'rejected' ? '#ff4d4d' : 
                      selectedApp.status === 'contacted' ? '#3B82F6' : 
                      selectedApp.status === 'reviewed' ? 'var(--color-gold)' : '#FF3333'
                  }}>
                    {selectedApp.status.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['reviewed', 'contacted', 'accepted', 'rejected'].map((statusOption) => (
                    <button
                      key={statusOption}
                      onClick={() => updateStatus(selectedApp._id, statusOption)}
                      disabled={selectedApp.status === statusOption}
                      style={{
                        background: selectedApp.status === statusOption ? 'rgba(255,255,255,0.05)' : 'rgba(197, 168, 128, 0.1)',
                        border: `1px solid ${selectedApp.status === statusOption ? 'transparent' : 'rgba(197, 168, 128, 0.25)'}`,
                        color: selectedApp.status === statusOption ? 'var(--text-muted)' : 'var(--color-gold)',
                        borderRadius: '4px',
                        padding: '6px 10px',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        cursor: selectedApp.status === statusOption ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {statusOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
