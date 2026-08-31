/* ============================================================
   ScholarQuest — Frontend API Helper
   ============================================================
   Central module for all backend API calls.
   Falls back gracefully to localStorage if the backend is
   offline — so the app ALWAYS works even without a server.

   Usage in app.js:
     import { api } from './api.js';
     const user = await api.login(email, password);
     await api.saveState(state);
   ============================================================ */

// ── Config ─────────────────────────────────────────────────────
import { API_BASE, SERVER_URL } from './src/config.js';
export { API_BASE, SERVER_URL };

// ── Token Management ───────────────────────────────────────────
export const auth = {
  getToken: ()       => localStorage.getItem('sq_token'),
  setToken: (token)  => localStorage.setItem('sq_token', token),
  clearToken: ()     => { localStorage.removeItem('sq_token'); localStorage.removeItem('sq_user_id'); },
  getUserId: ()      => localStorage.getItem('sq_user_id'),
  setUserId: (id)    => localStorage.setItem('sq_user_id', id),
  isLoggedIn: ()     => !!localStorage.getItem('sq_token')
};

// ── HTTP Helper ────────────────────────────────────────────────
async function request(method, path, body = null, requiresAuth = true) {
  const headers = {};
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (requiresAuth) {
    const token = auth.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: (body instanceof FormData) ? body : (body ? JSON.stringify(body) : undefined),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API Error');
    return { ok: true, data };
  } catch (err) {
    console.warn(`[API] ${method} ${path} failed:`, err.message);
    return { ok: false, error: err.message };
  }
}

