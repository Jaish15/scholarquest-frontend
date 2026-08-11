/* ==========================================
   ScholarQuest Core Engine & State Manager
   ========================================== */

import { initAvatar, updateAvatarRender } from './modules/avatar.js';
import { initQuizzes } from './modules/quiz.js';
import { initFocus } from './modules/focus.js';
import { initHabits } from './modules/habits.js';
import { initStudySync } from './modules/studysync.js';
import { initCodeScroll } from './modules/codescroll.js';
import { initShop, updateShopAndInventoryUI } from './modules/shop.js';
import api, { auth } from './api.js';


// Default State Configuration
const DEFAULT_STATE = {
  level: 1,
  xp: 0,
  coins: 150,
  hp: 100,
  maxHp: 100,
  avatar: {
    skin: '#fbcfe8',
    eyes: 'happy',
    clothes: '#8b5cf6',
    accessory: 'none'
  },
  inventory: ['basic_book'], // ids of items purchased
  equipped: {
    head: 'none',
    hand: 'none'
  },
  stats: {
    quizzesCompleted: 0,
    focusMinutes: 0,
    lessonsCompleted: 0,
    maxHabitStreak: 0
  },
  activeTheme: 'gold',
  habits: [
    { id: '1', name: 'Solve 1 DSA Problem', difficulty: 'medium', streak: 2, lastCompleted: '' },
    { id: '2', name: 'Attend Lecture / Study 1 hour', difficulty: 'easy', streak: 1, lastCompleted: '' },
    { id: '3', name: 'Write code in Python / JS', difficulty: 'hard', streak: 0, lastCompleted: '' }
  ]
};

// Global State
export let state = { ...DEFAULT_STATE };

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  window.saveState = saveState;
  window.updateUI = updateUI;
  initNavigation();
  initCore();
  initAuth();

  // Initialize Subsystems
  initAvatar();
  initQuizzes();
  initFocus();
  initHabits();
  initStudySync();
  initCodeScroll();
  initShop();

  // Run Lucide Icons replacement
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initial renders
  updateUI();
  generateDailyQuests();
  fetchDashboardLeaderboard();
});

// Load state (from backend API if logged in, with localStorage fallback)
async function loadState() {
  let loadedState = null;
  if (auth.isLoggedIn()) {
    loadedState = await api.loadState();
  }

  if (!loadedState) {
    const saved = localStorage.getItem('scholarquest_state');
    if (saved) {
      try {
        loadedState = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse save state, loading default.', e);
      }
    }
  }

  if (loadedState) {
    state = {
      ...DEFAULT_STATE,
      ...loadedState,
      stats: { ...DEFAULT_STATE.stats, ...loadedState.stats },
      avatar: { ...DEFAULT_STATE.avatar, ...loadedState.avatar },
      equipped: { ...DEFAULT_STATE.equipped, ...loadedState.equipped },
      inventory: loadedState.inventory || DEFAULT_STATE.inventory,
      habits: loadedState.habits || DEFAULT_STATE.habits
    };
  } else {
    state = { ...DEFAULT_STATE };
  }
}

// Save state (saves locally and syncs to backend if logged in)
export function saveState() {
  localStorage.setItem('scholarquest_state', JSON.stringify(state));
  if (auth.isLoggedIn()) {
    api.saveState(state);
  }
}


