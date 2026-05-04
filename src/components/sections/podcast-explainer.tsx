"use client";

import React, { useRef, useEffect } from 'react';

// ─── iOS-safe autoplay video ──────────────────────────────────────────────────
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
        const onTouch = () => { video.play().catch(() => {}); };
        document.addEventListener('touchstart', onTouch, { once: true });
        document.addEventListener('click',      onTouch, { once: true });
      });
    };

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

        {/* ── Eyebrow + headline ─────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="mb-5">
            <span className="text-[#677283] text-[15px] font-semibold tracking-[0.1em] uppercase">
              Narrative Media
            </span>
          </div>
          <h2 className="text-[#2b3335] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-6 max-w-[720px] mx-auto">
            Series capture attention in a <span className="font-serif italic" style={{ color: '#2b3335' }}>world full of noise</span>
          </h2>
          <p className="text-[#677283] text-[16px] md:text-[17px] leading-[1.5] max-w-[680px] mx-auto mb-6">
            Long-form podcast series in audio and video<br className="md:hidden" /> are the format with the highest trust,<br className="md:hidden" /> deepest engagement, and the stats to prove it.
          </p>
        </div>

        {/* ── Two-column media + stats strip ──────────────────────────────── */}
        <div className="max-w-[1000px] mx-auto">

          {/* Two columns */}
          <div className="flex flex-col md:flex-row gap-3 md:h-[600px]">

            {/* Left — autoplay video with 71% stat at top */}
            <div className="flex-1 relative overflow-hidden" style={{ borderRadius: 12, aspectRatio: '3/4', minHeight: 0 }}>
              <AutoPlayVideo
                src="/stats-idle-time-compressed.mp4"
                poster="/stats-on-the-go.webp"
                className="w-full h-full object-cover"
              />
              {/* Lucky Orange overlay */}
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(255,127,41,0.50)' }} />
              {/* 71% stat — top */}
              <div className="absolute inset-0 flex flex-col justify-start p-7 z-10">
                <p className="text-[#ffffff] text-[72px] font-light leading-none tracking-[-0.03em] mb-1">71%</p>
                <p className="text-[#ffffff] text-[16px] font-medium leading-snug">
                  Of podcast listeners tune in during their daily routine
                  <a href="https://www.cohostpodcasting.com/resources/podcasting-unwrapped-2025" target="_blank" rel="noopener noreferrer" className="text-[11px] align-super ml-0.5 opacity-40 hover:opacity-70 transition-opacity">4</a>
                </p>
              </div>
            </div>

            {/* Right — Jessica photo */}
            <div className="flex-1 overflow-hidden" style={{ borderRadius: 12, aspectRatio: '3/4', minHeight: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jessica-flint-mic.jpg"
                alt="Jessica Flint at the microphone"
                className="w-full h-full object-cover object-top"
              />
            </div>

          </div>

          {/* Stats strip — all Flint with grain */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              {
                n: '6–7×', label: 'GREATER RECALL',
                desc: 'Narratives are recalled six to seven times more than information studied through repetition alone.',
                ref: '1', refUrl: 'https://link.springer.com/article/10.3758/BF03332778',
              },
              {
                n: '80%', label: 'COMPLETION RATE',
                desc: 'Our leading formats ensure your vital messages are heard, absorbed, and completed.',
                ref: '3', refUrl: 'https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/',
              },
              {
                n: '61%', label: 'TRUST LIFT',
                desc: 'Podcasts improve brand perception and confidence by humanizing the science.',
                ref: '3', refUrl: 'https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/',
              },
              {
                n: '3×', label: 'MORE INFLUENCE',
                desc: 'Podcasts carry triple the authority of standard influencer or social-led outreach.',
                ref: '5', refUrl: 'https://cumuluspodcastnetwork.com/cumulus-media-podcast-download-fall-2025/',
              },
            ].map((stat, i) => {
              const bl = i === 0 ? '0px' : i === 2 ? '12px' : '0px';
              const br = i === 1 ? '0px' : i === 3 ? '12px' : '0px';
              return (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-center text-center px-5 py-5 overflow-hidden"
                  style={{ backgroundColor: '#4a5a66', borderRadius: `0 0 ${br} ${bl}` }}
                >
                  {/* Grain overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gs${i}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gs${i})'/%3E%3C/svg%3E")`,
                      backgroundSize: '400px 400px',
                      opacity: 0.28,
                      mixBlendMode: 'overlay',
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[32px] font-medium leading-none mb-1 text-white">{stat.n}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {stat.label}
                      <a href={stat.refUrl} target="_blank" rel="noopener noreferrer" className="align-super ml-0.5 opacity-60 hover:opacity-100 transition-opacity" style={{ fontSize: 8 }}>{stat.ref}</a>
                    </p>
                    <p className="text-[12px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
