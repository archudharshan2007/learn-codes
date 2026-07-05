import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CHALLENGES } from '../utils/coursesData';
import { Play, RotateCcw, CheckCircle, Trophy, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const PracticeLab = () => {
  const { progress, updateChallengeSolved } = useAuth();
  const [activeChallenge, setActiveChallenge] = useState(CHALLENGES[0]);
  const [code, setCode] = useState(activeChallenge.starterCode);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const runCode = () => {
    setOutput('');
    setIsError(false);
    setIsSolved(false);

    // Filter code for simple infinite loop protection (very basic)
    if (code.includes('while(true)') || code.includes('while (true)')) {
      setIsError(true);
      setOutput('Error: Infinite loop detected! Please check your condition.');
      return;
    }

    try {
      // Basic JavaScript execution for the lab
      const logs = [];
      const mockConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))
      };

      // Create a function from the code and execute it with mock console
      const func = new Function('console', code);
      func(mockConsole);

      if (logs.length === 0 && !code.includes('console.log')) {
        setOutput('Code ran successfully, but nothing was printed.\nTry using console.log("Hello");');
      } else {
        setOutput(logs.join('\n'));
      }

      // Check if challenge is solved
      if (activeChallenge.test(code)) {
        setIsSolved(true);
        updateChallengeSolved(activeChallenge.id);
      }
    } catch (err) {
      setIsError(true);
      setOutput(`Error: ${err.message}`);
    }
  };

  const resetCode = () => {
    setCode(activeChallenge.starterCode);
    setOutput('');
    setIsSolved(false);
  };

  const selectChallenge = (ch) => {
    setActiveChallenge(ch);
    setCode(ch.starterCode);
    setOutput('');
    setIsSolved(false);
  };

  return (
    <div className="practice-container">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <h2 className="section-title">Practice Lab</h2>
        <p className="section-sub">Solve challenges to sharpen your coding skills.</p>
      </div>

      <div className="practice-layout">
        {/* Challenges Sidebar */}
        <div className="challenges-list-pane">
          <div className="challenges-header">Coding Challenges</div>
          <div className="challenges-scroll">
            {CHALLENGES.map(ch => (
              <div
                key={ch.id}
                className={`challenge-card ${activeChallenge.id === ch.id ? 'active' : ''}`}
                onClick={() => selectChallenge(ch)}
              >
                <div className="challenge-badge-row">
                  <span className={`diff-badge ${ch.difficulty}`}>{ch.difficulty}</span>
                  <span className="lang-badge">{ch.language}</span>
                  {progress.challenges.includes(ch.id) && (
                    <span className="solved-badge"><CheckCircle size={10} /> Solved</span>
                  )}
                </div>
                <div className="challenge-title">{ch.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace */}
        <div className="editor-workspace">
          <div className="editor-box">
            <div className="editor-header">
              <div className="editor-lang-tabs">
                <button className="editor-tab active">{activeChallenge.language}</button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-ghost btn-sm" onClick={resetCode} style={{ color: '#8BA5BE', borderColor: '#3d3c46' }}>
                  <RotateCcw size={14} /> Reset
                </button>
                <button className="btn btn-primary btn-sm" onClick={runCode}>
                  <Play size={14} /> Run Code
                </button>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(139,165,190,0.05)', fontSize: '13px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <strong>Goal:</strong> {activeChallenge.description}
            </div>

            <textarea
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="console-pane">
            <div className="console-header">
              <span>Output Console</span>
              {output && <button className="console-clear-btn" onClick={() => setOutput('')}>Clear</button>}
            </div>
            <div className={`console-body ${isError ? 'error' : output ? '' : 'idle'}`}>
              {output || 'Output will appear here after you run the code...'}

              {isSolved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="solved-success-msg"
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: 'rgba(16,185,129,0.2)',
                    color: '#10b981',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Trophy size={16} /> Challenge Solved! Awesome work!
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeLab;
