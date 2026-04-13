"use client";

import React from "react";

const MemberStories: React.FC = () => {
  return (
    <section className="bg-[#ffffff] pt-[88px] md:pt-[60px] pb-[120px] px-2 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-[1100px]">

        {/* Content Card — Dr. Erin Knopf only */}
        <div className="relative bg-white rounded-[24px] overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Image */}
            <div className="w-full md:w-[320px] h-auto bg-white flex items-start justify-center overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/testimonial-erin-knopf.jpg"
                alt="Dr. Erin Knopf"
                className="w-full object-contain p-3 md:pt-10 md:px-8 md:pb-0 rounded-[16px]"
              />
            </div>

            {/* Quote */}
            <div className="flex-1 p-5 md:p-12 flex flex-col justify-start">
              <blockquote className="text-[16px] md:text-[18px] leading-[1.6] text-[#31393c] font-sans mb-6">
                &ldquo;Thank you for the refresh in our brand and marketing strategy! You absolutely brought our voice and vision to the next phase and I want to commend your incredible talent at identifying the tone, message, and personality. Thank you for all of your efforts, patience and direction you provided us.&rdquo;
              </blockquote>
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-[#31393c] text-xl">Dr. Erin Knopf</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/testimonial-very-logo.png"
                  alt="VERY Health"
                  className="object-contain object-left"
                  style={{ width: 120, height: 40 }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MemberStories;
