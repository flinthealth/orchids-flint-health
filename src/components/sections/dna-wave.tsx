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
const BAR_COLORS = ['#ede0d4', '#a0522d', '#eeb20b', '#ff7f29'];

// ─── Helix + Pulse layout constants ─────────────────────────────────────────
const PULSE_H      = 200;
const HELIX_H      = 120;
const PULSE_CY     = PULSE_H / 2;
const PBW          = 13;
const PGAP         = 22;

// Bar color by height: short → deep amber, tall → Golden Ray, mid → light golden
function pulseColor(h: number): string {
  if (h >= 130) return '#eeb20b';   // tallest — Golden Ray
  if (h <= 45)  return '#c8850a';   // shortest — deep amber
  return '#f9c946';                 // mid — lighter golden
}
const PULSE_BARS: { h: number; color: string }[] = [
  { h: 160 }, { h:  88 }, { h: 138 }, { h: 155 }, { h:  68 },
  { h: 150 }, { h: 142 }, { h:  18 }, { h:  96 }, { h: 108 },
  { h:  42 }, { h: 148 }, { h: 152 }, { h:  58 }, { h: 145 },
  { h: 128 }, { h:  18 }, { h:  98 }, { h: 138 }, { h:  48 },
  { h: 116 }, { h:  98 }, { h:  38 }, { h: 142 }, { h:  62 },
  { h:  18 }, { h:  78 }, { h:  18 }, { h: 112 }, { h:  72 },
  { h:  28 }, { h:  55 }, { h:  28 }, { h:  88 }, { h: 130 },
  { h:  45 }, { h:  95 }, { h:  35 }, { h:  16 }, { h:  58 },
  { h: 105 }, { h:  42 }, { h:  75 }, { h:  28 }, { h:  50 },
  { h:  18 }, { h:  65 }, { h:  38 }, { h:  85 }, { h:  22 },
].map(b => ({ ...b, color: pulseColor(b.h) }));

function getStroke(color: string): string {
  if (color === '#2b3335') return '#252e31';
  if (color === '#eeb20b') return '#c8850a';
  if (color === '#f9c946') return '#c8850a';
  return '#9a6208'; // deep amber stroke for #c8850a
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
    <div className="bg-[#f9f5ef] w-full overflow-hidden py-8">
      <HelixPulse />
    </div>
  );
}

// ─── Sound wave bar data for OurBeliefSection ────────────────────────────────
const BELIEF_BAR_W       = 7;
const BELIEF_BAR_GAP     = 12;
const BELIEF_BAR_W_DESK  = 9;
const BELIEF_BAR_GAP_DESK = 15;

// Organic voice-note — speech bursts, natural dips, no perfectly even patterns
const BELIEF_BAR_HEIGHTS = [
  20, 36, 58, 82, 106, 124, 118, 96, 70, 48, 28, 20, 24, 40, 64,
  88, 114, 132, 138, 126, 108, 84, 60, 38, 24, 18, 28, 50, 76, 102,
  120, 130, 122, 100, 74, 52, 34, 22, 30, 54, 80, 108, 128, 134, 118,
  94, 68, 44, 26, 20, 32, 56, 84, 112, 130, 136, 120, 96, 70, 46,
  28, 20, 36, 62, 90, 116, 132, 124, 104, 78, 54, 32, 22, 18, 26,
  46, 72, 98, 118, 128, 116, 90, 64, 42, 26, 20, 34, 60, 88, 114,
];

// Colors — blue appears once every 11 bars for subtle sparse accents
const BELIEF_BAR_COLORS = ['#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#eeb20b', '#72a9f7'];

// Heights for blue accent bars — short and varied
const BLUE_BAR_HEIGHTS = [22, 34, 16, 40, 26, 38, 18, 30, 42, 20, 36, 14, 28, 44, 24, 32];

