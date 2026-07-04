import Image from "next/image";

const FEATURES = [
  {
    title: "Gerencie suas contas em um só lugar",
    description:
      "Conecte suas contas e saiba quanto está ganhando de forma simples e automatizada, sem dor de cabeça com surpresas.",
  },
  {
    title: "Acompanhe e compare seu desempenho em cada app",
    description:
      "Tenha em mãos todos os detalhes das corridas e entregas que você finalizou, com insights para melhorar seus ganhos.",
  },
];

export function ConnectedAccounts() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Chega de trocar de aplicativo para acompanhar seus ganhos em
              cada app
            </h2>

            <div className="mt-10">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className={index > 0 ? "mt-8 border-t border-line pt-8" : ""}
                >
                  <h3 className="text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <Image
              src="/connected-accounts-mockup.png"
              alt="Tela do app mostrando o total ganho por plataforma (Rappi, iFood, Uber) e o histórico de transações"
              width={1722}
              height={1990}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
