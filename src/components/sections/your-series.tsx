"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

const BLOCKS = [
  {
    title: 'Strategy first.',
    body: 'We define your brand positioning, narrative, voice, and format before a single episode is recorded. Interview, conversational, narrative, or panel. The right choice makes everything that follows more powerful. Every creative decision flows from your goals and the outcomes that matter most.',
  },
  {
    title: 'Production handled.',
    body: 'From scripting and scheduling to editing, scoring, and distribution, we manage the entire creative process. You choose the voice. We build the narrative around your experts, with every production decision anchored to your goals.',
  },
  {
    title: 'Measure and grow.',
    body: 'Your series launches and the results follow. Each episode compounds the last, deepening trust, strengthening alignment, and creating a media presence your brand owns permanently. We track what matters and refine as we go.',
  },
];


const BAR_GRADIENT = 'linear-gradient(to bottom, #eeb20b 0%, #ff7f29 50%, #54819a 100%)';

export default function YourSeries() {
  const sectionRef  = useRef<HTMLElement>(null);
  const barColRef   = useRef<HTMLDivElement>(null);
  const b0Ref       = useRef<HTMLDivElement>(null);
  const b1Ref       = useRef<HTMLDivElement>(null);
  const b2Ref       = useRef<HTMLDivElement>(null);
  const blockRefs   = [b0Ref, b1Ref, b2Ref];

  // 0–1: how far the gradient fill has progressed down the bar
  const [fillFrac, setFillFrac] = useState(0);
  // bar height in px (for inner fill div)
  const [barH, setBarH] = useState(400);

  const measureLayout = () => {
    const barEl = barColRef.current;
    if (!barEl) return;
    const h = barEl.offsetHeight;
    setBarH(h > 0 ? h : 400);
  };

  useLayoutEffect(() => {
    measureLayout();
    window.addEventListener('resize', measureLayout);
    return () => window.removeEventListener('resize', measureLayout);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const secEl = sectionRef.current;
      if (!secEl) return;
      const rect  = secEl.getBoundingClientRect();
      const vh    = window.innerHeight;

      const sectionH   = secEl.offsetHeight;
      // start: section top hits viewport bottom
      const startY     = rect.top - vh;          // negative means we've passed start
      // end: last block's midline hits 40% down screen
      const lastBlockEl = b2Ref.current;
      let endY = -sectionH * 0.5; // fallback
      if (lastBlockEl) {
        const lRect = lastBlockEl.getBoundingClientRect();
        endY = lRect.top - vh * 0.40;
      }

      // startY < 0 means section top has passed viewport bottom (we've started scrolling in)
      // endY < 0 means last block has passed 40% of viewport (fill should be complete)
      const scrolled = -startY;          // px scrolled since section entered viewport
      const total    = -(endY - startY); // total px between start and completion
      if (total <= 0) { setFillFrac(1); return; }
      const frac = Math.max(0, Math.min(1, scrolled / total));

      setFillFrac(frac);
    };


    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[840px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">
            Your Series
          </p>
          <h2
            className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: '#43382f' }}
          >
            From strategy to first episode
            <br />
            <span className="font-serif italic">in 90 days.</span>
          </h2>
          <p className="text-[17px] leading-[1.5]" style={{ color: '#43382f' }}>
            Here&apos;s how we build yours.
          </p>
        </div>

        {/* ── Bar + Blocks ── */}
        <div className="flex gap-8 md:gap-10">

          {/* Bar column */}
          <div ref={barColRef} className="flex-shrink-0 self-stretch relative w-3 md:w-6">

            {/* Track: always visible at low opacity, flat ends */}
            <div
              className="absolute inset-0"
              style={{ background: BAR_GRADIENT, opacity: 0.10, borderRadius: 0 }}
            />

            {/* Fill: clip reveal from top — inner div always = barH so gradient proportions stay true */}
            <div
              className="absolute top-0 left-0 right-0 overflow-hidden"
              style={{
                height:       `${fillFrac * 100}%`,
                borderRadius: 0,
                transition:   'height 0.1s linear',
              }}
            >
              <div
                style={{
                  position:   'absolute',
                  top:        0, left: 0, right: 0,
                  height:     `${barH}px`,
                  background: BAR_GRADIENT,
                }}
              />
            </div>

          </div>

          {/* Process blocks */}
          <div className="flex-1">
            {BLOCKS.map((block, i) => (
              <div
                key={block.title}
                ref={blockRefs[i]}
                className={i < BLOCKS.length - 1 ? 'mb-12 md:mb-14' : ''}
              >
                <h3
                  className="text-[17px] md:text-[19px] font-semibold leading-snug mb-3"
                  style={{ color: '#2b3335' }}
                >
                  {block.title}
                </h3>
                <p
                  className="text-[15px] md:text-[16px] leading-[1.65]"
                  style={{ color: '#43382f' }}
                >
                  {block.body}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ── Closing line ── */}
        <p
          className="text-center mt-14 md:mt-16 font-serif italic"
          style={{ color: '#43382f', fontSize: 'clamp(20px, 2.2vw, 22px)', lineHeight: 1.55, maxWidth: '600px', margin: '3.5rem auto 0' }}
        >
          Every series is custom-built around your goals, your audience, and the outcomes that matter most.
        </p>

      </div>
    </section>
  );
}
