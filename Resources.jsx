import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, FileText, ExternalLink, Printer, Award } from 'lucide-react';

const Resources = () => {
  const { user, progress } = useAuth();
  const certRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const hasJavaCert = progress.quizzes.java >= 75;
  const hasJsCert = progress.quizzes.javascript >= 75;

  return (
    <div className="resources-container">
      <h2 className="section-title">Resources & Certificates</h2>
      <p className="section-sub">Download cheat sheets and view your hard-earned certificates.</p>

      <div className="resources-grid">
        <div className="resource-card">
          <h3><FileText size={18} /> Java Cheat Sheet</h3>
          <div className="cheat-item">
            <code>System.out.println()</code>
            <span>Prints text to the console.</span>
          </div>
          <div className="cheat-item">
            <code>int x = 5;</code>
            <span>Stores a whole number.</span>
          </div>
          <div className="cheat-item">
            <code>for(int i=0; i&lt;5; i++)</code>
            <span>Repeats code 5 times.</span>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '16px' }}>
            <Download size={14} /> Download PDF
          </button>
        </div>

        <div className="resource-card">
          <h3><FileText size={18} /> JavaScript Cheat Sheet</h3>
          <div className="cheat-item">
            <code>console.log()</code>
            <span>Prints to the browser console.</span>
          </div>
          <div className="cheat-item">
            <code>let x = 10;</code>
            <span>Creates a variable that can change.</span>
          </div>
          <div className="cheat-item">
            <code>document.querySelector()</code>
            <span>Finds an element on the page.</span>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '16px' }}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 className="section-title">Your Certificates</h2>
        <p className="section-sub">Pass quizzes with 75% or higher to earn these.</p>

        {(hasJavaCert || hasJsCert) ? (
          <div className="cert-outer">
            {hasJavaCert && (
              <div className="certificate" id="java-cert">
                <div className="cert-ribbon">CodeEasy Academy</div>
                <div className="cert-inner">
                  <div className="cert-title">Certificate of Completion</div>
                  <div className="cert-subtitle">Recognizing Excellence in Programming</div>

                  <div className="cert-presented">This certificate is proudly presented to</div>
                  <div className="cert-name">{user?.username}</div>

                  <div className="cert-body">
                    for successfully mastering the fundamentals of <strong>Java Programming</strong>,
                    including variables, loops, methods, and Object-Oriented principles.
                  </div>

                  <div className="cert-footer">
                    <div className="cert-sig-block">
                      <div className="cert-sig">CodeEasy Teacher</div>
                      <div className="cert-sig-line"></div>
                      <div className="cert-sig-title">Head of Academy</div>
                    </div>

                    <div className="cert-seal">
                      Verified<br />Graduate<br />2025
                    </div>

                    <div className="cert-sig-block">
                      <div className="cert-sig">Codey AI</div>
                      <div className="cert-sig-line"></div>
                      <div className="cert-sig-title">AI Instructor</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasJsCert && (
              <div className="certificate" id="js-cert" style={{ marginTop: '40px' }}>
                <div className="cert-ribbon">CodeEasy Academy</div>
                <div className="cert-inner">
                  <div className="cert-title">Certificate of Completion</div>
                  <div className="cert-subtitle">Web Development Logic Master</div>

                  <div className="cert-presented">This certificate is proudly presented to</div>
                  <div className="cert-name">{user?.username}</div>

                  <div className="cert-body">
                    for demonstrating proficiency in <strong>Modern JavaScript</strong>,
                    DOM manipulation, event handling, and ES6+ features.
                  </div>

                  <div className="cert-footer">
                    <div className="cert-sig-block">
                      <div className="cert-sig">CodeEasy Teacher</div>
                      <div className="cert-sig-line"></div>
                      <div className="cert-sig-title">Head of Academy</div>
                    </div>

                    <div className="cert-seal" style={{ background: 'radial-gradient(circle, #8BA5BE, #6e8ba8)', borderColor: '#27262E', color: 'white' }}>
                      JS<br />Logic<br />Pro
                    </div>

                    <div className="cert-sig-block">
                      <div className="cert-sig">Codey AI</div>
                      <div className="cert-sig-line"></div>
                      <div className="cert-sig-title">AI Instructor</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary" onClick={handlePrint} style={{ marginTop: '24px' }}>
              <Printer size={18} /> Print Certificates
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <Award size={64} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-muted)' }}>No certificates yet!</h3>
            <p className="section-sub">Complete a course and pass the quiz to see your certificate here.</p>
            <Link to="/quiz" className="btn btn-blue btn-sm">Take a Quiz</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
