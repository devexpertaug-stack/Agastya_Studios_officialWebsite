import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SITE } from "@/constants/testIds/site";

export function AgastyaLogo({ size = 26 }) {
  // Stylised triple-peak / pine-needle mark (evokes Himalayan ridge)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 52 L20 20 L28 36 L38 12 L52 40 L60 52 Z"
        stroke="#d4a574"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(127,166,112,0.12)"
      />
      <circle cx="38" cy="14" r="2" fill="#d4a574" />
    </svg>
  );
}

const LINKS = [
  { label: "Home", to: "/", testId: SITE.navHome, hash: "" },
  { label: "Services", to: "/#services", testId: SITE.navServices, hash: "services" },
  { label: "Work", to: "/#work", testId: SITE.navWork, hash: "work" },
  { label: "Pricing", to: "/#pricing", testId: SITE.navPricing, hash: "pricing" },
  { label: "About", to: "/#about", testId: SITE.navAbout, hash: "about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHash = (hash) => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goto = (hash) => {
    setMobileOpen(false);
    // On a sub-page (e.g. /work/:id): route home first, then scroll.
    // Uses react-router so it respects the GitHub Pages basename/sub-path.
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (hash) scrollToHash(hash);
        else window.scrollTo({ top: 0 });
      }, 120);
      return;
    }
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    scrollToHash(hash);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[#0a1810]/60 border-b border-[rgba(168,192,144,0.1)]" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link
          to="/"
          data-testid={SITE.navLogo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <AgastyaLogo />
          <span className="text-[var(--bone-100)] text-2xl font-serif-italic group-hover:text-[var(--dawn-500)] transition-colors">
            Agastya
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.32em] text-[var(--mist)] ml-1 mt-1">
            Studios
          </span>
        </Link>

        <div
          data-testid={SITE.navPill}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-[rgba(240,234,214,0.06)] backdrop-blur-md border border-[rgba(240,234,214,0.15)] rounded-full px-2 py-2 items-center gap-1"
        >
          {LINKS.map((l) => (
            <button
              key={l.label}
              data-testid={l.testId}
              onClick={() => goto(l.hash)}
              className="text-[var(--bone-100)]/80 hover:bg-[rgba(212,165,116,0.12)] hover:text-[var(--dawn-500)] transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          data-testid={SITE.navContactBtn}
          onClick={() => goto("contact")}
          className="hidden md:block btn-forest"
        >
          Let&apos;s Talk
        </button>

        <button
          data-testid={SITE.navMobileToggle}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden bg-[var(--moss-400)] text-[var(--forest-950)] text-xs font-semibold px-4 py-2 rounded-full"
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1810]/95 backdrop-blur-md border-t border-[rgba(168,192,144,0.1)] px-6 py-6 flex flex-col gap-4">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => goto(l.hash)}
              className="text-left text-[var(--bone-100)] text-lg font-serif-italic"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => goto("contact")} className="btn-forest self-start mt-2">
            Let&apos;s Talk
          </button>
        </div>
      )}
    </nav>
  );
}
