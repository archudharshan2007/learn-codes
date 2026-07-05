import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Courses = () => {
  const categories = [
    { title: 'JAVA ARCHITECTURE', modules: '12 Modules', level: 'Beginner to Advanced' },
    { title: 'JAVASCRIPT DYNAMICS', modules: '08 Modules', level: 'Intermediate' },
    { title: 'WEB SECURITY', modules: '05 Modules', level: 'Advanced' },
    { title: 'DATABASE DESIGN', modules: '06 Modules', level: 'Beginner' },
    { title: 'UI/UX LOGIC', modules: '10 Modules', level: 'Mixed' },
    { title: 'DEVOPS CORE', modules: '04 Modules', level: 'Intermediate' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <section className="section">
        <h2 className="hero-text">COURSE<br />CATALOG.</h2>
        <div className="card-grid" style={{ marginTop: '60px' }}>
          {categories.map((cat, i) => (
            <div key={i} className="glass-card course-list-card">
              <div className="card-top">
                <span className="level-badge">{cat.level}</span>
                <span className="module-count">{cat.modules}</span>
              </div>
              <h3 style={{ margin: '20px 0' }}>{cat.title}</h3>
              <p style={{ color: 'var(--grey)', marginBottom: '30px' }}>Master the core principles of {cat.title.toLowerCase()} with hands-on labs and real-world projects.</p>
              <button className="btn-boutique btn-sm">VIEW MODULES <ChevronRight size={14} /></button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Courses;
