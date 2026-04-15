"use client";

import React, { useState, useEffect, useRef } from 'react';

const ROTATING_WORDS = ['patient engagement', 'brand authority', 'clinical adoption', 'team alignment'];

const HealthTechIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="600" height="560" fill="#31393c" />
    {/* Grid of dots */}
    {Array.from({ length: 10 }).map((_, row) =>
      Array.from({ length: 14 }).map((_, col) => (
        <circle key={`dot-${row}-${col}`} cx={col * 46 + 20} cy={row * 58 + 20} r="1.5" fill="#fac12c" opacity="0.25" />
      ))
    )}
    {/* Hexagon shapes */}
    <polygon points="480,60 510,77 510,111 480,128 450,111 450,77" fill="none" stroke="#fac12c" strokeWidth="1" opacity="0.3" />
    <polygon points="480,60 510,77 510,111 480,128 450,111 450,77" fill="#fac12c" opacity="0.04" />
    <polygon points="530,140 555,154 555,182 530,196 505,182 505,154" fill="none" stroke="#fac12c" strokeWidth="0.8" opacity="0.2" />
    <polygon points="140,80 165,94 165,122 140,136 115,122 115,94" fill="none" stroke="#fac12c" strokeWidth="0.8" opacity="0.2" />
    <polygon points="80,200 112,218 112,254 80,272 48,254 48,218" fill="none" stroke="#ffde5f" strokeWidth="1" opacity="0.2" />
    {/* Circuit node network */}
    <circle cx="300" cy="200" r="8" fill="#fac12c" opacity="0.7" />
    <circle cx="300" cy="200" r="16" fill="none" stroke="#fac12c" strokeWidth="1" opacity="0.4" />
    <circle cx="420" cy="150" r="5" fill="#fac12c" opacity="0.5" />
    <circle cx="180" cy="160" r="5" fill="#ffde5f" opacity="0.5" />
    <circle cx="370" cy="290" r="5" fill="#fac12c" opacity="0.5" />
    <circle cx="220" cy="300" r="5" fill="#ffde5f" opacity="0.5" />
    <circle cx="480" cy="260" r="4" fill="#fac12c" opacity="0.4" />
    <circle cx="120" cy="270" r="4" fill="#ffde5f" opacity="0.4" />
    {/* Connecting lines */}
    <line x1="300" y1="200" x2="420" y2="150" stroke="#fac12c" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="180" y2="160" stroke="#ffde5f" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="370" y2="290" stroke="#fac12c" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="220" y2="300" stroke="#ffde5f" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="420" y1="150" x2="480" y2="260" stroke="#fac12c" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 4" />
    <line x1="180" y1="160" x2="120" y2="270" stroke="#ffde5f" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 4" />
    {/* Waveform / audio bars */}
    {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => {
      const heights = [18, 32, 24, 42, 36, 56, 44, 56, 38, 44, 26, 34, 20];
      const h = heights[i];
      return (
        <rect key={`bar-${i}`} x={186 + i * 18} y={390 - h / 2} width="10" height={h} rx="5" fill="#fac12c" opacity="0.35" />
      );
    })}
    {/* Microphone shape (abstract) */}
    <rect x="288" y="100" width="24" height="38" rx="12" fill="none" stroke="#fac12c" strokeWidth="1.5" opacity="0.5" />
    <path d="M276 126 Q276 148 300 148 Q324 148 324 126" fill="none" stroke="#fac12c" strokeWidth="1.5" opacity="0.5" />
    <line x1="300" y1="148" x2="300" y2="162" stroke="#fac12c" strokeWidth="1.5" opacity="0.5" />
    <line x1="288" y1="162" x2="312" y2="162" stroke="#fac12c" strokeWidth="1.5" opacity="0.5" />
    {/* Glow */}
    <circle cx="300" cy="200" r="80" fill="#fac12c" opacity="0.04" />
    <circle cx="300" cy="200" r="140" fill="#fac12c" opacity="0.03" />
  </svg>
);

const HealthcareOrgsIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="600" height="560" fill="#31393c" />
    {/* Concentric broadcast arcs */}
    {[60, 110, 160, 210, 260, 310].map((r, i) => (
      <circle key={`arc-${i}`} cx="300" cy="340" r={r} fill="none" stroke="#6b4b3e" strokeWidth="1" opacity={0.25 - i * 0.03} />
    ))}
    {/* Dot grid */}
    {Array.from({ length: 9 }).map((_, row) =>
      Array.from({ length: 13 }).map((_, col) => (
        <circle key={`dot-${row}-${col}`} cx={col * 50 + 25} cy={row * 62 + 20} r="1.5" fill="#6b4b3e" opacity="0.15" />
      ))
    )}
    {/* Network nodes radiating from center */}
    <circle cx="300" cy="220" r="10" fill="#6b4b3e" opacity="0.8" />
    <circle cx="300" cy="220" r="20" fill="none" stroke="#6b4b3e" strokeWidth="1.5" opacity="0.4" />
    {/* Satellite nodes */}
    {[
      { cx: 200, cy: 160, r: 5, op: 0.6 },
      { cx: 400, cy: 160, r: 5, op: 0.6 },
      { cx: 160, cy: 260, r: 4, op: 0.5 },
      { cx: 440, cy: 260, r: 4, op: 0.5 },
      { cx: 220, cy: 340, r: 4, op: 0.4 },
      { cx: 380, cy: 340, r: 4, op: 0.4 },
      { cx: 300, cy: 130, r: 4, op: 0.5 },
    ].map((node, i) => (
      <g key={`node-${i}`}>
        <circle cx={node.cx} cy={node.cy} r={node.r} fill="#6b4b3e" opacity={node.op} />
        <line x1="300" y1="220" x2={node.cx} y2={node.cy} stroke="#6b4b3e" strokeWidth="0.8" opacity="0.25" strokeDasharray="5 5" />
      </g>
    ))}
    {/* Waveform bars */}
    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((i) => {
      const heights = [14, 28, 20, 40, 50, 36, 58, 48, 60, 38, 46, 28, 32, 16];
      const h = heights[i];
      return (
        <rect key={`bar-${i}`} x={166 + i * 20} y={430 - h / 2} width="12" height={h} rx="6" fill="#6b4b3e" opacity="0.3" />
      );
    })}
    {/* Microphone abstract */}
    <rect x="288" y="98" width="24" height="40" rx="12" fill="none" stroke="#6b4b3e" strokeWidth="1.5" opacity="0.6" />
    <path d="M274 124 Q274 148 300 148 Q326 148 326 124" fill="none" stroke="#6b4b3e" strokeWidth="1.5" opacity="0.6" />
    <line x1="300" y1="148" x2="300" y2="164" stroke="#6b4b3e" strokeWidth="1.5" opacity="0.6" />
    <line x1="286" y1="164" x2="314" y2="164" stroke="#6b4b3e" strokeWidth="1.5" opacity="0.6" />
    {/* Glow */}
    <circle cx="300" cy="220" r="90" fill="#6b4b3e" opacity="0.04" />
    <circle cx="300" cy="220" r="160" fill="#6b4b3e" opacity="0.02" />
  </svg>
);

const PharmaIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="600" height="560" fill="#31393c" />
    {/* Dot grid */}
    {Array.from({ length: 10 }).map((_, row) =>
      Array.from({ length: 14 }).map((_, col) => (
        <circle key={`dot-${row}-${col}`} cx={col * 46 + 20} cy={row * 58 + 20} r="1.5" fill="#fac12c" opacity="0.18" />
      ))
    )}
    {/* Molecular hexagons */}
    {[
      { cx: 300, cy: 190, r: 32 },
      { cx: 370, cy: 135, r: 22 },
      { cx: 230, cy: 135, r: 22 },
      { cx: 430, cy: 210, r: 18 },
      { cx: 170, cy: 210, r: 18 },
      { cx: 340, cy: 270, r: 18 },
      { cx: 260, cy: 270, r: 18 },
    ].map((hex, i) => {
      const pts = Array.from({ length: 6 }).map((_, k) => {
        const angle = Math.PI / 3 * k - Math.PI / 6;
        return `${hex.cx + hex.r * Math.cos(angle)},${hex.cy + hex.r * Math.sin(angle)}`;
      }).join(' ');
      return (
        <g key={`hex-${i}`}>
          <polygon points={pts} fill="#fac12c" opacity={i === 0 ? 0.08 : 0.04} />
          <polygon points={pts} fill="none" stroke="#fac12c" strokeWidth={i === 0 ? 1.5 : 1} opacity={i === 0 ? 0.5 : 0.3} />
        </g>
      );
    })}
    {/* Bond lines between hexagons */}
    <line x1="300" y1="190" x2="370" y2="135" stroke="#fac12c" strokeWidth="1.5" opacity="0.35" />
    <line x1="300" y1="190" x2="230" y2="135" stroke="#fac12c" strokeWidth="1.5" opacity="0.35" />
    <line x1="300" y1="190" x2="430" y2="210" stroke="#fac12c" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="170" y2="210" stroke="#fac12c" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="340" y2="270" stroke="#fac12c" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="260" y2="270" stroke="#fac12c" strokeWidth="1" opacity="0.25" />
    {/* Sine wave running through */}
    <path d="M80 360 Q130 320 180 360 Q230 400 280 360 Q330 320 380 360 Q430 400 480 360 Q510 340 530 360" fill="none" stroke="#fac12c" strokeWidth="1.5" opacity="0.4" />
    <path d="M80 380 Q130 340 180 380 Q230 420 280 380 Q330 340 380 380 Q430 420 480 380 Q510 360 530 380" fill="none" stroke="#fac12c" strokeWidth="0.8" opacity="0.2" />
    {/* Floating circles (atoms) */}
    <circle cx="480" cy="120" r="14" fill="none" stroke="#fac12c" strokeWidth="1" opacity="0.35" />
    <circle cx="480" cy="120" r="5" fill="#fac12c" opacity="0.4" />
    <circle cx="120" cy="300" r="10" fill="none" stroke="#fac12c" strokeWidth="1" opacity="0.3" />
    <circle cx="120" cy="300" r="4" fill="#fac12c" opacity="0.35" />
    <circle cx="520" cy="320" r="8" fill="none" stroke="#fac12c" strokeWidth="1" opacity="0.25" />
    {/* Microphone abstract */}
    <rect x="288" y="82" width="24" height="40" rx="12" fill="none" stroke="#fac12c" strokeWidth="1.5" opacity="0.6" />
    <path d="M274 108 Q274 132 300 132 Q326 132 326 108" fill="none" stroke="#fac12c" strokeWidth="1.5" opacity="0.6" />
    <line x1="300" y1="132" x2="300" y2="148" stroke="#fac12c" strokeWidth="1.5" opacity="0.6" />
    <line x1="286" y1="148" x2="314" y2="148" stroke="#fac12c" strokeWidth="1.5" opacity="0.6" />
    {/* Glow */}
    <circle cx="300" cy="190" r="80" fill="#fac12c" opacity="0.05" />
  </svg>
);

const CarePlatformSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tilesVisible, setTilesVisible] = useState(false);
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tilesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTilesVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const programs = [
    {
      title: "Health Technology & Digital Solutions",
      description: "Digital health, patient engagement platforms, health analytics, EHR/EMR providers",
      Illustration: () => (
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/card-health-tech.png" alt="Health Technology" className="w-full h-full object-cover" />
        </div>
      ),
      dotColor: "#fac12c"
    },
    {
      title: "Healthcare Organizations & Systems",
      description: "Health systems, hospitals, medical groups, telehealth platforms, insurance providers",
      Illustration: () => (
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/card-healthcare-orgs.png" alt="Healthcare Organizations" className="w-full h-full object-cover" />
        </div>
      ),
      dotColor: "#6b4b3e"
    },
    {
      title: "Pharmaceutical & Life Sciences",
      description: "Pharma, biotech, medical devices, clinical research organizations, diagnostics",
      Illustration: () => (
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/card-pharma.png" alt="Pharmaceutical & Life Sciences" className="w-full h-full object-cover" />
        </div>
      ),
      dotColor: "#fac12c"
    },
  ];

  const COLS = 8;
  const LABEL_CELLS: { label: string; gridCol: string; gridRow: number; order: number; pillBg: string; pillText: string }[] = [
    { label: 'engagement', gridCol: `1/${COLS + 1}`, gridRow: 1, order: 0, pillBg: '#f2f265', pillText: '#1a1a1a' },
    { label: 'adherence',  gridCol: `1/${COLS + 1}`, gridRow: 2, order: 1, pillBg: '#ffde5f', pillText: '#1a1a1a' },
    { label: 'retention',  gridCol: `1/${COLS + 1}`, gridRow: 3, order: 2, pillBg: '#fac12c', pillText: '#1a1a1a' },
    { label: 'referrals',  gridCol: `1/${COLS + 1}`, gridRow: 4, order: 3, pillBg: '#31393c', pillText: '#ffffff' },
    { label: 'advocacy',   gridCol: `1/${COLS + 1}`, gridRow: 5, order: 4, pillBg: '#6290c9', pillText: '#ffffff' },
  ];

  return (
    <section id="services" style={{ backgroundColor: '#f7f3ef' }}>

      {/* ── Header — on warm background ── */}
      <div className="text-center max-w-[800px] mx-auto pt-[88px] md:pt-[90px] pb-14 px-8">

        {/* Audio pulse bars — animated Flint logo */}
        <style>{`
          @keyframes flintBreathe {
            0%, 100% { transform: scaleY(1); }
            50%       { transform: scaleY(1.2); }
          }
        `}</style>
        {/* Fixed 72px container — scaleY animation stays on its own plane, no layout shift */}
        <div
          aria-hidden="true"
          style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '32px' }}
        >
          {/* left: shortest, darkest amber | middle: tallest, brightest yellow | right: medium, mid amber */}
          {[
            { h: 28, bg: '#e09a18', w: 14, delay: '0s' },
            { h: 56, bg: '#ffde5f', w: 14, delay: '0.35s' },
            { h: 40, bg: '#fac12c', w: 14, delay: '0.7s' },
          ].map((bar, i) => (
            <div
              key={i}
              style={{
                width: `${bar.w}px`,
                height: `${bar.h}px`,
                borderRadius: '999px',
                backgroundColor: bar.bg,
                border: '2.5px solid #31393c',
                transformOrigin: 'center',
                animation: `flintBreathe 4.2s ease-in-out infinite ${bar.delay}`,
              }}
            />
          ))}
        </div>

        <h2 className="text-[#1a1a1a] text-[40px] md:text-[56px] leading-[1.1] mb-8 font-sans font-light">
          <span className="md:hidden">Share vital information<br />that ignites<br /></span>
          <span className="hidden md:inline">Share vital information<br />that ignites </span>
          <em
            className="font-serif italic text-[#1a1a1a] inline-block transition-all duration-300 ease-in-out"
            style={mounted ? { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)' } : {}}
          >
            {ROTATING_WORDS[wordIndex]}.
          </em>
        </h2>

        <p className="text-[#6b6560] text-[16px] md:text-[17px] leading-[1.55] max-w-[560px] mx-auto">
          Flint translates clinical science and real human experience into premium podcasts your audience actually finishes.
        </p>
      </div>

      {/* ── Grid block starts here ── */}
      <div ref={tilesRef} className="relative overflow-hidden" style={{ backgroundColor: '#31393c' }}>

        {/* Keyframes */}
        <style>{`
          @keyframes flashlightArc {
            0%   { transform: translate(-280px, -280px); opacity: 0; }
            8%   { opacity: 1; }
            50%  { transform: translate(420px, 150px); opacity: 1; }
            92%  { opacity: 1; }
            100% { transform: translate(1100px, -280px); opacity: 0; }
          }
          @keyframes flashlightMob {
            0%   { transform: translate(-190px, -190px); opacity: 0; }
            8%   { opacity: 1; }
            50%  { transform: translate(100px, 160px); opacity: 1; }
            92%  { opacity: 1; }
            100% { transform: translate(400px, -190px); opacity: 0; }
          }
        `}</style>

        {/* Gradient + full-section grid texture — lines on top, gradient beneath */}
        <div className="absolute inset-0 z-0" style={{
          backgroundColor: '#31393c',
          backgroundImage: [
            // vertical column lines only — row lines are handled by grid cell borders
            'repeating-linear-gradient(to right, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent calc(100% / 8))',
            // earthy gradient beneath
            'linear-gradient(to right, #31393c 0%, #6b4b3e 55%, #a0522d 100%)',
          ].join(', '),
        }} />

        {/* Flashlight — full section height, upper-right → down-left */}
        <div className="hidden md:block absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '560px', height: '560px', borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(250,193,44,0.28) 0%, rgba(250,193,44,0.18) 12%, rgba(250,193,44,0.10) 25%, rgba(250,193,44,0.055) 38%, rgba(250,193,44,0.025) 52%, rgba(250,193,44,0.010) 65%, rgba(250,193,44,0.003) 78%, rgba(250,193,44,0.001) 88%, transparent 100%)',
            animation: 'flashlightArc 18s ease-in-out infinite',
            animationDelay: '0.5s',
          }} />
        </div>

        {/* Content on top of grid */}
        <div className="relative z-10">

          {/* "The results that follow" — prominent */}
          <div className="text-center pt-12 pb-6 px-6">
            <span
              className="text-[#ffffff] text-[13px] font-semibold uppercase tracking-[0.22em] px-5 py-2 rounded-full"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
            >
              The results that follow
            </span>
          </div>

          {/* ── Mobile grid: 4 cols, one word per full-width row ── */}
          {(() => {
            const MOB_COLS = 4;
            const MOB_ROWS = 5;
            const MOB_LABELS: { label: string; gridRow: number; order: number }[] = [
              { label: 'engagement', gridRow: 1, order: 0 },
              { label: 'adherence',  gridRow: 2, order: 1 },
              { label: 'retention',  gridRow: 3, order: 2 },
              { label: 'referrals',  gridRow: 4, order: 3 },
              { label: 'advocacy',   gridRow: 5, order: 4 },
            ];
            return (
              // Outer div controls visibility — no inline display so md:hidden works correctly
              <div className="block md:hidden">
                <div style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${MOB_COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${MOB_ROWS}, 86px)`,
                }}>
                  {/* Flashlight */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '380px', height: '380px', borderRadius: '50%',
                      background: 'radial-gradient(circle at center, rgba(250,193,44,0.28) 0%, rgba(250,193,44,0.18) 12%, rgba(250,193,44,0.10) 25%, rgba(250,193,44,0.055) 38%, rgba(250,193,44,0.025) 52%, rgba(250,193,44,0.010) 65%, rgba(250,193,44,0.003) 78%, rgba(250,193,44,0.001) 88%, transparent 100%)',
                      animation: 'flashlightMob 18s ease-in-out infinite',
                      animationDelay: '0.5s',
                    }} />
                  </div>
                  {/* Label cells — border-top/bottom for row lines, matching desktop */}
                  {MOB_LABELS.map((lc) => (
                    <div key={lc.label} style={{
                      gridColumn: `1 / ${MOB_COLS + 1}`, gridRow: lc.gridRow,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'transparent',
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      opacity: tilesVisible ? 1 : 0,
                      transform: !tilesVisible ? 'translateY(10px)' : 'translateY(0)',
                      transition: `opacity 0.6s ease ${lc.order * 0.15}s, transform 0.6s ease ${lc.order * 0.15}s`,
                      position: 'relative', zIndex: 3,
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 24, fontWeight: 300, letterSpacing: '-0.01em' }}>
                        {lc.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ── Desktop grid: 8 cols, 5 rows ── */}
          <div className="hidden md:grid" style={{
            position: 'relative',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: 'repeat(5, 80px)',
          }}>
            {/* Label cells — border-top/bottom creates row lines perfectly centered around each word */}
            {LABEL_CELLS.map((lc) => (
              <div key={lc.label} style={{
                gridColumn: lc.gridCol, gridRow: lc.gridRow,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'transparent',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                opacity: tilesVisible ? 1 : 0,
                transform: !tilesVisible ? 'translateY(10px)' : 'translateY(0)',
                transition: `opacity 0.6s ease ${lc.order * 0.15}s, transform 0.6s ease ${lc.order * 0.15}s`,
                position: 'relative', zIndex: 3,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 24, fontWeight: 300, letterSpacing: '-0.01em' }}>
                  {lc.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center py-12 px-6">
            <a
              href="#contact"
              className="bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] px-8 py-3.5 rounded-md font-semibold text-[16px] transition-colors"
            >
              Learn More
            </a>
          </div>

        </div>{/* /content */}
      </div>{/* /grid block */}
    </section>
  );
};

export default CarePlatformSection;
