"use client";

import React, { useState, useEffect, useRef } from 'react';

const ROTATING_WORDS = ['patient engagement', 'brand authority', 'clinical adoption', 'team alignment'];


const CarePlatformSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [tilesVisible, setTilesVisible] = useState(false);
  const [prismAnimated, setPrismAnimated] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const tilesRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

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
    const el = prismRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prismAnimated) {
          setPrismAnimated(true);
          setTimeout(() => setPhase2(true), 2900);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); };
  }, [prismAnimated]);

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

  const animClass = prismAnimated ? 'cp-prism-animated' : '';
  const p2Class   = phase2        ? 'cp-phase2'         : '';

  return (
    <section id="services" style={{ backgroundColor: '#f9f5ef' }}>

      {/* ── Grid block ── */}
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

          /* ── Phase 1 keyframes ── */
          @keyframes cpBeamDraw {
            from { stroke-dashoffset: 1; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes cpFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* ── Phase 2 keyframes ── */
          @keyframes cpRayShimmer1 { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
          @keyframes cpRayShimmer2 { 0%,100% { opacity: 1; } 50% { opacity: 0.40; } }
          @keyframes cpRayShimmer3 { 0%,100% { opacity: 1; } 50% { opacity: 0.42; } }
          @keyframes cpRayShimmer4 { 0%,100% { opacity: 1; } 50% { opacity: 0.38; } }
          @keyframes cpRayShimmer5 { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

          /* ── Beam line base state ── */
          .cp-beam-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
          }
          /* ── Ray / pill / closing base state ── */
          .cp-ray   { opacity: 0; }
          .cp-pill  { opacity: 0; }
          .cp-closing { opacity: 0; }

          /* ── Phase 1 trigger ── */
          .cp-prism-animated .cp-beam-line {
            animation: cpBeamDraw 0.5s linear forwards;
          }
          .cp-prism-animated .cp-ray-1 { animation: cpFadeIn 0.3s ease forwards 0.7s; }
          .cp-prism-animated .cp-ray-2 { animation: cpFadeIn 0.3s ease forwards 1.0s; }
          .cp-prism-animated .cp-ray-3 { animation: cpFadeIn 0.3s ease forwards 1.3s; }
          .cp-prism-animated .cp-ray-4 { animation: cpFadeIn 0.3s ease forwards 1.6s; }
          .cp-prism-animated .cp-ray-5 { animation: cpFadeIn 0.3s ease forwards 1.9s; }

          .cp-prism-animated .cp-pill-1 { animation: cpFadeIn 0.4s ease forwards 0.9s; }
          .cp-prism-animated .cp-pill-2 { animation: cpFadeIn 0.4s ease forwards 1.2s; }
          .cp-prism-animated .cp-pill-3 { animation: cpFadeIn 0.4s ease forwards 1.5s; }
          .cp-prism-animated .cp-pill-4 { animation: cpFadeIn 0.4s ease forwards 1.8s; }
          .cp-prism-animated .cp-pill-5 { animation: cpFadeIn 0.4s ease forwards 2.1s; }

          .cp-prism-animated .cp-closing { animation: cpFadeIn 0.6s ease forwards 2.5s; }

          /* ── Phase 2 shimmer overrides ── */
          .cp-phase2 .cp-ray   { opacity: 1; }
          .cp-phase2 .cp-pill  { opacity: 1; }
          .cp-phase2 .cp-closing { opacity: 1; }
          .cp-phase2 .cp-ray-1 { animation: cpRayShimmer1 5.5s ease-in-out infinite 0.0s !important; }
          .cp-phase2 .cp-ray-2 { animation: cpRayShimmer2 6.2s ease-in-out infinite 1.0s !important; }
          .cp-phase2 .cp-ray-3 { animation: cpRayShimmer3 5.8s ease-in-out infinite 2.0s !important; }
          .cp-phase2 .cp-ray-4 { animation: cpRayShimmer4 6.5s ease-in-out infinite 1.5s !important; }
          .cp-phase2 .cp-ray-5 { animation: cpRayShimmer5 5.2s ease-in-out infinite 0.8s !important; }
        `}</style>

        {/* Background gradient */}
        <div className="absolute inset-0 z-0" style={{
          backgroundColor: '#677283',
          backgroundImage: [
            'repeating-linear-gradient(to right, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent calc(100% / 8))',
            'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)',
          ].join(', '),
        }} />

        {/* Grain overlay */}
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

        {/* Flashlight */}
        <div className="hidden md:block absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '560px', height: '560px', borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(250,193,44,0.28) 0%, rgba(250,193,44,0.18) 12%, rgba(250,193,44,0.10) 25%, rgba(250,193,44,0.055) 38%, rgba(250,193,44,0.025) 52%, rgba(250,193,44,0.010) 65%, rgba(250,193,44,0.003) 78%, rgba(250,193,44,0.001) 88%, transparent 100%)',
            animation: 'flashlightArc 18s ease-in-out infinite',
            animationDelay: '0.5s',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">

          {/* Section header */}
          <div className="text-center pt-24 pb-1 px-3 md:px-6"
            style={{
              opacity: tilesVisible ? 1 : 0,
              transform: tilesVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease 0s, transform 0.6s ease 0s',
            }}
          >
            <p className="text-[15px] font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: 'rgba(249,245,239,0.55)' }}>
              Your Series
            </p>
            <h2 className="text-white text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4">
              One series. The <span className="font-serif italic" style={{ color: '#ffffff' }}>right channels.</span>
            </h2>
            <p className="text-[17px] leading-[1.5] max-w-[560px] mx-auto" style={{ color: 'rgba(249,245,239,0.55)' }}>
              From strategy to first episode in 90 days, every series is custom-built around your goals, your audience, and the outcomes that matter most.
            </p>
          </div>

          {/* ── Animation container — wraps prism + pills + closing ── */}
          <div ref={prismRef} className={`${animClass} ${p2Class}`}>

            {/* Prism SVG flex wrapper */}
            <div
              className="flex justify-center items-center py-0 md:py-1 lg:py-0 px-0 xl:justify-start xl:pl-[8%]"
              style={{ overflow: 'visible', width: '100%' }}
            >

              {/* ── DESKTOP SVG (lg+) — wrapped for pill overlay anchoring ── */}
              <div className="hidden lg:block relative" style={{ lineHeight: 0, flexShrink: 0 }}>
              <svg
                className="block"
                viewBox="0 0 1920 700"
                width="100%"
                height="453"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible', maxWidth: 'none' }}
              >
                <defs>
                  <linearGradient id="cpa-ray1" x1="385" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#eeb20b" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="cpa-ray2" x1="385" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#ff7f29" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#ff7f29" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#ff7f29" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="cpa-ray3" x1="385" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#f5a020" stopOpacity="0.88"/>
                    <stop offset="65%" stopColor="#f5a020" stopOpacity="0.28"/>
                    <stop offset="100%" stopColor="#f5a020" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="cpa-ray4" x1="385" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#54819a" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#54819a" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#54819a" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="cpa-ray5" x1="385" y1="0" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#677283" stopOpacity="0.88"/>
                    <stop offset="65%" stopColor="#677283" stopOpacity="0.28"/>
                    <stop offset="100%" stopColor="#677283" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="cpa-beam" x1="-800" y1="-252" x2="285" y2="374" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.80"/>
                    <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.90"/>
                  </linearGradient>
                </defs>

                {/* LAYER 1 — Prism PNG */}
                <image href="/prism-flint.png" x="150" y="230" width="420" height="380" preserveAspectRatio="xMidYMid meet"/>

                {/* LAYER 2 — Entry beam (animated draw-in via dashoffset) */}
                <line pathLength="1" className="cp-beam-line" x1="-800" y1="-252" x2="285" y2="374"
                  stroke="#eeb20b" strokeWidth="100" strokeOpacity="0.03" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-800" y1="-252" x2="285" y2="374"
                  stroke="#eeb20b" strokeWidth="50" strokeOpacity="0.05" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-800" y1="-252" x2="285" y2="374"
                  stroke="#eeb20b" strokeWidth="22" strokeOpacity="0.08" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-800" y1="-252" x2="285" y2="374"
                  stroke="url(#cpa-beam)" strokeWidth="8" strokeLinecap="butt" strokeOpacity="0.18"/>

                {/* LAYER 3 — Exit rays (staggered fade-in) */}
                <polygon className="cp-ray cp-ray-1" points="285,374 1920,-180 1920,80"  fill="url(#cpa-ray1)"/>
                <polygon className="cp-ray cp-ray-2" points="285,374 1920,80   1920,300" fill="url(#cpa-ray2)"/>
                <polygon className="cp-ray cp-ray-3" points="285,374 1920,300  1920,480" fill="url(#cpa-ray3)"/>
                <polygon className="cp-ray cp-ray-4" points="285,374 1920,480  1920,660" fill="url(#cpa-ray4)"/>
                <polygon className="cp-ray cp-ray-5" points="285,374 1920,660  1920,900" fill="url(#cpa-ray5)"/>

                {/* LAYER 4 — Phase 2 particles along entry beam */}
                {phase2 && [0, 0.42, 0.84].map((delay) => (
                  <circle key={delay} r="1.8" fill="#f9f5ef">
                    <animateMotion dur="1.3s" repeatCount="indefinite" begin={`${delay}s`}
                      path="M 0 209 L 285 374" />
                    <animate attributeName="opacity"
                      values="0;0.17;0.15;0" keyTimes="0;0.08;0.85;1"
                      dur="1.3s" repeatCount="indefinite" begin={`${delay}s`} />
                  </circle>
                ))}
              </svg>

              </div>{/* /desktop SVG wrapper */}

              {/* ── TABLET SVG (md–lg) ── */}
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
                  <linearGradient id="mob-beam" x1="-400" y1="-26" x2="295" y2="374" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.00"/>
                    <stop offset="40%" stopColor="#eeb20b" stopOpacity="0.80"/>
                    <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.90"/>
                  </linearGradient>
                </defs>

                {/* Prism PNG */}
                <image href="/prism-flint.png" x="60" y="230" width="420" height="380" preserveAspectRatio="xMidYMid meet"/>

                {/* Entry beam */}
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="295" y2="374"
                  stroke="#eeb20b" strokeWidth="20" strokeOpacity="0.09" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="295" y2="374"
                  stroke="url(#mob-beam)" strokeWidth="5" strokeLinecap="round"/>
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="295" y2="374"
                  stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.38" strokeLinecap="round"/>

                {/* Exit rays */}
                <polygon className="cp-ray cp-ray-1" points="295,374 1260,45   1260,175" fill="url(#mob-ray1)"/>
                <polygon className="cp-ray cp-ray-2" points="295,374 1260,175  1260,305" fill="url(#mob-ray2)"/>
                <polygon className="cp-ray cp-ray-3" points="295,374 1260,305  1260,435" fill="url(#mob-ray3)"/>
                <polygon className="cp-ray cp-ray-4" points="295,374 1260,435  1260,565" fill="url(#mob-ray4)"/>
                <polygon className="cp-ray cp-ray-5" points="295,374 1260,565  1260,695" fill="url(#mob-ray5)"/>

                {/* Phase 2 particles */}
                {phase2 && [0, 0.40, 0.80].map((delay) => (
                  <circle key={delay} r="1.8" fill="#f9f5ef">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}
                      path="M 0 204 L 295 374" />
                    <animate attributeName="opacity"
                      values="0;0.17;0.15;0" keyTimes="0;0.08;0.85;1"
                      dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} />
                  </circle>
                ))}
              </svg>

              {/* ── MOBILE SVG (< md) ── */}
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
                  <linearGradient id="sm-ray1" x1="405" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#eeb20b" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="sm-ray2" x1="405" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#ff7f29" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#ff7f29" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#ff7f29" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="sm-ray3" x1="405" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#f5a020" stopOpacity="0.88"/>
                    <stop offset="65%" stopColor="#f5a020" stopOpacity="0.28"/>
                    <stop offset="100%" stopColor="#f5a020" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="sm-ray4" x1="405" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#54819a" stopOpacity="0.92"/>
                    <stop offset="65%" stopColor="#54819a" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="#54819a" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="sm-ray5" x1="405" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#677283" stopOpacity="0.88"/>
                    <stop offset="65%" stopColor="#677283" stopOpacity="0.28"/>
                    <stop offset="100%" stopColor="#677283" stopOpacity="0.00"/>
                  </linearGradient>
                  <linearGradient id="sm-beam" x1="-400" y1="-26" x2="405" y2="374" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#eeb20b" stopOpacity="0.00"/>
                    <stop offset="50%" stopColor="#eeb20b" stopOpacity="0.45"/>
                    <stop offset="100%" stopColor="#eeb20b" stopOpacity="0.65"/>
                  </linearGradient>
                </defs>

                {/* Prism PNG */}
                <image href="/prism-flint.png" x="170" y="217" width="470" height="426" preserveAspectRatio="xMidYMid meet"/>

                {/* Entry beam */}
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="405" y2="374"
                  stroke="#eeb20b" strokeWidth="120" strokeOpacity="0.025" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="405" y2="374"
                  stroke="#eeb20b" strokeWidth="60" strokeOpacity="0.035" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="405" y2="374"
                  stroke="#eeb20b" strokeWidth="28" strokeOpacity="0.05" strokeLinecap="butt"/>
                <line pathLength="1" className="cp-beam-line" x1="-400" y1="-26" x2="405" y2="374"
                  stroke="url(#sm-beam)" strokeWidth="4" strokeLinecap="round"/>

                {/* Exit rays */}
                <polygon className="cp-ray cp-ray-1" points="405,374 1260,45   1260,175" fill="url(#sm-ray1)"/>
                <polygon className="cp-ray cp-ray-2" points="405,374 1260,175  1260,305" fill="url(#sm-ray2)"/>
                <polygon className="cp-ray cp-ray-3" points="405,374 1260,305  1260,435" fill="url(#sm-ray3)"/>
                <polygon className="cp-ray cp-ray-4" points="405,374 1260,435  1260,565" fill="url(#sm-ray4)"/>
                <polygon className="cp-ray cp-ray-5" points="405,374 1260,565  1260,695" fill="url(#sm-ray5)"/>

                {/* Phase 2 particles */}
                {phase2 && [0, 0.47, 0.94].map((delay) => (
                  <circle key={delay} r="1.8" fill="#f9f5ef">
                    <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${delay}s`}
                      path="M 0 173 L 405 374" />
                    <animate attributeName="opacity"
                      values="0;0.17;0.15;0" keyTimes="0;0.08;0.85;1"
                      dur="1.4s" repeatCount="indefinite" begin={`${delay}s`} />
                  </circle>
                ))}
              </svg>

            </div>{/* /prism flex */}

            {/* Closing lines */}
            <div className="cp-closing text-center max-w-[640px] mx-auto px-6 pt-10 md:pt-6 pb-24">
              <h2 className="text-white text-[32px] md:text-[42px] font-light leading-[1.15] tracking-[-0.02em] mb-3">
                Most content<br className="md:hidden" /> gets <em className="font-serif italic">seconds.</em><br />
                A strategic series<br className="md:hidden" /> gets <em className="font-serif italic">hours.</em>
              </h2>
              <p className="text-[15px] tracking-[0.05em] mb-6" style={{ color: 'rgba(249,245,239,0.40)' }}>
                <em className="font-serif italic">(read that again.)</em>
              </p>
              <p className="text-[17px] leading-relaxed" style={{ color: 'rgba(249,245,239,0.55)' }}>
                This creates a fundamentally different relationship with your audience.
              </p>
            </div>

          </div>{/* /animation container */}

        </div>{/* /content */}
      </div>{/* /grid block */}
    </section>
  );
};

export default CarePlatformSection;
