"use client";

import React, { useState, useRef, useEffect } from 'react';

// ─── iOS-safe autoplay video ──────────────────────────────────────────────────
// iOS Safari ignores the autoPlay attribute and won't buffer without video.load().
// Strategy:
//  1. Call video.load() to force iOS to start buffering.
//  2. Play as soon as readyState ≥ 2 or canplay/loadeddata fires.
//  3. If blocked (low-power mode), retry on first document touchstart — this
//     covers the case where the video sits behind overlay divs and tap events
//     never reach the <video> element itself.
function AutoPlayVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    let played = false;
    const attempt = () => {
      if (played) return;
      played = true;
      video.play().catch(() => {
        played = false;
        // Blocked — retry on first user touch anywhere on the page.
        // This handles videos behind overlay divs that intercept touch events.
        const onTouch = () => {
          video.play().catch(() => {});
        };
        document.addEventListener('touchstart', onTouch, { once: true });
        document.addEventListener('click',      onTouch, { once: true });
      });
    };

    // Force iOS Safari to start buffering; without this readyState stays 0.
    video.load();

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { attempt(); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(video);

    if (video.readyState >= 2) attempt();
    else {
      video.addEventListener('loadeddata', attempt, { once: true });
      video.addEventListener('canplay',    attempt, { once: true });
    }

    return () => {
      obs.disconnect();
      video.removeEventListener('loadeddata', attempt);
      video.removeEventListener('canplay',    attempt);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function PodcastExplainer() {

  return (
    <section id="solutions" className="bg-[#f9f5ef]">
      <div className="container mx-auto px-4 md:px-8 pt-[80px] pb-[24px]">

        {/* ── Pill + headline ────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="text-[#2b3335] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-6 max-w-[720px] mx-auto">
            Most content gets seconds. A strategic series gets <span className="font-serif italic" style={{ color: '#2b3335' }}>hours</span>.
          </h2>
          <p className="text-[#677283] text-[16px] md:text-[17px] leading-[1.5] max-w-[680px] mx-auto mb-6">
            Long-form series in audio and video<br className="md:hidden" /> are the format with the highest trust,<br className="md:hidden" /> deepest engagement, and the stats to prove it.
          </p>
        </div>

        {/* ── Bento stats grid — 4-card 2-column layout ──────────────────────── */}
        <div className="max-w-[1000px] mx-auto mb-12">
          <div
            className="hidden md:grid gap-3"
            style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '40px' }}
          >
            {/* Left — Video card (full height, spans all rows) */}
            <div
              className="rounded-3xl flex flex-col gap-4 overflow-hidden"
              style={{ gridColumn: '1 / 5', gridRow: '1 / 13', position: 'relative', backgroundColor: 'transparent' }}
            >
              <AutoPlayVideo
                src="/stats-idle-time-compressed.mp4"
                poster="/stats-on-the-go.webp"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 127, 41, 0.45)', zIndex: 1 }} />
              <div className="absolute" style={{ zIndex: 2, bottom: 16, left: 16, right: 16 }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 12, padding: '14px 18px', display: 'inline-block' }}>
                  <p className="text-[#ffffff] text-[56px] font-light leading-none tracking-[-0.03em] mb-1">92%</p>
                  <p className="text-[#ffffff] text-[17px] font-medium leading-snug">Of podcast listeners tune in during their daily routine<a href="https://www.westwoodone.com/wp-content/uploads/2025/11/Cumulus-Media-and-Signal-Hill-Insights-Podcast-Download-Fall-2025_WWO.pdf" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">4</a></p>
                </div>
              </div>
            </div>

            {/* Top right — 75% Profit Uplift */}
            <div
              className="rounded-3xl p-7 flex flex-col justify-center relative overflow-hidden"
              style={{ gridColumn: '5 / 9', gridRow: '1 / 7', background: 'linear-gradient(to bottom, #f5a020 0%, #ff7f29 100%)' }}
            >
              <p className="text-[#ffffff] text-[56px] font-light leading-none tracking-[-0.04em] mb-1">75%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Profit Uplift<a href="https://www.radiocentre.org" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">1</a></p>
              <p className="text-[15px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.92)' }}>Audio in the marketing mix delivers 75% profit uplift and 19% customer acquisition gain — across 1,262 campaigns over 17 years.</p>
            </div>

            {/* Bottom right left — 81% Increase in Consumer Trust */}
            <div
              className="rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden"
              style={{ gridColumn: '9 / 13', gridRow: '1 / 7', background: 'linear-gradient(to bottom, #3d4d58 0%, #1a2530 100%)' }}
            >
              <p className="text-[#ffffff] text-[56px] font-light leading-none tracking-[-0.04em] mb-2">81%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Increase in Consumer Trust<a href="https://www.radiocentre.org" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">2</a></p>
              <p className="text-[#ffffff]/65 text-[15px] leading-[1.5]">Listeners consistently rate brands that show up in audio as more credible and trustworthy.</p>
            </div>

            {/* Bottom right right — 6–7× Greater Recall */}
            <div
              className="rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden"
              style={{ gridColumn: '5 / 13', gridRow: '7 / 13', backgroundColor: '#ede8e1' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Who-We-Work-With-Healthcare-Professionals-and-Leaders.webp?v=2"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                style={{ zIndex: 0 }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(43,51,53,0.75) 40%, rgba(43,51,53,0.15) 100%)', borderRadius: 24, zIndex: 1 }} />
              <div className="flex flex-col justify-end" style={{ position: 'relative', zIndex: 2 }}>
                <p className="text-[#ffffff] text-[56px] font-light leading-none tracking-[-0.04em] mb-2">6–7×</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Greater Recall<a href="https://link.springer.com/article/10.3758/BF03332778" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">3</a></p>
                <p className="text-[rgba(255,255,255,0.75)] text-[15px] leading-[1.5]" style={{ maxWidth: '260px' }}>Narratives are recalled six to seven times more than information studied through repetition alone.</p>
              </div>
            </div>
          </div>

          {/* ── Mobile cards ── */}
          <div className="flex md:hidden flex-col gap-3">
            {/* Mobile A — Video */}
            <div className="rounded-3xl overflow-hidden relative flex flex-col min-h-[560px]" style={{ backgroundColor: 'transparent' }}>
              <AutoPlayVideo
                src="/stats-idle-time-compressed.mp4"
                poster="/stats-on-the-go.webp"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 127, 41, 0.45)', zIndex: 1 }} />
              <div className="relative p-7 flex flex-col h-full" style={{ zIndex: 2 }}>
                <p className="text-[#ffffff] text-[64px] font-light leading-none tracking-[-0.03em] mb-1">92%</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-4">Of podcast listeners tune in during their daily routine<a href="https://www.westwoodone.com/wp-content/uploads/2025/11/Cumulus-Media-and-Signal-Hill-Insights-Podcast-Download-Fall-2025_WWO.pdf" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">4</a></p>
                              </div>
            </div>

            {/* Mobile B — 75% Profit Uplift */}
            <div className="rounded-3xl p-7 flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f5a020 0%, #ff7f29 100%)' }}>
              <p className="text-[#ffffff] text-[64px] font-light leading-none tracking-[-0.04em] mb-2">75%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Profit Uplift<a href="https://www.radiocentre.org" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">1</a></p>
              <p className="text-[15px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.92)' }}>Audio in the marketing mix delivers 75% profit uplift and 19% customer acquisition gain — across 1,262 campaigns over 17 years.</p>
            </div>

            {/* Mobile D — 6–7× Greater Recall */}
            <div className="rounded-3xl flex flex-col relative overflow-hidden" style={{ backgroundImage: 'url(/Who-We-Work-With-Healthcare-Professionals-and-Leaders.webp?v=3)', backgroundSize: 'cover', backgroundPosition: '85% 15%', position: 'relative', overflow: 'hidden', minHeight: '320px', height: '400px', backgroundColor: '#6b4b3e' }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(43,51,53,0.75) 40%, rgba(43,51,53,0.15) 100%)', borderRadius: 24, zIndex: 1 }} />
              <div className="p-7 flex flex-col justify-end h-full" style={{ position: 'relative', zIndex: 2 }}>
                <p className="text-[#ffffff] text-[64px] font-light leading-none tracking-[-0.04em] mb-2">6–7×</p>
                <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Greater Recall<a href="https://link.springer.com/article/10.3758/BF03332778" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">3</a></p>
                <p className="text-[rgba(255,255,255,0.75)] text-[15px] leading-[1.5]" style={{ maxWidth: '260px' }}>Narratives are recalled six to seven times more than information studied through repetition alone.</p>
              </div>
            </div>

            {/* Mobile C — 81% Increase in Consumer Trust */}
            <div className="rounded-3xl p-7 flex flex-col min-h-[200px] relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #3d4d58 0%, #1a2530 100%)' }}>
              <p className="text-[#ffffff] text-[64px] font-light leading-none tracking-[-0.04em] mb-2">81%</p>
              <p className="text-[#ffffff] text-[17px] font-medium leading-snug mb-1">Increase in Consumer Trust<a href="https://www.radiocentre.org" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">2</a></p>
              <p className="text-[#ffffff]/65 text-[15px] leading-[1.5]">Listeners consistently rate brands that show up in audio as more credible and trustworthy.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}