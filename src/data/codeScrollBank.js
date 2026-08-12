/* ============================================================
   ScholarQuest CodeScroll Domain Challenge Bank
   Interactive Coding Challenges across 9 Subjects with Hints & Validators
   ============================================================ */

export const CODE_SCROLL_BANK = [
  // ── 1. JAVASCRIPT ─────────────────────────────────────────────────────────
  {
    id: 'js_01',
    domain: 'JavaScript',
    title: '1. Array Element Multiplier',
    lang: 'JavaScript',
    difficulty: 'Easy',
    xpReward: 40,
    coinReward: 15,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>multiplyAll(arr, factor)</code> that multiplies each element in array <code>arr</code> by <code>factor</code> and returns a new array.</p>
    `,
    starterCode: `function multiplyAll(arr, factor) {
  // Write your code here
  return arr.map(num => num * factor);
}

console.log(multiplyAll([1, 2, 3], 3));`,
    hint: 'Use the built-in Array `.map()` method or a `for` loop to multiply each item.',
    explanation: '`arr.map(x => x * factor)` creates a new array with every element multiplied by factor.',
    validator: `
      if (typeof multiplyAll !== 'function') throw new Error('multiplyAll function is not defined.');
      const res = multiplyAll([2, 4], 5);
      if (!Array.isArray(res) || res[0] !== 10 || res[1] !== 20) throw new Error('multiplyAll([2, 4], 5) must return [10, 20].');
    `
  },

  // ── 2. PYTHON ─────────────────────────────────────────────────────────────
  {
    id: 'py_01',
    domain: 'Python',
    title: '2. Palindrome Checker',
    lang: 'JavaScript',
    difficulty: 'Medium',
    xpReward: 50,
    coinReward: 20,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>isPalindrome(str)</code> that returns <code>true</code> if the string reads the same backwards, ignoring case and spaces.</p>
    `,
    starterCode: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

console.log(isPalindrome("A man a plan a canal Panama"));`,
    hint: 'Convert to lowercase, strip non-alphanumeric characters, then compare string with its reverse.',
    explanation: 'Splitting into chars, reversing the array, and joining compares backward and forward strings.',
    validator: `
      if (typeof isPalindrome !== 'function') throw new Error('isPalindrome function is not defined.');
      if (!isPalindrome("racecar")) throw new Error('isPalindrome("racecar") must return true.');
      if (isPalindrome("hello")) throw new Error('isPalindrome("hello") must return false.');
    `
  },

  // ── 3. UML ────────────────────────────────────────────────────────────────
  {
    id: 'uml_01',
    domain: 'UML',
    title: '3. UML Class Association Parser',
    lang: 'JavaScript',
    difficulty: 'Medium',
    xpReward: 55,
    coinReward: 22,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>parseUMLRelation(symbol)</code> that returns <code>"Composition"</code> for <code>"<#--"</code>, <code>"Aggregation"</code> for <code>"<>--"</code>, and <code>"Inheritance"</code> for <code>"<|--"</code>.</p>
    `,
    starterCode: `function parseUMLRelation(symbol) {
  if (symbol === '<#--') return 'Composition';
  if (symbol === '<>--') return 'Aggregation';
  if (symbol === '<|--') return 'Inheritance';
  return 'Unknown';
}

console.log(parseUMLRelation('<#--'));`,
    hint: 'Use simple conditional checks or a lookup object matching UML class diagram notation symbols.',
    explanation: 'Class diagrams use `<#--` for composition, `<>--` for aggregation, and `<|--` for inheritance.',
    validator: `
      if (typeof parseUMLRelation !== 'function') throw new Error('parseUMLRelation function is not defined.');
      if (parseUMLRelation('<#--') !== 'Composition') throw new Error('"<#--" must return Composition.');
      if (parseUMLRelation('<>--') !== 'Aggregation') throw new Error('"<>--" must return Aggregation.');
    `
  },

  // ── 4. SOFTWARE TESTING ───────────────────────────────────────────────────
  {
    id: 'st_01',
    domain: 'Software Testing',
    title: '4. Assertion Suite Writer',
    lang: 'JavaScript',
    difficulty: 'Medium',
    xpReward: 60,
    coinReward: 25,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>assertStrictEqual(actual, expected)</code> that throws an Error with message <code>"Assertion Failed"</code> if actual !== expected, else returns <code>"PASS"</code>.</p>
    `,
    starterCode: `function assertStrictEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error("Assertion Failed");
  }
  return "PASS";
}

