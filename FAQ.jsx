import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [active, setActive] = useState(null);
  const questions = [
    { q: "Is prior coding experience required?", a: "Not at all. Our Basic and Intro modules are specifically designed for those starting from zero." },
    { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time through your dashboard settings." },
    { q: "Are the certifications industry recognized?", a: "Absolutely. Our certifications are backed by major industry partners and recognized by global tech firms." },
    { q: "Do you offer job placement support?", a: "Our PRO and ENTERPRISE plans include career coaching and direct referrals to our hiring network." },
  ];

  return (
    <div className="page-container">
      <section className="section">
        <h2 className="hero-text">HELP<br />CENTER.</h2>
        <div className="faq-list" style={{ marginTop: '60px', maxWidth: '800px' }}>
          {questions.map((item, i) => (
            <div key={i} className="faq-item glass-card" style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => setActive(active === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{item.q}</span>
                {active === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ marginTop: '20px', color: 'var(--grey)', fontSize: '14px', lineHeight: '1.8' }}>{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
