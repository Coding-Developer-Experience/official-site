# PRODUCT REQUIREMENTS DOCUMENT

| Item | Isi |
| --- | --- |
| Nama Produk | Website Xcode |
| Versi | 0.5 |
| Tanggal | 18 November 2026 |
| Penulis | Agus (Project Manager) |
| Status | Draft |
| Terakhir diperbarui | 18 November 2026 |

Dokumen ini adalah acuan kebutuhan fitur dan spesifikasi website Xcode. Catatan rapat dan tindak lanjut disimpan di dokumen terpisah.

**Legenda status:** **\[Disepakati\]** sudah diputuskan tim atau PM. **\[Usulan\]** default yang diusulkan, berlaku sampai tim mengubahnya. **\[PT-n\]** hal yang belum diputuskan; rinciannya ada di bagian 11 (Pertanyaan Terbuka) dengan nomor yang sama.

## Daftar Isi

1. Ringkasan Eksekutif
2. Gambaran Produk
3. Tujuan dan Sasaran
4. Persona dan User Story
5. Fitur dan Kebutuhan
6. Pengalaman Pengguna dan Desain
7. Kebutuhan Teknis
8. Metrik Keberhasilan
9. Linimasa dan Milestone
10. Dependensi dan Risiko
11. Pertanyaan Terbuka
12. Lampiran

## 1. Ringkasan Eksekutif

Website Xcode adalah media pengenalan komunitas Xcode sekaligus pusat informasi, materi belajar, dan arsip kegiatannya. Komunitas terbuka untuk mahasiswa non-TI, dan login hanya untuk mahasiswa UIN. **\[Disepakati\]**

Alurnya meniru platform belajar seperti Dicoding: login, baca materi, absen, kumpul tugas. Area publik dan area internal dibedakan hak akses, dan admin mengelola konten lewat halaman admin. **\[Disepakati\]**

Alur kerja tim: seluruh anggota membuat prototype landing page, tim memilih satu sebagai standar lewat penilaian, lalu pekerjaan dibagi per halaman (Login, Absen, Materi, Tugas dan pengumpulan, Admin). Setiap halaman memakai navbar dan footer bersama dari landing terpilih. **\[Disepakati\]**

## 2. Gambaran Produk

### 2.1 Pernyataan Masalah

Masalah pengguna saat ini belum dikonfirmasi dengan pengurus. **\[PT-11\]**

### 2.2 Gambaran Solusi

Satu website dengan landing publik, area anggota (materi, absensi, tugas, profil, event), dan area admin. Pembedanya adalah pencatatan kehadiran, progres belajar, dan poin dalam satu akun. **\[Usulan\]**

### 2.3 Target Pasar

- **Utama:** mahasiswa UIN peserta Xcode, termasuk non-TI (punya NIM dan email ac.id UIN). **\[Disepakati\]**
- **Sekunder:** pengunjung publik yang melihat landing, dokumentasi, dan portofolio anggota.
- **Di luar cakupan login:** peserta dari luar UIN tidak punya jalur khusus. **\[Disepakati\]**
- **Jumlah pengguna:** belum ada angka resmi. **\[PT-12\]**

### 2.4 Lanskap Kompetitor

Tidak ada kompetitor komersial. Dicoding hanya acuan alur belajar. **\[Disepakati\]**

## 3. Tujuan dan Sasaran

### 3.1 Tujuan Organisasi

- Memperkenalkan Xcode dan menjadi arsip resmi kegiatannya. **\[Disepakati\]**
- Menyediakan wadah belajar dan pelacakan keaktifan anggota. **\[Disepakati\]**
- Mengurangi pekerjaan manual pengurus lewat halaman admin. **\[Usulan\]**

### 3.2 Tujuan Pengguna

- Anggota dapat membaca materi, melihat progres, absen, dan mengumpulkan tugas dalam satu akun.
- Pengunjung memahami Xcode, melihat portofolio anggota, dan menghubungi pengurus.
- Admin dapat mengelola konten tanpa mengubah kode.

