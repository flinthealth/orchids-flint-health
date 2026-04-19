"use client";

import React, { useEffect, useRef, useState } from "react";

const CASE_STUDIES = [
  {
    title: "Equipped to Recover",
    image: "/podcast-equipped-to-recover.webp",
    client: "Equip Health",
    tag: "Virtual Eating Disorder Treatment",
    stats: [
      { value: "24",     label: "episodes" },
      { value: "75K+",   label: "downloads in 90 days" },
      { value: "7K+",    label: "engagements" },
      { value: "+257%",  label: "treatment inquiries", up: true },
    ],
    description:
      "An interview-based series developed with Equip that combined recovery stories and clinical insight to help patients and families recognize symptoms, feel less alone, and take action.\n\nHosted by Equip's co-founders, the series positioned leadership and clinical staff as trusted voices in recovery.",
  },
  {
    title: "In This Body",
    image: "/podcast-in-this-body.webp",
    client: "Reasons Eating Disorder Center",
    tag: "Residential Eating Disorder Treatment",
    stats: [
      { value: "12",     label: "episodes" },
      { value: "45 min", label: "avg. listen time" },
      { value: "139K+",  label: "downloads in 5 months", fullWidth: true },
    ],
    description:
      "An interview-based series created with Reasons Eating Disorder Center to challenge assumptions around eating disorders and expand representation in care through diverse lived experience perspectives.\n\nHosted by a member of the admissions and marketing team, the series demonstrated how internal voices can be developed into trusted, engaging hosts.",
  },
];

const NETWORK = {
  title: "The Recovery Warrior Shows",
  image: "/podcast-recovery-warrior.webp",
  client: "Recovery Warriors",
  tag: "Advocacy Podcast Network",
  stats: [
    { value: "145",        label: "episodes produced" },
    { value: "500K+",      label: "annual downloads" },
    { value: "4",          label: "show formats" },
    { value: "+600%",      label: "download growth YoY", up: true },
  ],
  description:
    "Built and scaled a multi-show podcast network to expand reach, build trust, and drive patient acquisition in behavioral health.\n\nDeveloped and coached first-time hosts across multiple series, expanding the network's voice and reach.",
};

type Stat = { value: string; label: string; up?: boolean; fullWidth?: boolean };

