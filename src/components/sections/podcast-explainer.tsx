"use client";

import React, { useState, useRef, useEffect } from 'react';
// ─── Animated completion ring for 80% card ────────────────────────────────────
const VB = 200; // viewBox coordinate space
const VB_CX = VB / 2;
const VB_R = 56;
const VB_STROKE = 10;
const VB_C = 2 * Math.PI * VB_R;

function CompletionRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setPct(Math.round(eased * 80));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { run(); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    const timer = setTimeout(run, 800);
    return () => { obs.disconnect(); clearTimeout(timer); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const offset = VB_C - (pct / 100) * VB_C;

  return (
    <div ref={ref} className="flex-1 flex items-center justify-center min-h-0">
      <div className="relative w-full" style={{ maxWidth: '100%', aspectRatio: '1' }}>
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          width="100%" height="100%"
          style={{ transform: 'rotate(-90deg)', display: 'block' }}
        >
          <circle cx={VB_CX} cy={VB_CX} r={VB_R} fill="none" stroke="rgba(49,57,60,0.15)" strokeWidth={VB_STROKE} />
          <circle cx={VB_CX} cy={VB_CX} r={VB_R} fill="none" stroke="#31393c" strokeWidth={VB_STROKE}
            strokeLinecap="round" strokeDasharray={VB_C} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#31393c] font-light leading-none tracking-[-0.03em]" style={{ fontSize: 'clamp(36px, 12cqw, 66px)' }}>{pct}%</span>
          <span className="text-[#31393c]/50 font-semibold tracking-[0.1em] uppercase mt-1" style={{ fontSize: 'clamp(8px, 2cqw, 11px)' }}>complete</span>
        </div>
      </div>
    </div>
  );
}

// ─── Sentiment gauge for 61% Trust Lift card ─────────────────────────────────
function TrustGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [pct, setPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 61));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  // Gauge arc: semicircle from 180° to 0° (left to right)
  // pct 0 = far left (180°), pct 100 = far right (0°)
  const W = 200;
  const CX = W / 2;
  const CY = W / 2 + 10; // push center down so arc is at bottom
  const R = 78;
  const STROKE = 12;
  const FULL_ARC = Math.PI; // 180° semicircle
  const ARC_C = R * FULL_ARC;

  // needle angle: 0% = 180°, 100% = 0° (in standard math, 180deg left, 0deg right)
  const needleAngle = 180 - (pct / 100) * 180; // degrees from positive x-axis
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLen = R - 8;
  const nx = CX + needleLen * Math.cos(needleRad) * -1; // flip x for svg coords
  const ny = CY - needleLen * Math.sin(needleRad);

  // Arc fill: stroke-dasharray trick on a semicircle path
  const filledArc = (pct / 100) * ARC_C;
  const dashArray = `${filledArc} ${ARC_C}`;

  // Background arc path (semicircle, left to right, bottom-up)
  const arcPath = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  return (
    <div ref={ref} className="flex-1 flex flex-col items-center justify-center min-h-0 py-2">
      <div className="relative" style={{ width: W, height: W / 2 + 24 }}>
        <svg width={W} height={W / 2 + 24} viewBox={`0 0 ${W} ${W / 2 + 24}`}>
          {/* Track */}
          <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={STROKE} strokeLinecap="round" />
          {/* Fill */}
          <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={0}
          />
          {/* Needle */}
          <line
            x1={CX} y1={CY}
            x2={nx} y2={ny}
            stroke="#fac12c" strokeWidth="3" strokeLinecap="round"
            style={{ transition: 'all 0.05s linear' }}
          />
          {/* Pivot dot */}
          <circle cx={CX} cy={CY} r="5" fill="#fac12c" />
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
          <span className="text-[#ffffff]/40 text-[9px] font-semibold uppercase tracking-wide">Skeptical</span>
          <span className="text-[#ffffff]/40 text-[9px] font-semibold uppercase tracking-wide">Trusted</span>
        </div>

        {/* Pct readout below needle pivot */}
        <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: 20 }}>
          <span className="text-[#ffffff] text-[22px] font-light tracking-[-0.03em]">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Animated ring stats ──────────────────────────────────────────────────────
const StatIconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const StatIconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const StatIconHeadphones = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const StatIconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const RING_STATS = [
  { value: 61, label: 'Brand Favorability',  sub: 'of listeners report a more positive view of the brand',          color: '#f7f3ef', Icon: StatIconHeart     },
  { value: 75, label: 'Deep Attention',       sub: 'agree the content keeps their attention for the entire episode', color: '#ffde5f', Icon: StatIconEye        },
  { value: 77, label: 'Daily Integration',    sub: 'engage while multitasking — commuting, exercising, or working',  color: '#fac12c', Icon: StatIconHeadphones },
  { value: 88, label: 'Niche Success',        sub: 'relevance among listeners in B2B podcast audiences',             color: '#ffffff', Icon: StatIconTarget     },
];

const R = 52;
const STROKE = 7;
const CIRCUMFERENCE = 2 * Math.PI * R;

function RingStat({ value, label, sub, color, animate, Icon }: { value: number; label: string; sub: string; color: string; animate: boolean; Icon: () => React.JSX.Element }) {
  const [displayed, setDisplayed] = useState(0);
  const [offset, setOffset]       = useState(CIRCUMFERENCE);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1200;

  useEffect(() => {
    if (!animate) return;
    startRef.current = null;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * value));
      setOffset(CIRCUMFERENCE - eased * (value / 100) * CIRCUMFERENCE);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate, value]);

  const cx = R + STROKE;
  const cy = R + STROKE;
  const size = (R + STROKE) * 2;

  return (
    <div className="flex items-center gap-5 p-4 rounded-2xl" style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}>
      {/* Ring */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={STROKE} />
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={color} strokeWidth={STROKE}
            strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
            style={{ transition: animate ? 'none' : undefined }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#ffffff] text-[22px] font-light leading-none tracking-[-0.03em]">{displayed}%</span>
        </div>
      </div>
      {/* Text + icon */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-0.5" style={{ color }}>
          <Icon />
          <p className="text-[15px] font-semibold" style={{ color: '#ffffff' }}>{label}</p>
        </div>
        <p className="text-[13px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</p>
      </div>
    </div>
  );
}

function RingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
      {RING_STATS.map((s) => (
        <RingStat key={s.label} {...s} animate={fired} />
      ))}
    </div>
  );
}

// ─── Minimal SVG icons ────────────────────────────────────────────────────────
const IconHeadphones = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18v-5a10 10 0 0 1 20 0v5" />
    <rect x="2" y="17" width="5" height="7" rx="2.5" />
    <rect x="21" y="17" width="5" height="7" rx="2.5" />
  </svg>
);
const IconSearch = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <line x1="18.5" y1="18.5" x2="25" y2="25" />
  </svg>
);
const IconTrendUp = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,20 10,12 16,16 25,6" />
    <polyline points="18,6 25,6 25,13" />
  </svg>
);
const IconVideo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="18" height="14" rx="2" />
    <polyline points="20,11 26,8 26,20 20,17" />
  </svg>
);
const IconPerson = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="9" r="5" />
    <path d="M4 25c0-5.523 4.477-10 10-10s10 4.477 10 10" />
  </svg>
);

// ─── Timeline data ────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2004', Icon: IconHeadphones, label: 'The name is coined',         detail: '"Pod" + "broadcast" — built for iPods and MP3 players. A niche format for early adopters.' },
  { year: '2014', Icon: IconSearch,     label: 'Serial changes everything',  detail: 'True crime goes mainstream. Podcasting earns cultural credibility and a new wave of listeners.' },
  { year: '2020', Icon: IconTrendUp,    label: 'The great audio boom',       detail: 'COVID lockdowns drive a 40% surge in listenership. Brands, celebrities, and healthcare orgs flood in.' },
  { year: '2023', Icon: IconVideo,      label: 'Video takes over',           detail: 'YouTube surpasses Spotify and Apple as the #1 platform where people discover and watch podcasts. The medium is no longer just audio.' },
  { year: 'Now',  Icon: IconPerson,     label: 'Half a billion listeners',   detail: 'Podcast ad spend tops $4B annually. The format outgrew its name years ago.' },
];

// ─── Scroll-locked sticky timeline ───────────────────────────────────────────
// The outer runway div is N×100vh tall. The inner panel is sticky at top:0 so
// it stays in view the whole time. Progress 0→1 drives the line and activations.
const ITEM_COUNT = TIMELINE.length;
const RUNWAY_VH  = 120; // vh of scroll runway per item

