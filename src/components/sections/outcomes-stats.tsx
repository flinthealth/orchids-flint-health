import React from 'react';

const OutcomesStats: React.FC = () => {
  const stats = [
    {
      percentage: 61,
      description: "of listeners said a branded podcast made them more favorable towards the brand",
      gradient: "conic-gradient(#00cc88 61%, #e0ded4 0deg)",
      color: "#00cc88",
    },
    {
      percentage: 63,
      description: "said they would recommend a branded podcast after hearing an episode",
      gradient: "conic-gradient(#88b0ff 63%, #e0ded4 0deg)",
      color: "#88b0ff",
    },
    {
      percentage: 74,
      description: "of podcast listeners tune in to learn something new or stay informed in their industry",
      gradient: "conic-gradient(#4FB3E8 74%, #e0ded4 0deg)",
      color: "#4FB3E8",
    },
  ];

  return (
    <section className="bg-[#F4F5F4] py-[120px] md:py-[160px] relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 max-w-[1280px] relative z-10">
        {/* Section Header */}
        <div className="text-center mb-[80px] max-w-[800px] mx-auto">
          <h2 className="text-[#131d2b] text-[40px] md:text-[56px] leading-[1.1] font-normal mb-8 tracking-[-0.02em]">
            Lowering costs by <br className="md:hidden" />
            <span className="italic-emphasis">improving care</span>
          </h2>
          <p className="text-[#131d2b] text-[18px] md:text-[20px] leading-[1.5] max-w-[600px] mx-auto font-normal opacity-90">
            By guiding members through more intuitive paths to health, we help reduce costly interventions and improve outcomes.
          </p>
        </div>

        {/* Stats Grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Circular Progress Meter */}
              <div className="relative w-[200px] h-[200px] mb-8 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-[10px] border-[#e0ded4]"
                  style={{ maskImage: "radial-gradient(transparent 65%, black 65.5%)", WebkitMaskImage: "radial-gradient(transparent 65%, black 65.5%)" }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: stat.gradient,
                    maskImage: "radial-gradient(transparent 65%, black 65.5%)",
                    WebkitMaskImage: "radial-gradient(transparent 65%, black 65.5%)",
                    transform: "rotate(-90deg)",
                  }}
                />
                <div className="text-[48px] font-normal text-[#131d2b] tracking-tight">
                  {stat.percentage}%
                </div>
              </div>

              {/* Description */}
              <div className="px-4">
                <p className="text-[#131d2b] text-[16px] leading-[1.6] font-normal">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesStats;
