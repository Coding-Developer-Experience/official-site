import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CurriculumTrack = {
  id: string;
  number: string;
  title: string;
  level: string;
  desc: string;
  stack: string[];
  modulesCount: string;
  iconType: 'frontend' | 'backend' | 'design' | 'ai' | 'mobile';
};

const tracks: CurriculumTrack[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Engineering',
    level: 'BEGINNER TO ADVANCED',
    desc: 'Pengembangan antarmuka modern berperforma tinggi dengan fokus pada reaktivitas state, arsitektur komponen modular, dan visual craft standar industri.',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
    modulesCount: '16 MODUL • 4 PROYEK',
    iconType: 'frontend',
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend & API Architecture',
    level: 'FOUNDATION TO SCALED',
    desc: 'Konstruksi logika bisnis tangguh, perancangan skema relasional teroptimasi, autentikasi keamanan NIM, dan orkestrasi REST API handal.',
    stack: ['Laravel 11', 'PHP 8.2+', 'MySQL', 'RESTful API', 'Docker'],
    modulesCount: '18 MODUL • 5 PROYEK',
    iconType: 'backend',
  },
  {
    id: 'design',
    number: '03',
    title: 'UI/UX & Product Design',
    level: 'COMPREHENSIVE',
    desc: 'Metodologi riset berbasis pengguna, eksplorasi affordance, penyusunan atomic design tokens, serta rancang interaksi mikro fungsional.',
    stack: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'Usability'],
    modulesCount: '12 MODUL • 3 STUDI KASUS',
    iconType: 'design',
  },
  {
    id: 'ai',
    number: '04',
    title: 'Data Science & AI Operations',
    level: 'INTERMEDIATE',
    desc: 'Pondasi analisis data statistik, eksplorasi pembelajaran mesin (ML), otomatisasi pipeline analitik, dan integrasi inferensi model cerdas.',
    stack: ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'Pandas'],
    modulesCount: '14 MODUL • 4 NOTEBOOKS',
    iconType: 'ai',
  },
  {
    id: 'mobile',
    number: '05',
    title: 'Mobile App Development',
    level: 'INTERMEDIATE TO PRO',
    desc: 'Perancangan aplikasi multiplatform responsif berkinerja native, sinkronisasi data offline-first, dan interaksi gesture mulus.',
    stack: ['Flutter', 'React Native', 'Mobile UI', 'REST Client', 'State Mgmt'],
    modulesCount: '15 MODUL • 3 APLIKASI',
    iconType: 'mobile',
  },
];

function TrackWatermark({ type }: { type: CurriculumTrack['iconType'] }) {
  if (type === 'frontend') {
    return (
      <svg
        className="w-72 h-72 absolute -right-12 -bottom-12 pointer-events-none text-[#0A0B10]/[0.04] group-hover:text-accent-orange/[0.1] transition-colors duration-700"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="10" />
        <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(120 50 50)" />
      </svg>
    );
  }
  if (type === 'backend') {
    return (
      <svg
        className="w-72 h-72 absolute -right-12 -bottom-12 pointer-events-none text-[#0A0B10]/[0.04] group-hover:text-accent-orange/[0.1] transition-colors duration-700"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <ellipse cx="50" cy="25" rx="32" ry="10" />
        <path d="M18 25 v25 c0 5.5 14.3 10 32 10 s32 -4.5 32 -10 v-25" />
        <path d="M18 50 v25 c0 5.5 14.3 10 32 10 s32 -4.5 32 -10 v-25" />
      </svg>
    );
  }
  if (type === 'design') {
    return (
      <svg
        className="w-72 h-72 absolute -right-12 -bottom-12 pointer-events-none text-[#0A0B10]/[0.04] group-hover:text-accent-orange/[0.1] transition-colors duration-700"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M25 25 h25 v25 h-25 z" />
        <path d="M50 25 h25 v25 h-25 z" />
        <path d="M25 50 h25 v25 h-25 z" />
        <circle cx="62.5" cy="62.5" r="12.5" />
      </svg>
    );
  }
  if (type === 'ai') {
    return (
      <svg
        className="w-72 h-72 absolute -right-12 -bottom-12 pointer-events-none text-[#0A0B10]/[0.04] group-hover:text-accent-orange/[0.1] transition-colors duration-700"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="25" cy="30" r="7" />
        <circle cx="25" cy="70" r="7" />
        <circle cx="50" cy="50" r="7" />
        <circle cx="75" cy="30" r="7" />
        <circle cx="75" cy="70" r="7" />
        <path d="M32 30 L43 50 M32 70 L43 50 M57 50 L68 30 M57 50 L68 70" />
      </svg>
    );
  }
  return (
    <svg
      className="w-72 h-72 absolute -right-12 -bottom-12 pointer-events-none text-[#0A0B10]/[0.04] group-hover:text-accent-orange/[0.1] transition-colors duration-700"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="30" y="15" width="40" height="70" rx="6" />
      <circle cx="50" cy="75" r="3" />
      <path d="M42 22 h16" />
    </svg>
  );
}

