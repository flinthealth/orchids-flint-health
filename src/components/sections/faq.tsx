"use client";

import React, { useState, useRef, useEffect } from "react";
import { AlignLeft, Target, Layers, Cast, TrendingUp, GitFork } from "lucide-react";

/* ── Comparison table data (from Serious About Series) ── */

const CAT_ICONS: Record<string, React.ReactNode> = {
  Structure:    <AlignLeft   size={14} color="#43382f" />,
  Purpose:      <Target      size={14} color="#43382f" />,
  Production:   <Layers      size={14} color="#43382f" />,
  Distribution: <Cast        size={14} color="#43382f" />,
  ROI:          <TrendingUp  size={14} color="#43382f" />,
  Syndication:  <GitFork     size={14} color="#43382f" />,
};

const ROWS = [
  {
    cat: "Structure",
    podcast: "Open-ended, no set finish",
    series: "A complete arc, one series or multiple seasons.",
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: "Episodes are independent. Listeners can start anywhere. No predetermined end date.",
      series: "A defined arc with a clear destination. Built as one complete series or structured across seasons, each with its own objective.",
    },
  },
  {
    cat: "Purpose",
    podcast: "Audience growth over time",
    series: "Drive a specific behavior or outcome",
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: "Built for long-term audience cultivation. Success measured in listener numbers over months or years.",
      series: "Engineered to drive a specific behavior or outcome: clinical adoption, patient action, team alignment.",
    },
  },
  {
    cat: "Production",
    podcast: "Ongoing publishing schedule",
    series: "Built once, deployed for years",
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: "Requires permanent production commitment. Stopping publication means losing audience momentum.",
      series: "Batch-produced in a focused window. A permanent asset deployed across channels without ongoing cost.",
    },
  },
  {
    cat: "Distribution",
    podcast: "Public feed",
    series: "Multiple channels",
    seriesSub: "Internal and public facing",
    podcastSub: "Spotify, Apple, YouTube",
    popover: {
      podcast: "Lives on public podcast platforms. Reaches whoever discovers it through search or recommendations.",
      series: "Spotify, Apple, YouTube plus onboarding flows, training programs, patient portals, and social clips.",
    },
  },
  {
    cat: "ROI",
    podcast: "Reach and downloads",
    series: "The KPIs that matter most",
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: "Success is audience size and growth. Hard to tie directly to revenue or behavioral change.",
      series: "Episode retention, behavioral shifts, training completion, treatment inquiries, referrals.",
    },
  },
  {
    cat: "Syndication",
    podcast: "Your feed only.",
    series: "Can launch on established niche channels.",
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: "You own the feed and build the audience yourself. Growth is slow and starts from zero.",
      series: "Air on established channels with existing healthcare audiences. Your series reaches the right people from the first episode.",
    },
  },
];

/* ── Comparison table component (extracted for reuse inside accordion) ── */

