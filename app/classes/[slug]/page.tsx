import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, PlayCircle, Sparkles, Clock, Zap } from "lucide-react";
import { getCourseBySlug } from "@/lib/materi/data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return { title: "Kelas Tidak Ditemukan — Xcode HMTI" };
  }

  return {
    title: `${course.title} — Silabus Kelas | Xcode HMTI`,
    description: course.description,
  };
}

export default async function ClassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const firstModule = course.chapters[0]?.modules[0];

  return (
    <div className="min-h-screen bg-[#F4F2EF] pb-20 font-sans text-[#213E60]">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E5E0D8] bg-white/95 px-4 backdrop-blur-md sm:px-8">
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#213E60] hover:text-[#E68C3A] sm:text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>← Kembali ke Semua Kelas</span>
        </Link>
        <span className="text-xs font-extrabold text-[#E68C3A]">Silabus Kelas</span>
      </header>

      {/* Hero Header Kelas */}
      <section className="border-b border-[#E5E0D8] bg-white px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E68C3A]/30 bg-[#E68C3A]/10 px-3 py-1 text-xs font-bold text-[#E68C3A]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{course.category}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#213E60] sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-[#213E60]/80">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#213E60]/70 sm:text-sm">
            <div className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-4 w-4 text-[#E68C3A]" />
              <span>{course.totalModules} Modul Pembelajaran</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-[#E68C3A]" />
              <span className="capitalize">Tingkat: {course.level}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[#E68C3A]">
              <Zap className="h-4 w-4 fill-[#E68C3A]" />
              <span>+5 Poin per Modul Selesai</span>
            </div>
          </div>

          {firstModule && (
            <div className="mt-8">
              <Link
                href={`/classes/${course.slug}/modules/${firstModule.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E68C3A] px-6 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#E68C3A]/90 hover:scale-[1.02]"
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
        <h2 className="text-xl font-bold tracking-tight text-[#213E60]">
          Kurikulum & Daftar Bab
        </h2>

        <div className="mt-6 space-y-6">
          {course.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-xs"
            >
              <div className="border-b border-[#E5E0D8] bg-[#F4F2EF]/60 px-5 py-3.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#213E60]/60">
                  Bab {chapter.orderIndex || chapter.order_index}
                </span>
                <h3 className="mt-0.5 text-sm font-bold text-[#213E60]">
                  {chapter.title || chapter.chapter_title}
                </h3>
              </div>

              <div className="divide-y divide-[#E5E0D8]">
                {chapter.modules.map((mod) => (
                  <Link
                    key={mod.id}
                    href={`/classes/${course.slug}/modules/${mod.slug}`}
                    className="group flex items-center justify-between p-4 transition-colors hover:bg-[#F4F2EF]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F4F2EF] text-xs font-bold text-[#213E60] group-hover:bg-[#E68C3A] group-hover:text-white transition-colors">
                        {mod.orderNumber}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#213E60] group-hover:text-[#E68C3A] transition-colors">
                          {mod.title}
                        </h4>
                        <span className="text-[11px] text-[#213E60]/60">
                          {mod.durationMinutes} menit baca {mod.isFree && "• Gratis"}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-[#213E60]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#E68C3A]" />
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
