/* ============================================================
   ScholarQuest — StudySync Real-Time Multiplayer Module
   Powered by Socket.io & Local Cross-Tab Real-Time Sync Engine
   ============================================================ */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
import { FULL_QUIZ_BANK } from './quiz.js';

// Socket.io Client Instance
let socket = null;
const broadcastChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('scholarquest_studysync') : null;

// Local Cross-Tab Storage Room Engine
const ROOM_STORAGE_PREFIX = 'sq_room_';

/**
 * Returns a unique, persistent userId for this browser session.
 * Priority: sq_user_id (set by auth on login) → generated device ID stored in sq_device_id.
 * This guarantees two different users on different devices/origins never share the same userId.
 */
function getMyUserId() {
  // Auth userId set at login (via auth.setUserId in api.js)
  const authId = localStorage.getItem('sq_user_id');
  if (authId && authId.trim() !== '') return authId;

  // Fallback: persistent device ID generated once per browser, stored in localStorage
  let deviceId = localStorage.getItem('sq_device_id');
  if (!deviceId) {
    deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('sq_device_id', deviceId);
  }
  return deviceId;
}

function getMyUsername() {
  return state.username || localStorage.getItem('sq_username') || 'Scholar';
}

function getLocalRoom(joinCode) {
  if (!joinCode) return null;
  try {
    const raw = localStorage.getItem(ROOM_STORAGE_PREFIX + joinCode.toUpperCase());
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveLocalRoom(roomObj) {
  if (!roomObj || !roomObj.joinCode) return;
  try {
    const code = roomObj.joinCode.toUpperCase();
    localStorage.setItem(ROOM_STORAGE_PREFIX + code, JSON.stringify(roomObj));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'roomSync', joinCode: code });
    }
  } catch (e) {}
}

// Session State
let currentRoomId = null;
let currentJoinCode = null;
let isHost = false;
let roomMembersList = [];
let currentActivityQuestions = [];
let currentQuestionIndex = 0;
let myCurrentScore = 0;

export function initStudySync() {
  initSocketConnection();
  setupBroadcastChannel();
  setupLobbyEvents();
  setupRoomEvents();
}

function setupBroadcastChannel() {
  if (!broadcastChannel) return;
  broadcastChannel.onmessage = (event) => {
    const data = event.data;
    if (!data || !currentJoinCode) return;

    if (data.type === 'roomSync' && data.joinCode === currentJoinCode) {
      syncRoomFromStorage(data.joinCode);
    }
  };
}

function syncRoomFromStorage(joinCode) {
  const room = getLocalRoom(joinCode);
  if (!room) return;

  const currentUserId = getMyUserId();
  isHost = (room.hostUserId === currentUserId);
  roomMembersList = room.members || [];

  updateRoomHeaderUI(room.joinCode, roomMembersList.length, 15);
  updateHostControlsUI(isHost);
  renderMembersList(roomMembersList, room.hostUserId);
  renderLiveLeaderboard(roomMembersList);

  // Sync Activity if active
  if (room.activeActivity) {
    currentActivityQuestions = room.activeActivity.questions || [];
    currentQuestionIndex = room.activeActivity.currentIndex || 0;

    document.getElementById('battle-lobby-pane')?.classList.add('hidden');
    document.getElementById('battle-active-pane')?.classList.remove('hidden');
    document.getElementById('battle-finished-pane')?.classList.add('hidden');
    switchRoomTab('battle');

    if (currentActivityQuestions[currentQuestionIndex]) {
      renderSyncedQuestion(currentActivityQuestions[currentQuestionIndex]);
    }
  }

  // Sync Chat Messages
  if (room.chatHistory && room.chatHistory.length) {
    const container = document.getElementById('chat-messages');
    if (container) {
      container.innerHTML = '';
      room.chatHistory.forEach(msg => {
        const isSelf = (msg.userId === currentUserId);
        const type = isSelf ? 'self' : (msg.sender === 'System' ? 'system' : 'other');
        injectChatMessage(isSelf ? 'You' : msg.sender, msg.text, type);
      });
    }
  }
}

