/* ============================================================
   ScholarQuest — StudySync: Friends & Direct Messages Module
   Real-Time 1:1 Messaging, File Sharing (5MB cap), User Search
   ============================================================ */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
import { api, auth } from '../api.js';

// Socket.io Client Instance & Active State
let socket = null;
let activeFriend = null; // Currently open chat friend object: { id, username, level, avatar, online }
let friendsList = [];
let pendingRequests = { incoming: [], outgoing: [] };
let pendingAttachment = null; // { file, previewUrl, name, size, type }
let typingTimeout = null;

// Whitelist of allowed extensions for file sharing (5MB max)
const ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.png', '.jpg', '.jpeg', '.gif', '.webp',
  '.txt', '.md',
  '.py', '.js', '.jsx', '.ts', '.tsx', '.java', '.rb',
  '.cpp', '.c', '.cs', '.h', '.hpp',
  '.html', '.css', '.scss', '.json', '.xml', '.yaml', '.yml',
  '.go', '.rs', '.sql', '.sh', '.php', '.swift', '.kt'
]);
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

// Helper: Current User ID & Username
function getMyUserId() {
  const authId = auth.getUserId();
  if (authId && authId.trim() !== '') return authId;
  if (state && state.id) return state.id;
  let deviceId = localStorage.getItem('sq_device_id');
  if (!deviceId) {
    deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('sq_device_id', deviceId);
  }
  return deviceId;
}

function getMyUsername() {
  return (state && state.username) || localStorage.getItem('sq_username') || 'Scholar';
}

function getMyAvatar() {
  return (state && state.avatar) || { id: 'peasant' };
}

// ── 1. INITIALIZATION ────────────────────────────────────────────────────────
export function initStudySync() {
  initSocketConnection();
  setupUIEventListeners();
  loadFriendsAndRequests();
}

// ── 2. SOCKET.IO REAL-TIME CONNECTION ───────────────────────────────────────
let socketListenersInitialized = false;
let lastBattleInviteTime = 0;

function initSocketConnection() {
  if (typeof io === 'undefined') {
    console.warn('[StudySync Socket] Socket.io library not loaded.');
    return;
  }

  if (socket && socket.connected) {
    // Already connected — ensure current user is registered on socket
    const userId = getMyUserId();
    const username = getMyUsername();
    socket.emit('user:register', { userId, username });
    return;
  }

  if (socketListenersInitialized && socket) {
    return;
  }

  try {
    socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    // Remove existing event listeners to prevent duplicate listener accumulation
    socket.off('connect');
    socket.off('disconnect');
    socket.off('user:status');
    socket.off('dm:receive');
    socket.off('dm:sent');
    socket.off('dm:typing');
    socket.off('friend:request');
    socket.off('friend:response');
    socket.off('battle:invite');

    socketListenersInitialized = true;

    socket.on('connect', () => {
      console.log('📡 [StudySync Socket] Connected to real-time server:', socket.id);
      window.studySyncConnected = true;

      // Register current user on socket
      const userId = getMyUserId();
      const username = getMyUsername();
      socket.emit('user:register', { userId, username });

      // Refresh friends
      loadFriendsAndRequests();
    });

    socket.on('disconnect', () => {
      console.warn('⚠️ [StudySync Socket] Disconnected from server');
      window.studySyncConnected = false;
    });

    // Real-Time Online / Offline Status Updates
    socket.on('user:status', (data) => {
      if (!data || !data.userId) return;
      const friend = friendsList.find(f => f.id === data.userId);
      if (friend) {
        friend.online = !!data.online;
        renderFriendsList();
        if (activeFriend && activeFriend.id === data.userId) {
          activeFriend.online = !!data.online;
          updateActiveChatHeader(activeFriend);
        }
      }
    });

    // Real-Time Direct Message Received
    socket.on('dm:receive', (msg) => {
      if (!msg) return;
      handleIncomingDirectMessage(msg);
    });

    // Confirmation of Sent Message
    socket.on('dm:sent', (data) => {
      if (data && data.success && data.message) {
        // Message sent confirmation
      }
    });

    // Real-Time Typing Indicator
    socket.on('dm:typing', (data) => {
      if (!data || !activeFriend) return;
      if (data.senderId === activeFriend.id) {
        const indicator = document.getElementById('chat-typing-indicator');
        const typingUser = document.getElementById('typing-username');
        if (indicator && typingUser) {
          typingUser.textContent = activeFriend.username;
          if (data.isTyping) {
            indicator.classList.remove('hidden');
          } else {
            indicator.classList.add('hidden');
          }
        }
      }
    });

    // Real-Time Friend Request Received
    socket.on('friend:request', (data) => {
      showAlertToast(`📬 Friend request received from ${data?.user?.username || 'a scholar'}!`, 'success');
      loadFriendsAndRequests();
    });

    // Real-Time Friend Request Response (Accepted / Declined)
    socket.on('friend:response', (data) => {
      if (data && data.action === 'accept') {
        showAlertToast(`⚔️ ${data.user?.username || 'Scholar'} accepted your friend request!`, 'success');
      }
      loadFriendsAndRequests();
    });

    // Real-Time Battle Reminder Received (Centered Modal Popup)
    socket.on('battle:invite', (data) => {
      const now = Date.now();
      if (now - lastBattleInviteTime < 1000) return; // ignore duplicate emissions within 1s
      lastBattleInviteTime = now;

      const senderName = data?.senderName || 'A Scholar';
      showBattleInviteModal(senderName);
    });

  } catch (err) {
    console.error('[StudySync Socket Error]:', err.message);
  }
}

