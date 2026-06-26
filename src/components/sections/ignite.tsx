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
    mobileLines: [
      'A product or',
      'service that',
      'changes lives',
      "shouldn't go unseen.",
    ],
  },
  {
    text: 'Flint exists so what you\'ve built gets noticed.',
    italicWord: null,
    lines: [
      'Flint exists so what',
      "you've built gets noticed.",
    ],
    mobileLines: [
      'Flint exists so',
      "what you've built",
      'gets noticed.',
    ],
  },
  {
    text: 'We craft your vital data, research, and outcomes into stories that stick and sell.',
    italicWord: 'stories',
    lines: [
      'We craft your vital data,',
      'research, and outcomes into',
      'stories that stick and sell.',
    ],
    mobileLines: [
      'We craft your',
      'brand mission &',
      'impact into stories',
      'that stick and sell.',
    ],
  },
];

const TEXT_STYLE =
  'font-light tracking-[-0.02em] text-center mx-auto px-4 md:px-8 max-w-[860px]';

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
  '#1a2530', // Phase 1 — darkest solid
  '#1a2530', // Phase 2 — starts dark, sunrise animation reveals warm gradient
  'radial-gradient(circle, #eeb20b 0%, #ff7f29 25%, #a0522d 50%, #3d4d58 100%)', // Phase 3 — bloom radial gradient (static)
];

const TEXT_COLORS = ['#ffffff', '#ffffff', '#ffffff'];

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
      <style>{`
        @keyframes p2Sunrise {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes flamePulse {
          0%   { opacity: 0.25; transform: scale(0.85); }
          35%  { opacity: 1.0;  transform: scale(1.15); }
          55%  { opacity: 0.5;  transform: scale(1.02); }
          100% { opacity: 0.25; transform: scale(0.85); }
        }
        `}</style>

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

      {/* Sunrise overlay — fades in warm gradient over dark Phase 2 base */}
      {phaseIdx === 1 && (
        <div
          key="phase2-sunrise"
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #f5a020 0%, #ff7f29 40%, #3d4d58 100%)',
            animation: 'p2Sunrise 3s ease-out forwards',
          }}
        />
      )}

      {/* Phase 3: flame pulse center */}
      {phaseIdx === 2 && (
        <div key="phase3-flame" className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, #eeb20b 0%, #ff7f29 18%, #a0522d 38%, transparent 58%)',
              animation: 'flamePulse 6s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='ig'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23ig)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.14,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 px-6 md:px-6 w-full flex items-center justify-center">
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
          <h1
            className={TEXT_STYLE}
            style={{
              color: TEXT_COLORS[phaseIdx],
              transition: 'opacity 0.5s ease',
              opacity: started ? (visible ? 1 : 0) : 0,
            }}
          >
            {p.lines ? (
            <>
              <span className="hidden md:inline">{renderLines(p.lines, p.italicWord)}</span>
              <span className="md:hidden">{renderLines(p.mobileLines || p.lines, p.italicWord)}</span>
            </>
          ) : renderText(p.text, p.italicWord)}
          </h1>
        </div>
      </div>
    </section>
  );
}