"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAV_ITEMS } from "@/components/app-nav-items";

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {APP_NAV_ITEMS.map((item) => {
        const active = pathname === item.href;

        if (!item.enabled) {
          return (
            <div
              key={item.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-ink-soft/40"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors ${
              active ? "text-ink" : "text-ink-soft"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
