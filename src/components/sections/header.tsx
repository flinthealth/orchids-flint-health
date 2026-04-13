"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
const Header = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Process',   href: '#process' },
    { label: 'Our Work',  href: '#our-work' },
    { label: 'About',     href: '#about' },
    { label: 'Contact',   href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Banner */}
      {false && isBannerVisible && (
        <div className="bg-[#31393c] text-white py-2 px-10 relative flex justify-center items-center">
          <p className="text-[14px] leading-[1.4] font-normal text-center">
            New: Healthcare Podcast Strategy Guide 2026 |{' '}
            <a href="/resources" className="underline hover:text-[#fac12c] transition-colors">
              Download now
            </a>
          </p>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 md:right-10 text-white opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#31393c]/10 ${
          isScrolled ? 'bg-white py-3 shadow-sm' : 'bg-white py-4'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-12">
          {/* Logo — left */}
          <a href="/" className="block flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/flint-logo-v8.png"
              alt="Flint Logo"
              className="h-[46px] w-auto max-w-[165px] object-contain object-left"
            />
          </a>

          {/* CTA — right */}
          <a
            href="#contact"
            className="bg-[#ff7f29] text-[#ffffff] px-7 py-[13px] rounded-[6px] font-semibold text-[15px] hover:bg-[#e66e1e] transition-all whitespace-nowrap"
          >
            Request a Proposal
          </a>
        </div>
      </nav>

    </header>
  );
};

export default Header;
