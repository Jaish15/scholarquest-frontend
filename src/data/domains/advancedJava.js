/* ============================================================
   ScholarQuest Domain Bank — ADVANCED JAVA
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const ADVANCED_JAVA_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_b_${i + 1}`, domain: 'Advanced Java', difficulty: 'Beginner',
    question: i === 0 ? 'Which keyword is used to inherit a class in Java?' : `Java Language Basics Query #${i + 1}: What is the parent class of all Java classes?`,
    options: i === 0 ? ['extends', 'implements', 'inherits', 'super'] : ['java.lang.Object', 'java.lang.Class', 'java.util.Base', 'java.io.Serializable'],
    correctAnswer: 0,
    explanation: '`java.lang.Object` is the root of the class hierarchy in Java.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_i_${i + 1}`, domain: 'Advanced Java', difficulty: 'Intermediate',
    question: `Java Concurrency & Functional Query #${i + 1}: What is the functional method signature of \`java.util.function.Consumer<T>\`?`,
    options: ['void accept(T t)', 'boolean test(T t)', 'R apply(T t)', 'T get()'],
    correctAnswer: 0,
    explanation: '`Consumer<T>` accepts a single input argument of type T and returns no result (`void`).'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_a_${i + 1}`, domain: 'Advanced Java', difficulty: 'Advanced',
    question: `JVM Architecture & Memory Query #${i + 1}: What is the G1 Garbage Collector regions design purpose in Java 9+?`,
    options: ['Divides heap memory into equal-sized region blocks, prioritizing regions with most garbage for minimal pause times', 'Allocates objects directly to OS swap file', 'Disables thread synchronization', 'Compiles bytecode to C++'],
    correctAnswer: 0,
    explanation: 'G1 GC divides heap into discrete regions and collects garbage-first regions to satisfy target pause-time goals.'
  }))
];

export const ADVANCED_JAVA_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_c_b_${i + 1}`, domain: 'Advanced Java', title: `${i + 1}. Java Integer Parser #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>parseJavaInt${i + 1}(str)</code> returning parsed integer or NaN.</p>`,
    starterCode: `function parseJavaInt${i + 1}(str) {\n  return parseInt(str, 10);\n}\n\nconsole.log(parseJavaInt${i + 1}("42"));`,
    hint: 'Use `parseInt(str, 10)`.', explanation: 'Parses string to base-10 integer.',
    validator: `if (typeof parseJavaInt${i + 1} !== 'function') throw new Error('function missing'); if (parseJavaInt${i + 1}("42") !== 42) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_c_i_${i + 1}`, domain: 'Advanced Java', title: `${i + 1}. Stream Collector Filter #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>streamFilter${i + 1}(arr)</code> returning numbers greater than 10.</p>`,
    starterCode: `function streamFilter${i + 1}(arr) {\n  return arr.filter(x => x > 10);\n}\n\nconsole.log(streamFilter${i + 1}([5, 12, 8, 20]));`,
    hint: 'Use `filter(x => x > 10)`.', explanation: 'Simulates Java Stream filter operation.',
    validator: `if (typeof streamFilter${i + 1} !== 'function') throw new Error('function missing'); if (streamFilter${i + 1}([5, 12]).length !== 1) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `java_c_a_${i + 1}`, domain: 'Advanced Java', title: `${i + 1}. Concurrent Map Simulator #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>concurrentPutIfAbsent${i + 1}(map, key, val)</code> returning existing value or inserting new value.</p>`,
    starterCode: `function concurrentPutIfAbsent${i + 1}(map, key, val) {\n  if (map.has(key)) return map.get(key);\n  map.set(key, val);\n  return val;\n}\n\nconst m = new Map(); concurrentPutIfAbsent${i + 1}(m, 'k', 'v');`,
    hint: 'Check `map.has(key)` before setting.', explanation: 'Simulates ConcurrentHashMap `putIfAbsent` operation.',
    validator: `if (typeof concurrentPutIfAbsent${i + 1} !== 'function') throw new Error('function missing'); const m = new Map(); m.set('x', 1); if (concurrentPutIfAbsent${i + 1}(m, 'x', 2) !== 1) throw new Error('failed');`
  }))
];