console.log(assertStrictEqual(5, 5));`,
    hint: 'Compare `actual !== expected`. Throw an Error instance when false.',
    explanation: 'Assertion helpers are the foundation of testing frameworks like Jest, Mocha, and JUnit.',
    validator: `
      if (typeof assertStrictEqual !== 'function') throw new Error('assertStrictEqual function is not defined.');
      if (assertStrictEqual(10, 10) !== 'PASS') throw new Error('assertStrictEqual(10, 10) must return "PASS".');
      let threw = false;
      try { assertStrictEqual(10, 20); } catch (e) { threw = true; }
      if (!threw) throw new Error('assertStrictEqual(10, 20) must throw an Error.');
    `
  },

  // ── 5. ADVANCED JAVA ──────────────────────────────────────────────────────
  {
    id: 'java_01',
    domain: 'Advanced Java',
    title: '5. Stream Filter & Reducer',
    lang: 'JavaScript',
    difficulty: 'Hard',
    xpReward: 65,
    coinReward: 28,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>sumEvenNumbers(arr)</code> that takes an array of numbers, filters for even numbers, and returns their sum.</p>
    `,
    starterCode: `function sumEvenNumbers(arr) {
  return arr.filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0);
}

console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6]));`,
    hint: 'Use `.filter(n => n % 2 === 0)` followed by `.reduce((acc, val) => acc + val, 0)`.',
    explanation: 'Java Streams `filter(n -> n % 2 == 0).reduce(0, Integer::sum)` mirrors JavaScript filter + reduce pipeline.',
    validator: `
      if (typeof sumEvenNumbers !== 'function') throw new Error('sumEvenNumbers function is not defined.');
      if (sumEvenNumbers([1, 2, 3, 4, 5, 6]) !== 12) throw new Error('sumEvenNumbers([1, 2, 3, 4, 5, 6]) must equal 12.');
    `
  },

  // ── 6. RUBY PROGRAMMING ───────────────────────────────────────────────────
  {
    id: 'ruby_01',
    domain: 'Ruby Programming',
    title: '6. Ruby Symbol Converter',
    lang: 'JavaScript',
    difficulty: 'Easy',
    xpReward: 45,
    coinReward: 18,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>toRubySymbol(str)</code> that takes a string (e.g. <code>"user_name"</code>) and formats it with a leading colon <code>":user_name"</code>.</p>
    `,
    starterCode: `function toRubySymbol(str) {
  return ":" + str.trim().toLowerCase().replace(/\\s+/g, '_');
}

console.log(toRubySymbol("user name"));`,
    hint: 'Prepend ":" to the string, replace spaces with underscores, and convert to lower case.',
    explanation: 'Ruby symbols are written as `:symbol_name` and represent immutable identifier keys.',
    validator: `
      if (typeof toRubySymbol !== 'function') throw new Error('toRubySymbol function is not defined.');
      if (toRubySymbol("status") !== ":status") throw new Error('toRubySymbol("status") must return ":status".');
      if (toRubySymbol("first name") !== ":first_name") throw new Error('toRubySymbol("first name") must return ":first_name".');
    `
  },

  // ── 7. MACHINE LEARNING ───────────────────────────────────────────────────
  {
    id: 'ml_01',
    domain: 'Machine Learning',
    title: '7. Mean Squared Error (MSE)',
    lang: 'JavaScript',
    difficulty: 'Hard',
    xpReward: 70,
    coinReward: 30,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>calculateMSE(yTrue, yPred)</code> that computes the Mean Squared Error between true and predicted arrays: <code>(1/N) * sum((yTrue[i] - yPred[i])^2)</code>.</p>
    `,
    starterCode: `function calculateMSE(yTrue, yPred) {
  let sumSq = 0;
  for (let i = 0; i < yTrue.length; i++) {
    const diff = yTrue[i] - yPred[i];
    sumSq += diff * diff;
  }
  return sumSq / yTrue.length;
}

console.log(calculateMSE([3, -0.5, 2, 7], [2.5, 0, 2, 8]));`,
    hint: 'Iterate through predicted values, compute the squared difference `(yTrue[i] - yPred[i]) ** 2`, sum them up, and divide by array length.',
    explanation: 'Mean Squared Error measures average squared deviation of predicted values from true labels.',
    validator: `
      if (typeof calculateMSE !== 'function') throw new Error('calculateMSE function is not defined.');
      const mse = calculateMSE([1, 2, 3], [1, 2, 3]);
      if (mse !== 0) throw new Error('MSE of identical arrays must equal 0.');
      const mse2 = calculateMSE([1, 2], [2, 4]); // (1 + 4)/2 = 2.5
      if (mse2 !== 2.5) throw new Error('MSE calculation incorrect.');
    `
  },

  // ── 8. DEEP LEARNING ──────────────────────────────────────────────────────
  {
    id: 'dl_01',
    domain: 'Deep Learning',
    title: '8. ReLU Activation Function',
    lang: 'JavaScript',
    difficulty: 'Easy',
    xpReward: 40,
    coinReward: 15,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>relu(x)</code> that returns <code>x</code> if <code>x > 0</code>, otherwise returns <code>0</code>.</p>
    `,
    starterCode: `function relu(x) {
  return Math.max(0, x);
}

console.log(relu(-5));
console.log(relu(10));`,
    hint: 'Use `Math.max(0, x)` or an `if (x > 0)` condition.',
    explanation: 'Rectified Linear Unit (ReLU) is the standard activation function in deep neural networks: f(x) = max(0, x).',
    validator: `
      if (typeof relu !== 'function') throw new Error('relu function is not defined.');
      if (relu(-10) !== 0) throw new Error('relu(-10) must return 0.');
      if (relu(5) !== 5) throw new Error('relu(5) must return 5.');
    `
  },

  // ── 9. CYBERSECURITY ──────────────────────────────────────────────────────
  {
    id: 'sec_01',
    domain: 'Cybersecurity',
    title: '9. XSS Input Sanitizer',
    lang: 'JavaScript',
    difficulty: 'Medium',
    xpReward: 60,
    coinReward: 25,
    problemStatement: `
      <h4>Goal:</h4>
      <p>Write a function <code>sanitizeInput(str)</code> that escapes <code><</code> to <code>&lt;</code> and <code>></code> to <code>&gt;</code> to prevent Cross-Site Scripting (XSS).</p>
    `,
    starterCode: `function sanitizeInput(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

console.log(sanitizeInput("<script>alert('xss')</script>"));`,
    hint: 'Use regular expressions `.replace(/</g, "&lt;").replace(/>/g, "&gt;")`.',
    explanation: 'Escaping HTML control characters prevents user inputs from executing as scripts in victim browsers.',
    validator: `
      if (typeof sanitizeInput !== 'function') throw new Error('sanitizeInput function is not defined.');
      if (sanitizeInput("<script>") !== "&lt;script&gt;") throw new Error('sanitizeInput("<script>") must return "&lt;script&gt;".');
    `
  }
];
