import Image from "next/image";

type Platform = {
  name: string;
  image?: string;
  wordmarkClassName?: string;
};

const PLATFORMS: Platform[] = [
  { name: "iFood", image: "/logos/ifood.png" },
  { name: "Uber", image: "/logos/uber.png" },
  { name: "99", image: "/logos/99.png" },
  { name: "Rappi", wordmarkClassName: "text-[#FF441F]" },
  { name: "99Food", image: "/logos/99food.png" },
  { name: "Loggi", image: "/logos/loggi.png" },
  { name: "inDrive", wordmarkClassName: "text-[#2AB24A]" },
  { name: "Zé Delivery", image: "/logos/ze-delivery.png" },
  { name: "Keeta", wordmarkClassName: "text-[#FFC300]" },
  { name: "James Delivery", image: "/logos/james.png" },
  { name: "Bee Delivery", image: "/logos/bee.png" },
];

function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-white shadow-[0_8px_20px_-12px_rgba(26,24,22,0.35)]">
        {platform.image ? (
          <Image
            src={platform.image}
            alt={platform.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <span
            className={`text-sm font-bold leading-tight ${platform.wordmarkClassName ?? "text-ink"}`}
          >
            {platform.name}
          </span>
        )}
      </div>
      <span className="text-center text-xs font-medium text-ink-soft">
        {platform.name}
      </span>
    </div>
  );
}

export function Platforms() {
  return (
    <section className="border-y border-line bg-white py-14">
      <p className="text-center text-sm font-medium text-ink-soft">
        Funciona com as plataformas onde você já trabalha
      </p>

      <div
        className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="list"
        aria-label="Plataformas compatíveis"
      >
        <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused]">
          {[...PLATFORMS, ...PLATFORMS].map((platform, index) => (
            <PlatformBadge key={`${platform.name}-${index}`} platform={platform} />
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-soft">
        Nomes e marcas ilustrativos, usados apenas para representar as
        plataformas mais comuns entre motoristas e entregadores.
      </p>
    </section>
  );
}
