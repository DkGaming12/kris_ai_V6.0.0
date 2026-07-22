import React, { useState, useEffect } from 'react';

const steps = [
  { delay: 800, type: 'cmd', text: '> Memproses premis: ', highlight: '"CEO dingin jatuh cinta pada pengasuh anaknya"' },
  { delay: 2000, type: 'cmd', text: '> Menganalisis trope, karakter, dan konflik cerita...' },
  { delay: 3400, type: 'success', text: '> Outline 50 Bab berhasil dibuat [SELESAI]' },
  { delay: 4400, type: 'cmd', text: '> Menulis Bab 1: ', highlight: '"Pertemuan di Tengah Hujan"...' },
  { delay: 6200, type: 'text', content: 'Rintik hujan menampar kaca jendela Maybach hitam itu. Mata tajam Kendrick menatap dingin wanita yang basah kuyup di pinggir jalan, memeluk erat seorang balita. "Bawa dia masuk," perintahnya pada sang supir, suaranya tak terbantahkan. Ia tak tahu, keputusan kecil itu akan meruntuhkan tembok es di hatinya selamanya...' },
  { delay: 8000, type: 'done', text: '> Bab 1 selesai (1.500 kata dalam 12 detik). Lanjut Bab 2...' },
];

const LOOP_DELAY = 10500;

const AITerminalPreview = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [key, setKey] = useState(0); // used to restart animation

  useEffect(() => {
    setVisibleSteps([]);
    const timers = [];

    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setVisibleSteps(prev => [...prev, i]);
      }, step.delay);
      timers.push(t);
    });

    // Loop: reset after completion
    const loopTimer = setTimeout(() => {
      setKey(prev => prev + 1);
    }, LOOP_DELAY);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, [key]);

  const renderStep = (stepIdx) => {
    const step = steps[stepIdx];
    if (!step) return null;

    if (step.type === 'text') {
      return (
        <div key={stepIdx} className="term-fade" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '1.1rem 1.25rem',
          borderRadius: '0.75rem',
          color: '#cbd5e1',
          lineHeight: '1.75',
          fontSize: '0.85rem'
        }}>
          {step.content}
        </div>
      );
    }

    const colors = {
      cmd: '#94a3b8',
      success: '#a855f7',
      done: '#22c55e',
    };

    return (
      <div key={stepIdx} className="term-fade" style={{ color: colors[step.type] || '#94a3b8', fontSize: '0.85rem', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        <span>{step.text}</span>
        {step.highlight && <span style={{ color: '#22c55e' }}>{step.highlight}</span>}
      </div>
    );
  };

  const isDone = visibleSteps.length >= steps.length;

  return (
    <div style={{
      background: '#080c14',
      borderRadius: '1.1rem',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      fontSize: '0.875rem'
    }}>
      {/* Title Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.9rem 1.25rem',
        background: 'rgba(255,255,255,0.025)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', gap: '7px' }}>
          {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
            <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px' }}>KRIS AI STUDIO</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ color: '#22c55e', fontSize: '0.6rem', fontWeight: '700', letterSpacing: '1px' }}>LIVE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', minHeight: '320px' }}>
        {/* Prompt line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
          <span style={{ color: '#6366f1', fontWeight: '700' }}>kris@ai</span>
          <span>:</span>
          <span style={{ color: '#0ea5e9' }}>~/studio</span>
          <span>$</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>generate --novel --output=bab1.md</span>
        </div>

        {visibleSteps.map(i => renderStep(i))}

        {/* Cursor */}
        {!isDone && (
          <div style={{ width: '8px', height: '16px', background: '#6366f1', animation: 'blink 1s step-end infinite', borderRadius: '1px' }} />
        )}
      </div>

      <style>{`
        .term-fade {
          animation: termFadeIn 0.4s ease-out forwards;
        }
        @keyframes termFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AITerminalPreview;