function ComparisonTable() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeRow === null) { setPopoverPos(null); return; }
    const btn = buttonRefs.current[activeRow];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const popW = 260;
    const popH = 180;
    const margin = 8;

    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popW - margin));

    let top = rect.bottom + 8;
    if (top + popH > window.innerHeight - margin) {
      top = rect.top - popH - 8;
    }

    setPopoverPos({ top, left });
  }, [activeRow]);

  useEffect(() => {
    if (activeRow === null) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const popoverEl = document.getElementById('sas-popover');
      const btnEl = buttonRefs.current[activeRow];
      if (popoverEl && !popoverEl.contains(target) && btnEl && !btnEl.contains(target)) {
        setActiveRow(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeRow]);

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .sas-faq-table-wrapper {
            margin-left: -24px;
            margin-right: -24px;
            width: calc(100% + 48px);
          }
          .sas-faq-cat-cell {
            width: 72px;
            padding-right: 8px;
            padding-left: 8px;
          }
          .sas-faq-cat-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .sas-faq-cat-label {
            font-size: 11px;
          }
          .sas-faq-podcast-cell {
            padding-right: 8px;
            width: 26%;
          }
          .sas-faq-series-cell {
            padding-left: 8px;
            width: 44%;
          }
          .sas-faq-data-cell {
            padding-top: 14px;
            padding-bottom: 14px;
          }
        }
      `}</style>
      <div className="sas-faq-table-wrapper" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '80px', paddingLeft: '16px', paddingRight: '16px' }} />
              <th className="text-left pb-3 border-b border-[rgba(43,51,53,0.15)] pl-2 md:pl-8 pr-3"
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#677283' }}>
                Podcast
              </th>
              <th style={{ width: '48px', paddingBottom: '12px', borderBottom: '1px solid rgba(43,51,53,0.15)' }} />
              <th className="pl-4 pb-3 border-b border-[rgba(43,51,53,0.15)] text-left"
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ff7f29' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff7f29', display: 'inline-block', flexShrink: 0 }} />
                  Strategic series
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.cat} style={{ borderBottom: i < ROWS.length - 1 ? '1px solid rgba(43,51,53,0.08)' : 'none' }}>
                <td className="sas-faq-cat-cell" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#43382f', paddingTop: '22px', paddingBottom: '22px', paddingRight: '16px', paddingLeft: '16px', width: '80px', verticalAlign: 'middle', background: '#e1dfdd' }}>
                  <div className="sas-faq-cat-inner flex items-center gap-2">
                    {CAT_ICONS[row.cat]}
                    <span className="sas-faq-cat-label">{row.cat}</span>
                  </div>
                </td>
                <td className="sas-faq-podcast-cell sas-faq-data-cell pl-2 md:pl-8" style={{ fontSize: '15px', color: '#43382f', paddingTop: '22px', paddingBottom: '22px', paddingRight: '12px', verticalAlign: 'middle', lineHeight: 1.35 }}>
                  {row.podcast}
                  {row.podcastSub && (
                    <span style={{ fontSize: '13px', color: 'rgba(67,56,47,0.55)', display: 'block', marginTop: '2px' }}>{row.podcastSub}</span>
                  )}
                </td>
                <td style={{ width: '48px', verticalAlign: 'middle', textAlign: 'center' }} />
                <td className="sas-faq-series-cell sas-faq-data-cell" style={{ fontSize: '15px', fontWeight: 500, color: '#2b3335', paddingTop: '22px', paddingBottom: '22px', paddingLeft: '16px', paddingRight: '24px', verticalAlign: 'middle', lineHeight: 1.35, borderLeft: '2px solid rgba(255,127,41,0.25)', background: 'rgba(255,127,41,0.03)', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{row.series}</span>
                    <button
                      ref={el => { buttonRefs.current[i] = el; }}
                      onClick={() => setActiveRow(activeRow === i ? null : i)}
                      style={{
                        width: '16px', height: '16px', borderRadius: '50%', border: '1px solid rgba(103,114,131,0.35)',
                        background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0, color: '#677283',
                        fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '10px',
                        transition: 'border-color 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ff7f29'; (e.currentTarget as HTMLElement).style.color = '#ff7f29'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(103,114,131,0.35)'; (e.currentTarget as HTMLElement).style.color = '#677283'; }}
                      aria-label={`More info about ${row.cat}`}
                    >
                      i
                    </button>
                  </div>
                  {row.seriesSub && (
                    <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(43,51,53,0.5)', display: 'block', marginTop: '2px' }}>{row.seriesSub}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popover */}
      {activeRow !== null && popoverPos && (
        <div
          id="sas-popover"
          style={{
            position: 'fixed',
            top: popoverPos.top,
            left: popoverPos.left,
            width: '260px',
            background: '#2b3335',
            borderRadius: '8px',
            padding: '14px 16px',
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
          }}
        >
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#ff7f29', marginBottom: '8px' }}>
            {ROWS[activeRow].cat}
          </p>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.35)', marginBottom: '4px' }}>
            PODCAST
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(249,245,239,0.5)', lineHeight: 1.6, paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px solid rgba(249,245,239,0.1)' }}>
            {ROWS[activeRow].popover.podcast}
          </p>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#ff7f29', marginBottom: '4px' }}>
            STRATEGIC SERIES
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(249,245,239,0.85)', lineHeight: 1.6 }}>
            {ROWS[activeRow].popover.series}
          </p>
        </div>
      )}
    </>
  );
}

function SeriesFormats() {
  const FORMATS = [
    {
      icon: '/icon-narrative-v3.png',
      title: 'Narrative',
      subtitle: 'Story-arc driven',
      desc: 'Documentary-style, multiple perspectives woven into one arc. Great for a journey or transformation.',
      ref: "Like Serial or This American Life — for healthcare",
    },
    {
      icon: '/icon-interview-v8.png',
      title: 'Interview',
      subtitle: 'Guest-driven depth',
      desc: 'One guest, one conversation at a time. Builds authority and trust episode by episode.',
      ref: "Like Armchair Expert or Fresh Air — for healthcare",
    },
    {
      icon: '/icon-conversational-v10.png',
      title: 'Conversational',
      subtitle: 'Co-host chemistry',
      desc: 'Two hosts make dense clinical topics feel accessible for public or internal audiences.',
      ref: "Crime Junkie or Stuff You Should Know — for healthcare",
    },
    {
      icon: '/icon-panel-v4.png',
      title: 'Panel',
      subtitle: 'Multi-expert voices',
      desc: 'Multiple experts in dialogue or debate. Signals range, depth, and influence.',
      ref: "Like Intelligence Squared or TED Radio Hour — for healthcare",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {FORMATS.map((f) => (
        <div key={f.title}>
          <div className="flex items-center gap-3 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.icon} className="w-14 h-14 object-contain flex-shrink-0" alt="" />
            <div>
              <p className="text-[15px] font-bold uppercase tracking-[0.04em] text-[#43382f]">{f.title}</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#677283]">{f.subtitle}</p>
            </div>
          </div>
          <p className="text-[14px] text-[#43382f] leading-relaxed mb-1">{f.desc}</p>
          <p className="font-serif italic text-[13px] text-[#677283]">{f.ref}</p>
        </div>
      ))}
    </div>
  );
}

/* ── FAQ data (unchanged) ── */

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "How long does it take to launch a series?",
    a: [
      "Most series launch within one quarter, typically 10 to 12 weeks from strategy through first publish. Launch means your series is live and in market. Production of additional episodes can continue well beyond that, building your content library over time.",
    ],
  },
  {
    q: "Do we need experienced hosts?",
    a: [
      "No on-camera or on-mic experience is necessary. Host development and coaching is part of our process.",
      "We've worked with experts who had never been recorded before and helped them find their natural voice, build confidence, and make the recording feel like a conversation.",
    ],
  },
  {
    q: "How do we market or distribute our series?",
    a: [
      "It depends on who you're building for.",
      "Public series are distributed across Spotify, Apple Podcasts, and YouTube, with short-form clips and email sequences that bring new listeners into the series and keep current ones engaged across your entire content ecosystem.",
      "Internal series are private by design. The platform decision is made together based on your organization's existing infrastructure and needs, whether that's a dedicated internal podcast platform, your intranet, or another solution that fits how your team already works.",
    ],
  },
  {
    q: "How do you measure whether the series is working?",
    a: [
      "We track completion rates, downloads, and engagement across every platform using industry-leading analytics tools.",
      "For outcomes like referrals, inquiries, and behavior change, we work directly with your team to build attribution tracking that connects series performance to your actual business goals. Success metrics are defined before we produce a single episode so we're measuring what matters to you, not just what's easy to count.",
    ],
  },
  {
    q: "What's the investment?",
    a: [
      "Series engagements typically range from $25,000 to $100,000. Pricing reflects the format, narrative complexity, and production scope required to bring your vision to life.",
      "A conversational or interview series sits toward the lower end. A narrative series, with multiple perspectives, story arcs, sound engineering, and cinematic production, sits toward the upper end. The investment reflects not just how it's made, but what it's designed to do.",
      "Every proposal is custom-built around your goals, format, and episode scope.",
    ],
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#ede8e1] py-[80px] md:py-[100px]">
      <div className="max-w-[760px] mx-auto px-6 md:px-8">

        {/* Headline */}
        <h2 className="text-center text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5" style={{ color: '#43382f' }}>
          Dig a little <span className="font-serif italic">deeper</span>
        </h2>

        {/* Body */}
        <p className="text-center text-[17px] leading-[1.5] max-w-[560px] mx-auto mb-10" style={{ color: '#43382f' }}>
          Got more questions? Contact us below.
        </p>

        {/* Accordions */}
        <div className="flex flex-col gap-3">
          {/* First item: comparison table */}
          <div
            className="bg-white rounded-[12px] px-6 py-5 cursor-pointer"
            style={{ border: '1px solid rgba(103,114,131,0.15)' }}
            onClick={() => setOpenIdx(openIdx === 0 ? null : 0)}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[17px] font-medium leading-snug" style={{ color: '#43382f' }}>
                What&rsquo;s the difference between a podcast and a strategic series?
              </p>
              <span
                className="flex-shrink-0 text-[24px] font-light leading-none select-none"
                style={{ color: '#677283' }}
              >
                {openIdx === 0 ? '−' : '+'}
              </span>
            </div>
            {openIdx === 0 && (
              <div className="mt-5" onClick={(e) => e.stopPropagation()}>
                <ComparisonTable />
              </div>
            )}
          </div>

          {/* New item: series formats */}
          <div
            className="bg-white rounded-[12px] px-6 py-5 cursor-pointer"
            style={{ border: '1px solid rgba(103,114,131,0.15)' }}
            onClick={() => setOpenIdx(openIdx === 1 ? null : 1)}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[17px] font-medium leading-snug" style={{ color: '#43382f' }}>
                What are the different series formats?
              </p>
              <span
                className="flex-shrink-0 text-[24px] font-light leading-none select-none"
                style={{ color: '#677283' }}
              >
                {openIdx === 1 ? '−' : '+'}
              </span>
            </div>
            {openIdx === 1 && (
              <div className="mt-5" onClick={(e) => e.stopPropagation()}>
                <SeriesFormats />
              </div>
            )}
          </div>

          {/* Existing FAQ items (offset index by 2) */}
          {FAQS.map((item, i) => {
            const idx = i + 2;
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[12px] px-6 py-5 cursor-pointer"
                style={{ border: '1px solid rgba(103,114,131,0.15)' }}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[17px] font-medium leading-snug" style={{ color: '#43382f' }}>
                    {item.q}
                  </p>
                  <span
                    className="flex-shrink-0 text-[24px] font-light leading-none select-none"
                    style={{ color: '#677283' }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div className="mt-4 flex flex-col gap-3">
                    {item.a.map((para, j) => (
                      <p key={j} className="text-[15px] leading-[1.65]" style={{ color: '#43382f' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}