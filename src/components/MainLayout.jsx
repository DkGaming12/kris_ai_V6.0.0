import React, { useState } from 'react';
import { Home, Download, BookOpen, Wrench, Moon, Sun, Menu, X, Sparkles, User, Ghost, MessageSquare, LogOut, Shield, ChevronRight, Zap, Info, Settings } from 'lucide-react';
import ToolsDrawer from './ToolsDrawer';
import GhostEditor from './GhostEditor';

const MainLayout = ({ children, activeTab, setActiveTab, onSelectTool, user, onLogout, tokens }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isGhostOpen, setIsGhostOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const menuUtama = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'chat', label: 'Chat AI', icon: MessageSquare, badge: 'BETA' },
    { id: 'unduh', label: 'Unduh Karya', icon: Download },
    { id: 'ghost', label: 'Ghostwriter', icon: Ghost, special: true },
  ];

  const ekosistem = [
    { id: 'folder', label: 'Riwayat Karya', icon: BookOpen },
    { id: 'admin', label: 'Kendali Token', icon: Shield },
    { id: 'settings', label: 'Pengaturan Akun', icon: Settings },
    { id: 'about', label: 'Tentang App', icon: Info },
  ];

  const handleNavClick = (id) => {
    if (id === 'ghost') {
      setIsGhostOpen(true);
    } else {
      setActiveTab(id);
    }
    setIsSidebarOpen(false);
  };

  const renderNavItems = (items) =>
    items.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`nav-item ${isActive ? 'active' : ''}`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
              background: isActive ? 'rgba(165, 180, 252, 0.15)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              <Icon size={16} color={isActive ? '#a5b4fc' : (item.special ? '#8b5cf6' : 'var(--text-secondary)')} />
            </div>
            <span>{item.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {item.badge && (
              <span style={{
                background: item.badge === 'BETA' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                color: item.badge === 'BETA' ? '#fbbf24' : '#a5b4fc',
                fontSize: '0.55rem', padding: '2px 6px', borderRadius: '999px',
                fontWeight: '900', border: `1px solid ${item.badge === 'BETA' ? 'rgba(234,179,8,0.3)' : 'rgba(99,102,241,0.3)'}`,
                letterSpacing: '0.5px'
              }}>
                {item.badge}
              </span>
            )}
            {item.special && <Sparkles size={12} color="#fbbf24" />}
            {isActive && <ChevronRight size={14} color="#a5b4fc" />}
          </div>
        </button>
      );
    });

  return (
    <div className="layout-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Premium Visual Elements */}
      <div className="noise-bg"></div>
      <div className="glow-edge-right"></div>

      {/* Top Announcement Banner */}
      <div className="marquee-banner">
        <div className="marquee-content">
          <span style={{ paddingRight: '60px' }}>✦ PROMO TERBATAS: AKSES SULTAN AI DISKON 80% — HANYA 10 PENULIS PERTAMA!</span>
          <span style={{ paddingRight: '60px' }}>✦ PABRIKASI NOVEL LEBIH CEPAT DENGAN KRIS AI V6 — SASTRA ENGINE TERBAIK 2026</span>
          <span style={{ paddingRight: '60px' }}>✦ PROMO TERBATAS: AKSES SULTAN AI DISKON 80% — HANYA 10 PENULIS PERTAMA!</span>
          <span style={{ paddingRight: '60px' }}>✦ PABRIKASI NOVEL LEBIH CEPAT DENGAN KRIS AI V6 — SASTRA ENGINE TERBAIK 2026</span>
        </div>
      </div>

      {/* Ghost Editor Overlay */}
      {isGhostOpen && <GhostEditor onBack={() => setIsGhostOpen(false)} />}

      {/* Tools Drawer */}
      <ToolsDrawer isOpen={isToolsOpen} onClose={() => setIsToolsOpen(false)} onSelectTool={onSelectTool} />

      {/* Mobile Top Header */}
      <header className="mobile-header md-hidden">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'
          }}>
            <Sparkles size={16} color="white" />
          </div>
          <span className="glow-text" style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>Kris Ai</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Token display on mobile */}
          <div className="token-badge">
            <Zap size={10} />
            <span>{tokens != null ? tokens.toLocaleString('id-ID') : 0}</span>
          </div>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="menu-btn">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '0', overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Logo */}
          <div style={{
            padding: '1.75rem 1.5rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: '12px',
            position: 'relative'
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(79, 70, 229, 0.5), 0 0 40px rgba(79, 70, 229, 0.2)',
              flexShrink: 0
            }}>
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <h1 className="glow-text tracking-tight" style={{
                fontWeight: '900', fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: '1'
              }}>Kris Ai</h1>
              <p style={{ fontSize: '0.55rem', color: '#0ea5e9', fontWeight: '900', letterSpacing: '2px', marginTop: '3px' }}>
                SASTRA ENGINE V6
              </p>
            </div>
            {/* Online indicator */}
            <div style={{
              position: 'absolute', top: '1.25rem', right: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'pulse-glow 2s infinite' }}></div>
              <span style={{ fontSize: '0.55rem', color: '#22c55e', fontWeight: '700', letterSpacing: '0.5px' }}>LIVE</span>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <p className="nav-section-label">MENU UTAMA</p>
              {renderNavItems(menuUtama)}
            </div>

            {/* Tools Button */}
            <div>
              <p className="nav-section-label">TOOLS & FITUR</p>
              <button
                onClick={() => { setIsToolsOpen(prev => !prev); setIsSidebarOpen(false); }}
                className="sidebar-tool-btn"
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(14,165,233,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Wrench size={15} color="var(--brand-primary)" />
                </div>
                <span>Writer Tools</span>
                <span style={{
                  marginLeft: 'auto',
                  background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc',
                  fontSize: '0.55rem', padding: '2px 6px', borderRadius: '999px',
                  fontWeight: '900', border: '1px solid rgba(99,102,241,0.3)'
                }}>20+</span>
              </button>
              {renderNavItems(ekosistem)}
            </div>
          </nav>

          {/* Footer: User + Actions */}
          <div style={{
            marginTop: 'auto', padding: '1.25rem 1rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            {/* Token display */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.05))',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '1rem', padding: '0.75rem 1rem',
              marginBottom: '0.85rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div>
                <p style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Saldo Token</p>
                <p style={{
                  fontSize: '1.1rem', fontWeight: '900',
                  background: 'linear-gradient(135deg, #a5b4fc, #0ea5e9)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginTop: '2px', lineHeight: '1'
                }}>
                  {tokens != null ? tokens.toLocaleString('id-ID') : 0}
                </p>
              </div>
              <Zap size={20} color="#a5b4fc" style={{ opacity: 0.7 }} />
            </div>

            {/* User info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '900', fontSize: '0.9rem',
                  boxShadow: '0 0 10px rgba(79, 70, 229, 0.4)', flexShrink: 0
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                    {user?.name || 'Pengguna'}
                  </p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '1px', lineHeight: '1' }}>
                    {user?.isGuest ? 'Tamu' : 'Member'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={toggleTheme}
                  title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  style={{
                    background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)', cursor: 'pointer', width: '32px', height: '32px',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--brand-primary)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  onClick={onLogout}
                  title="Keluar"
                  style={{
                    background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)',
                    color: '#f43f5e', cursor: 'pointer', width: '32px', height: '32px',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#f43f5e'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)'; e.currentTarget.style.color = '#f43f5e'; }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content animate-fade">
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md-hidden animate-fade"
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 30 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav md-hidden">
        {[
          { id: 'beranda', label: 'Home', icon: Home },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'tools', label: 'Tools', icon: Wrench },
          { id: 'ghost', label: 'Ghost', icon: Ghost },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'tools' && isToolsOpen) || (item.id === 'ghost' && isGhostOpen);
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'tools') { setIsToolsOpen(!isToolsOpen); }
                else if (item.id === 'ghost') { setIsGhostOpen(!isGhostOpen); }
                else { 
                  setActiveTab(item.id); 
                  setIsToolsOpen(false); 
                  setIsGhostOpen(false); 
                }
              }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '4px',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                borderRadius: '14px', padding: '8px 12px',
                color: isActive ? '#a5b4fc' : 'var(--text-secondary)',
                cursor: 'pointer', flex: 1,
                transition: 'all 0.25s ease'
              }}
            >
              <Icon size={18} color={isActive ? '#a5b4fc' : (item.id === 'ghost' ? '#8b5cf6' : 'currentColor')} />
              <span style={{ fontSize: '0.6rem', fontWeight: isActive ? '800' : '600', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 6px #22c55e; }
          50% { box-shadow: 0 0 14px #22c55e; }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
