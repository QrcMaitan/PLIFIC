const PLATFORMS = ["iFood", "Rappi", "99", "Uber", "Lalamove"];

export function Platforms() {
  return (
    <section className="border-y border-line bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="text-center text-sm font-medium text-ink-soft">
          Funciona com as plataformas onde você já trabalha
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {PLATFORMS.map((platform) => (
            <span
              key={platform}
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
