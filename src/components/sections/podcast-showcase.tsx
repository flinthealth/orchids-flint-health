"use client";

import React, { useEffect, useRef, useState } from "react";

const CASE_STUDIES = [
  {
    title: "Equipped to Recover",
    image: "/podcast-equipped-to-recover.webp",
    client: "Equip Health",
    tag: "Virtual Treatment",
    description:
      "An interview-based series developed with Equip Health through a patient advocacy partnership, combining recovery stories and clinical insight to help patients and families recognize symptoms, feel less alone, and take action. After 8 months of traditional digital promotion across the partnership's channels, the podcast debuted and drove a 257% lift in treatment inquiries in its first 3 months on air.",
    stats: [
      { value: "24",     label: "Episodes" },
      { value: "75K+",   label: "Downloads in 90 days" },
      { value: "1.26M+", label: "Cross-channel campaign reach", highlight: true },
    ],
  },
  {
    title: "In This Body",
    image: "/podcast-in-this-body.webp",
    client: "Reasons Eating Disorder Center",
    tag: "Residential Treatment",
    description:
      "An interview-based series created to challenge assumptions around eating disorders and expand representation in care through diverse lived experience perspectives.",
    stats: [
      { value: "12",     label: "Episodes" },
      { value: "45 min", label: "Avg Listen Time" },
      { value: "139K+",  label: "Downloads in 5 months", highlight: true },
    ],
  },
  {
    title: "The Recovery Warrior Shows",
    image: "/podcast-recovery-warrior.webp",
    client: "Recovery Warriors",
    tag: "Advocacy Community",
    description:
      "Built and scaled a multi-show podcast channel from a single show into a network of formats, expanding reach and driving patient acquisition in behavioral health.",
    stats: [
      { value: "300+",  label: "Episodes Produced" },
      { value: "4",     label: "Show Formats" },
      { value: "3.8M+", label: "Lifetime Downloads", highlight: true },
    ],
  },
];

type Stat = { value: string; label: string; highlight?: boolean };

function StatItem({ stat }: { stat: Stat }) {
  const parts = stat.label.split('\n');
  return (
    <div className="flex flex-col">
      <span
        className="text-[22px] font-medium leading-none tracking-[-0.02em]"
        style={{ color: stat.highlight ? "#ff7f29" : "#43382f" }}
      >
        {stat.value}
      </span>
      <span
        className="text-[10px] font-semibold tracking-[0.12em] uppercase mt-1.5 leading-snug"
        style={{ color: "#677283" }}
      >
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && <br className="hidden md:block lg:hidden" />}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}

function CaseStudyCard({
  image, title, client, tag, description, stats, style,
}: {
  image: string; title: string; client: string; tag: string;
  description: string; stats: Stat[]; style: React.CSSProperties;
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        border: "0.5px solid rgba(103,114,131,0.15)",
        ...style,
      }}
    >
      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex flex-row" style={{ minHeight: 280 }}>
        {/* Artwork — 280×280px square */}
        <div
          className="flex-shrink-0 bg-[#d8cfc4]"
          style={{ width: 280, height: 280, flexShrink: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between p-6 gap-4">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-1.5"
              style={{ color: "#677283" }}
            >
              {tag}
            </p>
            <h3
              className="text-[22px] font-medium leading-[1.2] tracking-[-0.01em] mb-1"
              style={{ color: "#43382f" }}
            >
              {title}
            </h3>
            <p className="text-[13px] font-medium mb-3" style={{ color: "#54819a" }}>
              {client}
            </p>
            <p
              className="text-[15px] leading-[1.5]"
              style={{ color: "#43382f" }}
            >
              {description}
            </p>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-row flex-wrap md:flex-nowrap gap-x-8 gap-y-3 pt-4"
            style={{ borderTop: "0.5px solid rgba(103,114,131,0.15)" }}
          >
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="flex flex-col md:hidden">
        {/* Artwork — full width, square */}
        <div className="w-full bg-[#d8cfc4]" style={{ aspectRatio: "1/1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6">
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-1.5"
              style={{ color: "#677283" }}
            >
              {tag}
            </p>
            <h3
              className="text-[20px] font-medium leading-[1.2] tracking-[-0.01em] mb-1"
              style={{ color: "#43382f" }}
            >
              {title}
            </h3>
            <p className="text-[13px] font-medium mb-3" style={{ color: "#54819a" }}>
              {client}
            </p>
            <p
              className="text-[15px] leading-[1.5]"
              style={{ color: "#43382f" }}
            >
              {description}
            </p>
          </div>

          {/* Stats — mobile: 3 centered rows */}
          <div
            className="flex flex-col items-center gap-4 pt-5"
            style={{ borderTop: "0.5px solid rgba(103,114,131,0.15)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span
                  className="block text-[22px] font-medium leading-none tracking-[-0.02em]"
                  style={{ color: s.highlight ? "#ff7f29" : "#43382f" }}
                >
                  {s.value}
                </span>
                <span
                  className="block text-[10px] font-semibold tracking-[0.12em] uppercase mt-1.5 leading-snug"
                  style={{ color: "#677283" }}
                >
                  {s.label.replace('\n', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PodcastShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    const fallback = setTimeout(() => setVisible(true), 1200);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      id="our-work"
      ref={sectionRef}
      className="relative pt-[88px] md:pt-[100px] pb-[100px] md:pb-[120px] px-6 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)' }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />
      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12" style={fade(0)}>
          <p
            className="text-[15px] font-semibold tracking-[0.1em] uppercase mb-5"
            style={{ color: "rgba(249,245,239,0.55)" }}
          >
            In Practice
          </p>
          <h2
            className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ color: "#ffffff" }}
          >
            Real results for{" "}
            <span className="font-serif italic" style={{ color: "#ffffff" }}>healthcare brands</span>
          </h2>
          <p
            className="text-[17px] leading-[1.5] max-w-[520px] mx-auto"
            style={{ color: "rgba(249,245,239,0.55)" }}
          >
            Proof that when the right{" "}
            <br className="md:hidden" />
            message meets the right audience,{" "}
            <br className="md:hidden" />
            something measurable happens.
          </p>
        </div>

        {/* Case study cards */}
        <div className="flex flex-col gap-8">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.title} {...cs} style={fade(0.2 + i * 0.12)} />
          ))}
        </div>
      </div>
    </section>
  );
}