function initSocketConnection() {
  if (typeof io !== 'undefined') {
    try {
      socket = io('http://localhost:3000', {
        transports: ['websocket', 'polling'],
        autoConnect: true,
        timeout: 2000
      });

      socket.on('connect', () => {
        console.log('[StudySync Socket] Connected to real-time server:', socket.id);
        if (currentRoomId && state) {
          const userId = state.id || state.username || 'scholar_user';
          const username = state.username || localStorage.getItem('sq_username') || 'Scholar';
          socket.emit('room:reconnect', {
            roomId: currentRoomId,
            userId: userId,
            username: username,
            avatar: state.avatar ? state.avatar.id || 'peasant' : 'peasant'
          });
        }
      });

      socket.on('disconnect', () => {
        console.warn('[StudySync Socket] Disconnected from real-time server');
      });

      socket.on('room:error', (data) => {
        const msg = (data && data.error) ? data.error : 'An error occurred with StudySync.';
        showErrorBanner(msg);
      });

      socket.on('room:created', (data) => {
        if (data && data.success) handleEnterRoom(data);
      });

      socket.on('room:joined', (data) => {
        if (data && data.success) handleEnterRoom(data);
      });

      socket.on('room:reconnected', (data) => {
        if (data && data.success) handleEnterRoom(data);
      });

      socket.on('room:memberUpdate', (data) => {
        if (!data) return;
        const { roomId, joinCode, hostUserId, members, maxMembers = 15 } = data;
        if (currentRoomId && roomId !== currentRoomId) return;

        roomMembersList = members || [];
        const currentUserId = getMyUserId();
        isHost = (hostUserId === currentUserId);

        updateRoomHeaderUI(joinCode || currentJoinCode, roomMembersList.length, maxMembers);
        updateHostControlsUI(isHost);
        renderMembersList(roomMembersList, hostUserId);
        renderLiveLeaderboard(roomMembersList);
      });

      socket.on('room:chat', (data) => {
        if (!data || !data.text) return;
        if (currentRoomId && data.roomId && data.roomId !== currentRoomId) return;

        const currentUserId = getMyUserId();
        const isSelf = (data.userId === currentUserId);
        const type = isSelf ? 'self' : (data.sender === 'System' ? 'system' : 'other');

        injectChatMessage(isSelf ? 'You' : data.sender, data.text, type);
      });

      socket.on('activity:started', (data) => {
        if (!data) return;
        const { questions } = data;
        currentActivityQuestions = questions || [];
        currentQuestionIndex = 0;

        document.getElementById('battle-lobby-pane')?.classList.add('hidden');
        document.getElementById('battle-active-pane')?.classList.remove('hidden');
        document.getElementById('battle-finished-pane')?.classList.add('hidden');

        switchRoomTab('battle');
        renderSyncedQuestion(currentActivityQuestions[0]);
      });

      socket.on('activity:scoreUpdate', (data) => {
        if (data && data.leaderboard) {
          renderLiveLeaderboard(data.leaderboard);
        }
      });

      socket.on('activity:questionChanged', (data) => {
        if (!data) return;
        const { currentIndex, question } = data;
        currentQuestionIndex = currentIndex;
        renderSyncedQuestion(question);
      });
    } catch (e) {
      console.log('[StudySync] Running in local offline mode');
    }
  }
}

// ── Lobby Setup ─────────────────────────────────────────────────────────────
function setupLobbyEvents() {
  const joinBtn = document.getElementById('btn-join-room');
  const createBtn = document.getElementById('btn-create-room');
  const codeInput = document.getElementById('room-code-input');

  if (codeInput) {
    codeInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
    codeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleJoinClick();
    });
  }

  if (joinBtn) {
    joinBtn.addEventListener('click', handleJoinClick);
  }

  if (createBtn) {
    createBtn.addEventListener('click', handleCreateClick);
  }
}

function handleCreateClick() {
  hideErrorBanner();
  const userId = getMyUserId();
  const username = getMyUsername();
  const avatar = state.avatar ? state.avatar.id || 'peasant' : 'peasant';

  if (socket && socket.connected) {
    socket.emit('room:create', { userId, username, avatar });
  } else {
    // Real-time Local Cross-Tab Room Creation
    const randomCode = 'SQ' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const roomObj = {
      success: true,
      roomId: 'room_' + randomCode,
      joinCode: randomCode,
      hostUserId: userId,
      hostUsername: username,
      members: [
        { userId, user_id: userId, username, avatar, score: 0, is_connected: true, isHost: true }
      ],
      activeActivity: null,
      chatHistory: [
        { sender: 'System', text: `Connected to Real-Time StudySync Room [${randomCode}]. Welcome!`, userId: 'system' }
      ]
    };

    saveLocalRoom(roomObj);
    handleEnterRoom(roomObj);
  }
}

