import React from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { PRICING_TIERS } from "@/data/services";
import { Check, Leaf } from "lucide-react";

export default function Pricing() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="pricing"
      data-testid={SITE.pricingSection}
      className="relative bg-[#06110b] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[var(--moss-400)]/10 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                05 &nbsp;— &nbsp; Plans
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                <span className="font-serif-italic">Grow at</span>
                <br />
                <span className="font-normal">forest pace.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={140}>
              <p className="text-[var(--bone-100)]/70 text-base sm:text-lg leading-relaxed max-w-xl">
                Start with a single agent, plant a small grove, or hire us as a
                full studio partner. Every plan includes brand-voice tuning,
                weekly optimisation and a very human WhatsApp line.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-3 text-[var(--bone-100)]/55 text-sm leading-relaxed max-w-xl font-serif-italic">
                Every quote is bespoke — because your context shapes the number
                more than a price tag ever could.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRICING_TIERS.map((t, i) => (
            <Reveal key={t.tier} delay={i * 80}>
              <div
                data-testid={SITE.pricingCard(t.tier)}
                className={`relative h-full flex flex-col p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
                  t.highlighted
                    ? "bg-gradient-to-b from-[var(--forest-500)]/40 to-[var(--forest-700)]/40 border border-[var(--dawn-500)]/50 shadow-[0_30px_80px_-30px_rgba(212,165,116,0.35)]"
                    : "card-forest"
                }`}
              >
                {t.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--dawn-500)] text-[var(--forest-950)] text-[10px] font-semibold uppercase tracking-[0.24em]">
                    Most chosen
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <Leaf
                    size={18}
                    className={t.highlighted ? "text-[var(--dawn-500)]" : "text-[var(--moss-400)]"}
                  />
                  <span className="text-xs uppercase tracking-[0.24em] text-[var(--mist)]">
                    {t.cadence}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl mb-3">
                  <span className="font-serif-italic">{t.name}</span>
                </h3>
                <p className="text-[var(--bone-100)]/70 text-sm leading-relaxed mb-8">
                  {t.tagline}
                </p>

                <ul className="flex flex-col gap-3 mb-10">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[var(--bone-100)]/85 leading-relaxed">
                      <Check size={16} className="text-[var(--moss-400)] mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid={SITE.pricingCta(t.tier)}
                  onClick={() => scrollTo("contact")}
                  className={`mt-auto w-full text-sm font-semibold py-3 rounded-full transition-all magnetic ${
                    t.highlighted
                      ? "bg-[var(--dawn-500)] text-[var(--forest-950)] hover:bg-[var(--dawn-400)] hover:scale-[1.02]"
                      : "border border-[var(--bone-100)]/25 text-[var(--bone-100)] hover:border-[var(--dawn-500)] hover:text-[var(--dawn-500)] hover:bg-[rgba(212,165,116,0.05)]"
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mt-14 text-center text-xs text-[var(--mist)]">
            Prices are shared after a free 30-minute scoping call — because
            your context matters more than a menu.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
