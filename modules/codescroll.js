/* ==========================================
   ScholarQuest CodeScroll Module
   3-Tier Difficulty System (Beginner, Intermediate, Advanced)
   1,080 Practical Coding Challenges across 9 Technical Domains
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
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

export function initCodeScroll() {
  loadCompletedLessons();
  setupDomainFilter();
  setupDifficultyFilter();
  filterChallenges('Python', 'Beginner');
  setupWorkspaceEvents();
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

  select.addEventListener('change', (e) => {
    selectedDomain = e.target.value;
    filterChallenges(selectedDomain, selectedDifficulty);
  });
}

function setupDifficultyFilter() {
  const select = document.getElementById('codescroll-difficulty-select');
  if (!select) return;

  select.value = selectedDifficulty;

  select.addEventListener('change', (e) => {
    selectedDifficulty = e.target.value;
    filterChallenges(selectedDomain, selectedDifficulty);
  });
}

function filterChallenges(domain, difficulty) {
  selectedDomain = domain;
  selectedDifficulty = difficulty;

  currentDomainChallenges = FULL_CODE_BANK.filter(c => c.domain === domain && c.difficulty === difficulty);
  if (currentDomainChallenges.length === 0) {
    currentDomainChallenges = FULL_CODE_BANK.filter(c => c.domain === domain);
  }

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

  const diffColor = selectedDifficulty === 'Beginner' ? '#10b981' : (selectedDifficulty === 'Intermediate' ? '#f59e0b' : '#ef4444');

  currentDomainChallenges.forEach((challenge, idx) => {
    const item = document.createElement('div');
    item.className = `lesson-item ${idx === activeChallengeIndex ? 'active' : ''}`;
    item.style.cssText = `
      padding: 12px 14px; background: ${idx === activeChallengeIndex ? 'rgba(245,158,11,0.15)' : 'rgba(20,16,11,0.6)'};
      border: 1px solid ${idx === activeChallengeIndex ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.12)'};
      border-radius: 12px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s ease;
      display: flex; align-items: center; justify-content: space-between;
    `;

    item.innerHTML = `
      <div class="lesson-info">
        <div style="font-size: 13px; font-weight: 800; color: ${idx === activeChallengeIndex ? '#f59e0b' : '#f5e8d7'};">${challenge.title}</div>
        <div style="font-size: 10px; color: ${diffColor}; margin-top: 2px; font-weight: 800;">+${challenge.xpReward} XP / +${challenge.coinReward} Coins</div>
      </div>
      <div>
        ${challenge.completed ? '<span style="font-size: 10px; background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid #10b981; padding: 2px 8px; border-radius: 6px; font-weight: 800;">Cleared</span>' : '<span style="font-size: 10px; color: rgba(245,232,215,0.4);">Locked</span>'}
      </div>
    `;

    item.addEventListener('click', () => {
      activeChallengeIndex = idx;
      renderChallengesList();
      loadChallenge(idx);
    });

    container.appendChild(item);
  });
}

function loadChallenge(idx) {
  if (!currentDomainChallenges[idx]) return;
  activeChallengeIndex = idx;
  const challenge = currentDomainChallenges[idx];

  const titleEl = document.getElementById('current-lesson-title');
  if (titleEl) titleEl.innerText = `${challenge.domain} (${challenge.difficulty}): ${challenge.title}`;

  const langEl = document.getElementById('current-lesson-lang');
  if (langEl) langEl.innerText = challenge.lang || 'JavaScript';

  const descEl = document.getElementById('lesson-desc');
  if (descEl) descEl.innerHTML = challenge.problemStatement;

  const editorInput = document.getElementById('code-editor-input');
  if (editorInput) editorInput.value = challenge.starterCode;

  const consoleEl = document.getElementById('console-output-text');
  if (consoleEl) consoleEl.innerText = `[System] ${challenge.domain} (${challenge.difficulty}) Scroll Loaded. Ready to run assertions.`;

  renderHintDrawer(challenge);
}

function renderHintDrawer(challenge) {
  const container = document.getElementById('codescroll-hint-drawer');
  if (!container) return;

  container.innerHTML = `
    <button type="button" id="btn-toggle-hint" class="btn secondary-btn btn-sm" style="width: 100%; margin-top: 12px; font-size: 11px;">
      💡 Toggle Hint & Solution Explanation
    </button>
    <div id="codescroll-hint-content" class="hidden" style="margin-top: 10px; padding: 12px; background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); border-radius: 10px; font-size: 12px; color: #f5e8d7; display: none;">
      <div style="font-weight: 800; color: #f59e0b; margin-bottom: 4px;">💡 Hint:</div>
      <div style="margin-bottom: 8px;">${challenge.hint || 'No hint provided.'}</div>
      <div style="font-weight: 800; color: #10b981; margin-bottom: 4px;">📘 Solution Explanation:</div>
      <div>${challenge.explanation || 'Write standard code according to goal requirements.'}</div>
    </div>
  `;

  document.getElementById('btn-toggle-hint')?.addEventListener('click', () => {
    const content = document.getElementById('codescroll-hint-content');
    if (content) {
      const isHidden = content.classList.contains('hidden');
      if (isHidden) {
        content.classList.remove('hidden');
        content.style.display = 'block';
      } else {
        content.classList.add('hidden');
        content.style.display = 'none';
      }
    }
  });
}

function setupWorkspaceEvents() {
  document.getElementById('btn-run-code')?.addEventListener('click', runUserCode);
  document.getElementById('btn-submit-code')?.addEventListener('click', submitUserCode);
  document.getElementById('btn-clear-console')?.addEventListener('click', () => {
    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = '';
  });
}

function runUserCode() {
  const code = document.getElementById('code-editor-input')?.value || '';
  const logs = [];

  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
  };

  try {
    const runner = new Function(code);
    runner();
    console.log = originalLog;

    const outputText = logs.length > 0 ? logs.join('\n') : '[Success] Code ran cleanly with no output errors.';
    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = outputText;
    return true;
  } catch (err) {
    console.log = originalLog;
    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = `[Error] ${err.message}`;
    return false;
  }
}

function submitUserCode() {
  const code = document.getElementById('code-editor-input')?.value || '';
  const challenge = currentDomainChallenges[activeChallengeIndex];
  if (!challenge) return;

  const originalLog = console.log;
  const logs = [];
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
  };

  try {
    const verifyScript = `
      ${code}
      ${challenge.validator}
    `;
    const runner = new Function(verifyScript);
    runner();
    console.log = originalLog;

    if (!challenge.completed) {
      challenge.completed = true;
      saveCompletedLesson(challenge.id);

      let xpFinal = challenge.xpReward;
      let coinFinal = challenge.coinReward;

      const equippedPet = state.equipped ? state.equipped.pet : 'none';
      if (equippedPet === 'baby_dragon' && xpFinal > 0) {
        xpFinal += Math.max(1, Math.round(xpFinal * 0.02));
      }
      if (equippedPet === 'silver_serpent') {
        coinFinal += 5;
      }

      addXP(xpFinal);
      addCoins(coinFinal);

      if (!state.stats) state.stats = {};
      state.stats.lessonsCompleted = (state.stats.lessonsCompleted || 0) + 1;
      saveState();
      updateUI();

      renderChallengesList();
      alert(`🎉 Quest Cleared! +${xpFinal} XP / +${coinFinal} Coins awarded!`);
    } else {
      alert('You have already claimed rewards for clearing this scroll!');
    }

    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = `[PASS] Assertions Verified!\n${logs.join('\n')}`;
  } catch (err) {
    console.log = originalLog;
    const consoleEl = document.getElementById('console-output-text');
    if (consoleEl) consoleEl.innerText = `[FAIL] Code failed assertion checks:\n-> ${err.message}`;
  }
}
