/* ==========================================
   ScholarQuest CodeScroll Module
   3-Tier Difficulty System (Beginner, Intermediate, Advanced)
   1,080 Practical Coding Challenges across 9 Technical Domains
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';
import { api, auth, API_BASE } from '../api.js';
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
  const botBlob = document.getElementById('codescroll-bot-blob');
  const chatWindow = document.getElementById('codescroll-chatbot-window');
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
    if (botBlob) botBlob.style.display = 'flex';
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
    if (botBlob) botBlob.style.display = 'none';
    if (chatWindow) chatWindow.style.display = 'none';
    if (btnSubmit) btnSubmit.style.display = 'none';
    if (btnShare) btnShare.style.display = 'none';
    if (hintDrawer) hintDrawer.style.display = 'none';
    if (modeIndicatorEl) modeIndicatorEl.innerText = 'Free Practice';
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

let stage2Attempts = 0;
let stage2Passed = false;

function resetHelpStage() {
  helpStage = 0;
  stage2Attempts = 0;
  stage2Passed = false;
  const btnHelp = document.getElementById('btn-codescroll-help');
  const indicator = document.getElementById('codescroll-help-stage-indicator');
  const drawer = document.getElementById('codescroll-hint-drawer');

  if (btnHelp) {
    btnHelp.innerText = '💡 Need Help? (Stage 1/3)';
    btnHelp.disabled = false;
  }
  if (indicator) indicator.innerText = 'Click Help for progressive guidance';
  if (drawer) {
    drawer.innerHTML = '';
  }
  closeChatbotWindow();
}

function getCodeExplanationBullets(challenge) {
  const title = (challenge.title || '').replace(/^\d+\.\s*/, '');
  const domain = challenge.domain || 'JavaScript';

  if (title.toLowerCase().includes('square')) {
    return [
      "<b>Function Signature & Input:</b> Receives a numerical parameter <code>n</code> representing the value to be squared.",
      "<b>Core Arithmetic Operation:</b> Computes <code>n * n</code> (or <code>Math.pow(n, 2)</code>) to multiply the number by itself.",
      "<b>Return Pipeline:</b> Sends the calculated exponential product directly back to the caller function.",
      "<b>Validation Assertion Check:</b> Passes test inputs like <code>squareNum(5)</code> and confirms the return value equals <code>25</code>."
    ];
  }

  if (title.toLowerCase().includes('temperature') || title.toLowerCase().includes('celsius')) {
    return [
      "<b>Parameter Handling:</b> Accepts temperature value <code>c</code> measured in Celsius degrees.",
      "<b>Scale Factor Transformation:</b> Performs <code>c * 9 / 5</code> to scale the 100° Celsius boiling span into the 180° Fahrenheit span.",
      "<b>Freezing Baseline Offset:</b> Adds <code>+ 32</code> to adjust the zero-point offset from 0°C to 32°F.",
      "<b>Assertion Verification:</b> Guarantees <code>0°C</code> evaluates to <code>32°F</code> and <code>100°C</code> evaluates to <code>212°F</code>."
    ];
  }

  if (title.toLowerCase().includes('even')) {
    return [
      "<b>Integer Parameter:</b> Accepts an integer argument <code>n</code>.",
      "<b>Modulo Remainder Operator:</b> Calculates <code>n % 2</code> to determine the remainder when divided by 2.",
      "<b>Boolean Decision Logic:</b> Evaluates <code>n % 2 === 0</code>, returning <code>true</code> for even numbers and <code>false</code> for odd numbers.",
      "<b>Assertion Edge Cases:</b> Correctly validates even numbers (e.g. <code>4</code>, <code>8</code>) while returning <code>false</code> for <code>7</code>."
    ];
  }

  if (title.toLowerCase().includes('length') || title.toLowerCase().includes('len')) {
    return [
      "<b>String Input:</b> Receives a string argument <code>str</code>.",
      "<b>Native Property Inspection:</b> Reads the string's built-in <code>.length</code> property.",
      "<b>Character Measurement:</b> Evaluates total UTF-16 character code units present in the string sequence.",
      "<b>Assertion Verification:</b> Measures <code>'Python'</code> and returns <code>6</code> total characters."
    ];
  }

  if (title.toLowerCase().includes('max') || title.toLowerCase().includes('largest')) {
    return [
      "<b>Parameter Pair:</b> Accepts two numeric arguments <code>a</code> and <code>b</code>.",
      "<b>Ternary Magnitude Comparison:</b> Evaluates <code>a > b ? a : b</code> (or <code>Math.max(a, b)</code>) to compare values.",
      "<b>Output Selection:</b> Selects and returns whichever argument holds the greater numerical value.",
      "<b>Assertion Test:</b> Evaluating <code>getMax(10, 20)</code> correctly identifies and returns <code>20</code>."
    ];
  }

  if (challenge.explanation && challenge.explanation.length > 20) {
    return [
      `<b>Core Algorithmic Objective:</b> ${escapeHTML(challenge.explanation)}`,
      `<b>Input & Logic Sequence:</b> Inspects problem parameters and processes operations step-by-step.`,
      `<b>Return & Assertion Check:</b> Produces calculated result matching automated unit test requirements.`
    ];
  }

  return [
    `<b>Problem Overview:</b> Solves the <b>${escapeHTML(title)}</b> challenge requirement in ${escapeHTML(domain)}.`,
    `<b>Control Flow & Calculations:</b> Reads parameters, executes target data/arithmetic transformations, and handles edge conditions.`,
    `<b>Validation Result:</b> Sends computed output through return pipeline, passing all test suite assertions.`
  ];
}

