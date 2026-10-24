"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Flame, Search, User, Sparkles, PanelLeft } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MateriTopBarProps {
  courseSlug: string;
  courseTitle: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
}

export default function MateriTopBar({
  courseSlug,
  isSidebarOpen,
  onToggleSidebar,
  onOpenSearch,
}: MateriTopBarProps) {
  // Global shortcut CTRL + /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        onOpenSearch?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur-md sm:px-6">
      {/* Kiri: Toggle Sidebar & Kembali ke koridor */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className={cn(
              "rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors",
              isSidebarOpen && "text-blue-600 bg-blue-50/60"
            )}
            title={isSidebarOpen ? "Tutup Sidebar" : "Buka Sidebar"}
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        <Link
          href={`/materi/${courseSlug}`}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-900 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke koridor</span>
        </Link>
      </div>

      {/* Kanan: Badge Sabak, Search Bar, Streak, Notifikasi & Akun */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Badge Sabak / Koin */}
        <div className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-2.5 py-1 text-xs font-medium text-amber-800 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Sabak</span>
        </div>

        {/* Search Shortcut */}
        <button
          onClick={onOpenSearch}
          type="button"
          className="relative hidden items-center md:flex text-left cursor-pointer"
        >
          <div className="flex h-8 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 text-xs text-neutral-400 hover:border-neutral-300 hover:bg-neutral-100/60 transition-colors">
            <Search className="h-3.5 w-3.5" />
            <span className="text-neutral-400">Cari materi...</span>
            <kbd className="ml-1 rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
              CTRL /
            </kbd>
          </div>
        </button>

        {/* Streak Point */}
        <div className="flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
          <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          <span>1</span>
        </div>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 border border-blue-200">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