### 3.3 Kriteria Keberhasilan

- Fitur yang dikerjakan lolos pengujian akhir tanpa bug blocker. **\[Usulan\]**
- Anggota dapat login, membuka materi, dan absen dalam waktu kurang dari satu menit. **\[Usulan\]**

## 4. Persona dan User Story

### 4.1 Persona

- **Anggota:** mahasiswa UIN peserta Xcode. Tujuan: belajar, tercatat hadir, kumpul tugas, punya portofolio. Titik sakit belum diketahui. **\[PT-20\]**
- **Admin/pengurus:** mengelola materi, sesi, tugas, event, dan pengguna. Admin awal: Agus, Rifai, dan Adit, bisa diganti kemudian. **\[Disepakati\]**
- **Pengunjung:** membuka landing dan halaman portofolio tanpa login.

### 4.2 User Story

- Sebagai pengunjung, saya ingin melihat profil, manfaat, pemateri, dan FAQ Xcode agar tahu apakah ingin bergabung.
- Sebagai pengunjung, saya ingin melihat portofolio anggota di halaman /members.
- Sebagai pengunjung, saya ingin mengirim pesan lewat Contact Us.
- Sebagai anggota, saya ingin login agar identitas saya tercatat.
- Sebagai anggota, saya ingin membaca materi dan melihat progres.
- Sebagai anggota, saya ingin absen pada sesi yang berjalan.
- Sebagai anggota, saya ingin mengumpulkan tugas sebelum batas waktu agar mendapat poin.
- Sebagai anggota, saya ingin mengelola profil dan portofolio saya sendiri.
- Sebagai admin, saya ingin mengelola konten lewat halaman admin.

## 5. Fitur dan Kebutuhan

### 5.1 Fitur Inti

| Fitur | Deskripsi | Status |
| --- | --- | --- |
| Landing page | Informasi Xcode, manfaat, pemateri, Contact Us, FAQ | Disepakati |
| Navbar dan footer bersama | Satu file terpisah yang diimpor semua halaman | Disepakati |
| Login dan pengguna | Akun mahasiswa UIN, peran admin dan anggota | Disepakati |
| Materi | Kelas, modul, progres | Disepakati |
| Absensi | Kehadiran per sesi | Disepakati |
| Tugas dan poin | Batas waktu, poin dari ketepatan | Disepakati |
| Profil dan portofolio | Halaman publik /members, edit oleh pemilik | Disepakati |
| Event dan dokumentasi | Daftar event, arsip foto | Disepakati |
| Halaman admin | Dibuat setelah halaman publik, dikerjakan manual (bukan paket admin siap pakai) | Usulan, belum dikonfirmasi seluruh tim (PT-21) |

### 5.2 Kebutuhan Fungsional

**Landing page**

- Bagian tentang Xcode, manfaat, pemateri, Contact Us, FAQ. **\[Disepakati\]**
- Acuan landing adalah versi buatan Kak Adit, mengikuti pola landing HMTI. **\[Disepakati\]**
- Form Contact Us menyimpan pesan dengan validasi dan pembatasan laju. **\[Usulan\]** Tujuan pengiriman pesan: **\[PT-14\]**
- Fungsi tombol "Daftar sekarang" pada landing belum jelas karena tidak ada pendaftaran mandiri. **\[PT-5\]**

**Navbar dan footer**

- Berasal dari landing terpilih sebagai file terpisah yang diimpor semua halaman. **\[Disepakati\]**
- Isi navbar menyesuaikan status login dan peran. **\[Usulan\]**

**Login dan pengguna**

