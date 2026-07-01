import { formatBRL } from "@/lib/format";

const CONNECTED_ACCOUNTS = [
  { name: "iFood", value: 400 },
  { name: "Rappi", value: 250 },
  { name: "99", value: 150 },
];

const TOTAL_AVAILABLE = CONNECTED_ACCOUNTS.reduce((sum, a) => sum + a.value, 0);

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-muted px-3 py-1 text-xs font-medium text-ink-soft">
            Para motoristas, entregadores e autônomos
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Você já trabalhou por esse dinheiro.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            A Plific adianta o que você já ganhou no iFood, Rappi, 99, Uber e
            outras plataformas. Sem empréstimo, sem parcelas e sem juros
            compostos — só uma taxa fixa de 4%, mostrada antes de você
            confirmar qualquer coisa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#simulador"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
            >
              Ver quanto posso adiantar
            </a>
            <p className="text-sm text-ink-soft">
              Versão de demonstração — nenhum valor é real.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-24px_rgba(26,24,22,0.25)] sm:p-7">
            <p className="text-sm font-medium text-ink-soft">
              Saldo disponível para antecipação
            </p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">
              {formatBRL(TOTAL_AVAILABLE)}
            </p>

            <div className="mt-6 space-y-3">
              {CONNECTED_ACCOUNTS.map((account) => (
                <div
                  key={account.name}
                  className="flex items-center justify-between rounded-xl bg-paper-muted px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                      {account.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {account.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-ink">
                    {formatBRL(account.value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-full bg-ink py-3 text-center text-sm font-semibold text-paper">
              Adiantar agora
            </div>
          </div>

          <span className="absolute -right-3 -top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink shadow-sm sm:-right-4 sm:-top-4">
            Exemplo ilustrativo
          </span>
        </div>
      </div>
    </section>
  );
}
