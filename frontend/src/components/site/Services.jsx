import React from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { SERVICE_CATEGORIES } from "@/data/services";

function ServiceCard({ cat, i }) {
  const Icon = cat.icon;
  return (
    <Reveal delay={80 * (i % 3)}>
      <article
        data-testid={SITE.serviceCategory(cat.slug)}
        className="group relative h-full flex flex-col gap-6 p-8 md:p-10 border border-white/10 bg-white/[0.02] rounded-2xl hover:border-[#e8702a]/50 hover:bg-white/[0.04] transition-all duration-500"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#e8702a]/15 border border-[#e8702a]/30 flex items-center justify-center text-[#e8702a] group-hover:bg-[#e8702a] group-hover:text-black transition-colors duration-500">
              <Icon size={20} strokeWidth={1.6} />
            </div>
            <span className="font-playfair italic text-white/40 text-sm">
              /{cat.number}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl text-white tracking-[-0.03em] leading-[1.05]">
            <span className="font-playfair italic">{cat.title.split(" ")[0]}</span>{" "}
            <span className="font-normal">
              {cat.title.split(" ").slice(1).join(" ")}
            </span>
          </h3>
          <p className="mt-3 text-sm text-white/60 leading-relaxed">
            {cat.blurb}
          </p>
        </div>

        <ul className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/5">
          {cat.items.map((item) => (
            <li
              key={item}
              className="text-sm text-white/70 flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-[#e8702a]" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      data-testid={SITE.servicesSection}
      className="relative bg-[#080808] text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
                02 &nbsp;— &nbsp; Capabilities
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                data-testid={SITE.servicesHeading}
                className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.05em]"
              >
                <span className="font-playfair italic">Every</span>
                <br />
                <span className="font-normal">agent, one studio.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={140}>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                From storefront to back office, we ship agents that show up on
                brand and stay in character. Pick one, pick ten — they all
                talk to each other.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <ServiceCard key={cat.slug} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
