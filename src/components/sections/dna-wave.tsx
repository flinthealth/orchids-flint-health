"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import OurDNASvg from '@/components/ui/our-dna-svg';

const HEIGHT = 180;
const CY = HEIGHT / 2;
const PERIOD = 200;   // pixels per full DNA cycle
const AMP = 52;       // strand amplitude
const BAR_GAP = 30;   // spacing between bar centers
const BAR_W = 11;
const NUM_BARS = 44;
const START_X = 20;
const TOTAL_W = START_X + NUM_BARS * BAR_GAP + START_X;

// Natural-looking waveform heights
const BAR_HEIGHTS = [
  30, 58, 42, 80, 52, 92, 36, 74, 62, 96,
  46, 70, 28, 84, 56, 76, 40, 66, 50, 90,
  32, 72, 44, 86, 38, 60, 54, 82, 34, 94,
  48, 64, 30, 78, 52, 88, 42, 68, 46, 80,
  36, 72, 28, 90,
];

function buildStrand(phase: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= TOTAL_W; x += 3) {
    const y = Math.round((CY + AMP * Math.sin((2 * Math.PI * x) / PERIOD + phase)) * 1000) / 1000;
    pts.push(x === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return pts.join(' ');
}

// Bar colors cycle — cream, rusty red, blue, orange (sparse)
const BAR_COLORS = ['#ede0d4', '#a0522d', '#ffde5f', '#ff7f29'];

// ─── Helix + Pulse layout constants ─────────────────────────────────────────
const PULSE_H      = 200;
const HELIX_H      = 120;
const PULSE_CY     = PULSE_H / 2;
const PBW          = 13;
const PGAP         = 22;

// Bars — warm gray only
const D = '#7a6e68';
const L = '#7a6e68';
const PULSE_BARS: { h: number; color: string }[] = [
  { h: 160, color: D },
  { h:  88, color: L },
  { h: 138, color: D },
  { h: 155, color: L },
  { h:  68, color: D },
  { h: 150, color: L },
  { h: 142, color: D },
  { h:  18, color: L },
  { h:  96, color: D },
  { h: 108, color: L },
  { h:  42, color: D },
  { h: 148, color: L },
  { h: 152, color: D },
  { h:  58, color: L },
  { h: 145, color: D },
  { h: 128, color: L },
  { h:  18, color: D },
  { h:  98, color: L },
  { h: 138, color: D },
  { h:  48, color: L },
  { h: 116, color: D },
  { h:  98, color: L },
  { h:  38, color: D },
  { h: 142, color: L },
  { h:  62, color: D },
  { h:  18, color: L },
  { h:  78, color: D },
  { h:  18, color: L },
  { h: 112, color: D },
  { h:  72, color: L },
  { h:  28, color: D },
  { h:  55, color: L },
  { h:  28, color: D },
  { h:  88, color: L },
  { h: 130, color: D },
  { h:  45, color: L },
  { h:  95, color: D },
  { h:  35, color: L },
  { h:  16, color: D },
  { h:  58, color: L },
  { h: 105, color: D },
  { h:  42, color: L },
  { h:  75, color: D },
  { h:  28, color: L },
  { h:  50, color: D },
  { h:  18, color: L },
  { h:  65, color: D },
  { h:  38, color: L },
  { h:  85, color: D },
  { h:  22, color: L },
];

function getStroke(color: string): string {
  return color === '#31393c' ? '#252e31' : '#605650';
}

function HelixPulse() {
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

  const neededBars = Math.ceil(containerW / PGAP) + 2;
  const bars = Array.from({ length: neededBars }, (_, i) => PULSE_BARS[i % PULSE_BARS.length]);
  const totalBarsW = neededBars * PGAP + PBW;

  return (
    <div className="flex items-center w-full" style={{ height: PULSE_H, gap: 0 }}>
      <style>{`
        @media (max-width: 767px) { .pulse-bars-wrap { transform: scaleY(0.85); transform-origin: center; } }
        @keyframes audio-wave {
          0%   { transform: scaleY(0.18); }
          25%  { transform: scaleY(1);    }
          50%  { transform: scaleY(0.28); }
          75%  { transform: scaleY(0.82); }
          100% { transform: scaleY(0.18); }
        }
      `}</style>
      <div ref={pulseRef} className="overflow-hidden w-full pulse-bars-wrap" style={{ height: PULSE_H }}>
        <svg
          width={totalBarsW}
          height={PULSE_H}
          viewBox={`0 0 ${totalBarsW} ${PULSE_H}`}
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          {bars.map(({ h, color }, i) => {
            const DURATION = 4.2;
            const PHASE_STEP = 0.13;
            const delay = -(i * PHASE_STEP);
            return (
              <rect
                key={i}
                x={i * PGAP}
                y={PULSE_CY - h / 2}
                width={PBW}
                height={h}
                rx={PBW / 2}
                fill={color}
                stroke={getStroke(color)}
                strokeWidth={1}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: `audio-wave ${DURATION}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function DNAPulseOnly() {
  return (
    <div className="bg-white w-full overflow-hidden py-8">
      <HelixPulse />
    </div>
  );
}

export function OurBeliefSection() {
  return (
    <section className="bg-[#f7f3ef] pt-[88px] md:pt-[120px] pb-[80px]">

      {/* Headline + body */}
      <div className="container mx-auto px-8 text-center mb-10">
        <h2 className="text-[#1a1a1a] text-[40px] md:text-[52px] font-light leading-[1.15] tracking-[-0.02em] max-w-[680px] mx-auto mb-6">
          We believe information alone doesn't <span className="font-serif italic">move people</span>
        </h2>
        <p className="text-[#6b6560] text-[17px] md:text-[18px] leading-[1.7] max-w-[560px] mx-auto mb-4">
          When science meets the right narrative, one that connects emotionally and lands cognitively, complex becomes clear, distant becomes personal, and information drives action.
        </p>
      </div>

      {/* Pills */}
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center gap-2.5 w-full md:max-w-[520px] mx-auto">
          <p className="text-[#6b6560] text-[17px] md:text-[18px] leading-[1.7] w-full mb-1">
            We achieve this through:
          </p>
          {[
            { adj: 'Empathic',  noun: 'Listening',             bg: '#c8621e', text: '#ffffff' },
            { adj: 'Narrative', noun: 'Storytelling',           bg: '#c8621e', text: '#ffffff' },
            { adj: 'Quality',   noun: 'Learning Experiences',   bg: '#c8621e', text: '#ffffff' },
            { adj: 'Authentic', noun: 'Connection',              bg: '#c8621e', text: '#ffffff' },
          ].map(({ adj, noun, bg, text }) => (
            <div
              key={noun}
              className="w-full rounded-xl px-7 py-3.5 text-[22px] md:text-[34px] font-light leading-[1.15] tracking-[-0.02em]"
              style={{ backgroundColor: bg, color: text }}
            >
              {adj} <span className="font-serif italic">{noun}</span>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}

export default function DNAWaveSection() {
  return (
    <section id="about" className="bg-white pt-[88px] md:pt-[80px] pb-[80px]">

      {/* Founder section */}
      <div>

        {/* Row 1: Photo + Bio text */}
        <div className="flex flex-col md:flex-row items-stretch bg-white overflow-hidden rounded-[24px]">

          {/* Photo */}
          <div className="w-full md:w-[42%] flex-shrink-0 p-4 md:p-6 md:pb-6 md:self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jessica-flint-office.jpg"
              alt="Jessica Flint, Founder"
              className="w-full object-cover object-[center_20%] rounded-[16px]"
              style={{ display: 'block', aspectRatio: '3/4', maxHeight: '560px' }}
            />
          </div>

          {/* Bio content */}
          <div className="flex-1 flex flex-col px-8 md:px-14 lg:px-20 pt-12 pb-12 md:pt-16 md:pb-16 bg-white">
            <div className="flex flex-col max-w-[560px]">

              {/* Label */}
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-[#6b6560] text-[10px] font-semibold tracking-[0.25em] uppercase">Founder</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#1a1a1a] text-[18px] font-light tracking-[-0.01em] font-serif italic">Jessica Flint</span>
                  <a
                    href="https://www.linkedin.com/in/jessicahflint/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-[#0a66c2] hover:text-[#004182] transition-colors"
                    aria-label="Jessica Flint on LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-[#1a1a1a] text-[28px] md:text-[34px] font-light leading-[1.2] tracking-[-0.02em] mb-6">
                Built on a career of making complex ideas <span className="font-serif italic">clear and compelling.</span>
              </h2>

              {/* Story paragraphs */}
              <p className="text-[#6b6560] text-[17px] md:text-[18px] leading-[1.7] mb-4">
                I began my career in graduate school, teaching science to non-scientists — learning that the gap between knowing something and truly understanding it is almost always a communication problem, not an intelligence problem.
              </p>
              <p className="text-[#6b6560] text-[17px] md:text-[18px] leading-[1.7] mb-4">
                That insight led me to build a digital health platform that reached 500K downloads and 30M+ platform sessions. The community that grew around it was fueled by podcasts — and proved that narrative media could change how people engage with even the hardest health topics. Flint exists to bring that to healthcare organizations.
              </p>
              <p className="text-[#6b6560] text-[17px] md:text-[18px] leading-[1.7] mb-4">
                Today I lead every client engagement directly — partnering with your team&apos;s clinical expertise and a trusted network of producers and editors to bring each series to life.
              </p>
              <p className="text-[#1a1a1a] text-[17px] md:text-[18px] font-medium leading-[1.7]">
                This approach has delivered measurable impact at scale.
              </p>

            </div>
          </div>
        </div>

        {/* Row 2: Proven Impact */}
        <div>
          <div className="px-8 md:px-14 lg:px-20 pt-10 pb-14" style={{ backgroundColor: '#31393c' }}>
            <p className="text-white/40 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8">
              Proven impact
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: 'Scale',      value: '30M+', label: 'app + website sessions',               accent: '#6290c9', textOnAccent: '#ffffff' },
                { category: 'Reach',      value: '3M+',  label: 'podcast downloads',                    accent: '#6290c9', textOnAccent: '#ffffff' },
                { category: 'Adoption',   value: '420+', label: 'providers onboarded to a treatment network', accent: '#6290c9', textOnAccent: '#ffffff' },
                { category: 'Conversion', value: '257%', label: 'lift in treatment inquiries',           accent: '#6290c9', textOnAccent: '#ffffff' },
              ].map(({ category, value, label, accent, textOnAccent }) => (
                <div key={category} className="flex flex-col gap-4 px-6 py-6" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                  <span
                    className="self-start text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                    style={{ backgroundColor: accent, color: textOnAccent }}
                  >
                    {category}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-light leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(48px, 5vw, 64px)' }}>
                      {value}
                    </span>
                    <span className="text-white/50 text-[13px] leading-snug">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
