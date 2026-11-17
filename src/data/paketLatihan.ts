import {Question} from '../types/exam';

export const paketLatihan: Question[] = [
  // =========================================================================
  // BAGIAN I: PILIHAN GANDA TUNGGAL (No. 1 - 10)
  // =========================================================================
  {
    id: 1,
    section: 'I',
    type: 'pg',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 3,
    prompt:
      'Nilai dari $\\dfrac{81^{7!}}{27^{6!}} : \\left(27^{7!} \\cdot 81^{6!}\\right)$ adalah ....',
    options: [
      {key: 'A', label: '$0$'},
      {key: 'B', label: '$1$'},
      {key: 'C', label: '$3$'},
      {key: 'D', label: '$9$'},
      {key: 'E', label: '$27$'},
    ],
    correctOption: 'B',
    solutionSteps: [
      'Ubah seluruh bilangan pokok menjadi basis $3$: $81 = 3^4$ dan $27 = 3^3$.',
      '$$\\frac{81^{7!}}{27^{6!}} : \\left(27^{7!} \\cdot 81^{6!}\\right) = \\frac{3^{4 \\cdot 7!}}{3^{3 \\cdot 6!}} : \\left(3^{3 \\cdot 7!} \\cdot 3^{4 \\cdot 6!}\\right)$$',
      'Gunakan sifat eksponen $\\dfrac{a^m}{a^n} = a^{m-n}$ dan $a^m \\cdot a^n = a^{m+n}$:',
      '$$= 3^{(4 \\cdot 7! - 3 \\cdot 6!) - (3 \\cdot 7! + 4 \\cdot 6!)} = 3^{7! - 7 \\cdot 6!}$$',
      'Karena $7! = 7 \\cdot 6!$, maka $7! - 7 \\cdot 6! = 7 \\cdot 6! - 7 \\cdot 6! = 0$.',
      'Jadi nilainya adalah $3^0 = 1$.',
    ],
    finalAnswerLabel: 'B. $1$',
  },
  {
    id: 2,
    section: 'I',
    type: 'pg',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 3,
    prompt:
      'Kode akses loker siswa disusun dari angka $2, 3, 3, 5,$ dan $7$. Jika seluruh kode yang mungkin diurutkan dari bilangan terkecil sampai terbesar, banyak kode yang nilainya lebih besar daripada $53000$ adalah ....',
    options: [
      {key: 'A', label: '$18$'},
      {key: 'B', label: '$19$'},
      {key: 'C', label: '$21$'},
      {key: 'D', label: '$24$'},
      {key: 'E', label: '$30$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Tersedia $5$ angka yaitu $2, 3, 3, 5, 7$ (angka $3$ muncul $2$ kali). Agar kode lebih besar dari $53000$, digit pertama harus $5$ atau $7$.',
      'Kasus 1 — Digit pertama $5$ (tersisa angka $2, 3, 3, 7$): agar $> 53000$, digit kedua harus $3$ atau $7$.',
      '• Awalan $53\\dots$: sisa angka $2, 3, 7$ (semua berbeda), banyak susunan $= 3! = 6$ kode.',
      '• Awalan $57\\dots$: sisa angka $2, 3, 3$ (dua angka $3$ sama), banyak susunan $= \\dfrac{3!}{2!} = 3$ kode.',
      'Kasus 2 — Digit pertama $7$ (tersisa angka $2, 3, 3, 5$): banyak susunan $= \\dfrac{4!}{2!} = 12$ kode.',
      'Total kode lebih besar dari $53000$ adalah $6 + 3 + 12 = 21$ kode.',
    ],
    finalAnswerLabel: 'C. $21$',
  },
  {
    id: 3,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Dua unit mobil ambulans berbeda dan empat unit mobil pemadam kebakaran berbeda akan diparkir pada enam petak parkir yang berderet memanjang. Jika kedua mobil ambulans tidak boleh diparkir bersebelahan, banyak susunan parkir berbeda yang mungkin adalah ....',
    options: [
      {key: 'A', label: '$240$'},
      {key: 'B', label: '$360$'},
      {key: 'C', label: '$420$'},
      {key: 'D', label: '$480$'},
      {key: 'E', label: '$600$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Total susunan bebas untuk $6$ kendaraan berbeda adalah $6! = 720$ susunan.',
      'Hitung susunan ketika $2$ ambulans diparkir bersebelahan (dianggap sebagai $1$ blok): terdapat $1 + 4 = 5$ objek yang disusun berderet, dan $2$ ambulans di dalam blok dapat bertukar posisi, sehingga banyaknya $= 5! \\cdot 2! = 120 \\cdot 2 = 240$ susunan.',
      'Banyak susunan dengan kedua ambulans tidak bersebelahan $= 720 - 240 = 480$ susunan.',
    ],
    finalAnswerLabel: 'D. $480$',
  },
  {
    id: 4,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Delapan orang panitia kegiatan SMA Negeri 1 Kersana duduk mengelilingi meja bundar, terdiri atas Ketua, Wakil Ketua, Sekretaris, serta $5$ anggota seksi. Jika posisi duduk Ketua harus selalu diapit oleh Wakil Ketua dan Sekretaris, banyaknya cara duduk yang mungkin adalah ....',
    options: [
      {key: 'A', label: '$120$'},
      {key: 'B', label: '$240$'},
      {key: 'C', label: '$360$'},
      {key: 'D', label: '$480$'},
      {key: 'E', label: '$720$'},
    ],
    correctOption: 'B',
    solutionSteps: [
      'Karena Ketua selalu diapit oleh Wakil Ketua dan Sekretaris, ketiganya dikelompokkan menjadi $1$ kesatuan.',
      'Bersama $5$ anggota seksi lainnya, terdapat $1 + 5 = 6$ unsur yang duduk melingkar.',
      'Banyak cara menyusun $6$ unsur secara siklis adalah $(6 - 1)! = 5! = 120$ cara.',
      'Di dalam kelompok inti, Wakil Ketua dan Sekretaris dapat bertukar tempat mengapit Ketua sebanyak $2! = 2$ cara.',
      'Total cara duduk $= 120 \\times 2 = 240$ cara.',
    ],
    finalAnswerLabel: 'B. $240$',
  },
  {
    id: 5,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Banyak kata (susunan huruf) berbeda yang dapat dibentuk dari semua huruf pada kata $\\text{STATISTIKA}$ adalah ....',
    options: [
      {key: 'A', label: '$37.800$'},
      {key: 'B', label: '$50.400$'},
      {key: 'C', label: '$75.600$'},
      {key: 'D', label: '$151.200$'},
      {key: 'E', label: '$302.400$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Kata $\\text{STATISTIKA}$ terdiri atas $n = 10$ huruf dengan rincian huruf sama: $\\text{S} = 2$, $\\text{T} = 3$, $\\text{A} = 2$, $\\text{I} = 2$, dan $\\text{K} = 1$.',
      'Gunakan permutasi dengan unsur yang sama:',
      '$$P = \\frac{10!}{2! \\cdot 3! \\cdot 2! \\cdot 2! \\cdot 1!} = \\frac{3.628.800}{2 \\cdot 6 \\cdot 2 \\cdot 2} = \\frac{3.628.800}{48} = 75.600$$',
    ],
    finalAnswerLabel: 'C. $75.600$',
  },
  {
    id: 6,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Dalam suatu evaluasi matematika tersedia $14$ butir soal dan siswa diminta mengerjakan $9$ soal saja. Jika soal nomor $1$ sampai $5$ wajib dikerjakan, banyaknya pilihan kombinasi soal yang dapat dipilih siswa adalah ....',
    options: [
      {key: 'A', label: '$84$'},
      {key: 'B', label: '$105$'},
      {key: 'C', label: '$126$'},
      {key: 'D', label: '$140$'},
      {key: 'E', label: '$210$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Soal nomor $1$ sampai $5$ ($5$ soal) wajib dikerjakan sehingga tidak perlu dipilih lagi.',
      'Siswa tinggal memilih $9 - 5 = 4$ soal dari $14 - 5 = 9$ soal yang tersisa.',
      '$$C(9, 4) = \\frac{9!}{4! \\cdot 5!} = \\frac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126$$',
    ],
    finalAnswerLabel: 'C. $126$',
  },
  {
    id: 7,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Suatu tim delegasi olimpiade beranggotakan $4$ orang akan dipilih secara acak dari $6$ siswa putra dan $5$ siswa putri. Jika tim tersebut harus terdiri atas $2$ putra dan $2$ putri, peluang terpilihnya susunan tim tersebut adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{3}{11}$'},
      {key: 'B', label: '$\\dfrac{4}{11}$'},
      {key: 'C', label: '$\\dfrac{5}{11}$'},
      {key: 'D', label: '$\\dfrac{6}{11}$'},
      {key: 'E', label: '$\\dfrac{7}{11}$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Total kandidat $= 6 + 5 = 11$ orang, dipilih $4$ orang sehingga $n(S) = C(11, 4) = \\dfrac{11 \\times 10 \\times 9 \\times 8}{24} = 330$.',
      'Banyak cara memilih $2$ putra dan $2$ putri: $n(A) = C(6, 2) \\times C(5, 2) = 15 \\times 10 = 150$.',
      '$$P(A) = \\frac{n(A)}{n(S)} = \\frac{150}{330} = \\frac{5}{11}$$',
    ],
    finalAnswerLabel: 'C. $\\dfrac{5}{11}$',
  },
  {
    id: 8,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Enam siswa pengurus MPK yaitu Arya, Bima, Citra, Dinda, Eka, dan Fajar akan menempati kursi mengelilingi meja bundar. Peluang Citra dan Dinda tidak duduk berdampingan adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{1}{5}$'},
      {key: 'B', label: '$\\dfrac{2}{5}$'},
      {key: 'C', label: '$\\dfrac{1}{2}$'},
      {key: 'D', label: '$\\dfrac{3}{5}$'},
      {key: 'E', label: '$\\dfrac{4}{5}$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Banyak seluruh cara $6$ siswa duduk melingkar adalah $n(S) = (6 - 1)! = 5! = 120$.',
      'Misalkan $K$ adalah kejadian Citra dan Dinda duduk berdampingan (dianggap $1$ kesatuan): $n(K) = (5 - 1)! \\times 2! = 24 \\times 2 = 48$.',
      '$$P(K) = \\frac{48}{120} = \\frac{2}{5}$$',
      'Peluang Citra dan Dinda tidak berdampingan adalah komplemennya: $P(K^c) = 1 - \\dfrac{2}{5} = \\dfrac{3}{5}$.',
    ],
    finalAnswerLabel: 'D. $\\dfrac{3}{5}$',
  },
  {
    id: 9,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Sebuah kotak berisi $4$ bola hijau dan $2$ bola kuning. Dari dalam kotak diambil $3$ bola sekaligus secara acak. Peluang terambilnya tepat $1$ bola berwarna kuning adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{1}{5}$'},
      {key: 'B', label: '$\\dfrac{2}{5}$'},
      {key: 'C', label: '$\\dfrac{3}{5}$'},
      {key: 'D', label: '$\\dfrac{4}{5}$'},
      {key: 'E', label: '$\\dfrac{1}{2}$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Total bola $= 4 + 2 = 6$. Banyak cara mengambil $3$ bola sekaligus: $n(S) = C(6, 3) = \\dfrac{6 \\times 5 \\times 4}{6} = 20$.',
      'Terambil tepat $1$ kuning berarti terambil $1$ bola kuning dan $2$ bola hijau: $n(A) = C(2, 1) \\times C(4, 2) = 2 \\times 6 = 12$.',
      '$$P(A) = \\frac{12}{20} = \\frac{3}{5}$$',
    ],
    finalAnswerLabel: 'C. $\\dfrac{3}{5}$',
  },
  {
    id: 10,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 3,
    prompt:
      'Dua kelas masing-masing terdiri atas $20$ siswa. Satu siswa dipilih secara acak dari tiap-tiap kelas. Jika peluang terpilih keduanya perempuan adalah $\\dfrac{39}{80}$, peluang terpilihnya paling sedikit satu di antaranya perempuan adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{73}{80}$'},
      {key: 'B', label: '$\\dfrac{67}{80}$'},
      {key: 'C', label: '$\\dfrac{41}{80}$'},
      {key: 'D', label: '$\\dfrac{39}{80}$'},
      {key: 'E', label: '$\\dfrac{7}{80}$'},
    ],
    correctOption: 'A',
    solutionSteps: [
      'Misalkan banyak siswa perempuan di kelas I dan II berturut-turut adalah $a$ dan $b$ (dengan $a, b \\le 20$).',
      '$$P(P_1 \\cap P_2) = \\frac{a}{20} \\cdot \\frac{b}{20} = \\frac{ab}{400} = \\frac{39}{80} = \\frac{195}{400} \\implies ab = 195$$',
      'Faktorisasi $195 = 13 \\times 15$. Karena kedua faktor harus $\\le 20$, pasangan satu-satunya adalah $13$ dan $15$.',
      'Banyak siswa laki-laki di masing-masing kelas adalah $20 - 13 = 7$ dan $20 - 15 = 5$.',
      'Peluang terpilih keduanya laki-laki $= \\dfrac{7}{20} \\cdot \\dfrac{5}{20} = \\dfrac{35}{400} = \\dfrac{7}{80}$.',
      'Peluang paling sedikit satu perempuan $= 1 - \\dfrac{7}{80} = \\dfrac{73}{80}$.',
    ],
    finalAnswerLabel: 'A. $\\dfrac{73}{80}$',
  },

  // =========================================================================
  // BAGIAN II: PILIHAN GANDA KOMPLEKS / MCMA (No. 11 - 15)
  // =========================================================================
  {
    id: 11,
    section: 'II',
    type: 'mcma',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 4,
    prompt:
      'Raka melakukan perjalanan dari Kersana menuju Semarang. Ia dapat melalui Tegal (Kersana–Tegal ada $3$ jalur, Tegal–Semarang ada $2$ jalur) atau melalui Purwokerto (Kersana–Purwokerto ada $2$ jalur, Purwokerto–Semarang ada $4$ jalur). Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {
        key: 'A',
        label: 'Banyak cara pergi dari Kersana ke Semarang sekali jalan adalah $14$ cara.',
      },
      {
        key: 'B',
        label: 'Banyak cara pergi dari Kersana ke Semarang melalui Tegal saja adalah $5$ cara.',
      },
      {
        key: 'C',
        label:
          'Banyak cara perjalanan pergi-pulang (PP) dengan bebas memilih jalur adalah $196$ cara.',
      },
      {
        key: 'D',
        label:
          'Banyak cara perjalanan PP jika kota transit pulang harus berbeda dengan kota transit berangkat adalah $96$ cara.',
      },
      {
        key: 'E',
        label:
          'Selisih banyak cara perjalanan PP bebas jalur dengan perjalanan PP berbeda kota transit adalah $110$ cara.',
      },
    ],
    correctOptions: ['A', 'C', 'D'],
    solutionSteps: [
      '• Lewat Tegal: $3 \\times 2 = 6$ cara (maka pernyataan B salah). Lewat Purwokerto: $2 \\times 4 = 8$ cara.',
      '• Total cara berangkat sekali jalan $= 6 + 8 = 14$ cara (pernyataan A benar).',
      '• Perjalanan PP bebas memilih jalur $= 14 \\times 14 = 196$ cara (pernyataan C benar).',
      '• PP dengan kota transit pulang berbeda: (berangkat Tegal, pulang Purwokerto) + (berangkat Purwokerto, pulang Tegal) $= (6 \\times 8) + (8 \\times 6) = 48 + 48 = 96$ cara (pernyataan D benar).',
      '• Selisih keduanya $= 196 - 96 = 100$ cara, bukan $110$ (pernyataan E salah).',
    ],
    finalAnswerLabel: 'A, C, D',
  },
  {
    id: 12,
    section: 'II',
    type: 'mcma',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 4,
    prompt:
      'Disediakan angka-angka $0, 1, 2, 3, 4, 5,$ dan $7$. Akan disusun bilangan ratusan ganjil yang terdiri atas $3$ angka berbeda. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Banyaknya bilangan yang dapat disusun tepat $100$ bilangan.'},
      {key: 'B', label: 'Banyaknya bilangan yang dapat disusun kurang dari $100$ bilangan.'},
      {
        key: 'C',
        label:
          'Jika angka satuan yang dipilih adalah $5$, banyak bilangan yang terbentuk adalah $25$ bilangan.',
      },
      {key: 'D', label: 'Banyaknya bilangan yang dapat disusun merupakan bilangan genap.'},
      {key: 'E', label: 'Banyaknya pilihan angka untuk posisi ratusan adalah $6$ pilihan.'},
    ],
    correctOptions: ['A', 'C', 'D'],
    solutionSteps: [
      'Tersedia $7$ angka: $\\{0, 1, 2, 3, 4, 5, 7\\}$ dengan $4$ angka ganjil $\\{1, 3, 5, 7\\}$.',
      '• Posisi satuan (harus ganjil): $4$ pilihan.',
      '• Posisi ratusan (tidak boleh $0$ dan tidak boleh sama dengan satuan): $7 - 2 = 5$ pilihan (maka E salah).',
      '• Posisi puluhan (boleh $0$, sisa $7 - 2 = 5$ pilihan): $5$ pilihan.',
      '• Total bilangan $= 5 \\times 5 \\times 4 = 100$ bilangan (A benar, B salah, D benar karena $100$ genap).',
      '• Jika satuan dikunci angka $5$ ($1$ pilihan), banyak bilangan $= 5 \\times 5 \\times 1 = 25$ bilangan (C benar).',
    ],
    finalAnswerLabel: 'A, C, D',
  },
  {
    id: 13,
    section: 'II',
    type: 'mcma',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 4,
    prompt:
      'Dari $6$ siswa putra dan $4$ siswa putri akan dibentuk tim cerdas cermat yang beranggotakan $4$ orang dengan syarat sekurang-kurangnya terdapat $3$ siswa putra. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Banyak cara memilih $3$ orang dari $6$ siswa putra adalah $20$ cara.'},
      {key: 'B', label: 'Banyak cara memilih $1$ orang dari $4$ siswa putri adalah $6$ cara.'},
      {
        key: 'C',
        label: 'Banyak tim yang dapat dibentuk jika terdapat $3$ putra dan $1$ putri adalah $80$ tim.',
      },
      {
        key: 'D',
        label: 'Banyak tim yang dapat dibentuk jika seluruh anggotanya putra adalah $15$ tim.',
      },
      {
        key: 'E',
        label: 'Total seluruh tim yang dapat dibentuk dengan syarat tersebut adalah $105$ tim.',
      },
    ],
    correctOptions: ['A', 'C', 'D'],
    solutionSteps: [
      '• Memilih $3$ putra dari $6$ putra: $C(6, 3) = \\dfrac{6 \\times 5 \\times 4}{6} = 20$ cara (A benar).',
      '• Memilih $1$ putri dari $4$ putri: $C(4, 1) = 4$ cara (B salah).',
      '• Tim $3$ putra dan $1$ putri: $20 \\times 4 = 80$ tim (C benar).',
      '• Tim $4$ putra seluruhnya: $C(6, 4) = \\dfrac{6 \\times 5}{2} = 15$ tim (D benar).',
      '• Total seluruh tim $= 80 + 15 = 95$ tim, bukan $105$ (E salah).',
    ],
    finalAnswerLabel: 'A, C, D',
  },
  {
    id: 14,
    section: 'II',
    type: 'mcma',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Dalam sebuah kotak terdapat $5$ kelereng merah, $3$ kelereng hijau, dan $2$ kelereng biru. Dari kotak tersebut diambil $2$ kelereng satu per satu secara acak dengan pengembalian. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Peluang terambilnya kelereng pertama berwarna merah adalah $\\dfrac{1}{2}$.'},
      {key: 'B', label: 'Peluang terambilnya kelereng pertama berwarna biru adalah $\\dfrac{1}{4}$.'},
      {key: 'C', label: 'Peluang terambilnya kelereng pertama berwarna hijau adalah $\\dfrac{3}{10}$.'},
      {
        key: 'D',
        label: 'Peluang terambil kelereng pertama merah dan kedua biru adalah $\\dfrac{1}{10}$.',
      },
      {
        key: 'E',
        label: 'Peluang terambil kelereng pertama biru dan kedua hijau adalah $\\dfrac{3}{25}$.',
      },
    ],
    correctOptions: ['A', 'C', 'D'],
    solutionSteps: [
      'Total kelereng $= 5 + 3 + 2 = 10$. Karena pengambilan dilakukan dengan pengembalian, ruang sampel selalu tetap $10$.',
      '• $P(\\text{Merah}) = \\dfrac{5}{10} = \\dfrac{1}{2}$ (A benar).',
      '• $P(\\text{Biru}) = \\dfrac{2}{10} = \\dfrac{1}{5}$ (B salah).',
      '• $P(\\text{Hijau}) = \\dfrac{3}{10}$ (C benar).',
      '• $P(M_1 \\cap B_2) = \\dfrac{1}{2} \\times \\dfrac{1}{5} = \\dfrac{1}{10}$ (D benar).',
      '• $P(B_1 \\cap H_2) = \\dfrac{1}{5} \\times \\dfrac{3}{10} = \\dfrac{3}{50}$ (E salah).',
    ],
    finalAnswerLabel: 'A, C, D',
  },
  {
    id: 15,
    section: 'II',
    type: 'mcma',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Sebuah koin seimbang (sisi Angka dan Gambar) serta sebuah dadu bersisi enam dilempar undi bersama-sama satu kali. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Peluang munculnya sisi Gambar pada koin adalah $\\dfrac{1}{2}$.'},
      {key: 'B', label: 'Peluang munculnya mata dadu bilangan prima adalah $\\dfrac{1}{2}$.'},
      {
        key: 'C',
        label: 'Peluang munculnya sisi Angka pada koin dan mata dadu kelipatan $3$ adalah $\\dfrac{1}{6}$.',
      },
      {
        key: 'D',
        label: 'Peluang munculnya sisi Gambar pada koin dan mata dadu lebih dari $4$ adalah $\\dfrac{1}{3}$.',
      },
      {
        key: 'E',
        label: 'Peluang munculnya sisi Angka pada koin dan mata dadu ganjil adalah $\\dfrac{1}{3}$.',
      },
    ],
    correctOptions: ['A', 'B', 'C'],
    solutionSteps: [
      'Ruang sampel pelemparan $1$ koin dan $1$ dadu berjumlah $n(S) = 2 \\times 6 = 12$.',
      '• A: Muncul Gambar pada koin memiliki peluang $\\dfrac{1}{2}$ (benar).',
      '• B: Mata dadu prima $= \\{2, 3, 5\\}$, peluangnya $\\dfrac{3}{6} = \\dfrac{1}{2}$ (benar).',
      '• C: Angka dan kelipatan $3$ $= \\{(A, 3), (A, 6)\\}$, peluangnya $\\dfrac{2}{12} = \\dfrac{1}{6}$ (benar).',
      '• D: Gambar dan lebih dari $4$ $= \\{(G, 5), (G, 6)\\}$, peluangnya $\\dfrac{2}{12} = \\dfrac{1}{6}$ (salah).',
      '• E: Angka dan ganjil $= \\{(A, 1), (A, 3), (A, 5)\\}$, peluangnya $\\dfrac{3}{12} = \\dfrac{1}{4}$ (salah).',
    ],
    finalAnswerLabel: 'A, B, C',
  },

  // =========================================================================
  // BAGIAN III: PILIHAN GANDA KATEGORI BENAR / SALAH (No. 16 - 20)
  // =========================================================================
  {
    id: 16,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 6,
    stimulus:
      'Tim peneliti OSIS SMA Negeri 1 Kersana melakukan survei terhadap $400$ siswa mengenai kebiasaan belajar mandiri. Dua variabel yang diamati adalah:\n• $A$: Siswa menggunakan platform video pembelajaran\n• $B$: Siswa mengikuti kelompok belajar sore\nDiperoleh hasil: $240$ siswa menggunakan video pembelajaran, $200$ siswa mengikuti kelompok belajar, dan $120$ siswa melakukan keduanya.',
    prompt: 'Berdasarkan teks survei di atas, tentukan nilai kebenaran dari setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang siswa menggunakan platform video pembelajaran adalah $0{,}60$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang siswa tidak melakukan kedua aktivitas belajar tersebut adalah $0{,}25$.',
        correct: 'S',
      },
      {
        id: 's3',
        text: 'Kejadian $A$ dan $B$ saling bebas karena memenuhi $P(A \\cap B) = P(A) \\cdot P(B)$.',
        correct: 'B',
      },
    ],
    solutionSteps: [
      '• Pernyataan 1 (Benar): $P(A) = \\dfrac{240}{400} = 0{,}60$.',
      '• Pernyataan 2 (Salah): $P(A \\cup B) = \\dfrac{240 + 200 - 120}{400} = \\dfrac{320}{400} = 0{,}80$, sehingga peluang tidak melakukan keduanya adalah $1 - 0{,}80 = 0{,}20$.',
      '• Pernyataan 3 (Benar): $P(B) = \\dfrac{200}{400} = 0{,}50$ dan $P(A \\cap B) = \\dfrac{120}{400} = 0{,}30$. Karena $P(A) \\cdot P(B) = 0{,}60 \\times 0{,}50 = 0{,}30 = P(A \\cap B)$, maka kejadian $A$ dan $B$ saling bebas.',
    ],
    finalAnswerLabel: 'Benar · Salah · Benar',
  },
  {
    id: 17,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 6,
    prompt:
      'Panitia seleksi Duta Literasi SMA Negeri 1 Kersana menyeleksi $6$ finalis putra dan $5$ finalis putri. Diketahui $3$ dari $6$ finalis putra lolos tahap administrasi dan $3$ dari $5$ finalis putri lolos tahap administrasi. Dari seluruh finalis yang lolos administrasi, dipilih $3$ orang secara acak untuk menerima beasiswa. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terpilihnya ketiganya finalis putri adalah $\\dfrac{1}{20}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terpilihnya minimal $1$ finalis putra adalah $\\dfrac{17}{20}$.',
        correct: 'S',
      },
      {
        id: 's3',
        text: 'Peluang terpilihnya $2$ putra dan $1$ putri adalah $\\dfrac{9}{20}$.',
        correct: 'B',
      },
    ],
    solutionSteps: [
      'Total finalis yang lolos administrasi $= 3$ putra $+\\;3$ putri $= 6$ orang. Banyak cara memilih $3$ orang adalah $n(S) = C(6, 3) = 20$.',
      '• Pernyataan 1 (Benar): $P(\\text{3 putri}) = \\dfrac{C(3, 3)}{20} = \\dfrac{1}{20}$.',
      '• Pernyataan 2 (Salah): $P(\\text{minimal 1 putra}) = 1 - P(\\text{3 putri}) = 1 - \\dfrac{1}{20} = \\dfrac{19}{20}$.',
      '• Pernyataan 3 (Benar): $P(\\text{2 putra, 1 putri}) = \\dfrac{C(3, 2) \\cdot C(3, 1)}{20} = \\dfrac{3 \\cdot 3}{20} = \\dfrac{9}{20}$.',
    ],
    finalAnswerLabel: 'Benar · Salah · Benar',
  },
  {
    id: 18,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 6,
    prompt:
      'Dalam sebuah kotak terdapat $4$ bola merah, $3$ bola biru, dan $3$ bola hijau. Dari dalam kotak diambil $3$ bola sekaligus secara acak. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terambilnya ketiga bola berwarna merah adalah $\\dfrac{1}{30}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terambilnya $2$ bola biru dan $1$ bola hijau adalah $\\dfrac{3}{40}$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Peluang terambilnya ketiga bola berbeda warna adalah $\\dfrac{2}{5}$.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      'Total bola $= 4 + 3 + 3 = 10$. Banyak cara mengambil $3$ bola sekaligus: $n(S) = C(10, 3) = \\dfrac{10 \\times 9 \\times 8}{6} = 120$.',
      '• Pernyataan 1 (Benar): $P(\\text{3 merah}) = \\dfrac{C(4, 3)}{120} = \\dfrac{4}{120} = \\dfrac{1}{30}$.',
      '• Pernyataan 2 (Benar): $P(\\text{2 biru, 1 hijau}) = \\dfrac{C(3, 2) \\cdot C(3, 1)}{120} = \\dfrac{3 \\cdot 3}{120} = \\dfrac{9}{120} = \\dfrac{3}{40}$.',
      '• Pernyataan 3 (Salah): $P(\\text{1 merah, 1 biru, 1 hijau}) = \\dfrac{4 \\cdot 3 \\cdot 3}{120} = \\dfrac{36}{120} = \\dfrac{3}{10}$.',
    ],
    finalAnswerLabel: 'Benar · Benar · Salah',
  },
  {
    id: 19,
    section: 'III',
    type: 'kategori',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 6,
    prompt:
      'Diberikan angka-angka $0, 1, 2, 3, 4,$ dan $5$. Akan dibentuk bilangan dengan syarat angka-angka berbeda. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Banyak bilangan terdiri atas $3$ angka berbeda yang nilainya lebih dari $200$ adalah $80$ bilangan.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Banyak bilangan di antara $1.000$ dan $10.000$ dengan angka berbeda yang merupakan kelipatan $5$ adalah $96$ bilangan.',
        correct: 'S',
      },
      {
        id: 's3',
        text: 'Selisih banyaknya kedua jenis bilangan pada pernyataan di atas tidak kurang dari $25$.',
        correct: 'B',
      },
    ],
    solutionSteps: [
      '• Pernyataan 1 (Benar): Bilangan $3$ angka $> 200$: ratusan boleh $\\{2, 3, 4, 5\\}$ ($4$ pilihan), puluhan $5$ pilihan, satuan $4$ pilihan $\\implies 4 \\times 5 \\times 4 = 80$ bilangan.',
      '• Pernyataan 2 (Salah): Bilangan $4$ angka kelipatan $5$ (satuan $0$ atau $5$):',
      '  - Satuan $= 0$: $5 \\times 4 \\times 3 \\times 1 = 60$ bilangan.',
      '  - Satuan $= 5$: ribuan tak boleh $0$ maupun $5$ ($4$ pilihan) $\\implies 4 \\times 4 \\times 3 \\times 1 = 48$ bilangan.',
      '  - Total $= 60 + 48 = 108$ bilangan, bukan $96$.',
      '• Pernyataan 3 (Benar): Selisih keduanya $= 108 - 80 = 28 \\ge 25$.',
    ],
    finalAnswerLabel: 'Benar · Salah · Benar',
  },
  {
    id: 20,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 6,
    tableData: {
      headers: ['Ekstrakurikuler', 'Laki-laki', 'Perempuan', 'Jumlah'],
      rows: [
        ['PMR', 8, 16, 24],
        ['Pramuka', 14, 12, 26],
        ['Paskibra', 18, 12, 30],
        ['Jumlah', 40, 40, 80],
      ],
    },
    prompt:
      'Data formasi anggota tiga ekstrakurikuler di SMA Negeri 1 Kersana ditunjukkan pada tabel di atas. Jika dipilih seorang siswa secara acak dari $80$ siswa tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terpilihnya siswa perempuan atau anggota PMR adalah $\\dfrac{48}{80}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terpilihnya siswa laki-laki atau anggota Paskibra adalah $\\dfrac{52}{80}$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Peluang terpilihnya siswa laki-laki atau anggota Pramuka adalah $\\dfrac{54}{80}$.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      'Gunakan aturan penjumlahan peluang $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$:',
      '• Pernyataan 1 (Benar): $P(\\text{Perempuan} \\cup \\text{PMR}) = \\dfrac{40 + 24 - 16}{80} = \\dfrac{48}{80}$.',
      '• Pernyataan 2 (Benar): $P(\\text{Laki-laki} \\cup \\text{Paskibra}) = \\dfrac{40 + 30 - 18}{80} = \\dfrac{52}{80}$.',
      '• Pernyataan 3 (Salah): $P(\\text{Laki-laki} \\cup \\text{Pramuka}) = \\dfrac{40 + 26 - 14}{80} = \\dfrac{52}{80}$, bukan $\\dfrac{54}{80}$.',
    ],
    finalAnswerLabel: 'Benar · Benar · Salah',
  },

  // =========================================================================
  // BAGIAN IV: ISIAN SINGKAT / URAIAN SINGKAT (No. 21 - 25)
  // =========================================================================
  {
    id: 21,
    section: 'IV',
    type: 'isian',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 4,
    prompt:
      'Nomor kartu peserta ujian di suatu daerah terdiri atas $4$ angka (angka pertama tidak boleh $0$). Jika jumlah keempat angka pada setiap nomor kartu harus bernilai **genap**, banyak nomor kartu berbeda yang dapat dibuat paling banyak adalah .... *(Tuliskan angka bulat saja)*',
    correctInput: '4500',
    acceptedInputs: ['4500', '4.500'],
    inputPlaceholder: 'Contoh: 4500',
    solutionSteps: [
      '• Angka pertama dapat diisi angka $1$ sampai $9$ ($9$ pilihan).',
      '• Angka kedua dan ketiga masing-masing dapat diisi angka $0$ sampai $9$ ($10$ pilihan dan $10$ pilihan).',
      '• Agar jumlah keempat angka genap: jika jumlah $3$ angka pertama genap maka angka keempat harus genap ($\\{0,2,4,6,8\\} \\to 5$ pilihan); jika jumlah $3$ angka pertama ganjil maka angka keempat harus ganjil ($\\{1,3,5,7,9\\} \\to 5$ pilihan). Dalam segala kondisi, angka keempat selalu memiliki tepat $5$ pilihan.',
      '• Total nomor kartu $= 9 \\times 10 \\times 10 \\times 5 = 4.500$ buah.',
    ],
    finalAnswerLabel: '$4500$',
  },
  {
    id: 22,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 4,
    prompt:
      'Sebuah keluarga merencanakan mempunyai $4$ orang anak. Jika peluang kelahiran anak laki-laki dan perempuan dianggap sama, tentukan peluang keluarga tersebut memiliki **paling banyak $3$ anak laki-laki**! *(Tuliskan pecahan paling sederhana, misal `a/b`)*',
    correctInput: '15/16',
    acceptedInputs: ['15/16'],
    inputPlaceholder: 'Contoh: 15/16',
    solutionSteps: [
      'Banyak seluruh kemungkinan komposisi $4$ anak adalah $n(S) = 2^4 = 16$.',
      'Kejadian "paling banyak $3$ anak laki-laki" adalah komplemen dari kejadian "keempatnya anak laki-laki" ($LLLL$, yaitu $1$ kemungkinan).',
      '$$P(\\text{paling banyak 3 laki-laki}) = 1 - \\frac{1}{16} = \\frac{15}{16}$$',
    ],
    finalAnswerLabel: '$\\dfrac{15}{16}$',
  },
  {
    id: 23,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Di sebuah area parkir objek wisata terdapat $25$ unit mobil pengunjung, di antaranya terdapat $5$ unit mobil MPV putih dan $7$ unit mobil SUV hitam. Setiap mobil dapat keluar bergantian melalui satu pintu keluar secara acak. Pada urutan dua mobil pertama yang keluar berturut-turut, tentukan peluang mobil yang keluar pertama adalah MPV putih lalu disusul oleh SUV hitam! *(Tuliskan pecahan paling sederhana `a/b`)*',
    correctInput: '7/120',
    acceptedInputs: ['7/120'],
    inputPlaceholder: 'Contoh: 7/120',
    solutionSteps: [
      '• Peluang mobil pertama keluar berjenis MPV putih: $P(A) = \\dfrac{5}{25} = \\dfrac{1}{5}$.',
      '• Setelah $1$ MPV putih keluar, tersisa $24$ mobil di area parkir (jumlah SUV hitam tetap $7$ unit).',
      '• Peluang mobil kedua keluar berjenis SUV hitam: $P(B \\mid A) = \\dfrac{7}{24}$.',
      '$$P(A \\cap B) = \\frac{1}{5} \\times \\frac{7}{24} = \\frac{7}{120}$$',
    ],
    finalAnswerLabel: '$\\dfrac{7}{120}$',
  },
  {
    id: 24,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Kotak A berisi $3$ bola merah dan $2$ bola putih. Kotak B berisi $4$ bola merah, $3$ bola kuning, dan $3$ bola putih. Dari masing-masing kotak diambil satu bola secara acak. Tentukan peluang terambil bola merah dari Kotak A **dan** bola kuning dari Kotak B! *(Tuliskan pecahan paling sederhana `a/b`)*',
    correctInput: '9/50',
    acceptedInputs: ['9/50'],
    inputPlaceholder: 'Contoh: 9/50',
    solutionSteps: [
      '• Kotak A berisi $3 + 2 = 5$ bola, sehingga $P(\\text{Merah dari A}) = \\dfrac{3}{5}$.',
      '• Kotak B berisi $4 + 3 + 3 = 10$ bola, sehingga $P(\\text{Kuning dari B}) = \\dfrac{3}{10}$.',
      '• Karena pengambilan dari kedua kotak saling bebas:',
      '$$P = \\frac{3}{5} \\times \\frac{3}{10} = \\frac{9}{50}$$',
    ],
    finalAnswerLabel: '$\\dfrac{9}{50}$',
  },
  {
    id: 25,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Uji kompetensi Bahasa Inggris dan Matematika diikuti oleh $120$ siswa kelas XII. Peluang seorang siswa lulus tes Bahasa Inggris **saja** adalah $0{,}25$ dan peluang seorang siswa lulus tes Matematika **saja** adalah $0{,}35$. Jika dipastikan setiap siswa lulus minimal satu tes tersebut, perkiraan banyak siswa yang lulus kedua tes sekaligus adalah ... siswa. *(Tuliskan angka bulat saja)*',
    correctInput: '48',
    acceptedInputs: ['48'],
    inputPlaceholder: 'Contoh: 48',
    solutionSteps: [
      'Karena setiap siswa pasti lulus minimal satu tes, jumlah peluang seluruh bagian adalah $1$:',
      '$$P(\\text{Inggris saja}) + P(\\text{Matematika saja}) + P(\\text{Keduanya}) = 1$$',
      '$$0{,}25 + 0{,}35 + P(\\text{Keduanya}) = 1 \\implies P(\\text{Keduanya}) = 1 - 0{,}60 = 0{,}40$$',
      '• Perkiraan banyak siswa yang lulus keduanya $= 0{,}40 \\times 120 = 48$ siswa.',
    ],
    finalAnswerLabel: '$48$ siswa',
  },
];
