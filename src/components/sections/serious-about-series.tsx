"use client";

import React, { useState, useRef, useEffect } from 'react';

const ROWS = [
  {
    cat: 'Structure',
    podcast: 'Open-ended, no set finish',
    series: 'Finite arc with a destination',
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: 'Episodes are independent. Listeners can start anywhere. No predetermined end date.',
      series: 'A defined beginning, middle, and end. Each episode builds toward a specific resolution.',
    },
  },
  {
    cat: 'Purpose',
    podcast: 'Audience growth over time',
    series: 'Drive a specific behavior',
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: 'Built for long-term audience cultivation. Success measured in listener numbers over months or years.',
      series: 'Engineered to drive a specific outcome: clinical adoption, patient action, team alignment.',
    },
  },
  {
    cat: 'Production',
    podcast: 'Ongoing publishing schedule',
    series: 'Built once, deployed for years',
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: 'Requires permanent production commitment. Stopping publication means losing audience momentum.',
      series: 'Batch-produced in a focused window. A permanent asset deployed across channels without ongoing cost.',
    },
  },
  {
    cat: 'Distribution',
    podcast: 'Public feed',
    series: 'High leverage channels',
    seriesSub: 'Internal and public facing',
    podcastSub: 'Spotify, Apple, YouTube',
    popover: {
      podcast: 'Lives on public podcast platforms. Reaches whoever discovers it through search or recommendations.',
      series: 'Spotify, Apple, YouTube plus onboarding flows, training programs, patient portals, and social clips.',
    },
  },
  {
    cat: 'ROI',
    podcast: 'Reach and downloads',
    series: 'Measurable outcomes',
    seriesSub: null,
    podcastSub: null,
    popover: {
      podcast: 'Success is audience size and growth. Hard to tie directly to revenue or behavioral change.',
      series: 'Episode retention, behavioral shifts, training completion, treatment inquiries, referrals.',
    },
  },
];

export default function SeriousAboutSeries() {
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
    <section style={{ background: '#f9f5ef' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-20">

        {/* Header */}
        <p className="text-[15px] font-semibold tracking-[0.1em] uppercase text-[#677283] mb-4">
          SERIOUS ABOUT SERIES
        </p>
        <h2 className="text-[32px] md:text-[38px] font-light text-[#2b3335] leading-[1.15] tracking-[-0.02em] max-w-[640px] mb-4">
          Flint is a full-service creative studio that makes it easy for healthcare brands to develop, launch and grow bingeworthy series across all&nbsp;channels.
        </h2>
        <p className="text-[17px] text-[#43382f] leading-relaxed max-w-[560px] mb-12 opacity-80">
          Not sure what makes a series different from a podcast? Here's the short version.
        </p>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {/* Empty */}
                <th style={{ width: '110px' }} />
                {/* Podcast */}
                <th className="text-left pb-3 border-b border-[rgba(43,51,53,0.15)] pl-2 md:pl-8 pr-3"
                  style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#677283' }}>
                  Podcast
                </th>
                {/* vs — spacer only in header */}
                <th style={{ width: '48px', paddingBottom: '12px', borderBottom: '1px solid rgba(43,51,53,0.15)' }} />
                {/* Strategic series */}
                <th className="pl-4 pb-3 border-b border-[rgba(43,51,53,0.15)] text-left"
                  style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#ff7f29' }}>
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
                  {/* Category */}
                  <td style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(103,114,131,0.6)', paddingTop: '16px', paddingBottom: '16px', paddingRight: '16px', width: '110px', verticalAlign: 'middle' }}>
                    {row.cat}
                  </td>
                  {/* Podcast */}
                  <td className="pl-2 md:pl-8" style={{ fontSize: '15px', color: '#43382f', paddingTop: '16px', paddingBottom: '16px', paddingRight: '12px', verticalAlign: 'middle', lineHeight: 1.35 }}>
                    {row.podcast}
                    {row.podcastSub && (
                      <span style={{ fontSize: '13px', color: 'rgba(67,56,47,0.55)', display: 'block', marginTop: '2px' }}>{row.podcastSub}</span>
                    )}
                  </td>
                  {/* vs — shown only on Production row (index 2) */}
                  <td style={{ width: '48px', verticalAlign: 'middle', textAlign: 'center' }}>
                    {/* {i === 2 && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: '#2b3335', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>
                        VS
                      </span>
                    )} */}
                  </td>
                  {/* Series */}
                  <td style={{ fontSize: '15px', fontWeight: 500, color: '#2b3335', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px', verticalAlign: 'middle', lineHeight: 1.35, borderLeft: '2px solid rgba(255,127,41,0.25)', background: 'rgba(255,127,41,0.03)', position: 'relative' }}>
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

      </div>
    </section>
  );
}
