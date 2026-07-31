import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Quote, Loader2, MapPin } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import { api } from "@/lib/api";
import { REAL_PROJECTS, getRealProject } from "@/data/projects";
import { SITE } from "@/constants/testIds/site";

export default function ProjectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [project, setProject] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    const applyStaticFallback = () => {
      const p = getRealProject(id);
      if (p) {
        setProject(p);
        setOthers(REAL_PROJECTS.filter((x) => x.id !== id).slice(0, 3));
        setError(false);
      } else {
        setError(true);
      }
    };

    Promise.all([api.get(`/projects/${id}`), api.get("/projects")])
      .then(([one, list]) => {
        if (!alive) return;
        if (one?.data) {
          setProject(one.data);
          setOthers((list.data || []).filter((p) => p.id !== id).slice(0, 3));
        } else {
          applyStaticFallback();
        }
      })
      .catch(() => alive && applyStaticFallback()) // backend offline → show real static project
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06110b] text-[var(--bone-100)]">
        <Nav />
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-[var(--mist)]" />
        </div>
      </div>
    );
  }
  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#06110b] text-[var(--bone-100)]">
        <Nav />
        <main className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-5xl font-serif-italic mb-4">Trail not found.</h1>
            <Link to="/#work" className="btn-forest inline-flex items-center gap-2 mt-4 magnetic">
              <ArrowLeft size={16} /> Back to recent work
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = (project.description || project.summary || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <div
      data-testid={SITE.projectDetail(project.id)}
      className="min-h-screen bg-[#06110b] text-[var(--bone-100)]"
    >
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {project.image_data_url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${project.image_data_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06110b]/70 via-[#06110b]/85 to-[#06110b]" />
        <div className="pointer-events-none absolute top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[var(--dawn-500)]/12 blur-[140px]" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-10">
          <button
            data-testid={SITE.projectDetailBack}
            onClick={() => nav(-1)}
            className="inline-flex items-center gap-2 text-sm text-[var(--bone-100)]/70 hover:text-[var(--dawn-500)] transition-colors mb-8 magnetic"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full bg-[rgba(6,17,11,0.7)] backdrop-blur-sm border border-[rgba(212,165,116,0.35)] text-[10px] uppercase tracking-[0.24em] text-[var(--dawn-500)]">
              {project.sector}
            </span>
            {project.client_name && (
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[var(--mist)]">
                <MapPin size={12} /> {project.client_name}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-[-0.03em] max-w-4xl font-serif-italic">
            {project.title}
          </h1>

          {project.outcome && (
            <p className="mt-8 inline-flex items-center gap-2 text-[var(--dawn-500)] text-sm font-medium tracking-wide">
              <Sparkles size={14} /> {project.outcome}
            </p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {project.image_data_url && (
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border border-[rgba(168,192,144,0.15)] aspect-[16/9]">
                <img
                  src={project.image_data_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Story */}
      <section className="py-16 md:py-24 bg-[#0a1810] grain relative">
        <div className="relative max-w-3xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
              The story
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-forest">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{project.summary}</p>
              )}
            </div>
          </Reveal>

          {project.outcome && (
            <Reveal delay={160}>
              <figure className="mt-14 border-l-2 border-[var(--dawn-500)] pl-6 py-2">
                <blockquote className="font-serif-italic text-2xl md:text-3xl leading-tight tracking-[-0.02em] text-[var(--bone-100)]">
                  {project.outcome}
                </blockquote>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.24em] text-[var(--mist)]">
                  {project.client_name} · {project.sector}
                </figcaption>
              </figure>
            </Reveal>
          )}

          <Reveal delay={200}>
            <div className="mt-14 pt-10 border-t border-[rgba(168,192,144,0.12)] flex items-center gap-4 flex-wrap">
              <Link to="/#contact" className="btn-forest inline-flex items-center gap-2 magnetic">
                Talk to the studio <ArrowRight size={16} />
              </Link>
              <Link to="/#work" className="btn-ghost text-sm magnetic">
                See more work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Others */}
      {others.length > 0 && (
        <section className="py-20 md:py-24 bg-[#06110b] border-t border-[rgba(168,192,144,0.08)]">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
                Neighbouring peaks
              </p>
              <h2 className="text-3xl md:text-4xl mb-12 font-serif-italic">
                Keep exploring →
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link
                  key={o.id}
                  to={`/work/${o.id}`}
                  className="card-forest rounded-2xl overflow-hidden group magnetic"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#0a1810]">
                    {o.image_data_url && (
                      <img
                        src={o.image_data_url}
                        alt={o.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--dawn-500)] mb-2">
                      {o.sector}
                    </div>
                    <h3 className="font-serif-italic text-xl leading-tight">{o.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
