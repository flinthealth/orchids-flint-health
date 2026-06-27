"use client";

import React from 'react';
import RadarDial from "@/components/sections/radar-dial";

export default function SeriousAboutSeries() {
  return (
    <section style={{ background: '#f9f5ef' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-20">

        <h1 className="text-center font-light text-[#2b3335] tracking-[-0.02em] mb-10">
          Flint's a <span className="font-serif italic" style={{ color: '#2b3335' }}>full-service</span><br />
          production partner
        </h1>

        {/* Divider */}
        <div className="w-full h-px mb-10" style={{ background: 'rgba(43,51,53,0.1)' }}></div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

          {/* Text column */}
          <div className="md:max-w-[540px] md:mx-auto lg:max-w-[560px] lg:pt-4 lg:mx-0">
              <h3 className="font-light leading-[1.15] tracking-[-0.02em] mb-4" style={{ color: '#2b3335' }}>
                We make it easy for healthcare brands to develop, launch, and grow branded series across owned and partner channels.
              </h3>

            {/* Mobile-only radar */}
            <div className="lg:hidden flex justify-center my-10">
              <RadarDial />
            </div>

            <p className="text-[#43382f] leading-relaxed mt-6 md:max-w-[400px] md:mx-auto lg:max-w-none lg:mx-0 text-center lg:text-left">
              <strong>Master 360° campaigns</strong> that travel across every stage of your patient, provider, or employee journey.
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