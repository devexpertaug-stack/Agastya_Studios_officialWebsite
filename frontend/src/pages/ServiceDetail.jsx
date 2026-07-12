import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote, Sparkles, Plus, TrendingUp } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { SERVICE_CATEGORIES } from "@/data/services";
import { SITE } from "@/constants/testIds/site";

function AgentAccordion({ agent, index }) {
  const [open, setOpen] = useState(false);
  const title = typeof agent === "string" ? agent : agent.title;
  const detail = typeof agent === "string" ? "" : agent.detail;

  return (
    <li className="rounded-xl border border-[rgba(168,192,144,0.12)] bg-[rgba(255,255,255,0.015)] overflow-hidden transition-all hover:border-[var(--dawn-500)]/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-4 p-5 text-left group"
      >
        <span className="font-serif-italic text-[var(--dawn-500)]/70 text-sm mt-0.5 w-6 flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[var(--bone-100)]/90 text-base md:text-lg leading-snug">
          {title}
        </span>
        <Plus
          size={18}
          className={`text-[var(--moss-400)] mt-1 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-45 text-[var(--dawn-500)]" : "group-hover:text-[var(--dawn-500)]"
          }`}
        />
      </button>
      {detail && (
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 pl-[3.75rem] text-sm md:text-[15px] text-[var(--bone-100)]/70 leading-relaxed">
              {detail}
            </p>
          </div>
        </div>
      )}
    </li>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setCategoryImages(r.data?.category_images || {}))
      .catch(() => {});
  }, []);

  if (!cat) {
    return (
      <div className="min-h-screen bg-[#06110b] text-[var(--bone-100)] flex flex-col">
        <Nav />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-5xl font-serif-italic mb-4">Trail not found.</h1>
            <Link to="/" className="btn-forest inline-flex items-center gap-2 mt-4">
              <ArrowLeft size={16} /> Back to studio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = cat.icon;
  const heroImage = categoryImages[cat.slug] || cat.image;
  const others = SERVICE_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 3);
  const projects = cat.projects || [];

  return (
    <div
      data-testid={SITE.serviceDetail(cat.slug)}
      className="min-h-screen bg-[#06110b] text-[var(--bone-100)]"
    >
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06110b]/70 via-[#06110b]/85 to-[#06110b]" />
        <div className="pointer-events-none absolute top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[var(--dawn-500)]/12 blur-[140px]" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10">
          <button
            data-testid={SITE.serviceDetailBack}
            onClick={() => nav(-1)}
            className="inline-flex items-center gap-2 text-sm text-[var(--bone-100)]/70 hover:text-[var(--dawn-500)] transition-colors mb-10"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[var(--dawn-500)]/15 border border-[var(--dawn-500)]/40 flex items-center justify-center text-[var(--dawn-500)]">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <span className="font-serif-italic text-[var(--mist)]">/{cat.number}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em] max-w-4xl">
            <span className="font-serif-italic">{cat.title.split(" ")[0]}</span>{" "}
            <span className="font-normal">
              {cat.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="mt-8 text-[var(--bone-100)]/75 text-base sm:text-lg leading-relaxed max-w-2xl">
            {cat.blurb}
          </p>

          <Link
            to="/#contact"
            data-testid={SITE.serviceDetailContact}
            className="btn-forest inline-flex items-center gap-2 mt-10"
          >
            Book a scoping call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Agents — expandable dropdowns explaining how each one works */}
      <section className="py-20 md:py-28 bg-[#0a1810] grain relative">
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-4">
                What it does
              </p>
              <h2 className="text-4xl md:text-5xl leading-[1] tracking-[-0.03em] font-serif-italic">
                Agents in this stack.
              </h2>
              <p className="mt-6 text-sm text-[var(--bone-100)]/60 leading-relaxed">
                Tap any agent to see exactly how it works for your customers.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-4">
              {cat.features.map((agent, i) => (
                <Reveal key={typeof agent === "string" ? agent : agent.title} delay={i * 50}>
                  <AgentAccordion agent={agent} index={i} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 md:py-28 bg-[#06110b]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
              How we ship it
            </p>
            <h2 className="text-4xl md:text-5xl leading-[1] tracking-[-0.03em] mb-14 max-w-2xl">
              <span className="font-serif-italic">Three seasons</span>{" "}
              <span className="font-normal">to live.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cat.workflow.map((step, i) => (
              <Reveal key={step} delay={i * 100}>
                <div className="card-forest rounded-2xl p-8 h-full">
                  <div className="text-6xl font-serif-italic text-[var(--dawn-500)]/60 leading-none mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[var(--bone-100)]/80 leading-relaxed">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected projects */}
      {projects.length > 0 && (
        <section className="py-20 md:py-28 bg-[#0a1810] grain relative">
          <div className="relative max-w-6xl mx-auto px-6 md:px-10">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                Selected projects
              </p>
              <h2 className="text-4xl md:text-5xl leading-[1] tracking-[-0.03em] mb-14 max-w-2xl">
                <span className="font-serif-italic">Work</span>{" "}
                <span className="font-normal">we&rsquo;re proud of.</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <article className="card-forest rounded-2xl p-8 h-full flex flex-col gap-4">
                    {p.outcome && (
                      <div className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--dawn-500)]/12 border border-[var(--dawn-500)]/30 px-3 py-1 text-[var(--dawn-500)] text-xs font-medium">
                        <TrendingUp size={13} /> {p.outcome}
                      </div>
                    )}
                    <h3 className="text-xl md:text-2xl leading-snug tracking-[-0.01em] font-serif-italic">
                      {p.title}
                    </h3>
                    {p.client && (
                      <div className="text-xs uppercase tracking-[0.22em] text-[var(--mist)]">
                        {p.client}
                      </div>
                    )}
                    <p className="text-sm text-[var(--bone-100)]/70 leading-relaxed">
                      {p.summary}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial + Case study */}
      <section className="py-20 md:py-28 bg-[#06110b]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <figure className="card-forest rounded-2xl p-10 h-full flex flex-col gap-5">
              <Quote size={24} className="text-[var(--dawn-500)]" />
              <blockquote className="text-2xl leading-snug font-serif-italic tracking-[-0.01em]">
                &ldquo;{cat.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-6 border-t border-[rgba(168,192,144,0.12)]">
                <div className="text-sm">{cat.testimonial.author}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--mist)] mt-1">
                  {cat.testimonial.role}
                </div>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-forest rounded-2xl p-10 h-full flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[var(--dawn-500)]">
                <Sparkles size={18} />
                <span className="text-xs uppercase tracking-[0.28em]">Case study</span>
              </div>
              <h3 className="text-3xl leading-tight tracking-[-0.02em]">
                <span className="font-serif-italic">{cat.caseStudy.title}</span>
              </h3>
              <div className="text-xs uppercase tracking-[0.22em] text-[var(--mist)]">
                {cat.caseStudy.client}
              </div>
              <p className="text-[var(--bone-100)]/80 leading-relaxed mt-2">
                {cat.caseStudy.outcome}
              </p>
              <Link
                to="/#contact"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[var(--dawn-500)] hover:text-[var(--bone-100)] transition-colors text-sm"
              >
                Talk to the studio <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other capabilities */}
      <section className="py-20 md:py-28 bg-[#0a1810] border-t border-[rgba(168,192,144,0.08)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
              Related capabilities
            </p>
            <h2 className="text-3xl md:text-4xl mb-12 font-serif-italic">
              Keep walking the trail →
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/services/${o.slug}`}
                className="card-forest rounded-2xl overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={categoryImages[o.slug] || o.image}
                    alt={o.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <span className="font-serif-italic text-xl">{o.title}</span>
                  <ArrowRight size={16} className="text-[var(--dawn-500)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
