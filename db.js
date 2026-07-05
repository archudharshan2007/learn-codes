import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = sqlite3.verbose();
const DB_PATH = path.join(__dirname, '..', 'codeeasy.db');

const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database: codeeasy.db');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    avatar TEXT DEFAULT '🦊',
    contact TEXT UNIQUE NOT NULL,
    contact_type TEXT NOT NULL CHECK(contact_type IN ('email','phone')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, course, lesson_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course TEXT NOT NULL,
    score INTEGER NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, course)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS solved_challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    challenge_id TEXT NOT NULL,
    solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, challenge_id)
  )`);

  console.log('✅ All database tables initialized.');
});

export default db;
