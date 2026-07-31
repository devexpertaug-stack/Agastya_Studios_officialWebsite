import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SITE } from "@/constants/testIds/site";
import { GLOBAL_TESTIMONIALS, SERVICE_CATEGORIES } from "@/data/services";

// Build a fuller wall of voices from the global + per-capability testimonials.
function buildVoices() {
  const seen = new Set();
  const all = [
    ...GLOBAL_TESTIMONIALS,
    ...SERVICE_CATEGORIES.map((c) => c.testimonial).filter(Boolean),
  ];
  const out = [];
  for (const t of all) {
    if (!t || seen.has(t.author)) continue;
    seen.add(t.author);
    out.push(t);
  }
  return out.slice(0, 8);
}

const ROTATIONS = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.4, -2.2, 1.6];

export default function Testimonials() {
  const voices = buildVoices();

  return (
    <section
      id="voices"
      data-testid={SITE.testimonialsSection}
      className="relative bg-[#06110b] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden grain"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
            04 — Voices from the valley
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl mx-auto max-w-3xl">
            Trusted by quiet, <span className="text-lime">obsessed</span> teams.
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {voices.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 60, rotate: ROTATIONS[i % ROTATIONS.length] }}
              whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 break-inside-avoid glass-card rounded-2xl p-7 flex flex-col gap-4 hover:rotate-0 transition-transform duration-500"
            >
              <Quote size={20} className="text-[var(--lime-400)]" />
              <blockquote className="text-[var(--bone-100)]/85 text-base leading-relaxed font-serif-italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-[rgba(168,192,144,0.12)]">
                <div className="text-sm text-[var(--bone-100)]">{t.author}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--mist)] mt-1">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
