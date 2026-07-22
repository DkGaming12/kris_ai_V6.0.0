import React, { useState, useEffect } from 'react';
import { X, Music, MessageCircle, Coins, Folder, FileText, Download, Trash2, Copy, Check, Users, Rocket, Search, Send, Clock, Globe, Crown } from 'lucide-react';
import { getSavedWorks, deleteWork } from '../utils/storageUtils';

export const UtilityModals = ({ tool, isOpen, onClose }) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="tool-inline-container animate-fade" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="tool-inline-content glass" style={{
        width: '100%', background: 'var(--bg-dark)',
        borderRadius: '2rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#60a5fa', borderRadius: '12px' }}>
              <tool.icon size={22} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{tool.name}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          {tool.name === 'Dengar Lagu' && <MusicContent />}
          {tool.name === 'Komunitas' && <CommunityContent />}
          {tool.name === 'Nambah Token' && <TokenContent />}
          {tool.name === 'Folder Data' && <FolderDataContent />}
          {tool.name === 'Riwayat Pembelian' && <HistoryContent />}
          {tool.name === 'Download Novel' && <DownloadContent />}
          {tool.name === 'Text Editor' && <TextEditorContent />}
          {tool.name === 'Cover Manual' && <CoverManualContent />}
          {tool.name === 'Statistik Affiliate' && <AffiliateContent />}
        </div>
      </div>
    </div>
  );
};

// --- Specific Tool Contents ---

const MusicContent = () => (
  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
    <Music size={48} color="#60a5fa" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fokus Menulis dengan Musik</h3>
    <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Mainkan playlist Lo-Fi atau instrumen piano favorit untuk menemani Anda menyelesaikan bab novel hari ini.</p>
    
    <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
      {/* Simulation of a Spotify Embed */}
      <iframe 
        style={{ borderRadius: '12px', background: 'transparent' }} 
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0" 
        width="100%" 
        height="352" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        title="Spotify Lofi Playlist"
      ></iframe>
    </div>
  </div>
);

