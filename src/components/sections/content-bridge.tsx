"use client";

import React from 'react';

export default function ContentBridge() {
  return (
    <section className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)',
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />

      <style>{`
        /* ── MOBILE ── */
        .cb-photo { height: 85vh; }
        .cb-bleed {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 100%;
          background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(0,0,0,0.25) 73%, rgba(0,0,0,0.7) 83%, rgba(0,0,0,1) 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(0,0,0,0.25) 73%, rgba(0,0,0,0.7) 83%, rgba(0,0,0,1) 100%);
          pointer-events: none;
        }
        .cb-text-on-photo {
          display: block;
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 24px 0px;
          text-align: left;
          z-index: 20;
        }
        .cb-text-on-photo h2 { font-size: 36px; }
        .cb-continuation {
          display: block;
          background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
          margin-top: -4px;
          padding: 20px 24px 48px;
          text-align: left;
        }
        .cb-text-below { display: block; }
        .cb-text-desktop { display: none; }
        .cb-vignette-sides { display: none; }
        .cb-vignette-bottom { display: none; }
        .cb-body-on-photo { display: none; }

        /* ── TABLET ── */
        @media (min-width: 768px) {
          .cb-photo { height: 95vh; }

          .cb-bleed {
            position: absolute; bottom: 0; left: 0; right: 0;
            height: 100%;
            background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(0,0,0,0.25) 73%, rgba(0,0,0,0.7) 83%, rgba(0,0,0,1) 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, transparent 65%, rgba(0,0,0,0.25) 73%, rgba(0,0,0,0.7) 83%, rgba(0,0,0,1) 100%);
            pointer-events: none;
          }

          .cb-text-on-photo {
            display: block;
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 0 48px 0px;
            text-align: left;
            z-index: 20;
          }

          .cb-text-on-photo h2 {
            font-size: 52px;
            margin-bottom: 20px;
          }

          .cb-text-on-photo p {
            font-size: 22px;
          }

          .cb-continuation {
            display: block;
            background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
            margin-top: -4px;
            padding: 20px 48px 56px;
            text-align: left;
          }

          .cb-continuation p {
            font-size: 18px;
            max-width: 560px;
          }

          .cb-text-below { display: none; }
          .cb-text-desktop { display: none; }
        }

        /* ── RESTORE MOBILE ── */
        @media (max-width: 767px) {
          .cb-continuation {
            display: block;
            background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
            margin-top: -4px;
            padding: 20px 24px 48px;
            text-align: left;
          }
          .cb-continuation p {
            font-size: 17px;
            color: rgba(249,245,239,0.72);
            line-height: 1.6;
            max-width: none;
            margin: 0;
          }
          .cb-text-on-photo {
            display: block;
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 0 24px 0px;
            text-align: left;
            z-index: 20;
          }
          .cb-text-on-photo h2 { font-size: 36px; }
          .cb-text-on-photo p { font-size: 20px; }
          .cb-vignette-sides { display: none; }
          .cb-vignette-bottom { display: none; }
        }

        /* ── RESTORE TABLET ── */
        @media (min-width: 768px) and (max-width: 1199px) {
          .cb-continuation {
            display: block;
            background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
            margin-top: -4px;
            padding: 20px 48px 56px;
            text-align: left;
          }
          .cb-continuation p {
            font-size: 18px;
            color: rgba(249,245,239,0.72);
            line-height: 1.6;
            max-width: 560px;
            margin: 0;
          }
          .cb-text-on-photo {
            display: block;
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 0 48px 0px;
            text-align: left;
            z-index: 20;
          }
          .cb-text-on-photo h2 { font-size: 52px; }
          .cb-text-on-photo p { font-size: 22px; }
          .cb-vignette-sides { display: none; }
          .cb-vignette-bottom { display: none; }
        }

        /* ── DESKTOP ── */
        @media (min-width: 1200px) {
          .cb-photo-wrapper { display: contents; }

          .cb-photo {
            height: 95vh;
            width: 100%;
            max-width: none;
            margin: 0;
          }

          .cb-bleed {
            position: absolute; inset: 0;
            height: 100%;
            background: none;
            -webkit-mask-image: none;
            mask-image: none;
            pointer-events: none;
          }

          .cb-vignette-sides { display: block; }
          .cb-vignette-bottom { display: block; }

          .cb-vignette-sides {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: -80px;
            background:
              linear-gradient(to right, #3d4d58 0%, rgba(61,77,88,0.9) 22%, rgba(61,77,88,0.5) 38%, transparent 50%,
              transparent 50%, rgba(160,82,45,0.5) 62%, rgba(160,82,45,0.9) 78%, #a0522d 100%);
            pointer-events: none;
            z-index: 2;
          }

          .cb-vignette-bottom {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 65%;
            background: linear-gradient(to bottom,
              transparent 0%,
              transparent 45%,
              rgba(61,77,88,0.15) 55%,
              rgba(61,77,88,0.5) 70%,
              rgba(61,77,88,0.85) 85%,
              #3d4d58 100%
            );
            pointer-events: none;
            z-index: 2;
          }

          .cb-text-on-photo {
            display: block;
            position: absolute;
            bottom: 0; top: auto; left: 0; right: 0;
            padding: 0 80px 80px;
            text-align: left;
            z-index: 20;
          }

          .cb-continuation { display: none !important; }
          .cb-body-on-photo { display: block; }

          .cb-text-on-photo h2 {
            font-size: 52px;
            text-align: left;
            margin: 0 0 12px;
            max-width: 680px;
          }

          .cb-text-on-photo p {
            font-size: 20px;
            text-align: left;
          }

          .cb-continuation {
            display: block;
            position: relative;
            z-index: 30;
            margin-top: 0;
            padding: 32px 80px 56px;
            text-align: left;
            background: linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%);
          }

          .cb-continuation p {
            font-size: 18px;
            max-width: 520px;
            margin: 0;
            color: rgba(249,245,239,0.72);
          }

          .cb-text-desktop { display: none; }
        }

        @media (min-width: 1400px) {
          .cb-photo {
            height: 90vh;
          }
          .cb-photo img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 72%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 12%, black 72%, transparent 100%);
          }
        }
      `}</style>

      {/* Photo block */}
      <div className="cb-photo-wrapper">
      <div className="cb-photo relative w-full" style={{ position: 'relative' }}>
        <picture>
          <source
            media="(min-width: 1400px)"
            srcSet="/Jessica-Flint-Podcasting-Widescreen.jpg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jessica-flint-mic.jpg"
            alt="Jessica Flint at the microphone"
            className="w-full h-full object-cover object-[center_15%] md:object-[center_25%] lg:object-[center_20%]"
            style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </picture>
        {/* Top edge fade */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 'clamp(24px, 5vw, 48px)',
            background: 'linear-gradient(to bottom, rgba(60,50,44,0.55) 0%, transparent 100%)',
          }}
        />
        {/* Gradient bleed over photo */}
        <div className="cb-bleed" />
        {/* Desktop vignettes */}
        <div className="cb-vignette-sides" />
        <div className="cb-vignette-bottom" />

        {/* Headline + (read that again) on the photo */}
        <div className="cb-text-on-photo">
          <h2
            style={{ color: '#f9f5ef', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Most content<br />gets <em>seconds.</em><br />A strategic series<br />gets <em>hours.</em>
          </h2>
          <p style={{ color: 'rgba(249,245,239,0.45)', fontSize: '20px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', letterSpacing: '0.02em' }}>
            (read that again).
          </p>
          <p className="cb-body-on-photo" style={{ color: 'rgba(249,245,239,0.72)', fontSize: '17px', lineHeight: 1.65, marginTop: '16px' }}>
            Deeper engagement creates a fundamentally different relationship with your audience.
          </p>
        </div>
      </div>
      </div>{/* end cb-photo-wrapper */}

      {/* Body copy continuation block — mobile & tablet only */}
      <div className="cb-continuation lg:hidden">
        <p>
          Deeper engagement creates a fundamentally different relationship with your audience.
        </p>
      </div>

      {/* Tablet + Desktop — original centered layout */}
      <div className="cb-text-desktop">
        <div className="cb-text-desktop-inner relative z-20 px-6 text-center">
          <h2
            className="text-[40px] md:text-[44px] lg:text-[52px] font-light leading-[1.2] tracking-[-0.02em] mb-6 mx-auto"
            style={{ color: '#f9f5ef' }}
          >
            <span className="block md:whitespace-nowrap mb-4 md:mb-0">Most content gets <span className="font-serif italic">seconds.</span></span>
            <span className="block md:whitespace-nowrap">A strategic series gets <span className="font-serif italic">hours.</span></span>
          </h2>
          <p
            className="text-[20px] md:text-[22px] font-serif italic mb-8 mx-auto"
            style={{ color: 'rgba(249,245,239,0.45)', letterSpacing: '0.02em' }}
          >
            (read that again).
          </p>
          <p
            className="text-[16px] md:text-[17px] leading-[1.65] max-w-[480px] mx-auto"
            style={{ color: 'rgba(249,245,239,0.65)' }}
          >
            Deeper engagement creates a fundamentally different relationship with your audience.
          </p>
        </div>
      </div>

    </section>
  );
}
