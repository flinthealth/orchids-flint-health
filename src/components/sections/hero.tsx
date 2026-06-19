"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;

    const tryPlay = () => video.play().catch(() => {});

    const gestureEvents = ['touchstart', 'touchmove', 'scroll', 'click'] as const;
    const onGesture = () => {
      tryPlay();
      gestureEvents.forEach(e => document.removeEventListener(e, onGesture));
    };
    gestureEvents.forEach(e =>
      document.addEventListener(e, onGesture, { passive: true, once: true })
    );

    video.load();
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('canplay',    tryPlay, { once: true });

    video.addEventListener('error', () => setVideoFailed(true), { once: true });

    return () => {
      gestureEvents.forEach(e => document.removeEventListener(e, onGesture));
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay',    tryPlay);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#2b3335] overflow-hidden">
      <div className="relative min-h-[680px] lg:min-h-[800px] flex flex-col justify-center pt-[74px] md:pt-[74px]">

        {/* Background: video with image fallback */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-cover.webp"
            alt=""
            className="absolute w-full h-full object-cover"
            style={{ top: '74px', bottom: 0, height: 'calc(100% - 74px)' }}
          />
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src="/hero-video.mp4"
              className="absolute w-full h-full object-cover object-top"
              style={{ top: '74px', bottom: 0, height: 'calc(100% - 74px)' }}
              onLoadedData={() => videoRef.current?.play().catch(() => {})}
            />
          )}
        </div>

        {/* Gradient overlay — mobile/tablet */}
        <div className="absolute inset-0 z-10 lg:hidden" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.0) 65%)' }} />
        {/* Gradient overlay — desktop */}
        <div className="absolute inset-0 z-10 hidden lg:block bg-gradient-to-t from-[#2b3335]/85 via-[#2b3335]/25 to-transparent" />

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-[26vh] pb-16 md:py-16 lg:py-24 text-left">
          <div className="max-w-[820px] md:max-w-[540px] lg:max-w-[560px]">
            <div className="h-[22px] md:hidden" />

            <h1
              className="animate-hero-title text-white font-light mb-5 text-[40px] md:text-[51px]"
              style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              <span className="md:hidden">We illuminate your<br />life-changing work<br />so it&rsquo;s seen, <span className="font-serif italic">shared</span><br />and sought out</span>
              <span className="hidden lg:inline">We illuminate your<br />life-changing work so<br />it&rsquo;s seen, sought out<br />and <span className="font-serif italic">shared</span></span>
              <span className="hidden md:block lg:hidden">We illuminate your<br />life-changing work so<br />it&rsquo;s seen, sought out<br />and <span className="font-serif italic">shared</span></span>
            </h1>

            <p className="animate-hero-sub1 text-white/80 text-[17px] md:text-[15px] lg:text-[17px] font-normal mb-4">
              Flint crafts premium branded series for complex care and medical innovations that command attention and anchor deep trust.
            </p>

            <div className="animate-hero-cta mt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] font-semibold text-[16px] px-8 py-4 rounded-[6px] transition-colors duration-200"
              >
                Book a Discovery Call
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
