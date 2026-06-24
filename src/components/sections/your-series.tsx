"use client";

import React from 'react';

export default function YourSeries() {
  return (
    <div>

      {/* ── Step 1 (white) ── */}
      <section style={{ backgroundColor: '#ffffff' }} className="py-16 md:py-20">
        <div className="ys-phase-block max-w-[1000px] mx-auto w-full px-6 md:px-8">
          <div className="ys-phase-number text-[56px] font-light tracking-[-0.04em] leading-none mb-1" style={{ color: '#43382f' }}>1</div>
          <div className="text-[26px] font-bold text-[#2b3335] leading-tight mb-4">Outcomes first.</div>
          <p className="text-[16px] font-medium uppercase tracking-[0.08em] leading-[1.4] mb-3" style={{ color: '#677283' }}>
            We start with the end in mind. What does success look like?
          </p>
          <p className="text-[17px] text-[#43382f] leading-relaxed">
            Your story, voice, competitive angle, and format locked before anyone steps to a mic.
          </p>
        </div>

        {/* ── Testimonial ── */}
        <div className="max-w-[1000px] mx-auto w-full px-6 md:px-8 pt-10">
          <div className="bg-[#f9f5ef] rounded-2xl p-8 border border-[rgba(43,51,53,0.09)] flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <p className="ys-testimonial-quote text-[17px] text-[#43382f] leading-relaxed order-1 md:order-2">
              "You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality. Thank you for all of your efforts, patience and direction you provided us."
            </p>
            <div className="flex md:flex-col flex-row items-center md:items-center flex-shrink-0 md:w-[104px] gap-3 md:gap-0 order-2 md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/testimonial-erin-knopf.jpg" className="ys-testimonial-photo w-[160px] h-[160px] md:w-[96px] md:h-[96px] rounded-full object-cover md:mb-3 flex-shrink-0" alt="Dr. Erin Knopf" />
              <div className="md:text-center">
                <div className="text-[14px] font-semibold text-[#2b3335] leading-snug">Dr. Erin Knopf</div>
                <div className="text-[13px] text-[#677283]">Very Health</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 2 (Mother Swan) ── */}
      <section style={{ backgroundColor: '#f9f5ef' }} className="py-16 md:py-20">
        <div className="ys-phase-block max-w-[1000px] mx-auto w-full px-6 md:px-8">
          <div className="ys-phase-number text-[56px] font-light tracking-[-0.04em] leading-none mb-1" style={{ color: '#43382f' }}>2</div>
          <div className="text-[26px] font-bold text-[#2b3335] leading-tight mb-4">Production handled.</div>
          <p className="text-[16px] font-medium uppercase tracking-[0.08em] leading-[1.4] mb-5" style={{ color: '#677283' }}>
            You show up. We handle everything else.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Booking guests',
              'Coordinating interviews',
              'Studio-quality audio and video',
              'Full editing',
              'Sound design',
              'Distribution to all major platforms or your internal teams',
            ].map((item) => (
              <span
                key={item}
                className="text-[13px] font-semibold tracking-[0.04em] text-[#2b3335]"
                style={{ background: '#e1dfdd', borderRadius: '20px', padding: '8px 16px' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        @media (max-width: 767px) {
          .ys-phase-block {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .ys-phase-number {
            font-size: 44px !important;
          }
          .ys-testimonial-photo {
            width: 80px !important;
            height: 80px !important;
          }
          .ys-testimonial-quote {
            font-size: 16px !important;
          }
        }
      `}</style>

    </div>
  );
}