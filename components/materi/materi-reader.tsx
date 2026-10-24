"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Bookmark, Zap } from "lucide-react";
import { ModuleItem, Course } from "@/lib/materi/types";
import { cn } from "@/lib/utils";
import GlossaryTerm from "./materi-glossary";
import MateriContentRenderer from "./materi-content-renderer";

interface MateriReaderProps {
  course: Course;
  chapterTitle: string;
  moduleItem: ModuleItem;
  prevModule: ModuleItem | null;
  nextModule: ModuleItem | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export default function MateriReader({
  course,
  chapterTitle,
  moduleItem,
  prevModule,
  nextModule,
  isCompleted,
  onToggleComplete,
}: MateriReaderProps) {
  return (
    // Main Content Area (Lebar baca ergonomis max-width: 768px di tengah area konten sesuai PRD Bagian 5.3)
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] pb-4 text-xs text-[#213E60]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#213E60]">{chapterTitle}</span>
          <span>•</span>
          <span className="rounded-md bg-[#94B6EF]/20 px-2 py-0.5 font-bold text-[#213E60]">
            Modul {moduleItem.orderNumber}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-[#E68C3A]/10 px-2 py-0.5 font-bold text-[#E68C3A]">
            <Zap className="h-3 w-3 fill-[#E68C3A]" />
            +5 Poin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#213E60]/60">
            <Clock className="h-3.5 w-3.5" />
            <span>{moduleItem.durationMinutes || moduleItem.estimated_minutes || 10} menit baca</span>
          </div>
          <button
            type="button"
            className="text-[#213E60]/50 hover:text-[#E68C3A] transition-colors"
            title="Simpan Bookmark"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Heading Modul */}
      <div className="mt-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#213E60] sm:text-3xl">
          {moduleItem.title}
        </h1>
        {moduleItem.summary && (
          <p className="mt-2 text-sm leading-relaxed text-[#213E60]/75 sm:text-base">
            {moduleItem.summary}
          </p>
        )}
      </div>

      {/* Konten Utama (Ukuran font 16px–18px, line-height 1.75 sesuai PRD Bagian 5.3) */}
      <div className="mt-8 space-y-6 text-base leading-[1.75] text-[#213E60]/90">
        {moduleItem.id === "mod-2-1" || moduleItem.slug === "pengenalan-machine-learning-operations" ? (
          <>
            <p>
              Sama halnya dengan integrasi antara tim software developer dan IT Operations, mereka memiliki prioritas, peralatan, dan pola kerjanya sendiri-sendiri sehingga sering kali menimbulkan pergolakan saat mereka bekerja sama.
            </p>

            <p>
              <GlossaryTerm
                term="Developer (Software Engineer)"
                definition="Pengembang perangkat lunak yang bertugas merancang arsitektur kode, membuat fungsionalitas aplikasi, dan memperbaiki bug."
              >
                Developer
              </GlossaryTerm>{" "}
              biasanya dituntut untuk cepat mengembangkan{" "}
              <GlossaryTerm
                term="Fitur (Feature)"
                definition="Kemampuan atau fungsi spesifik baru yang ditambahkan ke aplikasi untuk kebutuhan pengguna atau bisnis."
              >
                fitur
              </GlossaryTerm>
              , memperbaiki bug, dan menambah fitur pada sebuah aplikasi. Sayangnya, fokus pada kecepatan sering membuat kualitas kode terabaikan. Di sisi lain,{" "}
              <GlossaryTerm
                term="IT Operations (SysAdmin / Infra)"
                definition="Tim operasional yang bertanggung jawab atas ketersediaan server, keamanan jaringan, performa infrastruktur, dan kestabilan sistem."
              >
                IT Operations
              </GlossaryTerm>{" "}
              bertugas menjaga infrastruktur tetap stabil dan bebas dari bug (gangguan). Masalahnya, perubahan dari aplikasi—terutama dengan intensitas deployment yang tinggi—sering kali mengganggu stabilitas tersebut.
            </p>

            <p>
              Konflik ini sering berujung pada kurangnya pemahaman dan komunikasi. Developer cenderung <em>&ldquo;melempar kode&rdquo;</em> ke IT Operations tanpa memikirkan bagaimana kode tersebut berjalan di{" "}
              <GlossaryTerm
                term="Production Environment"
                definition="Lingkungan server sesungguhnya tempat aplikasi melayani pengguna akhir dan memproses data riil secara live."
              >
                production
              </GlossaryTerm>{" "}
              dengan dalih <em>&ldquo;Kodenya berjalan di laptopku&rdquo;</em>.
            </p>

            {/* Ilustrasi Komik (Sesuai Referensi Gambar Dicoding) */}
            <div className="my-8 overflow-hidden rounded-2xl border border-[#E5E0D8] bg-linear-to-b from-[#94B6EF]/15 via-white to-white p-6 shadow-xs">
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-end">
                {/* Developer Balloon */}
                <div className="flex flex-col items-center">
                  <div className="relative rounded-2xl border border-[#E5E0D8] bg-white px-5 py-3 shadow-xs">
                    <p className="text-sm font-semibold text-[#213E60]">
                      &ldquo;It worked on my local machine!&rdquo;
                    </p>
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-[#E5E0D8] bg-white" />
                  </div>
                  <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981] font-bold border-2 border-[#10B981]/40 text-sm">
                    👨‍💻 Dev
                  </div>
                </div>

                {/* Ops Balloon */}
                <div className="flex flex-col items-center">
                  <div className="relative rounded-2xl border border-[#E5E0D8] bg-white px-5 py-3 shadow-xs">
                    <p className="text-sm font-semibold text-[#213E60]">
                      &ldquo;Your local machine is not set up like the deployed environment!&rdquo;
                    </p>
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-[#E5E0D8] bg-white" />
                  </div>
                  <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#213E60]/10 text-[#213E60] font-bold border-2 border-[#213E60]/30 text-sm">
                    ⚙️ IT Ops
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-[#213E60]/60 italic">
                Ilustrasi: Kesenjangan paradigma klasik antara pengembang dan operasional sebelum era DevOps & MLOps.
              </p>
            </div>

            <p>
              Sementara IT Operations menerima kode tanpa memahami tujuannya. Ketika ini terjadi tentunya stabilitas sistem menjadi taruhannya.
            </p>

            <div className="rounded-2xl border-l-4 border-[#E68C3A] bg-[#E68C3A]/10 p-5">
              <h4 className="font-bold text-[#213E60]">Inti Pelajaran:</h4>
              <p className="mt-1 text-sm text-[#213E60]/90">
                Kolaborasi yang sehat membutuhkan standar pipeline otomatis dan lingkungan yang konsisten dari lokal hingga production.
              </p>
            </div>
          </>
        ) : (
          <MateriContentRenderer content={moduleItem.content || "Konten materi sedang dipersiapkan."} />
        )}
      </div>

      {/* Bottom Action Bar (Navigasi Bawah Artikel sesuai PRD Bagian 5.3) */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E5E0D8] pt-6 sm:flex-row">
        {/* Tombol ← Modul Sebelumnya di kiri */}
        {prevModule ? (
          <Link
            href={`/classes/${course.slug}/modules/${prevModule.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E0D8] bg-white px-5 py-3 text-xs font-bold text-[#213E60] transition-colors hover:bg-[#F4F2EF] sm:w-auto sm:text-sm shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Modul Sebelumnya</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Tombol Utama Tandai Selesai & Lanjut → di kanan (PRD Bagian 5.3) */}
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            onClick={onToggleComplete}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all sm:flex-initial sm:text-sm shadow-2xs cursor-pointer",
              isCompleted
                ? "border border-[#10B981] bg-[#10B981]/15 text-[#10B981]"
                : "border border-[#E5E0D8] bg-white text-[#213E60] hover:bg-[#F4F2EF]"
            )}
          >
            <CheckCircle
              className={cn(
                "h-4 w-4",
                isCompleted ? "text-[#10B981] fill-[#10B981]" : "text-[#213E60]/40"
              )}
            />
            <span>{isCompleted ? "Telah Diselesaikan (+5 Poin)" : "Tandai Selesai"}</span>
          </button>

          {nextModule ? (
            <Link
              href={`/classes/${course.slug}/modules/${nextModule.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E68C3A] px-6 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#E68C3A]/90 hover:scale-[1.02] sm:flex-initial sm:text-sm"
            >
              <span>Tandai Selesai & Lanjut →</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/classes`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#10B981]/90 sm:flex-initial sm:text-sm"
            >
              <span>Kelas Selesai 🎉</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
