import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { SITE } from "@/constants/testIds/site";
import { AgastyaLogo } from "@/components/site/Nav";
import { api } from "@/lib/api";

export default function Footer() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
  }, []);
  const email = settings?.contact_email || "devexpertaug@gmail.com";
  const whatsapp = settings?.contact_whatsapp || "+917906411716";
  const waNum = whatsapp.replace(/[^0-9]/g, "");

  return (
    <footer
      data-testid={SITE.footer}
      className="relative bg-[#06110b] text-[var(--bone-100)] border-t border-[rgba(168,192,144,0.12)] overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[var(--moss-400)]/8 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <AgastyaLogo />
            <span className="text-2xl font-serif-italic">Agastya</span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--mist)] mt-1 ml-1">
              Studios
            </span>
          </div>
          <p className="text-[var(--bone-100)]/65 text-sm leading-relaxed max-w-sm">
            A quiet, Uttarakhand-rooted AI + creative-tech studio. Building the
            automation behind good brands — patient, useful, on brand.
          </p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--mist)] mt-4">
            Kumaon → Everywhere
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[var(--mist)] text-xs uppercase tracking-[0.28em] mb-5">
            Studio
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><a href="/#about" className="link-warm">About</a></li>
            <li><a href="/#services" className="link-warm">Capabilities</a></li>
            <li><a href="/#work" className="link-warm">Recent Work</a></li>
            <li><a href="/#pricing" className="link-warm">Pricing</a></li>
            <li><a href="/#contact" className="link-warm">Contact</a></li>
            <li><Link to="/login" className="link-warm">Admin</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-[var(--mist)] text-xs uppercase tracking-[0.28em] mb-5">
            Reach out
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href={`mailto:${email}`} className="link-warm inline-flex items-center gap-1.5 group">
                {email}
                <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${waNum}`} target="_blank" rel="noreferrer" className="link-warm inline-flex items-center gap-1.5 group">
                WhatsApp {whatsapp}
                <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </li>
            <li className="flex items-center gap-4 pt-3">
              <a href="https://instagram.com" aria-label="Instagram" className="text-[var(--bone-100)]/60 hover:text-[var(--dawn-500)] transition-colors" target="_blank" rel="noreferrer">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-[var(--bone-100)]/60 hover:text-[var(--dawn-500)] transition-colors" target="_blank" rel="noreferrer">
                <Linkedin size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-[rgba(168,192,144,0.08)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[var(--bone-100)]/40">
            © {new Date().getFullYear()} Agastya Studios. Made slowly, in the hills.
          </p>
          <p className="text-xs text-[var(--bone-100)]/40 font-serif-italic">
            Design-led automation. Craft on every touchpoint.
          </p>
        </div>
      </div>
    </footer>
  );
}
