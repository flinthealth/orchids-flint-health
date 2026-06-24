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

function TargetIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="15" stroke={color} strokeWidth="1.8" />
      <circle cx="22" cy="22" r="8" stroke={color} strokeWidth="1.8" />
      <circle cx="22" cy="22" r="3" fill={color} />
    </svg>
  );
}
function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="28" height="28" rx="5" stroke={color} strokeWidth="1.8" />
      <path d="M18 16L30 22L18 28V16Z" fill={color} />
    </svg>
  );
}
function ChartIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 34L18 22L26 28L38 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 14H38V22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD_ICONS: Record<string, React.FC<{ color: string }>> = {
  strategy: TargetIcon,
  production: PlayIcon,
  growth: ChartIcon,
};

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
  const [showTabBar, setShowTabBar] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const showTabBarRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      // Determine active tab
      let currentId = 'strategy';
      for (const { id } of TABS) {
        const el = sectionRefs.current[id];
        if (!el) continue;
        if (el.getBoundingClientRect().top < 150) {
          currentId = id;
        }
      }
      setActiveTab(currentId);

      // Show/hide tab bar — only once cards have scrolled off view
      const cardsEl = cardsRef.current;
      if (cardsEl) {
        const shouldShow = cardsEl.getBoundingClientRect().bottom < 100;
        if (shouldShow !== showTabBarRef.current) {
          showTabBarRef.current = shouldShow;
          setShowTabBar(shouldShow);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    if (!showTabBarRef.current) {
      showTabBarRef.current = true;
      setShowTabBar(true);
    }
    const tabBarH = tabBarRef.current?.offsetHeight ?? 56;
    const headerH = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - tabBarH - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveTab(id);
    isScrolling.current = true;
    const onScrollEnd = () => {
      isScrolling.current = false;
      window.removeEventListener('scrollend', onScrollEnd);
    };
    window.addEventListener('scrollend', onScrollEnd, { once: true });
    setTimeout(() => { isScrolling.current = false; }, 1200);
  };

  return (
    <section style={{ background: '#ffffff' }} className="w-full">

      {/* ── Intro ── */}
      <div className="max-w-[920px] mx-auto px-6 md:px-8 pt-20 pb-12 text-center">
        <h2 className="text-[#2b3335] text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5">
          Everything you need, from<br />
          strategy to measurable impact
        </h2>
        <p className="text-[16px] leading-[1.65] max-w-[560px] mx-auto text-[#43382f]">
          A creative, full-service production partner who champions your brand and nails your message.
        </p>
      </div>

      {/* ── Overview cards ── */}
      <div ref={cardsRef} className="max-w-[1000px] mx-auto px-6 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OVERVIEW_CARDS.map(({ id, label, color, desc }) => {
            const Icon = CARD_ICONS[id];
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="rounded-xl p-8 transition-all flex flex-col items-center text-center hover:bg-[#e1dfdd]"
                style={{
                  background: '#F7F5F1',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <div className="mb-5" style={{ color: '#2b3335' }}>
                  {Icon && <Icon color="#2b3335" />}
                </div>
                <p className="text-[17px] font-bold mb-2" style={{ color: '#2b3335' }}>
                  {label}
                </p>
                <p className="text-[15px] leading-relaxed max-w-[260px]" style={{ color: '#43382f' }}>
                  {desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sticky tab bar — hidden until scrolling to strategy or clicking a card ── */}
      <div
        className="sticky top-[88px] z-30 w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: showTabBar ? '96px' : 0,
          background: '#ffffff',
          borderBottom: showTabBar ? '1px solid rgba(43,51,53,0.08)' : '1px solid transparent',
        }}
      >
        <div
          ref={tabBarRef}
          className="w-full"
          style={{ opacity: showTabBar ? 1 : 0, transition: 'opacity 0.3s ease 0.15s' }}
        >
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 pt-4 pb-3 flex gap-3">
            {TABS.map(({ id, label, color }) => {
              const isActiveBar = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex-1 py-3 px-5 text-[14px] font-semibold tracking-[0.02em] transition-all rounded-md"
                  style={{
                    background: isActiveBar ? color : 'rgba(103,114,131,0.08)',
                    color: isActiveBar ? '#ffffff' : '#677283',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Step: Strategy ── */}
      <div
        ref={el => { sectionRefs.current['strategy'] = el; }}
        id="process-strategy"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20 md:min-h-[calc(100vh-140px)] md:flex md:flex-col md:justify-center"
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

      {/* Divider — hidden on md+ where sections are full-viewport */}
      <div className="md:hidden max-w-[1000px] mx-auto px-6 md:px-8">
        <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
      </div>

      {/* ── Step: Production ── */}
      <div
        ref={el => { sectionRefs.current['production'] = el; }}
        id="process-production"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20 md:min-h-[calc(100vh-140px)] md:flex md:flex-col md:justify-center"
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

      {/* Divider — hidden on md+ */}
      <div className="md:hidden max-w-[1000px] mx-auto px-6 md:px-8">
        <div style={{ height: '1px', background: 'rgba(43,51,53,0.1)' }} />
      </div>

      {/* ── Step: Data-Driven Growth ── */}
      <div
        ref={el => { sectionRefs.current['growth'] = el; }}
        id="process-growth"
        className="max-w-[1000px] mx-auto px-6 md:px-8 py-20 md:min-h-[calc(100vh-140px)] md:flex md:flex-col md:justify-center"
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