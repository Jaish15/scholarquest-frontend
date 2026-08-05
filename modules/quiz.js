/* ==========================================
   ScholarQuest QuizForge Module
   Handles quiz gameplay, generation, scoring
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';

// Pre-baked quiz templates
const DEFAULT_QUIZZES = [
  {
    id: 'js_basics',
    title: 'JavaScript Fundamentals',
    subject: 'JavaScript',
    difficulty: 'Easy',
    questions: [
      {
        q: 'Which keyword defines a block-scoped local variable in JavaScript?',
        options: ['var', 'let', 'const', 'local'],
        answer: 1 // let
      },
      {
        q: 'What is the output of console.log(typeof null) in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"string"'],
        answer: 2 // object
      },
      {
        q: 'Which of the following is NOT a JavaScript primitive data type?',
        options: ['String', 'Boolean', 'Object', 'Symbol'],
        answer: 2 // Object
      }
    ]
  },
  {
    id: 'python_core',
    title: 'Python Snake Trail',
    subject: 'Python',
    difficulty: 'Medium',
    questions: [
      {
        q: 'Which function is used to get the length of a list in Python?',
        options: ['length()', 'len()', 'size()', 'count()'],
        answer: 1 // len()
      },
      {
        q: 'What type of structure is defined by using curly braces: { "a": 1 }?',
        options: ['Set', 'List', 'Tuple', 'Dictionary'],
        answer: 3 // Dictionary
      },
      {
        q: 'How do you insert an element at a specific index in a Python list?',
        options: ['append()', 'insert()', 'add()', 'push()'],
        answer: 1 // insert()
      }
    ]
  },
  {
    id: 'dsa_novice',
    title: 'Data Structures Apprentice',
    subject: 'DSA',
    difficulty: 'Hard',
    questions: [
      {
        q: 'Which data structure works on a First In, First Out (FIFO) basis?',
        options: ['Stack', 'Queue', 'Binary Tree', 'Max Heap'],
        answer: 1 // Queue
      },
      {
        q: 'What is the average time complexity of searching a value in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answer: 2 // O(log n)
      },
      {
        q: 'Which sorting algorithm has a worst-case time complexity of O(n^2)?',
        options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'],
        answer: 1 // Quick Sort
      }
    ]
  }
];

// Mock Leaderboard users
const MOCK_LEADERBOARD = [
  { name: 'MSc_Queen', score: 3250 },
  { name: 'DSA_Destroyer', score: 2800 },
  { name: 'CodeSorcerer', score: 2450 },
  { name: 'Vais_Scholar', score: 1980 },
  { name: 'Apprentice_Ninja', score: 1200 }
];

let quizzes = [...DEFAULT_QUIZZES];
let activeQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 20;

export function initQuizzes() {
  loadCustomQuizzes();
  renderQuizList();
  renderLeaderboard();
  setupEventListeners();
}

function loadCustomQuizzes() {
  const saved = localStorage.getItem('scholarquest_custom_quizzes');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      quizzes = [...DEFAULT_QUIZZES, ...parsed];
    } catch (e) {
      console.error(e);
    }
  }
}

// Render the grid of quizzes
export function renderQuizList() {
  const container = document.getElementById('quizzes-container');
  if (!container) return;
  container.innerHTML = '';
  
  quizzes.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-meta">
        <span class="quiz-subject">${quiz.subject}</span>
        <span class="quiz-length">${quiz.questions.length} Quest-cards</span>
      </div>
      <h3 class="quiz-title">${quiz.title}</h3>
      <div class="quiz-xp-payout">
        <i data-lucide="sparkles" style="width: 12px; height: 12px;"></i>
        <span>Payout: +${quiz.questions.length * 15} XP</span>
      </div>
      <button class="btn primary-btn start-quiz-btn" data-id="${quiz.id}">Battle Boss</button>
    `;
    container.appendChild(card);
  });
  
  if (window.lucide) window.lucide.createIcons();
  
  // Attach click listeners to quiz start buttons
  const startBtns = container.querySelectorAll('.start-quiz-btn');
  startBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.getAttribute('data-id');
      startQuiz(qid);
    });
  });
}

// Render Leaderboard side list
function renderLeaderboard() {
  const container = document.getElementById('quiz-leaderboards');
  if (!container) return;
  container.innerHTML = '';
  
  MOCK_LEADERBOARD.forEach((user, idx) => {
    const item = document.createElement('div');
    item.className = 'leader-item';
    item.innerHTML = `
      <span class="leader-rank rank-${idx + 1}">${idx + 1}</span>
      <div class="leader-avatar">🧙</div>
      <span class="leader-name">${user.name}</span>
      <span class="leader-score">${user.score} pts</span>
    `;
    container.appendChild(item);
  });
}

function setupEventListeners() {
  // Custom quiz panel buttons
  document.getElementById('btn-custom-quiz').addEventListener('click', () => {
    document.getElementById('quiz-selection-panel').classList.add('hidden');
    document.getElementById('quiz-creator-panel').classList.remove('hidden');
  });
  
  document.getElementById('btn-close-creator').addEventListener('click', () => {
    document.getElementById('quiz-creator-panel').classList.add('hidden');
    document.getElementById('quiz-selection-panel').classList.remove('hidden');
  });
  
  // Custom quiz form submit
  document.getElementById('custom-quiz-form').addEventListener('submit', (e) => {
    e.preventDefault();
    createCustomQuiz();
  });
  
  // Gameplay buttons
  document.getElementById('btn-next-question').addEventListener('click', loadNextQuestion);
  document.getElementById('btn-quit-quiz').addEventListener('click', quitActiveQuiz);
  document.getElementById('btn-close-results').addEventListener('click', closeQuizResults);
}

// Start Quiz flow
function startQuiz(quizId) {
  activeQuiz = quizzes.find(q => q.id === quizId);
  if (!activeQuiz) return;
  
  currentQuestionIndex = 0;
  score = 0;
  
  // Swapping panels
  document.getElementById('quiz-selection-panel').classList.add('hidden');
  document.getElementById('quiz-active-panel').classList.remove('hidden');
  document.getElementById('quiz-results-panel').classList.add('hidden');
  
  loadQuestion();
}

// Load current question state
function loadQuestion() {
  clearInterval(timerInterval);
  
  const question = activeQuiz.questions[currentQuestionIndex];
  
  // Header and progress bar updates
  document.getElementById('active-quiz-title').innerText = `${activeQuiz.title} - Question ${currentQuestionIndex + 1}/${activeQuiz.questions.length}`;
  const progressPct = ((currentQuestionIndex) / activeQuiz.questions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = `${progressPct}%`;
  
  // Question text
  document.getElementById('question-text').innerText = question.q;
  
  // Options render
  const optionsBox = document.getElementById('options-container');
  optionsBox.innerHTML = '';
  
  question.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.addEventListener('click', () => handleOptionSelection(btn, idx));
    optionsBox.appendChild(btn);
  });
  
  // Reset next button & timer
  document.getElementById('btn-next-question').disabled = true;
  timeLeft = 20;
  document.getElementById('quiz-time-left').innerText = timeLeft;
  
  // Start countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('quiz-time-left').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Auto fail question on timeout
      highlightCorrectAnswer();
      document.getElementById('btn-next-question').disabled = false;
    }
  }, 1000);
}

// Answer Selection handler
function handleOptionSelection(selectedBtn, idx) {
  clearInterval(timerInterval);
  
  const question = activeQuiz.questions[currentQuestionIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  
  // Disable option modifications
  allBtns.forEach(btn => btn.disabled = true);
  
  if (idx === question.answer) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
    highlightCorrectAnswer();
  }
  
  // Enable proceed button
  document.getElementById('btn-next-question').disabled = false;
}

// Helper to show correct option if wrong selection made
function highlightCorrectAnswer() {
  const question = activeQuiz.questions[currentQuestionIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  if (allBtns[question.answer]) {
    allBtns[question.answer].classList.add('correct');
  }
}

// Next question trigger or completion finalizer
function loadNextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < activeQuiz.questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// Terminate gameplay
function quitActiveQuiz() {
  if (confirm('Are you sure you want to quit the battle? No rewards will be paid out.')) {
    clearInterval(timerInterval);
    document.getElementById('quiz-active-panel').classList.add('hidden');
    document.getElementById('quiz-selection-panel').classList.remove('hidden');
    activeQuiz = null;
  }
}

// Complete Quiz logic
function finishQuiz() {
  clearInterval(timerInterval);
  
  document.getElementById('quiz-active-panel').classList.add('hidden');
  const resultsPanel = document.getElementById('quiz-results-panel');
  resultsPanel.classList.remove('hidden');
  
  // Rewards Math
  const xpReward = score * 15 + (score === activeQuiz.questions.length ? 15 : 0); // extra reward for perfect
  const coinReward = score * 5 + (score === activeQuiz.questions.length ? 5 : 0);
  
  document.getElementById('results-title').innerText = score === activeQuiz.questions.length ? '🌟 Perfect Victory! 🌟' : 'Boss Battle Cleared!';
  document.getElementById('results-stats').innerText = `You scored ${score}/${activeQuiz.questions.length} questions correctly!`;
  document.getElementById('results-xp-gain').innerText = `+${xpReward} XP`;
  document.getElementById('results-coin-gain').innerText = `+${coinReward} Coins`;
  
  // Grant rewards
  addXP(xpReward);
  addCoins(coinReward);
  
  // Update overall achievements stats
  state.stats.quizzesCompleted += 1;
  saveState();
  updateUI();
}

function closeQuizResults() {
  document.getElementById('quiz-results-panel').classList.add('hidden');
  document.getElementById('quiz-selection-panel').classList.remove('hidden');
  activeQuiz = null;
}

// Form logic to Forge custom quiz
function createCustomQuiz() {
  const title = document.getElementById('quiz-title-input').value;
  const subject = document.getElementById('quiz-subject-input').value;
  
  const questionBlock = document.querySelector('.creator-question-block');
  const qText = questionBlock.querySelector('.q-text').value;
  
  const opt0 = questionBlock.querySelector('.opt-0').value;
  const opt1 = questionBlock.querySelector('.opt-1').value;
  const opt2 = questionBlock.querySelector('.opt-2').value;
  const opt3 = questionBlock.querySelector('.opt-3').value;
  
  const newQuiz = {
    id: `custom_${Date.now()}`,
    title: title,
    subject: subject,
    difficulty: 'Medium',
    questions: [
      {
        q: qText,
        options: [opt0, opt1, opt2, opt3],
        answer: 0 // Index 0 represents correct answer in creator schema
      }
    ]
  };
  
  // Save custom quizzes
  const saved = localStorage.getItem('scholarquest_custom_quizzes');
  let customList = [];
  if (saved) {
    try { customList = JSON.parse(saved); } catch (e) { console.error(e); }
  }
  
  customList.push(newQuiz);
  localStorage.setItem('scholarquest_custom_quizzes', JSON.stringify(customList));
  
  // Reload
  quizzes.push(newQuiz);
  renderQuizList();
  
  // Reset form
  document.getElementById('custom-quiz-form').reset();
  
  // Panel swaps back
  document.getElementById('quiz-creator-panel').classList.add('hidden');
  document.getElementById('quiz-selection-panel').classList.remove('hidden');
}
