"use client";

import { useEffect, useRef, useState } from "react";
import { formatBRL } from "@/lib/format";
import { PlatformIcon } from "@/components/platform-icon";
import { IconMore } from "@/components/icons";
import type { PlatformAccount } from "@/lib/accounts-data";

export function AccountTile({
  account,
  onRemove,
}: {
  account: PlatformAccount;
  onRemove: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="relative rounded-lg bg-paper-muted p-4">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-ink"
        aria-label={`Mais opções para ${account.name}`}
        aria-expanded={menuOpen}
      >
        <IconMore />
      </button>

      {menuOpen && (
        <div className="absolute top-9 right-2 z-10 w-40 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onRemove(account.id);
              setMenuOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-paper-muted"
          >
            Remover conta
          </button>
        </div>
      )}

      <PlatformIcon platform={account} className="h-9 w-9" />
      <p className="mt-3 text-sm font-medium text-ink">{account.name}</p>
      <p className="text-sm font-semibold text-ink">
        {formatBRL(account.balance)}
      </p>
    </div>
  );
}
