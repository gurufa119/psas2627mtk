import {KISI_KISI_META, KISI_KISI_ROWS, MATERI_DAN_TP} from '../data/kisiKisi';
import {ExamEvaluation, PackageId, Question, StudentIdentity} from '../types/exam';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripLatexToReadable(text: string): string {
  return text
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\cdot/g, '×')
    .replace(/\\times/g, '×')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\implies/g, '⇒')
    .replace(/\\ge/g, '≥')
    .replace(/\\le/g, '≤')
    .replace(/\\ne/g, '≠')
    .replace(/\\in/g, '∈')
    .replace(/\\text\{([^{}]+)\}/g, '$1')
    .replace(/\\left/g, '')
    .replace(/\\right/g, '')
    .replace(/\\;/g, ' ')
    .replace(/\{,\}/g, ',')
    .replace(/\\/g, '');
}

export function downloadHtmlReport(params: {
  packageId: PackageId;
  identity: StudentIdentity;
  questions: Question[];
  evaluation: ExamEvaluation;
  elapsedSeconds?: number;
}) {
  const {packageId, identity, questions, evaluation, elapsedSeconds} = params;
  const packageLabel =
    packageId === 'latihan' ? 'Paket Latihan Soal PSAS' : 'Paket TryOut PSAS';
  const generatedDate = new Date().toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const rowsHtml = questions
    .map((q) => {
      const ev = evaluation.evaluations[q.id];
      const statusLabel =
        ev.status === 'correct'
          ? 'Benar'
          : ev.status === 'partial'
            ? 'Sebagian'
            : ev.status === 'wrong'
              ? 'Salah'
              : 'Kosong';
      const statusClass =
        ev.status === 'correct'
          ? 'status-ok'
          : ev.status === 'partial'
            ? 'status-warn'
            : 'status-bad';

      return `
        <tr>
          <td class="mono center">${q.id}</td>
          <td>Bagian ${q.section} · ${escapeHtml(q.topic)}</td>
          <td class="mono center">${escapeHtml(ev.studentAnswerDisplay)}</td>
          <td class="mono center">${escapeHtml(ev.correctAnswerDisplay)}</td>
          <td class="center"><span class="badge ${statusClass}">${statusLabel}</span></td>
          <td class="mono right">${ev.pointsEarned} / ${ev.maxPoints}</td>
        </tr>
      `;
    })
    .join('');

  const sectionHtml = evaluation.sectionSummaries
    .map(
      (sec) => `
      <tr>
        <td>${escapeHtml(sec.title)}</td>
        <td class="mono center">${sec.correctCount} / ${sec.totalCount} soal tepat</td>
        <td class="mono right">${sec.earned} / ${sec.max} poin</td>
      </tr>
    `,
    )
    .join('');

  const topicHtml = evaluation.topicSummaries
    .map(
      (tp) => `
      <tr>
        <td>${escapeHtml(tp.topic)}</td>
        <td class="mono center">No. ${tp.questionNumbers.join(', ')}</td>
        <td class="mono right">${tp.earned} / ${tp.max} poin (${tp.percentage}%)</td>
      </tr>
    `,
    )
    .join('');

  const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Laporan Hasil ${escapeHtml(packageLabel)} - ${escapeHtml(identity.name || 'Siswa')}</title>
  <style>
    body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #0f172a; margin: 0; padding: 32px; background: #f8fafc; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; }
    .header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; }
    .school { font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #475569; font-weight: 700; }
    h1 { margin: 4px 0 6px; font-size: 22px; color: #0f172a; }
    .sub { font-size: 13px; color: #475569; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
    .box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background: #f8fafc; }
    .box-title { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
    .kv { display: flex; justify-content: space-between; font-size: 14px; padding: 3px 0; }
    .score-big { font-size: 36px; font-weight: 800; color: #1d4ed8; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 13px; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 10px; text-align: left; }
    th { background: #f1f5f9; font-weight: 700; color: #1e293b; }
    .mono { font-family: ui-monospace, SFMono-Regular, monospace; }
    .center { text-align: center; }
    .right { text-align: right; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; }
    .status-ok { background: #dcfce7; color: #166534; }
    .status-warn { background: #fef3c7; color: #92400e; }
    .status-bad { background: #ffe4e6; color: #9f1239; }
    .footer { margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; }
    @media print { body { background: #fff; padding: 0; } .container { border: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="school">SMA Negeri 1 Kersana · Kabupaten Brebes</div>
      <h1>Laporan Hasil ${escapeHtml(packageLabel)}</h1>
      <div class="sub">Mata Pelajaran: Matematika Wajib Kelas XII · Dicetak pada ${escapeHtml(generatedDate)}</div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="box-title">Identitas Peserta Didik</div>
        <div class="kv"><span>Nama Lengkap</span><strong>${escapeHtml(identity.name || '-')}</strong></div>
        <div class="kv"><span>Kelas</span><strong>${escapeHtml(identity.kelas || '-')}</strong></div>
        <div class="kv"><span>Nomor Absen</span><strong>${escapeHtml(identity.absen || '-')}</strong></div>
        ${
          typeof elapsedSeconds === 'number'
            ? `<div class="kv"><span>Durasi Pengerjaan</span><strong>${Math.floor(elapsedSeconds / 60)} menit ${elapsedSeconds % 60} detik</strong></div>`
            : ''
        }
      </div>
      <div class="box">
        <div class="box-title">Capaian Nilai Akhir</div>
        <div class="score-big">${evaluation.totalScore} <span style="font-size:16px; color:#64748b; font-weight:500;">/ ${evaluation.maxScore}</span></div>
        <div style="font-size:14px; font-weight:600; margin-top:4px;">Predikat: ${escapeHtml(evaluation.predicate)}</div>
        <div style="font-size:13px; color:#475569; margin-top:4px;">Benar: ${evaluation.correctCount} · Sebagian: ${evaluation.partialCount} · Salah: ${evaluation.wrongCount} · Kosong: ${evaluation.unansweredCount}</div>
      </div>
    </div>

    <h3 style="font-size:15px; margin-bottom:8px;">Rekapitulasi per Bentuk Soal</h3>
    <table>
      <thead>
        <tr><th>Bentuk Soal</th><th class="center">Ketepatan</th><th class="right">Perolehan Poin</th></tr>
      </thead>
      <tbody>${sectionHtml}</tbody>
    </table>

    <h3 style="font-size:15px; margin-bottom:8px;">Analisis Penguasaan Materi</h3>
    <table>
      <thead>
        <tr><th>Topik Materi</th><th class="center">Nomor Soal</th><th class="right">Capaian</th></tr>
      </thead>
      <tbody>${topicHtml}</tbody>
    </table>

    <h3 style="font-size:15px; margin-bottom:8px;">Rincian Jawaban per Butir Soal</h3>
    <table>
      <thead>
        <tr>
          <th class="center">No</th>
          <th>Bagian &amp; Topik</th>
          <th class="center">Jawaban Siswa</th>
          <th class="center">Kunci</th>
          <th class="center">Status</th>
          <th class="right">Skor</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <div class="footer">
      <span>Portal Latihan PSAS Matematika Wajib Kelas XII · SMA Negeri 1 Kersana</span>
      <span>Guru Mapel: M. Faisal Abduh, M.Pd. - NIP 199104032020121014</span>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeName = (identity.name || 'Siswa')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  anchor.href = url;
  anchor.download = `Laporan-PSAS-${packageId}-${safeName}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadKisiKisiHtml() {
  const tpRows = MATERI_DAN_TP.map(
    (grp) => `
      <tr style="background:#1e293b; color:#ffffff; font-weight:700;">
        <td style="text-align:center;">${escapeHtml(grp.babNomor)}</td>
        <td colspan="2">${escapeHtml(grp.babJudul)} (${escapeHtml(grp.totalJp)})</td>
      </tr>
      ${grp.items
        .map(
          (item) => `
        <tr>
          <td class="mono center">${escapeHtml(item.kode)}</td>
          <td><strong>${escapeHtml(item.materi)}</strong></td>
          <td>${escapeHtml(item.tujuanPembelajaran)}</td>
        </tr>
      `,
        )
        .join('')}
    `,
  ).join('');

  const kisiRows = KISI_KISI_ROWS.map(
    (row) => `
      <tr>
        <td class="mono center">${row.no}.</td>
        <td>${escapeHtml(row.capaianPembelajaran)}</td>
        <td><strong>${escapeHtml(row.ruangLingkupMateri)}</strong><br/><span style="font-size:11px;color:#64748b;">${escapeHtml(row.bab)}</span></td>
        <td>${escapeHtml(stripLatexToReadable(row.indikatorSoal))}</td>
        <td class="mono center">${escapeHtml(row.levelKognitif)}</td>
        <td class="mono center">${row.noSoal}</td>
        <td class="center">${escapeHtml(row.bentukSoal)}</td>
      </tr>
    `,
  ).join('');

  const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Kisi-Kisi Soal PSAS Matematika XII - SMA Negeri 1 Kersana</title>
  <style>
    body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #0f172a; margin: 0; padding: 28px; background: #f8fafc; line-height: 1.45; }
    .container { max-width: 1080px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 28px; }
    .center { text-align: center; }
    .mono { font-family: ui-monospace, SFMono-Regular, monospace; }
    h1, h2 { margin: 2px 0; }
    .meta { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    .meta td { padding: 3px 6px; vertical-align: top; }
    table.grid { width: 100%; border-collapse: collapse; margin: 14px 0 24px; font-size: 12.5px; }
    table.grid th, table.grid td { border: 1px solid #cbd5e1; padding: 7px 9px; vertical-align: top; }
    table.grid th { background: #115e59; color: #ffffff; font-weight: 700; text-align: left; }
    table.grid th.center { text-align: center; }
    .sig { margin-top: 24px; display: flex; justify-content: flex-end; font-size: 13px; }
    .sig-box { width: 260px; }
    @media print { body { background: #fff; padding: 0; } .container { border: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="center" style="border-bottom:2px solid #0f172a; padding-bottom:12px; margin-bottom:16px;">
      <div style="font-size:13px; font-weight:700;">${escapeHtml(KISI_KISI_META.judul)}</div>
      <div style="font-size:16px; font-weight:800;">${escapeHtml(KISI_KISI_META.subjudul)}</div>
      <div style="font-size:13px; font-weight:700;">${escapeHtml(KISI_KISI_META.tahunAjaran)}</div>
    </div>

    <table class="meta">
      <tr><td style="width:170px;">Jenjang Pendidikan</td><td>: ${escapeHtml(KISI_KISI_META.jenjang)}</td></tr>
      <tr><td>Mata Pelajaran</td><td>: ${escapeHtml(KISI_KISI_META.mataPelajaran)}</td></tr>
      <tr><td>Kelas / Semester</td><td>: ${escapeHtml(KISI_KISI_META.kelasSemester)}</td></tr>
      <tr><td>Kurikulum</td><td>: ${escapeHtml(KISI_KISI_META.kurikulum)}</td></tr>
      <tr><td>Jumlah Soal</td><td>: ${escapeHtml(KISI_KISI_META.jumlahSoal)}</td></tr>
      <tr><td>Bentuk Soal</td><td>: ${escapeHtml(KISI_KISI_META.bentukSoal)}</td></tr>
      <tr><td>Level Kognitif</td><td>: ${escapeHtml(KISI_KISI_META.levelKognitifDesc)}</td></tr>
    </table>

    <h3 style="font-size:14px; margin-top:20px;">Daftar Materi Pembelajaran &amp; Tujuan Pembelajaran (TP)</h3>
    <table class="grid">
      <thead>
        <tr>
          <th class="center" style="width:50px; background:#334155;">No</th>
          <th style="width:230px; background:#334155;">Materi Pembelajaran (Bab/Sub-Bab)</th>
          <th style="background:#334155;">Tujuan Pembelajaran (TP)</th>
        </tr>
      </thead>
      <tbody>${tpRows}</tbody>
    </table>

    <h3 style="font-size:14px; margin-top:20px;">Kisi-Kisi Penulisan Soal</h3>
    <table class="grid">
      <thead>
        <tr>
          <th class="center" style="width:36px;">NO</th>
          <th style="width:210px;">Capaian Pembelajaran</th>
          <th style="width:165px;">Ruang Lingkup Materi</th>
          <th>Indikator soal</th>
          <th class="center" style="width:65px;">Level kognitif</th>
          <th class="center" style="width:58px;">No. Soal</th>
          <th class="center" style="width:115px;">Bentuk Soal</th>
        </tr>
      </thead>
      <tbody>${kisiRows}</tbody>
    </table>

    <div class="sig">
      <div class="sig-box">
        <div>${escapeHtml(KISI_KISI_META.tempatTanggal)}</div>
        <div>Guru Mapel,</div>
        <div style="margin-top:44px; font-weight:700;">${escapeHtml(KISI_KISI_META.guruMapel)}</div>
        <div>NIP ${escapeHtml(KISI_KISI_META.nipGuru)}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Kisi-Kisi-PSAS-Matematika-XII-SMAN1-Kersana.html';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export {stripLatexToReadable};
