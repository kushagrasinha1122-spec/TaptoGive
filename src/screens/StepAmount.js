import React, { useState } from 'react';
import { MEAL_OPTIONS } from '../data/donors';

export default function StepAmount({ selected, onSelect, onNext }) {
  const [customValue, setCustomValue] = useState('');
  const [tappedIdx, setTappedIdx] = useState(null);
  const isCustomSelected = selected?.isCustom === true;

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomValue(val);
    if (val && parseInt(val) >= 1) {
      const meals = Math.floor(parseInt(val) / 30);
      onSelect({
        amount: parseInt(val),
        meals,
        label: meals > 0 ? `${meals} meal${meals > 1 ? 's' : ''}` : 'Custom amount',
        desc: meals > 0 ? `Feeds ${meals} child${meals > 1 ? 'ren' : ''} today` : 'Every rupee counts',
        impact: meals > 0 ? `${meals} child${meals > 1 ? 'ren' : ''} will be fed tonight` : 'Every rupee makes a difference',
        isCustom: true,
      });
    } else {
      onSelect(null);
    }
  };
  const handleTileClick = (opt, idx) => {
    setCustomValue('');
    setTappedIdx(idx);
    onSelect(opt);
    setTimeout(() => setTappedIdx(null), 150);
  };

  /* Dynamic impact text */
  const impactText = selected?.impact || null;

  return (
    <div style={{ padding: '0 20px 24px' }}>
      <p style={{
        fontSize: 13, color: '#6b7280', marginBottom: 16,
        lineHeight: 1.5,
      }}>
        Choose how many meals you'd like to fund
      </p>

      {/* ── Amount Cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 12,
      }}>
        {MEAL_OPTIONS.map((opt, idx) => {
          const isSelected = selected?.amount === opt.amount && !isCustomSelected;
          const isTapped = tappedIdx === idx;
          return (
            <div
              key={opt.amount}
              className="t2g-card"
              onClick={() => handleTileClick(opt, idx)}
              role="button"
              tabIndex={0}
              aria-label={`Donate ${opt.amount} rupees for ${opt.label}`}
              aria-pressed={isSelected}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTileClick(opt, idx); } }}
              style={{
                border: `2px solid ${isSelected ? '#2d7a4f' : '#e5e7eb'}`,
                borderRadius: 14,
                padding: '16px 16px 14px',
                cursor: 'pointer',
                background: isSelected
                  ? 'linear-gradient(135deg, #f0faf4 0%, #e8f5e9 100%)'
                  : '#fafafa',
                position: 'relative',
                transform: isTapped ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isSelected
                  ? '0 4px 16px rgba(45,122,79,0.15)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Badge */}
              {opt.tag && (
                <div style={{
                  position: 'absolute',
                  top: -10, left: 12,
                  background: opt.tag === 'Popular Choice'
                    ? 'linear-gradient(135deg, #2d7a4f, #3d9960)'
                    : 'linear-gradient(135deg, #1e6b3e, #2d7a4f)',
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 6px rgba(45,122,79,0.25)',
                  display: 'flex', alignItems: 'center', gap: 3,
                }}>
                  <span style={{ fontSize: 9 }}>{opt.tag === 'Popular Choice' ? '🔥' : '💚'}</span>
                  {opt.tag}
                </div>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#2d7a4f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'checkPop 0.2s ease both',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div style={{
                fontSize: 24, fontWeight: 800, color: isSelected ? '#2d7a4f' : '#1a1a1a',
                marginBottom: 4, transition: 'color 0.18s',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                ₹{opt.amount}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 600,
                color: isSelected ? '#1e6b3e' : '#374151',
                marginBottom: 4,
              }}>
                {opt.label}
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>
                {opt.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Custom Amount ── */}
      <div
        className="t2g-card"
        style={{
          border: `2px dashed ${isCustomSelected ? '#2d7a4f' : '#d1d5db'}`,
          borderRadius: 14,
          padding: '12px 16px',
          background: isCustomSelected
            ? 'linear-gradient(135deg, #f0faf4 0%, #e8f5e9 100%)'
            : '#fafafa',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 14,
        }}
      >
        <span style={{
          fontSize: 18, fontWeight: 700,
          color: isCustomSelected ? '#2d7a4f' : '#9ca3af',
          transition: 'color 0.18s',
        }}>₹</span>
        <input
          type="number"
          min="1"
          inputMode="numeric"
          placeholder="Enter custom amount"
          value={customValue}
          onChange={handleCustomChange}
          className="t2g-input"
          aria-label="Custom donation amount"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'DM Sans, sans-serif',
            color: '#1a1a1a',
            outline: 'none',
          }}
        />
        {isCustomSelected && customValue && (
          <span style={{
            fontSize: 11, color: '#2d7a4f', fontWeight: 600,
            whiteSpace: 'nowrap',
            background: '#dcfce7', padding: '3px 8px', borderRadius: 12,
          }}>
            {Math.floor(parseInt(customValue) / 30) > 0
              ? `${Math.floor(parseInt(customValue) / 30)} meals`
              : 'Custom'}
          </span>
        )}
      </div>

      {/* ── Real-time Impact Indicator ── */}
      {impactText && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 6, marginBottom: 16,
          fontSize: 13, fontWeight: 500, color: '#2d7a4f',
          animation: 'stepFadeIn 0.25s ease both',
        }}>
          <span style={{ fontSize: 15 }}>🍽️</span>
          <span>{impactText}</span>
        </div>
      )}

      {/* ── CTA ── */}
      <button
        className="t2g-btn"
        onClick={() => selected && onNext()}
        disabled={!selected}
        aria-label={selected ? `Feed ${selected.meals || 'with'} ${selected.label || 'custom amount'} for ${selected.amount} rupees` : 'Select an amount'}
        style={{
          width: '100%',
          background: selected
            ? 'linear-gradient(135deg, #2d7a4f 0%, #25694a 100%)'
            : '#d1d5db',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          padding: '16px',
          fontSize: 15,
          fontWeight: 700,
          cursor: selected ? 'pointer' : 'default',
          fontFamily: 'DM Sans, sans-serif',
          transition: 'all 0.18s ease',
          boxShadow: selected ? '0 4px 16px rgba(45,122,79,0.3)' : 'none',
          letterSpacing: '0.01em',
        }}
      >
        {selected
          ? `Feed ${selected.label || 'Someone'} — ₹${selected.amount}`
          : 'Select an amount to continue'}
      </button>
    </div>
  );
}
