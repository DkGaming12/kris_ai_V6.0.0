import React, { useState } from 'react';
import { ENGINE_DEFINITIONS } from '../constants/engineDefinitions';
import { Settings, Download, Sparkles, Copy, Check, ChevronRight, CheckCircle, Database, Zap } from 'lucide-react';

// Convert hex to rgba
const hexToRgba = (hex, alpha = 1) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return `rgba(99,102,241,${alpha})`;
  return `rgba(${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)},${alpha})`;
};

const EngineInterface = ({ engine, onSave, tokens, setTokens }) => {
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [errors, setErrors] = useState({});

  const config = ENGINE_DEFINITIONS[engine.id] || ENGINE_DEFINITIONS['default'];

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id] || errors.idea) {
      setErrors(prev => ({ ...prev, [id]: null, idea: null }));
    }
  };

  const getEstimatedTokens = () => {
    let wordCount = 0;
    const hasWordsField = config.sidebar.some(p => p.id === 'words');
    const hasPanjang = config.sidebar.some(p => p.id === 'panjang');
    const hasDurasi = config.sidebar.some(p => p.id === 'durasi');

    if (hasWordsField) {
      wordCount = (formData.words && !isNaN(parseInt(formData.words))) ? parseInt(formData.words) : 0;
    } else if (hasPanjang && formData.panjang) {
      if (formData.panjang.includes('Panjang')) wordCount = 2000;
      else if (formData.panjang.includes('Pendek') || formData.panjang.includes('Satu')) wordCount = 200;
      else wordCount = 800;
    } else if (hasDurasi && formData.durasi) {
      if (formData.durasi.includes('30')) wordCount = 3500;
      else if (formData.durasi.includes('5') || formData.durasi.includes('Sedang')) wordCount = 800;
      else wordCount = 300;
    } else if (!hasWordsField && !hasPanjang && !hasDurasi) {
      wordCount = 450;
    }

    if (wordCount <= 0) return 0;
    let tokensUsed = Math.ceil((wordCount / 3500) * 12);
    return tokensUsed > 0 ? tokensUsed : 1;
  };

  const estTokens = getEstimatedTokens();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch(err) { console.error(err); }
  };

  const handleGenerate = async (isContinue = false, isEnding = false) => {
    if (!isContinue) {
      let currentErrors = {};
      let hasError = false;
      if (!formData.title && !formData.idea) {
        currentErrors.idea = '⚠️ Konsep teks tulisan belum terisi. Mohon lengkapi agar AI bisa memproses karya Anda.';
        hasError = true;
      }
      config.sidebar.forEach(param => {
        const val = formData[param.id];
        if (!val || val.toString().trim() === '') {
          currentErrors[param.id] = param.id === 'words' ? 'Wajib diisi dengan angka (Minimal 1).' : 'Harap lengkapi opsi ini.';
          hasError = true;
        } else if (param.id === 'words' && parseInt(val) <= 0) {
          currentErrors.words = 'Wajib diisi dengan angka (Minimal 1).';
          hasError = true;
        }
      });
      if (hasError) { setErrors(currentErrors); return; }
      else { setErrors({}); }
    }

    if (tokens !== undefined && tokens <= 0) {
      alert('Token Anda telah habis. Harap kumpulkan atau beli token terlebih dahulu.');
      return;
    }

    setIsGenerating(true);
    let currentMessages = [];

    if (!isContinue) {
      setResult('');
      const parameterString = config.sidebar
        .map(param => `- ${param.label}: ${formData[param.id] || 'Bebas'}`)
        .join('\\n');
      const promptText = `
Anda adalah Kris Ai, master di bidang penulisan sastra, skenario, dan web novel kelas dunia.
TUGAS: Hasilkan naskah tulisan [${engine.title}] yang sangat mendalam, kaya akan diksi, emosional, dan profesional.

<Detail Inti>
Judul: ${formData.title || 'Tanpa Judul Spesifik'}
Konsep Utama/Ide: ${formData.idea || 'Kembangkan plot yang kompleks dan emosional.'}
</Detail Inti>

${formData.lorebook && formData.lorebook.trim() !== '' ? `<Context Memory / Lorebook>\nMemori dan Aturan Semesta (PENTING! Jaga konsistensi berdasarkan data ini):\n${formData.lorebook}\n</Context Memory / Lorebook>\n` : ''}
<Parameter Teknis & Gaya>
${parameterString}
</Parameter Teknis & Gaya>

<Aturan Output Khusus>
1. Jika "Total Episode" diisi lebih dari 1, berikan daftar outline singkat untuk episode tersebut terlebih dahulu diikuti dengan draf lengkap episode pertama/yang diminta.
2. Panjang tulisan HARUS mendekati "Target Kata / Episode" yang diminta (berikan narasi yang sangat detail, jangan terburu-buru).
3. Gunakan format Markdown yang indah (Judul, Subjudul, Dialog yang dramatis).
4. Langsung ke konten isi, jangan ada basa-basi perkenalan.
</Aturan Output Khusus>
      `.trim();
      currentMessages = [{ role: 'user', content: promptText }];
    } else {
      let continueInstruction = 'Lanjutkan cerita ini ke bab/episode berikutnya. Berikan HANYA isi episode berikutnya tanpa mengulangi kejadian di episode sebelumnya, namun pastikan alurnya tetap nyambung.';
      if (isEnding) {
        continueInstruction = 'Lanjutkan cerita ini dan buatlah bab/episode PENUTUP (Tamat). Selesaikan semua konflik utama dengan ending yang memuaskan dan berbekas. Berikan tanda -TAMAT- di akhir cerita.';
      }
      currentMessages = [...chatMessages, { role: 'user', content: continueInstruction }];
    }

    try {
      const apiKeys = [
        import.meta.env.VITE_GROQ_API_KEY,
        import.meta.env.VITE_GROQ_API_KEY_2,
        import.meta.env.VITE_GROQ_API_KEY_3
      ].filter(key => key && key.trim() !== '' && !key.includes('your_groq_api_key'));

      if (apiKeys.length === 0) throw new Error('API Key Groq belum disetel pada file .env.');

      let aiText = 'Gagal menghasilkan teks.';

      for (let i = 0; i < apiKeys.length; i++) {
        try {
          const res = await fetch(`/api/groq/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKeys[i]}` },
            body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: currentMessages, temperature: 0.7, max_tokens: 4096 })
          });
          const data = await res.json();
          if (data.error) {
            if (i === apiKeys.length - 1) throw new Error(data.error.message);
            continue;
          }
          aiText = data.choices?.[0]?.message?.content || 'Gagal menghasilkan teks.';
          break;
        } catch (err) {
          if (i === apiKeys.length - 1) throw err;
        }
      }

      const wordCount = aiText.split(/\s+/).filter(w => w.length > 0).length;
      if (setTokens) {
        setTokens(prev => {
          let tokenUsed = Math.ceil((wordCount / 3500) * 12);
          if (tokenUsed < 1 && wordCount > 0) tokenUsed = 1;
          return Math.max(0, prev - tokenUsed);
        });
      }

      setChatMessages([...currentMessages, { role: 'assistant', content: aiText }]);
      if (isContinue) setResult(prev => prev + '\n\n---\n\n' + aiText);
      else setResult(aiText);

    } catch (e) {
      console.error(e);
      const errorMsg = `⚠️ Gagal menghasilkan tulisan: ${e.message}\nCek kunci API Groq Anda di .env.`;
      if (isContinue) setResult(prev => prev + '\n\n' + errorMsg);
      else setResult(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const iconBg = hexToRgba(engine.color, 0.15);
  const iconBorder = hexToRgba(engine.color, 0.3);
  const iconGlow = hexToRgba(engine.color, 0.2);

  return (
    <div className="engine-interface animate-fade">

      {/* Engine Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem',
        padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '1.25rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          background: iconBg, color: engine.color, padding: '14px',
          borderRadius: '1rem', boxShadow: `0 0 25px ${iconGlow}`,
          border: `1px solid ${iconBorder}`, flexShrink: 0
        }}>
          <engine.icon size={28} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h2 className="tracking-tight" style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-primary)' }}>
              {engine.title} Engine
            </h2>
            <span style={{ fontSize: '10px', background: '#fbbf24', color: '#1c1917', padding: '2px 8px', borderRadius: '8px', verticalAlign: 'middle', fontWeight: '900', letterSpacing: '0.5px' }}>V6</span>
            {engine.id === 'novel' && (
              <span style={{ fontSize: '9px', border: '1px solid #10b981', color: '#10b981', padding: '2px 8px', borderRadius: '40px', fontWeight: '800', letterSpacing: '0.5px' }}>SERIAL MODE</span>
            )}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{engine.description}</p>
        </div>
      </div>

      {/* Parameters Section */}
      <div style={{
        background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border-color)',
        padding: '1.75rem', marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <div style={{ padding: '6px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '8px' }}>
            <Settings size={16} color="var(--neon-blue)" />
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Parameter Pabrikasi
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {config.sidebar.map((param) => (
            <div key={param.id}>
              <label style={{
                display: 'block', fontSize: '0.68rem', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.8px',
                color: errors[param.id] ? '#ef4444' : 'var(--text-secondary)', marginBottom: '0.5rem'
              }}>
                {param.label}
              </label>

              {param.type === 'select' ? (
                <select
                  className="form-select"
                  value={formData[param.id] || ''}
                  onChange={e => handleChange(param.id, e.target.value)}
                  style={{ border: errors[param.id] ? '1px solid #ef4444' : '1px solid var(--border-color)' }}
                >
                  <option value="" disabled>Pilih {param.label}</option>
                  {param.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              ) : param.type === 'radio' ? (
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {param.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleChange(param.id, opt)}
                      style={{
                        flex: 1, minWidth: '60px', padding: '0.5rem 0.4rem',
                        border: `1px solid ${formData[param.id] === opt ? engine.color : 'var(--border-color)'}`,
                        background: formData[param.id] === opt ? hexToRgba(engine.color, 0.15) : 'var(--glass-bg)',
                        color: formData[param.id] === opt ? engine.color : 'var(--text-secondary)',
                        borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s',
                        fontSize: '0.78rem', fontWeight: '600'
                      }}
                    >{opt}</button>
                  ))}
                </div>
              ) : (
                <input
                  type="text" className="form-input"
                  value={formData[param.id] || ''}
                  onChange={e => handleChange(param.id, e.target.value)}
                  placeholder={param.placeholder || ''}
                  style={{ border: errors[param.id] ? '1px solid #ef4444' : '1px solid var(--border-color)', padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
                />
              )}
              {errors[param.id] && <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.35rem', fontWeight: '700' }}>{errors[param.id]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{
        background: 'var(--bg-card)', borderRadius: '1.25rem', border: '1px solid var(--border-color)',
        padding: '1.75rem', marginBottom: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '1.25rem'
      }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: errors.idea ? '#ef4444' : 'var(--text-secondary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {config.centralInput.titleField}
          </label>
          <input
            type="text" className="form-input"
            value={formData.title || ''}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Masukkan judul menarik di sini..."
            style={{ fontSize: '1rem', padding: '0.9rem 1.1rem', border: (errors.idea && !formData.title) ? '1px solid rgba(239,68,68,0.5)' : '1px solid var(--border-color)' }}
          />
        </div>

        {/* Idea */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: errors.idea ? '#ef4444' : 'var(--text-secondary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {config.centralInput.ideaField}
          </label>
          <textarea
            className="form-textarea"
            value={formData.idea || ''}
            onChange={e => handleChange('idea', e.target.value)}
            placeholder={config.centralInput.placeholder}
            style={{ minHeight: '160px', fontSize: '0.95rem', padding: '0.9rem 1.1rem', resize: 'vertical', lineHeight: '1.65', border: (errors.idea && !formData.idea) ? '1px solid rgba(239,68,68,0.5)' : '1px solid var(--border-color)' }}
          />
          {errors.idea && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: '700' }}>{errors.idea}</p>}
        </div>

        {/* Lorebook */}
        <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '1.25rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
            <Database size={16} color="#8b5cf6" />
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Context Memory & Lorebook
            </label>
            <span style={{ fontSize: '8px', background: '#8b5cf6', color: 'white', padding: '2px 6px', borderRadius: '8px', fontWeight: '900', marginLeft: '4px' }}>SASTRA ENGINE</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
            Fitur RAG-lite untuk konsistensi alur jangka panjang. Masukkan world-building, sifat karakter, atau ringkasan plot sebelumnya.
          </p>
          <textarea
            className="form-textarea"
            value={formData.lorebook || ''}
            onChange={e => handleChange('lorebook', e.target.value)}
            placeholder={'Contoh:\n1. Andi (Protagonis): Selalu sinis, menggunakan pedang Excalibur.\n2. Eldoria: Kota sihir yang tidak pernah ada matahari.\n3. Status Terakhir: Andi sedang terluka parah di bab sebelumnya.'}
            style={{ minHeight: '110px', fontSize: '0.9rem', padding: '0.85rem 1rem', resize: 'vertical', lineHeight: '1.6', border: '1px solid rgba(139, 92, 246, 0.3)' }}
          />
        </div>

        {/* Token Estimator */}
        <div style={{
          background: 'rgba(251, 191, 36, 0.05)', border: '1px dashed rgba(251, 191, 36, 0.3)',
          padding: '1rem 1.25rem', borderRadius: '0.875rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Estimasi Penggunaan</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Akan dipotong merujuk pada jumlah kata final</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24' }}>
            <Zap size={18} />
            {estTokens.toLocaleString()}
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Token</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={() => handleGenerate(false, false)}
          disabled={isGenerating}
          style={{
            width: '100%', padding: '1.1rem', borderRadius: '0.875rem', border: 'none',
            background: isGenerating ? 'rgba(99,102,241,0.4)' : `linear-gradient(135deg, ${engine.color}, #6366f1)`,
            color: 'white', fontWeight: '800', fontSize: '1rem',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            transition: 'all 0.3s',
            boxShadow: isGenerating ? 'none' : '0 8px 24px rgba(99, 102, 241, 0.35)'
          }}
          onMouseOver={e => { if (!isGenerating) e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {isGenerating ? (
            <>
              <span className="spinner" style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', width: '18px', height: '18px', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
              Memproses Karya...
            </>
          ) : (
            <><Sparkles size={20} /> Eksekusi AI — {engine.title}</>
          )}
        </button>
      </div>

      {/* Result Box */}
      {result && (
        <div className="animate-fade" style={{
          background: 'var(--bg-card)', borderRadius: '1.25rem',
          border: `1px solid ${hexToRgba(engine.color, 0.3)}`,
          boxShadow: `0 0 40px ${hexToRgba(engine.color, 0.08)}`,
          overflow: 'hidden'
        }}>
          {/* Result Header */}
          <div style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={18} /> Output {engine.title}
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleGenerate(true, false)} disabled={isGenerating}
                style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#60a5fa', padding: '0.45rem 0.9rem', borderRadius: '0.6rem', cursor: isGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', opacity: isGenerating ? 0.6 : 1, transition: 'all 0.2s' }}
                onMouseOver={e => { if (!isGenerating) { e.currentTarget.style.background = 'rgba(59,130,246,0.25)'; } }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; }}
              >
                <ChevronRight size={15} /> Lanjut Episode
              </button>
              <button
                onClick={() => handleGenerate(true, true)} disabled={isGenerating}
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#34d399', padding: '0.45rem 0.9rem', borderRadius: '0.6rem', cursor: isGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', opacity: isGenerating ? 0.6 : 1, transition: 'all 0.2s' }}
                onMouseOver={e => { if (!isGenerating) { e.currentTarget.style.background = 'rgba(16,185,129,0.25)'; } }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.15)'; }}
              >
                <CheckCircle size={15} /> Tamatkan
              </button>
              <button
                onClick={() => { if (onSave) onSave(result); }}
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.45rem 0.9rem', borderRadius: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Download size={15} /> Simpan
              </button>
              <button
                onClick={handleCopy}
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.45rem 0.9rem', borderRadius: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {copied ? <><Check size={15} color="#10b981" /> Tersalin</> : <><Copy size={15} /> Salin</>}
              </button>
            </div>
          </div>

          {/* Continuation spinner */}
          {isGenerating && chatMessages.length > 0 && (
            <div style={{ padding: '1rem 1.75rem', background: 'rgba(251,191,36,0.04)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem' }}>
              <span className="spinner" style={{ border: '2px solid rgba(251,191,36,0.3)', borderTopColor: '#fbbf24', borderRadius: '50%', width: '14px', height: '14px', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
              Sedang mengarang kelanjutan cerita...
            </div>
          )}

          {/* Result Content */}
          <div style={{ padding: '1.75rem', fontSize: '1rem', lineHeight: '1.9', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', fontFamily: "'Outfit', system-ui" }}>
            {result}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default EngineInterface;
