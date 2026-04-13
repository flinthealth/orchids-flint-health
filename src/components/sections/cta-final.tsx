import React from 'react';

/**
 * CtaFinal Component
 * 
 * Clones the final call-to-action section with the centered headline 
 * "Bring your benefits into the future" against a soft green gradient 
 * background and two buttons 'For businesses' and 'For employees'.
 */
const CtaFinal: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff] py-[120px] md:py-[160px] flex items-center justify-center">
      {/* Decorative Gradient Background Circle */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #fac12c 0%, rgba(242, 240, 230, 0) 70%)',
          zIndex: 0
        }}
      />

      {/* Content Container */}
      <div className="container relative z-10 px-4 mx-auto text-center max-w-[1280px]">
        <div className="max-w-[700px] mx-auto">
          {/* Headline */}
          <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-normal text-[#31393c] tracking-[-0.02em] mb-6">
            Bring your benefits <br />
            into <em className="font-serif italic text-inherit">the future</em>
          </h2>

          {/* Subtext */}
          <p className="text-[18px] md:text-[20px] leading-[1.5] text-[#31393c] font-normal mb-10 max-w-[500px] mx-auto text-balance opacity-90">
            Connect with our team and discover how our women&apos;s and family health benefits can work for you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/for-employers"
              className="inline-flex items-center justify-center bg-[#31393c] hover:bg-[#fac12c] hover:text-[#1a1a1a] text-[#ffffff] px-8 py-4 rounded-[6px] text-[16px] font-semibold transition-all duration-200 min-w-full sm:min-w-[180px]"
            >
              For businesses
            </a>
            <a
              href="/for-employees"
              className="inline-flex items-center justify-center bg-[#31393c] hover:bg-[#fac12c] hover:text-[#1a1a1a] text-[#ffffff] px-8 py-4 rounded-[6px] text-[16px] font-semibold transition-all duration-200 min-w-full sm:min-w-[180px]"
            >
              For employees
            </a>
          </div>
        </div>
      </div>

      {/* Visual Decor - Subtle lines or abstract shapes if visible in screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Abstract subtle circle matching the screenshot's light green blob */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20"
          style={{
            border: '1px solid #fac12c',
            borderRadius: '45% 55% 70% 30% / 30% 60% 40% 70%',
            transform: 'translate(-50%, -50%) rotate(45deg)'
          }}
        />
      </div>
    </section>
  );
};

export default CtaFinal;