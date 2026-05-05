"use client";

import React from 'react';

const CALLOUTS = [
  {
    title: 'Patient Education & Engagement',
    body: 'Reach the patients living with the conditions you treat.',
  },
  {
    title: 'Clinical Training & HCP Reach',
    body: 'Build authority with providers and drive clinical adoption.',
  },
  {
    title: 'Internal Communications & Culture',
    body: 'Shape a culture that aligns with your mission and values.',
  },
];

const glassStyle = {
  background: 'rgba(255,255,255,0.10)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  maxWidth: 220,
};

const divider = { borderTop: '1px solid rgba(103,114,131,0.15)' };

export default function WhoWeBringTogether() {
  return (
    <section className="bg-[#f9f5ef] w-full overflow-hidden">

      {/* ── Two-column layout ── */}
      <div className="flex flex-col md:flex-row min-h-[640px] md:min-h-[700px]">

        {/* ── Left: video with frosted glass stat card ── */}
        <div className="w-full md:w-[42%] lg:w-[38%] relative flex-shrink-0 min-h-[520px] md:min-h-full self-stretch">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-left"
            src="/stats-idle-time-compressed.mp4"
          />

          {/* Frosted glass 71% card — bottom-right */}
          <div className="absolute bottom-7 right-7 z-10 px-5 py-4 rounded-2xl" style={glassStyle}>
            <p className="text-[#f9f5ef] font-light leading-none tracking-[-0.03em] mb-2" style={{ fontSize: 56 }}>
              71%
            </p>
            <p className="text-[13px] leading-[1.55]" style={{ color: 'rgba(249,245,239,0.80)' }}>
              Of podcast listeners tune in during their daily routine.
              <a
                href="https://www.cohostpodcasting.com/resources/podcasting-unwrapped-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: 'rgba(249,245,239,0.80)' }}
              >4</a>
            </p>
          </div>
        </div>

        {/* ── Right: content ── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-14 md:pt-0 pb-14 md:pb-0">

          {/* Eyebrow */}
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">
            Built for Healthcare
          </p>

          {/* Headline */}
          <h2 className="text-[#2b3335] text-[36px] md:text-[44px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-10 max-w-[520px]">
            Reach patients, providers &amp; teams{' '}
            <br />
            <span className="font-serif italic" style={{ color: '#2b3335' }}>on their terms.</span>
          </h2>

          {/* Stacked list */}
          <div className="max-w-[460px]">
            {CALLOUTS.map(({ title, body }) => (
              <div key={title} style={divider} className="py-6">
                <p className="text-[18px] font-semibold leading-snug mb-1" style={{ color: '#43382f' }}>{title}</p>
                <p className="text-[14px] leading-[1.6]" style={{ color: '#677283' }}>{body}</p>
              </div>
            ))}
            {/* Bottom divider */}
            <div style={divider} />
          </div>

        </div>
      </div>
    </section>
  );
}