// Centered Battle Invite Modal Popup
export function showBattleInviteModal(senderName) {
  let modal = document.getElementById('battle-invite-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'battle-invite-modal';
    modal.className = 'welcome-modal-backdrop';
    document.body.appendChild(modal);
  }

  const cleanName = escapeHTML(senderName || 'A Scholar');

  modal.innerHTML = `
    <div class="welcome-modal-card animate-scale" style="border-color: #f59e0b; box-shadow: 0 0 35px rgba(245, 158, 11, 0.4);">
      <button type="button" class="welcome-modal-close" id="btn-close-battle-modal-x">&times;</button>
      <div style="font-size: 42px; margin-bottom: 8px;">⚔️</div>
      <div style="font-size: 22px; font-weight: 900; color: #fbbf24; margin-bottom: 10px; letter-spacing: 0.5px;">Battle Challenge!</div>
      <p style="font-size: 14px; color: #f5e8d7; margin-bottom: 22px; line-height: 1.5;">
        ⚔️ <strong>${cleanName}</strong> reminded you to battle in QuizForge!
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button type="button" class="btn primary-btn" id="btn-battle-modal-now" style="padding: 10px 22px; font-weight: 800; font-size: 13px;">
          Battle Now 🚀
        </button>
        <button type="button" class="btn secondary-btn" id="btn-battle-modal-later" style="padding: 10px 18px; font-size: 13px;">
          Maybe Later
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  document.getElementById('btn-close-battle-modal-x')?.addEventListener('click', closeModal);
  document.getElementById('btn-battle-modal-later')?.addEventListener('click', closeModal);
  document.getElementById('btn-battle-modal-now')?.addEventListener('click', () => {
    closeModal();
    if (typeof window.navigateTo === 'function') {
      window.navigateTo('quizforge');
    } else {
      const quizBtn = document.querySelector('.nav-item[data-target="quizforge"]');
      if (quizBtn) quizBtn.click();
    }
  });
}
window.showBattleInviteModal = showBattleInviteModal;

// ── 3. LOAD FRIENDS & PENDING REQUESTS ───────────────────────────────────────
async function loadFriendsAndRequests() {
  try {
    // 1. Fetch Friends List
    const friendsRes = await api.getFriendsList();
    if (friendsRes.ok && friendsRes.data && friendsRes.data.friends) {
      friendsList = friendsRes.data.friends;
    } else {
      friendsList = getFallbackFriends();
    }

    // 2. Fetch Pending Requests
    const reqRes = await api.getFriendRequests();
    if (reqRes.ok && reqRes.data) {
      pendingRequests = reqRes.data;
    } else {
      pendingRequests = { incoming: [], outgoing: [] };
    }

    // Update Badges & Counters
    updateBadgesAndCounters();

    // Render Components
    renderFriendsList();
    renderPendingRequests();

  } catch (e) {
    console.warn('[StudySync] Error loading friends and requests:', e.message);
  }
}

function updateBadgesAndCounters() {
  const friendsCountEl = document.getElementById('friends-count');
  const onlineCountEl = document.getElementById('online-friends-count');
  const pendingBadge = document.getElementById('pending-requests-badge');
  const incomingBadge = document.getElementById('incoming-count-badge');

  const incomingCount = (pendingRequests.incoming || []).length;
  const onlineCount = friendsList.filter(f => f.online).length;

  if (friendsCountEl) friendsCountEl.textContent = friendsList.length;
  if (onlineCountEl) onlineCountEl.textContent = `${onlineCount} Online`;

  if (pendingBadge) {
    if (incomingCount > 0) {
      pendingBadge.textContent = incomingCount;
      pendingBadge.classList.remove('hidden');
    } else {
      pendingBadge.classList.add('hidden');
    }
  }

  if (incomingBadge) {
    incomingBadge.textContent = incomingCount;
  }
}

// ── 4. RENDER FRIENDS LIST ──────────────────────────────────────────────────
function renderFriendsList() {
  const container = document.getElementById('friends-list-container');
  if (!container) return;

  if (friendsList.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px 12px; color: var(--text-muted); font-size: 12px;">
        <div style="font-size:28px; margin-bottom:8px;">🤝</div>
        <p style="margin:0; font-weight:600;">No study companions yet.</p>
        <p style="margin-top:4px; font-size:11px;">Search for scholars above to connect!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  friendsList.forEach(friend => {
    const card = document.createElement('div');
    card.className = `friend-item-card ${activeFriend && activeFriend.id === friend.id ? 'active' : ''}`;
    card.id = `friend-item-${friend.id}`;

    const avatarId = friend.avatar ? (friend.avatar.id || 'peasant') : 'peasant';
    const spriteStyle = getSpriteStyle(avatarId);
    const lastMsgText = friend.lastMessage ? friend.lastMessage.text : 'Click to message';
    const lastTime = friend.lastMessage ? formatMessageTime(friend.lastMessage.timestamp) : '';

    card.innerHTML = `
      <div class="friend-avatar-wrap">
        <div class="friend-avatar-sprite" style="${spriteStyle}"></div>
        <span class="status-indicator-dot ${friend.online ? 'online' : 'offline'}"></span>
      </div>
      <div class="friend-info-col">
        <div class="friend-name-row">
          <span class="friend-username">${escapeHTML(friend.username)}</span>
          <span class="level-pill">LV ${friend.level || 1}</span>
        </div>
        <p class="friend-preview-text">${escapeHTML(lastMsgText)}</p>
      </div>
      <div class="friend-meta-col">
        <span class="friend-last-time">${lastTime}</span>
        ${friend.unreadCount > 0 ? `<span class="unread-badge">${friend.unreadCount}</span>` : ''}
      </div>
    `;

    card.addEventListener('click', () => {
      openChatWithFriend(friend);
    });

    container.appendChild(card);
  });
}

// ── 5. RENDER PENDING REQUESTS ──────────────────────────────────────────────
function renderPendingRequests() {
  const section = document.getElementById('pending-requests-section');
  const container = document.getElementById('pending-requests-list');
  if (!container || !section) return;

  const incoming = pendingRequests.incoming || [];

  if (incoming.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 14px; color: var(--text-muted); font-size: 11px;">
        No incoming friend requests.
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  incoming.forEach(req => {
    const item = document.createElement('div');
    item.className = 'pending-request-item';

    const u = req.user || {};
    const avatarId = u.avatar ? (u.avatar.id || 'peasant') : 'peasant';
    const spriteStyle = getSpriteStyle(avatarId);

    item.innerHTML = `
      <div class="pending-user-info">
        <div class="pending-avatar" style="${spriteStyle}"></div>
        <div>
          <div class="pending-user-name">${escapeHTML(u.username || 'Scholar')}</div>
          <span class="level-pill" style="font-size:9px;">LV ${u.level || 1}</span>
        </div>
      </div>
      <div class="pending-actions">
        <button class="btn-action-accept" data-request-id="${req.id}">Accept</button>
        <button class="btn-action-decline" data-request-id="${req.id}">Decline</button>
      </div>
    `;

    // Bind Accept / Decline
    item.querySelector('.btn-action-accept').addEventListener('click', async () => {
      await handleRespondRequest(req.id, 'accept');
    });
    item.querySelector('.btn-action-decline').addEventListener('click', async () => {
      await handleRespondRequest(req.id, 'decline');
    });

    container.appendChild(item);
  });
}

async function handleRespondRequest(requestId, action) {
  try {
    const res = await api.respondFriendRequest(requestId, action);
    if (res.ok) {
      showAlertToast(res.data.message || (action === 'accept' ? 'Friend accepted!' : 'Friend declined'), 'success');
      await loadFriendsAndRequests();
    } else {
      showAlertToast(res.error || 'Failed to respond to request', 'error');
    }
  } catch (err) {
    showAlertToast(err.message, 'error');
  }
}

// ── 5.1. RENDER COMPARATIVE FRIENDS LEADERBOARD ───────────────────────────
async function renderFriendsLeaderboard() {
  const container = document.getElementById('friends-leaderboard-list');
  if (!container) return;

  container.innerHTML = '<div style="text-align:center; padding: 14px; color: var(--text-muted); font-size: 11px;">Loading rankings...</div>';

  try {
    // 1. Fetch real friends list via existing API
    const friendsRes = await api.getFriendsList();
    const friends = (friendsRes.ok && friendsRes.data && Array.isArray(friendsRes.data.friends)) 
      ? friendsRes.data.friends 
      : (Array.isArray(friendsList) ? friendsList : []);

    // 2. Get active user details
    const appState = (window.state && typeof window.state === 'object') ? window.state : state;
    const currentUserId = getMyUserId();
    const currentUsername = (appState && (appState.username || appState.fullName)) ? (appState.username || appState.fullName) : getMyUsername();
    const currentLevel = (appState && typeof appState.level === 'number') ? appState.level : 1;
    const currentXP = (appState && typeof appState.xp === 'number') ? appState.xp : 0;
    const currentAvatar = getMyAvatar();

    const currentUserEntry = {
      id: currentUserId,
      username: currentUsername,
      level: currentLevel,
      xp: currentXP,
      avatar: currentAvatar,
      isSelf: true
    };

    const friendsEntries = friends.map(f => ({
      id: f.id,
      username: f.username || 'Scholar',
      level: typeof f.level === 'number' ? f.level : 1,
      xp: typeof f.xp === 'number' ? f.xp : 0,
      avatar: f.avatar || { id: 'peasant' },
      isSelf: false
    }));

    // Combine self + friends
    const combined = [currentUserEntry, ...friendsEntries];

    // Sort by Level DESC, then XP DESC
    combined.sort((a, b) => {
      if (b.level !== a.level) return b.level - a.level;
      return b.xp - a.xp;
    });

    container.innerHTML = '';
    combined.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `pending-request-item ${item.isSelf ? 'active-self' : ''}`;
      card.style.cssText = `
        padding: 8px 12px;
        border-radius: 10px;
        background: ${item.isSelf ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.6)'};
        border: 1px solid ${item.isSelf ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
        display: flex;
        align-items: center;
        justify-content: space-between;
      `;

      const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
      const avatarId = item.avatar ? (item.avatar.id || 'peasant') : 'peasant';
      const spriteStyle = getSpriteStyle(avatarId);

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-weight: 900; font-size: 13px; color: ${idx === 0 ? '#fbbf24' : (idx === 1 ? '#cbd5e1' : (idx === 2 ? '#f97316' : 'var(--text-sub)'))}; width: 22px; text-align: center;">
            ${medalEmoji}
          </span>
          <div style="width: 28px; height: 28px; ${spriteStyle}"></div>
          <div>
            <div style="font-size: 12px; font-weight: 800; color: ${item.isSelf ? '#fbbf24' : '#fff'};">
              ${escapeHTML(item.username)} ${item.isSelf ? '<span style="font-size:10px; color:#f59e0b; opacity:0.8;">(You)</span>' : ''}
            </div>
            <div style="font-size: 10px; color: var(--text-muted);">
              LV ${item.level} • ${item.xp} XP
            </div>
          </div>
        </div>
        <span class="level-pill" style="font-size: 10px; font-weight: 800; padding: 2px 6px;">
          LV ${item.level}
        </span>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<div style="text-align:center; color:#ef4444; padding:12px; font-size:11px;">Failed to load leaderboard: ${escapeHTML(err.message)}</div>`;
  }
}
window.renderFriendsLeaderboard = renderFriendsLeaderboard;

