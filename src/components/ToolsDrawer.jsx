import React from 'react';
import {
  X, Download, Music, Folder,
  Users, Sparkles, History, Coins, FileText, MessageSquare, Edit3, Lightbulb, Wrench, PenTool, BookOpen,
  User, Globe
} from 'lucide-react';

const toolsList = [
  // Produktivitas
  { name: 'Dengar Lagu', icon: Music, category: 'Produktivitas' },
  { name: 'Komunitas', icon: Users, category: 'Produktivitas' },
  { name: 'Nambah Token', icon: Coins, category: 'Produktivitas' },
  { name: 'Folder Data', icon: Folder, category: 'Produktivitas' },
  { name: 'Riwayat Pembelian', icon: History, category: 'Produktivitas' },
  { name: 'Download Novel', icon: Download, category: 'Produktivitas' },
  // Alat AI
  { name: 'Mau Revisi?', icon: MessageSquare, category: 'Alat AI' },
  { name: 'Revisi Naskah', icon: Edit3, category: 'Alat AI' },
  { name: 'Buat Premis', icon: Lightbulb, category: 'Alat AI' },
  { name: 'Premis GN', icon: Lightbulb, category: 'Alat AI' },
  { name: 'Premis Mega', icon: Sparkles, category: 'Alat AI' },
  { name: 'Buat Outline', icon: FileText, category: 'Alat AI' },
  { name: 'New Outline Maker', icon: BookOpen, category: 'Alat AI' },
  { name: 'Buat Sinopsis', icon: FileText, category: 'Alat AI' },
  { name: 'Buat Blurb', icon: MessageSquare, category: 'Alat AI' },
  { name: 'Prompt Cover', icon: Wrench, category: 'Alat AI' },
  { name: 'Karakter Builder', icon: User, category: 'Alat AI' },
  { name: 'World Building', icon: Globe, category: 'Alat AI' },
  // Kreatif
  { name: 'Text Editor', icon: Edit3, category: 'Kreatif' },
  { name: 'Cover Manual', icon: PenTool, category: 'Kreatif' },
  { name: 'ATM Novel', icon: Folder, category: 'Kreatif' },
  { name: 'Statistik Affiliate', icon: Users, category: 'Kreatif' },
];

const categoryColors = {
  'Produktivitas': { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.25)' },
  'Alat AI': { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.25)' },
  'Kreatif': { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.25)' },
};

const ToolsDrawer = ({ isOpen, onClose, onSelectTool }) => {
  const categories = [...new Set(toolsList.map(t => t.category))];

  return (
    <>
      {/* Backdrop — shows on all screen sizes when open */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 39,
          }}
        />
      )}

      {/* Drawer */}
      <aside
        className={`right-sidebar ${isOpen ? 'open' : ''}`}
        style={{ background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', zIndex: 40 }}
      >
        {/* Header */}
        <div style={{
          padding: '1.75rem 1.5rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Wrench size={18} color="var(--brand-primary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-primary)' }}>Writer Tools</h2>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '1px' }}>22+ alat penulis AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)', cursor: 'pointer',
              width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tools by Category */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {categories.map(cat => {
            const catStyle = categoryColors[cat] || categoryColors['Produktivitas'];
            const catTools = toolsList.filter(t => t.category === cat);
            return (
              <div key={cat} style={{ marginBottom: '1.5rem' }}>
                {/* Category Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                  <div style={{ height: '1px', width: '14px', background: catStyle.color, borderRadius: '1px' }}></div>
                  <span style={{ fontSize: '0.58rem', fontWeight: '900', color: catStyle.color, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{cat}</span>
                </div>

                {/* Grid of tools */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {catTools.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectTool({ name: item.name, icon: item.icon });
                        onClose();
                      }}
                      className="tool-item-btn"
                    >
                      <div style={{
                        color: catStyle.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '30px', height: '30px', background: catStyle.bg,
                        borderRadius: '8px', border: `1px solid ${catStyle.border}`
                      }}>
                        <item.icon size={15} />
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: '600', color: 'var(--text-secondary)', lineHeight: '1.3', textAlign: 'center' }}>
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ToolsDrawer;
