import React from 'react';
import {AlertCircle, CheckCircle2, XCircle} from 'lucide-react';
import {AnswerValue, Question} from '../types/exam';
import {evaluateQuestion, isQuestionAnswered, SECTION_TITLES} from '../utils/scoring';
import MathText from './MathText';

interface QuestionCardProps {
  question: Question;
  totalQuestions: number;
  answer: AnswerValue | undefined;
  onChangeAnswer: (next: AnswerValue) => void;
  mode: 'latihan' | 'tryout';
  isRevealed: boolean;
  onRevealLatihan?: () => void;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  readOnly?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  totalQuestions,
  answer,
  onChangeAnswer,
  mode,
  isRevealed,
  onRevealLatihan,
  isFlagged = false,
  onToggleFlag,
  readOnly = false,
}) => {
  const answered = isQuestionAnswered(question, answer);
  const evaluation = isRevealed ? evaluateQuestion(question, answer) : null;

  const handlePgSelect = (key: string) => {
    if (readOnly) return;
    onChangeAnswer(key);
  };

  const handleMcmaToggle = (key: string) => {
    if (readOnly) return;
    const current = Array.isArray(answer) ? answer : [];
    const exists = current.includes(key);
    const next = exists ? current.filter((item) => item !== key) : [...current, key];
    onChangeAnswer(next);
  };

  const handleCategorySelect = (statementId: string, val: 'B' | 'S') => {
    if (readOnly) return;
    const current =
      typeof answer === 'object' && !Array.isArray(answer) && answer !== null
        ? (answer as Record<string, 'B' | 'S' | ''>)
        : {};
    onChangeAnswer({
      ...current,
      [statementId]: val,
    });
  };

  const handleIsianChange = (val: string) => {
    if (readOnly) return;
    onChangeAnswer(val);
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-7 space-y-6">
      {/* Unboxed quiet metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
            Soal {String(question.id).padStart(2, '0')} / {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span>{SECTION_TITLES[question.section]}</span>
          <span aria-hidden="true">·</span>
          <span>{question.topic}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{question.maxPoints} poin</span>
        </div>

        {mode === 'tryout' && !readOnly && onToggleFlag && (
          <button
            type="button"
            onClick={onToggleFlag}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isFlagged
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isFlagged ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}
          </button>
        )}
      </div>

      {/* Stimulus Text (e.g. Survey Reading Passage) */}
      {question.stimulus && (
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          <MathText text={question.stimulus} />
        </div>
      )}

      {/* Contingency Table (e.g. No. 20) */}
      {question.tableData && (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100">
                {question.tableData.headers.map((header, idx) => (
                  <th
                    key={header}
                    className={`px-4 py-2.5 font-semibold border-b border-slate-200 dark:border-slate-700 ${
                      idx > 0 ? 'text-center' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {question.tableData.rows.map((row, rIdx) => {
                const isTotalRow = rIdx === question.tableData!.rows.length - 1;
                return (
                  <tr
                    key={rIdx}
                    className={
                      isTotalRow
                        ? 'bg-slate-50 dark:bg-slate-800/40 font-semibold text-slate-900 dark:text-slate-100'
                        : 'text-slate-700 dark:text-slate-300'
                    }
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-2.5 ${
                          cIdx > 0 ? 'text-center font-mono tabular-nums' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Main Prompt */}
      <div className="text-base sm:text-[17px] text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
        <MathText text={question.prompt} />
      </div>

      {/* Answer Type I: PG Tunggal */}
      {question.type === 'pg' && question.options && (
        <div className="space-y-2.5" role="radiogroup" aria-label={`Pilihan soal ${question.id}`}>
          {question.options.map((opt) => {
            const isSelected = answer === opt.key;
            const isCorrectOpt = question.correctOption === opt.key;

            let optionClasses =
              'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/60';
            if (isRevealed) {
              if (isCorrectOpt) {
                optionClasses =
                  'border-emerald-500 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40';
              } else if (isSelected && !isCorrectOpt) {
                optionClasses =
                  'border-rose-500 dark:border-rose-500 bg-rose-50/70 dark:bg-rose-950/40';
              }
            } else if (isSelected) {
              optionClasses =
                'border-blue-700 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 ring-1 ring-blue-700 dark:ring-blue-500';
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={readOnly}
                onClick={() => handlePgSelect(opt.key)}
                className={`w-full min-h-[48px] text-left px-4 py-3 rounded-lg border transition-colors flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${optionClasses} ${
                  readOnly ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-md font-mono text-xs font-semibold shrink-0 border ${
                    isSelected
                      ? 'bg-blue-700 dark:bg-blue-600 text-white border-blue-700 dark:border-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed flex-1 pt-0.5">
                  <MathText text={opt.label} />
                </span>
                {isRevealed && isCorrectOpt && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 pt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kunci</span>
                  </span>
                )}
                {isRevealed && isSelected && !isCorrectOpt && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400 shrink-0 pt-1">
                    <XCircle className="w-4 h-4" />
                    <span>Pilihanmu</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Answer Type II: MCMA (Multiple Answers) */}
      {question.type === 'mcma' && question.options && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Petunjuk: Centang seluruh pernyataan yang benar (pilihan jawaban benar lebih dari satu).
          </p>
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const selectedArr = Array.isArray(answer) ? answer : [];
              const isSelected = selectedArr.includes(opt.key);
              const isCorrectOpt = question.correctOptions?.includes(opt.key) ?? false;

              let rowClasses =
                'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600';
              if (isRevealed) {
                if (isCorrectOpt) {
                  rowClasses =
                    'border-emerald-500 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40';
                } else if (isSelected && !isCorrectOpt) {
                  rowClasses =
                    'border-rose-500 dark:border-rose-500 bg-rose-50/70 dark:bg-rose-950/40';
                }
              } else if (isSelected) {
                rowClasses =
                  'border-blue-700 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 ring-1 ring-blue-700 dark:ring-blue-500';
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={readOnly}
                  onClick={() => handleMcmaToggle(opt.key)}
                  className={`w-full min-h-[48px] text-left px-4 py-3 rounded-lg border transition-colors flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${rowClasses} ${
                    readOnly ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded border text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-blue-700 dark:bg-blue-600 border-blue-700 dark:border-blue-600 text-white'
                        : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-600 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1 shrink-0">
                    {opt.key}.
                  </span>
                  <span className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed flex-1 pt-0.5">
                    <MathText text={opt.label} />
                  </span>
                  {isRevealed && isCorrectOpt && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 pt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Benar</span>
                    </span>
                  )}
                  {isRevealed && isSelected && !isCorrectOpt && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400 shrink-0 pt-1">
                      <XCircle className="w-4 h-4" />
                      <span>Keliru</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Answer Type III: Kategori Benar / Salah */}
      {question.type === 'kategori' && question.statements && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Petunjuk: Pilih Benar (B) atau Salah (S) pada setiap pernyataan di bawah ini.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100">
                  <th className="px-4 py-3 font-semibold border-b border-slate-200 dark:border-slate-700">
                    Pernyataan
                  </th>
                  <th className="px-3 py-3 font-semibold text-center border-b border-slate-200 dark:border-slate-700 w-24">
                    Benar
                  </th>
                  <th className="px-3 py-3 font-semibold text-center border-b border-slate-200 dark:border-slate-700 w-24">
                    Salah
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {question.statements.map((st) => {
                  const record =
                    typeof answer === 'object' && !Array.isArray(answer) && answer !== null
                      ? (answer as Record<string, 'B' | 'S' | ''>)
                      : {};
                  const currentVal = record[st.id] || '';
                  return (
                    <tr
                      key={st.id}
                      className="bg-white dark:bg-slate-900 hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-3.5 text-slate-800 dark:text-slate-100 leading-relaxed">
                        <MathText text={st.text} />
                        {isRevealed && (
                          <div className="mt-1.5 text-xs font-medium">
                            {currentVal === st.correct ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Tepat (Kunci: {st.correct === 'B' ? 'Benar' : 'Salah'})</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-400">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>
                                  Kurang tepat (Kunci: {st.correct === 'B' ? 'Benar' : 'Salah'})
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      {(['B', 'S'] as const).map((choice) => {
                        const checked = currentVal === choice;
                        const isKey = st.correct === choice;
                        return (
                          <td key={choice} className="px-3 py-3 text-center align-middle">
                            <button
                              type="button"
                              disabled={readOnly}
                              aria-label={`${st.text} - ${choice === 'B' ? 'Benar' : 'Salah'}`}
                              onClick={() => handleCategorySelect(st.id, choice)}
                              className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-lg border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                                checked
                                  ? isRevealed && !isKey
                                    ? 'bg-rose-600 border-rose-600 text-white'
                                    : isRevealed && isKey
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'bg-blue-700 dark:bg-blue-600 border-blue-700 dark:border-blue-600 text-white'
                                  : isRevealed && isKey
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {choice === 'B' ? 'Benar' : 'Salah'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Answer Type IV: Isian Singkat */}
      {question.type === 'isian' && (
        <div className="space-y-2.5">
          <label
            htmlFor={`isian-${question.id}`}
            className="block text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            Ketik jawaban akhir Anda (angka bulat atau pecahan sederhana seperti a/b):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id={`isian-${question.id}`}
              type="text"
              disabled={readOnly}
              value={typeof answer === 'string' ? answer : ''}
              onChange={(e) => handleIsianChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && mode === 'latihan' && !isRevealed && answered && onRevealLatihan) {
                  onRevealLatihan();
                }
              }}
              placeholder={question.inputPlaceholder || 'Masukkan jawaban...'}
              className="flex-1 min-h-[48px] px-4 py-2.5 text-base font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>
        </div>
      )}

      {/* Latihan Mode: Periksa Jawaban Button (for MCMA, Kategori, Isian when not yet revealed) */}
      {mode === 'latihan' && !isRevealed && question.type !== 'pg' && onRevealLatihan && (
        <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {answered
              ? 'Jawaban siap diperiksa.'
              : 'Lengkapi jawaban terlebih dahulu untuk melihat pembahasan.'}
          </p>
          <button
            type="button"
            disabled={!answered}
            onClick={onRevealLatihan}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            Periksa Jawaban &amp; Lihat Pembahasan
          </button>
        </div>
      )}

      {/* Pembahasan Panel (Revealed instantly in Latihan or after submit in TryOut) */}
      {isRevealed && evaluation && (
        <div className="mt-4 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {evaluation.status === 'correct' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Jawaban Benar</span>
                </span>
              )}
              {evaluation.status === 'partial' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Sebagian Benar</span>
                </span>
              )}
              {(evaluation.status === 'wrong' || evaluation.status === 'unanswered') && (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-5 h-5" />
                  <span>
                    {evaluation.status === 'unanswered' ? 'Tidak Dijawab' : 'Jawaban Belum Tepat'}
                  </span>
                </span>
              )}
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>
                Skor:{' '}
                <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  {evaluation.pointsEarned}/{evaluation.maxPoints}
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Kunci:{' '}
                <strong className="text-slate-900 dark:text-slate-100">
                  <MathText text={question.finalAnswerLabel} />
                </strong>
              </span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-5 space-y-2.5">
            <h3 className="text-sm font-bold font-display text-slate-900 dark:text-slate-100">
              Pembahasan Langkah demi Langkah
            </h3>
            <div className="space-y-2 text-sm sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {question.solutionSteps.map((step, idx) => (
                <div key={idx}>
                  <MathText text={step} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default QuestionCard;
