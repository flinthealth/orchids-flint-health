"use client";

import { useEffect, useRef, useState } from "react";

const RADIUS = 130;
const STROKE = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SEG = CIRCUMFERENCE / 3; // full 120° arc — no gap
const CANVAS = (RADIUS + STROKE / 2 + 14) * 2;
const C = CANVAS / 2;

function toXY(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arcPath(startDeg: number, endDeg: number, sweep: 0 | 1): string {
  const s = toXY(startDeg, RADIUS);
  const e = toXY(endDeg, RADIUS);
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 0 ${sweep} ${e.x} ${e.y}`;
}

// New layout (clockwise from 12 o'clock):
//   Emotion  : -90° → 30°  (right side, upper)
//   Trust    :  30° → 150° (bottom)
//   Attention: 150° → 270° (left side)
//
// Animation order: Attention first, then Emotion, then Trust

const segments = [
  {
    id: "curiosity",
    label: "Attention",
    stat: "6–7×",
    statRef: "1",
    statUrl: "https://link.springer.com/article/10.3758/BF03332778",
    descriptor:
      "Narratives are recalled six to seven times more than information studied through repetition alone.",
    color: "#eeb20b",
    labelColor: "#a07800",
    arcRotation: 150,
    textStart: 150, textEnd: 270, textSweep: 1 as const,
  },
  {
    id: "emotion",
    label: "Emotion",
    stat: null,
    statLabel: "Oxytocin Effect",
    statRef: "2",
    statUrl: "https://hbr.org/2014/10/why-your-brain-loves-good-storytelling",
    descriptor:
      "Emotionally compelling stories trigger oxytocin, a hormone that drives empathy, connection, and action.",
    color: "#ff7f29",
    arcRotation: -90,
    textStart: -90, textEnd: 30, textSweep: 1 as const,
  },
  {
    id: "trust",
    label: "Trust",
    stat: "61%",
    statRef: "3",
    statUrl: "https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/",
    descriptor:
      "Of listeners feel more favorable toward a brand after a single episode.",
    color: "#54819a",
    arcRotation: 30,
    textStart: 150, textEnd: 30, textSweep: 0 as const,
  },
];

// Gradient junction blends — ±20° arcs centered at each colour transition
// Coordinates computed from C=166, RADIUS=130
const gradientJunctions = [
  { id: "grad-ce", start: -110, end: -70  }, // Attention→Emotion (top)
  { id: "grad-et", start:   10, end:  50  }, // Emotion→Trust (lower-right)
  { id: "grad-tc", start:  130, end: 170  }, // Trust→Attention (lower-left)
];

export default function WhySeriesWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setActive(0);
          setTimeout(() => setActive(1), 600);
          setTimeout(() => setActive(2), 1200);
          setTimeout(() => setComplete(true), 1800);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#f9f5ef" }}
      className="w-full py-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Centered header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5">
            Why Series Work
          </span>
          <h2 className="text-[#43382f] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4">
            Standout with{" "}
            <span className="font-serif italic" style={{ color: "#2b3335" }}>
              strategic storytelling
            </span>
          </h2>
          <p className="text-[#43382f] text-[17px] leading-[1.5] max-w-[420px] md:max-w-[660px] mx-auto">
            In the AI era, emotional resonance and trust protect your position.<br className="hidden md:block" /> A well-produced episodic series builds both.
          </p>
        </div>

        {/* Ring + Text cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">

          {/* SVG Ring */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
            <svg
              width={CANVAS}
              height={CANVAS}
              viewBox={`0 0 ${CANVAS} ${CANVAS}`}
              style={{ maxWidth: "min(100%, 340px)", display: "block" }}
            >
              <defs>
                {segments.map((seg) => (
                  <path
                    key={`tp-${seg.id}`}
                    id={`arc-${seg.id}`}
                    d={arcPath(seg.textStart, seg.textEnd, seg.textSweep)}
                    fill="none"
                  />
                ))}
                {/* Junction gradient fills — C=166, RADIUS=130 */}
                <linearGradient id="grad-ce" gradientUnits="userSpaceOnUse" x1="121.5" y1="43.8" x2="210.5" y2="43.8">
                  <stop offset="0%" stopColor="#eeb20b"/>
                  <stop offset="100%" stopColor="#ff7f29"/>
                </linearGradient>
                <linearGradient id="grad-et" gradientUnits="userSpaceOnUse" x1="294" y1="188.6" x2="249.6" y2="265.6">
                  <stop offset="0%" stopColor="#ff7f29"/>
                  <stop offset="100%" stopColor="#54819a"/>
                </linearGradient>
                <linearGradient id="grad-tc" gradientUnits="userSpaceOnUse" x1="82.4" y1="265.6" x2="38" y2="188.6">
                  <stop offset="0%" stopColor="#54819a"/>
                  <stop offset="100%" stopColor="#eeb20b"/>
                </linearGradient>
              </defs>

              {/* Outer + inner border (black stroke around ring) */}
              <circle
                cx={C} cy={C} r={RADIUS + STROKE / 2}
                fill="none"
                stroke="#2b3335"
                strokeWidth="2"
              />
              <circle
                cx={C} cy={C} r={RADIUS - STROKE / 2}
                fill="none"
                stroke="#2b3335"
                strokeWidth="2"
              />

              {/* Colored segments — butt cap, no gap */}
              {segments.map((seg, i) => {
                const drawn = active >= i;
                const dashArray = `${drawn ? SEG : 0} ${CIRCUMFERENCE - (drawn ? SEG : 0)}`;
                return (
                  <circle
                    key={seg.id}
                    cx={C} cy={C} r={RADIUS}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={STROKE}
                    strokeLinecap="butt"
                    strokeDasharray={dashArray}
                    strokeDashoffset={0}
                    transform={`rotate(${seg.arcRotation} ${C} ${C})`}
                    style={{
                      transition: drawn
                        ? "stroke-dasharray 0.4s cubic-bezier(0.4,0,0.2,1)"
                        : "none",
                    }}
                  />
                );
              })}

              {/* Gradient blends at segment junctions — fade in after ring completes */}
              {gradientJunctions.map((jg) => (
                <path
                  key={jg.id}
                  d={arcPath(jg.start, jg.end, 1)}
                  fill="none"
                  stroke={`url(#${jg.id})`}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                  style={{ opacity: complete ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
                />
              ))}

              {/* Curved labels */}
              {segments.map((seg, i) => (
                <text
                  key={`label-${seg.id}`}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                  fill="#ffffff"
                  letterSpacing="0.1em"
                  style={{
                    opacity: active >= i ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  <textPath
                    href={`#arc-${seg.id}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {seg.label.toUpperCase()}
                  </textPath>
                </text>
              ))}

              {/* Center label */}
              <text x={C} y={C - 15} textAnchor="middle" fontSize="11"
                fontWeight="600" fontFamily="Inter, sans-serif" fill="#677283"
                letterSpacing="0.12em"
                style={{ opacity: complete ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}
              >
                YOUR
              </text>
              <text x={C} y={C + 1} textAnchor="middle" fontSize="11"
                fontWeight="600" fontFamily="Inter, sans-serif" fill="#677283"
                letterSpacing="0.12em"
                style={{ opacity: complete ? 1 : 0, transition: "opacity 0.4s ease 0.35s" }}
              >
                COMPETITIVE
              </text>
              <text x={C} y={C + 17} textAnchor="middle" fontSize="11"
                fontWeight="600" fontFamily="Inter, sans-serif" fill="#677283"
                letterSpacing="0.12em"
                style={{ opacity: complete ? 1 : 0, transition: "opacity 0.4s ease 0.4s" }}
              >
                ADVANTAGE
              </text>
            </svg>
          </div>

          {/* Text cards */}
          <div className="flex flex-col gap-7 flex-1 max-w-md w-full">
            {segments.map((seg, i) => {
              const visible = active >= i;
              return (
                <div
                  key={seg.id}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(20px)",
                    transition: "opacity 0.45s ease, transform 0.45s ease",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: 3, borderRadius: 2, background: seg.color, flexShrink: 0, alignSelf: "stretch" }} />
                  <div>
                    <span
                      className="inline-block text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-2"
                      style={{
                        background: `${seg.color}22`,
                        color: (seg as any).labelColor ?? seg.color,
                        border: `1px solid ${seg.color}55`,
                      }}
                    >
                      {seg.label}
                    </span>
                    {seg.stat && (
                      <p className="text-[#43382f] text-[40px] font-light leading-none tracking-[-0.02em] mb-1">
                        {seg.stat}
                      </p>
                    )}
                    {!seg.stat && (seg as any).statLabel && (
                      <p className="text-[#43382f] text-[13px] font-medium tracking-[0.07em] uppercase mb-1" style={{ fontVariant: 'small-caps' }}>
                        {(seg as any).statLabel}
                      </p>
                    )}
                    <p className="text-[#43382f] text-[16px] leading-[1.5]">
                      {seg.descriptor}
                      <a
                        href={seg.statUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                        style={{ fontSize: 10 }}
                      >
                        {seg.statRef}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
