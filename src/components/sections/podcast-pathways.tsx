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
    <section ref={sectionRef} className="bg-[#f9f5ef] w-full pt-[64px] md:pt-[96px] pb-8 md:pb-12">

      {/* ── Header ── */}
      <div className="text-center mb-14 px-4 md:px-8">
        <span
          className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5"
          style={fade(0)}
        >
          Your Series
        </span>
        {/* Mobile headline */}
        <h2
          className="md:hidden text-[#43382f] text-[40px] font-light leading-[1.1] tracking-[-0.02em] mb-4 max-w-[640px] mx-auto"
          style={fade(0.1)}
        >
          In one quarter,<br />own an engaging<br />series that is<br /><span className="font-serif italic">built to last</span>
        </h2>
        {/* Desktop headline */}
        <h2
          className="hidden md:block text-[#43382f] text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4 max-w-[640px] mx-auto"
          style={fade(0.1)}
        >
          In one quarter,<br />own an engaging series<br />that is <span className="font-serif italic">built to last</span>
        </h2>
        <p
          className="text-[#677283] text-[16px] leading-[1.65] max-w-[460px] mx-auto"
          style={fade(0.15)}
        >
          Who do you want to reach?
        </p>
      </div>

      {/* ── Mobile: full-bleed split ── */}
      <div className="flex flex-col md:hidden" style={fade(0.2)}>

        {/* Internal — mobile */}
        <div className="flex-1 px-8 py-12 flex flex-col" style={{ backgroundColor: '#54819a' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#ffffff] text-[28px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">TEAM</span>
          </h3>
          <p className="text-[#ffffff]/75 text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Align teams, close knowledge gaps, and deliver <strong className="text-white font-semibold">leadership communication</strong> through media your people actually consume.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Public — mobile */}
        <div className="flex-1 px-8 py-12 flex flex-col" style={{ backgroundColor: '#4a5a66' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
          >
            Public
          </span>
          <h3 className="text-[#ffffff] text-[28px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">COMMUNITY</span>
          </h3>
          <p className="text-[#ffffff]/70 text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Build trust with <strong className="text-white font-semibold">patients</strong>, <strong className="text-white font-semibold">providers</strong>, and <strong className="text-white font-semibold">caregivers</strong> through narrative media that educates, empowers, and drives meaningful action.
          </p>
        </div>
      </div>

      {/* ── Desktop / Tablet: two centered cards ── */}
      <div className="hidden md:flex flex-row items-start justify-center gap-6 px-8 pb-2" style={fade(0.2)}>

        {/* Internal card */}
        <div
          className="w-[420px] lg:w-[460px] px-10 py-10 flex flex-col rounded-2xl"
          style={{ backgroundColor: '#54819a' }}
        >
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#ffffff] text-[28px] md:text-[32px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">TEAM</span>
          </h3>
          <p className="text-[#ffffff]/75 text-[15px] leading-[1.7]">
            Align teams, close knowledge gaps, and deliver <strong className="text-white font-semibold">leadership communication</strong> through media your people actually consume.
          </p>
        </div>

        {/* Public card */}
        <div
          className="w-[420px] lg:w-[460px] px-10 py-10 flex flex-col rounded-2xl"
          style={{ backgroundColor: '#4a5a66' }}
        >
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
          >
            Public
          </span>
          <h3 className="text-[#ffffff] text-[28px] md:text-[32px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            Your <span className="tracking-wide">COMMUNITY</span>
          </h3>
          <p className="text-[#ffffff]/70 text-[15px] leading-[1.7]">
            Build trust with <strong className="text-white font-semibold">patients</strong>, <strong className="text-white font-semibold">providers</strong>, and <strong className="text-white font-semibold">caregivers</strong> through narrative media that educates, empowers, and drives meaningful action.
          </p>
        </div>
      </div>

    </section>
  );
}
