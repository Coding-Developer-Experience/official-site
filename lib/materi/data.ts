import { Course } from "./types";

export const initialCourses: Course[] = [
  {
    id: "class-laravel-01",
    slug: "membangun-sistem-web-dengan-laravel",
    title: "Membangun Sistem Web dengan Laravel & MySQL",
    category: "Web Development",
    level: "beginner",
    description:
      "Pelajari arsitektur MVC, database MySQL, sistem autentikasi NIM, dan deployment aplikasi web nyata untuk komunitas HMTI.",
    totalModules: 6,
    total_modules: 6,
    chapters: [
      {
        id: "ch-lar-1",
        title: "PERSIAPAN BELAJAR",
        chapter_title: "PERSIAPAN BELAJAR",
        orderIndex: 1,
        order_index: 1,
        modules: [
          {
            id: "mod-lar-1-1",
            class_id: "class-laravel-01",
            chapter_title: "PERSIAPAN BELAJAR",
            slug: "persetujuan-hak-cipta",
            title: "Persetujuan Hak Cipta & Aturan Belajar",
            orderNumber: "1.1",
            order_index: 1,
            type: "article",
            durationMinutes: 5,
            estimated_minutes: 5,
            isFree: true,
            summary: "Syarat, ketentuan hak cipta, serta aturan kedisiplinan belajar di komunitas Xcode.",
            content: `
### Persetujuan Hak Cipta & Aturan Belajar

Selamat datang di kelas resmi **Membangun Sistem Web dengan Laravel** oleh komunitas **Xcode HMTI**!

Sebelum memulai materi teknis, berikut adalah pedoman belajar yang wajib dipatuhi:

1. **Integritas Kode**: Anda diharapkan menulis dan memahami kode secara mandiri. Diskusi diperbolehkan, namun duplikasi tugas tanpa pemahaman sangat tidak dianjurkan.
2. **Pengumpulan Tugas**: Seluruh latihan dan proyek dikumpulkan melalui **URL Repositori GitHub** yang valid sebelum batas waktu (*deadline*).
3. **Poin Keaktifan**: Setiap modul yang selesai dibaca bernilai **+5 Poin** di Buku Besar Poin (*Points Ledger*) Anda!
            `,
          },
          {
            id: "mod-lar-1-2",
            class_id: "class-laravel-01",
            chapter_title: "PERSIAPAN BELAJAR",
            slug: "pengenalan-ekosistem-laravel",
            title: "Pengenalan Ekosistem Laravel & MySQL",
            orderNumber: "1.2",
            order_index: 2,
            type: "article",
            durationMinutes: 10,
            estimated_minutes: 10,
            isFree: true,
            summary: "Mengenal arsitektur Laravel 11, PHP 8.2+, dan konfigurasi database MySQL.",
            content: `
### Pengenalan Ekosistem Laravel & MySQL

Laravel adalah framework PHP modern yang mengutamakan sintaks ekspresif dan elegan. Dalam kurikulum Xcode HMTI, Laravel dipilih karena:

- **Arsitektur MVC yang Terstruktur**: Memisahkan logika data (Model), tampilan (View), dan alur aplikasi (Controller).
- **ORM Eloquent yang Kuat**: Memudahkan interaksi dengan database **MySQL** tanpa perlu menulis raw query SQL yang rumit.
- **Kesiapan Shared Hosting**: Mudah di-deploy ke server kampus atau shared hosting eksisting.

\`\`\`bash
# Perintah instalasi dependensi proyek
composer install
npm install
php artisan migrate
\`\`\`
            `,
          },
        ],
      },
      {
        id: "ch-lar-2",
        title: "ARSITEKTUR MVC & DATABASE",
        chapter_title: "ARSITEKTUR MVC & DATABASE",
        orderIndex: 2,
        order_index: 2,
        modules: [
          {
            id: "mod-lar-2-1",
            class_id: "class-laravel-01",
            chapter_title: "ARSITEKTUR MVC & DATABASE",
            slug: "memahami-routing-controller-blade",
            title: "Memahami Routing, Controller, dan Blade View",
            orderNumber: "2.1",
            order_index: 3,
            type: "article",
            durationMinutes: 15,
            estimated_minutes: 15,
            isFree: false,
            summary: "Menghubungkan HTTP request rute ke controller hingga merender template Blade yang interaktif.",
            content: `
### Mengapa Arsitektur MVC Penting?

Sama halnya dengan kolaborasi tim software developer dan IT Operations, pemisahan tanggung jawab (*Separation of Concerns*) sangat krusial:

**Developer** bertugas menyusun alur bisnis di dalam **Controller**, sedangkan antarmuka pengguna dirender oleh template engine **Blade** yang bersih dan responsif.

Konflik sering terjadi ketika kode logika query database dicampur aduk langsung di dalam view tampilan. Arsitektur MVC mencegah hal tersebut agar sistem tetap stabil dan mudah dirawat.

\`\`\`php
// Contoh Route & Controller di Laravel 11
Route::get('/classes', [ClassController::class, 'index'])->name('classes.index');
\`\`\`

> Gunakan istilah teknis seperti **Developer**, **IT Operations**, dan **production** untuk melihat kartu glosarium interaktif!
            `,
          },
          {
            id: "mod-lar-2-2",
            class_id: "class-laravel-01",
            chapter_title: "ARSITEKTUR MVC & DATABASE",
            slug: "migrasi-database-mysql",
            title: "Migrasi Database MySQL & Model Eloquent",
            orderNumber: "2.2",
            order_index: 4,
            type: "article",
            durationMinutes: 15,
            estimated_minutes: 15,
            isFree: false,
            summary: "Merancang skema tabel relasional users, classes, modules, dan module_progress menggunakan migration.",
            content: `
### Migrasi Database MySQL

Migration adalah version control untuk skema database Anda. Dengan migration, tim backend dan frontend memiliki struktur tabel yang 100% konsisten.

Contoh skema migrasi tabel \`module_progress\`:

\`\`\`php
Schema::create('module_progress', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('module_id')->constrained()->cascadeOnDelete();
    $table->timestamp('completed_at');
    $table->unique(['user_id', 'module_id']);
});
\`\`\`
            `,
          },
        ],
      },
      {
        id: "ch-lar-3",
        title: "SISTEM AUTENTIKASI & TUGAS GITHUB",
        chapter_title: "SISTEM AUTENTIKASI & TUGAS GITHUB",
        orderIndex: 3,
        order_index: 3,
        modules: [
          {
            id: "mod-lar-3-1",
            class_id: "class-laravel-01",
            chapter_title: "SISTEM AUTENTIKASI & TUGAS GITHUB",
            slug: "autentikasi-nim-multi-role",
            title: "Autentikasi Berbasis NIM & Multi-Role User",
            orderNumber: "3.1",
            order_index: 5,
            type: "article",
            durationMinutes: 12,
            estimated_minutes: 12,
            isFree: false,
            summary: "Penerapan login menggunakan NIM mahasiswa HMTI dan proteksi middleware admin vs member.",
            content: `
### Autentikasi Menggunakan NIM

Platform Xcode menerapkan otentikasi berbasis **NIM (Nomor Induk Mahasiswa)**:
- Anggota login menggunakan NIM yang telah terdaftar di database MySQL.
- Saat login pertama kali (\`is_password_changed == false\`), anggota diwajibkan memperbarui kata sandi.
- Pengurus memiliki peran \`admin\` untuk mengelola kelas, absensi pertemuan, dan penugasan.
            `,
          },
          {
            id: "mod-lar-3-2",
            class_id: "class-laravel-01",
            chapter_title: "SISTEM AUTENTIKASI & TUGAS GITHUB",
            slug: "workflow-git-tugas-github",
            title: "Workflow Git & Pengumpulan Tugas GitHub",
            orderNumber: "3.2",
            order_index: 6,
            type: "article",
            durationMinutes: 15,
            estimated_minutes: 15,
            isFree: false,
            summary: "Tata cara push kode ke GitHub dan menempelkan tautan repositori untuk verifikasi tugas otomatis.",
            content: `
### Pengumpulan Tugas via GitHub

Seluruh tugas koding anggota dikumpulkan dengan menempelkan **URL Repositori GitHub**:

1. Pastikan repositori Anda berstatus **Public**.
2. Commit kode Anda secara teratur dengan pesan commit yang jelas.
3. Kumpulkan tugas sebelum batas waktu untuk mendapatkan **+100 Poin**, atau dalam masa toleransi 24 jam untuk **+60 Poin**!
            `,
          },
        ],
      },
    ],
  },
  {
    id: "course-mlops-01",
    slug: "membangun-sistem-machine-learning",
    title: "Membangun Sistem Machine Learning",
    category: "Machine Learning & AI",
    level: "intermediate",
    description:
      "Pelajari prinsip MLOps dari hulu ke hilir: lifecycle machine learning, otomatisasi pipeline, hingga deployment dan monitoring di production.",
    totalModules: 12,
    total_modules: 12,
    chapters: [
      {
        id: "ch-1",
        title: "PERSIAPAN BELAJAR",
        chapter_title: "PERSIAPAN BELAJAR",
        orderIndex: 1,
        order_index: 1,
        modules: [
          {
            id: "mod-1-1",
            slug: "persetujuan-hak-cipta",
            title: "Persetujuan Hak Cipta",
            orderNumber: "1.1",
            order_index: 1,
            type: "article",
            durationMinutes: 5,
            isFree: true,
            summary: "Syarat dan ketentuan hak cipta materi pembelajaran.",
            content: `
### Persetujuan Hak Cipta

Selamat datang di kelas **Membangun Sistem Machine Learning**! Sebelum memulai proses belajar, mohon pahami bahwa seluruh materi, kode contoh, dan ilustrasi di dalam kelas ini dilindungi oleh hak cipta komunitas dan penyusun materi.
            `,
          },
          {
            id: "mod-1-2",
            slug: "pengenalan-kelas",
            title: "Pengenalan Kelas",
            orderNumber: "1.2",
            order_index: 2,
            type: "article",
            durationMinutes: 10,
            isFree: true,
            summary: "Gambaran umum silabus dan target pembelajaran.",
            content: `
### Pengenalan Kelas

Dalam dunia modern, membuat model Machine Learning saja tidaklah cukup. Tantangan terbesar adalah bagaimana model tersebut dapat diintegrasikan ke sistem nyata.
            `,
          },
        ],
      },
      {
        id: "ch-2",
        title: "PENGANTAR MACHINE LEARNING OPERATIONS (MLOPS)",
        chapter_title: "PENGANTAR MACHINE LEARNING OPERATIONS (MLOPS)",
        orderIndex: 2,
        order_index: 2,
        modules: [
          {
            id: "mod-2-1",
            slug: "pengenalan-machine-learning-operations",
            title: "Pengenalan Machine Learning Operations",
            orderNumber: "2.1",
            order_index: 3,
            type: "article",
            durationMinutes: 15,
            isFree: false,
            summary: "Memahami latar belakang lahirnya disiplin MLOps dan perbedaan peran tim pengembang dengan tim operasional.",
            content: `
Sama halnya dengan integrasi antara tim software developer dan IT Operations, mereka memiliki prioritas, peralatan, dan pola kerjanya sendiri-sendiri sehingga sering kali menimbulkan pergolakan saat mereka bekerja sama.

**Developer** biasanya dituntut untuk cepat mengembangkan **fitur**, memperbaiki bug, dan menambah fitur pada sebuah aplikasi. Sayangnya, fokus pada kecepatan sering membuat kualitas kode terabaikan. Di sisi lain, **IT Operations** bertugas menjaga infrastruktur tetap stabil dan bebas dari bug (gangguan). Masalahnya, perubahan dari aplikasi—terutama dengan intensitas deployment yang tinggi—sering kali mengganggu stabilitas tersebut.
            `,
          },
        ],
      },
    ],
  },
];

