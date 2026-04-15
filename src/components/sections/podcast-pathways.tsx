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
    <section ref={sectionRef} className="bg-white w-full pt-[88px] md:pt-20 pb-20">

      {/* ── Header ── */}
      <div className="text-center mb-14 px-4 md:px-8">
        <span
          className="text-[#6b6560] text-[15px] font-semibold tracking-[0.1em] uppercase block mb-5"
          style={fade(0)}
        >
          Build Your Show
        </span>
        <h2
          className="text-[#1a1a1a] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-4"
          style={fade(0.1)}
        >
          Start with your <span className="font-serif italic">audience</span>
        </h2>
        <p
          className="text-[#6b6560] text-[16px] leading-[1.65] max-w-[460px] mx-auto"
          style={fade(0.15)}
        >
          Every series begins with one question — who are you building for?
        </p>
      </div>

      {/* ── Full-bleed split ── */}
      <div className="flex flex-col md:flex-row mb-14" style={fade(0.2)}>

        {/* Internal — left half */}
        <div className="flex-1 px-8 md:px-16 py-12 flex flex-col" style={{ backgroundColor: '#f5ede6' }}>
          <span
            className="inline-block self-start text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: '#a0522d', color: '#ffffff' }}
          >
            Internal
          </span>
          <h3 className="text-[#1a1a1a] text-[28px] md:text-[34px] font-light leading-[1.15] tracking-[-0.02em] mb-4">
            For your <span className="tracking-wide">ORGANIZATION</span>
          </h3>
          <p className="text-[#6b6560] text-[15px] leading-[1.7] mb-8 max-w-[400px]">
            Align teams, close knowledge gaps, and deliver leadership communication through media your people actually consume.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['Audio', 'Video', 'Audio + Video'].map(f => (
              <span key={f} className="text-[12px] font-semibold tracking-[0.05em] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(107,75,62,0.12)', color: '#6b4b3e' }}>{f}</span>
            ))}
          </div>
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
            Build trust with patients, providers, and caregivers through narrative media that educates, empowers, and drives meaningful action.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['Audio', 'Video', 'Audio + Video'].map(f => (
              <span key={f} className="text-[12px] font-semibold tracking-[0.05em] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff' }}>{f}</span>
            ))}
          </div>
        </div>

      </div>

      {/* ── CTA ── */}
      <div className="flex justify-center px-4 md:px-8" style={fade(0.3)}>
        <a
          href="#contact"
          className="inline-flex items-center justify-center bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] font-semibold text-[15px] px-10 py-4 rounded-[6px] transition-colors duration-200"
        >
          Request a Proposal
        </a>
      </div>

    </section>
  );
}