export default function CurriculumPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set(track, { x: 0 });
        return;
      }

      // Calculate total horizontal distance to travel
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="curriculum"
      ref={sectionRef}
      className="relative h-screen w-full bg-[#F4F2EF] border-t border-black/[0.06] flex flex-col justify-between overflow-hidden py-10 md:py-14"
      aria-label="Kurikulum dan Tech Stack Xcode"
    >
      {/* Top Header Row */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent-orange font-bold mb-2 block">
            JALUR RISET &amp; KELAS
          </span>
          <h2 className="font-serif text-gray-900 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-tight text-balance">
            Eksplorasi Teknologi &amp; Kurikulum.
          </h2>
        </div>
        <p className="text-gray-900/85 font-sans text-xs md:text-sm max-w-md leading-relaxed">
          Modul komprehensif bergaya Dicoding Classroom dengan penugasan terstruktur via GitHub untuk setiap peminatan.
        </p>
      </div>

      {/* Horizontal Cards Track */}
      <div className="w-full overflow-hidden my-auto py-4">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 items-stretch pl-6 lg:pl-16 pr-12 will-change-transform"
        >
          {tracks.map((t) => (
            <article
              key={t.id}
              className="group relative w-[82vw] sm:w-[460px] md:w-[500px] h-[370px] sm:h-[400px] md:h-[420px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-8 md:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(234,92,31,0.12)] hover:border-accent-orange/40 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden"
            >
              {/* Background oversized tech icon watermark */}
              <TrackWatermark type={t.iconType} />

              {/* Card Top: Number + Level badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-serif text-accent-orange text-5xl md:text-6xl leading-none font-bold">
                  {t.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-mono text-[11px] font-semibold tracking-wider">
                  {t.level}
                </span>
              </div>

              {/* Card Center: Title, Description & Tech pills */}
              <div className="relative z-10">
                <h3 className="font-sans font-bold text-gray-900 text-xl md:text-2xl tracking-tight group-hover:text-accent-orange transition-colors duration-300">
                  {t.title}
                </h3>
                <p className="mt-2.5 text-gray-900/85 font-sans text-xs md:text-sm leading-relaxed line-clamp-3">
                  {t.desc}
                </p>

                {/* Tech Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-[#F4F2EF] border border-black/[0.05] text-gray-800 font-mono text-[11px] font-medium tracking-tight group-hover:border-accent-orange/40 transition-colors duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Metadata & Action prompt */}
              <div className="relative z-10 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-gray-700 font-mono tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-orange" />
                  <span>{t.modulesCount}</span>
                </div>
                <span className="text-accent-orange font-sans font-semibold flex items-center gap-1 text-[11px]">
                  EKSPLORASI →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Hint / Indicator Row */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between text-xs text-gray-900/50 font-mono z-10 font-semibold">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
          <span>SCROLL WHEEL UNTUK MENJELAJAHI MODUL KELAS</span>
        </span>
        <span>01 — 05 / 5 TRACK</span>
      </div>
    </section>
  );
}
