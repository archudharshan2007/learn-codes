import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    lessons: { java: [], javascript: [] },
    quizzes: { java: null, javascript: null },
    challenges: []
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('codeeasy_user');
      if (savedUser && savedUser !== "undefined") {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        fetchProgress(parsedUser.id);
      }
    } catch (err) {
      console.error('Session restore failed:', err);
      localStorage.removeItem('codeeasy_user');
    } finally {
      // Ensure we always stop loading after a short delay
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  const fetchProgress = async (userId) => {
    try {
      const res = await fetch(`/api/progress/${userId}`);
      if (!res.ok) throw new Error('Progress fetch failed');
      const data = await res.json();
      setProgress(data);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('codeeasy_user', JSON.stringify(userData));
    fetchProgress(userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codeeasy_user');
    setProgress({
      lessons: { java: [], javascript: [] },
      quizzes: { java: null, javascript: null },
      challenges: []
    });
  };

  const updateLessonProgress = async (course, lessonId) => {
    if (!user) return;
    if (progress.lessons[course].includes(lessonId)) return;

    try {
      await fetch('/api/progress/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, course, lesson_id: lessonId })
      });

      setProgress(prev => ({
        ...prev,
        lessons: {
          ...prev.lessons,
          [course]: [...prev.lessons[course], lessonId]
        }
      }));
    } catch (err) {
      console.error('Failed to update lesson progress:', err);
    }
  };

  const updateQuizResult = async (course, score) => {
    if (!user) return;

    try {
      await fetch('/api/progress/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, course, score })
      });

      setProgress(prev => ({
        ...prev,
        quizzes: {
          ...prev.quizzes,
          [course]: score
        }
      }));
    } catch (err) {
      console.error('Failed to update quiz progress:', err);
    }
  };

  const updateChallengeSolved = async (challengeId) => {
    if (!user) return;
    if (progress.challenges.includes(challengeId)) return;

    try {
      await fetch('/api/progress/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, challenge_id: challengeId })
      });

      setProgress(prev => ({
        ...prev,
        challenges: [...prev.challenges, challengeId]
      }));
    } catch (err) {
      console.error('Failed to update challenge progress:', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, loading, progress,
      updateLessonProgress, updateQuizResult, updateChallengeSolved,
      fetchProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};