// Navigation Logic (Tab switching)
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.content-view');

  function navigateTo(target) {
    // Update sidebar nav active state
    navItems.forEach(nav => {
      if (nav.getAttribute('data-target') === target) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });

    // Update central pane views
    views.forEach(view => {
      if (view.getAttribute('id') === `view-${target}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Specific tab update triggers
    if (target === 'shop') {
      updateShopAndInventoryUI();
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // Attach data-nav buttons (Dashboard hero action buttons & module cards)
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      navigateTo(target);
    });
  });
}

// Fetch Live Leaderboard for Dashboard Preview Card
async function fetchDashboardLeaderboard() {
  const container = document.getElementById('dashboard-leaderboard');
  if (!container) return;

  const res = await api.getLeaderboard();
  if (res.ok && res.data && res.data.leaderboard) {
    const list = res.data.leaderboard;
    if (list.length === 0) {
      container.innerHTML = `<div class="leaderboard-loading text-sub">No scholars on leaderboard yet. Be the first!</div>`;
      return;
    }

    container.innerHTML = list.slice(0, 5).map((item, idx) => {
      const medalClass = idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : 'normal';
      const medalIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
      return `
        <div class="lb-rank-item">
          <div class="lb-rank-left">
            <div class="lb-medal ${medalClass}">${medalIcon}</div>
            <div class="lb-username">${item.username || 'Scholar'}</div>
          </div>
          <div class="lb-badge-lvl">LV ${item.level || 1} • ${item.xp || 0} XP</div>
        </div>
      `;
    }).join('');
  } else {
    container.innerHTML = `<div class="leaderboard-loading text-sub">Connect server to view global rank</div>`;
  }
}


// Core setup (Reset functions etc.)
function initCore() {
  const btn = document.getElementById('btn-random-colors');
  if (btn) {
    btn.addEventListener('click', randomizeAvatarColors);
  }
}

// XP progression threshold calculation
export function getXPForNextLevel(lvl) {
  return lvl * 100;
}

// Add XP and handle Level Up triggers
export function addXP(amount) {
  state.xp += amount;
  const xpNeeded = getXPForNextLevel(state.level);

  if (state.xp >= xpNeeded) {
    state.xp -= xpNeeded;
    state.level += 1;
    triggerLevelUpEffects();
  }

  saveState();
  updateUI();
}

// Add Coins
export function addCoins(amount) {
  state.coins += amount;
  saveState();
  updateUI();
}

// Subtract HP and handle Fainting
export function takeDamage(amount) {
  state.hp -= amount;
  if (state.hp <= 0) {
    state.hp = 0;
    triggerFaintEffects();
  }
  saveState();
  updateUI();
}

// Restore HP (heal)
export function heal(amount) {
  state.hp = Math.min(state.hp + amount, state.maxHp);
  saveState();
  updateUI();
}

// Change Active App Colors Theme
export function changeTheme(themeName) {
  const body = document.body;
  body.className = `theme-${themeName} dark-mode`;
  state.activeTheme = themeName;
  saveState();
}

// Randomize Avatar Color selections
function randomizeAvatarColors() {
  const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#fca5a5', '#93c5fd', '#c084fc', '#fb7185'];
  const eyesStyles = ['happy', 'cool', 'focus', 'nerd', 'sparkle'];

  state.avatar.skin = colors[Math.floor(Math.random() * colors.length)];
  state.avatar.clothes = colors[Math.floor(Math.random() * colors.length)];
  state.avatar.eyes = eyesStyles[Math.floor(Math.random() * eyesStyles.length)];

  saveState();
  updateAvatarRender();
}

// Level Up Event Banner
function triggerLevelUpEffects() {
  // Simple in-app notification / alert
  const originalGreeting = document.getElementById('greeting').innerText;
  const greetingEl = document.getElementById('greeting');
  const subGreetingEl = document.getElementById('sub-greeting');

  greetingEl.innerHTML = `🎉 LEVEL UP! Level ${state.level}! 🎉`;
  subGreetingEl.innerHTML = `You have advanced to rank: <strong>${getRankTitle(state.level)}</strong>!`;
  greetingEl.classList.add('text-gold');

  // Fire animation classes
  const badge = document.getElementById('level-badge');
  badge.classList.add('animate-bounce');

  setTimeout(() => {
    greetingEl.innerText = `Welcome, Scholar!`;
    greetingEl.classList.remove('text-gold');
    subGreetingEl.innerText = `Your quest awaits. Ready to earn some XP?`;
    badge.classList.remove('animate-bounce');
  }, 5000);
}

// User Fainting System
function triggerFaintEffects() {
  alert('💀 Oh no! You took lethal damage and fainted. You lost 50% of your coins, and your HP has been restored to 100.');
  state.coins = Math.floor(state.coins / 2);
  state.hp = 100;
  saveState();
  updateUI();
}

// Get RPG Titles based on User Level
export function getRankTitle(lvl) {
  if (lvl >= 25) return 'Legend';
  if (lvl >= 18) return 'Architect';
  if (lvl >= 12) return 'Developer';
  if (lvl >= 7) return 'Coder';
  if (lvl >= 3) return 'Apprentice';
  return 'Peasant';
}

// Generate random Daily Quests
function generateDailyQuests() {
  const quests = [
    { name: 'Complete 1 Focus Session', reward: 30, coins: 15, completed: state.stats.focusMinutes > 0 },
    { name: 'Conquer a QuizForge battle', reward: 40, coins: 20, completed: state.stats.quizzesCompleted > 0 },
    { name: 'Solve a CodeScroll challenge', reward: 50, coins: 25, completed: state.stats.lessonsCompleted > 0 },
    { name: 'Check off a HabitDojo habit', reward: 25, coins: 10, completed: false } // custom checked via habits
  ];

  const container = document.getElementById('dashboard-quests');
  if (!container) return;
  container.innerHTML = '';

  quests.forEach(q => {
    const el = document.createElement('div');
    el.className = 'quest-item';
    el.innerHTML = `
      <div class="quest-info">
        <span class="quest-name">${q.name}</span>
        <span class="quest-reward">+${q.reward} XP / +${q.coins} Coins</span>
      </div>
      <div>
        ${q.completed ? '<span class="quest-status">Completed</span>' : '<span class="text-muted text-sm">Active</span>'}
      </div>
    `;
    container.appendChild(el);
  });
}

// Global UI Updater
export function updateUI() {
  // Update greeting
  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    const name = state.username || localStorage.getItem('sq_username') || 'Scholar';
    greetingEl.innerText = `Welcome, ${name}!`;
  }

  // Update header indicators
  document.getElementById('coin-count').innerText = state.coins;
  document.getElementById('level-badge').innerText = `LV ${state.level}`;


  // Update XP Fill & Circular Ring Gauge
  const xpNeeded = getXPForNextLevel(state.level);
  const xpPct = Math.min((state.xp / xpNeeded) * 100, 100);
  const xpFillEl = document.getElementById('xp-fill');
  if (xpFillEl) xpFillEl.style.width = `${xpPct}%`;
  const xpTextEl = document.getElementById('xp-text');
  if (xpTextEl) xpTextEl.innerText = `${state.xp}/${xpNeeded} XP`;

  // Update Radial Gauge Ring
  const xpRingEl = document.getElementById('dash-xp-ring');
  if (xpRingEl) {
    const circumference = 251.2;
    const offset = circumference - (circumference * (state.xp / xpNeeded));
    xpRingEl.style.strokeDashoffset = offset;
  }
  const ringLvlEl = document.getElementById('dash-ring-level');
  if (ringLvlEl) ringLvlEl.innerText = `LV ${state.level}`;
  const ringXpEl = document.getElementById('dash-ring-xp');
  if (ringXpEl) ringXpEl.innerText = `${state.xp}/${xpNeeded} XP`;

  // Update HP Fill
  const hpPct = (state.hp / state.maxHp) * 100;
  const hpFillEl = document.getElementById('hp-fill');
  if (hpFillEl) hpFillEl.style.width = `${hpPct}%`;
  const hpTextEl = document.getElementById('hp-text');
  if (hpTextEl) hpTextEl.innerText = `${state.hp}/${state.maxHp} HP`;

  // Update rank title on dashboard
  const classTitle = document.getElementById('class-title');
  if (classTitle) {
    classTitle.innerText = getRankTitle(state.level);
  }

  // Update Stats Box
  const sq = document.getElementById('stat-quizzes-completed');
  if (sq) sq.innerText = state.stats.quizzesCompleted;

  const sf = document.getElementById('stat-focus-time');
  if (sf) sf.innerText = `${state.stats.focusMinutes}m`;

  const sl = document.getElementById('stat-lessons-completed');
  if (sl) sl.innerText = state.stats.lessonsCompleted;

  const sh = document.getElementById('stat-habits-streak');
  if (sh) sh.innerText = state.stats.maxHabitStreak;

  const dqs = document.getElementById('dash-quick-streak');
  if (dqs) dqs.innerText = state.stats.maxHabitStreak;

  const dqc = document.getElementById('dash-quick-coins');
  if (dqc) dqc.innerText = state.coins;


  // Apply visual theme
  if (state.activeTheme) {
    document.body.className = `theme-${state.activeTheme} dark-mode`;
  }

  // Update Shop Display values
  const sc = document.getElementById('shop-coin-count');
  if (sc) sc.innerText = state.coins;

  // Redraw avatar
  updateAvatarRender();

  // Sync avatar across sidebar, showcase banner, and module chips
  syncAvatarDisplay();

  // Expose state and notify React
  window.state = state;
  if (typeof window.onStateUpdate === 'function') {
    window.onStateUpdate(state);
  }
}

// ── AVATAR DISPLAY SYNC ────────────────────────────────────────────────────
// Sprite data for the 4 base heroes + shop heroes (matching index.html data)
const HERO_DISPLAY_DATA = {
  peasant: { name: 'The Scholar', tagline: 'Diligent & Focused', sprite: './assets/heroes/scholar.png', isChibi: true },
  villager_woman: { name: 'The Apprentice', tagline: 'Creative & Curious', sprite: './assets/heroes/apprentice.png', isChibi: true },
  worker: { name: 'The Peasant', tagline: 'Steady & Reliable', sprite: './assets/heroes/peasant.png', isChibi: true },
  gatherer: { name: 'The Explorer', tagline: 'Adaptive & Bold', sprite: './assets/heroes/explorer.png', isChibi: true },
  shield_man: { name: 'Guardian Knight', tagline: 'Defenders of Focus', sprite: './assets/heroes/knight.png', isChibi: true },
  prince: { name: 'Royal Highness', tagline: 'Majestic & Noble', sprite: './assets/heroes/royal.png', isChibi: true },
  harry_potter: { name: 'Harry Potter', tagline: 'Gryffindor Scholar Wizard', sprite: './assets/heroes/harry_potter.png', isChibi: true },
  draco_malfoy: { name: 'Draco Malfoy', tagline: 'Slytherin Noble Wizard', sprite: './assets/heroes/draco_malfoy.png', isChibi: true }
};

const FRAME_SIZE_JS = { villagers: 48, villagers2: 48, humans: 64 };

function makeSpriteStyle(hero, displayPx) {
  if (hero.isChibi || (hero.sprite && hero.sprite.includes('/assets/heroes/'))) {
    return `
      width: ${displayPx}px !important;
      height: ${displayPx}px !important;
      background-image: url('${hero.sprite}') !important;
      background-repeat: no-repeat !important;
      background-position: center center !important;
      background-size: contain !important;
      image-rendering: auto !important;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4)) !important;
      flex-shrink: 0 !important;
      display: inline-block !important;
    `;
  }
  const frameW = FRAME_SIZE_JS[hero.pack] || 48;
  const scale = displayPx / frameW;
  return `
    width: ${displayPx}px;
    height: ${displayPx}px;
    background-image: url('${hero.sprite}');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: ${4 * frameW * scale}px auto;
    image-rendering: pixelated;
    overflow: hidden;
    flex-shrink: 0;
    display: block;
  `;
}

function syncAvatarDisplay() {
  const avatarId = (state.avatar && state.avatar.id) ? state.avatar.id : 'peasant';
  const hero = HERO_DISPLAY_DATA[avatarId] || HERO_DISPLAY_DATA['peasant'];
  const level = state.level || 1;

  // ── 1. SIDEBAR WIDGET ──────────────────────────────────────────
  const sidebarSprite = document.getElementById('sidebar-avatar-sprite');
  const sidebarName = document.getElementById('sidebar-avatar-name');
  const sidebarLevel = document.getElementById('sidebar-level-num');
  if (sidebarSprite) {
    sidebarSprite.style.cssText = makeSpriteStyle(hero, 32);
  }
  if (sidebarName) sidebarName.textContent = hero.name;
  if (sidebarLevel) sidebarLevel.textContent = level;

  // ── 2. DASHBOARD SHOWCASE BANNER ──────────────────────────────
  const showcaseSprite = document.getElementById('showcase-sprite');
  const showcaseName = document.getElementById('showcase-name');
  const showcaseTagline = document.getElementById('showcase-tagline');
  const showcaseLevel = document.getElementById('showcase-level');
  const showcaseLevelStat = document.getElementById('showcase-stat-level');
  const showcaseGold = document.getElementById('showcase-stat-gold');
  const showcaseStreak = document.getElementById('showcase-stat-streak');
  const showcaseFocus = document.getElementById('showcase-stat-focus');

  if (showcaseSprite) {
    showcaseSprite.style.cssText = makeSpriteStyle(hero, 96);
  }
  if (showcaseName) showcaseName.textContent = hero.name;
  if (showcaseTagline) showcaseTagline.textContent = hero.tagline;
  if (showcaseLevel) showcaseLevel.textContent = level;
  if (showcaseLevelStat) showcaseLevelStat.textContent = level;
  if (showcaseGold) showcaseGold.textContent = state.coins || 0;
  if (showcaseStreak) showcaseStreak.textContent = state.stats ? state.stats.maxHabitStreak : 0;
  if (showcaseFocus) showcaseFocus.textContent = state.stats ? state.stats.focusMinutes : 0;

  // ── 3. MODULE HERO CHIPS ──────────────────────────────────────
  const modules = ['quizforge', 'focusarena', 'habitdojo', 'studysync', 'codescroll', 'shop'];
  modules.forEach(mod => {
    const chipSprite = document.getElementById(`chip-sprite-${mod}`);
    const chipLevels = document.querySelectorAll(`#chip-${mod} .chip-level`);
    if (chipSprite) {
      chipSprite.style.cssText = makeSpriteStyle(hero, 24);
    }
    chipLevels.forEach(el => { el.textContent = level; });
  });

  // ── 4. SHOP VIEW FLOATING PODIUM STAGE ─────────────────────────
  const shopPodiumImg   = document.getElementById('shop-podium-img');
  const shopPodiumSprite = document.getElementById('shop-podium-sprite');
  const shopPodiumName   = document.getElementById('shop-podium-name');
  const shopPodiumClass  = document.getElementById('shop-podium-class');
  const slotOutfitName   = document.getElementById('slot-outfit-name');
  if (shopPodiumImg) {
    shopPodiumImg.src = hero.sprite;
  } else if (shopPodiumSprite) {
    shopPodiumSprite.style.backgroundImage = `url('${hero.sprite}')`;
  }
  if (shopPodiumName)  shopPodiumName.textContent  = hero.name;
  if (shopPodiumClass) shopPodiumClass.textContent = `Active ${hero.name}`;
  if (slotOutfitName)  slotOutfitName.textContent  = state.equipped && state.equipped.outfit ? state.equipped.outfit : 'Default';
}