// Helper / Repository Functions (Abstraksi Database MySQL)
export async function getAllCourses(): Promise<Course[]> {
  return initialCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = initialCourses.find((c) => c.slug === slug);
  return course || null;
}

export async function getCourseModule(
  courseSlug: string,
  moduleId: string
): Promise<{
  course: Course;
  chapter: Course["chapters"][0];
  moduleItem: Course["chapters"][0]["modules"][0];
  prevModule: Course["chapters"][0]["modules"][0] | null;
  nextModule: Course["chapters"][0]["modules"][0] | null;
} | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;

  // Flatten modules to find prev and next easily
  const allModules: {
    chapter: Course["chapters"][0];
    moduleItem: Course["chapters"][0]["modules"][0];
  }[] = [];

  for (const ch of course.chapters) {
    for (const mod of ch.modules) {
      allModules.push({ chapter: ch, moduleItem: mod });
    }
  }

  const currentIndex = allModules.findIndex(
    (item) => item.moduleItem.id === moduleId || item.moduleItem.slug === moduleId
  );

  if (currentIndex === -1) return null;

  const current = allModules[currentIndex];
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1].moduleItem : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1].moduleItem : null;

  return {
    course,
    chapter: current.chapter,
    moduleItem: current.moduleItem,
    prevModule,
    nextModule,
  };
}
