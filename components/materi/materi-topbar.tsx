"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Zap, Search, User, PanelLeft } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MateriTopBarProps {
  courseSlug: string;
  courseTitle: string;
  points?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
}

export default function MateriTopBar({
  courseSlug,
  points = 0,
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
    // Classroom Top Header (Tinggi tetap 64px / h-16 sesuai PRD Bagian 5.3)
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#E5E0D8] bg-white/95 px-4 backdrop-blur-md sm:px-6">
      {/* Sisi Kiri: Kembali ke Koridor Kelas & Toggle Sidebar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className={cn(
              "rounded-lg p-2 text-[#213E60]/70 hover:bg-[#F4F2EF] hover:text-[#213E60] transition-colors",
              isSidebarOpen && "text-[#E68C3A] bg-[#E68C3A]/10"
            )}
            title={isSidebarOpen ? "Sembunyikan Sidebar" : "Buka Sidebar"}
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        )}

        <Link
          href={`/classes`}
          className="group inline-flex items-center gap-2 text-xs font-semibold text-[#213E60] transition-colors hover:text-[#E68C3A] sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>← Kembali ke Koridor Kelas</span>
        </Link>
      </div>

      {/* Sisi Kanan: Kotak Pencarian, Poin Anggota, Notifikasi & Akun */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Kotak Pencarian Modul (Cari modul...) */}
        <button
          onClick={onOpenSearch}
          type="button"
          className="relative hidden items-center md:flex text-left cursor-pointer"
        >
          <div className="flex h-9 items-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F4F2EF] px-3 text-xs text-[#213E60]/60 hover:border-[#94B6EF] hover:bg-white transition-colors">
            <Search className="h-3.5 w-3.5 text-[#213E60]/50" />
            <span>Cari modul...</span>
            <kbd className="ml-1 rounded border border-[#E5E0D8] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#213E60]/70">
              CTRL /
            </kbd>
          </div>
        </button>

        {/* Indikator Poin Anggota (⚡ Poin sesuai PRD Bagian 5.3 & 10) */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#E68C3A]/30 bg-[#E68C3A]/10 px-3 py-1 text-xs font-bold text-[#E68C3A]">
          <Zap className="h-3.5 w-3.5 fill-[#E68C3A] text-[#E68C3A]" />
          <span>{points} Poin</span>
        </div>

        {/* Notifikasi */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="rounded-full p-2 text-[#213E60]/60 hover:bg-[#F4F2EF] hover:text-[#213E60] transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#213E60] text-white font-bold text-xs shadow-xs">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
