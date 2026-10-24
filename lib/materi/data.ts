import { Course } from "./types";

export const initialCourses: Course[] = [
  {
    id: "course-mlops-01",
    slug: "membangun-sistem-machine-learning",
    title: "Membangun Sistem Machine Learning",
    category: "Machine Learning & AI",
    level: "Menengah",
    description:
      "Pelajari prinsip MLOps dari hulu ke hilir: lifecycle machine learning, otomatisasi pipeline, hingga deployment dan monitoring di production.",
    totalModules: 72,
    chapters: [
      {
        id: "ch-1",
        title: "PERSIAPAN BELAJAR",
        orderIndex: 1,
        modules: [
          {
            id: "mod-1-1",
            slug: "persetujuan-hak-cipta",
            title: "Persetujuan Hak Cipta",
            orderNumber: "1.1",
            type: "article",
            durationMinutes: 5,
            isFree: true,
            summary: "Syarat dan ketentuan hak cipta materi pembelajaran.",
            content: `
### Persetujuan Hak Cipta

Selamat datang di kelas **Membangun Sistem Machine Learning**! Sebelum memulai proses belajar, mohon pahami bahwa seluruh materi, kode contoh, dan ilustrasi di dalam kelas ini dilindungi oleh hak cipta komunitas dan penyusun materi.

#### Ketentuan Penggunaan:
1. Materi ini diperuntukkan untuk pengembangan diri dan pembelajaran pribadi.
2. Dilarang menggandakan atau menyebarluaskan materi tanpa izin tertulis.
3. Anda diperbolehkan menggunakan kode contoh untuk proyek pribadi atau portofolio Anda.
            `,
          },
          {
            id: "mod-1-2",
            slug: "pengenalan-kelas",
            title: "Pengenalan Kelas",
            orderNumber: "1.2",
            type: "article",
            durationMinutes: 10,
            isFree: true,
            summary: "Gambaran umum silabus dan target pembelajaran.",
            content: `
### Pengenalan Kelas

Dalam dunia modern, membuat model Machine Learning saja tidaklah cukup. Tantangan terbesar adalah bagaimana model tersebut dapat diintegrasikan ke sistem nyata, di-deploy secara handal, dan dipantau saat data di dunia nyata terus berubah.

Kelas ini didesain agar Anda memahami **MLOps (Machine Learning Operations)** secara komprehensif.
            `,
          },
          {
            id: "mod-1-3",
            slug: "prasyarat-kemampuan",
            title: "Prasyarat Kemampuan",
            orderNumber: "1.3",
            type: "article",
            durationMinutes: 5,
            isFree: true,
            summary: "Kemampuan dasar yang dibutuhkan sebelum memulai.",
            content: `
### Prasyarat Kemampuan

Sebelum mengikuti kelas ini, pastikan Anda telah memahami:
- Dasar pemrograman Python.
- Konsep dasar Machine Learning (training, testing, metrics evaluasi).
- Dasar Git dan version control.
            `,
          },
          {
            id: "mod-1-4",
            slug: "prasyarat-tools",
            title: "Prasyarat Tools",
            orderNumber: "1.4",
            type: "article",
            durationMinutes: 10,
            isFree: true,
            summary: "Perangkat lunak yang perlu disiapkan.",
            content: `
### Prasyarat Tools

Beberapa tools yang akan digunakan sepanjang kelas:
- **Python 3.10+**
- **Docker & Docker Desktop**
- **VS Code atau IDE pilihan Anda**
- Akun Git (GitHub / GitLab)
            `,
          },
          {
            id: "mod-1-5",
            slug: "mekanisme-belajar",
            title: "Mekanisme Belajar",
            orderNumber: "1.5",
            type: "article",
            durationMinutes: 5,
            isFree: true,
            summary: "Tata cara belajar dan penyelesaian tugas.",
            content: `
### Mekanisme Belajar

- Pelajari setiap modul secara berurutan.
- Kerjakan kuis dan latihan coding yang disediakan.
- Gunakan fitur **Catatan Belajar** di panel samping untuk mencatat poin penting.
- Manfaatkan asisten AI jika Anda mengalami kesulitan memahami konsep tertentu.
            `,
          },
          {
            id: "mod-1-6",
            slug: "forum-diskusi",
            title: "Forum Diskusi",
            orderNumber: "1.6",
            type: "article",
            durationMinutes: 5,
            isFree: false,
            summary: "Bergabung dengan komunitas pembelajar.",
            content: `
### Forum Diskusi

Tanyakan kendala yang Anda temui langsung di forum komunitas Discord Xcode. Tim mentor dan sesama rekan mahasiswa siap membantu menjawab pertanyaan Anda!
            `,
          },
          {
            id: "mod-1-7",
            slug: "glosarium",
            title: "Glosarium",
            orderNumber: "1.7",
            type: "article",
            durationMinutes: 8,
            isFree: false,
            summary: "Daftar istilah penting dalam MLOps.",
            content: `
### Glosarium Istilah

- **MLOps**: Machine Learning Operations.
- **Data Drift**: Perubahan distribusi input data dari waktu ke waktu.
- **Concept Drift**: Perubahan hubungan antara input fitur dengan target prediksi.
- **CI/CD**: Continuous Integration / Continuous Deployment.
            `,
          },
          {
            id: "mod-1-8",
            slug: "daftar-referensi",
            title: "Daftar Referensi",
            orderNumber: "1.8",
            type: "article",
            durationMinutes: 5,
            isFree: false,
            summary: "Buku, paper, dan dokumentasi acuan.",
            content: `
### Daftar Referensi Acuan

1. *Designing Machine Learning Systems* oleh Chip Huyen.
2. *Machine Learning Engineering in Action* oleh Ben Wilson.
3. Dokumentasi resmi MLflow, Kubeflow, dan DVC.
            `,
          },
        ],
      },
      {
        id: "ch-2",
        title: "PENGANTAR MACHINE LEARNING OPERATIONS (MLOPS)",
        orderIndex: 2,
        modules: [
          {
            id: "mod-2-1",
            slug: "pengenalan-machine-learning-operations",
            title: "Pengenalan Machine Learning Operations",
            orderNumber: "2.1",
            type: "article",
            durationMinutes: 15,
            isFree: false,
            summary: "Memahami latar belakang lahirnya disiplin MLOps dan perbedaan peran tim pengembang dengan tim operasional.",
            content: `
Sama halnya dengan integrasi antara tim software developer dan IT Operations, mereka memiliki prioritas, peralatan, dan pola kerjanya sendiri-sendiri sehingga sering kali menimbulkan pergolakan saat mereka bekerja sama.

**Developer** biasanya dituntut untuk cepat mengembangkan **fitur**, memperbaiki bug, dan menambah fitur pada sebuah aplikasi. Sayangnya, fokus pada kecepatan sering membuat kualitas kode terabaikan. Di sisi lain, **IT Operations** bertugas menjaga infrastruktur tetap stabil dan bebas dari bug (gangguan). Masalahnya, perubahan dari aplikasi—terutama dengan intensitas deployment yang tinggi—sering kali mengganggu stabilitas tersebut.

Konflik ini sering berujung pada kurangnya pemahaman dan komunikasi. Developer cenderung *"melempar kode"* ke IT Operations tanpa memikirkan bagaimana kode tersebut berjalan di **production** dengan dalih *"Kodenya berjalan di laptopku"*.

Sementara IT Operations menerima kode tanpa memahami tujuannya. Ketika ini terjadi tentunya stabilitas sistem menjadi taruhannya.

Dalam konteks Machine Learning, tantangan ini berlipat ganda: kita tidak hanya mengelola kode aplikasi, namun juga mengelola **data**, **model**, dan **dependensi komputasi** (GPU/CPU) yang terus berkembang secara dinamis.
            `,
          },
          {
            id: "mod-2-2",
            slug: "permasalahan-umum-ketika-membangun-sistem-machine-learning",
            title: "Permasalahan Umum ketika Membangun Sistem Machine Learning",
            orderNumber: "2.2",
            type: "article",
            durationMinutes: 15,
            isFree: false,
            summary: "Tantangan teknis dan kultural dalam mengoperasikan ML di production.",
            content: `
### Permasalahan Umum Sistem ML

1. **Hidden Technical Debt in Machine Learning**: Hanya sebagian kecil kode yang berisi model ML sesungguhnya; mayoritas sistem terdiri dari plumbing data, verifikasi, konfigurasi, dan monitoring.
2. **Reproducibility**: Bagaimana memastikan hasil training model yang sama dapat diulang 6 bulan dari sekarang?
3. **Data Quality & Testing**: Kode bisa berjalan sempurna tanpa syntax error, namun menghasilkan output salah karena data input terdegradasi.
            `,
          },
          {
            id: "mod-2-3",
            slug: "machine-learning-life-cycle",
            title: "Machine Learning Life Cycle",
            orderNumber: "2.3",
            type: "article",
            durationMinutes: 20,
            isFree: false,
            summary: "Siklus hidup ML dari perumusan masalah, eksplorasi data, hingga monitoring pasca-rilis.",
            content: `
### Siklus Hidup Machine Learning (ML Life Cycle)

Siklus MLOps terdiri dari fase berulang:
1. **Scoping**: Menentukan tujuan bisnis dan metrik evaluasi.
2. **Data**: Pengumpulan, pembersihan, pelabelan, dan versioning data.
3. **Modeling**: Pelatihan model, hyperparameter tuning, dan pengujian performa.
4. **Deployment**: Membawa model ke environment serving (API / batch inference).
5. **Monitoring**: Memantau degradasi performa, data drift, dan latensi.
            `,
          },
          {
            id: "mod-2-4",
            slug: "mlops-maturity",
            title: "MLOps Maturity",
            orderNumber: "2.4",
            type: "article",
            durationMinutes: 12,
            isFree: false,
            summary: "Tingkatan maturitas adopsi MLOps pada organisasi.",
            content: `
### Tingkat Kematangan MLOps (MLOps Maturity Level)

Menurut Google Cloud Architecture Framework:
- **Level 0**: Proses manual (Jupyter notebook, manual deploy).
- **Level 1**: Continuous Training (otomatisasi pipeline training saat ada data baru).
- **Level 2**: Otomatisasi CI/CD Pipeline lengkap (kode, data, model terintegrasi end-to-end).
            `,
          },
        ],
      },
    ],
  },
];

// Helper / Repository Functions (Abstraksi Database)
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
