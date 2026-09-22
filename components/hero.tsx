"use client";

import { Search, Mouse, Menu, X } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5"
    >
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-5 py-3 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <a href="#home" className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
          Xcode<span className="text-[#3B82F6]">.</span>
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

        <div className="flex items-center gap-2">
          <a
            href="#join"
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden h-9 rounded-full px-4 text-sm font-medium transition-transform duration-200 hover:scale-[1.03] sm:h-11 sm:px-6 sm:text-[15px] lg:inline-flex"
            )}
          >
            Join Xcode
          </a>

          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-neutral-200 bg-white/60 text-neutral-800 transition-colors duration-200 hover:bg-neutral-100 sm:size-11 lg:hidden"
          >
            {open ? <X className="size-5" strokeWidth={2} /> : <Menu className="size-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </motion.header>
  );
}

const menuItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <motion.div
      initial={false}
      animate={open ? "show" : "hidden"}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      className={cn(
        "fixed inset-0 z-[-1] flex flex-col justify-between bg-white/85 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <motion.nav
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
        className="flex flex-col gap-1"
      >
        {navItems.map(({ label, href }) => (
          <motion.a
            key={label}
            variants={menuItem}
            href={href}
            onClick={onClose}
            className="group flex items-center justify-between border-b border-neutral-100 py-4 text-2xl font-semibold tracking-tight text-neutral-900 transition-colors hover:text-[#2563EB]"
          >
            {label}
            <span className="text-sm font-normal text-neutral-300 transition-colors group-hover:text-[#2563EB]">
              {String(href).replace("#", "").replace("/", "")}
            </span>
          </motion.a>
        ))}
      </motion.nav>

      <div className="flex flex-col gap-3">
        <a
          href="#join"
          onClick={onClose}
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-12 w-full rounded-full text-[15px] font-medium"
          )}
        >
          Join Xcode
        </a>
        <p className="text-center text-xs text-neutral-400">
          Coding Developer Experience
        </p>
      </div>
    </motion.div>
  );
}

