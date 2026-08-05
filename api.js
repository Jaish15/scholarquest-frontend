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
const API_BASE = 'http://localhost:3000/api';

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
  const headers = { 'Content-Type': 'application/json' };
  if (requiresAuth) {
    const token = auth.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
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
   * Register a new user
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ok, data}>}
   */
  async register(username, email, password) {
    const result = await request('POST', '/auth/register', { username, email, password }, false);
    if (result.ok) {
      auth.setToken(result.data.token);
      auth.setUserId(result.data.user.id);
    }
    return result;
  },

  /**
   * Login an existing user
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const result = await request('POST', '/auth/login', { email, password }, false);
    if (result.ok) {
      auth.setToken(result.data.token);
      auth.setUserId(result.data.user.id);
    }
    return result;
  },

  /** Request password reset OTP code */
  async forgotPassword(email) {
    return await request('POST', '/auth/forgot-password', { email }, false);
  },

  /** Reset password with code */
  async resetPassword(email, resetCode, newPassword) {
    return await request('POST', '/auth/reset-password', { email, resetCode, newPassword }, false);
  },

  /** Logout — clear token & user ID */
  logout() {
    auth.clearToken();
    console.log('[API] Logged out.');
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

  // ── Leaderboard ─────────────────────────────────────────────

  /** Get top 10 leaderboard */
  async getLeaderboard() {
    return await request('GET', '/leaderboard', null, false);
  },

  // ── Utility ─────────────────────────────────────────────────

  /** Check if backend is reachable */
  async ping() {
    try {
      const res = await fetch('http://localhost:3000/', { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }
};

export default api;