- Login hanya untuk mahasiswa UIN. **\[Disepakati\]**
- Tidak ada fitur daftar mandiri; akun dibuat dari data yang sudah ada. **\[Usulan\]** Sudah disetujui Adit, belum dibahas dengan anggota lain. **\[PT-15\]**
- Metode login (email ac.id atau NIM): **\[PT-1\]**
- Sumber daftar mahasiswa yang berhak login: **\[PT-2\]**
- Cara pembuatan akun dari data tersebut: **\[PT-3\]**
- Pembatasan laju login: **\[PT-4\]**
- Peran admin dan anggota menentukan halaman tujuan setelah login. **\[Usulan\]**
- Penanganan akses hilang dan anggota lulus: **\[PT-16\]**

**Materi**

- Struktur Kelas > Modul > Konten, progres per anggota, tombol sebelumnya dan berikutnya. **\[Usulan\]**
- Data dummy awal harus berbentuk sama dengan skema database. **\[Usulan\]**

**Absensi**

- Admin membuka dan menutup sesi; anggota absen sekali per sesi. **\[Usulan\]**
- Pencegahan titip absen lewat kode sesi dan jendela waktu. **\[Usulan\]**

**Tugas dan poin**

- Setiap tugas punya batas pengumpulan; ketepatan waktu memengaruhi poin. **\[Disepakati\]**
- Waktu pengumpulan dicatat server. Poin disimpan sebagai catatan riwayat (ledger). **\[Usulan\]**
- Angka poin, toleransi, pengurangan, dan bentuk pengumpulan: **\[PT-10\]**

**Profil dan portofolio**

- URL publik portofolio: /members. **\[Disepakati\]**
- Pemilik akun mengedit profilnya sendiri setelah login. **\[Usulan\]**
- NIM dan email tidak tampil di halaman publik. **\[Usulan\]**
- Field yang tampil publik: **\[PT-6\]**. Batas ukuran gambar: **\[PT-7\]**

**Event dan dokumentasi**

- Daftar event dan galeri foto per event, dikelola admin. **\[Usulan\]**
- Batas ukuran media mengikuti kuota Supabase Storage. **\[PT-8\]**
- Video latar landing: target 3 MB, maksimum 5 MB. **\[Disepakati\]**

**Halaman admin**

- Mengelola materi, konten landing, event, dokumentasi, tugas, sesi, pengguna, dan pesan kontak. **\[Usulan\]**
- Semua rute admin hanya untuk peran admin. **\[Usulan\]**

### 5.3 Kebutuhan Non-Fungsional

- **Performa:** halaman utama dimuat di bawah 3 detik pada koneksi kampus biasa. **\[Usulan\]**
- **Keamanan:** autentikasi lewat Supabase Auth, otorisasi lewat kebijakan RLS, validasi input, pembatasan laju login dan Contact Us. **\[Usulan\]**
- **Privasi:** NIM dan email tidak ditampilkan publik. **\[Usulan\]**
- **Aksesibilitas:** kontras warna memadai dan navigasi keyboard dasar. **\[Usulan\]**
- **Perangkat:** browser modern dan ponsel (responsif). **\[Usulan\]**

## 6. Pengalaman Pengguna dan Desain

### 6.1 Alur Pengguna

1. Pengunjung membuka landing, melihat portofolio di /members, atau memilih Login.
2. Mahasiswa UIN login; sistem memverifikasi ke data pengguna.
3. Admin diarahkan ke halaman admin; anggota ke area anggota.
4. Anggota membuka materi, absen pada sesi, dan mengumpulkan tugas.
5. Saat tugas dikumpulkan, server memeriksa waktu terhadap batas dan mencatat poin.

### 6.2 Wireframe dan Mockup

Acuan visual: landing HMTI (hero gambar, area konten terang, footer gelap) dan landing prototype buatan Kak Adit. Halaman berita HMTI sepenuhnya gelap, jadi bukan acuan landing. Halaman materi mengikuti alur gaya Dicoding (sidebar modul, progres, area konten). Tautan desain atau folder prototype: **\[PT-19\]**

### 6.3 Prinsip Desain

