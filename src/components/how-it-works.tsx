const STEPS = [
  {
    number: "1",
    title: "Conecte suas contas",
    description:
      "iFood, Rappi, 99, Uber e outras plataformas onde você trabalha e recebe.",
  },
  {
    number: "2",
    title: "Veja quanto pode adiantar",
    description:
      "A Plific soma automaticamente o que você já ganhou e ainda não recebeu.",
  },
  {
    number: "3",
    title: "Receba na hora",
    description:
      "O valor cai na sua conta em instantes e é descontado dos próximos recebimentos.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-paper-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Simples assim, em 3 passos
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Sem análise de crédito complicada e sem burocracia de banco.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
