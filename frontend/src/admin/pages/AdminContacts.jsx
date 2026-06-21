import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Mail, Trash2, CheckCircle, Eye, X, Phone, User, Calendar, Clock 
} from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/contacts');
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await api.patch(`/contacts/${id}/status`, { status: newStatus });
      setContacts(contacts.map(c => c._id === id ? data : c));
      if (selectedInquiry?._id === id) {
        setSelectedInquiry(data);
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact message permanently?')) {
      try {
        await api.delete(`/contacts/${id}`);
        setContacts(contacts.filter(c => c._id !== id));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(null);
        }
      } catch (error) {
        alert('Failed to delete contact message');
      }
    }
  };

  const handleOpenDetail = async (inquiry) => {
    setSelectedInquiry(inquiry);
    // Auto-mark as read if new
    if (inquiry.status === 'new') {
      await updateStatus(inquiry._id, 'read');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
          Form Inquiries
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          Review contact messages, consultation interest inquiries, and callback requests.
        </p>
      </div>

      {/* List Panel */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Sender</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Category</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Message Excerpt</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Submitted On</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading inquiries inbox...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Inquiries inbox is completely empty!
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px', fontWeight: c.status === 'new' ? 'bold' : 'normal' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {c.status === 'new' && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4d4d', display: 'inline-block' }} />
                      )}
                      {c.name}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{c.service || 'General Inquire'}</td>
                  <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.message}
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: c.status === 'resolved' ? 'rgba(16, 185, 129, 0.08)' : c.status === 'read' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 51, 51, 0.08)',
                      color: c.status === 'resolved' ? 'var(--color-indigo)' : c.status === 'read' ? '#3B82F6' : '#FF3333',
                      border: `1px solid ${c.status === 'resolved' ? 'rgba(16, 185, 129, 0.15)' : c.status === 'read' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 51, 51, 0.15)'}`,
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleOpenDetail(c)}
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
                        onClick={() => handleDelete(c._id)}
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
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
            maxWidth: '540px',
            width: '100%',
            padding: '30px',
            borderRadius: '16px',
            position: 'relative',
          }}>
            <button
              onClick={() => setSelectedInquiry(null)}
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
              Message Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              {/* Sender Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Sender Profile</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={13} style={{ color: '#888' }} /> {selectedInquiry.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={13} style={{ color: '#888' }} /> {selectedInquiry.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={13} style={{ color: '#888' }} /> {selectedInquiry.phone}</span>
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Submission info</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} style={{ color: '#888' }} /> {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={13} style={{ color: '#888' }} /> Prefer: {selectedInquiry.preferredTime || 'Anytime'}</span>
                    <span>Service: <strong>{selectedInquiry.service || 'General Inquire'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Message content */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
                <span style={{ display: 'block', color: 'var(--color-gold)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px' }}>Message Message</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.01)', padding: '14px', border: '1px solid var(--border-glass)', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Actions footer */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status: </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-gold)' }}>{selectedInquiry.status.toUpperCase()}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedInquiry.status !== 'resolved' && (
                    <button
                      onClick={() => updateStatus(selectedInquiry._id, 'resolved')}
                      style={{
                        background: 'var(--color-gold)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <CheckCircle size={14} /> Resolve Ticket
                    </button>
                  )}
                  {selectedInquiry.status === 'resolved' && (
                    <button
                      onClick={() => updateStatus(selectedInquiry._id, 'read')}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      Re-open Inquiry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
