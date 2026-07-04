import Link from "next/link";
import type { Metadata } from "next";
import { LogoWordmark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Entrar — Plific",
};

export default function EntrarPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium text-paper">
        Ambiente de demonstração — login simulado, não é necessário digitar
        nada.
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <Link href="/" className="mb-10 text-ink" aria-label="Plific">
          <LogoWordmark className="h-7 w-auto" />
        </Link>

        <div className="w-full max-w-sm rounded-lg border border-line bg-white p-8 shadow-[0_24px_60px_-24px_rgba(26,24,22,0.18)]">
          <h1 className="text-xl font-semibold text-ink">Entrar</h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Seus dados já estão preenchidos. É só clicar em entrar.
          </p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-ink-soft">
                E-mail
              </span>
              <input
                type="email"
                readOnly
                value="voce@plific.com"
                className="mt-1.5 w-full cursor-default rounded-lg border border-line bg-paper-muted px-4 py-3 text-sm text-ink outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-ink-soft">Senha</span>
              <input
                type="password"
                readOnly
                value="plific-demo"
                className="mt-1.5 w-full cursor-default rounded-lg border border-line bg-paper-muted px-4 py-3 text-sm text-ink outline-none"
              />
            </label>
          </div>

          <Link
            href="/app"
            className="mt-7 flex w-full items-center justify-center rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
          >
            Entrar
          </Link>

          <p className="mt-4 text-center text-xs text-ink-soft">
            Login simulado. Nenhuma senha real é validada.
          </p>
        </div>
      </div>
    </div>
  );
}