// Export so it can be called externally
window.syncAvatarDisplay = syncAvatarDisplay;

/* ============================================================
   AUTHENTICATION MODULE CONTROLLER
   ============================================================ */
function initAuth() {
  // Main screen containers
  const loginScreen = document.getElementById('login-screen');
  const mainAppContainer = document.getElementById('main-app-container');

  // Modal elements
  const modal = document.getElementById('auth-modal');
  const btnOpenAuth = document.getElementById('btn-open-auth');
  const btnCloseAuth = document.getElementById('btn-close-auth');
  const authBtnLabel = document.getElementById('auth-btn-label');
  const alertModalEl = document.getElementById('auth-alert');

  // Dedicated Full-Screen Login Page elements
  const pgAlertEl = document.getElementById('pg-auth-alert');
  const pgTabLogin = document.getElementById('pg-tab-login');
  const pgTabRegister = document.getElementById('pg-tab-register');
  const pgTabForgot = document.getElementById('pg-tab-forgot');

  const pgFormLogin = document.getElementById('pg-form-login');
  const pgFormRegister = document.getElementById('pg-form-register');
  const pgContainerForgot = document.getElementById('pg-container-forgot');
  const pgFormForgot1 = document.getElementById('pg-form-forgot-step1');
  const pgFormForgot2 = document.getElementById('pg-form-forgot-step2');
  const pgDemoCodeBox = document.getElementById('pg-demo-code-box');
  const pgDemoCodeVal = document.getElementById('pg-demo-code-val');

  const pgGotoForgot = document.getElementById('pg-goto-forgot');
  const pgGotoLogin = document.getElementById('pg-goto-login');
  const btnEnterGuest = document.getElementById('btn-enter-guest');

  // Modal elements
  const tabLogin = document.getElementById('tab-auth-login');
  const tabRegister = document.getElementById('tab-auth-register');
  const tabForgot = document.getElementById('tab-auth-forgot');
  const formLogin = document.getElementById('form-auth-login');
  const formRegister = document.getElementById('form-auth-register');
  const containerForgot = document.getElementById('auth-forgot-container');
  const containerProfile = document.getElementById('auth-profile-container');
  const formForgot1 = document.getElementById('form-auth-forgot-step1');
  const formForgot2 = document.getElementById('form-auth-forgot-step2');
  const demoCodeBox = document.getElementById('demo-code-box');
  const demoCodeVal = document.getElementById('demo-code-val');
  const btnGotoForgot = document.getElementById('btn-goto-forgot');
  const btnGotoLogin = document.getElementById('btn-goto-login');
  const btnLogout = document.getElementById('btn-submit-logout');
  const btnSyncState = document.getElementById('btn-sync-state');

  // Screen Toggles
  function showAppScreen() {
    if (loginScreen) loginScreen.classList.add('hidden');
    if (mainAppContainer) mainAppContainer.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function showLoginScreen() {
    if (loginScreen) loginScreen.classList.remove('hidden');
    if (mainAppContainer) mainAppContainer.classList.add('hidden');
    if (modal) modal.classList.add('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  // 🚀 PAGE LOAD AUTHORIZATION CHECK
  if (auth.isLoggedIn()) {
    showAppScreen();
  } else {
    showLoginScreen();
  }

  // Helpers: Show Alert
  function showPgAlert(msg, type = 'error') {
    if (!pgAlertEl) return;
    pgAlertEl.className = `auth-alert ${type}`;
    pgAlertEl.innerText = msg;
    pgAlertEl.classList.remove('hidden');
  }

  function hidePgAlert() {
    if (!pgAlertEl) return;
    pgAlertEl.classList.add('hidden');
    pgAlertEl.innerText = '';
  }

  function showModalAlert(msg, type = 'error') {
    if (!alertModalEl) return;
    alertModalEl.className = `auth-alert ${type}`;
    alertModalEl.innerText = msg;
    alertModalEl.classList.remove('hidden');
  }

  function hideModalAlert() {
    if (!alertModalEl) return;
    alertModalEl.classList.add('hidden');
    alertModalEl.innerText = '';
  }

  // Update Top Header Pill
  function updateAuthHeaderBtn() {
    if (!btnOpenAuth || !authBtnLabel) return;
    if (auth.isLoggedIn()) {
      const username = state.username || localStorage.getItem('sq_username') || 'Scholar';
      authBtnLabel.innerText = username;
      btnOpenAuth.classList.add('logged-in');
    } else {
      authBtnLabel.innerText = 'Login';
      btnOpenAuth.classList.remove('logged-in');
    }
  }
  updateAuthHeaderBtn();
  window.updateAuthHeaderBtn = updateAuthHeaderBtn;

  // ── FULL-SCREEN PAGE TAB SWITCHER ─────────────────────────────────
  function switchPageTab(targetTab) {
    hidePgAlert();
    [pgTabLogin, pgTabRegister, pgTabForgot].forEach(tab => tab && tab.classList.remove('active'));

    pgFormLogin.classList.add('hidden');
    pgFormRegister.classList.add('hidden');
    pgContainerForgot.classList.add('hidden');

    if (targetTab === 'login') {
      pgTabLogin.classList.add('active');
      pgFormLogin.classList.remove('hidden');
    } else if (targetTab === 'register') {
      pgTabRegister.classList.add('active');
      pgFormRegister.classList.remove('hidden');
    } else if (targetTab === 'forgot') {
      pgTabForgot.classList.add('active');
      pgContainerForgot.classList.remove('hidden');
      pgFormForgot1.classList.remove('hidden');
      pgFormForgot2.classList.add('hidden');
      pgDemoCodeBox.classList.add('hidden');
    }
  }

  if (pgTabLogin) pgTabLogin.addEventListener('click', () => switchPageTab('login'));
  if (pgTabRegister) pgTabRegister.addEventListener('click', () => switchPageTab('register'));
  if (pgTabForgot) pgTabForgot.addEventListener('click', () => switchPageTab('forgot'));
  if (pgGotoForgot) pgGotoForgot.addEventListener('click', () => switchPageTab('forgot'));
  if (pgGotoLogin) pgGotoLogin.addEventListener('click', () => switchPageTab('login'));

  if (btnEnterGuest) {
    btnEnterGuest.addEventListener('click', () => {
      showAppScreen();
    });
  }

  // ── SOCIAL SSO OAUTH HANDLER (Google, GitHub, LeetCode) ─────────
  document.querySelectorAll('[data-sso]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const provider = btn.getAttribute('data-sso');
      showPgAlert(`Authenticating via ${provider}... ⚔️`, 'success');

      const res = await api.socialLogin(provider);
      if (res.ok) {
        if (res.data.user) {
          state.username = res.data.user.username;
          state.email = res.data.user.email;
          localStorage.setItem('sq_username', res.data.user.username);
          state = { ...state, ...res.data.user };
        }
        updateUI();
        updateAuthHeaderBtn();

        setTimeout(() => {
          hidePgAlert();
          showAppScreen();
        }, 600);
      }
    });
  });


  // ── PAGE FORM 1: LOGIN ────────────────────────────────────────────
  if (pgFormLogin) {
    pgFormLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      hidePgAlert();

      const email = document.getElementById('pg-login-email').value.trim();
      const password = document.getElementById('pg-login-password').value;
      const btnSubmit = document.getElementById('pg-btn-login');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Authenticating... ⚔️';

      const res = await api.login(email, password);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Authenticate & Enter Realm ⚔️</span>';

      if (res.ok) {
        showPgAlert(res.data.message || 'Welcome back, Scholar!', 'success');
        if (res.data.user) {
          state.username = res.data.user.username;
          state.email = res.data.user.email;
          localStorage.setItem('sq_username', res.data.user.username);
          state = { ...state, ...res.data.user };
        }
        updateUI();
        updateAuthHeaderBtn();

        setTimeout(() => {
          hidePgAlert();
          showAppScreen();
        }, 600);
      } else {
        showPgAlert(res.error || 'Login failed. Check your email & password.');
      }
    });
  }

  // ── PAGE FORM 2: REGISTER ─────────────────────────────────────────
  if (pgFormRegister) {
    pgFormRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      hidePgAlert();

      const username = document.getElementById('pg-reg-username').value.trim();
      const email = document.getElementById('pg-reg-email').value.trim();
      const password = document.getElementById('pg-reg-password').value;
      const btnSubmit = document.getElementById('pg-btn-register');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Creating Account... 🚀';

      const res = await api.register(username, email, password);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Create Account & Join Quest 🚀</span>';

      if (res.ok) {
        showPgAlert(res.data.message || 'Account created!', 'success');
        if (res.data.user) {
          state.username = res.data.user.username;
          state.email = res.data.user.email;
          localStorage.setItem('sq_username', res.data.user.username);
          state = { ...state, ...res.data.user };
        }
        updateUI();
        updateAuthHeaderBtn();

        setTimeout(() => {
          hidePgAlert();
          showAppScreen();
        }, 600);
      } else {
        showPgAlert(res.error || 'Registration failed.');
      }
    });
  }

  // ── PAGE FORM 3: FORGOT PASSWORD STEP 1 ───────────────────────────
  if (pgFormForgot1) {
    pgFormForgot1.addEventListener('submit', async (e) => {
      e.preventDefault();
      hidePgAlert();

      const email = document.getElementById('pg-forgot-email').value.trim();
      const btnSubmit = document.getElementById('pg-btn-forgot1');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Sending Code... ✉️';

      const res = await api.forgotPassword(email);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Send Recovery Code ✉️</span>';

      if (res.ok) {
        showPgAlert('Recovery code dispatched! See demo code below.', 'success');
        if (res.data.resetCode) {
          pgDemoCodeVal.innerText = res.data.resetCode;
          pgDemoCodeBox.classList.remove('hidden');
          document.getElementById('pg-reset-code').value = res.data.resetCode;
        }
        pgFormForgot1.classList.add('hidden');
        pgFormForgot2.classList.remove('hidden');
      } else {
        showPgAlert(res.error || 'Failed to dispatch recovery code.');
      }
    });
  }

  // ── PAGE FORM 3: FORGOT PASSWORD STEP 2 ───────────────────────────
  if (pgFormForgot2) {
    pgFormForgot2.addEventListener('submit', async (e) => {
      e.preventDefault();
      hidePgAlert();

      const email = document.getElementById('pg-forgot-email').value.trim();
      const resetCode = document.getElementById('pg-reset-code').value.trim();
      const newPassword = document.getElementById('pg-reset-new-password').value;
      const btnSubmit = document.getElementById('pg-btn-forgot2');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Updating Password... 🔑';

      const res = await api.resetPassword(email, resetCode, newPassword);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Reset Password & Update DB 🔑</span>';

      if (res.ok) {
        showPgAlert(res.data.message || 'Password reset successfully!', 'success');
        document.getElementById('pg-login-email').value = email;

        setTimeout(() => {
          switchPageTab('login');
          showPgAlert('Password updated! Please log in with your new password.', 'success');
        }, 1200);
      } else {
        showPgAlert(res.error || 'Password reset failed.');
      }
    });
  }

  // ── MODAL TAB SWITCHER & HANDLERS ────────────────────────────────
  function switchModalTab(targetTab) {
    hideModalAlert();
    [tabLogin, tabRegister, tabForgot].forEach(tab => tab && tab.classList.remove('active'));

    formLogin.classList.add('hidden');
    formRegister.classList.add('hidden');
    containerForgot.classList.add('hidden');
    containerProfile.classList.add('hidden');

    if (targetTab === 'login') {
      tabLogin.classList.add('active');
      formLogin.classList.remove('hidden');
    } else if (targetTab === 'register') {
      tabRegister.classList.add('active');
      formRegister.classList.remove('hidden');
    } else if (targetTab === 'forgot') {
      tabForgot.classList.add('active');
      containerForgot.classList.remove('hidden');
      formForgot1.classList.remove('hidden');
      formForgot2.classList.add('hidden');
      demoCodeBox.classList.add('hidden');
    } else if (targetTab === 'profile') {
      containerProfile.classList.remove('hidden');
      document.querySelector('.auth-tabs').style.display = 'none';

      document.getElementById('profile-username').innerText = state.username || 'Scholar';
      document.getElementById('profile-email').innerText = state.email || 'scholar@mscit.edu';
      document.getElementById('profile-level-badge').innerText = `LV ${state.level}`;
      document.getElementById('profile-coins-badge').innerText = `🪙 ${state.coins}`;

      const avatarId = state.avatar ? state.avatar.id || 'peasant' : 'peasant';
      const hero = HERO_DISPLAY_DATA[avatarId] || HERO_DISPLAY_DATA['peasant'];
      const profileSprite = document.getElementById('profile-avatar-sprite');
      if (profileSprite) {
        profileSprite.style.cssText = makeSpriteStyle(hero, 48);
      }
      return;
    }
    document.querySelector('.auth-tabs').style.display = 'flex';
  }

  if (btnOpenAuth) {
    btnOpenAuth.addEventListener('click', () => {
      if (auth.isLoggedIn()) {
        switchModalTab('profile');
      } else {
        switchModalTab('login');
      }
      modal.classList.remove('hidden');
    });
  }

  if (btnCloseAuth) {
    btnCloseAuth.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  if (tabLogin) tabLogin.addEventListener('click', () => switchModalTab('login'));
  if (tabRegister) tabRegister.addEventListener('click', () => switchModalTab('register'));
  if (tabForgot) tabForgot.addEventListener('click', () => switchModalTab('forgot'));
  if (btnGotoForgot) btnGotoForgot.addEventListener('click', () => switchModalTab('forgot'));
  if (btnGotoLogin) btnGotoLogin.addEventListener('click', () => switchModalTab('login'));

  // Modal Login Form
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideModalAlert();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const btnSubmit = document.getElementById('btn-submit-login');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Authenticating... ⚔️';

      const res = await api.login(email, password);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Enter Realm ⚔️</span>';

      if (res.ok) {
        showModalAlert(res.data.message || 'Welcome back, Scholar!', 'success');
        if (res.data.user) {
          state.username = res.data.user.username;
          state.email = res.data.user.email;
          localStorage.setItem('sq_username', res.data.user.username);
          state = { ...state, ...res.data.user };
        }
        updateUI();
        updateAuthHeaderBtn();

        setTimeout(() => {
          modal.classList.add('hidden');
          hideModalAlert();
          showAppScreen();
        }, 600);
      } else {
        showModalAlert(res.error || 'Login failed.');
      }
    });
  }

  // Modal Register Form
  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideModalAlert();

      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const btnSubmit = document.getElementById('btn-submit-register');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Creating Account... 🚀';

      const res = await api.register(username, email, password);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Join the Quest 🚀</span>';

      if (res.ok) {
        showModalAlert(res.data.message || 'Scholar registered!', 'success');
        if (res.data.user) {
          state.username = res.data.user.username;
          state.email = res.data.user.email;
          localStorage.setItem('sq_username', res.data.user.username);
          state = { ...state, ...res.data.user };
        }
        updateUI();
        updateAuthHeaderBtn();

        setTimeout(() => {
          modal.classList.add('hidden');
          hideModalAlert();
          showAppScreen();
        }, 600);
      } else {
        showModalAlert(res.error || 'Registration failed.');
      }
    });
  }

  // Modal Forgot Password Step 1
  if (formForgot1) {
    formForgot1.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideModalAlert();

      const email = document.getElementById('forgot-email').value.trim();
      const btnSubmit = document.getElementById('btn-submit-forgot1');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Sending Code... ✉️';

      const res = await api.forgotPassword(email);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Send Recovery Code ✉️</span>';

      if (res.ok) {
        showModalAlert('Recovery code dispatched!', 'success');
        if (res.data.resetCode) {
          demoCodeVal.innerText = res.data.resetCode;
          demoCodeBox.classList.remove('hidden');
          document.getElementById('reset-code').value = res.data.resetCode;
        }
        formForgot1.classList.add('hidden');
        formForgot2.classList.remove('hidden');
      } else {
        showModalAlert(res.error || 'Failed to dispatch recovery code.');
      }
    });
  }

  // Modal Forgot Password Step 2
  if (formForgot2) {
    formForgot2.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideModalAlert();

      const email = document.getElementById('forgot-email').value.trim();
      const resetCode = document.getElementById('reset-code').value.trim();
      const newPassword = document.getElementById('reset-new-password').value;
      const btnSubmit = document.getElementById('btn-submit-forgot2');

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Updating Password... 🔑';

      const res = await api.resetPassword(email, resetCode, newPassword);
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>Update Password 🔑</span>';

      if (res.ok) {
        showModalAlert(res.data.message || 'Password reset successfully!', 'success');
        document.getElementById('login-email').value = email;

        setTimeout(() => {
          switchModalTab('login');
          showModalAlert('Password updated! Please log in with your new password.', 'success');
        }, 1200);
      } else {
        showModalAlert(res.error || 'Password reset failed.');
      }
    });
  }

  // ── LOGOUT & SYNC ─────────────────────────────────────────────────
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      api.logout();
      state.username = 'Scholar';
      delete state.email;
      updateAuthHeaderBtn();
      updateUI();
      showLoginScreen();
    });
  }

  if (btnSyncState) {
    btnSyncState.addEventListener('click', async () => {
      btnSyncState.disabled = true;
      btnSyncState.innerText = 'Syncing...';
      await api.saveState(state);
      btnSyncState.disabled = false;
      btnSyncState.innerHTML = '<i data-lucide="refresh-cw"></i> Sync Progress with Server';
      showModalAlert('Progress synced with backend server!', 'success');
      if (window.lucide) window.lucide.createIcons();
    });
  }
}


