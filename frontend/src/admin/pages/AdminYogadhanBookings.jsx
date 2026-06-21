import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Search, Trash2, Calendar, User, Eye, X, Phone, Mail, Clock, ShieldAlert 
} from 'lucide-react';

export default function AdminYogadhanBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = {
        pageNumber: page,
        keyword: search,
        serviceTitle: 'Yogadhan System',
      };
      if (statusFilter) {
        params.paymentStatus = statusFilter;
      }
      const { data } = await api.get('/bookings', { params });
      setBookings(data.bookings || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error('Error fetching Yogadhan bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBookings();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking? This action is permanent.')) {
      try {
        await api.delete(`/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
        if (selectedBooking?._id === id) {
          setSelectedBooking(null);
        }
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete booking');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
          Yogadhan Bookings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          Browse client appointments, consult notes, birth details, and free energy exchange booking records.
        </p>
      </div>

      {/* Filters & Actions Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
      }}>
        {/* Search */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '360px', width: '100%' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 36px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button type="submit" style={{
            background: 'var(--color-gold)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            Search
          </button>
        </form>

        {/* Filters Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '10px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <option value="">All Bookings</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Client Name</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Service Category</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Appointment Date</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Slot</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Price</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Payment</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading appointment book...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No appointments found matching your search.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px', fontWeight: '600' }}>{b.customer.name}</td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>
                    <span style={{ display: 'block', color: 'var(--text-primary)' }}>{b.service.title}</span>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{b.service.category}</span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{new Date(b.appointmentDate).toDateString()}</td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{b.timeSlot}</td>
                  <td style={{ padding: '16px', fontSize: '0.85rem', fontWeight: 'bold' }}>₹{b.service.price}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: b.paymentStatus === 'paid' ? 'rgba(16, 185, 129, 0.08)' : b.paymentStatus === 'failed' ? 'rgba(255, 51, 51, 0.08)' : 'rgba(251, 191, 36, 0.08)',
                      color: b.paymentStatus === 'paid' ? 'var(--color-indigo)' : b.paymentStatus === 'failed' ? '#FF3333' : 'var(--color-yellow)',
                      border: `1px solid ${b.paymentStatus === 'paid' ? 'rgba(16, 185, 129, 0.15)' : b.paymentStatus === 'failed' ? 'rgba(255, 51, 51, 0.15)' : 'rgba(251, 191, 36, 0.15)'}`,
                    }}>
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedBooking(b)}
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
                        <Eye size={13} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: page === idx + 1 ? 'var(--color-gold)' : 'transparent',
                border: `1px solid ${page === idx + 1 ? 'var(--color-gold)' : 'var(--border-glass)'}`,
                color: page === idx + 1 ? '#fff' : 'var(--text-muted)',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal Overlay */}
      {selectedBooking && (
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
            maxWidth: '600px',
            width: '100%',
            padding: '30px',
            borderRadius: '16px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <button
              onClick={() => setSelectedBooking(null)}
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

            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', marginBottom: '4px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              Booking Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              {/* Service info */}
              <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 'bold' }}>Requested Consulting</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px', color: '#fff' }}>{selectedBooking.service.title}</h4>
                <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  <span>Category: {selectedBooking.service.category}</span>
                  <span>Duration: {selectedBooking.service.duration} mins</span>
                  <span>Fee: ₹{selectedBooking.service.price}</span>
                </div>
              </div>

              {/* Client Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <h5 style={{ margin: '0 0 6px', color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Client Info</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={13} style={{ color: '#888' }} /> {selectedBooking.customer.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={13} style={{ color: '#888' }} /> {selectedBooking.customer.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={13} style={{ color: '#888' }} /> {selectedBooking.customer.phone}</span>
                  </div>
                </div>

                <div>
                  <h5 style={{ margin: '0 0 6px', color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Schedule Details</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} style={{ color: '#888' }} /> {new Date(selectedBooking.appointmentDate).toDateString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={13} style={{ color: '#888' }} /> Time: {selectedBooking.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Kundli Details (For Astrology/Numerology) */}
              {(selectedBooking.additionalInfo.birthDate || selectedBooking.additionalInfo.birthTime || selectedBooking.additionalInfo.birthPlace) && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
                  <h5 style={{ margin: '0 0 8px', color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Astrological / Birth Data</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.85rem', background: 'rgba(197, 168, 128, 0.03)', border: '1px solid rgba(197, 168, 128, 0.1)', padding: '10px', borderRadius: '6px' }}>
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem' }}>Birth Date:</span>
                      <strong style={{ color: '#fff' }}>{selectedBooking.additionalInfo.birthDate || 'N/A'}</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem' }}>Birth Time:</span>
                      <strong style={{ color: '#fff' }}>{selectedBooking.additionalInfo.birthTime || 'N/A'}</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem' }}>Birth Place:</span>
                      <strong style={{ color: '#fff' }}>{selectedBooking.additionalInfo.birthPlace || 'N/A'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Vastu Address */}
              {selectedBooking.additionalInfo.vastuAddress && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
                  <h5 style={{ margin: '0 0 4px', color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Vastu Property Address</h5>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', background: 'rgba(255, 255, 255, 0.01)', padding: '8px 12px', border: '1px solid var(--border-glass)', borderRadius: '6px' }}>
                    {selectedBooking.additionalInfo.vastuAddress}
                  </p>
                </div>
              )}

              {/* Additional Notes */}
              {selectedBooking.additionalInfo.notes && (
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
                  <h5 style={{ margin: '0 0 4px', color: 'var(--color-gold)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Client Brief Notes</h5>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    "{selectedBooking.additionalInfo.notes}"
                  </p>
                </div>
              )}

              {/* Transaction Logs */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div>Order ID: <code style={{ color: 'var(--text-primary)' }}>{selectedBooking.razorpayOrderId || 'N/A'}</code></div>
                <div>Payment ID: <code style={{ color: 'var(--text-primary)' }}>{selectedBooking.razorpayPaymentId || 'N/A'}</code></div>
                <div>Txn Ref: <code style={{ color: 'var(--text-primary)' }}>{selectedBooking.transactionId || 'N/A'}</code></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
