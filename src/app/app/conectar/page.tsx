"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useAppState } from "@/lib/app-state";
import { PlatformIcon } from "@/components/platform-icon";
import { LogoMark } from "@/components/logo";
import type { PlatformAccount } from "@/lib/accounts-data";

type Step = "list" | "confirm" | "syncing" | "success";

export default function ConectarPage() {
  const router = useRouter();
  const { availablePlatforms, connectAccount } = useAppState();
  const [step, setStep] = useState<Step>("list");
  const [selected, setSelected] = useState<PlatformAccount | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function selectPlatform(platform: PlatformAccount) {
    setSelected(platform);
    setAcceptedTerms(false);
    setStep("confirm");
  }

  function handleSync() {
    setStep("syncing");
  }

  useEffect(() => {
    if (step !== "syncing" || !selected) return;
    const timer = setTimeout(() => {
      connectAccount(selected.id);
      setStep("success");
    }, 1400);
    return () => clearTimeout(timer);
  }, [step, selected, connectAccount]);

  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => router.push("/app"), 2200);
    return () => clearTimeout(timer);
  }, [step, router]);

  return (
    <div className="mx-auto max-w-xl px-6 py-8 sm:py-12">
      <AnimatePresence mode="wait">
        {step === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-xl font-semibold text-ink">
              Conectar conta de ganhos
            </h1>
            <p className="mt-1.5 text-sm text-ink-soft">
              Escolha a plataforma que você quer vincular à Plific.
            </p>

            <div className="mt-6 space-y-2.5">
              {availablePlatforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => selectPlatform(platform)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 text-left transition-colors hover:border-ink/30"
                >
                  <span className="flex items-center gap-3">
                    <PlatformIcon platform={platform} />
                    <span className="text-sm font-medium text-ink">
                      {platform.name}
                    </span>
                  </span>
                  <span className="text-lg text-ink-soft">＋</span>
                </button>
              ))}

              {availablePlatforms.length === 0 && (
                <p className="rounded-lg border border-line bg-white p-6 text-center text-sm text-ink-soft">
                  Todas as plataformas disponíveis já estão conectadas.
                </p>
              )}
            </div>

            <Link
              href="/app"
              className="mt-6 inline-block text-xs font-medium text-ink-soft hover:text-ink"
            >
              Voltar para o início
            </Link>
          </motion.div>
        )}

        {step === "confirm" && selected && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-[70vh] flex-col"
          >
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="flex items-center gap-4">
                <PlatformIcon platform={selected} className="h-16 w-16" />
                <span className="text-xl font-bold text-ink-soft">⟷</span>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink">
                  <LogoMark className="h-6 w-6 text-white" />
                </span>
              </div>

              <h1 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
                Vincular conta do {selected.name}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                A Plific vai sincronizar seus ganhos do {selected.name}{" "}
                automaticamente, para calcular quanto você já pode adiantar.
              </p>
            </div>

            <div>
              <label className="flex cursor-pointer items-center justify-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="h-4 w-4 rounded-lg border-line accent-ink"
                />
                Aceito os Termos e política de privacidade
              </label>

              <button
                type="button"
                disabled={!acceptedTerms}
                onClick={handleSync}
                className="mt-5 w-full rounded-full border-2 border-ink py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Permitir sincronia
              </button>
              <button
                type="button"
                onClick={() => setStep("list")}
                className="mt-4 w-full text-center text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {step === "syncing" && selected && (
          <motion.div
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[70vh] flex-col items-center justify-center text-center"
          >
            <div className="flex items-center gap-4">
              <PlatformIcon platform={selected} className="h-14 w-14" />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-xl font-bold text-accent"
              >
                ⟷
              </motion.span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink">
                <LogoMark className="h-5 w-5 text-white" />
              </span>
            </div>
            <p className="mt-6 text-sm font-medium text-ink-soft">
              Sincronizando com {selected.name}...
            </p>
          </motion.div>
        )}

        {step === "success" && selected && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[70vh] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-ink"
            >
              ✓
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-xl font-semibold text-ink"
            >
              Conta do {selected.name} conectada!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft"
            >
              Seus ganhos já foram somados ao seu saldo disponível para
              antecipação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/app"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
              >
                Ir para o início
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
