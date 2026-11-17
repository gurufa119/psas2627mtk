import React from 'react';
import {ExamEvaluation, PackageId, Question, StudentIdentity} from '../types/exam';
import {formatDuration} from '../utils/scoring';

interface PrintableReportProps {
  packageId: PackageId;
  identity: StudentIdentity;
  questions: Question[];
  evaluation: ExamEvaluation;
  elapsedSeconds?: number;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  packageId,
  identity,
  questions,
  evaluation,
  elapsedSeconds,
}) => {
  const packageLabel =
    packageId === 'latihan' ? 'Paket Latihan Soal PSAS' : 'Paket TryOut PSAS';

  return (
    <div className="hidden print:block text-slate-900 bg-white space-y-6">
      <div className="border-b-2 border-slate-900 pb-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
          SMA Negeri 1 Kersana · Kabupaten Brebes
        </div>
        <h1 className="text-xl font-bold mt-1">Laporan Hasil {packageLabel}</h1>
        <div className="text-xs text-slate-600">
          Mata Pelajaran: Matematika Wajib Kelas XII · Dicetak{' '}
          {new Date().toLocaleDateString('id-ID', {dateStyle: 'long'})}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="border border-slate-300 rounded p-3 space-y-1">
          <div className="text-xs font-bold uppercase text-slate-500">Identitas Siswa</div>
          <div>Nama: <strong>{identity.name || '-'}</strong></div>
          <div>Kelas: <strong>{identity.kelas || '-'}</strong></div>
          <div>No. Absen: <strong>{identity.absen || '-'}</strong></div>
          {typeof elapsedSeconds === 'number' && (
            <div>Durasi: <strong>{formatDuration(elapsedSeconds)}</strong></div>
          )}
        </div>
        <div className="border border-slate-300 rounded p-3 space-y-1">
          <div className="text-xs font-bold uppercase text-slate-500">Hasil Penilaian</div>
          <div className="text-2xl font-bold">
            {evaluation.totalScore} / {evaluation.maxScore}
          </div>
          <div>Predikat: <strong>{evaluation.predicate}</strong></div>
          <div className="text-xs text-slate-600">
            Benar: {evaluation.correctCount} · Sebagian: {evaluation.partialCount} · Salah:{' '}
            {evaluation.wrongCount} · Kosong: {evaluation.unansweredCount}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold mb-2">Analisis Penguasaan Materi</h2>
        <table className="w-full text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-1.5 text-left">Topik Materi</th>
              <th className="border border-slate-300 px-2 py-1.5 text-center">Nomor Soal</th>
              <th className="border border-slate-300 px-2 py-1.5 text-right">Capaian</th>
            </tr>
          </thead>
          <tbody>
            {evaluation.topicSummaries.map((tp) => (
              <tr key={tp.topic}>
                <td className="border border-slate-300 px-2 py-1.5">{tp.topic}</td>
                <td className="border border-slate-300 px-2 py-1.5 text-center font-mono">
                  {tp.questionNumbers.join(', ')}
                </td>
                <td className="border border-slate-300 px-2 py-1.5 text-right font-mono">
                  {tp.earned}/{tp.max} ({tp.percentage}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-sm font-bold mb-2">Rekap Jawaban per Butir Soal</h2>
        <table className="w-full text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-1 text-center">No</th>
              <th className="border border-slate-300 px-2 py-1 text-left">Bagian &amp; Topik</th>
              <th className="border border-slate-300 px-2 py-1 text-center">Jawaban</th>
              <th className="border border-slate-300 px-2 py-1 text-center">Kunci</th>
              <th className="border border-slate-300 px-2 py-1 text-center">Status</th>
              <th className="border border-slate-300 px-2 py-1 text-right">Poin</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => {
              const ev = evaluation.evaluations[q.id];
              return (
                <tr key={q.id}>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">{q.id}</td>
                  <td className="border border-slate-300 px-2 py-1">
                    Bagian {q.section} · {q.topic}
                  </td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">
                    {ev.studentAnswerDisplay}
                  </td>
                  <td className="border border-slate-300 px-2 py-1 text-center font-mono">
                    {ev.correctAnswerDisplay}
                  </td>
                  <td className="border border-slate-300 px-2 py-1 text-center">
                    {ev.status === 'correct'
                      ? 'Benar'
                      : ev.status === 'partial'
                        ? 'Sebagian'
                        : ev.status === 'wrong'
                          ? 'Salah'
                          : 'Kosong'}
                  </td>
                  <td className="border border-slate-300 px-2 py-1 text-right font-mono">
                    {ev.pointsEarned}/{ev.maxPoints}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintableReport;
