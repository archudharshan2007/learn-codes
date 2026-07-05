import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, Layers, CreditCard, HelpCircle, Mail, Image, LogOut, MessageCircle } from 'lucide-react';

const Sidebar = ({ mobileOpen, toggleMobile }) => {
  const { user, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/java', label: 'Java Mastery', icon: <BookOpen size={18} /> },
    { to: '/javascript', label: 'JS Logic', icon: <Layers size={18} /> },
    { to: '/ai-teacher', label: 'AI Classroom', icon: <MessageCircle size={18} /> },
    { to: '/pricing', label: 'Tuition', icon: <CreditCard size={18} /> },
    { to: '/gallery', label: 'Gallery', icon: <Image size={18} /> },
    { to: '/faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { to: '/contact', label: 'Support', icon: <Mail size={18} /> },
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-show' : ''}`}>
      <Link to="/" className="sidebar-brand">CODE<span>EASY</span></Link>

      <nav style={{ flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="nav-link"
            onClick={toggleMobile}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--peach)', color: 'var(--charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>
            {user?.username?.charAt(0)}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.username}</div>
            <button onClick={logout} style={{ fontSize: '11px', color: '#EF4444', fontWeight: '900', letterSpacing: '1px' }}>LOGOUT</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
