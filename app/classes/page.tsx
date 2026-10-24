import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, GraduationCap, ArrowRight, Zap } from "lucide-react";
import { getAllCourses } from "@/lib/materi/data";

export const metadata: Metadata = {
  title: "Koridor Kelas & Pembelajaran — Xcode HMTI",
  description:
    "Ruang belajar terstruktur tempat anggota Xcode HMTI mempelajari kurikulum web development, materi ngoding, dan menyelesaikan modul.",
};

export default async function ClassesPage() {
  const courses = await getAllCourses();

  return (
    // Background Primary: Putih Gading (#F4F2EF) sesuai PRD Bagian 5.1
    <div className="min-h-screen bg-[#F4F2EF] pb-24 font-sans text-[#213E60]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E5E0D8] bg-white/95 px-4 backdrop-blur-md sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#213E60] hover:text-[#E68C3A] sm:text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold text-[#E68C3A]">Koridor Kelas Xcode</span>
        </div>
      </header>

      {/* Hero Header Koridor */}
      <section className="border-b border-[#E5E0D8] bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E68C3A]/30 bg-[#E68C3A]/10 px-3.5 py-1 text-xs font-bold text-[#E68C3A]">
            <GraduationCap className="h-4 w-4" />
            <span>Platform Belajar Komunitas Xcode HMTI</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#213E60] sm:text-5xl">
            Koridor Kelas & Modul Materi
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#213E60]/75">
            Pelajari modul materi ngoding terstruktur gaya <em>Dicoding Classroom</em>, kumpulkan poin keaktifan, dan bangun portofolio proyek nyata Anda.
          </p>
        </div>
      </section>

      {/* Grid Katalog Kelas */}
      <main className="mx-auto mt-12 max-w-5xl px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#213E60]">
              Daftar Kelas Tersedia
            </h2>
            <p className="text-xs text-[#213E60]/60 mt-0.5">Pilih kelas untuk mulai membaca modul dan mengumpulkan poin</p>
          </div>
          <span className="rounded-full bg-[#94B6EF]/20 px-3 py-1 text-xs font-bold text-[#213E60]">
            {courses.length} Kelas Aktif
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((course) => {
            const firstModule = course.chapters[0]?.modules[0];

            return (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#E68C3A] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-[#E68C3A]/10 px-3 py-0.5 font-bold text-[#E68C3A]">
                      {course.category}
                    </span>
                    <span className="font-semibold text-[#213E60]/60 capitalize">
                      Tingkat: {course.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#213E60] group-hover:text-[#E68C3A] transition-colors">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#213E60]/75">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-[#213E60]/60">
                    <div className="flex items-center gap-1.5 font-semibold text-[#213E60]">
                      <BookOpen className="h-3.5 w-3.5 text-[#E68C3A]" />
                      <span>{course.totalModules || course.total_modules} Modul</span>
                    </div>
                    <span>•</span>
                    <span>{course.chapters.length} Bab Materi</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#E68C3A] font-bold">
                      <Zap className="h-3 w-3 fill-[#E68C3A]" />
                      +5 Poin / modul
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#E5E0D8] pt-4">
                  <Link
                    href={`/classes/${course.slug}`}
                    className="text-xs font-bold text-[#213E60] hover:text-[#E68C3A] transition-colors"
                  >
                    Lihat Silabus Bab
                  </Link>

                  {firstModule && (
                    <Link
                      href={`/classes/${course.slug}/modules/${firstModule.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#E68C3A] px-4 py-2.5 text-xs font-bold text-white shadow-2xs transition-all hover:bg-[#E68C3A]/90 hover:scale-[1.02]"
                    >
                      <span>Masuk Ruang Baca</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
