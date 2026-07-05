import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QUIZZES } from '../utils/coursesData';
import { Trophy, CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  const { progress, updateQuizResult } = useAuth();
  const [courseType, setCourseType] = useState(null); // 'java' or 'javascript'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = (type) => {
    setCourseType(type);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleAnswer = (idx) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === QUIZZES[courseType][currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZZES[courseType].length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      const finalScore = Math.round((score / QUIZZES[courseType].length) * 100);
      updateQuizResult(courseType, finalScore);
    }
  };

  if (!courseType) {
    return (
      <div className="quiz-select-container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Test Your Knowledge</h2>
        <p className="section-sub" style={{ textAlign: 'center' }}>Select a quiz to earn your certificate.</p>

        <div className="quiz-select-grid">
          <motion.div whileHover={{ y: -5 }} className="quiz-select-card" onClick={() => startQuiz('java')}>
            <div className="course-icon java" style={{ margin: '0 auto 20px' }}><Award size={32} /></div>
            <h3>Java Quiz</h3>
            <p>Ready to prove your Java skills?</p>
            <div className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>Start Quiz</div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="quiz-select-card" onClick={() => startQuiz('javascript')}>
            <div className="course-icon js" style={{ margin: '0 auto 20px' }}><Award size={32} /></div>
            <h3>JavaScript Quiz</h3>
            <p>Test your web development logic.</p>
            <div className="btn btn-blue btn-sm" style={{ marginTop: '16px' }}>Start Quiz</div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percent = Math.round((score / QUIZZES[courseType].length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-result-card">
        <div className="score-ring">{percent}%</div>
        <h2 className="section-title">Quiz Completed!</h2>
        <p className="section-sub">You scored {score} out of {QUIZZES[courseType].length} questions.</p>

        {percent >= 75 ? (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '16px' }}>
              <Trophy size={48} style={{ display: 'block', margin: '0 auto 12px' }} />
              Congratulations! You passed!
            </div>
            <Link to="/resources" className="btn btn-primary">
              View Your Certificate
            </Link>
          </div>
        ) : (
          <p style={{ color: '#ef4444', fontWeight: 600, marginBottom: '32px' }}>
            You need at least 75% to pass and earn a certificate.
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => setCourseType(null)}>
            Try Another Quiz
          </button>
          <button className="btn btn-blue" onClick={() => startQuiz(courseType)}>
            <RotateCcw size={16} /> Retake Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  const q = QUIZZES[courseType][currentIdx];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-progress-row">
          <span>Question {currentIdx + 1} of {QUIZZES[courseType].length}</span>
          <span>Score: {score}</span>
        </div>

        <h3 className="quiz-question">{q.question}</h3>

        <div className="quiz-choices">
          {q.options.map((opt, i) => {
            let className = 'quiz-choice';
            if (showExplanation) {
              if (i === q.answer) className += ' correct';
              else if (i === selectedAnswer) className += ' incorrect';
            } else if (selectedAnswer === i) {
              className += ' selected';
            }

            return (
              <button key={i} className={className} onClick={() => handleAnswer(i)} disabled={showExplanation}>
                {showExplanation && i === q.answer && <CheckCircle2 size={18} />}
                {showExplanation && i === selectedAnswer && i !== q.answer && <XCircle size={18} />}
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="quiz-explanation">
            <strong>{selectedAnswer === q.answer ? 'Correct!' : 'Keep learning!'}</strong>
            <p style={{ marginTop: '4px' }}>{q.explanation}</p>
          </motion.div>
        )}

        {showExplanation && (
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextQuestion}>
            {currentIdx === QUIZZES[courseType].length - 1 ? 'Finish Quiz' : 'Next Question'} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
