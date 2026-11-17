import React, {useMemo, useState} from 'react';
import {
  CheckCircle2,
  Download,
  Printer,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import {
  AnswerValue,
  ExamEvaluation,
  PackageId,
  Question,
  StudentIdentity,
} from '../types/exam';
import {downloadHtmlReport} from '../utils/reportExport';
import {formatDuration} from '../utils/scoring';
import ConfirmModal from './ConfirmModal';
import QuestionCard from './QuestionCard';

interface TryoutAnalysisViewProps {
  packageId: PackageId;
  identity: StudentIdentity;
  questions: Question[];
  answers: Record<number, AnswerValue>;
  evaluation: ExamEvaluation;
  elapsedSeconds?: number;
  onRetake: () => void;
  onBackToPackage?: () => void;
}

type ReviewFilter = 'all' | 'correct' | 'partial' | 'wrong';

export const TryoutAnalysisView: React.FC<TryoutAnalysisViewProps> = ({
  packageId,
  identity,
  questions,
  answers,
  evaluation,
  elapsedSeconds,
  onRetake,
  onBackToPackage,
}) => {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [confirmRetakeOpen, setConfirmRetakeOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (filter === 'all') return questions;
    return questions.filter((q) => {
      const ev = evaluation.evaluations[q.id];
      if (filter === 'wrong') {
        return ev.status === 'wrong' || ev.status === 'unanswered';
      }
      return ev.status === filter;
    });
  }, [filter, questions, evaluation]);

  const weakestTopic = useMemo(() => {
    return [...evaluation.topicSummaries].sort((a, b) => a.percentage - b.percentage)[0];
  }, [evaluation]);

  const packageTitle =
    packageId === 'latihan' ? 'Rekap Paket Latihan Soal' : 'Hasil & Analisis TryOut PSAS';

  return (
    <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Score & Identity Hero */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              SMA Negeri 1 Kersana · Matematika Wajib Kelas XII · {packageTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-slate-100">
              {identity.name || 'Peserta Didik'}
            </h1>
            <div className="text-sm text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>Kelas {identity.kelas || '-'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">No. Absen {identity.absen || '-'}</span>
              {typeof elapsedSeconds === 'number' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Durasi {formatDuration(elapsedSeconds)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Dominant Score Readout */}
          <div className="flex flex-wrap items-center gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Nilai Akhir (Skala 100)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-display font-mono tabular-nums text-blue-700 dark:text-blue-400">
                  {evaluation.totalScore}
                </span>
                <span className="text-base font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  / {evaluation.maxScore}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    evaluation.passed
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                />
                <span>{evaluation.predicate}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono tabular-nums">
                Benar {evaluation.correctCount} · Sebagian {evaluation.partialCount} · Salah{' '}
                {evaluation.wrongCount} · Kosong {evaluation.unansweredCount}
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                downloadHtmlReport({
                  packageId,
                  identity,
                  questions,
                  evaluation,
                  elapsedSeconds,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Laporan Hasil (.html)</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onBackToPackage && (
              <button
                type="button"
                onClick={onBackToPackage}
                className="px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Kembali ke Soal
              </button>
            )}
            <button
              type="button"
              onClick={() => setConfirmRetakeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Kerjakan Ulang</span>
            </button>
          </div>
        </div>
      </section>

      {/* Breakdown per Bentuk Soal & Analisis Materi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section Breakdown */}
        <section className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
            Capaian per Bentuk Soal
          </h2>
          <div className="space-y-4">
            {evaluation.sectionSummaries.map((sec) => {
              const pct = sec.max > 0 ? Math.round((sec.earned / sec.max) * 100) : 0;
              return (
                <div key={sec.section} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {sec.title}
                    </span>
                    <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {sec.earned}/{sec.max} poin ({sec.correctCount}/{sec.totalCount} tepat)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 dark:bg-blue-500 transition-all duration-300"
                      style={{width: `${pct}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Topic Mastery Analysis */}
        <section className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
              Analisis Penguasaan Materi
            </h2>
            <TrendingUp className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {evaluation.topicSummaries.map((tp) => {
              const barColor =
                tp.percentage >= 75
                  ? 'bg-emerald-600 dark:bg-emerald-500'
                  : tp.percentage >= 50
                    ? 'bg-amber-500'
                    : 'bg-rose-600 dark:bg-rose-500';
              return (
                <div key={tp.topic} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {tp.topic}
                    </span>
                    <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {tp.percentage}% ({tp.earned}/{tp.max})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${barColor}`}
                      style={{width: `${tp.percentage}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {weakestTopic && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-100">Rekomendasi Belajar: </strong>
              {weakestTopic.percentage < 75
                ? `Prioritaskan mengulang materi ${weakestTopic.topic} (soal no. ${weakestTopic.questionNumbers.join(
                    ', ',
                  )}) dengan mencermati pembahasan di bawah.`
                : 'Seluruh kompetensi materi telah dikuasai di atas batas ketuntasan (75%). Pertahankan ketelitian perhitungan pecahan dan syarat soal.'}
            </div>
          )}
        </section>
      </div>

      {/* Full Question-by-Question Review & LaTeX Solutions */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">
              Pembahasan Lengkap Soal (No. 1 – 25)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Bandingkan jawaban Anda dengan kunci jawaban dan langkah penyelesaian LaTeX.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            {[
              {id: 'all', label: `Semua (${questions.length})`},
              {id: 'correct', label: `Benar (${evaluation.correctCount})`},
              {id: 'partial', label: `Sebagian (${evaluation.partialCount})`},
              {
                id: 'wrong',
                label: `Salah/Kosong (${evaluation.wrongCount + evaluation.unansweredCount})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as ReviewFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Tidak ada butir soal pada kategori filter ini.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                totalQuestions={questions.length}
                answer={answers[q.id]}
                onChangeAnswer={() => {}}
                mode={packageId}
                isRevealed={true}
                readOnly={true}
              />
            ))}
          </div>
        )}
      </section>

      <ConfirmModal
        open={confirmRetakeOpen}
        title="Kerjakan Ulang Paket Ini?"
        description="Jawaban dan skor yang tersimpan sebelumnya akan diatur ulang sehingga Anda dapat memulai pengerjaan baru."
        confirmLabel="Ya, Mulai Ulang"
        variant="danger"
        onConfirm={() => {
          setConfirmRetakeOpen(false);
          onRetake();
        }}
        onCancel={() => setConfirmRetakeOpen(false)}
      />
    </div>
  );
};

export default TryoutAnalysisView;
