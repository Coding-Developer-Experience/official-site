import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MOBILE_HERO_VIDEO_URL =
  'https://res.cloudinary.com/dxlmztdlg/video/upload/f_auto/q_auto:good,vc_auto,w_1280,c_limit/v1770998713/output2_svhzuz.mp4';
const DESKTOP_HERO_SKY_IMAGE_URL =
  'https://res.cloudinary.com/dxlmztdlg/image/upload/f_auto,q_auto:good,w_2000,c_limit/v1771060043/sky_gze6e3.png';
const DESKTOP_HERO_MOUNTAINS_IMAGE_URL =
  'https://res.cloudinary.com/dxlmztdlg/image/upload/f_auto,q_auto:good,w_2400,c_limit/v1771060041/mountains_phf0xg.webp';

const MOBILE_HERO_LINKS = [
  { label: 'TENTANG', href: '#about-ticker' },
  { label: 'MANFAAT', href: '#about' },
  { label: 'DAFTAR', href: '#register' },
] as const;

const MOBILE_HERO_STEPS = ['01', '02', '03', '04'] as const;
const MOBILE_HERO_TIMELINE_DURATION_MS = 3600;

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLImageElement>(null);
  const mountainsRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleSpansRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const actionRef = useRef<HTMLAnchorElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );
  const [isMobileVideoPlaying, setIsMobileVideoPlaying] = useState(true);
  const [mobileVideoError, setMobileVideoError] = useState(false);
  const [activeMobileStep, setActiveMobileStep] = useState(0);

  // Sync body class for navbar transparency in hero
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const className = 'home-cinematic-hero';
    const toggleHeaderTransparency = (active: boolean) => {
      document.body.classList.toggle(className, active);
    };

    const syncByViewport = () => {
      const rect = heroElement.getBoundingClientRect();
      const active = rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.25;
      toggleHeaderTransparency(active);
    };

    syncByViewport();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting && entry.intersectionRatio > 0.2;
        toggleHeaderTransparency(active);
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    observer.observe(heroElement);
    window.addEventListener('resize', syncByViewport, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncByViewport);
      document.body.classList.remove(className);
    };
  }, []);

  // Viewport detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const syncViewport = (e: MediaQueryListEvent) => setIsDesktopViewport(e.matches);

    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  // Motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  // Desktop Parallax & Stagger Entrance
  useEffect(() => {
    if (prefersReducedMotion || !isDesktopViewport) return;

    const ctx = gsap.context(() => {
      const heroElements = [
        subtitleRef.current,
        ...titleSpansRef.current.filter(Boolean),
        descriptionRef.current,
        ctaRowRef.current,
        actionRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        heroElements,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: 'power2.out',
        }
      );

      if (!heroRef.current) return;

      const parallaxValues = { sky: 90, mountains: 0, logo: 50, content: 220 };
      const scrollTriggerInstance = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerInstance
        .to(skyRef.current, { y: parallaxValues.sky }, 0)
        .to(mountainsRef.current, { y: parallaxValues.mountains }, 0)
        .to(logoRef.current, { y: parallaxValues.logo }, 0)
        .to(contentRef.current, { y: parallaxValues.content, autoAlpha: 0 }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, [isDesktopViewport, prefersReducedMotion]);

  // Mobile timeline step progression
  useEffect(() => {
    if (isDesktopViewport || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveMobileStep((prev) => (prev + 1) % MOBILE_HERO_STEPS.length);
    }, MOBILE_HERO_TIMELINE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [isDesktopViewport, prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="hero-section hero-section-cinematic section relative w-full h-screen min-h-screen overflow-hidden bg-[#F4F2EF]"
      id="section-00"
    >
      {/* Mobile Cinematic Frame (< 768px) */}
      <div className="hero-mobile-cinematic" aria-label="Cinematic mobile hero">
        <div className="hero-mobile-cinematic-frame">
          {!mobileVideoError ? (
            <video
              ref={mobileVideoRef}
              className="hero-mobile-cinematic-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onPlay={() => setIsMobileVideoPlaying(true)}
              onPause={() => setIsMobileVideoPlaying(false)}
              onError={() => {
                setMobileVideoError(true);
                setIsMobileVideoPlaying(false);
              }}
            >
              <source src={MOBILE_HERO_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <div className="hero-mobile-cinematic-placeholder">
              XCODE HMTI • Video Reel
            </div>
          )}

          <div className="hero-mobile-cinematic-scrim" aria-hidden="true" />

          <div className="hero-mobile-cinematic-top">
            <h1 className="hero-mobile-cinematic-brand">XCODE HMTI</h1>
            <div className="hero-mobile-cinematic-links" aria-label="Quick links mobile hero">
              {MOBILE_HERO_LINKS.map((item) => (
                <a key={item.label} href={item.href} className="hero-mobile-cinematic-chip">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-mobile-cinematic-timeline" aria-hidden="true">
            <span
              key={activeMobileStep}
              className="hero-mobile-cinematic-timeline-progress"
              style={{
                animationDuration: `${MOBILE_HERO_TIMELINE_DURATION_MS}ms`,
                animationPlayState: isMobileVideoPlaying ? 'running' : 'paused',
              }}
            />
          </div>

          <div className="hero-mobile-cinematic-bottom">
            <div className="hero-mobile-cinematic-meta">
              <p>Divisi Riset &amp; Teknologi</p>
              <p>HMTI UIN Antasari</p>
            </div>
            <div className="hero-mobile-cinematic-counter" aria-label="Hero sequence index">
              {MOBILE_HERO_STEPS.map((stepLabel, index) => (
                <span key={stepLabel} className={index === activeMobileStep ? 'is-active' : ''}>
                  {stepLabel}
                </span>
              ))}
            </div>
            <span className="hero-mobile-cinematic-corner" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Desktop 3-Layer Parallax Viewport (≥ 768px) */}
      {isDesktopViewport && (
        <>
          <div className="hero-image-wrapper" aria-hidden="true">
            {/* Layer 1: Sky background (z-index: 1) */}
            <img
              ref={skyRef}
              src={DESKTOP_HERO_SKY_IMAGE_URL}
              width={1620}
              height={939}
              className="sky absolute top-[-15%] left-0 w-full h-[130%] object-cover object-top pointer-events-none z-[1]"
              alt="Atmospheric Sky"
              fetchPriority="high"
            />

            {/* Layer 2: Floating Logo Ristek (kiri atas, z-index: 2 - di belakang pohon, di depan awan) */}
            <div
              ref={logoRef}
              className="hero-logo-bg absolute top-[15%] left-[5%] z-[2] pointer-events-none will-change-transform"
            >
              <img
                src="/images/LogoRistek.png"
                alt="Logo RISTEK"
                className="w-32 md:w-48 h-auto object-contain opacity-80 filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] drop-shadow-[0_0_35px_rgba(234,92,31,0.3)]"
              />
            </div>

            {/* Layer 3: Pepohonan & Hutan (bertumpu di bottom-0, rumput terlihat, z-index: 3) */}
            <img
              ref={mountainsRef}
              src={DESKTOP_HERO_MOUNTAINS_IMAGE_URL}
              width={2301}
              height={1578}
              className="mountains absolute bottom-0 left-0 w-full min-h-[110vh] object-cover object-bottom pointer-events-none z-[3]"
              alt="Dramatic Mountains and Forest"
              fetchPriority="high"
            />

            <div className="hero-bottom-fade absolute bottom-0 left-0 w-full h-16 z-[4] pointer-events-none bg-gradient-to-t from-[#F4F2EF] to-transparent" aria-hidden="true" />
          </div>

          <div
            ref={contentRef}
            className="hero-content absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            <div className="flex flex-col items-center justify-center px-6 py-8 pointer-events-auto max-w-3xl">
              <h5
                ref={subtitleRef}
                className="hero-subtitle text-[#EA5C1F] font-mono tracking-widest font-bold"
                style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.9)' }}
              >
                - XCODE -
              </h5>
              <h1
                className="hero-title font-serif text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                style={{ textShadow: '0 3px 6px rgba(0,0,0,0.95), 0 6px 20px rgba(0,0,0,0.9)' }}
              >
                <span
                  ref={(el) => {
                    if (el) titleSpansRef.current[0] = el;
                  }}
                >
                  Community &amp;
                </span>{' '}
                <br />
                <span
                  ref={(el) => {
                    if (el) titleSpansRef.current[1] = el;
                  }}
                >
                  Research Technology
                </span>
              </h1>
              <p
                ref={descriptionRef}
                className="hero-description text-white font-sans font-semibold text-base md:text-lg max-w-xl drop-shadow-[0_3px_8px_rgba(0,0,0,0.98)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.98)]"
                style={{ textShadow: '0 2px 6px rgba(0,0,0,0.98), 0 4px 14px rgba(0,0,0,0.9)' }}
              >
                Jelajahi petualangan ngoding bersama Riset &amp; Teknologi, kumpulkan poin selesaikan quest, dan tunjukkan hasil karyamu ke dunia.
              </p>
              <div ref={ctaRowRef} className="hero-cta-row mt-2" aria-label="Quick links">
                <a
                  href="#about-ticker"
                  className="hero-cta hero-cta-primary bg-accent-orange text-white rounded-full px-8 py-3.5 font-sans font-semibold text-sm tracking-wide shadow-[0_10px_25px_rgba(234,92,31,0.35)] hover:bg-[#ff6f32] hover:shadow-[0_14px_30px_rgba(234,92,31,0.45)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore More
                </a>
              </div>
            </div>

            <a
              ref={actionRef}
              href="#about-ticker"
              className="hero-action absolute bottom-6 pointer-events-auto text-white"
              style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.9)' }}
            >
              <span>Scroll down</span>
              <svg width="18" height="18" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 16L14.59 14.59L9 20.17V0H7V20.17L1.42 14.58L0 16L8 24L16 16Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </>
      )}
    </section>
  );
}
