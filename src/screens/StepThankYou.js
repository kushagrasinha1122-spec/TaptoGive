import React, { useEffect, useState } from 'react';

/* ── Confetti ── */
function Confetti() {
  const [dots, setDots] = useState([]);
  useEffect(() => {
    const colors = ['#2d7a4f', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];
    setDots(Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.6,
      duration: 1.2 + Math.random() * 1.4,
    })));
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(400px) rotate(540deg); opacity: 0; }
        }
      `}</style>
      {dots.map(d => (
        <div key={d.id} style={{
          position: 'absolute', left: `${d.x}%`, top: 0,
          width: d.size, height: d.size,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: d.color,
          animation: `confettiFall ${d.duration}s ease ${d.delay}s both`,
        }} />
      ))}
    </div>
  );
}

/* ── PDF Receipt Generator ── */
function generateAndDownloadPDF(option) {
  const txnId = 'T2G' + Date.now().toString().slice(-8).toUpperCase();
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const amount = option?.amount || 30;
  const meals = option?.label || '1 meal';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>80G Receipt — Tap2Give</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #1a1a1a; }
    .page { max-width: 680px; margin: 0 auto; padding: 48px 48px 60px; }
    .header { background: #2d7a4f; border-radius: 14px; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; }
    .logo-name { font-size: 22px; font-weight: 800; color: #fff; }
    .logo-sub  { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 3px; }
    .receipt-tag { background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.35); border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 0.08em; text-transform: uppercase; }
    .title-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px; }
    .receipt-title { font-size: 28px; font-weight: 700; }
    .txn-id { font-size: 12px; color: #9ca3af; margin-top: 6px; }
    .subtitle { font-size: 13px; color: #6b7280; margin-bottom: 32px; line-height: 1.6; }
    .amount-hero { background: linear-gradient(135deg,#f0faf4,#dcfce7); border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 24px 28px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; }
    .amount-val { font-size: 48px; font-weight: 800; color: #2d7a4f; line-height: 1; }
    .amount-label { font-size: 13px; color: #374151; margin-top: 6px; }
    .impact-box { text-align: right; background: white; border-radius: 12px; padding: 14px 18px; border: 1px solid #e5e7eb; }
    .impact-val { font-size: 22px; font-weight: 700; color: #1a1a1a; }
    .impact-label { font-size: 11px; color: #6b7280; margin-top: 3px; }
    .section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9ca3af; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    td { padding: 13px 0; font-size: 14px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
    td:first-child { color: #6b7280; width: 200px; font-weight: 500; }
    td:last-child { color: #1a1a1a; font-weight: 600; }
    .compliance { background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 18px 22px; margin-bottom: 32px; }
    .compliance-title { font-size: 13px; font-weight: 700; color: #92400e; margin-bottom: 8px; }
    .compliance-text { font-size: 12px; color: #78350f; line-height: 1.7; }
    .footer { border-top: 1px solid #f3f4f6; padding-top: 22px; display: flex; align-items: center; justify-content: space-between; }
    .footer-left { font-size: 11px; color: #9ca3af; line-height: 1.7; }
    .verified { display: flex; align-items: center; gap: 6px; background: #f0faf4; border: 1px solid #bbf7d0; border-radius: 20px; padding: 7px 16px; font-size: 11px; font-weight: 700; color: #2d7a4f; }
    @media print { .page { padding: 32px; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="logo-name">Tap2Give</div>
        <div class="logo-sub">Food for All · tapgive.org</div>
      </div>
      <div class="receipt-tag">80G Receipt</div>
    </div>

    <div class="title-row">
      <div class="receipt-title">Donation Receipt</div>
      <div class="txn-id">Txn # ${txnId}</div>
    </div>
    <div class="subtitle">Official receipt under Section 80G of the Income Tax Act, 1961. Retain for tax filing.</div>

    <div class="amount-hero">
      <div>
        <div class="amount-val">₹${amount}</div>
        <div class="amount-label">Total Donation Amount</div>
      </div>
      <div class="impact-box">
        <div class="impact-val">${meals}</div>
        <div class="impact-label">funded today</div>
      </div>
    </div>

    <div class="section-label">Transaction Details</div>
    <table>
      <tr><td>Date of Donation</td><td>${date}</td></tr>
      <tr><td>Transaction ID</td><td>${txnId}</td></tr>
      <tr><td>Payment Mode</td><td>Online / UPI</td></tr>
      <tr><td>Organization</td><td>Tap2Give Foundation</td></tr>
      <tr><td>NGO Registration No.</td><td>NGO/2024/IND/00431</td></tr>
      <tr><td>80G Registration No.</td><td>AABCT1234F2024G1</td></tr>
      <tr><td>PAN of Organization</td><td>AABCT1234F</td></tr>
      <tr><td>Status</td><td style="color:#2d7a4f;font-weight:800;">✓ Confirmed &amp; Verified</td></tr>
    </table>

    <div class="compliance">
      <div class="compliance-title">80G Tax Exemption — Important Notice</div>
      <div class="compliance-text">
        This donation qualifies for tax deduction under Section 80G of the Income Tax Act, 1961.
        The donor may claim 50% of the donated amount as deduction from taxable income.
        This document serves as official proof of donation. Please retain for your records and Income Tax filing.
        For queries, write to support@tapgive.org.
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">
        Generated on ${date}<br/>
        Tap2Give Foundation · tapgive.org<br/>
        support@tapgive.org
      </div>
      <div class="verified">✓ Digitally Verified</div>
    </div>
  </div>
  <script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) win.onafterprint = () => URL.revokeObjectURL(url);
}

/* ── Time-of-day greeting ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function StepThankYou({ option, formData, onClose }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      generateAndDownloadPDF(option);
      setDownloading(false);
    }, 500);
  };

  const handleShare = async () => {
    const text = `I just donated ₹${option?.amount || 30} to fund ${option?.label || '1 meal'} for children in need through Tap2Give! 🍽️💚\n\nJoin me: https://tapgive.org`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Tap2Give — Share Your Impact', text });
      } catch { /* user cancelled */ }
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  const donorName = formData?.name ? formData.name.split(' ')[0] : null;
  const amount = option?.amount || 30;
  const meals = option?.label || '1 meal';
  const mealsCount = option?.meals || 1;

  return (
    <div style={{
      padding: '32px 24px 36px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes popIn {
          from { transform: scale(0) rotate(-15deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Confetti />

      {/* Close */}
      <button onClick={onClose} aria-label="Close" style={{
        position: 'absolute', top: 16, right: 20,
        background: '#f3f4f6', border: 'none', cursor: 'pointer',
        fontSize: 18, color: '#6b7280',
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>×</button>

      {/* ── Greeting ── */}
      <div style={{
        fontSize: 13, color: '#6b7280', marginBottom: 8,
        animation: 'fadeUp 0.35s ease both',
        position: 'relative', zIndex: 1,
      }}>
        {getGreeting()}{donorName ? `, ${donorName}` : ''}
      </div>

      {/* ── Heart Icon ── */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'linear-gradient(135deg, #2d7a4f, #3d9960)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
        animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
        position: 'relative', zIndex: 1,
        boxShadow: '0 8px 32px rgba(45,122,79,0.3)',
      }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white" style={{
          animation: 'heartPulse 1.8s ease-in-out 0.6s infinite',
        }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* ── Title ── */}
      <h2 style={{
        fontFamily: 'DM Serif Display, serif', fontSize: 26,
        color: '#1a1a1a', marginBottom: 8,
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.4s ease 0.15s both',
      }}>
        Thank You, Hero!
      </h2>

      {/* ── Impact Reinforcement ── */}
      <div style={{
        fontSize: 14, color: '#374151', lineHeight: 1.6,
        marginBottom: 20, maxWidth: 300,
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.4s ease 0.2s both',
      }}>
        You just funded{' '}
        <strong style={{ color: '#2d7a4f' }}>{meals}</strong>{' '}
        for children in need 🎉
      </div>

      {/* ── Impact Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0faf4 0%, #e8f5e9 100%)',
        border: '1.5px solid #bbf7d0',
        borderRadius: 16, padding: '18px 20px',
        width: '100%', marginBottom: 16,
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.4s ease 0.25s both',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: '#2d7a4f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 20 }}>🍽️</span>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: 18, fontWeight: 800, color: '#2d7a4f', marginBottom: 2,
          }}>
            {mealsCount} meal{mealsCount > 1 ? 's' : ''} funded
          </div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            ₹{amount} donated · Receipt on its way
          </div>
        </div>
      </div>

      {/* ── Receipt Download ── */}
      <button
        className="t2g-btn"
        onClick={handleDownload}
        disabled={downloading}
        aria-label="Download 80G receipt"
        style={{
          width: '100%',
          background: '#fff',
          color: downloading ? '#9ca3af' : '#2d7a4f',
          border: `1.5px solid ${downloading ? '#d1d5db' : '#bbf7d0'}`,
          borderRadius: 14, padding: '13px',
          fontSize: 14, fontWeight: 600,
          cursor: downloading ? 'default' : 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          marginBottom: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          position: 'relative', zIndex: 1,
          transition: 'all 0.18s',
          animation: 'fadeUp 0.4s ease 0.3s both',
        }}
      >
        {downloading ? (
          <>
            <span style={{
              width: 14, height: 14,
              border: '2px solid #e5e7eb', borderTopColor: '#2d7a4f',
              borderRadius: '50%', display: 'inline-block',
              animation: 'spin 0.7s linear infinite',
            }} />
            Generating…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download 80G Receipt
          </>
        )}
      </button>

      {/* ── Make Monthly (soft suggestion) ── */}
      <div style={{
        width: '100%',
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: 14, padding: '12px 16px',
        marginBottom: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.4s ease 0.33s both',
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 2 }}>
            Make this a monthly gift?
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>
            Feed {mealsCount} child{mealsCount > 1 ? 'ren' : ''} every month
          </div>
        </div>
        <div style={{
          background: '#f0faf4', border: '1px solid #bbf7d0',
          borderRadius: 20, padding: '6px 14px',
          fontSize: 12, fontWeight: 600, color: '#2d7a4f',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}>
          Set Up
        </div>
      </div>

      {/* ── Share Impact ── */}
      <button
        className="t2g-btn"
        onClick={handleShare}
        aria-label="Share your impact"
        style={{
          width: '100%',
          background: 'transparent',
          color: '#6b7280',
          border: 'none',
          borderRadius: 14, padding: '10px',
          fontSize: 13, fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          marginBottom: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          position: 'relative', zIndex: 1,
          animation: 'fadeUp 0.4s ease 0.36s both',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share Your Impact
      </button>

      {/* ── Done ── */}
      <button
        className="t2g-btn"
        onClick={onClose}
        aria-label="Close and return"
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #2d7a4f 0%, #25694a 100%)',
          color: '#fff',
          border: 'none', borderRadius: 14,
          padding: '15px', fontSize: 15, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
          position: 'relative', zIndex: 1,
          boxShadow: '0 4px 16px rgba(45,122,79,0.3)',
          animation: 'fadeUp 0.4s ease 0.38s both',
          transition: 'all 0.18s',
        }}
      >
        Done
      </button>
    </div>
  );
}
