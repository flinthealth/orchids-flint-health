"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Stethoscope, BookOpen } from 'lucide-react';

const ROTATING_WORDS = [
  'R&D',
  'Marketing',
  'Sales',
  'Clinical',
];

const stakeholders = [
  {
    name: 'Patient Immersions & Journey Maps',
    icon: MapPin,
    image: '/patient-journey-map-v3.png',
    alt: 'Patient journey map',
    description: [
      "We don't just report on the patient experience, we bring it to life.",
      "We pair clinical white papers with the raw power of the patient's voice. By turning deep-dive interviews into immersive audio, we capture the nuances that help your team feel the journey. We turn abstract pain points into clear opportunities to optimize care and drive better outcomes.",
    ],
  },
  {
    name: 'Health Care Provider Training',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80',
    alt: 'Healthcare provider training',
    description: [
      'Move beyond the manual.',
      "We bridge the gap between \"standard procedure\" and the reality of the clinic by bringing case studies to life. Our narrative audio blends the patient journey with clinical evidence to create training staff actually want to hear and can take on the go. It's the most efficient way to scale your culture and ensure your standards of care stick.",
    ],
  },
  {
    name: 'Patient Education & Engagement',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
    alt: 'Patient education and engagement',
    description: [
      'Create patient education that sticks.',
      "Give your patients a learning experience they'll actually engage with. We weave expert voices with real human stories to create a cohesive journey across audio and video. We don't just communicate science; we bring it to life in an entertaining way that builds trust and inspires action.",
    ],
  },
];

const AudienceSolutions = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [imgVisible, setImgVisible] = useState(true);

  // Rotating word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Cross-fade image when activeItem changes
  const handleItemClick = (i: number) => {
    if (i === activeItem) return;
    setImgVisible(false);
    setTimeout(() => {
      setActiveItem(i);
      setImgVisible(true);
    }, 250);
  };

  return (
    <section className="bg-white py-[120px] md:py-[160px] overflow-hidden">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column */}
          <div className="flex flex-col max-w-[540px]">
            <div className="mb-5">
              <span className="inline-block bg-[#ffffff] text-[#31393c] text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#31393c]">
                Bridge the Gaps
              </span>
            </div>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-black font-normal mb-8 tracking-tight">
              Unite your entire<br />
              <span className="font-serif italic">care ecosystem.</span>
            </h2>

            <p className="text-black text-[18px] md:text-[20px] leading-[1.5] mb-12 max-w-[480px]">
              From R&amp;D to the clinic, we align your teams and engage your patients through stories that humanize science.
            </p>

            {/* Stakeholder Navigation List */}
            <nav className="flex flex-col gap-3 mb-12">
              {stakeholders.map((s, i) => {
                const Icon = s.icon;
                const isActive = activeItem === i;
                return (
                  <div key={s.name} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => handleItemClick(i)}
                      className="group flex items-center justify-between px-6 py-5 text-left w-full transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? '#31393c' : '#f7f3ef',
                        borderRadius: isActive && s.description ? '10px 10px 0 0' : '10px',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-colors duration-300"
                          style={{ backgroundColor: isActive ? 'rgba(253,255,214,0.15)' : 'rgba(19,29,43,0.1)' }}
                        >
                          <Icon size={18} className={isActive ? 'text-[#ffffff]' : 'text-[#31393c]'} />
                        </div>
                        <span
                          className="text-[18px] md:text-[20px] font-medium transition-colors duration-300"
                          style={{ color: isActive ? '#ffffff' : '#31393c' }}
                        >
                          {s.name}
                        </span>
                      </div>
                      <ArrowRight
                        size={22}
                        className="flex-shrink-0 ml-4 transition-all duration-300"
                        style={{
                          color: isActive ? '#fac12c' : '#31393c',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0)' : 'translateX(-12px)',
                        }}
                      />
                    </button>

                    {/* Description box — connected flush to button bottom */}
                    {s.description && (
                      <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '300px' : '0px',
                          opacity: isActive && imgVisible ? 1 : 0,
                        }}
                      >
                        <div
                          className="px-6 py-5 flex flex-col gap-3"
                          style={{
                            backgroundColor: 'white',
                            border: '1.5px solid #31393c',
                            borderTop: 'none',
                            borderRadius: '0 0 10px 10px',
                          }}
                        >
                          {(s.description as string[]).map((para, pi) => (
                            <p
                              key={pi}
                              className="text-[#31393c] text-[14px] leading-[1.65]"
                              style={{ fontStyle: pi === 0 ? 'italic' : 'normal', fontWeight: pi === 0 ? 500 : 400, opacity: pi === 0 ? 1 : 0.72 }}
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

          </div>

          {/* Right Column: Imagery */}
          <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[700px]">
            <div className="relative w-full h-full overflow-hidden rounded-[24px]">
              {/* All three images stacked; only active one is visible */}
              {stakeholders.map((s, i) => (
                <div
                  key={s.image}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: activeItem === i && imgVisible ? 1 : 0 }}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] border-[1px] border-black/5 rounded-full pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-black/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default AudienceSolutions;