function handleJoinClick() {
  hideErrorBanner();
  const codeInput = document.getElementById('room-code-input');
  const code = (codeInput?.value || '').trim().toUpperCase();

  if (!code || code.length !== 6) {
    showErrorBanner('Please enter a 6-character Join Code (e.g. SQ8A9F).');
    return;
  }

  const userId = getMyUserId();
  const username = getMyUsername();
  const avatar = state.avatar ? state.avatar.id || 'peasant' : 'peasant';

  if (socket && socket.connected) {
    socket.emit('room:join', { joinCode: code, userId, username, avatar });
  } else {
    // Look up room state in local storage or create joined room
    let roomObj = getLocalRoom(code);
    if (!roomObj) {
      roomObj = {
        success: true,
        roomId: 'room_' + code,
        joinCode: code,
        hostUserId: 'host_offline',
        hostUsername: 'Host (Offline)',
        members: [
          { userId: 'host_offline', user_id: 'host_offline', username: 'Host (Offline)', avatar: 'scholar', score: 0, is_connected: true, isHost: true }
        ],
        activeActivity: null,
        chatHistory: [
          { sender: 'System', text: `Connected to Real-Time StudySync Room [${code}]. Welcome!`, userId: 'system' }
        ]
      };
    }

    // Add current joining user to room members if not present
    if (!roomObj.members.some(m => m.userId === userId || m.user_id === userId || m.username === username)) {
      roomObj.members.push({
        userId,
        user_id: userId,
        username,
        avatar,
        score: 0,
        is_connected: true
      });
      roomObj.chatHistory.push({
        sender: 'System',
        text: `🧙 ${username} joined the room!`,
        userId: 'system'
      });
    }

    saveLocalRoom(roomObj);
    handleEnterRoom(roomObj);
  }
}

// ── Room Events & Interaction Setup ─────────────────────────────────────────
function setupRoomEvents() {
  document.getElementById('btn-leave-room')?.addEventListener('click', leaveRoom);
  document.getElementById('btn-copy-code')?.addEventListener('click', copyJoinCode);

  // Chat send listeners
  document.getElementById('btn-send-chat')?.addEventListener('click', sendChatMessage);
  document.getElementById('chat-input-field')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // Tab switching (Chat vs Activity)
  const tabs = document.querySelectorAll('.room-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchRoomTab(target);
    });
  });

  // Host Activity Controls
  document.getElementById('btn-start-quiz-battle')?.addEventListener('click', () => {
    if (!currentRoomId || !isHost) return;
    const moduleSelect = document.getElementById('activity-module-select');
    const activityType = moduleSelect ? moduleSelect.value : 'quizforge';

    if (socket && socket.connected) {
      socket.emit('activity:start', { roomId: currentRoomId, activityType });
    } else {
      const room = getLocalRoom(currentJoinCode);
      if (room) {
        const pool = FULL_QUIZ_BANK || [
          { q: "Which protocol secures Web Sockets and HTTP connections?", options: ["HTTPS/TLS", "FTP", "UDP", "Telnet"], answerIndex: 0 },
          { q: "What is the Big-O time complexity of Binary Search?", options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"], answerIndex: 1 },
          { q: "In Python, which keyword defines an asynchronous function?", options: ["async def", "thread", "def async", "sync"], answerIndex: 0 }
        ];

        const questions = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
        room.activeActivity = {
          type: activityType,
          questions,
          currentIndex: 0
        };
        saveLocalRoom(room);
        syncRoomFromStorage(currentJoinCode);
      }
    }
  });

  document.getElementById('btn-reset-battle')?.addEventListener('click', resetBattleLobby);
}

