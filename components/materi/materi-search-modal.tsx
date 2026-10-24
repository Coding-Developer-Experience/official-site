"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ChevronRight, X } from "lucide-react";
import { Course } from "@/lib/materi/types";

interface MateriSearchModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export default function MateriSearchModal({
  course,
  isOpen,
  onClose,
}: MateriSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Flatten all modules for search
  const allModules = course.chapters.flatMap((ch) =>
    ch.modules.map((m) => ({
      ...m,
      chapterTitle: ch.title || ch.chapter_title || "",
    }))
  );

  const filtered = query.trim()
    ? allModules.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.orderNumber?.includes(query) ||
          m.summary?.toLowerCase().includes(query.toLowerCase()) ||
          m.chapterTitle.toLowerCase().includes(query.toLowerCase())
      )
    : allModules.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#213E60]/40 pt-16 sm:pt-24 px-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-[#E5E0D8] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center border-b border-[#E5E0D8] px-4 py-3 bg-[#F4F2EF]/50">
          <Search className="h-4 w-4 text-[#213E60]/50 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari modul atau topik dalam kelas ini..."
            className="flex-1 text-sm text-[#213E60] placeholder-[#213E60]/40 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded p-1 text-[#213E60]/50 hover:text-[#213E60]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded-lg border border-[#E5E0D8] bg-white px-2 py-0.5 text-[11px] font-bold text-[#213E60]/60 hover:bg-[#F4F2EF]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 bg-white">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#213E60]/50">
              Tidak ada modul yang cocok dengan &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#213E60]/50">
                {query ? "Hasil Pencarian" : "Modul Tersedia"}
              </div>
              {filtered.map((m) => (
                <Link
                  key={m.id}
                  href={`/classes/${course.slug}/modules/${m.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-[#F4F2EF] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E68C3A]/15 text-[#E68C3A] text-xs font-bold group-hover:bg-[#E68C3A] group-hover:text-white transition-colors">
                      {m.orderNumber}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#213E60] group-hover:text-[#E68C3A]">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-[#213E60]/60 line-clamp-1">
                        {m.chapterTitle} • {m.durationMinutes} menit
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#213E60]/30 group-hover:text-[#E68C3A] group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
