# ⚔️ ScholarQuest: Gamified Learning & Study Management Platform
**Master of Science in Information Technology (MSc IT) Project Report**  
*Academic Year 2025–2026*

---

## 📋 Executive Abstract

**ScholarQuest** is an innovative, full-stack gamified learning and study management web application designed to transform traditional academic productivity into an immersive Role-Playing Game (RPG) experience. Students often struggle with motivation, study consistency, and burnout when preparing for technical coursework and software development challenges. 

ScholarQuest addresses this problem by integrating core study utilities—such as interactive battle quizzes (**QuizForge**), RPG Pomodoro focus timers with ambient audio (**Focus Arena**), daily study habit tracking (**HabitDojo**), real-time collaborative study rooms (**StudySync**), and an interactive code compiler (**CodeScroll**)—into a unified gamified ecosystem. 

As students complete study tasks and quizzes, they earn Experience Points (XP), Level upgrades, and Gold coins, allowing them to unlock new pixel-art hero avatar classes (ranging from *The Scholar* to *Grand Archmage*) and customize their learning journey. Built with a responsive, high-performance web architecture (Vanilla JS/CSS3 Glassmorphic UI with React components and a Node.js/Express REST API backend), ScholarQuest features robust dual-identifier authentication (Email or Username), password recovery, social OAuth integration (Google, GitHub, LeetCode), and resilient offline session fallbacks.

---

## 🚀 System Modules & Functionalities

| # | Module Name | Core Functionality & Features |
|---|---|---|
| 1 | **Authentication & Identity Launcher** | • Dual-identifier login (accepts both **Email Address** and **Username**).<br>• Account registration with hashed passwords (`bcryptjs`).<br>• 6-digit OTP password recovery workflow.<br>• Social SSO authentication integration (Google 🌐, GitHub 🐙, LeetCode ⚔️).<br>• Guest Preview Mode & persistent JWT session management with offline fallback. |
| 2 | **Hero Avatar & Progression System** | • **4 Base Selectable Classes**: *The Scholar*, *The Apprentice*, *The Builder*, *The Explorer*.<br>• **17 Unlockable Heroes**: Spanning Combat, Royalty, Gold, Habit, Focus, and StudySync tiers.<br>• Individual solo standing character sprite cropping.<br>• Live real-time synchronization across Top Header, Hero Showcase Banner, and Sidebar Widget. |
| 3 | **QuizForge (Battle Quizzes)** | • Gamified timed quiz battles across Data Structures, Algorithms, and MSc IT subjects.<br>• Real-time score calculation, XP gains, and Gold coin rewards for correct answers. |
| 4 | **Focus Arena (RPG Pomodoro Timer)** | • Customizable focus timer (25m / 50m / 90m sessions).<br>• Integrated ambient soundscapes (*Lofi Realm*, *Rain & Thunder*, *Tavern Hearth*, *Medieval Library*).<br>• Focus streak multipliers and automatic XP/HP reward allocation upon session completion. |
| 5 | **HabitDojo (Habit Multiplier)** | • Daily study habit tracking with difficulty tiers (*Easy*, *Medium*, *Hard*).<br>• Consecutive habit streak tracking and multiplier calculation. |
| 6 | **StudySync (Collaborative Study)** | • Virtual study rooms and real-time scholar chat.<br>• Peer status indicators and active room connection metrics. |
| 7 | **CodeScroll (Interactive Compiler)** | • In-browser live code execution environment and syntax-highlighted editor.<br>• Interactive programming exercises and compiler feedback. |
| 8 | **Shop & Inventory System** | • In-game RPG marketplace to purchase unlockable hero classes and visual themes (*Gold*, *Emerald*, *Cyber*, *Obsidian*).<br>• Inventory item tracking and badge management using earned Gold coins. |

---

## 💻 Hardware & Software Requirements

### 1. Hardware Specification
- **Processor**: Intel Core i5 / Apple M-Series (M1/M2/M3) or equivalent 64-bit Dual/Quad-Core CPU.
- **Memory (RAM)**: 8 GB RAM (16 GB recommended for concurrent backend server execution).
- **Storage**: 500 MB minimum available disk space for codebase, dependencies, and media assets.
- **Display Resolution**: 1920×1080 (Full HD) or 1440×900 desktop screen resolution.
- **Peripherals**: Standard Keyboard, Mouse/Trackpad, and Audio output device (for Focus Arena ambient soundscapes).

### 2. Software & Technology Stack
- **Frontend Architecture**:
  - **Markup & Styling**: HTML5, Vanilla CSS3 with custom Glassmorphism & Dark Gold Design System (`Outfit` & `JetBrains Mono` Google Fonts).
  - **Logic & Execution**: Vanilla JavaScript (ES6+ Modules), Standalone React.js & ReactDOM (CDN-mounted for Avatar & Hero components).
  - **Icons & Assets**: Lucide Icons, Pixel-Art Character Spritesheets.
- **Backend & API Architecture**:
  - **Runtime**: Node.js (v18.x or higher).
  - **Framework**: Express.js (v4.x REST API Server running on port `5000`).
  - **Security & Auth**: `bcryptjs` for salted password hashing, `jsonwebtoken` for signed JWT token issuance.
  - **Middleware**: `cors` for cross-origin security, custom JSON database layer (`readDB`/`writeDB`) with Mongoose/MongoDB readiness.