function switchRoomTab(tabTarget) {
  const tabs = document.querySelectorAll('.room-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabTarget) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  const chatPane = document.getElementById('room-chat-tab');
  const battlePane = document.getElementById('room-battle-tab');

  if (tabTarget === 'chat') {
    chatPane?.classList.add('active');
    battlePane?.classList.remove('active');
  } else {
    chatPane?.classList.remove('active');
    battlePane?.classList.add('active');
  }
}

// ── Room Flow Management ─────────────────────────────────────────────────────
function handleEnterRoom(data) {
  currentRoomId = data.roomId;
  currentJoinCode = data.joinCode;
  const currentUserId = getMyUserId();
  isHost = (data.hostUserId === currentUserId);
  roomMembersList = data.members || [];

  // Toggle UI panels
  document.getElementById('sync-lobby-panel')?.classList.add('hidden');
  document.getElementById('sync-room-panel')?.classList.remove('hidden');

  updateRoomHeaderUI(data.joinCode, roomMembersList.length, 15);
  updateHostControlsUI(isHost);
  renderMembersList(roomMembersList, data.hostUserId);
  renderLiveLeaderboard(roomMembersList);

  if (!socket || !socket.connected) {
    syncRoomFromStorage(data.joinCode);
  }
}

function leaveRoom() {
  if (currentRoomId && socket) {
    socket.emit('room:leave', { roomId: currentRoomId, userId: getMyUserId() });
  }

  currentRoomId = null;
  currentJoinCode = null;
  isHost = false;
  roomMembersList = [];

  document.getElementById('sync-room-panel')?.classList.add('hidden');
  document.getElementById('sync-lobby-panel')?.classList.remove('hidden');

  hideErrorBanner();
  resetBattleLobby();
}

function copyJoinCode() {
  if (!currentJoinCode) return;
  navigator.clipboard.writeText(currentJoinCode).then(() => {
    const btn = document.getElementById('btn-copy-code');
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      setTimeout(() => { btn.innerHTML = origText; }, 2000);
    }
  }).catch(() => {
    alert(`Room Join Code: ${currentJoinCode}`);
  });
}

function updateRoomHeaderUI(code, count, max = 15) {
  const codeEl = document.getElementById('room-id-display');
  if (codeEl) codeEl.innerText = `Room Code: ${code}`;

  const countEl = document.getElementById('room-occupant-count');
  if (countEl) countEl.innerText = `${count}/${max} Members`;
}

function updateHostControlsUI(hostState) {
  const hostBar = document.getElementById('host-controls-bar');
  const startBtn = document.getElementById('btn-start-quiz-battle');

  if (hostBar) {
    hostBar.style.display = hostState ? 'flex' : 'none';
  }
  if (startBtn) {
    if (hostState) {
      startBtn.removeAttribute('disabled');
      startBtn.innerText = 'Start Shared Activity 🚀';
    } else {
      startBtn.setAttribute('disabled', 'true');
      startBtn.innerText = 'Waiting for Host to Start... ⏳';
    }
  }
}

