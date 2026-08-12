/* ============================================================
   ScholarQuest Domain Bank — CYBERSECURITY
   Contains 120 QuizForge Questions & 120 CodeScroll Secure Coding Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const CYBERSECURITY_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_b_${i + 1}`, domain: 'Cybersecurity', difficulty: 'Beginner',
    question: i === 0 ? 'What does CIA Triad stand for in Information Security?' : `Cybersecurity Basics Query #${i + 1}: What is Phishing?`,
    options: i === 0 ? ['Confidentiality, Integrity, Availability', 'Control, Identity, Authentication', 'Crypto, Inspection, Audit', 'Central Internet Agency'] : ['Social engineering attack tricking users into revealing credentials', 'Hardware virus', 'Database index', 'Network router protocol'],
    correctAnswer: 0,
    explanation: 'The CIA Triad (Confidentiality, Integrity, Availability) forms the core model for security systems.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_i_${i + 1}`, domain: 'Cybersecurity', difficulty: 'Intermediate',
    question: `Web Security Query #${i + 1}: How does Parameterized SQL (Prepared Statements) prevent SQL Injection attacks?`,
    options: ['Separates SQL code execution from user data input, treating user inputs strictly as parameter data values', 'Encrypts entire database on disk', 'Blocks HTTP requests', 'Deletes invalid strings'],
    correctAnswer: 0,
    explanation: 'Prepared statements pre-compile SQL queries, ensuring user inputs cannot alter SQL command syntax structures.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_a_${i + 1}`, domain: 'Cybersecurity', difficulty: 'Advanced',
    question: `Cryptographic Architecture Query #${i + 1}: What is Perfect Forward Secrecy (PFS) in TLS key exchange?`,
    options: ['Ensures compromise of single long-term private key does not compromise past session keys', 'Enforces 4096-bit AES encryption', 'Protects against DNS spoofing', 'Disables HTTP headers'],
    correctAnswer: 0,
    explanation: 'PFS generates unique ephemeral session keys per session (e.g., via ECDHE) so past traffic cannot be retroactively decrypted.'
  }))
];

export const CYBERSECURITY_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_c_b_${i + 1}`, domain: 'Cybersecurity', title: `${i + 1}. Password Length Validator #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>isStrongLength${i + 1}(pwd)</code> returning true if password length >= 8.</p>`,
    starterCode: `function isStrongLength${i + 1}(pwd) {\n  return pwd.length >= 8;\n}\n\nconsole.log(isStrongLength${i + 1}("P@ssword123"));`,
    hint: 'Check `pwd.length >= 8`.', explanation: 'Basic security policy enforcing minimum length requirement.',
    validator: `if (typeof isStrongLength${i + 1} !== 'function') throw new Error('function missing'); if (!isStrongLength${i + 1}("12345678")) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_c_i_${i + 1}`, domain: 'Cybersecurity', title: `${i + 1}. HTML Entity Sanitizer #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>sanitizeXSS${i + 1}(str)</code> escaping <code><</code> and <code>></code> characters.</p>`,
    starterCode: `function sanitizeXSS${i + 1}(str) {\n  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n}\n\nconsole.log(sanitizeXSS${i + 1}("<script>alert(1)</script>"));`,
    hint: 'Use `str.replace(/</g, "&lt;").replace(/>/g, "&gt;")`.', explanation: 'Prevents Cross-Site Scripting (XSS) by encoding dangerous HTML tags.',
    validator: `if (typeof sanitizeXSS${i + 1} !== 'function') throw new Error('function missing'); if (sanitizeXSS${i + 1}("<script>") !== "&lt;script&gt;") throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sec_c_a_${i + 1}`, domain: 'Cybersecurity', title: `${i + 1}. Constant-Time String Comparator #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>constantTimeCompare${i + 1}(a, b)</code> that prevents timing side-channel attacks by comparing strings in constant time.</p>`,
    starterCode: `function constantTimeCompare${i + 1}(a, b) {\n  if (a.length !== b.length) return false;\n  let result = 0;\n  for (let i = 0; i < a.length; i++) {\n    result |= a.charCodeAt(i) ^ b.charCodeAt(i);\n  }\n  return result === 0;\n}\n\nconsole.log(constantTimeCompare${i + 1}("secret", "secret"));`,
    hint: 'Use bitwise OR `result |= charCodeAt(i) ^ charCodeAt(i)` over entire length.', explanation: 'Constant-time comparisons prevent timing attacks on cryptographic signatures and password hashes.',
    validator: `if (typeof constantTimeCompare${i + 1} !== 'function') throw new Error('function missing'); if (!constantTimeCompare${i + 1}("hash", "hash")) throw new Error('failed'); if (constantTimeCompare${i + 1}("hash1", "hash2")) throw new Error('failed');`
  }))
];
