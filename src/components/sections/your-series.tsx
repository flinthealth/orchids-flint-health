"use client";

import React, { useRef, useState, useEffect } from 'react';

// ── Icons ────────────────────────────────────────────────────────────────────

const IconPositioning = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2"/>
  </svg>
);

const IconFormat = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="12" height="10" rx="1.5"/>
    <path d="M5 3V2M11 3V2"/>
    <path d="M2 7h12"/>
  </svg>
);

const IconConcept = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2a4 4 0 0 1 4 4c0 2-1.5 3.5-2 4.5H6C5.5 9.5 4 8 4 6a4 4 0 0 1 4-4Z"/>
    <path d="M6 13h4M7 15h2"/>
  </svg>
);

const IconEpisode = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h10M3 8h7M3 12h5"/>
  </svg>
);

const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5.5" y="1" width="5" height="8" rx="2.5"/>
    <path d="M2.5 8a5.5 5.5 0 0 0 11 0"/>
    <line x1="8" y1="13.5" x2="8" y2="15"/>
    <line x1="5.5" y1="15" x2="10.5" y2="15"/>
  </svg>
);

const IconVideo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="10" height="8" rx="1.5"/>
    <path d="M11 7l4-2.5v7L11 9"/>
  </svg>
);

const IconWave = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,8 3,8 4,4 5,12 6.5,6 8,10 9.5,8 16,8"/>
  </svg>
);

const IconDistribution = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="3" r="1.5"/>
    <circle cx="3" cy="12" r="1.5"/>
    <circle cx="13" cy="12" r="1.5"/>
    <path d="M8 4.5L3 10.5M8 4.5L13 10.5M3 10.5h10"/>
  </svg>
);

const IconChart = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,12 5,7 8,10 11,5 15,3"/>
    <line x1="1" y1="14" x2="15" y2="14"/>
  </svg>
);

const IconSentiment = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/>
    <path d="M5.5 9.5s.8 1.5 2.5 1.5 2.5-1.5 2.5-1.5"/>
    <circle cx="5.5" cy="6.5" r="0.75" fill="#677283"/>
    <circle cx="10.5" cy="6.5" r="0.75" fill="#677283"/>
  </svg>
);

const IconCompletion = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/>
    <path d="M8 2v6l3.5 3.5" strokeLinecap="round"/>
  </svg>
);

const IconRetention = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12M2 8h9M2 12h6"/>
    <circle cx="13" cy="10" r="2.5"/>
    <path d="M12 10l.8.8 1.7-1.6"/>
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────

type Tile = { icon: React.ReactNode; title: string; body: string };
type PillGroup = { label: string; color: string; tiles: Tile[] };
type Block = { title: string; sub: string; tiles?: Tile[]; pillGroups?: PillGroup[] };

const BLOCKS: Block[] = [
  {
    title: 'Strategy first.',
    sub: 'Before we record a word, we know exactly what your series needs to do.',
    tiles: [
      { icon: <IconPositioning />, title: 'Brand Positioning & Narrative', body: 'Your story, voice, and competitive angle defined before production begins.' },
      { icon: <IconFormat />,      title: 'Format Selection',              body: 'Interview, conversational, narrative, or panel chosen for your goals and audience.' },
      { icon: <IconConcept />,     title: 'Series Conceptualization',      body: 'Your vision shaped into a compelling series with clear editorial direction.' },
      { icon: <IconEpisode />,     title: 'Episode Planning',              body: 'Every episode structured, scripted, and on-brand before anyone steps to a mic.' },
    ],
  },
  {
    title: 'Production handled.',
    sub: 'You show up. We handle everything else.',
    tiles: [
      { icon: <IconMic />,          title: 'Audio Recording',                    body: 'Studio-quality sound whether remote or in-person.' },
      { icon: <IconVideo />,        title: 'Video Recording & Editing',          body: 'Every frame captured and polished to match the quality of your brand.' },
      { icon: <IconWave />,         title: 'Full Audio Editing & Sound Design',  body: 'Engineered, mixed, and scored for maximum listener retention.' },
      { icon: <IconDistribution />, title: 'Distribution',                       body: 'Delivered to all major platforms or privately to your internal teams.' },
    ],
  },
  {
    title: 'Measure and grow.',
    sub: 'The series that earns attention keeps earning it.',
    pillGroups: [
      {
        label: 'Public',
        color: '#ff7f29',
        tiles: [
          { icon: <IconChart />,     title: 'Downloads & Audience Growth',    body: 'Track reach and listener growth across every platform.' },
          { icon: <IconSentiment />, title: 'Brand Sentiment & Inquiry Lift', body: 'Measure how your series moves perception and drives action.' },
        ],
      },
      {
        label: 'Internal',
        color: '#54819a',
        tiles: [
          { icon: <IconCompletion />, title: 'Completion Rates',                        body: 'See how many people finish each episode and where attention holds strongest.' },
          { icon: <IconRetention />,  title: 'Knowledge Retention & Team Alignment',   body: 'Track how well your series is landing with your people.' },
        ],
      },
    ],
  },
];


// ── Component ─────────────────────────────────────────────────────────────────

