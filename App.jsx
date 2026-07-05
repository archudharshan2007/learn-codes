import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUp, Send, Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

import './App.css';

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Dark Mode Toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-layout">
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <CustomCursor />

      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <div className="logo-text">CODEEASY</div>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* LEFT SIDEBAR NAVIGATION */}
      <Sidebar mobileOpen={mobileMenu} toggleMobile={() => setMobileMenu(false)} />

      <main className="main-wrapper">
        {/* TOPBAR ACTIONS */}
        <div className="top-actions">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <Routes location={pathname} key={pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </AnimatePresence>

        {/* MINIMAL FOOTER */}
        <footer className="footer">
          <div className="footer-content">
            <span className="copyright">© 2025 CODEEASY ACADEMY. ALL RIGHTS RESERVED.</span>
            <div className="footer-socials">
              <Twitter size={16} />
              <Instagram size={16} />
              <Linkedin size={16} />
            </div>
          </div>
        </footer>

        {/* STICKY CTA */}
        <button className="sticky-cta">ENROLL NOW</button>

        {/* BACK TO TOP */}
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={20} />
        </button>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
