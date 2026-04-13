"use client";

import React, { useEffect, useRef, useState } from "react";

const chip = (dark: boolean) => ({
  background: dark ? "rgba(49,57,60,0.1)" : "rgba(255,255,255,0.12)",
});

const STEPS = [
  {
    number: "01",
    title: "Prepare",
    bg: "#f7f3ef",
    textDark: true,
    content: (dark: boolean) => {
      const body   = dark ? "rgba(49,57,60,0.72)" : "rgba(255,255,255,0.82)";
      const bullet = dark ? "rgba(49,57,60,0.5)"  : "rgba(255,255,255,0.6)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            We begin by understanding what job your podcast needs to do. Are you aiming to build trust with patients? Align your clinical team? Position your organization as a thought leader in your therapeutic area?
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            You&apos;ll come away with a clear creative brief that outlines your OKR&apos;s.
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              "Define the outcome you need",
              "Know your people — patients, providers, or internal stakeholders — and how they consume content",
              "How we'll measure success",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.6]" style={{ color: body }}>
                <span className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: bullet }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    },
  },
  {
    number: "02",
    title: "Plan",
    bg: "#ffde5f",
    textDark: true,
    content: (dark: boolean) => {
      const body   = dark ? "rgba(49,57,60,0.72)" : "rgba(255,255,255,0.82)";
      const hdTxt  = dark ? "#31393c"             : "#ffffff";
      const subTxt = dark ? "rgba(49,57,60,0.6)"  : "rgba(255,255,255,0.65)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75] font-medium">
            Set your strategy. Lock in your format. Align your content with your goals and your people.
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            Great podcasts are never winged. We guide your team through a strategy lab to build a show that puts your people first — whether that&apos;s patients navigating a diagnosis, providers staying current on clinical evidence, or internal teams driving alignment.
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            Together, we&apos;ll define the story structure, hosting style, guest criteria, and distribution approach — all tailored to your strategic goals.
          </p>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            This is also where we shape the storytelling format:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { format: "Interview",      desc: "for expert credibility" },
              { format: "Conversational", desc: "for authentic connection" },
              { format: "Narrative",      desc: "for layered, immersive stories" },
              { format: "Panel",          desc: "for inclusive, multi-voice dialogue" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl px-4 py-3" style={chip(dark)}>
                <span className="text-[13px] font-semibold" style={{ color: hdTxt }}>{f.format}</span>
                <span className="text-[13px]" style={{ color: subTxt }}> {f.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            Each choice reflects the solution&apos;s end purpose, as well as your people&apos;s preferred listening style.
          </p>
        </div>
      );
    },
  },
  {
    number: "03",
    title: "Produce",
    bg: "#6b4b3e",
    textDark: false,
    content: (dark: boolean) => {
      const body   = dark ? "rgba(49,57,60,0.72)" : "rgba(255,255,255,0.82)";
      const hdTxt  = dark ? "#31393c"             : "#ffffff";
      const subTxt = dark ? "rgba(49,57,60,0.6)"  : "rgba(255,255,255,0.65)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75] font-medium">
            Record. Edit. Design. Score.
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            From remote interviews to full in-studio production, our award-winning creative team takes care of every detail. We combine technical excellence with editorial oversight to make sure each episode sounds as sharp as the strategy behind it.
          </p>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            Every show is engineered to support your OKR&apos;s — whether that&apos;s engagement, awareness, loyalty, or brand lift.
          </p>
        </div>
      );
    },
  },
  {
    number: "04",
    title: "Package & Distribute",
    bg: "#31393c",
    textDark: false,
    content: (dark: boolean) => {
      const body   = dark ? "rgba(49,57,60,0.72)" : "rgba(255,255,255,0.82)";
      const hdTxt  = dark ? "#31393c"             : "#ffffff";
      const subTxt = dark ? "rgba(49,57,60,0.6)"  : "rgba(255,255,255,0.65)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75] font-medium">
            Deliver to your people. Maximize reach. Track performance.
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            Your podcast is more than a content asset — it&apos;s a branded experience designed to reach the right people at the right moment. We develop distribution strategies tailored to how your patients, providers, and stakeholders actually consume content.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Audio-only",  desc: "Optimized for gated portals, internal comms, and on-demand listening." },
              { label: "Video-first", desc: "Visual storytelling assets that extend the impact and reach of every episode." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl px-4 py-3.5" style={chip(dark)}>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: hdTxt }}>{item.label}</p>
                <p className="text-[13px]" style={{ color: subTxt }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            You&apos;ll receive custom reporting that tracks the KPIs tied to your OKR&apos;s — from engagement and completion rates to loyalty signals and lead generation.
          </p>
        </div>
      );
    },
  },
  {
    number: "05",
    title: "Measure & Optimize",
    bg: "#6290c9",
    textDark: false,
    content: (dark: boolean) => {
      const body   = dark ? "rgba(49,57,60,0.72)" : "rgba(255,255,255,0.82)";
      const hdTxt  = dark ? "#31393c"             : "#ffffff";
      const subTxt = dark ? "rgba(49,57,60,0.6)"  : "rgba(255,255,255,0.65)";
      return (
        <div className="flex flex-col gap-5">
          <p style={{ color: body }} className="text-[15px] leading-[1.75] font-medium">
            Track performance. Iterate. Compound results.
          </p>
          <p style={{ color: body }} className="text-[15px] leading-[1.75]">
            You&apos;ll receive custom reporting tied directly to your OKR&apos;s — from completion rates and engagement depth to brand sentiment and inquiry lift. We review performance together and continuously refine the strategy.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Episode analytics",    desc: "Completion rates, listen-through depth, drop-off points, and engagement growth." },
              { label: "Business impact",      desc: "Lead attribution, inquiry lift, brand sentiment, and retention signals among your people." },
              { label: "Content optimization", desc: "Topic performance, guest resonance, format testing, and distribution tuning." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl px-4 py-3.5" style={chip(dark)}>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: hdTxt }}>{item.label}</p>
                <p className="text-[13px]" style={{ color: subTxt }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: body }} className="text-[14px] leading-[1.6]">
            The goal is a show that doesn&apos;t just perform at launch — it compounds in value and authority over time.
          </p>
        </div>
      );
    },
  },
];

