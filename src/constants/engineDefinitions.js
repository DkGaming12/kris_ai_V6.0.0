export const ENGINE_DEFINITIONS = {
  novel: {
    tabTitles: ['Proyek Novel', 'Bab Generator'],
    centralInput: {
      titleField: 'Judul / Konsep Besar Novel',
      ideaField: 'Ide Pengembangan Plot Konkret (Mugina AI V6)',
      placeholder: 'Ceritakan kejadian, dialog, atau progres cerita di bab ini...'
    },
    sidebar: [
      { id: 'episodes', label: 'Total Episode', type: 'text', placeholder: 'Contoh: 10' },
      { id: 'ch_per_ep', label: 'Bab per Episode', type: 'text', placeholder: 'Contoh: 1' },
      { id: 'words', label: 'Target Kata / Episode', type: 'text', placeholder: 'Contoh: 1500' },
      { id: 'pov', label: 'Sudut Pandang', type: 'select', options: ['POV 1 (Aku/Saya)', 'POV 3 (Dia/Nama)', 'Campuran'] },
      { id: 'genre', label: 'Genre Dominan', type: 'select', options: ['Romance', 'Fantasy', 'Action', 'Sci-fi', 'Horror', 'Slice of Life'] },
      { id: 'style', label: 'Gaya Bahasa', type: 'select', options: ['Baku Kasual', 'Puitis Majas', 'Santai/Slang', 'Dark & Gloomy'] },
      { id: 'pacing', label: 'Alur Waktu', type: 'select', options: ['Flashback', 'Linear Lambat', 'Linear Cepat (Aksi)'] }
    ]
  },
  cerpen: {
    tabTitles: ['Karya Tunggal', 'Antologi'],
    centralInput: {
      titleField: 'Judul Cerpen',
      ideaField: 'Injeksi Ide Prompt Cerpen',
      placeholder: 'Gambarkan situasi awal, pemicu konflik, klimaks, hingga ending yang Anda harapkan...'
    },
    sidebar: [
      { id: 'gender', label: 'Gender Tokoh Utama', type: 'radio', options: ['Pria', 'Wanita'] },
      { id: 'pov', label: 'Sudut Pandang', type: 'select', options: ['Orang Pertama (Aku)', 'Orang Kedua (Kamu)', 'Orang Ketiga (Dia)'] },
      { id: 'gaya', label: 'Gaya Bahasa', type: 'select', options: ['Santai / Remaja', 'Formal & Elegan', 'Puitis & Melankolis', 'Sarkas / Komedi'] },
      { id: 'alur', label: 'Alur Cerita', type: 'select', options: ['Maju (Linear)', 'Mundur (Flashback)', 'Campuran (Twist)'] },
      { id: 'target', label: 'Target Pembaca', type: 'select', options: ['Anak-anak', 'Remaja (Teen)', 'Dewasa (Young Adult)', 'Umum'] },
      { id: 'moral', label: 'Moral / Pesan', type: 'text', placeholder: 'Kebaikan mengalahkan...' },
      { id: 'konflik', label: 'Intensitas Konflik', type: 'select', options: ['Rendah (Slice of Life)', 'Sedang', 'Tinggi (Tegang/Mati)'] },
    ]
  },
  puisi: {
    tabTitles: ['Lembar Puisi'],
    centralInput: {
      titleField: 'Diksi Utama / Tema',
      ideaField: 'Injeksi Ide Puisi',
      placeholder: 'Misal: Kehilangan seseorang di stasiun saat gerimis senja...'
    },
    sidebar: [
      { id: 'jenis', label: 'Jenis Puisi', type: 'select', options: ['Soneta', 'Balada', 'Haiku', 'Sajak Bebas', 'Pantun'] },
      { id: 'bait', label: 'Bentuk Bait', type: 'select', options: ['Distikon (2 Baris)', 'Kuatrain (4 Baris)', 'Bebas Kustom'] },
      { id: 'jumlah', label: 'Jumlah Bait (Durasi)', type: 'select', options: ['Singkat (1-3)', 'Sedang (4-6)', 'Panjang (7+)'] },
      { id: 'rima', label: 'Pola Rima Akhir', type: 'select', options: ['Bebas (Tanpa Terikat)', 'A-B-A-B (Silang)', 'A-A-A-A (Lurus)', 'A-A-B-B (Pasangan)'] },
      { id: 'majas', label: 'Dominasi Majas', type: 'select', options: ['Personifikasi', 'Metafora', 'Hiperbola', 'Simile'] },
      { id: 'citraan', label: 'Citraan Indra', type: 'select', options: ['Visual (Penglihatan)', 'Auditori (Pendengaran)', 'Perabaan'] }
    ]
  },
  surat: {
    tabTitles: ['Mode Manuskrip'],
    centralInput: {
      titleField: 'Subjek Surat Cinta',
      ideaField: 'Inti Perasaan / Pesan yang Ingin Disampaikan',
      placeholder: 'Maafkan aku karena harus pergi mengejar impian ke luar negeri...'
    },
    sidebar: [
      { id: 'pengirim', label: 'Nama Pengirim', type: 'text', placeholder: 'Nama Anda / Samaran' },
      { id: 'penerima', label: 'Nama Penerima', type: 'text', placeholder: 'Nama Dia' },
      { id: 'persona', label: 'Sapaan Persona', type: 'select', options: ['Aku & Kamu', 'Saya & Anda', 'Gue & Lu'] },
      { id: 'status', label: 'Status Hubungan', type: 'select', options: ['Crush / PDKT', 'Pasangan Jauh (LDR)', 'Sudah Putus / Mantan', 'Suami/Istri'] },
      { id: 'situasi', label: 'Skenario/Situasi', type: 'select', options: ['Pengakuan Rahasia (Confession)', 'Permintaan Maaf', 'Ulang Tahun / Anniversary', 'Kerinduan (Kangen)'] },
      { id: 'konflik', label: 'Konflik Internal', type: 'text', placeholder: 'Jarak batasi kita...' }
    ]
  },
  pidato: {
    tabTitles: ['Teks Pidato', 'Audio Paragraf'],
    centralInput: {
      titleField: 'Judul Acara / Pidato',
      ideaField: 'Kerangka Utama Pidato',
      placeholder: 'Salam hormat, penghargaan untuk guru-guru, lalu sampaikan pesan...'
    },
    sidebar: [
      { id: 'topik', label: 'Topik Utama', type: 'text', placeholder: 'Pendidikan Emas' },
      { id: 'tujuan', label: 'Tujuan Acara', type: 'select', options: ['Kelulusan / Wisuda', 'Pernikahan', 'Inaugurasi Pejabat', 'Kampanye / Lomba', 'Upacara Nasional'] },
      { id: 'audiens', label: 'Target Audiens', type: 'text', placeholder: 'Siswa, Mahasiswa, atau Pejabat' },
      { id: 'gaya', label: 'Gaya Bahasa', type: 'select', options: ['Khidmat & Formal', 'Inspirasional & Energetik', 'Lucu & Kasual', 'Emosional (Bikin Nangis)'] },
      { id: 'durasi', label: 'Durasi Baca', type: 'select', options: ['Sangat Singkat (2-3 Menit)', 'Sedang (5-10 Menit)', 'Pidato Panjang (Orasi)'] },
      { id: 'salam', label: 'Salam Pembuka', type: 'text', placeholder: 'Assalamualaikum / Namo Buddhaya...' }
    ]
  },
  chatstory: {
    tabTitles: ['Room Chat Editor'],
    centralInput: {
      titleField: 'Grup / Nama Kontak',
      ideaField: 'Garis Besar Situasi Percakapan',
      placeholder: 'Si A salah kirim pesan marah ke Si B padahal harusnya ke sahabatnya...'
    },
    sidebar: [
      { id: 'tokoh_1', label: 'Karakter Kiri (Abu-abu)', type: 'text', placeholder: 'Bastian' },
      { id: 'tokoh_2', label: 'Karakter Kanan (Hijau)', type: 'text', placeholder: 'Andin' },
      { id: 'vibe', label: 'Vibe Percakapan', type: 'select', options: ['Tegang / Berantem', 'Mesra / Bucin', 'Horor Tertunda', 'Miskomedi (Lucu)'] },
      { id: 'panjang', label: 'Estimasi Baris Pesan', type: 'select', options: ['Pendek (10-15 Bubbles)', 'Menengah', 'Panjang (Story)'] }
    ]
  },
  cernak: {
    tabTitles: ['Storybook Anak'],
    centralInput: {
      titleField: 'Judul Cerita',
      ideaField: 'Ide Hewan / Karakter Anak',
      placeholder: 'Seekor rubah kecil yang takut pada gelap...'
    },
    sidebar: [
      { id: 'umur', label: 'Kelompok Umur', type: 'select', options: ['Balita (0-3 Tahun)', 'Pra-Sekolah (4-6)', 'Anak-anak (7-12)'] },
      { id: 'moral', label: 'Nilai Moral Utama', type: 'select', options: ['Kejujuran & Sikap Baik', 'Berani Mengatasi Takut', 'Menghargai Perbedaan', 'Berbagi dengan Teman'] },
      { id: 'ilustrasi', label: 'Format Teks', type: 'radio', options: ['Paragraph Biasa', 'Format per Halaman (Buku Bergambar)'] }
    ]
  },
  kutipan: {
    tabTitles: ['Lembar Kutipan'],
    centralInput: {
      titleField: 'Subjek / Nama Tokoh',
      ideaField: 'Topik / Pesan Kutipan',
      placeholder: 'Cinta yang tak terbalas, kegagalan adalah awal kesuksesan...'
    },
    sidebar: [
      { id: 'gaya', label: 'Gaya Kutipan', type: 'select', options: ['Melankolis / Sedih', 'Motivasional / Semangat', 'Sarkas / Tajam', 'Filosofis / Deep', 'Religius'] },
      { id: 'panjang', label: 'Panjang Teks', type: 'select', options: ['Satu Kalimat (Short)', 'Paragraf Kecil (Long)'] }
    ]
  },
  motivasi: {
    tabTitles: ['Afirmasi Harian'],
    centralInput: {
      titleField: 'Nama Anda / Tujuan',
      ideaField: 'Masalah Yang Dihadapi',
      placeholder: 'Merasa malas menulis, butuh semangat untuk diet...'
    },
    sidebar: [
      { id: 'nada', label: 'Tone Motivasi', type: 'select', options: ['Lembut & Menenangkan', 'Keras & To the Point (Slapped)', 'Inspiratif (Role Model)'] },
      { id: 'format', label: 'Output', type: 'select', options: ['Kalimat Tunggal', 'List 5 Poin', 'Cerita Singkat'] }
    ]
  },
  nonfiksi: {
    tabTitles: ['Manuskrip Non-fiksi'],
    centralInput: {
      titleField: 'Judul Buku / Proyek',
      ideaField: 'Garis Besar Isi / Premis',
      placeholder: 'Panduan menabung untuk Gen-Z, Biografi perjalanan hidup...'
    },
    sidebar: [
      { id: 'kategori', label: 'Kategori', type: 'select', options: ['Biografi / Memoar', 'Self-Development', 'Bisnis & Karir', 'Sejarah', 'Panduan / How-to'] },
      { id: 'target', label: 'Target Pembaca', type: 'text', placeholder: 'Pebisnis muda, Mahasiswa...' },
      { id: 'gaya', label: 'Gaya Bahasa', type: 'select', options: ['Formal & Informatif', 'Narrative (Bercerita)', 'Provokatif / Berani'] }
    ]
  },
  ilmiah: {
    tabTitles: ['Asisten Akademik'],
    centralInput: {
      titleField: 'Judul Penelitian / Makalah',
      ideaField: 'Abstrak / Poin Utama',
      placeholder: 'Pengaruh AI terhadap produktivitas penulis novel di Indonesia...'
    },
    sidebar: [
      { id: 'jenis', label: 'Jenis Dokumen', type: 'select', options: ['Makalah Mahasiswa', 'Jurnal Internasional', 'Tesis / Skripsi', 'Esai Kritis'] },
      { id: 'bahasa', label: 'Standard Bahasa', type: 'select', options: ['Baku (PUEBI)', 'English Academic', 'Semi-Formal'] },
      { id: 'referensi', label: 'Gaya Referensi', type: 'select', options: ['APA Style', 'MLA', 'Harvard', 'Tanpa Referensi'] }
    ]
  },
  medsos: {
    tabTitles: ['Social Media Script'],
    centralInput: {
      titleField: 'Judul Konten / Hook',
      ideaField: 'Pesan / Visual Yang Ingin Disampaikan',
      placeholder: 'POV: Kamu penulis yang baru aja dapet kontrak pertama...'
    },
    sidebar: [
      { id: 'platform', label: 'Platform Utama', type: 'select', options: ['TikTok / Reels', 'Instagram Feed', 'Twitter Thread', 'LinkedIn Post'] },
      { id: 'vibe', label: 'Vibe Konten', type: 'select', options: ['Viral / Trending', 'Aesthetic / Slow', 'Edukatif', 'Komedi / Meme'] }
    ]
  },
  artikel: {
    tabTitles: ['Blog & Artikel SEO'],
    centralInput: {
      titleField: 'Headline / Keywords',
      ideaField: 'Poin-Poin Pembahasan',
      placeholder: '5 Cara Menulis Novel 100rb Kata Sebulan...'
    },
    sidebar: [
      { id: 'seo', label: 'Optimasi SEO', type: 'select', options: ['Sangat Tinggi (LSI)', 'Normal', 'Santai (Human Centric)'] },
      { id: 'gaya', label: 'Tone Penulisan', type: 'select', options: ['Storytelling', 'Listicle (Poin-poin)', 'Berita / Formal'] }
    ]
  },
  video: {
    tabTitles: ['Scriptwriter AI'],
    centralInput: {
      titleField: 'Judul Video / Film',
      ideaField: 'Sinopsis / Plot Singkat',
      placeholder: 'Film pendek tentang mesin waktu yang rusak...'
    },
    sidebar: [
      { id: 'format', label: 'Format Script', type: 'select', options: ['Standard Skenario (Scene)', 'YouTube Voiceover', 'Commercial Ads', 'Short Movie'] },
      { id: 'durasi', label: 'Estimasi Durasi', type: 'select', options: ['1 Menit (Short)', '5-10 Menit', '30 Menit (Long)'] }
    ]
  },
  audio: {
    tabTitles: ['Audio & Podcast'],
    centralInput: {
      titleField: 'Judul Podcast / Drama',
      ideaField: 'Topik Obrolan / Adegan',
      placeholder: 'Podcast horor malam jumat membahas hantu sekolah...'
    },
    sidebar: [
      { id: 'jenis', label: 'Jenis Audio', type: 'select', options: ['Podcast Monolog', 'Podcast Interview', 'Drama Audio / Sandiwara', 'Radio Iklan'] },
      { id: 'suasana', label: 'Ambience', type: 'select', options: ['Mencekam (Horor)', 'Ceria & Energik', 'Tenang / Deep Talk'] }
    ]
  },
  translator: {
    tabTitles: ['Smart Translator'],
    centralInput: {
      titleField: 'Bahasa Tujuan',
      ideaField: 'Teks Yang Ingin Diterjemahkan',
      placeholder: 'Paste teks panjang Anda di sini...'
    },
    sidebar: [
      { id: 'nuansa', label: 'Nuansa Hasil', type: 'select', options: ['Sastrawi (Indah)', 'Harafiah (Kaku)', 'Kasual / Gaul'] },
      { id: 'asal', label: 'Bahasa Asal', type: 'select', options: ['Deteksi Otomatis', 'Inggris', 'Indonesia', 'Jepang', 'Korea'] }
    ]
  },
  doctranslator: {
    tabTitles: ['Full Document Translator'],
    centralInput: {
      titleField: 'Judul Dokumen / Nama File',
      ideaField: 'Isi Ringkasan / Teks Full',
      placeholder: 'Masukkan seluruh isi dokumen yang ingin diterjemahkan...'
    },
    sidebar: [
      { id: 'format', label: 'Output File', type: 'select', options: ['Teks Bersih', 'Format Buku (Chapter)', 'Bilingual (Asal + Hasil)'] },
      { id: 'prioritas', label: 'Prioritas', type: 'select', options: ['Kecepatan (Flash)', 'Akurasi Terminologi (Pro)'] }
    ]
  },
  default: {
    tabTitles: ['Mode Generator Universal'],
    centralInput: {
      titleField: 'Label Objek',
      ideaField: 'Instruksi Penuh / Ide Konstruksi',
      placeholder: 'Ketik bahan atau deskripsi di sini...'
    },
    sidebar: [
      { id: 'jenis', label: 'Tujuan Eksekusi', type: 'select', options: ['Draft Kasar', 'Format Sempurna (SEO)', 'Meringkas'] },
      { id: 'bahasa', label: 'Bahasa Output', type: 'select', options: ['Indonesia', 'Inggris', 'Santai / Gaul', 'Melayu'] },
      { id: 'nada', label: 'Nada / Tone Dasar', type: 'select', options: ['Informatif Lengkap', 'Estetik', 'Komersial / Menjual', 'Meyakinkan (Persuasif)'] }
    ]
  }
};
