import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const AVATARS = ['🦊','🐼','👾','🚀','🦄','🎨','🐯','🦖','🐸','🎮'];

export default function Welcome() {
  const { loginUser } = useApp();
  const [tab, setTab] = useState('login');           // 'login' | 'register'
  const [step, setStep] = useState(1);               // 1 = details, 2 = otp
  const [contactType, setContactType] = useState('email');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [avatar, setAvatar] = useState('🦊');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [devOtp, setDevOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);     // { type: 'error'|'success', text }
  const [timer, setTimer] = useState(0);
  const otpRefs = useRef([]);
  const parallaxRef = useRef(null);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      const stars = parallaxRef.current.querySelector('.parallax-stars');
      const grid = parallaxRef.current.querySelector('.parallax-grid');
      const glow1 = parallaxRef.current.querySelector('.parallax-glow-1');
      const glow2 = parallaxRef.current.querySelector('.parallax-glow-2');
      const shapes = parallaxRef.current.querySelector('.parallax-shapes');
      if (stars) stars.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (grid) grid.style.transform = `translateY(${scrollY * 0.08}px)`;
      if (glow1) glow1.style.transform = `translateY(${scrollY * 0.25}px)`;
      if (glow2) glow2.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (shapes) shapes.style.transform = `translateY(${scrollY * 0.12}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!username.trim()) return showMsg('error', 'Please enter a username.');
    if (!contact.trim()) return showMsg('error', `Please enter your ${contactType === 'email' ? 'email address' : 'phone number'}.`);
    if (contactType === 'phone' && !contact.startsWith('+')) return showMsg('error', 'Phone must include country code, e.g. +91 9876543210');

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, contact_type: contactType, username, avatar })
      });
      const data = await res.json();
      if (!res.ok) return showMsg('error', data.error || 'Failed to send OTP.');

      if (data.mock && data.devOtp) {
        setDevOtp(data.devOtp);
        // Auto-fill OTP in dev mode
        const digits = data.devOtp.split('');
        setOtp(digits);
      }
      setTimer(60);
      setStep(2);
      showMsg('success', data.message);
    } catch {
      showMsg('error', 'Server error. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return showMsg('error', 'Please enter the full 6-digit code.');

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, contact_type: contactType, code, username, avatar })
      });
      const data = await res.json();
      if (!res.ok) return showMsg('error', data.error || 'Incorrect OTP. Please try again.');

      showMsg('success', `Welcome to CodeEasy, ${data.user.username}! 🎉`);
      setTimeout(() => loginUser(data.user), 800);
    } catch {
      showMsg('error', 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // OTP digit input handler
  const handleOtpInput = (val, idx) => {
    const digits = [...otp];
    digits[idx] = val.replace(/\D/g, '').slice(-1);
    setOtp(digits);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) setOtp(text.split(''));
  };

  return (
    <div className="welcome-page">
      {/* ── PARALLAX BACKGROUND ── */}
      <div className="parallax-wrapper" ref={parallaxRef}>
        <div className="parallax-layer parallax-stars" />
        <div className="parallax-layer parallax-grid" />
        <div className="parallax-layer parallax-glow-1" />
        <div className="parallax-layer parallax-glow-2" />
        <div className="parallax-layer parallax-shapes">
          <div className="shape-ring shape-ring-1" />
          <div className="shape-ring shape-ring-2" />
          <div className="shape-ring shape-ring-3" />
          {/* Floating code snippets */}
          <FloatingCode style={{ top: '18%', left: '5%', animationDelay: '0s' }}>{'int x = 5;'}</FloatingCode>
          <FloatingCode style={{ top: '65%', left: '2%', animationDelay: '1.2s' }}>{'console.log("Hi!")'}</FloatingCode>
          <FloatingCode style={{ top: '30%', right: '3%', animationDelay: '0.6s' }}>{'class Dog { }'}</FloatingCode>
          <FloatingCode style={{ bottom: '20%', right: '5%', animationDelay: '1.8s' }}>{'for(i=0;i<5;i++)'}</FloatingCode>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="welcome-center">
          {/* LEFT: Branding */}
          <div className="welcome-branding">
            <div className="welcome-logo-badge">
              <div className="logo-icon">C</div>
              <div className="logo-wordmark">Code<span>Easy</span></div>
            </div>

            <h1 className="welcome-headline">
              Learn <span className="accent">Java</span> &amp;<br />
              <span className="accent-blue">JavaScript</span><br />
              The Easy Way
            </h1>

            <p className="welcome-sub">
              We teach coding with simple words, fun analogies, and real-world examples — perfect for beginners, school students, and curious minds!
            </p>

            <div className="welcome-features">
              {[
                ['☕', '8 Java lessons with code examples'],
                ['⚡', '9 JavaScript lessons with exercises'],
                ['🎮', 'Interactive code editor & challenges'],
                ['🏆', 'Quizzes and completion certificates'],
                ['🤖', 'AI tutor chatbot for instant help'],
              ].map(([icon, text]) => (
                <div className="feature-pill" key={text}>
                  <div className="feature-pill-dot">{icon}</div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Auth Card */}
          <div className="auth-card">
            {/* Tab switcher */}
            <div className="auth-tabs">
              <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setStep(1); setMessage(null); setDevOtp(null); setOtp(['','','','','','']); }}>
                Login
              </button>
              <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setStep(1); setMessage(null); setDevOtp(null); setOtp(['','','','','','']); }}>
                Sign Up
              </button>
            </div>

            {/* Message banner */}
            {message && (
              <div className={`auth-message ${message.type}`} style={{ marginBottom: '16px' }}>
                {message.text}
              </div>
            )}

            {step === 1 ? (
              /* ── STEP 1: Details Form ── */
              <form className="auth-form" onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={tab === 'login' ? 'Enter your username' : 'Choose a display name'}
                    required
                  />
                </div>

                {tab === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Pick Your Avatar</label>
                    <div className="avatar-grid">
                      {AVATARS.map(a => (
                        <button key={a} type="button" className={`avatar-btn ${avatar === a ? 'selected' : ''}`} onClick={() => setAvatar(a)}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Verify via</label>
                  <div className="contact-type-switcher">
                    <button type="button" className={`contact-type-btn ${contactType === 'email' ? 'active' : ''}`} onClick={() => { setContactType('email'); setContact(''); }}>
                      📧 Gmail
                    </button>
                    <button type="button" className={`contact-type-btn ${contactType === 'phone' ? 'active' : ''}`} onClick={() => { setContactType('phone'); setContact(''); }}>
                      📱 Mobile
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{contactType === 'email' ? 'Gmail Address' : 'Mobile Number (with country code)'}</label>
                  <input
                    className="form-input"
                    type={contactType === 'email' ? 'email' : 'tel'}
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder={contactType === 'email' ? 'you@gmail.com' : '+91 9876543210'}
                    required
                  />
                  {contactType === 'phone' && (
                    <small style={{ color: 'rgba(139,165,190,0.7)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                      🌍 Supports all country codes: +1 (US), +44 (UK), +91 (IN), +61 (AU)…
                    </small>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
                  {loading ? <><span className="spinner" /> Sending OTP…</> : `Send OTP Code 🔑`}
                </button>
              </form>
            ) : (
              /* ── STEP 2: OTP Verification ── */
              <form className="auth-form" onSubmit={handleVerifyOtp}>
                <div className="otp-display-box">
                  <div className="otp-sent-info">
                    OTP sent to <span className="otp-contact-badge">{contact}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)' }}>
                    Enter the 6-digit code below:
                  </div>
                </div>

                {/* Dev mode auto-fill banner */}
                {devOtp && (
                  <div className="dev-otp-banner">
                    <div>
                      <div className="dev-otp-label">⚡ Dev Mode OTP</div>
                      <div style={{ fontSize: '11px', color: 'rgba(225,156,99,0.7)', marginTop: '2px' }}>Auto-filled for testing</div>
                    </div>
                    <div className="dev-otp-code">{devOtp}</div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">6-Digit Verification Code</label>
                  <div className="otp-inputs" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => (otpRefs.current[idx] = el)}
                        className={`otp-digit-input ${digit ? 'filled' : ''}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpInput(e.target.value, idx)}
                        onKeyDown={e => handleOtpKeyDown(e, idx)}
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                  <div className="otp-timer">
                    {timer > 0 ? (
                      `Code expires in ${timer}s`
                    ) : (
                      <button type="button" className="otp-resend-btn" onClick={() => { setStep(1); setOtp(['','','','','','']); setDevOtp(null); }}>
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? <><span className="spinner" /> Verifying…</> : 'Verify & Enter CodeEasy 🚀'}
                </button>

                <button type="button" className="btn btn-ghost" style={{ width: '100%', marginTop: '8px' }} onClick={() => { setStep(1); setOtp(['','','','','','']); setDevOtp(null); setMessage(null); }}>
                  ← Change Contact
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Small floating code snippet decorator
function FloatingCode({ children, style }) {
  return (
    <div style={{
      position: 'absolute',
      fontFamily: "'Fira Code', monospace",
      fontSize: '12px',
      color: 'rgba(139,165,190,0.25)',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(139,165,190,0.1)',
      borderRadius: '6px',
      padding: '6px 10px',
      pointerEvents: 'none',
      animation: 'float 4s ease-in-out infinite alternate',
      ...style,
    }}>
      {children}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px); opacity: 0.6; }
          to   { transform: translateY(-14px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
