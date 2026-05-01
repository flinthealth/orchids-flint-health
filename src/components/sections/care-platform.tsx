"use client";

import React, { useState, useEffect, useRef } from 'react';

const ROTATING_WORDS = ['patient engagement', 'brand authority', 'clinical adoption', 'team alignment'];

const HealthTechIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="600" height="560" fill="#2b3335" />
    {/* Grid of dots */}
    {Array.from({ length: 10 }).map((_, row) =>
      Array.from({ length: 14 }).map((_, col) => (
        <circle key={`dot-${row}-${col}`} cx={col * 46 + 20} cy={row * 58 + 20} r="1.5" fill="#eeb20b" opacity="0.25" />
      ))
    )}
    {/* Hexagon shapes */}
    <polygon points="480,60 510,77 510,111 480,128 450,111 450,77" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.3" />
    <polygon points="480,60 510,77 510,111 480,128 450,111 450,77" fill="#eeb20b" opacity="0.04" />
    <polygon points="530,140 555,154 555,182 530,196 505,182 505,154" fill="none" stroke="#eeb20b" strokeWidth="0.8" opacity="0.2" />
    <polygon points="140,80 165,94 165,122 140,136 115,122 115,94" fill="none" stroke="#eeb20b" strokeWidth="0.8" opacity="0.2" />
    <polygon points="80,200 112,218 112,254 80,272 48,254 48,218" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.2" />
    {/* Circuit node network */}
    <circle cx="300" cy="200" r="8" fill="#eeb20b" opacity="0.7" />
    <circle cx="300" cy="200" r="16" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.4" />
    <circle cx="420" cy="150" r="5" fill="#eeb20b" opacity="0.5" />
    <circle cx="180" cy="160" r="5" fill="#eeb20b" opacity="0.5" />
    <circle cx="370" cy="290" r="5" fill="#eeb20b" opacity="0.5" />
    <circle cx="220" cy="300" r="5" fill="#eeb20b" opacity="0.5" />
    <circle cx="480" cy="260" r="4" fill="#eeb20b" opacity="0.4" />
    <circle cx="120" cy="270" r="4" fill="#eeb20b" opacity="0.4" />
    {/* Connecting lines */}
    <line x1="300" y1="200" x2="420" y2="150" stroke="#eeb20b" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="180" y2="160" stroke="#eeb20b" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="370" y2="290" stroke="#eeb20b" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="200" x2="220" y2="300" stroke="#eeb20b" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    <line x1="420" y1="150" x2="480" y2="260" stroke="#eeb20b" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 4" />
    <line x1="180" y1="160" x2="120" y2="270" stroke="#eeb20b" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 4" />
    {/* Waveform / audio bars */}
    {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => {
      const heights = [18, 32, 24, 42, 36, 56, 44, 56, 38, 44, 26, 34, 20];
      const h = heights[i];
      return (
        <rect key={`bar-${i}`} x={186 + i * 18} y={390 - h / 2} width="10" height={h} rx="5" fill="#eeb20b" opacity="0.35" />
      );
    })}
    {/* Microphone shape (abstract) */}
    <rect x="288" y="100" width="24" height="38" rx="12" fill="none" stroke="#eeb20b" strokeWidth="1.5" opacity="0.5" />
    <path d="M276 126 Q276 148 300 148 Q324 148 324 126" fill="none" stroke="#eeb20b" strokeWidth="1.5" opacity="0.5" />
    <line x1="300" y1="148" x2="300" y2="162" stroke="#eeb20b" strokeWidth="1.5" opacity="0.5" />
    <line x1="288" y1="162" x2="312" y2="162" stroke="#eeb20b" strokeWidth="1.5" opacity="0.5" />
    {/* Glow */}
    <circle cx="300" cy="200" r="80" fill="#eeb20b" opacity="0.04" />
    <circle cx="300" cy="200" r="140" fill="#eeb20b" opacity="0.03" />
  </svg>
);

const HealthcareOrgsIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect width="600" height="560" fill="#2b3335" />
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
    <rect width="600" height="560" fill="#2b3335" />
    {/* Dot grid */}
    {Array.from({ length: 10 }).map((_, row) =>
      Array.from({ length: 14 }).map((_, col) => (
        <circle key={`dot-${row}-${col}`} cx={col * 46 + 20} cy={row * 58 + 20} r="1.5" fill="#eeb20b" opacity="0.18" />
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
          <polygon points={pts} fill="#eeb20b" opacity={i === 0 ? 0.08 : 0.04} />
          <polygon points={pts} fill="none" stroke="#eeb20b" strokeWidth={i === 0 ? 1.5 : 1} opacity={i === 0 ? 0.5 : 0.3} />
        </g>
      );
    })}
    {/* Bond lines between hexagons */}
    <line x1="300" y1="190" x2="370" y2="135" stroke="#eeb20b" strokeWidth="1.5" opacity="0.35" />
    <line x1="300" y1="190" x2="230" y2="135" stroke="#eeb20b" strokeWidth="1.5" opacity="0.35" />
    <line x1="300" y1="190" x2="430" y2="210" stroke="#eeb20b" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="170" y2="210" stroke="#eeb20b" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="340" y2="270" stroke="#eeb20b" strokeWidth="1" opacity="0.25" />
    <line x1="300" y1="190" x2="260" y2="270" stroke="#eeb20b" strokeWidth="1" opacity="0.25" />
    {/* Sine wave running through */}
    <path d="M80 360 Q130 320 180 360 Q230 400 280 360 Q330 320 380 360 Q430 400 480 360 Q510 340 530 360" fill="none" stroke="#eeb20b" strokeWidth="1.5" opacity="0.4" />
    <path d="M80 380 Q130 340 180 380 Q230 420 280 380 Q330 340 380 380 Q430 420 480 380 Q510 360 530 380" fill="none" stroke="#eeb20b" strokeWidth="0.8" opacity="0.2" />
    {/* Floating circles (atoms) */}
    <circle cx="480" cy="120" r="14" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.35" />
    <circle cx="480" cy="120" r="5" fill="#eeb20b" opacity="0.4" />
    <circle cx="120" cy="300" r="10" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.3" />
    <circle cx="120" cy="300" r="4" fill="#eeb20b" opacity="0.35" />
    <circle cx="520" cy="320" r="8" fill="none" stroke="#eeb20b" strokeWidth="1" opacity="0.25" />
    {/* Microphone abstract */}
    <rect x="288" y="82" width="24" height="40" rx="12" fill="none" stroke="#eeb20b" strokeWidth="1.5" opacity="0.6" />
    <path d="M274 108 Q274 132 300 132 Q326 132 326 108" fill="none" stroke="#eeb20b" strokeWidth="1.5" opacity="0.6" />
    <line x1="300" y1="132" x2="300" y2="148" stroke="#eeb20b" strokeWidth="1.5" opacity="0.6" />
    <line x1="286" y1="148" x2="314" y2="148" stroke="#eeb20b" strokeWidth="1.5" opacity="0.6" />
    {/* Glow */}
    <circle cx="300" cy="190" r="80" fill="#eeb20b" opacity="0.05" />
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => { obs.disconnect(); };
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
      dotColor: "#eeb20b"
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
      dotColor: "#eeb20b"
    },
  ];


  return (
    <section id="services" style={{ backgroundColor: '#f9f5ef' }}>

      {/* ── Grid block starts here ── */}
      <div ref={tilesRef} className="relative overflow-hidden" style={{ backgroundColor: '#677283' }}>

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
          @keyframes ctaPulse {
            0%   { box-shadow: 0 0 0 0 rgba(255, 127, 41, 0.55); }
            70%  { box-shadow: 0 0 0 10px rgba(255, 127, 41, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 127, 41, 0); }
          }
        `}</style>

        {/* Gradient + full-section grid texture — lines on top, gradient beneath */}
        <div className="absolute inset-0 z-0" style={{
          backgroundColor: '#677283',
          backgroundImage: [
            // vertical column lines only — row lines are handled by grid cell borders
            'repeating-linear-gradient(to right, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent calc(100% / 8))',
            // earthy gradient beneath
            'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)',
          ].join(', '),
        }} />

        {/* Grain overlay — data URI noise tile at overlay blend */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            opacity: 0.28,
            mixBlendMode: 'overlay',
          }}
        />

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

          {/* Section header */}
          <div className="text-center pt-24 pb-1 px-6"
            style={{
              opacity: tilesVisible ? 1 : 0,
              transform: tilesVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0s, transform 0.6s ease 0s',
            }}
          >
            {/* Eyebrow */}
            <p className="text-[15px] font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: 'rgba(249,245,239,0.55)' }}>
              THE SERIES EFFECT
            </p>
            {/* Headline */}
            <h2 className="text-white text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4">
              One well-produced series.<br className="hidden md:block" />{' '}
              <span className="font-serif italic" style={{ color: '#ffffff' }}>Five outcomes.</span>
            </h2>
            {/* Body — first sentence always visible under headline */}
            <p className="text-[17px] leading-[1.5] max-w-[560px] mx-auto" style={{ color: 'rgba(249,245,239,0.55)' }}>
              Create a compounding chain of results.
            </p>
          </div>

          {/* ── Prism SVG v10 — right-pointing triangle, 3 flat shapes, continuous light path ── */}
          {/*
            ViewBox: 0 0 1260 700. Rendered width=960, height=533. Scale≈0.762.

            SHAPE 1 — Front face: right-pointing triangle
              (230,338) top-left → (230,580) bottom-left → (510,459) right apex
              Vertical left edge = entry face. Apex = exit point at y=459.
              Fill: #54819a at 35% opacity.

            SHAPE 2 — Bottom base: parallelogram attached to bottom slant of front face
              Bottom slant of triangle: (230,580)→(510,459)
              Extend ~20° down-right: offset +60x,+45y
              Points: (230,580)→(510,459)→(570,504)→(290,625)
              Darker: #54819a 12% + dark overlay.

            SHAPE 3 — Diagonal refraction line: (255,385)→(475,535)
              Slightly darker, suggests internal bending.

            LIGHT PATH (all at y=459, one continuous horizontal journey):
              Entry beam:    x=0→230,  y=459  Golden Ray
              Internal cone: (230,459) → widens to (510,445)–(510,473) = 14px fan inside glass
              Exit + rays:   fan from (510,459) to x=1080

            ONE SERIES: x=120, y=422
          */}
          <div
            className="flex justify-center items-center py-0 md:py-1 lg:py-0 px-2"
            style={{
              opacity: tilesVisible ? 1 : 0,
              transform: tilesVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
              overflow: 'visible',
            }}
          >
            {/* ── DESKTOP SVG (lg and above) ── */}
            <svg
              className="hidden lg:block"
              viewBox="0 0 1260 700"
              width="816"
              height="453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible', maxWidth: '100%' }}
            >
              <defs>
                {/*
                  ── PNG PRISM APPROACH ──
                  Prism PNG placed at x=200 y=240, width=420, height=360
                  Entry beam hits left face at approx (220, 435)
                  Rays exit from center-right of prism at approx (570, 430)
                  Z-order: entry beam → PNG → rays
                */}

                {/*
                  Single exit point on right face edge: (434, 374)
                  Entry beam travels horizontally from x=0 → x=434 at y=374.
                  All 5 rays originate from the same (434,372)–(434,376) slit.
                  Ray3 (retention) travels horizontally; rays 1–2 angle up; rays 4–5 angle down.
                */}

                {/* Ray gradients — exit x=385, extend to x=1260 */}
                <linearGradient id="cpa-ray1" x1="385" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#eeb20b" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="cpa-ray2" x1="385" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#ff7f29" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#ff7f29" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#ff7f29" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="cpa-ray3" x1="385" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#f5a020" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#f5a020" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#f5a020" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="cpa-ray4" x1="385" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#54819a" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#54819a" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#54819a" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="cpa-ray5" x1="385" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#677283" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#677283" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#677283" stopOpacity="0.00"/>
                </linearGradient>

                {/* Entry beam: from (-800,-252) → (285,374) */}
                <linearGradient id="cpa-beam" x1="-800" y1="-252" x2="285" y2="374" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.80"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.90"/>
                </linearGradient>
              </defs>

              {/* ══ LAYER 1 — PRISM PNG shifted left to x=50 ══ */}
              <image
                href="/prism-flint.png"
                x="50" y="230"
                width="420" height="380"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* ══ LAYER 2 — ENTRY BEAM: (-800,-252) → (285,374) ══ */}
              <line x1="-800" y1="-252" x2="285" y2="374"
                stroke="#eeb20b" strokeWidth="100" strokeOpacity="0.03" strokeLinecap="butt"/>
              <line x1="-800" y1="-252" x2="285" y2="374"
                stroke="#eeb20b" strokeWidth="50" strokeOpacity="0.05" strokeLinecap="butt"/>
              <line x1="-800" y1="-252" x2="285" y2="374"
                stroke="#eeb20b" strokeWidth="22" strokeOpacity="0.08" strokeLinecap="butt"/>
              <line x1="-800" y1="-252" x2="285" y2="374"
                stroke="url(#cpa-beam)" strokeWidth="8" strokeLinecap="butt" strokeOpacity="0.18"/>

              {/* ══ LAYER 3 — EXIT RAYS, extended fan y=-100→800 (overflow:visible) ══ */}
              {/* Bands 180px each: -100→80, 80→260, 260→440, 440→620, 620→800          */}
              <polygon points="285,374 1260,-100 1260,80"  fill="url(#cpa-ray1)"/>
              <polygon points="285,374 1260,80   1260,260" fill="url(#cpa-ray2)"/>
              <polygon points="285,374 1260,260  1260,440" fill="url(#cpa-ray3)"/>
              <polygon points="285,374 1260,440  1260,620" fill="url(#cpa-ray4)"/>
              <polygon points="285,374 1260,620  1260,800" fill="url(#cpa-ray5)"/>

            </svg>

            {/* ── TABLET SVG (md to lg: 768px–1023px) ── */}
            <svg
              className="hidden md:block lg:hidden"
              viewBox="0 0 1260 700"
              width="960"
              height="533"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}
            >
              <defs>
                {/* Ray gradients — exit x=295, fade to x=1260 (full width) */}
                <linearGradient id="mob-ray1" x1="295" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#eeb20b" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="mob-ray2" x1="295" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#ff7f29" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#ff7f29" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#ff7f29" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="mob-ray3" x1="295" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#f5a020" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#f5a020" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#f5a020" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="mob-ray4" x1="295" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#54819a" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#54819a" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#54819a" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="mob-ray5" x1="295" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#677283" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#677283" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#677283" stopOpacity="0.00"/>
                </linearGradient>

                {/* Beam gradient — 120° (30° from horizontal), from (-400,-26) to (295,374) */}
                <linearGradient id="mob-beam" x1="-400" y1="-26" x2="295" y2="374" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.00"/>
                  <stop offset="40%" stopColor="#eeb20b" stopOpacity="0.80"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.90"/>
                </linearGradient>
              </defs>

              {/* LAYER 1 — Prism PNG shifted left */}
              <image href="/prism-flint.png" x="60" y="230" width="420" height="380" preserveAspectRatio="xMidYMid meet"/>

              {/* LAYER 2 — Entry beam at 120° from (-400,-26) → exit point (295,374) */}
              <line x1="-400" y1="-26" x2="295" y2="374"
                stroke="#eeb20b" strokeWidth="20" strokeOpacity="0.09" strokeLinecap="butt"/>
              <line x1="-400" y1="-26" x2="295" y2="374"
                stroke="url(#mob-beam)" strokeWidth="5" strokeLinecap="round"/>
              <line x1="-400" y1="-26" x2="295" y2="374"
                stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.38" strokeLinecap="round"/>

              {/* LAYER 3 — 650px spread centered on y=370, 130px bands */}
              {/* Bands: Ray1 y=45→175, Ray2 y=175→305, Ray3 y=305→435, Ray4 y=435→565, Ray5 y=565→695 */}
              <polygon points="295,374 1260,45   1260,175" fill="url(#mob-ray1)"/>
              <polygon points="295,374 1260,175  1260,305" fill="url(#mob-ray2)"/>
              <polygon points="295,374 1260,305  1260,435" fill="url(#mob-ray3)"/>
              <polygon points="295,374 1260,435  1260,565" fill="url(#mob-ray4)"/>
              <polygon points="295,374 1260,565  1260,695" fill="url(#mob-ray5)"/>


            </svg>

            {/* ── MOBILE SVG (below md: < 768px) ── */}
            <svg
              className="block md:hidden"
              viewBox="0 0 1260 700"
              width="960"
              height="533"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible', maxWidth: '100%', height: 'auto' }}
            >
              <defs>
                {/* Rays extend to x=1260 */}
                <linearGradient id="sm-ray1" x1="255" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#eeb20b" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="sm-ray2" x1="255" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#ff7f29" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#ff7f29" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#ff7f29" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="sm-ray3" x1="255" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#f5a020" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#f5a020" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#f5a020" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="sm-ray4" x1="255" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#54819a" stopOpacity="0.92"/>
                  <stop offset="65%" stopColor="#54819a" stopOpacity="0.32"/>
                  <stop offset="100%" stopColor="#54819a" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="sm-ray5" x1="255" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#677283" stopOpacity="0.88"/>
                  <stop offset="65%" stopColor="#677283" stopOpacity="0.28"/>
                  <stop offset="100%" stopColor="#677283" stopOpacity="0.00"/>
                </linearGradient>
                {/* Beam: prism moved 40px left, exit now (255,374) */}
                <linearGradient id="sm-beam" x1="-400" y1="-26" x2="255" y2="374" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.00"/>
                  <stop offset="40%" stopColor="#eeb20b" stopOpacity="0.80"/>
                  <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.90"/>
                </linearGradient>
              </defs>

              {/* LAYER 1 — Prism PNG shifted 40px left (x=20) */}
              <image href="/prism-flint.png" x="20" y="230" width="420" height="380" preserveAspectRatio="xMidYMid meet"/>

              {/* LAYER 2 — Entry beam to new exit (255,374) */}
              <line x1="-400" y1="-26" x2="255" y2="374" stroke="#eeb20b" strokeWidth="20" strokeOpacity="0.09" strokeLinecap="butt"/>
              <line x1="-400" y1="-26" x2="255" y2="374" stroke="url(#sm-beam)" strokeWidth="5" strokeLinecap="round"/>
              <line x1="-400" y1="-26" x2="255" y2="374" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.38" strokeLinecap="round"/>

              {/* LAYER 3 — 650px fan, exit (255,374), rays to x=1260 */}
              {/* Bands: 45→175, 175→305, 305→435, 435→565, 565→695 */}
              <polygon points="255,374 1260,45   1260,175" fill="url(#sm-ray1)"/>
              <polygon points="255,374 1260,175  1260,305" fill="url(#sm-ray2)"/>
              <polygon points="255,374 1260,305  1260,435" fill="url(#sm-ray3)"/>
              <polygon points="255,374 1260,435  1260,565" fill="url(#sm-ray4)"/>
              <polygon points="255,374 1260,565  1260,695" fill="url(#sm-ray5)"/>

            </svg>
          </div>

          {/* Outcome pills — all screen sizes, stacked vertically top→bottom */}
          <div className="flex flex-col items-center gap-2 md:gap-3 px-6 pb-2 pt-1">
            {[
              { label: 'engagement', color: '#eeb20b' },
              { label: 'adherence',  color: '#ff7f29' },
              { label: 'retention',  color: '#f5a020' },
              { label: 'referrals',  color: '#54819a' },
              { label: 'advocacy',   color: '#677283' },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="inline-block text-[15px] md:text-[15px] font-semibold tracking-[0.08em] uppercase px-5 md:px-5 py-2 md:py-2 rounded-full text-white"
                style={{ background: `${color}22`, border: `1px solid ${color}55` }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Body — all screens, below pills */}
          <p className="text-center text-[17px] leading-[1.5] max-w-[480px] mx-auto px-6 pt-6 pb-2" style={{ color: 'rgba(249,245,239,0.55)' }}>
            Each episode builds trust, deepens understanding, and moves your audience closer to action.
          </p>

          {/* CTA */}
          <div className="flex justify-center pt-8 md:pt-12 pb-24 px-6">
            <a
              href="#contact"
              className="bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] px-8 py-3.5 rounded-md font-semibold text-[16px] transition-colors"
              onMouseEnter={e => (e.currentTarget.style.animation = 'ctaPulse 0.8s ease-out')}
              onMouseLeave={e => (e.currentTarget.style.animation = '')}
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
