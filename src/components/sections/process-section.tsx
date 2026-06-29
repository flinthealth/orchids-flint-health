"use client";

import React, { useState, useEffect, useRef } from 'react';

const TABS = [
  { id: 'strategy',   label: 'Strategy',          color: '#ff7f29' },
  { id: 'production', label: 'Production',         color: '#fac12c' },
  { id: 'growth',     label: 'Data-Driven Growth', color: '#a0522d' },
];

const CHECK_COLOR = '#6b4b3e';

function CircleCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="9" cy="9" r="8.25" stroke={CHECK_COLOR} strokeWidth="1.5" />
      <path d="M5.5 9L7.75 11.25L12.5 6.75" stroke={CHECK_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Testimonial({ photo, quote, name, title }: { photo: string; quote: string; name: string; title: string }) {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <p className="text-[17px] text-[#43382f] leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} className="w-14 h-14 rounded-full object-cover flex-shrink-0" alt={name} />
        <div>
          <p className="text-[14px] font-semibold text-[#2b3335] leading-snug">{name}</p>
          <p className="text-[13px] text-[#677283] leading-snug mt-0.5">{title}</p>
        </div>
      </div>
    </div>
  );
}

const CARD_ICONS: Record<string, React.FC<{ color: string }>> = {
  strategy: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/process-strategy-icon.png?v=3" alt="Strategy" width={53} height={53} style={{ display: 'block' }} />
  ),
  production: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icon-process-production.png" alt="Production" width={53} height={53} style={{ display: 'block' }} />
  ),
  growth: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icon-process-data-driven-growth.png" alt="Data-Driven Growth" width={53} height={53} style={{ display: 'block' }} />
  ),
};

const OVERVIEW_CARDS = [
  { id: 'strategy',   label: 'Strategy',          color: '#ff7f29', desc: 'Lock in your dream outcome before anyone steps to a mic.' },
  { id: 'production', label: 'Production',         color: '#fac12c', desc: 'Full-service production handled start to finish.' },
  { id: 'growth',     label: 'Data-Driven Growth', color: '#a0522d', desc: 'Connect series performance to real business outcomes.' },
];

const PUBLIC_PILLS   = ['Episode retention', 'Inquiry lift', 'Referral attribution', 'Intakes scheduled', 'Listener acquisition'];
const INTERNAL_PILLS = ['Activation rate', 'Pathway completion', 'Knowledge retention', 'Enrollment curve', 'Sustained participation'];

const NAV_HEIGHT = 76; // fixed nav height when scrolled

