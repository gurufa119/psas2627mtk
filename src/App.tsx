import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Download,
  FileText,
  Printer,
} from 'lucide-react';
import ExamWorkspace from './components/ExamWorkspace';
import Header, {ActiveRoute} from './components/Header';
import IdentityForm from './components/IdentityForm';
import KisiKisiView from './components/KisiKisiView';
import PrintableReport from './components/PrintableReport';
import TryoutAnalysisView from './components/TryoutAnalysisView';
import {paketLatihan} from './data/paketLatihan';
import {paketTryout} from './data/paketTryout';
import {
  AnswerValue,
  LatihanState,
  PackageId,
  StudentIdentity,
  TryoutState,
} from './types/exam';
import {downloadHtmlReport} from './utils/reportExport';
import {
  evaluateExam,
  formatDuration,
  isQuestionAnswered,
  safeGetStorage,
  safeSetStorage,
} from './utils/scoring';

const STORAGE_KEYS = {
  theme: 'psas_smansaker_theme',
  identity: 'psas_smansaker_identity',
  latihan: 'psas_smansaker_latihan',
  tryout: 'psas_smansaker_tryout',
};

const DEFAULT_IDENTITY: StudentIdentity = {
  name: '',
  kelas: 'XII-1',
  absen: '',
  updatedAt: '',
};

const DEFAULT_LATIHAN: LatihanState = {
  answers: {},
  revealed: {},
  currentIndex: 0,
  lastUpdated: '',
};

