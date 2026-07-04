import Link from "next/link";
import { IconSparkle } from "./icons";
import { LogoMark } from "./logo";
import { PhoneInHandDesktop, PhoneInHandMobile } from "./phone-in-hand";

const CHECKLIST = [
  "Conexão de contas 100% grátis",
  "Sem parcelas e cobranças",
  "Sem burocracia",
  "Regulado pelo Banco Central",
];

function StepBadge({ number }: { number: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-ink">
      {number}
    </span>
  );
}

function StepBand({
  number,
  title,
  subtitle,
  tinted,
}: {
  number: number;
  title: string;
  subtitle: string;
  tinted?: boolean;
}) {
  return (
    <div
      className={`py-8 lg:py-11 ${tinted ? "bg-accent/5" : "bg-white"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <StepBadge number={number} />
          <p className="text-xl font-semibold text-ink sm:text-2xl">{title}</p>
        </div>
        <p className="text-sm text-[#a4a4a4] sm:max-w-xs sm:text-right">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="sticky top-[69px] flex min-h-[calc(100dvh-69px)] flex-col"
    >
      {/* top-[69px] matches the fixed header's rendered height — pins the
          section right below the header instead of behind it. */}
      <StepBand
        number={1}
        title="Conecte suas contas"
        subtitle="iFood, Rappi, 99, Uber e outras plataformas onde você trabalha e recebe."
      />
      <StepBand
        number={2}
        title="Veja quanto você pode adiantar"
        subtitle="A Plific soma automaticamente o que você já ganhou e ainda não recebeu."
        tinted
      />

      <div className="relative flex-1 bg-white">
        <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-10 sm:px-8 sm:pb-16 lg:pt-11">
          <LogoMark className="pointer-events-none absolute right-0 top-16 h-56 w-56 text-ink opacity-[0.06] sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <StepBadge number={3} />
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-ink sm:text-2xl">
                  Receba na hora
                </p>
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              </div>
            </div>
            <p className="text-sm text-[#a4a4a4] sm:max-w-xs sm:text-right">
              O valor cai na sua conta em instantes e é descontado dos
              próximos recebimentos.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-base font-medium text-ink">
              Simples assim, em 3 passos
            </p>
            <p className="mt-1 text-base text-[#a4a4a4]">
              Sem análise de crédito e sem burocracia
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <ul className="order-1 flex flex-col gap-3 text-sm text-[#a4a4a4] sm:order-2">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="order-2 flex max-w-sm flex-col gap-6 sm:order-1">
              <div className="hidden gap-4 rounded-lg bg-white p-4 shadow-[0_2px_10px_-2px_rgba(26,24,22,0.15)] sm:flex sm:w-[300px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10">
                  <IconSparkle className="h-[18px] w-[18px] text-ink" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">
                    Inteligência a seu favor
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#a4a4a4]">
                    A Plific analisa o quanto você já faturou e libera o
                    dinheiro em instantes
                  </p>
                </div>
              </div>

              <Link
                href="/entrar"
                className="group inline-flex w-fit items-center gap-1.5 text-base font-medium text-ink"
              >
                <span className="relative inline-block">
                  Antecipar meu dinheiro
                  <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <PhoneInHandMobile />
          </div>
        </div>

        <PhoneInHandDesktop />
      </div>
    </section>
  );
}
