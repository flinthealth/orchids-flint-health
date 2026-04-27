"use client";
import React, { useRef, useState, useEffect } from "react";

function starPath(cx: number, cy: number, outerR: number, innerR: number, points = 5): string {
  const parts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = (cx + r * Math.cos(angle)).toFixed(2);
    const y = (cy + r * Math.sin(angle)).toFixed(2);
    parts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
  }
  return parts.join(" ") + " Z";
}

const VW = 490;
const VH = 780;
const CX = 245;

// Outcomes radiating from the BETTER OUTCOMES circle
const SPOKE_R      = 56;   // matches outcomes node r
const SPOKE_CY     = 558;  // matches outcomes node y
const SPOKE_LEN    = 68;   // px from circle edge to pill edge
const PILL_H       = 30;   // pill height
const PILL_WIDTHS: Record<string, number> = {
  "Engagement": 98, "Adherence": 90, "Retention": 90,
  "Advocacy":   84, "Referrals": 90, "Conversions": 108,
};
const OUTCOME_SPOKES = [
  { label: "Engagement",  angle: 165 },  // far left
  { label: "Adherence",   angle: 140 },  // mid left
  { label: "Retention",   angle: 110 },  // near left — spread wider
  { label: "Advocacy",    angle:  70 },  // near right — spread wider
  { label: "Referrals",   angle:  40 },  // mid right
  { label: "Conversions", angle:  15 },  // far right
];

interface NodeDef {
  id: string;
  label: string[];
  y: number;
  // circle nodes
  r?: number;
  // rounded-rect nodes
  rectW?: number;
  rectH?: number;
  fill: string;
  textColor: string;
  fontSize: number;
  fontWeight: number;
  nodeDelay: number;
  lineDelay?: number;
}

// Helpers to get top/bottom edge of any node shape
const topOf    = (n: NodeDef) => n.r !== undefined ? n.y - n.r : n.y - (n.rectH ?? 0) / 2;
const bottomOf = (n: NodeDef) => n.r !== undefined ? n.y + n.r : n.y + (n.rectH ?? 0) / 2;

const NODES: NodeDef[] = [
  {
    id: "attention",
    label: ["ATTENTION"],
    y: 56, r: 50,
    fill: "#131d2b", textColor: "#fdffd6",
    fontSize: 13, fontWeight: 700,
    nodeDelay: 0,
  },
  {
    id: "understanding",
    label: ["Understanding"],
    y: 178, rectW: 152, rectH: 52,
    fill: "#fee7da", textColor: "#131d2b",
    fontSize: 13, fontWeight: 500,
    nodeDelay: 0.45,
    lineDelay: 0.2,
  },
  {
    id: "trust",
    label: ["Trust"],
    y: 285, r: 42,
    fill: "#f1ab66", textColor: "#131d2b",
    fontSize: 13, fontWeight: 500,
    nodeDelay: 0.85,
    lineDelay: 0.65,
  },
  {
    id: "adoption",
    label: ["Adoption"],
    y: 415, r: 52,
    fill: "#b85f2f", textColor: "#fdffd6",
    fontSize: 14, fontWeight: 800,
    nodeDelay: 1.25,
    lineDelay: 1.05,
  },
  {
    id: "outcomes",
    label: ["BETTER", "OUTCOMES"],
    y: 558, r: 56,
    fill: "#739dd0", textColor: "#fdffd6",
    fontSize: 12, fontWeight: 700,
    nodeDelay: 1.65,
    lineDelay: 1.45,
  },
];

const BULLETS = [
  "Complex science becomes understandable",
  "Clinicians learn and adopt new approaches",
  "Patients build trust in treatment",
  "Teams align around a shared vision",
];

