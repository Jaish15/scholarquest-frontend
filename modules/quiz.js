/* ==========================================
   ScholarQuest QuizForge Module
   3-Tier Difficulty System (Beginner, Intermediate, Advanced)
   1,080 Questions across 9 Domains with Adaptive Explanations
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
import { QUIZ_BANK } from '../src/data/quizBank.js';
import { PYTHON_QUIZ_QUESTIONS } from '../src/data/domains/python.js';
import { JAVASCRIPT_QUIZ_QUESTIONS } from '../src/data/domains/javascript.js';
import { UML_QUIZ_QUESTIONS } from '../src/data/domains/uml.js';
import { SOFTWARE_TESTING_QUIZ_QUESTIONS } from '../src/data/domains/softwareTesting.js';
import { ADVANCED_JAVA_QUIZ_QUESTIONS } from '../src/data/domains/advancedJava.js';
import { RUBY_QUIZ_QUESTIONS } from '../src/data/domains/ruby.js';
import { ML_QUIZ_QUESTIONS } from '../src/data/domains/machineLearning.js';
import { DL_QUIZ_QUESTIONS } from '../src/data/domains/deepLearning.js';
import { CYBERSECURITY_QUIZ_QUESTIONS } from '../src/data/domains/cybersecurity.js';

// Aggregate 1,080 Quiz Questions across all 9 Domains & 3 Tiers
export const FULL_QUIZ_BANK = [
  ...PYTHON_QUIZ_QUESTIONS,
  ...JAVASCRIPT_QUIZ_QUESTIONS,
  ...UML_QUIZ_QUESTIONS,
  ...SOFTWARE_TESTING_QUIZ_QUESTIONS,
  ...ADVANCED_JAVA_QUIZ_QUESTIONS,
  ...RUBY_QUIZ_QUESTIONS,
  ...ML_QUIZ_QUESTIONS,
  ...DL_QUIZ_QUESTIONS,
  ...CYBERSECURITY_QUIZ_QUESTIONS,
  ...QUIZ_BANK
];

const DOMAINS = [
  'Python', 'JavaScript', 'UML', 'Software Testing',
  'Advanced Java', 'Ruby Programming', 'Machine Learning',
  'Deep Learning', 'Cybersecurity'
];

let selectedDomainFilter = 'Python';
let selectedDifficultyFilter = 'Beginner';

let activeQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 25;
let answeredCurrentQuestion = false;

export function initQuizzes() {
  renderDomainFilterBar();
  setupDifficultyFilters();
  renderQuizList();
  renderLeaderboard();
  setupEventListeners();
}

function renderDomainFilterBar() {
  const container = document.getElementById('quiz-domain-filters');
  if (!container) return;
  container.innerHTML = '';

  const domainLucideIcons = {
    'Python': 'file-code', 'JavaScript': 'zap', 'UML': 'boxes',
    'Software Testing': 'flask-conical', 'Advanced Java': 'coffee',
    'Ruby Programming': 'gem', 'Machine Learning': 'cpu',
    'Deep Learning': 'brain', 'Cybersecurity': 'shield-check'
  };

  DOMAINS.forEach(dom => {
    const btn = document.createElement('button');
    const isActive = (selectedDomainFilter === dom);
    const iconName = domainLucideIcons[dom] || 'scroll';
    btn.className = `domain-chip ${isActive ? 'active' : ''}`;
    btn.innerHTML = `<span class="domain-icon-wrapper"><i data-lucide="${iconName}" style="width: 16px; height: 16px; stroke: currentColor;"></i></span> <span>${dom}</span>`;
    btn.addEventListener('click', () => {
      selectedDomainFilter = dom;
      renderDomainFilterBar();
      renderQuizList();
    });
    container.appendChild(btn);
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function setupDifficultyFilters() {
  const diffBtns = document.querySelectorAll('#quiz-difficulty-filters .diff-chip');
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      selectedDifficultyFilter = btn.getAttribute('data-diff');
      renderQuizList();
    });
  });
}

export function renderQuizList() {
  const container = document.getElementById('quizzes-container');
  if (!container) return;
  container.innerHTML = '';

  const domainIcons = {
    'Python': '🐍', 'JavaScript': '⚡', 'UML': '📐',
    'Software Testing': '🧪', 'Advanced Java': '☕',
    'Ruby Programming': '💎', 'Machine Learning': '🤖',
    'Deep Learning': '🧠', 'Cybersecurity': '🛡️'
  };

  const pool = FULL_QUIZ_BANK.filter(q => q.domain === selectedDomainFilter && q.difficulty === selectedDifficultyFilter);

  const card = document.createElement('div');
  card.className = 'quiz-card';
  card.style.cssText = `
    background: linear-gradient(145deg, rgba(20,16,11,0.9), rgba(30,22,14,0.95));
    border: 1px solid rgba(245,158,11,0.3); border-radius: 14px; padding: 16px 18px;
    display: flex; flex-direction: column; justify-content: flex-start; gap: 10px; width: 100%; height: auto; align-self: start;
    box-sizing: border-box;
  `;

  const diffColor = selectedDifficultyFilter === 'Beginner' ? '#10b981' : (selectedDifficultyFilter === 'Intermediate' ? '#f59e0b' : '#ef4444');

  card.innerHTML = `
    <div class="quiz-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
      <span class="quiz-subject" style="font-size: 12px; font-weight: 800; color: #f59e0b; text-transform: uppercase;">
        ${domainIcons[selectedDomainFilter] || '📘'} ${selectedDomainFilter}
      </span>
      <span style="font-size: 11px; font-weight: 900; background: rgba(20,16,11,0.8); border: 1px solid ${diffColor}; color: ${diffColor}; padding: 2px 8px; border-radius: 6px;">
        ${selectedDifficultyFilter} Tier
      </span>
    </div>
    <div>
      <h3 class="quiz-title" style="font-size: 17px; font-weight: 800; color: #f5e8d7; margin: 0 0 4px;">
        ${selectedDomainFilter} — ${selectedDifficultyFilter} Quest
      </h3>
      <div style="font-size: 12px; color: rgba(245,232,215,0.65); line-height: 1.4;">
        ${pool.length} total questions in ${selectedDifficultyFilter} pool. Randomized 5-question runs with adaptive feedback.
      </div>
    </div>
    <div class="quiz-xp-payout" style="font-size: 12px; font-weight: 800; color: #10b981; display: flex; align-items: center; gap: 6px; margin-top: 2px;">
      <span>✨ Payout: +75 XP / +25 Coins per completion</span>
    </div>
    <button class="btn primary-btn start-quiz-btn" style="width: 100%; margin-top: 6px; padding: 10px 16px; font-size: 13px;">
      Start ${selectedDifficultyFilter} Battle 🚀
    </button>
  `;

  container.appendChild(card);

  card.querySelector('.start-quiz-btn').addEventListener('click', () => {
    startDomainQuiz(selectedDomainFilter, selectedDifficultyFilter);
  });
}

export async function renderLeaderboard() {
  const container = document.getElementById('quiz-leaderboards');
  if (!container) return;
  container.innerHTML = '';

  let friendsList = [];
  try {
    if (window.api && typeof window.api.getFriends === 'function') {
      const res = await window.api.getFriends();
      if (res && res.ok && Array.isArray(res.data)) {
        friendsList = res.data;
      }
    }
  } catch (err) {
    console.error('[Quiz Leaderboard] Error fetching friends:', err);
  }

  // Current logged in user
  const currentUser = {
    name: state.fullName || state.name || state.username || 'You',
    xp: state.xp || 0,
    avatar: state.avatar || { id: 'peasant' },
    isSelf: true
  };

  if (!friendsList || friendsList.length === 0) {
    // Empty state when user has zero friends
    const emptyCard = document.createElement('div');
    emptyCard.className = 'leader-empty-state';
    emptyCard.style.cssText = 'padding: 20px 12px; text-align: center; color: var(--text-muted); font-size: 12px;';
    emptyCard.innerHTML = `
      <div style="font-size: 28px; margin-bottom: 6px;">⚔️</div>
      <p style="margin: 0 0 10px; color: #f5e8d7; font-weight: 700; line-height: 1.4; font-size: 11px;">
        Connect with friends to see the Hall of Fame — visit ScholarCircle to add scholars!
      </p>
      <button type="button" class="btn primary-btn btn-sm" id="btn-goto-scholarcircle" style="padding: 6px 12px; font-size: 11px; font-weight: 800;">
        Visit ScholarCircle 👥
      </button>
    `;
    container.appendChild(emptyCard);

    document.getElementById('btn-goto-scholarcircle')?.addEventListener('click', () => {
      if (typeof window.navigateTo === 'function') {
        window.navigateTo('studysync');
      }
    });
    return;
  }

  // Combine currentUser + friendsList into ranked leaderboard sorted by XP
  const leaderboardData = [
    currentUser,
    ...friendsList.map(f => ({
      name: f.username || f.fullName || 'Scholar',
      xp: f.xp || 0,
      avatar: f.avatar || { id: 'peasant' },
      isSelf: false
    }))
  ].sort((a, b) => b.xp - a.xp);

  leaderboardData.forEach((user, idx) => {
    const item = document.createElement('div');
    item.className = `leader-item ${user.isSelf ? 'self-leader' : ''}`;
    item.style.cssText = `display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; margin-bottom: 6px; background: ${user.isSelf ? 'rgba(245,158,11,0.15)' : 'rgba(15,23,42,0.4)'}; border: 1px solid ${user.isSelf ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.05)'};`;

    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="leader-rank rank-${idx + 1}" style="font-weight: 800; width: 18px; text-align: center; color: ${idx === 0 ? '#f59e0b' : (idx === 1 ? '#94a3b8' : (idx === 2 ? '#b45309' : '#64748b'))};">#${idx + 1}</span>
        <span class="leader-name" style="font-weight: 700; font-size: 12px; color: ${user.isSelf ? '#f59e0b' : '#f3f4f6'};">${user.name} ${user.isSelf ? '(You)' : ''}</span>
      </div>
      <span class="leader-score" style="font-weight: 800; font-size: 12px; color: #3b82f6;">${user.xp} XP</span>
    `;
    container.appendChild(item);
  });
}

function setupEventListeners() {
  document.getElementById('btn-next-question')?.addEventListener('click', loadNextQuestion);
  document.getElementById('btn-quit-quiz')?.addEventListener('click', quitActiveQuiz);
  document.getElementById('btn-close-results')?.addEventListener('click', closeQuizResults);

  // Create Quiz Custom Flow
  document.getElementById('btn-custom-quiz')?.addEventListener('click', () => {
    const creatorPanel = document.getElementById('quiz-creator-panel');
    if (creatorPanel) {
      creatorPanel.classList.remove('hidden');
      creatorPanel.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.getElementById('btn-close-creator')?.addEventListener('click', () => {
    document.getElementById('quiz-creator-panel')?.classList.add('hidden');
  });

  document.getElementById('custom-quiz-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('quiz-title-input')?.value || 'Custom Forged Quiz';
    const subject = document.getElementById('quiz-subject-input')?.value || selectedDomainFilter;
    const qText = document.querySelector('#creator-questions-list .q-text')?.value || 'Custom Question';
    const opt0 = document.querySelector('#creator-questions-list .opt-0')?.value || 'Option A';
    const opt1 = document.querySelector('#creator-questions-list .opt-1')?.value || 'Option B';
    const opt2 = document.querySelector('#creator-questions-list .opt-2')?.value || 'Option C';
    const opt3 = document.querySelector('#creator-questions-list .opt-3')?.value || 'Option D';

    const newQuestion = {
      id: `custom_${Date.now()}`,
      domain: subject,
      difficulty: selectedDifficultyFilter,
      title: title,
      question: qText,
      options: [opt0, opt1, opt2, opt3],
      answer: 0,
      explanation: `Correct answer: ${opt0}`
    };

    FULL_QUIZ_BANK.push(newQuestion);
    selectedDomainFilter = subject;
    renderDomainFilterBar();
    renderQuizList();

    document.getElementById('quiz-creator-panel')?.classList.add('hidden');
    document.getElementById('custom-quiz-form')?.reset();
  });
}

function startDomainQuiz(domain, difficulty) {
  let pool = FULL_QUIZ_BANK.filter(q => q.domain === domain && q.difficulty === difficulty);
  if (pool.length === 0) {
    pool = FULL_QUIZ_BANK.filter(q => q.domain === domain);
  }

  activeQuizQuestions = shuffleArray(pool).slice(0, 5);
  currentQuestionIndex = 0;
  score = 0;
  answeredCurrentQuestion = false;

  document.getElementById('quiz-selection-panel')?.classList.add('hidden');
  document.getElementById('quiz-active-panel')?.classList.remove('hidden');
  document.getElementById('quiz-results-panel')?.classList.add('hidden');

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  answeredCurrentQuestion = false;

  const question = activeQuizQuestions[currentQuestionIndex];

  const titleEl = document.getElementById('active-quiz-title');
  if (titleEl) {
    titleEl.innerText = `${selectedDomainFilter} (${selectedDifficultyFilter}) — Question ${currentQuestionIndex + 1}/${activeQuizQuestions.length}`;
  }

  const fillEl = document.getElementById('quiz-progress-fill');
  if (fillEl) {
    fillEl.style.width = `${(currentQuestionIndex / activeQuizQuestions.length) * 100}%`;
  }

  const textEl = document.getElementById('question-text');
  if (textEl) textEl.innerText = question.question;

  const optionsBox = document.getElementById('options-container');
  if (optionsBox) {
    optionsBox.innerHTML = '';
    question.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerText = opt;
      btn.style.cssText = `
        padding: 12px 16px; background: rgba(20,16,11,0.7); border: 1px solid rgba(245,158,11,0.25);
        border-radius: 10px; color: #f5e8d7; font-weight: 700; cursor: pointer; text-align: left;
        transition: all 0.2s ease; margin-bottom: 8px; width: 100%; outline: none;
      `;
      btn.addEventListener('click', () => handleOptionSelection(btn, idx, question));
      optionsBox.appendChild(btn);
    });
  }

  const expBox = document.getElementById('quiz-adaptive-explanation');
  if (expBox) {
    expBox.classList.add('hidden');
    expBox.style.display = 'none';
  }

  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn) nextBtn.disabled = true;

  timeLeft = 25;
  const timeEl = document.getElementById('quiz-time-left');
  if (timeEl) timeEl.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeEl) timeEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answeredCurrentQuestion) {
        handleTimeout(question);
      }
    }
  }, 1000);
}

function handleOptionSelection(selectedBtn, selectedIdx, question) {
  if (answeredCurrentQuestion) return;
  answeredCurrentQuestion = true;
  clearInterval(timerInterval);

  const optionsBox = document.getElementById('options-container');
  const allBtns = optionsBox.querySelectorAll('.option-btn');
  allBtns.forEach(btn => btn.disabled = true);

  const isCorrect = (selectedIdx === question.correctAnswer);

  if (isCorrect) {
    selectedBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    selectedBtn.style.borderColor = '#10b981';
    score++;
  } else {
    selectedBtn.style.background = 'linear-gradient(135deg, #991b1b, #ef4444)';
    selectedBtn.style.borderColor = '#ef4444';

    if (allBtns[question.correctAnswer]) {
      allBtns[question.correctAnswer].style.background = 'linear-gradient(135deg, #059669, #10b981)';
      allBtns[question.correctAnswer].style.borderColor = '#10b981';
    }

    trackMissedQuestion(question.domain, question.difficulty);
  }

  const expBox = document.getElementById('quiz-adaptive-explanation');
  const expText = document.getElementById('adaptive-explanation-text');
  if (expBox && expText) {
    expText.innerText = question.explanation || 'Review the correct answer before proceeding.';
    expBox.classList.remove('hidden');
    expBox.style.display = 'block';
  }

  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn) nextBtn.disabled = false;
}

function handleTimeout(question) {
  answeredCurrentQuestion = true;
  const optionsBox = document.getElementById('options-container');
  const allBtns = optionsBox.querySelectorAll('.option-btn');
  allBtns.forEach(btn => btn.disabled = true);

  if (allBtns[question.correctAnswer]) {
    allBtns[question.correctAnswer].style.background = 'linear-gradient(135deg, #059669, #10b981)';
    allBtns[question.correctAnswer].style.borderColor = '#10b981';
  }

  trackMissedQuestion(question.domain, question.difficulty);

  const expBox = document.getElementById('quiz-adaptive-explanation');
  const expText = document.getElementById('adaptive-explanation-text');
  if (expBox && expText) {
    expText.innerText = `⏳ Time expired! Explanation: ${question.explanation}`;
    expBox.classList.remove('hidden');
    expBox.style.display = 'block';
  }

  const nextBtn = document.getElementById('btn-next-question');
  if (nextBtn) nextBtn.disabled = false;
}

function trackMissedQuestion(domain, difficulty) {
  if (!state.quizStats) state.quizStats = {};
  if (!state.quizStats.missedByDomain) state.quizStats.missedByDomain = {};
  const key = `${domain}:${difficulty}`;
  state.quizStats.missedByDomain[key] = (state.quizStats.missedByDomain[key] || 0) + 1;
  saveState();
}

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuizQuestions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function quitActiveQuiz() {
  if (confirm('Are you sure you want to quit the battle? Progress will be lost.')) {
    clearInterval(timerInterval);
    document.getElementById('quiz-active-panel')?.classList.add('hidden');
    document.getElementById('quiz-selection-panel')?.classList.remove('hidden');
  }
}

function finishQuiz() {
  clearInterval(timerInterval);

  document.getElementById('quiz-active-panel')?.classList.add('hidden');
  const resultsPanel = document.getElementById('quiz-results-panel');
  resultsPanel?.classList.remove('hidden');

  let xpGain = score * 15;
  let coinGain = score * 5;

  // Apply Pet Companion Passive Perks
  const equippedPet = state.equipped ? state.equipped.pet : 'none';
  let petNotice = '';
  if (equippedPet === 'hedwig_owl' && xpGain > 0) {
    const bonus = Math.max(1, Math.round(xpGain * 0.02));
    xpGain += bonus;
    petNotice += ` (🐾 +${bonus} XP Hedwig Perk)`;
  }
  if (equippedPet === 'silver_serpent') {
    coinGain += 5;
    petNotice += ` (🐾 +5 Coins Serpent Perk)`;
  }

  const titleEl = document.getElementById('results-title');
  if (titleEl) {
    titleEl.innerText = score === activeQuizQuestions.length ? '🌟 Domain Mastery Cleared! 🌟' : 'Domain Quest Completed!';
  }

  const statsEl = document.getElementById('results-stats');
  if (statsEl) {
    statsEl.innerText = `You scored ${score}/${activeQuizQuestions.length} in ${selectedDomainFilter} (${selectedDifficultyFilter})!${petNotice}`;
  }

  const xpEl = document.getElementById('results-xp-gain');
  if (xpEl) xpEl.innerText = `+${xpGain} XP`;

  const coinEl = document.getElementById('results-coin-gain');
  if (coinEl) coinEl.innerText = `+${coinGain} Coins`;

  addXP(xpGain);
  addCoins(coinGain);

  if (!state.stats) state.stats = {};
  state.stats.quizzesCompleted = (state.stats.quizzesCompleted || 0) + 1;
  saveState();
  updateUI();
  renderQuizResultsFriendComparison();
}

async function renderQuizResultsFriendComparison() {
  const compareBox = document.getElementById('results-friends-compare');
  if (!compareBox) return;

  let friendsList = [];
  try {
    if (window.api && typeof window.api.getFriends === 'function') {
      const res = await window.api.getFriends();
      if (res && res.ok && Array.isArray(res.data)) {
        friendsList = res.data;
      }
    } else if (window.api && typeof window.api.getFriendsList === 'function') {
      const res = await window.api.getFriendsList();
      if (res && res.ok && res.data && Array.isArray(res.data.friends)) {
        friendsList = res.data.friends;
      }
    }
  } catch (err) {
    console.warn('[Quiz Results] Error fetching friends for comparison:', err.message);
  }

  if (!friendsList || friendsList.length === 0) {
    compareBox.classList.add('hidden');
    return;
  }

  const currentUser = {
    name: state.fullName || state.username || 'You',
    xp: state.xp || 0,
    isSelf: true
  };

  const rankedList = [
    currentUser,
    ...friendsList.map(f => ({
      name: f.username || f.fullName || 'Scholar',
      xp: f.xp || 0,
      isSelf: false
    }))
  ].sort((a, b) => b.xp - a.xp);

  const myRank = rankedList.findIndex(item => item.isSelf) + 1;
  const topRanked = rankedList.slice(0, 3);

  let listHtml = topRanked.map((item, idx) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 6px; font-size: 11px; color: ${item.isSelf ? '#f59e0b' : '#94a3b8'}; font-weight: ${item.isSelf ? '800' : '600'};">
      <span>#${idx + 1} ${item.name} ${item.isSelf ? '(You)' : ''}</span>
      <span style="color: #3b82f6;">${item.xp} XP</span>
    </div>
  `).join('');

  compareBox.innerHTML = `
    <div style="font-size: 11px; font-weight: 800; color: #f5e8d7; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
      <span>👥 How You Compare (Scholar Circle)</span>
      <span style="color: #f59e0b;">Rank #${myRank} of ${rankedList.length}</span>
    </div>
    <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 4px 6px;">
      ${listHtml}
    </div>
  `;
  compareBox.classList.remove('hidden');
}

function closeQuizResults() {
  document.getElementById('quiz-results-panel')?.classList.add('hidden');
  document.getElementById('quiz-selection-panel')?.classList.remove('hidden');
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
