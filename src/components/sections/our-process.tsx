"use client";

import React from 'react';


export default function OurProcess() {
  return (
    <section className="bg-[#131d2b] py-[100px] md:py-[140px]">
      <div className="container mx-auto px-8 md:px-16">

        {/* Section header */}
        <div className="mb-14 max-w-[680px]">
          <div className="mb-5">
            <span className="inline-block bg-[#fdffd6] text-[#131d2b] text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
              Our Process
            </span>
          </div>
          <h2 className="text-[#fdffd6] text-[38px] md:text-[52px] font-light leading-[1.15] tracking-[-0.02em] mb-5">
            One recording,{' '}
            <span className="font-serif italic">multiple uses.</span>
          </h2>
          <p className="text-[#fdffd6]/65 text-[17px] md:text-[18px] leading-[1.7]">
            Every interview we conduct becomes a living content engine — distributed across channels, indexed by search, and compounding in value over time. One conversation becomes many touchpoints.
          </p>
        </div>

        {/* Prism image */}
        <div className="w-full max-w-[900px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/prism-v3.png"
            alt="Our process prism"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Accent bar */}
        <div className="flex mt-14 max-w-[900px]">
          <div className="flex-1 h-[4px] bg-[#b85f2f] rounded-l-full" />
          <div className="flex-1 h-[4px] bg-[#8b4612] rounded-r-full" />
        </div>

      </div>
    </section>
  );
}
