import React, { useState } from 'react';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export default function StepDetails({ formData, onChange, onNext }) {
  const [panFocused, setPanFocused] = useState(false);

  const handleChange = (field, value) => {
    if (field === 'pan') value = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    onChange(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = formData.name.trim().length > 1 && formData.phone.trim().length >= 10;
  const panValid = formData.pan && PAN_REGEX.test(formData.pan);
  const panInvalid = formData.pan && formData.pan.length === 10 && !panValid;

  const nameValid = formData.name.trim().length > 1;
  const phoneValid = formData.phone.trim().length >= 10;

  const inputBase = {
    width: '100%',
    border: '1px solid #e0e0e5',
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    color: '#1a1a1a',
    background: '#fafafa',
    outline: 'none',
    transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s',
    letterSpacing: 0,
  };

  const inputStyle = (filled, error) => ({
    ...inputBase,
    border: `1px solid ${error ? '#dc2626' : filled ? '#2d7a4f' : '#e0e0e5'}`,
    background: error ? '#fef2f2' : filled ? '#f0faf4' : '#fafafa',
  });

  /* Inline validation indicator */
  const ValidationIcon = ({ valid, show }) => {
    if (!show) return null;
    return (
      <div style={{
        position: 'absolute', right: 14, top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 14,
        animation: 'checkPop 0.2s ease both',
      }}>
        {valid ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d7a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="16 8.5 10.5 15 8 12" />
          </svg>
        ) : null}
      </div>
    );
  };

  return (
    <div style={{ padding: '0 20px 24px' }}>

      {/* "Quick" badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: '#f0faf4', color: '#2d7a4f',
        fontSize: 12, fontWeight: 600,
        padding: '5px 14px', borderRadius: 20, marginBottom: 20,
      }}>
        <span>⚡</span> Quick — just 2 fields to complete
      </div>

      {/* ── Full Name ── */}
      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 12, fontWeight: 600, color: '#6b7280',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          display: 'block', marginBottom: 6,
        }}>
          Full Name <span style={{ color: '#2d7a4f' }}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            className="t2g-input"
            style={inputStyle(nameValid)}
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            aria-label="Full name"
            aria-required="true"
          />
          <ValidationIcon valid={nameValid} show={nameValid} />
        </div>
      </div>

      {/* ── Phone Number ── */}
      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 12, fontWeight: 600, color: '#6b7280',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          display: 'block', marginBottom: 6,
        }}>
          Phone Number <span style={{ color: '#2d7a4f' }}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            className="t2g-input"
            style={inputStyle(phoneValid)}
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            aria-label="Phone number"
            aria-required="true"
          />
          <ValidationIcon valid={phoneValid} show={phoneValid} />
        </div>
      </div>

      {/* ── Email (Optional) ── */}
      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 12, fontWeight: 600, color: '#6b7280',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
          marginBottom: 6,
        }}>
          Email
          <span style={{
            fontWeight: 400, textTransform: 'none', fontSize: 11,
            color: '#9ca3af',
          }}>
            (optional — for receipt)
          </span>
        </label>
        <input
          className="t2g-input"
          style={inputStyle(false)}
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          aria-label="Email address"
        />
      </div>

      {/* ── PAN Number ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 6,
        }}>
          <label style={{
            fontSize: 12, fontWeight: 600, color: '#6b7280',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            PAN Number
          </label>
          <span style={{
            fontSize: 11, fontWeight: 500, color: '#6b7280',
            fontStyle: 'italic',
          }}>
            Optional
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            className="t2g-input"
            style={{
              ...inputStyle(panValid, panInvalid),
              letterSpacing: formData.pan ? '0.12em' : 0,
              textTransform: 'uppercase',
              paddingRight: 40,
            }}
            type="text"
            placeholder="e.g. ABCDE1234F"
            autoComplete="off"
            value={formData.pan || ''}
            maxLength={10}
            onChange={e => handleChange('pan', e.target.value)}
            onFocus={() => setPanFocused(true)}
            onBlur={() => setPanFocused(false)}
            aria-label="PAN Number"
          />
          {formData.pan && (
            <div style={{
              position: 'absolute', right: 14, top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 14,
            }}>
              {panValid ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d7a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="16 8.5 10.5 15 8 12" />
                </svg>
              ) : panInvalid ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              ) : null}
            </div>
          )}
        </div>

        {/* PAN helper text */}
        {(panFocused || formData.pan) && (
          <div style={{
            marginTop: 6, fontSize: 11, lineHeight: 1.4,
            color: panInvalid ? '#dc2626' : panValid ? '#2d7a4f' : '#9ca3af',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {panInvalid
              ? 'Format: 5 letters · 4 digits · 1 letter (e.g. ABCDE1234F)'
              : panValid
                ? '✓ PAN verified — 80G receipt will be sent'
                : 'For 80G tax receipt (saves you money on taxes)'}
          </div>
        )}
      </div>

      {/* ── Trust Microcopy ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, fontSize: 11, color: '#9ca3af', marginBottom: 16,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Your info stays private. We never share it.</span>
      </div>

      {/* ── CTA ── */}
      <button
        className="t2g-btn"
        onClick={() => canProceed && onNext()}
        disabled={!canProceed}
        aria-label="Continue to payment"
        style={{
          width: '100%',
          background: canProceed
            ? 'linear-gradient(135deg, #2d7a4f 0%, #25694a 100%)'
            : '#d1d5db',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          padding: '16px',
          fontSize: 15,
          fontWeight: 700,
          cursor: canProceed ? 'pointer' : 'default',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'all 0.18s ease',
          boxShadow: canProceed ? '0 4px 16px rgba(45,122,79,0.3)' : 'none',
          letterSpacing: '0.01em',
        }}
      >
        Continue Securely →
      </button>
    </div>
  );
}
