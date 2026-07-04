import type { PlatformAccount } from "@/lib/accounts-data";

export function PlatformIcon({
  platform,
  className = "h-9 w-9",
}: {
  platform: Pick<PlatformAccount, "name" | "logo" | "brandColor">;
  className?: string;
}) {
  if (platform.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={platform.logo}
        alt=""
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      className={`${className} flex shrink-0 items-center justify-center rounded-full text-xs font-bold text-white`}
      style={{ backgroundColor: platform.brandColor }}
    >
      {platform.name.slice(0, 2)}
    </span>
  );
}
