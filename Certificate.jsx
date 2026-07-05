import { useApp } from '../context/AppContext';

export default function Certificate() {
  const { pageParams, user, navigate, isCourseComplete } = useApp();
  const course = pageParams?.course || 'java';

  const courseTitle = course === 'java' ? 'Java Programming' : 'JavaScript Programming';
  const completed = isCourseComplete(course);

  if (!completed) {
    return (
      <div className="quiz-result-card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2>Certificate Locked</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
          To unlock your official completion certificate, you must complete all lessons and pass the final course quiz with 80% (4/5) or higher!
        </p>
        <button className="btn btn-primary" onClick={() => navigate(course)}>
          Go to lessons 🚀
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="cert-outer">
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h2>Congratulations, {user?.username}! 🎓</h2>
        <p style={{ color: 'var(--text-secondary)' }}>You have earned your official credentials. Print or save your certificate as a PDF.</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
        <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
          🖨️ Print / Save as PDF
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>
          Back to Home
        </button>
      </div>

      {/* Certificate graphic */}
      <div className="certificate">
        <div className="cert-inner">
          <div className="cert-ribbon">CODEEASY ACADEMY</div>
          
          <h1 className="cert-title serif" style={{ fontFamily: 'var(--font-serif)', color: 'var(--charcoal)' }}>
            Certificate of Completion
          </h1>
          <div className="cert-subtitle">Master of Programming Basics</div>

          <div className="cert-presented">This certificate is proudly awarded to</div>
          <div className="cert-name serif" style={{ fontFamily: 'var(--font-serif)' }}>{user?.username}</div>

          <div className="cert-body">
            for successfully completing the <strong>{courseTitle}</strong> curriculum course. Proving fluency in core variables, arrays, decision structures, repetition loops, methods, and basic object architectures.
          </div>

          <div className="cert-footer">
            <div className="cert-sig-block">
              <div className="cert-sig">EasyBot</div>
              <div className="cert-sig-line"></div>
              <div className="cert-sig-title">AI Coding Tutor</div>
            </div>

            <div className="cert-seal">
              <div style={{ transform: 'rotate(12deg)' }}>
                CodeEasy<br />
                Verified<br />
                Passed ✅
              </div>
            </div>

            <div className="cert-sig-block">
              <div className="cert-sig" style={{ fontSize: '13px', fontStyle: 'normal', fontFamily: 'var(--font-body)', fontWeight: 'bold' }}>
                {today}
              </div>
              <div className="cert-sig-line"></div>
              <div className="cert-sig-title">Date Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
