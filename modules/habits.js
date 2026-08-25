/* ==========================================
   ScholarQuest HabitDojo Module
   Handles habit lists, checkoffs, streak/HP logs
   ========================================== */

import { state, addXP, addCoins, takeDamage, saveState, updateUI } from '../app.js';

const MOTIVATIONAL_QUOTES = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Step by step, day by day, consistency breeds mastery.", author: "Dojo Wisdom" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Focus on the process, not the outcome. The results will follow.", author: "Scholar Principle" }
];

export function updateDailyMotivation() {
  const quoteElem = document.getElementById('daily-quote-text');
  const authorElem = document.getElementById('daily-quote-author');
  if (!quoteElem || !authorElem) return;

  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const quoteIndex = dateSeed % MOTIVATIONAL_QUOTES.length;
  const quote = MOTIVATIONAL_QUOTES[quoteIndex];

  quoteElem.textContent = `"${quote.text}"`;
  authorElem.textContent = `— ${quote.author}`;
}

export function initHabits() {
  renderHabitsList();
  setupHabitsEvents();
  updateDailyMotivation();
}

function setupHabitsEvents() {
  const addHabitBtn = document.getElementById('btn-add-habit');
  const closeFormBtn = document.getElementById('btn-close-habit-form');
  const habitForm = document.getElementById('habit-form');

  if (addHabitBtn && !addHabitBtn.dataset.bound) {
    addHabitBtn.dataset.bound = 'true';
    addHabitBtn.addEventListener('click', () => {
      document.getElementById('habit-form-panel')?.classList.remove('hidden');
    });
  }

  if (closeFormBtn && !closeFormBtn.dataset.bound) {
    closeFormBtn.dataset.bound = 'true';
    closeFormBtn.addEventListener('click', () => {
      document.getElementById('habit-form-panel')?.classList.add('hidden');
    });
  }

  if (habitForm && !habitForm.dataset.bound) {
    habitForm.dataset.bound = 'true';
    habitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewHabit();
    });
  }
}

const STREAK_MILESTONES = [
  { days: 3, bonusCoins: 20, badgeKey: 'consistent', label: 'Consistent 🏅' },
  { days: 7, bonusCoins: 50, badgeKey: 'disciplined', label: 'Disciplined ⚔️' },
  { days: 14, bonusCoins: 100, badgeKey: 'iron_will', label: 'Iron Will 🛡️' },
  { days: 30, bonusCoins: 200, badgeKey: 'unbreakable', label: 'Unbreakable 👑' }
];

