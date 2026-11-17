export type PackageId = 'latihan' | 'tryout';

export type QuestionSection = 'I' | 'II' | 'III' | 'IV';

export type QuestionType = 'pg' | 'mcma' | 'kategori' | 'isian';

export type TopicCategory =
  | 'Eksponen & Kaidah Pencacahan'
  | 'Permutasi & Kombinasi'
  | 'Peluang Kejadian Sederhana'
  | 'Peluang Kejadian Majemuk';

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  label: string;
}

export interface CategoryStatement {
  id: string;
  text: string;
  correct: 'B' | 'S';
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface Question {
  id: number;
  section: QuestionSection;
  type: QuestionType;
  topic: TopicCategory;
  maxPoints: number;
  stimulus?: string;
  tableData?: TableData;
  prompt: string;
  options?: QuestionOption[];
  correctOption?: 'A' | 'B' | 'C' | 'D' | 'E';
  correctOptions?: ('A' | 'B' | 'C' | 'D' | 'E')[];
  statements?: CategoryStatement[];
  correctInput?: string;
  acceptedInputs?: string[];
  inputPlaceholder?: string;
  solutionSteps: string[];
  finalAnswerLabel: string;
}

export type AnswerValue =
  | string
  | string[]
  | Record<string, 'B' | 'S' | ''>;

export interface StudentIdentity {
  name: string;
  kelas: string;
  absen: string;
  updatedAt: string;
}

export interface LatihanState {
  answers: Record<number, AnswerValue>;
  revealed: Record<number, boolean>;
  currentIndex: number;
  lastUpdated: string;
}

export interface TryoutState {
  answers: Record<number, AnswerValue>;
  flagged: Record<number, boolean>;
  currentIndex: number;
  elapsedSeconds: number;
  submitted: boolean;
  submittedAt?: string;
  startedAt?: string;
}

export interface QuestionEvaluation {
  questionId: number;
  pointsEarned: number;
  maxPoints: number;
  status: 'correct' | 'partial' | 'wrong' | 'unanswered';
  studentAnswerDisplay: string;
  correctAnswerDisplay: string;
}

export interface SectionSummary {
  section: QuestionSection;
  title: string;
  earned: number;
  max: number;
  correctCount: number;
  totalCount: number;
}

export interface TopicSummary {
  topic: TopicCategory;
  earned: number;
  max: number;
  percentage: number;
  questionNumbers: number[];
}

export interface ExamEvaluation {
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  partialCount: number;
  wrongCount: number;
  unansweredCount: number;
  evaluations: Record<number, QuestionEvaluation>;
  sectionSummaries: SectionSummary[];
  topicSummaries: TopicSummary[];
  predicate: string;
  passed: boolean;
}
