"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Share2, Bookmark } from "lucide-react";
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
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      {/* Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4 text-xs text-neutral-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-neutral-600">{chapterTitle}</span>
          <span>•</span>
          <span className="rounded bg-blue-50 px-2 py-0.5 font-semibold text-blue-700">
            Modul {moduleItem.orderNumber}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-neutral-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{moduleItem.durationMinutes} menit baca</span>
          </div>
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Simpan Bookmark"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Heading Modul */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {moduleItem.title}
        </h1>
        {moduleItem.summary && (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {moduleItem.summary}
          </p>
        )}
      </div>

      {/* Konten Utama */}
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700 sm:text-base">
        {moduleItem.id === "mod-2-1" ? (
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

            {/* Ilustrasi Komik (Sesuai Referensi Gambar) */}
            <div className="my-8 overflow-hidden rounded-2xl border border-neutral-200 bg-linear-to-b from-blue-50/40 to-white p-6 shadow-xs">
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-end">
                {/* Developer Balloon */}
                <div className="flex flex-col items-center">
                  <div className="relative rounded-2xl border border-neutral-300 bg-white px-5 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-neutral-800">
                      &ldquo;It worked on my local machine!&rdquo;
                    </p>
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-neutral-300 bg-white" />
                  </div>
                  <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold border-2 border-emerald-300">
                    👨‍💻 Dev
                  </div>
                </div>

                {/* Ops Balloon */}
                <div className="flex flex-col items-center">
                  <div className="relative rounded-2xl border border-neutral-300 bg-white px-5 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-blue-900">
                      &ldquo;Your local machine is not set up like the deployed environment!&rdquo;
                    </p>
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-neutral-300 bg-white" />
                  </div>
                  <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold border-2 border-blue-300">
                    ⚙️ IT Ops
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-neutral-400 italic">
                Ilustrasi: Kesenjangan paradigma klasik antara pengembang dan operasional sebelum era DevOps & MLOps.
              </p>
            </div>

            <p>
              Sementara IT Operations menerima kode tanpa memahami tujuannya. Ketika ini terjadi tentunya stabilitas sistem menjadi taruhannya.
            </p>

            <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/60 p-4">
              <h4 className="font-semibold text-blue-950">Inti Pelajaran:</h4>
              <p className="mt-1 text-xs sm:text-sm text-blue-900">
                MLOps hadir untuk menjembatani jurang pemisah ini dalam ekosistem Machine Learning: menyelaraskan Data Scientist, ML Engineer, dan DevOps dalam satu pipeline yang otomatis dan terukur.
              </p>
            </div>
          </>
        ) : (
          <MateriContentRenderer content={moduleItem.content || "Konten materi sedang dipersiapkan."} />
        )}
      </div>

      {/* Navigasi Bawah Materi */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row">
        {/* Tombol Sebelumnya */}
        {prevModule ? (
          <Link
            href={`/materi/${course.slug}/${prevModule.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 sm:w-auto sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Modul Sebelumnya</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Tombol Selesai & Lanjut */}
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            onClick={onToggleComplete}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all sm:flex-initial sm:text-sm",
              isCompleted
                ? "border border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <CheckCircle
              className={cn(
                "h-4 w-4",
                isCompleted ? "text-emerald-600 fill-emerald-100" : "text-neutral-400"
              )}
            />
            <span>{isCompleted ? "Telah Diselesaikan" : "Tandai Selesai"}</span>
          </button>

          {nextModule && (
            <Link
              href={`/materi/${course.slug}/${nextModule.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 sm:flex-initial sm:text-sm"
            >
              <span>Lanjut ke Modul Berikutnya</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