function AnimatedTimeline() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–1 across full runway

  useEffect(() => {
    const onScroll = () => {
      const el = runwayRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      // progress 0 when top of runway hits top of viewport,
      // progress 1 when bottom of runway hits bottom of viewport
      const scrolled = -top;
      const scrollable = height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Each item activates when progress passes its threshold
  const itemThreshold = (i: number) => i / ITEM_COUNT;
  // Line grows from first dot toward last dot only — stops at last dot (threshold (N-1)/N)
  // Map progress [0 → (N-1)/N] → lineScale [0 → 1]
  const lastThreshold = (ITEM_COUNT - 1) / ITEM_COUNT;
  const lineScale = Math.min(1, Math.max(0, progress / lastThreshold));

  return (
    <div
      ref={runwayRef}
      style={{ height: `${ITEM_COUNT * RUNWAY_VH}vh` }}
      className="max-w-[680px] mx-auto mb-24"
    >
      {/* Sticky panel */}
      <div className="sticky top-0 pt-2 pb-8" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p className="text-[#31393c]/40 text-[11px] font-semibold tracking-[0.2em] uppercase mb-8">A brief history</p>

        <div className="relative">
          {/* Only the animated fill line — no ghost track */}
          <div
            className="absolute w-[2px]"
            style={{
              left: 7,
              top: 22,
              height: 'calc(100% - 44px)',
              backgroundColor: '#31393c',
              opacity: 0.35,
              transformOrigin: 'top',
              transform: `scaleY(${lineScale})`,
            }}
          />

          {TIMELINE.map(({ year, Icon, label, detail }, i) => {
            const color    = ACCENT_COLORS[i];
            const darkText = i === 0 || i === 3;
            const active   = progress >= itemThreshold(i);

            return (
              <div key={year} className="flex items-start gap-6 mb-9 relative">
                {/* Dot */}
                <div className="flex-shrink-0" style={{ width: 16, marginTop: 20, position: 'relative', zIndex: 2 }}>
                  <div
                    className="w-[16px] h-[16px] rounded-full"
                    style={{
                      backgroundColor: '#ffffff',
                      border: `2px solid ${active ? 'rgba(49,57,60,0.55)' : 'rgba(49,57,60,0.15)'}`,
                      transform: active ? 'scale(1.25)' : 'scale(0.8)',
                      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease',
                      boxShadow: active ? '0 0 0 4px rgba(49,57,60,0.07)' : 'none',
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex gap-4 items-start flex-1 bg-white rounded-2xl px-5 py-4"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: '0 2px 16px rgba(49,57,60,0.06)',
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="flex-shrink-0 w-[56px] h-[56px] rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1.5px solid rgba(49,57,60,0.1)',
                      color: '#31393c',
                    }}
                  >
                    <Icon />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <span
                      className="inline-block text-[11px] font-semibold tracking-[0.06em] px-3 py-1 rounded-full whitespace-nowrap mb-1.5 border border-[#31393c]"
                      style={{ backgroundColor: '#e09a18', color: '#31393c' }}
                    >
                      {year}
                    </span>
                    <p className="text-[#31393c] text-[15px] font-medium leading-snug mb-0.5">{label}</p>
                    <p className="text-[#31393c]/50 text-[13px] leading-[1.65]">{detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  { stat: '6–7×',  label: 'more likely to recall a brand',        detail: 'Information woven into a narrative is recalled six to seven times more than information studied through repetition alone — meaning your message doesn\'t just land, it sticks.' },
  { stat: '80%',   label: 'listen to most or all of an episode',  detail: 'No skipping, no scrolling. Listeners opt in and stay — giving you their full, undivided attention.' },
  { stat: 'Trust', label: 'at scale through real voices',         detail: "A host's credibility transfers to your brand. Healthcare audiences trust experts they've listened to for hours." },
  { stat: 'SEO',   label: 'that compounds over time',             detail: 'Every episode generates transcripts, show notes, and indexed content that keeps driving traffic long after publishing.' },
  { stat: 'Reach', label: 'across the care continuum',            detail: 'One show can speak to patients, clinicians, and advocates simultaneously — each finding their own meaning.' },
  { stat: '3×',    label: 'higher engagement than social',        detail: 'Audio content drives deeper emotional connection and longer time-with-brand than any social format.' },
];

const EcoMic      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
const EcoDoc      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
const EcoScissors = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>;
const EcoPhone    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const EcoMail     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const EcoVideo    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><polyline points="17,10 22,7 22,17 17,14"/></svg>;
const EcoSearch   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>;
const EcoUsers    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const ECOSYSTEM = [
  { Icon: EcoMic,      label: 'The episode' },
  { Icon: EcoDoc,      label: 'Show notes & SEO' },
  { Icon: EcoScissors, label: 'Short-form clips' },
  { Icon: EcoPhone,    label: 'Social content' },
  { Icon: EcoMail,     label: 'Email sequences' },
  { Icon: EcoVideo,    label: 'Video repurposing' },
  { Icon: EcoSearch,   label: 'Search discovery' },
  { Icon: EcoUsers,    label: 'Community touchpoints' },
];

const ACCENT_COLORS = ['#ffde5f', '#6b4b3e', '#31393c', '#ffde5f', '#31393c'];

// ─── Concentric rings animation for More Influence card ───────────────────────
function ConcentricRings() {
  return (
    <>
      <style>{`
        @keyframes ring-expand {
          0%   { transform: scale(0.3); opacity: 0.35; }
          100% { transform: scale(1);   opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[0, 0.8, 1.6].map((delay, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: 260,
              height: 260,
              borderColor: 'rgba(255,255,255,0.5)',
              animation: `ring-expand 2.4s ease-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}


// ─── iOS-safe autoplay video ──────────────────────────────────────────────────
// iOS Safari ignores the autoPlay attribute and won't buffer without video.load().
// Strategy:
//  1. Call video.load() to force iOS to start buffering.
//  2. Play as soon as readyState ≥ 2 or canplay/loadeddata fires.
//  3. If blocked (low-power mode), retry on first document touchstart — this
//     covers the case where the video sits behind overlay divs and tap events
//     never reach the <video> element itself.
function AutoPlayVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    let played = false;
    const attempt = () => {
      if (played) return;
      played = true;
      video.play().catch(() => {
        played = false;
        // Blocked — retry on first user touch anywhere on the page.
        // This handles videos behind overlay divs that intercept touch events.
        const onTouch = () => {
          video.play().catch(() => {});
        };
        document.addEventListener('touchstart', onTouch, { once: true });
        document.addEventListener('click',      onTouch, { once: true });
      });
    };

    // Force iOS Safari to start buffering; without this readyState stays 0.
    video.load();

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { attempt(); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(video);

    if (video.readyState >= 2) attempt();
    else {
      video.addEventListener('loadeddata', attempt, { once: true });
      video.addEventListener('canplay',    attempt, { once: true });
    }

    return () => {
      obs.disconnect();
      video.removeEventListener('loadeddata', attempt);
      video.removeEventListener('canplay',    attempt);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

// ─── stacking cards constants ─────────────────────────────────────────────────
// px from viewport top where each card pins (clears the sticky site header)
const STACK_TOP = [96, 118, 140];
const CARD_SCROLL_GAP = 400;

export default function PodcastExplainer() {

  return (
    <section id="solutions" className="bg-[#f7f3ef]">
      <div className="container mx-auto px-8 pt-[80px] pb-[60px]">

        {/* ── Pill + headline ────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="mb-5">
            <span className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase">
              Narrative Media
            </span>
          </div>
          <h2 className="text-[#31393c] text-[38px] md:text-[52px] font-light leading-[1.15] tracking-[-0.02em] mb-6 max-w-[720px] mx-auto">
            Make a lasting impact through series your audience actually <span className="font-serif italic">engages with</span>
          </h2>
          <p className="text-[#6b6560] text-[15px] md:text-[16px] leading-[1.7] max-w-[580px] mx-auto mb-6">
            Designed to hold attention, deepen understanding, and build trust—across audio and video.
          </p>
        </div>

        {/* ── Bento stats grid — 7-card Maven-style staggered layout ─────────── */}
        <div className="max-w-[1000px] mx-auto mb-12">
          {/*
            Layout (12-col × 80px rows):
            A Photo      col 1–5   row 1–9   (tall left anchor)
            B 4.7×       col 5–13  row 1–5   (wide right top)
            C 80%        col 5–9   row 5–9   (mid left, offset from B)
            D Trust      col 9–13  row 5–13  (tall right, spans C + E)
            E 46%        col 1–5   row 9–13  (left, below photo)
            F Internal   col 5–9   row 9–13  (mid, internal stat)
            G Bottom     col 1–13  row 13–16 (full-width closer)
          */}
          <div
            className="hidden md:grid gap-3"
            style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '80px' }}
          >
            {/* A — Jessica photo */}
            <div
              className="rounded-3xl overflow-hidden flex"
              style={{ gridColumn: '1 / 5', gridRow: '1 / 9' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jessica-flint-mic.jpg"
                alt="Jessica Flint at the mic"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* B — 4.7x Greater Recall */}
            <div
              className="rounded-3xl overflow-hidden relative flex flex-col justify-end p-7"
              style={{ gridColumn: '5 / 13', gridRow: '1 / 5', backgroundColor: '#31393c' }}
            >
              <div className="relative z-10">
                <p className="text-[#ffffff] text-[80px] font-light leading-none tracking-[-0.04em] mb-1">6–7×</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Greater Recall<a href="https://link.springer.com/article/10.3758/BF03332778" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">1</a></p>
                <p className="text-[#ffffff]/60 text-[14px] leading-[1.6] max-w-[380px]">Information woven into a narrative is recalled six to seven times more than information studied through repetition alone — meaning your message doesn't just land, it sticks.</p>
              </div>
            </div>

            {/* C — 80% Completion Rate */}
            <div
              className="rounded-3xl p-5 flex flex-col"
              style={{ gridColumn: '5 / 9', gridRow: '5 / 9', backgroundColor: '#e8e3de', containerType: 'inline-size' }}
            >
              <CompletionRing />
              <div className="mt-5">
                <p className="text-[#31393c] text-[17px] font-medium leading-snug mb-1">Completion Rate<a href="https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">2</a></p>
                <p className="text-[#31393c]/60 text-[14px] leading-[1.6]">While other long-form media struggles to hold attention, our leading formats ensure your vital messages are heard, absorbed, and complete.</p>
              </div>
            </div>

            {/* D — 77%+ On-the-Go Opportunity (tall right, spans rows 5–13) */}
            <div
              className="rounded-3xl flex flex-col gap-4 overflow-hidden"
              style={{ gridColumn: '9 / 13', gridRow: '5 / 13', position: 'relative', backgroundColor: 'transparent' }}
            >
              {/* Background video — falls back to poster image if video fails */}
              <AutoPlayVideo
                src="/stats-idle-time-compressed.mp4"
                poster="/stats-on-the-go.webp"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(49,57,60,0.55)' }} />
              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                <p className="text-[#ffffff] text-[80px] font-light leading-none tracking-[-0.03em] mb-1">71%</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug">The Multitasking Advantage<a href="https://www.cohostpodcasting.com/resources/podcasting-unwrapped-2025" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">4</a></p>
              </div>
            </div>

            {/* E — 61% Trust Lift */}
            <div
              className="rounded-3xl p-6 flex flex-col"
              style={{ gridColumn: '1 / 5', gridRow: '9 / 13', backgroundColor: '#6290c9' }}
            >
              <p className="text-[#ffffff] text-[80px] font-light leading-none tracking-[-0.04em] mb-2">61%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Trust Lift<a href="https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">2</a></p>
              <p className="text-[#ffffff]/65 text-[14px] leading-[1.6]">Podcasts improve brand perception and patient confidence by humanizing the organization behind the science.</p>
            </div>

            {/* F — 3× More Influence */}
            <div
              className="rounded-3xl p-6 flex flex-col relative overflow-hidden"
              style={{ gridColumn: '5 / 9', gridRow: '9 / 13', backgroundColor: '#a0522d' }}
            >
              <ConcentricRings />
              <p className="text-[#ffffff] text-[80px] font-light leading-none tracking-[-0.03em] mb-1 relative z-10">3×</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1 relative z-10">More Influence<a href="https://cumuluspodcastnetwork.com/cumulus-media-podcast-download-fall-2025/" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">3</a></p>
              <p className="text-[#ffffff]/65 text-[14px] leading-[1.6] relative z-10">Build genuine connection. Podcasts carry triple the authority of standard influencer or social-led outreach.</p>
            </div>

            {/* G — Full-width closer (no card, plain text) */}
            <div
              className="flex items-center py-8"
              style={{ gridColumn: '1 / 13', gridRow: '13 / 16' }}
            >
              <div>
                <p className="text-[#1a1a1a]/40 text-[11px] font-semibold tracking-[0.2em] uppercase mb-2">The bottom line</p>
                <p className="text-[#1a1a1a] text-[22px] md:text-[26px] font-light leading-[1.3]">
                  Whether reaching a patient audience of thousands or aligning a clinical team of fifty — no other experience delivers this level of <span className="font-serif italic">trust, attention, and recall.</span>
                </p>
              </div>
            </div>

          </div>

          {/* ── Mobile cards ── */}
          <div className="flex md:hidden flex-col gap-3">

            {/* Mobile A — Jessica photo */}
            <div className="rounded-3xl overflow-hidden" style={{ height: 440 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jessica-flint-mic.jpg" alt="Jessica Flint" className="w-full h-full object-cover object-top" />
            </div>

            {/* Mobile B — 4.7× Greater Recall */}
            <div className="rounded-3xl overflow-hidden relative p-7 flex flex-col justify-end min-h-[220px]" style={{ backgroundColor: '#31393c' }}>
              <div className="relative z-10">
                <p className="text-[#ffffff] text-[60px] font-light leading-none tracking-[-0.03em] mb-1">6–7×</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Greater Recall</p>
                <p className="text-[#ffffff]/60 text-[14px] leading-[1.6]">Information woven into a narrative is recalled six to seven times more than information studied through repetition alone — meaning your message doesn't just land, it sticks.</p>
              </div>
            </div>

            {/* Mobile C — 80% Completion Rate */}
            <div className="rounded-3xl pt-6 px-7 pb-7 flex flex-col items-center min-h-[280px]" style={{ backgroundColor: '#e8e3de' }}>
              <div className="w-[300px] h-[300px] flex-shrink-0">
                <CompletionRing />
              </div>
              <p className="text-[#31393c] text-[17px] font-medium leading-snug mb-1 text-center mt-3">Completion Rate</p>
              <p className="text-[#31393c]/60 text-[14px] leading-[1.6] text-center">Most listeners stay engaged from the first insight to the final conclusion.</p>
            </div>

            {/* Mobile D — 77%+ On-the-Go */}
            <div className="rounded-3xl overflow-hidden relative flex flex-col min-h-[340px]" style={{ backgroundColor: 'transparent' }}>
              <AutoPlayVideo
                src="/stats-idle-time-compressed.mp4"
                poster="/stats-on-the-go.webp"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(49,57,60,0.55)' }} />
              <div className="relative z-10 p-7 flex flex-col h-full">
                <p className="text-[#ffffff] text-[60px] font-light leading-none tracking-[-0.03em] mb-1">71%</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-4">The Multitasking Advantage</p>
                <div className="flex flex-col gap-2 mt-auto">
                  {[
                    { emoji: '🍳', label: 'Cooking' },
                    { emoji: '🧹', label: 'Cleaning' },
                    { emoji: '🛒', label: 'Running Errands' },
                    { emoji: '🚗', label: 'Driving' },
                    { emoji: '💪', label: 'Exercising' },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-3 px-4 py-2.5 rounded-[10px]"
                      style={{ backgroundColor: `rgba(253,255,214,${0.07 + i * 0.03})` }}>
                      <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                      <span className="text-[#ffffff] text-[13px] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile E — 61% Trust Lift */}
            <div className="rounded-3xl p-7 flex flex-col min-h-[200px]" style={{ backgroundColor: '#6290c9' }}>
              <p className="text-[#ffffff] text-[60px] font-light leading-none tracking-[-0.04em] mb-2">61%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Trust Lift</p>
              <p className="text-[#ffffff]/65 text-[14px] leading-[1.6]">Podcasts improve brand perception and patient confidence by humanizing the organization behind the science.</p>
            </div>

            {/* Mobile F — 3× More Influence */}
            <div className="rounded-3xl p-7 flex flex-col relative overflow-hidden min-h-[200px]" style={{ backgroundColor: '#a0522d' }}>
              <ConcentricRings />
              <p className="text-[#ffffff] text-[60px] font-light leading-none tracking-[-0.03em] mb-1 relative z-10">3×</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1 relative z-10">More Influence</p>
              <p className="text-[#ffffff]/65 text-[14px] leading-[1.6] relative z-10">Build genuine connection. Podcasts carry triple the authority of standard influencer or social-led outreach.</p>
            </div>

            {/* Mobile G — Bottom text (no card) */}
            <div className="py-6">
              <p className="text-[#1a1a1a]/40 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">The bottom line</p>
              <p className="text-[#1a1a1a] text-[26px] font-light leading-[1.3]">
                No other medium delivers this level of <span className="font-serif italic">trust, attention, and recall.</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
