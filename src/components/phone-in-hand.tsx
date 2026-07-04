import Image from "next/image";

// Single pre-composed shot (hand + phone together, showing the real
// dashboard) — replaces the earlier scroll-pinned phone + separate hand
// images. Swap this file to update the artwork.
const IMAGE_SRC = "/how-it-works/phone-in-hand.png";
const ASPECT = "1170/1400";
const ALT =
  "Mão segurando um celular com o app Plific aberto, mostrando o adiantamento disponível e os ganhos do mês";

// Desktop: overlaid to the side of the text content, bottom-anchored within
// the step-3 section (matches the Figma desktop reference). Must be placed
// in the full-width "relative" wrapper, not the padded max-w-6xl content —
// its position is calculated against the section's full width.
export function PhoneInHandDesktop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
      <div
        className="absolute bottom-0 left-[37%] w-[34%] max-w-[440px]"
        style={{ aspectRatio: ASPECT }}
      >
        <Image
          src={IMAGE_SRC}
          alt={ALT}
          fill
          className="object-contain object-bottom"
          sizes="440px"
        />
      </div>
    </div>
  );
}

// Mobile: normal flow, centered below the checklist/CTA (matches the Figma
// mobile reference). Placed inside the padded content flow.
export function PhoneInHandMobile() {
  return (
    <div className="flex justify-center pb-4 sm:hidden">
      <div
        className="relative w-[78%] max-w-[320px]"
        style={{ aspectRatio: ASPECT }}
      >
        <Image
          src={IMAGE_SRC}
          alt={ALT}
          fill
          className="object-contain"
          sizes="320px"
        />
      </div>
    </div>
  );
}
