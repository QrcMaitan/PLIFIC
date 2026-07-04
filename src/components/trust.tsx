import { AdvanceSimulator } from "@/components/advance-simulator";
import { CurtainRevealProvider } from "@/components/curtain-reveal";
import { DarkCurtainReveal } from "@/components/dark-curtain-reveal";
import { POINTS } from "@/lib/trust-points";

export function Trust() {
  return (
    <section
      id="confianca"
      className="relative min-h-[calc(100dvh-69px)] bg-paper"
    >
      {/* Opaque full-width background is required here — this section
          scrolls up over the sticky "como-funciona" section above it, so it
          needs to fully cover it rather than let it show through. The
          min-height match to "como-funciona" (100dvh-69px) is required too:
          on wide viewports this section's content is shorter than the
          pinned section behind it, so without it the sticky wrapper releases
          before this section has scrolled up far enough to fully cover, and
          "como-funciona" pokes out and starts scrolling early. */}
      <CurtainRevealProvider targetId="confianca">
        <div className="grid">
          <div className="col-start-1 row-start-1 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Clareza total de custos, sempre
                </h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {POINTS.map((point) => (
                    <div
                      key={point.title}
                      className="rounded-lg border border-line bg-white p-5"
                    >
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

              <AdvanceSimulator />
            </div>
          </div>

          <DarkCurtainReveal />
        </div>
      </CurtainRevealProvider>
    </section>
  );
}
