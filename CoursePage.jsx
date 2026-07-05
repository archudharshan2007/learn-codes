import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { JAVA_LESSONS, JS_LESSONS } from '../utils/coursesData';
import { CheckCircle2, ChevronRight, ChevronLeft, Play, Copy, ClipboardCheck, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const CoursePage = ({ type }) => {
  const { progress, updateLessonProgress } = useAuth();
  const lessons = type === 'java' ? JAVA_LESSONS : JS_LESSONS;
  const courseKey = type === 'java' ? 'java' : 'javascript';

  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveLesson(lessons[0]);
    window.scrollTo(0, 0);
  }, [type]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markComplete = () => {
    updateLessonProgress(courseKey, activeLesson.id);
  };

  const nextLesson = () => {
    const idx = lessons.findIndex(l => l.id === activeLesson.id);
    if (idx < lessons.length - 1) {
      setActiveLesson(lessons[idx + 1]);
      window.scrollTo(0, 0);
    }
  };

  const prevLesson = () => {
    const idx = lessons.findIndex(l => l.id === activeLesson.id);
    if (idx > 0) {
      setActiveLesson(lessons[idx - 1]);
      window.scrollTo(0, 0);
    }
  };

  if (!activeLesson) return <div className="text-main">Loading lesson...</div>;

  const isCompleted = progress.lessons[courseKey].includes(activeLesson.id);
  const allCompleted = progress.lessons[courseKey].length === lessons.length;

  return (
    <div className="course-container">
      <div className="lesson-layout">
        {/* Sidebar Nav with MAGNETIC BUTTONS */}
        <div className="lesson-sidebar" style={{ background: 'none', border: 'none' }}>
          <div className="lesson-sidebar-title" style={{ paddingLeft: '0', marginBottom: '32px' }}>
            {type} CURRICULUM
          </div>

          <div className="magnetic-nav-container">
            {lessons.map((l, i) => (
              <MagneticButton
                key={l.id}
                active={activeLesson.id === l.id}
                onClick={() => setActiveLesson(l)}
              >
                <span>{i + 1}. {l.title}</span>
                {progress.lessons[courseKey].includes(l.id) && (
                  <CheckCircle2 size={16} style={{ marginLeft: '10px' }} />
                )}
              </MagneticButton>
            ))}

            {allCompleted && (
              <Link to="/quiz" style={{ display: 'block', marginTop: '24px' }}>
                <MagneticButton className="active" style={{ background: 'white' }}>
                  <span style={{ color: 'black' }}>Final Exam</span>
                  <Trophy size={16} color="black" />
                </MagneticButton>
              </Link>
            )}
          </div>
        </div>

        {/* Content Card */}
        <div className="lesson-card">
          <span className="lesson-course-tag">{type} MODULE</span>
          <h2 className="hero-title" style={{ fontSize: '48px', marginBottom: '32px' }}>
            {activeLesson.title}
          </h2>

          <div className="analogy-box">
            <div className="analogy-emoji">💡</div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--peach)', marginBottom: '8px', letterSpacing: '1px' }}>The Core Concept</div>
              <p style={{ fontSize: '18px', color: 'white', lineHeight: '1.6' }}>{activeLesson.analogy}</p>
            </div>
          </div>

          <div className="explanation-text">
            <p>{activeLesson.explanation}</p>
          </div>

          <div className="code-block">
            <div className="code-block-header">
              <span>SYNTAX PREVIEW</span>
              <button onClick={() => handleCopy(activeLesson.code)} style={{ color: 'var(--peach)', fontWeight: 'bold' }}>
                {copied ? 'COPIED!' : 'COPY CODE'}
              </button>
            </div>
            <pre><code>{activeLesson.code}</code></pre>
          </div>

          <div className="exercise-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ClipboardCheck size={20} color="var(--peach)" />
              <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Application Task</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', marginBottom: '32px' }}>{activeLesson.exercise}</p>
            <Link to="/practice" className="btn-boutique" style={{ fontSize: '13px' }}>Initialize Lab</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)' }}>
            <button
              className="btn"
              style={{ border: '1px solid var(--glass-border)', color: 'white' }}
              onClick={prevLesson}
              disabled={lessons[0].id === activeLesson.id}
            >
              <ChevronLeft size={18} /> BACK
            </button>

            {!isCompleted ? (
              <button className="btn-boutique" onClick={markComplete}>
                SAVE PROGRESS
              </button>
            ) : (
              <button
                className="btn-boutique"
                style={{ background: 'white', color: 'black' }}
                onClick={nextLesson}
                disabled={lessons[lessons.length - 1].id === activeLesson.id}
              >
                NEXT MODULE <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
