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
    <section ref={sectionRef} className="bg-[#f7f3ef] w-full pt-[28px] md:pt-12 pb-0">

      {/* ── Header ── */}
      <div className="text-center mb-14 px-4 md:px-8">
        <span
          className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5"
          style={fade(0)}
        >
          Reach Your People
        </span>
        <h2
          className="text-[#1a1a1a] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4"
          style={fade(0.1)}
        >
          Create an <span className="font-serif italic">Impactful Series</span> with us
        </h2>
        <p
          className="text-[#6b6560] text-[16px] leading-[1.65] max-w-[460px] mx-auto"
          style={fade(0.15)}
        >
          Every series begins with one question...<br />Who are you building for?
        </p>
      </div>

      {/* ── Full-bleed split ── */}
      <div className="flex flex-col md:flex-row" style={fade(0.2)}>

        {/* Internal — left half */}
        <div className="flex-1 px-8 md:px-16 py-12 flex flex-col" style={{ backgroundColor: 'rgba(19,29,43,0.07)' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#31393c', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#1a1a1a] text-[28px] md:text-[34px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            For your <span className="tracking-wide">ORGANIZATION</span>
          </h3>
          <p className="text-[#6b6560] text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Align teams, close knowledge gaps, and deliver leadership communication through media your people actually consume.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: 'rgba(49,57,60,0.1)' }} />
        <div className="md:hidden h-px w-full" style={{ backgroundColor: 'rgba(49,57,60,0.1)' }} />

        {/* Public — right half */}
        <div className="flex-1 px-8 md:px-16 py-12 flex flex-col" style={{ backgroundColor: '#31393c' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
          >
            Public
          </span>
          <h3 className="text-[#ffffff] text-[28px] md:text-[34px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            For your <span className="tracking-wide">AUDIENCE</span>
          </h3>
          <p className="text-[#ffffff]/70 text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Build trust with <strong className="text-white font-semibold">patients</strong>, <strong className="text-white font-semibold">providers</strong>, and <strong className="text-white font-semibold">caregivers</strong> through narrative media that educates, empowers, and drives meaningful action.
          </p>
        </div>

      </div>

      {/* ── Curved brace connector (} rotated 90°) ── */}
      <div className="w-full bg-[#f7f3ef] overflow-hidden" aria-hidden="true" style={fade(0.25)}>
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '100px', display: 'block' }}
        >
          {/* Left arm: curves from center of Internal half down to center point */}
          <path
            d="M 250,0 C 250,70 500,30 500,100"
            stroke="#b0a89e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right arm: curves from center of Public half down to center point */}
          <path
            d="M 750,0 C 750,70 500,30 500,100"
            stroke="#b0a89e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

    </section>
  );
}
