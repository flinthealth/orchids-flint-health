"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

const MIN_SCALE          = 0.88;
const TOP_OFFSETS_MOBILE = [80, 96, 112, 128];
const DESKTOP_STICKY_TOP = 80;

const FILTERS = [
  { key: 'patient',     label: 'Patient Engagement',    color: '#ff7f29' },
  { key: 'clinical',    label: 'Clinical Outcomes',      color: '#54819a' },
  { key: 'authority',   label: 'Authority & Influence',  color: '#eeb20b' },
  { key: 'operational', label: 'Operational Excellence', color: '#43382f' },
] as const;

// Small inline SVG icons — one per category, colored via the filter color
const FILTER_ICONS: Record<string, (c: string) => React.ReactNode> = {
  patient: (c) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill={c} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9C4.4 8.4 1 6 1 3.6 1 2.2 2 1 3.4 1 4.1 1 4.7 1.4 5 1.9 5.3 1.4 5.9 1 6.6 1 8 1 9 2.2 9 3.6 9 6 5.6 8.4 5 9Z"/>
    </svg>
  ),
  clinical: (c) => (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polyline points="0.5,5 2,5 3,2 4,8 5.5,3.5 6.5,6.5 7.5,5 12.5,5"/>
    </svg>
  ),
  authority: (c) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3.5" r="2"/>
      <circle cx="7" cy="3.5" r="2"/>
      <line x1="5" y1="3.5" x2="5" y2="3.5"/>
      <circle cx="5" cy="7.5" r="2"/>
    </svg>
  ),
  operational: (c) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill={c} xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1.5" width="8" height="1.6" rx="0.8"/>
      <rect x="1" y="4.2" width="8" height="1.6" rx="0.8"/>
      <rect x="1" y="6.9" width="8" height="1.6" rx="0.8"/>
    </svg>
  ),
};

type FilterKey = typeof FILTERS[number]['key'];

const CARD_ICONS: Record<number, string> = {
  0: '/icon-provider-education-v12.png',
  1: '/icon-patient-education-v10.png',
  2: '/icon-patient-journey-v12.png',
  3: '/icon-team-v12.png',
};

const cards = [
  {
    id: 0,
    filters: ['clinical', 'authority', 'operational'] as FilterKey[],
    title: 'HCP Training & Clinical Education',
    headline: 'Protocols are only as powerful as the providers who adopt them.',
    body: "The best clinical training doesn't just inform. It changes how providers think and practice. We build narrative series that bring protocols, frameworks, and therapeutic approaches to life, driving faster adoption and stronger clinical judgment across your team.",
    applications: [
      'Protocol walkthroughs with expert clinical commentary',
      'Patient and clinical case study series',
      'Sales and medical affairs enablement',
      'New treatment and device adoption programs',
    ],
  },
  {
    id: 1,
    filters: ['patient', 'clinical', 'authority'] as FilterKey[],
    title: 'Patient Education & Engagement',
    headline: 'When patients truly understand, everything changes.',
    body: "When patients hear from real clinicians and real people who've been where they are, complex health information feels accessible, trustworthy, and worth acting on. Better-informed patients engage more, adhere more, and advocate more.",
    applications: [
      'Condition and treatment education series',
      'Post-diagnosis support and shared decision-making guides',
      'Caregiver education and empowerment content',
      'Disease awareness and destigmatization series',
    ],
  },
  {
    id: 2,
    filters: ['patient', 'clinical'] as FilterKey[],
    title: 'Patient Immersions & Journey Maps',
    headline: "Don't just report on the patient experience, bring it to life.",
    body: "We transform static research and white papers into immersive narrative series that your R&D, Medical Affairs, and clinical teams actually finish. When your people truly hear the patient story, not just skim a summary, it changes how they think, decide, and build.",
    applications: [
      'Authentic patient voice recordings',
      'Deep-dive qualitative interview series',
      'Pain point mapping through lived experience',
      'Care gap identification and opportunity analysis',
    ],
  },
  {
    id: 3,
    filters: ['operational', 'authority'] as FilterKey[],
    title: 'Employee Onboarding & Culture',
    headline: 'Improve workplace culture, reduce information silos, and spark collaboration',
    body: "We build the communication that carries your culture, mission, and best practices to every person on your team, wherever they are and whenever they join.",
    applications: [
      'Leadership vision and values series',
      'New hire welcome and culture immersion programs',
      'Peer spotlight and recognition content',
      'Knowledge transfer and change rollouts',
    ],
  },
] as const;

const BG         = '#f9f5ef';
const EDGE_COLOR = '#e0dbd5';
const TEXT       = '#2b3335';
const MUTED      = '#677283';
const ITEM_BG    = 'rgba(19,29,43,0.07)';

