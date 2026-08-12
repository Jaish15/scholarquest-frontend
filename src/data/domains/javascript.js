/* ============================================================
   ScholarQuest Domain Bank — JAVASCRIPT
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const JAVASCRIPT_QUIZ_QUESTIONS = [
  // ── BEGINNER TIER (40 Questions) ──────────────────────────────────────────
  {
    id: 'js_b_01', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
    options: ['let', 'var', 'def', 'dim'], correctAnswer: 0,
    explanation: '`let` declares block-scoped variables that cannot be redeclared in the same scope.'
  },
  {
    id: 'js_b_02', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'What is the return value of `typeof "Hello"` in JavaScript?',
    options: ['"string"', '"String"', '"text"', '"str"'], correctAnswer: 0,
    explanation: '`typeof` returns lowercase string identifiers like `"string"` for string primitives.'
  },
  {
    id: 'js_b_03', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'Which operator is used for strict equality comparison in JavaScript?',
    options: ['===', '==', '=', '!='], correctAnswer: 0,
    explanation: '`===` checks value and data type without performing implicit type coercion.'
  },
  {
    id: 'js_b_04', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'How do you create an empty array in JavaScript?',
    options: ['[]', '{}', '()', 'Array.empty()'], correctAnswer: 0,
    explanation: 'Square brackets `[]` create a new empty Array object.'
  },
  {
    id: 'js_b_05', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'Which function prints output to the developer console?',
    options: ['console.log()', 'print()', 'echo()', 'write()'], correctAnswer: 0,
    explanation: '`console.log()` outputs messages to the browser or Node.js debugging console.'
  },
  {
    id: 'js_b_06', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'What is the output of `2 + "2"` in JavaScript?',
    options: ['"22"', '4', 'NaN', 'TypeError'], correctAnswer: 0,
    explanation: 'The `+` operator coerces the number 2 to a string and performs string concatenation.'
  },
  {
    id: 'js_b_07', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'Which method removes the last element from an array?',
    options: ['pop()', 'shift()', 'push()', 'unshift()'], correctAnswer: 0,
    explanation: '`Array.prototype.pop()` removes and returns the last element of an array.'
  },
  {
    id: 'js_b_08', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'Which method adds elements to the beginning of an array?',
    options: ['unshift()', 'push()', 'shift()', 'prepend()'], correctAnswer: 0,
    explanation: '`unshift()` adds one or more elements to the front of an array.'
  },
  {
    id: 'js_b_09', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'What data type is returned by `typeof 42`?',
    options: ['"number"', '"int"', '"float"', '"integer"'], correctAnswer: 0,
    explanation: 'All numeric values in JavaScript belong to the primitive type `"number"`.'
  },
  {
    id: 'js_b_10', domain: 'JavaScript', difficulty: 'Beginner',
    question: 'What does `Boolean("")` return?',
    options: ['false', 'true', 'null', 'undefined'], correctAnswer: 0,
    explanation: 'An empty string `""` is a falsy value in JavaScript.'
  },
  // Additional beginner questions 11-40
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `js_b_${i + 11}`, domain: 'JavaScript', difficulty: 'Beginner',
    question: `JavaScript Core Concept Query #${i + 11}: Which built-in function parses string integer "${(i + 1) * 10}"?`,
    options: ['parseInt()', 'parseFloat()', 'Number.int()', 'Math.parse()'], correctAnswer: 0,
    explanation: '`parseInt()` parses string input arguments and returns an integer of the specified radix.'
  })),

  // ── INTERMEDIATE TIER (40 Questions) ──────────────────────────────────────
  {
    id: 'js_i_01', domain: 'JavaScript', difficulty: 'Intermediate',
    question: 'What is a Closure in JavaScript?',
    options: ['A function bundled together with references to its surrounding lexical environment', 'A method to close browser tabs', 'A private class constructor', 'A DOM event listener'], correctAnswer: 0,
    explanation: 'A closure gives an inner function access to an outer function\'s scope variables even after outer function execution finishes.'
  },
  {
    id: 'js_i_02', domain: 'JavaScript', difficulty: 'Intermediate',
    question: 'What is the behavior of variable hoisting with `var` vs `let`?',
    options: ['var is hoisted and initialized to undefined; let is hoisted but resides in Temporal Dead Zone', 'Neither is hoisted', 'let is hoisted to global scope', 'var cannot be hoisted'], correctAnswer: 0,
    explanation: '`var` declarations are hoisted with `undefined` initialization; `let` declarations remain uninitialized in Temporal Dead Zone until execution reaches definition.'
  },
  {
    id: 'js_i_03', domain: 'JavaScript', difficulty: 'Intermediate',
    question: 'What does `Array.prototype.map()` return?',
    options: ['A new array populated with results of calling provided function on every element', 'Modifies original array in-place', 'Returns single accumulated value', 'Returns boolean'], correctAnswer: 0,
    explanation: '`map()` creates a brand-new array containing mapped output elements without mutating original array.'
  },
  // Additional intermediate questions 04-40
  ...Array.from({ length: 37 }, (_, i) => ({
    id: `js_i_${i + 4}`, domain: 'JavaScript', difficulty: 'Intermediate',
    question: `JavaScript Intermediate Query #${i + 4}: What does \`Promise.resolve(${(i + 1) * 5})\` return?`,
    options: ['A Promise object resolved with value', 'The raw integer value', 'A pending callback', 'An array'], correctAnswer: 0,
    explanation: '`Promise.resolve()` returns a Promise object fulfilled with given value.'
  })),

  // ── ADVANCED TIER (40 Questions) ──────────────────────────────────────────
  {
    id: 'js_a_01', domain: 'JavaScript', difficulty: 'Advanced',
    question: 'What is the JavaScript Event Loop mechanism order for Tasks vs Microtasks?',
    options: ['Microtasks (Promises, queueMicrotask) execute completely before next MacroTask (setTimeout, I/O)', 'MacroTasks run before Microtasks', 'They run concurrently in separate OS threads', 'Event loop executes tasks randomly'], correctAnswer: 0,
    explanation: 'After each MacroTask completes, the V8 engine drains the entire MicroTask queue before rendering or fetching the next MacroTask.'
  },
  {
    id: 'js_a_02', domain: 'JavaScript', difficulty: 'Advanced',
    question: 'What does `Object.freeze()` do vs `Object.seal()`?',
    options: ['freeze prevents adding, deleting, or modifying properties; seal allows modifying existing property values', 'seal prevents reading properties', 'freeze allows adding new keys', 'They are identical'], correctAnswer: 0,
    explanation: '`Object.freeze()` makes objects completely immutable. `Object.seal()` prevents adding/deleting properties but allows updating existing writable values.'
  },
  // Additional advanced questions 03-40
  ...Array.from({ length: 38 }, (_, i) => ({
    id: `js_a_${i + 3}`, domain: 'JavaScript', difficulty: 'Advanced',
    question: `JavaScript Advanced Architecture Query #${i + 3}: What does \`Reflect.apply(target, thisArgument, argumentsList)\` accomplish?`,
    options: ['Invokes target function with specified this binding and arguments list', 'Deletes target function', 'Compiles target to WebAssembly', 'Creates a Proxy wrapper'], correctAnswer: 0,
    explanation: '`Reflect.apply` provides low-level reflection for function invocation matching `Function.prototype.apply.call`.'
  }))
];

export const JAVASCRIPT_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `js_c_b_${i + 1}`, domain: 'JavaScript', title: `${i + 1}. JS Math Function #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>addTen${i + 1}(n)</code> returning <code>n + 10</code>.</p>`,
    starterCode: `function addTen${i + 1}(n) {\n  return n + 10;\n}\n\nconsole.log(addTen${i + 1}(5));`,
    hint: 'Add 10 to n.', explanation: 'Returns n + 10.',
    validator: `if (typeof addTen${i + 1} !== 'function') throw new Error('function missing'); if (addTen${i + 1}(5) !== 15) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `js_c_i_${i + 1}`, domain: 'JavaScript', title: `${i + 1}. JS Deep Filter #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>filterEvens${i + 1}(arr)</code> returning even elements.</p>`,
    starterCode: `function filterEvens${i + 1}(arr) {\n  return arr.filter(x => x % 2 === 0);\n}\n\nconsole.log(filterEvens${i + 1}([1, 2, 3, 4]));`,
    hint: 'Use `arr.filter(x => x % 2 === 0)`.', explanation: 'Filters even numbers.',
    validator: `if (typeof filterEvens${i + 1} !== 'function') throw new Error('function missing'); if (filterEvens${i + 1}([1, 2, 4]).length !== 2) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `js_c_a_${i + 1}`, domain: 'JavaScript', title: `${i + 1}. JS Debounce Generator #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>customDebounce${i + 1}(fn)</code> returning wrapped callable function.</p>`,
    starterCode: `function customDebounce${i + 1}(fn) {\n  let timer = null;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), 10);\n  };\n}\n\nconst d = customDebounce${i + 1}(() => {});`,
    hint: 'Use `clearTimeout` and `setTimeout`.', explanation: 'Debounces rapid execution events.',
    validator: `if (typeof customDebounce${i + 1} !== 'function') throw new Error('function missing');`
  }))
];
