"use client";

import React, { useRef, useState, useEffect } from 'react';

const PULSE_H  = 200;
const PULSE_CY = PULSE_H / 2;
const PBW      = 13;
const PGAP     = 22;

// Bars — warm gray only
const C = '#7a6e68';
const PULSE_BARS: { h: number; color: string }[] = [
  { h: 160, color: C },
  { h:  88, color: C },
  { h: 138, color: C },
  { h: 155, color: C },
  { h:  68, color: C },
  { h: 150, color: C },
  { h: 142, color: C },
  { h:  18, color: C },
  { h:  96, color: C },
  { h: 108, color: C },
  { h:  42, color: C },
  { h: 148, color: C },
  { h: 152, color: C },
  { h:  58, color: C },
  { h: 145, color: C },
  { h: 128, color: C },
  { h:  18, color: C },
  { h:  98, color: C },
  { h: 138, color: C },
  { h:  48, color: C },
  { h: 116, color: C },
  { h:  98, color: C },
  { h:  38, color: C },
  { h: 142, color: C },
  { h:  62, color: C },
  { h:  18, color: C },
  { h:  78, color: C },
  { h:  18, color: C },
  { h: 112, color: C },
  { h:  72, color: C },
  { h:  28, color: C },
  { h:  55, color: C },
  { h:  28, color: C },
  { h:  88, color: C },
  { h: 130, color: C },
  { h:  45, color: C },
  { h:  95, color: C },
  { h:  35, color: C },
  { h:  16, color: C },
  { h:  58, color: C },
  { h: 105, color: C },
  { h:  42, color: C },
  { h:  75, color: C },
  { h:  28, color: C },
  { h:  50, color: C },
  { h:  18, color: C },
  { h:  65, color: C },
  { h:  38, color: C },
  { h:  85, color: C },
  { h:  22, color: C },
];

/**
 * SoundPulse — full-width animated audio waveform bars.
 * Drop anywhere; pass `color` to override the default warm gray.
 */
export default function SoundPulse({ color }: { color?: string }) {
  const pulseRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(2000);

  useEffect(() => {
    const el = pulseRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const neededBars  = Math.ceil(containerW / PGAP) + 2;
  const bars        = Array.from({ length: neededBars }, (_, i) => PULSE_BARS[i % PULSE_BARS.length]);
  const totalBarsW  = neededBars * PGAP + PBW;

  return (
    <div className="flex items-center w-full" style={{ height: PULSE_H, gap: 0 }}>
      <style>{`
        @media (max-width: 767px) { .sound-pulse-wrap { transform: scaleY(0.85); transform-origin: center; } }
        @keyframes sound-pulse-wave {
          0%   { transform: scaleY(0.18); }
          25%  { transform: scaleY(1);    }
          50%  { transform: scaleY(0.28); }
          75%  { transform: scaleY(0.82); }
          100% { transform: scaleY(0.18); }
        }
      `}</style>
      <div ref={pulseRef} className="overflow-hidden w-full sound-pulse-wrap" style={{ height: PULSE_H }}>
        <svg
          width={totalBarsW}
          height={PULSE_H}
          viewBox={`0 0 ${totalBarsW} ${PULSE_H}`}
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          {bars.map(({ h, color: barColor }, i) => {
            const fill  = color ?? barColor;
            const delay = -(i * 0.13);
            return (
              <rect
                key={i}
                x={i * PGAP}
                y={PULSE_CY - h / 2}
                width={PBW}
                height={h}
                rx={PBW / 2}
                fill={fill}
                stroke={fill}
                strokeWidth={0}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: `sound-pulse-wave 4.2s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
