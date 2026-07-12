import React from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { INDUSTRY_PACKAGES } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export default function Industries() {
  return (
    <section
      id="industries"
      data-testid={SITE.industriesSection}
      className="relative bg-[#0a0a0a] text-white py-28 md:py-40 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                03 &nbsp;— &nbsp; Industry Packages
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.05em]">
                <span className="font-playfair italic">Pre-built</span>
                <br />
                <span className="font-normal">stacks per industry.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={140}>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                Configured, tested and live in weeks — not quarters. Each
                package bundles the exact agents your industry actually needs.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <Reveal key={pkg.slug} delay={80 * (i % 4)}>
                <article
                  data-testid={SITE.industryCard(pkg.slug)}
                  className="group h-full flex flex-col justify-between gap-8 p-7 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-white/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 group-hover:text-[#e8702a] group-hover:border-[#e8702a]/50 transition-colors">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-white/40 group-hover:text-[#e8702a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <div>
                    <h3 className="font-playfair italic text-2xl md:text-3xl leading-[1.05] tracking-[-0.02em] mb-4">
                      {pkg.title}
                    </h3>
                    <ul className="flex flex-col gap-1.5 mt-3">
                      {pkg.items.map((it) => (
                        <li
                          key={it}
                          className="text-sm text-white/60 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
