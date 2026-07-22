import React, { useState } from 'react';
import { X, MessageCircle, Star, Minus, Plus, Zap } from 'lucide-react';

const GhostEditor = ({ onBack }) => {
  const [babs, setBabs] = useState(10);
  const [name, setName] = useState('');

  const pricePerBab = 1500;
  const metadataPrice = 15000;
  const estimatedCost = (babs * pricePerBab) + metadataPrice;

  const handleConsult = () => {
    const text = `Halo Kris, saya ${name || 'Penulis'}, tertarik dengan Layanan Ghostwriter Premium untuk estimasi ${babs} Bab. Total estimasi: Rp ${estimatedCost.toLocaleString('id-ID')}. Mohon info prosesnya.`;
    window.open(`https://wa.me/6285700660475?text=${encodeURIComponent(text)}`, '_blank');
  };

  const adjust = (delta) => {
    setBabs(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="animate-fade" style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 2000, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '1rem'
    }}>
      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '480px',
        background: 'rgba(12, 12, 20, 0.95)',
        backdropFilter: 'blur(30px)',
        borderRadius: '1.75rem',
        padding: '2.5rem',
        position: 'relative',
        border: '1px solid rgba(251, 191, 36, 0.25)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(251,191,36,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
        {/* Close */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)', cursor: 'pointer', width: '34px', height: '34px',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.15)'
          }}>
            <Star size={30} fill="white" color="white" />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '900', color: '#fbbf24', letterSpacing: '-0.5px' }}>
            Ghostwriter Premium
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Terima Beres Mahakarya Anda
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Nama Penulis / Pena
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Masukkan nama Anda..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Bab Counter */}
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Estimasi Jumlah Bab
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => adjust(-5)}
                style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.2s', flexShrink: 0 }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'var(--glass-bg)'; }}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                min="1"
                value={babs}
                onChange={e => setBabs(Math.max(1, parseInt(e.target.value) || 1))}
                className="form-input"
                style={{ textAlign: 'center', fontWeight: '800', fontSize: '1.1rem', flex: 1 }}
              />
              <button
                onClick={() => adjust(5)}
                style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.2s', flexShrink: 0 }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'var(--glass-bg)'; }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div style={{ background: 'rgba(251, 191, 36, 0.06)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: '700', color: 'rgba(251,191,36,0.7)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Rincian Biaya
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Biaya per Bab ({babs} bab)</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Rp {(babs * pricePerBab).toLocaleString('id-ID')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Biaya Metadata & Setup</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Rp {metadataPrice.toLocaleString('id-ID')}</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(251,191,36,0.15)', margin: '0.25rem 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Total Estimasi</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24' }}>
                  Rp {estimatedCost.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleConsult}
            style={{
              width: '100%', padding: '1rem', borderRadius: '0.875rem',
              background: '#25D366', color: 'white', fontWeight: '800', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
              transition: 'all 0.25s'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.4)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)'; }}
          >
            <MessageCircle size={20} />
            Konsultasi via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default GhostEditor;
