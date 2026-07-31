import React, { useEffect, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { api } from "@/lib/api";
import { Mountain, TreePine, Sun } from "lucide-react";

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=85&auto=format&fit=crop";

const STATS = [
  { icon: Mountain, big: "24/7", label: "Agents that never clock out" },
  { icon: TreePine, big: "10+", label: "Capabilities across your funnel" },
  { icon: Sun, big: "Uttarakhand", label: "Rooted in the Himalayas" },
];

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setSettings(r.data))
      .catch(() => setSettings(null));
  }, []);

  const photo = settings?.founder_photo_url || FALLBACK_PHOTO;
  const name = settings?.founder_name || "Agastya";
  const role = settings?.founder_role || "Founder & Creative Technologist — Agastya Studios";
  const bio =
    settings?.founder_bio ||
    "Born in the pine ridges of Uttarakhand, I build AI agents that behave like a good neighbour — quietly useful, never in the way.";

  return (
    <section
      id="about"
      data-testid={SITE.aboutSection}
      className="relative bg-[#0a1810] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden grain"
    >
      <div className="pointer-events-none absolute -top-40 -right-40 w-[380px] h-[380px] rounded-full bg-[var(--moss-400)]/[0.04] blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Photo */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--dawn-500)]/30 to-[var(--moss-400)]/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-[rgba(212,165,116,0.25)] aspect-[4/5]">
                <img
                  data-testid={SITE.aboutPhoto}
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06110b]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-serif-italic text-2xl">{name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--mist)] mt-1">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="md:col-span-7 md:pt-4 flex flex-col gap-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-4">
              01 &nbsp;— &nbsp; About the Studio
            </p>
            <h2
              data-testid={SITE.aboutHeading}
              className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.03em]"
            >
              <span className="font-serif-italic">We build the</span>
              <br />
              <span className="font-normal">agents behind quiet giants.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p
              data-testid={SITE.aboutBio}
              className="text-[var(--bone-100)]/75 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              {bio}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[var(--bone-100)]/70 text-base leading-relaxed max-w-xl">
              We are equal parts AI engineers and designers. Every agent we
              ship is wrapped in brand-quality craft — so automation feels
              less like a bot and more like a wise, generous colleague who
              already knows the customer.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[rgba(168,192,144,0.15)]">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={260 + i * 80}>
                  <div className="flex flex-col gap-2 py-2">
                    <Icon size={18} className="text-[var(--dawn-500)]" />
                    <div className="font-serif-italic text-4xl sm:text-5xl tracking-[-0.02em]">
                      {s.big}
                    </div>
                    <div className="text-xs sm:text-sm text-[var(--bone-100)]/60 leading-relaxed max-w-[200px]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
