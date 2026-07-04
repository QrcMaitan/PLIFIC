"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const REVEAL_DELAY_MS = 2000;
export const WIPE_DURATION_MS = 1100;

type CurtainState = {
  /** The dark curtain has started (or finished) wiping away. */
  wiping: boolean;
  /** The wipe transition has fully finished — light mode is settled in. */
  revealed: boolean;
};

const CurtainContext = createContext<CurtainState>({
  wiping: false,
  revealed: false,
});

export function useCurtainReveal() {
  return useContext(CurtainContext);
}

export function CurtainRevealProvider({
  targetId,
  children,
}: {
  targetId: string;
  children: ReactNode;
}) {
  const [wiping, setWiping] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const node = document.getElementById(targetId);
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWiping(true);
      setRevealed(true);
      return;
    }

    let revealDelayId: ReturnType<typeof setTimeout>;
    let wipeEndId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;

        revealDelayId = setTimeout(() => {
          setWiping(true);
          wipeEndId = setTimeout(() => setRevealed(true), WIPE_DURATION_MS);
        }, REVEAL_DELAY_MS);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(revealDelayId);
      clearTimeout(wipeEndId);
    };
  }, [targetId]);

  return (
    <CurtainContext.Provider value={{ wiping, revealed }}>
      {children}
    </CurtainContext.Provider>
  );
}
