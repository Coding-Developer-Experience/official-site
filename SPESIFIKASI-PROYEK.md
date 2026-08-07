# Codex — Spesifikasi Proyek

Dokumen ini adalah acuan resmi pengembangan website komunitas **Codex** (Coding Developer Experience). Baca lengkap sebelum mulai bekerja. Setiap kontribusi harus mengikuti spesifikasi ini agar hasilnya konsisten satu landing page.

---

## 1. Ringkasan Proyek

**Codex** adalah website resmi komunitas developer mahasiswa. Saat ini berisi **satu halaman beranda** (landing page) yang hangat, terang, dan inspiratif — bernuansa langit biru dengan ilustrasi kampus. Target audiens: mahasiswa. Kesannya harus **friendly, youthful, welcoming, dan premium** — bukan website korporat.

Fokus saat ini: **beranda**. Halaman lain (About, Projects, Events, Blog, Team) sudah ada di menu navigasi tapi **belum dibuat** — menjadi roadmap berikutnya (lihat Bagian 9).

## 2. Tujuan

1. Menampilkan identitas komunitas Codex secara visual dan naratif dalam satu halaman.
2. Mendorong pengunjung melakukan aksi utama: **Join Community** dan **Explore Projects**.
3. Memberikan pengalaman browsing yang mulus, ringan, dan responsif di semua perangkat.

## 3. Non-Tujuan (jangan dikerjakan dulu)

- Dark mode (tema default terang).
- Backend, database, autentikasi, CMS.
- Fungsi pencarian sungguhan (search bar saat ini visual/demo, typewriter placeholder).
- Halaman-halaman menu lain, sampai roadmap (Bagian 9) disepakati.

## 4. Stack Teknologi

| Kebutuhan | Pilihan | Keterangan |
|---|---|---|
| Framework | **Next.js 15** (App Router, Turbopack) | `app/` directory |
| Bahasa | **TypeScript** (strict) | alias `@/*` → root proyek |
| Styling | **Tailwind CSS v4** | via `@import "tailwindcss"` |
| Komponen | **shadcn/ui** + **Base UI** | `@base-ui/react` |
| Animasi | **Framer Motion** | `framer-motion` (v13) |
| Ikon | **lucide-react** | import per-ikon, bukan seluruh library |
| Util | `clsx` + `tailwind-merge` | dibungkus `cn()` di `lib/utils.ts` |

Prasyarat lokal: Node.js ≥ 18.18.

```bash
npm install
npm run dev      # http://localhost:3001 (port default bisa terpakai)
npm run build    # build produksi
npm start        # jalankan hasil build
npm run lint     # pastikan lolos sebelum commit
```

## 5. Struktur Proyek

```
comunity/
├── app/
│   ├── layout.tsx          # Root layout: font, metadata, bahasa `id`
│   ├── page.tsx            # Beranda: render <Hero /> + <Features />
│   └── globals.css         # Tailwind v4, token tema, keyframes caret
├── components/
│   ├── hero.tsx            # Hero section + navbar + search + activity card
│   ├── features.tsx        # Section "Pilar Utama" (4 kartu)
│   └── ui/
│       ├── button.tsx      # shadcn Button (variants: default/outline/…)
│       └── input.tsx       # shadcn Input
├── lib/
│   ├── utils.ts            # export cn(...)
│   ├── logo.jpeg           # Logo Codex
│   └── tujuan/             # 4 ilustrasi 3D (laptop, percakapan, kolaborasi, karier)
├── public/
│   └── animasi.png         # Ilustrasi utama hero (scene kampus, 1536×1024)
└── package.json            # scripts: dev/build/start
```

## 6. Sistem Desain (WAJIB DIKUTI)

Palet dan gaya harus konsisten di seluruh halaman. Warna memakai Tailwind arbitrary value (`text-[#…]`), **bukan** token `--primary` shadcn (token default hitam; jangan dipakai untuk aksen).

### 6.1 Warna

| Nama | Hex | Penggunaan |
|---|---|---|
| Putih | `#FFFFFF` | latar utama, kartu, glassmorphism |
| Sky blue | `#EAF5FF` | chip ikon kartu, latar lembut |
| Biru muda | `#DBEAFE` / `#BAE6FD` | puncak gradient langit |
| Primary blue | `#3B82F6` | aksen heading, tombol aktif |
| Aksen gelap | `#2563EB` | link hover, dot indikator card activity |
| Kuning | `#FDBA21` / `#F7B731` | aksen "Together", ambient lighting |
| Navy | `#0F172A` / `#111827` | teks utama |
| Abu | `neutral-500` | teks sekunder (paragraf) |
| Border tipis | `#E5E7EB` / `neutral-200` | border kartu, outline |

