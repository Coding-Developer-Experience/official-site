"use client";

import Image from "next/image";
import { Search, Mouse } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Blog", href: "#blog" },
  { label: "Team", href: "#team" },
];

const tags = ["Next.js", "Workshop", "Hackathon", "Open Source", "UI/UX", "React"];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function Navbar() {
  return (
    <motion.header
      variants={item}
      initial="hidden"
      animate="show"
      className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14"
    >
      <a href="#home" className="text-xl font-bold tracking-tight text-neutral-900">
        Codex<span className="text-neutral-400">.</span>
      </a>

      <nav className="hidden items-center gap-7 lg:flex">
        {navItems.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={cn(
              "group relative text-[15px] font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900",
              label === "Home" && "text-neutral-900"
            )}
          >
            {label}
            <span
              className={cn(
                "absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded-full bg-neutral-900 transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                label === "Home" && "scale-x-100"
              )}
            />
          </a>
        ))}
      </nav>

      <a
        href="#join"
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-11 rounded-full px-6 text-[15px] font-medium transition-transform duration-200 hover:scale-[1.03]"
        )}
      >
        Join Codex
      </a>
    </motion.header>
  );
}

const searchPlaceholders = [
  "Cari Project",
  "Cari Workshop",
  "Cari Open Source",
  "Cari AI",
  "Cari Hackathon",
];

function useTypewriter() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let idx = 0;
    let len = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = searchPlaceholders[idx];
      if (!deleting) {
        len += 1;
        setTyped(phrase.slice(0, len));
        if (len === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1500);
        } else {
          timer = setTimeout(tick, 75);
        }
      } else {
        len -= 1;
        setTyped(phrase.slice(0, len));
        if (len === 0) {
          deleting = false;
          idx = (idx + 1) % searchPlaceholders.length;
          timer = setTimeout(tick, 450);
        } else {
          timer = setTimeout(tick, 35);
        }
      }
    };
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, []);

  return typed;
}

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const typed = useTypewriter();
  const showPlaceholder = !value && !focused;

  return (
    <motion.div
      variants={item}
      className="pointer-events-auto relative w-[min(100%,760px)] sm:w-[760px]"
    >
      <div className="group relative rounded-full border border-neutral-200 bg-white/80 p-1.5 pr-2 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 focus-within:border-neutral-300 focus-within:shadow-[0_0_0_4px_rgba(13,13,13,0.06),0_18px_50px_-18px_rgba(0,0,0,0.28)] focus-within:ring-2 focus-within:ring-neutral-200/60">
        <div className="flex items-center pr-2">
          <div className="relative flex-1 pl-5">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Pencarian"
              className="relative z-10 h-11 w-full bg-transparent text-[16px] text-neutral-900 outline-none focus:outline-none"
            />
            {showPlaceholder && (
              <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center gap-0.5 text-[16px] text-neutral-400">
                {typed}
                <span className="caret-blink">▍</span>
              </span>
            )}
          </div>
          <button
            aria-label="Cari"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-200 hover:scale-105"
          >
            <Search className="size-[18px]" strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-[13px] font-medium text-neutral-500">Populer:</span>
        {tags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="rounded-full border border-neutral-200 bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 backdrop-blur transition-colors duration-200 hover:border-neutral-300 hover:text-neutral-900"
          >
            {tag}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function CloudShape({ w, h }: { w: number; h: number }) {
  return (
    <div
      className="relative [filter:drop-shadow(0_8px_12px_rgba(148,163,184,0.35))]"
      style={{ width: w, height: h }}
    >
      <div className="absolute bottom-0 left-0 h-[62%] w-full rounded-[50%] bg-gradient-to-t from-sky-100 via-white to-white" />
      <div className="absolute bottom-[18%] left-[16%] h-[70%] w-[46%] rounded-[50%] bg-white" />
      <div className="absolute bottom-[10%] right-[40%] h-[58%] w-[42%] rounded-[50%] bg-white" />
      <div className="absolute bottom-[6%] right-[8%] h-[46%] w-[34%] rounded-[50%] bg-white" />
    </div>
  );
}

const clouds = [
  { left: "10%", top: "8%", w: 260, h: 76, duration: 52, from: -20, to: 20 },
  { left: "60%", top: "20%", w: 200, h: 58, duration: 34, from: 20, to: -20 },
  { left: "34%", top: "31%", w: 230, h: 66, duration: 46, from: -16, to: 22 },
];

function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[38%] overflow-hidden sm:block">
      <div className="relative hidden h-full translate-y-[15px] sm:block">
        {clouds.map((c, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: c.left, top: c.top }}
            animate={{ x: [c.from, c.to] }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <CloudShape w={c.w} h={c.h} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      variants={item}
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      <Mouse className="size-4 text-neutral-300" />
      <span className="text-[12px] tracking-wide text-neutral-400">
        Scroll to explore
      </span>
    </motion.div>
  );
}

function AmbientLighting() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      <motion.div
        className="absolute -left-[12%] -top-[18%] h-[55%] w-[52%]"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.30) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.95, 0.5], x: [0, 45, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[14%] top-[8%] h-[58%] w-[46%]"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.28) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.45, 0.9, 0.45], x: [0, -35, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[12%] left-[18%] h-[52%] w-[62%]"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.22) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <main id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(10,10,10,0.06),transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/animasi.png"
          alt="Ilustrasi komunitas developer mahasiswa"
          fill
          priority
          className="pointer-events-none object-cover object-bottom"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,#dbeafe_0%,#bae6fd_18%,rgba(186,230,253,0.7)_45%,transparent_75%)]" />

      <Clouds />

      <AmbientLighting />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center px-6 pt-6 pb-28 text-center md:pt-8"
        >
          <motion.div
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-[13px] font-medium text-neutral-500 shadow-sm backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Community untuk developer mahasiswa
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-[56px] font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-7xl lg:text-7xl"
          >
            <span className="text-[#3B82F6]">Build.</span>
            <br />
            <span className="text-[#111827]">Learn.</span>
            <br />
            <span className="text-[#F7B731]">Together.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-neutral-800 sm:text-lg"
          >
            Komunitas mahasiswa yang belajar bersama, membangun project nyata,
            dan berkembang menjadi developer profesional.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <SearchBar />
          </motion.div>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#join"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 rounded-full px-8 text-[15px] font-medium transition-transform duration-200 hover:scale-[1.03]"
              )}
            >
              Join Community
            </a>
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full bg-white/70 px-8 text-[15px] font-medium backdrop-blur transition-transform duration-200 hover:scale-[1.03]"
              )}
            >
              Explore Projects
            </a>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </div>
    </main>
  );
}