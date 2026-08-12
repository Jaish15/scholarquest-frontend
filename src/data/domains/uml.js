/* ============================================================
   ScholarQuest Domain Bank — UML (Unified Modeling Language)
   Contains 120 QuizForge Questions & 120 CodeScroll Modeling Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const UML_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_b_${i + 1}`, domain: 'UML', difficulty: 'Beginner',
    question: i === 0 ? 'Which UML diagram represents static class structure?' : `UML Structural Core Query #${i + 1}: What does a class rectangle in UML contain?`,
    options: i === 0 ? ['Class Diagram', 'Sequence Diagram', 'Use Case Diagram', 'State Diagram'] : ['Class Name, Attributes, and Operations', 'Database tables', 'User stories', 'Compiler output'],
    correctAnswer: 0,
    explanation: 'UML Class Diagrams detail object blueprints including name, properties, and methods.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_i_${i + 1}`, domain: 'UML', difficulty: 'Intermediate',
    question: `UML Design Pattern Relationship #${i + 1}: What is represented by an open hollow diamond symbol on an association line?`,
    options: ['Aggregation (shared lifecycle / weak ownership)', 'Composition', 'Generalization', 'Dependency'],
    correctAnswer: 0,
    explanation: 'An open hollow diamond signifies Aggregation — a part-whole relationship where parts can exist independently.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_a_${i + 1}`, domain: 'UML', difficulty: 'Advanced',
    question: `UML System Architecture Architecture #${i + 1}: In sequence diagrams, what is represented by a dashed arrow pointing back to a lifeline?`,
    options: ['Return message', 'Synchronous call', 'Asynchronous signal', 'Self invocation'],
    correctAnswer: 0,
    explanation: 'Dashed horizontal arrows denote return messages in UML Sequence Diagrams.'
  }))
];

export const UML_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_c_b_${i + 1}`, domain: 'UML', title: `${i + 1}. UML Symbol Matcher #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>getUMLSymbol${i + 1}(type)</code> returning symbol notation string.</p>`,
    starterCode: `function getUMLSymbol${i + 1}(type) {\n  if (type === 'class') return 'Rectangle';\n  return 'Unknown';\n}\n\nconsole.log(getUMLSymbol${i + 1}('class'));`,
    hint: 'Return "Rectangle" for class.', explanation: 'Matches basic UML shape symbols.',
    validator: `if (typeof getUMLSymbol${i + 1} !== 'function') throw new Error('function missing'); if (getUMLSymbol${i + 1}('class') !== 'Rectangle') throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_c_i_${i + 1}`, domain: 'UML', title: `${i + 1}. UML Multiplicity Parser #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>parseMultiplicity${i + 1}(str)</code> returning boolean true if multiplicity string equals "0..*".</p>`,
    starterCode: `function parseMultiplicity${i + 1}(str) {\n  return str === '0..*';\n}\n\nconsole.log(parseMultiplicity${i + 1}('0..*'));`,
    hint: 'Check if `str === "0..*"`.', explanation: 'Parses UML multiplicity constraints.',
    validator: `if (typeof parseMultiplicity${i + 1} !== 'function') throw new Error('function missing'); if (!parseMultiplicity${i + 1}('0..*')) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `uml_c_a_${i + 1}`, domain: 'UML', title: `${i + 1}. Design Pattern UML Mapping #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>mapDesignPattern${i + 1}(pattern)</code> returning "Behavioral" for Observer, "Creational" for Singleton, "Structural" for Adapter.</p>`,
    starterCode: `function mapDesignPattern${i + 1}(pattern) {\n  if (pattern === 'Observer') return 'Behavioral';\n  if (pattern === 'Singleton') return 'Creational';\n  return 'Structural';\n}\n\nconsole.log(mapDesignPattern${i + 1}('Observer'));`,
    hint: 'Map design patterns to GoF categories.', explanation: 'Categorizes software design patterns.',
    validator: `if (typeof mapDesignPattern${i + 1} !== 'function') throw new Error('function missing'); if (mapDesignPattern${i + 1}('Observer') !== 'Behavioral') throw new Error('failed');`
  }))
];
