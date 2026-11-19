import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Benefit = {
  title: string;
  desc: string;
  badge: string;
  tag: string;
};

const benefits: Benefit[] = [
  {
    title: 'Ruang Belajar Terstruktur',
    desc: 'Akses modul materi koding komprehensif bergaya Dicoding, lengkap dengan progress bar dan penugasan via tautan repositori GitHub.',
    badge: 'LMS INTERNAL',
    tag: 'MODUL KOMPREHENSIF • GITHUB REPO',
  },
  {
    title: 'Gamifikasi & Poin',
    desc: 'Pencatatan poin keaktifan otomatis berdasarkan ketepatan waktu pengumpulan tugas dan kehadiran sesi mingguan.',
    badge: 'POIN & LEADERBOARD',
    tag: 'POIN AKTIVITAS • ABSENSI MINGGUAN',
  },
  {
    title: 'Portofolio Publik',
    desc: 'Wadah pameran karya digital dan proyek anggota yang dapat diakses secara publik oleh rekruter maupun khalayak luas.',
    badge: 'ETALASE TALENTA',
    tag: 'SHOWCASE PROYEK • AKSES REKRUTER',
  },
  {
    title: 'Autentikasi NIM',
    desc: 'Sistem login aman yang terintegrasi khusus untuk mahasiswa HMTI, menjamin privasi dan manajemen data anggota.',
    badge: 'SSO TERPUSAT',
    tag: 'LOGIN TERINTEGRASI • PRIVASI MAHASISWA',
  },
];

