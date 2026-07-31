import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/constants/testIds/site";
import { useServiceCategories } from "@/hooks/useServiceCategories";

// Flagship capabilities to feature in the pinned scroll experience.
// Web Development leads — it's the studio's home turf and where everything plugs in.
const FLAGSHIP = ["web", "ecommerce", "voice", "conversational", "design"];

export default function FeatureShowcase() {
  const categories = useServiceCategories();
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const steps = FLAGSHIP.map((s) => bySlug[s]).filter(Boolean);
  // Web Development first in the full list too, then the rest in their usual order.
  const orderedCategories = [
    ...categories.filter((c) => c.slug === "web"),
    ...categories.filter((c) => c.slug !== "web"),
  ];
  const outerRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    setActive(idx);
  });

  if (!steps.length) return null;
  const current = steps[active];

  return (
    <section
      id="services"
      data-testid={SITE.servicesSection}
      className="relative bg-[#06110b] text-[var(--bone-100)]"
    >
      {/* Intro header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-40 pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
          02 — Capabilities
        </p>
        <h2
          data-testid={SITE.servicesHeading}
          className="font-display text-5xl sm:text-7xl md:text-[5.5rem] mx-auto max-w-4xl"
        >
          All the services <span className="text-lime">you need</span>, one studio.
        </h2>
      </div>

      {/* Pinned scrolljack */}
      <div ref={outerRef} style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: sticky icon rail + text */}
            <div className="lg:col-span-5 flex gap-6">
              {/* Icon rail */}
              <div className="flex flex-col gap-3 pt-1">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const on = i === active;
                  return (
                    <div
                      key={s.slug}
                      className={`w-12 h-12 rounded-full grid place-items-center border transition-all duration-500 ${
                        on
                          ? "bg-[var(--lime-400)] text-[#0b1a0c] border-transparent scale-110"
                          : "border-[rgba(240,234,214,0.15)] text-[var(--bone-100)]/50"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  );
                })}
              </div>

              {/* Text block */}
              <div className="flex-1 min-h-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-serif-italic text-[var(--mist)]">/{current.number}</span>
                    <h3 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
                      {current.title}
                    </h3>
                    <p className="mt-5 text-[var(--bone-100)]/70 leading-relaxed max-w-md">
                      {current.blurb}
                    </p>
                    <ul className="mt-6 space-y-2.5 max-w-md">
                      {current.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--bone-100)]/75">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--lime-400)] flex-shrink-0" />
                          {f.split("—")[0].trim()}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${current.slug}`}
                      data-testid={SITE.serviceCardLink(current.slug)}
                      className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lime-400)] hover:gap-3 transition-all"
                    >
                      Explore {current.title} <ArrowUpRight size={16} />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: swapping mockup */}
            <div className="lg:col-span-7 relative h-[300px] sm:h-[420px] lg:h-[520px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06110b] via-[rgba(6,17,11,0.35)] to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--lime-400)]">
                          {current.caseStudy?.client || "Case study"}
                        </p>
                        <p className="font-display text-xl md:text-2xl mt-1">
                          {current.caseStudy?.title || current.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step progress bars */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 lg:justify-start lg:left-1">
                {steps.map((s, i) => (
                  <span
                    key={s.slug}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-8 bg-[var(--lime-400)]" : "w-3 bg-[rgba(240,234,214,0.2)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All capabilities chip row (keeps every service linkable) */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="ridge mb-10" />
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--mist)] mb-6 text-center">
          Every capability
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {orderedCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/services/${cat.slug}`}
                data-testid={SITE.serviceCard(cat.slug)}
                className="group inline-flex items-center gap-2 rounded-full border border-[rgba(240,234,214,0.14)] bg-[rgba(240,234,214,0.03)] px-4 py-2 text-sm hover:border-[var(--lime-400)]/60 hover:text-[var(--lime-400)] transition-all"
              >
                <Icon size={15} strokeWidth={1.8} />
                {cat.title}
                <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
