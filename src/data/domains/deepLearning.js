/* ============================================================
   ScholarQuest Domain Bank — DEEP LEARNING
   Contains 120 QuizForge Questions & 120 CodeScroll Challenges
   Divided into 3 Tiers: Beginner (40), Intermediate (40), Advanced (40)
   ============================================================ */

export const DL_QUIZ_QUESTIONS = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `dl_b_${i + 1}`, domain: 'Deep Learning', difficulty: 'Beginner',
    question: i === 0 ? 'What activation function bounds outputs between 0 and 1?' : `Deep Learning Basics Query #${i + 1}: What is an Artificial Neuron?`,
    options: i === 0 ? ['Sigmoid', 'ReLU', 'Linear', 'Tanh'] : ['Computational unit taking inputs, applying weights, bias, and activation function', 'Hardware CPU core', 'Database row', 'Web socket connector'],
    correctAnswer: 0,
    explanation: 'Sigmoid maps real inputs to (0, 1) range, representing probabilities.'
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, tom => ({
    id: `dl_i_${tom + 1}`, domain: 'Deep Learning', difficulty: 'Intermediate',
    question: `Neural Architecture Query #${tom + 1}: What is the purpose of Convolutional layers in CNNs?`,
    options: ['Extract spatial feature maps using learnable kernel filters across spatial dimensions', 'Normalize text tokens', 'Calculate loss gradients', 'Store memory states'],
    correctAnswer: 0,
    explanation: 'Convolutional filters slide across input matrices to detect edges, textures, and spatial features.'
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, tom => ({
    id: `dl_a_${tom + 1}`, domain: 'Deep Learning', difficulty: 'Advanced',
    question: `Transformer Architecture Query #${tom + 1}: What is the purpose of Scaled Dot-Product Attention in Self-Attention mechanism?`,
    options: ['Calculates similarity scores between Query and Key matrices, scaled by sqrt(d_k) to prevent vanishing gradients in Softmax', 'Replaces matrix multiplication', 'Compresses images', 'Executes gradient descent'],
    correctAnswer: 0,
    explanation: 'Scaling by 1/sqrt(d_k) prevents large dot products from pushing Softmax functions into regions with extremely small gradients.'
  }))
];

export const DL_CODE_CHALLENGES = [
  // Beginner (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `dl_c_b_${i + 1}`, domain: 'Deep Learning', title: `${i + 1}. Sigmoid Function #${i + 1}`, lang: 'JavaScript', difficulty: 'Beginner', xpReward: 30, coinReward: 10,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>sigmoid${i + 1}(z)</code> returning <code>1 / (1 + Math.exp(-z))</code>.</p>`,
    starterCode: `function sigmoid${i + 1}(z) {\n  return 1 / (1 + Math.exp(-z));\n}\n\nconsole.log(sigmoid${i + 1}(0));`,
    hint: 'Use `1 / (1 + Math.exp(-z))`.', explanation: 'Sigmoid activation squashes inputs into (0, 1) probability range.',
    validator: `if (typeof sigmoid${i + 1} !== 'function') throw new Error('function missing'); if (sigmoid${i + 1}(0) !== 0.5) throw new Error('failed');`
  })),
  // Intermediate (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `dl_c_i_${i + 1}`, domain: 'Deep Learning', title: `${i + 1}. Softmax Probability Vector #${i + 1}`, lang: 'JavaScript', difficulty: 'Intermediate', xpReward: 55, coinReward: 20,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>softmax${i + 1}(logits)</code> returning normalized probability distribution array.</p>`,
    starterCode: `function softmax${i + 1}(logits) {\n  const exps = logits.map(x => Math.exp(x));\n  const sum = exps.reduce((a, b) => a + b, 0);\n  return exps.map(x => x / sum);\n}\n\nconsole.log(softmax${i + 1}([1, 2, 3]));`,
    hint: 'Exponentiate logits and divide by sum of exps.', explanation: 'Softmax converts logits into normalized probability distribution summing to 1.',
    validator: `if (typeof softmax${i + 1} !== 'function') throw new Error('function missing'); const p = softmax${i + 1}([0, 0]); if (Math.abs(p[0] - 0.5) > 0.01) throw new Error('failed');`
  })),
  // Advanced (40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `dl_c_a_${i + 1}`, domain: 'Deep Learning', title: `${i + 1}. Forward Dense Layer Computation #${i + 1}`, lang: 'JavaScript', difficulty: 'Advanced', xpReward: 80, coinReward: 35,
    problemStatement: `<h4>Goal:</h4><p>Write function <code>denseForward${i + 1}(inputs, weights, bias)</code> computing <code>sum(inputs[i] * weights[i]) + bias</code>.</p>`,
    starterCode: `function denseForward${i + 1}(inputs, weights, bias) {\n  let sum = bias;\n  for (let i = 0; i < inputs.length; i++) {\n    sum += inputs[i] * weights[i];\n  }\n  return sum;\n}\n\nconsole.log(denseForward${i + 1}([1, 2], [0.5, 0.5], 1));`,
    hint: 'Compute dot product of inputs & weights then add bias.', explanation: 'Core linear step of a dense neural network layer before non-linear activation.',
    validator: `if (typeof denseForward${i + 1} !== 'function') throw new Error('function missing'); if (denseForward${i + 1}([1, 2], [0.5, 0.5], 1) !== 2.5) throw new Error('failed');`
  }))
];
