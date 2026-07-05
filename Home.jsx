import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Zap, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero-unique" style={{ paddingTop: '40px' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="hero-text">
            LEARN <span className="text-peach">JAVA</span><br />
            AND <span className="text-blue">JS</span> SIMPLY.
          </h1>
          <p className="serif" style={{ fontSize: '24px', fontStyle: 'italic', color: 'var(--text-dim)', marginTop: '24px', maxWidth: '550px' }}>
            A boutique learning experience for future architects. No technical jargon, just pure human logic.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '48px' }}>
            <Link to="/java" className="btn-boutique">Start Journey</Link>
            <Link to="/ai-teacher" className="btn" style={{ border: '1px solid var(--glass-border)', color: 'white', padding: '16px 30px', borderRadius: '12px' }}>
              Meet Codey AI <Sparkles size={14} style={{ marginLeft: '10px' }} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '380px', height: '380px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '48px', transform: 'rotate(10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
            ⚡
          </div>
          <div style={{ position: 'absolute', top: '40px', right: '40px', padding: '14px 24px', background: 'var(--peach)', color: 'var(--charcoal)', fontWeight: '900', borderRadius: '14px', transform: 'rotate(-5deg)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            PREMIUM 2.0
          </div>
        </motion.div>
      </section>

      <div style={{ marginTop: '100px' }}>
        <h2 style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--text-dim)', marginBottom: '32px' }}>CURRENT MODULES</h2>
        <div className="course-grid-unique" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div className="glass-card">
            <BookOpen color="var(--peach)" size={40} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Java Architecture</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '17px', marginBottom: '40px' }}>Master enterprise-grade logic with simple human analogies. From variables to OOP.</p>
            <Link to="/java" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--peach)', fontWeight: '900', fontSize: '13px' }}>
              RESUME MODULE <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="glass-card">
            <Layers color="var(--blue)" size={40} style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Web Dynamics</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '17px', marginBottom: '40px' }}>Learn how to breathe life into static pages using modern JS. DOM to ES6.</p>
            <Link to="/javascript" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--blue)', fontWeight: '900', fontSize: '13px' }}>
              RESUME MODULE <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
