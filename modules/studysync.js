/* ==========================================
   ScholarQuest StudySync Module
   Real-time chat loop and multiplayer simulator
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';

// Mock Squad Members
const MOCK_MEMBERS = [
  { name: 'DSA_Princess', avatar: '🧝‍♀️', status: 'Focusing 🔴', score: 0 },
  { name: 'ByteWizard', avatar: '🧙‍♂️', status: 'Idle 💤', score: 0 },
  { name: 'MSc_Queen', avatar: '👩‍💻', status: 'Ready 🛡️', score: 0 }
];

// Mock Squad Chat phrases
const MOCK_CHAT_PHRASES = [
  "Hey squad! Let's get down to business.",
  "Just started a 25-minute Pomodoro. Join me!",
  "Who is up for a Quiz Battle in 5 minutes?",
  "This DSA lesson is hard but we can do it!",
  "XP boosters are so worth it, just unlocked the wizard staff!",
  "Let's focus up! 🚀"
];

// Battle questions
const BATTLE_QUESTIONS = [
  {
    q: 'Which protocol is used to transmit data securely over the web?',
    options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
    answer: 1 // HTTPS
  },
  {
    q: 'In database systems, what does the "A" in ACID stand for?',
    options: ['Atomicity', 'Algorithm', 'Access', 'Allocation'],
    answer: 0 // Atomicity
  },
  {
    q: 'Which of the following is an linear data structure?',
    options: ['Tree', 'Graph', 'Linked List', 'Trie'],
    answer: 2 // Linked List
  }
];

let activeRoomCode = null;
let chatTimer = null;
let roomTimer = null;
let roomTimeRemaining = 25 * 60;

// Battle state
let battleActive = false;
let battleQuestionIndex = 0;
let battleScore = 0;
let oppTimer = null;

export function initStudySync() {
  setupLobbyEvents();
  setupRoomEvents();
}

function setupLobbyEvents() {
  const joinBtn = document.getElementById('btn-join-room');
  const createBtn = document.getElementById('btn-create-room');
  
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      const code = document.getElementById('room-code-input').value.trim().toUpperCase();
      if (/^SCQ-\d{4}$/.test(code)) {
        enterRoom(code);
      } else {
        alert('Invalid Room Code format. Use SCQ-XXXX (e.g. SCQ-4829)');
      }
    });
  }
  
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      const randomCode = `SCQ-${Math.floor(1000 + Math.random() * 9000)}`;
      enterRoom(randomCode);
    });
  }
}

function setupRoomEvents() {
  document.getElementById('btn-leave-room').addEventListener('click', leaveRoom);
  document.getElementById('btn-send-chat').addEventListener('click', sendChatMessage);
  
  // Room keypress listener
  document.getElementById('chat-input-field').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
  
  // Tab triggers
  const tabs = document.querySelectorAll('.room-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.getAttribute('data-tab');
      const chatPane = document.getElementById('room-chat-tab');
      const battlePane = document.getElementById('room-battle-tab');
      
      if (target === 'chat') {
        chatPane.classList.add('active');
        battlePane.classList.remove('active');
      } else {
        chatPane.classList.remove('active');
        battlePane.classList.add('active');
      }
    });
  });
  
  // Battle start
  document.getElementById('btn-start-quiz-battle').addEventListener('click', startBattle);
  document.getElementById('btn-reset-battle').addEventListener('click', resetBattleLobby);
}

// Enter Room Flow
function enterRoom(code) {
  activeRoomCode = code;
  
  // Toggle screens
  document.getElementById('sync-lobby-panel').classList.add('hidden');
  document.getElementById('sync-room-panel').classList.remove('hidden');
  
  document.getElementById('room-id-display').innerText = `Room: ${code}`;
  
  // Render members list
  renderMembers();
  
  // Start group Pomodoro simulation
  startRoomTimer();
  
  // Start mock chat updates
  startMockChat();
  
  // Initial system message
  injectChatMessage('System', `You joined StudySync Room ${code}. Warm up your fingers!`, 'other');
}

function leaveRoom() {
  activeRoomCode = null;
  clearInterval(roomTimer);
  clearInterval(chatTimer);
  clearInterval(oppTimer);
  
  document.getElementById('sync-room-panel').classList.add('hidden');
  document.getElementById('sync-lobby-panel').classList.remove('hidden');
  
  // Reset tabs
  const chatPane = document.getElementById('room-chat-tab');
  const battlePane = document.getElementById('room-battle-tab');
  chatPane.classList.add('active');
  battlePane.classList.remove('active');
  
  const tabs = document.querySelectorAll('.room-tab');
  tabs.forEach(t => t.classList.remove('active'));
  document.querySelector('.room-tab[data-tab="chat"]').classList.add('active');
  
  resetBattleLobby();
}

function renderMembers() {
  const container = document.getElementById('squad-members-container');
  if (!container) return;
  container.innerHTML = '';
  
  // Add self
  const myRank = state.level >= 3 ? (state.level >= 7 ? 'Coder' : 'Apprentice') : 'Peasant';
  const selfEl = document.createElement('div');
  selfEl.className = 'squad-member';
  selfEl.innerHTML = `
    <span class="member-avatar">🧙</span>
    <div class="member-info">
      <span class="member-name">You (Scholar)</span>
      <span class="member-status focusing">Studying ⚡</span>
    </div>
  `;
  container.appendChild(selfEl);
  
  // Add mock members
  MOCK_MEMBERS.forEach(mem => {
    const el = document.createElement('div');
    el.className = 'squad-member';
    el.innerHTML = `
      <span class="member-avatar">${mem.avatar}</span>
      <div class="member-info">
        <span class="member-name">${mem.name}</span>
        <span class="member-status">${mem.status}</span>
      </div>
    `;
    container.appendChild(el);
  });
}

function startRoomTimer() {
  roomTimeRemaining = 25 * 60;
  clearInterval(roomTimer);
  
  roomTimer = setInterval(() => {
    roomTimeRemaining--;
    if (roomTimeRemaining < 0) roomTimeRemaining = 25 * 60; // loop
    
    const m = Math.floor(roomTimeRemaining / 60);
    const s = roomTimeRemaining % 60;
    document.getElementById('room-timer-display').innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, 1000);
}

// Simulated active chat messages
function startMockChat() {
  clearInterval(chatTimer);
  chatTimer = setInterval(() => {
    const peer = MOCK_MEMBERS[Math.floor(Math.random() * MOCK_MEMBERS.length)];
    const text = MOCK_CHAT_PHRASES[Math.floor(Math.random() * MOCK_CHAT_PHRASES.length)];
    
    injectChatMessage(peer.name, text, 'other');
  }, 12000);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;
  
  injectChatMessage('You', text, 'self');
  input.value = '';
}

function injectChatMessage(sender, text, type) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  msg.innerHTML = `
    <span class="chat-sender">${sender}</span>
    <span class="chat-text">${text}</span>
  `;
  
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight; // autoscroll
}

/* ========================================================
   QUIZ BATTLE MULTIPLAYER SIMULATOR
   ======================================================== */

