import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './db.js';
import { generateOTP, sendEmailOTP, sendSmsOTP } from './otpService.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ─── SEND OTP ─────────────────────────────────────────────────────────────────
app.post('/api/auth/send-otp', async (req, res) => {
  const { contact, contact_type, username, avatar } = req.body;

  if (!contact || !contact_type || !username) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Validate phone format (must include country code starting with +)
  if (contact_type === 'phone' && !contact.startsWith('+')) {
    return res.status(400).json({ error: 'Phone number must include country code (e.g. +91...)' });
  }

  // Validate email format
  if (contact_type === 'email' && !contact.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

  // Delete any previous OTPs for this contact
  db.run('DELETE FROM otps WHERE contact = ?', [contact]);

  // Store new OTP
  db.run(
    'INSERT INTO otps (contact, code, expires_at) VALUES (?, ?, ?)',
    [contact, otp, expiresAt],
    async (err) => {
      if (err) return res.status(500).json({ error: 'Failed to store OTP.' });

      try {
        let result;
        if (contact_type === 'email') {
          result = await sendEmailOTP(contact, otp);
        } else {
          result = await sendSmsOTP(contact, otp);
        }

        res.json({
          success: true,
          mock: result.mock || false,
          message: result.mock
            ? `[DEV MODE] OTP printed to server console.`
            : `OTP sent to ${contact}.`,
          // Only return OTP in mock mode for dev convenience
          devOtp: result.mock ? otp : undefined,
        });
      } catch (sendErr) {
        console.error('OTP send error:', sendErr);
        res.status(500).json({ error: `Failed to send OTP: ${sendErr.message}` });
      }
    }
  );
});

// ─── VERIFY OTP ───────────────────────────────────────────────────────────────
app.post('/api/auth/verify-otp', (req, res) => {
  const { contact, contact_type, code, username, avatar } = req.body;

  if (!contact || !code || !username) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const now = new Date().toISOString();

  db.get(
    'SELECT * FROM otps WHERE contact = ? AND code = ? AND expires_at > ? ORDER BY created_at DESC LIMIT 1',
    [contact, code, now],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      if (!row) return res.status(400).json({ error: 'Invalid or expired OTP code.' });

      // OTP is valid — delete it
      db.run('DELETE FROM otps WHERE contact = ?', [contact]);

      // Find or create user
      db.get('SELECT * FROM users WHERE contact = ?', [contact], (err2, user) => {
        if (err2) return res.status(500).json({ error: 'Database error.' });

        if (user) {
          // Existing user — log in
          res.json({ success: true, user });
        } else {
          // New user — register
          db.run(
            'INSERT INTO users (username, avatar, contact, contact_type) VALUES (?, ?, ?, ?)',
            [username, avatar || '🦊', contact, contact_type],
            function (err3) {
              if (err3) return res.status(500).json({ error: 'Failed to create user.' });

              db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err4, newUser) => {
                if (err4) return res.status(500).json({ error: 'Database error.' });
                res.json({ success: true, user: newUser });
              });
            }
          );
        }
      });
    }
  );
});

// ─── GET USER PROGRESS ────────────────────────────────────────────────────────
app.get('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;

  const data = { lessons: { java: [], javascript: [] }, quizzes: { java: null, javascript: null }, challenges: [] };

  db.all('SELECT * FROM progress WHERE user_id = ?', [userId], (err, lessons) => {
    if (!err && lessons) {
      lessons.forEach((r) => {
        if (data.lessons[r.course]) data.lessons[r.course].push(r.lesson_id);
      });
    }

    db.all('SELECT * FROM quiz_results WHERE user_id = ?', [userId], (err2, quizzes) => {
      if (!err2 && quizzes) {
        quizzes.forEach((r) => { data.quizzes[r.course] = r.score; });
      }

      db.all('SELECT * FROM solved_challenges WHERE user_id = ?', [userId], (err3, challenges) => {
        if (!err3 && challenges) {
          data.challenges = challenges.map((r) => r.challenge_id);
        }
        res.json(data);
      });
    });
  });
});

// ─── SAVE LESSON PROGRESS ─────────────────────────────────────────────────────
app.post('/api/progress/lesson', (req, res) => {
  const { user_id, course, lesson_id } = req.body;
  db.run(
    'INSERT OR IGNORE INTO progress (user_id, course, lesson_id) VALUES (?, ?, ?)',
    [user_id, course, lesson_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save progress.' });
      res.json({ success: true });
    }
  );
});

// ─── SAVE QUIZ RESULT ─────────────────────────────────────────────────────────
app.post('/api/progress/quiz', (req, res) => {
  const { user_id, course, score } = req.body;
  db.run(
    `INSERT INTO quiz_results (user_id, course, score) VALUES (?, ?, ?)
     ON CONFLICT(user_id, course) DO UPDATE SET score = excluded.score, updated_at = CURRENT_TIMESTAMP`,
    [user_id, course, score],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save quiz result.' });
      res.json({ success: true });
    }
  );
});

// ─── SAVE SOLVED CHALLENGE ────────────────────────────────────────────────────
app.post('/api/progress/challenge', (req, res) => {
  const { user_id, challenge_id } = req.body;
  db.run(
    'INSERT OR IGNORE INTO solved_challenges (user_id, challenge_id) VALUES (?, ?)',
    [user_id, challenge_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save challenge.' });
      res.json({ success: true });
    }
  );
});

app.listen(PORT, () => {
  console.log(`\n🚀 CodeEasy Server running at http://localhost:${PORT}`);
});
