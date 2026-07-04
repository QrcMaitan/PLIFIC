"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { LogoWordmark } from "./logo";

export function Header() {
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  function handleLogoClick(event: React.MouseEvent) {
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-88px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`border-b transition-colors duration-300 ${
        overHero
          ? scrolled
            ? "border-transparent bg-[#111111]/50"
            : "border-transparent bg-transparent"
          : "border-line bg-paper/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          className={overHero ? "text-white" : "text-ink"}
          aria-label="Plific"
        >
          <LogoWordmark className="h-6 w-auto" />
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium sm:flex ${
            overHero ? "text-white/80" : "text-ink-soft"
          }`}
        >
          <a
            href="#como-funciona"
            className={`transition-colors ${overHero ? "hover:text-white" : "hover:text-ink"}`}
          >
            Como funciona
          </a>
          <a
            href="#simulador"
            className={`transition-colors ${overHero ? "hover:text-white" : "hover:text-ink"}`}
          >
            Simulador
          </a>
        </nav>

        <Link
          href="/entrar"
          className="shrink-0 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-transform hover:scale-[1.03] sm:px-5"
        >
          Antecipar recebíveis
        </Link>
      </div>
    </header>
  );
}
