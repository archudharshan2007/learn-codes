import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { javaLessons, jsLessons } from '../utils/data';

export default function Header({ onMobileMenu }) {
  const { theme, toggleTheme, navigate, user } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.length < 2) { setResults([]); setShowDropdown(false); return; }

    const lower = q.toLowerCase();
    const hits = [];

    javaLessons.forEach((l, idx) => {
      if (l.title.toLowerCase().includes(lower) || l.explanation.toLowerCase().includes(lower)) {
        hits.push({ label: `☕ Java: ${l.title}`, page: 'java', params: { lessonIdx: idx } });
      }
    });
    jsLessons.forEach((l, idx) => {
      if (l.title.toLowerCase().includes(lower) || l.explanation.toLowerCase().includes(lower)) {
        hits.push({ label: `⚡ JS: ${l.title}`, page: 'javascript', params: { lessonIdx: idx } });
      }
    });

    setResults(hits.slice(0, 6));
    setShowDropdown(hits.length > 0);
  };

  const pickResult = (hit) => {
    navigate(hit.page, hit.params);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="topbar">
      {/* Mobile hamburger */}
      <button className="icon-btn" onClick={onMobileMenu} style={{ marginRight: '8px', display: 'none' }} id="mobile-menu-btn">
        ☰
      </button>

      {/* Search */}
      <div className="search-wrap" style={{ position: 'relative' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search lessons, topics…"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
        />
        {showDropdown && (
          <div ref={dropdownRef} className="search-dropdown">
            {results.map((r, i) => (
              <div key={i} className="search-item" onMouseDown={() => pickResult(r)}>
                <div className="search-item-title">{r.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-actions">
        {/* Theme toggle */}
        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* User badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '50px', fontSize: '13px', fontWeight: 700 }}>
          <span>{user?.avatar}</span>
          <span>{user?.username}</span>
        </div>
      </div>
    </header>
  );
}
