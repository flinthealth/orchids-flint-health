"use client";

import React from 'react';

export default function YourSeries() {
  return (
    <section style={{ backgroundColor: '#ffffff' }} className="py-20 md:py-28">
      <div className="max-w-[840px] mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase mb-5">
            Your Series
          </p>
          <h2
            className="text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ color: '#43382f' }}
          >
            <span className="md:hidden">From strategy to first episode<br /></span>
            <span className="hidden md:inline">From strategy to<br />first episode </span>
            <span className="font-serif italic">in 90 days.</span>
          </h2>
          <p className="text-[17px] leading-[1.65]" style={{ color: '#43382f' }}>
            <span className="hidden md:inline">Every series is custom-built around your goals, your audience,<br />and the outcomes that matter most.</span>
            <span className="md:hidden">Every series is custom-built around<br />your goals, your audience, and the<br />outcomes that matter most.</span>
          </p>
        </div>

      </div>

      {/* ── Phase 1 heading block ── */}
      <div className="ys-phase-block max-w-[1000px] mx-auto w-full px-6 md:px-8 pt-10 pb-10 md:pb-4">
        <div className="ys-phase-number ys-phase-gradient text-[88px] font-light tracking-[-0.04em] leading-none mb-1">1</div>
        <div className="text-[26px] font-bold text-[#2b3335] leading-tight mb-5">Strategy first.</div>
        <p className="font-serif italic text-[20px] md:text-[22px] text-[#43382f] leading-relaxed mb-3">
          Before we record a word, we know exactly what your series needs to do.
        </p>
        <p className="text-[17px] text-[#677283] leading-relaxed mb-10">
          Your story, voice, competitive angle, and format locked before anyone steps to a mic. The right format makes the difference between a bingeworthy series or one someone barely engages with.
        </p>
        <div className="ys-format-headline text-[22px] font-bold text-[#2b3335] mb-4 md:mb-4 lg:mb-6">A format for every goal.</div>
      </div>

      {/* ── Format grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 relative max-w-[1000px] mx-auto w-full md:px-8">


        {/* ── Cell 1 — Narrative ── */}
        <div className="px-6 md:px-10 py-8 md:py-0 md:pt-10 md:pb-0 border-b border-[rgba(43,51,53,0.08)] md:border-b-0 md:border-r border-[rgba(43,51,53,0.08)]">
          <div className="flex flex-col items-center text-center pb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-narrative-v3.png" className="w-[225px] h-[225px] object-contain mx-auto mb-6" alt="" />
            <p className="text-[22px] font-extrabold tracking-[0.06em] uppercase text-[#2b3335] mb-2">NARRATIVE</p>
            <p className="text-[13px] font-medium text-[#677283] uppercase tracking-[0.08em] mb-3">STORY-ARC DRIVEN</p>
          </div>
          <div className="border-[rgba(43,51,53,0.08)] pt-2 md:pt-2 pb-2 md:pb-0 lg:pb-10">
            <p className="text-[17px] text-[#677283] leading-relaxed mb-3">Documentary-style. Multiple perspectives woven into one cohesive arc with episode hooks, emotional pull, and narrative tension that keeps audiences coming back. Great for series that represent a journey or transformation.</p>
            <p className="text-[17px] font-bold text-[#2b3335] mb-2">Premium tier format.</p>
            <p className="font-serif italic text-[16px] text-[#677283]">Like Serial or This American Life — for healthcare</p>
          </div>
        </div>

        {/* ── Cell 2 — Interview ── */}
        <div className="px-6 md:px-10 py-8 md:py-0 md:pt-10 md:pb-0 border-b border-[rgba(43,51,53,0.08)] md:border-b-0">
          <div className="flex flex-col items-center text-center pb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-interview-v8.png" className="w-[225px] h-[225px] object-contain mx-auto mb-6" alt="" />
            <p className="text-[22px] font-extrabold tracking-[0.06em] uppercase text-[#2b3335] mb-2">INTERVIEW</p>
            <p className="text-[13px] font-medium text-[#677283] uppercase tracking-[0.08em] mb-3">GUEST-DRIVEN DEPTH</p>
          </div>
          <div className="border-[rgba(43,51,53,0.08)] pt-2 md:pt-2 pb-2 md:pb-0 lg:pb-10">
            <p className="text-[17px] text-[#677283] leading-relaxed mb-3">One guest, one conversation, one perspective at a time. Each episode builds authority, grows trust, and adds a meaningful connection to your network. Great for thought leadership, brand authority, and expanding your reach.</p>
            <p className="text-[17px] font-bold text-[#2b3335] mb-2">Most familiar format.</p>
            <p className="font-serif italic text-[16px] text-[#677283]">Like Armchair Expert or Fresh Air — for healthcare</p>
          </div>
        </div>

        {/* ── Row divider — desktop only ── */}
        <div className="hidden md:block col-span-2 mx-10 border-t border-[rgba(43,51,53,0.08)] my-6" />

        {/* ── Cell 3 — Conversational ── */}
        <div className="px-6 md:px-10 py-8 md:py-0 md:pt-10 md:pb-10 border-b border-[rgba(43,51,53,0.08)] md:border-b-0 md:border-r border-[rgba(43,51,53,0.08)]">
          <div className="flex flex-col items-center text-center pb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-conversational-v10.png" className="w-[225px] h-[225px] object-contain mx-auto mb-6" alt="" />
            <p className="text-[22px] font-extrabold tracking-[0.06em] uppercase text-[#2b3335] mb-2">CONVERSATIONAL</p>
            <p className="text-[13px] font-medium text-[#677283] uppercase tracking-[0.08em] mb-3">CO-HOST CHEMISTRY</p>
          </div>
          <div className="border-[rgba(43,51,53,0.08)] pt-2 md:pt-2 pb-2 md:pb-0">
            <p className="text-[17px] text-[#677283] leading-relaxed mb-3">Two hosts, structured and conversational. Makes even the densest clinical or technical ideas feel accessible and easy to follow for public audiences or internal teams. Great for making complex topics feel approachable.</p>
            <p className="text-[17px] font-bold text-[#2b3335] mb-2">Eavesdropping on experts format.</p>
            <p className="font-serif italic text-[16px] text-[#677283]">Like Stuff You Should Know or We Can Do Hard Things — for healthcare</p>
          </div>
        </div>

        {/* ── Cell 4 — Panel ── */}
        <div className="px-6 md:px-10 py-8 md:py-0 md:pt-10 md:pb-10">
          <div className="flex flex-col items-center text-center pb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-panel-v4.png" className="w-[225px] h-[225px] object-contain mx-auto mb-6" alt="" />
            <p className="text-[22px] font-extrabold tracking-[0.06em] uppercase text-[#2b3335] mb-2">PANEL</p>
            <p className="text-[13px] font-medium text-[#677283] uppercase tracking-[0.08em] mb-3">MULTI-EXPERT VOICES</p>
          </div>
          <div className="border-[rgba(43,51,53,0.08)] pt-2 md:pt-2 pb-2 md:pb-0">
            <p className="text-[17px] text-[#677283] leading-relaxed mb-3">Multiple expert voices in dialogue or debate. Elevates your clinicians and brand in equal measure while signaling range and depth. Great for showcasing expertise and building influence across multiple sectors and specialties.</p>
            <p className="text-[17px] font-bold text-[#2b3335] mb-2">Network-building format.</p>
            <p className="font-serif italic text-[16px] text-[#677283]">Like Intelligence Squared or This Week in Tech — for healthcare</p>
          </div>
        </div>

      </div>{/* /format grid */}

      {/* ── Testimonial ── */}
      <div className="max-w-[1000px] mx-auto w-full px-6 md:px-8 py-12">
        {/* Desktop: photo left, quote right. Mobile: quote top, attribution bottom */}
        <div className="bg-white rounded-2xl p-8 border border-[rgba(43,51,53,0.09)] flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
          {/* Quote — always visible, on mobile comes first */}
          <p className="ys-testimonial-quote text-[17px] text-[#43382f] leading-relaxed order-1 md:order-2">
            "You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality. Thank you for all of your efforts, patience and direction you provided us."
          </p>
          {/* Attribution — desktop: left column stacked. Mobile: bottom row */}
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

      {/* ── Phase 2 ── */}
      <div className="ys-phase-block max-w-[1000px] mx-auto w-full px-6 md:px-8 pt-16 pb-10 border-t border-[rgba(43,51,53,0.08)]">
        <div className="ys-phase-number ys-phase-gradient text-[88px] font-light tracking-[-0.04em] leading-none mb-1">2</div>
        <div className="text-[26px] font-bold text-[#2b3335] leading-tight mb-5">Production handled.</div>
        <p className="font-serif italic text-[20px] md:text-[22px] text-[#43382f] leading-relaxed mb-3">
          You show up. We handle everything else.
        </p>
        <p className="text-[17px] text-[#677283] leading-relaxed">
          Studio-quality audio and video, full editing, sound design, and distribution to all major platforms or your internal teams.
        </p>
      </div>

      {/* ── Phase 3 ── */}
      <div className="ys-phase-block max-w-[1000px] mx-auto w-full px-6 md:px-8 pt-16 pb-10 border-t border-[rgba(43,51,53,0.08)]">
        <div className="ys-phase-number ys-phase-gradient text-[88px] font-light tracking-[-0.04em] leading-none mb-1">3</div>
        <div className="text-[26px] font-bold text-[#2b3335] leading-tight mb-5">Measure and grow.</div>
        <p className="font-serif italic text-[20px] md:text-[22px] text-[#43382f] leading-relaxed mb-3">
          A great series doesn&rsquo;t just perform. It compounds.
        </p>
        <p className="text-[17px] text-[#677283] leading-relaxed">
          Downloads, audience growth, brand sentiment, and inquiry lift for public series. Completion rates and knowledge retention for internal ones.
        </p>
      </div>

      {/* Styles */}
      <style>{`
        .ys-phase-gradient {
          color: #43382f;
        }
        @media (max-width: 767px) {
          .ys-phase-block {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 40px !important;
            padding-bottom: 24px !important;
          }
          .ys-phase-number {
            font-size: 64px !important;
          }
          .ys-format-headline {
            margin-bottom: 16px !important;
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

    </section>
  );
}
