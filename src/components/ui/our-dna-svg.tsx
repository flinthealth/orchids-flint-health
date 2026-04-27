"use client";
import React, { useMemo } from 'react';

// ─── Layout ─────────────────────────────────────────────────────────────────
const W         = 1400;
const H         = 280;
const cy        = 140;
const P         = 240;      // helix period
const A         = 56;       // amplitude
const HELIX_END = 560;
const HALF      = P / 2;    // 120 — one crossing segment

// Ribbon sizes (match reference: thick strands with visible border)
const RHW   = 18;           // fill half-width
const RHW_O = 24;           // outline half-width → 6px border each edge

// ─── Colours ────────────────────────────────────────────────────────────────
const S1_FILL    = '#f5c030';  // strand 1: warm golden yellow (illustration art — keep)
const S1_OUTLINE = '#8a5500';  // strand 1 outline: dark golden brown (illustration art — keep)
const S2_FILL    = '#e05e0e';  // strand 2: deep orange (illustration art — keep)
const S2_OUTLINE = '#6b1c04';  // strand 2 outline: dark crimson brown (illustration art — keep)

// Rungs — updated to new warm palette
const RUNG_C  = ['#f9f5ef', '#eeb20b', '#f9f5ef', '#eeb20b', '#f9f5ef', '#eeb20b'];
const RUNG_SP = 17;
const RUNG_W  = 8;

// ─── Waveform bars ──────────────────────────────────────────────────────────
const BAR_W = 19;
const BARS: [number, number, string][] = [
  [569, 200, '#eeb20b'],   // tallest bar — amber gold
  [606, 148, '#eeb20b'],
  [641,  38, '#2b3335'],
  [671,  48, '#6b4b3e'],
  [703,  90, '#eeb20b'],
  [739, 178, '#eeb20b'],
  [777, 148, '#eeb20b'],
  [815,  85, '#f9f5ef'],
  [851,  38, '#2b3335'],
  [885, 162, '#eeb20b'],
  [921, 122, '#eeb20b'],
  [955,  55, '#f9f5ef'],
  [987,  38, '#2b3335'],
  [1019, 108, '#eeb20b'],
  [1055,  66, '#eeb20b'],
  [1091, 152, '#eeb20b'],
  [1125,  96, '#6b4b3e'],
  [1158,  38, '#2b3335'],
  [1189,  82, '#eeb20b'],
  [1225, 128, '#eeb20b'],
  [1259,  56, '#f9f5ef'],
  [1291,  80, '#eeb20b'],
  [1323,  96, '#eeb20b'],
  [1353,  42, '#6b4b3e'],
  [1381,  24, '#eeb20b'],
];
const DOTS = [641, 851, 987, 1158];

// ─── Helpers ────────────────────────────────────────────────────────────────
function sY(x: number, ph: number) {
  return cy + A * Math.sin((2 * Math.PI * x) / P + ph);
}

function rib(ph: number, xS: number, xE: number, hw: number, step = 1): string {
  const pts: [number, number][] = [];
  for (let x = xS; x <= xE; x += step) pts.push([x, sY(x, ph)]);
  if (pts[pts.length - 1][0] < xE) pts.push([xE, sY(xE, ph)]);
  const top = pts.map(([x, y], idx) =>
    `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${Math.max(0, y - hw).toFixed(2)}`
  );
  const bot = [...pts].reverse().map(([x, y]) =>
    `L${x.toFixed(1)},${Math.min(H, y + hw).toFixed(2)}`
  );
  return `${top.join(' ')} ${bot.join(' ')} Z`;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function OurDNASvg() {

  const segs = useMemo(() => {
    const r: { xS: number; xE: number; s1Front: boolean }[] = [];
    for (let i = 0; ; i++) {
      const xS = i * HALF;
      if (xS >= HELIX_END) break;
      r.push({ xS, xE: Math.min((i + 1) * HALF, HELIX_END), s1Front: i % 2 === 0 });
    }
    return r;
  }, []);

  const segPaths = useMemo(() => segs.map(({ xS, xE }) => ({
    s1o: rib(0,       xS, xE, RHW_O),
    s1f: rib(0,       xS, xE, RHW),
    s2o: rib(Math.PI, xS, xE, RHW_O),
    s2f: rib(Math.PI, xS, xE, RHW),
  })), [segs]);

  const rungs = useMemo(() => {
    const r: { x: number; y1: number; y2: number; color: string; seg: number }[] = [];
    for (let x = RUNG_SP / 2; x < HELIX_END; x += RUNG_SP) {
      const ya = sY(x, 0);
      const yb = sY(x, Math.PI);
      const yTop = Math.min(ya, yb) + RHW + 2;
      const yBot = Math.max(ya, yb) - RHW - 2;
      if (yBot > yTop + 4) {
        r.push({
          x, y1: yTop, y2: yBot,
          color: RUNG_C[Math.floor(x / RUNG_SP) % RUNG_C.length],
          seg: Math.floor(x / HALF),
        });
      }
    }
    return r;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      {/* ── Waveform center line ─────────────────────────────────────────── */}
      <line
        x1={HELIX_END} y1={cy} x2={W} y2={cy}
        stroke="#a07840" strokeWidth="1.5" opacity="0.45"
      />

      {/* ── Waveform bars ───────────────────────────────────────────────── */}
      {BARS.map(([x, h, color]) => (
        <rect
          key={`b${x}`}
          x={x - BAR_W / 2} y={cy - h / 2}
          width={BAR_W} height={h} rx={BAR_W / 2}
          fill={color}
          stroke={
            color === '#f9f5ef' ? '#e8e0d8'
            : color === '#eeb20b' ? '#e0a81e'
            : 'none'
          }
          strokeWidth={color === '#f9f5ef' || color === '#eeb20b' ? 1.5 : 0}
        />
      ))}

      {/* ── Waveform dots ───────────────────────────────────────────────── */}
      {DOTS.map(x => (
        <circle key={`d${x}`} cx={x} cy={cy} r={7} fill="#2b3335" />
      ))}

      {/* ── DNA helix ───────────────────────────────────────────────────── */}
      {segs.map(({ s1Front }, i) => {
        const { s1o, s1f, s2o, s2f } = segPaths[i];
        const segRungs = rungs.filter(r => r.seg === i);

        const strand1 = (
          <g key="s1">
            <path d={s1o} fill={S1_OUTLINE} />
            <path d={s1f} fill={S1_FILL} />
          </g>
        );
        const strand2 = (
          <g key="s2">
            <path d={s2o} fill={S2_OUTLINE} />
            <path d={s2f} fill={S2_FILL} />
          </g>
        );
        const rungEls = segRungs.map((r, j) => (
          <line
            key={`r${i}${j}`}
            x1={r.x} y1={r.y1} x2={r.x} y2={r.y2}
            stroke={r.color} strokeWidth={RUNG_W} strokeLinecap="round"
          />
        ));

        return (
          <g key={`seg${i}`}>
            {s1Front
              ? <>{strand2}{rungEls}{strand1}</>
              : <>{strand1}{rungEls}{strand2}</>
            }
          </g>
        );
      })}
    </svg>
  );
}
