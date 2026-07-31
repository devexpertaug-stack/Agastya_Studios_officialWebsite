import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/constants/testIds/site";
import { REAL_PROJECTS } from "@/data/projects";
import { api } from "@/lib/api";

export default function WorkScroll() {
  const [projects, setProjects] = useState([]);
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    api
      .get("/projects")
      .then((r) => setProjects(Array.isArray(r.data) && r.data.length ? r.data : []))
      .catch(() => setProjects([]));
  }, []);

  // Show live data when the backend is connected; otherwise the real projects
  // (static mirror) so visitors always see genuine work — never fictional filler.
  const items = projects.length ? projects : REAL_PROJECTS;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  // Measure how far the track must travel horizontally.
  useLayoutEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      const extra = track.scrollWidth - window.innerWidth + 48;
      setRange(extra > 0 ? extra : 0);
    };
    calc();
    const t = setTimeout(calc, 300); // after images/layout settle
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calc);
    };
  }, [items.length]);

  const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <section id="work" className="relative bg-[#0a1810] text-[var(--bone-100)]">
      <div
        ref={outerRef}
        style={{ height: range > 0 ? `${range + viewportH}px` : "auto" }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 mb-6 md:mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-3">
                03 — Recent work
              </p>
              <h2 className="font-display text-4xl sm:text-5xl max-w-3xl">
                A ridge line of <span className="text-lime">results.</span>
              </h2>
            </div>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.24em] text-[var(--mist)]">
              scroll to explore →
            </span>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            data-testid={SITE.caseStudiesSection}
            className="flex gap-6 px-6 md:px-10 will-change-transform"
          >
            {items.map((p) => {
              const card = (
                <article
                  data-testid={SITE.projectCard(p.id)}
                  className="group relative w-[300px] sm:w-[360px] md:w-[400px] flex-shrink-0 rounded-3xl overflow-hidden glass-card"
                >
                  <div className="relative h-[52vh] max-h-[460px] min-h-[320px] overflow-hidden">
                    {p.image_data_url ? (
                      <img
                        src={p.image_data_url}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--forest-700)] to-[var(--forest-500)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06110b] via-[rgba(6,17,11,0.35)] to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[rgba(6,17,11,0.7)] backdrop-blur-sm border border-[rgba(200,242,106,0.35)] text-[10px] uppercase tracking-[0.22em] text-[var(--lime-400)]">
                      {p.sector}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {p.client_name && (
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--mist)] mb-1">
                          {p.client_name}
                        </p>
                      )}
                      <h3 className="font-display text-xl md:text-2xl leading-tight">{p.title}</h3>
                      <p className="mt-2 text-sm text-[var(--bone-100)]/70 line-clamp-2">{p.summary}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--lime-400)]">
                        Read the story <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              );
              return (
                <Link key={p.id} to={`/work/${p.id}`} className="flex-shrink-0">
                  {card}
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
