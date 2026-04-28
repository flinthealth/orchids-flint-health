"use client";

import React, { useRef, useState, useEffect } from "react";

const CARDS = [
  {
    stat: "75%",
    label: "of clinicians overwhelmed by the pace of treatment advances",
    cite: "1",
    citeUrl: "https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly",
    title: "Clinicians",
    desc: "Providers want to stay current, but competing demands leave no time to absorb new protocols, products, and research. Your most important advances aren't reaching the people who need them.",
    bg: "#fee7da",
    titleColor: "#131d2b",
    statColor: "#7d310c",
    descColor: "rgba(19,29,43,0.65)",
  },
  {
    stat: "9 in 10",
    label: "patients struggle with health information",
    cite: "2",
    citeUrl: "https://www.cdc.gov/health-literacy/php/about/tell-others.html",
    title: "Patients",
    desc: "Nearly 9 in 10 adults struggle to understand health information filled with complex or unfamiliar terms. The care you've invested in isn't landing the way it should.",
    bg: "#fee7da",
    titleColor: "#131d2b",
    statColor: "#7d310c",
    descColor: "rgba(19,29,43,0.65)",
  },
  {
    stat: "$12K+",
    label: "cost of poor communication per employee",
    cite: "3",
    citeUrl: "https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/",
    title: "Teams",
    desc: "Poor internal communication costs $12,000+ per employee per year, slowing decisions, stalling initiatives, and keeping your teams from moving in the same direction.",
    bg: "#fee7da",
    titleColor: "#131d2b",
    statColor: "#7d310c",
    descColor: "rgba(19,29,43,0.65)",
  },
];

export default function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section ref={ref} className="bg-[#131d2b] px-6 md:px-8 pt-[90px] pb-[90px]">
      <div className="max-w-[1100px] mx-auto text-center">

        {/* Centered pill */}
        <div className="mb-10" style={fade(0)}>
          <span className="inline-block bg-[#fdffd6] text-[#131d2b] text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#131d2b]">
            Healthcare Today
          </span>
        </div>

        {/* Headline */}
        <div className="mb-8" style={fade(0.1)}>
          <h2 className="text-[#fdffd6] text-[36px] md:text-[52px] font-light leading-[1.2] tracking-[-0.02em] mb-6">
            Attention is the real challenge
          </h2>
          <p className="text-[#fdffd6]/70 text-[18px] md:text-[20px] font-light leading-[1.6] max-w-[540px] mx-auto">
            Without attention, even the most promising treatments, care models, and clinical teams fall short of their potential.
          </p>
        </div>

        {/* Three cards — stat-led, no icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10" style={fade(0.25)}>
          {CARDS.map(({ stat, label, cite, citeUrl, title, desc, bg, descColor }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center px-8 py-10 rounded-2xl"
              style={{ backgroundColor: bg }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-5" style={{ color: '#131d2b' }}>{title}</p>
              <p
                className="font-light leading-none mb-1 tracking-[-0.03em]"
                style={{ fontSize: 'clamp(48px, 5vw, 64px)', color: '#7d310c' }}
              >
                {stat}
              </p>
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] mb-6" style={{ color: 'rgba(19,29,43,0.45)' }}>
                {label}<a href={citeUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity" style={{ color: 'rgba(19,29,43,0.6)' }}>{cite}</a>
              </p>
              <div className="w-8 h-[2px] mb-6 opacity-20 rounded-full bg-[#131d2b]" />
              <p className="text-[15px] leading-[1.65]" style={{ color: descColor }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={fade(0.4)} className="flex flex-col items-center mb-0">
          <p className="text-[#fdffd6]/50 text-[13px] font-medium uppercase tracking-[0.18em] mb-5">
            When attention is earned, everything changes
          </p>
          <div className="flex flex-col gap-3 max-w-max">
            {[
              'Complex science becomes understandable',
              'Clinicians learn and adopt new approaches',
              'Patients build trust in treatment',
              'Teams align around a shared vision',
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#fdffd6]/50" />
                <p className="text-[#fdffd6]/80 text-[15px] md:text-[17px] font-light leading-[1.5] tracking-[-0.01em]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p
          className="text-[#fdffd6] text-[22px] md:text-[28px] font-light leading-[1.8] tracking-[-0.01em] mt-12 max-w-[620px] mx-auto"
          style={fade(0.55)}
        >
          Attention leads to more{' '}
          <span className="inline-block bg-[#fee7da] text-[#131d2b] text-[18px] md:text-[22px] font-medium px-3 py-0.5 rounded-full leading-snug">engagement</span>,{' '}
          <span className="inline-block bg-[#F1AA66] text-[#131d2b] text-[18px] md:text-[22px] font-medium px-3 py-0.5 rounded-full leading-snug">adherence</span>,{' '}
          <span className="inline-block bg-[#B85E2F] text-[#fdffd6] text-[18px] md:text-[22px] font-medium px-3 py-0.5 rounded-full leading-snug">retention</span>,{' '}
          <span className="inline-block bg-[#8B4512] text-[#fdffd6] text-[18px] md:text-[22px] font-medium px-3 py-0.5 rounded-full leading-snug">advocacy</span>,{' '}
          and{' '}
          <span className="inline-block bg-[#abd9ea] text-[#131d2b] text-[18px] md:text-[22px] font-medium px-3 py-0.5 rounded-full leading-snug">referrals</span>.
        </p>

        <p
          className="text-[#fdffd6] text-[28px] md:text-[36px] font-light leading-[1.2] tracking-[-0.02em] mt-16"
          style={fade(0.65)}
        >
          This is where{' '}
          <span className="relative inline-block">
            Flint
            <svg
              className="absolute left-0 w-full"
              style={{ bottom: '-6px', height: '10px' }}
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="5" x2="100" y2="5" stroke="#fdffd6" strokeWidth="1.5" />
            </svg>
          </span>{' '}
          comes in.
        </p>

      </div>
    </section>
  );
}
