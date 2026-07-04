"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

// Same buttery-smooth wheel easing as bruno.work (duration/smoothWheel match
// their config) — Lenis smooths the real page scroll position via rAF, so
// native behavior like position:sticky and IntersectionObserver keep working
// unchanged.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenisRef.current?.lenis?.destroy();
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ duration: 1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
