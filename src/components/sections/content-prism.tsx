"use client";

import React, { useEffect, useRef, useState } from "react";

const chip = (dark: boolean) => ({
  background: dark ? "rgba(49,57,60,0.1)" : "rgba(255,255,255,0.12)",
});

const STEPS = [
  {
    number: "01",
    title: "Prepare",
    summary: "We start by getting clear on what success actually looks like for you.",
    bg: "#31393c",
    textDark: false,
    numColor: "rgba(255,255,255,0.18)",
    content: (_dark: boolean) => {
      const body   = "rgba(255,255,255,0.75)";
      const bullet = "#ffde5f";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            Every great series begins with a single question: what does this need to accomplish? We work with you to define the outcomes that matter — for your patients, your providers, or your teams — and build a creative brief that keeps every decision anchored to your goals.
          </p>
          <div className="rounded-xl px-4 py-4" style={{ background: "rgba(255,222,95,0.15)" }}>
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: bullet }}>Together we&apos;ll:</p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Define the outcome you need",
                "Understand your audience and how they consume content",
                "Establish how we'll measure success",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.6]" style={{ color: body }}>
                  <span className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: bullet }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    },
  },
  {
    number: "02",
    title: "Plan",
    summary: "Strategy first. Format second. Never the other way around.",
    bg: "#31393c",
    textDark: false,
    numColor: "rgba(255,255,255,0.18)",
    content: (_dark: boolean) => {
      const body   = "rgba(255,255,255,0.75)";
      const hdTxt  = "#fac12c";
      const subTxt = "rgba(255,255,255,0.55)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            We guide your team through a focused strategy session to build a show around your people, not just your message. Story structure, hosting style, guest criteria, distribution approach — all shaped by who you&apos;re trying to reach and what you need them to do.
          </p>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            This is also where we choose the storytelling format:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { format: "Interview",      desc: "for expert credibility" },
              { format: "Conversational", desc: "for authentic connection" },
              { format: "Narrative",      desc: "for layered, immersive stories" },
              { format: "Panel",          desc: "for inclusive, multi-voice dialogue" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl px-4 py-3" style={{ background: "rgba(250,193,44,0.18)" }}>
                <span className="text-[13px] font-semibold" style={{ color: hdTxt }}>{f.format}</span>
                <span className="text-[13px]" style={{ color: subTxt }}> {f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    number: "03",
    title: "Produce",
    summary: "Record. Edit. Design. Score. Every detail handled.",
    bg: "#31393c",
    textDark: false,
    numColor: "rgba(255,255,255,0.18)",
    content: (_dark: boolean) => {
      const body = "rgba(255,255,255,0.75)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            From remote interviews to full studio production, we manage the entire creative process — combining editorial rigor with technical precision to make sure every episode sounds as sharp as the strategy behind it.
          </p>
        </div>
      );
    },
  },
  {
    number: "04",
    title: "Package & Distribute",
    summary: "Deliver to your people. Maximize reach.",
    bg: "#31393c",
    textDark: false,
    numColor: "rgba(255,255,255,0.18)",
    content: (_dark: boolean) => {
      const body   = "rgba(255,255,255,0.75)";
      const hdTxt  = "#c9896a";
      const subTxt = "rgba(255,255,255,0.55)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            Your podcast is a branded experience, not just a content file. We build distribution strategies around how your audience actually consumes content — then deliver it in the format that reaches them best.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Audio-only",  desc: "Optimized for gated portals, internal comms, and on-demand listening." },
              { label: "Video-first", desc: "Visual storytelling assets that extend the impact and reach of every episode." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl px-4 py-3.5" style={{ background: "rgba(107,75,62,0.35)" }}>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: '#c9896a' }}>{item.label}</p>
                <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    number: "05",
    title: "Measure & Optimize",
    summary: "Track. Iterate. Compound.",
    bg: "#31393c",
    textDark: false,
    numColor: "rgba(255,255,255,0.18)",
    content: (_dark: boolean) => {
      const body   = "rgba(255,255,255,0.75)";
      const hdTxt  = "#e0a81e";
      const subTxt = "rgba(255,255,255,0.55)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            You&apos;ll receive reporting tied to the outcomes that matter — from completion rates and engagement depth to brand sentiment and inquiry lift. We review performance together and refine continuously. The goal isn&apos;t a successful launch. It&apos;s a series that grows in value and authority over time.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Episode analytics",    desc: "Completion rates, listen-through depth, drop-off points, and engagement growth." },
              { label: "Business impact",      desc: "Lead attribution, inquiry lift, brand sentiment, and retention signals among your people." },
              { label: "Content optimization", desc: "Topic performance, guest resonance, format testing, and distribution tuning." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl px-4 py-3.5" style={{ background: "rgba(224,168,30,0.15)" }}>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: hdTxt }}>{item.label}</p>
                <p className="text-[13px]" style={{ color: subTxt }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
];

export default function ContentPrism() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [openIdx,  setOpenIdx]  = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    const fallback = setTimeout(() => setVisible(true), 1000);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative px-4 md:px-8 pt-[40px] md:pt-[80px] pb-[90px] bg-[#f7f3ef]"
    >
      {/* ── Header ── */}
      <div className="text-center max-w-[680px] mx-auto mb-10">
        <p
          className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          Our Process
        </p>
        <div
          className="flex justify-center gap-2 mb-6"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.12s" }}
        >
          {[
            { label: 'Audio',         bg: '#ffde5f', color: '#1a1a1a' },
            { label: 'Video',         bg: '#fac12c', color: '#1a1a1a' },
            { label: 'Audio + Video', bg: '#e09a18', color: '#1a1a1a' },
          ].map(({ label, bg, color }) => (
            <span key={label} className="text-[12px] font-semibold tracking-[0.05em] px-3 py-1.5 rounded-full" style={{ backgroundColor: bg, color }}>{label}</span>
          ))}
        </div>
        <h2
          className="text-[#31393c] text-[40px] md:text-[54px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          A proven system,<br /><span className="font-serif italic">start to finish</span>
        </h2>
        <p
          className="text-[#31393c]/70 text-[17px] md:text-[19px] leading-[1.65] max-w-[560px] mx-auto"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
          }}
        >
          From clinical alignment to patient education and everything in between.
        </p>
      </div>

      {/* ── Accordion cards ── */}
      <div
        className="max-w-[900px] mx-auto"
        style={{
          borderRadius: '16px',
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        }}
      >
        {STEPS.map((step, i) => {
          const isOpen       = openIdx === i;
          const isDark       = step.textDark;
          const headingColor = isDark ? '#31393c'             : '#ffffff';
          const numColor     = step.numColor;
          const summaryColor = isDark ? 'rgba(49,57,60,0.6)'  : 'rgba(255,255,255,0.65)';
          const chevronColor = isDark ? 'rgba(49,57,60,0.45)' : 'rgba(255,255,255,0.5)';
          const dividerColor = isDark ? 'rgba(49,57,60,0.1)'  : 'rgba(255,255,255,0.1)';

          return (
            <div
              key={i}
              style={{
                backgroundColor: step.bg,
                borderBottom: i < STEPS.length - 1 ? `1px solid ${dividerColor}` : 'none',
                borderRadius: i === 0 ? '16px 16px 0 0' : i === STEPS.length - 1 ? '0 0 16px 16px' : '0',
              }}
            >
              {/* Clickable header row */}
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left flex items-center gap-5 md:gap-8 px-6 md:px-10 py-6 md:py-7"
                style={{ cursor: 'pointer' }}
              >
                {/* Number */}
                <span
                  className="font-light leading-none select-none flex-shrink-0 hidden md:block text-center"
                  style={{ fontSize: 'clamp(48px, 5vw, 72px)', color: numColor, letterSpacing: '-0.04em', width: 'clamp(48px, 5vw, 72px)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {step.number}
                </span>
                <span
                  className="font-light leading-none select-none flex-shrink-0 md:hidden text-center"
                  style={{ fontSize: '36px', color: numColor, letterSpacing: '-0.04em', width: '36px', fontVariantNumeric: 'tabular-nums' }}
                >
                  {step.number}
                </span>

                {/* Title + summary */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[18px] md:text-[24px] font-light tracking-[-0.01em] leading-[1.2] mb-1"
                    style={{ color: headingColor }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] leading-[1.55]" style={{ color: summaryColor }}>
                    {step.summary}
                  </p>
                </div>

                {/* Chevron */}
                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: chevronColor }}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Expandable body */}
              <div
                style={{
                  maxHeight:  isOpen ? '600px' : '0px',
                  overflow:   'hidden',
                  transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div
                  className="pb-8"
                  style={{
                    paddingLeft:  'clamp(24px, calc(2.5rem + clamp(48px, 5vw, 72px) + 2rem), calc(2.5rem + 72px + 2rem))',
                    paddingRight: 'clamp(24px, 2.5rem, 2.5rem)',
                  }}
                >
                  <div className="max-w-[520px]">
                    {step.content(isDark)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
