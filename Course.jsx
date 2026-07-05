import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { javaLessons, jsLessons } from '../utils/data';

export default function Course({ course }) {
  const { navigate, progress, completeLesson, pageParams } = useApp();
  const lessons = course === 'java' ? javaLessons : jsLessons;
  const completedArr = progress[course] || [];
  const [activeIdx, setActiveIdx] = useState(pageParams?.lessonIdx || 0);
  const [copied, setCopied] = useState(false);

  const lesson = lessons[activeIdx];
  const isCompleted = completedArr.includes(lesson.id);

  const copy = () => {
    navigator.clipboard.writeText(lesson.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="lesson-layout">
      {/* Sidebar menu */}
      <div className="lesson-sidebar">
        <div className="lesson-sidebar-title">{course === 'java' ? '☕ Java Lessons' : '⚡ JavaScript Lessons'}</div>
        {lessons.map((l, idx) => {
          const done = completedArr.includes(l.id);
          return (
            <div
              key={l.id}
              className={`lesson-nav-item ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span>{idx + 1}. {l.title}</span>
              {done && <span className="check-icon">✔</span>}
            </div>
          );
        })}
        <div
          className="lesson-nav-item"
          style={{ color: 'var(--peach)', fontWeight: 700, borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '16px' }}
          onClick={() => navigate('quiz', { lang: course })}
        >
          🏆 Take Course Quiz
          {progress.quizzes?.[course] >= 4 && <span className="check-icon">✔</span>}
        </div>
      </div>

      {/* Lesson content */}
      <div className="lesson-card">
        <span className="lesson-course-tag">{course === 'java' ? '☕ Java Programming' : '⚡ JavaScript Programming'}</span>
        <h2>{activeIdx + 1}. {lesson.title}</h2>

        {/* Analogy */}
        <div className="analogy-box">
          <div className="analogy-emoji">💡</div>
          <div>
            <div className="analogy-label">Real-Life Analogy</div>
            <div className="analogy-text" dangerouslySetInnerHTML={{ __html: lesson.analogy }} />
          </div>
        </div>

        {/* Explanation */}
        <div className="explanation-text" style={{ whiteSpace: 'pre-line' }}>{lesson.explanation}</div>

        {/* Code example */}
        <div className="code-block">
          <div className="code-block-header">
            <span>📄 Example Code</span>
            <button className="copy-btn" onClick={copy}>{copied ? '✔ Copied!' : 'Copy'}</button>
          </div>
          <pre><code>{lesson.codeExample}</code></pre>
        </div>

        {/* Exercise */}
        <div className="exercise-box">
          <div className="exercise-label">✏️ Practice Exercise</div>
          <div className="exercise-question">{lesson.exercise.question}</div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('practice', { challengeId: lesson.id, course })}
            >
              Try in Editor 🎮
            </button>
            {isCompleted && (
              <span style={{ color: 'var(--peach)', fontWeight: 700, fontSize: '14px' }}>✔ Completed!</span>
            )}
            {!isCompleted && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => completeLesson(course, lesson.id)}
              >
                Mark as Done ✔
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="lesson-nav-footer">
          {activeIdx > 0 ? (
            <button className="btn btn-ghost" onClick={() => setActiveIdx(i => i - 1)}>← Previous</button>
          ) : <div />}

          {activeIdx < lessons.length - 1 ? (
            <button className="btn btn-primary" onClick={() => setActiveIdx(i => i + 1)}>Next Lesson →</button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('quiz', { lang: course })}>Take Final Quiz 🏆</button>
          )}
        </div>
      </div>
    </div>
  );
}