function StatCell({
  s, arrayIdx, mobileCol, mobileBottomRow,
}: {
  s: Stat; arrayIdx: number; mobileCol: number; mobileBottomRow: boolean;
}) {
  const isFullWidth = !!s.fullWidth;

  // Mobile: right-column items get left border; bottom-row items get top border
  // Desktop: every item except the first gets a left border; no top borders
  const classes = [
    'flex flex-col py-4 px-4',
    isFullWidth ? 'col-span-2 md:col-span-1' : '',
    !isFullWidth && mobileCol % 2 !== 0 ? 'border-l border-white/20' : '',
    mobileBottomRow ? 'border-t border-white/20' : '',
    arrayIdx > 0 ? 'md:border-l md:border-white/20' : '',
    'md:border-t-0',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${classes}${isFullWidth ? ' md:items-start items-center text-center md:text-left' : ''}`}>
      <div className="flex items-center gap-1">
        <span className="text-white text-[22px] font-light leading-none tracking-[-0.02em]">{s.value}</span>
        {s.up && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mb-0.5 flex-shrink-0">
            <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-white/60 text-[11px] font-medium tracking-[0.06em] uppercase mt-1 leading-snug">{s.label}</span>
    </div>
  );
}

function StatsBar({ stats }: { stats: Stat[] }) {
  const count        = stats.length;
  const hasFullWidth = stats.some(s => s.fullWidth);
  const mdCols       = count === 3 ? 'md:grid-cols-3' : count === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  let mobileCol      = 0;
  return (
    <div
      className={`grid grid-cols-2 ${mdCols} relative overflow-hidden px-8 md:px-10 py-6 md:py-7`}
      style={{ background: 'linear-gradient(to right, #3d4446 0%, #5a4035 50%, #7a4428 100%)' }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gsb'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gsb)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.28, mixBlendMode: 'overlay' }} />
      {/* Full-height vertical center divider on mobile when a fullWidth row exists */}
      {hasFullWidth && (
        <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-px -translate-x-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      )}
      {stats.map((s, arrayIdx) => {
        const result = (
          <StatCell
            key={s.label}
            s={s}
            arrayIdx={arrayIdx}
            mobileCol={mobileCol}
            mobileBottomRow={mobileCol >= 2}
          />
        );
        mobileCol += s.fullWidth ? 2 : 1;
        return result;
      })}
    </div>
  );
}

function PodcastCard({
  image, title, client, tag, description, stats, fadeStyle,
}: {
  image: string; title: string; client: string; tag: string;
  description: string; stats: Stat[]; fadeStyle: React.CSSProperties;
}) {
  return (
    <div className="bg-white overflow-hidden flex flex-col" style={fadeStyle}>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden flex flex-col">
        <div className="relative w-full aspect-square">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-contain" />
        </div>
        <div className="p-8">
          <p className="text-[#31393c]/50 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">{tag}</p>
          <h3 className="text-[#31393c] text-[28px] font-light leading-[1.1] tracking-[-0.02em]">{title}</h3>
          <p className="text-[#6290c9] text-[13px] font-medium mt-1 mb-5">{client}</p>
          <div className="flex flex-col gap-3">
            {description.split('\n\n').map((para, j) => (
              <p key={j} className="text-[#6b6560] text-[14px] leading-[1.7]">{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: artwork + text row, then stats full-width ── */}
      <div className="hidden md:flex flex-row gap-8 p-10 pb-8">
        {/* Square artwork */}
        <div className="relative flex-shrink-0 w-[220px] h-[220px] rounded-2xl overflow-hidden bg-[#ffffff]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-contain" />
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[#31393c]/50 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">{tag}</p>
          <h3 className="text-[#31393c] text-[32px] font-light leading-[1.1] tracking-[-0.02em]">{title}</h3>
          <p className="text-[#6290c9] text-[13px] font-medium mt-1 mb-5">{client}</p>
          <div className="flex flex-col gap-3">
            {description.split('\n\n').map((para, j) => (
              <p key={j} className="text-[#6b6560] text-[14px] leading-[1.7]">{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Stats — full card width on both breakpoints */}
      <div className="mt-auto">
        <StatsBar stats={stats} />
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
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(el);
    const fallback = setTimeout(() => setVisible(true), 1200);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      id="our-work"
      ref={sectionRef}
      className="relative pt-[88px] md:pt-[80px] pb-[100px] px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#f7f3ef' }}
    >
      {/* Content */}
      <div className="relative z-[2]">
      {/* Header */}
      <div className="text-center max-w-[620px] mx-auto mb-16">
        <div className="mb-5">
          <span className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase">
            In Practice
          </span>
        </div>
        <h2
          className="text-[#1a1a1a] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
          style={fade(0)}
        >
          Real results for<span className="hidden md:inline"><br /></span><span className="md:hidden"> </span><span className="font-serif italic">healthcare brands</span>
        </h2>
        <p className="text-[#6b6560] text-[15px] md:text-[16px] leading-[1.65]" style={fade(0.2)}>
          Proof that when the right message meets the right audience, something measurable happens.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-10 max-w-[1060px] mx-auto">

        {CASE_STUDIES.map((pod, i) => (
          <PodcastCard key={pod.title} {...pod} fadeStyle={fade(0.3 + i * 0.12)} />
        ))}
        <PodcastCard {...NETWORK} fadeStyle={fade(0.55)} />


        {/* ── Very Health testimonial ── */}
        <div
          className="bg-white overflow-hidden"
          style={fade(0.72)}
        >
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Image */}
            <div className="w-full md:w-[280px] flex-shrink-0 bg-white flex items-start justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/testimonial-erin-knopf.jpg"
                alt="Dr. Erin Knopf"
                className="w-full object-contain p-4 md:pt-10 md:px-8 md:pb-0"
              />
            </div>
            {/* Quote */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <blockquote className="text-[16px] md:text-[18px] leading-[1.65] text-[#31393c] font-light mb-6">
                &ldquo;Thank you for the refresh in our brand and marketing strategy! You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality. Thank you for all of your efforts, patience and direction you provided us.&rdquo;
              </blockquote>
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-[#31393c]">Dr. Erin Knopf</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/testimonial-very-logo.png"
                  alt="VERY Health"
                  className="object-contain object-left"
                  style={{ width: 110, height: 36 }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>{/* end z-[2] content wrapper */}
    </section>
  );
}