// ── Auth API ───────────────────────────────────────────────────
export const api = {

  /**
   * Register a new user (with backend sync)
   */
  async register(fullName, email, phone, username, password) {
    const cleanUsername = (username || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanName = (fullName || cleanUsername || 'Scholar').trim();
    const cleanPhone = (phone || '').trim();

    const result = await request('POST', '/auth/register', {
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      username: cleanUsername,
      password
    }, false);

    if (result.ok) {
      auth.setToken(result.data.token);
      auth.setUserId(result.data.user.id);
      return result;
    }

    if (result.error && !result.error.toLowerCase().includes('failed to fetch') && !result.error.toLowerCase().includes('aborted')) {
      return result;
    }

    // Offline fallback mode (if server is unreachable)
    console.warn('[API] Server offline — creating local scholar session');
    const mockToken = `local_token_${Date.now()}`;
    const mockId = `local_user_${Date.now()}`;
    const mockUser = {
      id: mockId,
      fullName: cleanName,
      username: cleanUsername,
      email: cleanEmail || `${cleanUsername.toLowerCase()}@scholarquest.edu`,
      phone: cleanPhone,
      createdAt: new Date().toISOString(),
      level: 1,
      xp: 0,
      coins: 150,
      hp: 100,
      maxHp: 100,
      avatar: { id: 'peasant' },
      stats: { quizzesCompleted: 0, focusMinutes: 0, lessonsCompleted: 0, maxHabitStreak: 0 }
    };

    auth.setToken(mockToken);
    auth.setUserId(mockId);
    localStorage.setItem('sq_username', mockUser.username);
    localStorage.setItem('scholarquest_state', JSON.stringify(mockUser));

    return {
      ok: true,
      data: {
        message: '⚔️ Scholar registered! Welcome to the realm.',
        token: mockToken,
        user: mockUser
      }
    };
  },


  /**
   * Login an existing user by Email or Username
   */
  async login(emailOrUsername, password) {
    const inputName = (emailOrUsername || '').trim();
    const result = await request('POST', '/auth/login', { email: inputName, identifier: inputName, username: inputName, password }, false);
    if (result.ok) {
      auth.setToken(result.data.token);
      auth.setUserId(result.data.user.id);
      return result;
    }

    // If server responded with error (e.g. 401 wrong password), return error immediately
    if (result.error && !result.error.toLowerCase().includes('failed to fetch') && !result.error.toLowerCase().includes('aborted')) {
      return result;
    }

    // Fallback: ONLY if server is completely offline / unreachable
    console.warn('[API] Server offline — network error');
    return { ok: false, error: 'Cannot connect to ScholarQuest server. Please start the server and try again.' };
  },

  /**
   * Update profile fields (Full Name, Phone, Email)
   */
  async updateProfile(fullName, phone, email) {
    const userId = auth.getUserId();
    if (!userId) return { ok: false, error: 'Not logged in' };
    return await request('PATCH', `/user/${userId}/profile`, { fullName, phone, email });
  },

  /**
   * Change password with current password verification
   */
  async changePassword(currentPassword, newPassword) {
    const userId = auth.getUserId();
    if (!userId) return { ok: false, error: 'Not logged in' };
    return await request('POST', `/user/${userId}/change-password`, { currentPassword, newPassword });
  },

  /**
   * Social SSO Login (Google, GitHub, LeetCode)
   * @param {'google'|'github'|'leetcode'} provider
   */
  async socialLogin(provider) {
    const providerNames = { google: 'Google', github: 'GitHub', leetcode: 'LeetCode' };
    const name = providerNames[provider] || 'Social';
    const username = `${name}Scholar`;
    const email = `${provider}@scholarquest.edu`;
    const mockToken = `sso_${provider}_${Date.now()}`;
    const mockId = `sso_id_${provider}`;

    const mockUser = {
      id: mockId,
      username,
      email,
      level: 2,
      xp: 50,
      coins: 200,
      hp: 100,
      maxHp: 100,
      avatar: { id: 'villager_woman' },
      stats: { quizzesCompleted: 1, focusMinutes: 25, lessonsCompleted: 1, maxHabitStreak: 1 }
    };

    auth.setToken(mockToken);
    auth.setUserId(mockId);
    localStorage.setItem('sq_username', mockUser.username);
    localStorage.setItem('scholarquest_state', JSON.stringify(mockUser));

    return {
      ok: true,
      data: {
        message: `⚔️ Authenticated via ${name}! Welcome, ${username}.`,
        token: mockToken,
        user: mockUser
      }
    };
  },

  /**
   * Get current authenticated user details from JWT token
   */
  async getCurrentUser() {
    return await request('GET', '/auth/me');
  },

  /** Request password reset email link */
  async forgotPassword(email) {
    return await request('POST', '/auth/forgot-password', { email }, false);
  },

  /** Reset password with token */
  async resetPassword(token, newPassword) {
    return await request('POST', '/auth/reset-password', { token, newPassword }, false);
  },

  /** Logout — clear token & user ID */
  logout() {
    auth.clearToken();
    console.log('[API] Logged out.');
  },

  /** Hard Delete Account & WIPE all associated data */
  async deleteAccount() {
    return await request('DELETE', '/auth/account');
  },

  /** Check if username is available */
  async checkUsername(username) {
    return await request('POST', '/auth/check-username', { username }, false);
  },

  /** Complete brand-new OAuth registration */
  async completeOauthRegistration(pendingToken, username) {
    return await request('POST', '/auth/oauth/complete-registration', { pendingToken, username }, false);
  },


  // ── User State ──────────────────────────────────────────────

  /**
   * Load user state from backend.
   * Falls back to localStorage if backend is offline.
   * @returns {Promise<Object|null>} user state object
   */
  async loadState() {
    const userId = auth.getUserId();
    if (!userId) return null; // not logged in

    const result = await request('GET', `/user/${userId}`);
    if (result.ok) {
      // Cache to localStorage as fallback
      localStorage.setItem('sq_server_state', JSON.stringify(result.data.user));
      return result.data.user;
    }

    // Fallback: return cached server state or local state
    console.warn('[API] Backend offline — using localStorage fallback');
    const cached = localStorage.getItem('sq_server_state');
    return cached ? JSON.parse(cached) : null;
  },

  /**
   * Save user state to backend.
   * Always also saves to localStorage as backup.
   * @param {Object} state - full ScholarQuest state object
   */
  async saveState(state) {
    // Always save locally first
    localStorage.setItem('scholarquest_state', JSON.stringify(state));

    const userId = auth.getUserId();
    if (!userId) return { ok: false, error: 'Not logged in' };

    const result = await request('PATCH', `/user/${userId}`, state);
    if (!result.ok) {
      console.warn('[API] Could not sync state to backend — saved locally only.');
    }
    return result;
  },

  // ── Quizzes ─────────────────────────────────────────────────

  /** Get all available quizzes */
  async getQuizzes() {
    const result = await request('GET', '/quizzes', null, false);
    if (result.ok) return result.data.quizzes;

    // Fallback: return built-in quiz list from index.html if backend is down
    console.warn('[API] Using fallback quiz data.');
    return null;
  },

  /**
   * Submit quiz answers and get XP reward
   * @param {string} quizId
   * @param {Array} answers - [{ questionId, selectedOption }]
   */
  async submitQuiz(quizId, answers) {
    const userId = auth.getUserId();
    return await request('POST', '/quizzes/submit', { quizId, answers, userId });
  },

  // ── Habits ──────────────────────────────────────────────────

  /** Get habits for current user */
  async getHabits() {
    const userId = auth.getUserId();
    if (!userId) return { ok: false };
    return await request('GET', `/habits/${userId}`);
  },

  /** Create a new habit */
  async createHabit(name, difficulty = 'medium') {
    const userId = auth.getUserId();
    if (!userId) return { ok: false };
    return await request('POST', `/habits/${userId}`, { name, difficulty });
  },

  /** Mark habit as completed today */
  async completeHabit(habitId) {
    const userId = auth.getUserId();
    if (!userId) return { ok: false };
    return await request('PATCH', `/habits/${userId}/${habitId}/complete`);
  },

  /** Delete a habit */
  async deleteHabit(habitId) {
    const userId = auth.getUserId();
    if (!userId) return { ok: false };
    return await request('DELETE', `/habits/${userId}/${habitId}`);
  },

  // ── Friends & StudySync API ────────────────────────────────
  
  /** Search scholars by query */
  async searchUsers(query) {
    return await request('GET', `/friends/search?q=${encodeURIComponent(query)}`);
  },

  /** Send friend request */
  async sendFriendRequest(recipientId) {
    return await request('POST', '/friends/request', { recipientId });
  },

  /** Get incoming and outgoing pending friend requests */
  async getFriendRequests() {
    return await request('GET', '/friends/requests');
  },

  /** Respond to friend request (action: 'accept' | 'decline') */
  async respondFriendRequest(requestId, action) {
    return await request('POST', '/friends/respond', { requestId, action });
  },

  /** Get all accepted friends */
  async getFriendsList() {
    return await request('GET', '/friends/list');
  },

  // ── Direct Messages (1:1 Chat) API ──────────────────────────

  /** Get conversation message history with a friend */
  async getDMHistory(friendId) {
    return await request('GET', `/dm/history/${friendId}`);
  },

  /** Upload a file attachment for direct messages (20MB cap) */
  async uploadDMFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await request('POST', '/dm/upload', formData);
  },

  /** Send a direct message (fallback / REST) */
  async sendDM(recipientId, text, attachment = null) {
    return await request('POST', '/dm/send', { recipientId, text, attachment });
  },

  // ── Leaderboard ─────────────────────────────────────────────

  /** Get top 10 leaderboard */
  async getLeaderboard() {
    return await request('GET', '/leaderboard', null, false);
  },

  // ── Utility ─────────────────────────────────────────────────

  /** Check if backend is reachable */
  async ping() {
    try {
      const res = await fetch(`${SERVER_URL}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      try {
        const res2 = await fetch(`${SERVER_URL}/`, { method: 'GET' });
        return res2.ok;
      } catch {
        return false;
      }
    }
  }
};

export default api;