// ── Render Connected Members Grid ───────────────────────────────────────────
function renderMembersList(members, hostUserId) {
  const container = document.getElementById('squad-members-container');
  if (!container) return;
  container.innerHTML = '';

  const currentUserId = getMyUserId();

  members.forEach(mem => {
    const isMe = (mem.user_id === currentUserId || mem.userId === currentUserId);
    const isMemberHost = (mem.user_id === hostUserId || mem.userId === hostUserId || mem.isHost);
    const isConnected = mem.is_connected !== false;

    const displayName = mem.username || mem.name || (isMe ? (state.username || 'Scholar') : 'Scholar Member');

    const el = document.createElement('div');
    el.className = `squad-member ${!isConnected ? 'disconnected' : ''}`;
    el.style.cssText = `
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 12px; background: ${isMe ? 'rgba(245,158,11,0.15)' : 'rgba(20,16,11,0.6)'};
      border: 1px solid ${isMe ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.12)'};
      border-radius: 12px; margin-bottom: 8px; transition: all 0.2s ease;
      opacity: ${isConnected ? 1 : 0.55};
    `;

    el.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">${isMemberHost ? '👑' : '🧙'}</span>
        <div>
          <div style="font-size: 12px; font-weight: 800; color: ${isMe ? '#f59e0b' : '#f5e8d7'}; display: flex; align-items: center; gap: 6px;">
            <span>${displayName} ${isMe ? '(You)' : ''}</span>
            ${isMemberHost ? '<span style="font-size: 9px; background: #f59e0b; color: #000; font-weight: 900; padding: 1px 5px; border-radius: 4px;">HOST</span>' : ''}
          </div>
          <div style="font-size: 10px; color: ${isConnected ? '#10b981' : '#ef4444'}; margin-top: 1px;">
            ${isConnected ? '● Connected' : '⏳ Disconnected (60s grace)'}
          </div>
        </div>
      </div>
      <div style="font-size: 12px; font-weight: 800; color: #fbbf24;">
        ${mem.score || 0} pts
      </div>
    `;

    container.appendChild(el);
  });
}

// ── Real-Time Room Leaderboard ──────────────────────────────────────────────
function renderLiveLeaderboard(members) {
  const container = document.getElementById('battle-standing-list');
  if (!container) return;
  container.innerHTML = '';

  const currentUserId = getMyUserId();
  const sortedMembers = [...(members || [])].sort((a, b) => (b.score || 0) - (a.score || 0));

  sortedMembers.forEach((mem, idx) => {
    const isMe = (mem.user_id === currentUserId || mem.userId === currentUserId);
    const displayName = mem.username || mem.name || (isMe ? (state.username || 'Scholar') : 'Scholar Member');

    const row = document.createElement('div');
    row.className = `battle-standing-row ${isMe ? 'self' : ''}`;
    row.style.cssText = `
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 12px; background: ${isMe ? 'rgba(245,158,11,0.2)' : 'rgba(12,10,7,0.5)'};
      border: 1px solid ${isMe ? '#f59e0b' : 'rgba(245,158,11,0.1)'};
      border-radius: 8px; margin-bottom: 6px; font-size: 12px; font-weight: 800;
    `;

    const rankMedal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));

    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 13px;">${rankMedal}</span>
        <span style="color: ${isMe ? '#f59e0b' : '#f5e8d7'};">${displayName}</span>
      </div>
      <span style="color: #fbbf24;">${mem.score || 0} pts</span>
    `;

    container.appendChild(row);
  });
}

// ── Synchronized Activity Runner ────────────────────────────────────────────
function renderSyncedQuestion(questionObj) {
  if (!questionObj) return;

  const titleEl = document.getElementById('battle-question-title');
  if (titleEl) titleEl.innerText = questionObj.text || questionObj.q || 'Synchronized Question';

  const optionsContainer = document.getElementById('battle-options-container');
  if (!optionsContainer) return;
  optionsContainer.innerHTML = '';

  const options = questionObj.options || [];
  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.style.cssText = `
      padding: 12px 16px; background: rgba(20,16,11,0.7); border: 1px solid rgba(245,158,11,0.25);
      border-radius: 10px; color: #f5e8d7; font-weight: 700; cursor: pointer; text-align: left;
      transition: all 0.2s ease; margin-bottom: 8px; width: 100%; outline: none;
    `;

    btn.addEventListener('click', () => submitSyncedAnswer(btn, idx, questionObj));
    optionsContainer.appendChild(btn);
  });
}

