import React, { useState, useRef, useEffect } from 'react';
import StepAmount from './StepAmount';
import StepDetails from './StepDetails';
import StepPayment from './StepPayment';
import StepThankYou from './StepThankYou';

const STEPS = ['Amount', 'Details', 'Payment'];

export default function DonationModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', pan: '' });
  const [animDir, setAnimDir] = useState('forward');
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef(null);

  const goNext = () => {
    setAnimDir('forward');
    setAnimating(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setAnimating(false);
    }, 180);
  };
  const goBack = () => {
    setAnimDir('back');
    setAnimating(true);
    setTimeout(() => {
      setStep(s => s - 1);
      setAnimating(false);
    }, 180);
  };

  /* scroll to top on step change */
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={step === 3 ? undefined : onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.48)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 100,
        }}
      />

      {/* ── Modal ── */}
      <div
        ref={contentRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 480,
          background: '#fff',
          borderRadius: '24px 24px 0 0',
          zIndex: 101,
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100%); }
            to   { transform: translateX(-50%) translateY(0); }
          }
          @keyframes stepFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes stepFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to   { opacity: 0; transform: translateY(-8px); }
          }
          @keyframes pulseOnce {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.06); }
            100% { transform: scale(1); }
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes checkPop {
            0%   { transform: scale(0); opacity: 0; }
            70%  { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          /* Button states */
          .t2g-btn:hover   { filter: brightness(1.06); }
          .t2g-btn:active  { transform: scale(0.98); }
          .t2g-btn:focus-visible {
            outline: 2px solid #2d7a4f;
            outline-offset: 2px;
          }
          /* Card tap micro-interaction */
          .t2g-card {
            transition: transform 0.12s cubic-bezier(0.25,0.46,0.45,0.94),
                        box-shadow 0.12s cubic-bezier(0.25,0.46,0.45,0.94),
                        border-color 0.18s ease,
                        background 0.18s ease;
          }
          .t2g-card:active {
            transform: scale(0.97);
          }
          /* Smooth scrollbar */
          ::-webkit-scrollbar { width: 0; }
          /* Input focus */
          .t2g-input:focus {
            border-color: #2d7a4f !important;
            box-shadow: 0 0 0 3px rgba(45,122,79,0.1);
          }
          .t2g-input:focus-visible {
            outline: none;
          }
        `}</style>

        {/* ── Header + Progress ── */}
        {step < 3 && (
          <div style={{ padding: '20px 20px 0' }}>
            {/* Title Row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {step > 0 && (
                  <button
                    onClick={goBack}
                    aria-label="Go back"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 18, color: '#374151', padding: '4px 6px 4px 0',
                      fontFamily: 'DM Sans, sans-serif',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    ←
                  </button>
                )}
                <h2 style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: 22, color: '#1a1a1a', fontWeight: 400, margin: 0,
                }}>
                  Make a Donation
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: '#f3f4f6', border: 'none', cursor: 'pointer',
                  fontSize: 18, color: '#6b7280', lineHeight: 1,
                  width: 32, height: 32, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                ×
              </button>
            </div>

            {/* Progress Indicator */}
            <div style={{ marginBottom: 24 }}>
              {/* Step circles + connectors */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 0, marginBottom: 8,
              }}>
                {STEPS.map((label, i) => (
                  <React.Fragment key={label}>
                    {/* Step dot */}
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      fontFamily: 'DM Sans, sans-serif',
                      background: i < step ? '#2d7a4f' : i === step ? '#2d7a4f' : '#e5e7eb',
                      color: i <= step ? '#fff' : '#9ca3af',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}>
                      {i < step ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div style={{
                        flex: 1, height: 3, borderRadius: 2, margin: '0 6px',
                        background: '#e5e7eb',
                        position: 'relative',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          position: 'absolute', top: 0, left: 0,
                          height: '100%', borderRadius: 2,
                          background: '#2d7a4f',
                          width: i < step ? '100%' : '0%',
                          transition: 'width 0.4s ease',
                        }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Step labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
                {STEPS.map((label, i) => (
                  <div key={label} style={{
                    fontSize: 11, fontWeight: i <= step ? 600 : 500,
                    color: i <= step ? '#2d7a4f' : '#9ca3af',
                    transition: 'color 0.3s',
                    textAlign: 'center',
                    minWidth: 56,
                  }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step Content ── */}
        <div style={{
          animation: animating
            ? `stepFadeOut 0.18s ease forwards`
            : `stepFadeIn 0.2s ease forwards`,
        }}>
          {step === 0 && (
            <StepAmount
              selected={selectedOption}
              onSelect={setSelectedOption}
              onNext={goNext}
            />
          )}
          {step === 1 && (
            <StepDetails
              formData={formData}
              onChange={setFormData}
              onNext={goNext}
            />
          )}
          {step === 2 && (
            <StepPayment
              amount={selectedOption?.amount}
              option={selectedOption}
              formData={formData}
              onNext={goNext}
            />
          )}
          {step === 3 && (
            <StepThankYou
              option={selectedOption}
              formData={formData}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </>
  );
}
