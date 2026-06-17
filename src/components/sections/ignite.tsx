"use client";

import React, { useEffect, useRef, useState } from 'react';

interface PhaseData {
  text: string;
  italicWord: string | null;
}

const PHASES: PhaseData[] = [
  {
    text: 'A product or service that changes lives shouldn\'t go unseen.',
    italicWord: 'unseen',
  },
  {
    text: 'Flint exists so what you\'ve built gets noticed.',
    italicWord: null,
  },
  {
    text: 'We craft your vital data, research, and outcomes into stories that stick and sell.',
    italicWord: 'stories',
  },
];

const TEXT_STYLE =
  'text-[36px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] text-center mx-auto px-8 md:px-16 max-w-[860px]';

function renderText(phase: PhaseData) {
  if (!phase.italicWord) {
    return <>{phase.text}</>;
  }
  const idx = phase.text.indexOf(phase.italicWord);
  if (idx === -1) return <>{phase.text}</>;
  return (
    <>
      {phase.text.slice(0, idx)}
      <span className="font-serif italic">{phase.italicWord}</span>
      {phase.text.slice(idx + phase.italicWord.length)}
    </>
  );
}

const BACKGROUNDS = [
  '#2b3335', // Phase 1 — Gentle Abyss solid
  'linear-gradient(to bottom, #f9f5ef, #eeb20b)', // Phase 2 — Mother Swan → Golden Ray
  'radial-gradient(circle, #f9f5ef, #f2c84d)', // Phase 3 — light center, softer golden outside
];

const TEXT_COLORS = ['#ffffff', '#43382f', '#43382f'];

export default function IgniteSection() {
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = document.getElementById('ignite-section');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    const fallback = setTimeout(() => {
      setStarted(true);
      obs.disconnect();
    }, 3000);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    const showTimer = setTimeout(() => setVisible(true), 200);

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const next = (phaseRef.current + 1) % 3;
        phaseRef.current = next;
        setPhase(next);
        setTimeout(() => setVisible(true), 100);
      }, 700);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(timer);
    };
  }, [started]);

  return (
    <section
      id="ignite-section"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers — crossfade between phases */}
      {BACKGROUNDS.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[800ms]"
          style={{
            background: bg,
            opacity: phase === i ? 1 : 0,
          }}
        />
      ))}

      {/* Text content */}
      <div className="relative z-10 px-6 md:px-12 w-full flex items-center justify-center">
        <div
          className="flex items-center justify-center w-full"
          style={{
            transition:
              'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            opacity: started ? (visible ? 1 : 0) : 0,
            transform: started
              ? visible
                ? 'translateY(0)'
                : 'translateY(16px)'
              : 'translateY(30px)',
          }}
        >
          <p
            className={TEXT_STYLE}
            style={{
              color: TEXT_COLORS[phase],
              transition: 'opacity 0.5s ease',
              opacity: started ? (visible ? 1 : 0) : 0,
            }}
          >
            {renderText(PHASES[phase])}
          </p>
        </div>
      </div>
    </section>
  );
}