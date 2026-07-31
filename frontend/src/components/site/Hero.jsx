import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, TreePine, MessageCircle, TrendingUp, MapPin } from "lucide-react";
import { SITE } from "@/constants/testIds/site";

const TOOLS = [
  "React", "n8n", "OpenAI", "Shopify", "Twilio", "WhatsApp",
  "Selenium", "Python", "MongoDB", "Framer", "Wix", "Pine Script",
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---- Card contents (reused by both mobile + desktop layouts) ---- */
function AnalyticsCard() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--mist)]">Recovered revenue</p>
          <p className="mt-1 text-2xl font-display text-lime">+38%</p>
        </div>
        <TrendingUp size={20} className="text-[var(--lime-400)]" />
      </div>
      <svg viewBox="0 0 300 90" className="mt-4 w-full h-16" preserveAspectRatio="none">
        <polyline
          points="0,70 40,60 80,64 120,40 160,48 200,26 240,32 300,10"
          fill="none" stroke="var(--lime-400)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <div className="mt-3 flex gap-2">
        <span className="text-[10px] rounded-full bg-[rgba(200,242,106,0.12)] text-[var(--lime-400)] px-2 py-0.5">60 days</span>
        <span className="text-[10px] rounded-full bg-[rgba(240,234,214,0.06)] text-[var(--mist)] px-2 py-0.5">Cart agent</span>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-[var(--lime-400)] text-[#0b1a0c] grid place-items-center">
          <MessageCircle size={14} />
        </span>
        <span className="text-sm font-semibold">Rishi</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-[var(--lime-400)]" />
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-xs bg-[rgba(240,234,214,0.06)] rounded-2xl rounded-tl-sm px-3 py-2 text-[var(--bone-100)]/80">
          Want a scoping call this week?
        </p>
        <p className="text-xs bg-[rgba(200,242,106,0.14)] text-[var(--bone-100)] rounded-2xl rounded-tr-sm px-3 py-2 ml-6">
          Yes — Thursday works ✨
        </p>
      </div>
    </div>
  );
}

function LeadsCard() {
  return (
    <div className="glass-card rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--mist)]">New leads today</p>
      <div className="mt-3 space-y-2.5">
        {[
          ["Maruti Eye Care", "Dehradun"],
          ["KK LEE", "Footwear"],
          ["Saluja Realtors", "Property"],
        ].map(([n, t]) => (
          <div key={n} className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--moss-400)] to-[var(--forest-500)]" />
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{n}</p>
              <p className="text-[10px] text-[var(--mist)] truncate">{t}</p>
            </div>
            <ArrowRight size={12} className="ml-auto text-[var(--lime-400)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* One floating glass card (desktop cluster only) */
function FloatCard({ className = "", delay = 0, rot = 0, depth = 30, progress, children }) {
  const y = useTransform(progress, [0, 1], [0, -depth]);
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <div className="floaty" style={{ animationDelay: `${delay}s`, ["--rot"]: `${rot}deg` }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const clusterY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      data-testid={SITE.heroSection}
      className="relative min-h-[100svh] overflow-hidden bg-[#06110b] text-[var(--bone-100)] pt-28 md:pt-24"
    >
      {/* Backdrop: grid + warm/lime glow */}
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-70" />
      <div className="pointer-events-none absolute -top-24 right-[-20%] w-[520px] h-[520px] rounded-full bg-[var(--lime-400)]/[0.06] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-20%] w-[480px] h-[480px] rounded-full bg-[var(--dawn-500)]/[0.05] blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100svh-9rem)]">
        {/* Left: copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-6 relative z-10">
          <div className="hero-anim hero-fade inline-flex items-center gap-2 rounded-full border border-[rgba(240,234,214,0.16)] bg-[rgba(240,234,214,0.04)] px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[var(--mist)]" style={{ animationDelay: "0.05s" }}>
            <TreePine size={12} className="text-[var(--lime-400)]" />
            Garhwal, Uttarakhand
          </div>

          <h1 className="mt-6 font-display font-display-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            <span data-testid={SITE.heroTitleLine1} className="block hero-anim hero-reveal" style={{ animationDelay: "0.12s" }}>
              Design-led
            </span>
            <span data-testid={SITE.heroTitleLine2} className="block text-lime hero-anim hero-reveal" style={{ animationDelay: "0.24s" }}>
              Automation.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[var(--bone-100)]/70 hero-anim hero-fade" style={{ animationDelay: "0.36s" }}>
            Agastya Studios designs, builds and runs the AI agents, websites and
            brands behind modern businesses — patient, useful, and unmistakably
            yours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 hero-anim hero-fade" style={{ animationDelay: "0.48s" }}>
            <button data-testid={SITE.heroCta} onClick={() => scrollToId("contact")} className="btn-pill magnetic justify-center">
              Start a project <ArrowRight size={16} />
            </button>
            <button data-testid={SITE.heroSecondaryCta} onClick={() => scrollToId("work")} className="btn-ghost magnetic justify-center">
              See our work
            </button>
          </div>
        </motion.div>

        {/* Right: card cluster */}
        <div className="lg:col-span-6 relative">
          {/* Desktop: full floating cluster */}
          <motion.div style={{ y: clusterY }} className="hidden lg:block relative h-[560px]">
            <FloatCard progress={scrollYProgress} delay={0} rot={-3} depth={20} className="left-2 top-6 w-[340px]">
              <AnalyticsCard />
            </FloatCard>
            <FloatCard progress={scrollYProgress} delay={1.2} rot={4} depth={44} className="right-0 top-0 w-[260px]">
              <ChatCard />
            </FloatCard>
            <FloatCard progress={scrollYProgress} delay={0.6} rot={-2} depth={64} className="right-6 bottom-2 w-[290px]">
              <LeadsCard />
            </FloatCard>
            <FloatCard progress={scrollYProgress} delay={1.8} rot={6} depth={30} className="left-8 bottom-6">
              <div className="glass-card rounded-full px-3 py-2 flex items-center gap-2">
                <MapPin size={13} className="text-[var(--dawn-500)]" />
                <span className="text-[11px] text-[var(--bone-100)]/80">Made in the hills</span>
              </div>
            </FloatCard>
          </motion.div>

          {/* Mobile / tablet: tidy stacked composition that always fits the screen */}
          <div className="lg:hidden relative mx-auto w-full max-w-md hero-anim hero-fade" style={{ animationDelay: "0.4s" }}>
            <div className="floaty" style={{ ["--rot"]: "-1.5deg" }}>
              <AnalyticsCard />
            </div>
            <div className="floaty relative z-10 w-[15rem] max-w-[80%] ml-auto -mt-6" style={{ animationDelay: "1s", ["--rot"]: "3deg" }}>
              <ChatCard />
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative border-t border-[rgba(240,234,214,0.08)] py-4 sm:py-5 marquee-mask">
        <div className="marquee-track gap-8 sm:gap-10">
          {[...TOOLS, ...TOOLS].map((t, i) => (
            <span key={i} className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[var(--bone-100)]/40 whitespace-nowrap">
              {t} <span className="text-[var(--lime-400)]/50">◦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
