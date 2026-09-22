"use client";

import { motion, useReducedMotion } from "framer-motion";

function Cloud({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 58" className={`sky-cloud ${className}`} aria-hidden="true">
      <path
        d="M16 47h79c11 0 18-7 18-16 0-10-8-17-18-17h-2C89 6 80 3 71 3c-12 0-22 7-27 17-4-3-9-5-14-5-12 0-22 9-22 20 0 5 3 10 8 12Z"
        fill="#FFFCF5"
      />
    </svg>
  );
}

function Yongki() {
  return (
    <div className="yongki" aria-hidden="true">
      <span className="yongki-ear yongki-ear-left" />
      <span className="yongki-ear yongki-ear-right" />
      <span className="yongki-tail" />
      <div className="yongki-head">
        <span className="yongki-eye yongki-eye-left" />
        <span className="yongki-eye yongki-eye-right" />
        <span className="yongki-muzzle" />
        <span className="yongki-nose" />
      </div>
      <div className="yongki-jacket"><span className="yongki-shirt" /></div>
      <span className="yongki-arm yongki-arm-left" />
      <span className="yongki-arm yongki-arm-right" />
      <span className="yongki-leg yongki-leg-left" />
      <span className="yongki-leg yongki-leg-right" />
    </div>
  );
}

export default function ComingSoon() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative flex h-[100dvh] min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[linear-gradient(to_bottom,#cfe9ff_0%,#eaf6ff_50%,#ffffff_100%)] text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-[#FDBA21]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 size-80 rounded-full bg-[#3B82F6]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[9%] top-[10%] size-12 rounded-full border-[3px] border-[#542A30] bg-[#FDBA21] shadow-[0_0_0_8px_rgba(253,186,33,0.15)] sm:right-[15%] sm:top-[12%] sm:size-16 sm:shadow-[0_0_0_10px_rgba(253,186,33,0.15)]" />
      
      <motion.div animate={reduceMotion ? undefined : { x: [-18, 24, -18] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[8%] top-[14%] sm:left-[16%]">
        <Cloud className="sky-cloud-large" />
      </motion.div>
      <motion.div animate={reduceMotion ? undefined : { x: [20, -20, 20] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[5%] top-[20%] sm:right-[12%] sm:top-[26%]">
        <Cloud className="sky-cloud-medium" />
      </motion.div>
      <motion.div animate={reduceMotion ? undefined : { x: [-14, 16, -14] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[32%] top-[8%] hidden sm:block">
        <Cloud className="sky-cloud-small" />
      </motion.div>

      <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <a href="#utama" className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
          Xcode<span className="text-[#3B82F6]">.</span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-sky-900 shadow-sm backdrop-blur transition-all hover:border-sky-300 hover:bg-white hover:text-blue-600"
        >
          <span>Web HMTI</span>
          <span className="text-sky-500">↗</span>
        </a>
      </header>

      <section id="utama" className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-2 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-[#0F172A] sm:text-7xl lg:text-8xl"
        >
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[#3B82F6]"
          >
            COMING
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            SOON<span className="text-[#FDBA21]">.</span>
          </motion.span>
        </motion.h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-lg">
          Sesuatu yang seru sedang kami siapkan untuk ruang belajar dan
          kolaborasi. Sampai jumpa sebentar lagi, ya.
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-neutral-500 sm:mt-8 sm:text-sm">
          <span className="h-px w-6 bg-neutral-300 sm:w-8" />
          Build. Learn. <span className="text-[#FDBA21]">Together.</span>
          <span className="h-px w-6 bg-neutral-300 sm:w-8" />
        </div>
      </section>

      <footer className="relative h-32 w-full shrink-0 sm:h-40" aria-label="Yongki berjalan melintasi taman kampus">
        <div className="pointer-events-none absolute left-[12%] top-5 h-6 w-14 rounded-full bg-white/65 blur-[1px]" />
        <div className="pointer-events-none absolute right-[18%] top-8 h-4 w-10 rounded-full bg-white/65 blur-[1px]" />
        <div className="pointer-events-none absolute bottom-7 left-[8%] right-[8%] h-px bg-[#2563EB]/20 sm:bottom-9" />
        <div className={reduceMotion ? "yongki-party yongki-party-still" : "yongki-party"}>
          <div className="yongki-facing"><Yongki /></div>
          <div className="yongki-speech">
            Tunggu kami ya! 👋
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[repeating-linear-gradient(110deg,#5fae38_0_3px,#85c952_3px_7px,#478f2f_7px_9px)] opacity-85 sm:h-12" />
      </footer>
    </main>
  );
}
