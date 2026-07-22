import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, Zap, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const AuthView = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      alert('Harap isikan seluruh data.');
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuthSuccess({
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
          email: data.user.email,
          tokens: data.user.user_metadata?.tokens !== undefined ? data.user.user_metadata.tokens : 250
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name, tokens: 250 } }
        });
        if (error) throw error;
        alert('Pendaftaran berhasil! Silakan cek email Anda untuk konfirmasi atau langsung coba login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({ name: 'Tamu Rahasia', email: 'tamu@kris.ai', isGuest: true, initialTokens: 25 });
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div className="noise-bg"></div>
      <div style={{
        position: 'absolute', top: '-20%', left: '-15%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.18) 0%, transparent 60%)',
        filter: 'blur(60px)', zIndex: 0, animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-15%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 60%)',
        filter: 'blur(60px)', zIndex: 0, animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      {/* Grid lines decoration */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
      }}></div>

      {/* Card */}
      <div className="animate-fade" style={{
        width: '100%', maxWidth: '420px', padding: '2.5rem',
        position: 'relative', zIndex: 1,
        background: 'rgba(12, 12, 20, 0.9)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.75rem',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)'
      }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 30px rgba(79, 70, 229, 0.5), 0 0 60px rgba(79, 70, 229, 0.2)'
          }}>
            <Sparkles size={28} color="white" />
          </div>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: '900',
            color: 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: '1.2'
          }}>
            {isLogin ? 'Selamat Datang' : 'Mulai Karir Anda'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            {isLogin ? 'Masuk ke akun Kris AI Anda' : 'Buat akun untuk pabrikasi novel otomatis'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama Penulis</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text" placeholder="Nama Pena Anda" value={name}
                  onChange={e => setName(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="email" placeholder="email@contoh.com" value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kata Sandi</label>
              {isLogin && (
                <button type="button" style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600' }}>
                  Lupa sandi?
                </button>
              )}
            </div>
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

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '0.95rem', marginTop: '0.5rem',
              background: loading ? 'rgba(99, 102, 241, 0.5)' : 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
              color: 'white', fontWeight: '800', border: 'none', borderRadius: '0.875rem',
              fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: loading ? 'none' : '0 8px 20px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.25s', letterSpacing: '0.3px'
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <span className="spinner" style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', width: '18px', height: '18px', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
            ) : (
              <>{isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'} <ArrowRight size={18} /></>
            )}
          </button>

          {/* Guest Login */}
          <button
            type="button" onClick={handleGuestLogin} disabled={loading}
            style={{
              width: '100%', padding: '0.85rem',
              background: 'var(--glass-bg)',
              color: 'var(--text-secondary)', fontWeight: '600',
              border: '1px solid var(--border-color)', borderRadius: '0.875rem',
              fontSize: '0.88rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Zap size={15} />
            Masuk sebagai Tamu <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>(25 token)</span>
          </button>
        </form>

        {/* Toggle login/register */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            {isLogin ? 'Daftar Gratis' : 'Masuk ke Akun'}
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '1.5rem', opacity: 0.6 }}>
          Dengan masuk, Anda setuju dengan syarat & ketentuan Kris AI
        </p>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default AuthView;
