import React, { useEffect, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { GLOBAL_TESTIMONIALS, SERVICE_CATEGORIES } from "@/data/services";
import { api } from "@/lib/api";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then((r) => setProjects(r.data || []))
      .catch(() => setProjects([]));
  }, []);

  const seedProjects = SERVICE_CATEGORIES.slice(0, 6).map((c) => ({
    id: `seed-${c.slug}`,
    title: c.caseStudy.title,
    sector: c.title,
    client_name: c.caseStudy.client,
    summary: c.caseStudy.outcome,
    image_data_url: c.image,
  }));
  const showProjects = projects.length > 0 ? projects : seedProjects;

  return (
    <section
      id="work"
      data-testid={SITE.testimonialsSection}
      className="relative bg-[#0a1810] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-28">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                03 &nbsp;— &nbsp; Voices from the valley
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                <span className="font-serif-italic">Trusted by</span>
                <br />
                <span className="font-normal">quiet, obsessed teams.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {GLOBAL_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={80 + i * 60}>
                <figure className="card-forest rounded-2xl p-7 h-full flex flex-col gap-4">
                  <Quote size={20} className="text-[var(--dawn-500)]" />
                  <blockquote className="text-[var(--bone-100)]/85 text-base leading-relaxed font-serif-italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto pt-4 border-t border-[rgba(168,192,144,0.12)]">
                    <div className="text-sm text-[var(--bone-100)]">
                      {t.author}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--mist)] mt-1">
                      {t.role}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="ridge my-16" />

        {/* Case studies / recent work */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-14">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                04 &nbsp;— &nbsp; Recent work
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                <span className="font-serif-italic">A ridge line</span>
                <br />
                <span className="font-normal">of results.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={140}>
              <p className="text-[var(--bone-100)]/70 text-base sm:text-lg leading-relaxed max-w-xl">
                Real outcomes from the last few seasons. Each project is a
                blend of AI agents, web and design — because leverage compounds
                when it&apos;s built together.
              </p>
            </Reveal>
          </div>
        </div>

        <div
          data-testid={SITE.caseStudiesSection}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {showProjects.map((p, i) => (
            <Reveal key={p.id} delay={80 * (i % 3)}>
              <article className="card-forest rounded-2xl overflow-hidden h-full flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {p.image_data_url ? (
                    <img
                      src={p.image_data_url}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--forest-700)] to-[var(--forest-500)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06110b] via-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[rgba(6,17,11,0.7)] backdrop-blur-sm border border-[rgba(212,165,116,0.35)] text-[10px] uppercase tracking-[0.24em] text-[var(--dawn-500)]">
                    {p.sector}
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
                  <h3 className="text-xl md:text-2xl font-serif-italic tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  {p.client_name && (
                    <div className="text-xs uppercase tracking-[0.24em] text-[var(--mist)]">
                      {p.client_name}
                    </div>
                  )}
                  <p className="text-sm text-[var(--bone-100)]/70 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
