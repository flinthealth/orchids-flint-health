"use client";
import React from 'react';

export default function MeasureAndGrow() {
  return (
    <section style={{ background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)' }} className="relative w-full overflow-hidden">

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gmag'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gmag)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.18, mixBlendMode: 'overlay' }} />

      <style>{`
        .mag-wrap { padding: 48px 24px 56px; }
        @media (min-width: 768px) { .mag-wrap { padding: 64px 48px 72px; } }
        @media (min-width: 1200px) { .mag-wrap { padding: 80px 80px 96px; max-width: 1100px; margin: 0 auto; } }

        .mag-card { background: rgba(249,245,239,0.14); border: 0.5px solid rgba(249,245,239,0.25); border-radius: 12px; overflow: hidden; margin-top: 12px; }
        .mag-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(249,245,239,0.06); }
        .mag-metric { background: rgba(249,245,239,0.18); padding: 14px 12px; }
        @media (min-width: 768px) { .mag-metric { padding: 16px; } }
        .mag-metric-val { font-size: 20px; font-weight: 300; color: #f9f5ef; line-height: 1; margin-bottom: 5px; letter-spacing: -0.02em; }
        @media (min-width: 768px) { .mag-metric-val { font-size: 24px; } }
        .mag-metric-val.orange { color: #ff7f29; }
        .mag-metric-val.gold { color: #eeb20b; }
        .mag-metric-label { font-size: 9px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(249,245,239,0.4); line-height: 1.35; }
        @media (min-width: 768px) { .mag-metric-label { font-size: 10px; } }

        .mag-pills { display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 14px; background: rgba(249,245,239,0.08); border-bottom: 0.5px solid rgba(249,245,239,0.08); }
        @media (min-width: 768px) { .mag-pills { gap: 8px; padding: 14px 18px; } }
        .mag-pill { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; color: #f9f5ef; border: 0.5px solid rgba(249,245,239,0.2); background: rgba(249,245,239,0.08); }
        .mag-pill.gold { background: rgba(238,178,11,0.3); border-color: rgba(238,178,11,0.5); }
        .mag-pill.orange { background: rgba(255,127,41,0.3); border-color: rgba(255,127,41,0.5); }
        .mag-pill.amber { background: rgba(245,160,32,0.3); border-color: rgba(245,160,32,0.5); }
        .mag-pill.blue { background: rgba(84,129,154,0.3); border-color: rgba(84,129,154,0.5); }
        .mag-pill.gray { background: rgba(103,114,131,0.3); border-color: rgba(103,114,131,0.5); }

        .mag-body { padding: 14px 14px; background: rgba(249,245,239,0.04); }
        @media (min-width: 768px) { .mag-body { padding: 16px 18px; } }
        .mag-body-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(249,245,239,0.65); margin-bottom: 10px; }
        .mag-engage-track { height: 8px; background: rgba(249,245,239,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
        .mag-engage-fill { height: 100%; border-radius: 4px; background: linear-gradient(to right, #eeb20b, #ff7f29); width: 85%; }
        .mag-engage-meta { display: flex; justify-content: space-between; font-size: 13px; color: rgba(249,245,239,0.75); }
        .mag-engage-meta strong { color: #f9f5ef; font-weight: 500; }

        .mag-divider { height: 0.5px; background: rgba(249,245,239,0.08); }
        .mag-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(249,245,239,0.06); }
        .mag-col { background: rgba(249,245,239,0.1); padding: 12px 14px; }
        @media (min-width: 768px) { .mag-col { padding: 14px 16px; } }
        .mag-col-label { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: rgba(249,245,239,0.65); margin-bottom: 8px; }
        .mag-col-item { font-size: 11px; color: rgba(249,245,239,0.8); padding: 4px 0; border-bottom: 0.5px solid rgba(249,245,239,0.06); display: flex; justify-content: space-between; }
        @media (min-width: 768px) { .mag-col-item { font-size: 12px; } }
        .mag-col-item:last-child { border-bottom: none; }
        .mag-col-item span { color: #f9f5ef; font-weight: 500; }

        .mag-insight { padding: 10px 14px 14px; font-size: 11px; color: rgba(249,245,239,0.4); line-height: 1.6; background: rgba(249,245,239,0.04); }
        @media (min-width: 768px) { .mag-insight { padding: 10px 18px 14px; } }
        .mag-insight strong { color: rgba(249,245,239,0.7); font-weight: 500; }

        .mag-section-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 0; }
        .mag-section-title { font-size: 18px; font-weight: 400; color: #f9f5ef; letter-spacing: -0.01em; }
        @media (min-width: 768px) { .mag-section-title { font-size: 20px; } }
        .mag-section-divider { font-size: 14px; color: rgba(249,245,239,0.3); }
        .mag-section-sub { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #f9f5ef; }
      `}</style>

      <div className="relative z-10 mag-wrap">

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: 88, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4, color: '#f9f5ef' }}>3</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#f9f5ef', lineHeight: 1.2, marginBottom: 6 }}>Data-Driven Growth.</div>
          <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ede4da', marginBottom: 14 }}>Don&rsquo;t guess if it works. Prove it does.</p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(249,245,239,0.75)', maxWidth: 560 }}>Know which episodes hold attention, which channels convert, and whether it&rsquo;s working. For your audience and your team.</p>
        </div>

        {/* Public Series */}
        <div style={{ marginBottom: '40px' }}>
          <div className="mag-section-head">
            <span className="mag-section-title">Public Series</span>
            <span className="mag-section-divider">—</span>
            <span className="mag-section-sub">Patients &amp; Providers</span>
          </div>
          <div className="mag-card">
            <div className="mag-metrics">
              <div className="mag-metric" style={{ background: 'rgba(238,178,11,0.4)' }}>
                <div className="mag-metric-val">139K+</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Total listens</div>
              </div>
              <div className="mag-metric" style={{ background: 'rgba(255,127,41,0.4)' }}>
                <div className="mag-metric-val">+47%</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Inquiry Lift</div>
              </div>
              <div className="mag-metric" style={{ background: 'rgba(84,129,154,0.4)' }}>
                <div className="mag-metric-val">92</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Total intakes scheduled</div>
              </div>
            </div>

            <div className="mag-pills">
              <span className="mag-pill gold">Episode retention</span>
              <span className="mag-pill orange">Inquiry lift</span>
              <span className="mag-pill amber">Referral attribution</span>
              <span className="mag-pill blue">Intakes scheduled</span>
              <span className="mag-pill gray">Listener acquisition</span>
            </div>

            <div className="mag-body">
              <div className="mag-body-label">Audience engagement — Episode 4</div>
              <div className="mag-engage-track">
                <div className="mag-engage-fill"></div>
              </div>
              <div className="mag-engage-meta">
                <span><strong>85%</strong> of listeners stayed through 45 min</span>
                <span>52 min episode</span>
              </div>
            </div>

            <div className="mag-divider"></div>

            <div className="mag-two-col">
              <div className="mag-col">
                <div className="mag-col-label">Intakes scheduled</div>
                <div className="mag-col-item">Month 1 <span>14</span></div>
                <div className="mag-col-item">Month 2 <span>31</span></div>
                <div className="mag-col-item">Month 3 <span>47</span></div>
              </div>
              <div className="mag-col">
                <div className="mag-col-label">Referral source</div>
                <div className="mag-col-item">Direct listeners <span>62%</span></div>
                <div className="mag-col-item">Partner channel <span>24%</span></div>
                <div className="mag-col-item">Social clips <span>14%</span></div>
              </div>
            </div>

            <div className="mag-divider"></div>
            <div className="mag-insight">
              <strong>Most shared episode:</strong> Ep 6 &nbsp;·&nbsp; <strong>Highest completion:</strong> Ep 3 at 89%
            </div>
          </div>
        </div>

        {/* Internal Series */}
        <div style={{ marginBottom: '40px' }}>
          <div className="mag-section-head">
            <span className="mag-section-title">Internal Series</span>
            <span className="mag-section-divider">—</span>
            <span className="mag-section-sub">Teams &amp; Providers</span>
          </div>
          <div className="mag-card">
            <div className="mag-metrics">
              <div className="mag-metric" style={{ background: 'rgba(84,129,154,0.4)' }}>
                <div className="mag-metric-val">91%</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Activation rate</div>
              </div>
              <div className="mag-metric" style={{ background: 'rgba(255,127,41,0.4)' }}>
                <div className="mag-metric-val">78%</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Pathway completion</div>
              </div>
              <div className="mag-metric" style={{ background: 'rgba(238,178,11,0.4)' }}>
                <div className="mag-metric-val">84%</div>
                <div className="mag-metric-label" style={{ color: '#f9f5ef' }}>Sustained participation</div>
              </div>
            </div>

            <div className="mag-pills" style={{ background: 'rgba(19,29,43,0.35)' }}>
              <span className="mag-pill blue">Activation rates</span>
              <span className="mag-pill orange">Pathway completion</span>
              <span className="mag-pill gold">Knowledge retention</span>
              <span className="mag-pill amber">Enrollment curve</span>
              <span className="mag-pill gray">Sustained participation</span>
            </div>

            <div className="mag-body" style={{ background: 'rgba(19,29,43,0.3)' }}>
              <div className="mag-body-label">Pathway progression by episode</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Episode 1', val: 96, color: '#54819a' },
                  { label: 'Episode 2', val: 91, color: '#54819a' },
                  { label: 'Episode 3', val: 85, color: 'rgba(84,129,154,0.8)' },
                  { label: 'Episode 4', val: 78, color: 'rgba(84,129,154,0.65)' },
                  { label: 'Episode 5', val: 71, color: 'rgba(84,129,154,0.5)' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: 11, color: 'rgba(249,245,239,0.5)', width: 72, flexShrink: 0 }}>{label}</span>
                    <div style={{ flex: 1, height: 5, background: 'rgba(249,245,239,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(249,245,239,0.65)', width: 34, textAlign: 'right' as const }}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mag-divider"></div>

            <div className="mag-two-col" style={{ background: 'rgba(19,29,43,0.35)' }}>
              <div className="mag-col" style={{ background: 'rgba(19,29,43,0.3)' }}>
                <div className="mag-col-label">Knowledge retention</div>
                <div className="mag-col-item">Week 1 check <span>88%</span></div>
                <div className="mag-col-item">Week 4 check <span>82%</span></div>
                <div className="mag-col-item">Week 8 check <span>79%</span></div>
              </div>
              <div className="mag-col" style={{ background: 'rgba(19,29,43,0.3)' }}>
                <div className="mag-col-label">Enrollment curve</div>
                <div className="mag-col-item">Started series <span>147</span></div>
                <div className="mag-col-item">Completed Ep 5 <span>104</span></div>
                <div className="mag-col-item">Still active 30d <span>88</span></div>
              </div>
            </div>

            <div className="mag-divider"></div>
            <div className="mag-insight" style={{ background: 'rgba(19,29,43,0.3)' }}>
              <strong>Drop-off signal:</strong> Episode 4 shows a 7pt dip — content adjustment recommended &nbsp;·&nbsp; <strong>Top performer:</strong> Episode 2 at 94%
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: 17, color: '#ede4da', lineHeight: 1.6, maxWidth: 600 }}>
          Metrics tracked vary by series type, distribution channel, and client goals. Every engagement includes a custom measurement framework built around what success actually looks like for your organization.
        </p>

      </div>
    </section>
  );
}