// ── 6. SCHOLAR SEARCH ───────────────────────────────────────────────────────
async function handleScholarSearch() {
  const input = document.getElementById('scholar-search-input');
  const panel = document.getElementById('search-results-panel');
  const listContainer = document.getElementById('search-results-list');
  if (!input || !panel || !listContainer) return;

  const query = input.value.trim();
  if (!query) {
    panel.classList.add('hidden');
    return;
  }

  listContainer.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-sub); font-size:12px;">Searching realm for scholars...</div>';
  panel.classList.remove('hidden');

  try {
    const res = await api.searchUsers(query);
    if (!res.ok || !res.data || !res.data.users) {
      listContainer.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-sub); font-size:12px;">No scholars found matching query.</div>';
      return;
    }

    const users = res.data.users;
    if (users.length === 0) {
      listContainer.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-sub); font-size:12px;">No scholars found with that name.</div>';
      return;
    }

    listContainer.innerHTML = '';
    users.forEach(u => {
      const card = document.createElement('div');
      card.className = 'search-result-card';

      const avatarId = u.avatar ? (u.avatar.id || 'peasant') : 'peasant';
      const spriteStyle = getSpriteStyle(avatarId);

      let actionBtnHTML = '';
      if (u.relationshipStatus === 'accepted') {
        actionBtnHTML = `<span style="color:#10b981; font-size:11px; font-weight:800;">✓ Friends</span>`;
      } else if (u.relationshipStatus === 'pending_sent') {
        actionBtnHTML = `<span style="color:#f59e0b; font-size:11px; font-weight:700;">⏳ Request Sent</span>`;
      } else if (u.relationshipStatus === 'pending_received') {
        actionBtnHTML = `<button class="btn primary-btn btn-sm" id="btn-accept-search-${u.id}" style="padding:4px 10px; font-size:11px;">Accept</button>`;
      } else {
        actionBtnHTML = `<button class="btn primary-btn btn-sm" id="btn-add-${u.id}" style="padding:4px 10px; font-size:11px;">+ Add Friend</button>`;
      }

      card.innerHTML = `
        <div class="search-user-info">
          <div class="search-user-avatar" style="${spriteStyle}"></div>
          <div class="search-user-text">
            <h4>${escapeHTML(u.username)} <span class="level-pill">LV ${u.level || 1}</span></h4>
            <p>${escapeHTML(u.email || '')}</p>
          </div>
        </div>
        <div class="search-action-wrap">
          ${actionBtnHTML}
        </div>
      `;

      const addBtn = card.querySelector(`#btn-add-${u.id}`);
      if (addBtn) {
        addBtn.addEventListener('click', async () => {
          addBtn.disabled = true;
          addBtn.textContent = 'Sending...';
          const sendRes = await api.sendFriendRequest(u.id);
          if (sendRes.ok) {
            showAlertToast(`⚔️ Quest invite dispatched to ${u.username}!`, 'success');
            handleScholarSearch(); // re-render search list
            loadFriendsAndRequests();
          } else {
            showAlertToast(sendRes.error || 'Could not send friend request', 'error');
            addBtn.disabled = false;
            addBtn.textContent = '+ Add Friend';
          }
        });
      }

      const acceptBtn = card.querySelector(`#btn-accept-search-${u.id}`);
      if (acceptBtn && u.requestId) {
        acceptBtn.addEventListener('click', async () => {
          await handleRespondRequest(u.requestId, 'accept');
          handleScholarSearch();
        });
      }

      listContainer.appendChild(card);
    });

  } catch (err) {
    listContainer.innerHTML = `<div style="padding:16px; text-align:center; color:#ef4444; font-size:12px;">Search failed: ${err.message}</div>`;
  }
}

