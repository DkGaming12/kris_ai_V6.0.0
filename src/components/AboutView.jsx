import React from 'react';
import {
  Code2, Sparkles, BookOpen, GraduationCap, User, MapPin, Hash,
  MessageCircle, Zap, Shield, Globe, Heart, Star, Award
} from 'lucide-react';

const AboutView = () => {
  const techStack = [
    { name: 'React 18', desc: 'UI Framework', color: '#61dafb' },
    { name: 'Vite', desc: 'Build Tool', color: '#646cff' },
    { name: 'Groq API', desc: 'AI Engine', color: '#f97316' },
    { name: 'Supabase', desc: 'Auth & Database', color: '#3ecf8e' },
    { name: 'LLaMA 3.3', desc: 'Language Model', color: '#a855f7' },
    { name: 'Lucide Icons', desc: 'Icon Library', color: '#e11d48' },
  ];

  const features = [
    { icon: Zap, label: '17 AI Engines', desc: 'Novel, cerpen, puisi, surat, dan lebih banyak lagi' },
    { icon: Shield, label: '22+ Writer Tools', desc: 'Premis, outline, revisi, karakter builder, dan world building' },
    { icon: BookOpen, label: 'Ghost Editor', desc: 'Editor penulisan immersif tanpa gangguan' },
    { icon: Globe, label: 'Multi-Platform', desc: 'Responsive desktop, tablet, dan mobile' },
    { icon: Sparkles, label: 'Chat AI', desc: 'Asisten penulis berbasis LLM mutakhir' },
    { icon: Star, label: 'Token System', desc: 'Sistem kredit yang terhubung ke akun Supabase' },
  ];

  return (
    <div className="animate-fade" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(14,165,233,0.1) 50%, rgba(139,92,246,0.15) 100%)',
        border: '1px solid rgba(99,102,241,0.25)',
        borderRadius: '2rem',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px',
          borderRadius: '50%', background: 'rgba(139,92,246,0.08)', filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px',
          borderRadius: '50%', background: 'rgba(14,165,233,0.08)', filter: 'blur(30px)', pointerEvents: 'none'
        }} />

        <div style={{
          width: '80px', height: '80px', borderRadius: '22px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
          boxShadow: '0 0 40px rgba(79,70,229,0.4), 0 0 80px rgba(79,70,229,0.15)'
        }}>
          <Sparkles size={36} color="white" />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '999px', padding: '4px 14px', marginBottom: '1.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#a5b4fc', letterSpacing: '1px' }}>KRIS AI V6.0.0 — SASTRA ENGINE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-1px' }}>
          Tentang{' '}
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Kris AI
          </span>
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto' }}>
          Platform pabrikasi novel berbasis AI pertama di Indonesia, dirancang untuk membantu penulis web novel 
          melipatgandakan produktivitas dan penghasilan mereka melalui teknologi mutakhir.
        </p>
      </div>

      {/* Creator Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(234,179,8,0.06) 0%, rgba(249,115,22,0.06) 100%)',
        border: '1px solid rgba(234,179,8,0.2)', borderRadius: '1.5rem', padding: '2.5rem', marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
          <div style={{ padding: '8px', background: 'rgba(234,179,8,0.1)', borderRadius: '10px', border: '1px solid rgba(234,179,8,0.2)' }}>
            <Award size={18} color="#eab308" />
          </div>
          <h2 style={{ fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#eab308' }}>
            Identitas Pembuat
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 0 30px rgba(234,179,8,0.3), 0 0 60px rgba(234,179,8,0.1)',
            border: '3px solid rgba(234,179,8,0.4)'
          }}>
            <User size={44} color="white" />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.5px' }}>
              Didi Purnomo
            </h3>
            <p style={{ color: '#eab308', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
              Developer &amp; Creator of Kris AI
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hash size={14} color="var(--text-secondary)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  NIM: <strong style={{ color: 'var(--text-primary)' }}>60324067</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={14} color="var(--text-secondary)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Prodi Informatika</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--text-secondary)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>UIN K.H. Abdurrahman Wahid (Gusdur)</strong> — Pekalongan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(234,179,8,0.05)', border: '1px solid rgba(234,179,8,0.15)',
          borderLeft: '3px solid #eab308', borderRadius: '0 0.75rem 0.75rem 0', padding: '1rem 1.25rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', fontStyle: 'italic' }}>
            "Kris AI lahir dari keyakinan bahwa kreativitas manusia tidak boleh dibatasi oleh hambatan teknis. 
            Dengan AI sebagai mitra, setiap penulis Indonesia bisa menghasilkan karya berkelas dunia."
          </p>
          <p style={{ color: '#eab308', fontSize: '0.8rem', fontWeight: '700', marginTop: '0.5rem' }}>— Didi Purnomo</p>
        </div>

        <a
          href="https://api.whatsapp.com/send/?phone=6285700660475&text=Halo+Kris,+saya+ingin+bertanya+tentang+Kris+AI"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
            fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(34,197,94,0.3)'
          }}
        >
          <MessageCircle size={18} />
          Hubungi via WhatsApp
        </a>
      </div>

      {/* Features Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{ padding: '8px', background: 'rgba(99,102,241,0.1)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Zap size={18} color="var(--brand-primary)" />
          </div>
          <h2 style={{ fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--brand-primary)' }}>
            Fitur Unggulan
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem'
            }}>
              <div style={{ padding: '10px', background: 'rgba(99,102,241,0.1)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)', flexShrink: 0 }}>
                <f.icon size={18} color="var(--brand-primary)" />
              </div>
              <div>
                <p style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{f.label}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <div style={{ padding: '8px', background: 'rgba(52,211,153,0.1)', borderRadius: '10px', border: '1px solid rgba(52,211,153,0.2)' }}>
            <Code2 size={18} color="#34d399" />
          </div>
          <h2 style={{ fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#34d399' }}>
            Teknologi Yang Digunakan
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {techStack.map((tech, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: `${tech.color}11`, border: `1px solid ${tech.color}33`,
              borderRadius: '0.75rem', padding: '0.6rem 1rem'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tech.color, boxShadow: `0 0 8px ${tech.color}` }} />
              <span style={{ fontWeight: '800', color: tech.color, fontSize: '0.85rem' }}>{tech.name}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>— {tech.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer credit */}
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          Dibuat dengan <Heart size={12} color="#ef4444" fill="#ef4444" style={{ margin: '0 2px' }} /> oleh{' '}
          <strong style={{ color: 'var(--text-primary)', marginLeft: '4px' }}>Didi Purnomo</strong>
          &nbsp;· UIN Gusdur Pekalongan · 2025
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '4px', opacity: 0.6 }}>
          Kris AI V6.0.0 — SASTRA ENGINE · Semua hak cipta dilindungi
        </p>
      </div>
    </div>
  );
};

export default AboutView;
