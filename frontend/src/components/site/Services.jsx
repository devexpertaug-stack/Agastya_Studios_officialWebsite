import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { SERVICE_CATEGORIES } from "@/data/services";

function ServiceCard({ cat, i }) {
  const Icon = cat.icon;
  return (
    <Reveal delay={60 * (i % 3)}>
      <Link
        to={`/services/${cat.slug}`}
        data-testid={SITE.serviceCardLink(cat.slug)}
        className="block group"
      >
        <article
          data-testid={SITE.serviceCard(cat.slug)}
          className="card-forest h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06110b] via-[rgba(6,17,11,0.5)] to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(6,17,11,0.7)] backdrop-blur-sm border border-[rgba(212,165,116,0.35)] flex items-center justify-center text-[var(--dawn-500)]">
                <Icon size={18} strokeWidth={1.6} />
              </div>
              <span className="font-serif-italic text-[var(--mist)] text-sm">
                /{cat.number}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <ArrowUpRight
                size={20}
                className="text-[var(--bone-100)]/60 group-hover:text-[var(--dawn-500)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>

          <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
            <h3 className="text-2xl md:text-3xl tracking-[-0.02em] leading-[1.05]">
              <span className="font-serif-italic">{cat.title.split(" ")[0]}</span>{" "}
              <span className="font-normal">
                {cat.title.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            <p className="text-sm text-[var(--bone-100)]/65 leading-relaxed">
              {cat.blurb}
            </p>
            <div className="mt-auto pt-4 border-t border-[rgba(168,192,144,0.1)] flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--mist)]">
                {cat.features.length} agents
              </span>
              <span className="text-xs text-[var(--dawn-500)] font-medium group-hover:tracking-wider transition-all">
                Explore →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      data-testid={SITE.servicesSection}
      className="relative bg-[#06110b] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                02 &nbsp;— &nbsp; Capabilities
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                data-testid={SITE.servicesHeading}
                className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em]"
              >
                <span className="font-serif-italic">Every</span>
                <br />
                <span className="font-normal">agent, one studio.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={140}>
              <p className="text-[var(--bone-100)]/70 text-base sm:text-lg leading-relaxed max-w-xl">
                From storefront to back office — we design, build and run the
                agents that show up on brand and stay in character. Each one
                ships with a website, a dashboard, and a plan.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-[var(--bone-100)]/55 text-sm leading-relaxed max-w-xl">
                Every sector includes a web-development layer — because a good
                agent still needs a beautiful place to live.
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
