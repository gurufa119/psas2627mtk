import React, {useState} from 'react';
import {Check, UserCheck} from 'lucide-react';
import {StudentIdentity} from '../types/exam';

interface IdentityFormProps {
  identity: StudentIdentity;
  onSave: (next: StudentIdentity) => void;
  compact?: boolean;
}

const KELAS_OPTIONS = [
  'XII-1',
  'XII-2',
  'XII-3',
  'XII-4',
  'XII-5',
  'XII-6',
  'XII-7',
  'XII-8',
  'XII-9',
  'XII-10',
  'XII-11',
  'XII-12',
];

export const IdentityForm: React.FC<IdentityFormProps> = ({
  identity,
  onSave,
  compact = false,
}) => {
  const [name, setName] = useState(identity.name);
  const [kelas, setKelas] = useState(identity.kelas || 'XII-1');
  const [absen, setAbsen] = useState(identity.absen);
  const [savedNotice, setSavedNotice] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedKelas = kelas.trim();
    const trimmedAbsen = absen.trim();

    if (!trimmedName || !trimmedKelas || !trimmedAbsen) {
      setErrorMsg('Mohon lengkapi Nama Lengkap, Kelas, dan Nomor Absen terlebih dahulu.');
      return;
    }

    setErrorMsg('');
    onSave({
      name: trimmedName,
      kelas: trimmedKelas,
      absen: trimmedAbsen,
      updatedAt: new Date().toISOString(),
    });
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl ${
        compact ? 'p-4 sm:p-5' : 'p-6 sm:p-7'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100">
            Identitas Peserta Didik
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tersimpan otomatis di perangkat Anda tanpa perlu login · Digunakan pada laporan hasil.
          </p>
        </div>
        {identity.name && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 shrink-0">
            <UserCheck className="w-4 h-4" />
            <span>Identitas aktif</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-5">
        <div className="sm:col-span-6 space-y-1.5">
          <label
            htmlFor="student-name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Nama Lengkap
          </label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Nadia Putri Rahmawati"
            className="w-full min-h-[44px] px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="sm:col-span-3 space-y-1.5">
          <label
            htmlFor="student-class"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Kelas
          </label>
          <input
            id="student-class"
            type="text"
            list="kelas-smansaker-list"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            placeholder="XII-1"
            className="w-full min-h-[44px] px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <datalist id="kelas-smansaker-list">
            {KELAS_OPTIONS.map((k) => (
              <option key={k} value={k} />
            ))}
          </datalist>
        </div>

        <div className="sm:col-span-3 space-y-1.5">
          <label
            htmlFor="student-absen"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            No. Absen
          </label>
          <input
            id="student-absen"
            type="text"
            inputMode="numeric"
            value={absen}
            onChange={(e) => setAbsen(e.target.value)}
            placeholder="Contoh: 17"
            className="w-full min-h-[44px] px-3.5 py-2 text-sm font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="mt-3 text-sm text-rose-600 dark:text-rose-400 font-medium">{errorMsg}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Data tersimpan di penyimpanan lokal peramban (localStorage) perangkat ini.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {savedNotice ? (
            <>
              <Check className="w-4 h-4" />
              <span>Identitas Tersimpan</span>
            </>
          ) : (
            <span>Simpan Identitas</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default IdentityForm;
