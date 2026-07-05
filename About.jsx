import React from 'react';
import { Target, Heart, Shield, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="about-container">
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title">Our Mission</h2>
        <p className="hero-desc">
          Making programming easy for everyone, one analogy at a time.
        </p>

        <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '48px', textAlign: 'left' }}>
          <div className="resource-card">
            <div className="course-icon java"><Target size={24} /></div>
            <h3 style={{ border: 'none', marginBottom: '8px', padding: 0 }}>Beginner First</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              We believe everyone can code. Our lessons are designed specifically for those with zero experience.
            </p>
          </div>
          <div className="resource-card">
            <div className="course-icon js"><Heart size={24} /></div>
            <h3 style={{ border: 'none', marginBottom: '8px', padding: 0 }}>Human Language</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              We avoid scary technical jargon. If we can't explain it to a 10-year-old, we don't teach it that way.
            </p>
          </div>
          <div className="resource-card">
            <div className="course-icon java"><Shield size={24} /></div>
            <h3 style={{ border: 'none', marginBottom: '8px', padding: 0 }}>Interactive Learning</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Learning by doing is the best way. Our practice lab lets you experiment with code instantly.
            </p>
          </div>
          <div className="resource-card">
            <div className="course-icon js"><Sparkles size={24} /></div>
            <h3 style={{ border: 'none', marginBottom: '8px', padding: 0 }}>AI Assisted</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Our AI chatbot, Codey, is always here to help you when you get stuck on a concept.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '64px', padding: '40px', background: 'var(--peach-light)', borderRadius: '24px' }}>
          <h3 className="font-display" style={{ color: 'var(--peach-dark)', marginBottom: '16px' }}>Ready to start your journey?</h3>
          <p className="font-serif" style={{ color: 'var(--charcoal)', marginBottom: '24px' }}>
            Coding is the superpower of the 21st century. Let's unlock yours today.
          </p>
          <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
      </div>
    </div>
  );
};

export default About;
