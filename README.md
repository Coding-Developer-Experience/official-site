<p align="center">
  <img src="assets/hero-banner.svg" alt="Xcode animated banner" width="800" />
</p>

<h1 align="center">Xcode — Platform Komunitas & Belajar Ngoding HMTI</h1>

<p align="center">
  Komunitas mahasiswa yang belajar bersama, membangun project nyata, dan berkembang menjadi developer profesional.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<br/>

## Tentang Xcode

Xcode (Coding Developer Experience) adalah website resmi komunitas developer mahasiswa di bawah naungan HMTI. Platform ini menggabungkan landing page profil komunitas yang inspiratif dengan **Ruang Belajar Mandiri (LMS bergaya Dicoding Classroom)** untuk kurikulum ngoding terstruktur.

## Fitur Unggulan

### 1. Landing Page & Branding Komunitas
- Hero section editorial dengan ilustrasi komunitas sebagai elemen visual utama
- Animasi awan lembut di area langit dan kartu aktivitas harian (*activity slides*)
- Search bar interaktif dengan tag populer: Next.js, Workshop, Hackathon, Open Source, UI/UX, React
- Call-to-Action utama: *Join Community* dan *Explore Projects*
- Responsif penuh di desktop, tablet, dan ponsel

### 2. Ruang Belajar & Modul Materi (Gaya Dicoding Classroom)
- **Koridor Kelas (`/classes`)**: Menampilkan katalog kelas pemrograman (misal: *Membangun Sistem Web dengan Laravel & MySQL*)
- **Ruang Baca Modul (`/classes/[slug]/modules/[moduleSlug]`)**:
  - Top Header 64px dengan tombol *← Kembali ke Koridor Kelas* dan indikator *⚡ Poin*
  - Left Sidebar 320px dengan progress bar oranye Xcode (`#E68C3A`), switcher tab *Daftar Modul* & *Catatan Belajar*, dan centang hijau emerald (`#10B981`)
  - Kontainer baca ergonomis *max-width 768px* dengan tipografi nyaman (font 16–18px, line-height 1.75)
  - Glosarium interaktif dengan kartu popover definisi istilah teknis
  - Buku catatan belajar mandiri dengan *auto-save* per modul ke penyimpanan browser
  - Pencarian modul cepat via shortcut keyboard `CTRL /`
  - Floating bottom bar dengan asisten AI (*Learning with AI*) dan mode layar penuh / lebarkan

## Sistem Desain (Palet B — Light Theme Default)
- **Background Primary**: `#F4F2EF` (*Warm Ivory*)
- **Surface / Card**: `#FFFFFF` (*Pure White*)
- **Brand Primary / Text**: `#213E60` (*Deep Navy*)
- **Accent / Primary CTA**: `#E68C3A` (*Vibrant Orange*)
- **Secondary Accent**: `#94B6EF` (*Soft Sky Blue*)
- **Status Success**: `#10B981` (*Emerald*)

## Teknologi
- [Next.js 15](https://nextjs.org) — App Router & Turbopack
- [Tailwind CSS v4](https://tailwindcss.com) — Styling & Theme Tokens
- [shadcn/ui](https://ui.shadcn.com) — Komponen UI
- [Framer Motion](https://www.framer.com/motion/) — Transisi & Animasi
- TypeScript

## Cara Menjalankan

**Prasyarat:** Node.js 18.18 atau lebih baru.

```bash
# install dependencies
npm install

# jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk beranda, atau [http://localhost:3000/classes](http://localhost:3000/classes) untuk ruang kelas dan materi.

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur Folder

```
app/
├── classes/                    # Koridor kelas, silabus, dan ruang baca modul
│   ├── page.tsx                # Koridor kelas (/classes)
│   ├── [slug]/page.tsx         # Detail silabus kelas
│   └── [slug]/modules/[moduleSlug]/page.tsx # Ruang baca modul materi
├── materi/                     # Rute redirect ke /classes
├── components/
│   ├── hero.tsx                # Hero section beranda
│   ├── features.tsx            # Pilar utama Xcode
│   ├── footer.tsx              # Footer navigasi bersama
│   └── materi/                 # Komponen LMS (sidebar, reader, topbar, bottombar)
lib/
└── materi/                     # Kontrak data dan skema MySQL kurikulum
```

## Kontribusi

Repo ini adalah bagian dari upaya komunitas Xcode HMTI. Silakan buat branch fitur dan kirim *pull request* untuk saran dan perbaikan.
