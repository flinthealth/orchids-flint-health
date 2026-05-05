export default function StatInterstitial() {
  return (
    <section className="bg-[#4a5a66] w-full py-24 px-6 text-center">
      {/* 80% stat */}
      <p
        className="text-[#f9f5ef] font-light leading-none tracking-[-0.02em] mb-4"
        style={{ fontSize: 'clamp(64px, 10vw, 96px)' }}
      >
        80%
      </p>

      {/* Stat caption */}
      <p className="text-[16px] font-normal leading-[1.5] mb-16" style={{ color: 'rgba(249,245,239,0.60)' }}>
        Of listeners complete each episode.
        <a
          href="https://signalhillinsights.com/measuring-the-success-of-branded-podcasts-choosing-the-right-yardsticks/"
          target="_blank"
          rel="noopener noreferrer"
          className="align-super ml-0.5 opacity-50 hover:opacity-80 transition-opacity"
          style={{ fontSize: 10, color: 'rgba(249,245,239,0.60)' }}
        >3</a>
      </p>

      {/* Two lines */}
      <div className="max-w-none mx-auto">
        <p className="text-[#f9f5ef] text-[20px] md:text-[24px] font-light leading-[1.4]">
          <span className="block whitespace-nowrap">Most content gets seconds.</span>
          <span className="block whitespace-nowrap">A well-produced series gets hours.</span>
        </p>
      </div>
    </section>
  );
}
