# ⚔️ ScholarQuest — Frontend

> **MSc IT Mini Project 2026** | Gamified Learning Platform

A browser-based, pixel-RPG-themed study companion that turns your academic grind into an adventure.

---

## 🎮 Features

| Module | Description |
|--------|-------------|
| **Dashboard** | XP bar, HP, coins, daily quests, achievement stats |
| **QuizForge** | Quiz battles — earn XP by answering questions correctly |
| **Focus Arena** | Pomodoro-style timer with XP rewards |
| **HabitDojo** | Daily habit tracker with streak multipliers |
| **StudySync** | Collaborative study room (WebSocket ready) |
| **CodeScroll** | Daily coding concept feed |
| **Shop & Inventory** | Buy items & unlock characters with coins |
| **Avatar System** | 20+ unlockable pixel-art characters |

---

## 🚀 Quick Start

```bash
# Option 1: Just open index.html in browser (no server needed)
open index.html

# Option 2: Use Live Server (VS Code extension recommended)
# Right-click index.html → Open with Live Server

# Option 3: Python simple server
python3 -m http.server 5500
# Open http://localhost:5500
```

> **Note:** The app works fully offline using localStorage.  
> Connect to the backend for user accounts and leaderboard features.

---

## 🔌 Backend Integration

Make sure the backend is running at `http://localhost:3000`.

```bash
# Clone and run the backend
git clone https://github.com/Jaish15/scholarquest-backend
cd scholarquest-backend
npm install && npm run dev
```

The frontend uses [`api.js`](./api.js) — a central API helper that:
- Calls the backend for all state operations
- Falls back to **localStorage** automatically if backend is offline
- Manages JWT token storage

---

## 📁 Project Structure

```
Scholarfrontend/
├── index.html        # Main app (all 7 modules)
├── style.css         # Full design system (dark gold theme)
├── app.js            # State management, navigation, UI updates
├── api.js            # Backend API helper (NEW)
├── modules/
│   ├── avatar.js     # Avatar sprite rendering
│   ├── quiz.js       # QuizForge logic
│   ├── focus.js      # Focus Arena / Pomodoro timer
│   ├── habits.js     # HabitDojo streak logic
│   ├── studysync.js  # StudySync room logic
│   ├── codescroll.js # CodeScroll feed
│   └── shop.js       # Shop & inventory
└── src/
    └── modules/avatar/
        ├── components/AvatarSelector.jsx  # React avatar picker
        ├── avatarConfig.js
        └── assets/characters/            # Pixel sprite sheets
```

---

## 🎨 Design System

- **Theme**: Dark gold RPG — `#f59e0b` gold on deep dark backgrounds
- **Font**: Outfit (display) + JetBrains Mono (code)
- **Style**: Glassmorphism cards, pixel-art avatars, animated progress bars
- **Icons**: Lucide Icons

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS (glassmorphism) |
| Logic | Vanilla JavaScript (ES Modules) |
| Avatar UI | React 18 (inline, CDN) |
| Icons | Lucide Icons |
| Fonts | Google Fonts |

---

## 🔗 Related

- **Backend Repo**: [scholarquest-backend](https://github.com/Jaish15/scholarquest-backend)

---

*ScholarQuest — Level Up Your Learning* ⚔️
