"use client";

export default function SeriesCost() {
  return (
    <section style={{ background: "#f9f5ef" }} className="w-full pt-12 pb-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-[#2b3335] text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-0 max-w-[520px]">
          How much does it cost not to reach them?
        </h2>
        <p className="max-w-[580px] mb-10 mt-4 text-[17px] text-[#43382f] leading-relaxed">
          Every unreached patient, provider, and team member has a cost.{" "}
          <em className="font-serif italic text-[17px] text-[#43382f]">Lost time. Missed outcomes. Avoidable setbacks.</em>
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {[
            { pill: "Patients",   color: "#eeb20b", labelColor: "#a07800", stat: "9 in 10", descriptor: "Patients struggle with health information.",       cite: "5", citeUrl: "https://www.cdc.gov/health-literacy/php/about/tell-others.html" },
            { pill: "Clinicians", color: "#54819a", labelColor: "#54819a", stat: "75%",     descriptor: "Of clinicians overwhelmed by treatment advances.", cite: "6", citeUrl: "https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly" },
            { pill: "Teams",      color: "#4a5a66", labelColor: "#4a5a66", stat: "$12K+",   descriptor: "Cost of poor communication per employee.",          cite: "7", citeUrl: "https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/" },
          ].map(({ pill, color, labelColor, stat, descriptor, cite, citeUrl }) => (
            <div key={pill} style={{ display: "flex", gap: "14px", alignItems: "flex-start", flex: 1 }}>
              <div style={{ width: 3, borderRadius: 2, background: color, flexShrink: 0, alignSelf: "stretch" }} />
              <div>
                <span
                  className="inline-block text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-2"
                  style={{ background: `${color}22`, color: labelColor, border: `1px solid ${color}55` }}
                >
                  {pill}
                </span>
                <p className="text-[#43382f] text-[40px] font-light leading-none tracking-[-0.02em] mb-1">{stat}</p>
                <p className="text-[#43382f] text-[16px] leading-[1.5]">
                  {descriptor}
                  <a href={citeUrl} target="_blank" rel="noopener noreferrer"
                    className="align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
                    style={{ fontSize: 10 }}>{cite}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
