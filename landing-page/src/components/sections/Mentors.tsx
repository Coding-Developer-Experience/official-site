import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Mentor = {
  id: string;
  name: string;
  skill: string;
  photoUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  specialties: string;
};

const mentors: Mentor[] = [
  {
    id: 'adit',
    name: 'Adit',
    skill: 'Lead Frontend',
    photoUrl: '/images/mentors/Adit.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'React 19, TypeScript, GSAP & Web Performance',
  },
  {
    id: 'ayu',
    name: 'Ayu',
    skill: 'UI/UX Designer',
    photoUrl: '/images/mentors/Ayu.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'Design Systems, Micro-interactions, Figma Systems',
  },
  {
    id: 'allam',
    name: 'Allam',
    skill: 'Backend Architect',
    photoUrl: '/images/mentors/Allam.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'Node.js, Laravel, Distributed API & Database Architecture',
  },
  {
    id: 'gehan',
    name: 'Gehan',
    skill: 'Fullstack Engineer',
    photoUrl: '/images/mentors/Gehan.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'Fullstack Systems, REST API, Cloud Integration',
  },
  {
    id: 'naufal',
    name: 'Naufal',
    skill: 'AI & Data Lead',
    photoUrl: '/images/mentors/Naufal.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'Deep Learning, LLM Pipelines, Python Data Intelligence',
  },
  {
    id: 'indah',
    name: 'Indah',
    skill: 'Design Systems',
    photoUrl: '/images/mentors/Indah.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'UI Tokens, Component Architecture, Interactive Prototyping',
  },
  {
    id: 'rifai',
    name: 'Rifai',
    skill: 'Cloud & Security',
    photoUrl: '/images/mentors/Rifai.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'DevSecOps, Docker, CI/CD Pipeline & Server Hardening',
  },
  {
    id: 'rahman',
    name: 'Rahman',
    skill: 'Mobile Developer',
    photoUrl: '/images/mentors/Rahman.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'React Native, Flutter, Native Device Integrations',
  },
  {
    id: 'zira',
    name: 'Zira',
    skill: 'Product QA & Web',
    photoUrl: '/images/mentors/Zira.jpg',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    portfolioUrl: 'https://github.com',
    specialties: 'E2E Testing, Quality Assurance, Accessibility & Web Audit',
  },
];