export default function StackingCards() {
  const [scales,              setScales]              = useState<number[]>([1, 1, 1, 1]);
  const [mobileAdjustedTops,  setMobileAdjustedTops]  = useState<number[]>([...TOP_OFFSETS_MOBILE]);

  const cardRefsMobile        = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefsDesktop       = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentRefsMobile = useRef<(HTMLDivElement | null)[]>([]);

  const visibleCards = cards;

  // Measure each mobile card's rendered height and compute the sticky top value
  // that ensures the full card fits in view before the next card slides in.
  useLayoutEffect(() => {
    const compute = () => {
      if (window.innerWidth >= 768) return;
      const safeVh = Math.floor(window.innerHeight * 0.88);
      const newTops = visibleCards.map((_, i) => {
        const naturalTop = TOP_OFFSETS_MOBILE[i] ?? 128;
        const el = cardContentRefsMobile.current[i];
        if (!el) return naturalTop;
        const cardH = el.offsetHeight;
        if (cardH <= safeVh - naturalTop + 8) return naturalTop;
        return safeVh - cardH - 20;
      });
      setMobileAdjustedTops(newTops);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [visibleCards]);

  useEffect(() => {
    const onScroll = () => {
      const n = visibleCards.length;
      setScales(
        Array.from({ length: n }, (_, i) => {
          if (i >= n - 1) return 1;
          const isMobile = window.innerWidth < 768;
          const refs     = isMobile ? cardRefsMobile.current : cardRefsDesktop.current;
          const nextRef  = refs[i + 1];
          if (!nextRef) return 1;
          const nextTop      = nextRef.getBoundingClientRect().top;
          const stickyTop    = isMobile ? (mobileAdjustedTops[i + 1] ?? TOP_OFFSETS_MOBILE[i + 1] ?? 128) : DESKTOP_STICKY_TOP;
          const scalingRange = 300;
          const progress     = Math.max(0, Math.min(1, (stickyTop + scalingRange - nextTop) / scalingRange));
          return 1 - progress * (1 - MIN_SCALE);
        })
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visibleCards.length, mobileAdjustedTops]);

  function CardContent({ card, mobile }: { card: typeof cards[number]; mobile: boolean }) {
    const px   = mobile ? 'px-5'  : 'px-12';
    const imgW = mobile ? 161     : 207;
    const h3   = mobile ? 'text-[28px]' : 'text-[36px]';
    const h3mb = mobile ? 'mb-5'  : 'mb-3';
    const p1   = mobile ? 'text-[17px]' : 'text-[20px]';
    return (
      <div className={`${px} pt-8 pb-10`}>
        {/* Pills */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {card.filters.map((fKey) => {
            const f = FILTERS.find(x => x.key === fKey)!;
            return (
              <div
                key={fKey}
                className="inline-flex items-center rounded-full text-[10px] font-semibold tracking-[0.09em] uppercase"
                style={{
                  padding: '5px 11px',
                  border: '1.5px solid rgba(43,51,53,0.22)',
                  color: '#2b3335',
                  backgroundColor: 'transparent',
                }}
              >
                {f.label}
              </div>
            );
          })}
        </div>

        {mobile ? (
          <div className="flex flex-col">
            <h3 className={`${h3} font-normal leading-[1.15] tracking-[-0.02em] ${h3mb}`} style={{ color: TEXT }}>
              {card.title}
            </h3>
            <div className="flex justify-center mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CARD_ICONS[card.id]} alt="" width={imgW} height={imgW} style={{ display: 'block' }} />
            </div>
            <p className="text-[16px] font-medium uppercase tracking-[0.08em] leading-[1.4] mb-4" style={{ color: '#677283' }}>
              {card.headline}
            </p>
            <p className="text-[16px] leading-[1.5] mb-8" style={{ color: '#2b3335' }}>{card.body}</p>
            <div className="flex flex-col gap-[10px]">
              {(card.applications as unknown as string[]).map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: ITEM_BG }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEXT }} />
                  <span className="text-[16px] leading-snug" style={{ color: TEXT }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CARD_ICONS[card.id]} alt="" width={imgW} height={imgW} style={{ display: 'block' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`${h3} font-normal leading-[1.15] tracking-[-0.02em] ${h3mb}`} style={{ color: TEXT }}>
                {card.title}
              </h3>
              <p className="text-[16px] font-medium uppercase tracking-[0.08em] leading-[1.4] mb-4" style={{ color: '#677283' }}>
                {card.headline}
              </p>
              <p className="text-[16px] leading-[1.5] mb-8" style={{ color: '#2b3335' }}>{card.body}</p>
              <div className="flex flex-col gap-[10px]">
                {(card.applications as unknown as string[]).map((item) => (
                  <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: ITEM_BG }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEXT }} />
                    <span className="text-[16px] leading-snug" style={{ color: TEXT }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="bg-white">

      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 pt-[120px] md:pt-[120px]">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-14 text-center max-w-[680px] mx-auto">
            <div className="mb-5">
              <span className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase">
                Healthcare Applications
              </span>
            </div>
            <h2 className="text-[#2b3335] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-0">
              Here&rsquo;s the full range of what&rsquo;s{' '}
              <span className="font-serif italic" style={{ color: '#2b3335' }}>possible.</span>
            </h2>
          </div>

          {/* ── Format indicators ── */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 mb-10">
            {/* Audio */}
            <div className="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="10" y="2" width="8" height="14" rx="4" />
                <path d="M5 13a9 9 0 0 0 18 0" />
                <line x1="14" y1="22" x2="14" y2="26" />
                <line x1="10" y1="26" x2="18" y2="26" />
              </svg>
              <span style={{ color: '#677283', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Audio</span>
            </div>

            {/* Separator */}
            <div style={{ width: '1px', height: '32px', backgroundColor: '#677283', opacity: 0.2 }} />

            {/* Video */}
            <div className="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="18" height="16" rx="3" />
                <path d="M20 11l6-4v14l-6-4" />
              </svg>
              <span style={{ color: '#677283', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Video</span>
            </div>

            {/* Separator */}
            <div style={{ width: '1px', height: '32px', backgroundColor: '#677283', opacity: 0.2 }} />

            {/* Hybrid */}
            <div className="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#677283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* mic (left, slightly smaller) */}
                <rect x="3" y="4" width="7" height="12" rx="3.5" />
                <path d="M2.5 12a4 4 0 0 0 8 0" />
                <line x1="6.5" y1="16" x2="6.5" y2="19" />
                <line x1="4.5" y1="19" x2="8.5" y2="19" />
                {/* video camera (right) */}
                <rect x="13" y="8" width="10" height="9" rx="2" />
                <path d="M23 11l4-2.5v7l-4-2.5" />
              </svg>
              <span style={{ color: '#677283', fontSize: '11px', letterSpacing: '0.14em', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Hybrid</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE stacking cards ── */}
      <div className="md:hidden bg-white">
        {visibleCards.map((card, stackIndex) => {
          const isLast    = stackIndex === visibleCards.length - 1;
          const topOffset = TOP_OFFSETS_MOBILE[stackIndex] ?? 128;
          return (
            <React.Fragment key={card.id}>
              <div
                ref={el => { cardRefsMobile.current[stackIndex] = el; }}
                style={{
                  position:        'sticky',
                  top:             mobileAdjustedTops[stackIndex] ?? topOffset,
                  zIndex:          stackIndex + 1,
                  transform:       `scale(${scales[stackIndex] ?? 1})`,
                  transformOrigin: 'top center',
                  transition:      'transform 0.08s linear',
                  willChange:      'transform',
                }}
              >
                {/* Gradient wrapper — shows through as bottom edge */}
                <div
                  ref={el => { cardContentRefsMobile.current[stackIndex] = el; }}
                  style={{
                    borderRadius: '24px 24px 0 0',
                    background: '#ede4da',
                    padding: '6px 0 6px 0',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ backgroundColor: BG, borderRadius: '20px 20px 0 0', position: 'relative' }}>
                    <CardContent card={card} mobile={true} />
                  </div>
                </div>
              </div>
              {!isLast && <div className="bg-white" style={{ height: '65vh' }} />}
            </React.Fragment>
          );
        })}
        <div className="bg-white h-[60px]" />
      </div>

      {/* ── DESKTOP stacking cards ── */}
      <div className="hidden md:block bg-white pb-[90px]">
        {visibleCards.map((card, stackIndex) => {
          const isLast = stackIndex === visibleCards.length - 1;
          return (
            <React.Fragment key={card.id}>
              <div
                ref={el => { cardRefsDesktop.current[stackIndex] = el; }}
                style={{
                  position:        'sticky',
                  top:             DESKTOP_STICKY_TOP,
                  zIndex:          stackIndex + 1,
                  transform:       `scale(${scales[stackIndex] ?? 1})`,
                  transformOrigin: 'top center',
                  transition:      'transform 0.08s linear',
                  willChange:      'transform',
                }}
              >
                <div className="container mx-auto px-8">
                  {/* Gradient wrapper — shows through as bottom edge, rounds naturally with card corners */}
                  <div
                    className="max-w-[1000px] mx-auto relative overflow-hidden"
                    style={{
                      borderRadius: '24px',
                      background: '#ede4da',
                      padding: '0 0 8px 0',
                      boxShadow: '0 16px 40px rgba(171,217,234,0.25)',
                    }}
                  >
                    <div className="relative" style={{ backgroundColor: BG, borderRadius: '24px 24px 20px 20px', overflow: 'hidden' }}>
                      <CardContent card={card} mobile={false} />
                    </div>
                  </div>
                </div>
              </div>
              {!isLast && <div className="bg-white" style={{ height: '40vh' }} />}
            </React.Fragment>
          );
        })}
      </div>

    </section>
  );
}