export function BeliefSoundWave() {
  const waveRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1400);

  useEffect(() => {
    const el = waveRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width));
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const isDesktop = containerW >= 768;
  const barW   = isDesktop ? BELIEF_BAR_W_DESK  : BELIEF_BAR_W;
  const barGap = isDesktop ? BELIEF_BAR_GAP_DESK : BELIEF_BAR_GAP;

  // Double the bars so we can loop seamlessly — one full tile = tileW
  const barsPerTile = Math.ceil(containerW / barGap) + 4;
  const tileW       = barsPerTile * barGap;
  const numBars     = barsPerTile * 2; // two tiles side by side
  const totalW      = numBars * barGap + barW;
  const svgH        = 260;
  const cy          = svgH / 2;

  return (
    <div ref={waveRef} className="w-full overflow-hidden pointer-events-none" style={{ height: svgH }} aria-hidden="true">
      <style>{`
        @keyframes beliefWave {
          0%   { transform: scaleY(0.22); }
          20%  { transform: scaleY(1.0);  }
          40%  { transform: scaleY(0.35); }
          60%  { transform: scaleY(0.9);  }
          80%  { transform: scaleY(0.28); }
          100% { transform: scaleY(0.22); }
        }
        @keyframes beliefScroll {
          0%   { transform: translateX(-${tileW}px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
      {/* Scrolling wrapper — moves right by one tile width then loops */}
      <div style={{ animation: 'beliefScroll 70s linear infinite', willChange: 'transform' }}>
        <svg
          width={totalW}
          height={svgH}
          viewBox={`0 0 ${totalW} ${svgH}`}
          style={{ display: 'block' }}
        >
          {Array.from({ length: numBars }, (_, i) => {
            const color = BELIEF_BAR_COLORS[i % BELIEF_BAR_COLORS.length];
            const blueIdx = Math.floor(i / BELIEF_BAR_COLORS.length);
            const h     = color === '#72a9f7' ? BLUE_BAR_HEIGHTS[blueIdx % BLUE_BAR_HEIGHTS.length] : BELIEF_BAR_HEIGHTS[i % BELIEF_BAR_HEIGHTS.length];
            const delay = -(i * 0.18);
            return (
              <rect
                key={i}
                x={i * barGap}
                y={cy - h / 2}
                width={barW}
                height={h}
                rx={barW / 2}
                fill={color}
                stroke="#2b3335"
                strokeWidth={1}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: `beliefWave ${5 + (i % 5) * 0.6}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function OurBeliefSection() {
  return (
    <section className="relative pt-[88px] md:pt-[120px] pb-[32px] overflow-hidden" style={{ background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)' }}>
      {/* Keyframes */}
      <style>{`
        @keyframes beliefFlashlightArc {
          0%   { transform: translate(-300px, -300px); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate(500px, 200px); opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(1200px, -300px); opacity: 0; }
        }
        @keyframes beliefFlashlightMob {
          0%   { transform: translate(-200px, -200px); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate(180px, 180px); opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(420px, -200px); opacity: 0; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gbel'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gbel)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.28, mixBlendMode: 'overlay' }} />

      {/* Flashlight — desktop */}
      <div className="hidden md:block absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(250,193,44,0.28) 0%, rgba(250,193,44,0.18) 12%, rgba(250,193,44,0.10) 25%, rgba(250,193,44,0.055) 38%, rgba(250,193,44,0.025) 52%, rgba(250,193,44,0.010) 65%, rgba(250,193,44,0.003) 78%, rgba(250,193,44,0.001) 88%, transparent 100%)',
          animation: 'beliefFlashlightArc 18s ease-in-out infinite',
          animationDelay: '1s',
        }} />
      </div>

      {/* Flashlight — mobile */}
      <div className="md:hidden absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(250,193,44,0.28) 0%, rgba(250,193,44,0.18) 12%, rgba(250,193,44,0.10) 25%, rgba(250,193,44,0.055) 38%, rgba(250,193,44,0.025) 52%, rgba(250,193,44,0.010) 65%, rgba(250,193,44,0.003) 78%, rgba(250,193,44,0.001) 88%, transparent 100%)',
          animation: 'beliefFlashlightMob 18s ease-in-out infinite',
          animationDelay: '1s',
        }} />
      </div>

      {/* Content above grain */}
      <div className="relative z-10">
      {/* Headline + body */}
      <div className="container mx-auto px-8 text-center mb-4">
        <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">Our Philosophy</p>
        <h2 className="text-[#ffffff] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] max-w-[680px] mx-auto mb-6">
          Information alone doesn't move people <span className="font-serif italic" style={{ color: '#ffffff' }}>to action</span>
        </h2>
        <p className="text-[#ffffff]/70 text-[18px] leading-[1.7] max-w-[560px] mx-auto">
          When science meets the right narrative, one that connects emotionally and lands cognitively, complex becomes clear, distant becomes personal, and information drives action.
        </p>
      </div>

      {/* Pills block */}
      <div className="container mx-auto pl-6 pr-8 md:px-8 pb-10 mt-12">
        <div className="flex flex-col gap-2.5 w-full md:max-w-[520px] md:mx-auto">
          <p className="text-[#ffffff]/70 text-[18px] leading-[1.7] w-full mb-1">
            We achieve this through:
          </p>
          {[
            { adj: 'Quality',   noun: 'Learning Experiences',  },
            { adj: 'Authentic', noun: 'Connection',            },
            { adj: 'Empathic',  noun: 'Listening',            },
            { adj: 'Narrative', noun: 'Storytelling',          },
          ].map(({ adj, noun }, i, arr) => (
            <React.Fragment key={noun}>
              {i > 0 && (
                <div className="w-full" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
              )}
              <div
                className="w-full py-2.5 text-[26px] md:text-[34px] font-light leading-[1.2] tracking-[-0.02em] whitespace-nowrap"
                style={{ color: '#ffffff' }}
              >
                {adj}{' '}
                <span
                  className="font-serif italic px-5 py-1.5 rounded-lg"
                  style={{ backgroundColor: '#54819a', color: '#ffffff' }}
                >{noun}</span>
              </div>
              {i === arr.length - 1 && (
                <div className="w-full" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      </div>

    </section>
  );
}

export default function DNAWaveSection() {
  return (
    <section id="about" className="bg-[#f9f5ef] pt-[80px] md:pt-[100px] pb-0">

      {/* Founder section */}
      <div>

        {/* Headline — above the photo/bio row */}
        <div className="px-8 md:px-14 lg:px-20 pt-2 pb-8 md:pb-10 text-center">
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">Our Philosophy</p>
          <h2 className="text-[#43382f] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] max-w-[640px] mx-auto">
            Information alone doesn&apos;t move people <span className="font-serif italic" style={{ color: '#2b3335' }}>to action</span>
          </h2>
        </div>

        {/* Row 1: Photo + Bio text */}
        <div className="flex flex-col md:flex-row items-stretch bg-[#f9f5ef] overflow-hidden rounded-[24px]">

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
          <div className="flex-1 flex flex-col px-8 md:px-14 lg:px-20 pt-12 pb-12 md:pt-16 md:pb-16 bg-[#f9f5ef]">
            <div className="flex flex-col max-w-[560px]">

              {/* Label */}
              <div className="mb-5 flex flex-col gap-1">
                <span className="text-[#677283] text-[13px] font-semibold tracking-[0.2em] uppercase">Founder</span>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] font-light tracking-[-0.01em] font-serif italic">Jessica Flint</span>
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

              {/* Story paragraphs */}
              <p className="text-[#677283] text-[18px] leading-[1.7] mb-4">
                I&apos;ve spent 12 years at the intersection of healthcare and media, long enough to know what works, what doesn&apos;t, and what&apos;s coming before most people see it.
              </p>
              <p className="text-[#677283] text-[18px] leading-[1.7] mb-4">
                I built a behavioral health media platform from scratch, designing the app, growing a 450+ provider network, and scaling it to 30 million sessions across a global community. The engine behind all of it was narrative media that made people feel something first, understand something second, and act third.
              </p>
              <p className="text-[#677283] text-[18px] leading-[1.7] mb-4">
                What I learned is that the gap between having something vital to communicate and the right people actually receiving it is almost never a knowledge problem. It&apos;s a communication problem.
              </p>
              <p className="text-[#677283] text-[18px] leading-[1.7]">
                That&apos;s what Flint exists to solve. I lead every engagement directly, from strategy through final delivery, backed by a trusted network of producers and editors I&apos;ve worked with for years.
              </p>

            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export function TestimonialSection() {
  return (
    <div style={{ backgroundColor: '#4a5a66' }}>
      <div className="max-w-[1060px] mx-auto px-8 py-12 md:py-16">
        <div className="bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row items-stretch">
          {/* Bio: image + name + logo */}
          <div className="w-full md:w-[240px] flex-shrink-0 flex flex-col items-start p-8 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/testimonial-erin-knopf.jpg"
              alt="Dr. Erin Knopf"
              className="w-full object-contain rounded-[12px]"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#2b3335]">Dr. Erin Knopf</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/testimonial-very-logo.png"
                alt="VERY Health"
                className="object-contain object-left"
                style={{ width: 110, height: 36 }}
              />
            </div>
          </div>
          {/* Divider */}
          <div className="hidden md:block w-px bg-black/08 my-8" />
          {/* Quote */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <blockquote className="text-[18px] leading-[1.7] text-[#2b3335] font-light">
              &ldquo;Thank you for the refresh in our brand and marketing strategy! You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality. Thank you for all of your efforts, patience and direction you provided us.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
