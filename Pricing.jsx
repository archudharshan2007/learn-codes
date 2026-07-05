import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    { name: 'BASIC', price: '$29', features: ['Core Modules', 'Community Access', 'Course Certificates'] },
    { name: 'PRO', price: '$59', features: ['All Modules', 'Priority Support', '1-on-1 Mentorship', 'Job Placement'] },
    { name: 'ENTERPRISE', price: '$99', features: ['Custom Curriculum', 'Unlimited Seats', 'Advanced Analytics', 'LMS Integration'] },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <section className="section">
        <h2 className="hero-text">PRICING<br />MODELS.</h2>
        <div className="pricing-grid" style={{ marginTop: '60px' }}>
          {plans.map((plan, i) => (
            <div key={i} className={`glass-card plan-card ${i === 1 ? 'featured' : ''}`}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}<span>/MONTH</span></div>
              <div className="plan-features">
                {plan.features.map((feat, j) => (
                  <div key={j} className="feat-item"><Check size={14} color="var(--silver)" /> {feat}</div>
                ))}
              </div>
              <button className={`btn-boutique ${i === 1 ? '' : 'btn-ghost'}`}>SELECT PLAN</button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Pricing;
