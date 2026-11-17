import {
  AnswerValue,
  ExamEvaluation,
  Question,
  QuestionEvaluation,
  QuestionSection,
  SectionSummary,
  TopicCategory,
  TopicSummary,
} from '../types/exam';

export const SECTION_TITLES: Record<QuestionSection, string> = {
  I: 'Bagian I · Pilihan Ganda Tunggal',
  II: 'Bagian II · Pilihan Ganda Kompleks (MCMA)',
  III: 'Bagian III · Pilihan Ganda Kategori (Benar/Salah)',
  IV: 'Bagian IV · Isian Singkat',
};

export const TOPIC_ORDER: TopicCategory[] = [
  'Eksponen & Kaidah Pencacahan',
  'Permutasi & Kombinasi',
  'Peluang Kejadian Sederhana',
  'Peluang Kejadian Majemuk',
];

export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota or private-mode errors
  }
}

export function normalizeNumericOrFraction(raw: string): {
  cleaned: string;
  numericValue: number | null;
} {
  let s = raw.trim().toLowerCase();
  // Strip common unit suffixes
  s = s.replace(/\b(siswa|buah|unit|cara|tim|orang|bilangan)\b/g, '').trim();
  // Remove spaces around slash
  s = s.replace(/\s*\/\s*/g, '/');
  // Handle Indonesian thousands separator e.g. 4.500 or 5.000
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, '');
  }
  // Convert Indonesian comma decimal to dot
  if (/^\d+,\d+$/.test(s)) {
    s = s.replace(',', '.');
  }

  let numericValue: number | null = null;
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    numericValue = Number(s);
  } else if (/^-?\d+\/-?\d+$/.test(s)) {
    const [numStr, denStr] = s.split('/');
    const num = Number(numStr);
    const den = Number(denStr);
    if (den !== 0 && !Number.isNaN(num) && !Number.isNaN(den)) {
      numericValue = num / den;
    }
  }

  return {cleaned: s, numericValue};
}

export function isQuestionAnswered(question: Question, answer: AnswerValue | undefined): boolean {
  if (answer === undefined || answer === null) return false;
  if (question.type === 'pg') {
    return typeof answer === 'string' && answer.trim().length > 0;
  }
  if (question.type === 'mcma') {
    return Array.isArray(answer) && answer.length > 0;
  }
  if (question.type === 'kategori') {
    if (typeof answer !== 'object' || Array.isArray(answer)) return false;
    const reqCount = question.statements?.length ?? 3;
    const filled = Object.values(answer).filter((v) => v === 'B' || v === 'S').length;
    return filled === reqCount;
  }
  if (question.type === 'isian') {
    return typeof answer === 'string' && answer.trim().length > 0;
  }
  return false;
}

export function evaluateQuestion(
  question: Question,
  answer: AnswerValue | undefined,
): QuestionEvaluation {
  if (!isQuestionAnswered(question, answer)) {
    return {
      questionId: question.id,
      pointsEarned: 0,
      maxPoints: question.maxPoints,
      status: 'unanswered',
      studentAnswerDisplay: 'Tidak dijawab',
      correctAnswerDisplay: getCorrectAnswerPlain(question),
    };
  }

  if (question.type === 'pg') {
    const chosen = String(answer);
    const isCorrect = chosen === question.correctOption;
    return {
      questionId: question.id,
      pointsEarned: isCorrect ? question.maxPoints : 0,
      maxPoints: question.maxPoints,
      status: isCorrect ? 'correct' : 'wrong',
      studentAnswerDisplay: chosen,
      correctAnswerDisplay: question.correctOption ?? '-',
    };
  }

  if (question.type === 'mcma') {
    const chosenArr = Array.isArray(answer) ? [...answer].sort() : [];
    const correctArr = [...(question.correctOptions ?? [])].sort();
    const correctSet = new Set(correctArr);

    const allChosenAreValid = chosenArr.every((c) => correctSet.has(c as 'A' | 'B' | 'C' | 'D' | 'E'));
    const exactMatch =
      chosenArr.length === correctArr.length &&
      chosenArr.every((val, idx) => val === correctArr[idx]);

    let pointsEarned = 0;
    let status: QuestionEvaluation['status'] = 'wrong';
    if (exactMatch) {
      pointsEarned = question.maxPoints;
      status = 'correct';
    } else if (allChosenAreValid && chosenArr.length > 0) {
      pointsEarned = Math.max(1, Math.round((question.maxPoints * chosenArr.length) / correctArr.length));
      status = 'partial';
    }

    return {
      questionId: question.id,
      pointsEarned,
      maxPoints: question.maxPoints,
      status,
      studentAnswerDisplay: chosenArr.join(', '),
      correctAnswerDisplay: correctArr.join(', '),
    };
  }

  if (question.type === 'kategori') {
    const record = (typeof answer === 'object' && !Array.isArray(answer) ? answer : {}) as Record<
      string,
      'B' | 'S' | ''
    >;
    const statements = question.statements ?? [];
    let matched = 0;
    const studentParts: string[] = [];
    const correctParts: string[] = [];

    statements.forEach((st) => {
      const val = record[st.id] || '-';
      studentParts.push(val);
      correctParts.push(st.correct);
      if (val === st.correct) matched += 1;
    });

    const pointsPerStatement = question.maxPoints / Math.max(1, statements.length);
    const pointsEarned = Math.round(matched * pointsPerStatement);
    let status: QuestionEvaluation['status'] = 'wrong';
    if (matched === statements.length) status = 'correct';
    else if (matched > 0) status = 'partial';

    return {
      questionId: question.id,
      pointsEarned,
      maxPoints: question.maxPoints,
      status,
      studentAnswerDisplay: studentParts.join('-'),
      correctAnswerDisplay: correctParts.join('-'),
    };
  }

  // Isian singkat
  const rawInput = String(answer).trim();
  const {cleaned, numericValue} = normalizeNumericOrFraction(rawInput);
  const target = normalizeNumericOrFraction(question.correctInput ?? '');

  const exactAccepted = (question.acceptedInputs ?? [question.correctInput ?? '']).some(
    (acc) => normalizeNumericOrFraction(acc).cleaned === cleaned,
  );
  const numericAccepted =
    numericValue !== null &&
    target.numericValue !== null &&
    Math.abs(numericValue - target.numericValue) < 1e-9;

  const isCorrect = exactAccepted || numericAccepted;

  return {
    questionId: question.id,
    pointsEarned: isCorrect ? question.maxPoints : 0,
    maxPoints: question.maxPoints,
    status: isCorrect ? 'correct' : 'wrong',
    studentAnswerDisplay: rawInput,
    correctAnswerDisplay: question.correctInput ?? '-',
  };
}