export default function AboutBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const logosWrapperRef = useRef<HTMLDivElement>(null);
  const stackSectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const indicatorsRef = useRef<HTMLSpanElement[]>([]);

  // Kinetic Ticker scroll animation + Background Logo Parallax
  useGSAP(
    () => {
      const section = sectionRef.current;
      const ticker = tickerRef.current;
      if (!section || !ticker) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set(ticker, { x: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${ticker.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        ticker,
        {
          x: () => -(ticker.scrollWidth - window.innerWidth),
          ease: 'none',
          force3D: true,
        },
        0
      );

      if (logosWrapperRef.current) {
        tl.to(
          logosWrapperRef.current,
          {
            xPercent: -35,
            ease: 'none',
          },
          0
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  // Interactive Scroll-Driven Card Stack Animation
  useGSAP(
    () => {
      const section = stackSectionRef.current;
      const cards = cardsRef.current.filter(Boolean);
      const indicators = indicatorsRef.current.filter(Boolean);
      if (!section || cards.length !== 4) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
        return;
      }

      // Initial card positions
      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'auto',
      });

      gsap.set(cards[1], {
        yPercent: 120,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 5,
        pointerEvents: 'none',
      });

      gsap.set(cards.slice(2), {
        yPercent: 140,
        scale: 0.7,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
      });

      if (indicators.length === 4) {
        gsap.set(indicators[0], { backgroundColor: '#EA5C1F', width: 44 });
        gsap.set(indicators.slice(1), { backgroundColor: 'rgba(255, 255, 255, 0.2)', width: 24 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < 3; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const upcomingCard = cards[i + 2];
        const prevCard = cards[i - 1];

        // Active card moves up to passed state
        tl.to(
          currentCard,
          {
            yPercent: -120,
            scale: 0.8,
            opacity: 0.4,
            zIndex: i + 1,
            pointerEvents: 'none',
            ease: 'none',
            duration: 1,
          },
          i
        );

        // Next card moves up to center active state
        tl.to(
          nextCard,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
            pointerEvents: 'auto',
            ease: 'none',
            duration: 1,
          },
          i
        );

        // Indicators transition
        if (indicators.length === 4) {
          tl.to(
            indicators[i],
            {
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              width: 24,
              ease: 'none',
              duration: 1,
            },
            i
          );
          tl.to(
            indicators[i + 1],
            {
              backgroundColor: '#EA5C1F',
              width: 44,
              ease: 'none',
              duration: 1,
            },
            i
          );
        }

        // Upcoming card enters upcoming position
        if (upcomingCard) {
          tl.to(
            upcomingCard,
            {
              yPercent: 120,
              scale: 0.8,
              opacity: 0.4,
              zIndex: 5,
              pointerEvents: 'none',
              ease: 'none',
              duration: 1,
            },
            i
          );
        }

        // Previous card fades further away
        if (prevCard) {
          tl.to(
            prevCard,
            {
              yPercent: -150,
              scale: 0.7,
              opacity: 0,
              zIndex: 0,
              pointerEvents: 'none',
              ease: 'none',
              duration: 1,
            },
            i
          );
        }
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: stackSectionRef }
  );

  return (
    <>
      {/* Kinetic Ticker — horizontal scroll with GSAP Pinning */}
      <section
        ref={sectionRef}
        id="about-ticker"
        className="relative h-screen w-full bg-[#F4F2EF] overflow-hidden flex items-center border-t border-black/[0.04]"
        aria-label="Tentang Xcode"
      >
        {/* Parallax Background 4 Logos in Fixed-Gap Flex Container */}
        <div
          ref={logosWrapperRef}
          className="w-max flex gap-x-16 md:gap-x-28 lg:gap-x-36 justify-center items-center opacity-[0.09] pointer-events-none z-0 will-change-transform select-none absolute inset-y-0 left-12"
          aria-hidden="true"
        >
          {/* 1. Logo UIN Antasari */}
          <img
            src="/images/logo_uin_antasari.png"
            alt="Logo UIN Antasari"
            className="h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 object-contain flex-shrink-0"
          />
          {/* 2. Logo Teknologi Informasi */}
          <img
            src="/images/teknologi-informasi.svg"
            alt="Logo Teknologi Informasi"
            className="h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 object-contain flex-shrink-0"
          />
          {/* 3. Logo HMTI (Perisai) */}
          <img
            src="/images/logo_hmti.svg"
            alt="Logo HMTI"
            className="h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 object-contain flex-shrink-0"
          />
          {/* 4. Logo Ristek (Xcode) */}
          <img
            src="/images/LogoRistek.png"
            alt="Logo Xcode"
            className="h-44 w-44 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 object-contain flex-shrink-0"
          />
        </div>

        <div
          ref={tickerRef}
          className="ticker-text flex items-center gap-8 whitespace-nowrap pl-[20vw] pr-[20vw] will-change-transform relative z-10"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontWeight: 600,
          }}
        >
          <span className="text-gray-900 font-sans">Xcode</span>
          <span className="text-accent-orange font-serif italic">adalah rumah</span>
          <span className="inline-flex items-center justify-center mx-4" aria-hidden="true">
            <svg
              className="w-12 h-6 md:w-24 md:h-10 text-accent-orange"
              viewBox="0 0 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M0 10 Q 25 20 50 10 T 100 10" />
            </svg>
          </span>
          <span className="text-gray-900 font-sans">kolaborasi &amp; riset</span>
          <span className="inline-flex items-center justify-center mx-4" aria-hidden="true">
            <svg
              className="w-8 h-8 text-accent-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6 2 9.2h7.6z" />
            </svg>
          </span>
          <span className="text-accent-orange font-serif italic">mahasiswa HMTI</span>
          <span className="inline-flex items-center justify-center mx-4" aria-hidden="true">
            <span className="w-3.5 h-3.5 rounded-full bg-accent-orange shadow-[0_0_12px_rgba(234,92,31,0.5)]" />
          </span>
          <span className="text-gray-900 font-sans">bangun proyek nyata</span>
          <span className="text-accent-orange font-serif italic">bersama komunitas</span>
        </div>
      </section>

      {/* About + Benefits (Interactive Scroll-Driven Card Stack - Premium Depth) */}
      <section
        id="about"
        ref={stackSectionRef}
        className="relative h-screen w-full bg-[#F4F2EF] border-t border-black/[0.06] flex items-center justify-center overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-orange font-bold mb-3 block">
              FITUR &amp; KEUNGGULAN
            </span>
            <h2 className="font-serif text-gray-900 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.04] tracking-tight text-balance">
              Platform Pembelajaran &amp; Kolaborasi Terpadu.
            </h2>
            <p className="mt-4 text-gray-900/85 font-sans text-sm md:text-base leading-relaxed">
              Xcode HMTI menghadirkan ekosistem digital terpusat untuk mengelola kegiatan belajar-mengajar, absensi, pengumpulan tugas, hingga etalase karya bagi seluruh anggota komunitas.
            </p>

            {/* Step Indicators */}
            <div className="mt-8 flex items-center gap-2" aria-hidden="true">
              {benefits.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) indicatorsRef.current[i] = el;
                  }}
                  className="h-1.5 w-6 rounded-full bg-black/15 transition-all duration-300"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Card Stack Stage */}
          <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[400px]">
            <div className="relative w-full max-w-xl h-full flex items-center justify-center">
              {benefits.map((b, i) => (
                <article
                  key={b.title}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className="benefit-card absolute inset-0 w-full h-full bg-white border border-gray-100 rounded-2xl p-7 md:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(234,92,31,0.12)] hover:border-accent-orange/40 hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between will-change-transform"
                  style={{
                    zIndex: i === 0 ? 10 : 5 - i,
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-accent-orange text-5xl md:text-6xl leading-none font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-mono text-[11px] font-semibold tracking-wider">
                        {b.badge}
                      </span>
                    </div>
                    <h3 className="mt-5 font-sans font-bold text-gray-900 text-xl md:text-2xl tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-gray-900/85 font-sans text-sm md:text-base leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                  <div className="relative z-10 mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-gray-700 font-mono tracking-wider">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-orange" />
                      <span>{b.tag}</span>
                    </div>
                    <span className="text-gray-900/50 font-sans font-semibold">0{i + 1} / 04</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
