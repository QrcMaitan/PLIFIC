"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useCurtainReveal } from "@/components/curtain-reveal";
import { formatBRL } from "@/lib/format";

export const FEE_RATE = 0.04;
export const MAX_AVAILABLE = 800;
export const STEP = 10;
export const DEFAULT_AMOUNT = 300;
const INTRO_DURATION_MS = 1100;

export const CONNECTED_ACCOUNTS = [
  { name: "iFood", value: 400 },
  { name: "Rappi", value: 250 },
  { name: "99", value: 150 },
];

export function AdvanceSimulator() {
  const [amount, setAmount] = useState(0);
  const hasPlayedRef = useRef(false);
  const { revealed } = useCurtainReveal();

  useEffect(() => {
    if (!revealed || hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAmount(DEFAULT_AMOUNT);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / INTRO_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round((eased * DEFAULT_AMOUNT) / STEP) * STEP;
      setAmount(value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [revealed]);

  const fee = useMemo(() => Math.round(amount * FEE_RATE), [amount]);
  const net = amount - fee;
  const sliderFill = (amount / MAX_AVAILABLE) * 100;

  return (
    <div id="simulador">
      <div className="rounded-lg border border-line bg-white p-6 shadow-[0_24px_60px_-24px_rgba(26,24,22,0.18)] sm:p-10">
        <div className="flex flex-wrap gap-2">
          {CONNECTED_ACCOUNTS.map((account) => (
            <span
              key={account.name}
              className="rounded-full bg-paper-muted px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {account.name} · {formatBRL(account.value)}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm font-medium text-ink-soft">
          Você pode adiantar até {formatBRL(MAX_AVAILABLE)} hoje
        </p>

        <p
          className="mt-2 text-5xl font-semibold tracking-tight text-ink"
          aria-live="polite"
        >
          {formatBRL(amount)}
        </p>

        <input
          type="range"
          min={0}
          max={MAX_AVAILABLE}
          step={STEP}
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full accent-accent"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${sliderFill}%, var(--color-paper-muted) ${sliderFill}%)`,
          }}
          aria-label="Valor a antecipar"
        />
        <div className="mt-2 flex justify-between text-xs text-ink-soft">
          <span>R$ 0</span>
          <span>{formatBRL(MAX_AVAILABLE)}</span>
        </div>

        <div className="mt-8 space-y-3 border-t border-line pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Taxa fixa (4%)</span>
            <span className="font-medium text-ink">− {formatBRL(fee)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-ink">
              Você recebe agora
            </span>
            <span className="text-2xl font-semibold text-ink">
              {formatBRL(net)}
            </span>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-soft">
          O valor antecipado é descontado automaticamente dos seus próximos
          recebimentos nas plataformas conectadas. Você não precisa pagar
          nada manualmente.
        </p>

        <Link
          href="/entrar"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
        >
          Simular no meu perfil
        </Link>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Continue direto para o ambiente de teste do produto.
        </p>
      </div>
    </div>
  );
}