// Render list of active habits
export function renderHabitsList() {
  const container = document.getElementById('habits-container');
  if (!container) return;
  container.innerHTML = '';

  const appState = (window.state && typeof window.state === 'object' && Array.isArray(window.state.habits)) ? window.state : state;
  const habitsList = appState.habits || [];

  if (habitsList.length === 0) {
    container.innerHTML = '<div class="empty-log" style="padding: 24px; text-align: center; color: var(--text-muted);">No habits created. Enter the Dojo and forge a challenge!</div>';
    return;
  }

  habitsList.forEach(habit => {
    if (!Array.isArray(habit.earnedBadges)) {
      habit.earnedBadges = [];
    }
    const isCompletedToday = isCompleted(habit.lastCompleted);
    const diffColor = habit.difficulty === 'easy' ? '#10b981' : (habit.difficulty === 'medium' ? '#f59e0b' : '#ef4444');
    const flameColor = habit.streak >= 30 ? '#c084fc' : (habit.streak >= 14 ? '#ef4444' : (habit.streak >= 7 ? '#f59e0b' : '#3b82f6'));

    // Generate 7-day mini progress dots
    let dotsHTML = '';
    for (let i = 6; i >= 0; i--) {
      const isPastCompleted = (i === 0 && isCompletedToday) || (habit.streak > i);
      dotsHTML += `
        <span class="habit-dot" style="width: 8px; height: 8px; border-radius: 50%; display: inline-block; background: ${isPastCompleted ? diffColor : 'rgba(255,255,255,0.12)'}; border: 1px solid ${isPastCompleted ? diffColor : 'rgba(255,255,255,0.2)'};" title="Day -${i}"></span>
      `;
    }

    // Generate milestone badges HTML
    let badgesHTML = '';
    if (habit.earnedBadges.length > 0) {
      badgesHTML = `
        <div class="habit-earned-badges" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
          ${habit.earnedBadges.map(b => `<span style="font-size: 10px; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.4); padding: 2px 6px; border-radius: 6px; font-weight: 800;">${b}</span>`).join('')}
        </div>
      `;
    }

    const item = document.createElement('div');
    item.className = 'habit-card-item glass';
    item.style.cssText = `
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease, border-color 0.2s ease;
    `;

    item.innerHTML = `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
        <div class="habit-details" style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 class="habit-title" style="margin: 0; font-size: 15px; font-weight: 800; color: #fff;">${escapeHTML(habit.name)}</h3>
            <span class="habit-difficulty-badge" style="font-size: 10px; text-transform: uppercase; font-weight: 800; padding: 2px 8px; border-radius: 6px; color: ${diffColor}; background: rgba(255,255,255,0.05); border: 1px solid ${diffColor};">${habit.difficulty}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; margin: 8px 0;">
            <span class="habit-streak-display" style="font-size: 12px; font-weight: 800; color: ${flameColor}; display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 14px;">🔥</span> ${habit.streak}-Day Streak
            </span>
            <div style="display: flex; gap: 4px; align-items: center;">
              ${dotsHTML}
            </div>
          </div>

          ${badgesHTML}
        </div>

        <div class="habit-actions-row" style="display: flex; align-items: center; gap: 8px;">
          ${isCompletedToday ? `
            <span class="quest-status" style="font-size: 11px; background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid #10b981; padding: 6px 12px; border-radius: 8px; font-weight: 800;">Cleared Today ✨</span>
          ` : `
            <button class="btn primary-btn btn-sm btn-check" data-id="${habit.id}" style="padding: 6px 12px; font-size: 11px; font-weight: 800;">Check Off ⚔️</button>
            <button class="btn secondary-btn btn-sm btn-miss" data-id="${habit.id}" style="padding: 6px 10px; font-size: 11px; color: #f87171; border-color: rgba(239,68,68,0.3);">Miss 💥</button>
          `}
          <button class="btn secondary-btn btn-sm btn-delete" data-id="${habit.id}" style="padding: 6px 8px;" title="Delete Habit"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  if (window.lucide) window.lucide.createIcons();

  // Attach listeners
  container.querySelectorAll('.btn-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      checkOffHabit(id);
    });
  });

  container.querySelectorAll('.btn-miss').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      missHabit(id);
    });
  });

  container.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteHabit(id);
    });
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// Add new habit record
function addNewHabit() {
  const nameInput = document.getElementById('habit-name-input');
  const difficultyInput = document.getElementById('habit-difficulty');
  if (!nameInput) return;
  const name = nameInput.value.trim();
  if (!name) return;
  const difficulty = difficultyInput ? difficultyInput.value : 'medium';

  if (!Array.isArray(state.habits)) {
    state.habits = [];
  }

  const newHabit = {
    id: `habit_${Date.now()}`,
    name: name,
    difficulty: difficulty,
    streak: 0,
    earnedBadges: [],
    lastCompleted: ''
  };

  state.habits.push(newHabit);
  window.state = state;
  saveState();
  renderHabitsList();

  const form = document.getElementById('habit-form');
  if (form) form.reset();
  document.getElementById('habit-form-panel')?.classList.add('hidden');
}

// Check off habit completion (rewards XP/coins + streak milestone check)
function checkOffHabit(id) {
  const appState = (window.state && typeof window.state === 'object' && Array.isArray(window.state.habits)) ? window.state : state;
  const habit = (appState.habits || []).find(h => h.id === id);
  if (!habit) return;

  if (!Array.isArray(habit.earnedBadges)) {
    habit.earnedBadges = [];
  }

  habit.streak += 1;
  habit.lastCompleted = new Date().toDateString(); // mark completed for today

  // Update overall streak achievement
  if (habit.streak > state.stats.maxHabitStreak) {
    state.stats.maxHabitStreak = habit.streak;
  }

  // Compute rewards based on difficulty
  let xpGain = 0;
  let coinGain = 0;

  if (habit.difficulty === 'easy') {
    xpGain = 15;
    coinGain = 5;
  } else if (habit.difficulty === 'medium') {
    xpGain = 30;
    coinGain = 10;
  } else if (habit.difficulty === 'hard') {
    xpGain = 50;
    coinGain = 15;
  }

  // Streak booster: +2 XP per day of streak
  const streakBonus = habit.streak * 2;
  xpGain += streakBonus;

  let milestoneMsg = '';
  STREAK_MILESTONES.forEach(ms => {
    if (habit.streak >= ms.days && !habit.earnedBadges.includes(ms.label)) {
      habit.earnedBadges.push(ms.label);
      coinGain += ms.bonusCoins;
      milestoneMsg = `🔥 ${ms.days}-Day Streak Milestone! +${ms.bonusCoins} Coins bonus & '${ms.label}' badge earned!`;
    }
  });

  addXP(xpGain);
  addCoins(coinGain);
  window.state = state;
  saveState();
  updateUI();
  renderHabitsList();

  if (milestoneMsg) {
    alert(milestoneMsg);
  }
}

// Miss habit (breaks streak, inflicts HP damage)
function missHabit(id) {
  const appState = (window.state && typeof window.state === 'object' && Array.isArray(window.state.habits)) ? window.state : state;
  const habit = (appState.habits || []).find(h => h.id === id);
  if (!habit) return;

  // Break streak
  habit.streak = 0;

  // Compute damage taken
  let damage = 0;
  if (habit.difficulty === 'easy') {
    damage = 5;
  } else if (habit.difficulty === 'medium') {
    damage = 15;
  } else if (habit.difficulty === 'hard') {
    damage = 30;
  }

  const hpBefore = appState.hp || 100;

  takeDamage(damage);
  saveState();
  updateUI();
  renderHabitsList();

  if (hpBefore > damage) {
    alert(`💥 Streak broken on "${habit.name}"! You took ${damage} HP damage.`);
  }
}

function deleteHabit(id) {
  if (confirm('Delete this habit challenge?')) {
    const appState = (window.state && typeof window.state === 'object' && Array.isArray(window.state.habits)) ? window.state : state;
    appState.habits = (appState.habits || []).filter(h => h.id !== id);
    state.habits = appState.habits;
    saveState();
    renderHabitsList();
  }
}

// Helper to determine if date is today
function isCompleted(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toDateString();
  return dateStr === today;
}
