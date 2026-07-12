import React, { useEffect, useRef, useState } from "react";
import { SITE } from "@/constants/testIds/site";
import { ArrowRight, Sparkles } from "lucide-react";

// Himalayan forest imagery (Unsplash)
const BG_IMAGE_1 =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=85&auto=format&fit=crop";
const BG_IMAGE_2 =
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=85&auto=format&fit=crop";

const SPOTLIGHT_R = 280;

function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
    grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
    grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const url = canvas.toDataURL();
    reveal.style.maskImage = `url(${url})`;
    reveal.style.webkitMaskImage = `url(${url})`;
    reveal.style.maskSize = "100% 100%";
    reveal.style.webkitMaskSize = "100% 100%";
    reveal.style.maskRepeat = "no-repeat";
    reveal.style.webkitMaskRepeat = "no-repeat";
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
    </>
  );
}

export default function Hero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  // Parallax
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid={SITE.heroSection}
      className="relative w-full overflow-hidden h-screen bg-[#06110b]"
      style={{ height: "100dvh" }}
    >
      {/* Base image with subtle parallax and Ken Burns zoom */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom parallax-layer"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          transform: `translateY(${scrollY * 0.25}px) scale(1)`,
        }}
        aria-hidden="true"
      />

      {/* Deep forest tint over base */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[rgba(6,17,11,0.55)] via-[rgba(6,17,11,0.35)] to-[rgba(6,17,11,0.9)]" />

      {/* Reveal layer (sunlit dawn) */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* Ridge silhouette bottom decoration */}
      <svg
        className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ height: "180px", transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <path
          d="M0 200 L0 130 L100 90 L200 120 L320 60 L430 100 L560 40 L680 80 L820 30 L960 90 L1100 60 L1240 110 L1360 70 L1440 100 L1440 200 Z"
          fill="#06110b"
          opacity="0.85"
        />
      </svg>

      {/* Foreground content — flex column so the heading (top) and the bottom
          notes never overlap, even on short desktop windows. */}
      <div className="absolute inset-0 z-50 flex flex-col justify-between px-5 sm:px-8 md:px-14 pt-24 sm:pt-28 pb-10 sm:pb-14 pointer-events-none">
        {/* Top: badge + heading */}
        <div className="flex flex-col items-center text-center mt-[5%] sm:mt-[6%]">
          <div
            className="hero-anim hero-fade inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(240,234,214,0.2)] bg-[rgba(240,234,214,0.05)] backdrop-blur-sm text-[11px] uppercase tracking-[0.28em] text-[var(--bone-100)]/80 mb-6 sm:mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles size={12} className="text-[var(--dawn-500)]" />
            Agastya Studios — Uttarakhand → Everywhere
          </div>

          <h1 className="text-[var(--bone-100)] leading-[0.95] max-w-[18ch] mx-auto">
            <span
              data-testid={SITE.heroTitleLine1}
              className="block font-serif-italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: "-0.03em", animationDelay: "0.25s" }}
            >
              Forests hold
            </span>
            <span
              data-testid={SITE.heroTitleLine2}
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: "-0.06em", animationDelay: "0.42s" }}
            >
              the quiet intelligence.
            </span>
          </h1>
        </div>

        {/* Bottom: quote (left) + copy/CTA (right) — laid out in flow so they
            sit below the heading and can't collide with it. */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-10">
          {/* Small quote */}
          <div
            className="hidden sm:block max-w-[280px] hero-anim hero-fade pointer-events-auto"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-sm text-[var(--bone-100)]/75 leading-relaxed font-serif-italic">
              &ldquo;Old pines don&rsquo;t hurry. They keep working while
              everyone else sleeps.&rdquo;
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[var(--mist)]">
              — A grandmother in Garhwal
            </p>
          </div>

          {/* CTA + copy */}
          <div
            className="w-full sm:w-auto sm:max-w-[320px] flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade pointer-events-auto"
            style={{ animationDelay: "0.85s" }}
          >
            <p className="text-xs sm:text-sm text-[var(--bone-100)]/80 leading-relaxed">
              We are a small Uttarakhand-rooted studio building AI agents,
              websites and design that make brands feel patient, considered —
              and twice as productive.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                data-testid={SITE.heroCta}
                onClick={() => scrollTo("services")}
                className="btn-forest flex items-center gap-2"
              >
                See our craft <ArrowRight size={16} />
              </button>
              <button
                data-testid={SITE.heroSecondaryCta}
                onClick={() => scrollTo("contact")}
                className="btn-ghost text-sm"
              >
                Book a scoping call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