// ── 7. OPEN 1:1 CHAT CONVERSATION ───────────────────────────────────────────
async function openChatWithFriend(friend) {
  activeFriend = friend;

  // Clear unread count for this friend locally
  friend.unreadCount = 0;
  renderFriendsList();

  // Switch UI panels: Hide empty state, Show active chat
  document.getElementById('chat-empty-state')?.classList.add('hidden');
  document.getElementById('chat-active-state')?.classList.remove('hidden');

  // Update Header
  updateActiveChatHeader(friend);

  // Clear Chat Feed & Show Loading
  const feed = document.getElementById('dm-chat-feed');
  if (feed) feed.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-sub); font-size:12px;">Loading scrolls & messages...</div>';

  // Load Message History
  try {
    const historyRes = await api.getDMHistory(friend.id);
    const messages = (historyRes.ok && historyRes.data && historyRes.data.messages) ? historyRes.data.messages : [];
    renderChatFeed(messages);

    // Notify socket we read messages
    if (socket && socket.connected) {
      socket.emit('dm:read', { friendId: friend.id, userId: getMyUserId() });
    }
  } catch (err) {
    if (feed) feed.innerHTML = `<div style="text-align:center; color:#ef4444; padding:20px;">Could not load messages: ${err.message}</div>`;
  }
}

