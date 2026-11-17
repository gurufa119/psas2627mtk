export interface TujuanPembelajaranItem {
  kode: string;
  materi: string;
  tujuanPembelajaran: string;
}

export interface BabMateriGroup {
  babNomor: string;
  babJudul: string;
  totalJp: string;
  items: TujuanPembelajaranItem[];
}

export interface KisiKisiRow {
  no: number;
  bab: 'Bab 3: Kaidah Pencacahan' | 'Bab 4: Peluang';
  capaianPembelajaran: string;
  ruangLingkupMateri: string;
  indikatorSoal: string;
  levelKognitif: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  noSoal: number;
  bentukSoal:
    | 'Pilihan Ganda'
    | 'PG Kompleks (MCMA)'
    | 'PG Kategori (B/S)'
    | 'Isian Singkat';
}

export const KISI_KISI_META = {
  judul: 'KISI-KISI PENULISAN SOAL',
  subjudul: 'PENILAIAN SUMATIF AKHIR SEMESTER (PSAS)',
  tahunAjaran: 'TAHUN AJARAN 2026/2027',
  jenjang: 'SMA (SMA Negeri 1 Kersana)',
  mataPelajaran: 'Matematika Wajib',
  kelasSemester: 'XII / Gasal',
  kurikulum: 'Kurikulum Merdeka',
  jumlahSoal: '25 Butir Soal',
  bentukSoal:
    'Pilihan Ganda (No. 1–10), PG Kompleks / MCMA (No. 11–15), PG Kategori Benar/Salah (No. 16–20), Isian Singkat (No. 21–25)',
  levelKognitifDesc:
    'mengingat (C1), memahami (C2), mengaplikasikan (C3), menganalisis (C4), mengevaluasi (C5), dan mencipta (C6)',
  tempatTanggal: 'Kersana, November 2026',
  guruMapel: 'M. Faisal Abduh, M.Pd.',
  nipGuru: '199104032020121014',
};

export const MATERI_DAN_TP: BabMateriGroup[] = [
  {
    babNomor: '3',
    babJudul: 'BAB 3: KAIDAH PENCACAHAN',
    totalJp: 'Total: 16 JP',
    items: [
      {
        kode: '3.1',
        materi: 'Aturan Pengisian Tempat',
        tujuanPembelajaran:
          'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian.',
      },
      {
        kode: '3.2',
        materi: 'Permutasi',
        tujuanPembelajaran:
          'Menerapkan konsep permutasi objek untuk menentukan banyaknya kemungkinan susunan data.',
      },
      {
        kode: '3.3',
        materi: 'Kombinasi',
        tujuanPembelajaran:
          'Menerapkan konsep kombinasi objek untuk menentukan banyaknya kemungkinan tanpa urutan.',
      },
      {
        kode: '3.4',
        materi: 'Penerapan Permutasi dan Kombinasi',
        tujuanPembelajaran:
          'Menganalisis dan menyelesaikan masalah kontekstual yang melibatkan permutasi dan kombinasi.',
      },
    ],
  },
  {
    babNomor: '4',
    babJudul: 'BAB 4: PELUANG',
    totalJp: 'Total: 32 JP',
    items: [
      {
        kode: '4.1',
        materi: 'Peluang Suatu Kejadian',
        tujuanPembelajaran:
          'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata yang melibatkan ketidakpastian secara logis dan menyenangkan.',
      },
      {
        kode: '4.2',
        materi: 'Peluang Kejadian Majemuk',
        tujuanPembelajaran:
          'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata.',
      },
    ],
  },
];

