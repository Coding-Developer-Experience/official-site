"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlossaryTermProps {
  term: string;
  definition: string;
  category?: string;
  children: React.ReactNode;
}

export default function GlossaryTerm({
  term,
  definition,
  category = "Istilah Teknis",
  children,
}: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="cursor-pointer font-medium underline decoration-blue-400 decoration-1 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600 focus:outline-none"
      >
        {children}
      </button>

      {isOpen && (
        <span
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-3 text-left shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
          )}
        >
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
            <Info className="h-3 w-3" />
            <span>{category}</span>
          </span>
          <span className="mt-1 block text-xs font-bold text-neutral-900">{term}</span>
          <span className="mt-1 block text-[11px] leading-relaxed text-neutral-600">
            {definition}
          </span>
          {/* Arrow */}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-neutral-200 bg-white" />
        </span>
      )}
    </span>
  );
}
