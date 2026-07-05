import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { JAVA_LESSONS, JS_LESSONS } from '../utils/coursesData';

const Topbar = ({ toggleSidebar, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (val) => {
    setQuery(val);
    if (val.length > 1) {
      const allLessons = [
        ...JAVA_LESSONS.map(l => ({ ...l, type: 'Java' })),
        ...JS_LESSONS.map(l => ({ ...l, type: 'JavaScript' }))
      ];
      const filtered = allLessons.filter(l =>
        l.title.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const goToLesson = (lesson) => {
    navigate(`/${lesson.type.toLowerCase()}`);
    setQuery('');
    setResults([]);
  };

  return (
    <header className="topbar">
      <button
        onClick={toggleSidebar}
        id="mobile-menu-btn"
        style={{ display: 'none', alignItems: 'center', justifyContent: 'center' }}
      >
        <Menu size={24} />
      </button>

      <div style={{ position: 'relative', width: '300px', maxWidth: '40vw' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input
          type="text"
          placeholder="Search..."
          style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px' }}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {results.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', marginTop: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 50 }}>
            {results.map(res => (
              <div key={res.id} onClick={() => goToLesson(res)} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{res.title}</div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>{res.type} Course</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={toggleTheme} style={{ color: '#6B7280' }}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button style={{ color: '#6B7280' }}>
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
