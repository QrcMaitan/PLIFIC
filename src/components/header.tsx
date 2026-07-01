import Link from "next/link";
import { LogoWordmark } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="text-ink" aria-label="Plific">
          <LogoWordmark className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
          <a href="#como-funciona" className="transition-colors hover:text-ink">
            Como funciona
          </a>
          <a href="#simulador" className="transition-colors hover:text-ink">
            Simulador
          </a>
          <a href="#confianca" className="transition-colors hover:text-ink">
            Transparência
          </a>
        </nav>

        <a
          href="#simulador"
          className="shrink-0 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-transform hover:scale-[1.03] sm:px-5"
        >
          Ver quanto posso adiantar
        </a>
      </div>
    </header>
  );
}