export default function ProcessSection() {
  const [activeTab, setActiveTab] = useState('strategy');
  const [showBar, setShowBar] = useState(false);
  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const activeTabRef = useRef('strategy');

  useEffect(() => {
    // Scroll-based active panel detection
    const handleScroll = () => {
      if (cardsRef.current) {
        const cardsTop = cardsRef.current.getBoundingClientRect().top;
        setShowBar(cardsTop <= 76);
      }
      if (isScrolling.current) return;
      const container = scrollContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolledIntoView = -rect.top;
      if (scrolledIntoView < 0) return;
      // Each panel occupies 100vh of the 300vh container (3 panels × 100vh)
      const idx = Math.min(2, Math.max(0, Math.floor(scrolledIntoView / (window.innerHeight - 132))));
      const id = TABS[idx].id;
      if (id !== activeTabRef.current) {
        activeTabRef.current = id;
        setActiveTab(id);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const idx = TABS.findIndex((t) => t.id === id);
    if (idx < 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const top = container.offsetTop - NAV_HEIGHT + idx * window.innerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
    activeTabRef.current = id;
    setActiveTab(id);
    isScrolling.current = true;
    window.addEventListener('scrollend', () => { isScrolling.current = false; }, { once: true });
    setTimeout(() => { isScrolling.current = false; }, 1200);
  };

  return (
    <section style={{ background: '#ffffff' }} className="w-full">

      {/* ── Intro ── */}
      <div className="max-w-[920px] mx-auto px-6 md:px-8 pt-20 pb-12 text-center">
        <h2 className="text-[#2b3335] font-light tracking-[-0.02em] mb-5">
          Everything you need,<br className="md:hidden" /> from strategy to<br className="md:hidden" /> measurable impact
        </h2>
        <p className="max-w-[560px] mx-auto text-[#43382f]">
          A creative, full-service production partner who champions your brand and the outcomes that matter most.
        </p>
      </div>

      {/* ── Overview cards ── */}
      <div ref={cardsRef} className="max-w-[1000px] mx-auto px-6 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OVERVIEW_CARDS.map(({ id, label, desc }) => {
            const Icon = CARD_ICONS[id];
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="rounded-xl p-8 transition-all flex flex-col items-center text-center hover:bg-[#e1dfdd]"
                style={{ background: '#F7F5F1', cursor: 'pointer', border: 'none' }}
              >
                <div className="mb-5">
                  {Icon && <Icon color="#2b3335" />}
                </div>
                <p className="font-bold mb-2" style={{ color: '#2b3335' }}>{label}</p>
                <p className="text-[15px] leading-relaxed max-w-[260px]" style={{ color: '#43382f' }}>{desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sticky tab bar (md+) ── */}
      {/* Sits in the DOM flow between overview cards and panels.
          Always occupies ~56px of space — invisible at first, then
          revealed from underneath as the cards scroll off. */}
      <div
        ref={tabBarRef}
        className="hidden md:block md:sticky md:top-[76px] md:z-30 overflow-hidden"
      >
        <div
          className="bg-white border-b border-[rgba(43,51,53,0.1)] transition-transform duration-200 ease-out"
          style={{ transform: showBar ? 'translateY(0)' : 'translateY(-100%)', pointerEvents: showBar ? 'auto' : 'none' }}
        >
          <div className="w-full">
            <div className="max-w-[1000px] mx-auto px-6 md:px-8 pt-4 pb-3 flex gap-3">
              {TABS.map(({ id, label }) => {
                const isActiveBar = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex-1 py-3 px-5 text-[14px] font-semibold tracking-[0.02em] transition-all rounded-md"
                    style={{
                      background: isActiveBar ? '#2a3742' : 'rgba(237,235,231,0.5)',
                      color: isActiveBar ? '#ffffff' : '#3d4d58',
                      border: isActiveBar ? '1px solid #3d4d58' : '1px solid transparent',
                      cursor: 'pointer',
                      boxShadow: isActiveBar ? '0 0 16px rgba(245,160,32,0.76), 0 0 0 2px #ff7f29' : 'none',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky scroll container (md+) ── */}
      <div ref={scrollContainerRef} className="md:relative">
        <div className="md:h-[300vh]">

          {/* ── Step: Strategy ── */}
          <div className="md:h-screen">
            <div
              id="process-strategy"
              className="md:sticky md:top-[132px] md:h-[calc(100vh-132px)] bg-white md:overflow-hidden"
            >
              <div className="flex flex-col h-full justify-center py-12 max-w-[1000px] mx-auto px-6 md:px-8 w-full">
                <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-start">
                  <div className="flex-1">
                    <h3 className="font-light text-[#2b3335] tracking-[-0.01em] mb-4">
                      Start with the end in mind.
                    </h3>
                    <p className="text-[#43382f] leading-relaxed mb-8">
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
                          <span className="text-[#43382f] leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex md:w-[320px] lg:w-[380px] flex-shrink-0 items-start">
                    <Testimonial
                      photo="/testimonial-erin-knopf.jpg"
                      quote="You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality."
                      name="Dr. Erin Knopf"
                      title="Very Health"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider (mobile only) */}
          <div className="md:hidden max-w-[1000px] mx-auto px-6 md:px-8">
            <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
          </div>

          {/* ── Step: Production ── */}
          <div className="md:h-screen">
            <div
              id="process-production"
              className="md:sticky md:top-[132px] md:h-[calc(100vh-132px)] bg-white md:overflow-hidden"
            >
              <div className="flex flex-col h-full justify-center py-12 max-w-[1000px] mx-auto px-6 md:px-8 w-full">
                <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-start">
                  <div className="flex-1">
                    <h3 className="font-light text-[#2b3335] tracking-[-0.01em] mb-4">
                      You show up. We handle everything else.
                    </h3>
                    <p className="text-[#43382f] leading-relaxed mb-8">
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
                          <span className="text-[#43382f] leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex md:w-[320px] lg:w-[380px] flex-shrink-0 items-start">
                    <Testimonial
                      photo="/Jennifer-Kreatsoulas.jpg?v=2"
                      quote="Working with Jessica on a video series several years ago still leads new clients to my business. The cinematic-quality content brought my brand's message to life and spoke directly to the hearts of clients and patients."
                      name="Jennifer Kreatsoulas, PhD, C-IAYT"
                      title="Yoga for Eating Disorders"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider (mobile only) */}
          <div className="md:hidden max-w-[1000px] mx-auto px-6 md:px-8">
            <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
          </div>

          {/* ── Step: Data-Driven Growth ── */}
          <div className="md:h-screen">
            <div
              id="process-growth"
              className="md:sticky md:top-[132px] md:h-[calc(100vh-132px)] bg-white md:overflow-hidden"
            >
              <div className="flex flex-col h-full justify-center py-12 max-w-[1000px] mx-auto px-6 md:px-8 w-full">
                <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-start">
                  <div className="flex-1">
                    <h3 className="font-light text-[#2b3335] tracking-[-0.01em] mb-4">
                      Connect series performance to real business outcomes.
                    </h3>
                    <p className="text-[#43382f] leading-relaxed mb-8">
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
                          <span className="text-[#43382f] leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-[320px] lg:w-[380px] flex-shrink-0">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-[15px] font-semibold text-[#2b3335]">Public Series</p>
                        <span className="text-[12px] text-[#677283] font-medium uppercase tracking-[0.06em]">— Patients &amp; Providers</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {PUBLIC_PILLS.map(pill => (
                          <span key={pill} style={{ background: '#a0522d', color: '#f9f5ef', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{pill}</span>
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
                          <span key={pill} style={{ background: '#3d4d58', color: '#f9f5ef', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{pill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}