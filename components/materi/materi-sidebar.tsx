"use client";

import Link from "next/link";
import { CheckCircle2, ChevronDown, BookOpen, FileText, PanelLeftClose, PanelLeft } from "lucide-react";
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
          className="fixed inset-0 z-30 bg-neutral-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full w-80 flex-col border-r border-neutral-200 bg-white pt-14 transition-all duration-300 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:w-0 md:border-r-0 md:overflow-hidden"
        )}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Modul Kelas
            </span>
          </div>
          <button
            onClick={onToggle}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
            title="Sembunyikan Sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        {/* Info Kelas Aktif & Progress Bar */}
        <div className="border-b border-neutral-100 bg-neutral-50/70 p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Kelas Aktif
          </span>
          <h2 className="mt-0.5 text-sm font-bold text-neutral-900 line-clamp-1">
            {course.title}
          </h2>

          <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
            <span>
              <strong className="text-neutral-800">{completedCount}</strong> / {totalCourseModules} modul
            </span>
            <span className="font-semibold text-blue-600">{progressPercent}%</span>
          </div>

          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Switcher Tab: Daftar Modul vs Catatan Belajar */}
        <div className="flex border-b border-neutral-200 bg-white px-2 pt-2">
          <button
            onClick={() => setActiveTab("modules")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-2 text-xs font-semibold transition-colors",
              activeTab === "modules"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            )}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Daftar Modul</span>
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-2 text-xs font-semibold transition-colors",
              activeTab === "notes"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Catatan Belajar</span>
          </button>
        </div>

        {/* Konten Tab: Daftar Bab & Modul */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
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
                      className="flex w-full items-center justify-between px-2 py-1.5 text-left text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-neutral-800"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200 text-neutral-400",
                            !isExpanded && "-rotate-90"
                          )}
                        />
                        <span className="line-clamp-1">{chapter.title}</span>
                      </div>
                      {chapterCompleted && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      )}
                    </button>

                    {/* Chapter Module Items */}
                    {isExpanded && (
                      <div className="mt-1 space-y-0.5">
                        {chapter.modules.map((mod) => {
                          const isActive =
                            mod.id === activeModuleId || mod.slug === activeModuleId;
                          const isDone = completedModuleIds.includes(mod.id);

                          return (
                            <Link
                              key={mod.id}
                              href={`/materi/${course.slug}/${mod.slug}`}
                              className={cn(
                                "group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-150",
                                isActive
                                  ? "bg-blue-50 text-blue-900 font-medium shadow-xs border border-blue-200/80"
                                  : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                              )}
                            >
                              <div className="mt-0.5 shrink-0">
                                <CheckCircle2
                                  className={cn(
                                    "h-4 w-4 transition-colors",
                                    isDone
                                      ? "text-emerald-500 fill-emerald-50"
                                      : "text-neutral-300 group-hover:text-neutral-400",
                                    isActive && !isDone && "text-blue-500"
                                  )}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span
                                    className={cn(
                                      "text-xs leading-snug line-clamp-2",
                                      isActive ? "font-semibold text-blue-950" : "text-neutral-700"
                                    )}
                                  >
                                    {mod.title}
                                  </span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
                                  <span>{mod.orderNumber}</span>
                                  {mod.isFree && (
                                    <span className="rounded bg-emerald-50 px-1 py-0.2 text-[10px] font-semibold text-emerald-700">
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
