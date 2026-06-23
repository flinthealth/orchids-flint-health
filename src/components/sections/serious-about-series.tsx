"use client";

import React from 'react';
import RadarDial from "@/components/sections/radar-dial";

export default function SeriousAboutSeries() {
  return (
    <section style={{ background: '#f9f5ef' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

          {/* Text column */}
          <div className="lg:max-w-[560px]">
            <p className="text-[15px] font-semibold tracking-[0.1em] uppercase text-[#677283] mb-4">
              a full-service production partner
            </p>
            <h2 className="text-[28px] md:text-[36px] font-light text-[#2b3335] leading-[1.2] tracking-[-0.01em] mb-4">
              Flint makes it easy to develop, launch, and grow branded series across all channels.
            </h2>
            <p className="text-[17px] text-[#43382f] leading-relaxed opacity-90">
              A series is flexible in the best way. It can build out into seasons and travel across every stage of the patient, provider, or employee journey.
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