export default function ROIAttentionSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  const connectors = NODES.slice(1).map((node, i) => {
    const prev = NODES[i];
    const y1 = bottomOf(prev);
    const y2 = topOf(node);
    return { y1, y2, length: y2 - y1, delay: node.lineDelay ?? 0 };
  });

  return (
    <section ref={ref} className="bg-white px-6 md:px-8 pt-[90px] pb-[110px]">
      <div className="max-w-[680px] mx-auto text-center">

        {/* Pill */}
        <div className="mb-8" style={fade(0)}>
          <span className="inline-block bg-[#fdffd6] text-[#131d2b] text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#131d2b]">
            The ROI of Attention
          </span>
        </div>

        {/* Headline */}
        <div className="mb-14" style={fade(0.05)}>
          <h2 className="text-[#131d2b] text-[36px] md:text-[50px] font-light leading-[1.15] tracking-[-0.02em]">
            Attention paves the way<br className="hidden md:block" /> to{" "}
            <span className="font-serif italic">adoption</span>
          </h2>
        </div>

        {/* Vertical cascade diagram */}
        <div className="mb-4 overflow-visible -mx-6 md:mx-0" style={fade(0.1)}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full max-w-[540px] mx-auto overflow-visible"
            aria-hidden="true"
          >
            {/* Connector lines */}
            {connectors.map(({ y1, y2, length, delay }, i) => (
              <line
                key={`line-${i}`}
                x1={CX} y1={y1} x2={CX} y2={y2}
                stroke="#131d2b"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                strokeDasharray={length}
                style={{
                  strokeDashoffset: visible ? 0 : length,
                  transition: `stroke-dashoffset 0.4s ease ${delay}s`,
                }}
              />
            ))}

            {/* Outcome spokes — radiate from BETTER OUTCOMES circle */}
            {OUTCOME_SPOKES.map(({ label, angle }, i) => {
              const rad      = (angle * Math.PI) / 180;
              const pw       = PILL_WIDTHS[label] ?? 68;
              const startX   = CX + (SPOKE_R + 2) * Math.cos(rad);
              const startY   = SPOKE_CY + (SPOKE_R + 2) * Math.sin(rad);
              // spoke line ends at pill edge
              const pillCX   = CX + (SPOKE_R + SPOKE_LEN + pw / 2) * Math.cos(rad);
              const pillCY   = SPOKE_CY + (SPOKE_R + SPOKE_LEN + pw / 2) * Math.sin(rad);
              const lineEndX = CX + (SPOKE_R + SPOKE_LEN) * Math.cos(rad);
              const lineEndY = SPOKE_CY + (SPOKE_R + SPOKE_LEN) * Math.sin(rad);
              const spokeLen = Math.sqrt((lineEndX - startX) ** 2 + (lineEndY - startY) ** 2);
              const delay    = 1.9 + i * 0.1;
              return (
                <g key={label} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${delay}s` }}>
                  {/* Spoke line */}
                  <line
                    x1={startX} y1={startY} x2={lineEndX} y2={lineEndY}
                    stroke="#739dd0" strokeWidth="1.2" strokeOpacity="0.5"
                    strokeDasharray={spokeLen}
                    style={{
                      strokeDashoffset: visible ? 0 : spokeLen,
                      transition: `stroke-dashoffset 0.35s ease ${delay}s`,
                    }}
                  />
                  {/* Pill background */}
                  <rect
                    x={pillCX - pw / 2}
                    y={pillCY - PILL_H / 2}
                    width={pw}
                    height={PILL_H}
                    rx={PILL_H / 2}
                    fill="#739dd0"
                  />
                  {/* Pill label */}
                  <text
                    x={pillCX}
                    y={pillCY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fdffd6"
                    fontSize={13}
                    fontWeight={600}
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.03em"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const { id, label, y, r, rectW, rectH, fill, textColor, fontSize, fontWeight, nodeDelay } = node;
              const isRect = rectW !== undefined;
              return (
                <g
                  key={id}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease ${nodeDelay}s`,
                  }}
                >
                  {/* Pulsing rings for Adoption */}
                  {id === "adoption" && visible && (
                    <>
                      <circle cx={CX} cy={y} r={r} fill="none" stroke="#b85f2f" strokeWidth="1.5"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: "roi-pulse 2.2s ease-out 0s infinite" }} />
                      <circle cx={CX} cy={y} r={r} fill="none" stroke="#b85f2f" strokeWidth="1.5"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: "roi-pulse 2.2s ease-out 0.75s infinite" }} />
                      <circle cx={CX} cy={y} r={r} fill="none" stroke="#b85f2f" strokeWidth="1.5"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: "roi-pulse 2.2s ease-out 1.5s infinite" }} />
                    </>
                  )}

                  {/* Shape */}
                  {isRect ? (
                    <rect
                      x={CX - (rectW ?? 0) / 2}
                      y={y - (rectH ?? 0) / 2}
                      width={rectW}
                      height={rectH}
                      rx={(rectH ?? 0) / 2}
                      fill={fill}
                    />
                  ) : (
                    <circle cx={CX} cy={y} r={r} fill={fill} />
                  )}

                  {/* Label */}
                  {label.length === 1 ? (
                    <text
                      x={CX} y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={textColor}
                      fontSize={fontSize}
                      fontWeight={fontWeight}
                      fontFamily="Inter, sans-serif"
                      letterSpacing={id === "attention" ? "0.07em" : "0"}
                    >
                      {label[0]}
                    </text>
                  ) : (
                    <>
                      <text x={CX} y={y - 7} textAnchor="middle" dominantBaseline="middle"
                        fill={textColor} fontSize={fontSize} fontWeight={fontWeight} fontFamily="Inter, sans-serif"
                        letterSpacing={id === "outcomes" ? "0.07em" : "0"}>
                        {label[0]}
                      </text>
                      <text x={CX} y={y + 8} textAnchor="middle" dominantBaseline="middle"
                        fill={textColor} fontSize={fontSize} fontWeight={fontWeight} fontFamily="Inter, sans-serif"
                        letterSpacing={id === "outcomes" ? "0.07em" : "0"}>
                        {label[1]}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Supporting copy */}
        <div className="max-w-[520px] mx-auto">
          <p className="text-[#131d2b]/70 text-[17px] md:text-[18px] font-light leading-[1.7] mb-8" style={fade(1.85)}>
            When people pay attention:
          </p>

          <div className="flex flex-col gap-3 mb-14 text-left" style={fade(2.0)}>
            {BULLETS.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b85f2f] flex-shrink-0 mt-[9px]" />
                <span className="text-[#131d2b]/65 text-[15px] md:text-[16px] leading-[1.6]">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[#131d2b] text-[22px] md:text-[28px] font-light leading-[1.45] tracking-[-0.01em] mt-6" style={fade(2.15)}>
            And innovation gains traction.
          </p>
        </div>

      </div>
    </section>
  );
}
