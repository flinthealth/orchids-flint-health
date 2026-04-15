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
    <section ref={sectionRef} className="bg-white w-full pt-[56px] md:pt-12 pb-0">

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
          {/* Team icon */}
          <div className="mt-auto flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-team-v5.png" alt="" width={200} height={200} style={{ display: 'block' }} />
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
          {/* Audience icon set — Bauhaus geometric */}
          <div className="mt-auto flex justify-center items-end gap-10">

            {/* Patient — circle head + geometric headphones */}
            <div className="flex flex-col items-center gap-3">
              <svg width="96" height="110" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Headphone band */}
                <path d="M18 30 A22 22 0 0 1 62 30" stroke="#ffde5f" strokeWidth="5" fill="none" strokeLinecap="square"/>
                {/* Ear cushions */}
                <rect x="12" y="27" width="10" height="16" rx="5" fill="#ffde5f"/>
                <rect x="58" y="27" width="10" height="16" rx="5" fill="#ffde5f"/>
                {/* Head — large circle */}
                <circle cx="40" cy="30" r="18" fill="#fac12c"/>
                {/* Body — bold semicircle */}
                <path d="M8 96 Q8 62 40 62 Q72 62 72 96" fill="#fac12c" opacity="0.35"/>
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Patient</span>
            </div>

            {/* Provider — circle + medical cross */}
            <div className="flex flex-col items-center gap-3">
              <svg width="96" height="110" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <circle cx="40" cy="22" r="18" fill="#6290c9"/>
                {/* Body */}
                <path d="M8 96 Q8 58 40 58 Q72 58 72 96" fill="#6290c9" opacity="0.3"/>
                {/* Cross — bold rectangles */}
                <rect x="36" y="62" width="8" height="26" rx="2" fill="#fac12c"/>
                <rect x="27" y="71" width="26" height="8" rx="2" fill="#fac12c"/>
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Provider</span>
            </div>

            {/* Caregiver — two offset circles + geometric heart */}
            <div className="flex flex-col items-center gap-3">
              <svg width="96" height="110" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back figure */}
                <circle cx="50" cy="24" r="13" fill="#fac12c" opacity="0.4"/>
                <path d="M28 96 Q28 66 50 66 Q72 66 72 96" fill="#fac12c" opacity="0.15"/>
                {/* Front figure */}
                <circle cx="30" cy="26" r="18" fill="#fac12c"/>
                <path d="M6 96 Q6 62 30 62 Q54 62 54 96" fill="#fac12c" opacity="0.35"/>
                {/* Geometric heart — two circles + diamond */}
                <circle cx="47" cy="44" r="7" fill="#ffde5f"/>
                <circle cx="59" cy="44" r="7" fill="#ffde5f"/>
                <polygon points="41,49 53,62 65,49" fill="#ffde5f"/>
              </svg>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Caregiver</span>
            </div>

          </div>
        </div>

      </div>

      {/* ── Curved brace connector (} rotated 90°) ── */}
      <div className="w-full bg-white overflow-hidden" aria-hidden="true" style={fade(0.25)}>
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
