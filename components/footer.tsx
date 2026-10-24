"use client";

import { ArrowUp, Heart, Globe, MessageSquare } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Blog", href: "#blog" },
  { label: "Team", href: "#team" },
];

const socials = [
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
  { label: "Discord", href: "https://discord.com", icon: DiscordIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-neutral-200/80 bg-white text-neutral-600">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-6 lg:col-span-5">
            <a href="#home" className="inline-block text-2xl font-bold tracking-tight text-neutral-900">
              Xcode<span className="text-[#3B82F6]">.</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              Wadah kolaborasi mahasiswa dalam mempelajari teknologi, merancang proyek nyata, serta membentuk talenta developer profesional.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400">
              <span className="text-[#3B82F6]">BUILD.</span>
              <span>LEARN.</span>
              <span className="text-[#FDBA21]">TOGETHER.</span>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3 lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Navigasi
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-[#2563EB]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Col */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Komunitas
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition-all hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:scale-105"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              Bergabung bersama puluhan anggota lainnya di komunitas.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 text-xs text-neutral-400 sm:flex-row">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {new Date().getFullYear()} Xcode (Coding Developer Experience). Dibuat dengan <Heart className="size-3 text-red-500 inline fill-red-500" /> oleh komunitas.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-medium text-neutral-600 transition-colors hover:text-[#2563EB] cursor-pointer"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
