import React, { useState } from 'react';
import { User, Mail, Save, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const SettingsView = ({ user, onUpdate }) => {
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!newEmail || newEmail === user.email) {
      showToast('Masukkan alamat email baru yang berbeda.', 'error');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      showToast('✉️ Link konfirmasi telah dikirim ke email lama & baru Anda.', 'success');
      setNewEmail('');
    } catch (err) {
      showToast('❌ Gagal mengubah email: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <User size={32} color="var(--text-secondary)" /> Pengaturan Akun
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Kelola profil dan preferensi keamanan Anda.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)',
        borderRadius: '1.25rem', padding: '2rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #4f46e5, #0ea5e9)' }}></div>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={20} color="#0ea5e9" /> Informasi Email
        </h2>

        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Email Saat Ini</label>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
            {user?.email || 'Tamu'}
          </div>
        </div>

        {!user?.isGuest && (
          <form onSubmit={handleUpdateEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Ubah Email Baru</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="email" placeholder="email.baru@contoh.com" value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button
                  type="submit" disabled={loading || !newEmail}
                  style={{
                    padding: '0 1.5rem', background: (loading || !newEmail) ? 'var(--bg-dark)' : 'var(--glass-bg)',
                    color: (loading || !newEmail) ? 'var(--text-secondary)' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)', borderRadius: '0.75rem', fontWeight: '600',
                    cursor: (loading || !newEmail) ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { if(!loading && newEmail) e.currentTarget.style.borderColor = '#0ea5e9'; }}
                  onMouseOut={e => { if(!loading && newEmail) e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  {loading ? 'Menyimpan...' : 'Perbarui'}
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.5rem', padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '0.75rem', color: '#fef08a', fontSize: '0.85rem' }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, lineHeight: 1.5 }}>
                Sistem keamanan Supabase akan mengirim email konfirmasi ke <strong>email lama</strong> dan <strong>email baru</strong> Anda. Kedua tautan tersebut harus diklik untuk menyelesaikan perubahan.
              </p>
            </div>
          </form>
        )}
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
          backdropFilter: 'blur(12px)', color: 'white', padding: '0.85rem 1.5rem',
          borderRadius: '16px', fontWeight: '700', fontSize: '0.9rem',
          zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          animation: 'toastUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes toastUp { 0% { transform: translate(-50%, 100%); opacity: 0; } 100% { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default SettingsView;