export const KISI_KISI_ROWS: KisiKisiRow[] = [
  {
    no: 1,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Notasi Faktorial & Sifat Eksponen',
    indikatorSoal:
      'Disajikan bentuk operasi pembagian dan perkalian bilangan berpangkat yang memuat notasi faktorial, peserta didik dapat menentukan hasil penyederhanaannya dengan tepat.',
    levelKognitif: 'C3',
    noSoal: 1,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 2,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Aturan Pengisian Tempat (Penyusunan Bilangan)',
    indikatorSoal:
      'Disajikan lima angka dengan sebagian angka berulang yang disusun dari nilai terkecil hingga terbesar, peserta didik dapat menentukan banyaknya susunan kode bilangan yang lebih besar dari batas tertentu.',
    levelKognitif: 'C4',
    noSoal: 2,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 3,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Menerapkan konsep permutasi objek untuk menentukan banyaknya kemungkinan susunan data (TP 3.2).',
    ruangLingkupMateri: 'Permutasi Berderet Bersyarat',
    indikatorSoal:
      'Disajikan masalah penempatan dua jenis objek berbeda dalam deretan memanjang dengan syarat dua objek tertentu tidak boleh bersebelahan, peserta didik dapat menentukan banyaknya susunan yang mungkin.',
    levelKognitif: 'C4',
    noSoal: 3,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 4,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Menerapkan konsep permutasi objek untuk menentukan banyaknya kemungkinan susunan data (TP 3.2).',
    ruangLingkupMateri: 'Permutasi Siklis Bersyarat',
    indikatorSoal:
      'Disajikan masalah posisi duduk mengelilingi meja bundar dengan syarat satu orang selalu diapit oleh dua orang tertentu, peserta didik dapat menentukan banyaknya cara duduk yang mungkin.',
    levelKognitif: 'C4',
    noSoal: 4,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 5,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Menerapkan konsep permutasi objek untuk menentukan banyaknya kemungkinan susunan data (TP 3.2).',
    ruangLingkupMateri: 'Permutasi dengan Unsur Sama',
    indikatorSoal:
      'Disajikan sebuah kata yang mengandung beberapa huruf berulang, peserta didik dapat menentukan banyaknya kata atau susunan huruf berbeda yang dapat dibentuk.',
    levelKognitif: 'C3',
    noSoal: 5,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 6,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Menerapkan konsep kombinasi objek untuk menentukan banyaknya kemungkinan tanpa urutan (TP 3.3).',
    ruangLingkupMateri: 'Kombinasi dengan Syarat Wajib',
    indikatorSoal:
      'Disajikan sejumlah butir soal ujian dengan kuota pengerjaan tertentu dan syarat beberapa soal nomor awal wajib dikerjakan, peserta didik dapat menentukan banyaknya pilihan kombinasi soal.',
    levelKognitif: 'C3',
    noSoal: 6,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 7,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Menggunakan Kombinasi',
    indikatorSoal:
      'Disajikan dua kelompok kandidat berbeda untuk membentuk panitia atau delegasi secara acak, peserta didik dapat menentukan peluang terpilihnya komposisi anggota dengan jumlah tertentu dari tiap kelompok.',
    levelKognitif: 'C3',
    noSoal: 7,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 8,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Permutasi Siklis',
    indikatorSoal:
      'Disajikan sejumlah siswa yang duduk mengelilingi meja bundar, peserta didik dapat menentukan peluang dua siswa tertentu duduk berdampingan atau tidak berdampingan.',
    levelKognitif: 'C4',
    noSoal: 8,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 9,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Pengambilan Bola Sekaligus',
    indikatorSoal:
      'Disajikan sebuah wadah berisi bola dengan dua warna berbeda yang diambil tiga bola sekaligus secara acak, peserta didik dapat menentukan peluang terambilnya komposisi warna tertentu.',
    levelKognitif: 'C3',
    noSoal: 9,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 10,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Peluang Kejadian Majemuk & Komplemen',
    indikatorSoal:
      'Disajikan dua kelas dengan jumlah siswa sama dan diketahui peluang terpilihnya kedua siswa berjenis kelamin sama, peserta didik dapat menentukan peluang terpilihnya paling sedikit satu siswa berjenis kelamin tersebut.',
    levelKognitif: 'C4',
    noSoal: 10,
    bentukSoal: 'Pilihan Ganda',
  },
  {
    no: 11,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Aturan Penjumlahan & Perkalian (Rute Perjalanan)',
    indikatorSoal:
      'Disajikan informasi rute perjalanan antarkota melalui dua kota transit berbeda, peserta didik dapat mengevaluasi beberapa pernyataan terkait banyaknya cara perjalanan sekali jalan dan pergi-pulang (PP).',
    levelKognitif: 'C5',
    noSoal: 11,
    bentukSoal: 'PG Kompleks (MCMA)',
  },
  {
    no: 12,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Penyusunan Bilangan Tiga Angka Berbeda',
    indikatorSoal:
      'Disajikan himpunan angka termasuk angka nol, peserta didik dapat mengevaluasi beberapa pernyataan mengenai banyaknya bilangan ratusan ganjil atau genap dengan angka berbeda yang dapat disusun.',
    levelKognitif: 'C5',
    noSoal: 12,
    bentukSoal: 'PG Kompleks (MCMA)',
  },
  {
    no: 13,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Menganalisis dan menyelesaikan masalah kontekstual yang melibatkan permutasi dan kombinasi (TP 3.4).',
    ruangLingkupMateri: 'Penerapan Kombinasi dalam Pembentukan Tim',
    indikatorSoal:
      'Disajikan masalah pembentukan tim dari kelompok putra dan putri dengan syarat minimal anggota putra tertentu, peserta didik dapat menganalisis kebenaran beberapa pernyataan banyaknya tim yang dapat dibentuk.',
    levelKognitif: 'C4',
    noSoal: 13,
    bentukSoal: 'PG Kompleks (MCMA)',
  },
  {
    no: 14,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Peluang Kejadian Saling Bebas (Dengan Pengembalian)',
    indikatorSoal:
      'Disajikan pengambilan dua objek satu per satu dengan pengembalian dari wadah berisi tiga warna berbeda, peserta didik dapat menentukan beberapa pernyataan peluang pengambilan pertama dan kedua yang bernilai benar.',
    levelKognitif: 'C4',
    noSoal: 14,
    bentukSoal: 'PG Kompleks (MCMA)',
  },
  {
    no: 15,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Peluang Pelemparan Koin dan Dadu',
    indikatorSoal:
      'Disajikan percobaan pelemparan sebuah koin dan sebuah dadu secara bersamaan, peserta didik dapat mengevaluasi beberapa pernyataan peluang kejadian tunggal maupun majemuk yang muncul.',
    levelKognitif: 'C4',
    noSoal: 15,
    bentukSoal: 'PG Kompleks (MCMA)',
  },
  {
    no: 16,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Uji Kejadian Saling Bebas dari Teks Survei',
    indikatorSoal:
      'Disajikan teks hasil survei dua aktivitas belajar siswa, peserta didik dapat menentukan nilai kebenaran (Benar/Salah) pernyataan mengenai peluang tunggal, komplemen gabungan, dan sifat saling bebas.',
    levelKognitif: 'C5',
    noSoal: 16,
    bentukSoal: 'PG Kategori (B/S)',
  },
  {
    no: 17,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Pemilihan Acak pada Seleksi Bertahap',
    indikatorSoal:
      'Disajikan konteks seleksi dua tahap dengan jumlah kandidat putra dan putri yang lolos tahap awal, peserta didik dapat menentukan nilai kebenaran tiga pernyataan peluang pemilihan acak tahap akhir.',
    levelKognitif: 'C4',
    noSoal: 17,
    bentukSoal: 'PG Kategori (B/S)',
  },
  {
    no: 18,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Pengambilan Bola Tiga Warna Sekaligus',
    indikatorSoal:
      'Disajikan kotak berisi bola tiga warna berbeda yang diambil tiga bola sekaligus secara acak, peserta didik dapat menentukan nilai kebenaran tiga pernyataan peluang variasi warna bola yang terambil.',
    levelKognitif: 'C4',
    noSoal: 18,
    bentukSoal: 'PG Kategori (B/S)',
  },
  {
    no: 19,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Perbandingan Susunan Bilangan Bersyarat',
    indikatorSoal:
      'Disajikan angka 0 sampai 5 untuk membentuk bilangan dengan angka berbeda, peserta didik dapat mengevaluasi kebenaran pernyataan terkait banyak bilangan 3 angka, bilangan 4 angka kelipatan 5, serta selisihnya.',
    levelKognitif: 'C5',
    noSoal: 19,
    bentukSoal: 'PG Kategori (B/S)',
  },
  {
    no: 20,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Aturan Penjumlahan Peluang pada Tabel Kontingensi',
    indikatorSoal:
      'Disajikan tabel kontingensi keanggotaan kegiatan siswa menurut jenis kelamin, peserta didik dapat menentukan nilai kebenaran tiga pernyataan peluang gabungan dua kejadian ($P(A \\cup B)$).',
    levelKognitif: 'C4',
    noSoal: 20,
    bentukSoal: 'PG Kategori (B/S)',
  },
  {
    no: 21,
    bab: 'Bab 3: Kaidah Pencacahan',
    capaianPembelajaran:
      'Mendeskripsikan aturan pengisian tempat, baik aturan penjumlahan maupun perkalian (TP 3.1).',
    ruangLingkupMateri: 'Aturan Pengisian Tempat dengan Syarat Paritas',
    indikatorSoal:
      'Disajikan aturan penyusunan kode atau nomor empat angka dengan syarat jumlah keempat angkanya genap atau ganjil, peserta didik dapat menentukan banyaknya kode berbeda yang dapat dibuat.',
    levelKognitif: 'C4',
    noSoal: 21,
    bentukSoal: 'Isian Singkat',
  },
  {
    no: 22,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep kombinatorik dalam menentukan peluang suatu kejadian untuk menganalisis situasi nyata (TP 4.1).',
    ruangLingkupMateri: 'Peluang Komplemen Komposisi Anak',
    indikatorSoal:
      'Disajikan rencana jumlah anak dalam suatu keluarga dengan peluang lahir laki-laki dan perempuan sama, peserta didik dapat menentukan peluang keluarga tersebut memiliki paling banyak atau sekurang-kurangnya sejumlah anak tertentu.',
    levelKognitif: 'C3',
    noSoal: 22,
    bentukSoal: 'Isian Singkat',
  },
  {
    no: 23,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Peluang Kejadian Bersyarat Berurutan',
    indikatorSoal:
      'Disajikan situasi area parkir dengan dua jenis kendaraan tertentu yang keluar satu per satu tanpa pengembalian, peserta didik dapat menentukan peluang dua kendaraan pertama keluar berurutan sesuai jenis yang ditentukan.',
    levelKognitif: 'C4',
    noSoal: 23,
    bentukSoal: 'Isian Singkat',
  },
  {
    no: 24,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Peluang Kejadian Saling Bebas Dua Wadah',
    indikatorSoal:
      'Disajikan dua kotak berbeda yang masing-masing berisi beberapa warna bola dan diambil satu bola dari tiap kotak secara acak, peserta didik dapat menentukan peluang terambilnya warna tertentu dari kedua kotak.',
    levelKognitif: 'C3',
    noSoal: 24,
    bentukSoal: 'Isian Singkat',
  },
  {
    no: 25,
    bab: 'Bab 4: Peluang',
    capaianPembelajaran:
      'Menerapkan konsep peluang kejadian majemuk (saling lepas, saling bebas, bersyarat) dalam situasi nyata (TP 4.2).',
    ruangLingkupMateri: 'Frekuensi Harapan & Irisan Dua Kejadian',
    indikatorSoal:
      'Disajikan jumlah peserta uji kompetensi dua mata pelajaran beserta peluang lulus masing-masing satu mata pelajaran saja, peserta didik dapat memperkirakan banyaknya siswa yang lulus kedua tes sekaligus.',
    levelKognitif: 'C4',
    noSoal: 25,
    bentukSoal: 'Isian Singkat',
  },
];
