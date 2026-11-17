import React, {useState} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid2x2,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import {AnswerValue, PackageId, Question, QuestionSection, StudentIdentity} from '../types/exam';
import {evaluateQuestion, formatDuration, isQuestionAnswered} from '../utils/scoring';
import ConfirmModal from './ConfirmModal';
import QuestionCard from './QuestionCard';

interface ExamWorkspaceProps {
  mode: PackageId;
  questions: Question[];
  identity: StudentIdentity;
  answers: Record<number, AnswerValue>;
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  onChangeAnswer: (questionId: number, value: AnswerValue) => void;
  // Latihan specific
  revealed?: Record<number, boolean>;
  onRevealQuestion?: (questionId: number) => void;
  onViewLatihanSummary?: () => void;
  // Tryout specific
  flagged?: Record<number, boolean>;
  onToggleFlag?: (questionId: number) => void;
  elapsedSeconds?: number;
  onSubmitTryout?: () => void;
  // Reset
  onResetPackage: () => void;
}

const SECTIONS: {id: QuestionSection; label: string; range: [number, number]}[] = [
  {id: 'I', label: 'I. Pilihan Ganda', range: [1, 10]},
  {id: 'II', label: 'II. MCMA', range: [11, 15]},
  {id: 'III', label: 'III. Kategori B/S', range: [16, 20]},
  {id: 'IV', label: 'IV. Isian Singkat', range: [21, 25]},
];

const TRYOUT_LIMIT_SECONDS = 120 * 60; // 120 menit sesuai jadwal PSAS

