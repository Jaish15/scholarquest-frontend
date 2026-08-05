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
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  window.saveState = saveState;
  window.updateUI = updateUI;
  initNavigation();
  initCore();
  
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
});

// Load state from localStorage
function loadState() {
  const saved = localStorage.getItem('scholarquest_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Deep merge state to make sure all structures exist
      state = {
        ...DEFAULT_STATE,
        ...parsed,
        stats: { ...DEFAULT_STATE.stats, ...parsed.stats },
        avatar: { ...DEFAULT_STATE.avatar, ...parsed.avatar },
        equipped: { ...DEFAULT_STATE.equipped, ...parsed.equipped },
        inventory: parsed.inventory || DEFAULT_STATE.inventory,
        habits: parsed.habits || DEFAULT_STATE.habits
      };
    } catch (e) {
      console.error('Failed to parse save state, loading default.', e);
      state = { ...DEFAULT_STATE };
    }
  } else {
    state = { ...DEFAULT_STATE };
  }
}

// Save state to localStorage
export function saveState() {
  localStorage.setItem('scholarquest_state', JSON.stringify(state));
}

// Navigation Logic (Tab switching)
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.content-view');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      
      // Update sidebar nav active state
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
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
    });
  });
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
  // Update header indicators
  document.getElementById('coin-count').innerText = state.coins;
  document.getElementById('level-badge').innerText = `LV ${state.level}`;
  
  // Update XP Fill
  const xpNeeded = getXPForNextLevel(state.level);
  const xpPct = (state.xp / xpNeeded) * 100;
  document.getElementById('xp-fill').style.width = `${xpPct}%`;
  document.getElementById('xp-text').innerText = `${state.xp}/${xpNeeded} XP`;
  
  // Update HP Fill
  const hpPct = (state.hp / state.maxHp) * 100;
  document.getElementById('hp-fill').style.width = `${hpPct}%`;
  document.getElementById('hp-text').innerText = `${state.hp}/${state.maxHp} HP`;
  
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
  peasant:       { name: 'The Scholar',    tagline: 'Diligent & Focused',   sprite: './src/modules/avatar/assets/characters/villagers/MiniPeasant.png',              pack: 'villagers'  },
  villager_woman:{ name: 'The Apprentice', tagline: 'Creative & Curious',   sprite: './src/modules/avatar/assets/characters/villagers/MiniVillagerWoman.png',        pack: 'villagers'  },
  worker:        { name: 'The Builder',    tagline: 'Steady & Reliable',    sprite: './src/modules/avatar/assets/characters/villagers/MiniWorker.png',               pack: 'villagers'  },
  gatherer:      { name: 'The Explorer',   tagline: 'Adaptive & Bold',      sprite: './src/modules/avatar/assets/characters/villagers2/original/MiniGatherer.png',   pack: 'villagers2' },
  shield_man:    { name: 'Guardian',       tagline: 'Level 5 Warrior',      sprite: './src/modules/avatar/assets/characters/humans/MiniShieldMan.png',               pack: 'humans'     },
  spear_man:     { name: 'Spear Guard',    tagline: 'Level 6 Warrior',      sprite: './src/modules/avatar/assets/characters/humans/MiniSpearMan.png',               pack: 'humans'     },
  halberd_man:   { name: 'Halberdier',     tagline: 'Level 7 Warrior',      sprite: './src/modules/avatar/assets/characters/humans/MiniHalberdMan.png',             pack: 'humans'     },
  sword_man:     { name: 'Sword Master',   tagline: 'Level 8 Fighter',      sprite: './src/modules/avatar/assets/characters/humans/MiniSwordMan.png',               pack: 'humans'     },
  horse_man:     { name: 'Horse Rider',    tagline: 'Level 11 Knight',      sprite: './src/modules/avatar/assets/characters/humans/MiniHorseMan.png',               pack: 'humans'     },
  prince:        { name: 'Prince',         tagline: 'Level 10 Royalty',     sprite: './src/modules/avatar/assets/characters/humans/MiniPrinceMan.png',              pack: 'humans'     },
  princess:      { name: 'Princess',       tagline: 'Level 10 Royalty',     sprite: './src/modules/avatar/assets/characters/villagers/MiniPrincess.png',            pack: 'villagers'  },
  king:          { name: 'King',           tagline: 'Level 20 Legend',      sprite: './src/modules/avatar/assets/characters/humans/MiniKingMan.png',                pack: 'humans'     },
  queen:         { name: 'Queen',          tagline: 'Level 20 Legend',      sprite: './src/modules/avatar/assets/characters/villagers/MiniQueen.png',               pack: 'villagers'  },
  merchant:      { name: 'Merchant',       tagline: 'Gold Exchange',        sprite: './src/modules/avatar/assets/characters/villagers2/original/MiniMerchant.png',  pack: 'villagers2' },
  blacksmith:    { name: 'Blacksmith',     tagline: 'Gold Exchange',        sprite: './src/modules/avatar/assets/characters/villagers2/original/MiniBlacksmith.png',pack: 'villagers2' },
  thief:         { name: 'Thief',          tagline: 'Gold Exchange',        sprite: './src/modules/avatar/assets/characters/villagers2/original/MiniThief.png',     pack: 'villagers2' },
  archer:        { name: 'Archer',         tagline: 'Habit Milestone',      sprite: './src/modules/avatar/assets/characters/humans/MiniArcherMan.png',              pack: 'humans'     },
  crossbow_man:  { name: 'Crossbowman',    tagline: 'Habit Milestone',      sprite: './src/modules/avatar/assets/characters/humans/MiniCrossBowMan.png',           pack: 'humans'     },
  mage:          { name: 'Mage',           tagline: 'Focus Milestone',      sprite: './src/modules/avatar/assets/characters/humans/MiniMage.png',                   pack: 'humans'     },
  arch_mage:     { name: 'Archmage',       tagline: 'Focus Milestone',      sprite: './src/modules/avatar/assets/characters/humans/MiniArchMage.png',              pack: 'humans'     },
  nun:           { name: 'Cleric',         tagline: 'StudySync Reward',     sprite: './src/modules/avatar/assets/characters/villagers2/original/MiniNun.png',       pack: 'villagers2' },
};

