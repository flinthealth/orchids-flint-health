"use client";

import React from 'react';

const ROW1 = [
  { label: "Humanize Your Brand",          color: "#1a1a1a", bg: "#fac12c" },
  { label: "Create Community Connection",  color: "#1a1a1a", bg: "#fac12c" },
  { label: "Generate Revenue",             color: "#1a1a1a", bg: "#ffde5f" },
  { label: "Lift Brand Awareness",          color: "#ffffff", bg: "#6290c9" },
];

const ROW2 = [
  { label: "Yield an Efficient & Measurable ROI", color: "#1a1a1a", bg: "#ffde5f" },
  { label: "Establish Thought Leadership",         color: "#ffffff", bg: "#31393c" },
  { label: "Patient Education & Empowerment",      color: "#1a1a1a", bg: "#fac12c" },
  { label: "Connect with Your Target Audience",    color: "#ffffff", bg: "#6290c9" },
];

const ROW3 = [
  { label: "Build Strategic Partnerships",      color: "#1a1a1a", bg: "#fac12c" },
  { label: "Differentiate Your Brand",          color: "#ffffff", bg: "#31393c" },
  { label: "Foster & Maintain Public Trust",    color: "#1a1a1a", bg: "#fac12c" },
  { label: "Deepen Engagement and Retention",   color: "#ffffff", bg: "#6290c9" },
];

const Pill = ({ label, color, bg }: { label: string; color: string; bg: string }) => (
  <div
    className="flex-shrink-0 flex items-center gap-2.5 rounded-full px-5 py-3 mx-2 text-[14px] font-medium whitespace-nowrap border"
    style={{ color, backgroundColor: bg, borderColor: `${color}20` }}
  >
    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
    {label}
  </div>
);

const MarqueeRow = ({ items, direction }: { items: typeof ROW1; direction: 'left' | 'right' | 'left-slow' }) => {
  // 2 copies: animate -50% = exactly 1 copy width for seamless loop
  const doubled = [...items, ...items];
  const cls = direction === 'left' ? 'marquee-left' : direction === 'right' ? 'marquee-right' : 'marquee-left-slow';
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex ${cls}`}
        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
      >
        {doubled.map((item, i) => (
          <Pill key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

const FeaturesGrid = () => {
  return (
    <section className="bg-[#ffffff] py-[80px] md:py-[120px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <h2 className="text-[40px] md:text-[56px] leading-[1.1] text-[#31393c] font-sans tracking-tight max-w-[580px]">
              <em className="font-serif italic">Skip the ad</em>—command true presence and relevancy
            </h2>
          </div>
          <div className="lg:pl-8">
            <p className="text-[15px] md:text-[17px] text-[#31393c] font-sans leading-relaxed max-w-[420px] mb-5">
              It's rare for a brand to command more than 20 minutes of a consumer's attention.
            </p>
            <p className="text-[15px] md:text-[17px] text-[#31393c] font-sans leading-relaxed max-w-[420px]">
              Branded podcasts solve this dilemma by taking your audience on a journey they can access anywhere, anytime. Through sharing valuable information and telling meaningful stories you deepen awareness, trust, and loyalty.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width marquee */}
      <div className="flex flex-col gap-4 mt-4">
        <MarqueeRow items={ROW1} direction="left" />
        <MarqueeRow items={ROW2} direction="right" />
        <MarqueeRow items={ROW3} direction="left-slow" />
      </div>
    </section>
  );
};

export default FeaturesGrid;