export const ExamWorkspace: React.FC<ExamWorkspaceProps> = ({
  mode,
  questions,
  identity,
  answers,
  currentIndex,
  onSelectIndex,
  onChangeAnswer,
  revealed = {},
  onRevealQuestion,
  onViewLatihanSummary,
  flagged = {},
  onToggleFlag,
  elapsedSeconds = 0,
  onSubmitTryout,
  onResetPackage,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const currentQuestion = questions[currentIndex] ?? questions[0];
  const answeredCount = questions.filter((q) => isQuestionAnswered(q, answers[q.id])).length;
  const remainingSeconds = Math.max(0, TRYOUT_LIMIT_SECONDS - elapsedSeconds);
  const isOverTime = mode === 'tryout' && elapsedSeconds >= TRYOUT_LIMIT_SECONDS;

  const handleAnswerChange = (val: AnswerValue) => {
    onChangeAnswer(currentQuestion.id, val);
    // In Latihan mode, PG Tunggal reveals immediately on click
    if (mode === 'latihan' && currentQuestion.type === 'pg' && onRevealQuestion) {
      onRevealQuestion(currentQuestion.id);
    }
  };

  const getNavButtonStyle = (q: Question, idx: number) => {
    const isCurrent = idx === currentIndex;
    const isAnswered = isQuestionAnswered(q, answers[q.id]);
    const isFlagged = mode === 'tryout' && flagged[q.id];

    if (mode === 'latihan' && revealed[q.id]) {
      const ev = evaluateQuestion(q, answers[q.id]);
      if (ev.status === 'correct') {
        return `${
          isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' : ''
        } bg-emerald-600 text-white border-emerald-600`;
      }
      if (ev.status === 'partial') {
        return `${
          isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' : ''
        } bg-amber-500 text-white border-amber-500`;
      }
      return `${
        isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' : ''
      } bg-rose-600 text-white border-rose-600`;
    }

    if (isFlagged) {
      return `${
        isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' : ''
      } bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-400 dark:border-amber-600`;
    }

    if (isAnswered) {
      return `${
        isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900' : ''
      } bg-blue-700 dark:bg-blue-600 text-white border-blue-700 dark:border-blue-600`;
    }

    if (isCurrent) {
      return 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 font-bold';
    }

    return 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800';
  };

  const renderNavigatorContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold font-display text-slate-900 dark:text-slate-100">
            Navigasi Soal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            {answeredCount} / {questions.length} terjawab
          </p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmResetOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ulangi</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-700 dark:bg-blue-500 transition-all duration-200"
          style={{width: `${Math.round((answeredCount / questions.length) * 100)}%`}}
        />
      </div>

      {/* Section Grids */}
      <div className="space-y-4">
        {SECTIONS.map((sec) => {
          const secQuestions = questions.filter(
            (q) => q.id >= sec.range[0] && q.id <= sec.range[1],
          );
          return (
            <div key={sec.id} className="space-y-2">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {sec.label}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {secQuestions.map((q) => {
                  const idx = questions.findIndex((item) => item.id === q.id);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onSelectIndex(idx);
                        setMobileNavOpen(false);
                      }}
                      className={`h-10 rounded-lg border text-xs font-mono font-semibold tabular-nums transition-colors ${getNavButtonStyle(
                        q,
                        idx,
                      )}`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
        {mode === 'latihan' ? (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>Biru: Terjawab</span>
            <span>·</span>
            <span>Hijau: Benar</span>
            <span>·</span>
            <span>Merah: Belum Tepat</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>Biru: Terjawab</span>
            <span>·</span>
            <span>Kuning: Ragu-ragu</span>
            <span>·</span>
            <span>Putih: Kosong</span>
          </div>
        )}
      </div>

      {/* Primary Action */}
      {mode === 'tryout' && onSubmitTryout && (
        <button
          type="button"
          onClick={() => setConfirmSubmitOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Selesai &amp; Kumpulkan TryOut</span>
        </button>
      )}

      {mode === 'latihan' && onViewLatihanSummary && (
        <button
          type="button"
          onClick={onViewLatihanSummary}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <span>Lihat Rekap &amp; Unduh Laporan</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Workspace Context Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {mode === 'latihan'
              ? 'Paket 1 · Mode Latihan Soal (Pembahasan Instan)'
              : 'Paket 2 · Simulasi TryOut PSAS (25 Soal · 120 Menit)'}
          </div>
          <div className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-slate-100">
            {identity.name ? `${identity.name} · ${identity.kelas} · Absen ${identity.absen}` : 'Peserta Belum Mengisi Identitas'}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {mode === 'tryout' && (
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-mono font-semibold tabular-nums ${
                isOverTime
                  ? 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>
                {isOverTime ? 'Waktu Habis (00:00)' : `Sisa ${formatDuration(remainingSeconds)}`}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Grid2x2 className="w-4 h-4" />
            <span className="font-mono tabular-nums">
              No. {currentQuestion.id}/25
            </span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Question */}
        <div className="lg:col-span-8 space-y-4">
          <QuestionCard
            question={currentQuestion}
            totalQuestions={questions.length}
            answer={answers[currentQuestion.id]}
            onChangeAnswer={handleAnswerChange}
            mode={mode}
            isRevealed={mode === 'latihan' ? Boolean(revealed[currentQuestion.id]) : false}
            onRevealLatihan={() => onRevealQuestion?.(currentQuestion.id)}
            isFlagged={Boolean(flagged[currentQuestion.id])}
            onToggleFlag={() => onToggleFlag?.(currentQuestion.id)}
          />

          {/* Bottom Prev / Next Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Soal Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2.5">
              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => onSelectIndex(Math.min(questions.length - 1, currentIndex + 1))}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
                >
                  <span>Soal Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : mode === 'tryout' && onSubmitTryout ? (
                <button
                  type="button"
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Kumpulkan TryOut</span>
                </button>
              ) : (
                onViewLatihanSummary && (
                  <button
                    type="button"
                    onClick={onViewLatihanSummary}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    <span>Lihat Rekap Latihan</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right: Desktop Sticky Navigator */}
        <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          {renderNavigatorContent()}
        </aside>
      </div>

      {/* Mobile Navigator Overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi Nomor Soal"
        >
          <div className="w-full max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Tutup navigasi"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderNavigatorContent()}
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmModal
        open={confirmSubmitOpen}
        title="Kumpulkan Jawaban TryOut PSAS?"
        description={
          answeredCount < questions.length
            ? `Anda baru menjawab ${answeredCount} dari ${questions.length} soal (${
                questions.length - answeredCount
              } soal masih kosong). Setelah dikumpulkan, nilai akhir, analisis materi, dan pembahasan lengkap akan langsung ditampilkan.`
            : `Seluruh ${questions.length} soal telah dijawab. Klik Kumpulkan untuk melihat nilai akhir, analisis materi, dan pembahasan lengkap.`
        }
        confirmLabel="Kumpulkan & Lihat Nilai"
        onConfirm={() => {
          setConfirmSubmitOpen(false);
          onSubmitTryout?.();
        }}
        onCancel={() => setConfirmSubmitOpen(false)}
      />

      <ConfirmModal
        open={confirmResetOpen}
        title={mode === 'latihan' ? 'Ulangi Paket Latihan Soal?' : 'Ulangi Paket TryOut PSAS?'}
        description="Seluruh jawaban dan progres pada paket ini di perangkat Anda akan dihapus sehingga Anda dapat mengerjakan ulang dari awal."
        confirmLabel="Ya, Ulangi dari Awal"
        variant="danger"
        onConfirm={() => {
          setConfirmResetOpen(false);
          onResetPackage();
        }}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
};

export default ExamWorkspace;
