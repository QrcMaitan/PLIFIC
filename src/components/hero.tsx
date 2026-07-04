import Image from "next/image";
import Link from "next/link";
import { HeroBalanceWidget } from "./hero-balance-widget";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-dvh flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-36 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:pt-28">
        <div className="absolute inset-y-0 right-6 flex items-center sm:right-8 lg:right-16">
          <HeroBalanceWidget />
        </div>

        <span className="inline-flex w-fit shrink-0 items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          Para motoristas, entregadores e autônomos
        </span>

        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:max-w-[min(42rem,calc(100%-340px))] sm:text-5xl lg:text-[3.4rem]">
          Você já trabalhou por esse dinheiro.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:max-w-[min(28rem,calc(100%-340px))]">
          A Plific adianta o que você já ganhou no iFood, Rappi, 99, Uber e
          outras plataformas. Sem empréstimo, sem parcelas e sem juros
          compostos — só uma taxa fixa de 4%, mostrada antes de você
          confirmar qualquer coisa.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/entrar"
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
          >
            Antecipar recebíveis
          </Link>
          <p className="text-sm text-white/70">
            Versão de demonstração — nenhum valor é real.
          </p>
        </div>
      </div>
    </section>
  );
}
