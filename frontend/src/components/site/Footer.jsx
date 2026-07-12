import React from "react";
import { SITE } from "@/constants/testIds/site";
import { Instagram, Linkedin } from "lucide-react";

function LithosLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 256 256" fill="#ffffff">
      <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      data-testid={SITE.footer}
      className="relative bg-[#050505] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <LithosLogo />
            <span className="text-white text-2xl font-playfair italic">
              Lithos
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            An AI-agents and creative-tech studio building the automation
            behind great brands.
          </p>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-white/50 text-xs uppercase tracking-[0.25em] mb-4">
            Studio
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li><a href="#about" className="hover:text-[#e8702a] transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-[#e8702a] transition-colors">Capabilities</a></li>
            <li><a href="#industries" className="hover:text-[#e8702a] transition-colors">Industry Packages</a></li>
            <li><a href="#contact" className="hover:text-[#e8702a] transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-white/50 text-xs uppercase tracking-[0.25em] mb-4">
            Elsewhere
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>
              <a
                href="mailto:hello@augstudios.ai"
                className="hover:text-[#e8702a] transition-colors"
              >
                hello@augstudios.ai
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/15550102025"
                className="hover:text-[#e8702a] transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp +1 (555) 010-2025
              </a>
            </li>
            <li className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com/augstudios"
                aria-label="Instagram"
                className="text-white/60 hover:text-[#e8702a] transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/augstudios"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-[#e8702a] transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Lithos Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/40 font-playfair italic">
            Design-led automation. Craft on every touchpoint.
          </p>
        </div>
      </div>
    </footer>
  );
}
