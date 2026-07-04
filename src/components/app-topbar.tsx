"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/app": "Sua conta",
  "/app/adiantar": "Adiantar",
  "/app/conectar": "Conectar conta",
};

export function AppTopbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Plific";
  const isRoot = pathname === "/app";

  return (
    <header className="hidden items-center justify-between border-b border-line bg-white px-8 py-6 lg:flex">
      {isRoot ? (
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
      ) : (
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <Link
            href="/app"
            className="cursor-pointer text-ink-soft/60 transition-colors hover:text-ink"
          >
            {PAGE_TITLES["/app"]}
          </Link>
          <span className="text-ink-soft/40" aria-hidden="true">
            /
          </span>
          <span className="text-ink">{title}</span>
        </nav>
      )}

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink-soft">Você</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper">
          V
        </span>
      </div>
    </header>
  );
}
