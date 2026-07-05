import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="loader-content">
        <h1 className="logo-text">CODE<span>EASY</span></h1>
        <div className="loader-line-bg">
          <motion.div
            className="loader-line-fill"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
