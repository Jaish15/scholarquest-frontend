/* ============================================================
   ScholarQuest Domain Bank — MACHINE LEARNING
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const ML_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_b_${i + 1}`, domain: 'Machine Learning', difficulty: 'Beginner',
    question: i === 0 ? 'What type of learning uses labeled feature-target pairs?' : `ML Fundamentals Query #${i + 1}: What is K-Means?`,
    options: i === 0 ? ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Transfer Learning'] : ['Unsupervised clustering algorithm', 'Supervised regression', 'Deep neural net', 'Decision tree'],
    correctAnswer: 0,
    explanation: 'K-Means partitions data into K clusters based on distance to cluster centroids.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_i_${i + 1}`, domain: 'Machine Learning', difficulty: 'Intermediate',
    question: `ML Model Evaluation Query #${i + 1}: What does the ROC-AUC score measure?`,
    options: ['Model trade-off performance between True Positive Rate and False Positive Rate across classification thresholds', 'Training speed in seconds', 'Data memory size', 'Loss function minimum'],
    correctAnswer: 0,
    explanation: 'ROC-AUC quantifies classifier capability to distinguish between binary classes across all decision thresholds.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_a_${i + 1}`, domain: 'Machine Learning', difficulty: 'Advanced',
    question: `ML Optimization Query #${i + 1}: What is L1 Regularization (Lasso) vs L2 Regularization (Ridge)?`,
    options: ['L1 adds absolute value penalty leading to sparse weight coefficients; L2 adds squared penalty shrinking weights toward zero', 'L1 increases overfitting', 'L2 creates sparse matrices', 'L1 is for deep learning only'],
    correctAnswer: 0,
    explanation: 'L1 norm penalizes sum of absolute weights driving uninformative feature weights strictly to zero.'
  }))
];

export const ML_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_c_b_${i + 1}`, domain: 'Machine Learning', title: `${i + 1}. Feature Normalizer #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>normalizeVal${i + 1}(val, min, max)</code> returning <code>(val - min) / (max - min)</code>.</p>`,
    starterCode: `function normalizeVal${i + 1}(val, min, max) {\n  return (val - min) / (max - min);\n}\n\nconsole.log(normalizeVal${i + 1}(5, 0, 10));`,
    hint: 'Formula: `(val - min) / (max - min)`.', explanation: 'Min-max scaling standardizes features between 0 and 1.',
    validator: `if (typeof normalizeVal${i + 1} !== 'function') throw new Error('function missing'); if (normalizeVal${i + 1}(5, 0, 10) !== 0.5) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_c_i_${i + 1}`, domain: 'Machine Learning', title: `${i + 1}. Euclidean Distance Calculator #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>euclideanDistance${i + 1}(p1, p2)</code> calculating distance between two 2D points <code>[x, y]</code>.</p>`,
    starterCode: `function euclideanDistance${i + 1}(p1, p2) {\n  const dx = p1[0] - p2[0];\n  const dy = p1[1] - p2[1];\n  return Math.sqrt(dx * dx + dy * dy);\n}\n\nconsole.log(euclideanDistance${i + 1}([0, 0], [3, 4]));`,
    hint: '`Math.sqrt(dx*dx + dy*dy)`.', explanation: 'Calculates straight-line distance in Euclidean space.',
    validator: `if (typeof euclideanDistance${i + 1} !== 'function') throw new Error('function missing'); if (euclideanDistance${i + 1}([0, 0], [3, 4]) !== 5) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `ml_c_a_${i + 1}`, domain: 'Machine Learning', title: `${i + 1}. KNN Nearest Neighbor Classifier #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>findNearest${i + 1}(target, points)</code> returning nearest 2D point from array.</p>`,
    starterCode: `function findNearest${i + 1}(target, points) {\n  let minDist = Infinity, nearest = null;\n  for (let pt of points) {\n    const d = Math.hypot(target[0] - pt[0], target[1] - pt[1]);\n    if (d < minDist) { minDist = d; nearest = pt; }\n  }\n  return nearest;\n}\n\nconsole.log(findNearest${i + 1}([0, 0], [[10, 10], [1, 1]]));`,
    hint: 'Iterate points and compute minimum hypotenuse distance.', explanation: 'Core search logic powering K-Nearest Neighbors classification.',
    validator: `if (typeof findNearest${i + 1} !== 'function') throw new Error('function missing'); const n = findNearest${i + 1}([0, 0], [[10, 10], [1, 1]]); if (n[0] !== 1) throw new Error('failed');`
  }))
];
