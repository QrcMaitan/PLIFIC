import type { ReactNode } from "react";
import { AppStateProvider } from "@/lib/app-state";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { AppBottomNav } from "@/components/app-bottom-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppStateProvider>
      <div className="flex h-dvh flex-col overflow-hidden bg-paper-muted">
        <div className="shrink-0 bg-ink px-4 py-2 text-center text-xs font-medium text-paper">
          Ambiente de demonstração — nenhum dado real é usado e nenhum
          dinheiro é movimentado de verdade.
        </div>
        <div className="shrink-0 lg:hidden">
          <AppHeader />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <AppTopbar />
            <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
              {children}
            </main>
          </div>
        </div>
        <AppBottomNav />
      </div>
    </AppStateProvider>
  );
}
