"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { formatBRL } from "@/lib/format";

const ACCOUNTS = [
  { name: "iFood", logo: "/logos/ifood.svg", value: 400 },
  { name: "99", logo: "/logos/99.svg", value: 250 },
  { name: "Uber", logo: "/logos/uber.svg", value: 150 },
];

const TOTAL = ACCOUNTS.reduce((sum, a) => sum + a.value, 0);
const REQUEST_AMOUNT = 300;
const FEE = Math.round(REQUEST_AMOUNT * 0.04);
const NET = REQUEST_AMOUNT - FEE;

// Each stage adds one more link to the chain instead of replacing the
// previous one. Once the confirmation card lands, the full chain holds,
// then fades out together and the next cycle starts fresh.
const STAGES = [
  "sync",
  "synced",
  "acc1",
  "acc2",
  "acc3",
  "total",
  "confirm",
] as const;
type Stage = (typeof STAGES)[number];

const DURATIONS: Record<Stage, number> = {
  sync: 1400,
  synced: 700,
  acc1: 650,
  acc2: 650,
  acc3: 650,
  total: 1600,
  confirm: 3200,
};

// How many chain links are visible at each stage (the sync/synced pill
// counts as the first link).
const LEVEL: Record<Stage, number> = {
  sync: 1,
  synced: 1,
  acc1: 2,
  acc2: 3,
  acc3: 4,
  total: 5,
  confirm: 6,
};

function ChainDot({ accent }: { accent?: boolean }) {
  return (
    <span
      className={`absolute -left-4 h-[7px] w-[7px] rounded-full ${accent ? "bg-accent" : "bg-white/70"}`}
    />
  );
}

export function HeroBalanceWidget() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const stage = STAGES[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => {
        const next = (i + 1) % STAGES.length;
        if (next === 0) setCycle((c) => c + 1);
        return next;
      });
    }, DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  const level = LEVEL[stage];
  const synced = stage !== "sync";

  return (
    <div className="hidden h-[360px] w-[260px] sm:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          className="relative space-y-2.5 pl-4"
        >
          <div className="absolute top-1 bottom-1 left-[3px] w-px bg-white/25" />

          <div className="relative flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <ChainDot />
            <AnimatePresence mode="wait">
              {synced ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-ink"
                >
                  ✓
                </motion.span>
              ) : (
                <motion.span
                  key="spin"
                  exit={{ opacity: 0 }}
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-ink/20 border-t-ink"
                />
              )}
            </AnimatePresence>
            <span className="text-xs font-medium text-ink">
              {synced ? "Contas sincronizadas" : "Sincronizando contas..."}
            </span>
          </div>

          {ACCOUNTS.map(
            (account, i) =>
              level >= i + 2 && (
                <motion.div
                  key={account.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex items-center gap-2.5"
                >
                  <ChainDot />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={account.logo}
                    alt=""
                    className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  />
                  <span className="text-xs font-medium text-white">
                    {account.name}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {formatBRL(account.value)}
                  </span>
                </motion.div>
              ),
          )}

          {level >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative rounded-full bg-accent px-3.5 py-2 text-xs font-semibold leading-snug text-accent-ink shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]"
            >
              <ChainDot accent />
              {formatBRL(TOTAL)} disponível para antecipação
            </motion.div>
          )}

          {level >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mt-1 rounded-lg bg-ink p-4 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.6)]"
            >
              <ChainDot accent />
              <span className="text-xs font-medium text-white/60">
                Adiantamento confirmado ✓
              </span>
              <p className="mt-1.5 text-[30px] leading-none font-bold tracking-tight text-white">
                {formatBRL(REQUEST_AMOUNT)}
              </p>
              <p className="mt-2 text-xs text-white/55">
                Taxa 4% (− {formatBRL(FEE)}) · você recebe{" "}
                <span className="font-semibold text-white/85">
                  {formatBRL(NET)}
                </span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
