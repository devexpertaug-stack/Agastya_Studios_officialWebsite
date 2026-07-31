import React, { useEffect, useRef, useState } from "react";

// Smooth custom cursor: a small dot that tracks the pointer closely and a
// softer ring that trails behind with easing. The native cursor is hidden on
// fine-pointer devices for a polished, intentional feel. Uses a single rAF
// loop and time-corrected lerp so motion stays smooth on any refresh rate.
export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    document.body.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, moved: false };
    const ring = { x: mouse.x, y: mouse.y };
    const dot = { x: mouse.x, y: mouse.y };
    let raf = 0;
    let last = performance.now();

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    const interactiveSelector =
      "button, a, [role='button'], .card-forest, input, textarea, select, [data-magnetic], label";

    const onOver = (e) => {
      if (e.target?.closest?.(interactiveSelector)) {
        ringRef.current?.classList.add("cursor-ring-lg");
      }
    };
    const onOut = (e) => {
      if (e.target?.closest?.(interactiveSelector)) {
        ringRef.current?.classList.remove("cursor-ring-lg");
      }
    };

    // Frame-rate independent lerp: factor per 60fps frame -> per elapsed time.
    const lerp = (current, target, perFrame, dt) => {
      const t = 1 - Math.pow(1 - perFrame, dt / (1000 / 60));
      return current + (target - current) * t;
    };

    const tick = (now) => {
      const dt = Math.min(now - last, 64); // clamp large gaps (tab switch)
      last = now;

      // Dot: near-instant, feels connected to the pointer.
      dot.x = lerp(dot.x, mouse.x, 0.5, dt);
      dot.y = lerp(dot.y, mouse.y, 0.5, dt);
      // Ring: softer trail for a smooth, weighty feel.
      ring.x = lerp(ring.x, mouse.x, 0.18, dt);
      ring.y = lerp(ring.y, mouse.y, 0.18, dt);

      if (mouse.moved) {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = () => ringRef.current?.classList.add("cursor-ring-down");
    const onUp = () => ringRef.current?.classList.remove("cursor-ring-down");
    const onLeave = () => document.body.classList.add("cursor-hidden");
    const onEnter = () => document.body.classList.remove("cursor-hidden");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