function startBattle() {
  battleActive = true;
  battleQuestionIndex = 0;
  battleScore = 0;
  
  // Reset standings
  MOCK_MEMBERS.forEach(mem => mem.score = 0);
  
  document.getElementById('battle-lobby-pane').classList.add('hidden');
  document.getElementById('battle-active-pane').classList.remove('hidden');
  document.getElementById('battle-finished-pane').classList.add('hidden');
  
  loadBattleQuestion();
  simulateOpponentsScoring();
}

function loadBattleQuestion() {
  const qObj = BATTLE_QUESTIONS[battleQuestionIndex];
  document.getElementById('battle-question-title').innerText = qObj.q;
  
  const container = document.getElementById('battle-options-container');
  container.innerHTML = '';
  
  qObj.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.addEventListener('click', () => submitBattleAnswer(btn, idx));
    container.appendChild(btn);
  });
  
  updateStandingsList();
}

function submitBattleAnswer(btn, selectionIdx) {
  const qObj = BATTLE_QUESTIONS[battleQuestionIndex];
  const allBtns = document.querySelectorAll('#battle-options-container .option-btn');
  allBtns.forEach(b => b.disabled = true);
  
  if (selectionIdx === qObj.answer) {
    btn.classList.add('correct');
    battleScore += 100; // base score
  } else {
    btn.classList.add('incorrect');
    // highlight correct
    allBtns[qObj.answer].classList.add('correct');
  }
  
  setTimeout(() => {
    advanceBattle();
  }, 1800);
}

function simulateOpponentsScoring() {
  clearInterval(oppTimer);
  oppTimer = setInterval(() => {
    if (!battleActive) return;
    
    // Randomly increase opponent scores representing dynamic speed attempts
    MOCK_MEMBERS.forEach(mem => {
      if (Math.random() > 0.45) {
        mem.score += Math.random() > 0.3 ? 100 : 0; // standard correct point
      }
    });
    updateStandingsList();
  }, 1000);
}

function updateStandingsList() {
  const container = document.getElementById('battle-standing-list');
  if (!container) return;
  container.innerHTML = '';
  
  const standings = [
    { name: 'You', score: battleScore, self: true },
    ...MOCK_MEMBERS
  ].sort((a, b) => b.score - a.score);
  
  standings.forEach((row, idx) => {
    const el = document.createElement('div');
    el.className = `battle-standing-row ${row.self ? 'self' : ''}`;
    el.innerHTML = `
      <span>#${idx + 1} ${row.name}</span>
      <span>${row.score} pts</span>
    `;
    container.appendChild(el);
  });
}

function advanceBattle() {
  battleQuestionIndex++;
  if (battleQuestionIndex < BATTLE_QUESTIONS.length) {
    loadBattleQuestion();
  } else {
    finishBattle();
  }
}

function finishBattle() {
  battleActive = false;
  clearInterval(oppTimer);
  
  document.getElementById('battle-active-pane').classList.add('hidden');
  const finishedPane = document.getElementById('battle-finished-pane');
  finishedPane.classList.remove('hidden');
  
  // Decide placing
  const selfScore = battleScore;
  const highOpp = Math.max(...MOCK_MEMBERS.map(m => m.score));
  
  let winText = 'You finished 2nd Place!';
  let xpReward = 20;
  let coinReward = 5;
  
  if (selfScore >= highOpp) {
    winText = '🏆 1st Place Victory! 🏆';
    xpReward = 40;
    coinReward = 15;
  } else if (selfScore < 100) {
    winText = 'Dreadful Placing! Try harder next time.';
    xpReward = 5;
    coinReward = 0;
  }
  
  document.getElementById('battle-winner-text').innerText = winText;
  
  // Display reward tags inside the finished panel
  const rewardTags = finishedPane.querySelectorAll('.reward-pill');
  if (rewardTags.length >= 2) {
    rewardTags[0].innerText = `+${xpReward} XP`;
    rewardTags[1].innerText = `+${coinReward} Coins`;
  }
  
  addXP(xpReward);
  addCoins(coinReward);
  saveState();
  updateUI();
}

function resetBattleLobby() {
  document.getElementById('battle-finished-pane').classList.add('hidden');
  document.getElementById('battle-active-pane').classList.add('hidden');
  document.getElementById('battle-lobby-pane').classList.remove('hidden');
  
  battleActive = false;
  battleQuestionIndex = 0;
  battleScore = 0;
}
