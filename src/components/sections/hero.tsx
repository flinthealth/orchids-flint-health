"use client";

import React, { useEffect, useRef, useState } from 'react';

const ROTATING_WORDS = ["brand authority", "patient engagement", "clinical adoption", "team alignment"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;

    const tryPlay = () => video.play().catch(() => {});

    // Register gesture listeners IMMEDIATELY on mount — don't wait for play() to fail.
    // iOS Safari in low-power mode blocks autoplay; the first scroll, touch, or click
    // from the user will then start the video without them having to tap the play button.
    const gestureEvents = ['touchstart', 'touchmove', 'scroll', 'click'] as const;
    const onGesture = () => {
      tryPlay();
      gestureEvents.forEach(e => document.removeEventListener(e, onGesture));
    };
    gestureEvents.forEach(e =>
      document.addEventListener(e, onGesture, { passive: true, once: true })
    );

    // Also try immediately via load events — works when autoplay IS allowed.
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
    <section className="relative w-full bg-[#f9f5ef] overflow-hidden">
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


        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2b3335]/85 via-[#2b3335]/25 to-transparent" />

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 md:px-12 py-16 lg:py-24 text-left">
          <div className="max-w-[820px]">

            <h1
              className="animate-hero-title text-white font-light mb-5 max-w-[560px] text-[46px] md:text-[clamp(36px,5.5vw,68px)]"
              style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Command<br />attention<br />with a series<br />that ignites
              <span className="block overflow-hidden" style={{ height: '1.35em' }}>
                <span
                  className="font-serif italic block text-white"
                  style={{
                    transform: visible ? 'translateY(0)' : 'translateY(-110%)',
                    opacity: visible ? 1 : 0,
                    transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1), opacity 350ms ease',
                    paddingBottom: '0.2em',
                  }}
                >
                  {mounted ? ROTATING_WORDS[wordIndex] : ROTATING_WORDS[0]}
                </span>
              </span>
            </h1>

            <p className="animate-hero-sub1 text-white/80 text-[17px] font-normal mb-4 max-w-[440px]">
              We produce series that reach the patients, providers, and teams that matter most to you.
            </p>


            <div className="animate-hero-cta mt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] font-semibold text-[16px] px-8 py-4 rounded-[6px] transition-colors duration-200"
              >
                Request a Proposal
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
