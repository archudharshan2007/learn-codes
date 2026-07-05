# ⚡ CodeEasy - Learn Java & JavaScript the Easy Way

CodeEasy is a modern, interactive educational platform designed for complete beginners. It simplifies complex programming concepts using real-world analogies, interactive code playgrounds, and a reward-based learning system.

## 🎨 UI Design
- **Theme:** Modern Charcoal (#27262E), Peach (#E19C63), and Light Blue (#8BA5BE).
- **Fonts:** Kiona (Display) and Joliet (Serif) with Google Font fallbacks.
- **Effects:** Parallax scrolling on the welcome page and smooth Framer Motion animations.

## 🚀 Features
- **OTP Auth:** Secure login via Email (Gmail) or Mobile (International format).
- **Interactive Courses:** 16 lessons (Java & JS) with analogies and code snippets.
- **Practice Lab:** Built-in JS editor to run code and see output instantly.
- **Quizzes:** Knowledge tests with instant feedback.
- **Certificates:** Automated PDF-style certificates for course graduates.
- **AI Chatbot:** "Codey" uses simple language to explain concepts.

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express.
- **Database:** SQLite3 (Zero-config, self-contained file).
- **Auth:** Nodemailer (Gmail) & Twilio (SMS).

## 🏁 Getting Started

### 1. Prerequisites
- Node.js installed on your machine.
- A Gmail account (for email OTPs) or Twilio account (for SMS).

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root (already provided as template):
```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Use "mock" to test without real credits (OTPs will print to console)
OTP_MODE=mock
```

### 4. Running the App
The project uses `concurrently` to run both the frontend and backend with one command:
```bash
npm run dev
```

The database (`codeeasy.db`) will be automatically created and initialized on the first run of the server.

## 📂 Project Structure
- `/src/components`: UI components (Sidebar, Topbar, Chatbot).
- `/src/pages`: Main view pages (Home, Lab, Quiz, etc).
- `/src/context`: Authentication and Progress state logic.
- `/server`: Express API and SQLite database schema.
- `/index.html`: Optimized SEO and meta tags.