function updateActiveChatHeader(friend) {
  const avatarEl = document.getElementById('active-friend-avatar');
  const nameEl = document.getElementById('active-friend-name');
  const levelEl = document.getElementById('active-friend-level');
  const statusDot = document.getElementById('active-friend-status-dot');
  const statusText = document.getElementById('active-friend-status-text');

  if (avatarEl) {
    const avatarId = friend.avatar ? (friend.avatar.id || 'peasant') : 'peasant';
    avatarEl.style.cssText = getSpriteStyle(avatarId);
  }
  if (nameEl) nameEl.textContent = friend.username;
  if (levelEl) levelEl.textContent = `LV ${friend.level || 1}`;

  if (statusDot) {
    statusDot.className = `status-indicator-dot ${friend.online ? 'online' : 'offline'}`;
  }
  if (statusText) {
    statusText.textContent = friend.online ? '🟢 Online' : '⚪ Offline';
    statusText.className = `status-text ${friend.online ? 'online' : 'offline'}`;
  }
}

// ── 8. RENDER CHAT FEED ─────────────────────────────────────────────────────
function renderChatFeed(messages) {
  const feed = document.getElementById('dm-chat-feed');
  if (!feed) return;

  if (!messages || messages.length === 0) {
    feed.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: var(--text-muted); font-size: 13px;">
        <div style="font-size:32px; margin-bottom:8px;">📜</div>
        <p style="margin:0; font-weight:700; color:#f5e8d7;">A new chronicle begins!</p>
        <p style="margin-top:4px; font-size:11px;">Send your first direct message or share a study file below.</p>
      </div>
    `;
    return;
  }

  feed.innerHTML = '';
  const currentUserId = getMyUserId();

  let lastDateStr = '';

  messages.forEach(msg => {
    const isSelf = (msg.senderId === currentUserId);
    const msgDate = new Date(msg.timestamp || Date.now());
    const dateStr = msgDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

    if (dateStr !== lastDateStr) {
      const dateDivider = document.createElement('div');
      dateDivider.className = 'date-divider';
      dateDivider.textContent = dateStr;
      feed.appendChild(dateDivider);
      lastDateStr = dateStr;
    }

    const row = document.createElement('div');
    row.className = `dm-bubble-row ${isSelf ? 'self' : 'other'}`;

    let attachmentHTML = '';
    if (msg.attachment) {
      attachmentHTML = renderAttachmentHTML(msg.attachment);
    }

    const timeStr = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    row.innerHTML = `
      <div class="dm-bubble">
        ${msg.text ? `<div>${escapeHTML(msg.text)}</div>` : ''}
        ${attachmentHTML}
        <div class="dm-time">${timeStr}</div>
      </div>
    `;

    feed.appendChild(row);
  });

  // Scroll to bottom
  feed.scrollTop = feed.scrollHeight;
  if (window.lucide) window.lucide.createIcons();
}

function renderAttachmentHTML(att) {
  if (!att) return '';
  const fileUrl = att.url.startsWith('http') ? att.url : `http://localhost:3000${att.url}`;
  const fileName = escapeHTML(att.originalName || att.fileName || 'file');
  const fileSizeFormatted = formatFileSize(att.fileSize || 0);

  if (att.fileType === 'image') {
    return `
      <div class="dm-attachment-card">
        <a href="${fileUrl}" target="_blank" rel="noopener noreferrer">
          <img src="${fileUrl}" alt="${fileName}" class="dm-attachment-image" loading="lazy" />
        </a>
      </div>
    `;
  }

  let iconEmoji = '📄';
  if (att.fileType === 'pdf') iconEmoji = '📕';
  else if (att.fileType === 'code') iconEmoji = '💻';
  else if (att.fileType === 'text') iconEmoji = '📝';

  return `
    <div class="dm-attachment-card">
      <a href="${fileUrl}" target="_blank" download="${fileName}" class="dm-attachment-file">
        <span class="dm-file-icon">${iconEmoji}</span>
        <div class="dm-file-meta">
          <span class="dm-file-title">${fileName}</span>
          <span class="dm-file-size">${fileSizeFormatted}</span>
        </div>
        <span class="dm-file-download-btn">⬇ Download</span>
      </a>
    </div>
  `;
}

// ── 9. SENDING DIRECT MESSAGES & FILE ATTACHMENTS ────────────────────────────
async function handleSendMessage() {
  if (!activeFriend) return;

  const textInput = document.getElementById('dm-message-input');
  const text = textInput ? textInput.value.trim() : '';

  if (!text && !pendingAttachment) {
    return;
  }

  const sendBtn = document.getElementById('btn-send-dm');
  if (sendBtn) sendBtn.disabled = true;

  let attachmentPayload = null;

  try {
    // 1. Upload attachment if present
    if (pendingAttachment && pendingAttachment.file) {
      const uploadRes = await api.uploadDMFile(pendingAttachment.file);
      if (!uploadRes.ok || !uploadRes.data || !uploadRes.data.file) {
        throw new Error(uploadRes.error || 'Failed to upload attachment.');
      }
      attachmentPayload = uploadRes.data.file;
    }

    const currentUserId = getMyUserId();
    const recipientId = activeFriend.id;

    // 2. Emit via Socket.io (primary real-time channel)
    const msgPayload = {
      senderId: currentUserId,
      recipientId: recipientId,
      text: text,
      attachment: attachmentPayload
    };

    if (socket && socket.connected) {
      socket.emit('dm:send', msgPayload);
    } else {
      // Fallback REST endpoint
      await api.sendDM(recipientId, text, attachmentPayload);
    }

    // 3. Immediately render sent message in chat feed
    const feed = document.getElementById('dm-chat-feed');
    if (feed) {
      const newMsg = {
        id: 'temp_' + Date.now(),
        senderId: currentUserId,
        recipientId: recipientId,
        text: text,
        attachment: attachmentPayload,
        timestamp: new Date().toISOString()
      };

      // If feed was empty placeholder, clear it
      if (feed.querySelector('.date-divider') === null && feed.textContent.includes('new chronicle begins')) {
        feed.innerHTML = '';
      }

      const row = document.createElement('div');
      row.className = 'dm-bubble-row self';
      const attHTML = attachmentPayload ? renderAttachmentHTML(attachmentPayload) : '';
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      row.innerHTML = `
        <div class="dm-bubble">
          ${text ? `<div>${escapeHTML(text)}</div>` : ''}
          ${attHTML}
          <div class="dm-time">${timeStr}</div>
        </div>
      `;

      feed.appendChild(row);
      feed.scrollTop = feed.scrollHeight;
    }

    // 4. Update friends list preview
    activeFriend.lastMessage = {
      text: text || (attachmentPayload ? `📎 ${attachmentPayload.originalName}` : ''),
      timestamp: new Date().toISOString(),
      senderId: currentUserId
    };
    renderFriendsList();

    // 5. Clear Inputs
    if (textInput) textInput.value = '';
    clearPendingAttachment();

    // Award +5 XP for social study engagement
    addXP(5);
    saveState();

  } catch (err) {
    showAlertToast(err.message, 'error');
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    if (textInput) textInput.focus();
  }
}

// ── 10. ATTACHMENT FILE PICKER & VALIDATION ─────────────────────────────────
function handleFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  // 1. File Size Cap Validation (20MB)
  if (file.size > MAX_FILE_SIZE) {
    showAlertToast(`❌ File '${file.name}' exceeds the 20MB size limit (${formatFileSize(file.size)}). Please select a smaller file.`, 'error');
    e.target.value = '';
    return;
  }

  // 2. Allowed File Extension Validation
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    showAlertToast(`❌ File type '${ext}' is not supported. Allowed formats: PDF, Images (PNG, JPG, WebP), Text/MD, and Source Code (.py, .js, .java, .cpp, etc.)`, 'error');
    e.target.value = '';
    return;
  }

  // Set pending attachment
  pendingAttachment = {
    file,
    name: file.name,
    size: file.size,
    type: ext
  };

  // Show Attachment Preview Bar
  const previewBar = document.getElementById('chat-attachment-preview');
  const previewName = document.getElementById('preview-file-name');
  const previewSize = document.getElementById('preview-file-size');
  const previewIcon = document.getElementById('preview-file-icon');

  if (previewBar && previewName && previewSize) {
    previewName.textContent = file.name;
    previewSize.textContent = formatFileSize(file.size);
    if (previewIcon) {
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) previewIcon.textContent = '🖼️';
      else if (ext === '.pdf') previewIcon.textContent = '📕';
      else if (['.txt', '.md'].includes(ext)) previewIcon.textContent = '📝';
      else previewIcon.textContent = '💻';
    }
    previewBar.classList.remove('hidden');
  }

  e.target.value = '';
}

