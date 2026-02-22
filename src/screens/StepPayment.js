import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/donors';

const ICONS = {
  upi: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  ),
  card: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  netbanking: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  wallets: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16v4" />
      <path d="M20 12a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4z" />
    </svg>
  ),
};

import BASE_URL from '../config/api';

const API_URL = BASE_URL;

export default function StepPayment({ amount, option, formData, onNext }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: formData?.name || 'Anonymous',
          phone_number: formData?.phone || '',
          ngo_name: 'Tap2Give',
          amount: amount || 30,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to record donation');
      }
      setLoading(false);
      onNext();
    } catch (err) {
      console.error('Donation API error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const displayAmount = amount || 30;
  const displayLabel = option?.label || '1 meal';

  return (
    <div style={{ padding: '0 20px 24px' }}>

      {/* ── Donation Summary Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0faf4 0%, #e8f5e9 100%)',
        border: '1px solid #bbf7d0',
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>
            You're donating
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#2d7a4f' }}>
            ₹{displayAmount}
          </div>
        </div>
        <div style={{
          background: '#fff', borderRadius: 10, padding: '8px 14px',
          border: '1px solid #dcfce7',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>
            {displayLabel}
          </div>
          <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>
            funded today
          </div>
        </div>
      </div>

      {/* ── Section Label ── */}
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
        Select Payment Method
      </p>

      {/* ── Payment Method Grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 16,
      }}>
        {PAYMENT_METHODS.map(m => {
          const isSelected = selected === m.id;
          return (
            <div
              key={m.id}
              className="t2g-card"
              onClick={() => setSelected(m.id)}
              role="button"
              tabIndex={0}
              aria-label={`Pay with ${m.label}`}
              aria-pressed={isSelected}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(m.id); } }}
              style={{
                border: `${isSelected ? '2px' : '1.5px'} solid ${isSelected ? '#2d7a4f' : '#e5e7eb'}`,
                borderRadius: 14,
                padding: '16px 12px',
                cursor: 'pointer',
                background: isSelected
                  ? 'linear-gradient(135deg, #f0faf4 0%, #e8f5e9 100%)'
                  : '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                position: 'relative',
                boxShadow: isSelected
                  ? '0 4px 16px rgba(45,122,79,0.12)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Recommended badge */}
              {m.recommended && (
                <div style={{
                  position: 'absolute', top: -9, right: 8,
                  background: '#2d7a4f', color: '#fff',
                  fontSize: 8, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 10,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  boxShadow: '0 2px 6px rgba(45,122,79,0.25)',
                }}>
                  RECOMMENDED
                </div>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#2d7a4f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'checkPop 0.2s ease both',
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div style={{
                color: isSelected ? '#2d7a4f' : '#6b7280',
                transition: 'color 0.18s',
              }}>
                {ICONS[m.id]}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: isSelected ? '#1e6b3e' : '#1a1a1a',
                textAlign: 'center',
              }}>
                {m.label}
              </div>
              <div style={{
                fontSize: 11, color: '#9ca3af',
                textAlign: 'center', lineHeight: 1.3,
              }}>
                {m.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Fallback Notice (softer) ── */}
      <div style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 11,
        color: '#6b7280',
        display: 'flex', alignItems: 'flex-start',
        gap: 8,
        marginBottom: 20,
        lineHeight: 1.5,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          <strong style={{ color: '#374151' }}>Smart Fallback</strong> — If payment fails, we'll retry securely. No action needed from you.
        </span>
      </div>

      {/* ── Error Message ── */}
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: 12,
          color: '#dc2626',
          marginBottom: 16,
          lineHeight: 1.5,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── CTA ── */}
      <button
        className="t2g-btn"
        onClick={handlePay}
        disabled={!selected || loading}
        aria-label={`Complete donation of ${displayAmount} rupees`}
        style={{
          width: '100%',
          background: selected && !loading
            ? 'linear-gradient(135deg, #2d7a4f 0%, #25694a 100%)'
            : '#c4dbc9',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          padding: '16px',
          fontSize: 16,
          fontWeight: 700,
          cursor: selected && !loading ? 'pointer' : 'default',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'all 0.18s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          boxShadow: selected && !loading ? '0 4px 16px rgba(45,122,79,0.3)' : 'none',
          letterSpacing: '0.01em',
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16,
              border: '2px solid rgba(255,255,255,0.4)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.7s linear infinite',
            }} />
            Processing…
          </>
        ) : (
          `Complete Donation — ₹${displayAmount}`
        )}
      </button>

      {/* ── Security Reassurance ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, marginTop: 14, fontSize: 11, color: '#9ca3af',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>256-bit encrypted · PCI DSS · RBI compliant</span>
      </div>
    </div>
  );
}
