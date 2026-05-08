"use client";

import React, { useState } from "react";

const FAQS = [
  {
    q: "Is this the same thing as a podcast?",
    a: "The word podcast has outgrown what the medium is becoming. And that's a good thing. At its core it's always been something simple and powerful. Authentic conversation about topics people genuinely care about. Today that conversation lives everywhere. Audio on Spotify and Apple, video on YouTube, clips on social, sequences in email. What we produce is a strategic series built with clear learning objectives, a narrative arc, and a specific audience outcome. Every episode is designed to move your audience from awareness to action.",
  },
  {
    q: "How long does it take to launch a series?",
    a: "Most series launch within one quarter, typically 10 to 12 weeks from strategy through first publish. Launch means your series is live and in market. Production of additional episodes can continue well beyond that, building your content library over time.",
  },
  {
    q: "Do we need experienced hosts?",
    a: "No on-camera or on-mic experience is necessary. Host development and coaching is part of our process. We've worked with experts who had never been recorded before and helped them find their natural voice, build confidence, and make the recording feel like a conversation.",
  },
  {
    q: "How do we market or distribute our series?",
    a: "It depends on who you're building for. Public series are distributed across Spotify, Apple Podcasts, and YouTube, with short-form clips and email sequences that bring new listeners into the series and keep current ones engaged across your entire content ecosystem. Internal series are private by design. The platform decision is made together based on your organization's existing infrastructure and needs, whether that's a dedicated internal podcast platform, your intranet, or another solution that fits how your team already works.",
  },
  {
    q: "How do you measure whether the series is working?",
    a: "We track completion rates, downloads, and engagement across every platform using industry-leading analytics tools. For outcomes like referrals, inquiries, and behavior change, we work directly with your team to build attribution tracking that connects series performance to your actual business goals. Success metrics are defined before we produce a single episode so we're measuring what matters to you, not just what's easy to count.",
  },
  {
    q: "What's the investment?",
    a: "Series engagements typically range from $25,000 to $100,000. The primary factor is the level of video production required to bring your series vision to life. Audio-first series sit toward the lower end. Full video production with higher creative execution sits toward the upper end. Every proposal is custom-built around your goals, format, and episode scope.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#f9f5ef] py-[80px] md:py-[100px]">
      <div className="max-w-[760px] mx-auto px-6 md:px-8">

        {/* Headline */}
        <h2 className="text-center text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-5" style={{ color: '#43382f' }}>
          Frequently Asked Questions
        </h2>

        {/* Body */}
        <p className="text-center text-[17px] leading-[1.5] max-w-[560px] mx-auto mb-10" style={{ color: '#43382f' }}>
          Got more questions? Contact us below.
        </p>

        {/* Accordions */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white rounded-[12px] px-6 py-5 cursor-pointer"
                style={{ border: '1px solid rgba(103,114,131,0.15)' }}
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[17px] font-medium leading-snug" style={{ color: '#43382f' }}>
                    {item.q}
                  </p>
                  <span
                    className="flex-shrink-0 text-[24px] font-light leading-none select-none"
                    style={{ color: '#677283' }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <p className="text-[15px] leading-[1.5] mt-4" style={{ color: '#43382f' }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
