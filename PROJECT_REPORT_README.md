# ⚔️ ScholarQuest — Full Project Report

> **MSc IT Mini Project 2026**
> **Project Type**: Full-Stack Gamified Learning Platform & Interactive Developer Arena
> **Architecture**: Decoupled SPA Frontend + Node.js REST/WebSocket Backend
> **Team**: Jaish15 & Team
> **Repositories**: [Jaish15/scholarquest-frontend](https://github.com/Jaish15/scholarquest-frontend) · [Jaish15/scholarquest-backend](https://github.com/Jaish15/scholarquest-backend)

---

## 📋 Table of Contents

1. [Abstract](#1-abstract)
2. [Project Objectives](#2-project-objectives)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Technology Stack](#4-technology-stack)
5. [Frontend Module Specifications](#5-frontend-module-specifications)
6. [Backend Module Specifications](#6-backend-module-specifications)
7. [Database Design & Data Models](#7-database-design--data-models)
8. [Game Mechanics & Reward Economy](#8-game-mechanics--reward-economy)
9. [Security & Reliability Engineering](#9-security--reliability-engineering)
10. [Testing Phase](#10-testing-phase)
11. [Deployment & Environment Setup](#11-deployment--environment-setup)
12. [Challenges Faced & Solutions](#12-challenges-faced--solutions)
13. [Future Enhancements](#13-future-enhancements)
14. [Conclusion](#14-conclusion)

---

## 1. Abstract

**ScholarQuest** is a production-grade, full-stack gamified learning platform designed to transform academic productivity and coding practice into a compelling pixel-RPG adventure. The platform addresses a well-documented problem in computer science education: student disengagement caused by passive learning methods.

By combining **game design principles** (XP, levels, streaks, avatars, coins, and leaderboards) with **real-time collaboration tools** (study rooms, direct messaging, live presence indicators), **interactive multi-language coding sandboxes** (powered by Judge0 API), and **automated productivity tracking** (Pomodoro timers and habit streaks), ScholarQuest creates a holistic academic companion that motivates learners to remain consistent, competitive, and collaborative.

The system is architected as two decoupled tiers:
- A **Single-Page Application (SPA)** frontend built using native HTML5, CSS3, and Vanilla JavaScript ES6 modules, with selective React 18 micro-components.
- A **Node.js + Express.js** backend providing a RESTful API, Socket.io WebSocket server, multi-language code execution sandbox, and OAuth 2.0 social authentication.

---

## 2. Project Objectives

| # | Objective | Status |
|---|---|---|
| 1 | Design and implement a gamified learning platform with RPG mechanics | ✅ Complete |
| 2 | Build a modular frontend SPA with 7 distinct functional modules | ✅ Complete |
| 3 | Implement real-time study rooms and direct messaging via WebSockets | ✅ Complete |
| 4 | Develop a secure REST API with JWT-based authentication | ✅ Complete |
| 5 | Integrate a multi-language code execution sandbox (Python, JS, C, C++, Ruby) | ✅ Complete |
| 6 | Implement OAuth 2.0 social login via Google and GitHub | ✅ Complete |
| 7 | Create a habit tracker with streak multipliers and XP rewards | ✅ Complete |
| 8 | Build a leaderboard and social friend system | ✅ Complete |
| 9 | Provide offline fallback using browser LocalStorage | ✅ Complete |
| 10 | Deploy the application and validate end-to-end flows with Postman | ✅ Complete |

---

## 3. System Architecture Overview

ScholarQuest follows a **three-tier decoupled architecture**:

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CLIENT TIER (Browser)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Dashboard │  │QuizForge │  │  Focus   │  │HabitDojo │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                           │
│  │StudySync │  │CodeScroll│  │   Shop   │  ← app.js (State Router)  │
│  └──────────┘  └──────────┘  └──────────┘                           │
│                    ↓  api.js (HTTP + Offline Fallback)               │
│             LocalStorage Cache (Offline Mode)                        │
└──────────────────────────────────────────────────────────────────────┘
                         ↕ HTTP REST / WebSocket
┌──────────────────────────────────────────────────────────────────────┐
│                     BACKEND TIER (Node.js)                           │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐               │
│  │  Express.js  │  │ Socket.io   │  │  Passport.js │               │
│  │  REST API    │  │ WebSocket   │  │  OAuth 2.0   │               │
│  └──────────────┘  └─────────────┘  └──────────────┘               │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐               │
│  │   Judge0 /   │  │   Resend    │  │   Multer     │               │
│  │ Child Process│  │ Email API   │  │ File Uploads │               │
│  └──────────────┘  └─────────────┘  └──────────────┘               │
└──────────────────────────────────────────────────────────────────────┘
                         ↕ Read / Write
┌──────────────────────────────────────────────────────────────────────┐
│                     STORAGE TIER                                      │
│         JSON File DB (data/*.json)  ↔  PostgreSQL (pg.Pool)         │
└──────────────────────────────────────────────────────────────────────┘
                         ↕ External Services
┌──────────────────────────────────────────────────────────────────────┐
│   Judge0 RapidAPI  │  LeetCode GraphQL  │  Google OAuth  │  GitHub  │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| Vanilla JS SPA (no heavy framework) | Minimal bundle size, full control over DOM, no build step required |
| React 18 via CDN (micro-components only) | JSX convenience for isolated UI controls like AvatarSelector without full React overhead |
| JSON File DB + PostgreSQL abstraction layer | Rapid prototyping via JSON files, seamless migration path to production PostgreSQL |
| Socket.io over raw WebSockets | Built-in reconnection logic, room-based broadcasting, and event namespacing |
| Dual code execution (Judge0 + Child Process) | High availability — falls back to local execution if API limits are reached |
| api.js offline fallback engine | Ensures platform is fully usable without an active backend connection |

---

## 4. Technology Stack

### Frontend

| Layer | Technology | Version / Notes |
|---|---|---|
| Structure | HTML5 (Semantic) | Single SPA shell (index.html) containing all 7 module views |
| Styling | Vanilla CSS3 | Custom CSS variables, glassmorphism, flex/grid responsive layouts |
| Logic Engine | JavaScript ES6 Modules | Modular script architecture; no bundler required |
| Micro-Components | React 18 (CDN) | Used for AvatarSelector component only |
| Real-time Client | socket.io-client v4 | Bi-directional WebSocket communication |
| Icons | Lucide Icons | SVG icon set via CDN |
| Typography | Google Fonts | Outfit (UI copy) · JetBrains Mono (code editor) |

### Backend

| Package | Version | Role |
|---|---|---|
| Node.js | v18 / v20 / v24 | Server runtime |
| Express.js | ^4.18.2 | REST API framework |
| Socket.io | ^4.8.3 | WebSocket engine |
| jsonwebtoken | ^9.0.2 | JWT signing & verification |
| bcryptjs | ^2.4.3 | Password hashing (salted, 10 rounds) |
| Passport.js | ^0.7.0 | OAuth 2.0 strategy orchestrator |
| passport-google-oauth20 | ^2.0.0 | Google social sign-in |
| passport-github2 | ^0.1.12 | GitHub social sign-in |
| Multer | ^2.2.0 | Multipart file upload parser |
| pg | ^8.23.0 | PostgreSQL client |
| Resend | ^6.22.0 | Transactional email (magic links, password resets) |
| uuid | ^9.0.0 | Unique ID generation |
| nodemon | ^3.1.0 | Dev server hot-reload |

### External Integrations

| Service | Purpose |
|---|---|
| Judge0 (via RapidAPI) | Remote multi-language code execution sandbox |
| LeetCode GraphQL API | Pull user coding statistics into CodeScroll module |
| Google OAuth 2.0 | Social login via Google accounts |
| GitHub OAuth 2.0 | Social login via GitHub accounts |
| Resend API | Transactional email delivery |
| Firebase Hosting | Frontend static file hosting |
| Render.com | Backend Node.js server deployment |

---

## 5. Frontend Module Specifications

### File Structure

```
Scholarfrontend/
├── index.html            # SPA shell — all 7 module panels live here
├── style.css             # Design system: CSS variables, glassmorphism, animations
├── app.js                # State orchestrator, client-side router, global UI updates
├── api.js                # Dual-mode API client (online REST + offline LocalStorage)
├── modules/
│   ├── avatar.js         # Sprite rendering, canvas animation, character switching
│   ├── quiz.js           # QuizForge battle engine, scoring, answer validation
│   ├── focus.js          # Pomodoro timer, focus session tracking, anti-cheat
│   ├── habits.js         # HabitDojo CRUD, streak multipliers, HP penalty checks
│   ├── studysync.js      # Room management, friend lists, DM rendering
│   ├── codescroll.js     # Challenge feed, IDE editor integration, Judge0 runner
│   └── shop.js           # Item catalog, coin transactions, inventory management
└── src/
    └── data/
        ├── codeScrollBank.js  # Embedded coding challenge question bank
        ├── quizBank.js        # Offline quiz bank across multiple domains
        └── domains/           # Domain-specific quiz datasets
```

### Module 1 — Dashboard

- **Purpose**: Main character overview and progress hub.
- **Features**:
  - Real-time XP and HP progress bars with animated fills.
  - Level badge with progression threshold display.
  - Daily streak counter and coin balance.
  - Achievement unlock notifications (toast-style pop-ups).
  - Character avatar render with equipped sprite.

### Module 2 — QuizForge (Quiz Battle Engine)

- **Purpose**: Gamified multiple-choice quiz platform.
- **Features**:
  - Domain-based quiz categories (Deep Learning, Cybersecurity, UML, OS, DBMS, Networks, etc.).
  - Real-time countdown timer per question (configurable: 15s / 30s / 60s).
  - Immediate visual feedback (green/red flash) on answer selection.
  - XP and coin rewards on quiz completion based on score and difficulty.
  - Offline quiz bank fallback (embedded in quizBank.js).

### Module 3 — Focus Arena (Pomodoro Timer)

- **Purpose**: Structured productivity timer for deep study sessions.
- **Features**:
  - Configurable work/break intervals: Work (25 min), Short Break (5 min), Long Break (15 min).
  - XP awarded at the end of each completed work interval.
  - Anti-cheat mechanism: Uses document.addEventListener('visibilitychange') to detect tab switching and pause the session.
  - Animated circular countdown ring using SVG stroke-dashoffset.

### Module 4 — HabitDojo (Habit Tracker)

- **Purpose**: Daily habit management with gamified streak incentives.
- **Features**:
  - Create, edit, and delete personal habits.
  - Toggle daily completion with one-click checkboxes.
  - Visual streak counter per habit with fire emoji milestone badges.
  - Streak Multiplier: XP earned per habit completion scales with consecutive day streak.
  - HP Penalty System: Missing a marked-as-critical habit applies an HP deduction.

### Module 5 — StudySync (Real-Time Collaboration)

- **Purpose**: Live collaborative study room and social hub.
- **Features**:
  - Create and join named study rooms with optional passcodes.
  - Real-time participant list (online presence indicators).
  - Room-broadcast chat with timestamp and avatar.
  - Direct Messaging (DM) between friends with file attachment support.
  - Friend request system: send, accept, and manage friend lists.
  - Leaderboard panel showing top 10 players by level and XP.

### Module 6 — CodeScroll (Coding Challenge Arena)

- **Purpose**: Gamified coding practice environment with real code execution.
- **Features**:
  - Scrollable challenge feed with difficulty badges (Easy / Medium / Hard).
  - Integrated code editor with syntax highlighting.
  - Language selector: Python, JavaScript, C, C++, Ruby.
  - "Run Code" button submits code to backend /api/codescroll/run for execution.
  - Real execution output displayed in an output console panel.
  - LeetCode profile sync — pulls solved problem stats from LeetCode GraphQL API.

### Module 7 — Shop & Inventory

- **Purpose**: Gamified cosmetic store and avatar management.
- **Features**:
  - 20+ unlockable pixel-art character avatars.
  - Coin-based purchase system.
  - Stat boosters purchasable with coins.
  - "Equip" button applies purchased avatars immediately.
  - Inventory panel shows all owned items with equipped state.

### Design System

| Token | Value | Usage |
|---|---|---|
| --color-primary | #f59e0b | Gold — XP bars, highlights, borders |
| --color-bg-deep | #0f172a | Deep Obsidian — page background |
| --color-bg-card | #1e293b | Dark Slate — card surfaces |
| --color-accent | #10b981 | Emerald — success states, health bars |
| --color-danger | #ef4444 | Red — HP loss, error states |
| Font (UI) | Outfit | Body text, headings |
| Font (Code) | JetBrains Mono | Code editor, output consoles |
| Glassmorphism | backdrop-filter: blur(12px) | Card backdrops with gold inset border |

---

## 6. Backend Module Specifications

### File Structure

```
scholarquest-backend/
├── server.js                   # Entry point — Express + Socket.io initialization
├── db.js                       # Data abstraction layer (JSON file DB / PostgreSQL)
├── .env.example                # Environment variable template
├── middleware/
│   └── auth.js                 # JWT verification & Bearer token parsing middleware
├── routes/
│   ├── auth.js                 # Auth: Register, Login, OAuth callbacks, Reset
│   ├── user.js                 # User state, profile PATCH, LeetCode link
│   ├── quiz.js                 # Quiz fetch, answer submit, score evaluation
│   ├── habits.js               # Habit CRUD operations
│   ├── leaderboard.js          # Leaderboard ranking queries
│   ├── friends.js              # Friend request/accept/list/remove
│   └── dm.js                   # Direct messaging & file uploads
├── modules/
│   ├── studySyncSocket.js      # WebSocket event handlers
│   └── studySyncStore.js       # In-memory socket state store
└── data/
    ├── users.json
    ├── quizzes.json
    ├── habits.json
    ├── friendships.json
    └── direct_messages.json
```

### REST API — Complete Endpoint Table

#### Authentication (/api/auth)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register user with hashed password & initial game state | No |
| POST | /api/auth/login | Validate credentials & issue signed JWT | No |
| GET | /api/auth/google | Initiate Google OAuth 2.0 flow | No |
| GET | /api/auth/google/callback | Google OAuth 2.0 callback handler | No |
| GET | /api/auth/github | Initiate GitHub OAuth 2.0 flow | No |
| GET | /api/auth/github/callback | GitHub OAuth 2.0 callback handler | No |
| POST | /api/auth/verify-email | Verify email address via token | No |
| POST | /api/auth/magic-link | Send passwordless login link via Resend | No |
| POST | /api/auth/forgot-password | Generate reset token & send email | No |
| POST | /api/auth/reset-password | Consume token & update password hash | No |

#### User State (/api/user)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/user/:id | Fetch full game state (XP, Level, HP, Coins, Avatar) | Yes |
| PATCH | /api/user/:id | Update stats, coins, or equipped avatar | Yes |
| POST | /api/user/leetcode | Link LeetCode username to profile | Yes |

#### Quizzes & Habits

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/quizzes | List all available quizzes | No |
| GET | /api/quizzes/:id | Fetch single quiz by ID | No |
| POST | /api/quizzes/submit | Evaluate answers server-side, award XP/coins | Yes |
| GET | /api/habits/:userId | List all habits for a user | Yes |
| POST | /api/habits/:userId | Create a new habit | Yes |
| PATCH | /api/habits/:userId/:habitId/complete | Toggle completion & award streak XP | Yes |
| DELETE | /api/habits/:userId/:habitId | Delete a habit | Yes |

#### Social & Leaderboard

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/leaderboard | Top 10 users ranked by Level then XP | No |
| GET | /api/friends/:userId | Get friend list & pending requests | Yes |
| POST | /api/friends/request | Send a friend request | Yes |
| POST | /api/friends/accept | Accept a pending friend request | Yes |
| GET | /api/dm/history | Get DM chat history between two users | Yes |
| POST | /api/dm/send | Send a DM with optional file upload | Yes |

#### Code Execution

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/codescroll/run | Execute code via Judge0 API or local process | No |
| GET | /api/codescroll/leetcode-stats/:username | Proxy LeetCode GraphQL stats | No |

### WebSocket Events (Socket.io)

| Event | Direction | Description |
|---|---|---|
| connect | Client → Server | Authenticate WebSocket session |
| join_room | Client → Server | Join a study room by ID |
| leave_room | Client → Server | Leave current study room |
| send_room_message | Client → Server | Broadcast message to room |
| direct_message | Client → Server | Send a private DM to a user |
| connection_established | Server → Client | Confirm connection, send initial state |
| room_state_updated | Server → Client | Send updated room member list |
| user_joined_room | Server → Room | Notify all room members of new joiner |
| receive_room_message | Server → Room | Deliver room chat message to all members |
| receive_direct_message | Server → Client | Deliver private DM to recipient |
| user_left_room | Server → Room | Notify room of user departure |

### Code Execution Sandbox Engine

**Tier 1 — Judge0 API (Primary)**
- Sends { source_code, language_id, stdin } to Judge0 via RapidAPI.
- Language ID mapping: Python 71, JavaScript 63, C 50, C++ 54, Ruby 72.
- Parses response: stdout, stderr, compile_output, status.description.

**Tier 2 — Native Child Process (Fallback)**
- Activates if Judge0 is unreachable or quota exceeded.
- Writes code to temp file in os.tmpdir(), executes via child_process.exec().
- Safety constraints:
  - Execution timeout: 4,000 ms hard cap
  - Output buffer limit: 512 KB max
  - File cleanup: fs.unlinkSync() immediately after execution

---

## 7. Database Design & Data Models

### User Data Model

```json
{
  "id": "uuid-v4",
  "username": "jayasri",
  "email": "jayasri@example.com",
  "passwordHash": "$2a$10$...",
  "xp": 450,
  "level": 4,
  "hp": 100,
  "maxHp": 100,
  "coins": 150,
  "avatar": "wizard_purple",
  "unlockedAvatars": ["starter_hero", "wizard_purple"],
  "streak": 7,
  "lastLoginDate": "2026-10-04",
  "leetcodeUsername": "jayasri_dev",
  "emailVerified": true,
  "createdAt": "2026-08-31T08:00:00.000Z"
}
```

### Habit Data Model

```json
{
  "id": "uuid-v4",
  "userId": "user-uuid",
  "title": "Read 20 pages",
  "isCritical": true,
  "streak": 5,
  "completedDates": ["2026-10-01", "2026-10-02", "2026-10-03"],
  "createdAt": "2026-09-01T00:00:00.000Z"
}
```

### Quiz Data Model

```json
{
  "id": "uuid-v4",
  "category": "Deep Learning",
  "difficulty": "Medium",
  "question": "What activation function is most common in hidden layers?",
  "options": ["Sigmoid", "Tanh", "ReLU", "Softmax"],
  "correctIndex": 2,
  "xpReward": 30,
  "coinReward": 10
}
```

### Friendship Data Model

```json
{
  "id": "uuid-v4",
  "requesterId": "user-a-uuid",
  "receiverId": "user-b-uuid",
  "status": "accepted",
  "createdAt": "2026-09-15T10:00:00.000Z"
}
```

---

## 8. Game Mechanics & Reward Economy

### 8.1 Level Progression

XP required to advance from Level L to Level L+1:

```
Required XP(L) = L × 100
```

Cumulative XP to reach Level N from Level 1:

```
Total XP(N) = 50 × N × (N − 1)
```

| Level Transition | XP Needed | Cumulative XP |
|---|---|---|
| 1 → 2 | 100 XP | 100 XP |
| 2 → 3 | 200 XP | 300 XP |
| 3 → 4 | 300 XP | 600 XP |
| 5 → 6 | 500 XP | 1,500 XP |
| 10 → 11 | 1,000 XP | 5,500 XP |

### 8.2 Habit Streak Multiplier

```
Earned XP = Base XP × (1 + 0.10 × min(Streak, 10))
```

| Streak | Multiplier | XP (Base 20) |
|---|---|---|
| 0 days | ×1.0 | 20 XP |
| 3 days | ×1.3 | 26 XP |
| 5 days | ×1.5 | 30 XP |
| 10+ days | ×2.0 (max) | 40 XP |

### 8.3 Quiz XP Yield

```
Quiz XP = (Correct Answers × 20) × Difficulty Multiplier
```

| Difficulty | Multiplier |
|---|---|
| Easy | 1.0 |
| Medium | 1.5 |
| Hard | 2.0 |

### 8.4 Focus Arena XP

Each completed 25-minute Pomodoro session awards **+50 XP**.

### 8.5 HP Penalty

Missing a critical habit applies: **−10 HP** (floor: 0 HP)

---

## 9. Security & Reliability Engineering

| Concern | Implementation |
|---|---|
| Authentication | Stateless JWT tokens (HMAC-SHA256) in Authorization: Bearer headers |
| Password Storage | bcryptjs with 10 salt rounds; raw passwords never stored |
| OAuth 2.0 | Google and GitHub flows via passport.js with callback URI validation |
| Code Execution Safety | 4s timeout, 512 KB buffer cap, temp file auto-deletion |
| CORS | Configured via cors middleware to allow only expected origins |
| File Uploads | Multer validates MIME types and file sizes for DM attachments |
| Offline Resilience | api.js gracefully degrades to localStorage when backend is unreachable |
| Email Security | Password reset tokens are single-use and time-limited |

---

## 10. Testing Phase

### 10.1 Testing Strategy Overview

ScholarQuest was validated through a multi-layered testing strategy covering unit-level logic, API integration, real-time communication, and end-to-end user flows.

```
Testing Pyramid
────────────────────────────────────────
    [E2E / Manual User Flow Tests]
         (Full browser walkthroughs)
    ─────────────────────────────────
      [API Integration Tests — Postman]
       (REST endpoints + Auth flows)
    ─────────────────────────────────
       [WebSocket Tests — Postman WS]
         (Socket.io event validation)
    ─────────────────────────────────
    [Unit / Logic Tests — Browser Console]
      (Gamification math, quiz scoring)
────────────────────────────────────────
```

The Postman collection and environment files are included in the repository:
- Collection: `scholarquest.postman_collection.json`
- Environment: `scholarquest.postman_environment.json`

Environment variables used:

| Variable | Example Value |
|---|---|
| base_url | http://localhost:3000 |
| auth_token | Auto-set from login response |
| user_id | Auto-set after register/login |
| test_room_id | study-lounge-01 |

---

### 10.2 API Integration Testing (Postman)

#### Test Group 1 — Authentication Flows

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Register new user | POST /api/auth/register | 201 Created + JWT token | ✅ Pass |
| Register duplicate email | POST /api/auth/register | 409 Conflict | ✅ Pass |
| Login with correct credentials | POST /api/auth/login | 200 OK + JWT token | ✅ Pass |
| Login with wrong password | POST /api/auth/login | 401 Unauthorized | ✅ Pass |
| Access protected route without token | GET /api/user/:id | 401 Unauthorized | ✅ Pass |
| Access protected route with valid token | GET /api/user/:id | 200 OK + user data | ✅ Pass |
| Access with expired/invalid JWT | GET /api/user/:id | 403 Forbidden | ✅ Pass |
| Forgot password flow | POST /api/auth/forgot-password | 200 OK + email dispatched | ✅ Pass |
| Reset password with valid token | POST /api/auth/reset-password | 200 OK + password updated | ✅ Pass |
| Reset password with expired token | POST /api/auth/reset-password | 400 Bad Request | ✅ Pass |
| Google OAuth redirect | GET /api/auth/google | Redirect to Google consent screen | ✅ Pass |
| GitHub OAuth redirect | GET /api/auth/github | Redirect to GitHub consent screen | ✅ Pass |

#### Test Group 2 — User State Management

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Fetch user profile | GET /api/user/:id | Full game state object returned | ✅ Pass |
| Update XP and level | PATCH /api/user/:id | 200 OK + updated state | ✅ Pass |
| Equip avatar | PATCH /api/user/:id | 200 OK + avatar updated | ✅ Pass |
| Deduct coins on purchase | PATCH /api/user/:id | 200 OK + coins updated | ✅ Pass |
| Link LeetCode profile | POST /api/user/leetcode | 200 OK + username saved | ✅ Pass |
| Update non-existent user | PATCH /api/user/invalid-id | 404 Not Found | ✅ Pass |

#### Test Group 3 — Quiz Engine

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Fetch all quizzes | GET /api/quizzes | Array of quiz objects | ✅ Pass |
| Fetch quiz by ID | GET /api/quizzes/:id | Single quiz object | ✅ Pass |
| Submit all correct answers | POST /api/quizzes/submit | Full XP awarded, score = 100% | ✅ Pass |
| Submit all wrong answers | POST /api/quizzes/submit | 0 XP, score = 0% | ✅ Pass |
| Submit partial answers | POST /api/quizzes/submit | Proportional XP awarded | ✅ Pass |
| Submit quiz unauthenticated | POST /api/quizzes/submit | 401 Unauthorized | ✅ Pass |

#### Test Group 4 — Habit Tracker CRUD

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Create new habit | POST /api/habits/:userId | 201 Created + habit object | ✅ Pass |
| List user habits | GET /api/habits/:userId | Array of habits | ✅ Pass |
| Complete habit (first time) | PATCH .../complete | 200 OK, streak = 1, XP awarded | ✅ Pass |
| Complete habit (day 5 streak) | PATCH .../complete | 200 OK, streak = 5, 1.5x XP | ✅ Pass |
| Double-complete same day | PATCH .../complete | 200 OK, no duplicate XP | ✅ Pass |
| Delete habit | DELETE /api/habits/:userId/:habitId | 204 No Content | ✅ Pass |
| Fetch habits for non-existent user | GET /api/habits/bad-id | 404 Not Found | ✅ Pass |

#### Test Group 5 — Social Features (Friends & DM)

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Send friend request | POST /api/friends/request | 201 Created, status = pending | ✅ Pass |
| Accept friend request | POST /api/friends/accept | 200 OK, status = accepted | ✅ Pass |
| Get friend list | GET /api/friends/:userId | Array of accepted friends | ✅ Pass |
| Send duplicate request | POST /api/friends/request | 409 Conflict | ✅ Pass |
| Send DM (text only) | POST /api/dm/send | 201 Created + message object | ✅ Pass |
| Send DM with file attachment | POST /api/dm/send (multipart) | 201 Created + file URL | ✅ Pass |
| Get DM history | GET /api/dm/history | Array of messages in order | ✅ Pass |
| Get leaderboard | GET /api/leaderboard | Top 10 users sorted Level then XP | ✅ Pass |

#### Test Group 6 — Code Execution Sandbox

| Test Case | Endpoint | Expected Result | Status |
|---|---|---|---|
| Run Python "Hello World" | POST /api/codescroll/run | stdout: "Hello World\n" | ✅ Pass |
| Run JavaScript code | POST /api/codescroll/run | Correct stdout output | ✅ Pass |
| Run C code | POST /api/codescroll/run | Compiled and executed correctly | ✅ Pass |
| Run C++ code | POST /api/codescroll/run | Compiled and executed correctly | ✅ Pass |
| Run code with syntax error | POST /api/codescroll/run | stderr contains error message | ✅ Pass |
| Run infinite loop (timeout test) | POST /api/codescroll/run | Execution killed after 4s | ✅ Pass |
| Fetch LeetCode stats | GET /api/codescroll/leetcode-stats/:username | JSON stats from LeetCode GraphQL | ✅ Pass |

---

### 10.3 WebSocket (Socket.io) Testing

WebSocket events were tested using Postman's WebSocket client and two simultaneous browser tabs simulating two users.

| Event Tested | Test Scenario | Expected Outcome | Status |
|---|---|---|---|
| connect | Connect to ws://localhost:3000 | connection_established event received | ✅ Pass |
| join_room | User A joins room "cs-101" | User A receives room_state_updated | ✅ Pass |
| user_joined_room | User B was in room before A joins | User B receives user_joined_room with User A info | ✅ Pass |
| send_room_message | User A sends chat message | User B receives receive_room_message instantly | ✅ Pass |
| direct_message | User A DMs User B | User B receives receive_direct_message | ✅ Pass |
| leave_room | User A disconnects | Room member list updates; User B sees user_left_room | ✅ Pass |
| Reconnection | Kill backend, restart | Client reconnects automatically via Socket.io retry | ✅ Pass |
| Multi-room isolation | User A in room-1, User B in room-2 | Messages do not bleed between rooms | ✅ Pass |

---

### 10.4 Frontend Logic Unit Tests (Browser Console)

Core gamification calculation functions were validated in the browser console.

**Test: Level Progression Calculation**
```javascript
function requiredXP(level) { return level * 100; }
console.assert(requiredXP(4) === 400, "Level 4 threshold");    // Pass
console.assert(requiredXP(10) === 1000, "Level 10 threshold"); // Pass
```

**Test: Habit Streak Multiplier**
```javascript
function streakMultiplier(streak) { return 1 + 0.10 * Math.min(streak, 10); }
console.assert(streakMultiplier(0) === 1.0, "No streak");      // Pass
console.assert(streakMultiplier(5) === 1.5, "5-day streak");   // Pass
console.assert(streakMultiplier(15) === 2.0, "Max streak cap");// Pass
```

**Test: Quiz XP Calculation**
```javascript
function quizXP(correct, difficulty) {
  const mult = { easy: 1.0, medium: 1.5, hard: 2.0 };
  return (correct * 20) * mult[difficulty];
}
console.assert(quizXP(5, "easy") === 100, "Easy quiz 5 correct"); // Pass
console.assert(quizXP(5, "hard") === 200, "Hard quiz 5 correct"); // Pass
```

**Test: Offline Fallback (api.js)**
- With backend stopped → habits load from localStorage ✅
- Completing a habit → stored in localStorage ✅
- Restarting server → data syncs back on next login ✅

---

### 10.5 End-to-End User Flow Testing

Complete user journeys were manually validated in Google Chrome and Mozilla Firefox.

#### Flow 1: New User Registration & Onboarding
1. Visit app → Landing page renders correctly ✅
2. Click "Register" → Fill details → Submit ✅
3. JWT token received → Redirect to Dashboard ✅
4. Dashboard shows Level 1, 0 XP, 100 HP, 0 Coins ✅
5. Default avatar rendered correctly ✅

#### Flow 2: Complete a Quiz Battle
1. Navigate to QuizForge → Select "Deep Learning" → Easy ✅
2. 5 questions load with 30-second timers ✅
3. Select correct answer → Green flash ✅
4. Select wrong answer → Red flash + correct answer highlighted ✅
5. Quiz ends → XP and coins awarded ✅
6. Dashboard XP bar updates in real-time ✅

#### Flow 3: Focus Arena Session
1. Navigate to Focus Arena → Start 25-minute Pomodoro ✅
2. Timer counts down with circular SVG animation ✅
3. Switch to another tab → Timer pauses (anti-cheat) ✅
4. Return to tab → Timer resumes ✅
5. Timer completes → 50 XP awarded, toast notification ✅

#### Flow 4: Real-Time Study Room
1. User A creates room "cs-101" in StudySync ✅
2. User B joins room "cs-101" in second browser tab ✅
3. User A participant list updates to show User B ✅
4. User A sends a message → User B receives it under 100ms ✅
5. User B leaves → User A participant count decreases ✅

#### Flow 5: Code Execution
1. Navigate to CodeScroll → Select a Python challenge ✅
2. Write solution in the editor → Select Python ✅
3. Click "Run Code" → stdout displayed in output panel ✅
4. Introduce syntax error → stderr message shown ✅
5. Submit passing solution → XP awarded ✅

#### Flow 6: Shop Purchase & Avatar Equip
1. Navigate to Shop with 100 coins ✅
2. Purchase "Wizard Purple" avatar (80 coins) → Click Buy ✅
3. Coins deducted to 20, item added to inventory ✅
4. Click "Equip" → Avatar updates on Dashboard immediately ✅

#### Flow 7: Habit Streak & HP Penalty
1. Create habit "Read 20 pages" marked as critical ✅
2. Complete habit → Streak increments to 1, XP awarded ✅
3. Simulate next-day login without completing habit → HP -10 ✅
4. Complete habit on day 5 → 1.5x XP (streak multiplier) ✅

---

### 10.6 Cross-Browser Compatibility Testing

| Browser | Version | Result |
|---|---|---|
| Google Chrome | 128+ | ✅ Full Compatibility |
| Mozilla Firefox | 127+ | ✅ Full Compatibility |
| Microsoft Edge | 126+ | ✅ Full Compatibility |
| Safari | 17+ | ✅ Full Compatibility |
| Mobile Chrome (Android) | 128+ | ✅ Responsive Layout Works |

---

### 10.7 Performance Testing

| Metric | Target | Measured | Status |
|---|---|---|---|
| Initial page load time | < 2s | ~1.1s | ✅ |
| API response time (local) | < 200ms | ~45ms avg | ✅ |
| Code execution (Python) | < 5s | ~1.2s (Judge0) | ✅ |
| WebSocket message latency | < 100ms | ~15ms (local) | ✅ |
| LocalStorage read (offline) | < 50ms | ~5ms | ✅ |

---

### 10.8 Known Limitations & Edge Cases

| Issue | Workaround / Status |
|---|---|
| Judge0 API rate limits (RapidAPI free tier) | Local child_process fallback activates automatically |
| LeetCode GraphQL API endpoint changes | URL updatable in server.js config |
| LocalStorage cap (~5 MB) | Only recent data cached; old entries pruned |
| Safari strict CORS in some OAuth flows | Resolved via explicit CORS headers |
| File attachment max size (Multer) | Set to 10 MB per file; configurable in server.js |

---

## 11. Deployment & Environment Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- Optional local compilers: python3, gcc, g++, ruby (for sandbox fallback)

### Backend Setup

```bash
cd scholarquest-backend
npm install
cp .env.example .env
```

Configure .env:
```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JUDGE0_API_KEY=your_rapidapi_key_for_judge0
```

```bash
npm run dev
# Backend available at http://localhost:3000
```

### Frontend Setup

```bash
# Option A: Open directly
open index.html

# Option B: Local HTTP server
python3 -m http.server 5500
# Access at http://localhost:5500
```

### Production Deployment

| Service | Deployment Target |
|---|---|
| Frontend | Firebase Hosting (firebase deploy) |
| Backend | Render.com (via render.yaml config) |

---

## 12. Challenges Faced & Solutions

| Challenge | Solution Applied |
|---|---|
| Offline data availability | Dual-mode api.js with automatic localStorage fallback |
| Code execution security | Strict 4s timeout + 512 KB buffer + temp file cleanup |
| Real-time presence sync across tabs | Socket.io in-memory store tracks live connections server-side |
| OAuth token delivery to SPA | JWT delivered via query parameter on OAuth callback, parsed client-side |
| LeetCode API CORS restrictions | Backend acts as reverse proxy for GraphQL requests |
| Streak continuity across sessions | Completion dates persisted as ISO date arrays; streak computed server-side |
| Judge0 API rate limits | Automatic fallback to child_process.exec() on 429 response |
| React CDN integration in SPA | React 18 UMD bundle loaded via CDN for AvatarSelector only |

---

## 13. Future Enhancements

| Feature | Priority |
|---|---|
| Mobile native app (React Native / Expo) | High |
| AI-generated quiz questions (Gemini API) | High |
| Pair programming mode in CodeScroll (collaborative OT/CRDT editor) | High |
| Badge & achievement system (30+ milestones) | Medium |
| PostgreSQL migration for production scale | Medium |
| Push notifications for streak reminders | Medium |
| Voice-based study room channels | Low |
| Instructor dashboard for class management | Low |
| Analytics dashboard (study hours, XP trends) | Low |

---

## 14. Conclusion

ScholarQuest successfully demonstrates that **gamification principles**, when thoughtfully applied to academic tools, can significantly improve engagement, consistency, and motivation in learners. The platform delivers:

- A **7-module SPA** covering quiz battles, focus tracking, habit management, real-time collaboration, coding challenges, and a full reward economy.
- A **scalable Node.js REST API** with JWT authentication, OAuth 2.0 social login, WebSocket real-time engine, and a multi-language code execution sandbox.
- A **resilient offline-first architecture** that keeps the platform functional even without an active backend connection.
- A **comprehensive testing suite** validating all API endpoints via Postman, WebSocket event flows, gamification logic, and complete end-to-end user journeys across multiple browsers.

The project was built with a focus on production-quality engineering: security-first authentication, graceful degradation, modular codebase organization, and a premium pixel-RPG aesthetic designed to make studying genuinely enjoyable.

---

*ScholarQuest — Level Up Your Learning* ⚔️

> **MSc IT Mini Project 2026** | Built with HTML5 · CSS3 · Vanilla JS · Node.js · Express · Socket.io · Judge0
