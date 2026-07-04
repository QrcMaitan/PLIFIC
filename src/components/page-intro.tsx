"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Same left-to-right wipe used on meiuca.design/aplicativos: starts with no
// background, fills the screen left→right, holds while fully covering, then
// closes — also left→right, so the left edge sweeps across to the right
// rather than the panel shrinking back the way it grew.
//
// Uses a `transform: scaleX` animation rather than `clip-path` — clip-path
// forces a repaint on every frame and reads as choppy, while scaleX is
// GPU-composited and stays smooth. The two "left→right" sweeps are opposite
// motions (grow vs. shrink), so the transform-origin flips from left to
// right right as the close phase starts; at that exact instant scaleX is 1,
// where the origin has no visual effect, so the flip is invisible.
const CURTAIN_COLOR = "#040605";

const FILL_S = 0.65;
const HOLD_S = 0.5;
const CLOSE_S = 0.58;
const TOTAL_S = FILL_S + HOLD_S + CLOSE_S;

export function PageIntro() {
  const reduceMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setClosing(true), (FILL_S + HOLD_S) * 1000);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{
        backgroundColor: CURTAIN_COLOR,
        transformOrigin: closing ? "100% 50%" : "0% 50%",
        willChange: "transform",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0] }}
      transition={{
        duration: TOTAL_S,
        times: [0, FILL_S / TOTAL_S, (FILL_S + HOLD_S) / TOTAL_S, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  );
}