const DEFAULT_TRYOUT: TryoutState = {
  answers: {},
  flagged: {},
  currentIndex: 0,
  elapsedSeconds: 0,
  submitted: false,
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [activeRoute, setActiveRoute] = useState<ActiveRoute>('home');
  const [showLatihanSummary, setShowLatihanSummary] = useState(false);
  const [identityWarning, setIdentityWarning] = useState(false);
  const [activePrintPackage, setActivePrintPackage] = useState<PackageId>('tryout');

  const identitySectionRef = useRef<HTMLDivElement | null>(null);

  const [identity, setIdentity] = useState<StudentIdentity>(() =>
    safeGetStorage<StudentIdentity>(STORAGE_KEYS.identity, DEFAULT_IDENTITY),
  );

  const [latihanState, setLatihanState] = useState<LatihanState>(() =>
    safeGetStorage<LatihanState>(STORAGE_KEYS.latihan, DEFAULT_LATIHAN),
  );

  const [tryoutState, setTryoutState] = useState<TryoutState>(() =>
    safeGetStorage<TryoutState>(STORAGE_KEYS.tryout, DEFAULT_TRYOUT),
  );

  // Sync dark mode class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [isDark]);

  // Persist identity & package states
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.identity, identity);
  }, [identity]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.latihan, latihanState);
  }, [latihanState]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.tryout, tryoutState);
  }, [tryoutState]);

  // TryOut timer: runs only while user is actively taking TryOut before submission
  useEffect(() => {
    if (activeRoute !== 'tryout' || tryoutState.submitted) return;
    const timer = window.setInterval(() => {
      setTryoutState((prev) => {
        if (prev.submitted) return prev;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
          startedAt: prev.startedAt || new Date().toISOString(),
        };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeRoute, tryoutState.submitted]);

  const hasValidIdentity =
    identity.name.trim().length > 0 &&
    identity.kelas.trim().length > 0 &&
    identity.absen.trim().length > 0;

  const latihanEvaluation = useMemo(
    () => evaluateExam(paketLatihan, latihanState.answers),
    [latihanState.answers],
  );

  const tryoutEvaluation = useMemo(
    () => evaluateExam(paketTryout, tryoutState.answers),
    [tryoutState.answers],
  );

  const latihanAnsweredCount = useMemo(
    () => paketLatihan.filter((q) => isQuestionAnswered(q, latihanState.answers[q.id])).length,
    [latihanState.answers],
  );

  const tryoutAnsweredCount = useMemo(
    () => paketTryout.filter((q) => isQuestionAnswered(q, tryoutState.answers[q.id])).length,
    [tryoutState.answers],
  );

  const handleOpenPackage = (pkg: 'latihan' | 'tryout') => {
    if (!hasValidIdentity) {
      setIdentityWarning(true);
      setActiveRoute('home');
      window.setTimeout(() => {
        identitySectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
      }, 60);
      return;
    }
    setIdentityWarning(false);
    if (pkg === 'latihan') {
      setShowLatihanSummary(false);
      setActivePrintPackage('latihan');
    } else {
      setActivePrintPackage('tryout');
    }
    setActiveRoute(pkg);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleNavigate = (route: ActiveRoute) => {
    if ((route === 'latihan' || route === 'tryout') && !hasValidIdentity) {
      handleOpenPackage(route);
      return;
    }
    if (route === 'latihan') {
      setShowLatihanSummary(false);
      setActivePrintPackage('latihan');
    }
    if (route === 'tryout') {
      setActivePrintPackage('tryout');
    }
    setActiveRoute(route);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleSaveIdentity = (next: StudentIdentity) => {
    setIdentity(next);
    setIdentityWarning(false);
  };

  // Latihan handlers
  const handleLatihanAnswer = (questionId: number, value: AnswerValue) => {
    setLatihanState((prev) => ({
      ...prev,
      answers: {...prev.answers, [questionId]: value},
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleLatihanReveal = (questionId: number) => {
    setLatihanState((prev) => ({
      ...prev,
      revealed: {...prev.revealed, [questionId]: true},
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleResetLatihan = () => {
    setLatihanState(DEFAULT_LATIHAN);
    setShowLatihanSummary(false);
  };

  // TryOut handlers
  const handleTryoutAnswer = (questionId: number, value: AnswerValue) => {
    setTryoutState((prev) => ({
      ...prev,
      answers: {...prev.answers, [questionId]: value},
      startedAt: prev.startedAt || new Date().toISOString(),
    }));
  };

  const handleTryoutFlag = (questionId: number) => {
    setTryoutState((prev) => ({
      ...prev,
      flagged: {...prev.flagged, [questionId]: !prev.flagged[questionId]},
    }));
  };

  const handleSubmitTryout = () => {
    setTryoutState((prev) => ({
      ...prev,
      submitted: true,
      submittedAt: new Date().toISOString(),
    }));
    setActivePrintPackage('tryout');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleResetTryout = () => {
    setTryoutState(DEFAULT_TRYOUT);
  };

  const handlePrintPackage = (pkg: PackageId) => {
    setActivePrintPackage(pkg);
    window.setTimeout(() => {
      window.print();
    }, 60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="no-print flex-1">
        {/* =============================================================== */}
        {/* HOME / DASHBOARD VIEW                                           */}
        {/* =============================================================== */}
        {activeRoute === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
            {/* Hero Section */}
            <section className="space-y-4 max-w-3xl">
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                SMA Negeri 1 Kersana · Matematika Wajib Kelas XII · Semester Gasal
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-display tracking-tight text-slate-900 dark:text-slate-100 leading-tight [text-wrap:balance]">
                Latihan Soal PSAS Matematika SMA Kelas XII
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Persiapkan Penilaian Sumatif Akhir Semester (PSAS) dengan dua paket soal terstruktur
                sesuai kisi-kisi resmi: Paket Latihan dengan pembahasan LaTeX langsung dan Paket
                TryOut dengan penilaian otomatis serta analisis materi.
              </p>
            </section>

            {/* Student Identity Card */}
            <section ref={identitySectionRef} className="space-y-3">
              {identityWarning && (
                <div
                  role="alert"
                  className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 rounded-xl px-4 py-3 text-sm font-medium text-amber-900 dark:text-amber-200"
                >
                  Silakan lengkapi Nama Lengkap, Kelas, dan Nomor Absen di bawah ini terlebih dahulu
                  sebelum memulai paket soal.
                </div>
              )}
              <IdentityForm identity={identity} onSave={handleSaveIdentity} />
            </section>

            {/* 2 Packages Selection Grid */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
                  Pilih Paket Pengerjaan
                </h2>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Progres tersimpan otomatis di perangkat Anda
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Paket 1: Latihan Soal */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                        Paket 1 · Mode Belajar Mandiri
                      </span>
                      <BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">
                      Paket Latihan Soal
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Setiap butir soal yang dijawab langsung menampilkan status ketepatan beserta
                      pembahasan langkah demi langkah. Cocok untuk memahami konsep dan strategi
                      penyelesaian soal PSAS.
                    </p>
                    <div className="pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                      <span className="font-mono tabular-nums">25 soal</span>
                      <span aria-hidden="true">·</span>
                      <span>Tanpa batas waktu</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200 font-medium">
                        Progres: {latihanAnsweredCount}/25 terjawab
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenPackage('latihan')}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
                    >
                      <span>
                        {latihanAnsweredCount > 0 ? 'Lanjutkan Latihan' : 'Mulai Paket Latihan'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {latihanAnsweredCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (!hasValidIdentity) {
                            handleOpenPackage('latihan');
                            return;
                          }
                          setShowLatihanSummary(true);
                          setActivePrintPackage('latihan');
                          setActiveRoute('latihan');
                        }}
                        className="min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        Rekap Latihan
                      </button>
                    )}
                  </div>
                </div>

                {/* Paket 2: TryOut PSAS */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        Paket 2 · Simulasi Ujian Resmi
                      </span>
                      <ClipboardCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">
                      Paket TryOut PSAS
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Kerjakan seluruh 25 butir soal terlebih dahulu dengan pengatur waktu 120
                      menit. Setelah dikumpulkan, nilai akhir, analisis penguasaan topik, dan
                      pembahasan lengkap baru akan terbuka.
                    </p>
                    <div className="pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                      <span className="font-mono tabular-nums">25 soal</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">120 menit</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200 font-medium">
                        {tryoutState.submitted
                          ? `Selesai · Nilai ${tryoutEvaluation.totalScore}/100`
                          : `Progres: ${tryoutAnsweredCount}/25 terjawab`}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenPackage('tryout')}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 transition-colors"
                    >
                      <span>
                        {tryoutState.submitted
                          ? 'Lihat Nilai & Pembahasan'
                          : tryoutAnsweredCount > 0 || tryoutState.elapsedSeconds > 0
                            ? 'Lanjutkan TryOut'
                            : 'Mulai TryOut PSAS'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4-Column Kisi-Kisi & Struktur Soal Strip */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
                  Struktur &amp; Kisi-Kisi Bentuk Soal PSAS (25 Butir · Total 100 Poin)
                </h2>
                <button
                  type="button"
                  onClick={() => handleNavigate('kisi-kisi')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  <span>Lihat Tabel Kisi-Kisi Soal Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    part: 'Bagian I · No. 1–10',
                    title: 'Pilihan Ganda Tunggal',
                    desc: '10 butir soal dengan 5 opsi (A–E) · 3 poin per soal.',
                  },
                  {
                    part: 'Bagian II · No. 11–15',
                    title: 'Pilihan Ganda Kompleks (MCMA)',
                    desc: '5 butir soal dengan lebih dari satu jawaban benar · 4 poin per soal.',
                  },
                  {
                    part: 'Bagian III · No. 16–20',
                    title: 'Pilihan Ganda Kategori (B/S)',
                    desc: '5 butir soal berisi 3 pernyataan Benar/Salah · 6 poin per soal.',
                  },
                  {
                    part: 'Bagian IV · No. 21–25',
                    title: 'Isian / Uraian Singkat',
                    desc: '5 butir soal isian angka bulat atau pecahan sederhana · 4 poin per soal.',
                  },
                ].map((item) => (
                  <div
                    key={item.part}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-1.5"
                  >
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {item.part}
                    </div>
                    <div className="text-sm font-bold font-display text-slate-900 dark:text-slate-100">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =============================================================== */}
        {/* KISI-KISI SOAL                                                  */}
        {/* =============================================================== */}
        {activeRoute === 'kisi-kisi' && <KisiKisiView />}

        {/* =============================================================== */}
        {/* PAKET 1: LATIHAN SOAL                                           */}
        {/* =============================================================== */}
        {activeRoute === 'latihan' &&
          (showLatihanSummary ? (
            <TryoutAnalysisView
              packageId="latihan"
              identity={identity}
              questions={paketLatihan}
              answers={latihanState.answers}
              evaluation={latihanEvaluation}
              onRetake={handleResetLatihan}
              onBackToPackage={() => setShowLatihanSummary(false)}
            />
          ) : (
            <ExamWorkspace
              mode="latihan"
              questions={paketLatihan}
              identity={identity}
              answers={latihanState.answers}
              currentIndex={latihanState.currentIndex}
              onSelectIndex={(idx) =>
                setLatihanState((prev) => ({...prev, currentIndex: idx}))
              }
              onChangeAnswer={handleLatihanAnswer}
              revealed={latihanState.revealed}
              onRevealQuestion={handleLatihanReveal}
              onViewLatihanSummary={() => {
                setActivePrintPackage('latihan');
                setShowLatihanSummary(true);
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
              onResetPackage={handleResetLatihan}
            />
          ))}

        {/* =============================================================== */}
        {/* PAKET 2: TRYOUT PSAS                                            */}
        {/* =============================================================== */}
        {activeRoute === 'tryout' &&
          (tryoutState.submitted ? (
            <TryoutAnalysisView
              packageId="tryout"
              identity={identity}
              questions={paketTryout}
              answers={tryoutState.answers}
              evaluation={tryoutEvaluation}
              elapsedSeconds={tryoutState.elapsedSeconds}
              onRetake={handleResetTryout}
            />
          ) : (
            <ExamWorkspace
              mode="tryout"
              questions={paketTryout}
              identity={identity}
              answers={tryoutState.answers}
              currentIndex={tryoutState.currentIndex}
              onSelectIndex={(idx) =>
                setTryoutState((prev) => ({...prev, currentIndex: idx}))
              }
              onChangeAnswer={handleTryoutAnswer}
              flagged={tryoutState.flagged}
              onToggleFlag={handleTryoutFlag}
              elapsedSeconds={tryoutState.elapsedSeconds}
              onSubmitTryout={handleSubmitTryout}
              onResetPackage={handleResetTryout}
            />
          ))}

        {/* =============================================================== */}
        {/* LAPORAN & UNDUH HASIL                                           */}
        {/* =============================================================== */}
        {activeRoute === 'laporan' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Pusat Laporan Hasil Belajar · SMA Negeri 1 Kersana
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-slate-100">
                Unduh Laporan Hasil Pengerjaan
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Unduh berkas laporan resmi dalam format HTML atau cetak langsung sebagai PDF untuk
                arsip pribadi maupun pelaporan ke guru mata pelajaran.
              </p>
            </div>

            {/* Identity Quick Summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Identitas Siswa:{' '}
                <strong className="text-slate-900 dark:text-slate-100">
                  {identity.name || 'Belum diisi'}
                </strong>{' '}
                · Kelas <strong>{identity.kelas || '-'}</strong> · Absen{' '}
                <strong className="font-mono tabular-nums">{identity.absen || '-'}</strong>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoute('home')}
                className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
              >
                Ubah Identitas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Card 1: Paket Latihan */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-blue-700 dark:text-blue-400">
                      Laporan Paket 1
                    </div>
                    <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
                      Paket Latihan Soal
                    </h2>
                  </div>
                  <FileText className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                </div>

                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    Terjawab:{' '}
                    <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                      {latihanAnsweredCount} / 25 soal
                    </strong>
                  </div>
                  <div>
                    Skor Sementara:{' '}
                    <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                      {latihanEvaluation.totalScore} / 100
                    </strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={latihanAnsweredCount === 0}
                    onClick={() =>
                      downloadHtmlReport({
                        packageId: 'latihan',
                        identity,
                        questions: paketLatihan,
                        evaluation: latihanEvaluation,
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh (.html)</span>
                  </button>
                  <button
                    type="button"
                    disabled={latihanAnsweredCount === 0}
                    onClick={() => handlePrintPackage('latihan')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / PDF</span>
                  </button>
                </div>
              </div>

              {/* Report Card 2: Paket TryOut */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Laporan Paket 2
                    </div>
                    <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
                      Paket TryOut PSAS
                    </h2>
                  </div>
                  <FileText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                </div>

                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    Status:{' '}
                    <strong className="text-slate-900 dark:text-slate-100">
                      {tryoutState.submitted
                        ? 'Sudah Dikumpulkan'
                        : tryoutAnsweredCount > 0
                          ? `Sedang Dikerjakan (${tryoutAnsweredCount}/25)`
                          : 'Belum Dikerjakan'}
                    </strong>
                  </div>
                  <div>
                    Nilai Akhir:{' '}
                    <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                      {tryoutState.submitted
                        ? `${tryoutEvaluation.totalScore} / 100 (${tryoutEvaluation.predicate})`
                        : 'Tersedia setelah TryOut dikumpulkan'}
                    </strong>
                  </div>
                  {tryoutState.submitted && (
                    <div>
                      Durasi:{' '}
                      <strong className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                        {formatDuration(tryoutState.elapsedSeconds)}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={!tryoutState.submitted}
                    onClick={() =>
                      downloadHtmlReport({
                        packageId: 'tryout',
                        identity,
                        questions: paketTryout,
                        evaluation: tryoutEvaluation,
                        elapsedSeconds: tryoutState.elapsedSeconds,
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh (.html)</span>
                  </button>
                  <button
                    type="button"
                    disabled={!tryoutState.submitted}
                    onClick={() => handlePrintPackage('tryout')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Print-Only Formal Academic Report */}
      <PrintableReport
        packageId={activePrintPackage}
        identity={identity}
        questions={activePrintPackage === 'latihan' ? paketLatihan : paketTryout}
        evaluation={activePrintPackage === 'latihan' ? latihanEvaluation : tryoutEvaluation}
        elapsedSeconds={
          activePrintPackage === 'tryout' ? tryoutState.elapsedSeconds : undefined
        }
      />

      <footer className="no-print border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="space-y-0.5">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              SMA Negeri 1 Kersana · Latihan Soal PSAS Matematika Wajib Kelas XII
            </div>
            <div>
              Guru Mata Pelajaran: M. Faisal Abduh, M.Pd. - NIP 199104032020121014
            </div>
          </div>
          <span>
            Data identitas dan progres belajar tersimpan lokal di perangkat Anda.
          </span>
        </div>
      </footer>
    </div>
  );
}
