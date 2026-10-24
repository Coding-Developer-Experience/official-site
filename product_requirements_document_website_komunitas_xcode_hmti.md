# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Website Komunitas Ngoding Xcode — HMTI

| Atribut Dokumen | Detail Informasi |
| :--- | :--- |
| **Nama Produk** | Website Komunitas & Platform Belajar Xcode (HMTI) |
| **Versi Dokumen** | 1.0 (Final Locked Architecture — Single Source of Truth) |
| **Tanggal Pembaruan** | 22 Oktober 2026 |
| **Status Dokumen** | **Disepakati & Dikunci (Ready for Development)** |
| **Target Pengguna** | Anggota Internal HMTI (50–60 Pengguna Aktif) & Pengunjung Publik |
| **Lingkungan Hosting** | Shared Hosting / Server Eksisting dengan Database MySQL |

---

## Daftar Isi
1. [Ringkasan Eksekutif & Konteks Proyek](#1-ringkasan-eksekutif--konteks-proyek)
2. [Laporan Sinkronisasi Tim & Peta Koherensi Arsitektur](#2-laporan-sinkronisasi-tim--peta-koherensi-arsitektur)
3. [Gambaran Produk & Solusi](#3-gambaran-produk--solusi)
4. [Persona Pengguna & User Stories](#4-persona-pengguna--user-stories)
5. [Spesifikasi Visual & Panduan UI/UX (Design System)](#5-spesifikasi-visual--panduan-uiux-design-system)
6. [Kebutuhan Fungsional & Spesifikasi Fitur](#6-kebutuhan-fungsional--spesifikasi-fitur)
7. [Arsitektur Teknis & Standar Profesional](#7-arsitektur-teknis--standar-profesional)
8. [Skema Database Relasional (MySQL)](#8-skema-database-relasional-mysql)
9. [Kontrak Data & Spesifikasi Endpoint (API / Route Contract)](#9-kontrak-data--spesifikasi-endpoint-api--route-contract)
10. [Aturan Bisnis: Sistem Absensi, Tugas GitHub, & Buku Besar Poin](#10-aturan-bisnis-sistem-absensi-tugas-github--buku-besar-poin)
11. [Kebutuhan Non-Fungsional & Keamanan](#11-kebutuhan-non-fungsional--keamanan)
12. [Mitigasi Risiko & Daftar Pemeriksaan Kualitas (QA)](#12-mitigasi-risiko--daftar-pemeriksaan-kualitas-qa)

---

## 1. Ringkasan Eksekutif & Konteks Proyek

**Website Xcode** adalah platform web resmi untuk komunitas pemrograman (**Xcode**) di bawah naungan **Himpunan Mahasiswa Teknologi Informasi (HMTI)**. Proyek ini dibangun dari nol (*greenfield*) karena sebelumnya komunitas Xcode belum memiliki platform digital terpusat untuk mengelola kegiatan belajar-mengajar, pencatatan kehadiran, pengumpulan tugas proyek, maupun etalase karya anggota.

Website ini menggabungkan **tiga fungsi utama** dalam satu ekosistem terpadu:
1. **Etalase Publik & Branding Komunitas (Gaya *GitHub Discussions*):** Memperkenalkan profil Xcode, manfaat bergabung, profil pemateri/mentor, dokumentasi kegiatan, daftar *event*, FAQ, serta menampilkan **Portofolio Publik** karya anggota HMTI kepada khalayak luas.
2. **Learning Management System / LMS Internal (Gaya *Dicoding Classroom*):** Ruang belajar terstruktur tempat anggota login menggunakan **NIM**, membaca modul materi ngoding (teks, ilustrasi, dan potongan kode), memantau *progress bar* penyelesaian materi, melakukan presensi/absensi sesi pertemuan, dan mengumpulkan tugas melalui tautan repositori **GitHub**.
3. **Sistem Gamifikasi Poin & Panel Admin (CMS):** Pencatatan poin keaktifan anggota berbasis riwayat transaksi (*Points Ledger*) dari ketepatan waktu pengumpulan tugas dan kehadiran, serta halaman manajemen konten (CMS) agar pengurus Xcode dapat mengelola materi, sesi absensi, dan event tanpa perlu mengubah kode program.

---

## 2. Laporan Sinkronisasi Tim & Peta Koherensi Arsitektur

Bagian ini berfungsi sebagai panduan penyelarasan kerja antar-divisi (Frontend dan Backend) agar tidak terjadi tumpang tindih (*code duplication*) atau ketidakcocokan struktur data.

### 2.1 Pembagian Fokus Tim Saat Ini
* **Divisi Landing Page:**
  * **Frontend (FE):** Kak Rahman & Gehan
  * **Backend (BE):** Kak Rifai & Indah
* **Divisi Ruang Belajar / Materi:**
  * **Frontend (FE):** Kak Alam & Ayu
  * **Backend (BE):** Kak Adit & Zira

### 2.2 Aturan Koherensi & Pencegahan Konflik (*Anti-Overlap Rules*)
1. **Satu Komponen Layout Utama (`AppLayout` / `MainLayout`):**
   * `Navbar` dan `Footer` adalah komponen bersama (*shared components*). Tim FE Landing dan Tim FE Materi **dilarang** membuat file Navbar/Footer terpisah.
   * **Catatan Khusus Halaman Materi (Gaya Dicoding):** Saat anggota masuk ke dalam **Ruang Baca Modul** (`/learn/{class_slug}/module/{module_slug}`), halaman menggunakan **`ClassroomLayout`** (tanpa Footer besar di bawah, melainkan memiliki *Top Navigation Bar* khusus "Kembali ke Koridor Kelas" dan *Collapsible Left Sidebar* daftar modul agar fokus penuh pada layar baca).
2. **Keseragaman Struktur Data Dummy & Database:**
   * Selama pengembangan antarmuka awal, seluruh data *dummy* (JSON/Array) yang dipakai oleh tim FE **wajib** menggunakan nama atribut (*key/field*) yang sama persis dengan kolom tabel MySQL yang didefinisikan pada **Bagian 8** dan **Bagian 9** dokumen ini.
3. **Standar Penyimpanan File di Hosting Eksisting:**
   * Karena aplikasi akan ditempatkan pada **hosting eksisting berbasis MySQL**, dilarang menyimpan *file binary* (gambar/PDF/ZIP) di dalam kolom `BLOB` database maupun meminta anggota mengunggah file proyek berukuran besar.
   * Gambar profil, banner event, dan ilustrasi materi disimpan di sistem direktori server (`storage/app/public/`) dengan batas maksimal **2 MB per gambar (format WebP/JPG/PNG)**, sedangkan tugas anggota **wajib dikumpulkan dalam bentuk URL Repositori GitHub**.

---

## 3. Gambaran Produk & Solusi

### 3.1 Pernyataan Masalah (*Problem Statement*)
Komunitas Xcode sebelumnya belum memiliki platform khusus. Tanpa sistem terpusat:
* Materi pelatihan ngoding tidak terdokumentasi secara berurutan, sehingga anggota kesulitan mengulang materi atau mengetahui sejauh mana progres belajar mereka.
* Pengurus kesulitan memantau kehadiran sesi mingguan dan menilai kedisiplinan anggota dalam menyelesaikan tugas koding.
* Karya dan proyek yang berhasil dibuat oleh anggota selama mengikuti Xcode tidak memiliki wadah pameran (*showcase*) yang dapat dilihat secara publik sebagai portofolio akademik maupun profesional.

### 3.2 Solusi yang Dihadirkan
Membangun aplikasi web terintegrasi berbasis **Laravel & MySQL** yang ramah bagi tim pengembang pemula namun menerapkan standar industri:
* **Autentikasi Berbasis Database menggunakan NIM:** Menjamin hanya anggota HMTI terdaftar yang dapat mengakses ruang kelas, mencatat progres, absen, dan mengumpulkan tugas.
* **Ruang Materi Berbasis Markdown:** Memudahkan penulisan tutorial koding lengkap dengan blok kode (*syntax highlighting*) dan gambar ilustrasi.
* **Portofolio Anggota Bersifat Publik:** Setiap anggota memiliki halaman profil publik (`/portfolio/{nim}`) yang menampilkan bio, tautan GitHub/LinkedIn, dan daftar proyek yang telah dikerjakan di Xcode.

---

## 4. Persona Pengguna & User Stories

### 4.1 Persona Pengguna
1. **Anggota Xcode (Mahasiswa HMTI — 50–60 Orang):**
   * Mengakses web melalui laptop saat sesi praktik ngoding dan melalui ponsel pintar (*mobile*) saat mengecek informasi event atau melakukan absensi cepat.
   * Ingin materi yang rapi, jelas progresnya, mudah absen, dan bangga ketika portofolionya bisa diakses publik.
2. **Admin / Pengurus Inti & Mentor Xcode:**
   * Mengelola kurikulum kelas, menulis bab & modul materi, membuka kode sesi absensi saat acara berlangsung, membuat penugasan, dan memantau poin anggota lewat CMS.
3. **Pengunjung Publik (Mahasiswa Baru, Pihak Jurusan/Kampus, Rekruter):**
   * Melihat profil komunitas Xcode di halaman utama, melihat dokumentasi kegiatan, melihat karya/portofolio anggota, dan menghubungi pengurus lewat formulir *Contact Us*.

### 4.2 Daftar User Stories Inti

| ID | Peran | User Story (Kebutuhan) | Kriteria Penerimaan (*Acceptance Criteria*) |
| :--- | :--- | :--- | :--- |
| **US-01** | Pengunjung | Sebagai pengunjung, saya ingin melihat informasi lengkap tentang Xcode, manfaat, pemateri, event, dokumentasi, dan FAQ di halaman utama. | Landing page tampil responsif dengan gaya visual *GitHub Discussions*, memuat data dinamis dari database. |
| **US-02** | Pengunjung | Sebagai pengunjung, saya ingin mengirim pesan/pertanyaan melalui form *Contact Us*. | Pesan tersimpan di tabel `contact_messages`, memiliki validasi input dan *rate-limiting* (maks. 3 pesan/10 menit per IP) untuk mencegah *spam*. |
| **US-03** | Pengunjung | Sebagai pengunjung, saya ingin melihat halaman Portofolio Publik anggota Xcode. | Halaman `/members` dan `/members/{nim}` dapat diakses publik tanpa login, menampilkan nama, bio, proyek, dan lencana poin*(tanpa mengekspos data sensitif)*. |
| **US-04** | Anggota | Sebagai anggota, saya ingin login menggunakan NIM dan Password agar progres belajar saya tersimpan di akun saya. | Sistem memverifikasi NIM & Password ke tabel `users` di database MySQL dan mengarahkan pengguna sesuai perannya (`member` atau `admin`). |
| **US-05** | Anggota | Sebagai anggota, saya ingin membaca materi per modul, melihat persentase *progress bar*, dan menandai modul selesai. | Halaman ruang belajar menampilkan *sidebar* bab & modul (gaya Dicoding), mencatat status selesai di tabel `module_progress`, dan memperbarui persentase kelas secara otomatis. |
| **US-06** | Anggota | Sebagai anggota, saya ingin melakukan absensi pada sesi pertemuan yang sedang berlangsung menggunakan kode sesi. | Anggota memasukkan kode singkat (6 karakter) pada sesi yang sedang aktif (`buka <= waktu_sekarang <= tutup`), tercatat 1 kali per sesi, dan otomatis mendapat poin kehadiran. |
| **US-07** | Anggota | Sebagai anggota, saya ingin mengumpulkan tugas dengan menempelkan link repositori GitHub sebelum batas waktu. | Sistem memvalidasi format URL GitHub (`https://github.com/...`), mencatat waktu server saat dikumpulkan, dan otomatis menghitung poin berdasarkan ketepatan waktu. |
| **US-08** | Anggota | Sebagai anggota, saya ingin mengelola profil dan menambahkan daftar proyek di portofolio saya. | Anggota dapat mengubah foto profil, bio, link sosial, serta menambah/mengedit item proyek portofolio yang akan tampil ke publik. |
| **US-09** | Admin | Sebagai admin, saya ingin mengelola seluruh data (pengguna/NIM, kelas, modul, absensi, tugas, event, konten landing) lewat dasbor CMS. | Seluruh fitur CRUD berjalan di rute `/admin/*` yang dilindungi oleh *middleware* khusus peran `admin`. |

---

## 5. Spesifikasi Visual & Panduan UI/UX (Design System)

Bagian ini mengunci arah desain berdasarkan palet warna dan dua gambar referensi utama yang telah ditetapkan.

### 5.1 Palet Warna Resmi (Dikunci: Palet B — *Light Theme Default*)
Desain antarmuka utama menggunakan tema terang yang hangat dan bersih (*Ivory Light*), dipadukan dengan biru tua berwibawa untuk teks/navigasi serta aksen oranye untuk elemen interaktif utama.

| Peran Warna | Nama Warna | Kode Hex | Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| **Background Primary** | Putih Gading (*Warm Ivory*) | `#F4F2EF` | Latar belakang utama halaman publik dan dasbor anggota. |
| **Surface / Card** | Putih Bersih (*Pure White*) | `#FFFFFF` | Kartu kelas, kotak FAQ, *sidebar* putih, *modal*, dan kontainer form. |
| **Brand Primary / Text** | Biru Tua (*Deep Navy*) | `#213E60` | Warna teks judul utama, latar *Navbar/Footer* opsional, serta elemen struktural. |
| **Accent / Primary CTA** | Oranye Xcode (*Vibrant Orange*) | `#E68C3A` | Tombol aksi utama (*Primary Button*), *badge* sorotan, *progress bar* aktif. |
| **Secondary Accent** | Biru Muda (*Soft Sky Blue*) | `#94B6EF` | Latar *badge* kategori, garis aksen dekoratif/orbit, *hover state* sekunder. |
| **Status: Success** | Hijau Centang (*Emerald*) | `#10B981` | Ikon centang modul selesai (gaya Dicoding), status hadir absensi, tepat waktu. |
| **Status: Warning/Late**| Kuning Amber (*Amber*) | `#F59E0B` | Peringatan batas waktu tugas, status pengumpulan terlambat dalam toleransi. |
| **Status: Danger** | Merah (*Rose Red*) | `#EF4444` | Pesan *error* validasi form, sesi absensi ditutup, lewat batas waktu. |

### 5.2 Referensi Tata Letak 1: Landing Page (Gaya *GitHub Discussions*)
Berdasarkan gambar referensi 1 (`image_167180.jpg`):
1. **Top Navbar Bersih:** Logo Xcode di kiri, menu navigasi (`Tentang`, `Kurikulum/Kelas`, `Event`, `Portofolio Anggota`, `FAQ`) di tengah/kiri, dan tombol `Masuk (Login NIM)` di kanan.
2. **Hero Section Berpusat (*Centered Hero with Orbit Illustration*):**
   * Label kecil (*eyebrow text*) berwarna kontras di atas judul: `"Komunitas Pemrograman HMTI"`.
   * **Headline Besar & Tebal:** `"Rumah Kolaborasi & Belajar Ngoding Mahasiswa HMTI"` (menggunakan font tegas seperti *Plus Jakarta Sans* atau *Inter*, `font-weight: 800`).
   * **Sub-headline:** 2–3 baris teks penjelasan singkat di bawah judul dengan lebar terukur (`max-width: 640px`).
   * **Satu Tombol Aksi Utama (CTA):** Tombol berbentuk *rounded* tegas (`Mulai Belajar Sekarang >`) diikuti tautan sekunder di bawahnya (`Lihat Karya Anggota >`).
   * **Dekorasi Lingkaran Orbit (*Concentric Circles*):** Garis lingkaran tipis berlapis di latar belakang *hero* yang dihiasi elemen mengambang (*floating badges/avatars*) seperti foto mentor, ikon bahasa pemrograman, dan lencana `"Modul Selesai ✓"`.
3. **Susunan Seksi di Bawah Hero:**
   * *Tentang & Manfaat Xcode* (Grid 3–4 kartu keunggulan).
   * *Katalog Kelas & Materi Pembelajaran* (Preview kelas yang tersedia).
   * *Mentor & Pemateri Xcode* (Kartu profil pemateri).
   * *Event Mendatang & Galeri Dokumentasi Kegiatan*.
   * *Sorotan Portofolio Anggota Terbaik*.
   * *Accordion FAQ* & *Formulir Contact Us*.
   * *Footer Bersama*.

### 5.3 Referensi Tata Letak 2: Ruang Baca Materi (Gaya *Dicoding Classroom*)
Berdasarkan gambar referensi 2 (`image_16719b.jpg`):
1. **Classroom Top Header (Tinggi tetap `64px`):**
   * Sisi Kiri: Tombol `← Kembali ke Koridor Kelas` (mengarahkan kembali ke daftar kelas/dasbor anggota).
   * Sisi Kanan: Kotak pencarian modul (`Cari modul...`), indikator poin anggota (`⚡ Poin`), dan profil pengguna.
2. **Left Sidebar Navigasi Modul (Lebar `320px`, dapat disembunyikan/di-*collapse* di layar kecil):**
   * **Header Kelas Aktif:** Menampilkan label `"KELAS AKTIF"`, Judul Kelas (misal: *Pemrograman Web Dasar dengan Laravel*), *Progress Bar* visual, serta teks indikator `12 / 15 modul` di kiri dan `80%` di kanan.
   * **Daftar Bab (*Module Sections/Chapters*) & Sub-Modul:**
     * Dikelompokkan berdasarkan Bab (misal: `PERSIAPAN BELAJAR`, `PENGANTAR WEB DEVELOPMENT`).
     * Setiap item modul memiliki **Ikon Lingkaran Centang Hijau (`✓`)** di sebelah kiri jika sudah selesai dibaca, atau lingkaran kosong jika belum selesai, diikuti nomor urut (`1.1`, `1.2`) dan judul modul.
     * Modul yang sedang dibuka memiliki latar sorotan (*active state highlight*).
3. **Main Content Area (Area Baca Tengah-Kanan):**
   * Kontainer artikel dengan lebar baca ergonomis (`max-width: 768px` di tengah area konten), ukuran font `16px–18px`, dan jarak antarbaris (`line-height: 1.75`) agar mata tidak cepat lelah.
   * Mendukung teks paragraf, penebalan/garis bawah konsep penting, gambar ilustrasi komik/diagram di tengah artikel, serta blok kode dengan tombol *Copy*.
4. **Bottom Action Bar (Navigasi Bawah Artikel):**
   * Tombol `← Modul Sebelumnya` di kiri.
   * Tombol utama **`Tandai Selesai & Lanjut →`** di kanan (ketika diklik, memicu penyimpanan ke tabel `module_progress` dan langsung berpindah ke modul berikutnya).

---

## 6. Kebutuhan Fungsional & Spesifikasi Fitur

### 6.1 Modul Publik (Tanpa Login)
1. **Landing Page Dinamis:** Mengambil data tentang Xcode, daftar manfaat, daftar pemateri (`speakers`), daftar FAQ (`faqs`), daftar event terbaru (`events`), dan dokumentasi (`documentation`).
2. **Katalog & Detail Portofolio Publik (`/portfolios` & `/portfolios/{nim}`):**
   * Pengunjung dapat melihat direktori anggota Xcode beserta proyek-proyek yang telah mereka bangun.
   * **Aturan Privasi:** Halaman publik menampilkan Nama Lengkap, Angkatan/Prodi, Bio, Skill Tags, Link GitHub/LinkedIn/Demo Web, Total Poin Keaktifan, dan Daftar Proyek. Jika `nim` dipakai di URL atau memilih memakai `username/slug`, nomor NIM asli dapat disamarkan atau hanya ditampilkan sebagian jika anggota memilih opsi privasi.
3. **Formulir Contact Us:** Pengunjung mengisi Nama, Email/Kontak WhatsApp, Subjek, dan Pesan. Data masuk ke dasbor Admin.

### 6.2 Modul Autentikasi & Akun (Berbasis Database MySQL)
1. **Pre-Registered NIM Account (Impor oleh Admin):**
   * Pengurus Xcode mengimpor daftar anggota resmi HMTI (berisi `nim`, `nama`, `peran`) melalui fitur *Import CSV* di CMS Admin (atau lewat *Database Seeder* pada tahap awal).
   * Saat akun baru dibuat oleh sistem, password awal di-set secara *default* (atau menggunakan token aktivasi pertama kali).
2. **Alur Login & Wajib Ganti Password Pertama Kali (*First-Time Login Flow*):**
   * Pengguna memasukkan `NIM` dan `Password` pada halaman `/login`.
   * Sistem memeriksa kolom `is_password_changed` di tabel `users`. Jika bernilai `false` (`0`), pengguna otomatis diarahkan ke halaman `/change-password` untuk membuat password pribadi yang rahasia sebelum bisa mengakses materi.
3. **Role-Based Redirect:**
   * Jika `role == 'admin'`, diarahkan ke `/admin/dashboard`.
   * Jika `role == 'member'`, diarahkan ke `/dashboard` (Koridor Kelas & Aktivitas Anggota).

### 6.3 Modul Ruang Belajar / Materi (LMS)
1. **Koridor Kelas (`/classes`):** Menampilkan daftar kelas pemrograman yang tersedia (misal: *Kelas Frontend Dasar*, *Kelas Backend Laravel*, *Kelas UI/UX*), lengkap dengan jumlah modul dan persentase progres masing-masing anggota.
2. **Hierarki Materi 3 Tingkat (`Classes` -> `Module Chapters` -> `Modules`):**
   * Mengikuti referensi Dicoding, setiap Kelas memiliki Bab pengelompokan (*Chapter/Section* seperti "Persiapan Belajar"), dan setiap Bab memiliki beberapa Modul bacaan berurutan.
3. **Pencatatan Progres Otomatis (`module_progress`):**
   * Anggota yang menekan tombol *"Selesai & Lanjut"* pada sebuah modul akan tercatat waktu penyelesaiannya di database. Progress bar kelas otomatis dihitung dari:
     $$\text{Persentase Progres} = \left( \frac{\text{Jumlah Modul Selesai oleh User pada Kelas Tersebut}}{\text{Total Modul Terpublikasi pada Kelas Tersebut}} \right) \times 100\%$$

### 6.4 Modul Absensi Sesi Pertemuan
1. **Pembukaan Sesi oleh Admin:** Admin membuat sesi pertemuan (misal: *"Pertemuan 3: Praktik Routing & Controller Laravel"*), menentukan waktu `buka` dan waktu `tutup`, serta men-generate **Kode Presensi 6 Karakter** (contoh: `XC39A1`).
2. **Input Kehadiran oleh Anggota:**
   * Pada saat sesi berlangsung di kelas/pertemuan, mentor menampilkan kode presensi di layar proyektor.
   * Anggota membuka menu **Absensi** di ponsel/laptop, memasukkan kode `XC39A1`, dan menekan tombol **Hadir**.
   * Server memvalidasi: (1) Kode cocok, (2) Waktu server saat ini berada di antara `buka` dan `tutup`, dan (3) Anggota belum absen di sesi tersebut. Jika lolos, data masuk ke tabel `attendance` dan poin otomatis bertambah di `points_ledger`.

### 6.5 Modul Pengumpulan Tugas (GitHub Link) & Poin
1. **Daftar Tugas (`/assignments`):** Menampilkan daftar tugas koding beserta deskripsi soal, kelas terkait, batas waktu (*deadline*), dan status pengumpulan anggota.
2. **Form Kumpul Tugas via GitHub:**
   * Anggota hanya perlu menempelkan **URL Repositori GitHub** (contoh: `https://github.com/username/tugas-laravel-xcode`) dan catatan tambahan opsional.
   * Sistem mencatat waktu pengumpulan menggunakan jam server (`NOW()`), menghitung poin secara instan sesuai aturan ketepatan waktu, dan menyimpannya ke `submissions` serta `points_ledger`.

### 6.6 Modul Event & Dokumentasi Kegiatan
1. **Halaman Event:** Menampilkan jadwal acara Xcode (Workshop, Sharing Session, Bootcamp) baik yang akan datang (*Upcoming*) maupun yang sudah selesai (*Past Events*).
2. **Galeri Dokumentasi:** Setiap event yang telah selesai dapat ditambahkan galeri foto kegiatan beserta keterangan (*caption*) oleh Admin sebagai arsip resmi organisasi.

### 6.7 Modul Profil & Portofolio Publik Anggota
1. **Editor Portofolio (Area Anggota):** Anggota dapat memperbarui bio singkat, tautan GitHub, LinkedIn, Instagram, serta menambahkan daftar proyek karya mereka (Judul Proyek, Deskripsi, Gambar Thumbnail, Link Repo GitHub, dan Link Live Demo).
2. **Halaman Publik Portofolio:** Dapat dibagikan oleh anggota di CV atau media sosial mereka sebagai bukti keaktifan dan portofolio nyata selama di HMTI.

---

## 7. Arsitektur Teknis & Standar Profesional

Keputusan arsitektur ini dirancang khusus agar **paling mudah dikerjakan oleh tim pengembang pemula**, mencegah kendala konfigurasi rumit, dan **100% kompatibel dengan hosting MySQL eksisting**.

### 7.1 Tumpukan Teknologi (*Tech Stack*) yang Dikunci

| Lapisan | Teknologi yang Dipilih | Alasan Pemilihan untuk Tim & Infrastruktur |
| :--- | :--- | :--- |
| **Arsitektur Aplikasi** | **Laravel Monolith Modern** (Blade Component + Tailwind CSS + Alpine.js) *atau* Laravel API + Komponen Terpadu | Sangat ramah bagi pemula, bebas masalah CORS, mudah di-*deploy* ke satu hosting eksisting bersama database MySQL, namun tetap mengizinkan pembagian kerja FE (Views/Tailwind) dan BE (Controllers/Models/API) secara rapi. |
| **Backend Framework** | **Laravel 11.x (PHP 8.2+)** | Telah disepakati tim. Memiliki fitur autentikasi (Laravel Breeze), ORM (Eloquent), *Seeder*, dan keamanan bawaan yang sangat matang. |
| **Database** | **MySQL 8.0 / MariaDB** | Menyesuaikan dengan server/hosting yang sudah dimiliki sebelumnya. Relasional, stabil, dan didukung penuh oleh Laravel. |
| **Styling & UI** | **Tailwind CSS** | Memudahkan tim FE menerapkan Palet Warna B (`#F4F2EF`, `#213E60`, `#E68C3A`, `#94B6EF`) secara konsisten tanpa konflik file CSS. |
| **Format Penyimpanan Materi** | **Markdown (`LONGTEXT`) + `league/commonmark` + `Highlight.js`** | Standar profesional untuk platform belajar ngoding. Memudahkan penulisan teks dan blok kode program tanpa merusak tata letak HTML. |
| **Autentikasi** | **Database Session Auth (Laravel Breeze disesuaikan untuk NIM)** | Menggunakan tabel `users` di MySQL. Aman, mendukung *hash password* (`bcrypt`), dan langsung terhubung ke *middleware* peran pengguna. |
| **Penyimpanan Media** | **Laravel Local Public Storage (`storage/app/public`)** | Menyimpan gambar di disk hosting yang sama (melalui `php artisan storage:link`), sedangkan database hanya menyimpan *path* string. |

---

## 8. Skema Database Relasional (MySQL)

Seluruh nama tabel dan kolom di bawah ini adalah **kontrak resmi**. Tim Backend membuat *Migration* dan *Seeder* berdasarkan skema ini, dan Tim Frontend menggunakan nama *field* yang sama untuk menampilkan data.

### 8.1 Tabel `users` (Data Pengguna & Autentikasi)
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `nim` | `VARCHAR(20)` | **UNIQUE**, Indexed — Kredensial utama untuk login |
| `name` | `VARCHAR(150)` | Nama lengkap mahasiswa / pengurus |
| `email` | `VARCHAR(150)` | Nullable, Unique (opsional untuk pemulihan akun) |
| `password` | `VARCHAR(255)` | Password yang di-hash menggunakan `bcrypt` |
| `role` | `ENUM('admin', 'member')` | Default: `'member'` |
| `status` | `ENUM('active', 'inactive', 'alumni')` | Default: `'active'` |
| `is_password_changed` | `BOOLEAN` | Default: `false` (Wajib ganti password saat login pertama) |
| `avatar_path` | `VARCHAR(255)` | Nullable, path foto profil |
| `created_at`, `updated_at` | `TIMESTAMP` | Waktu pembuatan & pembaruan |

### 8.2 Tabel `classes` (Daftar Kelas Pembelajaran)
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `title` | `VARCHAR(200)` | Judul kelas (misal: *Dasar Pemrograman Web*) |
| `slug` | `VARCHAR(220)` | **UNIQUE**, untuk URL ramah SEO |
| `description` | `TEXT` | Deskripsi singkat kelas |
| `thumbnail_path` | `VARCHAR(255)` | Gambar sampul kelas |
| `level` | `ENUM('beginner', 'intermediate', 'advanced')` | Default: `'beginner'` |
| `is_published` | `BOOLEAN` | Default: `true` |
| `created_at`, `updated_at` | `TIMESTAMP` | Waktu pembuatan & pembaruan |

### 8.3 Tabel `modules` (Modul Materi Pembelajaran)
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `class_id` | `BIGINT UNSIGNED` | Foreign Key -> `classes.id` (`ON DELETE CASCADE`) |
| `chapter_title` | `VARCHAR(150)` | Nama bab pengelompokan di sidebar (misal: *Persiapan Belajar*) |
| `title` | `VARCHAR(200)` | Judul modul (misal: *Pengenalan Machine Learning Operations*) |
| `slug` | `VARCHAR(220)` | Slug modul untuk URL |
| `order_index` | `INT UNSIGNED` | Urutan tampil modul di dalam kelas (`1, 2, 3...`) |
| `content` | `LONGTEXT` | Isi materi dalam format **Markdown / HTML** |
| `estimated_minutes` | `SMALLINT UNSIGNED` | Estimasi waktu baca (default: `10` menit) |
| `is_published` | `BOOLEAN` | Default: `true` |
| `created_at`, `updated_at` | `TIMESTAMP` | Waktu pembuatan & pembaruan |

### 8.4 Tabel `module_progress` (Pelacakan Modul Selesai)
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `user_id` | `BIGINT UNSIGNED` | Foreign Key -> `users.id` (`ON DELETE CASCADE`) |
| `module_id` | `BIGINT UNSIGNED` | Foreign Key -> `modules.id` (`ON DELETE CASCADE`) |
| `completed_at` | `TIMESTAMP` | Waktu saat modul ditandai selesai |
| *Constraint* | `UNIQUE(user_id, module_id)` | Mencegah duplikasi centang pada modul yang sama |

### 8.5 Tabel `sessions` & `attendance` (Sesi Pertemuan & Kehadiran)
**Tabel `sessions`:**
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `title` | `VARCHAR(200)` | Judul sesi pertemuan |
| `session_date` | `DATE` | Tanggal pertemuan |
| `open_at` | `DATETIME` | Waktu absensi mulai dibuka |
| `close_at` | `DATETIME` | Waktu absensi ditutup |
| `attendance_code` | `VARCHAR(10)` | **UNIQUE**, Kode singkat presensi (misal: `XC2026`) |
| `points_reward` | `INT` | Poin hadir (Default: `20`) |
| `created_at`, `updated_at` | `TIMESTAMP` | Waktu pembuatan & pembaruan |

**Tabel `attendance`:**
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `user_id` | `BIGINT UNSIGNED` | Foreign Key -> `users.id` (`ON DELETE CASCADE`) |
| `session_id` | `BIGINT UNSIGNED` | Foreign Key -> `sessions.id` (`ON DELETE CASCADE`) |
| `attended_at` | `DATETIME` | Waktu server saat anggota berhasil absen |
| *Constraint* | `UNIQUE(user_id, session_id)` | Satu anggota hanya bisa absen 1 kali per sesi |

### 8.6 Tabel `assignments` & `submissions` (Tugas & Pengumpulan GitHub)
**Tabel `assignments`:**
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `class_id` | `BIGINT UNSIGNED` | Nullable, Foreign Key -> `classes.id` |
| `title` | `VARCHAR(200)` | Judul tugas |
| `description` | `TEXT` | Instruksi lengkap & kriteria tugas (Markdown) |
| `due_at` | `DATETIME` | Batas waktu pengumpulan tepat waktu |
| `grace_period_hours` | `INT UNSIGNED` | Masa toleransi keterlambatan dalam jam (Default: `24` jam) |
| `max_points` | `INT UNSIGNED` | Poin maksimal tepat waktu (Default: `100`) |
| `late_points` | `INT UNSIGNED` | Poin jika telat dalam masa toleransi (Default: `60`) |
| `created_at`, `updated_at` | `TIMESTAMP` | Waktu pembuatan & pembaruan |

**Tabel `submissions`:**
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `user_id` | `BIGINT UNSIGNED` | Foreign Key -> `users.id` (`ON DELETE CASCADE`) |
| `assignment_id` | `BIGINT UNSIGNED` | Foreign Key -> `assignments.id` (`ON DELETE CASCADE`) |
| `github_url` | `VARCHAR(255)` | URL repositori GitHub tugas anggota |
| `notes` | `TEXT` | Nullable, catatan tambahan dari anggota |
| `submitted_at` | `DATETIME` | Waktu server saat tugas dikumpulkan |
| `status` | `ENUM('on_time', 'late', 'rejected')` | Status ketepatan waktu otomatis dari server |
| `awarded_points` | `INT` | Jumlah poin yang diberikan |
| *Constraint* | `UNIQUE(user_id, assignment_id)` | Satu pengumpulan aktif per tugas per anggota |

### 8.7 Tabel `points_ledger` (Buku Besar Riwayat Poin)
| Nama Kolom | Tipe Data | Atribut / Keterangan |
| :--- | :--- | :--- |
| `id` | `BIGINT UNSIGNED` | Primary Key, Auto Increment |
| `user_id` | `BIGINT UNSIGNED` | Foreign Key -> `users.id` (`ON DELETE CASCADE`) |
| `source_type` | `ENUM('attendance', 'submission', 'module', 'manual_adjustment')` | Sumber perolehan/perubahan poin |
| `source_id` | `BIGINT UNSIGNED` | ID referensi dari tabel sumber (`attendance.id` / `submissions.id`) |
| `delta` | `INT` | Nilai perubahan poin (misal: `+100`, `+20`) |
| `reason` | `VARCHAR(255)` | Keterangan (misal: *"Tepat waktu: Tugas 1 Laravel"*) |
| `created_at` | `TIMESTAMP` | Waktu pencatatan transaksi poin |

### 8.8 Tabel `portfolios` & `portfolio_projects` (Portofolio Publik Anggota)
**Tabel `portfolios` (1-to-1 dengan `users`):**
* `id`, `user_id` (Unique), `headline` (misal: *"Frontend Developer | Mahasiswa TI"*), `bio` (`TEXT`), `github_url`, `linkedin_url`, `website_url`, `skills_json` (daftar keahlian), `is_public` (`BOOLEAN` default `true`).

**Tabel `portfolio_projects` (1-to-Many dengan `users`):**
* `id`, `user_id`, `title`, `description`, `thumbnail_path`, `github_url`, `demo_url`, `created_at`.

### 8.9 Tabel Konten Landing, Event, & Dokumentasi
* **`events`**: `id`, `title`, `slug`, `description`, `event_date`, `location`, `poster_path`, `is_featured`.
* **`documentation`**: `id`, `event_id` (Foreign Key -> `events.id`), `image_path`, `caption`, `created_at`.
* **`speakers`**: `id`, `name`, `role_title`, `bio`, `photo_path`, `github_url`, `linkedin_url`, `order_index`.
* **`faqs`**: `id`, `question`, `answer`, `order_index`, `is_active`.
* **`contact_messages`**: `id`, `sender_name`, `sender_contact`, `subject`, `message`, `is_read`, `created_at`.

---

## 9. Kontrak Data & Spesifikasi Endpoint (API / Route Contract)

Baik menggunakan pendekatan JSON API maupun pengiriman data langsung dari Controller ke View, struktur objek data di bawah ini wajib dipatuhi oleh tim FE dan BE.

### 9.1 Daftar Rute & Endpoint Utama

| Grup Fitur | Method & URI | Akses | Deskripsi Fungsi |
| :--- | :--- | :--- | :--- |
| **Landing & Publik** | `GET /` atau `GET /api/landing` | Publik | Mengambil data ringkasan Xcode, `speakers`, `faqs`, `events` terbaru, dan sorotan `portfolios`. |
| **Contact Us** | `POST /contact` (`POST /api/contact`) | Publik | Menyimpan pesan pengunjung dengan validasi & *rate limit* (`throttle:3,10`). |
| **Portofolio Publik** | `GET /portfolios` & `GET /portfolios/{nim}` | Publik | Menampilkan daftar portofolio anggota dan detail karya per anggota. |
| **Autentikasi** | `POST /login` & `POST /logout` | Publik / Auth | Verifikasi `nim` dan `password` ke database. |
| **Koridor Kelas** | `GET /classes` (`GET /api/classes`) | Anggota (`auth`) | Daftar seluruh kelas beserta persentase progres pengguna yang sedang login. |
| **Detail & Baca Modul**| `GET /classes/{slug}/modules/{module_slug}` | Anggota (`auth`) | Mengambil isi materi Markdown, daftar bab sidebar, dan status centang modul. |
| **Selesai Modul** | `POST /modules/{id}/complete` | Anggota (`auth`) | Menandai modul selesai di `module_progress` dan mengembalikan progres terbaru. |
| **Absensi Sesi** | `POST /attendance/check-in` | Anggota (`auth`) | Mengirim `attendance_code`, memvalidasi jam aktif, dan memberi poin hadir. |
| **Kumpul Tugas** | `POST /assignments/{id}/submit` | Anggota (`auth`) | Mengirim `github_url` & `notes`, menghitung poin otomatis berdasarkan `due_at`. |
| **Panel CMS Admin** | `ANY /admin/*` | Admin (`role:admin`)| Seluruh operasi CRUD materi, sesi absensi, tugas, event, dokumentasi, dan impor NIM. |

### 9.2 Contoh Kontrak JSON Halaman Ruang Materi (Acuan Data Dummy FE & BE)
```json
{
  "class": {
    "id": 1,
    "title": "Membangun Sistem Web dengan Laravel",
    "slug": "membangun-sistem-web-dengan-laravel",
    "total_modules": 8,
    "completed_modules": 3,
    "progress_percentage": 38
  },
  "chapters": [
    {
      "chapter_title": "PERSIAPAN BELAJAR",
      "modules": [
        {
          "id": 101,
          "order_index": 1,
          "title": "Persetujuan Hak Cipta & Aturan Belajar",
          "slug": "persetujuan-hak-cipta",
          "is_completed": true
        },
        {
          "id": 102,
          "order_index": 2,
          "title": "Pengenalan Ekosistem Laravel & MySQL",
          "slug": "pengenalan-ekosistem-laravel",
          "is_completed": true
        }
      ]
    },
    {
      "chapter_title": "ARSITEKTUR MVC & DATABASE",
      "modules": [
        {
          "id": 103,
          "order_index": 3,
          "title": "Memahami Routing, Controller, dan Blade View",
          "slug": "memahami-routing-controller-blade",
          "is_completed": false
        }
      ]
    }
  ],
  "current_module": {
    "id": 103,
    "chapter_title": "ARSITEKTUR MVC & DATABASE",
    "title": "Memahami Routing, Controller, dan Blade View",
    "content_markdown": "## Mengapa Arsitektur MVC Penting?\n\nDeveloper biasanya dituntut untuk cepat mengembangkan fitur...",
    "is_completed": false,
    "previous_module_slug": "pengenalan-ekosistem-laravel",
    "next_module_slug": "migrasi-database-mysql"
  }
}
```

---

## 10. Aturan Bisnis: Sistem Absensi, Tugas GitHub, & Buku Besar Poin

Seluruh angka dan rumus di bawah ini **dikunci sebagai standar sistem v1.0** (dan disimpan sebagai konfigurasi di database agar mudah disesuaikan pengurus di kemudian hari):

1. **Skema Perolehan Poin Otomatis (`points_ledger`):**
   * **Menyelesaikan 1 Modul Materi (`module`):** **`+5 Poin`** (Diberikan satu kali saat modul pertama kali ditandai selesai).
   * **Hadir Sesi Pertemuan (`attendance`):** **`+20 Poin`** per sesi.
   * **Mengumpulkan Tugas Tepat Waktu (`submission` - `on_time`):** **`+100 Poin`** (Waktu server `submitted_at <= due_at`).
   * **Mengumpulkan Tugas Terlambat dalam Masa Toleransi (`submission` - `late`):** **`+60 Poin`** (Waktu server berada pada rentang `due_at < submitted_at <= due_at + 24 jam`).
   * **Lewat Masa Toleransi (> 24 Jam setelah Deadline):** **`0 Poin`** (Anggota tetap diizinkan memperbarui link GitHub-nya untuk keperluan portofolio/review mentor, namun tidak mendapatkan poin ketepatan waktu).
   * **Tanpa Poin Negatif:** Pada versi 1.0, tidak ada pengurangan poin (poin minus) agar memotivasi anggota pemula untuk terus belajar.
2. **Validasi Tautan Pengumpulan Tugas (GitHub):**
   * Input pengumpulan tugas wajib melewati validasi Regex URL GitHub: `^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?.*$` agar anggota tidak mengumpulkan link sembarangan.

---

## 11. Kebutuhan Non-Fungsional & Keamanan

1. **Keamanan Autentikasi & Otorisasi:**
   * Semua password wajib di-hash dengan algoritma `bcrypt` bawaan Laravel.
   * Proteksi CSRF (*Cross-Site Request Forgery*) aktif pada seluruh form `POST/PUT/DELETE`.
   * *Middleware* `EnsureUserIsAdmin` wajib dipasang pada seluruh grup rute `/admin/*`.
2. **Keamanan Render Materi (Anti-XSS):**
   * Karena materi disimpan dalam format Markdown, konversi Markdown ke HTML wajib menonaktifkan tag `<script>` atau `<iframe>` liar (kecuali *embed* resmi YouTube untuk video pembelajaran).
3. **Performa pada Hosting Eksisting:**
   * Hindari masalah *N+1 Query* pada Laravel Eloquent dengan selalu menggunakan *Eager Loading* (`with(['modules', 'progress'])`).
   * Gambar dokumentasi dan thumbnail proyek dikompresi maksimal 2 MB agar halaman dimuat di bawah **3 detik** pada jaringan internet kampus.
4. **Desain Responsif (*Mobile-First Compatibility*):**
   * Pada layar ponsel (`< 768px`), *Sidebar* daftar modul di halaman belajar otomatis tersembunyi di dalam *Drawer / Hamburger Menu* bawah atau atas, sehingga teks bacaan materi tetap memenuhi layar dengan nyaman.

---

## 12. Mitigasi Risiko & Daftar Pemeriksaan Kualitas (QA)

### 12.1 Matriks Mitigasi Risiko Teknis
* **Risiko 1: Bentrok File antara Tim FE Landing & Tim FE Materi.**
  * *Mitigasi:* Gunakan pemisahan folder komponen yang tegas (`resources/views/landing/*` untuk tim Landing, `resources/views/classroom/*` untuk tim Materi, dan `resources/views/components/layout/*` untuk komponen bersama).
* **Risiko 2: Penyalahgunaan Login NIM oleh Orang Lain.**
  * *Mitigasi:* NIM tidak boleh digunakan tanpa password. Akun diimpor oleh Admin, dan saat login pertama kali anggota wajib mengganti password bawaan.
* **Risiko 3: Kapasitas Penyimpanan Hosting Penuh.**
  * *Mitigasi:* Seluruh pengumpulan tugas koding tidak mengunggah file `.zip` ke server, melainkan hanya menyimpan string URL GitHub.

### 12.2 Checklist Definisi Selesai (*Definition of Done* — QA)
- [ ] Pengunjung publik dapat membuka Landing Page, melihat bagian profil, pemateri, event, dokumentasi, FAQ, dan mengirim pesan lewat form *Contact Us*.
- [ ] Pengunjung publik dapat membuka halaman Portofolio Anggota dan melihat proyek GitHub yang telah dikerjakan anggota.
- [ ] Anggota HMTI dapat login menggunakan NIM & Password yang terdaftar di database MySQL.
- [ ] Anggota dapat membuka Kelas, membaca Modul dengan tampilan bergaya Dicoding (sidebar bab, centang hijau, progress bar), dan menandai modul selesai.
- [ ] Anggota dapat memasukkan kode sesi absensi yang sedang aktif dan otomatis mendapatkan poin kehadiran.
- [ ] Anggota dapat mengumpulkan link GitHub pada halaman Tugas dan sistem otomatis mencatat poin berdasarkan jam server.
- [ ] Admin dapat masuk ke halaman CMS untuk mengelola materi, membuat sesi absensi, membuat tugas, mengunggah dokumentasi event, dan mengimpor daftar NIM anggota baru.