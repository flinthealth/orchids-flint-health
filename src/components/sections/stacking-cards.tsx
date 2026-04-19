"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Activity, Heart, Mic2, Layers } from 'lucide-react';

const MIN_SCALE          = 0.88;
const TOP_OFFSETS_MOBILE = [80, 96, 112, 128]; // staggered peek on mobile
const DESKTOP_STICKY_TOP = 80;                  // all desktop cards at same position

const FILTERS = [
  { key: 'patient',     label: 'Patient Engagement',    Icon: Heart,    color: '#f9bb2d', textColor: '#31393c' },
  { key: 'clinical',    label: 'Clinical Outcomes',      Icon: Activity, color: '#6290c9', textColor: '#31393c' },
  { key: 'authority',   label: 'Authority & Influence',  Icon: Mic2,     color: '#ff7f29', textColor: '#31393c' },
  { key: 'operational', label: 'Operational Excellence', Icon: Layers,   color: '#7e320c', textColor: '#ffffff' },
] as const;

type FilterKey = typeof FILTERS[number]['key'];

const CARD_ICONS: Record<number, string> = {
  0: '/icon-provider-education-v4.png',
  1: '/icon-patient-education-v2.png',
  2: '/icon-patient-journey-v2.png',
  3: '/icon-team-v5.png',
};

const cards = [
  {
    id: 0,
    filters: ['clinical', 'authority', 'operational'] as FilterKey[],
    title: 'HCP Training & Clinical Education',
    headline: 'Your protocols are only as powerful as the providers who adopt them.',
    body: "We don't replace clinical demonstrations — we make them stick. By wrapping technical training in narrative context, we ensure providers understand the why before they see the what. The result is faster adoption, stronger clinical judgment, and training your team actually looks forward to.",
    applications: [
      'Protocol walkthroughs with expert clinical commentary',
      'Clinical case study audio and video series',
      'Field sales and MSL enablement content',
      'New treatment and device adoption programs',
    ],
  },
  {
    id: 1,
    filters: ['patient', 'clinical', 'authority'] as FilterKey[],
    title: 'Patient Education & Engagement',
    headline: 'When patients truly understand, everything changes.',
    body: "We create audio and video series that meet patients where they are — weaving expert clinical voices with real human stories to make complex health information feel accessible, trustworthy, and actionable. Better-informed patients engage more, adhere more, and advocate more.",
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
    body: "We transform static research and white papers into immersive narrative audio series that your R&D, Medical Affairs, and clinical teams actually finish. When your people truly hear the patient story — not just skim a summary — it changes how they think, decide, and build.",
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
    headline: 'Build a culture that travels with your team.',
    body: "Onboarding shouldn't end after week one — and culture shouldn't live only in all-hands meetings. We help healthcare organizations build an ongoing audio and video presence that carries your values, vision, and standards to every new hire and veteran team member, wherever they are.",
    applications: [
      'Leadership vision and values series',
      'New hire welcome and culture immersion programs',
      'Peer spotlight and recognition content',
      'Internal alignment and change communication series',
    ],
  },
] as const;

const BG         = '#f7f3ef';
const EDGE_COLOR = '#e0dbd5';
const TEXT       = '#31393c';
const MUTED      = '#6b6560';
const ITEM_BG    = 'rgba(19,29,43,0.07)';

