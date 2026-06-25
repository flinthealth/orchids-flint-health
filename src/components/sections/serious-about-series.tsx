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

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

          {/* Text column */}
          <div className="lg:max-w-[560px] lg:pt-4">
            <div className="bg-[#ede8e1] rounded-[16px] p-5 md:p-6 mb-4">
              <h4 className="font-light text-[#2b3335] tracking-[-0.01em]">
                We make it easy for healthcare brands to develop, launch, and grow branded series across all channels.
              </h4>
            </div>

            {/* Mobile-only radar */}
            <div className="lg:hidden flex justify-center my-10">
              <RadarDial />
            </div>

            <p className="text-[#43382f] leading-relaxed mt-6">
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