const CommunityContent = () => {
  const [activeTab, setActiveTab] = useState('tim');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '10px', background: 'var(--glass-bg)', padding: '4px', borderRadius: '12px' }}>
        <button 
          onClick={() => setActiveTab('tim')}
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: activeTab === 'tim' ? 'rgba(99, 102, 241, 0.2)' : 'transparent', color: activeTab === 'tim' ? '#818cf8' : '#9ca3af', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Tim Saya
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          style={{ flex: 1, padding: '0.6rem', border: 'none', background: activeTab === 'chat' ? 'rgba(99, 102, 241, 0.2)' : 'transparent', color: activeTab === 'chat' ? '#818cf8' : '#9ca3af', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Global Chat
        </button>
      </div>

      {activeTab === 'tim' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '1rem', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
            <Users size={32} color="#9ca3af" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h4 style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Belum Ada Downline</h4>
            <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Daftarkan teman Anda dengan kode referral untuk membangun tim kepenulisan.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
             <h5 style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 'bold', marginBottom: '1rem' }}>KARYA TERBARU TIM</h5>
             <p style={{ color: '#4b5563', fontSize: '0.8rem', textAlign: 'center' }}>Tidak ada aktivitas tim baru.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '1rem' }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
             <div style={{ background: 'var(--glass-bg)', padding: '8px 12px', borderRadius: '12px', alignSelf: 'flex-start', maxWidth: '80%', border: '1px solid var(--border-color)' }}>
               <p style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 'bold' }}>Admin Kris</p>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Selamat datang di komunitas Kris Ai! Jangan lupa klaim bonus harian.</p>
             </div>
             <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '8px 12px', borderRadius: '12px', alignSelf: 'flex-end', maxWidth: '80%' }}>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Terima kasih Min! Aplikasinya sangat membantu buat nulis novel saya.</p>
             </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
             <input type="text" placeholder="Ketik pesan..." style={{ flex: 1, padding: '0.6rem 1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
             <button style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}><Send size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const TokenContent = () => (
  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
    <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)', color: 'white' }}>
      <Coins size={32} />
    </div>
    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.5px' }}>Top Up Token / Premium</h3>
    <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Eksplorasi tanpa batas dengan mesin AI Kris Pro khusus Penulis.</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
      {/* Paket Pemula */}
      <div className="premium-card glass" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderBottomLeftRadius: '1rem', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8' }}>MONTHLY</div>
        <h4 style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Paket Penulis Aktif</h4>
        <p style={{ fontSize: '2rem', fontWeight: '900', color: '#60a5fa', marginBottom: '1.5rem' }}>Rp 99.000 <span style={{fontSize:'0.9rem', color:'#64748b', fontWeight: 'normal'}}>/bln</span></p>
        <ul style={{ color: '#94a3b8', fontSize: '0.9rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#10b981" /> 100.000 Kata / Hari</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#10b981" /> Semua 20+ Writer Tools</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#10b981" /> Ekspor Bebas (TXT/DOCX)</li>
        </ul>
        <button onClick={() => window.open('https://wa.me/6285700660475?text=Halo%20Admin%20Kris,%20saya%20mau%20beli%20Paket%20Penulis%20Aktif%20(99rb)', '_blank')} style={{ width: '100%', padding: '1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '1rem', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>KLAIM PAKET SEKARANG</button>
      </div>

      {/* Paket Sultan */}
      <div className="premium-card" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)', border: '2px solid #3b82f6', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, background: '#f59e0b', color: '#1e1b4b', padding: '0.5rem 1rem', borderBottomLeftRadius: '1rem', fontSize: '0.75rem', fontWeight: '900' }}>LIMITLESS</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <h4 style={{ fontWeight: '800', color: 'white', fontSize: '1.25rem' }}>Paket SULTAN AI</h4>
          <Crown size={18} color="#f59e0b" />
        </div>
        <p style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '1.5rem' }}>Rp 600.000 <span style={{fontSize:'0.9rem', color:'#93c5fd', fontWeight: 'normal'}}>/Tahun</span></p>
        <ul style={{ color: '#93c5fd', fontSize: '0.9rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#fbbf24" /> Prioritas Server High-GPU</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#fbbf24" /> Unlimited Pabrikasi Novel</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} color="#fbbf24" /> Early Access Fitur Baru</li>
        </ul>
        <button onClick={() => window.open('https://wa.me/6285700660475?text=Halo%20Admin%20Kris,%20saya%20tertarik%20Paket%20SULTAN%20AI%20(600rb)', '_blank')} style={{ width: '100%', padding: '1rem', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '1rem', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(255, 255, 255, 0.1)' }}>JADI SULTAN SEKARANG</button>
      </div>
    </div>
  </div>
);

const HistoryContent = () => (
  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
    <FileText size={48} color="#9ca3af" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Belum Ada Transaksi</h3>
    <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Riwayat pembelian paket AI Anda akan muncul di sini.</p>
  </div>
);

const DownloadContent = () => (
  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
    <Download size={48} color="#9ca3af" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Menu Cepat Pintasan</h3>
    <p style={{ color: '#6b7280', margin: '0.5rem auto 2rem', maxWidth: '400px' }}>Fitur ini akan segera diotomatisasi untuk menarik daftar PDF/Ebook yang pernah Anda generate.</p>
    <button style={{ padding: '0.75rem 2rem', background: 'var(--glass-bg)', color: 'var(--text-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>Lihat Folder Data Saja</button>
  </div>
);

const FolderDataContent = () => {
  const [works, setWorks] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setWorks(getSavedWorks());
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('Yakin ingin menghapus draf ini permanent?')) {
      deleteWork(id);
      setWorks(getSavedWorks());
    }
  };

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (works.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <Folder size={48} color="#9ca3af" style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Folder Data Kosong</h3>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Gunakan Mesin AI dan tekan tombol "Simpan Karya" agar tulisan Anda diarsipkan ke sini.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Tersimpan {works.length} draf karya Anda di memori lokal (browser ini).</p>
      {works.map((work) => (
        <div key={work.id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.7rem', background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {work.title || 'Draft AI'}
              </span>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '6px' }}>{new Date(work.date).toLocaleString('id-ID')}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleCopy(work.content, work.id)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#9ca3af', padding: '6px', borderRadius: '6px', cursor: 'pointer' }} title="Salin Teks">
                {copiedId === work.id ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </button>
              <button onClick={() => handleDelete(work.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }} title="Hapus Permanen">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', maxHeight: '150px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {work.content}
          </div>
        </div>
      ))}
    </div>
  );
};

const TextEditorContent = () => (
  <div style={{ padding: '0 1rem' }}>
    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Text Editor Murni</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Area kanvas menulis bebas distraksi. Segala teks yang Anda ketik di sini tidak melibatkan AI.</p>
    <textarea
      placeholder="Mulai menulis kisah Anda secara manual di sini..."
      style={{
        width: '100%', minHeight: '300px', background: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem',
        color: 'var(--text-primary)', resize: 'vertical', outline: 'none', lineHeight: '1.6', fontSize: '1rem'
      }}
    />
  </div>
);

const CoverManualContent = () => (
  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
    <div style={{ padding: '20px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '20px', display: 'inline-block', marginBottom: '1.5rem' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" alt="Canva" width={48} />
    </div>
    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Integrasi Desain Manual</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
      Untuk menyusun kover secara manual selain text-to-image, sangat disarankan menggunakan Canva.
    </p>
    <button className="btn-primary" onClick={() => window.open('https://canva.com', '_blank')}>
      Buka Editor Eksternal
    </button>
  </div>
);

const AffiliateContent = () => (
  <div style={{ padding: '0.5rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
        <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={14} /> Total Klik Tautan
        </p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#60a5fa', margin: '0.5rem 0' }}>0</h2>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
        <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Rocket size={14} /> Konversi Berhasil
        </p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', margin: '0.5rem 0' }}>Rp 0</h2>
      </div>
    </div>
    
    <div style={{ marginBottom: '2rem' }}>
       <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>RIWAYAT AFILIASI</h4>
       <div style={{ background: 'var(--glass-bg)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <Clock size={32} color="#4b5563" style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
          <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Belum ada data klik terakhir.</p>
       </div>
    </div>

    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
      <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>Tautan Afiliasi Unik Anda:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" readOnly value="https://kris.ai/ref/kristian99" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', color: 'var(--brand-primary)', fontWeight: 'bold', fontSize: '0.85rem' }} />
        <button style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Salin Link</button>
      </div>
    </div>
  </div>
);

