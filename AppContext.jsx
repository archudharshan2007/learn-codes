import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);          // null = not logged in
  const [theme, setTheme] = useState('dark');
  const [page, setPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [progress, setProgress] = useState({
    java: [], javascript: [], challenges: [],
    quizzes: { java: null, javascript: null }
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ce_theme', theme);
  }, [theme]);

  // Load theme from storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('ce_theme');
    if (savedTheme) setTheme(savedTheme);

    // Check if user session is saved
    const savedUser = localStorage.getItem('ce_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        fetchProgress(parsed.id);
      } catch { /* ignore */ }
    }
  }, []);

  // Fetch user progress from API
  const fetchProgress = useCallback(async (userId) => {
    try {
      const res = await fetch(`/api/progress/${userId}`);
      const data = await res.json();
      setProgress(data);
    } catch { /* use default empty progress */ }
  }, []);

  // Toggle theme
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Navigate to a page
  const navigate = (newPage, params = {}) => {
    setPage(newPage);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  // Login user after OTP verification
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('ce_user', JSON.stringify(userData));
    fetchProgress(userData.id);
    navigate('home');
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ce_user');
    setProgress({ java: [], javascript: [], challenges: [], quizzes: { java: null, javascript: null } });
    navigate('home');
  };

  // Mark lesson complete
  const completeLesson = async (course, lessonId) => {
    if (!user || progress[course]?.includes(lessonId)) return;
    setProgress(p => ({ ...p, [course]: [...(p[course] || []), lessonId] }));
    try {
      await fetch('/api/progress/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, course, lesson_id: lessonId })
      });
    } catch { /* silent fail */ }
  };

  // Save quiz score
  const saveQuizScore = async (course, score) => {
    if (!user) return;
    setProgress(p => ({ ...p, quizzes: { ...p.quizzes, [course]: score } }));
    try {
      await fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, course, score })
      });
    } catch { /* silent fail */ }
  };

  // Save solved challenge
  const solveChallenge = async (challengeId) => {
    if (!user || progress.challenges?.includes(challengeId)) return;
    setProgress(p => ({ ...p, challenges: [...(p.challenges || []), challengeId] }));
    try {
      await fetch('/api/progress/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, challenge_id: challengeId })
      });
    } catch { /* silent fail */ }
  };

  // Overall progress percentage
  const getOverallProgress = () => {
    const javaTotal = 8, jsTotal = 9;
    const javaCompleted = (progress.java?.length || 0) + (progress.quizzes?.java >= 4 ? 1 : 0);
    const jsCompleted = (progress.javascript?.length || 0) + (progress.quizzes?.javascript >= 4 ? 1 : 0);
    return Math.round(((javaCompleted + jsCompleted) / (javaTotal + 1 + jsTotal + 1)) * 100);
  };

  const isCourseComplete = (course) => {
    const total = course === 'java' ? 8 : 9;
    const lessonsComplete = progress[course]?.length >= total;
    const quizPassed = progress.quizzes?.[course] >= 4;
    return lessonsComplete && quizPassed;
  };

  return (
    <AppContext.Provider value={{
      user, theme, page, pageParams, progress, searchQuery,
      toggleTheme, navigate, loginUser, logout,
      completeLesson, saveQuizScore, solveChallenge,
      getOverallProgress, isCourseComplete, setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
