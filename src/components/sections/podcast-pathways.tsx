"use client";

import React, { useEffect, useRef, useState } from 'react';

const GRADIENT_BG = 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)';

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gpp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gpp)'/%3E%3C/svg%3E")`;

/* ── Card styles ─────────────────────────────────────────── */
const formatCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 12,
  padding: 20,
};

/* ── Decision data ───────────────────────────────────────── */
const decisions = [
  {
    num: '01',
    label: 'WHO ARE YOU REACHING?',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 — Internal */}
        <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ backgroundColor: '#54819a' }}>
          <span
            className="self-start text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-white font-medium leading-snug" style={{ fontSize: 22 }}>
            Your <span className="tracking-widest">TEAM</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 14, lineHeight: 1.6 }}>
            Align your people around a shared vision. From onboarding to leadership messaging, we produce series that carry your values and mission to every member of your organization.
          </p>
        </div>

        {/* Card 2 — Public */}
        <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ backgroundColor: '#3d4d58' }}>
          <span
            className="self-start text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
          >
            Public
          </span>
          <h3 className="text-white font-medium leading-snug" style={{ fontSize: 22 }}>
            Your <span className="tracking-widest">COMMUNITY</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 14, lineHeight: 1.6 }}>
            Earn the trust of the patients, providers, and caregivers who need what you do. Narrative series that educate, empower, and move them to act.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    label: 'WHAT IS YOUR FORMAT?',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: 'Interview',
            ref: 'Think Fresh Air. Think How I Built This.',
            body: 'One voice. One question at a time. The format that positions your spokesperson as the most credible authority in their field.',
          },
          {
            title: 'Conversational',
            ref: 'Think Armchair Expert. Think Dare to Lead.',
            body: 'Two or more voices in genuine dialogue. Unscripted enough to feel real, structured enough to stay on message.',
          },
          {
            title: 'Narrative',
            ref: 'Think This American Life. Think Serial.',
            body: 'A story with a beginning, middle, and end. The format that makes your audience feel something before they understand something.',
          },
          {
            title: 'Panel',
            ref: 'Think Freakonomics Radio. Think The Ezra Klein Show.',
            body: 'Multiple perspectives on a single question. The format that signals intellectual breadth and builds authority through who you bring to the conversation.',
          },
        ].map(({ title, ref, body }) => (
          <div key={title} style={formatCardStyle} className="flex flex-col gap-2">
            <p className="text-white font-medium" style={{ fontSize: 18 }}>{title}</p>
            <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 13, fontStyle: 'italic' }}>{ref}</p>
            <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 13, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '03',
    label: 'WHAT IS YOUR MEDIUM?',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: 'Audio',
            body: 'Spotify, Apple Podcasts, and internal platforms. The format that travels with your audience during their commute, their workout, their daily routine. 71% of podcast listeners tune in during their day without stopping what they\'re doing.',
          },
          {
            title: 'Video',
            body: 'YouTube, social platforms, and internal channels. Video adds a face to the voice and a visual dimension to the story. The format that works across every screen where your audience lives.',
          },
          {
            title: 'Hybrid',
            body: 'Both. One production session becomes your audio series and your video series simultaneously. Maximum reach. One investment.',
          },
        ].map(({ title, body }) => (
          <div key={title} style={formatCardStyle} className="flex flex-col gap-2">
            <p className="text-white font-medium" style={{ fontSize: 18 }}>{title}</p>
            <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 13, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    ),
  },
];

/* ── Sticky scroll panel (desktop) ──────────────────────── */
function StickyDecision({
  decision,
  index,
}: {
  decision: (typeof decisions)[number];
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      className="hidden md:grid grid-cols-[220px_1fr] gap-12 items-start py-16 border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.10)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
      }}
    >
      {/* Left — sticky label */}
      <div className="sticky top-[100px] flex flex-col gap-2 pt-1">
        <span
          className="font-light leading-none select-none"
          style={{ fontSize: 60, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.03em' }}
        >
          {decision.num}
        </span>
        <span
          className="font-semibold tracking-[0.12em] uppercase"
          style={{ fontSize: 12, color: '#54819a' }}
        >
          {decision.label}
        </span>
      </div>

      {/* Right — cards */}
      <div>{decision.content}</div>
    </div>
  );
}

/* ── Mobile decision block ───────────────────────────────── */
function MobileDecision({ decision }: { decision: (typeof decisions)[number] }) {
  return (
    <div className="flex flex-col gap-5 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
      <div className="flex flex-col gap-1">
        <span
          className="font-light leading-none select-none"
          style={{ fontSize: 48, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.03em' }}
        >
          {decision.num}
        </span>
        <span
          className="font-semibold tracking-[0.12em] uppercase"
          style={{ fontSize: 12, color: '#54819a' }}
        >
          {decision.label}
        </span>
      </div>
      {decision.content}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function PodcastPathways() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-[80px] md:pt-[112px] pb-[80px] md:pb-[120px]"
      style={{ background: GRADIENT_BG }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '400px 400px', opacity: 0.28, mixBlendMode: 'overlay' }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className="block text-[15px] font-semibold tracking-[0.1em] uppercase mb-5"
            style={{ ...fade(0), color: 'rgba(249,245,239,0.55)' }}
          >
            Your Series
          </span>
          <h2
            className="text-white text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4 mx-auto"
            style={{ ...fade(0.1), maxWidth: 680 }}
          >
            Launch a complete series<br />
            <span className="font-serif italic">in one quarter</span>
          </h2>
          <p
            className="text-[16px] leading-[1.65] max-w-[560px] mx-auto"
            style={{ ...fade(0.18), color: 'rgba(249,245,239,0.55)' }}
          >
            Here's how we build yours.
          </p>
        </div>

        {/* ── Desktop: sticky scroll decisions ── */}
        <div className="hidden md:block">
          {decisions.map((d, i) => (
            <StickyDecision key={d.num} decision={d} index={i} />
          ))}
        </div>

        {/* ── Mobile: stacked decisions ── */}
        <div className="flex flex-col gap-0 md:hidden">
          {decisions.map((d) => (
            <MobileDecision key={d.num} decision={d} />
          ))}
        </div>

        {/* ── Closing line ── */}
        <p
          className="text-center mt-16 md:mt-20 mx-auto italic"
          style={{ color: 'rgba(255,255,255,0.70)', fontSize: 15, lineHeight: 1.7, maxWidth: 620 }}
        >
          Every series is custom-built around these three decisions. No templates. No one-size-fits-all packages. Just the right series for your goals, your audience, and your moment.
        </p>

      </div>
    </section>
  );
}
