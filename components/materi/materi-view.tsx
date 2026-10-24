"use client";

import { useState, useEffect } from "react";
import { Course, Chapter, ModuleItem } from "@/lib/materi/types";
import MateriTopBar from "./materi-topbar";
import MateriSidebar from "./materi-sidebar";
import MateriReader from "./materi-reader";
import MateriBottomBar from "./materi-bottombar";
import MateriSearchModal from "./materi-search-modal";
import { cn } from "@/lib/utils";

interface MateriViewProps {
  course: Course;
  chapter: Chapter;
  moduleItem: ModuleItem;
  prevModule: ModuleItem | null;
  nextModule: ModuleItem | null;
}

const DEFAULT_COMPLETED = [
  "mod-1-1",
  "mod-1-2",
  "mod-1-3",
  "mod-1-4",
  "mod-1-5",
  "mod-1-6",
  "mod-1-7",
  "mod-1-8",
];

export default function MateriView({
  course,
  chapter,
  moduleItem,
  prevModule,
  nextModule,
}: MateriViewProps) {
  const [activeTab, setActiveTab] = useState<"modules" | "notes">("modules");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWide, setIsWide] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const storageKey = `xcode_materi_completed_${course.slug}`;

  // Status completed modules (with LocalStorage cache fallback)
  const [completedIds, setCompletedIds] = useState<string[]>(DEFAULT_COMPLETED);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedIds(JSON.parse(saved));
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [storageKey]);

  const isCurrentCompleted = completedIds.includes(moduleItem.id);

  const toggleCurrentComplete = () => {
    setCompletedIds((prev) => {
      const updated = prev.includes(moduleItem.id)
        ? prev.filter((id) => id !== moduleItem.id)
        : [...prev, moduleItem.id];
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white text-neutral-900 font-sans">
      {/* 1. Top Bar */}
      <MateriTopBar
        courseSlug={course.slug}
        courseTitle={course.title}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Workspace Tengah: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <MateriSidebar
          course={course}
          activeModuleId={moduleItem.id}
          completedModuleIds={completedIds}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Content Area */}
        <main
          className={cn(
            "flex-1 overflow-y-auto bg-white transition-all duration-300",
            isWide ? "max-w-none" : ""
          )}
        >
          <MateriReader
            course={course}
            chapterTitle={chapter.title}
            moduleItem={moduleItem}
            prevModule={prevModule}
            nextModule={nextModule}
            isCompleted={isCurrentCompleted}
            onToggleComplete={toggleCurrentComplete}
          />
        </main>
      </div>

      {/* 3. Floating Bottom Bar */}
      <MateriBottomBar
        isWide={isWide}
        onToggleWide={() => {
          setIsWide((prev) => !prev);
          if (!isWide) {
            setIsSidebarOpen(false); // Otomatis sembunyikan sidebar saat mode lebar aktif
          }
        }}
      />

      {/* 4. Global Instant Search Modal (CTRL /) */}
      <MateriSearchModal
        course={course}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
