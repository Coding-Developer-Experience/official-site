import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  desc: string;
  thumbnail: string;
  highRes: string;
  isMain?: boolean;
};

const documentationItems: GalleryItem[] = [
  {
    id: 'doc-workshop',
    title: 'Sesi Workshop & Pembekalan',
    category: 'Akademik & Riset',
    date: '2026',
    desc: 'Pemaparan komprehensif kurikulum teknologi dan pemahaman arsitektur perangkat lunak bersama rekan mahasiswa.',
    thumbnail: '/images/dokumentasi/opt/DSC_7130.jpg',
    highRes: '/images/dokumentasi/DSC_7130.JPG',
  },
  {
    id: 'doc-hardware',
    title: 'Rekayasa Perangkat & Prototyping',
    category: 'Laboratorium TI',
    date: '2026',
    desc: 'Eksplorasi modul elektronika terpadu dan pengujian sistem catu daya bersama tim rekayasa.',
    thumbnail: '/images/dokumentasi/opt/DSC_7143.jpg',
    highRes: '/images/dokumentasi/DSC_7143.JPG',
  },
  {
    id: 'doc-seminar',
    title: 'Diskusi Teknis & Kolaborasi',
    category: 'Sesi Diskusi',
    date: '2026',
    desc: 'Tukar gagasan implementasi teknologi terbuka dan penajaman logika pemrograman mandiri.',
    thumbnail: '/images/dokumentasi/opt/DSC_7133.jpg',
    highRes: '/images/dokumentasi/DSC_7133.JPG',
  },
  {
    id: 'doc-squad-x',
    title: 'Solidaritas Simbol X',
    category: 'Keluarga Besar',
    date: '2026',
    desc: 'Simbol kekompakan dan kebersamaan perwakilan pengurus dalam balutan seragam kebanggaan.',
    thumbnail: '/images/dokumentasi/opt/IMG_6606.jpg',
    highRes: '/images/dokumentasi/IMG_6606.JPG',
  },
  {
    id: 'doc-main-delta',
    title: 'Ikrar Integritas Simbol Segitiga',
    category: 'Dokumentasi Utama',
    date: 'Kabinet 2026',
    desc: 'Simbol segitiga khas HMTI UIN Antasari, mencerminkan sinergi tiga pilar riset, adab, dan karya nyata.',
    thumbnail: '/images/dokumentasi/opt/IMG_6608.jpg',
    highRes: '/images/dokumentasi/IMG_6608.JPG',
    isMain: true,
  },
  {
    id: 'doc-squad-salute',
    title: 'Visi Gerak Terarah',
    category: 'Kepemimpinan',
    date: '2026',
    desc: 'Fokus pandangan ke depan dalam memajukan budaya riset teknologi informasi di lingkungan kampus.',
    thumbnail: '/images/dokumentasi/opt/IMG_6607.jpg',
    highRes: '/images/dokumentasi/IMG_6607.JPG',
  },
  {
    id: 'doc-lab-study',
    title: 'Studi Proyek Kelompok',
    category: 'Kolaborasi',
    date: '2026',
    desc: 'Bedah kode bersama di laboratorium komputasi dengan evaluasi kode sejawat secara langsung.',
    thumbnail: '/images/dokumentasi/opt/DSC_7136.jpg',
    highRes: '/images/dokumentasi/DSC_7136.JPG',
  },
  {
    id: 'doc-dev-workspace',
    title: 'Implementasi & Pengukuran',
    category: 'Kemitraan & Karya',
    date: '2026',
    desc: 'Akurasi pengerjaan proyek perangkat keras dan lunak dengan standar verifikasi terukur.',
    thumbnail: '/images/dokumentasi/opt/DSC_7148.jpg',
    highRes: '/images/dokumentasi/DSC_7148.JPG',
  },
  {
    id: 'doc-campus-cohort',
    title: 'Keluarga Mahasiswa TI',
    category: 'Kohort Angkatan',
    date: 'Kampus 2 UIN',
    desc: 'Dokumentasi akbar seluruh mahasiswa Teknologi Informasi dengan jas almamater di pelataran kampus utama.',
    thumbnail: '/images/dokumentasi/opt/cohort_outdoor.jpg',
    highRes: '/images/dokumentasi/cohort_outdoor.webp',
  },
];