- Warna dominan oranye; biru hanya aksen kecil. **\[Disepakati\]**
- Mengikuti pola landing HMTI. **\[Disepakati\]**
- Aset resmi Xcode (logo, video, ilustrasi) dirancang Kak Haikal, mantan pengurus HMTI. **\[Disepakati\]**
- Navbar dan footer dipakai ulang di semua halaman. **\[Disepakati\]**

## 7. Kebutuhan Teknis

### 7.1 Arsitektur

Aplikasi Next.js dengan Supabase sebagai backend. Rute publik, anggota, dan admin dipisahkan berdasarkan peran. Logika form dan routing dikerjakan per halaman. **\[Disepakati\]** Layout (navbar dan footer) menjadi komponen terpisah.

### 7.2 Tumpukan Teknologi

| Lapisan | Pilihan | Status |
| --- | --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind 4 | Disepakati |
| Backend | Supabase (Auth, Postgres, Storage, RLS), migrasi lewat Supabase CLI | Disepakati |
| Database | PostgreSQL (lewat Supabase), skema dipegang Adit | Disepakati |
| Hosting | Vercel; Xcode berupa project sendiri yang ditampilkan di domain HMTI | Disepakati |
| Akun dan kuota Supabase | Akun HMTI, paket gratis; kuota belum diketahui | PT-8 |
| Cara deploy dan akun Vercel | Belum diketahui | PT-9 |

### 7.3 Kebutuhan Integrasi

Tidak ada integrasi pihak ketiga di luar Supabase dan Vercel. Layanan email untuk Contact Us: **\[PT-14\]**

### 7.4 Kebutuhan Data

Tipe data mengikuti PostgreSQL (uuid, timestamptz, boolean, text). Skema final dipegang Adit.

| Entitas | Field utama | Relasi |
| --- | --- | --- |
| users/profiles | id, email ac.id, NIM, nama, peran, status | terkait akun Supabase Auth |
| portfolios | user\_id, bio, tautan, foto | satu per pengguna |
| classes, modules | judul, urutan, isi | modul milik kelas |
| module\_progress | user\_id, module\_id, selesai\_pada | pengguna x modul |
| sessions, attendance | sesi dan kehadiran | unik per pengguna dan sesi |
| assignments, submissions | tugas dan pengumpulan | milik pengguna dan tugas |
| points\_ledger | user\_id, sumber, delta, alasan | milik pengguna |
| events, documentation | event dan media | dokumentasi milik event |
| speakers, faqs, contact\_messages | konten landing | berdiri sendiri |

### 7.5 Kebutuhan Keamanan

Supabase Auth untuk autentikasi, kebijakan RLS untuk akses data, dan akses admin dibatasi peran. **\[Usulan\]**

## 8. Metrik Keberhasilan

### 8.1 KPI

Angka berikut usulan tanpa data dasar. **\[Usulan\]**

- Fitur yang dikerjakan lolos pengujian tanpa bug blocker.
- Waktu dari login ke absen kurang dari 1 menit.
- Persentase anggota aktif yang punya akun: target belum ditentukan. **\[PT-12\]**

### 8.2 Analitik dan Umpan Balik

Data bawaan sistem: kehadiran, progres, pengumpulan, poin. Analitik pengunjung dan mekanisme umpan balik: **\[PT-13\]**

## 9. Linimasa dan Milestone

### 9.1 Rencana Rilis

| Fase | Isi | Status |
| --- | --- | --- |
| 1. Prototype landing | Semua anggota membuat prototype di branch prototype/nama; hasil di folder Drive bersama; penilaian lewat Google Form (Kurang/Cukup/Baik); PM menentukan bila seri | Direncanakan kumpul 5 Nov, penilaian 6 Nov, penetapan 7 Nov; hasil akhir **PT-18** |
| 2. Halaman publik dan login | Dibagi per halaman; database mulai di tahap login | Tanggal **PT-17** |
| 3. Absen, tugas, poin | Mengikuti skema dan RLS | Tanggal **PT-17** |
| 4. Halaman admin | Setelah halaman publik | Tanggal **PT-17** |
| 5. Pengujian | Cek integrasi dan perbaikan | Tanggal **PT-17** |

