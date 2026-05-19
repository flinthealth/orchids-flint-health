"use client";

import React from 'react';

const CALLOUTS = [
  {
    title: 'Patient Education & Engagement',
    titleTablet: null,
    body: 'Reach the patients living with the conditions you treat.',
    stat: '9 in 10',
    statColor: '#eeb20b',
    statLabel: ['PATIENTS', 'STRUGGLE WITH', 'HEALTH INFORMATION'],
    statLabelMobile: ['PATIENTS STRUGGLE WITH', 'HEALTH INFORMATION'],
    cite: '5',
    citeUrl: 'https://www.cdc.gov/health-literacy/php/about/tell-others.html',
  },
  {
    title: 'Clinical Training & HCP Reach',
    titleTablet: null,
    body: 'Build authority with providers and drive clinical adoption.',
    stat: '75%',
    statColor: '#54819a',
    statLabel: ['OF CLINICIANS', 'OVERWHELMED BY', 'TREATMENT ADVANCES'],
    statLabelMobile: ['OF CLINICIANS OVERWHELMED BY', 'TREATMENT ADVANCES'],
    cite: '6',
    citeUrl: 'https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly',
  },
  {
    title: 'Internal Communications & Culture',
    titleTablet: 'Culture & Internal Communications',
    body: 'Shape a culture that aligns with your mission and values.',
    stat: '$12K+',
    statColor: '#4a5a66',
    statLabel: ['COST OF', 'POOR COMMUNICATION', 'PER EMPLOYEE'],
    statLabelMobile: ['COST OF POOR COMMUNICATION', 'PER EMPLOYEE'],
    cite: '7',
    citeUrl: 'https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/',
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
      <div className="flex flex-col md:flex-row min-h-[640px] md:min-h-[700px] lg:min-h-[820px] xl:min-h-[900px]">

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

          {/* Frosted glass 92% card — bottom-right */}
          <div className="absolute bottom-7 right-7 z-10 px-5 py-4 rounded-2xl" style={glassStyle}>
            <p className="text-[#f9f5ef] font-light leading-none tracking-[-0.03em] mb-2" style={{ fontSize: 56 }}>
              92%
            </p>
            <p className="text-[13px] leading-[1.55]" style={{ color: 'rgba(249,245,239,0.80)' }}>
              Of podcast listeners tune in during their daily routine.
              <a
                href="https://www.westwoodone.com/wp-content/uploads/2025/11/Cumulus-Media-and-Signal-Hill-Insights-Podcast-Download-Fall-2025_WWO.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: 'rgba(249,245,239,0.80)' }}
              >4</a>
            </p>
          </div>
        </div>

        {/* ── Right: content ── */}
        {/* tablet (md): extra top padding; desktop (lg): vertically centred, no top pad */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-14 md:pt-16 lg:pt-0 pb-14 md:pb-0">

          {/* Eyebrow */}
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">
            Built for Healthcare
          </p>

          {/* Headline */}
          <h2 className="text-[#2b3335] text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-10 max-w-[520px]">
            Reach patients, providers &amp; teams{' '}
            <br />
            <span className="font-serif italic" style={{ color: '#2b3335' }}>on their terms.</span>
          </h2>

          {/* Stacked list */}
          <div className="lg:flex lg:flex-col lg:gap-0 w-full max-w-[640px]">
            {CALLOUTS.map(({ title, titleTablet, body, stat, statColor, statLabel, statLabelMobile, cite, citeUrl }) => (
              <div key={title} style={divider} className="py-6">

                {/* Mobile: stacked (title+body then stat below) */}
                <div className="md:hidden">
                  <p className="text-[18px] font-semibold leading-snug mb-1" style={{ color: '#43382f' }}>{title}</p>
                  <p className="text-[14px] leading-[1.6] mb-4" style={{ color: '#43382f' }}>{body}</p>
                  <div>
                    <p
                      className="font-light leading-none tracking-[-0.03em] mb-1.5"
                      style={{ fontSize: 36, color: statColor }}
                    >
                      {stat}
                    </p>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.1em] leading-snug"
                      style={{ color: '#677283' }}
                    >
                      {statLabelMobile[0]}<br />{statLabelMobile[1]}
                      <a
                        href={citeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                        style={{ fontSize: 8 }}
                      >{cite}</a>
                    </p>
                  </div>
                </div>

                {/* Tablet + Desktop: side-by-side */}
                <div className="hidden md:flex flex-row items-start justify-between gap-6">
                  {/* Left: title + body */}
                  <div className="flex-1 min-w-0">
                    {/* Tablet shows titleTablet if set, desktop always shows title */}
                    <p className="text-[18px] font-semibold leading-snug mb-1 md:hidden lg:block" style={{ color: '#43382f' }}>{title}</p>
                    {titleTablet && (
                      <p className="text-[18px] font-semibold leading-snug mb-1 hidden md:block lg:hidden" style={{ color: '#43382f' }}>{titleTablet}</p>
                    )}
                    {!titleTablet && (
                      <p className="text-[18px] font-semibold leading-snug mb-1 hidden md:block lg:hidden" style={{ color: '#43382f' }}>{title}</p>
                    )}
                    <p className="text-[14px] leading-[1.6]" style={{ color: '#43382f' }}>{body}</p>
                  </div>
                  {/* Right: stat number + label */}
                  <div className="flex-shrink-0 text-right" style={{ minWidth: 110 }}>
                    <p
                      className="font-light leading-none tracking-[-0.03em] mb-1.5"
                      style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: statColor }}
                    >
                      {stat}
                    </p>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.1em] leading-snug"
                      style={{ color: '#677283' }}
                    >
                      {statLabel[0]}<br />{statLabel[1]}<br />{statLabel[2]}
                      <a
                        href={citeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                        style={{ fontSize: 8 }}
                      >{cite}</a>
                    </p>
                  </div>
                </div>

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
