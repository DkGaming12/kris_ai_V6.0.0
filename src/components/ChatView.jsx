import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Zap } from 'lucide-react';

// Simple markdown renderer
const renderMarkdown = (text) => {
  // Bold: **text**
  let result = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code: `code`
  result = result.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.07);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.9em;">$1</code>');
  // Line breaks
  result = result.replace(/\n/g, '<br/>');
  return result;
};

// SVG Bot Avatar (no external URL)
const BotAvatar = () => (
  <div style={{
    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 15px rgba(79, 70, 229, 0.4)'
  }}>
    <Sparkles size={16} color="white" />
  </div>
);

const UserAvatar = () => (
  <div style={{
    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
  }}>
    <User size={16} color="white" />
  </div>
);

const ChatView = ({ tokens, setTokens }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{ text: 'Halo! Saya adalah **Kris Ai**, asisten editor AI pribadi Anda. Diskusikan apa saja di sini: *brainstorming* alur cerita, pemolesan gaya bahasa, atau sekadar meminta saran plot twist! 💡' }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const COST_PER_CHAT = 2;

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    if (tokens < COST_PER_CHAT) {
      alert('Token tidak cukup untuk mengirim pesan. Harap isi ulang token.');
      return;
    }

    const newUserMessage = { role: 'user', parts: [{ text: input }] };
    const contextHistory = [...messages, newUserMessage];
    setMessages(contextHistory);
    setInput('');
    setIsTyping(true);
    setTokens(prev => prev - COST_PER_CHAT);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const apiKeys = [
        import.meta.env.VITE_GROQ_API_KEY,
        import.meta.env.VITE_GROQ_API_KEY_2,
        import.meta.env.VITE_GROQ_API_KEY_3
      ].filter(key => key && key.trim() !== '' && !key.includes('your_groq_api_key'));

      if (apiKeys.length === 0) throw new Error('API Key Groq belum disetel pada file .env.');

      const groqMessages = [
        { role: 'system', content: 'Anda adalah Kris Ai, asisten editor AI kelas dunia dan teman ngobrol khusus penulis fiksi. Pendekatan Anda santai, jenius, memotivasi dan tidak kaku. Gunakan markdown untuk memformat teks yang rapi.' },
        ...contextHistory.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : msg.role,
          content: msg.parts[0].text
        }))
      ];

      let botReply = 'Maaf, mesin sedang sibuk memikirkan ide.';
      for (let i = 0; i < apiKeys.length; i++) {
        try {
          const res = await fetch('/api/groq/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKeys[i]}` },
            body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: groqMessages, temperature: 0.7, max_tokens: 2048 })
          });
          const data = await res.json();
          if (data.error) {
            if (i === apiKeys.length - 1) throw new Error(data.error.message || 'Error dari Groq API.');
            continue;
          }
          botReply = data.choices?.[0]?.message?.content || botReply;
          break;
        } catch (err) {
          if (i === apiKeys.length - 1) throw err;
        }
      }
      setMessages([...contextHistory, { role: 'model', parts: [{ text: botReply }] }]);
    } catch (e) {
      setMessages([...contextHistory, {
        role: 'model',
        parts: [{ text: `⚠️ **Gagal merespons:** ${e.message}\nPastikan \`VITE_GROQ_API_KEY\` pada \`.env\` sudah benar.` }]
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    setMessages([{ role: 'model', parts: [{ text: 'Percakapan telah di-reset. Apa yang ingin kita diskusikan selanjutnya terkait naskah Anda? ✍️' }] }]);
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', width: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bg-card)', backdropFilter: 'blur(20px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--brand-primary)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Bot size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>Chat AI</h2>
              <span style={{ fontSize: '0.6rem', background: 'rgba(234,179,8,0.15)', color: '#fbbf24', padding: '2px 7px', borderRadius: '50px', fontWeight: '900', border: '1px solid rgba(234,179,8,0.3)', letterSpacing: '0.5px' }}>BETA</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Diskusi dengan Kris AI <span style={{ color: '#f59e0b', fontWeight: '700' }}>({COST_PER_CHAT} Token/Pesan)</span>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="token-badge">
            <Zap size={10} />
            <span>{tokens?.toLocaleString('id-ID') ?? 0} Sisa</span>
          </div>
          <button
            onClick={clearChat}
            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.45rem 0.9rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseOut={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} style={{ display: 'flex', gap: '10px', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
              {isUser ? <UserAvatar /> : <BotAvatar />}
              {isUser ? (
                <div className="chat-bubble-user">
                  {msg.parts[0].text}
                </div>
              ) : (
                <div className="chat-bubble-bot"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.parts[0].text) }}
                />
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <BotAvatar />
            <div className="chat-bubble-bot" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.85rem 1.1rem' }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <div key={i} style={{
                  width: '7px', height: '7px', background: 'var(--brand-primary)',
                  borderRadius: '50%', animation: `bounce 1.4s infinite ease-in-out both`,
                  animationDelay: `${delay}s`
                }} />
              ))}
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>Kris sedang mengetik...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem 1.5rem 1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan ide atau panduan menulis... (Enter untuk kirim, Shift+Enter baris baru)"
            style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)',
              borderRadius: '0.875rem', padding: '0.9rem 3.5rem 0.9rem 1.1rem',
              color: 'var(--text-primary)', resize: 'none', minHeight: '50px', maxHeight: '120px',
              outline: 'none', fontFamily: "'Outfit', inherit", fontSize: '0.92rem', lineHeight: '1.6',
              transition: 'border-color 0.2s'
            }}
            rows={1}
            onFocus={e => { e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{
              position: 'absolute', right: '0.5rem', bottom: '0.5rem',
              background: !input.trim() || isTyping ? 'rgba(99,102,241,0.3)' : '#6366f1',
              color: 'white', border: 'none', width: '40px', height: '40px',
              borderRadius: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: !input.trim() || isTyping ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Send size={16} style={{ marginLeft: '1px' }} />
          </button>
        </div>
        <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.62rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
          Kris Ai dapat membuat kesalahan. Selalu periksa kembali fakta yang diberikan.
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatView;
