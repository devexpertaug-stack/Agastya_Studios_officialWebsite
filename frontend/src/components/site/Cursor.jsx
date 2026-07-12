import React, { useEffect, useRef, useState } from "react";

// Global cursor follower: a soft glow that trails the mouse.
// Grows on hover of buttons / links.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x - 3}px, ${mouse.y - 3}px, 0)`;
      }
    };

    const onHoverIn = (e) => {
      if (
        e.target?.closest?.(
          "button, a, [role='button'], .card-forest, input, textarea, select, [data-magnetic]"
        )
      ) {
        if (ringRef.current) ringRef.current.classList.add("cursor-ring-lg");
      }
    };
    const onHoverOut = (e) => {
      if (
        e.target?.closest?.(
          "button, a, [role='button'], .card-forest, input, textarea, select, [data-magnetic]"
        )
      ) {
        if (ringRef.current) ringRef.current.classList.remove("cursor-ring-lg");
      }
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onHoverIn);
    document.addEventListener("mouseout", onHoverOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHoverIn);
      document.removeEventListener("mouseout", onHoverOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
