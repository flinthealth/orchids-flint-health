"use client";

import { Heart, Stethoscope, Users, Handshake } from 'lucide-react';

export default function SeriesReach() {
  return (
    <section style={{ background: "#f9f5ef" }} className="w-full pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
          {/* Video */}
          <div className="relative w-full md:w-[45%] flex-shrink-0 rounded-2xl overflow-hidden min-h-[320px] md:min-h-[420px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/stats-idle-time-compressed.mp4"
            />
            {/* Frosted glass stat card */}
            <div style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              zIndex: 20,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 12,
              padding: '14px 18px',
            }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: '#f9f5ef', lineHeight: 1, marginBottom: 4 }}>92%</div>
              <div style={{ fontSize: 11, color: 'rgba(249,245,239,0.75)', lineHeight: 1.4, maxWidth: 140 }}>
                of podcast listeners tune in during their daily routine.
                <a
                  href="https://www.westwoodone.com/wp-content/uploads/2025/11/Cumulus-Media-and-Signal-Hill-Insights-Podcast-Download-Fall-2025_WWO.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 8, verticalAlign: 'super', marginLeft: 1, opacity: 0.5 }}
                >4</a>
              </div>
            </div>
          </div>

          {/* Who do you need to reach? */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-[#2b3335] text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-8 max-w-[520px]">
              Who do you<br /> need to <em className="font-serif italic">reach</em>?
            </h2>
            <div className="flex flex-col gap-5 max-w-[560px]">
              {[
                { Icon: Heart,      label: "Patients living with your condition.",            desc: "Give them the science and the stories that move them from confusion to confidence." },
                { Icon: Stethoscope, label: "Providers who need to adopt your protocol.",     desc: "Meet them in their workflow with content that builds trust and changes practice." },
                { Icon: Users,      label: "A team that needs to believe in what you're building.", desc: "Culture doesn't scale on its own. A series carries your mission to every new hire." },
                { Icon: Handshake,  label: "Partners and referral networks.",                 desc: "Establish authority before the first meeting with content that speaks for itself." },
              ].map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="text-[#ff7f29] flex-shrink-0 mt-[2px]" size={18} />
                  <div>
                    <span className="font-semibold text-[17px] text-[#2b3335]">{label}</span>{" "}
                    <span className="font-normal text-[17px] text-[#43382f]">{desc}</span>
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