### 6.2 Background & efek

- **Gradient hero** (pakai kembali untuk section baru):
  `bg-[linear-gradient(to_bottom,#dbeafe_0%,#bae6fd_12%,rgba(186,230,253,0.4)_36%,#ffffff_68%,#ffffff_100%)]`
- **Fade putih bawah** di akhir hero: `bg-gradient-to-t from-white via-white/85 to-transparent`.
- **Glassmorphism**: `border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)]`.
- **Ambient lighting**: blob radial-gradient lembut (kuning `rgba(251,191,36,…)`, indigo `rgba(129,140,248,…)`, emerald `rgba(52,211,153,…)`) dianimasikan pelan dengan `repeat: Infinity`.
- **Dot grid halus**: `[background-image:radial-gradient(#2563EB_1px,transparent_1px)] opacity-[0.04]` + `mask-image` radial.

### 6.3 Tipografi

- **Font**: Inter (dipasang via `next/font/google`, `--font-sans`). Font fallback `Geist` / `Geist_Mono`.
- Heading besar: `font-bold tracking-tight` dengan `letterSpacing: -0.03em`, ukuran hero `text-[44px] sm:text-6xl lg:text-8xl`.
- Heading sekunder: `text-4xl sm:text-5xl` (section), `text-xl`–`2xl` (kartu).
- Paragraf: `text-[15px] sm:text-base lg:text-xl`, `leading-relaxed`, `text-neutral-500`–`800`.
- Dilarang font dekoratif, uppercase berlebihan, atau heading serif.

### 6.4 Bentuk & jarak

- Sudut membulat: kartu `rounded-2xl`–`rounded-[28px]`, tombol `rounded-full`.
- Tombol CTA: `h-11 sm:h-12 rounded-full px-8`, efek `hover:scale-[1.03]` halus.
- Whitespace lebar antar-section: `py-24`–`py-32`.
- Kartu: `p-6 sm:p-7`, border tipis, shadow lembut `0_8px_28px_-12px_rgba(15,23,42,0.08)`.

### 6.5 Aturan gaya umum

- **Tanpa dark background** di body; tidak ada neon/cyberpunk/hologram.
- Suasana: inspiratif, kolaboratif, tenang, profesional, *young*.
- Semua teks tampilan harus Bahasa Indonesia (kecuali label teknis seperti "Open Source").

## 7. Inventaris Komponen (yang sudah ada)

### 7.1 `components/hero.tsx` (beranda, bagian paling atas)

Berisi sub-komponen lokal (jangan dipindah ke file sendiri tanpa alasan):

- **Navbar** — fixed di atas, muncul dengan fade setelah scroll (>60px). Kiri: logo `Codex.`. Tengah (desktop): 6 link menu (Home/About/Projects/Events/Blog/Team) dengan hover underline animasi. Kanan: tombol **Join Codex** (`buttonVariants default`) + tombol hamburger (mobile). Mobile menu full-screen dengan `backdrop-blur-2xl`.
- **SearchBar** — pill glassmorphism, placeholder **typewriter** (efek ketik-hapus-ulang, daftar di `searchPlaceholders`), tombol cari bulat hitam, tag "Populer" (Next.js, Workshop, Hackathon, Open Source, UI/UX, React). **Masih demo — tidak menyimpan data.**
- **Clouds** — awan CSS (`CloudShape`) yang melayang pelan (`repeatType: "mirror"`) di area langit.
- **CodeCard (activity card)** — kartu melayang kanan-atas berisi slide aktivitas ("Hari Ini") yang berganti tiap 3.8 detik via `AnimatePresence mode="wait"` + indikator dot. **WAJIB dipertahankan.**
- **ScrollIndicator** — mouse icon + "Scroll to explore" di bawah.
- **AmbientLighting** — blob cahaya beranimasi.

Isi utama hero:
- Badge: "Community untuk developer mahasiswa".
- Judul besar: **Build.** (biru) / **Learn.** (abu) / **Together.** (kuning) — ini identitas warna khas Codex.
- Paragraf: "Wadah kolaborasi mahasiswa dalam mempelajari teknologi, merancang proyek nyata, serta membentuk talenta pengembang yang profesional."
- CTA: **Join Community** (solid) dan **Explore Projects** (outline).

