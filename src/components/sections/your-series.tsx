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
  const sectionRef = useRef<HTMLElement>(null);
  const barColRef  = useRef<HTMLDivElement>(null);
  const b0Ref      = useRef<HTMLDivElement>(null);
  const b1Ref      = useRef<HTMLDivElement>(null);
  const b2Ref      = useRef<HTMLDivElement>(null);
  const blockRefs  = [b0Ref, b1Ref, b2Ref];

  const [fillFrac, setFillFrac] = useState(0);
  const [barH, setBarH]         = useState(400);

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
      const rect = secEl.getBoundingClientRect();
      const vh   = window.innerHeight;

      const sectionH    = secEl.offsetHeight;
      const startY      = rect.top - vh;
      const lastBlockEl = b2Ref.current;
      let endY = -sectionH * 0.5;
      if (lastBlockEl) {
        const lRect = lastBlockEl.getBoundingClientRect();
        endY = lRect.top - vh * 0.40;
      }

      const scrolled = -startY;
      const total    = -(endY - startY);
      if (total <= 0) { setFillFrac(1); return; }
      setFillFrac(Math.max(0, Math.min(1, scrolled / total)));
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
            className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ color: '#43382f' }}
          >
            <span className="md:hidden">From strategy to first episode<br /></span>
            <span className="hidden md:inline">From strategy to<br />first episode </span>
            <span className="font-serif italic">in 90 days.</span>
          </h2>
          <p className="text-[17px] leading-[1.65]" style={{ color: '#43382f' }}>
            Every series follows the same proven path.<br />
            Three phases. One complete series. Real outcomes.
          </p>
        </div>

        {/* ── Bar + Blocks ── */}
        <div className="flex gap-8 md:gap-10">

          {/* Bar column */}
          <div ref={barColRef} className="flex-shrink-0 self-stretch relative w-3 md:w-[29px]">

            {/* Track */}
            <div
              className="absolute inset-0"
              style={{ background: BAR_GRADIENT, opacity: 0.10, borderRadius: 0 }}
            />

            {/* Animated fill */}
            <div
              className="absolute top-0 left-0 right-0 overflow-hidden"
              style={{ height: `${fillFrac * 100}%`, borderRadius: 0, transition: 'height 0.1s linear' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: `${barH}px`,
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
                  className="text-[32px] md:text-[34px] font-bold leading-[1.1] tracking-[-0.01em] mb-3"
                  style={{ color: '#2b3335' }}
                >
                  {block.title}
                </h3>
                <p
                  className="text-[14px] md:text-[15px] leading-[1.65]"
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
          className="text-center text-[20px] md:text-[22px] leading-[1.45] mt-14 md:mt-16"
          style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', color: '#2b3335', maxWidth: '600px', margin: '3.5rem auto 0' }}
        >
          Every series is custom-built around your goals, your audience, and the outcomes that matter most.
        </p>

      </div>
    </section>
  );
}