export default function ContentPrism() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-[#31393c] relative px-4 md:px-8 pt-[100px] pb-[90px] overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="text-center max-w-[680px] mx-auto mb-14">

        <h2
          className="text-[#ffffff] text-[40px] md:text-[54px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Create an <span className="font-serif italic">Impactful Series</span><br />with us
        </h2>
        <p
          className="text-[#ffffff]/70 text-[17px] md:text-[19px] leading-[1.65] max-w-[560px] mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          A repeatable system built for healthcare organizations. From clinical alignment to patient education and everything in between.
        </p>
      </div>

      {/* ── Static stacked cards ── */}
      <div className="max-w-[900px] mx-auto flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const isDark       = true;
          const headingColor = "#31393c";
          const numColor     = "#a0522d";

          return (
            <div
              key={i}
              className="overflow-hidden rounded-3xl"
              style={{
                backgroundColor: '#ede0d4',
                boxShadow: '0 4px 0 rgba(160,82,45,0.35)',
              }}
            >
              {/* Header row */}
              <div className="flex items-center px-8 py-7 gap-6 min-h-[110px]">
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <span
                    className="font-light leading-none select-none flex-shrink-0"
                    style={{
                      fontSize: 'clamp(72px, 8vw, 108px)',
                      color: numColor,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-[22px] md:text-[30px] font-light tracking-[-0.01em] leading-[1.15]"
                    style={{ color: headingColor }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Body — always visible */}
              <div
                className="px-8 pb-10"
                style={{ paddingLeft: 'calc(clamp(72px, 8vw, 108px) + 56px)' }}
              >
                <div className="max-w-[520px]">
                  {step.content(isDark)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