export default function Mentors() {
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);

  // Keyboard controls for inspecting cards
  useEffect(() => {
    if (inspectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectedIndex(null);
      if (e.key === 'ArrowRight') {
        setInspectedIndex((prev) => (prev === null ? 0 : (prev + 1) % mentors.length));
      }
      if (e.key === 'ArrowLeft') {
        setInspectedIndex((prev) => (prev === null ? 0 : (prev - 1 + mentors.length) % mentors.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inspectedIndex]);

  useGSAP(
    () => {
      const deck = deckRef.current;
      if (!deck) return;

      const cardSlots = deck.querySelectorAll<HTMLElement>('.uno-card-enter');
      if (!cardSlots || cardSlots.length === 0) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set(cardSlots, { opacity: 1, y: 0 });
        return;
      }

      // Initial dealing state: cards start lower down
      gsap.set(cardSlots, {
        y: 110,
        opacity: 0,
      });

      const tween = gsap.to(cardSlots, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.05,
        clearProps: 'y',
        scrollTrigger: {
          trigger: deck,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  const inspectedMentor = inspectedIndex !== null ? mentors[inspectedIndex] : null;

  return (
    <section
      id="mentors"
      ref={sectionRef}
      className="relative bg-[#F4F2EF] border-t border-black/[0.06] py-24 md:py-32 overflow-hidden"
      aria-label="Mentor dan Praktisi Xcode"
    >
      {/* Tabletop Playmat Background Graphics */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Ambient Warm Desk Lamp / Spotlight */}
        <div className="w-[92%] max-w-5xl h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(234,92,31,0.08)_0%,_rgba(0,0,0,0.02)_50%,_transparent_75%)] rounded-[60px] blur-2xl" />

        {/* Architectural Playmat SVG Vector Lines */}
        <svg
          className="absolute w-[96%] max-w-6xl h-[520px] text-black/[0.06] stroke-current"
          fill="none"
          viewBox="0 0 1100 520"
        >
          {/* Playmat outer rounded boundary */}
          <rect
            x="20"
            y="20"
            width="1060"
            height="480"
            rx="48"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />

          {/* Central Arena Concentric Rings */}
          <circle
            cx="550"
            cy="230"
            r="160"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-accent-orange/15"
          />
          <circle
            cx="550"
            cy="230"
            r="80"
            strokeWidth="1"
            strokeDasharray="2 2"
            className="text-accent-orange/15"
          />

          {/* Corner Coordinate Crosses */}
          <path d="M 50 50 L 70 50 M 60 40 L 60 60" strokeWidth="1.5" />
          <path d="M 1030 50 L 1050 50 M 1040 40 L 1040 60" strokeWidth="1.5" />
          <path d="M 50 470 L 70 470 M 60 460 L 60 480" strokeWidth="1.5" />
          <path d="M 1030 470 L 1050 470 M 1040 460 L 1040 480" strokeWidth="1.5" />

          {/* Center Target Card Slot Marker */}
          <rect
            x="425"
            y="70"
            width="250"
            height="320"
            rx="20"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            className="text-accent-orange/25"
          />
          <text
            x="550"
            y="95"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            className="text-black/35 font-mono text-[9px] tracking-widest font-bold uppercase"
          >
            [ PLAY &amp; INSPECT ZONE ]
          </text>
        </svg>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-orange font-bold mb-3 block">
              PENGGERAK &amp; PRAKTISI
            </span>
            <h2 className="font-serif text-gray-900 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.04] tracking-tight text-balance">
              Belajar Langsung dari Praktisi.
            </h2>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <p className="text-gray-900/85 font-sans text-sm md:text-base leading-relaxed">
              Xcode HMTI diorkestrasi oleh 9 praktisi dan pengurus inti dengan spesialisasi teknologi komprehensif.
            </p>
            <span className="text-xs font-mono text-accent-orange font-semibold flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
              KLIK KARTU UNTUK MELETAKKAN DI MEJA &amp; INSPEKSI
            </span>
          </div>
        </div>

        {/* Uno Cards POV Fan Stage on Tabletop */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar pt-8 pb-16 px-2">
          <div
            ref={deckRef}
            className="min-w-max lg:min-w-0 lg:w-full flex items-end justify-start lg:justify-center select-none py-10 px-8"
          >
            {mentors.map((m, i) => {
              const diff = i - 4; // center is index 4 (Naufal)
              const baseRot = diff * 3.4; // -13.6° to +13.6°
              const baseY = Math.pow(diff, 2) * 2.8; // arch downwards on edges
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={m.id}
                  className="uno-card-enter relative flex-shrink-0"
                  style={{
                    marginLeft: i === 0 ? '0px' : '-130px',
                    zIndex: isHovered ? 50 : i + 1,
                  }}
                >
                  <div
                    className="uno-card-fan transition-all duration-300 ease-out cursor-pointer"
                    style={{
                      transformOrigin: '50% 120%',
                      transform: isHovered
                        ? 'translateY(-56px) scale(1.08) rotate(0deg)'
                        : `translateY(${baseY}px) rotate(${baseRot}deg)`,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setInspectedIndex(i)}
                  >
                    <article
                      className={`w-[240px] sm:w-[260px] lg:w-[280px] bg-white rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${
                        isHovered
                          ? 'border-accent-orange shadow-[0_25px_50px_rgba(234,92,31,0.22),0_10px_20px_rgba(0,0,0,0.06)] ring-1 ring-accent-orange/40'
                          : 'border-gray-100 shadow-[0_10px_35px_rgb(0,0,0,0.07)]'
                      }`}
                    >
                      {/* Full-Color Portrait Photo (Enlarged, Vibrant & Natural) */}
                      <div className="relative w-full aspect-[3/3.6] rounded-xl overflow-hidden bg-[#F4F2EF] border border-black/[0.04]">
                        <img
                          src={m.photoUrl}
                          alt={`Foto ${m.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Skill Tag */}
                      <div className="mt-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-mono text-[10px] font-bold tracking-wider uppercase">
                          {m.skill}
                        </span>
                      </div>

                      {/* Mentor Name (Simple & Clean, exact filename match) */}
                      <h3 className="font-serif font-bold text-gray-900 text-lg sm:text-xl tracking-tight mt-1 truncate">
                        {m.name}
                      </h3>

                      {/* Bottom Metadata & 3 Interactive Links */}
                      <div className="mt-3.5 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          {/* GitHub */}
                          <a
                            href={m.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-accent-orange transition-colors"
                            aria-label={`GitHub profil ${m.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              />
                            </svg>
                          </a>
                          {/* LinkedIn */}
                          <a
                            href={m.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-accent-orange transition-colors"
                            aria-label={`LinkedIn profil ${m.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                            </svg>
                          </a>
                          {/* Portfolio */}
                          <a
                            href={m.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-accent-orange transition-colors"
                            aria-label={`Portofolio ${m.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </a>
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                          XCODE MENTOR
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Play & Inspect Card Stage (Active Table Inspection Modal) */}
      {inspectedMentor && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setInspectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Inspeksi Kartu Mentor ${inspectedMentor.name}`}
        >
          <div
            className="w-full max-w-[390px] bg-white rounded-3xl p-6 sm:p-7 border-2 border-accent-orange shadow-[0_30px_80px_rgba(234,92,31,0.3)] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <span className="font-mono text-[11px] font-bold tracking-wider text-accent-orange uppercase">
                  INSPECT CARD 0{inspectedIndex! + 1} / 09
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectedIndex(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors text-xs font-mono font-bold"
                aria-label="Tutup inspeksi kartu"
              >
                ✕
              </button>
            </div>

            {/* High-Resolution Portrait Photo */}
            <div className="mt-4 relative w-full aspect-[3/3.6] rounded-2xl overflow-hidden bg-[#F4F2EF] border border-black/[0.06] shadow-sm">
              <img
                src={inspectedMentor.photoUrl}
                alt={`Foto profil ${inspectedMentor.name}`}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Skill & Title */}
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-mono text-xs font-bold tracking-wider uppercase">
                {inspectedMentor.skill}
              </span>
              <h3 className="font-serif font-bold text-gray-900 text-2xl sm:text-3xl tracking-tight mt-1.5">
                {inspectedMentor.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
                {inspectedMentor.specialties}
              </p>
            </div>

            {/* Interactive Action Buttons */}
            <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-mono">
              <a
                href={inspectedMentor.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                GitHub
              </a>
              <a
                href={inspectedMentor.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={inspectedMentor.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-accent-orange text-white font-semibold hover:bg-[#ff6f32] transition-colors shadow-sm"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Portofolio
              </a>
            </div>

            {/* Quick Cycling Controls */}
            <div className="mt-5 pt-3.5 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-gray-600">
              <button
                type="button"
                onClick={() =>
                  setInspectedIndex((prev) => (prev === null ? 0 : (prev - 1 + mentors.length) % mentors.length))
                }
                className="hover:text-accent-orange transition-colors flex items-center gap-1"
              >
                ← Sebelumnya
              </button>
              <button
                type="button"
                onClick={() => setInspectedIndex(null)}
                className="text-[11px] font-semibold text-gray-500 hover:text-black uppercase tracking-wider"
              >
                Kembalikan [ESC]
              </button>
              <button
                type="button"
                onClick={() =>
                  setInspectedIndex((prev) => (prev === null ? 0 : (prev + 1) % mentors.length))
                }
                className="hover:text-accent-orange transition-colors flex items-center gap-1"
              >
                Berikutnya →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
