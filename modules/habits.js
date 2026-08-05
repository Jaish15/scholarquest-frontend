/* ==========================================
   ScholarQuest HabitDojo Module
   Handles habit lists, checkoffs, streak/HP logs
   ========================================== */

import { state, addXP, addCoins, takeDamage, saveState, updateUI } from '../app.js';

export function initHabits() {
  renderHabitsList();
  setupHabitsEvents();
}

function setupHabitsEvents() {
  const addHabitBtn = document.getElementById('btn-add-habit');
  const closeFormBtn = document.getElementById('btn-close-habit-form');
  const habitForm = document.getElementById('habit-form');
  
  if (addHabitBtn) {
    addHabitBtn.addEventListener('click', () => {
      document.getElementById('habit-form-panel').classList.remove('hidden');
    });
  }
  
  if (closeFormBtn) {
    closeFormBtn.addEventListener('click', () => {
      document.getElementById('habit-form-panel').classList.add('hidden');
    });
  }
  
  if (habitForm) {
    habitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewHabit();
    });
  }
}

// Render list of active habits
export function renderHabitsList() {
  const container = document.getElementById('habits-container');
  if (!container) return;
  container.innerHTML = '';
  
  if (state.habits.length === 0) {
    container.innerHTML = '<div class="empty-log">No habits created. Enter the Dojo and forge a challenge!</div>';
    return;
  }
  
  state.habits.forEach(habit => {
    const isCompletedToday = isCompleted(habit.lastCompleted);
    
    const item = document.createElement('div');
    item.className = 'habit-item';
    item.innerHTML = `
      <div class="habit-details">
        <h3 class="habit-title">${habit.name}</h3>
        <div class="habit-badge-row">
          <span class="habit-difficulty-badge diff-${habit.difficulty}">${habit.difficulty}</span>
          <span class="habit-streak-display">
            <i data-lucide="zap" style="width: 12px; height: 12px;"></i>
            <span>Streak: ${habit.streak}d</span>
          </span>
        </div>
      </div>
      <div class="habit-actions-row">
        ${isCompletedToday ? `
          <span class="quest-status">Completed Today</span>
        ` : `
          <button class="habit-btn habit-complete-btn btn-check" data-id="${habit.id}">Check Off</button>
          <button class="habit-btn habit-miss-btn btn-miss" data-id="${habit.id}">Miss Quest</button>
        `}
        <button class="habit-btn habit-delete-btn btn-delete" data-id="${habit.id}"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
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

// Add new habit record
function addNewHabit() {
  const name = document.getElementById('habit-name-input').value;
  const difficulty = document.getElementById('habit-difficulty').value;
  
  const newHabit = {
    id: `habit_${Date.now()}`,
    name: name,
    difficulty: difficulty,
    streak: 0,
    lastCompleted: ''
  };
  
  state.habits.push(newHabit);
  saveState();
  renderHabitsList();
  
  // Reset form and hide panel
  document.getElementById('habit-form').reset();
  document.getElementById('habit-form-panel').classList.add('hidden');
}

// Check off habit completion (rewards XP/coins)
function checkOffHabit(id) {
  const habit = state.habits.find(h => h.id === id);
  if (!habit) return;
  
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
  
  addXP(xpGain);
  addCoins(coinGain);
  saveState();
  updateUI();
  renderHabitsList();
}

// Miss habit (breaks streak, inflicts HP damage)
function missHabit(id) {
  const habit = state.habits.find(h => h.id === id);
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
  
  takeDamage(damage);
  saveState();
  updateUI();
  renderHabitsList();
  
  alert(`💥 Streak broken on "${habit.name}"! You took ${damage} HP damage.`);
}

function deleteHabit(id) {
  if (confirm('Delete this habit challenge?')) {
    state.habits = state.habits.filter(h => h.id !== id);
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
