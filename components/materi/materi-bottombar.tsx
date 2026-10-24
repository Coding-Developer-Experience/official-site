"use client";

import { Sparkles, Maximize2, Minimize2, Bot } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MateriBottomBarProps {
  isWide: boolean;
  onToggleWide: () => void;
}

export default function MateriBottomBar({ isWide, onToggleWide }: MateriBottomBarProps) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userText = aiQuestion.trim();
    setChatLog((prev) => [...prev, { sender: "user", text: userText }]);
    setAiQuestion("");

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Pertanyaan bagus mengenai "${userText}". Dalam pengembangan web Laravel & MySQL di Xcode HMTI, pastikan arsitektur MVC dan validasi relasi database dipahami dengan baik agar kode siap untuk production!`,
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Bottom Bar (Palet B: Border #E5E0D8, Text #213E60) */}
      <footer className="sticky bottom-0 z-30 flex h-14 w-full items-center justify-between border-t border-[#E5E0D8] bg-white/95 px-4 backdrop-blur-md sm:px-8">
        {/* Asisten AI Prompt */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-xs font-bold text-[#213E60] sm:flex">
            <Bot className="h-4 w-4 text-[#E68C3A]" />
            <span>Learning with AI</span>
          </div>

          <button
            onClick={() => setIsAiOpen(true)}
            className="flex h-9 items-center gap-2 rounded-full border border-[#E5E0D8] bg-[#F4F2EF] px-4 text-xs font-semibold text-[#213E60]/80 shadow-2xs transition-all hover:border-[#E68C3A] hover:bg-white hover:text-[#213E60]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E68C3A]" />
            <span>Tanya Dibby apapun...</span>
          </button>
        </div>

        {/* Action Controls: Lebarkan & Layar Penuh */}
        <div className="flex items-center gap-3 text-xs font-semibold text-[#213E60]/80">
          <button
            onClick={onToggleWide}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-[#F4F2EF] hover:text-[#213E60] transition-colors"
          >
            {isWide ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isWide ? "Normalkan" : "Lebarkan"}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-[#F4F2EF] hover:text-[#213E60] transition-colors"
          >
            <Maximize2 className="h-4 w-4 text-[#213E60]/60" />
            <span className="hidden sm:inline">Layar Penuh</span>
          </button>
        </div>
      </footer>

      {/* AI Assistant Modal */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#213E60]/40 p-4 backdrop-blur-xs">
          <div className="flex h-[480px] w-full max-w-lg flex-col rounded-2xl border border-[#E5E0D8] bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] bg-[#F4F2EF]/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E68C3A]/15 text-[#E68C3A]">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#213E60]">Dibby AI Assistant</h3>
                  <p className="text-[11px] text-[#213E60]/60">Teman belajar ngoding Xcode HMTI</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiOpen(false)}
                className="rounded-lg p-1.5 text-[#213E60]/60 hover:bg-[#F4F2EF] hover:text-[#213E60]"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
              <div className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E68C3A]/20 text-xs">
                  🤖
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#F4F2EF] px-4 py-2.5 text-xs leading-relaxed text-[#213E60]">
                  Halo! Saya Dibby, asisten belajar AI Xcode. Ada konsep modul materi yang ingin Anda diskusikan?
                </div>
              </div>

              {chatLog.map((chat, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-2.5",
                    chat.sender === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs",
                      chat.sender === "user"
                        ? "bg-[#213E60] text-white"
                        : "bg-[#E68C3A]/20 text-[#E68C3A]"
                    )}
                  >
                    {chat.sender === "user" ? "👤" : "🤖"}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                      chat.sender === "user"
                        ? "rounded-tr-none bg-[#213E60] text-white"
                        : "rounded-tl-none bg-[#F4F2EF] text-[#213E60]"
                    )}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAskAi} className="border-t border-[#E5E0D8] p-3 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ketik pertanyaan Anda tentang materi ini..."
                  className="flex-1 rounded-xl border border-[#E5E0D8] bg-[#F4F2EF]/50 px-3.5 py-2.5 text-xs text-[#213E60] focus:border-[#E68C3A] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#E68C3A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#E68C3A]/90 transition-colors"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
