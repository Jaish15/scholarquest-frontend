/* ============================================================
   ScholarQuest — Global Environment & Server Configuration
   ============================================================
   Dynamically determines the backend REST & WebSocket URL:
   1. Uses window.__ENV__.SERVER_URL if injected at runtime.
   2. Uses localStorage 'sq_backend_url' if custom URL set by user/dev.
   3. Defaults to 'http://localhost:3000' during local development.
   4. Defaults to production cloud backend in deployed environments.
   ============================================================ */

// Production backend default URL (Update this once your backend is deployed on Render/Railway)
export const PROD_BACKEND_URL = 'https://scholarquest-backend.onrender.com';

export function getBackendUrl() {
  // 1. Runtime / window environment override
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__.SERVER_URL) {
    return window.__ENV__.SERVER_URL.replace(/\/+$/, '');
  }

  // 2. Local storage override (for testing custom deployed staging servers)
  if (typeof localStorage !== 'undefined') {
    const customUrl = localStorage.getItem('sq_backend_url');
    if (customUrl && customUrl.trim()) {
      return customUrl.trim().replace(/\/+$/, '');
    }
  }

  // 3. Local development check
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '') {
      return 'http://localhost:3000';
    }
  }

  // 4. Production fallback
  return PROD_BACKEND_URL;
}

export const SERVER_URL = getBackendUrl();
export const API_BASE   = `${SERVER_URL}/api`;
export const SOCKET_URL = SERVER_URL;
