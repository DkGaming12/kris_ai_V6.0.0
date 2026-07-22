import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import AuthView from './components/AuthView';
import MainLayout from './components/MainLayout';
import EngineCard from './components/EngineCard';
import AIResponse from './components/AIResponse';
import ToolModal from './components/ToolModal';
import { UtilityModals } from './components/UtilityModals';
import ChatView from './components/ChatView';
import EngineInterface from './components/EngineInterface';
import AITerminalPreview from './components/AITerminalPreview';
import AdminPanel from './components/AdminPanel';
import AboutView from './components/AboutView';
import ResetPasswordView from './components/ResetPasswordView';
import SettingsView from './components/SettingsView';
import {
  Book, Hash, Heart, Mic, MessageSquare, Sparkles, ChevronRight, Rocket, Trash2, Download as DownloadIcon,
  FileText, Mail, Quote, Flame, Briefcase, BookOpen, Share2, Globe, Video, Headphones, Languages, FileCode,
  BatteryWarning, Brain, Coins, Check, Crown, CheckCircle2
} from 'lucide-react';
import { saveWork, getSavedWorks, deleteWork } from './utils/storageUtils';
import { downloadAsTxt, downloadAsDocx } from './utils/exportUtils';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('beranda');
  const [view, setView] = useState('dashboard');
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [savedWorks, setSavedWorks] = useState([]);
  const [toast, setToast] = useState(null);
  const [tokens, setTokens] = useState(() => {
    return parseInt(localStorage.getItem('kris_tokens') || '15000');
  });

  useEffect(() => {
    // 1. Ambil sesi login Supabase saat aplikasi dimuat
    supabase.auth.getSession().then(async (res) => {
      const session = res?.data?.session;
      if (session) {
        // Fetch fresh user data directly from server to bypass local stale cache
        const { data } = await supabase.auth.getUser().catch(() => ({ data: {} }));
        const latestUser = data?.user;
        if (latestUser) {
          const u = latestUser;
          const dbTokens = u.user_metadata?.tokens !== undefined ? u.user_metadata.tokens : 15000;
          setUser({
            id: u.id,
            name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'User',
            email: u.email,
            tokens: dbTokens
          });
          setTokens(dbTokens);
        }
      }
    }).catch(err => {
      console.warn("Supabase session check skipped/failed:", err);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveringPassword(true);
      }
    });

    setSavedWorks(getSavedWorks());

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('kris_tokens', tokens.toString());
    
    // 2. Simpan saldo token terbaru ke akun online Supabase (jika bukan tamu)
    if (user && !user.isGuest) {
      supabase.auth.updateUser({
        data: { tokens: tokens }
      }).catch(err => console.warn("Supabase updateUser skipped/failed:", err));
    }
  }, [tokens, user]);

  const isUtilityTool = (toolName) => {
    return ['Dengar Lagu', 'Komunitas', 'Nambah Token', 'Folder Data', 'Riwayat Pembelian', 'Download Novel', 'Text Editor', 'Cover Manual', 'Statistik Affiliate'].includes(toolName);
  };

  const engines = [
    { id: 'novel', title: 'Novel', description: 'Literally plot panjang & chapter yang complex banget.', icon: Book, color: '#3b82f6' },
    { id: 'cerpen', title: 'Cerpen', description: 'Short story dengan plot twist yang mind-blowing.', icon: FileText, color: '#10b981' },
    { id: 'cernak', title: 'Cernak', description: 'Kids story, which is full of moral values gitu.', icon: Sparkles, color: '#f59e0b' },
    { id: 'chatstory', title: 'Chatstory', description: 'Basically format chat yang imersif and modern vibes.', icon: MessageSquare, color: '#8b5cf6' },
    { id: 'puisi', title: 'Puisi', description: 'Kumpulan bait aesthetic yang rima-nya deep.', icon: Heart, color: '#f43f5e' },
    { id: 'surat', title: 'Surat Cinta', description: 'Buat spill perasaan even pas lagi banyak conflict.', icon: Mail, color: '#ec4899' },
    { id: 'pidato', title: 'Pidato', description: 'Buat naskah pidato apa saja dan gaya apa saja, secepat kilat.', icon: Mic, color: '#06b6d4' },
    { id: 'kutipan', title: 'Kutipan', description: 'Generate kutipan tokoh orisinil yang Anda inginkan!', icon: Quote, color: '#14b8a6' },
    { id: 'motivasi', title: 'Motivasi', description: 'Dapatkan afirmasi & kalimat dorongan semangat harian.', icon: Flame, color: '#f97316' },
    { id: 'nonfiksi', title: 'Non Fiksi', description: 'Biografi and self-development goals, actually.', icon: Briefcase, color: '#6366f1' },
    { id: 'ilmiah', title: 'Ilmiah', description: 'Journal, paper, and research report yang tetap slay.', icon: BookOpen, color: '#0ea5e9' },
    { id: 'medsos', title: 'Medsos', description: 'Caption viral & TikTok script biar FYP material.', icon: Share2, color: '#84cc16' },
    { id: 'artikel', title: 'Artikel', description: 'Blog post yang SEO friendly and up-to-date vibes.', icon: Globe, color: '#22c55e' },
    { id: 'video', title: 'Video', description: 'Movie script and YouTube content ideas, honestly.', icon: Video, color: '#eab308' },
    { id: 'audio', title: 'Audio', description: 'Podcast script and radio drama vibes.', icon: Headphones, color: '#a855f7' },
    { id: 'translator', title: 'Simple Translator', description: 'Translate teks paragraf super fast, literally.', icon: Languages, color: '#64748b' },
    { id: 'doctranslator', title: 'Document Translator', description: 'Translate file tebal in minutes, worth it banget.', icon: FileCode, color: '#334155' },
  ];

  const handleLaunch = (engine) => {
    setSelectedEngine(engine);
    setGeneratedContent('');
    setView('editor');
    window.scrollTo(0, 0);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const responses = {
        novel: "Di ujung kota yang selalu diguyur hujan abadi, Elias menemukan sebuah jam pasir yang pasirnya tidak pernah jatuh. Setiap kali ia membaliknya, waktu di sekitarnya melambat seolah dunia memberinya kesempatan untuk mengamati detak jantung semesta yang tersembunyi...",
        cerpen: "Pertemuan itu singkat, hanya sekejap di peron stasiun nomor sembilan. Namun, dalam tatapan mata wanita asing itu, Andi melihat seluruh masa depannya yang hilang...",
        puisi: "Rembulan retak di kolam yang sunyi,\nBayanganmu berdansa di antara teratai mati,\nCinta ini adalah gaung yang tak pernah sampai,\nTerjebak di antara mimpi dan pagi yang enggan mampai.",
        cernak: "Di dalam hutan ajaib, hiduplah seekor tupai kecil bernama Pipit. Pipit punya satu rahasia: ia bisa berbicara dengan bunga matahari! Setiap pagi, Pipit akan membisikkan doa agar matahari terus bersinar terang menyinari hutan teman-temannya.",
        chatstory: "Andi: Lo liat gak tadi di belakang lab?\nBudi: Gak, emang ada apa?\nAndi: Sumpah, ada bayangan tinggi banget... dan pintunya kebuka sendiri.\nBudi: Jangan becanda lo!\nAndi: Gue serius, gue masih gemeteran di sini.",
      };
      setGeneratedContent(responses[selectedEngine?.id] || "AI mulai merangkai kata-kata ajaib untuk ceritamu...");
      setIsGenerating(false);
    }, 1500);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (content) => {
    const newWork = saveWork({
      title: selectedEngine?.title || activeTool?.name || 'Karya',
      content,
      engineId: selectedEngine?.id
    });
    setSavedWorks([newWork, ...savedWorks]);
    showToast('✅ Karya berhasil disimpan ke Folder Data!');
  };

  const handleDelete = (id) => {
    if (confirm('Hapus karya ini dari riwayat?')) {
      deleteWork(id);
      setSavedWorks(savedWorks.filter(w => w.id !== id));
    }
  };

  const renderDashboard = () => {
    const totalWords = savedWorks.reduce((acc, work) => acc + (work.content ? work.content.split(/\s+/).filter(w=>w.length>0).length : 0), 0);
    const totalHoursSaved = (totalWords / 1000).toFixed(1); 
    const isActive = savedWorks.length > 0;

    return (
    <div className="dashboard-wrapper animate-fade" style={{ display: 'flex', flexDirection: 'column', paddingBottom: '0' }}>
      <section className="hero-section" style={{ textAlign: 'center', padding: '5rem 2rem 3rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 1.2rem', borderRadius: '999px',
          marginBottom: '2rem', background: 'rgba(255,255,255,0.03)'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', animation: 'pulseDot 2s infinite' }}></div>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Sistem Pabrikasi Web Novel Berbasis AI Pertama</span>
        </div>

        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
          <span style={{ color: 'var(--text-primary)' }}>Berhenti Mengetik.</span><br />
          <span style={{ color: 'var(--text-primary)' }}>Mulai </span>
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pabrikasi Novel.</span>
        </h1>

        <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
          Tembus target 100.000 kata dalam hitungan menit. Kris Ai bukan sekadar asisten, ini adalah <strong style={{color: 'var(--text-primary)'}}>mesin pencetak uang</strong> Anda untuk platform Web Novel.
        </p>

        <div className="hero-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => { setView('machines'); window.scrollTo(0,0); }}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
              color: 'white', padding: '1.1rem 2.75rem', borderRadius: '9999px', fontSize: '1.1rem',
              fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 12px 28px rgba(139, 92, 246, 0.45)', transition: 'all 0.25s'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(139,92,246,0.55)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(139,92,246,0.45)'; }}
          >
            Akses Mesin Sekarang <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
            <Check size={14} color="#22c55e" />
            <span style={{ color: 'var(--text-secondary)' }}>Cocok untuk Wattpad, Webnovel, Dreame, Fizzo, dll.</span>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards (Kejam) */}
      <section style={{ paddingTop: '5rem', paddingBottom: '3rem', paddingLeft: '2rem', paddingRight: '2rem', borderTop: '1px solid var(--border-color)', marginTop: '2rem' }}>
        <h2 className="tracking-tight" style={{ fontSize: '2.5rem', textAlign: 'center', fontWeight: '900', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--text-primary)' }}>Industri Web Novel Itu </span>
          <span style={{ color: '#ef4444' }}>Kejam.</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          Anda tidak dibayar untuk kualitas sastra tingkat dewa, Anda dibayar untuk KONSISTENSI dan VOLUME.
        </p>

        <div className="feature-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', margin: '0' }}>
          <div className="premium-card-v2" style={{ padding: '2.5rem', background: 'rgba(239, 68, 68, 0.05)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}>
              <BatteryWarning size={28} />
            </div>
            <h3 className="tracking-tight" style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Burnout Target Harian</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>Harus setor 1000 - 2000 kata per hari agar dapat bonus platform? Jari keriting, punggung sakit, kehidupan sosial hancur.</p>
          </div>
          
          <div className="premium-card-v2" style={{ padding: '2.5rem', background: 'rgba(249, 115, 22, 0.05)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)' }}>
              <Brain size={28} />
            </div>
            <h3 className="tracking-tight" style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Writer's Block Parah</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>Menatap layar kosong berjam-jam. Bingung kelanjutan plot "CEO Dingin" atau "Sistem Leveling" yang sudah mencapai bab 500.</p>
          </div>
          
          <div className="premium-card-v2 full-width-card" style={{ padding: '2.5rem', background: 'rgba(234, 179, 8, 0.05)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)' }}>
              <Coins size={28} />
            </div>
            <h3 className="tracking-tight" style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Penghasilan Stagnan</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>Menulis manual satu novel saja sudah berat. Bagaimana mau pegang 3-5 novel sekaligus untuk melipatgandakan penghasilan?</p>
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .full-width-card { grid-column: 1 / -1; }
          }
          @media (min-width: 1024px) {
            .feature-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 1023px) {
             .solusi-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* 2.5 AI Analytics / SINTA Feature */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(59, 130, 246, 0.03)', borderTop: '1px solid rgba(59, 130, 246, 0.1)', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <div style={{ width: '100%', margin: '0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '50px', letterSpacing: '1px' }}>SASTRA ENGINE METRICS</span>
            <h2 className="tracking-tight" style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginTop: '1rem' }}>Live Productivity Tracking</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Eksperimen membuktikan bahwa Kris AI memangkas 80% waktu penulisan.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.05)' }}>
              <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Kata Terdokumentasi</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-primary)' }}>{isActive ? totalWords.toLocaleString('id-ID') : '0'}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total kata karya Anda sejauh ini.</div>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center', border: '1px solid rgba(59, 130, 246, 0.2)', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.05)' }}>
              <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Efisiensi Waktu</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-primary)' }}>{isActive ? totalHoursSaved : '0'} <span style={{fontSize: '1.2rem', color: 'var(--text-secondary)'}}>Jam</span></div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Waktu manusia yang berhasil dihemat.</div>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center', border: '1px solid rgba(139, 92, 246, 0.2)', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.05)' }}>
              <div style={{ fontSize: '0.9rem', color: '#a855f7', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Draf Novel</div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-primary)' }}>{savedWorks.length}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bab tersimpan di memori browser.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solusi Ultimate */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <p style={{ color: '#a855f7', textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>SOLUSI ULTIMATE</p>
        <h2 className="tracking-tight" style={{ fontSize: '3rem', textAlign: 'center', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Kris AI: Asisten Super Anda
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
          Kami merancang Kris secara spesifik untuk memahami pola, trope, dan gaya bahasa yang laku keras di platform Web Novel.
        </p>

        <div className="solusi-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Left: Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '1rem', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={24} color="#a855f7" />
              </div>
              <div>
                <h4 className="tracking-tight" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Pabrikasi Puluhan Bab Otomatis</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Masukkan premis, dan biarkan Kris menyusun kerangka cerita hingga memproduksi puluhan bab secara berurutan tanpa kehilangan konteks.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '1rem', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} color="#a855f7" />
              </div>
              <div>
                <h4 className="tracking-tight" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Insting "Sastrawi" - Bebas Deteksi AI</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Tidak seperti AI generik yang kaku. Kris dilatih untuk menulis dengan gaya "receh", dramatis, atau puitis sesuai genre. 99% lolos deteksi AI platform.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '1rem', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={24} color="#a855f7" />
              </div>
              <div>
                <h4 className="tracking-tight" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Master Semua Genre Tropes</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Isekai System? CEO Obsesif? Reinkarnasi Balas Dendam? Kris paham semua formula plot yang membuat pembaca penasaran dan rela beli koin.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '1rem', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Hash size={24} color="#a855f7" />
              </div>
              <div>
                <h4 className="tracking-tight" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Paket Lengkap Promosi</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Bukan cuma isi bab. Kris juga membuatkan Blurb (sinopsis) yang clickbait, tag genre, hingga kata-kata promosi untuk media sosial Anda.</p>
              </div>
            </div>
          </div>

          {/* Right: Terminal */}
          <div style={{ position: 'relative', width: '100%', margin: '0' }}>
             <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, transparent 60%)', zIndex: 0, filter: 'blur(30px)' }}></div>
             <AITerminalPreview />
          </div>
        </div>
      </section>

      {/* 4. Testimonial */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <h2 className="tracking-tight" style={{ fontSize: '3rem', textAlign: 'center', fontWeight: '900', marginBottom: '3rem', color: 'var(--text-primary)' }}>
          Nulis Konsisten = Cuan Konsisten
        </h2>
        <div className="premium-card-v2" style={{ width: '100%', margin: '0', padding: '3.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '1.35rem', fontStyle: 'italic', color: 'var(--text-primary)', opacity: 0.9, lineHeight: '1.7', marginBottom: '2.5rem' }}>
            "Dulu mati-matian nulis 1 bab sehari buat ngejar bonus harian. Sekarang pakai platform ini, saya pegang 4 judul novel sekaligus di platform berbeda. Semua update harian otomatis terjadwal. Penghasilan pasif naik 400%!"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>A</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Author "A"</div>
              <div style={{ fontSize: '0.9rem', color: '#a855f7', fontWeight: '500' }}>Penulis Top Webnovel</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-pattern-hex" style={{ padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 className="tracking-tight" style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>
          Siap Menguasai Pasar Web Novel?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6', fontSize: '1.15rem' }}>
          Jangan biarkan pesaing Anda menggunakan AI sementara Anda masih mengetik manual. Waktu adalah uang, dan Kris menghemat waktu Anda 90%.
        </p>
        <button onClick={() => { setView('machines'); window.scrollTo(0,0); }} style={{ 
          background: 'white', color: '#6b21a8', padding: '1.25rem 3.5rem', borderRadius: '9999px', fontSize: '1.25rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'inline-block',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', transition: 'all 0.2s'
        }}>
          Mulai Bikin Novel Sekarang
        </button>
      </section>
    </div>
  );
  };

  const renderMachinesGrid = () => (
    <div className="machines-wrapper animate-fade" style={{ padding: '2rem 2rem 4rem' }}>
      <button
        onClick={() => setView('dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem', padding: '0.5rem 1rem', borderRadius: '0.65rem', fontSize: '0.88rem', fontWeight: '600', transition: 'all 0.2s' }}
        onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
      >
        ← Beranda
      </button>

      <section style={{ padding: '1rem 2rem', textAlign: 'center', marginBottom: '2rem', position: 'relative', overflow: 'hidden', width: '100%' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '900', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '50px', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(99,102,241,0.25)', display: 'inline-block', marginBottom: '1.25rem' }}>20+ Engine Tersedia</span>
          <h2 className="tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-primary)' }}>Kris Ai Studio</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.65' }}>Eksplorasi semua alat asisten penulis AI tingkat lanjut dalam satu ruang kerja profesional.</p>
        </div>
        
        <div className="machines-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          justifyItems: 'center'
        }}>
          {engines.map((engine) => (
            <EngineCard key={engine.id} {...engine} onClick={() => handleLaunch(engine)} />
          ))}
        </div>
      </section>

      <style>{`
        @media (min-width: 1200px) {
          .machines-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .machines-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );

  const renderEditor = () => (
    <div className="editor-wrapper animate-fade" style={{ padding: '1.5rem 2rem 4rem' }}>
      <button
        onClick={() => setView('machines')}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: '0.65rem', fontSize: '0.88rem', fontWeight: '600', transition: 'all 0.2s' }}
        onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
      >
        ← Pilih Engine Lain
      </button>
      {selectedEngine && <EngineInterface engine={selectedEngine} onSave={handleSave} tokens={tokens} setTokens={setTokens} />}
    </div>
  );

  const renderFolder = () => (
    <div className="folder-wrapper animate-fade" style={{ padding: '2rem 2rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="tracking-tight" style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)' }}>Riwayat Karya</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>{savedWorks.length} karya tersimpan di memori browser</p>
        </div>
      </div>
      {savedWorks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <BookOpen size={28} color="var(--text-secondary)" style={{ opacity: 0.4 }} />
          </div>
          <h3 style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Folder Kosong</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gunakan Mesin AI dan tekan Simpan untuk mengarsipkan karya Anda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {savedWorks.map(work => (
            <div key={work.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', border: '1px solid rgba(99,102,241,0.2)', whiteSpace: 'nowrap' }}>{work.title || 'Draft AI'}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{work.date}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {work.content?.substring(0, 80)}...
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => downloadAsTxt(work.content, `${work.title}.txt`)} title="Download TXT"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'; }}
                  onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  <DownloadIcon size={16} />
                </button>
                <button onClick={() => handleDelete(work.id)}
                  style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', color: '#f43f5e', cursor: 'pointer', width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#f43f5e'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.color = '#f43f5e'; }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderUnduhView = () => (
    <div className="unduh-wrapper animate-fade" style={{ padding: '2rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 0 20px rgba(99,102,241,0.15)', flexShrink: 0 }}>
            <DownloadIcon size={22} />
          </div>
          <div>
            <h2 className="tracking-tight" style={{ fontSize: '1.5rem', fontWeight: '900' }}>Unduh Karya</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>{savedWorks.length} karya siap diunduh</p>
          </div>
        </div>

        {savedWorks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
            <DownloadIcon size={40} color="var(--text-secondary)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Belum ada karya tersimpan</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px', opacity: 0.7 }}>Hasilkan karya dengan AI Engine terlebih dahulu</p>
            <button onClick={() => { setActiveTab('beranda'); setView('machines'); }} className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem' }}>
              Buka AI Engine
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {savedWorks.map(work => (
              <div key={work.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <p style={{ fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', fontSize: '0.95rem' }}>{work.title || 'Karya Tanpa Judul'}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {work.content ? work.content.split(/\s+/).filter(w => w.length > 0).length.toLocaleString('id-ID') : 0} kata
                    {work.savedAt ? ` · ${new Date(work.savedAt).toLocaleDateString('id-ID')}` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => downloadAsTxt(work.content, work.title || 'karya')}
                    className="btn-primary"
                    style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <DownloadIcon size={14} /> TXT
                  </button>
                  <button
                    onClick={() => downloadAsDocx(work.content, work.title || 'karya')}
                    style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                  >
                    <DownloadIcon size={14} /> DOCX
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderActiveView = () => {
    if (activeTool) {
      if (isUtilityTool(activeTool.name)) {
        return (
          <div className="inline-tool-wrapper animate-fade" style={{ display: 'flex', flexDirection: 'column' }}>
            <UtilityModals tool={activeTool} isOpen={true} onClose={() => setActiveTool(null)} />
          </div>
        );
      } else {
        return (
          <div className="inline-tool-wrapper animate-fade" style={{ display: 'flex', flexDirection: 'column' }}>
            <ToolModal
              tool={activeTool}
              isOpen={true}
              onClose={() => setActiveTool(null)}
              onSave={(content, toolName) => {
                handleSave(content);
                setActiveTool(null);
              }}
              tokens={tokens}
              setTokens={setTokens}
            />
          </div>
        );
      }
    }

    if (activeTab === 'admin') return <AdminPanel />;
    if (activeTab === 'about') return <AboutView />;
    if (activeTab === 'settings') return <SettingsView user={user} onUpdate={(updates) => setUser({...user, ...updates})} />;

    if (activeTab === 'beranda') {
      if (view === 'dashboard') return renderDashboard();
      if (view === 'machines') return renderMachinesGrid();
      return renderEditor();
    }
    if (activeTab === 'chat') return <ChatView tokens={tokens} setTokens={setTokens} />;
    if (activeTab === 'folder') return renderFolder();
    if (activeTab === 'unduh') return renderUnduhView();
    return renderDashboard();
  };

  if (isRecoveringPassword) {
    return <ResetPasswordView onComplete={() => setIsRecoveringPassword(false)} />;
  }

  if (!user) {
    return <AuthView onAuthSuccess={(userData) => {
      setUser(userData);
      if (userData.initialTokens) {
        setTokens(userData.initialTokens);
      }
    }} />;
  }

  return (
    <MainLayout 
      user={user} 
      onLogout={async () => {
        await supabase.auth.signOut();
        setUser(null);
      }}
      tokens={tokens}
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onSelectTool={(tool) => setActiveTool(tool)}
    >
      {renderActiveView()}

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'success' ? 'rgba(16,185,129,0.9)' : 'rgba(239,68,68,0.9)',
          backdropFilter: 'blur(12px)', color: 'white', padding: '0.75rem 1.5rem',
          borderRadius: '999px', fontWeight: '700', fontSize: '0.88rem',
          zIndex: 9999, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.3s ease', whiteSpace: 'nowrap'
        }}>
          {toast.message}
        </div>
      )}
    </MainLayout>
  );
}

export default App;
