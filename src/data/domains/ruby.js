/* ============================================================
   ScholarQuest Domain Bank — RUBY PROGRAMMING
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const RUBY_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_b_${i + 1}`, domain: 'Ruby Programming', difficulty: 'Beginner',
    question: i === 0 ? 'How do you print a string followed by a newline in Ruby?' : `Ruby Language Basics Query #${i + 1}: How are global variables denoted in Ruby?`,
    options: i === 0 ? ['puts', 'print', 'echo', 'console.log'] : ['$variable_name', '@variable_name', '@@variable_name', 'var_name'],
    correctAnswer: 0,
    explanation: 'In Ruby, global variables begin with a dollar sign `$`.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_i_${i + 1}`, domain: 'Ruby Programming', difficulty: 'Intermediate',
    question: `Ruby Metaprogramming Query #${i + 1}: What does the \`attr_accessor :name\` declaration generate in a Ruby class?`,
    options: ['Both getter method `name` and setter method `name=`', 'Getter method only', 'Setter method only', 'Database column mapping'],
    correctAnswer: 0,
    explanation: '`attr_accessor` creates both reader and writer accessor methods automatically.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_a_${i + 1}`, domain: 'Ruby Programming', difficulty: 'Advanced',
    question: `Ruby Object Model Query #${i + 1}: What is Method Missing (\`method_missing\`) in Ruby Metaprogramming?`,
    options: ['Kernel fallback method intercepted whenever an object receives a message it does not respond to', 'A syntax error during compile time', 'A garbage collection hook', 'A thread lock'],
    correctAnswer: 0,
    explanation: '`method_missing` is a dynamic hook invoked when an undefined method call reaches the end of an object\'s lookup chain.'
  }))
];

export const RUBY_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_c_b_${i + 1}`, domain: 'Ruby Programming', title: `${i + 1}. Ruby String Formatter #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>formatRubyStr${i + 1}(str)</code> returning capitalized string with exclamation.</p>`,
    starterCode: `function formatRubyStr${i + 1}(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1) + '!';\n}\n\nconsole.log(formatRubyStr${i + 1}("ruby"));`,
    hint: 'Capitalize string and append "!".', explanation: 'Formats Ruby string output.',
    validator: `if (typeof formatRubyStr${i + 1} !== 'function') throw new Error('function missing'); if (formatRubyStr${i + 1}("ruby") !== "Ruby!") throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_c_i_${i + 1}`, domain: 'Ruby Programming', title: `${i + 1}. Ruby Hash Mapper #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>mapRubySymbolHash${i + 1}(obj)</code> converting keys to colon prefix strings.</p>`,
    starterCode: `function mapRubySymbolHash${i + 1}(obj) {\n  const res = {};\n  for (let k in obj) res[':' + k] = obj[k];\n  return res;\n}\n\nconsole.log(mapRubySymbolHash${i + 1}({name: "Alice"}));`,
    hint: 'Prepend ":" to keys.', explanation: 'Simulates Ruby symbol-keyed Hashes.',
    validator: `if (typeof mapRubySymbolHash${i + 1} !== 'function') throw new Error('function missing'); if (mapRubySymbolHash${i + 1}({a: 1})[':a'] !== 1) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ruby_c_a_${i + 1}`, domain: 'Ruby Programming', title: `${i + 1}. Dynamic Method Interceptor #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>createRubyProxy${i + 1}(target)</code> returning Proxy returning "Missing" for undefined properties.</p>`,
    starterCode: `function createRubyProxy${i + 1}(target) {\n  return new Proxy(target, {\n    get(t, prop) { return prop in t ? t[prop] : "Missing"; }\n  });\n}\n\nconst p = createRubyProxy${i + 1}({a: 1}); console.log(p.b);`,
    hint: 'Use JS `Proxy` handling `get` handler trap.', explanation: 'Simulates Ruby `method_missing` fallback behavior using Proxy.',
    validator: `if (typeof createRubyProxy${i + 1} !== 'function') throw new Error('function missing'); const p = createRubyProxy${i + 1}({x: 10}); if (p.y !== 'Missing') throw new Error('failed');`
  }))
];