export default function YourSeries() {
  const sectionRef = useRef<HTMLElement>(null);
  const barColRef  = useRef<HTMLDivElement>(null);
  const lightRef   = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // detect desktop (≥1200px)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // drive light position directly via DOM ref — no React state re-renders
  useEffect(() => {
    if (!isDesktop) return;
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sectionEl = sectionRef.current;
        const barEl     = barColRef.current;
        const lightEl   = lightRef.current;
        if (!sectionEl || !barEl || !lightEl) return;

        const sectionRect   = sectionEl.getBoundingClientRect();
        const barHeight     = barEl.offsetHeight;
        const viewportCenter = window.innerHeight * 0.5;

        const progress = Math.max(0, Math.min(1,
          (viewportCenter - sectionRect.top) / sectionRect.height
        ));

        const lightY = progress * (barHeight - 180);
        lightEl.style.top = `${lightY}px`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, [isDesktop]);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[840px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">
            Your Series
          </p>
          <h2
            className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ color: '#43382f' }}
          >
            <span className="md:hidden">From strategy to first episode<br /></span>
            <span className="hidden md:inline">From strategy to<br />first episode </span>
            <span className="font-serif italic">in 90 days.</span>
          </h2>
          <p className="text-[17px] leading-[1.65]" style={{ color: '#43382f' }}>
            <span className="hidden md:inline">Every series is custom-built around your goals, your audience,<br />and the outcomes that matter most.</span>
            <span className="md:hidden">Every series is custom-built around<br />your goals, your audience, and the<br />outcomes that matter most.</span>
          </p>
        </div>

        {/* ── Bar + Blocks ── */}
        <div className="flex gap-6 md:gap-8">

          {/* Continuous bar column */}
          <div
            ref={barColRef}
            className="flex-shrink-0 self-stretch"
            style={{ width: '24px', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}
          >
            {/* Static bar — gradient + grain */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '12px',
              background: 'linear-gradient(to bottom, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
                backgroundSize: '400px 400px',
                opacity: 0.18,
                mixBlendMode: 'overlay' as const,
                pointerEvents: 'none',
              }} />
            </div>
            {/* Traveling light orb — desktop only */}
            {isDesktop && (
              <div
                ref={lightRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '180px',
                  background: `radial-gradient(
                    ellipse at center,
                    rgba(255,230,120,1) 0%,
                    rgba(238,178,11,0.8) 20%,
                    rgba(255,180,50,0.4) 45%,
                    rgba(238,178,11,0.1) 70%,
                    transparent 100%
                  )`,
                  mixBlendMode: 'screen' as const,
                  pointerEvents: 'none',
                  filter: 'blur(4px)',
                }}
              />
            )}
          </div>

          {/* All blocks */}
          <div className="flex-1 flex flex-col gap-12 md:gap-14">
            {BLOCKS.map((block, i) => (
              <div key={block.title}>
                {/* Title */}
                <h3
                  className="text-[22px] md:text-[24px] font-bold leading-[1.15] tracking-[-0.01em] mb-1"
                  style={{ color: '#2b3335' }}
                >
                  {block.title}
                </h3>

                {/* Subheadline */}
                <p
                  className="text-[18px] md:text-[20px] leading-[1.4] mb-4 font-serif italic"
                  style={{ color: '#43382f' }}
                >
                  {block.sub}
                </p>

                {/* Service tile grid (blocks 0 & 1) */}
                {block.tiles && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {block.tiles.map((tile) => (
                      <div
                        key={tile.title}
                        className="flex flex-col gap-2 p-4 rounded-[12px]"
                        style={{
                          background: '#f9f5ef',
                          border: '1px solid rgba(43,51,53,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {tile.icon}
                          <span className="text-[14px] font-semibold leading-snug" style={{ color: '#2b3335' }}>
                            {tile.title}
                          </span>
                        </div>
                        <p className="text-[13px] leading-[1.55]" style={{ color: '#43382f' }}>
                          {tile.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pill + metric card groups (block 2) */}
                {block.pillGroups && (
                  <div className="flex flex-col gap-6">
                    {block.pillGroups.map((group) => (
                      <div key={group.label}>
                        {/* Pill label */}
                        <span
                          className="inline-block text-[12px] font-semibold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-3"
                          style={{
                            background: `${group.color}22`,
                            border: `1px solid ${group.color}66`,
                            color: group.color,
                          }}
                        >
                          {group.label}
                        </span>
                        {/* 2-col tile grid — same style as Strategy/Production tiles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.tiles.map((tile) => (
                            <div
                              key={tile.title}
                              className="flex flex-col gap-2 p-4 rounded-[12px]"
                              style={{
                                background: '#f9f5ef',
                                border: '1px solid rgba(43,51,53,0.08)',
                              }}
                            >
                              <div className="flex items-center gap-2">
                                {tile.icon}
                                <span className="text-[14px] font-semibold leading-snug" style={{ color: '#2b3335' }}>
                                  {tile.title}
                                </span>
                              </div>
                              <p className="text-[13px] leading-[1.55]" style={{ color: '#43382f' }}>
                                {tile.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>
                )}

              </div>
            ))}
          </div>{/* end all blocks */}

        </div>{/* end bar + blocks flex row */}

      </div>
    </section>
  );
}
