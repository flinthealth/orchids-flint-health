"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function PodcastPulse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div ref={sectionRef} className="w-full bg-[#f9f5ef] flex justify-center items-center pt-16 pb-2" style={fade(0.3)}>
      <svg width="72" height="96" viewBox="-4 -4 80 104" fill="none" aria-hidden="true">
        {/* Bar 1 — short (left), Golden Ray */}
        <rect x="0"  y="32" width="18" height="40" rx="9" fill="#eeb20b" stroke="#2b3335" strokeWidth="2" className="bar-wave bar-wave-2"/>
        {/* Bar 2 — tallest (center), Golden Ray */}
        <rect x="26" y="4"  width="18" height="88" rx="9" fill="#eeb20b" stroke="#2b3335" strokeWidth="2" className="bar-wave bar-wave-0"/>
        {/* Bar 3 — medium (right), darker amber */}
        <rect x="52" y="18" width="18" height="58" rx="9" fill="#c17f24" stroke="#2b3335" strokeWidth="2" className="bar-wave bar-wave-1"/>
      </svg>
    </div>
  );
}