function getCorrectAnswerPlain(question: Question): string {
  if (question.type === 'pg') return question.correctOption ?? '-';
  if (question.type === 'mcma') return (question.correctOptions ?? []).join(', ');
  if (question.type === 'kategori') {
    return (question.statements ?? []).map((s) => s.correct).join('-');
  }
  return question.correctInput ?? '-';
}

export function evaluateExam(
  questions: Question[],
  answers: Record<number, AnswerValue>,
): ExamEvaluation {
  const evaluations: Record<number, QuestionEvaluation> = {};
  let totalScore = 0;
  let maxScore = 0;
  let correctCount = 0;
  let partialCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const sectionMap = new Map<
    QuestionSection,
    {earned: number; max: number; correctCount: number; totalCount: number}
  >();
  (['I', 'II', 'III', 'IV'] as QuestionSection[]).forEach((sec) => {
    sectionMap.set(sec, {earned: 0, max: 0, correctCount: 0, totalCount: 0});
  });

  const topicMap = new Map<
    TopicCategory,
    {earned: number; max: number; questionNumbers: number[]}
  >();
  TOPIC_ORDER.forEach((topic) => {
    topicMap.set(topic, {earned: 0, max: 0, questionNumbers: []});
  });

  questions.forEach((q) => {
    const ev = evaluateQuestion(q, answers[q.id]);
    evaluations[q.id] = ev;

    totalScore += ev.pointsEarned;
    maxScore += ev.maxPoints;

    if (ev.status === 'correct') correctCount += 1;
    else if (ev.status === 'partial') partialCount += 1;
    else if (ev.status === 'wrong') wrongCount += 1;
    else unansweredCount += 1;

    const secEntry = sectionMap.get(q.section)!;
    secEntry.earned += ev.pointsEarned;
    secEntry.max += ev.maxPoints;
    secEntry.totalCount += 1;
    if (ev.status === 'correct') secEntry.correctCount += 1;

    const topicEntry = topicMap.get(q.topic)!;
    topicEntry.earned += ev.pointsEarned;
    topicEntry.max += ev.maxPoints;
    topicEntry.questionNumbers.push(q.id);
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let predicate = 'Perlu Bimbingan Intensif';
  if (percentage >= 90) predicate = 'Sangat Baik (Istimewa)';
  else if (percentage >= 80) predicate = 'Baik (Tuntas Optimal)';
  else if (percentage >= 75) predicate = 'Cukup Baik (Tuntas KKTP)';
  else if (percentage >= 60) predicate = 'Cukup (Perlu Latihan Lanjutan)';

  const sectionSummaries: SectionSummary[] = (['I', 'II', 'III', 'IV'] as QuestionSection[]).map(
    (section) => {
      const data = sectionMap.get(section)!;
      return {
        section,
        title: SECTION_TITLES[section],
        earned: data.earned,
        max: data.max,
        correctCount: data.correctCount,
        totalCount: data.totalCount,
      };
    },
  );

  const topicSummaries: TopicSummary[] = TOPIC_ORDER.map((topic) => {
    const data = topicMap.get(topic)!;
    return {
      topic,
      earned: data.earned,
      max: data.max,
      percentage: data.max > 0 ? Math.round((data.earned / data.max) * 100) : 0,
      questionNumbers: data.questionNumbers,
    };
  });

  return {
    totalScore,
    maxScore,
    percentage,
    correctCount,
    partialCount,
    wrongCount,
    unansweredCount,
    evaluations,
    sectionSummaries,
    topicSummaries,
    predicate,
    passed: percentage >= 75,
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