- **Development Tooling**:
  - **OS**: macOS / Linux / Windows.
  - **Version Control**: Git & GitHub Repository Hosting (`scholarquest-frontend`, `scholarquest-backend`).
  - **Web Server**: `http-server` / Live Server running locally on port `5500`.

---

## 📊 System Architecture & UML Diagrams

### 1. System High-Level Architecture Diagram
```mermaid
graph TD
    User([🎓 Student / Scholar User]) -->|HTTP Requests / Port 5500| Client[🖥️ ScholarQuest Web App]
    
    subgraph Frontend Layer
        Client --> AuthView[🔐 Auth & Launcher View]
        Client --> DashView[⚔️ Dashboard View]
        Client --> QuizModule[🎯 QuizForge Engine]
        Client --> FocusModule[⏳ Focus Arena Engine]
        Client --> HabitModule[🛡️ HabitDojo Engine]
        Client --> SyncModule[🌐 StudySync Engine]
        Client --> CodeModule[📜 CodeScroll Engine]
        Client --> ReactAvatar[🧙‍♂️ React Avatar Selector]
    end

    subgraph State & Local Storage
        Client <-->|Persist State| LocalStore[(💾 LocalStorage / Local DB)]
    end

    subgraph Backend API Layer
        Client <-->|JSON REST API / Port 5000| Server[⚙️ Express.js Backend API Server]
        Server <--> AuthRoute[🔐 Auth Controller /api/auth]
        Server <--> ProgressRoute[📈 Progress Controller /api/progress]
        AuthRoute <--> HashEngine[🔑 bcryptjs & JWT Engine]
        Server <--> JSONDB[(📂 DB Layer / users.json & progress.json)]
    end
```

---

### 2. User Authentication & Session Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    actor User as Scholar User
    participant FE as ScholarQuest Frontend (Port 5500)
    participant BE as Express API Server (Port 5000)
    participant DB as DB Layer (users.json)

    User->>FE: Enter Email/Username & Password
    FE->>BE: POST /api/auth/login { identifier, password }
    alt Backend Online
        BE->>DB: Search user by Email OR Username
        DB-->>BE: User Record found (with passwordHash)
        BE->>BE: Compare password with bcryptjs.compare()
        alt Valid Credentials
            BE-->>FE: HTTP 200 OK + JWT Token + User Object
            FE->>FE: Store Token & Sync State in LocalStorage
            FE-->>User: Navigate to Dashboard & Mount Active Hero
        else Invalid Credentials
            BE-->>FE: HTTP 401 Unauthorized { error }
            FE-->>User: Display Error Banner
        end
    else Server Offline / Fallback
        FE->>FE: Create Local Scholar Session
        FE->>FE: Store Mock Token & Local User State
        FE-->>User: Navigate to Dashboard in Offline Mode
    end
```

---

### 3. Core Class & State Entity Diagram
```mermaid
classDiagram
    class ScholarUser {
        +String id
        +String username
        +String email
        +String passwordHash
        +Number level
        +Number xp
        +Number coins
        +Number hp
        +Number maxHp
        +AvatarConfig avatar
        +UserStats stats
        +register()
        +login()
    }

    class AvatarConfig {
        +String id
        +String heroClass
        +String pack
        +String sprite
        +equipHero()
    }

    class UserStats {
        +Number quizzesCompleted
        +Number focusMinutes
        +Number lessonsCompleted
        +Number maxHabitStreak
    }

    class QuizSession {
        +String quizId
        +String title
        +Array questions
        +Number score
        +calculateRewards()
    }

    class FocusSession {
        +Number durationMinutes
        +String ambientSound
        +Boolean isRunning
        +awardXPAndGold()
    }

    ScholarUser "1" *-- "1" AvatarConfig : equips
    ScholarUser "1" *-- "1" UserStats : tracks
    ScholarUser "1" --o "*" QuizSession : attempts
    ScholarUser "1" --o "*" FocusSession : completes
```

---

### 4. User Journey & State Transition Use Case Diagram
```mermaid
stateDiagram-v2
    [*] --> LoginScreen : Launch Application
    
    state LoginScreen {
        [*] --> EnterCredentials
        EnterCredentials --> Authenticating : Submit Login
        Authenticating --> AccessGranted : Valid Auth / Guest
        Authenticating --> EnterCredentials : Auth Error
    }

    AccessGranted --> DashboardView : Mount Main Workspace

    state DashboardView {
        [*] --> ViewHeroShowcase
        ViewHeroShowcase --> SelectHeroAvatar : Click "Choose Your Hero"
        SelectHeroAvatar --> ViewHeroShowcase : Update Active Sprite
    }

    DashboardView --> QuizForge : Battle Quizzes
    DashboardView --> FocusArena : Start RPG Pomodoro
    DashboardView --> HabitDojo : Log Daily Habit
    DashboardView --> StudySync : Join Study Room
    DashboardView --> CodeScroll : Open Code Compiler
    DashboardView --> ShopModule : Spend Gold Coins

    QuizForge --> DashboardView : Gain +50 XP & +20 Gold
    FocusArena --> DashboardView : Gain +40 XP & Focus Mins
    HabitDojo --> DashboardView : Increment Streak Multiplier
    ShopModule --> DashboardView : Unlock New Hero Class
```

---

## 📌 Conclusion

**ScholarQuest** successfully demonstrates the integration of gamification theory with modern web engineering. By leveraging a responsive modular architecture, robust dual-identifier authentication, offline fallback resilience, and an engaging RPG progression model, the platform provides an effective, high-yield study tool tailored for MSc IT students and software learners.
