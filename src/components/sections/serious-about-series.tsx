"use client";

import React from 'react';

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
            <h2 className="text-[40px] md:text-[52px] font-light text-[#2b3335] leading-[1.1] tracking-[-0.02em] mb-5">
              Flint makes it easy to develop, launch, and grow branded series across all channels.
            </h2>
            <p className="text-[17px] text-[#43382f] leading-relaxed opacity-90">
              A series is flexible in the best way. It can build out into seasons and travel across every stage of the patient, provider, or employee journey.
            </p>
          </div>

          {/* Image column — reserved space only. Add the chosen image here in Orchids once the asset is finalized. */}
          <div className="hidden lg:block lg:w-[360px] lg:flex-shrink-0">
            {/* image placeholder */}
          </div>

        </div>
      </div>
    </section>
  );
}