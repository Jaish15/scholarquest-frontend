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
    hand: 'none',
    pet: 'none'
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
  initLoginStreak();
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
    } else if (target === 'reportcard') {
      renderReportCardPage();
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // Attach ScholarQuest logo click listener (navigates to Dashboard)
  const logoBtn = document.querySelector('.logo-area');
  if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.addEventListener('click', () => {
      navigateTo('dashboard');
    });
  }

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

  // Render Dashboard Components
  renderXPProgressRing();
  checkWelcomeBackModal();
  renderCharacterClassesGrid();
  renderLoginCalendar();
  renderWeakAreaCard();
  renderReportCardPage();
  setupProfileModal();

  // Expose state and notify React
  window.state = state;
  if (typeof window.onStateUpdate === 'function') {
    window.onStateUpdate(state);
  }
}

// ── AVATAR DISPLAY SYNC ────────────────────────────────────────────────────
// Level-gated Hero Archetypes (Never purchased with coins)
export const HERO_DISPLAY_DATA = {
  peasant: { name: 'The Scholar', tagline: 'Diligent & Focused', reqLevel: 1, sprite: './assets/heroes/scholar.png', isChibi: true },
  villager_woman: { name: 'The Apprentice', tagline: 'Creative & Curious', reqLevel: 1, sprite: './assets/heroes/apprentice.png', isChibi: true },
  worker: { name: 'The Peasant', tagline: 'Steady & Reliable', reqLevel: 1, sprite: './assets/heroes/peasant.png', isChibi: true },
  gatherer: { name: 'The Explorer', tagline: 'Adaptive & Bold', reqLevel: 1, sprite: './assets/heroes/explorer.png', isChibi: true },
  shield_man: { name: 'Guardian Knight', tagline: 'Defender of Focus', reqLevel: 5, sprite: './assets/heroes/knight.png', isChibi: true },
  prince: { name: 'Royal Highness', tagline: 'Majestic & Noble', reqLevel: 10, sprite: './assets/heroes/royal.png', isChibi: true },
  enchanter: { name: 'The Enchanter', tagline: 'Mystic Scholar-Mage', reqLevel: 15, sprite: './assets/heroes/scholar.png', isChibi: true },
  shadow_rogue: { name: 'The Shadow Rogue', tagline: 'Stealthy Strategist', reqLevel: 20, sprite: './assets/heroes/explorer.png', isChibi: true }
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
    if (loginScreen) {
      loginScreen.style.setProperty('display', 'none', 'important');
      loginScreen.classList.add('hidden');
    }
    if (mainAppContainer) {
      mainAppContainer.style.setProperty('display', 'grid', 'important');
      mainAppContainer.classList.remove('hidden');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function showLoginScreen() {
    if (loginScreen) {
      loginScreen.style.setProperty('display', 'flex', 'important');
      loginScreen.classList.remove('hidden');
    }
    if (mainAppContainer) {
      mainAppContainer.style.setProperty('display', 'none', 'important');
      mainAppContainer.classList.add('hidden');
    }
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
    const username = state.profile?.fullName || state.username || localStorage.getItem('sq_username') || 'Jayasri';
    authBtnLabel.innerText = username;
    btnOpenAuth.classList.add('logged-in');
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
      auth.setToken('guest_token_' + Date.now());
      auth.setUserId('guest_user_1');
      state.username = 'Guest Scholar';
      localStorage.setItem('sq_username', 'Guest Scholar');
      updateUI();
      updateAuthHeaderBtn();
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

// ── LOGIN STREAK & CALENDAR MANAGER ──────────────────────────────────────
function initLoginStreak() {
  if (!state.loginDates || !Array.isArray(state.loginDates)) {
    state.loginDates = [];
  }
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();
  const todayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;
  
  // Seed past days if brand new / sparse for visual demonstration
  if (state.loginDates.length < 3) {
    for (let d = 1; d <= todayDate; d++) {
      if (d % 3 !== 0) { // Mark ~70% of past days as active logins
        const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (!state.loginDates.includes(dStr)) {
          state.loginDates.push(dStr);
        }
      }
    }
  }

  // Ensure today's date is recorded
  if (!state.loginDates.includes(todayStr)) {
    state.loginDates.push(todayStr);
  }
  
  calculateLoginStreak();
  saveState();
}

function calculateLoginStreak() {
  if (!state.loginDates || state.loginDates.length === 0) {
    state.loginStreak = 1;
    return;
  }
  
  const sorted = [...state.loginDates].sort();
  let streak = 0;
  let checkDate = new Date();
  
  for (let i = 0; i < 365; i++) {
    const year = checkDate.getFullYear();
    const month = checkDate.getMonth() + 1;
    const day = checkDate.getDate();
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (sorted.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  state.loginStreak = Math.max(streak, 1);
  if (!state.stats) state.stats = {};
  state.stats.maxHabitStreak = Math.max(state.stats.maxHabitStreak || 0, state.loginStreak);
}

// ── DASHBOARD COMPONENTS & REDESIGNS ────────────────────────────────────

// 1. Circular XP Progress Ring Visual Centerpiece
function renderXPProgressRing() {
  const ring = document.getElementById('xp-ring-circle');
  const textVal = document.getElementById('xp-ring-text');
  if (!ring) return;

  const currentXP = state.xp || 0;
  const level = state.level || 1;
  const nextLevelXP = level * 100;
  const progressPercent = Math.min(currentXP / nextLevelXP, 1);

  const maxDash = 320.44;
  const offset = maxDash - (progressPercent * maxDash);

  ring.style.strokeDashoffset = offset;
  if (textVal) textVal.innerText = `${Math.round(progressPercent * 100)}%`;
}

// 2. Welcome Back Popup Modal (Once Per Session)
function checkWelcomeBackModal() {
  if (sessionStorage.getItem('welcome_back_popup_shown')) return;

  let modal = document.getElementById('welcome-back-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'welcome-back-modal';
    modal.className = 'welcome-modal-backdrop';
    document.body.appendChild(modal);
  }

  const level = state.level || 1;
  const currentXP = state.xp || 0;
  const xpNeeded = Math.max(0, (level * 100) - currentXP);

  modal.innerHTML = `
    <div class="welcome-modal-card animate-scale">
      <button type="button" class="welcome-modal-close" id="btn-close-welcome-x">&times;</button>
      <div style="font-size: 36px; margin-bottom: 10px;">⚔️</div>
      <div style="font-size: 20px; font-weight: 900; color: #f59e0b; margin-bottom: 6px;">Welcome Back, Scholar!</div>
      <p style="font-size: 13px; color: #f5e8d7; margin-bottom: 18px; line-height: 1.5;">
        🔥 You're only <strong>${xpNeeded} XP</strong> away from Level ${level + 1}! Battle in QuizForge or Focus Arena to level up your hero class.
      </p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button type="button" class="btn primary-btn" id="btn-welcome-battle" style="padding: 8px 20px;">
          Battle Now 🚀
        </button>
        <button type="button" class="btn secondary-btn" id="btn-close-welcome" style="padding: 8px 16px;">
          Maybe Later
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  sessionStorage.setItem('welcome_back_popup_shown', 'true');

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  document.getElementById('btn-close-welcome-x')?.addEventListener('click', closeModal);
  document.getElementById('btn-close-welcome')?.addEventListener('click', closeModal);
  document.getElementById('btn-welcome-battle')?.addEventListener('click', () => {
    closeModal();
    const quizBtn = document.querySelector('.nav-item[data-target="quizforge"]');
    if (quizBtn) quizBtn.click();
  });
}

// 3. Character Classes Selection Grid on Dashboard (Rebuilt with .sq-hero-*)
function renderCharacterClassesGrid() {
  const container = document.getElementById('character-classes-grid-container');
  if (!container) return;

  const level = state.level || 1;
  const currentAvatarId = state.avatar ? state.avatar.id || 'peasant' : 'peasant';

  const heroesList = Object.entries(HERO_DISPLAY_DATA).map(([id, hero]) => ({ id, ...hero }));

  let cardsHTML = '';
  heroesList.forEach(hero => {
    const isUnlocked = level >= hero.reqLevel;
    const isActive = currentAvatarId === hero.id;

    cardsHTML += `
      <div class="sq-hero-card ${isActive ? 'is-active' : ''} ${!isUnlocked ? 'is-locked' : ''}">
        ${isActive ? '<div class="sq-hero-badge active">ACTIVE</div>' : ''}
        ${!isUnlocked ? `<div class="sq-hero-badge locked">🔒 LV ${hero.reqLevel}</div>` : ''}

        <div class="sq-hero-avatar-wrap">
          <img src="${hero.sprite}" alt="${hero.name}" class="sq-hero-avatar" />
        </div>

        <div class="sq-hero-info">
          <div class="sq-hero-title">${hero.name}</div>
          <div class="sq-hero-tagline">${hero.tagline}</div>
        </div>

        <div class="sq-hero-action-area">
          ${isActive ? `
            <div class="sq-hero-status-active">✓ Currently Active</div>
          ` : (isUnlocked ? `
            <button type="button" class="sq-hero-btn-set" data-id="${hero.id}">
              Set Active ✨
            </button>
          ` : `
            <div class="sq-hero-status-locked">🔒 Requires LV ${hero.reqLevel}</div>
          `)}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h2 style="font-size: 18px; font-weight: 800; color: #f59e0b; margin: 0; display: flex; align-items: center; gap: 8px;">
          🎭 Character Classes
        </h2>
        <p style="font-size: 12px; color: rgba(245,232,215,0.5); margin: 3px 0 0;">
          Level up your Scholar to permanently unlock higher hero archetypes
        </p>
      </div>
      <span style="font-size: 11px; font-weight: 800; color: #0ea5e9; background: rgba(14,165,233,0.15); padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(14,165,233,0.3);">
        Level ${level} Unlocks
      </span>
    </div>

    <div class="sq-hero-grid">
      ${cardsHTML}
    </div>
  `;

  container.querySelectorAll('.sq-hero-btn-set').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      if (id) {
        if (!state.avatar) state.avatar = {};
        state.avatar.id = id;
        saveState();
        syncAvatarDisplay();
        updateUI();
      }
    });
  });
}

// 4. Rebuilt Study Attendance Calendar Component (.sq-cal-*)
let calendarViewMonthOffset = 0;

function renderLoginCalendar() {
  const container = document.getElementById('login-calendar-container');
  if (!container) return;

  const now = new Date();
  now.setMonth(now.getMonth() + calendarViewMonthOffset);
  const year = now.getFullYear();
  const month = now.getMonth();
  const todayDate = new Date().getDate();
  const isCurrentMonth = (now.getFullYear() === new Date().getFullYear()) && (now.getMonth() === new Date().getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const activeDates = new Set(state.loginDates || []);
  const streak = state.loginStreak || 1;
  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const totalLoginsThisMonth = Array.from(activeDates).filter(d => d.startsWith(currentMonthPrefix)).length;

  let directGridChildrenHTML = '';

  // 1. DIRECT CHILDREN: 7 Day-Header Cells (Row 1 of 7-column CSS grid)
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(day => {
    directGridChildrenHTML += `<div class="sq-cal-header">${day}</div>`;
  });

  // 2. DIRECT CHILDREN: Blank Padding Cells before Day 1
  for (let i = 0; i < firstDayIndex; i++) {
    directGridChildrenHTML += `<div class="sq-cal-cell is-empty"></div>`;
  }

  // 3. DIRECT CHILDREN: Date Number Cells (1 to daysInMonth)
  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isLoggedIn = activeDates.has(dayStr);
    const isToday = isCurrentMonth && (day === todayDate);

    let cellClasses = 'sq-cal-cell';
    if (isLoggedIn) cellClasses += ' is-active';
    if (isToday) cellClasses += ' is-today';

    const tooltipText = `${monthNames[month]} ${day}, ${year}\n-> Status: ${isLoggedIn ? 'Active Study Session Logged (🔥 15+ XP)' : 'No Activity Recorded'}`;

    directGridChildrenHTML += `
      <div class="${cellClasses}" title="${tooltipText}">
        <span class="sq-cal-num">${day}</span>
        ${isLoggedIn ? '<span class="sq-cal-dot" title="Active Study Session"></span>' : ''}
      </div>
    `;
  }

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
      <div>
        <h2 style="font-size: 18px; font-weight: 800; color: #f59e0b; margin: 0; display: flex; align-items: center; gap: 8px;">
          📅 Study Attendance & Activity Calendar
        </h2>
        <p style="font-size: 12px; color: rgba(245,232,215,0.6); margin-top: 3px;">Monthly calendar view tracking your daily study sessions</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <div style="background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); color: #f59e0b; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 800;">
          🔥 ${streak}-Day Streak
        </div>
        <div style="background: rgba(14,165,233,0.15); border: 1px solid rgba(14,165,233,0.3); color: #0ea5e9; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 800;">
          ⭐ ${totalLoginsThisMonth} Active Days
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-size: 14px; font-weight: 800; color: #f5e8d7;">
      <button type="button" id="btn-prev-month" class="btn secondary-btn btn-sm" style="padding: 4px 14px; font-size: 11px;">← Prev Month</button>
      <span>${monthNames[month]} ${year}</span>
      <button type="button" id="btn-next-month" class="btn secondary-btn btn-sm" style="padding: 4px 14px; font-size: 11px;">Next Month →</button>
    </div>

    <div class="sq-cal-grid">
      ${directGridChildrenHTML}
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(245,158,11,0.1); font-size: 11px; color: rgba(245,232,215,0.5);">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 6px #f59e0b; display: inline-block;"></span>
        <span>Active Study Day</span>
      </div>
      <span>Hover over any date cell to view session details</span>
    </div>
  `;

  document.getElementById('btn-prev-month')?.addEventListener('click', () => {
    calendarViewMonthOffset--;
    renderLoginCalendar();
  });

  document.getElementById('btn-next-month')?.addEventListener('click', () => {
    calendarViewMonthOffset++;
    renderLoginCalendar();
  });
}

// 5. "Focus On" Weak-Area Insight Card
function renderWeakAreaCard() {
  const container = document.getElementById('weak-area-card-container');
  if (!container) return;

  const missedData = state.quizStats?.missedByDomain || {};
  const missedEntries = Object.entries(missedData);

  if (missedEntries.length === 0) {
    container.innerHTML = `
      <div class="glass card" style="padding: 16px; border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.08);">
        <div style="font-size: 13px; font-weight: 800; color: #10b981;">🎯 Focus On: Great Accuracy!</div>
        <p style="font-size: 11px; color: rgba(245,232,215,0.7); margin-top: 4px;">No weak domain identified yet. Keep testing in QuizForge to build analytics!</p>
      </div>
    `;
    return;
  }

  missedEntries.sort((a, b) => b[1] - a[1]);
  const [topKey, count] = missedEntries[0];
  const [domain, diff] = topKey.split(':');

  container.innerHTML = `
    <div class="glass card weak-area-card" style="padding: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 11px; font-weight: 800; color: #ef4444; text-transform: uppercase;">⚠️ Focus On Weak Area</span>
        <span style="font-size: 10px; background: rgba(239,68,68,0.2); color: #ef4444; padding: 2px 8px; border-radius: 6px; font-weight: 800;">${count} Missed</span>
      </div>
      <div style="font-size: 14px; font-weight: 800; color: #f5e8d7;">${domain} (${diff || 'Beginner'})</div>
      <p style="font-size: 11px; color: rgba(245,232,215,0.6); margin: 4px 0 10px 0;">Targeted practice recommended to sharpen mastery.</p>
      <button type="button" class="btn primary-btn btn-sm" id="btn-practice-weak" style="width: 100%; font-size: 11px; padding: 6px;">
        Practice ${domain} Now →
      </button>
    </div>
  `;

  document.getElementById('btn-practice-weak')?.addEventListener('click', () => {
    const quizBtn = document.querySelector('.nav-item[data-target="quizforge"]');
    if (quizBtn) quizBtn.click();
  });
}

// 6. Dedicated Report Card Page Renderer
function renderReportCardPage() {
  const container = document.getElementById('reportcard-page-container');
  if (!container) return;

  const avatarId = (state.avatar && state.avatar.id) ? state.avatar.id : 'peasant';
  const hero = HERO_DISPLAY_DATA[avatarId] || HERO_DISPLAY_DATA['peasant'];
  const level = state.level || 1;
  const xp = state.xp || 0;
  const streak = state.loginStreak || 1;
  const quizzes = state.stats?.quizzesCompleted || 0;
  const focusMins = state.stats?.focusMinutes || 0;

  container.innerHTML = `
    <div class="parchment-scroll-card animate-scale" id="scroll-export-target">
      <div class="parchment-wax-seal">📜</div>
      <div class="parchment-header-title">Scholar Quest Report</div>
      
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 22px; font-weight: 800; color: #4a2c0f;">${hero.name}</div>
        <div style="font-size: 13px; color: #785226; font-style: italic; margin-top: 2px;">Level ${level} • ${hero.tagline}</div>
      </div>

      <div class="parchment-stat-grid">
        <div class="parchment-stat-box">
          <div class="parchment-stat-label">Total XP</div>
          <div class="parchment-stat-val">${xp} XP</div>
        </div>
        <div class="parchment-stat-box">
          <div class="parchment-stat-label">Login Streak</div>
          <div class="parchment-stat-val">${streak} Days</div>
        </div>
        <div class="parchment-stat-box">
          <div class="parchment-stat-label">Quizzes Cleared</div>
          <div class="parchment-stat-val">${quizzes}</div>
        </div>
        <div class="parchment-stat-box">
          <div class="parchment-stat-label">Focus Logged</div>
          <div class="parchment-stat-val">${focusMins} Mins</div>
        </div>
      </div>

      <div style="margin-top: 18px; border-top: 1px dashed #8b6534; padding-top: 14px; font-size: 12px; color: #4a2c0f; line-height: 1.6;">
        <strong>Domain Mastery Status:</strong> Python (Mastered), JavaScript (Active), Cybersecurity (Unbroken)
      </div>

      <div style="display: flex; justify-content: center; margin-top: 24px;">
        <button type="button" class="btn primary-btn" id="btn-download-scroll" style="width: 100%; max-width: 320px; background: #6b4c27; border-color: #4a3318; color: #fbf4e2; font-weight: 800; padding: 10px 20px; font-size: 13px;">
          💾 Download Report PNG
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-download-scroll')?.addEventListener('click', () => {
    generateReportCardPNG();
  });
}

function generateReportCardPNG() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 450;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f7ebd0';
  ctx.fillRect(0, 0, 600, 450);

  ctx.strokeStyle = '#6b4c27';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 590, 440);

  ctx.fillStyle = '#4a2c0f';
  ctx.font = 'bold 24px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('SCHOLARQUEST OFFICIAL REPORT', 300, 50);

  const avatarId = (state.avatar && state.avatar.id) ? state.avatar.id : 'peasant';
  const hero = HERO_DISPLAY_DATA[avatarId] || HERO_DISPLAY_DATA['peasant'];

  ctx.font = '18px Georgia';
  ctx.fillText(`Archetype: ${hero.name} (Level ${state.level || 1})`, 300, 90);

  ctx.font = '14px Georgia';
  ctx.textAlign = 'left';
  ctx.fillText(`• Total XP Earned: ${state.xp || 0} XP`, 50, 150);
  ctx.fillText(`• Login Streak: ${state.loginStreak || 1} Days`, 50, 190);
  ctx.fillText(`• Quizzes Solved: ${state.stats?.quizzesCompleted || 0}`, 50, 230);
  ctx.fillText(`• Focus Time Logged: ${state.stats?.focusMinutes || 0} Minutes`, 50, 270);
  ctx.fillText(`• Lessons Cleared: ${state.stats?.lessonsCompleted || 0}`, 50, 310);

  const link = document.createElement('a');
  link.download = 'ScholarQuest_Report_Card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// 7. Lightweight Local Profile Modal
function setupProfileModal() {
  const openBtn = document.getElementById('btn-open-auth');
  const sidebarWidget = document.getElementById('sidebar-avatar-widget');

  if (openBtn) {
    openBtn.onclick = (e) => {
      e.preventDefault();
      openProfileModal();
    };
  }

  if (sidebarWidget) {
    sidebarWidget.style.cursor = 'pointer';
    sidebarWidget.onclick = () => {
      openProfileModal();
    };
  }
}

function openProfileModal() {
  let modal = document.getElementById('local-profile-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'local-profile-modal';
    modal.className = 'profile-modal-backdrop';
    document.body.appendChild(modal);
  }

  const profile = state.profile || {};
  const isComplete = profile.fullName && profile.email;

  renderProfileContent(modal, isComplete, false);
  modal.classList.remove('hidden');
}

function renderProfileContent(modal, isComplete, editMode) {
  const profile = state.profile || {};
  const avatarId = (state.avatar && state.avatar.id) ? state.avatar.id : 'peasant';
  const hero = HERO_DISPLAY_DATA[avatarId] || HERO_DISPLAY_DATA['peasant'];

  if (!isComplete || editMode) {
    modal.innerHTML = `
      <div class="profile-card-glass animate-scale">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(245,158,11,0.2); padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #f59e0b; margin: 0;">👤 ${editMode ? 'Edit Profile' : 'Complete Your Profile'}</h2>
          <button type="button" class="btn-close-profile" style="background: none; border: none; color: #f5e8d7; font-size: 18px; cursor: pointer;">✕</button>
        </div>

        <form id="local-profile-form">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 11px; font-weight: 800; color: rgba(245,232,215,0.7); margin-bottom: 4px;">Full Name</label>
            <input type="text" id="prof-fullname" required value="${profile.fullName || ''}" placeholder="e.g. Jayasri Scholar" style="width: 100%; padding: 10px; background: rgba(20,16,11,0.8); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; color: #f5e8d7; font-weight: 700;">
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 11px; font-weight: 800; color: rgba(245,232,215,0.7); margin-bottom: 4px;">Phone Number</label>
            <input type="tel" id="prof-phone" required value="${profile.phone || ''}" placeholder="e.g. +91 9876543210" style="width: 100%; padding: 10px; background: rgba(20,16,11,0.8); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; color: #f5e8d7; font-weight: 700;">
          </div>
          <div style="margin-bottom: 18px;">
            <label style="display: block; font-size: 11px; font-weight: 800; color: rgba(245,232,215,0.7); margin-bottom: 4px;">Email Address</label>
            <input type="email" id="prof-email" required value="${profile.email || ''}" placeholder="e.g. jayasri@mscit.edu" style="width: 100%; padding: 10px; background: rgba(20,16,11,0.8); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; color: #f5e8d7; font-weight: 700;">
          </div>
          <button type="submit" class="btn primary-btn" style="width: 100%;">Save Profile Details ✨</button>
        </form>
      </div>
    `;

    modal.querySelector('.btn-close-profile')?.addEventListener('click', () => modal.classList.add('hidden'));
    modal.querySelector('#local-profile-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      state.profile = {
        fullName: document.getElementById('prof-fullname').value,
        phone: document.getElementById('prof-phone').value,
        email: document.getElementById('prof-email').value
      };
      saveState();
      updateUI();
      renderProfileContent(modal, true, false);
    });
  } else {
    modal.innerHTML = `
      <div class="profile-card-glass animate-scale">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(245,158,11,0.2); padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 800; color: #f59e0b; margin: 0;">👤 Scholar Profile</h2>
          <button type="button" class="btn-close-profile" style="background: none; border: none; color: #f5e8d7; font-size: 18px; cursor: pointer;">✕</button>
        </div>

        <div style="display: flex; align-items: center; gap: 14px; background: rgba(20,16,11,0.6); padding: 14px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2); margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; background-image: url('${hero.sprite}'); background-repeat: no-repeat; background-position: center; background-size: contain; flex-shrink: 0;"></div>
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #f5e8d7;">${profile.fullName}</div>
            <div style="font-size: 12px; color: #f59e0b; font-weight: 800;">${hero.name} (Level ${state.level || 1})</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: rgba(245,232,215,0.8); margin-bottom: 18px;">
          <div>📧 <strong>Email:</strong> ${profile.email}</div>
          <div>📞 <strong>Phone:</strong> ${profile.phone}</div>
          <div>🔥 <strong>Streak:</strong> ${state.loginStreak || 1} Days</div>
          <div>⭐ <strong>Total XP:</strong> ${state.xp || 0} XP</div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn primary-btn btn-edit-profile" style="flex: 1;">Edit Profile ✏️</button>
          <button type="button" class="btn secondary-btn btn-close-profile" style="flex: 1;">Close</button>
        </div>
      </div>
    `;

    modal.querySelectorAll('.btn-close-profile').forEach(b => b.addEventListener('click', () => modal.classList.add('hidden')));
    modal.querySelector('.btn-edit-profile')?.addEventListener('click', () => renderProfileContent(modal, true, true));
  }
}



