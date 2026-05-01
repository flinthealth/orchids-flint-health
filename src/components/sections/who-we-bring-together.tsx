"use client";

import React from 'react';

const CARDS = [
  {
    title: "Patient Education & Engagement",
    body: "Reach the patients living with the conditions you treat.",
    image: "/who-we-work-patient-advocacy-v2.webp",
  },
  {
    title: "Clinical Education & HCP Reach",
    body: "Build authority with providers and drive clinical adoption.",
    image: "/who-we-work-healthcare-professionals-v4.jpg",
  },
  {
    title: "Internal Communications & Culture",
    body: "Shape a culture that aligns with your mission and values.",
    image: "/who-we-work-healthcare-brands.webp",
  },
];

export default function WhoWeBringTogether() {
  return (
    <section className="bg-[#4a5a66] pt-[88px] md:pt-[80px] pb-[80px] relative overflow-hidden">

      {/* Decorative background circle — lower right */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="400" cy="400" r="350" stroke="white" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="250" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="text-center max-w-[900px] mx-auto mb-12 px-8">
        <h2 className="text-[#ffffff] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-6">
          Built for <span className="font-serif italic" style={{ color: '#ffffff' }}>healthcare</span>
        </h2>
        <p className="text-[#ffffff]/40 text-[13px] md:text-[15px] font-normal uppercase tracking-[0.1em] mb-5 md:whitespace-nowrap leading-[2]">
          Health systems &amp; clinics&nbsp;&nbsp;·&nbsp;&nbsp;Digital health platforms&nbsp;&nbsp;·&nbsp;&nbsp;Pharma &amp; biotech
        </p>
        <p className="text-[#ffffff]/70 text-[17px] leading-[1.5] max-w-[560px] mx-auto">
          Whether you're reaching patients, educating providers, or aligning your teams, we make the media that moves them.
        </p>
      </div>

      {/* Static cards */}
      <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[480px] px-4 md:px-6">
        {CARDS.map((card, idx) => (
          <div
            key={idx}
            className="relative rounded-[20px] overflow-hidden flex flex-col justify-end flex-1"
            style={{ minHeight: '320px' }}
          >
            {/* Image */}
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: 'linear-gradient(to top, rgba(19,29,43,0.95) 0%, rgba(19,29,43,0.65) 45%, rgba(19,29,43,0.25) 100%)' }}
            />

            {/* Card content */}
            <div className="relative z-20 p-7 md:p-7">
              <p className="text-white text-[17px] font-semibold leading-snug mb-2">{card.title}</p>
              <p className="text-white/80 text-[15px] leading-[1.5]">{card.body}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
