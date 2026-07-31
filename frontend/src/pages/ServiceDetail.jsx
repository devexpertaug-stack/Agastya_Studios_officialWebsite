import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Layout, Sparkles } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { SITE } from "@/constants/testIds/site";

export default function ServiceDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const categories = useServiceCategories();
  const cat = categories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

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
  const others = categories.filter((c) => c.slug !== slug).slice(0, 3);

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
          style={{ backgroundImage: `url(${cat.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06110b]/70 via-[#06110b]/85 to-[#06110b]" />
        <div className="pointer-events-none absolute top-40 -right-40 w-[380px] h-[380px] rounded-full bg-[var(--dawn-500)]/[0.05] blur-[120px]" />

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

      {/* Features */}
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
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-4">
              {cat.features.map((f, i) => (
                <Reveal key={f} delay={i * 60}>
                  <li className="flex items-start gap-4 p-5 rounded-xl border border-[rgba(168,192,144,0.12)] hover:border-[var(--dawn-500)]/50 transition-all bg-[rgba(255,255,255,0.015)] group">
                    <CheckCircle2 size={18} className="text-[var(--moss-400)] mt-0.5 flex-shrink-0 group-hover:text-[var(--dawn-500)] transition-colors" />
                    <span className="text-[var(--bone-100)]/85 text-base leading-relaxed">
                      {f}
                    </span>
                  </li>
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

      {/* Web extension */}
      <section className="py-20 md:py-28 bg-[#0a1810] grain relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <Layout size={20} className="text-[var(--dawn-500)]" />
                <span className="text-xs uppercase tracking-[0.32em] text-[var(--mist)]">
                  Web-development layer
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl leading-[1] tracking-[-0.03em] mb-6">
                <span className="font-serif-italic">The site,</span>{" "}
                <span className="font-normal">included.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[var(--bone-100)]/75 leading-relaxed">
                {cat.web}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={150}>
              <div className="relative rounded-2xl overflow-hidden border border-[rgba(168,192,144,0.15)] aspect-[16/10] group">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06110b]/70 via-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
                    src={o.image}
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
