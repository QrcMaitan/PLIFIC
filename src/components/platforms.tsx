type Platform = {
  name: string;
  image: string;
  /** Image has no built-in circle/shadow and needs the badge wrapper. */
  wrapped?: boolean;
  x: number;
  y: number;
  size: number;
};

// Positions are laid out on a fixed horizontal step (item + 38px gap) so the
// tile edges line up seamlessly when looped — no dead space at the seam.
const TILE_WIDTH = 1650;
const TILE_HEIGHT = 390;

const PLATFORMS: Platform[] = [
  { name: "Loggi", image: "/logos/marquee/loggi.svg", x: 0, y: 20, size: 92 },
  { name: "Zé Delivery", image: "/logos/marquee/ze-delivery.svg", x: 130, y: 230, size: 90 },
  { name: "99", image: "/logos/marquee/99.svg", x: 258, y: 0, size: 123 },
  { name: "Keeta", image: "/logos/marquee/keeta.svg", wrapped: true, x: 419, y: 255, size: 114 },
  { name: "iFood", image: "/logos/marquee/ifood.svg", x: 571, y: 35, size: 114 },
  { name: "Uber Eats", image: "/logos/marquee/ubereats.svg", wrapped: true, x: 723, y: 245, size: 110 },
  { name: "Uber", image: "/logos/marquee/uber.svg", x: 871, y: 10, size: 145 },
  { name: "inDrive", image: "/logos/marquee/indrive.svg", wrapped: true, x: 1054, y: 270, size: 95 },
  { name: "99Food", image: "/logos/marquee/99food.svg", x: 1187, y: 25, size: 117 },
  { name: "James Delivery", image: "/logos/marquee/james.svg", x: 1342, y: 235, size: 140 },
  { name: "Bee Delivery", image: "/logos/marquee/bee.svg", x: 1520, y: 15, size: 92 },
];

function PlatformBadge({ platform }: { platform: Platform }) {
  const style = {
    left: platform.x,
    top: platform.y,
    width: platform.size,
    height: platform.size,
  };

  if (!platform.wrapped) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={platform.image}
        alt={platform.name}
        title={platform.name}
        className="absolute"
        style={style}
      />
    );
  }

  return (
    <div
      className="absolute flex items-center justify-center rounded-full border border-line bg-white shadow-[0_8px_20px_-12px_rgba(26,24,22,0.35)]"
      style={style}
      title={platform.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={platform.image} alt={platform.name} className="w-3/5" />
    </div>
  );
}

function PlatformTile() {
  return (
    <div
      className="relative shrink-0"
      style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}
    >
      {PLATFORMS.map((platform) => (
        <PlatformBadge key={platform.name} platform={platform} />
      ))}
    </div>
  );
}

export function Platforms() {
  return (
    <section className="bg-[#F5F5F5] py-8">
      <div
        className="group h-[125px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:h-[176px] lg:h-[234px]"
        role="list"
        aria-label="Plataformas compatíveis"
      >
        <div className="flex w-max origin-top-left scale-[0.32] sm:scale-[0.45] lg:scale-[0.6]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <PlatformTile />
            <PlatformTile />
          </div>
        </div>
      </div>
    </section>
  );
}
