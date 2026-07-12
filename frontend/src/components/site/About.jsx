import React from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";

const STATS = [
  { testId: SITE.aboutStat24, big: "24/7", label: "Agents that never clock out" },
  { testId: SITE.aboutStat10, big: "10+", label: "Agent types across your funnel" },
  { testId: SITE.aboutStatDesign, big: "Design-led", label: "Craft on every touchpoint" },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid={SITE.aboutSection}
      className="relative bg-[#0a0a0a] text-white py-28 md:py-40 overflow-hidden grain"
    >
      {/* soft accent glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#e8702a]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#e8702a]/5 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              01 &nbsp;— &nbsp; About
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              data-testid={SITE.aboutHeading}
              className="font-playfair italic text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.03em]"
            >
              We build the
              <br />
              <span className="not-italic font-normal font-sans tracking-[-0.05em]">
                agents behind
              </span>
              <br />
              great brands.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-4 flex flex-col gap-10">
          <Reveal delay={120}>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              Aug Studios is an AI-agents and creative-tech studio. We design,
              build, and run the automation that handles the busywork —
              recovering carts, answering calls, qualifying leads, and keeping
              the back office tidy — so teams can focus on the work that
              matters.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              We are equal parts AI engineers and designers. Every agent we
              ship is wrapped in brand-quality craft, so automation feels less
              like a bot and more like your best employee.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {STATS.map((s, i) => (
              <Reveal key={s.testId} delay={260 + i * 80}>
                <div
                  data-testid={s.testId}
                  className="flex flex-col gap-2 py-2"
                >
                  <div className="font-playfair italic text-4xl sm:text-5xl text-white tracking-[-0.03em]">
                    {s.big}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-[180px]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
