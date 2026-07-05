import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { javaLessons, jsLessons, challenges } from '../utils/data';
import { runCode } from '../utils/transpiler';

// Build the full challenge list from lessons + shared challenges
function buildList() {
  const list = [];
  javaLessons.forEach(l => list.push({ id: l.id, title: `Java: ${l.title}`, difficulty: 'Easy', language: 'java', code: l.exercise.initialCode, expected: l.exercise.expectedOutput }));
  jsLessons.forEach(l => list.push({ id: l.id, title: `JS: ${l.title}`, difficulty: 'Easy', language: 'javascript', code: l.exercise.initialCode, expected: l.exercise.expectedOutput }));
  challenges.forEach(c => {
    list.push({ id: c.id, title: `[Java] ${c.title}`, difficulty: c.difficulty, language: 'java', code: c.initialJava, expected: c.expectedOutput });
    list.push({ id: c.id + '-js', title: `[JS] ${c.title}`, difficulty: c.difficulty, language: 'javascript', code: c.initialJs, expected: c.expectedOutput });
  });
  return list;
}

const ALL = buildList();

export default function Practice() {
  const { progress, solveChallenge, pageParams } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(ALL[0].code);
  const [output, setOutput] = useState({ text: 'Output will appear here after you press ▶ Run Code…', type: 'idle' });

  // Pre-select challenge from page params
  useEffect(() => {
    if (pageParams?.challengeId) {
      const idx = ALL.findIndex(c => c.id === pageParams.challengeId && c.language === (pageParams.course || 'javascript'));
      if (idx !== -1) select(idx);
    }
  }, []);

  const select = (idx) => {
    setActiveIdx(idx);
    setCode(ALL[idx].code);
    setOutput({ text: 'Output will appear here…', type: 'idle' });
  };

  const run = () => {
    const challenge = ALL[activeIdx];
    const result = runCode(code, challenge.language);

    if (result.error) {
      setOutput({ text: `❌ Error: ${result.error}`, type: 'error' });
      return;
    }

    const actual = result.output.trim();
    const expected = (challenge.expected || '').trim();
    const passed = expected ? actual.toLowerCase().includes(expected.toLowerCase()) || actual === expected : true;

    if (passed) {
      setOutput({ text: `${actual}\n\n🎉 EXCELLENT! Challenge passed!`, type: 'success' });
      solveChallenge(challenge.id);
    } else {
      setOutput({ text: `${actual}\n\n❌ Not quite right yet. Expected: "${expected}"`, type: 'error' });
    }
  };

  const active = ALL[activeIdx];

  return (
    <div className="practice-layout">
      {/* Challenges list */}
      <div className="challenges-list-pane">
        <div className="challenges-header">Coding Challenges</div>
        <div className="challenges-scroll">
          {ALL.map((c, idx) => {
            const solved = progress.challenges?.includes(c.id) || progress[c.language]?.includes(c.id);
            return (
              <div key={idx} className={`challenge-card ${idx === activeIdx ? 'active' : ''}`} onClick={() => select(idx)}>
                <div className="challenge-badge-row">
                  <span className={`diff-badge ${c.difficulty}`}>{c.difficulty}</span>
                  <span className="lang-badge">{c.language === 'java' ? '☕' : '⚡'} {c.language}</span>
                  {solved && <span className="solved-badge">✔ Solved</span>}
                </div>
                <div className="challenge-title">{c.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="editor-workspace">
        <div className="editor-box">
          <div className="editor-header">
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#e2e8f0', marginBottom: '2px' }}>{active.title}</div>
              <div style={{ fontSize: '11px', color: 'rgba(139,165,190,0.7)' }}>Language: {active.language}</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={run}>▶ Run Code</button>
          </div>
          <textarea
            className="editor-textarea"
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div className="console-pane">
          <div className="console-header">
            <span>Console Output</span>
            <button className="console-clear-btn" onClick={() => setOutput({ text: 'Console cleared.', type: 'idle' })}>Clear</button>
          </div>
          <div className={`console-body ${output.type}`} style={{ whiteSpace: 'pre-wrap' }}>{output.text}</div>
        </div>
      </div>
    </div>
  );
}
