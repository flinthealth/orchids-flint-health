const ITEMS = [
  {
    title: 'Custom Podcast Series',
    desc: "Full-length original series in audio + video built around your brand's unique story, values, and audience.",
  },
  {
    title: 'Branded Episodes',
    desc: 'Standalone episodes integrated seamlessly within an existing audience-aligned podcast to deliver your message authentically.',
  },
  {
    title: 'Extended Midrolls',
    desc: 'Host-read or produced storytelling segments that go beyond a standard ad to engage listeners.',
  },
  {
    title: 'Branded Segments',
    desc: 'Recurring creative features that live within an audience-aligned podcast, giving your brand an ongoing narrative presence.',
  },
  {
    title: 'Social Extensions',
    desc: 'Shareable content that amplifies your podcast series across social platforms.',
  },
  {
    title: 'Series Consulting',
    desc: 'Strategic guidance on format, positioning, and narrative direction for brands exploring audio and video.',
  },
];

export default function WhatWeCreate() {
  return (
    <section className="w-full py-24" style={{ backgroundColor: '#2a3742' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[40px] md:text-[52px] font-light text-white leading-[1.1] tracking-[-0.02em] mb-4">
            What we <span className="font-serif italic">create</span>
          </h2>
          <p className="text-[17px] text-white/70">
            We collaborate with healthcare brand partners to build:
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-14">
          {ITEMS.map((item, i) => (
            <div key={item.title} className={`${i >= 3 ? 'border-t border-white/20 pt-8' : 'pt-0 md:pt-0'}`}>
              <h3 className="text-[17px] font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-white/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}