const searchPlaceholders = [
  "Project",
  "Workshop",
  "Open Source",
  "Artificial Intelligence",
  "Hackathon",
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      // Future search route or anchor
      const target = document.getElementById("about");
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTagClick = (tag: string) => {
    setValue(tag);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      variants={item}
      className="pointer-events-auto relative mx-auto w-[min(100%,760px)] sm:w-[760px]"
    >
      <form
        onSubmit={handleSearch}
        className="group relative rounded-full border border-neutral-200 bg-white/80 p-1 pr-2 shadow-[0_14px_40px_-18px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 focus-within:border-neutral-300 focus-within:shadow-[0_0_0_4px_rgba(13,13,13,0.06),0_18px_50px_-18px_rgba(0,0,0,0.28)] focus-within:ring-2 focus-within:ring-neutral-200/60 sm:p-1.5"
      >
        <div className="flex items-center pr-2">
          <div className="relative flex-1 pl-4 sm:pl-5">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Pencarian"
              className="relative z-10 h-10 w-full bg-transparent text-[15px] text-neutral-900 outline-none focus:outline-none sm:h-11 sm:text-[16px]"
            />
            {showPlaceholder && (
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center gap-0.5 text-[15px] text-neutral-400 sm:left-5 sm:text-[16px]">
                {typed}
                <span className="caret-blink">▍</span>
              </span>
            )}
          </div>
          <button
            type="submit"
            aria-label="Cari"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-transform duration-200 hover:scale-105 sm:size-11 cursor-pointer"
          >
            <Search className="size-4 sm:size-[18px]" strokeWidth={2.4} />
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:mt-4 sm:gap-2">
        <span className="mr-1 text-xs font-medium text-neutral-500 sm:text-[13px]">Populer:</span>
        {tags.map((tag, i) => (
          <button
            type="button"
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "cursor-pointer rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-600 backdrop-blur transition-all duration-200 hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:scale-105 sm:px-3.5 sm:py-1.5 sm:text-[13px]",
              i >= 2 && "hidden sm:inline-flex"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function CloudShape({ size }: { size: string }) {
  return (
    <div
      className={cn("relative [filter:drop-shadow(0_8px_12px_rgba(148,163,184,0.35))]", size)}
    >
      <div className="absolute bottom-0 left-0 h-[62%] w-full rounded-[50%] bg-gradient-to-t from-sky-100 via-white to-white" />
      <div className="absolute bottom-[18%] left-[16%] h-[70%] w-[46%] rounded-[50%] bg-white" />
      <div className="absolute bottom-[10%] right-[40%] h-[58%] w-[42%] rounded-[50%] bg-white" />
      <div className="absolute bottom-[6%] right-[8%] h-[46%] w-[34%] rounded-[50%] bg-white" />
    </div>
  );
}

const clouds = [
  {
    left: "left-[6%] sm:left-[10%]",
    top: "top-[8%]",
    size: "w-[120px] h-[35px] sm:w-[260px] sm:h-[76px]",
    duration: 16,
    delay: 0,
    from: -24,
    to: 26,
  },
  {
    left: "left-[52%] sm:left-[60%]",
    top: "top-[20%]",
    size: "w-[100px] h-[29px] sm:w-[200px] sm:h-[58px]",
    duration: 10,
    delay: 6,
    from: 26,
    to: -26,
  },
  {
    left: "left-[30%] sm:left-[34%]",
    top: "top-[31%]",
    size: "hidden w-[110px] h-[32px] sm:block sm:w-[230px] sm:h-[66px]",
    duration: 13.5,
    delay: 3,
    from: -22,
    to: 30,
  },
];

function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[38%] overflow-hidden">
      <div className="relative h-full translate-y-[15px]">
        {clouds.map((c, i) => (
          <motion.div
            key={i}
            className={cn("absolute", c.left, c.top)}
            animate={{ x: [c.from, c.to] }}
            transition={{
              delay: c.delay,
              duration: c.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <CloudShape size={c.size} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const activitySlides = [
  {
    label: "Open Source Sprint",
    meta: "14.00 - 17.00",
    footer: "12 peserta bergabung",
  },
  {
    label: "Frontend Study Jam",
    meta: "📍 Discord Voice",
    footer: "8 peserta aktif",
  },
  {
    label: "Repository Update",
    meta: "xcode/community · +12 commit",
    footer: "+3 Pull Request · Review berjalan",
  },
  {
    label: "Diskusi Hari Ini",
    meta: "AI Agent dengan LangGraph",
    footer: "32 balasan · Aktif sekarang",
  },
];

function CodeCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % activitySlides.length), 3800);
    return () => clearInterval(id);
  }, []);

  const slide = activitySlides[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-[6%] top-[22%] z-[6] hidden -rotate-2 lg:block"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-[300px] overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-1 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="px-4 py-3"
          >
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-500">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Hari Ini
            </p>

            <div className="mt-3 flex items-start justify-between gap-3">
              <h4 className="text-[15px] font-semibold leading-snug text-neutral-900">
                {slide.label}
              </h4>
              <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10.5px] font-medium text-neutral-500">
                {slide.meta}
              </span>
            </div>

            <p className="mt-2 border-t border-neutral-100 pt-2 text-[12px] text-neutral-500">
              {slide.footer}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              {activitySlides.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  aria-label={`Slide aktivitas ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    i === index ? "w-4 bg-[#2563EB]" : "w-1.5 bg-neutral-200 hover:bg-neutral-300"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      variants={item}
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
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
    <div className="pointer-events-none absolute inset-0 z-[3] hidden overflow-hidden sm:block">
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

      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,#dbeafe_0%,#bae6fd_12%,rgba(186,230,253,0.4)_36%,#ffffff_68%,#ffffff_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-44 bg-gradient-to-t from-white via-white/85 to-transparent" />

      <Clouds />

      <AmbientLighting />

      <CodeCard />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-28"
        >
          <motion.div
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-500 shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:py-1.5 sm:text-[13px]"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Community untuk developer mahasiswa
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-[44px] font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-6xl lg:text-8xl"
          >
            <span className="text-[#3B82F6]">Build.</span>
            <br />
            <span className="text-[#111827]">Learn.</span>
            <br />
            <span className="text-[#F7B731]">Together.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-800 sm:mt-5 sm:max-w-2xl sm:text-lg lg:text-xl"
          >
            Wadah kolaborasi mahasiswa dalam mempelajari teknologi, merancang
            proyek nyata, serta membentuk talenta pengembang yang
            profesional.
          </motion.p>

          <motion.div variants={item} className="mt-6 w-full sm:mt-8">
            <SearchBar />
          </motion.div>

          <motion.div variants={item} className="mt-6 flex w-full max-w-sm flex-col items-center justify-center gap-2.5 sm:mt-7 sm:max-w-none sm:flex-row sm:gap-3">
            <a
              href="#join"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-11 w-full rounded-full px-8 text-[15px] font-medium transition-transform duration-200 hover:scale-[1.03] sm:h-12 sm:w-auto"
              )}
            >
              Join Community
            </a>
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 w-full rounded-full bg-white/70 px-8 text-[15px] font-medium backdrop-blur transition-transform duration-200 hover:scale-[1.03] sm:h-12 sm:w-auto"
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