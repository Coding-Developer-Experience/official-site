"use client";

import { Sparkles, Maximize2, Minimize2, MessageSquare, Bot } from "lucide-react";
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

    // Simple simulated response
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Pertanyaan bagus mengenai "${userText}". Dalam MLOps, kuncinya adalah konsistensi antara environment development (laptop Anda) dengan production menggunakan kontainerisasi seperti Docker dan pipeline CI/CD otomatis!`,
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      <footer className="sticky bottom-0 z-30 flex h-14 w-full items-center justify-between border-t border-neutral-200 bg-white/90 px-4 backdrop-blur-md sm:px-8">
        {/* Asisten AI Prompt */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 text-xs font-semibold text-neutral-600 sm:flex">
            <Bot className="h-4 w-4 text-blue-600" />
            <span>Learning with AI</span>
          </div>

          <button
            onClick={() => setIsAiOpen(true)}
            className="flex h-9 items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 text-xs font-medium text-neutral-600 shadow-2xs transition-colors hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>Tanya Dibby apapun...</span>
          </button>
        </div>

        {/* Action Controls: Lebarkan & Layar Penuh */}
        <div className="flex items-center gap-3 text-xs font-medium text-neutral-600">
          <button
            onClick={onToggleWide}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            {isWide ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isWide ? "Normalkan" : "Lebarkan"}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <Maximize2 className="h-4 w-4 text-neutral-500" />
            <span className="hidden sm:inline">Layar Penuh</span>
          </button>
        </div>
      </footer>

      {/* AI Assistant Modal / Drawer */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4 backdrop-blur-xs">
          <div className="flex h-[480px] w-full max-w-lg flex-col rounded-2xl border border-neutral-200 bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Dibby AI Assistant</h3>
                  <p className="text-[11px] text-neutral-400">Teman belajar interaktif Anda</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiOpen(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">
                  🤖
                </div>
                <div className="rounded-2xl rounded-tl-none bg-neutral-100 px-4 py-2.5 text-xs leading-relaxed text-neutral-700">
                  Halo! Saya Dibby, asisten belajar AI Anda. Ada bagian materi MLOps ini yang ingin Anda tanyakan atau diskusikan?
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
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-600"
                    )}
                  >
                    {chat.sender === "user" ? "👤" : "🤖"}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                      chat.sender === "user"
                        ? "rounded-tr-none bg-blue-600 text-white"
                        : "rounded-tl-none bg-neutral-100 text-neutral-700"
                    )}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAskAi} className="border-t border-neutral-100 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ketik pertanyaan Anda tentang materi ini..."
                  className="flex-1 rounded-xl border border-neutral-200 px-3.5 py-2 text-xs focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
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
