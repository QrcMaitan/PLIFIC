import { LogoWordmark } from "./logo";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <LogoWordmark className="h-6 w-auto text-paper" />
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-paper/70">
            <a href="#como-funciona" className="transition-colors hover:text-paper">
              Como funciona
            </a>
            <a href="#simulador" className="transition-colors hover:text-paper">
              Simulador
            </a>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-paper/50 sm:text-left">
          © {new Date().getFullYear()} Plific — projeto de demonstração. Não é
          uma instituição financeira.
        </p>
      </div>
    </footer>
  );
}
