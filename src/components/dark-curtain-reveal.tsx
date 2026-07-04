"use client";

import { useCurtainReveal, WIPE_DURATION_MS } from "@/components/curtain-reveal";
import { formatBRL } from "@/lib/format";
import {
  CONNECTED_ACCOUNTS,
  MAX_AVAILABLE,
} from "@/components/advance-simulator";
import { POINTS } from "@/lib/trust-points";

// This card is a static "before" snapshot of the light simulator — it should
// mirror the pre-animation state (amount 0) so the wipe reveals the light
// card mid count-up instead of jumping from a filled slider to an empty one.
const amount = 0;
const fee = 0;
const net = 0;
const sliderFill = 0;

export function DarkCurtainReveal() {
  const { wiping } = useCurtainReveal();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none col-start-1 row-start-1 bg-night"
      style={{
        clipPath: wiping ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
        transition: `clip-path ${WIPE_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Clareza total de custos, sempre
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {POINTS.map((point) => (
                <div
                  key={point.title}
                  className="rounded-lg border border-transparent bg-night-card p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-night-accent text-night">
                    <span className="text-sm font-semibold">✓</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-night-muted">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-transparent bg-night-card p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] sm:p-10">
            <div className="flex flex-wrap gap-2">
              {CONNECTED_ACCOUNTS.map((account) => (
                <span
                  key={account.name}
                  className="rounded-full bg-night px-3 py-1 text-xs font-medium text-night-muted"
                >
                  {account.name} · {formatBRL(account.value)}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm font-medium text-night-muted">
              Você pode adiantar até {formatBRL(MAX_AVAILABLE)} hoje
            </p>

            <p className="mt-2 text-5xl font-semibold tracking-tight text-white">
              {formatBRL(amount)}
            </p>

            <div className="relative mt-6 h-2 w-full rounded-full bg-night">
              <div
                className="h-full rounded-full bg-night-accent"
                style={{ width: `${sliderFill}%` }}
              />
              <div
                className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-night-accent shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                style={{ left: `calc(${sliderFill}% - 8px)` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-night-muted">
              <span>R$ 0</span>
              <span>{formatBRL(MAX_AVAILABLE)}</span>
            </div>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-night-muted">Taxa fixa (4%)</span>
                <span className="font-medium text-white">
                  − {formatBRL(fee)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-white">
                  Você recebe agora
                </span>
                <span className="text-2xl font-semibold text-white">
                  {formatBRL(net)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-night-muted">
              O valor antecipado é descontado automaticamente dos seus
              próximos recebimentos nas plataformas conectadas. Você não
              precisa pagar nada manualmente.
            </p>

            <div className="mt-6 flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-semibold text-night-card">
              Simular no meu perfil
            </div>
            <p className="mt-3 text-center text-xs text-night-muted">
              Continue direto para o ambiente de teste do produto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
