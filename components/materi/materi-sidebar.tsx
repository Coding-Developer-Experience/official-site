"use client";

import Link from "next/link";
import { CheckCircle2, ChevronDown, BookOpen, FileText, PanelLeftClose } from "lucide-react";
import { useState } from "react";
import { Course } from "@/lib/materi/types";
import { cn } from "@/lib/utils";
import MateriNotes from "./materi-notes";

interface MateriSidebarProps {
  course: Course;
  activeModuleId: string;
  completedModuleIds?: string[];
  activeTab: "modules" | "notes";
  setActiveTab: (tab: "modules" | "notes") => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MateriSidebar({
  course,
  activeModuleId,
  completedModuleIds = [],
  activeTab,
  setActiveTab,
  isOpen,
  onToggle,
}: MateriSidebarProps) {
  // Collapse state for each chapter
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    "ch-lar-1": true,
    "ch-lar-2": true,
    "ch-lar-3": true,
    "ch-1": true,
    "ch-2": true,
  });

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const totalCourseModules = course.chapters.reduce(
    (acc, ch) => acc + ch.modules.length,
    0
  );
  const completedCount = completedModuleIds.length || 0;
  const progressPercent = totalCourseModules > 0
    ? Math.round((completedCount / totalCourseModules) * 100)
    : 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-[#213E60]/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Left Sidebar Navigasi Modul (Lebar 320px / w-80 sesuai PRD Bagian 5.3) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-80 flex-col border-r border-[#E5E0D8] bg-white pt-16 transition-all duration-300 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:w-0 md:border-r-0 md:overflow-hidden"
        )}
      >
        {/* Header Kelas Aktif & Progress Bar (Gaya Dicoding Classroom) */}
        <div className="border-b border-[#E5E0D8] bg-[#F4F2EF]/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#213E60]/70">
              KELAS AKTIF
            </span>
            <button
              onClick={onToggle}
              className="rounded p-1 text-[#213E60]/50 hover:bg-white hover:text-[#213E60] md:hidden"
              title="Tutup Sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <h2 className="mt-1 text-sm font-bold text-[#213E60] line-clamp-1">
            {course.title}
          </h2>

          {/* Indikator X / Y modul di kiri, persentase di kanan (PRD Bagian 5.3) */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#213E60]/80">
            <span>
              <strong className="text-[#213E60]">{completedCount}</strong> / {totalCourseModules} modul
            </span>
            <span className="font-bold text-[#E68C3A]">{progressPercent}%</span>
          </div>

          {/* Progress Bar Visual (Warna Oranye Xcode #E68C3A) */}
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E5E0D8]">
            <div
              className="h-full rounded-full bg-[#E68C3A] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Switcher Tab: Daftar Modul vs Catatan Belajar */}
        <div className="flex border-b border-[#E5E0D8] bg-white px-2 pt-2">
          <button
            onClick={() => setActiveTab("modules")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-bold transition-colors",
              activeTab === "modules"
                ? "border-[#E68C3A] text-[#E68C3A]"
                : "border-transparent text-[#213E60]/60 hover:text-[#213E60]"
            )}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Daftar Modul</span>
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-xs font-bold transition-colors",
              activeTab === "notes"
                ? "border-[#E68C3A] text-[#E68C3A]"
                : "border-transparent text-[#213E60]/60 hover:text-[#213E60]"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Catatan Belajar</span>
          </button>
        </div>

        {/* Konten Tab: Daftar Bab & Modul */}
        <div className="flex-1 overflow-y-auto px-2 py-3 bg-white">
          {activeTab === "modules" ? (
            <div className="space-y-4">
              {course.chapters.map((chapter) => {
                const isExpanded = openChapters[chapter.id] ?? true;
                const chapterCompleted = chapter.modules.every((m) =>
                  completedModuleIds.includes(m.id)
                );

                return (
                  <div key={chapter.id} className="rounded-xl">
                    {/* Chapter Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="flex w-full items-center justify-between px-2.5 py-1.5 text-left text-xs font-extrabold uppercase tracking-wide text-[#213E60]/75 hover:text-[#213E60]"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200 text-[#213E60]/50",
                            !isExpanded && "-rotate-90"
                          )}
                        />
                        <span className="line-clamp-1">{chapter.title || chapter.chapter_title}</span>
                      </div>
                      {chapterCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                      )}
                    </button>

                    {/* Chapter Module Items */}
                    {isExpanded && (
                      <div className="mt-1 space-y-1">
                        {chapter.modules.map((mod) => {
                          const isActive =
                            mod.id === activeModuleId || mod.slug === activeModuleId;
                          const isDone = completedModuleIds.includes(mod.id);

                          return (
                            <Link
                              key={mod.id}
                              href={`/classes/${course.slug}/modules/${mod.slug}`}
                              className={cn(
                                "group flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-150",
                                isActive
                                  ? "bg-[#94B6EF]/15 text-[#213E60] font-semibold border border-[#94B6EF]/60 shadow-2xs"
                                  : "text-[#213E60]/80 hover:bg-[#F4F2EF] hover:text-[#213E60]"
                              )}
                            >
                              {/* Ikon Lingkaran Centang Hijau (#10B981) sesuai PRD Bagian 5.3 */}
                              <div className="mt-0.5 shrink-0">
                                <CheckCircle2
                                  className={cn(
                                    "h-4 w-4 transition-colors",
                                    isDone
                                      ? "text-[#10B981] fill-[#10B981]/15"
                                      : "text-[#E5E0D8] group-hover:text-[#94B6EF]",
                                    isActive && !isDone && "text-[#E68C3A]"
                                  )}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <span
                                  className={cn(
                                    "text-xs leading-snug line-clamp-2",
                                    isActive ? "font-bold text-[#213E60]" : "text-[#213E60]/90"
                                  )}
                                >
                                  {mod.title}
                                </span>
                                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#213E60]/50">
                                  <span>{mod.orderNumber}</span>
                                  {mod.isFree && (
                                    <span className="rounded bg-[#10B981]/10 px-1.5 py-0.2 text-[10px] font-bold text-[#10B981]">
                                      Gratis
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Tab Catatan Belajar */
            <MateriNotes
              moduleId={activeModuleId}
              moduleTitle={
                course.chapters
                  .flatMap((ch) => ch.modules)
                  .find((m) => m.id === activeModuleId || m.slug === activeModuleId)
                  ?.title || "Modul"
              }
            />
          )}
        </div>
      </aside>
    </>
  );
}
