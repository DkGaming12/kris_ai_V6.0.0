import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, Search, Key, Database, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

const AdminPanel = () => {
  const [serviceKey, setServiceKey] = useState(localStorage.getItem('kris_admin_key') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);
  const [customTokenAmount, setCustomTokenAmount] = useState('');

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!serviceKey.trim()) return;
    setLoading(true);
    
    try {
      // Test key by creating admin client
      const adminClient = createClient(supabaseUrl, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      
      const { data, error } = await adminClient.auth.admin.listUsers();
      if (error) throw error;
      
      setUsers(data.users || []);
      setIsAuthenticated(true);
      localStorage.setItem('kris_admin_key', serviceKey);
      setMessage('✅ Berhasil masuk sebagai Super Admin');
    } catch (err) {
      setMessage('❌ Kunci Service Role salah atau tidak valid.');
      setIsAuthenticated(false);
    } finally {
      setTimeout(() => setMessage(''), 3000);
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      const { data, error } = await adminClient.auth.admin.listUsers();
      if (!error && data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateToken = async (userId, currentTokens, operation = 'add', amount = 1000) => {
    let newTokens = parseInt(currentTokens) || 0;
    if (operation === 'add') newTokens += amount;
    else newTokens = amount;

    try {
      const adminClient = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      const { data, error } = await adminClient.auth.admin.updateUserById(userId, {
        user_metadata: { tokens: Math.max(0, newTokens) }
      });

      if (error) throw error;
      
      setMessage(`✅ Berhasil memperbarui token.`);
      await loadUsers(); // reload
    } catch (err) {
      setMessage(`❌ Gagal: ${err.message}`);
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="animate-fade" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <Shield size={48} color="#f43f5e" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Login Super Admin</h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2rem' }}>
            Masukkan <strong>Service Role Key</strong> dari dashboard Supabase Anda. Kunci ini sangat rahasia dan tidak akan disimpan di server.
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="password"
                placeholder="Masukkan Kunci Service Role..."
                value={serviceKey}
                onChange={(e) => setServiceKey(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white' }}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ background: '#f43f5e', padding: '0.85rem' }}>
              {loading ? 'Memverifikasi...' : 'Akses Panel Admin'}
            </button>
          </form>
          {message && <p style={{ marginTop: '1rem', color: message.includes('✅') ? '#10b981' : '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>{message}</p>}
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (u.user_metadata?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield color="#f43f5e" /> Panel Kendali Token
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Atur saldo token seluruh pengguna Kris AI secara instan.</p>
        </div>
        <button onClick={loadUsers} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <RefreshCw size={16} /> Segarkan Data
        </button>
      </div>

      {message && (
        <div style={{ background: message.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${message.includes('✅') ? '#10b981' : '#ef4444'}`, padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', color: 'white', fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Cari email atau nama pengguna..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontSize: '0.85rem' }}>
                <th style={{ padding: '1rem 0' }}>Pengguna</th>
                <th style={{ padding: '1rem 0' }}>Email</th>
                <th style={{ padding: '1rem 0' }}>Saldo Saat Ini</th>
                <th style={{ padding: '1rem 0' }}>Aksi / Top Up</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const name = u.user_metadata?.full_name || 'Tanpa Nama';
                const tokens = u.user_metadata?.tokens || 0;
                
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{name}</td>
                    <td style={{ padding: '1rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>{u.email}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', padding: '4px 10px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {tokens.toLocaleString('id-ID')} Token
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleUpdateToken(u.id, tokens, 'add', 5000)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>+5K</button>
                        <button onClick={() => handleUpdateToken(u.id, tokens, 'add', 10000)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>+10K</button>
                        <button onClick={() => {
                          setSelectedUserForModal(u);
                          setCustomTokenAmount('');
                          setIsCustomModalOpen(true);
                        }} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Kustom</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>Tidak ada pengguna ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCustomModalOpen && selectedUserForModal && (
        <div className="animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1.5rem', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Top Up Kustom</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Berapa jumlah token yang ingin ditambahkan untuk <strong style={{color:'white'}}>{selectedUserForModal.user_metadata?.full_name || selectedUserForModal.email}</strong>? (Bisa pakai minus untuk memotong)
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <input 
                type="number" 
                placeholder="Misal: 2500 atau -500" 
                value={customTokenAmount}
                onChange={(e) => setCustomTokenAmount(e.target.value)}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '0.75rem', color: 'white', fontSize: '1.1rem', textAlign: 'center' }}
                autoFocus
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                style={{ flex: 1, padding: '0.85rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  if(customTokenAmount && !isNaN(customTokenAmount)) {
                    handleUpdateToken(selectedUserForModal.id, selectedUserForModal.user_metadata?.tokens || 0, 'add', parseInt(customTokenAmount));
                  }
                  setIsCustomModalOpen(false);
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '0.85rem', background: '#6366f1' }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