Jadwal dipengaruhi UTS dan proker Xcode yang berselang-seling. Target awal satu bulan dari rapat perdana tidak lagi realistis; target baru: **\[PT-17\]**

### 9.2 Pembagian Backend

| Anggota | Tanggung jawab |
| --- | --- |
| Adit | Skema database, login dan pengguna, portofolio, konten landing dan kontak |
| Rifai | Materi: kelas, modul, progres |
| Indah | Absensi, tugas, poin |

Pembagian masih bisa disesuaikan. **\[Disepakati\]**

## 10. Dependensi dan Risiko

### 10.1 Dependensi

- Daftar mahasiswa yang berhak login dan penyedianya (PT-2): menghambat login.
- Akun dan kuota Supabase HMTI (PT-8): menghambat database dan penyimpanan media.
- Cara deploy dan akses Vercel (PT-9): menghambat deployment.
- Aturan poin dari pengurus (PT-10): menghambat fitur tugas.

### 10.2 Risiko dan Mitigasi

- **Risiko:** jadwal kuliah padat dan UTS. **Mitigasi:** jadwal prototype dan tugas BE disesuaikan; tanggal baru ditetapkan setelah tim menjawab soal beban.
- **Risiko:** kuota gratis Supabase dan batas Vercel Hobby. **Mitigasi:** batasi ukuran media (video latar maksimum 5 MB), cek kuota sebelum unggahan besar.
- **Risiko:** kode dan aset HMTI berlisensi All Rights Reserved. **Mitigasi:** gunakan aset Xcode sendiri, dan minta izin tertulis bila kode atau aset HMTI dipakai. Prioritas rendah untuk komunitas kecil.
- **Risiko:** hasil AI agent tidak konsisten. **Mitigasi:** spesifikasi singkat per halaman (tujuan, komponen, data, hak akses) dengan PRD ini sebagai induk.
- **Risiko:** kontrak data BE tidak cocok dengan FE. **Mitigasi:** setiap BE memeriksa kontrak data bagiannya sebelum halaman dikerjakan.

## 11. Pertanyaan Terbuka

Nomor PT dirujuk dari bagian lain dokumen ini. Hapus baris yang sudah terjawab dan pindahkan jawabannya ke bagian terkait.

### 11.1 Login dan Pengguna

| ID | Pertanyaan | Penjawab | Menghambat |
| --- | --- | --- | --- |
| PT-1 | Login memakai email ac.id atau NIM? Jika email, apakah Supabase Auth bisa dibatasi ke domain UIN? | PM + Adit | Login |
| PT-2 | Siapa yang menyediakan daftar mahasiswa yang berhak login (nama, NIM, email ac.id), dalam format apa, dan siapa yang memperbaruinya? Usulan sumber: Sekretaris Umum HMTI. | Sekretaris Umum HMTI | Login |
| PT-3 | Akun dibuat dari data tersebut lewat impor massal atau undangan satu per satu? | Adit | Login |
| PT-4 | Pembatasan laju login memakai fitur bawaan Supabase atau dibuat sendiri? | Adit | Keamanan login |
| PT-5 | Apa fungsi tombol "Daftar sekarang" di landing? Diubah atau dihapus? | Adit | Landing |
| PT-15 | Apakah anggota lain setuju akun dibuat tanpa daftar mandiri? (Baru Adit yang setuju.) | Seluruh tim | Login |
| PT-16 | Bagaimana penanganan akses hilang dan anggota lulus? Usulan: nonaktifkan akun tanpa menghapus riwayat kehadiran dan poin. | PM | Pengelolaan akun |

### 11.2 Portofolio dan Konten

