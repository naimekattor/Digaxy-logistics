'use client';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ChatWidget() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm your Digaxy AI Moving Assistant 📦\nHow can I help you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, minimized]);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        text: "Chat cleared! How can I help you? 📦",
        time: new Date(),
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: data.reply, time: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Error getting response. Try again.', time: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hide widget while session is loading to avoid flicker
  if (status === 'loading') return null;

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Chat Box */}
      {open && (
        <div style={{
          width: 350,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          marginBottom: 12,
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: minimized ? 'auto' : 500,
        }}>

          {/* Header */}
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #0070f3, #0050c8)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>📦</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Digaxy AI Assistant</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>
                  {loading ? '✍️ Typing...' : '🟢 Online'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {/* Clear */}
              <button
                onClick={clearChat}
                title="Clear chat"
                style={{
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: '#fff', width: 28, height: 28, borderRadius: '50%',
                  cursor: 'pointer', fontSize: 14, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>🗑</button>
              {/* Minimize */}
              <button
                onClick={() => setMinimized(!minimized)}
                title={minimized ? 'Expand' : 'Minimize'}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: '#fff', width: 28, height: 28, borderRadius: '50%',
                  cursor: 'pointer', fontSize: 16, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>{minimized ? '▲' : '▼'}</button>
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                title="Close"
                style={{
                  background: 'rgba(255,255,255,0.15)', border: 'none',
                  color: '#fff', width: 28, height: 28, borderRadius: '50%',
                  cursor: 'pointer', fontSize: 16, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>✕</button>
            </div>
          </div>

          {/* Messages */}
          {!minimized && (
            <>
              <div style={{
                flex: 1, overflowY: 'auto', padding: 12,
                display: 'flex', flexDirection: 'column', gap: 8,
                background: '#f8fafc',
              }}>
                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                  }}>
                    <div style={{
                      maxWidth: '80%', padding: '9px 13px',
                      borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: m.role === 'user' ? 'linear-gradient(135deg, #0070f3, #0050c8)' : '#fff',
                      color: m.role === 'user' ? '#fff' : '#111',
                      fontSize: 13, lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }}>
                      {m.text}
                    </div>
                    {/* Timestamp */}
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 3, paddingLeft: 4, paddingRight: 4 }}>
                      {formatTime(m.time)}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      background: '#fff', padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', gap: 4, alignItems: 'center'
                    }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{
                          width: 7, height: 7, borderRadius: '50%', background: '#0070f3',
                          animation: 'bounce 1.2s infinite',
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{
                display: 'flex', padding: 10,
                borderTop: '1px solid #e5e7eb', gap: 8,
                background: '#fff', flexShrink: 0,
              }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1, padding: '9px 14px',
                    border: '1px solid #e5e7eb', borderRadius: 24,
                    outline: 'none', fontSize: 13,
                    background: '#f8fafc',
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  style={{
                    padding: '9px 18px',
                    background: loading ? '#93c5fd' : 'linear-gradient(135deg, #0070f3, #0050c8)',
                    color: '#fff', border: 'none', borderRadius: 24,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: 13, fontWeight: 600,
                  }}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>

      {/* Toggle Button */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false); }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0070f3, #0050c8)',
          color: '#fff', border: 'none', fontSize: 26,
          cursor: 'pointer', display: 'block', marginLeft: 'auto',
          boxShadow: '0 4px 16px rgba(0,112,243,0.45)',
        }}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}