export default function DocumentationGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Keyboard shortcut (Escape) to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    if (activeItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  // Viewport observer to ensure navbar transparency when inside DocumentationGallery
  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const className = 'doc-gallery-active';
    const toggleActive = (active: boolean) => {
      document.body.classList.toggle(className, active);
    };

    const syncByViewport = () => {
      const rect = sectionElement.getBoundingClientRect();
      const active = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2;
      toggleActive(active);
    };

    syncByViewport();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting && entry.intersectionRatio > 0.1;
        toggleActive(active);
      },
      { threshold: [0, 0.1, 0.5, 0.8, 1] }
    );

    observer.observe(sectionElement);
    window.addEventListener('scroll', syncByViewport, { passive: true });
    window.addEventListener('resize', syncByViewport, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncByViewport);
      window.removeEventListener('resize', syncByViewport);
      document.body.classList.remove(className);
    };
  }, []);

  // GSAP ScrollTrigger Pinning & Seamless Photo Wall Zoom-Out Animation
  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set(grid, { scale: 0.333, transformOrigin: 'center center' });
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
        if (scrollHintRef.current) gsap.set(scrollHintRef.current, { opacity: 0, display: 'none' });
        return;
      }

      // Initial state: scale 1.03 ensures the center tile (100vw x 100vh) completely covers the viewport
      // with zero white space on any edge.
      gsap.set(grid, {
        scale: 1.03,
        transformOrigin: 'center center',
        force3D: true,
      });

      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: -20 });
      }

      // Synchronize transparent navbar when entering the fullscreen gallery
      const stNavbar = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => document.body.classList.add('doc-gallery-active'),
        onLeave: () => document.body.classList.remove('doc-gallery-active'),
        onEnterBack: () => document.body.classList.add('doc-gallery-active'),
        onLeaveBack: () => document.body.classList.remove('doc-gallery-active'),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Grid shrinks from scale 1.03 to 0.23 (tight, seamless photo wall) and translates gracefully downward
      tl.to(
        grid,
        {
          scale: 0.23,
          yPercent: 8,
          ease: 'power2.inOut',
          duration: 1,
          force3D: true,
        },
        0
      );

      // 2. Initial subtle scroll hint fades out immediately on first scroll
      if (scrollHintRef.current) {
        tl.to(
          scrollHintRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.15,
            ease: 'power1.out',
          },
          0
        );
      }

      // 3. Section Header fades in as the full photo wall emerges
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.65
        );
      }

      return () => {
        document.body.classList.remove('doc-gallery-active');
        stNavbar.kill();
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="documentation-gallery"
        aria-label="Dokumentasi & Galeri HMTI"
        className="relative w-full h-screen bg-[#F4F2EF] overflow-hidden select-none"
      >
        {/* Subtle Minimal Scroll Hint (Bottom Center, no dark scrim, unencumbered photo) */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] sm:text-[11px] tracking-widest uppercase font-sans border border-white/15 shadow-lg will-change-transform"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA5C1F] animate-pulse" />
          <span>Gulir untuk membuka dinding arsip</span>
        </div>

        {/* Section Header (Revealed in the final zoomed-out photo wall state, positioned below navbar) */}
        <div
          ref={headerRef}
          className="absolute top-20 sm:top-22 md:top-24 left-0 right-0 z-20 text-center pointer-events-none opacity-0 will-change-transform px-4"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#EA5C1F] uppercase mb-1">
            Arsip & Rekaman Kegiatan
          </span>
          <h2 className="font-['Bentham',Georgia,serif] text-2xl sm:text-3xl md:text-5xl text-[#0A0B10] tracking-tight">
            Jejak & Dokumentasi
          </h2>
          <p className="mt-1 text-xs text-[#0A0B10]/65 max-w-md mx-auto font-sans">
            Dinamika riset teknologi, laboratorium, dan kebersamaan keluarga TI UIN Antasari.
          </p>
        </div>

        {/* 300vw x 300vh Giant Grid Container (Centered in Viewport with GPU Hardware Acceleration) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden will-change-transform transform-gpu">
          <div
            ref={gridRef}
            className="shrink-0 min-w-[300vw] min-h-[300vh] w-[300vw] h-[300vh] grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 will-change-transform transform-gpu backface-hidden"
            style={{
              transformOrigin: 'center center',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitPerspective: 1000,
              perspective: 1000,
              transform: 'translateZ(0)',
            }}
          >
            {documentationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${item.title} - ${item.category}`}
                className="relative w-full h-full overflow-hidden bg-black/5 cursor-pointer focus:outline-none transform-gpu backface-hidden"
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Optimized Web Image with loading="lazy" & decoding="async" for butter-smooth 60fps scrolling */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none pointer-events-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal Dialog */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-black/10"
          >
            {/* Modal Image */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.highRes}
                alt={activeItem.title}
                className="w-full h-full max-h-[50vh] md:max-h-[80vh] object-contain"
              />
            </div>

            {/* Modal Metadata / Story */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#F4F2EF]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#EA5C1F] bg-white px-2.5 py-1 rounded-full shadow-xs">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-mono text-[#0A0B10]/50">
                    {activeItem.date}
                  </span>
                </div>

                <h3 className="font-['Bentham',Georgia,serif] text-2xl sm:text-3xl text-[#0A0B10] leading-snug">
                  {activeItem.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#0A0B10]/75 leading-relaxed font-sans">
                  {activeItem.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.08] flex items-center justify-between">
                <span className="text-[11px] text-[#0A0B10]/50 font-sans">
                  Arsip Resmi Divisi Ristek HMTI
                </span>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#0A0B10] hover:bg-[#EA5C1F] text-white text-xs font-medium transition-colors duration-200 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Close Button top-right */}
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Tutup jendela modal"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