function clearPendingAttachment() {
  pendingAttachment = null;
  const previewBar = document.getElementById('chat-attachment-preview');
  if (previewBar) previewBar.classList.add('hidden');
  const fileInput = document.getElementById('dm-file-input');
  if (fileInput) fileInput.value = '';
}

// ── 11. INCOMING MESSAGE HANDLER ────────────────────────────────────────────
function handleIncomingDirectMessage(msg) {
  const currentUserId = getMyUserId();
  const senderId = msg.senderId;

  // Update friend item in list
  const friend = friendsList.find(f => f.id === senderId);
  if (friend) {
    friend.lastMessage = {
      text: msg.text || (msg.attachment ? `📎 ${msg.attachment.originalName}` : ''),
      timestamp: msg.timestamp,
      senderId
    };
  }

  // If currently chatting with this friend:
  if (activeFriend && activeFriend.id === senderId) {
    const feed = document.getElementById('dm-chat-feed');
    if (feed) {
      // Clear placeholder if first message
      if (feed.textContent.includes('new chronicle begins')) {
        feed.innerHTML = '';
      }

      const row = document.createElement('div');
      row.className = 'dm-bubble-row other';
      const attHTML = msg.attachment ? renderAttachmentHTML(msg.attachment) : '';
      const timeStr = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      row.innerHTML = `
        <div class="dm-bubble">
          ${msg.text ? `<div>${escapeHTML(msg.text)}</div>` : ''}
          ${attHTML}
          <div class="dm-time">${timeStr}</div>
        </div>
      `;

      feed.appendChild(row);
      feed.scrollTop = feed.scrollHeight;

      // Mark as read
      if (socket && socket.connected) {
        socket.emit('dm:read', { friendId: senderId, userId: currentUserId });
      }
    }
  } else {
    // Increment unread count for that friend
    if (friend) {
      friend.unreadCount = (friend.unreadCount || 0) + 1;
    }
    showAlertToast(`💬 Message from ${friend ? friend.username : 'Scholar'}: "${(msg.text || 'Shared a file').slice(0, 30)}..."`, 'success');
  }

  renderFriendsList();
  if (window.lucide) window.lucide.createIcons();
}