| ID | Pertanyaan | Penjawab | Menghambat |
| --- | --- | --- | --- |
| PT-6 | Field portofolio apa yang tampil publik di /members? | PM + Adit | Skema portofolio |
| PT-7 | Berapa batas ukuran gambar profil? | PM | Unggah profil |
| PT-14 | Pesan Contact Us dikirim ke email pengurus atau cukup disimpan di database? | Tim | Contact Us |
| PT-19 | Di mana tautan desain atau folder prototype untuk lampiran? | PM | Lampiran |

### 11.3 Infrastruktur

| ID | Pertanyaan | Penjawab | Menghambat |
| --- | --- | --- | --- |
| PT-8 | Berapa kuota gratis Supabase HMTI (database dan Storage), dan cukup untuk foto dokumentasi dan video latar? | Kak Rifai atau Kak Hafiz | Penyimpanan media |
| PT-9 | Bagaimana proyek Xcode dideploy ke Vercel (Git atau CLI), akun siapa, dan siapa yang memberi akses deploy? | Kak Rifai atau Kak Hafiz | Deployment |

### 11.4 Kebutuhan dari Pengurus Xcode

| ID | Pertanyaan | Penjawab | Menghambat |
| --- | --- | --- | --- |
| PT-10 | Poin tugas: berapa besarnya, berapa lama toleransi terlambat, ada pengurangan atau tidak, dan bentuk pengumpulan apa (link, file, teks)? | Pengurus Xcode | Fitur tugas |
| PT-11 | Materi, absensi, dan tugas sekarang dikelola lewat apa, dan apa yang paling merepotkan? | Pengurus Xcode | Bagian 2.1 |
| PT-12 | Berapa peserta aktif dan berapa target pemilik akun? | Pengurus Xcode | KPI |
| PT-13 | Perlu analitik pengunjung landing dan mekanisme umpan balik apa? | Pengurus Xcode | Bagian 8.2 |
| PT-20 | Apa titik sakit anggota saat ini (lewat wawancara singkat)? | PM | Persona |

### 11.5 Perencanaan

| ID | Pertanyaan | Penjawab | Menghambat |
| --- | --- | --- | --- |
| PT-17 | Berapa tanggal fase 2 sampai 5 dan target selesai baru? | PM | Jadwal |
| PT-18 | Prototype mana yang terpilih sebagai standar setelah penilaian 7 Nov? | PM | Fase 2 |
| PT-21 | Apakah seluruh tim setuju halaman admin dibuat manual setelah halaman publik? | Seluruh tim | Fase 4 |

## 12. Lampiran

### 12.1 Referensi

- Notulensi rapat perdana dan dokumen tindak lanjut (terpisah)
- Flowchart arsitektur tim
- Landing HMTI dan README repo HMTI (Next.js 16, React 19, TypeScript, Tailwind 4, Supabase)
- Palet warna dan referensi UI awal

### 12.2 Glosarium

- **PRD:** Product Requirements Document.
- **HMTI:** Himpunan Mahasiswa Teknologi Informasi.
- **RLS:** Row Level Security, aturan akses per baris di Postgres/Supabase.
- **BE / FE:** Backend / Frontend.
- **Ledger:** catatan riwayat transaksi, di sini untuk poin.
- **PT:** Pertanyaan Terbuka (bagian 11).

### 12.3 Catatan Perubahan

- v0.1 sampai v0.3 (22 Okt 2026): draf awal, terjemahan, dan penyusunan mengikuti template.
- v0.4 (18 Nov 2026): stack diganti ke Next.js dan Supabase (Postgres), login khusus mahasiswa UIN tanpa daftar mandiri, URL /members, arah visual HMTI, pembagian BE terbaru.
- v0.5 (18 Nov 2026): semua placeholder dihapus dan dipindah ke bagian 11 sebagai PT-1 sampai PT-21; teks merujuk ke nomor PT.
