import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, PlayCircle, Sparkles, Clock } from "lucide-react";
import { getCourseBySlug } from "@/lib/materi/data";

interface PageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    return { title: "Kelas Tidak Ditemukan — Codex" };
  }

  return {
    title: `${course.title} — Silabus & Koridor Belajar | Codex`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const firstModule = course.chapters[0]?.modules[0];

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20 font-sans text-neutral-900">
      {/* Top Bar Navigasi */}
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-white/90 px-4 backdrop-blur-md sm:px-8">
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Kelas & Materi</span>
        </Link>
        <span className="text-xs font-bold text-blue-600">Koridor Kelas</span>
      </header>

      {/* Hero Header Kursus */}
      <section className="border-b border-neutral-200 bg-linear-to-b from-blue-50/60 via-white to-white px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{course.category}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-neutral-500 sm:text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>{course.totalModules} Modul Pembelajaran</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Tingkat: {course.level}</span>
            </div>
          </div>

          {firstModule && (
            <div className="mt-8">
              <Link
                href={`/materi/${course.slug}/${firstModule.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Mulai Belajar Sekarang</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Silabus & Bab Materi */}
      <main className="mx-auto mt-10 max-w-4xl px-4 sm:px-8">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Silabus & Kurikulum Kelas
        </h2>

        <div className="mt-6 space-y-6">
          {course.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs"
            >
              <div className="border-b border-neutral-100 bg-neutral-50/60 px-5 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Bab {chapter.orderIndex}
                </span>
                <h3 className="mt-0.5 text-sm font-bold text-neutral-800">
                  {chapter.title}
                </h3>
              </div>

              <div className="divide-y divide-neutral-100">
                {chapter.modules.map((mod) => (
                  <Link
                    key={mod.id}
                    href={`/materi/${course.slug}/${mod.slug}`}
                    className="group flex items-center justify-between p-4 transition-colors hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600 group-hover:bg-blue-100 group-hover:text-blue-600">
                        {mod.orderNumber}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-blue-600 sm:text-sm">
                          {mod.title}
                        </h4>
                        <span className="text-[11px] text-neutral-400">
                          {mod.durationMinutes} menit baca {mod.isFree && "• Gratis"}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
