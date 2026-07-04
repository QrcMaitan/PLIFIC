"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoWordmark } from "@/components/logo";
import { APP_NAV_ITEMS } from "@/components/app-nav-items";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-white px-5 py-6 lg:flex">
      <Link href="/app" className="px-1 text-ink" aria-label="Plific">
        <LogoWordmark className="h-6 w-auto" />
      </Link>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {APP_NAV_ITEMS.map((item) => {
          const active = pathname === item.href;

          if (!item.enabled) {
            return (
              <div
                key={item.href}
                className="flex cursor-not-allowed items-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft/50"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="flex-1">
                  <span className="block">{item.label}</span>
                  <span className="block text-[10px] font-normal">
                    em breve
                  </span>
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-paper-muted text-ink"
                  : "text-ink-soft hover:bg-paper-muted hover:text-ink"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className={active ? "relative" : ""}>
                {item.label}
                {active && (
                  <span className="absolute top-1/2 -left-3 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-muted hover:text-ink"
      >
        Sair
      </Link>
    </aside>
  );
}
