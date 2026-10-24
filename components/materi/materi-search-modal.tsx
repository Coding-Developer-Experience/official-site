"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, BookOpen, ChevronRight, X } from "lucide-react";
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
      chapterTitle: ch.title,
    }))
  );

  const filtered = query.trim()
    ? allModules.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.orderNumber.includes(query) ||
          m.summary?.toLowerCase().includes(query.toLowerCase()) ||
          m.chapterTitle.toLowerCase().includes(query.toLowerCase())
      )
    : allModules.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-900/40 pt-16 sm:pt-24 px-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center border-b border-neutral-100 px-4 py-3">
          <Search className="h-4 w-4 text-neutral-400 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari modul atau topik dalam kelas ini..."
            className="flex-1 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-500 hover:bg-neutral-100"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              Tidak ada modul yang cocok dengan pencarian &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {query ? "Hasil Pencarian" : "Modul Populer / Baru"}
              </div>
              {filtered.map((m) => (
                <Link
                  key={m.id}
                  href={`/materi/${course.slug}/${m.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-blue-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {m.orderNumber}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-blue-600">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-1">
                        {m.chapterTitle} • {m.durationMinutes} menit
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
