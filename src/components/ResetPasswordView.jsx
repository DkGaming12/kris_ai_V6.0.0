import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const ResetPasswordView = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      showToast('Kata sandi harus minimal 8 karakter.', 'error');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      showToast('🎉 Kata sandi berhasil diperbarui!', 'success');
      setTimeout(() => onComplete(), 2000);
    } catch (err) {
      showToast('❌ Gagal: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden'
    }}>
      <div className="noise-bg"></div>
      <div style={{
        position: 'absolute', top: '-20%', left: '-15%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 60%)',
        filter: 'blur(60px)', zIndex: 0, animation: 'float 8s ease-in-out infinite'
      }}></div>
      
      <div className="animate-fade" style={{
        width: '100%', maxWidth: '420px', padding: '2.5rem',
        position: 'relative', zIndex: 1,
        background: 'rgba(12, 12, 20, 0.9)', backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #f43f5e, #fb923c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 30px rgba(244, 63, 94, 0.4)'
          }}>
            <Lock size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Sandi Baru
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Silakan masukkan kata sandi baru Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Sandi Baru</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Minimal 8 karakter" value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex'
              }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '0.95rem', marginTop: '0.5rem',
              background: loading ? 'rgba(244, 63, 94, 0.5)' : 'linear-gradient(135deg, #f43f5e, #fb923c)',
              color: 'white', fontWeight: '800', border: 'none', borderRadius: '0.875rem',
              fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: loading ? 'none' : '0 8px 20px rgba(244, 63, 94, 0.3)',
              transition: 'all 0.25s'
            }}
          >
            {loading ? (
              <span className="spinner" style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', width: '18px', height: '18px', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
            ) : (
              <>Simpan Sandi <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
          backdropFilter: 'blur(12px)', color: 'white', padding: '0.85rem 1.5rem',
          borderRadius: '16px', fontWeight: '700', fontSize: '0.9rem',
          zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          animation: 'toastDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes toastDown { 0% { transform: translate(-50%, -100%); opacity: 0; } 100% { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default ResetPasswordView;
