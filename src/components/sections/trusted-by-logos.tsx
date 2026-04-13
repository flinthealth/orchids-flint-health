import React from 'react';
import Image from 'next/image';

/**
 * TrustedByLogos Component
 * 
 * Clones the "TRUSTED BY" logo bar featuring partners like Amazon, BuzzFeed, Bumble, and SoFi.
 * Based on the visual analysis, this is a horizontal scrolling/static monochromatic bar 
 * set against a deep green background (#131d2b).
 */

const LOGO_ASSETS = [
  {
    name: 'Amazon',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b90202_87fd0f01d47b2146d42f987c8-6.svg',
    width: 100,
    height: 30
  },
  {
    name: 'White & Case',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b90203_1f5d918b2d606abebe1697afa-5.svg',
    width: 140,
    height: 30
  },
  {
    name: 'Great Place To Work',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b90201_6e32cd11fe121c4cfafacd6df-7.svg',
    width: 40,
    height: 40
  },
  {
    name: 'BuzzFeed',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b90200_74f68f85652b183ca7ed601f3-8.svg',
    width: 110,
    height: 30
  },
  {
    name: 'Bumble',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b901ff_2906491d5b86bc348b3fa7bea-9.svg',
    width: 110,
    height: 30
  },
  {
    name: 'SoFi',
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/062eaa1d-00f7-4546-90e1-11012531fbd3-mavenclinic-com/assets/svgs/69774a4f7e306b0cc7b901fe_84100e75a142811244cb21260-10.svg',
    width: 80,
    height: 30
  }
];

export default function TrustedByLogos() {
  return (
    <section 
      className="w-full bg-[#131d2b] py-8 md:py-12 border-t border-b border-[#131d2b1a]"
      aria-label="Trusted by partners"
    >
      <div className="flex flex-col items-center">
        {/* Label Header */}
        <div className="flex items-center gap-2 mb-8 opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          <span className="text-[10px] md:text-[12px] font-medium tracking-[0.15em] text-white uppercase font-sans">
            Trusted By
          </span>
        </div>

        {/* Logo Scroll/Grid Container */}
        <div className="w-full overflow-hidden">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 md:px-12 flex-wrap gap-y-8 md:gap-y-0">
            {/* The layout in the screenshot shows a continuous line of logos separated by vertical borders */}
            <div className="grid grid-cols-2 md:grid-cols-6 w-full items-center">
              {LOGO_ASSETS.map((logo, index) => (
                <div 
                  key={logo.name} 
                  className={`flex items-center justify-center px-4 h-16 md:h-20 border-[#ffffff1a] transition-opacity duration-300 hover:opacity-100 opacity-80
                    ${index % 2 === 0 ? 'border-r md:border-r' : 'md:border-r'}
                    ${index === LOGO_ASSETS.length - 1 ? 'md:border-r-0' : ''}
                  `}
                >
                  <div className="relative w-full max-w-[120px] h-full flex items-center justify-center">
                    <Image
                      src={logo.url}
                      alt={`${logo.name} logo`}
                      width={logo.width}
                      height={logo.height}
                      className="object-contain filter brightness-0 invert"
                      priority={index < 4}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}