"use client";

import { Heart, Stethoscope, Users, Handshake } from 'lucide-react';

const ROWS = [
  {
    Icon: Heart,
    iconColor: "#677283",
    label: "Patients",
    desc: "Give them the science and the stories that move them from confusion to confidence.",
    stat: "9 in 10",
    statDesc: "Patients struggle with health information.",
    cite: "5",
    citeUrl: "https://www.cdc.gov/health-literacy/php/about/tell-others.html",
  },
  {
    Icon: Stethoscope,
    iconColor: "#677283",
    label: "Providers",
    desc: "Meet them in their workflow with content that builds trust and changes practice.",
    stat: "75%",
    statDesc: "Of clinicians overwhelmed by treatment advances.",
    cite: "6",
    citeUrl: "https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly",
  },
  {
    Icon: Users,
    iconColor: "#677283",
    label: "Team",
    desc: "Culture doesn't scale on its own. A series carries your mission to every new hire.",
    stat: "$12K+",
    statDesc: "Cost of poor communication per employee.",
    cite: "7",
    citeUrl: "https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/",
  },
  {
    Icon: Handshake,
    iconColor: "#677283",
    label: "Partners & Referral Networks",
    desc: "Establish authority before the first meeting with content that speaks for itself.",
    stat: null,
    statDesc: null,
    cite: null,
    citeUrl: null,
  },
];

function PillLabel({ label }: { label: string }) {
  return (
    <span
      className="text-[16px] md:text-[18px] font-semibold uppercase tracking-[0.1em]"
      style={{
        background: '#ede7e0',
        color: '#6b4b3e',
        padding: '4px 10px',
        borderRadius: '6px',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      {label}
    </span>
  );
}

export default function SeriesReach() {
  return (
    <section style={{ background: "#f9f5ef" }} className="w-full pt-24 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">

        {/* Headline */}
        <div className="mb-14 max-w-[700px] mx-auto text-center">
          <h2 className="text-[#2b3335] font-light tracking-[-0.02em] mb-6">
            <span className="md:hidden">
              Most content<br />
              gets <span className="font-serif italic" style={{ color: '#2b3335' }}>seconds</span><br />
              A strategic series<br />
              gets <span className="font-serif italic" style={{ color: '#2b3335' }}>hours</span>
            </span>
            <span className="hidden md:inline">
              Most content gets <span className="font-serif italic" style={{ color: '#2b3335' }}>seconds</span><br />
              A strategic series gets <span className="font-serif italic" style={{ color: '#2b3335' }}>hours</span>
            </span>
          </h2>
          <p className="text-[#43382f] max-w-[560px] mx-auto">
            This creates a fundamentally different relationship with your audience where you become part of their daily routine.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Video */}
          <div className="relative w-full md:w-[38%] flex-shrink-0 rounded-2xl overflow-hidden min-h-[320px] md:min-h-[420px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/stats-idle-time-compressed.mp4"
            />
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

          {/* Audience rows — narrower column, label as its own headline, desc below */}
          <div className="flex flex-col w-full md:max-w-[440px]">
            <p className="text-[#2a3742] text-[15px] font-semibold tracking-[0.1em] uppercase mb-2">
              Who do you want to connect with?
            </p>
            {ROWS.map(({ Icon, iconColor, label, desc }, i) => (
              <div
                key={label}
                className="py-6"
                style={{ borderBottom: i < ROWS.length - 1 ? '1px solid rgba(43,51,53,0.1)' : 'none' }}
              >
                <div className="mb-2">
                  <h3 className="leading-snug"><PillLabel label={label} /></h3>
                </div>
                <p className="text-[#43382f] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost question — regular header, not italic */}
        <div className="mt-16 md:mt-20 mb-8 max-w-[700px] mx-auto text-center">
          <h3 className="text-[#2b3335] font-light tracking-[-0.01em] mb-4">
            Being unseen and unheard costs you
          </h3>
          <p className="text-[#43382f] max-w-[560px] mx-auto">
            Missed opportunities and lost time add up.
          </p>
        </div>

        {/* Cost pills — bare hands background, dark text */}
        <div className="flex flex-col md:flex-row gap-5">
          {ROWS.filter((r) => r.stat).map(({ stat, statDesc, cite, citeUrl }) => (
            <div
              key={statDesc}
              style={{
                background: '#ede7e0',
                borderRadius: '20px',
                padding: '28px 32px',
                flex: 1,
                boxShadow: '0 0 16px rgba(245, 160, 32, 0.76), 0 0 0 2px #ff7f29',
                border: '1px solid #2b3335',
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 300, color: '#6b4b3e', lineHeight: 1 }}>{stat}</div>
              <div style={{ fontSize: 14, color: '#43382f', lineHeight: 1.4, marginTop: 8 }}>
                {statDesc}
                <a href={citeUrl!} target="_blank" rel="noopener noreferrer"
                  className="align-super ml-0.5 opacity-70 hover:opacity-100 transition-opacity"
                  style={{ fontSize: 10, color: '#677283' }}>{cite}</a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}