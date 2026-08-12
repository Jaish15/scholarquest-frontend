/* ============================================================
   ScholarQuest Domain Bank — SOFTWARE TESTING
   Contains 120 QuizForge Questions & 120 CodeScroll Test Suite Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const SOFTWARE_TESTING_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_b_${i + 1}`, domain: 'Software Testing', difficulty: 'Beginner',
    question: i === 0 ? 'What is Black-Box Testing?' : `Testing Fundamental Query #${i + 1}: What is unit testing?`,
    options: i === 0 ? ['Testing without internal code structure knowledge', 'Code refactoring', 'SQL optimization', 'UI design'] : ['Testing individual isolated units/functions of code', 'Testing full hardware', 'User design feedback', 'Database migration'],
    correctAnswer: 0,
    explanation: 'Unit testing verifies individual components or functions in isolation.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_i_${i + 1}`, domain: 'Software Testing', difficulty: 'Intermediate',
    question: `Testing Strategy Query #${i + 1}: What does Equivalence Partitioning involve in test case design?`,
    options: ['Dividing input data into valid and invalid partitions where test cases cover representatives of each class', 'Testing all possible 2^64 numbers', 'Deleting error logs', 'Writing mock objects'],
    correctAnswer: 0,
    explanation: 'Equivalence Partitioning reduces total test cases while ensuring coverage across input boundary equivalence classes.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_a_${i + 1}`, domain: 'Software Testing', difficulty: 'Advanced',
    question: `Advanced Test Metrics Query #${i + 1}: What is Mutation Testing used to evaluate?`,
    options: ['Quality and effectiveness of test suite assertions by introducing artificial code faults (mutants)', 'Database read speeds', 'Compiler optimization levels', 'Network latency'],
    correctAnswer: 0,
    explanation: 'Mutation testing introduces small mutations into source code to verify if unit test suites detect and fail mutant instances.'
  }))
];

export const SOFTWARE_TESTING_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_c_b_${i + 1}`, domain: 'Software Testing', title: `${i + 1}. Basic Assertion Checker #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>assertEquals${i + 1}(a, b)</code> returning true if <code>a === b</code>.</p>`,
    starterCode: `function assertEquals${i + 1}(a, b) {\n  return a === b;\n}\n\nconsole.log(assertEquals${i + 1}(10, 10));`,
    hint: 'Compare `a === b`.', explanation: 'Checks strict equality assertion.',
    validator: `if (typeof assertEquals${i + 1} !== 'function') throw new Error('function missing'); if (!assertEquals${i + 1}(10, 10)) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_c_i_${i + 1}`, domain: 'Software Testing', title: `${i + 1}. Boundary Value Test Generator #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>isValidAge${i + 1}(age)</code> returning true if age is between 18 and 65 inclusive.</p>`,
    starterCode: `function isValidAge${i + 1}(age) {\n  return age >= 18 && age <= 65;\n}\n\nconsole.log(isValidAge${i + 1}(25));`,
    hint: '`age >= 18 && age <= 65`.', explanation: 'Tests boundary conditions for age input range.',
    validator: `if (typeof isValidAge${i + 1} !== 'function') throw new Error('function missing'); if (!isValidAge${i + 1}(18) || isValidAge${i + 1}(17)) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `st_c_a_${i + 1}`, domain: 'Software Testing', title: `${i + 1}. Mock Function Recorder #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>createMock${i + 1}()</code> returning an object with <code>calls</code> array tracking arguments passed.</p>`,
    starterCode: `function createMock${i + 1}() {\n  const fn = function(...args) { fn.calls.push(args); };\n  fn.calls = [];\n  return fn;\n}\n\nconst mock = createMock${i + 1}(); mock("test");`,
    hint: 'Store calls array on mock function.', explanation: 'Simulates Jest/Sinon mock call trackers.',
    validator: `if (typeof createMock${i + 1} !== 'function') throw new Error('function missing'); const m = createMock${i + 1}(); m("a"); if (m.calls.length !== 1) throw new Error('failed');`
  }))
];
