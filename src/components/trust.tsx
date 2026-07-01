const POINTS = [
  {
    title: "Não é empréstimo",
    description: "Você está recebendo mais cedo um dinheiro que já é seu.",
  },
  {
    title: "Sem juros compostos",
    description: "Taxa única e fixa de 4% sobre o valor antecipado.",
  },
  {
    title: "Sem parcelas",
    description: "Nada de boleto, carnê ou cobrança recorrente.",
  },
  {
    title: "Sem cobrança ativa",
    description:
      "O desconto acontece automaticamente nas plataformas conectadas.",
  },
];

export function Trust() {
  return (
    <section id="confianca" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Clareza total de custos, sempre
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Antes de confirmar qualquer adiantamento, você vê exatamente
            quanto vai custar e quanto vai receber. Nenhuma surpresa depois.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-line p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
                <span className="text-sm font-semibold">✓</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {point.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
