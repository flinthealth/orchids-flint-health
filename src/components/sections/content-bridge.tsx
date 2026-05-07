"use client";

import React from 'react';

export default function ContentBridge() {
  return (
    <section className="relative w-full py-24 px-6 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #2c3436 0%, #6b4b3e 55%, #a0522d 100%)',
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content */}
      <div className="relative z-10">

        <h2
          className="text-[36px] md:text-[44px] lg:text-[52px] font-light leading-[1.2] tracking-[-0.02em] mb-6 mx-auto"
          style={{ color: '#f9f5ef' }}
        >
          <span className="block md:whitespace-nowrap mb-4 md:mb-0">Most content<br className="md:hidden" /> gets <span className="font-serif italic">seconds.</span></span>
          <span className="block md:whitespace-nowrap">A strategic series<br className="md:hidden" /> gets <span className="font-serif italic">hours.</span></span>
        </h2>

        {/* Pattern interrupt */}
        <p
          className="font-serif italic mb-8 mx-auto"
          style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(249,245,239,0.45)', letterSpacing: '0.02em' }}
        >
          (read that again).
        </p>

        <p
          className="text-[16px] md:text-[17px] leading-[1.65] max-w-[480px] mx-auto"
          style={{ color: 'rgba(249,245,239,0.65)' }}
        >
          That&rsquo;s not just more time. It&rsquo;s a fundamentally different relationship with your audience.
        </p>
      </div>
    </section>
  );
}
