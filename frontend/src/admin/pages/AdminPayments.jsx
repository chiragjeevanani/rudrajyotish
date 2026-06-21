import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Landmark, CreditCard, RefreshCw, CheckCircle, AlertTriangle 
} from 'lucide-react';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPayments = async () => {
    try {
      setRefreshing(true);
      const { data } = await api.get('/payments');
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-heading)', margin: 0 }}>
            Audit Payments
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Check transaction logs, Razorpay references, payment status, and gateway payloads.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          disabled={refreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
          Reload logs
        </button>
      </div>

      {/* Table Panel */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Transaction ID</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Razorpay Order ID</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Client & Service</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ padding: '16px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Timestamp</th>
              <th style={{ padding: '16px 24px', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gateway Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading payment logs...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No payment events registered.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', fontSize: '0.88rem' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={14} style={{ color: '#888' }} />
                      {p.razorpayPaymentId || 'N/A'}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{p.razorpayOrderId}</td>
                  <td style={{ padding: '16px' }}>
                    {p.bookingId ? (
                      <>
                        <div style={{ fontWeight: '600', color: '#fff' }}>{p.bookingId.customer?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{p.bookingId.service?.title}</div>
                      </>
                    ) : (
                      <span style={{ color: '#ff4d4d', fontStyle: 'italic' }}>Booking reference deleted</span>
                    )}
                  </td>
                  <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--color-gold)' }}>₹{p.amount}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{new Date(p.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {p.status === 'captured' ? (
                        <CheckCircle size={14} style={{ color: 'var(--color-indigo)' }} />
                      ) : (
                        <AlertTriangle size={14} style={{ color: 'var(--color-yellow)' }} />
                      )}
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: p.status === 'captured' ? 'var(--color-indigo)' : 'var(--color-yellow)',
                      }}>
                        {p.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
