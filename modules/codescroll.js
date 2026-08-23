/* ==========================================
   ScholarQuest CodeScroll Module
   3-Tier Difficulty System (Beginner, Intermediate, Advanced)
   1,080 Practical Coding Challenges across 9 Technical Domains
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
import { api, auth } from '../api.js';
import { CODE_SCROLL_BANK } from '../src/data/codeScrollBank.js';
import { PYTHON_CODE_CHALLENGES } from '../src/data/domains/python.js';
import { JAVASCRIPT_CODE_CHALLENGES } from '../src/data/domains/javascript.js';
import { UML_CODE_CHALLENGES } from '../src/data/domains/uml.js';
import { SOFTWARE_TESTING_CODE_CHALLENGES } from '../src/data/domains/softwareTesting.js';
import { ADVANCED_JAVA_CODE_CHALLENGES } from '../src/data/domains/advancedJava.js';
import { RUBY_CODE_CHALLENGES } from '../src/data/domains/ruby.js';
import { ML_CODE_CHALLENGES } from '../src/data/domains/machineLearning.js';
import { DL_CODE_CHALLENGES } from '../src/data/domains/deepLearning.js';
import { CYBERSECURITY_CODE_CHALLENGES } from '../src/data/domains/cybersecurity.js';

// Aggregate 1,080 CodeScroll Challenges across all 9 Domains & 3 Tiers
const FULL_CODE_BANK = [
  ...PYTHON_CODE_CHALLENGES,
  ...JAVASCRIPT_CODE_CHALLENGES,
  ...UML_CODE_CHALLENGES,
  ...SOFTWARE_TESTING_CODE_CHALLENGES,
  ...ADVANCED_JAVA_CODE_CHALLENGES,
  ...RUBY_CODE_CHALLENGES,
  ...ML_CODE_CHALLENGES,
  ...DL_CODE_CHALLENGES,
  ...CYBERSECURITY_CODE_CHALLENGES,
  ...CODE_SCROLL_BANK
];

const DOMAINS = [
  'Python', 'JavaScript', 'UML', 'Software Testing',
  'Advanced Java', 'Ruby Programming', 'Machine Learning',
  'Deep Learning', 'Cybersecurity'
];

let selectedDomain = 'Python';
let selectedDifficulty = 'Beginner'; // 'Beginner', 'Intermediate', 'Advanced'
let currentDomainChallenges = [];
let activeChallengeIndex = 0;
let activeIdeMode = 'challenge'; // 'challenge' | 'sandbox'
let helpStage = 0; // 0: none, 1: concept, 2: approach, 3: solution

const SANDBOX_STARTER = {
  python: `# Write your Python code here\nprint("Hello World from Python!")`,
  javascript: `// Write your JavaScript code here\nconsole.log("Hello World from JavaScript!");`,
  c: `// Write your C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello World from C!\\n");\n    return 0;\n}`,
  cpp: `// Write your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World from C++!" << std::endl;\n    return 0;\n}`,
  ruby: `# Write your Ruby code here\nputs "Hello World from Ruby!"`
};

const SANDBOX_LANG_TAG = {
  python: 'script.py',
  javascript: 'script.js',
  c: 'main.c',
  cpp: 'main.cpp',
  ruby: 'script.rb'
};

export function initCodeScroll() {
  loadCompletedLessons();
  setupDomainFilter();
  setupDifficultyFilter();
  filterChallenges('Python', 'Beginner');
  setupWorkspaceEvents();
  setupLeetCodeEvents();
  checkSharedChallengeUrl();
}

function checkSharedChallengeUrl() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const domain = params.get('domain');
  const difficulty = params.get('difficulty');
  const challengeIdxStr = params.get('challengeIndex');

  if (view === 'codescroll' && domain && difficulty) {
    const domainSelect = document.getElementById('codescroll-domain-select');
    const diffSelect = document.getElementById('codescroll-difficulty-select');

    if (domainSelect) domainSelect.value = domain;
    if (diffSelect) diffSelect.value = difficulty;

    filterChallenges(domain, difficulty);

    const idx = parseInt(challengeIdxStr, 10);
    if (!isNaN(idx) && currentDomainChallenges[idx]) {
      loadChallenge(idx);
    }
  }
}

function setIdeMode(mode) {
  activeIdeMode = mode;

  const tabChallenge = document.getElementById('tab-mode-challenge');
  const tabSandbox = document.getElementById('tab-mode-sandbox');
  const langSelectContainer = document.getElementById('sandbox-lang-select-container');
  const langBadge = document.getElementById('current-lesson-lang');
  const helpBar = document.getElementById('codescroll-help-bar');
  const btnSubmit = document.getElementById('btn-submit-code');
  const btnShare = document.getElementById('btn-share-scholarcircle');
  const titleEl = document.getElementById('current-lesson-title');
  const descEl = document.getElementById('lesson-desc');
  const fileNameEl = document.getElementById('unified-editor-file-name');
  const modeIndicatorEl = document.getElementById('unified-editor-mode-indicator');
  const hintDrawer = document.getElementById('codescroll-hint-drawer');
  const codeEditor = document.getElementById('code-editor-input');
  const consoleEl = document.getElementById('console-output-text');

  if (mode === 'challenge') {
    if (tabChallenge) tabChallenge.className = 'btn btn-sm primary-btn';
    if (tabSandbox) tabSandbox.className = 'btn btn-sm secondary-btn';
    if (langSelectContainer) langSelectContainer.style.display = 'none';
    if (langBadge) langBadge.style.display = 'inline-block';
    if (helpBar) helpBar.style.display = 'flex';
    if (btnSubmit) btnSubmit.style.display = 'inline-flex';
    if (btnShare) btnShare.style.display = 'inline-flex';
    if (modeIndicatorEl) modeIndicatorEl.innerText = 'Challenge Quest';

    loadChallenge(activeChallengeIndex);
  } else {
    // Free Practice Mode
    if (tabChallenge) tabChallenge.className = 'btn btn-sm secondary-btn';
    if (tabSandbox) tabSandbox.className = 'btn btn-sm primary-btn';
    if (langSelectContainer) langSelectContainer.style.display = 'flex';
    if (langBadge) langBadge.style.display = 'none';
    if (helpBar) helpBar.style.display = 'none';
    if (btnSubmit) btnSubmit.style.display = 'none';
    if (btnShare) btnShare.style.display = 'none';
    if (hintDrawer) hintDrawer.style.display = 'none';
    if (modeIndicatorEl) modeIndicatorEl.innerText = 'Free Practice';

    if (titleEl) titleEl.innerText = '🧪 Free Practice Sandbox — Multi-Language Runner';
    if (descEl) descEl.innerHTML = '<p style="color: rgba(245,232,215,0.7); font-size: 13px;">Write and execute arbitrary code in <b>Python 3, JavaScript, C, C++, or Ruby</b> powered by Judge0 backend execution engine.</p>';

    const langSelect = document.getElementById('sandbox-lang-select');
    const selectedLang = langSelect ? langSelect.value : 'python';
    if (fileNameEl) fileNameEl.innerText = SANDBOX_LANG_TAG[selectedLang] || 'script.src';
    if (codeEditor) codeEditor.value = SANDBOX_STARTER[selectedLang] || '';
    if (consoleEl) consoleEl.innerText = '[Sandbox] Ready to run multi-language code via Judge0 API.';
  }
}

function resetHelpStage() {
  helpStage = 0;
  const btnHelp = document.getElementById('btn-codescroll-help');
  const indicator = document.getElementById('codescroll-help-stage-indicator');
  const drawer = document.getElementById('codescroll-hint-drawer');

  if (btnHelp) {
    btnHelp.innerText = '💡 Need Help? (Stage 1/3)';
    btnHelp.disabled = false;
  }
  if (indicator) indicator.innerText = 'Click Help for progressive guidance';
  if (drawer) {
    drawer.style.display = 'none';
    drawer.innerHTML = '';
  }
}

function handleHelpButtonClick() {
  const challenge = currentDomainChallenges[activeChallengeIndex];
  if (!challenge) return;

  const drawer = document.getElementById('codescroll-hint-drawer');
  const btnHelp = document.getElementById('btn-codescroll-help');
  const indicator = document.getElementById('codescroll-help-stage-indicator');
  if (!drawer) return;

  helpStage++;
  drawer.style.display = 'block';

  if (helpStage === 1) {
    // Stage 1: General Conceptual Hint
    const conceptHint = challenge.hintStage1 || challenge.hint || `Focus on understanding the problem inputs and expected return value for ${challenge.title}.`;
    drawer.innerHTML = `
      <div style="font-size: 12px; font-weight: 800; color: #f59e0b; margin-bottom: 6px;">💡 Stage 1 — General Conceptual Hint</div>
      <div style="font-size: 12px; color: #f5e8d7; line-height: 1.5;">${conceptHint}</div>
    `;
    if (btnHelp) btnHelp.innerText = '💡 Need more help? (Stage 2/3)';
    if (indicator) indicator.innerText = 'Stage 1/3: General Concept Shown';
  } else if (helpStage === 2) {
    // Stage 2: Specific Hint & Partial Approach / Pseudocode
    const conceptHint = challenge.hintStage1 || challenge.hint || `Focus on understanding the problem inputs and expected return value.`;
    const approachHint = challenge.hintStage2 || challenge.explanation || `Step 1: Parse/inspect function arguments.\nStep 2: Apply logic statements.\nStep 3: Return computed result.`;
    drawer.innerHTML = `
      <div style="font-size: 12px; font-weight: 800; color: #f59e0b; margin-bottom: 6px;">💡 Stage 1 — General Concept</div>
      <div style="font-size: 12px; color: rgba(245,232,215,0.7); margin-bottom: 10px;">${conceptHint}</div>
      <div style="font-size: 12px; font-weight: 800; color: #38bdf8; margin-bottom: 6px;">🧩 Stage 2 — Specific Approach & Pseudocode</div>
      <div style="font-size: 12px; color: #f5e8d7; line-height: 1.5; white-space: pre-line;">${approachHint}</div>
    `;
    if (btnHelp) btnHelp.innerText = '🔓 View Full Solution (Stage 3/3)';
    if (indicator) indicator.innerText = 'Stage 2/3: Pseudocode & Approach Shown';
  } else {
    // Stage 3: Full Solution Code & Explanation
    const conceptHint = challenge.hintStage1 || challenge.hint || `Focus on understanding the problem inputs.`;
    const approachHint = challenge.hintStage2 || challenge.explanation || `Apply logic statements and return computed output.`;
    const solutionCode = challenge.hintStage3 || challenge.solution || challenge.validator || `// Solution for ${challenge.title}\nfunction solve() {\n  return true;\n}`;
    drawer.innerHTML = `
      <div style="font-size: 12px; font-weight: 800; color: #f59e0b; margin-bottom: 6px;">💡 Stage 1 — General Concept</div>
      <div style="font-size: 12px; color: rgba(245,232,215,0.7); margin-bottom: 10px;">${conceptHint}</div>
      <div style="font-size: 12px; font-weight: 800; color: #38bdf8; margin-bottom: 6px;">🧩 Stage 2 — Specific Approach</div>
      <div style="font-size: 12px; color: rgba(245,232,215,0.7); margin-bottom: 10px; white-space: pre-line;">${approachHint}</div>
      <div style="font-size: 12px; font-weight: 800; color: #10b981; margin-bottom: 6px;">🔓 Stage 3 — Full Solution Code</div>
      <pre style="margin: 0; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; font-family: 'Fira Code', monospace; font-size: 12px; color: #38bdf8; overflow-x: auto;">${solutionCode}</pre>
    `;
    if (btnHelp) {
      btnHelp.innerText = '✅ Full Solution Displayed';
      btnHelp.disabled = true;
    }
    if (indicator) indicator.innerText = 'Stage 3/3: Full Solution Unlocked';
  }
}

async function openShareScholarCircleModal() {
  const modal = document.getElementById('modal-share-scholarcircle');
  const friendsListEl = document.getElementById('share-friends-list');
  const statusEl = document.getElementById('share-modal-status');
  if (!modal || !friendsListEl) return;

  modal.style.display = 'flex';
  if (statusEl) statusEl.innerText = '';
  friendsListEl.innerHTML = '<div style="font-size: 12px; color: rgba(245,232,215,0.5); text-align: center; padding: 10px;">Loading ScholarCircle friends...</div>';

  try {
    const res = await api.getFriendsList();

    if (!res.ok) throw new Error(res.error || 'Failed to fetch friends');
    const friends = (res.data && res.data.friends) || (Array.isArray(res.data) ? res.data : []);

    if (friends.length === 0) {
      friendsListEl.innerHTML = '<div style="font-size: 12px; color: rgba(245,232,215,0.5); text-align: center; padding: 10px;">No ScholarCircle friends found. Add friends in ScholarCircle first!</div>';
      return;
    }

    friendsListEl.innerHTML = '';
    const currentChallenge = currentDomainChallenges[activeChallengeIndex] || { title: 'Quest Challenge' };

    friends.forEach(friend => {
      const item = document.createElement('div');
      item.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(20,16,11,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 8px;';
      item.innerHTML = `
        <div>
          <div style="font-size: 12px; font-weight: 800; color: #f5e8d7;">${friend.username || friend.name || 'Scholar Friend'}</div>
          <div style="font-size: 10px; color: #10b981;">LV ${friend.level || 1} &nbsp;•&nbsp; Online</div>
        </div>
        <button class="btn btn-sm primary-btn btn-send-share" data-friend-id="${friend.id || friend._id}" data-friend-name="${friend.username || friend.name}" style="padding: 3px 10px; font-size: 11px; font-weight: 800;">
          Share 📡
        </button>
      `;

      item.querySelector('.btn-send-share').addEventListener('click', async (e) => {
        const friendId = e.currentTarget.getAttribute('data-friend-id');
        const friendName = e.currentTarget.getAttribute('data-friend-name');

        const shareUrl = `${window.location.origin}/?view=codescroll&domain=${encodeURIComponent(selectedDomain)}&difficulty=${selectedDifficulty}&challengeIndex=${activeChallengeIndex}`;
        const messageText = `⚔️ ScholarQuest Challenge Share!\nCheck out this challenge in CodeScroll: [${selectedDomain} - ${selectedDifficulty}] ${currentChallenge.title}\n👉 Open Quest: ${shareUrl}`;

        if (statusEl) {
          statusEl.style.color = '#f59e0b';
          statusEl.innerText = `Sharing with ${friendName}...`;
        }

        try {
          const sendRes = await api.sendDM(friendId, messageText);

          if (sendRes.ok) {
            if (statusEl) {
              statusEl.style.color = '#10b981';
              statusEl.innerText = `✓ Shared with ${friendName}! Direct message sent.`;
            }
            setTimeout(() => {
              modal.style.display = 'none';
            }, 1500);
          } else {
            if (statusEl) {
              statusEl.style.color = '#ef4444';
              statusEl.innerText = sendRes.error || 'Failed to send share message.';
            }
          }
        } catch (err) {
          if (statusEl) {
            statusEl.style.color = '#ef4444';
            statusEl.innerText = `Error sending DM: ${err.message}`;
          }
        }
      });

      friendsListEl.appendChild(item);
    });
  } catch (err) {
    friendsListEl.innerHTML = `<div style="font-size: 12px; color: #ef4444; text-align: center; padding: 10px;">Failed to load friends: ${err.message}</div>`;
  }
}

function loadChallenge(idx) {
  if (!currentDomainChallenges[idx]) return;
  activeChallengeIndex = idx;
  const challenge = currentDomainChallenges[idx];

  resetHelpStage();

  const titleEl = document.getElementById('current-lesson-title');
  if (titleEl) titleEl.innerText = `${challenge.domain} (${challenge.difficulty}): ${challenge.title}`;

  const langEl = document.getElementById('current-lesson-lang');
  if (langEl) langEl.innerText = challenge.lang || 'JavaScript';

  const descEl = document.getElementById('lesson-desc');
  if (descEl) descEl.innerHTML = challenge.problemStatement;

  const fileNameEl = document.getElementById('unified-editor-file-name');
  if (fileNameEl) fileNameEl.innerText = `${(challenge.language || 'javascript').toLowerCase()}.src`;

  const editorInput = document.getElementById('code-editor-input');
  if (editorInput) editorInput.value = challenge.starterCode;

  const consoleEl = document.getElementById('console-output-text');
  if (consoleEl) consoleEl.innerText = `[System] ${challenge.domain} (${challenge.difficulty}) Scroll Loaded. Ready to run assertions.`;
}

function setupWorkspaceEvents() {
  // Mode Tab Listeners
  document.getElementById('tab-mode-challenge')?.addEventListener('click', () => setIdeMode('challenge'));
  document.getElementById('tab-mode-sandbox')?.addEventListener('click', () => setIdeMode('sandbox'));

  // Language Selector for Free Practice Mode
  document.getElementById('sandbox-lang-select')?.addEventListener('change', (e) => {
    if (activeIdeMode === 'sandbox') {
      const lang = e.target.value;
      const codeEditor = document.getElementById('code-editor-input');
      const fileNameEl = document.getElementById('unified-editor-file-name');

      if (codeEditor) codeEditor.value = SANDBOX_STARTER[lang] || '';
      if (fileNameEl) fileNameEl.innerText = SANDBOX_LANG_TAG[lang] || `${lang}.src`;
    }
  });

  // Progressive Help Button
  document.getElementById('btn-codescroll-help')?.addEventListener('click', handleHelpButtonClick);

  // Share to ScholarCircle Button & Modal Close
  document.getElementById('btn-share-scholarcircle')?.addEventListener('click', openShareScholarCircleModal);
  document.getElementById('btn-close-share-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-share-scholarcircle');
    if (modal) modal.style.display = 'none';
  });

  // Run Code Button (Dispatches based on activeIdeMode)
  document.getElementById('btn-run-code')?.addEventListener('click', () => {
    if (activeIdeMode === 'sandbox') {
      runSandboxCode();
    } else {
      runUserCode();
    }
  });

  document.getElementById('btn-submit-code')?.addEventListener('click', submitUserCode);
  document.getElementById('btn-clear-console')?.addEventListener('click', () => {
    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = '';
  });
}

async function runSandboxCode() {
  const codeEditor = document.getElementById('code-editor-input');
  const langSelect = document.getElementById('sandbox-lang-select');
  const consoleEl = document.getElementById('console-output-text');
  const btnRun = document.getElementById('btn-run-code');

  const code = codeEditor ? codeEditor.value : '';
  const language = langSelect ? langSelect.value : 'python';

  if (consoleEl) {
    consoleEl.style.color = '#f59e0b';
    consoleEl.innerText = `[Sandbox] Executing ${language.toUpperCase()} code via Judge0 execution API...`;
  }

  if (btnRun) btnRun.disabled = true;

  try {
    const res = await fetch('http://localhost:3000/api/codescroll/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });

    const data = await res.json();
    if (btnRun) btnRun.disabled = false;

    if (consoleEl) {
      if (data.stderr) {
        consoleEl.style.color = '#ef4444';
        consoleEl.innerText = (data.stdout ? data.stdout + '\n' : '') + '[STDERR / ERROR]\n' + data.stderr;
      } else {
        consoleEl.style.color = '#10b981';
        consoleEl.innerText = data.stdout || `[Status: ${data.status || 'Success'} - No output printed]`;
      }
    }
  } catch (err) {
    if (btnRun) btnRun.disabled = false;
    if (consoleEl) {
      consoleEl.style.color = '#ef4444';
      consoleEl.innerText = `[Connection Error] Failed to reach code execution server: ${err.message}`;
    }
  }
}

function runUserCode() {
  const codeEditor = document.getElementById('code-editor-input');
  const consoleEl = document.getElementById('console-output-text');
  const code = codeEditor ? codeEditor.value : '';

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
  };

  try {
    const runner = new Function(code);
    runner();
    console.log = originalLog;
    const outputText = logs.length > 0 ? logs.join('\n') : '[Success] Code ran without error (no console output).';
    if (consoleEl) {
      consoleEl.style.color = '#10b981';
      consoleEl.innerText = outputText;
    }
  } catch (err) {
    console.log = originalLog;
    if (consoleEl) {
      consoleEl.style.color = '#ef4444';
      consoleEl.innerText = `[Execution Error] ${err.message}`;
    }
  }
}

function submitUserCode() {
  const codeEditor = document.getElementById('code-editor-input');
  const consoleEl = document.getElementById('console-output-text');
  const challenge = currentDomainChallenges[activeChallengeIndex];
  if (!challenge) return;

  const code = codeEditor ? codeEditor.value : '';
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
  };

  try {
    const verifyScript = `
      ${code}
      \n
      ${challenge.validator || ''}
    `;
    const runner = new Function(verifyScript);
    runner();

    console.log = originalLog;

    const xp = challenge.xpReward || 30;
    const coins = challenge.coinReward || 10;

    if (!challenge.completed) {
      challenge.completed = true;
      saveCompletedLesson(challenge.id);

      addXP(xp);
      addCoins(coins);

      if (state && state.stats) {
        state.stats.lessonsCompleted = (state.stats.lessonsCompleted || 0) + 1;
      }
      saveState();
      updateUI();
      renderChallengesList();

      if (consoleEl) {
        consoleEl.style.color = '#10b981';
        consoleEl.innerText = `[PASS] Verification Complete! Quest Cleared! +${xp} XP / +${coins} Coins awarded.\n${logs.join('\n')}`;
      }
    } else {
      if (consoleEl) {
        consoleEl.style.color = '#10b981';
        consoleEl.innerText = `[PASS] Verification Complete! Scroll already cleared.\n${logs.join('\n')}`;
      }
    }
  } catch (err) {
    console.log = originalLog;
    if (consoleEl) {
      consoleEl.style.color = '#ef4444';
      consoleEl.innerText = `[FAIL] Code failed assertion checks:\n-> ${err.message}`;
    }
  }
}

async function fetchAndDisplayLeetCodeStats(username) {
  const statusMsg = document.getElementById('leetcode-status-msg');
  const displayContainer = document.getElementById('leetcode-stats-display');

  if (!username) {
    if (displayContainer) displayContainer.style.display = 'none';
    return;
  }

  if (statusMsg) {
    statusMsg.style.color = '#f59e0b';
    statusMsg.innerText = `Fetching stats for @${username}...`;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/codescroll/leetcode-stats/${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (displayContainer) displayContainer.style.display = 'block';

    const dispUsername = document.getElementById('leetcode-disp-username');
    const profileLink = document.getElementById('leetcode-profile-link');
    const dispRank = document.getElementById('leetcode-disp-rank');
    const dispRep = document.getElementById('leetcode-disp-rep');
    const statTotal = document.getElementById('leetcode-stat-total');
    const statEasy = document.getElementById('leetcode-stat-easy');
    const statMed = document.getElementById('leetcode-stat-medium');
    const statHard = document.getElementById('leetcode-stat-hard');

    if (dispUsername) dispUsername.innerText = username;
    if (profileLink) profileLink.href = `https://leetcode.com/${username}/`;
    if (dispRank) dispRank.innerText = data.ranking ? data.ranking.toLocaleString() : 'N/A';
    if (dispRep) dispRep.innerText = data.reputation ? data.reputation.toLocaleString() : '0';
    if (statTotal) statTotal.innerText = data.totalSolved ?? 0;
    if (statEasy) statEasy.innerText = data.easySolved ?? 0;
    if (statMed) statMed.innerText = data.mediumSolved ?? 0;
    if (statHard) statHard.innerText = data.hardSolved ?? 0;

    if (statusMsg) {
      statusMsg.style.color = '#10b981';
      statusMsg.innerText = `✓ Linked to @${username}`;
    }
  } catch (err) {
    if (statusMsg) {
      statusMsg.style.color = '#ef4444';
      statusMsg.innerText = `Failed to load LeetCode stats for @${username}: ${err.message}`;
    }
  }
}

function setupLeetCodeEvents() {
  const btnLink = document.getElementById('btn-link-leetcode');
  const btnUnlink = document.getElementById('btn-unlink-leetcode');
  const usernameInput = document.getElementById('leetcode-username-input');

  if (btnLink && !btnLink.dataset.bound) {
    btnLink.dataset.bound = 'true';
    btnLink.addEventListener('click', async () => {
      const username = usernameInput ? usernameInput.value.trim() : '';
      if (!username) return;

      if (state && state.user) {
        state.user.leetcodeUsername = username;
        saveState();
      }

      try {
        const token = auth.getToken();
        await fetch('http://localhost:3000/api/user/leetcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: state?.user?.id, leetcodeUsername: username })
        });
      } catch (e) {
        console.warn('Failed to persist leetcodeUsername to backend:', e);
      }

      await fetchAndDisplayLeetCodeStats(username);
    });
  }

  if (btnUnlink && !btnUnlink.dataset.bound) {
    btnUnlink.dataset.bound = 'true';
    btnUnlink.addEventListener('click', async () => {
      if (state && state.user) {
        state.user.leetcodeUsername = '';
        saveState();
      }
      const displayContainer = document.getElementById('leetcode-stats-display');
      const statusMsg = document.getElementById('leetcode-status-msg');
      if (usernameInput) usernameInput.value = '';
      if (displayContainer) displayContainer.style.display = 'none';
      if (statusMsg) statusMsg.innerText = '';

      try {
        const token = auth.getToken();
        await fetch('http://localhost:3000/api/user/leetcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: state?.user?.id, leetcodeUsername: '' })
        });
      } catch (e) {
        console.warn('Failed to clear leetcodeUsername on backend:', e);
      }
    });
  }

  const existingUsername = state?.user?.leetcodeUsername || localStorage.getItem('scholarquest_leetcode_username');
  if (existingUsername) {
    if (usernameInput) usernameInput.value = existingUsername;
    fetchAndDisplayLeetCodeStats(existingUsername);
  }
}

function loadCompletedLessons() {
  const completedIds = JSON.parse(localStorage.getItem('scholarquest_completed_scrolls') || '[]');
  FULL_CODE_BANK.forEach(c => {
    if (completedIds.includes(c.id)) {
      c.completed = true;
    }
  });
}

function saveCompletedLesson(challengeId) {
  const completedIds = JSON.parse(localStorage.getItem('scholarquest_completed_scrolls') || '[]');
  if (!completedIds.includes(challengeId)) {
    completedIds.push(challengeId);
  }
  localStorage.setItem('scholarquest_completed_scrolls', JSON.stringify(completedIds));
}

function setupDomainFilter() {
  const select = document.getElementById('codescroll-domain-select');
  if (!select) return;

  select.innerHTML = '';
  DOMAINS.forEach(dom => {
    const opt = document.createElement('option');
    opt.value = dom;
    opt.innerText = `${dom} Challenges`;
    select.appendChild(opt);
  });

  select.value = selectedDomain;

  if (!select.dataset.bound) {
    select.dataset.bound = 'true';
    select.addEventListener('change', (e) => {
      selectedDomain = e.target.value;
      filterChallenges(selectedDomain, selectedDifficulty);
    });
  }
}

function setupDifficultyFilter() {
  const select = document.getElementById('codescroll-difficulty-select');
  if (!select) return;

  select.value = selectedDifficulty;

  if (!select.dataset.bound) {
    select.dataset.bound = 'true';
    select.addEventListener('change', (e) => {
      selectedDifficulty = e.target.value;
      filterChallenges(selectedDomain, selectedDifficulty);
    });
  }
}

let currentPage = 1;
const pageSize = 5;

function filterChallenges(domain, difficulty) {
  selectedDomain = domain;
  selectedDifficulty = difficulty;

  currentDomainChallenges = FULL_CODE_BANK.filter(c => {
    const domainMatch = (c.domain || '').toLowerCase() === domain.toLowerCase() ||
                        (domain === 'Python' && c.language === 'python') ||
                        (domain === 'JavaScript' && c.language === 'javascript') ||
                        (domain === 'Ruby Programming' && (c.language === 'ruby' || c.domain === 'Ruby'));
    const diffMatch = (c.difficulty || 'Beginner').toLowerCase() === difficulty.toLowerCase();
    return domainMatch && diffMatch;
  });

  if (currentDomainChallenges.length === 0) {
    currentDomainChallenges = FULL_CODE_BANK.slice(0, 40);
  }

  currentPage = 1;
  activeChallengeIndex = 0;
  renderChallengesList();
  if (currentDomainChallenges.length > 0) {
    loadChallenge(0);
  }
}

function renderChallengesList() {
  const container = document.getElementById('lessons-list');
  if (!container) return;
  container.innerHTML = '';

  const totalPages = Math.ceil(currentDomainChallenges.length / pageSize) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * pageSize;
  const pageChallenges = currentDomainChallenges.slice(startIndex, startIndex + pageSize);

  const diffColor = selectedDifficulty === 'Beginner' ? '#10b981' : (selectedDifficulty === 'Intermediate' ? '#f59e0b' : '#ef4444');

  pageChallenges.forEach((challenge, relativeIdx) => {
    const globalIdx = startIndex + relativeIdx;
    const item = document.createElement('div');
    item.className = `lesson-item ${globalIdx === activeChallengeIndex ? 'active' : ''}`;
    item.style.cssText = `
      padding: 10px 12px; background: ${globalIdx === activeChallengeIndex ? 'rgba(245,158,11,0.15)' : 'rgba(20,16,11,0.6)'};
      border: 1px solid ${globalIdx === activeChallengeIndex ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.12)'};
      border-radius: 10px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: space-between;
    `;

    item.innerHTML = `
      <div class="lesson-info">
        <div style="font-size: 12px; font-weight: 800; color: ${globalIdx === activeChallengeIndex ? '#f59e0b' : '#f5e8d7'};">${globalIdx + 1}. ${challenge.title}</div>
        <div style="font-size: 10px; color: ${diffColor}; margin-top: 2px; font-weight: 800;">+${challenge.xpReward} XP / +${challenge.coinReward} Coins</div>
      </div>
      <div>
        ${challenge.completed ? '<span style="font-size: 10px; background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid #10b981; padding: 2px 6px; border-radius: 6px; font-weight: 800;">Cleared</span>' : '<span style="font-size: 10px; color: rgba(245,232,215,0.4);">Locked</span>'}
      </div>
    `;

    item.addEventListener('click', () => {
      activeChallengeIndex = globalIdx;
      renderChallengesList();
      loadChallenge(globalIdx);
    });

    container.appendChild(item);
  });

  // Render Pagination Controls below lessons list
  let paginationEl = document.getElementById('codescroll-pagination');
  if (!paginationEl && container.parentNode) {
    paginationEl = document.createElement('div');
    paginationEl.id = 'codescroll-pagination';
    paginationEl.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(245,158,11,0.2); flex-wrap: wrap;';
    container.parentNode.appendChild(paginationEl);
  }

  if (paginationEl) {
    let pageBtnsHTML = '';
    for (let p = 1; p <= totalPages; p++) {
      pageBtnsHTML += `
        <button class="btn btn-sm ${p === currentPage ? 'primary-btn' : 'secondary-btn'}" data-page="${p}" style="padding: 2px 6px; font-size: 11px; font-weight: 800; min-width: 22px;">
          ${p}
        </button>
      `;
    }

    paginationEl.innerHTML = `
      <button class="btn secondary-btn btn-sm" id="btn-page-prev" ${currentPage <= 1 ? 'disabled' : ''} style="padding: 3px 6px; font-size: 11px;">
        ◀ Prev
      </button>
      <div style="display: flex; gap: 3px; flex-wrap: wrap; justify-content: center;">
        ${pageBtnsHTML}
      </div>
      <button class="btn secondary-btn btn-sm" id="btn-page-next" ${currentPage >= totalPages ? 'disabled' : ''} style="padding: 3px 6px; font-size: 11px;">
        Next ▶
      </button>
    `;

    const changePage = (targetPage) => {
      if (targetPage < 1 || targetPage > totalPages) return;
      currentPage = targetPage;
      const newStartIndex = (currentPage - 1) * pageSize;
      activeChallengeIndex = newStartIndex;
      renderChallengesList();
      loadChallenge(newStartIndex);
    };

    paginationEl.querySelector('#btn-page-prev')?.addEventListener('click', () => {
      changePage(currentPage - 1);
    });

    paginationEl.querySelector('#btn-page-next')?.addEventListener('click', () => {
      changePage(currentPage + 1);
    });

    paginationEl.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        changePage(p);
      });
    });
  }
}


