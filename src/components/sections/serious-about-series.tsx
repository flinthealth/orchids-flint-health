"use client";

import React from 'react';
import RadarDial from "@/components/sections/radar-dial";

export default function SeriousAboutSeries() {
  return (
    <section style={{ background: '#f9f5ef' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-20">

        <h1 className="text-center text-[40px] md:text-[51px] font-light text-[#2b3335] leading-[1.15] tracking-[-0.02em] mb-10">
          A <span className="font-serif italic" style={{ color: '#2b3335' }}>full-service</span><br />
          production partner
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

          {/* Text column */}
          <div className="lg:max-w-[560px] lg:pt-4">
            <h2 className="text-[28px] md:text-[36px] font-light text-[#2b3335] leading-[1.2] tracking-[-0.01em] mb-4">
              We make it easy for healthcare brands to develop, launch, and grow branded series across all channels.
            </h2>
            <p className="text-[17px] text-[#43382f] leading-relaxed">
              Flint helps you <strong>master 360° campaigns</strong> that travel across every stage of your patient, provider, or employee journey.
            </p>
          </div>

          <div className="hidden lg:flex lg:w-[420px] lg:flex-shrink-0 items-center justify-center">
            <RadarDial />
          </div>

        </div>
      </div>
    </section>
  );
}