import React, {useMemo, useState} from 'react';
import {Download, Printer} from 'lucide-react';
import {
  KISI_KISI_META,
  KISI_KISI_ROWS,
  KisiKisiRow,
  MATERI_DAN_TP,
} from '../data/kisiKisi';
import {downloadKisiKisiHtml} from '../utils/reportExport';
import MathText from './MathText';

type BabFilter = 'all' | 'Bab 3: Kaidah Pencacahan' | 'Bab 4: Peluang';
type BentukFilter =
  | 'all'
  | 'Pilihan Ganda'
  | 'PG Kompleks (MCMA)'
  | 'PG Kategori (B/S)'
  | 'Isian Singkat';

export const KisiKisiView: React.FC = () => {
  const [babFilter, setBabFilter] = useState<BabFilter>('all');
  const [bentukFilter, setBentukFilter] = useState<BentukFilter>('all');

  const filteredRows: KisiKisiRow[] = useMemo(() => {
    return KISI_KISI_ROWS.filter((row) => {
      if (babFilter !== 'all' && row.bab !== babFilter) return false;
      if (bentukFilter !== 'all' && row.bentukSoal !== bentukFilter) return false;
      return true;
    });
  }, [babFilter, bentukFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Document Header Card (matching uploaded Kisi-Kisi format) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-semibold tracking-wide uppercase text-blue-700 dark:text-blue-400">
              {KISI_KISI_META.judul}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-slate-100">
              {KISI_KISI_META.subjudul}
            </h1>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {KISI_KISI_META.tahunAjaran} · {KISI_KISI_META.jenjang}
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => downloadKisiKisiHtml()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Kisi-Kisi (.html)</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Jenjang Pendidikan</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100">
              : {KISI_KISI_META.jenjang}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Mata Pelajaran</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100">
              : {KISI_KISI_META.mataPelajaran}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Kelas / Semester</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100">
              : {KISI_KISI_META.kelasSemester}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Kurikulum</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100">
              : {KISI_KISI_META.kurikulum}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Jumlah Soal</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              : {KISI_KISI_META.jumlahSoal}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-40 shrink-0 text-slate-500 dark:text-slate-400">Bentuk Soal</dt>
            <dd className="font-medium text-slate-900 dark:text-slate-100">
              : {KISI_KISI_META.bentukSoal}
            </dd>
          </div>
        </dl>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3">
          <strong className="text-slate-900 dark:text-slate-100">Level kognitif: </strong>
          {KISI_KISI_META.levelKognitifDesc}
        </div>
      </section>

      {/* Daftar Materi & Tujuan Pembelajaran (TP) Table */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-slate-100">
            Daftar Materi Pembelajaran dan Tujuan Pembelajaran (TP)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Acuan kompetensi Bab 3 (Kaidah Pencacahan) dan Bab 4 (Peluang) Kelas XII Kurikulum
            Merdeka.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                <th className="px-4 py-3 font-semibold border-b border-r border-slate-200 dark:border-slate-700 w-16 text-center">
                  No
                </th>
                <th className="px-4 py-3 font-semibold border-b border-r border-slate-200 dark:border-slate-700 w-64">
                  Materi Pembelajaran (Bab/Sub-Bab)
                </th>
                <th className="px-4 py-3 font-semibold border-b border-slate-200 dark:border-slate-700">
                  Tujuan Pembelajaran (TP)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {MATERI_DAN_TP.map((group) => (
                <React.Fragment key={group.babNomor}>
                  <tr className="bg-slate-800 dark:bg-slate-950 text-white">
                    <td className="px-4 py-2.5 font-mono font-bold text-center border-r border-slate-700">
                      {group.babNomor}
                    </td>
                    <td colSpan={2} className="px-4 py-2.5 font-bold font-display">
                      {group.babJudul} ({group.totalJp})
                    </td>
                  </tr>
                  {group.items.map((item) => (
                    <tr
                      key={item.kode}
                      className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    >
                      <td className="px-4 py-3 font-mono font-semibold text-center border-r border-slate-200 dark:border-slate-800 align-top tabular-nums">
                        {item.kode}
                      </td>
                      <td className="px-4 py-3 font-medium border-r border-slate-200 dark:border-slate-800 align-top">
                        {item.materi}
                      </td>
                      <td className="px-4 py-3 leading-relaxed align-top">
                        {item.tujuanPembelajaran}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kisi-Kisi Penulisan Soal Table (7 Columns matching uploaded image) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-slate-100">
              Tabel Kisi-Kisi Penulisan Soal (No. 1 – 25)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Menampilkan {filteredRows.length} dari {KISI_KISI_ROWS.length} butir indikator soal
              PSAS.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="no-print flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Bab Materi"
              value={babFilter}
              onChange={(e) => setBabFilter(e.target.value as BabFilter)}
              className="min-h-[40px] px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Semua Bab Materi</option>
              <option value="Bab 3: Kaidah Pencacahan">Bab 3: Kaidah Pencacahan</option>
              <option value="Bab 4: Peluang">Bab 4: Peluang</option>
            </select>

            <select
              aria-label="Filter Bentuk Soal"
              value={bentukFilter}
              onChange={(e) => setBentukFilter(e.target.value as BentukFilter)}
              className="min-h-[40px] px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Semua Bentuk Soal</option>
              <option value="Pilihan Ganda">Pilihan Ganda (No. 1–10)</option>
              <option value="PG Kompleks (MCMA)">PG Kompleks / MCMA (No. 11–15)</option>
              <option value="PG Kategori (B/S)">PG Kategori B/S (No. 16–20)</option>
              <option value="Isian Singkat">Isian Singkat (No. 21–25)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full min-w-[920px] text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-teal-800 dark:bg-teal-900 text-white">
                <th className="px-3 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800 w-12 text-center">
                  NO
                </th>
                <th className="px-3.5 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800 w-56">
                  Capaian Pembelajaran
                </th>
                <th className="px-3.5 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800 w-44">
                  Ruang Lingkup Materi
                </th>
                <th className="px-3.5 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800">
                  Indikator soal
                </th>
                <th className="px-3 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800 w-24 text-center">
                  Level kognitif
                </th>
                <th className="px-3 py-3 font-semibold border-b border-r border-teal-700 dark:border-teal-800 w-20 text-center">
                  No. Soal
                </th>
                <th className="px-3.5 py-3 font-semibold border-b border-teal-700 dark:border-teal-800 w-36 text-center">
                  Bentuk Soal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredRows.map((row) => (
                <tr
                  key={row.no}
                  className="bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200"
                >
                  <td className="px-3 py-3 font-mono font-semibold text-center border-r border-slate-200 dark:border-slate-800 align-top tabular-nums">
                    {row.no}.
                  </td>
                  <td className="px-3.5 py-3 border-r border-slate-200 dark:border-slate-800 align-top leading-relaxed">
                    {row.capaianPembelajaran}
                  </td>
                  <td className="px-3.5 py-3 border-r border-slate-200 dark:border-slate-800 align-top font-medium">
                    <div>{row.ruangLingkupMateri}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {row.bab}
                    </div>
                  </td>
                  <td className="px-3.5 py-3 border-r border-slate-200 dark:border-slate-800 align-top leading-relaxed">
                    <MathText text={row.indikatorSoal} />
                  </td>
                  <td className="px-3 py-3 font-mono font-semibold text-center border-r border-slate-200 dark:border-slate-800 align-top">
                    {row.levelKognitif}
                  </td>
                  <td className="px-3 py-3 font-mono font-semibold text-center border-r border-slate-200 dark:border-slate-800 align-top tabular-nums">
                    {row.noSoal}
                  </td>
                  <td className="px-3.5 py-3 text-center align-top font-medium">
                    {row.bentukSoal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Block matching uploaded template */}
        <div className="pt-4 flex justify-end">
          <div className="w-full sm:w-72 text-sm text-slate-800 dark:text-slate-200 space-y-1">
            <div>{KISI_KISI_META.tempatTanggal}</div>
            <div>Guru Mapel,</div>
            <div className="pt-8 font-bold text-slate-900 dark:text-slate-100">
              {KISI_KISI_META.guruMapel}
            </div>
            <div className="font-mono text-xs text-slate-600 dark:text-slate-400 tabular-nums">
              NIP {KISI_KISI_META.nipGuru}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KisiKisiView;
