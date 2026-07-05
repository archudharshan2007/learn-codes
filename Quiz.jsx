import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { javaQuiz, jsQuiz } from '../utils/data';

export default function Quiz() {
  const { navigate, pageParams, saveQuizScore, progress } = useApp();
  const [lang, setLang] = useState(pageParams?.lang || null);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const quiz = lang === 'java' ? javaQuiz : jsQuiz;

  const reset = (newLang) => {
    setLang(newLang);
    setQIdx(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setDone(false);
  };

  if (!lang) {
    return (
      <div>
        <h2 className="section-title">🏆 Course Quizzes</h2>
        <p className="section-sub">Test your knowledge and earn your certificates. Score 4/5 (80%) or higher to pass!</p>
        <div className="quiz-select-grid">
          {[
            { id: 'java', label: '☕ Java Quiz', desc: 'Variables, loops, OOP, arrays, and methods', score: progress.quizzes?.java },
            { id: 'javascript', label: '⚡ JavaScript Quiz', desc: 'DOM, events, functions, ES6, and arrays', score: progress.quizzes?.javascript },
          ].map(q => (
            <div key={q.id} className="quiz-select-card" onClick={() => reset(q.id)}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{q.id === 'java' ? '☕' : '⚡'}</div>
              <h3 style={{ marginBottom: '8px' }}>{q.label}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{q.desc}</p>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--peach)' }}>
                {q.score != null ? `Last Score: ${q.score}/5 ${q.score >= 4 ? '✔ Passed!' : ''}` : 'Not attempted yet'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    const passed = score >= 4;
    saveQuizScore(lang, score);
    return (
      <div>
        <div className="quiz-result-card">
          <div className={`score-ring`} style={{ borderColor: passed ? '#10b981' : 'var(--peach)', background: passed ? 'rgba(16,185,129,0.1)' : 'var(--peach-light)', color: passed ? '#065f46' : 'var(--peach-dark)' }}>
            {score}/5
          </div>
          <h2 style={{ marginBottom: '12px' }}>{passed ? '🎉 You Passed!' : '😔 Keep Practicing!'}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            {passed
              ? `Great job! You scored ${score * 20}% and earned your ${lang === 'java' ? 'Java' : 'JavaScript'} certificate!`
              : `You scored ${score * 20}%. Review the lessons and try again — you've got this!`}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost" onClick={() => setLang(null)}>Back to Quizzes</button>
            {passed
              ? <button className="btn btn-primary" onClick={() => navigate('certificate', { course: lang })}>Claim Certificate 🏆</button>
              : <button className="btn btn-primary" onClick={() => reset(lang)}>Try Again 🔁</button>}
          </div>
        </div>
      </div>
    );
  }

  const q = quiz[qIdx];

  const submit = () => {
    if (selected === null) return;
    setLocked(true);
    if (selected === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qIdx + 1 >= quiz.length) {
      setDone(true);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
      setLocked(false);
    }
  };

  return (
    <div>
      <div className="quiz-card">
        <div className="quiz-progress-row">
          <span>{lang === 'java' ? '☕ Java Quiz' : '⚡ JavaScript Quiz'}</span>
          <span>Question {qIdx + 1} / {quiz.length}</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{ width: `${((qIdx) / quiz.length) * 100}%`, height: '100%', background: 'var(--peach)', transition: 'width 0.4s ease' }} />
        </div>

        <div className="quiz-question">{q.question}</div>

        <div className="quiz-choices">
          {q.options.map((opt, i) => {
            let cls = 'quiz-choice';
            if (locked) {
              if (i === q.answer) cls += ' correct';
              else if (i === selected) cls += ' incorrect';
            } else if (i === selected) cls += ' selected';
            return (
              <button key={i} className={cls} onClick={() => !locked && setSelected(i)} disabled={locked}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid', borderColor: locked && i === q.answer ? '#10b981' : locked && i === selected ? '#ef4444' : i === selected ? 'var(--peach)' : 'var(--border-color)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '11px' }}>
                  {locked && i === q.answer ? '✔' : locked && i === selected && i !== q.answer ? '✕' : ''}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {locked && (
          <div className="quiz-explanation">
            <b>Tutor Explanation:</b> {q.explanation}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-ghost" onClick={() => setLang(null)}>Exit Quiz</button>
          {!locked
            ? <button className="btn btn-primary" onClick={submit} disabled={selected === null}>Submit Answer</button>
            : <button className="btn btn-primary" onClick={next}>{qIdx + 1 >= quiz.length ? 'See Results 🏆' : 'Next Question →'}</button>}
        </div>
      </div>
    </div>
  );
}