const FRAME_SIZE_JS = { villagers: 48, humans: 64, villagers2: 64 };

function makeSpriteStyle(hero, displayPx) {
  const frameSize = FRAME_SIZE_JS[hero.pack] || 48;
  return `
    width: ${displayPx}px;
    height: ${displayPx}px;
    background-image: url(${hero.sprite});
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: ${displayPx * 4}px auto;
    image-rendering: pixelated;
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
  const sidebarName   = document.getElementById('sidebar-avatar-name');
  const sidebarLevel  = document.getElementById('sidebar-level-num');
  if (sidebarSprite) {
    sidebarSprite.style.cssText = makeSpriteStyle(hero, 32);
  }
  if (sidebarName) sidebarName.textContent = hero.name;
  if (sidebarLevel) sidebarLevel.textContent = level;

  // ── 2. DASHBOARD SHOWCASE BANNER ──────────────────────────────
  const showcaseSprite  = document.getElementById('showcase-sprite');
  const showcaseName    = document.getElementById('showcase-name');
  const showcaseTagline = document.getElementById('showcase-tagline');
  const showcaseLevel   = document.getElementById('showcase-level');
  const showcaseLevelStat = document.getElementById('showcase-stat-level');
  const showcaseGold    = document.getElementById('showcase-stat-gold');
  const showcaseStreak  = document.getElementById('showcase-stat-streak');
  const showcaseFocus   = document.getElementById('showcase-stat-focus');

  if (showcaseSprite) {
    showcaseSprite.style.cssText = makeSpriteStyle(hero, 96);
  }
  if (showcaseName) showcaseName.textContent = hero.name;
  if (showcaseTagline) showcaseTagline.textContent = hero.tagline;
  if (showcaseLevel) showcaseLevel.textContent = level;
  if (showcaseLevelStat) showcaseLevelStat.textContent = level;
  if (showcaseGold)   showcaseGold.textContent   = state.coins || 0;
  if (showcaseStreak) showcaseStreak.textContent = state.stats ? state.stats.maxHabitStreak : 0;
  if (showcaseFocus)  showcaseFocus.textContent  = state.stats ? state.stats.focusMinutes : 0;

  // ── 3. MODULE HERO CHIPS ──────────────────────────────────────
  const modules = ['quizforge','focusarena','habitdojo','studysync','codescroll','shop'];
  modules.forEach(mod => {
    const chipSprite = document.getElementById(`chip-sprite-${mod}`);
    const chipLevels = document.querySelectorAll(`#chip-${mod} .chip-level`);
    if (chipSprite) {
      chipSprite.style.cssText = makeSpriteStyle(hero, 24);
    }
    chipLevels.forEach(el => { el.textContent = level; });
  });
}

// Export so it can be called externally
window.syncAvatarDisplay = syncAvatarDisplay;
