import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', href: 'https://instagram.com/xcodehmti' },
  { label: 'GITHUB', href: 'https://github.com/xcodehmti' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/company/xcode-hmti' },
  { label: 'YOUTUBE', href: 'https://youtube.com/@xcodehmti' },
];

const NAV_LINKS = [
  { label: 'Tentang Kami', href: '#about-ticker' },
  { label: 'Manfaat', href: '#about' },
  { label: 'Kurikulum & Event', href: '#about' },
  { label: 'Komunitas', href: '#about' },
  { label: 'Pendaftaran', href: '#register' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const bottomLinksRef = useRef<HTMLDivElement | null>(null);
  const logoRowRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const svgStrokeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // ===== Section entrance =====
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          invalidateOnRefresh: true,
        },
      });

      if (navRef.current) {
        tl.fromTo(navRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0);
      }
      if (rightRef.current) {
        tl.fromTo(rightRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.08);
      }
      if (bottomLinksRef.current) {
        tl.fromTo(bottomLinksRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.18);
      }
      if (logoRowRef.current) {
        tl.fromTo(logoRowRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.24);
      }
      if (copyRef.current) {
        tl.fromTo(copyRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.32);
      }

      // ===== SVG Stroke Draw-On =====
      if (svgStrokeRef.current) {
        const svg = svgStrokeRef.current;
        const geometries = svg.querySelectorAll<SVGGeometryElement>(
          'path, line, polyline, polygon, circle, rect'
        );

        gsap.set(geometries, { vectorEffect: 'non-scaling-stroke' });

        geometries.forEach((g) => {
          let length = 0;
          try {
            length = g.getTotalLength();
          } catch {
            return;
          }
          if (!length || !Number.isFinite(length)) return;

          gsap.set(g, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
          });
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: svg,
              start: 'top 85%',
              end: 'bottom 25%',
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
            defaults: { ease: 'none' },
          })
          .to(geometries, { strokeDashoffset: 0, stagger: 0.02 });
      }

      // ===== Hover Underline Effect =====
      const links = footer.querySelectorAll<HTMLAnchorElement>('a[data-hover="underline"]');
      links.forEach((a) => {
        let line = a.querySelector<HTMLElement>('[data-underline="true"]');
        if (!line) {
          line = document.createElement('span');
          line.setAttribute('data-underline', 'true');
          line.style.position = 'absolute';
          line.style.left = '0';
          line.style.right = '0';
          line.style.bottom = '-4px';
          line.style.height = '1.5px';
          line.style.background = '#EA5C1F';
          line.style.transform = 'scaleX(0)';
          line.style.transformOrigin = 'left center';
          line.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.pointerEvents = 'none';
          a.style.position = 'relative';
          a.appendChild(line);
        }

        const handleMouseEnter = () => {
          if (line) line.style.transform = 'scaleX(1)';
        };
        const handleMouseLeave = () => {
          if (line) line.style.transform = 'scaleX(0)';
        };

        a.addEventListener('mouseenter', handleMouseEnter);
        a.addEventListener('mouseleave', handleMouseLeave);
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-[#1A1A1A] border-t-2 border-neutral-800 text-white font-sans pt-12 md:pt-16 pb-8"
      aria-label="Footer Xcode HMTI"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 flex flex-col gap-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Brand & Nav */}
          <div ref={navRef} className="md:col-span-5 lg:col-span-4">
            <a href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl md:text-3xl tracking-wider text-white">
                XCODE <span className="text-accent-orange font-bold">HMTI</span>
              </span>
            </a>
            <p className="text-sm font-sans text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Wadah inkubasi talenta rekayasa perangkat lunak dan riset teknologi mahasiswa Teknik Informatika UIN Antasari Banjarmasin.
            </p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer Quick Links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-hover="underline"
                  className="inline-block text-base font-medium text-neutral-300 hover:text-accent-orange transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Middle Column: Address & Contact */}
          <div className="md:col-span-4 lg:col-span-4 text-left">
            <p className="text-xs font-semibold text-neutral-500 mb-4 tracking-[0.2em] uppercase">
              SEKRETARIAT
            </p>
            <div className="space-y-1.5 text-sm text-neutral-300 leading-relaxed">
              <p className="text-white font-medium">Himpunan Mahasiswa Teknologi Informasi</p>
              <p>Fakultas Tarbiyah dan Keguruan</p>
              <p>UIN Antasari Banjarmasin</p>
              <p className="text-neutral-500">Jl. A. Yani KM 4.5, Banjarmasin, Kalimantan Selatan</p>
              <div className="pt-4">
                <a
                  href="mailto:hmti@uin-antasari.ac.id"
                  className="text-accent-orange hover:text-[#ff6f32] text-sm font-medium transition-colors"
                >
                  hmti@uin-antasari.ac.id
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Connect & Socials */}
          <div ref={rightRef} className="md:col-span-3 lg:col-span-4 md:text-right">
            <p className="text-xs font-semibold text-neutral-500 mb-4 tracking-[0.2em] uppercase md:text-right">
              JARINGAN KAMI
            </p>
            <div className="flex flex-col md:items-end gap-3">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={link.label}
                  data-hover="underline"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm md:text-base font-medium text-neutral-200 hover:text-accent-orange transition-colors inline-flex items-center gap-2.5 w-fit"
                >
                  <span className="text-xs text-neutral-500 group-hover:text-accent-orange transition-colors">
                    0{index + 1}
                  </span>
                  <span>{link.label}</span>
                  <span className="text-accent-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Divider */}
        <div className="relative overflow-hidden py-3 border-y border-neutral-800 pointer-events-none select-none">
          <div className="flex whitespace-nowrap animate-pulse text-xs uppercase tracking-[0.3em] text-neutral-600 font-semibold justify-around">
            <span>XCODE HMTI</span>
            <span>•</span>
            <span>DIVISI RISET &amp; TEKNOLOGI</span>
            <span>•</span>
            <span>REKAYASA PERANGKAT LUNAK</span>
            <span>•</span>
            <span>KOLABORASI &amp; RISET</span>
            <span>•</span>
            <span>UIN ANTASARI</span>
          </div>
        </div>

        {/* Big Animated SVG Logo Row (HMTI Stroke Draw-On) */}
        <div ref={logoRowRef} className="relative w-full py-6 flex items-center justify-center">
          <svg
            ref={svgStrokeRef}
            viewBox="0 0 609 193"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-3xl h-auto pointer-events-none select-none opacity-85"
            aria-label="Xcode HMTI Signature Outlines"
          >
            <path
              d="M599.039 174.137C601.699 174.137 603.911 175.089 605.637 176.994C607.536 178.71 608.5 180.827 608.5 183.318C608.5 185.815 607.533 188.019 605.638 189.912C603.912 191.636 601.793 192.5 599.311 192.5C596.829 192.5 594.629 191.637 592.73 189.93L592.711 189.912L592.693 189.893C590.985 187.996 590.121 185.798 590.121 183.318C590.121 180.668 590.979 178.456 592.712 176.725C594.437 175.001 596.556 174.137 599.039 174.137ZM24.0381 0.5V87.8604H111.29V0.5H134.828V191.415H111.29V91.5742H24.0381V191.415H0.5V0.5H24.0381ZM198.456 0.5L198.568 0.845703L255.115 174.913L311.395 0.845703L311.506 0.5H321.272L321.327 0.938477L344.951 190.854L345.021 191.415H321.475L321.421 190.976L302.961 41.2852L254.507 191.068L254.395 191.415H236.562L236.449 191.072L187.458 43.1602L169.534 190.975L169.48 191.415H164.941L165.011 190.854L188.636 0.938477L188.69 0.5H198.456ZM488.859 0.5V4.21289H441.61V191.415H418.072V4.21289H371.095V0.5H488.859ZM564.412 0.5V4.21289H551.106V187.702H564.412V191.415H515.077V187.702H527.568V4.21289H515.077V0.5H564.412Z"
              stroke="#EA5C1F"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div
          ref={copyRef}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 border-t border-neutral-800 pt-6"
        >
          <p>© 2026 XCODE HMTI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-accent-orange transition-colors">
              Tentang Kami
            </a>
            <a href="#about-ticker" className="hover:text-accent-orange transition-colors">
              Ekosistem
            </a>
            <a href="#register" className="hover:text-accent-orange transition-colors">
              Pendaftaran
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
