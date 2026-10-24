"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Trash2, FileEdit } from "lucide-react";

interface MateriNotesProps {
  moduleId: string;
  moduleTitle: string;
}

export default function MateriNotes({ moduleId, moduleTitle }: MateriNotesProps) {
  const [note, setNote] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [copied, setCopied] = useState(false);

  const storageKey = `xcode_materi_notes_${moduleId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setNote(saved);
      } else {
        setNote("");
      }
      setSaveStatus("idle");
    } catch {}
  }, [moduleId, storageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNote(val);
    setSaveStatus("saving");

    try {
      localStorage.setItem(storageKey, val);
      setTimeout(() => {
        setSaveStatus("saved");
      }, 400);
    } catch {
      setSaveStatus("idle");
    }
  };

  const handleClear = () => {
    if (confirm("Hapus catatan untuk modul ini?")) {
      setNote("");
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      setSaveStatus("idle");
    }
  };

  const handleCopy = () => {
    if (!note) return;
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex h-full flex-col p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#213E60]">
          <FileEdit className="h-3.5 w-3.5 text-[#E68C3A]" />
          <span>Catatan Belajar</span>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          {saveStatus === "saving" && (
            <span className="text-[#E68C3A] font-bold">Menyimpan...</span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-0.5 text-[#10B981] font-bold">
              <Check className="h-3 w-3" />
              <span>Tersimpan</span>
            </span>
          )}
        </div>
      </div>

      <p className="mt-1 text-[11px] text-[#213E60]/60 line-clamp-1">
        Tersambung ke modul: {moduleTitle}
      </p>

      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Ketik catatan penting, rangkuman kode, atau pertanyaan untuk mentor di sini..."
        className="mt-3 flex-1 resize-none rounded-xl border border-[#E5E0D8] bg-[#F4F2EF]/50 p-3 text-xs leading-relaxed text-[#213E60] placeholder-[#213E60]/40 focus:border-[#E68C3A] focus:bg-white focus:outline-none transition-colors"
      />

      <div className="mt-3 flex items-center justify-between border-t border-[#E5E0D8] pt-3">
        <button
          onClick={handleClear}
          disabled={!note}
          className="flex items-center gap-1 text-[11px] text-[#213E60]/50 hover:text-[#EF4444] disabled:opacity-40 transition-colors cursor-pointer"
          title="Hapus Catatan"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Hapus</span>
        </button>

        <button
          onClick={handleCopy}
          disabled={!note}
          className="flex items-center gap-1 rounded-lg border border-[#E5E0D8] bg-white px-2.5 py-1 text-[11px] font-bold text-[#213E60] hover:bg-[#F4F2EF] disabled:opacity-40 transition-colors cursor-pointer"
        >
          {copied ? <Check className="h-3 w-3 text-[#10B981]" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Tersalin" : "Salin Catatan"}</span>
        </button>
      </div>
    </div>
  );
}
