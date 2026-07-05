import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize } from 'lucide-react';

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const images = [
    { id: 1, url: 'https://picsum.photos/seed/code1/800/600', title: 'CAMPUS LABS' },
    { id: 2, url: 'https://picsum.photos/seed/code2/800/600', title: 'STUDENT SYMPOSIUM' },
    { id: 3, url: 'https://picsum.photos/seed/code3/800/600', title: 'GRADUATION 2024' },
    { id: 4, url: 'https://picsum.photos/seed/code4/800/600', title: 'HACKATHON VIBES' },
    { id: 5, url: 'https://picsum.photos/seed/code5/800/600', title: 'MENTORSHIP SESSION' },
    { id: 6, url: 'https://picsum.photos/seed/code6/800/600', title: 'OFFICE HOURS' },
  ];

  return (
    <div className="page-container">
      <section className="section">
        <h2 className="hero-text">IMAGE<br />GALLERY.</h2>
        <div className="gallery-grid" style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {images.map((img) => (
            <div key={img.id} className="glass-card gallery-item" style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setSelected(img)}>
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', borderRadius: '16px' }}>
                <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="img-overlay"><Maximize size={24} /></div>
              </div>
              <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 800, fontSize: '12px' }}>{img.title}</p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lightbox" onClick={() => setSelected(null)}>
              <button className="close-lightbox"><X /></button>
              <img src={selected.url} alt={selected.title} />
              <h3>{selected.title}</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Gallery;
