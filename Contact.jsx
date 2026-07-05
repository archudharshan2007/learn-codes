import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.name && form.email && form.msg) setSuccess(true);
  };

  return (
    <div className="page-container">
      <section className="section">
        <h2 className="hero-text">GET IN<br />TOUCH.</h2>
        <div className="contact-layout" style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
          <div className="contact-info">
            <div className="glass-card" style={{ marginBottom: '20px' }}>
              <MapPin size={20} color="var(--silver)" />
              <p style={{ marginTop: '10px' }}>742 PLATINUM DR,<br />SILVER CITY, SC 2025</p>
            </div>
            <div className="glass-card" style={{ marginBottom: '20px' }}>
              <Mail size={20} color="var(--silver)" />
              <p style={{ marginTop: '10px' }}>HELLO@CODEEASY.COM</p>
            </div>
            <div className="glass-card">
              <Phone size={20} color="var(--silver)" />
              <p style={{ marginTop: '10px' }}>+1 (800) CODE-EASY</p>
            </div>
          </div>

          <div className="glass-card">
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3 style={{ color: 'var(--charcoal)' }}>MESSAGE RECEIVED.</h3>
                <p style={{ color: 'var(--grey)', marginTop: '10px' }}>Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form className="minimal-form" onSubmit={handleSubmit}>
                <div className="form-group"><label>FULL NAME</label><input type="text" className="glass-input" required onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div className="form-group"><label>EMAIL ADDRESS</label><input type="email" className="glass-input" required onChange={e => setForm({...form, email: e.target.value})} /></div>
                <div className="form-group"><label>MESSAGE</label><textarea className="glass-input" rows="5" required onChange={e => setForm({...form, msg: e.target.value})}></textarea></div>
                <button className="btn-boutique" style={{ width: '100%' }}>SEND MESSAGE <Send size={16} /></button>
              </form>
            )}
          </div>
        </div>

        {/* GOOGLE MAPS EMBED */}
        <div className="glass-card" style={{ marginTop: '60px', padding: '10px', height: '400px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%" height="100%" style={{ border: 0, borderRadius: '16px', filter: 'grayscale(1) invert(0.1)' }} allowFullScreen="" loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