function submitSyncedAnswer(btn, selectionIdx, questionObj) {
  const optionsContainer = document.getElementById('battle-options-container');
  if (!optionsContainer) return;

  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);

  const isCorrect = (selectionIdx === questionObj.answerIndex || selectionIdx === questionObj.answer);
  const userId = getMyUserId();

  if (isCorrect) {
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    btn.style.borderColor = '#10b981';
    myCurrentScore += 100;
  } else {
    btn.style.background = 'linear-gradient(135deg, #991b1b, #ef4444)';
    btn.style.borderColor = '#ef4444';
  }

  // Submit answer real-time to Socket server or local state
  if (socket && socket.connected && currentRoomId) {
    socket.emit('activity:answerSubmitted', {
      roomId: currentRoomId,
      userId,
      questionId: questionObj.id,
      selectionIdx,
      isCorrect
    });
  } else {
    const room = getLocalRoom(currentJoinCode);
    if (room) {
      const myMem = room.members.find(m => m.userId === userId || m.user_id === userId);
      if (myMem) {
        myMem.score = (myMem.score || 0) + (isCorrect ? 100 : 0);
      }
      saveLocalRoom(room);
      syncRoomFromStorage(currentJoinCode);
    }
  }

  // Advance question after 1.8s delay
  setTimeout(() => {
    if (isHost) {
      if (socket && socket.connected && currentRoomId) {
        const nextIdx = currentQuestionIndex + 1;
        if (nextIdx < currentActivityQuestions.length) {
          currentQuestionIndex = nextIdx;
          const nextQ = currentActivityQuestions[nextIdx];
          socket.emit('activity:nextQuestion', {
            roomId: currentRoomId,
            nextIndex: nextIdx,
            question: nextQ
          });
          renderSyncedQuestion(nextQ);
        } else {
          finishActivity();
        }
      } else {
        const room = getLocalRoom(currentJoinCode);
        if (room && room.activeActivity) {
          const nextIdx = room.activeActivity.currentIndex + 1;
          if (nextIdx < room.activeActivity.questions.length) {
            room.activeActivity.currentIndex = nextIdx;
            saveLocalRoom(room);
            syncRoomFromStorage(currentJoinCode);
          } else {
            finishActivity();
          }
        } else {
          const nextIdx = currentQuestionIndex + 1;
          if (nextIdx < currentActivityQuestions.length) {
            currentQuestionIndex = nextIdx;
            renderSyncedQuestion(currentActivityQuestions[nextIdx]);
          } else {
            finishActivity();
          }
        }
      }
    }
  }, 1800);
}

function finishActivity() {
  document.getElementById('battle-active-pane')?.classList.add('hidden');
  const finishedPane = document.getElementById('battle-finished-pane');
  finishedPane?.classList.remove('hidden');

  const winnerText = document.getElementById('battle-winner-text');
  if (winnerText) {
    winnerText.innerText = `Activity Complete! Final Score: ${myCurrentScore} pts`;
  }

  addXP(40);
  addCoins(15);
  saveState();
  updateUI();
}

function resetBattleLobby() {
  document.getElementById('battle-finished-pane')?.classList.add('hidden');
  document.getElementById('battle-active-pane')?.classList.add('hidden');
  document.getElementById('battle-lobby-pane')?.classList.remove('hidden');
  myCurrentScore = 0;

  if (currentJoinCode) {
    const room = getLocalRoom(currentJoinCode);
    if (room) {
      room.activeActivity = null;
      saveLocalRoom(room);
    }
  }
}

// ── Chat Functions ──────────────────────────────────────────────────────────
function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input?.value.trim();
  if (!text) return;

  const senderName = getMyUsername();
  const userId = getMyUserId();
  input.value = '';

  if (socket && socket.connected && currentRoomId) {
    socket.emit('room:chat', { roomId: currentRoomId, message: text, sender: senderName, userId });
  } else if (currentJoinCode) {
    const room = getLocalRoom(currentJoinCode);
    if (room) {
      if (!room.chatHistory) room.chatHistory = [];
      room.chatHistory.push({
        sender: senderName,
        text,
        userId
      });
      saveLocalRoom(room);
      syncRoomFromStorage(currentJoinCode);
    } else {
      injectChatMessage('You', text, 'self');
    }
  }
}

function injectChatMessage(sender, text, type) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  msg.style.cssText = `
    margin-bottom: 8px; padding: 8px 12px; border-radius: 10px;
    background: ${type === 'self' ? 'rgba(245,158,11,0.2)' : 'rgba(20,16,11,0.6)'};
    border: 1px solid ${type === 'self' ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.1)'};
    max-width: 85%; align-self: ${type === 'self' ? 'flex-end' : 'flex-start'};
  `;
  msg.innerHTML = `
    <div style="font-size: 10px; font-weight: 800; color: #f59e0b; margin-bottom: 2px;">${sender}</div>
    <div style="font-size: 12px; color: #f5e8d7;">${text}</div>
  `;

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// ── UI Error Banners ────────────────────────────────────────────────────────
function showErrorBanner(msg) {
  const banner = document.getElementById('sync-error-banner');
  if (banner) {
    banner.innerText = msg;
    banner.classList.remove('hidden');
    banner.style.display = 'block';
  } else {
    alert(msg);
  }
}

function hideErrorBanner() {
  const banner = document.getElementById('sync-error-banner');
  if (banner) {
    banner.classList.add('hidden');
    banner.style.display = 'none';
  }
}
