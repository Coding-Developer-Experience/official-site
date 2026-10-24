import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import { getAllCourses } from "@/lib/materi/data";

export const metadata: Metadata = {
  title: "Koridor Belajar & Modul Materi — Codex",
  description:
    "Eksplorasi modul pembelajaran teknologi dan machine learning yang dirancang oleh dan untuk komunitas developer mahasiswa Codex.",
};

export default async function MateriIndexPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-24 font-sans text-neutral-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-white/90 px-4 backdrop-blur-md sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-xs font-bold text-blue-600">Pusat Materi Codex</span>
      </header>

      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-linear-to-b from-blue-50/70 via-white to-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <GraduationCap className="h-4 w-4" />
            <span>Koridor Belajar Mahasiswa</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Modul & Materi Pembelajaran
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Pelajari konsep teknologi, kurikulum terstruktur, dan best practices industri secara mendalam bersama komunitas pengembang.
          </p>
        </div>
      </section>

      {/* Grid Daftar Kursus */}
      <main className="mx-auto mt-12 max-w-5xl px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Kelas & Modul Tersedia
          </h2>
          <span className="text-xs text-neutral-500">{courses.length} Kelas Aktif</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((course) => {
            const firstModule = course.chapters[0]?.modules[0];

            return (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                      {course.category}
                    </span>
                    <span className="text-neutral-400">Tingkat {course.level}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-neutral-900 group-hover:text-blue-600">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                      <span>{course.totalModules} Modul</span>
                    </div>
                    <span>•</span>
                    <span>{course.chapters.length} Bab Kurikulum</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <Link
                    href={`/materi/${course.slug}`}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    Lihat Silabus
                  </Link>

                  {firstModule && (
                    <Link
                      href={`/materi/${course.slug}/${firstModule.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-blue-700"
                    >
                      <span>Masuk Kelas</span>
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
