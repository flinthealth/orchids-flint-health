"use client";

import React, { useEffect, useRef, useState } from 'react';

interface PhaseData {
  text: string;
  italicWord: string | null;
  lines?: string[];
  mobileLines?: string[];
}

const PHASES: PhaseData[] = [
  {
    text: 'A product or service that changes lives shouldn\'t go unseen.',
    italicWord: 'unseen',
    lines: [
      'A product or service',
      'that changes lives',
      "shouldn't go unseen.",
    ],
  },
  {
    text: 'Flint exists so what you\'ve built gets noticed.',
    italicWord: null,
  },
  {
    text: 'We craft your vital data, research, and outcomes into stories that stick and sell.',
    italicWord: 'stories',
    lines: [
      'We craft your vital data,',
      'research, and outcomes',
      'into stories that stick and sell.',
    ],
    mobileLines: [
      'We craft your vital',
      'data, research, and',
      'outcomes into stories',
      'that stick and sell.',
    ],
  },
];

const TEXT_STYLE =
  'text-[36px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] text-center mx-auto px-4 md:px-16 max-w-[860px]';

function renderText(text: string, italicWord: string | null) {
  if (!italicWord) return <>{text}</>;
  const idx = text.indexOf(italicWord);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-serif italic">{italicWord}</span>
      {text.slice(idx + italicWord.length)}
    </>
  );
}

function renderLines(lines: string[], italicWord: string | null) {
  return lines.map((line, i) => {
    const elements: React.ReactNode[] = [];
    if (i > 0) elements.push(<br key={`br-${i}`} />);
    if (italicWord && line.includes(italicWord)) {
      const idx = line.indexOf(italicWord);
      elements.push(line.slice(0, idx));
      elements.push(<span key={`it-${i}`} className="font-serif italic">{italicWord}</span>);
      elements.push(line.slice(idx + italicWord.length));
    } else {
      elements.push(line);
    }
    return <React.Fragment key={i}>{elements}</React.Fragment>;
  });
}

const BACKGROUNDS = [
  '#2b3335', // Phase 1 — Gentle Abyss solid
  'linear-gradient(to bottom, #f9f5ef, #eeb20b)', // Phase 2 — Mother Swan → Golden Ray
  'radial-gradient(circle, #f9f5ef, #f2c84d)', // Phase 3 — light center, softer golden outside
];

const TEXT_COLORS = ['#ffffff', '#43382f', '#43382f'];

export default function IgniteSection() {
  const phaseRef = useRef(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
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
        setPhaseIdx(next);
        setTimeout(() => setVisible(true), 100);
      }, 700);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(timer);
    };
  }, [started]);

  const p = PHASES[phaseIdx];

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
            opacity: phaseIdx === i ? 1 : 0,
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
              color: TEXT_COLORS[phaseIdx],
              transition: 'opacity 0.5s ease',
              opacity: started ? (visible ? 1 : 0) : 0,
            }}
          >
            {phaseIdx === 2 ? (
              <>
                <span className="hidden lg:inline">
                  {renderText(p.text, p.italicWord)}
                </span>
                <span className="hidden md:block lg:hidden">
                  {p.lines ? renderLines(p.lines, p.italicWord) : renderText(p.text, p.italicWord)}
                </span>
                <span className="md:hidden">
                  {p.mobileLines ? renderLines(p.mobileLines, p.italicWord) : p.lines ? renderLines(p.lines, p.italicWord) : renderText(p.text, p.italicWord)}
                </span>
              </>
            ) : p.lines ? (
              renderLines(p.lines, p.italicWord)
            ) : (
              renderText(p.text, p.italicWord)
            )}
          </p>
        </div>
      </div>
    </section>
  );
}