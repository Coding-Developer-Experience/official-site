import { useState, useEffect, useRef } from 'react';

const NAV_MENU_ITEMS = [
  { label: 'Tentang Kami', href: '#about-ticker' },
  { label: 'Manfaat', href: '#about' },
  { label: 'Kurikulum & Event', href: '#curriculum' },
  { label: 'Komunitas', href: '#about' },
  { label: 'Kontak', href: '#footer' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('menu-is-active');
    };
  }, []);

  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');
    const footer = document.querySelector('footer');

    let scrollTimeout: number;

    const handleScroll = () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = requestAnimationFrame(() => {
        let nextIsScrolled = false;
        let nextHideHeader = false;

        if (heroSection) {
          const scrollY = window.scrollY;
          const heroHeight = (heroSection as HTMLElement).offsetHeight;
          nextIsScrolled = scrollY >= heroHeight / 2;
        } else {
          nextIsScrolled = window.scrollY > 24;
        }

        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const shouldHideByFooter = footerRect.top <= window.innerHeight - headerHeight;
          nextHideHeader = nextHideHeader || shouldHideByFooter;
        }

        setIsScrolled(nextIsScrolled);
        setHideHeader(nextHideHeader);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    document.body.classList.toggle('menu-is-active', nextState);
    document.body.classList.toggle('overflow-hidden', nextState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-is-active');
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? 'on-scroll' : ''} ${hideHeader ? 'header-hidden' : ''}`}
    >
      <nav className="navbar" aria-label="Main Navigation">
        <div className="header-container">
          {/* Brand */}
          <a href="/" className="brand flex items-center gap-3" aria-label="Beranda">
            <img
              src="/images/LogoRistek.png"
              alt="Logo Ristek"
              className="h-10 w-10 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_MENU_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-900 hover:text-accent-orange text-sm font-semibold tracking-wide transition-colors duration-200 relative group focus-visible:outline-none focus-visible:text-accent-orange"
              >
                {item.label}
                <span className="absolute bottom-[-3px] left-0 w-0 h-[1.5px] bg-[#EA5C1F] group-hover:w-full group-focus-visible:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#register"
              className="px-6 py-2 rounded-full bg-accent-orange text-white text-sm font-semibold hover:bg-[#ff6f32] hover:shadow-[0_4px_14px_rgba(234,92,31,0.35)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
            >
              Daftar Sekarang
            </a>
          </div>

          {/* Burger Button (Mobile) */}
          <button
            type="button"
            className={`burger md:hidden ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="burger-line-wrapper">
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </div>
          </button>

          {/* Slide Drawer (Mobile) */}
          <div className="menu" id="mobile-nav-menu">
            <div className="menu-header">
              <a href="/" className="brand flex items-center gap-3" onClick={closeMenu} aria-label="Beranda">
                <img
                  src="/images/LogoRistek.png"
                  alt="Logo Ristek"
                  className="h-9 w-9 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                />
              </a>
              <button
                type="button"
                className="burger is-active close-menu"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <div className="burger-line-wrapper">
                  <span className="burger-line" />
                  <span className="burger-line" />
                  <span className="burger-line" />
                </div>
              </button>
            </div>

            <ul className="menu-inner list-none m-0">
              {NAV_MENU_ITEMS.map((item) => (
                <li key={item.href} className="menu-item w-full">
                  <a href={item.href} className="menu-link" onClick={closeMenu}>
                    <span className="menu-link-content">{item.label}</span>
                    <span className="text-white/40" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
              <li className="menu-item w-full mt-4">
                <a
                  href="#register"
                  onClick={closeMenu}
                  className="block w-full py-3 text-center rounded-full bg-accent-orange text-white font-semibold text-sm hover:bg-[#ff6f32] transition-colors"
                >
                  Daftar Sekarang
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className="header-backdrop"
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
}