function getStage3Quiz(challenge) {
  if (challenge && challenge.stage3Quiz && challenge.stage3Quiz.question && Array.isArray(challenge.stage3Quiz.options)) {
    return challenge.stage3Quiz;
  }

  const title = (challenge.title || '').replace(/^\d+\.\s*/, '');
  const domain = challenge.domain || 'JavaScript';

  if (title.toLowerCase().includes('square')) {
    return {
      question: "Which expression correctly calculates the square of a number n?",
      options: ["n * n", "n + n", "n / n", "n % n"],
      correctIndex: 0
    };
  }

  if (title.toLowerCase().includes('temperature') || title.toLowerCase().includes('celsius')) {
    return {
      question: "What is the correct mathematical formula to convert Celsius (c) to Fahrenheit?",
      options: ["(c * 9 / 5) + 32", "(c + 32) * 9 / 5", "c * 100 / 32", "c - 32"],
      correctIndex: 0
    };
  }

  if (title.toLowerCase().includes('even')) {
    return {
      question: "Which modulo condition checks if an integer n is even?",
      options: ["n % 2 === 0", "n % 2 === 1", "n / 2 === 1", "n * 2 === 0"],
      correctIndex: 0
    };
  }

  if (title.toLowerCase().includes('length') || title.toLowerCase().includes('len')) {
    return {
      question: "What property returns the character length of a string in JavaScript?",
      options: ["str.length", "str.size()", "str.count()", "str.capacity"],
      correctIndex: 0
    };
  }

  if (title.toLowerCase().includes('max') || title.toLowerCase().includes('largest')) {
    return {
      question: "Which method returns the larger of two numbers a and b in JavaScript?",
      options: ["Math.max(a, b)", "Math.min(a, b)", "a + b", "Math.abs(a - b)"],
      correctIndex: 0
    };
  }

  if (title.toLowerCase().includes('sum') || title.toLowerCase().includes('add')) {
    return {
      question: "Which approach correctly calculates the total sum of an array of numbers?",
      options: [
        "Use array.reduce((acc, num) => acc + num, 0)",
        "Use array.slice(0, 2)",
        "Use array.filter(num => num > 0)",
        "Use array.reverse()"
      ],
      correctIndex: 0
    };
  }

  return {
    question: `Before unlocking the solution for "${title}", what is the primary objective of this ${domain} challenge?`,
    options: [
      `Implementing core function logic that passes validation tests`,
      `Ignoring function return values and console output`,
      `Declaring global variables without returning a result`,
      `Writing an infinite loop with no termination condition`
    ],
    correctIndex: 0
  };
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export function openChatbotWindow() {
  const chatWindow = document.getElementById('codescroll-chatbot-window');
  const drawer = document.getElementById('codescroll-hint-drawer');
  if (!chatWindow) return;

  chatWindow.style.display = 'flex';
  if (drawer) {
    drawer.style.display = 'block';
    if (helpStage === 0 && !drawer.innerHTML.trim()) {
      const challenge = currentDomainChallenges[activeChallengeIndex];
      const challengeTitle = challenge ? challenge.title.replace(/^\d+\.\s*/, '') : 'this quest';
      drawer.innerHTML = `
        <div class="guidance-welcome-msg" style="text-align: center; padding: 24px 12px; color: rgba(245,232,215,0.85);">
          <div style="font-size: 32px; margin-bottom: 8px;">🧙‍♂️</div>
          <div style="font-size: 13px; font-weight: 900; color: #f59e0b; margin-bottom: 6px;">Greetings, Scholar!</div>
          <div style="font-size: 11px; color: rgba(245,232,215,0.7); line-height: 1.5; max-width: 290px; margin: 0 auto 12px;">
            I am your Quest Mentor. Click the <b>"💡 Need Help?"</b> button above to unlock progressive hints and solution code for <b>${escapeHTML(challengeTitle)}</b>!
          </div>
        </div>
      `;
    }
  }
}

export function closeChatbotWindow() {
  const chatWindow = document.getElementById('codescroll-chatbot-window');
  if (chatWindow) {
    chatWindow.style.display = 'none';
  }
}

export function toggleChatbotWindow() {
  const chatWindow = document.getElementById('codescroll-chatbot-window');
  if (!chatWindow) return;
  const isHidden = chatWindow.style.display === 'none' || getComputedStyle(chatWindow).display === 'none';
  if (isHidden) {
    openChatbotWindow();
  } else {
    closeChatbotWindow();
  }
}

function handleHelpButtonClick() {
  const challenge = currentDomainChallenges[activeChallengeIndex];
  if (!challenge) return;

  const drawer = document.getElementById('codescroll-hint-drawer');
  const btnHelp = document.getElementById('btn-codescroll-help');
  const indicator = document.getElementById('codescroll-help-stage-indicator');

  if (helpStage < 2) {
    helpStage++;
  } else if (helpStage === 2 && stage2Passed) {
    helpStage = 3;
  }

  openChatbotWindow();

  const conceptHint = challenge.hintStage1 || challenge.hint || `Focus on understanding the problem inputs and expected return value for ${challenge.title}.`;
  const explanationBullets = getCodeExplanationBullets(challenge);

  let rawSolution = challenge.hintStage3 || challenge.solution || challenge.validator || '';
  let formattedCode = rawSolution.trim();
  if (formattedCode.includes('if (') && !formattedCode.includes('\n')) {
    formattedCode = formattedCode
      .replace(/;\s*/g, ';\n')
      .replace(/{\s*/g, '{\n  ')
      .replace(/}\s*/g, '}\n');
  }
  if (!formattedCode) {
    formattedCode = `// Reference Implementation for ${challenge.title}\nfunction solve() {\n  return true;\n}`;
  }

  let chatHTML = `<div class="guidance-chat-stream" style="display: flex; flex-direction: column; gap: 14px;">`;

  // Stage 1 Message — Basic Help
  if (helpStage >= 1) {
    chatHTML += `
      <div class="chat-msg-row" style="display: flex; gap: 10px; align-items: flex-start;">
        <div class="chat-avatar" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #f59e0b; overflow: hidden; background: #000; flex-shrink: 0; box-shadow: 0 0 6px rgba(245,158,11,0.3);">
          <img src="assets/chatbot.jpeg" alt="Quest Mentor Bot" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="chat-bubble" style="flex: 1; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; border-top-left-radius: 2px; padding: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 12px; font-weight: 800; color: #f59e0b;">Quest Mentor Bot • Stage 1 — Basic Help</span>
            <span style="font-size: 10px; font-weight: 800; background: rgba(245,158,11,0.2); color: #f59e0b; padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(245,158,11,0.3);">Stage 1/3</span>
          </div>
          <div style="font-size: 12px; color: #f5e8d7; line-height: 1.5;">${escapeHTML(conceptHint)}</div>
        </div>
      </div>
    `;
  }

  // Stage 2 Message — Concept Check Quiz Gate
  if (helpStage >= 2) {
    const quiz = getStage3Quiz(challenge);

    if (stage2Passed) {
      // Stage 2 Quiz Passed / Unlocked
      const isSuccess = stage2Attempts < 3;
      const statusBanner = isSuccess
        ? `<div style="font-size: 12px; font-weight: 800; color: #38bdf8;">🎉 Spot on, Scholar! Correct answer! Stage 3 unlocked below:</div>`
        : `<div style="font-size: 12px; font-weight: 800; color: #f59e0b;">💡 No worries — 3 attempts used! Stage 3 unlocked below:</div>`;

      chatHTML += `
        <div class="chat-msg-row" style="display: flex; gap: 10px; align-items: flex-start;">
          <div class="chat-avatar" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #38bdf8; overflow: hidden; background: #000; flex-shrink: 0; box-shadow: 0 0 6px rgba(56,189,248,0.3);">
            <img src="assets/chatbot.jpeg" alt="Quest Mentor Bot" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="chat-bubble" style="flex: 1; background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; border-top-left-radius: 2px; padding: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 12px; font-weight: 800; color: #38bdf8;">Quest Mentor Bot • Stage 2 — Concept Check Quiz</span>
              <span style="font-size: 10px; font-weight: 800; background: rgba(56,189,248,0.2); color: #38bdf8; padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(56,189,248,0.3);">Stage 2/3 ✓</span>
            </div>
            ${statusBanner}
          </div>
        </div>
      `;
    } else {
      // Stage 2 Quiz Active
      const attemptText = `Attempt ${stage2Attempts + 1}/3`;
      chatHTML += `
        <div class="chat-msg-row" style="display: flex; gap: 10px; align-items: flex-start;">
          <div class="chat-avatar" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #38bdf8; overflow: hidden; background: #000; flex-shrink: 0; box-shadow: 0 0 6px rgba(56,189,248,0.3);">
            <img src="assets/chatbot.jpeg" alt="Quest Mentor Bot" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="chat-bubble" style="flex: 1; background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; border-top-left-radius: 2px; padding: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 12px; font-weight: 800; color: #38bdf8;">Quest Mentor Bot • Stage 2 — Concept Check Quiz</span>
              <span style="font-size: 10px; font-weight: 800; background: rgba(56,189,248,0.2); color: #38bdf8; padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(56,189,248,0.3);">${attemptText}</span>
            </div>
            <div style="font-size: 12px; color: #f5e8d7; margin-bottom: 10px; line-height: 1.5;">
              Answer this quick question about <b>${escapeHTML((challenge.title || '').replace(/^\d+\.\s*/, ''))}</b> logic to unlock Stage 3:
            </div>
            <div style="font-size: 12px; font-weight: 800; color: #f59e0b; background: rgba(20,16,11,0.85); border: 1px solid rgba(245,158,11,0.35); padding: 10px 12px; border-radius: 8px; margin-bottom: 10px; line-height: 1.4;">
              ❓ ${escapeHTML(quiz.question)}
            </div>
            <div class="stage2-quiz-options" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
              ${quiz.options.map((opt, optIdx) => `
                <button class="btn btn-sm secondary-btn btn-stage2-option" data-opt-index="${optIdx}" style="text-align: left; padding: 7px 12px; font-size: 11px; font-weight: 700; color: #f5e8d7; border-color: rgba(245,158,11,0.3); background: rgba(20,16,11,0.7); display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <span style="display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: rgba(245,158,11,0.2); color: #f59e0b; font-size: 10px; font-weight: 900; flex-shrink: 0;">${String.fromCharCode(65 + optIdx)}</span>
                  <span>${escapeHTML(opt)}</span>
                </button>
              `).join('')}
            </div>
            <div id="stage2-quiz-feedback" style="font-size: 11px; font-weight: 800; min-height: 18px;"></div>
          </div>
        </div>
      `;
    }
  }

  // Stage 3 Message — Deep-Dive Code Walkthrough & Reference Implementation (Unlocked after Stage 2 passed)
  if (helpStage >= 3 || stage2Passed) {
    const langLabel = challenge.lang || challenge.language || 'JavaScript';
    chatHTML += `
      <div class="chat-msg-row" style="display: flex; gap: 10px; align-items: flex-start;">
        <div class="chat-avatar" style="width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #10b981; overflow: hidden; background: #000; flex-shrink: 0; box-shadow: 0 0 6px rgba(16,185,129,0.3);">
          <img src="assets/chatbot.jpeg" alt="Quest Mentor Bot" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="chat-bubble" style="flex: 1; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; border-top-left-radius: 2px; padding: 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 12px; font-weight: 800; color: #10b981;">Quest Mentor Bot • Stage 3 — Deep-Dive Code Walkthrough</span>
            <span style="font-size: 10px; font-weight: 800; background: rgba(16,185,129,0.2); color: #10b981; padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(16,185,129,0.3);">Stage 3/3</span>
          </div>

          <!-- PRIMARY CONTENT: 3-4 Bullet Point Code Walkthrough -->
          <div style="font-size: 12px; color: #f5e8d7; line-height: 1.6; margin-bottom: 14px; background: rgba(14,10,8,0.8); padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(16,185,129,0.3);">
            <div style="font-size: 12px; font-weight: 900; color: #10b981; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>🧠 Step-by-Step Logic & Breakdown</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${explanationBullets.map(bullet => `
                <div style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: #10b981; font-weight: 900; font-size: 13px; line-height: 1.4;">•</span>
                  <div style="flex: 1; font-size: 11.5px; color: rgba(245,232,215,0.9); line-height: 1.5;">${bullet}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECONDARY CONTENT: Reference Implementation Code Block (No "Solution" framing) -->
          <div class="solution-code-container" style="background: rgba(10,8,6,0.95); border: 1px solid rgba(16,185,129,0.35); border-radius: 8px; overflow: hidden;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; background: rgba(16,185,129,0.15); border-bottom: 1px solid rgba(16,185,129,0.25);">
              <span style="font-size: 11px; font-weight: 800; color: #10b981; font-family: monospace;">📖 Reference Implementation (${escapeHTML(langLabel)})</span>
              <button class="btn btn-sm secondary-btn" id="btn-copy-solution-code" style="padding: 2px 8px; font-size: 10px; font-weight: 800; color: #38bdf8; border-color: rgba(56,189,248,0.4);">
                📋 Copy Code
              </button>
            </div>
            <pre style="margin: 0; padding: 12px; font-family: 'Fira Code', 'Courier New', monospace; font-size: 12px; line-height: 1.6; color: #38bdf8; overflow-x: auto; white-space: pre-wrap; word-break: break-word;"><code>${escapeHTML(formattedCode)}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  chatHTML += `</div>`;
  drawer.innerHTML = chatHTML;

  // Bind Stage 2 Quiz Option listeners if active
  if (helpStage >= 2 && !stage2Passed) {
    const quiz = getStage3Quiz(challenge);
    const optionBtns = drawer.querySelectorAll('.btn-stage2-option');
    const feedbackEl = document.getElementById('stage2-quiz-feedback');

    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
        if (selectedIdx === quiz.correctIndex) {
          stage2Passed = true;
          helpStage = 3;
          handleHelpButtonClick();
        } else {
          stage2Attempts++;
          if (stage2Attempts >= 3) {
            stage2Passed = true;
            helpStage = 3;
            handleHelpButtonClick();
          } else {
            if (feedbackEl) {
              feedbackEl.style.color = '#ef4444';
              feedbackEl.innerText = `❌ Not quite! Try again. (Attempt ${stage2Attempts}/3)`;
            }
            btn.style.borderColor = 'rgba(239, 68, 68, 0.6)';
            btn.style.background = 'rgba(239, 68, 68, 0.15)';
          }
        }
      });
    });
  }

  // Bind Copy Code button listener if Stage 3 code is rendered
  if (helpStage >= 3 || stage2Passed) {
    const copyBtn = document.getElementById('btn-copy-solution-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(formattedCode).then(() => {
          copyBtn.innerText = '✓ Copied!';
          setTimeout(() => { copyBtn.innerText = '📋 Copy Code'; }, 2000);
        }).catch(() => {
          copyBtn.innerText = 'Failed to copy';
        });
      });
    }
  }

  if (btnHelp) {
    if (stage2Passed || helpStage >= 3) {
      btnHelp.innerText = '✅ Stage 3 Unlocked';
    } else if (helpStage === 1) {
      btnHelp.innerText = '💡 Need Help? (Stage 2/3: Quiz)';
    } else if (helpStage === 2) {
      btnHelp.innerText = '💡 Take Quiz (Stage 2/3)';
    }
  }

  if (indicator) {
    if (stage2Passed || helpStage >= 3) {
      indicator.innerText = 'Stage 3 Unlocked — Solution & Explanation';
    } else if (helpStage === 1) {
      indicator.innerText = 'Stage 1 — Basic Conceptual Hint';
    } else if (helpStage === 2) {
      indicator.innerText = 'Stage 2 — Concept Check Quiz';
    }
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
    let friends = [];
    if (typeof window.getStudySyncFriends === 'function') {
      friends = window.getStudySyncFriends();
    }
    if (!friends || friends.length === 0) {
      const res = await api.getFriendsList();
      if (!res.ok) throw new Error(res.error || 'Failed to fetch friends');
      friends = (res.data && res.data.friends) || (Array.isArray(res.data) ? res.data : []);
    }

    if (friends.length === 0) {
      friendsListEl.innerHTML = '<div style="font-size: 12px; color: rgba(245,232,215,0.5); text-align: center; padding: 10px;">No ScholarCircle friends found. Add friends in ScholarCircle first!</div>';
      return;
    }

    friendsListEl.innerHTML = '';
    const currentChallenge = currentDomainChallenges[activeChallengeIndex] || { title: 'Quest Challenge' };

    friends.forEach(friend => {
      const isOnline = !!friend.online;
      const statusText = isOnline ? 'Online' : 'Offline';
      const statusColor = isOnline ? '#10b981' : 'rgba(245,232,215,0.5)';

      const item = document.createElement('div');
      item.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(20,16,11,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 8px;';
      item.innerHTML = `
        <div>
          <div style="font-size: 12px; font-weight: 800; color: #f5e8d7;">${friend.username || friend.name || 'Scholar Friend'}</div>
          <div style="font-size: 10px; color: ${statusColor}; font-weight: 700;">LV ${friend.level || 1} &nbsp;•&nbsp; ${statusText}</div>
        </div>
        <button class="btn btn-sm primary-btn btn-send-share" data-friend-id="${friend.id || friend._id}" data-friend-name="${friend.username || friend.name}" style="padding: 3px 10px; font-size: 11px; font-weight: 800;">
          Share 📡
        </button>
      `;

      item.querySelector('.btn-send-share').addEventListener('click', async (e) => {
        const friendId = e.currentTarget.getAttribute('data-friend-id');
        const friendName = e.currentTarget.getAttribute('data-friend-name');

        const shareUrl = `${window.location.origin}/?view=codescroll&domain=${encodeURIComponent(selectedDomain)}&difficulty=${selectedDifficulty}&challengeIndex=${activeChallengeIndex}`;
        const sharePayload = {
          type: 'challenge_share',
          domain: selectedDomain,
          difficulty: selectedDifficulty,
          title: currentChallenge.title,
          xp: currentChallenge.xpReward || 30,
          coins: currentChallenge.coinReward || 10,
          url: shareUrl
        };
        const messageText = `[CHALLENGE_SHARE]${JSON.stringify(sharePayload)}`;

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

  // Floating Chatbot Blob & Window Close Listeners
  const blobTrigger = document.getElementById('codescroll-bot-blob');
  const closeWindowBtn = document.getElementById('btn-close-chatbot-window');

  if (blobTrigger && !blobTrigger.dataset.bound) {
    blobTrigger.dataset.bound = 'true';
    blobTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleChatbotWindow();
    });
  }

  if (closeWindowBtn && !closeWindowBtn.dataset.bound) {
    closeWindowBtn.dataset.bound = 'true';
    closeWindowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeChatbotWindow();
    });
  }

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
    const res = await fetch(`${API_BASE}/codescroll/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });

    const data = await res.json();
    if (btnRun) btnRun.disabled = false;

    if (!res.ok) {
      if (consoleEl) {
        consoleEl.style.color = '#ef4444';
        consoleEl.innerText = `[Execution Error] ${data.error || 'Server error running code.'}`;
      }
      return;
    }

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

function updateLeetCodeHeaderPill(username) {
  const pill = document.getElementById('leetcode-header-status-pill');
  if (!pill) return;

  if (username) {
    pill.innerText = `Linked as @${username}`;
    pill.style.background = 'rgba(16,185,129,0.15)';
    pill.style.color = '#10b981';
    pill.style.border = '1px solid rgba(16,185,129,0.3)';
  } else {
    pill.innerText = 'Not linked';
    pill.style.background = 'rgba(245,158,11,0.12)';
    pill.style.color = 'rgba(245,232,215,0.7)';
    pill.style.border = '1px solid rgba(245,158,11,0.25)';
  }
}

async function fetchAndDisplayLeetCodeStats(username) {
  const statusMsg = document.getElementById('leetcode-status-msg');
  const displayContainer = document.getElementById('leetcode-stats-display');

  if (!username) {
    if (displayContainer) displayContainer.style.display = 'none';
    updateLeetCodeHeaderPill('');
    return;
  }

  if (statusMsg) {
    statusMsg.style.color = '#f59e0b';
    statusMsg.innerText = `Fetching stats for @${username}...`;
  }

  try {
    const res = await fetch(`${API_BASE}/codescroll/leetcode-stats/${encodeURIComponent(username)}`);
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const errJson = await res.json();
        if (errJson && errJson.error) errMsg = errJson.error;
      } catch (e) {}
      throw new Error(errMsg);
    }
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

    updateLeetCodeHeaderPill(username);

  } catch (err) {
    if (statusMsg) {
      statusMsg.style.color = '#ef4444';
      statusMsg.innerText = `Failed to load LeetCode stats for @${username}: ${err.message}`;
    }
    updateLeetCodeHeaderPill('');
  }
}

export function setupLeetCodeEvents() {
  const btnLink = document.getElementById('btn-link-leetcode');
  const btnUnlink = document.getElementById('btn-unlink-leetcode');
  const usernameInput = document.getElementById('leetcode-username-input');

  if (btnLink && !btnLink.dataset.bound) {
    btnLink.dataset.bound = 'true';
    btnLink.addEventListener('click', async () => {
      const statusMsg = document.getElementById('leetcode-status-msg');
      const username = usernameInput ? usernameInput.value.trim() : '';

      // Input Validation: LeetCode usernames cannot contain spaces or invalid characters
      if (!username || /\s/.test(username) || /[^a-zA-Z0-9_-]/.test(username)) {
        if (statusMsg) {
          statusMsg.style.color = '#ef4444';
          statusMsg.innerText = 'Enter a valid LeetCode username';
        }
        return;
      }

      if (state && state.user) {
        state.user.leetcodeUsername = username;
        saveState();
      }

      try {
        const token = auth.getToken();
        await fetch(`${API_BASE}/user/leetcode`, {
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
      updateLeetCodeHeaderPill('');

      try {
        const token = auth.getToken();
        await fetch(`${API_BASE}/user/leetcode`, {
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
    const cleanTitle = (challenge.title || '').replace(/^\d+\.\s*/, '');
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
        <div style="font-size: 12px; font-weight: 800; color: ${globalIdx === activeChallengeIndex ? '#f59e0b' : '#f5e8d7'};">${globalIdx + 1}. ${cleanTitle}</div>
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


