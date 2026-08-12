/* ============================================================
   ScholarQuest QuizForge Domain Question Bank
   Structured Questions for 9 Technical Domains with Adaptive Explanations
   ============================================================ */

export const QUIZ_BANK = [
  // ── 1. PYTHON ─────────────────────────────────────────────────────────────
  {
    id: 'py_01',
    domain: 'Python',
    difficulty: 'Easy',
    question: 'What is the output of `type([])` in Python?',
    options: ["<class 'list'>", "<class 'array'>", "<class 'set'>", "<class 'tuple'>"],
    correctAnswer: 0,
    explanation: "In Python, square brackets `[]` create a list instance, which belongs to `<class 'list'>`."
  },
  {
    id: 'py_02',
    domain: 'Python',
    difficulty: 'Easy',
    question: 'Which method adds a single element to the end of a Python list?',
    options: ['append()', 'extend()', 'insert()', 'push()'],
    correctAnswer: 0,
    explanation: "`append()` adds its argument as a single element to the end of the list. `extend()` iterates over an iterable."
  },
  {
    id: 'py_03',
    domain: 'Python',
    difficulty: 'Medium',
    question: 'What is a key difference between a Python tuple and a Python list?',
    options: ['Tuples are immutable; lists are mutable', 'Lists cannot store strings', 'Tuples are unordered', 'Lists use parentheses ()'],
    correctAnswer: 0,
    explanation: "Tuples cannot be altered after creation (immutable), whereas list elements can be modified, appended, or deleted."
  },
  {
    id: 'py_04',
    domain: 'Python',
    difficulty: 'Medium',
    question: 'What is the result of `bool("False")` in Python?',
    options: ['True', 'False', 'TypeError', 'None'],
    correctAnswer: 0,
    explanation: "Any non-empty string in Python evaluates to `True` when converted to boolean, even if the text content is 'False'."
  },
  {
    id: 'py_05',
    domain: 'Python',
    difficulty: 'Hard',
    question: 'What does the `@staticmethod` decorator do in Python class definitions?',
    options: ['Defines a method that does not receive implicit first argument (self or cls)', 'Makes the method private', 'Ensures the method cannot be overridden', 'Executes the method upon class loading'],
    correctAnswer: 0,
    explanation: "A `@staticmethod` behaves like a standard function bound to a class namespace; it does not receive `self` or `cls`."
  },

  // ── 2. JAVASCRIPT ─────────────────────────────────────────────────────────
  {
    id: 'js_01',
    domain: 'JavaScript',
    difficulty: 'Easy',
    question: 'What is the return value of `typeof null` in JavaScript?',
    options: ['"object"', '"null"', '"undefined"', '"number"'],
    correctAnswer: 0,
    explanation: "Due to a historical bug in early JavaScript implementations (where null was tagged as 0x00 object reference), `typeof null` returns `'object'`."
  },
  {
    id: 'js_02',
    domain: 'JavaScript',
    difficulty: 'Medium',
    question: 'What is the difference between `==` and `===` in JavaScript?',
    options: ['=== checks both value and type without coercion', '== compares references only', '=== performs implicit type conversion', 'There is no difference'],
    correctAnswer: 0,
    explanation: "`===` is the strict equality operator. It checks value and type without performing implicit type coercion."
  },
  {
    id: 'js_03',
    domain: 'JavaScript',
    difficulty: 'Medium',
    question: 'What is event bubbling in the JavaScript DOM event flow?',
    options: ['Events trigger on target element first and propagate up to ancestor elements', 'Events trigger on window and move down to target', 'Events fire in random order', 'Events cancel parent event handlers'],
    correctAnswer: 0,
    explanation: "Event bubbling propagates an event up from the deepest target element through its ancestor DOM elements."
  },
  {
    id: 'js_04',
    domain: 'JavaScript',
    difficulty: 'Hard',
    question: 'What will `Promise.all([Promise.reject("Err"), Promise.resolve("OK")])` do?',
    options: ['Rejects immediately with "Err"', 'Resolves with ["Err", "OK"]', 'Hangs indefinitely', 'Resolves with "OK"'],
    correctAnswer: 0,
    explanation: "`Promise.all` fails fast and immediately rejects as soon as any promise in the array rejects."
  },

  // ── 3. UML ────────────────────────────────────────────────────────────────
  {
    id: 'uml_01',
    domain: 'UML',
    difficulty: 'Easy',
    question: 'Which UML diagram represents static structure showing classes, attributes, and relationships?',
    options: ['Class Diagram', 'Sequence Diagram', 'Activity Diagram', 'Use Case Diagram'],
    correctAnswer: 0,
    explanation: "A Class Diagram is a structural diagram showing classes, attributes, operations, and relationships."
  },
  {
    id: 'uml_02',
    domain: 'UML',
    difficulty: 'Medium',
    question: 'In UML Class Diagrams, what does a filled solid diamond symbol represent?',
    options: ['Composition (strong ownership/lifecycle coupling)', 'Aggregation (weak reference)', 'Inheritance', 'Generalization'],
    correctAnswer: 0,
    explanation: "A filled black diamond indicates Composition — a strong whole-part relationship where child life depends on the parent."
  },
  {
    id: 'uml_03',
    domain: 'UML',
    difficulty: 'Medium',
    question: 'Which diagram is best suited to model dynamic interaction and message exchange between objects over time?',
    options: ['Sequence Diagram', 'Component Diagram', 'Deployment Diagram', 'Package Diagram'],
    correctAnswer: 0,
    explanation: "Sequence Diagrams visualize object interactions ordered in sequence over time."
  },

  // ── 4. SOFTWARE TESTING ───────────────────────────────────────────────────
  {
    id: 'st_01',
    domain: 'Software Testing',
    difficulty: 'Easy',
    question: 'What is Black-Box Testing?',
    options: ['Testing software functionality without knowing internal code implementation', 'Testing internal code structures and logic paths', 'Performance testing under high CPU stress', 'Compiling code without warnings'],
    correctAnswer: 0,
    explanation: "Black-box testing focuses purely on inputs and outputs without examining the internal codebase structure."
  },
  {
    id: 'st_02',
    domain: 'Software Testing',
    difficulty: 'Medium',
    question: 'What is Regression Testing?',
    options: ['Re-testing software after code changes to ensure existing functionality remains intact', 'Testing initial requirements specification', 'User acceptance testing on production', 'Writing code documentation'],
    correctAnswer: 0,
    explanation: "Regression testing verifies that new updates or bug fixes have not broken existing working features."
  },
  {
    id: 'st_03',
    domain: 'Software Testing',
    difficulty: 'Hard',
    question: 'What does Cyclomatic Complexity measure in software testing?',
    options: ['The number of linearly independent execution paths through code', 'Total lines of code', 'Memory usage per function', 'Database query execution speed'],
    correctAnswer: 0,
    explanation: "Cyclomatic complexity measures code decision complexity to determine the minimum number of test cases required for full coverage."
  },

  // ── 5. ADVANCED JAVA ──────────────────────────────────────────────────────
  {
    id: 'java_01',
    domain: 'Advanced Java',
    difficulty: 'Medium',
    question: 'What is the purpose of the `volatile` keyword in Java multi-threading?',
    options: ['Ensures variable updates are immediately visible to all threads by bypassing local CPU cache', 'Prevents a method from being overridden', 'Serializes an object to JSON', 'Makes a variable immutable'],
    correctAnswer: 0,
    explanation: "`volatile` forces thread reads and writes directly to main memory, ensuring visibility across threads."
  },
  {
    id: 'java_02',
    domain: 'Advanced Java',
    difficulty: 'Hard',
    question: 'In Java 8+, what is the functional contract of `java.util.function.Predicate<T>`?',
    options: ['Accepts an argument of type T and returns a boolean (`boolean test(T t)`)', 'Accepts T and returns R', 'Consumes T and returns void', 'Supplies T without arguments'],
    correctAnswer: 0,
    explanation: "A `Predicate<T>` represents a boolean-valued function taking a single input of type T."
  },

  // ── 6. RUBY PROGRAMMING ───────────────────────────────────────────────────
  {
    id: 'ruby_01',
    domain: 'Ruby Programming',
    difficulty: 'Easy',
    question: 'How are symbols written in Ruby?',
    options: [':symbol_name', '@symbol_name', '$symbol_name', '#symbol_name'],
    correctAnswer: 0,
    explanation: "In Ruby, symbols start with a colon `:` (e.g. `:status`). They are immutable, unique identifiers."
  },
  {
    id: 'ruby_02',
    domain: 'Ruby Programming',
    difficulty: 'Medium',
    question: 'What is a block in Ruby?',
    options: ['A chunk of code enclosed in `{}` or `do...end` passed to methods using `yield`', 'A private class method', 'A global variable container', 'A database lock'],
    correctAnswer: 0,
    explanation: "Ruby blocks are anonymous code segments passed into methods, invoked internally via the `yield` keyword."
  },

  // ── 7. MACHINE LEARNING ───────────────────────────────────────────────────
  {
    id: 'ml_01',
    domain: 'Machine Learning',
    difficulty: 'Easy',
    question: 'What is Supervised Learning?',
    options: ['Training algorithms using labeled dataset input-output pairs', 'Clustering unlabelled data points', 'Reward-based trial and error learning', 'Compiling decision trees without data'],
    correctAnswer: 0,
    explanation: "Supervised learning relies on labeled training pairs (X, y) so the model learns mapping functions."
  },
  {
    id: 'ml_02',
    domain: 'Machine Learning',
    difficulty: 'Medium',
    question: 'What is overfitting in machine learning models?',
    options: ['Model fits training data too closely, performing poorly on unseen validation data', 'Model is too simple to capture trends', 'Model runs out of RAM', 'Dataset contains zero noise'],
    correctAnswer: 0,
    explanation: "Overfitting occurs when a model memorizes noise in training data, failing to generalize to new inputs."
  },

  // ── 8. DEEP LEARNING ──────────────────────────────────────────────────────
  {
    id: 'dl_01',
    domain: 'Deep Learning',
    difficulty: 'Medium',
    question: 'What is the purpose of an Activation Function in Neural Networks?',
    options: ['Introduces non-linearity allowing networks to learn complex non-linear mappings', 'Resets weights to zero', 'Increases training dataset size', 'Normalizes batch dimensions'],
    correctAnswer: 0,
    explanation: "Without non-linear activation functions (ReLU, Sigmoid, GELU), multi-layer neural networks collapse into linear regression."
  },
  {
    id: 'dl_02',
    domain: 'Deep Learning',
    difficulty: 'Hard',
    question: 'What problem does Gradient Clipping address during Backpropagation?',
    options: ['Exploding Gradients', 'Vanishing Gradients', 'Underfitting', 'Label Noise'],
    correctAnswer: 0,
    explanation: "Gradient Clipping caps maximum gradient norms to prevent numerical instability caused by exploding gradients."
  },

  // ── 9. CYBERSECURITY ──────────────────────────────────────────────────────
  {
    id: 'sec_01',
    domain: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What is SQL Injection (SQLi)?',
    options: ['Attacker inserts malicious SQL code into input fields to manipulate database queries', 'Overloading server bandwidth', 'Intercepting unencrypted Wi-Fi packets', 'Brute forcing user passwords'],
    correctAnswer: 0,
    explanation: "SQLi exploits unsanitized input concatenated into SQL queries to bypass authentication or extract sensitive data."
  },
  {
    id: 'sec_02',
    domain: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What does CORS stand for in Web Application Security?',
    options: ['Cross-Origin Resource Sharing', 'Central Online Relay Service', 'Cryptographic Outer Encryption System', 'Client Object Restriction Standard'],
    correctAnswer: 0,
    explanation: "CORS is an HTTP-header based security mechanism allowing servers to specify which origin domains can request resources."
  },
  {
    id: 'sec_03',
    domain: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is Cross-Site Request Forgery (CSRF)?',
    options: ['Trick victim web browser into sending unauthorized requests with victim credentials to vulnerable site', 'Injecting malicious scripts into HTML', 'Interpreting SSL certificates', 'Spoofing DNS IP addresses'],
    correctAnswer: 0,
    explanation: "CSRF tricks an authenticated browser into executing unwanted commands on a trusted web application."
  }
];
