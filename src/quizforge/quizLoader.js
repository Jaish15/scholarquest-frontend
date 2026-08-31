/* ============================================================
   ScholarQuest QuizForge Generic Domain Question Loader
   Parses and normalizes subject-specific domain JSON question banks
   ============================================================ */

const DOMAIN_ALIAS_MAP = {
  "python": "Python",
  "javascript": "JavaScript",
  "js": "JavaScript",
  "uml": "UML",
  "software testing": "Software Testing",
  "softwaretesting": "Software Testing",
  "testing": "Software Testing",
  "advanced java": "Advanced Java",
  "java": "Advanced Java",
  "ruby programming": "Ruby Programming",
  "ruby": "Ruby Programming",
  "machine learning": "Machine Learning",
  "ml": "Machine Learning",
  "deep learning": "Deep Learning",
  "dl": "Deep Learning",
  "cybersecurity": "Cybersecurity"
};

export function normalizeDomainQuestions(jsonObj) {
  if (!jsonObj || !Array.isArray(jsonObj.questions)) return [];

  const rawDomain = String(jsonObj.domain || "").trim();
  const domainKey = rawDomain.toLowerCase();
  const domainName = DOMAIN_ALIAS_MAP[domainKey] || rawDomain || "Python";

  return jsonObj.questions.map((q, idx) => {
    let difficulty = "Beginner";
    const diffStr = String(q.difficulty || "").toLowerCase().trim();
    if (diffStr === "intermediate" || diffStr === "medium") {
      difficulty = "Intermediate";
    } else if (diffStr === "advanced" || diffStr === "hard") {
      difficulty = "Advanced";
    } else {
      difficulty = "Beginner";
    }

    let correctIdx = 0;
    if (typeof q.correctAnswer === "number") {
      correctIdx = q.correctAnswer;
    } else if (typeof q.correctAnswer === "string" && Array.isArray(q.options)) {
      const foundIdx = q.options.findIndex(opt => String(opt).trim() === String(q.correctAnswer).trim());
      correctIdx = foundIdx !== -1 ? foundIdx : 0;
    }

    return {
      id: q.id || `${domainName.toLowerCase().replace(/\s+/g, "_")}_${idx}`,
      domain: domainName,
      difficulty: difficulty,
      question: q.question,
      options: Array.isArray(q.options) ? q.options : [],
      correctAnswer: correctIdx,
      explanation: q.explanation || `Correct answer: ${q.correctAnswer}`
    };
  });
}
