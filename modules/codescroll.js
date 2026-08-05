/* ==========================================
   ScholarQuest CodeScroll Module
   Interactive coding challenges & JS execution sandboxing
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';

const LESSONS = [
  {
    id: 'js_vars',
    title: '1. Variables & Arithmetic',
    lang: 'JavaScript',
    xpReward: 40,
    coinReward: 15,
    completed: false,
    desc: `
      <h4>Goal:</h4>
      <p>Declare a variable named <code>multiplier</code> and set it to <code>8</code>.</p>
      <p>Declare another variable named <code>total</code> and set it to <code>10 * multiplier</code>.</p>
    `,
    template: `// Declare multiplier and set to 8
let multiplier = 8;

// Declare total and set to 10 * multiplier
let total = 10 * multiplier;

console.log("Multiplier:", multiplier);
console.log("Total:", total);`,
    validator: `
      if (typeof multiplier === 'undefined') throw new Error('multiplier variable is not declared.');
      if (multiplier !== 8) throw new Error('multiplier must be exactly 8.');
      if (typeof total === 'undefined') throw new Error('total variable is not declared.');
      if (total !== 80) throw new Error('total must equal 80 (10 * multiplier).');
    `
  },
  {
    id: 'js_strings',
    title: '2. String Assembler',
    lang: 'JavaScript',
    xpReward: 50,
    coinReward: 20,
    completed: false,
    desc: `
      <h4>Goal:</h4>
      <p>Complete the function <code>generateRoomCode(num)</code> to concatenate and return the prefix string <code>"SCQ-"</code> followed by the input <code>num</code>.</p>
    `,
    template: `function generateRoomCode(num) {
  // Write your code here
  return "SCQ-" + num;
}

console.log(generateRoomCode(4829));`,
    validator: `
      if (typeof generateRoomCode !== 'function') throw new Error('generateRoomCode function is not defined.');
      if (generateRoomCode(4829) !== 'SCQ-4829') throw new Error('generateRoomCode(4829) must return "SCQ-4829".');
      if (generateRoomCode(1000) !== 'SCQ-1000') throw new Error('generateRoomCode(1000) must return "SCQ-1000".');
    `
  },
  {
    id: 'js_arrays',
    title: '3. Peak Finder (DSA)',
    lang: 'JavaScript',
    xpReward: 70,
    coinReward: 30,
    completed: false,
    desc: `
      <h4>Goal:</h4>
      <p>Write a function <code>findMax(arr)</code> that accepts an array of integers and returns the maximum value found inside it.</p>
    `,
    template: `function findMax(arr) {
  // Write loop/logic to find max
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log("Max item is:", findMax([12, 45, 2, 9, 32]));`,
    validator: `
      if (typeof findMax !== 'function') throw new Error('findMax function is not defined.');
      if (findMax([1, 5, 3]) !== 5) throw new Error('findMax([1, 5, 3]) did not return 5.');
      if (findMax([-10, -5, -2]) !== -2) throw new Error('findMax([-10, -5, -2]) did not return -2.');
    `
  }
];

let activeLessonIndex = 0;

export function initCodeScroll() {
  loadCompletedLessons();
  renderLessons();
  loadLesson(0);
  setupWorkspaceEvents();
}

function loadCompletedLessons() {
  const completedIds = JSON.parse(localStorage.getItem('scholarquest_completed_scrolls') || '[]');
  LESSONS.forEach(l => {
    if (completedIds.includes(l.id)) {
      l.completed = true;
    }
  });
}

function saveCompletedLesson(lessonId) {
  const completedIds = JSON.parse(localStorage.getItem('scholarquest_completed_scrolls') || '[]');
  if (!completedIds.includes(lessonId)) {
    completedIds.push(lessonId);
  }
  localStorage.setItem('scholarquest_completed_scrolls', JSON.stringify(completedIds));
}

function renderLessons() {
  const container = document.getElementById('lessons-list');
  if (!container) return;
  container.innerHTML = '';
  
  LESSONS.forEach((lesson, idx) => {
    const item = document.createElement('div');
    item.className = `lesson-item ${idx === activeLessonIndex ? 'active' : ''}`;
    item.innerHTML = `
      <div class="lesson-info">
        <span class="lesson-title">${lesson.title}</span>
        <span class="lesson-reward-lbl">+${lesson.xpReward} XP / +${lesson.coinReward} Coins</span>
      </div>
      <div>
        ${lesson.completed ? '<span class="lesson-status completed">Cleared</span>' : '<span class="lesson-status text-muted">Scroll locked</span>'}
      </div>
    `;
    
    item.addEventListener('click', () => {
      document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      loadLesson(idx);
    });
    
    container.appendChild(item);
  });
}

function loadLesson(idx) {
  activeLessonIndex = idx;
  const lesson = LESSONS[idx];
  
  document.getElementById('current-lesson-title').innerText = lesson.title;
  document.getElementById('current-lesson-lang').innerText = lesson.lang;
  document.getElementById('lesson-desc').innerHTML = lesson.desc;
  document.getElementById('code-editor-input').value = lesson.template;
  
  document.getElementById('console-output-text').innerText = '[System] Lesson loaded. Ready to run.';
}

function setupWorkspaceEvents() {
  document.getElementById('btn-run-code').addEventListener('click', runUserCode);
  document.getElementById('btn-submit-code').addEventListener('click', submitUserCode);
  document.getElementById('btn-clear-console').addEventListener('click', () => {
    document.getElementById('console-output-text').innerText = '';
  });
}

// In-browser custom JS sandbox
function runUserCode() {
  const code = document.getElementById('code-editor-input').value;
  const logs = [];
  
  // Hijack console.log
  const originalLog = console.log;
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
  };
  
  try {
    // Run evaluated code
    const runner = new Function(code);
    runner();
    
    // Restore log
    console.log = originalLog;
    
    // Print to workspace console
    const outputText = logs.length > 0 ? logs.join('\n') : '[Success] Code ran without outputting console logs.';
    document.getElementById('console-output-text').innerText = outputText;
    return true;
  } catch (err) {
    console.log = originalLog;
    document.getElementById('console-output-text').innerText = `[Error] ${err.message}`;
    return false;
  }
}

// Run code + assertions validation check
function submitUserCode() {
  const code = document.getElementById('code-editor-input').value;
  const lesson = LESSONS[activeLessonIndex];
  
  // Hijack console log
  const originalLog = console.log;
  const logs = [];
  console.log = (...args) => {
    logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
  };
  
  try {
    // Run user logic + verification checks
    const verifyScript = `
      ${code}
      ${lesson.validator}
    `;
    const runner = new Function(verifyScript);
    runner();
    
    console.log = originalLog;
    
    // Reward Grant
    if (!lesson.completed) {
      lesson.completed = true;
      saveCompletedLesson(lesson.id);
      
      addXP(lesson.xpReward);
      addCoins(lesson.coinReward);
      
      state.stats.lessonsCompleted += 1;
      saveState();
      updateUI();
      
      renderLessons(); // refresh sidebar statuses
      alert(`🎉 Quest Cleared! +${lesson.xpReward} XP / +${lesson.coinReward} Coins awarded!`);
    } else {
      alert('You have already claimed rewards for this lesson scroll!');
    }
    
    document.getElementById('console-output-text').innerText = `[PASS] Verification Complete!\n${logs.join('\n')}`;
  } catch (err) {
    console.log = originalLog;
    document.getElementById('console-output-text').innerText = `[FAIL] Code failed assertion checks:\n-> ${err.message}`;
  }
}
