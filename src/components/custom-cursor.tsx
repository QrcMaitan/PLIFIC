"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("cursor-none");

    function handleMove(event: MouseEvent) {
      wrapperRef.current?.style.setProperty(
        "transform",
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
      );
      setVisible(true);
    }

    function handleOver(event: MouseEvent) {
      const target = event.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }

    function handleLeave() {
      setVisible(false);
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("cursor-none");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed top-0 left-0 z-[100]"
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent transition-all duration-200 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${
          hovering
            ? "h-12 w-12 shadow-[0_8px_28px_-4px_rgba(0,0,0,0.55)]"
            : "h-3.5 w-3.5"
        }`}
      >
        {hovering && (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-accent-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 16 16 8" />
            <path d="M9 8h7v7" />
          </svg>
        )}
      </div>
    </div>
  );
}
