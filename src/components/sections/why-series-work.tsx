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
//   Curiosity: 150° → 270° (left side)
//
// Animation order: Curiosity first, then Emotion, then Trust

const segments = [
  {
    id: "curiosity",
    label: "Curiosity",
    descriptor:
      "Clear learning objectives delivered through narrative so compelling your audience doesn't just learn. They come back for more.",
    color: "#eeb20b",
    arcRotation: 150, // left side
    // CW 150°→270° — text flows upward on left side, tops face outward → readable
    textStart: 150, textEnd: 270, textSweep: 1 as const,
  },
  {
    id: "emotion",
    label: "Emotion",
    descriptor:
      "People don't act on information. They act on how it makes them feel. Series create the emotional connection that turns understanding into action.",
    color: "#ff7f29",
    arcRotation: -90, // right / upper-right
    // CW -90°→30° — text flows from top to lower-right
    textStart: -90, textEnd: 30, textSweep: 1 as const,
  },
  {
    id: "trust",
    label: "Trust",
    descriptor:
      "The most valuable thing a healthcare brand can own is an audience that trusts them completely. Series are how you build it.",
    color: "#54819a",
    arcRotation: 30, // bottom
    // CCW 150°→30° through bottom — reads L→R at bottom ✓
    textStart: 150, textEnd: 30, textSweep: 0 as const,
  },
];

// Arrowheads sit at each junction (start of each new arc) pointing clockwise
// Tangent direction at angle θ going CW = θ + 90°
const junctions = [
  { deg: -90,  color: "#eeb20b" }, // base faces Curiosity
  { deg:  30,  color: "#ff7f29" }, // base faces Emotion
  { deg: 150,  color: "#54819a" }, // base faces Trust
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
            The new competitive moat is{" "}
            <span className="font-serif italic" style={{ color: "#2b3335" }}>
              strategic storytelling
            </span>
          </h2>
          <p className="text-[#677283] text-[16px] leading-[1.65] max-w-[560px] mx-auto">
            Create emotional resonance that builds loyalty and trust that compounds over time.
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

              {/* Chevron notches — V-shaped cuts at the START of each segment */}
              {junctions.map((jct, i) => {
                const pos = toXY(jct.deg, RADIUS);
                const tangentDeg = jct.deg + 90;
                // Map junction to animation index
                const aniIndex = [1, 2, 0][i];
                const visible = active >= aniIndex;
                // Chevron: tip points backward (left in local space), open end faces into next segment
                // Shape: V-notch cutting into the leading edge of the segment that follows
                return (
                  <polygon
                    key={`chevron-${jct.deg}`}
                    points="0,-23 22,0 0,23"
                    fill={jct.color}
                    transform={`translate(${pos.x}, ${pos.y}) rotate(${tangentDeg})`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity 0.2s ease 0.35s",
                    }}
                  />
                );
              })}

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
              <text x={C} y={C - 7} textAnchor="middle" fontSize="11"
                fontWeight="600" fontFamily="Inter, sans-serif" fill="#677283"
                letterSpacing="0.12em"
                style={{ opacity: complete ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}
              >
                SERIES
              </text>
              <text x={C} y={C + 9} textAnchor="middle" fontSize="11"
                fontWeight="600" fontFamily="Inter, sans-serif" fill="#677283"
                letterSpacing="0.12em"
                style={{ opacity: complete ? 1 : 0, transition: "opacity 0.4s ease 0.4s" }}
              >
                EFFECT
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
                        color: seg.color,
                        border: `1px solid ${seg.color}55`,
                      }}
                    >
                      {seg.label}
                    </span>
                    <p className="text-[#677283] text-[15px] leading-[1.7]">
                      {seg.descriptor}
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
