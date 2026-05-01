"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function PodcastPathways() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section ref={sectionRef} className="w-full pt-[64px] md:pt-[96px] pb-[80px] relative" style={{ background: 'linear-gradient(to right, #2c3436 0%, #6b4b3e 55%, #a0522d 100%)' }}>

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gpp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gpp)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.28, mixBlendMode: 'overlay' }} />

      {/* ── Header ── */}
      <div className="text-center mb-14 px-4 md:px-8">
        <span
          className="text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5"
          style={{ ...fade(0), color: 'rgba(249,245,239,0.55)' }}
        >
          Your Series
        </span>
        {/* Mobile headline */}
        <h2
          className="md:hidden text-white text-[40px] font-light leading-[1.1] tracking-[-0.02em] mb-4 max-w-[640px] mx-auto"
          style={fade(0.1)}
        >
          Launch a complete series<br /><span className="font-serif italic" style={{ color: '#ffffff' }}>in one quarter.</span>
        </h2>
        {/* Desktop headline */}
        <h2
          className="hidden md:block text-white text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4 max-w-[640px] mx-auto"
          style={fade(0.1)}
        >
          Launch a complete series <span className="font-serif italic" style={{ color: '#ffffff' }}>in one quarter.</span>
        </h2>
        <p
          className="text-white/60 text-[16px] leading-[1.65] max-w-[460px] mx-auto"
          style={fade(0.15)}
        >
          Who do you want to reach?
        </p>
      </div>

      {/* ── Mobile: full-bleed split ── */}
      <div className="flex flex-col md:hidden" style={fade(0.2)}>

        {/* Internal — mobile */}
        <div className="flex-1 px-8 py-12 flex flex-col" style={{ backgroundColor: '#ede4da' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#54819a', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#2b3335] text-[28px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">TEAM</span>
          </h3>
          <p className="text-[#43382f] text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Align your people around a shared vision. From onboarding to leadership messaging, carry your <strong className="text-[#2b3335] font-semibold">values</strong> and <strong className="text-[#2b3335] font-semibold">mission</strong> to every member of your organization.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(43,51,53,0.1)' }} />

        {/* Public — mobile */}
        <div className="flex-1 px-8 py-12 flex flex-col" style={{ backgroundColor: '#ede4da' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#eeb20b', color: '#43382f' }}
          >
            Public
          </span>
          <h3 className="text-[#2b3335] text-[28px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">COMMUNITY</span>
          </h3>
          <p className="text-[#43382f] text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Earn the trust of the <strong className="text-[#2b3335] font-semibold">patients</strong>, <strong className="text-[#2b3335] font-semibold">providers</strong>, and <strong className="text-[#2b3335] font-semibold">caregivers</strong> who need what you do. Meet them where they are, educating, empowering, and moving them to act.
          </p>
        </div>
      </div>

      {/* ── Desktop / Tablet: two centered cards ── */}
      <div className="hidden md:flex flex-row items-start justify-center gap-6 px-8 pb-2" style={fade(0.2)}>

        {/* Internal card */}
        <div
          className="w-[420px] lg:w-[460px] px-10 py-10 flex flex-col rounded-2xl"
          style={{ backgroundColor: '#ede4da' }}
        >
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#54819a', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#2b3335] text-[28px] md:text-[32px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">TEAM</span>
          </h3>
          <p className="text-[#43382f] text-[15px] leading-[1.7]">
            Align your people around a shared vision. From onboarding to leadership messaging, carry your <strong className="text-[#2b3335] font-semibold">values</strong> and <strong className="text-[#2b3335] font-semibold">mission</strong> to every member of your organization.
          </p>
        </div>

        {/* Public card */}
        <div
          className="w-[420px] lg:w-[460px] px-10 py-10 flex flex-col rounded-2xl"
          style={{ backgroundColor: '#ede4da' }}
        >
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#eeb20b', color: '#43382f' }}
          >
            Public
          </span>
          <h3 className="text-[#2b3335] text-[28px] md:text-[32px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">COMMUNITY</span>
          </h3>
          <p className="text-[#43382f] text-[15px] leading-[1.7]">
            Earn the trust of the <strong className="text-[#2b3335] font-semibold">patients</strong>, <strong className="text-[#2b3335] font-semibold">providers</strong>, and <strong className="text-[#2b3335] font-semibold">caregivers</strong> who need what you do. Meet them where they are, educating, empowering, and moving them to act.
          </p>
        </div>
      </div>

    </section>
  );
}