### 7.2 `components/features.tsx` (section "Pilar Utama")

- Label pill "Pilar Utama" + heading + paragraf pengantar.
- Grid 4 kartu (`sm:grid-cols-2 lg:grid-cols-4`): Project-Based Learning, Collaborative Learning, Open Source Contribution, Career Development.
- Tiap kartu: ilustrasi 3D (`lib/tujuan/*.png`), ikon logo berwarna aksen, judul, deskripsi, checklist item.
- Hover: kartu naik `-translate-y-2`, border berubah `#2563EB`, overlay gradient aksen di foto.

### 7.3 `components/ui/*`

- `button.tsx` — shadcn `Button` + `buttonVariants` (Base UI). **Pakai `buttonVariants(...)` + `cn(...)`** untuk anchor yang tampil seperti tombol (pola yang dipakai di hero).
- `input.tsx` — shadcn `Input`. Saat ini belum dipakai hero (search bar pakai `<input>` manual).

## 8. Pola Animasi Standar

Selalu pakai **Framer Motion** dengan pola yang sudah ada di `hero.tsx` / `features.tsx`:

```ts
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
```

- Ease signature: `[0.16, 1, 0.3, 1]` (smooth-out yang dipakai seluruh situs).
- Entry scene: `initial="hidden" animate="show"` pada container.
- Scroll reveal: `whileInView="show" viewport={{ once: true, margin: "-80px" }}`.
- Pergantian konten/daftar: `AnimatePresence mode="wait"`.
- Loop halus (float, cloud, blob): `animate` + `transition={{ repeat: Infinity }}`.
- **Jangan** buat animasi agresif: durasi 0.35–0.7s, jarak y kecil (12–24px). Kualitas = tenang, bukan ramai.
- Indikator dot aktif card activity: `bg-[#2563EB]`.

## 9. Roadmap (belum dieksekusi)

Menu navigasi sudah mengarah ke anchor `#about`, `#projects`, `#events`, `#blog`, `#team`. Rencana berikutnya — **bahas & setujui bersama tim sebelum mulai**:

1. **About** — section atau halaman berisi: headline + foto kandid komunitas, "Mengapa Codex Hadir?", 3 kartu nilai (Belajar / Berkolaborasi / Berkarya), dan quote besar. Gaya: split layout, foto glassmorphism, `max-w-7xl`, whitespace lebar, rotasi kata aksen dengan `AnimatePresence`.
2. **Projects** — grid kartu proyek anggota (screenshot, stack, link repo).
3. **Events** — kartu agenda (nama, waktu, lokasi, status peserta). Bisa adaptasi pola `activitySlides`.
4. **Blog** — kartu artikel.
5. **Team** — kartu anggota (foto, nama, role, sosial).
6. **Footer** — belum ada; siapkan footer beranda (logo, menu, sosmed, copyright).

**Aturan untuk semua bagian baru:** ikuti persis sistem desain Bagian 6; gambar riil (foto) harus bernuansa terang & natural — kalau belum punya aset, pakai ilustrasi/placeholder yang sudah ada di `lib/tujuan/` dan `public/animasi.png`.

## 10. Definisi Selesai (DoD) per Task

1. Typecheck bersih: `npx tsc --noEmit` tanpa error.
2. `npm run build` sukses.
3. Responsif: mobile (<640), tablet (sm/md), desktop (lg/xl) — tidak ada overflow horizontal, menu mobile jalan.
4. Mengikuti sistem desain Bagian 6 (warna, font, radius, jarak, animasi tenang).
5. Teks Bahasa Indonesia yang baik; tidak ada lorem ipsum.
6. Komponen baru mengikuti pola animasi & struktur yang ada; **tidak menambah dependency baru** tanpa persetujuan.
7. Tidak menghapus/mengubah `CodeCard`, gradient hero, atau identitas warna Build/Learn/Together.

## 11. Alur Kerja Tim

1. Ambil tugas dari roadmap yang sudah disepakati; buat branch fitur.
2. Implementasi di komponen baru di `components/`, render di `app/page.tsx` (atau halaman baru di `app/<route>/page.tsx`).
3. Jalankan `npx tsc --noEmit` dan `npm run build`.
4. Buka PR dengan deskripsi singkat; tag reviewer.
5. Review berfokus pada: konsistensi desain, responsivitas, animasi tenang, dan tidak ada regresi di beranda.
