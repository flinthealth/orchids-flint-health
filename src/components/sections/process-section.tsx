"use client";

import React, { useState, useEffect, useRef } from 'react';

const TABS = [
  { id: 'strategy',    label: 'Strategy',           color: '#ff7f29' },
  { id: 'production',  label: 'Production',          color: '#eeb20b' },
  { id: 'growth',      label: 'Data-Driven Growth',  color: '#54819a' },
];

const CHECK_COLOR = '#677283';

function CircleCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="9" cy="9" r="8.25" stroke={CHECK_COLOR} strokeWidth="1.5" />
      <path d="M5.5 9L7.75 11.25L12.5 6.75" stroke={CHECK_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const OVERVIEW_CARDS = [
  {
    id: 'strategy',
    label: 'Strategy',
    color: '#ff7f29',
    desc: 'Lock in your dream outcome before anyone steps to a mic.',
  },
  {
    id: 'production',
    label: 'Production',
    color: '#eeb20b',
    desc: 'Full-service production handled start to finish.',
  },
  {
    id: 'growth',
    label: 'Data-Driven Growth',
    color: '#54819a',
    desc: 'Connect series performance to real business outcomes.',
  },
];

const PUBLIC_PILLS  = ['Episode retention', 'Inquiry lift', 'Referral attribution', 'Intakes scheduled', 'Listener acquisition'];
const INTERNAL_PILLS = ['Activation rate', 'Pathway completion', 'Knowledge retention', 'Enrollment curve', 'Sustained participation'];

export default function ProcessSection() {
  const [activeTab, setActiveTab] = useState('strategy');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TABS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const tabBarH = tabBarRef.current?.offsetHeight ?? 56;
    const headerH = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - tabBarH - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveTab(id);
  };

  return (
    <section style={{ background: '#f9f5ef' }} className="w-full">

      {/* ── Intro ── */}
      <div className="max-w-[760px] mx-auto px-6 md:px-8 pt-20 pb-12 text-center">
        <h2 className="text-[#2b3335] text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5">
          Everything you need, from strategy to measurable impact.
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#43382f] leading-relaxed">
          A creative, full-service production partner who champions your brand and nails your message.
        </p>
      </div>

      {/* ── Overview cards ── */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OVERVIEW_CARDS.map(({ id, label, color, desc }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left rounded-2xl p-6 transition-all hover:shadow-md"
              style={{ background: '#ede4da', border: '2px solid transparent', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
            >
              <div className="w-3 h-3 rounded-full mb-4" style={{ background: color }} />
              <p className="text-[17px] font-bold text-[#2b3335] mb-2">{label}</p>
              <p className="text-[15px] text-[#43382f] leading-relaxed">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Sticky tab bar ── */}
      <div
        ref={tabBarRef}
        className="sticky top-[64px] z-30 w-full"
        style={{ background: '#f9f5ef', borderBottom: '1px solid rgba(43,51,53,0.1)' }}
      >
        <div className="max-w-[1000px] mx-auto px-6 md:px-8 flex gap-1 overflow-x-auto py-2">
          {TABS.map(({ id, label, color }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-semibold tracking-[0.04em] transition-all"
                style={{
                  background: isActive ? color : 'transparent',
                  color: isActive ? '#f9f5ef' : '#677283',
                  border: `1.5px solid ${isActive ? color : 'rgba(103,114,131,0.25)'}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step: Strategy ── */}
      <div
        ref={el => { sectionRefs.current['strategy'] = el; }}
        id="process-strategy"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#ff7f29' }} />
              <p className="text-[13px] font-semibold tracking-[0.1em] uppercase" style={{ color: '#ff7f29' }}>Strategy</p>
            </div>
            <h3 className="text-[28px] md:text-[36px] font-light text-[#2b3335] leading-[1.15] tracking-[-0.01em] mb-4">
              Start with the end in mind.
            </h3>
            <p className="text-[17px] text-[#43382f] leading-relaxed mb-8">
              Lock in your dream outcome and KPIs before anyone steps to a mic.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Craft a compelling narrative arc',
                'Spotlight expert voices and lived experience',
                'Own your competitive angle and unique differentiation',
                'Choose your binge-worthy format',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck />
                  <span className="text-[16px] text-[#43382f] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:w-[340px] lg:flex-shrink-0" />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
      </div>

      {/* ── Step: Production ── */}
      <div
        ref={el => { sectionRefs.current['production'] = el; }}
        id="process-production"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#eeb20b' }} />
              <p className="text-[13px] font-semibold tracking-[0.1em] uppercase" style={{ color: '#eeb20b' }}>Production</p>
            </div>
            <h3 className="text-[28px] md:text-[36px] font-light text-[#2b3335] leading-[1.15] tracking-[-0.01em] mb-4">
              You show up. We handle everything else.
            </h3>
            <p className="text-[17px] text-[#43382f] leading-relaxed mb-8">
              Enjoy the luxury of full-service production, knowing every technical and creative detail is handled.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Scheduling and prepping guests',
                'Studio-quality audio and video',
                'Full editing and sound design',
                'Promotional assets',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck />
                  <span className="text-[16px] text-[#43382f] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:w-[340px] lg:flex-shrink-0" />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
      </div>

      {/* ── Step: Data-Driven Growth ── */}
      <div
        ref={el => { sectionRefs.current['growth'] = el; }}
        id="process-growth"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#54819a' }} />
              <p className="text-[13px] font-semibold tracking-[0.1em] uppercase" style={{ color: '#54819a' }}>Data-Driven Growth</p>
            </div>
            <h3 className="text-[28px] md:text-[36px] font-light text-[#2b3335] leading-[1.15] tracking-[-0.01em] mb-4">
              Connect series performance to real business outcomes.
            </h3>
            <p className="text-[17px] text-[#43382f] leading-relaxed mb-8">
              Know which episodes hold attention, which channels convert, and what&rsquo;s driving results.
            </p>
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Track your KPIs',
                'Measure episode-level performance',
                'Gather direct audience feedback',
                'See your series as a full 360° campaign',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CircleCheck />
                  <span className="text-[16px] text-[#43382f] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pills panel */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[15px] font-semibold text-[#2b3335]">Public Series</p>
                <span className="text-[12px] text-[#677283] font-medium uppercase tracking-[0.06em]">— Patients &amp; Providers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PUBLIC_PILLS.map(pill => (
                  <span key={pill} style={{ background: '#eeb20b', color: '#2b3335', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{pill}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[15px] font-semibold text-[#2b3335]">Internal Series</p>
                <span className="text-[12px] text-[#677283] font-medium uppercase tracking-[0.06em]">— Teams &amp; Providers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERNAL_PILLS.map(pill => (
                  <span key={pill} style={{ background: '#54819a', color: '#f9f5ef', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{pill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}