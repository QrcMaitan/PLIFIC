"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { useAppState } from "@/lib/app-state";
import { AccountTile } from "@/components/account-tile";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { TrendChart, type TrendBreakdownItem } from "@/components/trend-chart";
import {
  MONTH_LABELS,
  EARNINGS_HISTORY,
  ADVANCES_HISTORY,
} from "@/lib/dashboard-data";
import {
  IconChevronRight,
  IconEye,
  IconEyeOff,
  IconPix,
  IconBarcode,
  IconRecharge,
  IconDeposit,
  IconPlus,
} from "@/components/icons";

type Tab = "ganhos" | "adiantamentos";

const PERIODS = ["Dia", "Semana", "Mês", "Ano"] as const;
const FAKE_LOADING_MS = 900;

const QUICK_ACTIONS = [
  { label: "Fazer Pix", icon: IconPix },
  { label: "Pagar", icon: IconBarcode },
  { label: "Recarregar", icon: IconRecharge },
  { label: "Depositar", icon: IconDeposit },
];

export default function AppHomePage() {
  const {
    accounts,
    removeAccount,
    totalConnected,
    advancedTotal,
    availableToAdvance,
    walletBalance,
  } = useAppState();

  const [tab, setTab] = useState<Tab>("ganhos");
  const [hiddenAmount, setHiddenAmount] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), FAKE_LOADING_MS);
    return () => clearTimeout(timeout);
  }, []);

  const selected = selectedIds ?? accounts.map((account) => account.id);
  const hasAccounts = accounts.length > 0;

  function togglePlatform(id: string) {
    setSelectedIds((prev) => {
      const current = prev ?? accounts.map((account) => account.id);
      return current.includes(id)
        ? current.filter((accountId) => accountId !== id)
        : [...current, id];
    });
  }

  const monthEarnings = useMemo(
    () =>
      accounts
        .filter((account) => selected.includes(account.id))
        .reduce((sum, account) => sum + account.weeklyEarnings, 0),
    [accounts, selected],
  );

  const headlineAmount = tab === "ganhos" ? monthEarnings : advancedTotal;

  const chartData = useMemo(
    () =>
      MONTH_LABELS.map((label, index) => {
        const history = tab === "ganhos" ? EARNINGS_HISTORY : ADVANCES_HISTORY;
        const value =
          index < history.length
            ? history[index]
            : tab === "ganhos"
              ? monthEarnings
              : advancedTotal;
        return { label, value };
      }),
    [tab, monthEarnings, advancedTotal],
  );

  const percentAdvanced =
    totalConnected > 0
      ? Math.round((advancedTotal / totalConnected) * 100)
      : 0;

  const breakdownByIndex: TrendBreakdownItem[][] | undefined = useMemo(() => {
    if (tab !== "ganhos") return undefined;

    const activeAccounts = accounts.filter((account) =>
      selected.includes(account.id),
    );
    const totalWeeklyEarnings = activeAccounts.reduce(
      (sum, account) => sum + account.weeklyEarnings,
      0,
    );
    if (totalWeeklyEarnings === 0) return undefined;

    // Historical months only have a total on record, so each account's
    // share is estimated from its current earnings ratio. For the current
    // month this reduces to the exact real breakdown, since the chart value
    // there is the sum of weeklyEarnings itself.
    return chartData.map((point) =>
      activeAccounts.map((account) => ({
        id: account.id,
        name: account.name,
        logo: account.logo,
        brandColor: account.brandColor,
        value: Math.round(
          (account.weeklyEarnings / totalWeeklyEarnings) * point.value,
        ),
      })),
    );
  }, [tab, accounts, selected, chartData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="px-8 py-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6">
              <p className="text-sm font-medium text-ink-soft">
                Saldo em conta
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                {formatBRL(walletBalance)}
              </p>
            </div>

            <Link
              href="/app/adiantar"
              className="group rounded-lg bg-white p-6"
            >
              <p className="text-sm font-medium text-ink-soft">
                Adiantamento disponível
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="relative inline-block text-3xl font-semibold tracking-tight text-ink">
                  {formatBRL(availableToAdvance)}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
                <IconChevronRight className="h-5 w-5 shrink-0 text-ink-soft" />
              </div>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-ink-soft">Este mês</p>
              <div className="flex items-center gap-5 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setTab("ganhos")}
                  className={`border-b-2 pb-1 transition-colors ${
                    tab === "ganhos"
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  Ganhos
                </button>
                <button
                  type="button"
                  onClick={() => setTab("adiantamentos")}
                  className={`border-b-2 pb-1 transition-colors ${
                    tab === "adiantamentos"
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  Adiantamentos
                </button>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {hiddenAmount ? "R$ ••••••" : formatBRL(headlineAmount)}
              </p>
              <button
                type="button"
                onClick={() => setHiddenAmount((value) => !value)}
                className="text-ink-soft transition-colors hover:text-ink"
                aria-label={hiddenAmount ? "Mostrar valor" : "Ocultar valor"}
              >
                {hiddenAmount ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>

            {tab === "ganhos" ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {accounts.map((account) => {
                  const active = selected.includes(account.id);
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => togglePlatform(account.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-out hover:scale-[1.04] active:scale-95 ${
                        active
                          ? "bg-ink text-paper hover:bg-ink/85"
                          : "bg-paper-muted text-ink-soft hover:bg-line hover:text-ink"
                      }`}
                    >
                      {account.name}
                    </button>
                  );
                })}
                {!hasAccounts && (
                  <p className="text-sm text-ink-soft">
                    Conecte uma conta para ver seus ganhos por plataforma.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-2 text-sm">
                <span className="text-ink-soft">
                  Porcentagem antecipada dos ganhos
                </span>
                <span className="rounded-full bg-paper-muted px-2.5 py-1.5 text-xs font-semibold text-ink">
                  {percentAdvanced}%
                </span>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs font-medium text-ink-soft">2025-2026</p>
              <div className="mt-2">
                <TrendChart
                  data={chartData}
                  activeIndex={chartData.length - 1}
                  breakdownByIndex={breakdownByIndex}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {PERIODS.map((period) => (
                <button
                  key={period}
                  type="button"
                  disabled={period !== "Mês"}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    period === "Mês"
                      ? "bg-ink text-paper"
                      : "cursor-not-allowed bg-paper-muted text-ink-soft/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">
                Contas Conectadas
              </h2>
            </div>

            {hasAccounts ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {accounts.map((account) => (
                  <AccountTile
                    key={account.id}
                    account={account}
                    onRemove={removeAccount}
                  />
                ))}

                <Link
                  href="/app/conectar"
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line p-4 text-center transition-colors hover:border-ink/30"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-muted text-ink-soft">
                    <IconPlus className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-ink-soft">
                    Adicionar conta
                  </span>
                </Link>
              </div>
            ) : (
              <div className="mt-4 rounded-lg bg-paper-muted px-6 py-10 text-center">
                <p className="text-sm font-medium text-ink">
                  Nenhuma conta conectada
                </p>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Conecte suas contas de ganhos para ver seu saldo disponível
                  para antecipação.
                </p>
                <Link
                  href="/app/conectar"
                  className="mt-5 inline-flex cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
                >
                  Conectar conta de ganhos
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-lg bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Mais acessados</h2>
          <div className="mt-2 divide-y divide-line">
            {QUICK_ACTIONS.map((action) => (
              <div key={action.label} className="group relative">
                <button
                  type="button"
                  title="Em breve"
                  className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg py-3.5 text-left transition-colors hover:bg-paper-muted focus:outline-none focus-visible:bg-paper-muted"
                >
                  <action.icon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="flex-1 text-sm font-medium text-ink">
                    {action.label}
                  </span>
                  <IconChevronRight className="h-4 w-4 shrink-0 text-ink-soft/50" />
                </button>

                <span className="pointer-events-none absolute top-full left-8 z-10 mt-1.5 translate-y-1 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-paper opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  Em breve
                  <span className="absolute bottom-full left-4 h-0 w-0 border-4 border-transparent border-b-ink" />
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
