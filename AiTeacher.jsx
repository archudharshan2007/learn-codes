import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Brain, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiTeacher = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to your personal AI Workspace. I'm Codey, your dedicated programming mentor. How can I help you master Java or JavaScript today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = "That's an interesting question! In programming, clarity is everything. Could you tell me a bit more about what you're trying to build?";
      const text = input.toLowerCase();
      if (text.includes('variable')) reply = "Imagine a variable as a labeled container. In Java, you define the type (like int), but in JavaScript, you just use let. It's like having a box labeled 'Shoes' or just a box where you put anything.";
      if (text.includes('loop')) reply = "A loop is just automation. Instead of writing 'Hello' five times, you tell the computer: 'Repeat this action until I say stop.'";

      const botMsg = { id: Date.now() + 1, text: reply, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="ai-page-container">
      <div className="topbar">
        <h2 className="hero-title" style={{ fontSize: '32px' }}>AI <span className="text-peach">Classroom</span></h2>
        <div style={{ color: 'var(--text-dim)', fontSize: '14px', fontWeight: 'bold' }}>CODEY v2.0 READY</div>
      </div>

      <div className="ai-workspace">
        {/* The "Separate Table" Sidebar */}
        <div className="ai-sidebar">
          <div style={{ marginBottom: '32px' }}>
            <div className="nav-label">Instructor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--peach)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Codey AI</div>
                <div style={{ fontSize: '12px', color: 'var(--peach)' }}>Online & Thinking</div>
              </div>
            </div>
          </div>

          <div className="nav-label">Session Tips</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ fontSize: '13px', color: 'var(--text-dim)', display: 'flex', gap: '10px' }}><Sparkles size={14} color="var(--peach)" /> Use natural language</li>
            <li style={{ fontSize: '13px', color: 'var(--text-dim)', display: 'flex', gap: '10px' }}><Book size={14} color="var(--peach)" /> Ask for analogies</li>
            <li style={{ fontSize: '13px', color: 'var(--text-dim)', display: 'flex', gap: '10px' }}><Brain size={14} color="var(--peach)" /> Paste your error logs</li>
          </ul>
        </div>

        <div className="ai-chat-area">
          <div className="ai-messages" ref={scrollRef}>
            <AnimatePresence>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`msg-bubble ${m.sender === 'bot' ? 'msg-bot' : 'msg-user'}`}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="ai-input-wrapper">
            <div className="ai-input-pill">
              <input
                type="text"
                placeholder="Ask your teacher anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} style={{ color: 'var(--peach)' }}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTeacher;
