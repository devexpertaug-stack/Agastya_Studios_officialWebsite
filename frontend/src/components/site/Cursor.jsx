import React, { useEffect, useRef, useState } from "react";

// Decorative cursor ring that follows the OS cursor.
// The native cursor stays visible (zero lag). The ring is purely aesthetic —
// it lerps toward the mouse and grows over interactive elements.
export default function Cursor() {
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, moved: false };
    const ringPos = { ...mouse };
    let raf = 0;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    const interactiveSelector =
      "button, a, [role='button'], .card-forest, input, textarea, select, [data-magnetic], label";

    const onOver = (e) => {
      if (e.target?.closest?.(interactiveSelector)) {
        if (ringRef.current) ringRef.current.classList.add("cursor-ring-lg");
      }
    };
    const onOut = (e) => {
      if (e.target?.closest?.(interactiveSelector)) {
        if (ringRef.current) ringRef.current.classList.remove("cursor-ring-lg");
      }
    };

    const tick = () => {
      // Slightly tighter lerp so the ring feels responsive without jitter.
      ringPos.x += (mouse.x - ringPos.x) * 0.22;
      ringPos.y += (mouse.y - ringPos.y) * 0.22;
      if (ringRef.current && mouse.moved) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
