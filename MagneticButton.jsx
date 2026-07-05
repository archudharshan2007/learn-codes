import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, onClick, className, active }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`magnetic-btn ${className} ${active ? 'active' : ''}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0'
      }}
    >
      <div className="magnetic-inner">
        {children}
      </div>
    </motion.button>
  );
};

export default MagneticButton;