// ── 12. UI EVENT LISTENERS ──────────────────────────────────────────────────
function setupUIEventListeners() {
  if (window.studySyncListenersBound) return;
  window.studySyncListenersBound = true;

  // 1. Search Bar
  const searchBtn = document.getElementById('btn-search-scholars');
  const searchInput = document.getElementById('scholar-search-input');
  const closeSearchBtn = document.getElementById('btn-close-search');

  if (searchBtn) searchBtn.addEventListener('click', handleScholarSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleScholarSearch();
    });
  }
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
      document.getElementById('search-results-panel')?.classList.add('hidden');
    });
  }

  // 2. Tab Navigation (Friends vs Requests vs Leaderboard)
  const tabFriends = document.getElementById('tab-btn-friends');
  const tabRequests = document.getElementById('tab-btn-requests');
  const tabLeaderboard = document.getElementById('tab-btn-leaderboard');

  const requestsSection = document.getElementById('pending-requests-section');
  const leaderboardSection = document.getElementById('friends-leaderboard-section');
  const friendsSection = document.getElementById('friends-list-section');

  if (tabFriends) {
    tabFriends.addEventListener('click', () => {
      tabFriends.classList.add('active');
      tabRequests?.classList.remove('active');
      tabLeaderboard?.classList.remove('active');
      if (requestsSection) requestsSection.classList.add('hidden');
      if (leaderboardSection) leaderboardSection.classList.add('hidden');
      if (friendsSection) friendsSection.classList.remove('hidden');
    });
  }

  if (tabRequests) {
    tabRequests.addEventListener('click', () => {
      tabRequests.classList.add('active');
      tabFriends?.classList.remove('active');
      tabLeaderboard?.classList.remove('active');
      if (leaderboardSection) leaderboardSection.classList.add('hidden');
      if (friendsSection) friendsSection.classList.remove('hidden');
      if (requestsSection) requestsSection.classList.remove('hidden');
      renderPendingRequests();
    });
  }

  if (tabLeaderboard) {
    tabLeaderboard.addEventListener('click', () => {
      tabLeaderboard.classList.add('active');
      tabFriends?.classList.remove('active');
      tabRequests?.classList.remove('active');
      if (requestsSection) requestsSection.classList.add('hidden');
      if (friendsSection) friendsSection.classList.add('hidden');
      if (leaderboardSection) leaderboardSection.classList.remove('hidden');
      renderFriendsLeaderboard();
    });
  }

  const refreshLbBtn = document.getElementById('btn-refresh-friends-lb');
  if (refreshLbBtn) {
    refreshLbBtn.addEventListener('click', renderFriendsLeaderboard);
  }

  // 3. Send Battle Reminder Nudge
  const btnInviteBattle = document.getElementById('btn-invite-battle');
  if (btnInviteBattle) {
    btnInviteBattle.addEventListener('click', () => {
      if (btnInviteBattle.disabled) return;
      if (!activeFriend) {
        showAlertToast('Please select a friend first to send a battle reminder.', 'error');
        return;
      }

      // Add 2s cooldown on button click
      btnInviteBattle.disabled = true;
      setTimeout(() => { btnInviteBattle.disabled = false; }, 2000);

      const myUsername = (state && (state.username || state.fullName)) ? (state.username || state.fullName) : 'Scholar';
      if (socket && socket.connected) {
        socket.emit('battle:invite', {
          targetUserId: activeFriend.id,
          senderId: (state && state.id) || auth.getUserId(),
          senderName: myUsername
        });
      }
      showAlertToast(`Reminder sent to ${activeFriend.username || 'friend'}! ⚔️`, 'success');
    });
  }

  const sendBtn = document.getElementById('btn-send-dm');
  const messageInput = document.getElementById('dm-message-input');

  if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });

    // Typing broadcast
    messageInput.addEventListener('input', () => {
      if (activeFriend && socket && socket.connected) {
        socket.emit('dm:typing', {
          senderId: getMyUserId(),
          recipientId: activeFriend.id,
          isTyping: true
        });

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          socket.emit('dm:typing', {
            senderId: getMyUserId(),
            recipientId: activeFriend.id,
            isTyping: false
          });
        }, 1500);
      }
    });
  }

  // 4. File Attachment Button & Input
  const attachBtn = document.getElementById('btn-attach-file');
  const fileInput = document.getElementById('dm-file-input');
  const removeAttachmentBtn = document.getElementById('btn-remove-attachment');

  if (attachBtn && fileInput) {
    attachBtn.addEventListener('click', () => fileInput.click());
  }
  if (fileInput) {
    fileInput.addEventListener('change', handleFileSelected);
  }
  if (removeAttachmentBtn) {
    removeAttachmentBtn.addEventListener('click', clearPendingAttachment);
  }
}

