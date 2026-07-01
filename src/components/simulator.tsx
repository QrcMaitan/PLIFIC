"use client";

import { useMemo, useState } from "react";
import { formatBRL } from "@/lib/format";

const FEE_RATE = 0.04;
const MAX_AVAILABLE = 800;
const STEP = 10;

const CONNECTED_ACCOUNTS = [
  { name: "iFood", value: 400 },
  { name: "Rappi", value: 250 },
  { name: "99", value: 150 },
];

export function Simulator() {
  const [amount, setAmount] = useState(300);

  const fee = useMemo(() => Math.round(amount * FEE_RATE), [amount]);
  const net = amount - fee;

  return (
    <section id="simulador" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Veja quanto você pode adiantar
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Simulador com dados fictícios. Arraste e veja o custo total e o
          valor líquido mudarem na hora — sem letras miúdas.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-24px_rgba(26,24,22,0.18)] sm:p-10">
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
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-muted accent-accent"
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
          recebimentos nas plataformas conectadas. Você não precisa pagar nada
          manualmente.
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
        >
          Simular no meu perfil
        </button>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Em breve: continue direto para o ambiente de teste do produto.
        </p>
      </div>
    </section>
  );
}
