"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { FEE_RATE } from "@/lib/accounts-data";
import { useAppState, type Advance } from "@/lib/app-state";

const STEP_LABELS = ["Valor", "Revisão", "Confirmação"];

export default function AdiantarPage() {
  const { availableToAdvance, requestAdvance } = useAppState();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(() =>
    Math.min(300, Math.round(availableToAdvance / 10) * 10),
  );
  const [confirmedAdvance, setConfirmedAdvance] = useState<Advance | null>(
    null,
  );

  const fee = useMemo(() => Math.round(amount * FEE_RATE), [amount]);
  const net = amount - fee;

  if (availableToAdvance <= 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-ink">
          Nada disponível para antecipar agora
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Você já antecipou tudo o que estava disponível nas suas contas
          conectadas. Volte para a página inicial para ver o resumo.
        </p>
        <Link
          href="/app"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
        >
          Voltar para o início
        </Link>
      </div>
    );
  }

  function handleConfirm() {
    const advance = requestAdvance(amount);
    setConfirmedAdvance(advance);
    setStep(3);
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-8 sm:py-12">
      {step < 3 && (
        <div className="mb-6 flex items-center gap-2">
          {STEP_LABELS.slice(0, 2).map((label, index) => {
            const stepNumber = index + 1;
            const active = stepNumber === step;
            return (
              <div
                key={label}
                className={`flex items-center gap-2 text-xs font-medium ${
                  active ? "text-ink" : "text-ink-soft/60"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    active ? "bg-accent text-accent-ink" : "bg-paper-muted"
                  }`}
                >
                  {stepNumber}
                </span>
                {label}
                {index === 0 && (
                  <span className="mx-1 h-px w-4 bg-line" aria-hidden />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-lg border border-line bg-white p-6 shadow-[0_16px_40px_-24px_rgba(26,24,22,0.2)] sm:p-8">
        {step === 1 && (
          <>
            <h1 className="text-xl font-semibold text-ink">
              Quanto você quer adiantar?
            </h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              Você pode adiantar até {formatBRL(availableToAdvance)} hoje.
            </p>

            <p
              className="mt-6 text-5xl font-semibold tracking-tight text-ink"
              aria-live="polite"
            >
              {formatBRL(amount)}
            </p>

            <input
              type="range"
              min={0}
              max={availableToAdvance}
              step={10}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-muted accent-accent"
              aria-label="Valor a antecipar"
            />
            <div className="mt-2 flex justify-between text-xs text-ink-soft">
              <span>R$ 0</span>
              <span>{formatBRL(availableToAdvance)}</span>
            </div>

            <div className="mt-8 space-y-3 border-t border-line pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Taxa fixa (4%)</span>
                <span className="font-medium text-ink">
                  − {formatBRL(fee)}
                </span>
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

            <button
              type="button"
              disabled={amount <= 0}
              onClick={() => setStep(2)}
              className="mt-8 w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01] disabled:opacity-40 disabled:hover:scale-100"
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-xl font-semibold text-ink">
              Revise antes de confirmar
            </h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              Confira os valores. Não tem letras miúdas escondidas.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Valor antecipado</span>
                <span className="font-medium text-ink">
                  {formatBRL(amount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Taxa fixa</span>
                <span className="font-medium text-ink">4%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Custo total</span>
                <span className="font-medium text-ink">
                  − {formatBRL(fee)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="text-base font-medium text-ink">
                  Valor líquido recebido hoje
                </span>
                <span className="text-2xl font-semibold text-ink">
                  {formatBRL(net)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-soft">
              O valor será descontado automaticamente dos seus próximos
              recebimentos nas plataformas conectadas. Você não precisa
              pagar nada manualmente.
            </p>

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-8 w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.01]"
            >
              Confirmar adiantamento
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-3 w-full text-center text-xs font-medium text-ink-soft hover:text-ink"
            >
              Voltar e alterar o valor
            </button>
          </>
        )}

        {step === 3 && confirmedAdvance && (
          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-ink">
              ✓
            </span>
            <h1 className="mt-4 text-xl font-semibold text-ink">
              Pronto. {formatBRL(confirmedAdvance.net)} caem na sua conta em
              instantes.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {formatBRL(confirmedAdvance.amount)} antecipados, com taxa de{" "}
              {formatBRL(confirmedAdvance.fee)}. O valor será descontado
              automaticamente dos seus próximos recebimentos.
            </p>

            <Link
              href="/app"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
            >
              Voltar para o início
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