// ── 13. UTILITY HELPERS ─────────────────────────────────────────────────────

function showAlertToast(message, type = 'error') {
  const toast = document.getElementById('studysync-alert');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `studysync-alert-toast ${type}`;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatMessageTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function getSpriteStyle(avatarId) {
  let id = typeof avatarId === 'object' ? (avatarId.id || 'peasant') : (avatarId || 'peasant');
  const avatarMap = {
    peasant: './assets/heroes/scholar.png',
    villager_woman: './assets/heroes/apprentice.png',
    worker: './assets/heroes/peasant.png',
    gatherer: './assets/heroes/explorer.png',
    shield_man: './assets/heroes/knight.png',
    prince: './assets/heroes/royal.png',
    enchanter: './assets/heroes/scholar.png',
    shadow_rogue: './assets/heroes/explorer.png'
  };
  const imgUrl = avatarMap[id] || './assets/heroes/scholar.png';
  return `background-image: url('${imgUrl}'); background-size: contain; background-position: center; background-repeat: no-repeat; background-color: rgba(15, 23, 42, 0.6); border-radius: 50%;`;
}

function getFallbackFriends() {
  return [
    {
      id: 'd52357fc-7491-4d4d-b4a4-ae01bd1d5351',
      username: 'DemoKnight',
      level: 2,
      avatar: { id: 'blacksmith' },
      online: false,
      lastMessage: { text: 'Ready for study session!', timestamp: new Date().toISOString() },
      unreadCount: 0
    }
  ];
}
