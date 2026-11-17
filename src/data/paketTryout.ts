import {Question} from '../types/exam';

export const paketTryout: Question[] = [
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
      'Nilai dari $\\dfrac{3 \\cdot 32^{8!}}{4^{7!}} : \\left(16^{8!} \\cdot 64^{7!}\\right)$ adalah ....',
    options: [
      {key: 'A', label: '$0$'},
      {key: 'B', label: '$1$'},
      {key: 'C', label: '$2$'},
      {key: 'D', label: '$3$'},
      {key: 'E', label: '$6$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Ubah pangkat menjadi basis $2$: $32 = 2^5$, $4 = 2^2$, $16 = 2^4$, dan $64 = 2^6$.',
      '$$\\frac{3 \\cdot 32^{8!}}{4^{7!}} : \\left(16^{8!} \\cdot 64^{7!}\\right) = 3 \\cdot \\frac{2^{5 \\cdot 8!}}{2^{2 \\cdot 7!}} : \\left(2^{4 \\cdot 8!} \\cdot 2^{6 \\cdot 7!}\\right)$$',
      'Sederhanakan pangkat basis $2$:',
      '$$= 3 \\cdot 2^{(5 \\cdot 8! - 2 \\cdot 7!) - (4 \\cdot 8! + 6 \\cdot 7!)} = 3 \\cdot 2^{8! - 8 \\cdot 7!}$$',
      'Karena $8! = 8 \\cdot 7!$, maka pangkatnya adalah $8 \\cdot 7! - 8 \\cdot 7! = 0$.',
      'Jadi nilainya $= 3 \\cdot 2^0 = 3 \\cdot 1 = 3$.',
    ],
    finalAnswerLabel: 'D. $3$',
  },
  {
    id: 2,
    section: 'I',
    type: 'pg',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 3,
    prompt:
      'Nomor antrean digital dibentuk dari angka $1, 3, 4, 4,$ dan $7$. Jika semua nomor antrean yang mungkin diurutkan dari bilangan terkecil hingga terbesar, banyaknya nomor antrean yang bernilai lebih besar daripada $43000$ adalah ....',
    options: [
      {key: 'A', label: '$18$'},
      {key: 'B', label: '$24$'},
      {key: 'C', label: '$28$'},
      {key: 'D', label: '$30$'},
      {key: 'E', label: '$36$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Angka yang tersedia adalah $1, 3, 4, 4, 7$ (angka $4$ ada dua). Agar lebih besar dari $43000$, digit pertama harus $4$ atau $7$.',
      'Kasus 1 — Digit pertama $4$ (sisa angka $1, 3, 4, 7$): agar $> 43000$, digit kedua dapat diisi $3, 4,$ atau $7$.',
      '• Awalan $43\\dots$: sisa $1, 4, 7 \\implies 3! = 6$ bilangan.',
      '• Awalan $44\\dots$: sisa $1, 3, 7 \\implies 3! = 6$ bilangan.',
      '• Awalan $47\\dots$: sisa $1, 3, 4 \\implies 3! = 6$ bilangan.',
      'Kasus 2 — Digit pertama $7$ (sisa angka $1, 3, 4, 4$): $\\dfrac{4!}{2!} = 12$ bilangan.',
      'Total seluruhnya $= 6 + 6 + 6 + 12 = 30$ nomor antrean.',
    ],
    finalAnswerLabel: 'D. $30$',
  },
  {
    id: 3,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Tiga buah buku Matematika yang berbeda dan dua buah buku Fisika yang berbeda akan disusun berderet di rak buku perpustakaan. Jika kedua buku Fisika tidak boleh diletakkan bersebelahan, banyak susunan buku berbeda yang mungkin adalah ....',
    options: [
      {key: 'A', label: '$36$'},
      {key: 'B', label: '$48$'},
      {key: 'C', label: '$60$'},
      {key: 'D', label: '$72$'},
      {key: 'E', label: '$96$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Total susunan bebas $5$ buku berbeda $= 5! = 120$ cara.',
      'Banyak susunan ketika kedua buku Fisika bersebelahan (dianggap $1$ blok): $(4! \\cdot 2!) = 24 \\cdot 2 = 48$ cara.',
      'Banyak susunan saat kedua buku Fisika tidak bersebelahan $= 120 - 48 = 72$ cara.',
    ],
    finalAnswerLabel: 'D. $72$',
  },
  {
    id: 4,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Tujuh orang siswa terdiri atas Putra, Putri, Rani, serta $4$ siswa lainnya duduk mengelilingi meja diskusi berbentuk lingkaran. Jika Putri harus selalu duduk diapit oleh Putra dan Rani, banyak cara duduk yang mungkin adalah ....',
    options: [
      {key: 'A', label: '$24$'},
      {key: 'B', label: '$48$'},
      {key: 'C', label: '$72$'},
      {key: 'D', label: '$96$'},
      {key: 'E', label: '$120$'},
    ],
    correctOption: 'B',
    solutionSteps: [
      'Putra, Putri, dan Rani membentuk $1$ kelompok (dengan Putri di tengah). Bersama $4$ siswa lainnya, ada $1 + 4 = 5$ unsur melingkar.',
      'Banyak susunan siklis $5$ unsur $= (5 - 1)! = 4! = 24$ cara.',
      'Putra dan Rani dapat bertukar posisi mengapit Putri sebanyak $2! = 2$ cara.',
      'Total cara duduk $= 24 \\times 2 = 48$ cara.',
    ],
    finalAnswerLabel: 'B. $48$',
  },
  {
    id: 5,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Banyak kata (susunan huruf) berbeda yang dapat dibentuk dari semua huruf pada kata $\\text{MATEMATIKA}$ adalah ....',
    options: [
      {key: 'A', label: '$75.600$'},
      {key: 'B', label: '$126.000$'},
      {key: 'C', label: '$151.200$'},
      {key: 'D', label: '$302.400$'},
      {key: 'E', label: '$453.600$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Kata $\\text{MATEMATIKA}$ memiliki $n = 10$ huruf dengan rincian: $\\text{M} = 2$, $\\text{A} = 3$, $\\text{T} = 2$, $\\text{E} = 1$, $\\text{I} = 1$, $\\text{K} = 1$.',
      '$$P = \\frac{10!}{2! \\cdot 3! \\cdot 2!} = \\frac{3.628.800}{2 \\cdot 6 \\cdot 2} = \\frac{3.628.800}{24} = 151.200$$',
    ],
    finalAnswerLabel: 'C. $151.200$',
  },
  {
    id: 6,
    section: 'I',
    type: 'pg',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 3,
    prompt:
      'Seorang siswa diminta mengerjakan $8$ soal dari $12$ soal ulangan yang tersedia. Jika soal nomor $1$ sampai $4$ wajib dikerjakan karena merupakan soal dasar, banyaknya pilihan komposisi soal yang dapat diambil siswa adalah ....',
    options: [
      {key: 'A', label: '$56$'},
      {key: 'B', label: '$70$'},
      {key: 'C', label: '$84$'},
      {key: 'D', label: '$105$'},
      {key: 'E', label: '$120$'},
    ],
    correctOption: 'B',
    solutionSteps: [
      'Karena soal nomor $1$ sampai $4$ ($4$ soal) wajib dikerjakan, siswa tinggal memilih $8 - 4 = 4$ soal dari $12 - 4 = 8$ soal yang tersisa.',
      '$$C(8, 4) = \\frac{8 \\times 7 \\times 6 \\times 5}{4 \\times 3 \\times 2 \\times 1} = 70$$',
    ],
    finalAnswerLabel: 'B. $70$',
  },
  {
    id: 7,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Dari $8$ siswa kelas sains dan $6$ siswa kelas sosial akan dipilih $5$ orang secara acak menjadi panitia pentas seni sekolah. Peluang terpilihnya panitia yang terdiri atas $3$ siswa kelas sains dan $2$ siswa kelas sosial adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{40}{143}$'},
      {key: 'B', label: '$\\dfrac{50}{143}$'},
      {key: 'C', label: '$\\dfrac{60}{143}$'},
      {key: 'D', label: '$\\dfrac{70}{143}$'},
      {key: 'E', label: '$\\dfrac{80}{143}$'},
    ],
    correctOption: 'C',
    solutionSteps: [
      'Total siswa $= 8 + 6 = 14$. Banyak cara memilih $5$ orang: $n(S) = C(14, 5) = \\dfrac{14 \\times 13 \\times 12 \\times 11 \\times 10}{120} = 2002$.',
      'Banyak cara memilih $3$ sains dan $2$ sosial: $n(A) = C(8, 3) \\times C(6, 2) = 56 \\times 15 = 840$.',
      '$$P(A) = \\frac{840}{2002} = \\frac{60}{143}$$',
    ],
    finalAnswerLabel: 'C. $\\dfrac{60}{143}$',
  },
  {
    id: 8,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Lima sahabat yaitu Andi, Budi, Caca, Doni, dan Evi duduk mengelilingi meja bundar di kantin sekolah. Peluang Andi dan Budi duduk berdampingan adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{1}{4}$'},
      {key: 'B', label: '$\\dfrac{1}{3}$'},
      {key: 'C', label: '$\\dfrac{2}{5}$'},
      {key: 'D', label: '$\\dfrac{1}{2}$'},
      {key: 'E', label: '$\\dfrac{2}{3}$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Banyak cara $5$ orang duduk melingkar adalah $n(S) = (5 - 1)! = 24$.',
      'Jika Andi dan Budi berdampingan (dianggap $1$ blok), banyak susunan siklisnya $n(A) = (4 - 1)! \\times 2! = 6 \\times 2 = 12$.',
      '$$P(A) = \\frac{12}{24} = \\frac{1}{2}$$',
    ],
    finalAnswerLabel: 'D. $\\dfrac{1}{2}$',
  },
  {
    id: 9,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 3,
    prompt:
      'Sebuah kantong berisi $4$ bola putih dan $2$ bola hitam. Dari kantong tersebut diambil $3$ bola sekaligus secara acak. Peluang terambilnya ketiga bola yang paling sedikit memuat $1$ bola hitam adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{1}{5}$'},
      {key: 'B', label: '$\\dfrac{2}{5}$'},
      {key: 'C', label: '$\\dfrac{3}{5}$'},
      {key: 'D', label: '$\\dfrac{4}{5}$'},
      {key: 'E', label: '$\\dfrac{1}{2}$'},
    ],
    correctOption: 'D',
    solutionSteps: [
      'Total bola $= 6$, diambil $3$ sekaligus: $n(S) = C(6, 3) = 20$.',
      'Komplemen dari "minimal $1$ bola hitam" adalah "ketiganya bola putih": $n(K) = C(4, 3) = 4$.',
      '$$P(\\text{minimal 1 hitam}) = 1 - \\frac{4}{20} = \\frac{16}{20} = \\frac{4}{5}$$',
    ],
    finalAnswerLabel: 'D. $\\dfrac{4}{5}$',
  },
  {
    id: 10,
    section: 'I',
    type: 'pg',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 3,
    prompt:
      'Dua kelas masing-masing terdiri atas $24$ siswa. Satu siswa dipilih secara acak dari masing-masing kelas. Diketahui peluang terpilih keduanya laki-laki adalah $\\dfrac{119}{576}$. Peluang terpilihnya paling sedikit satu di antaranya laki-laki adalah ....',
    options: [
      {key: 'A', label: '$\\dfrac{457}{576}$'},
      {key: 'B', label: '$\\dfrac{447}{576}$'},
      {key: 'C', label: '$\\dfrac{357}{576}$'},
      {key: 'D', label: '$\\dfrac{257}{576}$'},
      {key: 'E', label: '$\\dfrac{119}{576}$'},
    ],
    correctOption: 'A',
    solutionSteps: [
      'Misalkan banyaknya siswa laki-laki di kelas I dan II adalah $a$ dan $b$ ($a, b \\le 24$).',
      '$$\\frac{a}{24} \\cdot \\frac{b}{24} = \\frac{ab}{576} = \\frac{119}{576} \\implies ab = 119$$',
      'Faktorisasi prima $119 = 7 \\times 17$. Pasangan unik yang $\\le 24$ adalah $7$ dan $17$.',
      'Jadi banyak siswa perempuan di kedua kelas adalah $24 - 7 = 17$ dan $24 - 17 = 7$.',
      'Peluang keduanya perempuan $= \\dfrac{17}{24} \\cdot \\dfrac{7}{24} = \\dfrac{119}{576}$.',
      'Peluang paling sedikit satu laki-laki $= 1 - \\dfrac{119}{576} = \\dfrac{457}{576}$.',
    ],
    finalAnswerLabel: 'A. $\\dfrac{457}{576}$',
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
      'Dinda berencana pergi dari Kota A ke Kota C. Ia dapat melewati Kota B (dari A ke B ada $3$ jalan, dari B ke C ada $3$ jalan) atau melewati Kota D (dari A ke D ada $2$ jalan, dari D ke C ada $5$ jalan). Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Banyak cara pergi dari Kota A ke Kota C adalah $19$ cara.'},
      {
        key: 'B',
        label:
          'Banyak cara perjalanan pergi-pulang (PP) dengan bebas memilih jalur adalah $361$ cara.',
      },
      {
        key: 'C',
        label:
          'Banyak cara perjalanan PP jika rute gabungan pulang tidak boleh sama persis dengan rute berangkat adalah $342$ cara.',
      },
      {
        key: 'D',
        label: 'Banyak cara pergi dari Kota A ke Kota C melalui Kota B saja adalah $6$ cara.',
      },
      {
        key: 'E',
        label:
          'Selisih banyak cara PP bebas memilih jalur dan PP rute pulang berbeda adalah $38$ cara.',
      },
    ],
    correctOptions: ['A', 'B', 'C'],
    solutionSteps: [
      '• Lewat Kota B: $3 \\times 3 = 9$ cara (maka D salah). Lewat Kota D: $2 \\times 5 = 10$ cara.',
      '• Total cara pergi dari A ke C $= 9 + 10 = 19$ cara (A benar).',
      '• Perjalanan PP bebas memilih jalur $= 19 \\times 19 = 361$ cara (B benar).',
      '• Perjalanan PP dengan rute pulang tidak sama persis dengan saat berangkat $= 19 \\times 18 = 342$ cara (C benar).',
      '• Selisih keduanya $= 361 - 342 = 19$ cara, bukan $38$ (E salah).',
    ],
    finalAnswerLabel: 'A, B, C',
  },
  {
    id: 12,
    section: 'II',
    type: 'mcma',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 4,
    prompt:
      'Disediakan angka-angka $0, 1, 2, 3, 4, 5,$ dan $6$. Akan disusun bilangan ratusan genap (terdiri atas $3$ angka) dengan syarat angka-angka berbeda. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Banyaknya bilangan yang dapat disusun lebih dari $100$.'},
      {key: 'B', label: 'Banyaknya bilangan yang dapat disusun tepat $105$ bilangan.'},
      {key: 'C', label: 'Banyaknya bilangan yang berakhiran angka $0$ adalah $30$ bilangan.'},
      {
        key: 'D',
        label: 'Banyaknya bilangan yang berakhiran selain angka $0$ adalah $90$ bilangan.',
      },
      {key: 'E', label: 'Banyaknya bilangan yang dapat disusun merupakan bilangan genap.'},
    ],
    correctOptions: ['A', 'B', 'C'],
    solutionSteps: [
      'Karena bilangan genap dan angka $0$ tidak boleh di posisi ratusan, bagi menjadi dua kasus:',
      '• Kasus satuan $= 0$ ($1$ pilihan): ratusan bisa diisi $1$–$6$ ($6$ pilihan), puluhan $5$ pilihan $\\implies 6 \\times 5 \\times 1 = 30$ bilangan (C benar).',
      '• Kasus satuan $\\in \\{2, 4, 6\\}$ ($3$ pilihan): ratusan tak boleh $0$ maupun angka satuan ($5$ pilihan), puluhan $5$ pilihan $\\implies 5 \\times 5 \\times 3 = 75$ bilangan (D salah).',
      '• Total seluruh bilangan $= 30 + 75 = 105$ bilangan (A benar, B benar, E salah karena $105$ ganjil).',
    ],
    finalAnswerLabel: 'A, B, C',
  },
  {
    id: 13,
    section: 'II',
    type: 'mcma',
    topic: 'Permutasi & Kombinasi',
    maxPoints: 4,
    prompt:
      'Dari $8$ atlet putra dan $4$ atlet putri akan dibentuk regu tenis meja yang beranggotakan $4$ orang. Persyaratannya adalah regu tersebut harus memuat sekurang-kurangnya $3$ atlet putra. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Banyak cara memilih $3$ dari $8$ atlet putra adalah $56$ cara.'},
      {key: 'B', label: 'Banyak cara memilih $1$ dari $4$ atlet putri adalah $4$ cara.'},
      {
        key: 'C',
        label: 'Banyak regu yang terdiri atas $3$ putra dan $1$ putri adalah $168$ regu.',
      },
      {
        key: 'D',
        label: 'Banyak regu yang terdiri atas $4$ putra seluruhnya adalah $70$ regu.',
      },
      {key: 'E', label: 'Total seluruh regu yang dapat dibentuk adalah $284$ regu.'},
    ],
    correctOptions: ['A', 'B', 'D'],
    solutionSteps: [
      '• Memilih $3$ dari $8$ putra: $C(8, 3) = \\dfrac{8 \\times 7 \\times 6}{6} = 56$ cara (A benar).',
      '• Memilih $1$ dari $4$ putri: $C(4, 1) = 4$ cara (B benar).',
      '• Regu $3$ putra dan $1$ putri: $56 \\times 4 = 224$ regu (C salah).',
      '• Regu $4$ putra seluruhnya: $C(8, 4) = \\dfrac{8 \\times 7 \\times 6 \\times 5}{24} = 70$ regu (D benar).',
      '• Total regu $= 224 + 70 = 294$ regu, bukan $284$ (E salah).',
    ],
    finalAnswerLabel: 'A, B, D',
  },
  {
    id: 14,
    section: 'II',
    type: 'mcma',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Dalam sebuah stoples terdapat $4$ permen rasa stroberi, $6$ permen rasa mint, dan $2$ permen rasa jeruk. Diambil $2$ permen satu per satu secara acak dengan pengembalian. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {key: 'A', label: 'Peluang terambilnya permen pertama rasa stroberi adalah $\\dfrac{1}{3}$.'},
      {key: 'B', label: 'Peluang terambilnya permen pertama rasa mint adalah $\\dfrac{1}{2}$.'},
      {key: 'C', label: 'Peluang terambilnya permen pertama rasa jeruk adalah $\\dfrac{1}{4}$.'},
      {
        key: 'D',
        label: 'Peluang terambil permen pertama stroberi dan kedua mint adalah $\\dfrac{1}{6}$.',
      },
      {
        key: 'E',
        label: 'Peluang terambil permen pertama mint dan kedua jeruk adalah $\\dfrac{1}{8}$.',
      },
    ],
    correctOptions: ['A', 'B', 'D'],
    solutionSteps: [
      'Total permen $= 4 + 6 + 2 = 12$. Pengambilan dilakukan dengan pengembalian sehingga peluang tiap pengambilan tetap.',
      '• $P(\\text{Stroberi}) = \\dfrac{4}{12} = \\dfrac{1}{3}$ (A benar).',
      '• $P(\\text{Mint}) = \\dfrac{6}{12} = \\dfrac{1}{2}$ (B benar).',
      '• $P(\\text{Jeruk}) = \\dfrac{2}{12} = \\dfrac{1}{6}$ (C salah).',
      '• $P(S_1 \\cap M_2) = \\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$ (D benar).',
      '• $P(M_1 \\cap J_2) = \\dfrac{1}{2} \\times \\dfrac{1}{6} = \\dfrac{1}{12}$ (E salah).',
    ],
    finalAnswerLabel: 'A, B, D',
  },
  {
    id: 15,
    section: 'II',
    type: 'mcma',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Sebuah koin seimbang (sisi Angka dan Gambar) dan sebuah dadu bersisi enam dilempar undi bersama-sama satu kali. Manakah pernyataan berikut yang bernilai benar?',
    options: [
      {
        key: 'A',
        label: 'Peluang munculnya sisi Angka pada koin dan mata dadu genap adalah $\\dfrac{1}{4}$.',
      },
      {key: 'B', label: 'Peluang munculnya mata dadu kurang dari $3$ adalah $\\dfrac{1}{3}$.'},
      {
        key: 'C',
        label:
          'Peluang munculnya sisi Gambar pada koin dan mata dadu faktor dari $6$ adalah $\\dfrac{1}{3}$.',
      },
      {
        key: 'D',
        label: 'Peluang munculnya sisi Angka pada koin dan mata dadu lebih dari $5$ adalah $\\dfrac{1}{6}$.',
      },
      {
        key: 'E',
        label: 'Peluang munculnya sisi Gambar pada koin dan mata dadu ganjil adalah $\\dfrac{1}{2}$.',
      },
    ],
    correctOptions: ['A', 'B', 'C'],
    solutionSteps: [
      'Banyak ruang sampel $n(S) = 2 \\times 6 = 12$.',
      '• A: Angka dan genap $= \\{(A, 2), (A, 4), (A, 6)\\}$, peluang $= \\dfrac{3}{12} = \\dfrac{1}{4}$ (benar).',
      '• B: Mata dadu kurang dari $3$ $= \\{1, 2\\}$, peluang $= \\dfrac{2}{6} = \\dfrac{1}{3}$ (benar).',
      '• C: Gambar dan faktor dari $6$ $= \\{(G, 1), (G, 2), (G, 3), (G, 6)\\}$, peluang $= \\dfrac{4}{12} = \\dfrac{1}{3}$ (benar).',
      '• D: Angka dan lebih dari $5$ $= \\{(A, 6)\\}$, peluang $= \\dfrac{1}{12}$ (salah).',
      '• E: Gambar dan ganjil $= \\{(G, 1), (G, 3), (G, 5)\\}$, peluang $= \\dfrac{3}{12} = \\dfrac{1}{4}$ (salah).',
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
      'Sebuah tim survei meneliti $250$ siswa SMA Negeri 1 Kersana mengenai aktivitas literasi digital. Dua variabel yang diamati adalah:\n• $A$: Siswa aktif membaca e-book pelajaran\n• $B$: Siswa mengikuti ekstrakurikuler Karya Ilmiah Remaja (KIR)\nHasil survei mencatat: $150$ siswa aktif membaca e-book, $100$ siswa mengikuti KIR, dan $75$ siswa melakukan keduanya.',
    prompt: 'Berdasarkan teks survei di atas, tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang siswa aktif membaca e-book pelajaran adalah $0{,}60$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang siswa melakukan kedua aktivitas tersebut secara bersamaan adalah $0{,}30$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Kejadian $A$ dan $B$ merupakan dua kejadian yang saling bebas.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      '• Pernyataan 1 (Benar): $P(A) = \\dfrac{150}{250} = 0{,}60$.',
      '• Pernyataan 2 (Benar): $P(A \\cap B) = \\dfrac{75}{250} = 0{,}30$.',
      '• Pernyataan 3 (Salah): $P(B) = \\dfrac{100}{250} = 0{,}40$. Hasil kali $P(A) \\cdot P(B) = 0{,}60 \\times 0{,}40 = 0{,}24 \\ne 0{,}30$, sehingga $A$ dan $B$ tidak saling bebas.',
    ],
    finalAnswerLabel: 'Benar · Benar · Salah',
  },
  {
    id: 17,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 6,
    prompt:
      'Panitia seleksi Paskibra SMA Negeri 1 Kersana menyeleksi $5$ kandidat putra dan $6$ kandidat putri. Pada tes ketahanan fisik, lolos $3$ kandidat putra dan $3$ kandidat putri. Dari seluruh kandidat yang lolos, dipilih $2$ orang secara acak untuk menjadi pembawa baki dan pendamping utama. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terpilihnya kedua kandidat yang dipilih adalah putri seluruhnya adalah $\\dfrac{1}{5}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terpilihnya minimal $1$ kandidat putra adalah $\\dfrac{4}{5}$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Peluang terpilihnya $1$ putra dan $1$ putri adalah $\\dfrac{2}{5}$.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      'Kandidat lolos $= 3$ putra $+\\;3$ putri $= 6$ orang. Banyak cara memilih $2$ orang: $n(S) = C(6, 2) = 15$.',
      '• Pernyataan 1 (Benar): $P(\\text{2 putri}) = \\dfrac{C(3, 2)}{15} = \\dfrac{3}{15} = \\dfrac{1}{5}$.',
      '• Pernyataan 2 (Benar): $P(\\text{minimal 1 putra}) = 1 - \\dfrac{1}{5} = \\dfrac{4}{5}$.',
      '• Pernyataan 3 (Salah): $P(\\text{1 putra, 1 putri}) = \\dfrac{3 \\times 3}{15} = \\dfrac{9}{15} = \\dfrac{3}{5}$.',
    ],
    finalAnswerLabel: 'Benar · Benar · Salah',
  },
  {
    id: 18,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 6,
    prompt:
      'Dalam sebuah wadah terdapat $6$ bola merah, $3$ bola kuning, dan $3$ bola hijau. Dari dalam wadah diambil $3$ bola sekaligus secara acak. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terambilnya ketiga bola berwarna merah adalah $\\dfrac{1}{11}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terambilnya $2$ bola kuning dan $1$ bola hijau adalah $\\dfrac{9}{220}$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Peluang terambilnya ketiga bola berbeda warna adalah $\\dfrac{27}{110}$.',
        correct: 'B',
      },
    ],
    solutionSteps: [
      'Total bola $= 6 + 3 + 3 = 12$, diambil $3$ sekaligus: $n(S) = C(12, 3) = \\dfrac{12 \\times 11 \\times 10}{6} = 220$.',
      '• Pernyataan 1 (Benar): $P(\\text{3 merah}) = \\dfrac{C(6, 3)}{220} = \\dfrac{20}{220} = \\dfrac{1}{11}$.',
      '• Pernyataan 2 (Benar): $P(\\text{2 kuning, 1 hijau}) = \\dfrac{C(3, 2) \\cdot C(3, 1)}{220} = \\dfrac{3 \\cdot 3}{220} = \\dfrac{9}{220}$.',
      '• Pernyataan 3 (Benar): $P(\\text{1 merah, 1 kuning, 1 hijau}) = \\dfrac{6 \\cdot 3 \\cdot 3}{220} = \\dfrac{54}{220} = \\dfrac{27}{110}$.',
    ],
    finalAnswerLabel: 'Benar · Benar · Benar',
  },
  {
    id: 19,
    section: 'III',
    type: 'kategori',
    topic: 'Eksponen & Kaidah Pencacahan',
    maxPoints: 6,
    prompt:
      'Diberikan angka $0, 1, 2, 3, 4,$ dan $5$. Akan dibentuk bilangan dengan syarat angka-angka berbeda. Tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Banyak bilangan terdiri atas $3$ angka berbeda yang lebih dari $400$ adalah $40$ bilangan.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Banyak bilangan di antara $1.000$ dan $10.000$ dengan angka berbeda yang merupakan kelipatan $5$ adalah $108$ bilangan.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Selisih banyaknya kedua jenis bilangan pada pernyataan di atas kurang dari $60$.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      '• Pernyataan 1 (Benar): Bilangan $3$ angka $> 400$: ratusan hanya boleh $\\{4, 5\\}$ ($2$ pilihan), puluhan $5$ pilihan, satuan $4$ pilihan $\\implies 2 \\times 5 \\times 4 = 40$ bilangan.',
      '• Pernyataan 2 (Benar): Bilangan $4$ angka kelipatan $5$: satuan $0$ menghasilkan $5 \\times 4 \\times 3 = 60$ bilangan, dan satuan $5$ menghasilkan $4 \\times 4 \\times 3 = 48$ bilangan, sehingga totalnya $60 + 48 = 108$ bilangan.',
      '• Pernyataan 3 (Salah): Selisih keduanya $= 108 - 40 = 68$, yang lebih besar dari $60$.',
    ],
    finalAnswerLabel: 'Benar · Benar · Salah',
  },
  {
    id: 20,
    section: 'III',
    type: 'kategori',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 6,
    tableData: {
      headers: ['Kelas Bimbingan', 'Laki-laki', 'Perempuan', 'Jumlah'],
      rows: [
        ['Matematika', 10, 15, 25],
        ['Fisika', 12, 8, 20],
        ['Kimia', 8, 12, 20],
        ['Jumlah', 30, 35, 65],
      ],
    },
    prompt:
      'Data peserta kelas bimbingan intensif PSAS di SMA Negeri 1 Kersana disajikan pada tabel di atas. Jika dipilih seorang siswa secara acak dari $65$ siswa tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut.',
    statements: [
      {
        id: 's1',
        text: 'Peluang terpilihnya siswa perempuan atau peserta Matematika adalah $\\dfrac{45}{65}$.',
        correct: 'B',
      },
      {
        id: 's2',
        text: 'Peluang terpilihnya siswa laki-laki atau peserta Fisika adalah $\\dfrac{38}{65}$.',
        correct: 'B',
      },
      {
        id: 's3',
        text: 'Peluang terpilihnya siswa laki-laki atau peserta Kimia adalah $\\dfrac{50}{65}$.',
        correct: 'S',
      },
    ],
    solutionSteps: [
      'Gunakan $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$:',
      '• Pernyataan 1 (Benar): $P(\\text{Perempuan} \\cup \\text{Matematika}) = \\dfrac{35 + 25 - 15}{65} = \\dfrac{45}{65}$.',
      '• Pernyataan 2 (Benar): $P(\\text{Laki-laki} \\cup \\text{Fisika}) = \\dfrac{30 + 20 - 12}{65} = \\dfrac{38}{65}$.',
      '• Pernyataan 3 (Salah): $P(\\text{Laki-laki} \\cup \\text{Kimia}) = \\dfrac{30 + 20 - 8}{65} = \\dfrac{42}{65}$, bukan $\\dfrac{50}{65}$.',
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
      'Kode brankas laboratorium terdiri atas $4$ digit angka ($0$ hingga $9$, dan digit pertama boleh angka $0$). Jika jumlah keempat digit pada kode tersebut harus bernilai **ganjil**, banyak kode berbeda yang dapat disusun paling banyak adalah ... buah. *(Tuliskan angka bulat saja)*',
    correctInput: '5000',
    acceptedInputs: ['5000', '5.000'],
    inputPlaceholder: 'Contoh: 5000',
    solutionSteps: [
      '• Digit pertama, kedua, dan ketiga masing-masing memiliki $10$ pilihan ($0$ sampai $9$).',
      '• Agar jumlah keempat digit ganjil: jika jumlah $3$ digit pertama genap maka digit keempat harus ganjil ($5$ pilihan); jika jumlah $3$ digit pertama ganjil maka digit keempat harus genap ($5$ pilihan).',
      '• Total kode berbeda $= 10 \\times 10 \\times 10 \\times 5 = 5.000$ buah.',
    ],
    finalAnswerLabel: '$5000$',
  },
  {
    id: 22,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Sederhana',
    maxPoints: 4,
    prompt:
      'Sebuah keluarga merencanakan mempunyai $3$ orang anak. Jika peluang kelahiran anak laki-laki dan perempuan dianggap sama besar, tentukan peluang keluarga tersebut memiliki **sekurang-kurangnya $1$ anak laki-laki**! *(Tuliskan pecahan paling sederhana `a/b`)*',
    correctInput: '7/8',
    acceptedInputs: ['7/8'],
    inputPlaceholder: 'Contoh: 7/8',
    solutionSteps: [
      'Banyak ruang sampel untuk $3$ anak adalah $n(S) = 2^3 = 8$.',
      'Komplemen dari "sekurang-kurangnya $1$ anak laki-laki" adalah "ketiga anaknya perempuan" ($PPP$, sebanyak $1$ cara).',
      '$$P = 1 - \\frac{1}{8} = \\frac{7}{8}$$',
    ],
    finalAnswerLabel: '$\\dfrac{7}{8}$',
  },
  {
    id: 23,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Di pelataran parkir sekolah terdapat $30$ unit sepeda motor, di antaranya terdapat $6$ unit motor matic putih dan $5$ unit motor sport hitam. Satu per satu motor keluar melalui gerbang secara bergantian. Pada urutan dua motor pertama yang keluar berturut-turut, tentukan peluang motor yang keluar pertama adalah matic putih lalu disusul motor sport hitam! *(Tuliskan pecahan paling sederhana `a/b`)*',
    correctInput: '1/29',
    acceptedInputs: ['1/29'],
    inputPlaceholder: 'Contoh: 1/29',
    solutionSteps: [
      '• Peluang motor pertama yang keluar adalah matic putih: $P(A) = \\dfrac{6}{30} = \\dfrac{1}{5}$.',
      '• Tersisa $29$ motor di pelataran parkir dengan jumlah motor sport hitam tetap $5$ unit.',
      '• Peluang motor kedua yang keluar adalah sport hitam: $P(B \\mid A) = \\dfrac{5}{29}$.',
      '$$P(A \\cap B) = \\frac{1}{5} \\times \\frac{5}{29} = \\frac{1}{29}$$',
    ],
    finalAnswerLabel: '$\\dfrac{1}{29}$',
  },
  {
    id: 24,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Kotak P berisi $4$ bola hijau dan $2$ bola biru. Kotak Q berisi $3$ bola hijau, $4$ bola kuning, dan $3$ bola biru. Dari masing-masing kotak diambil satu bola secara acak. Tentukan peluang terambil bola hijau dari Kotak P **dan** bola biru dari Kotak Q! *(Tuliskan pecahan paling sederhana `a/b`)*',
    correctInput: '1/5',
    acceptedInputs: ['1/5'],
    inputPlaceholder: 'Contoh: 1/5',
    solutionSteps: [
      '• Kotak P berisi $4 + 2 = 6$ bola, maka $P(\\text{Hijau dari P}) = \\dfrac{4}{6} = \\dfrac{2}{3}$.',
      '• Kotak Q berisi $3 + 4 + 3 = 10$ bola, maka $P(\\text{Biru dari Q}) = \\dfrac{3}{10}$.',
      '• Karena kedua pengambilan saling bebas:',
      '$$P = \\frac{2}{3} \\times \\frac{3}{10} = \\frac{1}{5}$$',
    ],
    finalAnswerLabel: '$\\dfrac{1}{5}$',
  },
  {
    id: 25,
    section: 'IV',
    type: 'isian',
    topic: 'Peluang Kejadian Majemuk',
    maxPoints: 4,
    prompt:
      'Tes masuk tim olimpiade Fisika dan Kimia diikuti oleh $150$ siswa. Peluang seorang siswa lulus tes Fisika **saja** adalah $0{,}28$ dan peluang lulus tes Kimia **saja** adalah $0{,}42$. Jika dipastikan setiap siswa akan lulus paling sedikit satu tes, perkiraan banyak siswa yang lulus tes Fisika sekaligus tes Kimia adalah ... siswa. *(Tuliskan angka bulat saja)*',
    correctInput: '45',
    acceptedInputs: ['45'],
    inputPlaceholder: 'Contoh: 45',
    solutionSteps: [
      'Karena seluruh siswa pasti lulus minimal satu tes:',
      '$$P(\\text{Fisika saja}) + P(\\text{Kimia saja}) + P(\\text{Keduanya}) = 1$$',
      '$$0{,}28 + 0{,}42 + P(\\text{Keduanya}) = 1 \\implies P(\\text{Keduanya}) = 1 - 0{,}70 = 0{,}30$$',
      '• Perkiraan banyak siswa yang lulus keduanya $= 0{,}30 \\times 150 = 45$ siswa.',
    ],
    finalAnswerLabel: '$45$ siswa',
  },
];