export default function StackingCards() {
  const [activeFilter,        setActiveFilter]        = useState<FilterKey | null>(null);
  const [scales,              setScales]              = useState<number[]>([1, 1, 1, 1]);
  const [mobileAdjustedTops,  setMobileAdjustedTops]  = useState<number[]>([...TOP_OFFSETS_MOBILE]);

  const cardRefsMobile        = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefsDesktop       = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentRefsMobile = useRef<(HTMLDivElement | null)[]>([]);

  const visibleCards = activeFilter
    ? cards.filter(c => c.filters.includes(activeFilter))
    : cards;

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
  }, [visibleCards.length, activeFilter, mobileAdjustedTops]);

  function CardContent({ card, mobile }: { card: typeof cards[number]; mobile: boolean }) {
    const px   = mobile ? 'px-5'  : 'px-12';
    const imgW = mobile ? 161     : 207;
    const h3   = mobile ? 'text-[28px]' : 'text-[36px]';
    const h3mb = mobile ? 'mb-5'  : 'mb-3';
    const p1   = mobile ? 'text-[18px]' : 'text-[20px]';
    return (
      <div className={`${px} pt-8 pb-10`}>
        {/* Pills */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {card.filters.map((fKey) => {
            const f = FILTERS.find(x => x.key === fKey)!;
            return (
              <div
                key={fKey}
                className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-semibold tracking-[0.09em] uppercase"
                style={{ padding: '5px 11px', border: '1.5px solid #31393c', color: '#31393c' }}
              >
                <f.Icon size={11} />
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
            <p className={`${p1} font-normal leading-[1.3] tracking-[-0.01em] mb-4`} style={{ color: TEXT }}>
              {card.id === 0 ? <>Don&apos;t just report on the patient experience, bring it to life.</> : card.headline}
            </p>
            <p className="text-[14px] leading-[1.7] mb-8" style={{ color: MUTED }}>{card.body}</p>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: MUTED }}>Applications:</p>
            <div className="flex flex-col gap-[10px]">
              {(card.applications as unknown as string[]).map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: ITEM_BG }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEXT }} />
                  <span className="text-[15px] leading-snug" style={{ color: TEXT }}>{item}</span>
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
              <p className={`${p1} font-normal leading-[1.3] tracking-[-0.01em] mb-4`} style={{ color: TEXT }}>
                {card.id === 0 ? <>Don&apos;t just report on the patient experience, bring it to life.</> : card.headline}
              </p>
              <p className="text-[14px] leading-[1.7] mb-8" style={{ color: MUTED }}>{card.body}</p>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: MUTED }}>Applications:</p>
              <div className="flex flex-col gap-[10px]">
                {(card.applications as unknown as string[]).map((item) => (
                  <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: ITEM_BG }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEXT }} />
                    <span className="text-[15px] leading-snug" style={{ color: TEXT }}>{item}</span>
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
          <div className="mb-5 text-center max-w-[680px] mx-auto">
            <div className="mb-5">
              <span className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase">
                Explore the Applications
              </span>
            </div>
            <h2 className="text-[#31393c] text-[36px] md:text-[48px] font-light leading-[1.15] tracking-[-0.02em] mb-5">
              The right solution for <span className="font-serif italic">every goal</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 w-full">
            <button
              onClick={() => setActiveFilter(null)}
              className="inline-flex items-center gap-1.5 rounded-full text-[11px] font-semibold tracking-[0.09em] uppercase transition-all w-auto"
              style={{
                padding: '7px 14px',
                border: '1.5px solid #31393c',
                backgroundColor: activeFilter === null ? '#31393c' : 'transparent',
                color: activeFilter === null ? '#ffffff' : '#31393c',
              }}
            >All</button>
            {FILTERS.map(({ key, label, Icon, color, textColor }) => {
              const active = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(active ? null : key)}
                  className="inline-flex items-center gap-1.5 rounded-full text-[11px] font-semibold tracking-[0.09em] uppercase transition-all w-auto"
                  style={{
                    padding: '7px 14px',
                    border: `1.5px solid ${active ? color : '#31393c'}`,
                    backgroundColor: active ? color : 'transparent',
                    color: active ? textColor : '#31393c',
                  }}
                >
                  <Icon size={11} />{label}
                </button>
              );
            })}
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
                {/* Gradient wrapper — shows through as top edge */}
                <div
                  ref={el => { cardContentRefsMobile.current[stackIndex] = el; }}
                  style={{
                    borderRadius: '24px 24px 0 0',
                    background: 'linear-gradient(to right, #31393c 0%, #6b4b3e 55%, #a0522d 100%)',
                    padding: '6px 0 0 0',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gscm'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gscm)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.35, mixBlendMode: 'overlay' }} />
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
                      background: 'linear-gradient(to right, #31393c 0%, #6b4b3e 55%, #a0522d 100%)',
                      padding: '0 0 8px 0',
                      boxShadow: '0 16px 40px rgba(171,217,234,0.25)',
                    }}
                  >
                    {/* Noise on gradient */}
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gsc'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gsc)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.35, mixBlendMode: 'overlay' }} />
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
