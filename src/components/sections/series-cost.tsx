"use client";

export default function SeriesCost() {
  return (
    <section className="relative w-full pt-24 pb-24 px-6 md:px-12 overflow-hidden" style={{
      background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)',
    }}>
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <h2 className="text-white text-[36px] md:text-[46px] lg:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-0 max-w-[760px]">
          <span className="md:hidden">How much does<br />it cost when you<br /><em className="font-serif italic">don&rsquo;t</em> reach them?</span>
          <span className="hidden md:inline">How much does it cost<br />when you <em className="font-serif italic">don&rsquo;t</em> reach them?</span>
        </h2>
        <p className="max-w-[780px] mb-10 mt-4 text-[17px] leading-relaxed" style={{ color: 'rgba(249,245,239,0.72)' }}>
          Every unreached patient, provider, and team member has a cost.<br />
          <span className="text-[16px] font-medium uppercase tracking-[0.08em] leading-[1.8]" style={{ color: '#f9f5ef', display: 'block', marginTop: '4px' }}>Lost time<br />Missed outcomes<br />Avoidable setbacks</span>
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {[
            { pill: "Patients",   color: "#eeb20b", stat: "9 in 10", descriptor: "Patients struggle with health information.",       cite: "5", citeUrl: "https://www.cdc.gov/health-literacy/php/about/tell-others.html" },
            { pill: "Clinicians", color: "#54819a", stat: "75%",     descriptor: "Of clinicians overwhelmed by treatment advances.", cite: "6", citeUrl: "https://www.managedhealthcareexecutive.com/view/survey-reveals-cancer-doctors-struggle-to-keep-up-as-treatments-advance-quickly" },
            { pill: "Teams",      color: "#ff7f29", stat: "$12K+",   descriptor: "Cost of poor communication per employee.",          cite: "7", citeUrl: "https://www.agilitypr.com/pr-news/pr-skills-profession/bad-connection-study-finds-poor-communication-costs-businesses-1-2-trillion-annually/" },
          ].map(({ pill, color, stat, descriptor, cite, citeUrl }) => (
            <div key={pill} style={{ display: "flex", gap: "14px", alignItems: "flex-start", flex: 1 }}>
              <div style={{ width: 3, borderRadius: 2, background: `${color}80`, flexShrink: 0, alignSelf: "stretch" }} />
              <div>
                <span
                  className="inline-block text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-2"
                  style={{ background: `${color}80`, color: '#ffffff', border: `1px solid ${color}bb` }}
                >
                  {pill}
                </span>
                <p className="text-white text-[40px] font-light leading-none tracking-[-0.02em] mb-1">{stat}</p>
                <p className="text-[16px] leading-[1.5]" style={{ color: 'rgba(249,245,239,0.65)' }}>
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
