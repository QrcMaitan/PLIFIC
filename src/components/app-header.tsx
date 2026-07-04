import Link from "next/link";
import { LogoWordmark } from "@/components/logo";

export function AppHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/app" className="text-ink" aria-label="Plific">
          <LogoWordmark className="h-6 w-auto" />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
