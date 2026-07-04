"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FEE_RATE,
  INITIAL_CONNECTED_IDS,
  PLATFORM_CATALOG,
  getTotalAvailable,
  type PlatformAccount,
} from "@/lib/accounts-data";

export type Advance = {
  id: string;
  date: string;
  amount: number;
  fee: number;
  net: number;
};

type AppState = {
  accounts: PlatformAccount[];
  availablePlatforms: PlatformAccount[];
  removeAccount: (id: string) => void;
  connectAccount: (id: string) => void;
  advances: Advance[];
  requestAdvance: (amount: number) => Advance;
  totalConnected: number;
  advancedTotal: number;
  availableToAdvance: number;
  walletBalance: number;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [connectedIds, setConnectedIds] = useState<string[]>(
    INITIAL_CONNECTED_IDS,
  );
  const [advances, setAdvances] = useState<Advance[]>([]);

  const accounts = useMemo(
    () => PLATFORM_CATALOG.filter((account) => connectedIds.includes(account.id)),
    [connectedIds],
  );
  const availablePlatforms = useMemo(
    () => PLATFORM_CATALOG.filter((account) => !connectedIds.includes(account.id)),
    [connectedIds],
  );

  const removeAccount = useCallback((id: string) => {
    setConnectedIds((prev) => prev.filter((accountId) => accountId !== id));
  }, []);

  const connectAccount = useCallback((id: string) => {
    setConnectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const totalConnected = useMemo(() => getTotalAvailable(accounts), [accounts]);
  const advancedTotal = useMemo(
    () => advances.reduce((sum, advance) => sum + advance.amount, 0),
    [advances],
  );
  const walletBalance = useMemo(
    () => advances.reduce((sum, advance) => sum + advance.net, 0),
    [advances],
  );
  const availableToAdvance = Math.max(0, totalConnected - advancedTotal);

  const requestAdvance = useCallback((amount: number) => {
    const fee = Math.round(amount * FEE_RATE);
    const advance: Advance = {
      id: `adv-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      fee,
      net: amount - fee,
    };
    setAdvances((prev) => [advance, ...prev]);
    return advance;
  }, []);

  const value: AppState = {
    accounts,
    availablePlatforms,
    removeAccount,
    connectAccount,
    advances,
    requestAdvance,
    totalConnected,
    advancedTotal,
    availableToAdvance,
    walletBalance,
  };

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
