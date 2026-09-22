<p align="center">
  <img src="assets/hero-banner.svg" alt="Xcode animated banner" width="800" />
</p>

<h1 align="center">Xcode</h1>

<p align="center">
  Komunitas mahasiswa yang belajar bersama, membangun project nyata, dan berkembang menjadi developer profesional.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p align="center">
  <img src="https://shields.io/github/contributors/Coding-Developer-Experience/official-site" alt="Contributors" />
  <img src="https://shields.io/github/commit-activity/m/Coding-Developer-Experience/official-site" alt="Commit activity" />
  <img src="https://shields.io/github/languages/count/Coding-Developer-Experience/official-site" alt="Languages" />
</p>

<br/>

## Tentang Xcode

Xcode (Coding Developer Experience) adalah website untuk komunitas developer mahasiswa. Situs ini dirancang sebagai landing page hero yang hangat, terang, dan inspiratif — menampilkan ilustrasi kampus sebagai visual utama, dengan UI yang bersih dan premium agar setiap pengunjung langsung merasakan suasana komunitas yang ramah.

## Fitur

- Hero section editorial dengan ilustrasi komunitas sebagai elemen visual utama
- Animasi awan lembut yang bergerak perlahan pada area langit
- Judul dengan identitas warna khas Xcode: Build (biru), Learn (abu gelap), Together (kuning hangat)
- Search bar utama untuk mencari project, event, artikel, atau topik
- Tag populer: Next.js, Workshop, Hackathon, Open Source, UI/UX, React
- CTA utama: Join Community dan Explore Projects
- Navigasi minimal dengan hover underline, tombol rounded, dan efek skala halus
- Fade-in animation saat halaman dimuat
- Fully responsive

## Teknologi

- [Next.js 15](https://nextjs.org) — App Router
- [Tailwind CSS](https://tailwindcss.com) — styling
- [shadcn/ui](https://ui.shadcn.com) — komponen UI
- [Framer Motion](https://www.framer.com/motion/) — transisi & animasi
- TypeScript

## Cara Menjalankan

**Prasyarat:** Node.js 18.18 atau lebih baru.

```bash
# install dependencies
npm install

# jalankan development server
npm run dev
```

Buka [http://localhost:3001](http://localhost:3001) di browser. Catatan: port default 3000 mungkin sudah terpakai, sehingga Next.js otomatis memilih port 3001.

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur Folder

```
app/            halaman dan layout (App Router)
components/     komponen React, termasuk hero
components/ui/  komponen shadcn/ui
lib/            utilitas (cn)
public/         aset statis, termasuk ilustrasi animasi
```

## Kontribusi

Repo ini adalah bagian dari upaya komunitas. Silakan buka _issue_ atau kirim _pull request_ untuk saran dan perbaikan.
