"use client";

import { useState } from "react";
import { formatBRL } from "@/lib/format";
import { PlatformIcon } from "@/components/platform-icon";

export type TrendPoint = {
  label: string;
  value: number;
};

export type TrendBreakdownItem = {
  id: string;
  name: string;
  logo?: string;
  brandColor?: string;
  value: number;
};

export function TrendChart({
  data,
  activeIndex,
  breakdownByIndex,
}: {
  data: TrendPoint[];
  activeIndex: number;
  breakdownByIndex?: TrendBreakdownItem[][];
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const width = 700;
  const height = 160;
  const padding = 16;
  const totalHeight = height + 22;
  const max = Math.max(...data.map((d) => d.value), 1);
  const stepX = (width - padding * 2) / (data.length - 1);
  const barWidth = stepX * 0.4;

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const ratio = d.value / max;
    const y = height - padding - ratio * (height - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div
      className="relative"
      style={{ aspectRatio: `${width} / ${totalHeight}` }}
    >
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Histórico mensal"
      >
        {points.map((p, i) => {
          const isActive = i === activeIndex;
          const isHovered = i === hoverIndex;
          return (
            <rect
              key={p.label}
              x={p.x - barWidth / 2}
              y={p.y}
              width={barWidth}
              height={Math.max(height - padding - p.y, 2)}
              rx={5}
              className={`transition-colors duration-150 ${
                isActive
                  ? "fill-accent"
                  : isHovered
                    ? "fill-accent/35"
                    : "fill-line"
              }`}
            />
          );
        })}

        <path
          d={linePath}
          fill="none"
          className="stroke-ink-soft/25"
          strokeWidth={1.5}
        />

        {points.map((p, i) => {
          const isActive = i === activeIndex;
          const isHovered = i === hoverIndex;
          const highlighted = isActive || isHovered;
          return (
            <circle
              key={`dot-${p.label}`}
              cx={p.x}
              cy={p.y}
              r={highlighted ? 5 : 2.5}
              className={`transition-all duration-150 ${
                highlighted ? "fill-ink" : "fill-ink-soft/35"
              }`}
            />
          );
        })}

        {points.map((p, i) => (
          <text
            key={`label-${p.label}`}
            x={p.x}
            y={height + 16}
            textAnchor="middle"
            className={
              i === activeIndex
                ? "fill-ink text-[11px] font-semibold"
                : "fill-ink-soft text-[11px]"
            }
          >
            {p.label}
          </text>
        ))}
      </svg>

      <div className="absolute inset-0">
        {points.map((p, i) => {
          const breakdown = breakdownByIndex?.[i];
          const showTooltip = hoverIndex === i;
          return (
            <div
              key={p.label}
              className="absolute inset-y-0"
              style={{
                left: `${(p.x / width) * 100}%`,
                width: `${(stepX / width) * 100}%`,
                transform: "translateX(-50%)",
              }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div
                className={`pointer-events-none absolute left-1/2 z-10 w-max max-w-[220px] origin-bottom -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-3 py-2 text-xs text-paper shadow-lg transition-all duration-150 ${
                  showTooltip ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                style={{ top: `calc(${(p.y / totalHeight) * 100}% - 8px)` }}
              >
                <p className="font-semibold whitespace-nowrap">
                  {p.label} · {formatBRL(p.value)}
                </p>

                {breakdown && breakdown.length > 0 && (
                  <div className="mt-1.5 space-y-1 border-t border-white/15 pt-1.5">
                    {breakdown.map((item) => (
                      <div key={item.id} className="flex items-center gap-1.5">
                        <PlatformIcon platform={item} className="h-4 w-4" />
                        <span className="flex-1 font-normal whitespace-nowrap text-paper/85">
                          {item.name}
                        </span>
                        <span className="font-medium">
                          {formatBRL(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <span className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-ink" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
