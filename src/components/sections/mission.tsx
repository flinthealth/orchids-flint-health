"use client";

export default function MissionSection() {
  return (
    <section style={{ background: "#ffffff" }} className="w-full py-24 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[15px] font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: "#677283" }}>
          Our Mission
        </p>
        <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{ color: "#2b3335" }}>
          We make custom series that captivate, educate, and inspire the entire care ecosystem.
        </h2>
        <p className="text-[17px] leading-relaxed max-w-[640px]" style={{ color: "#43382f" }}>
          We exist to connect patients, providers, and healthcare teams to stories and evidence-based science that changes the way they think, act, and feel.
        </p>
      </div>
    </section>
  );
}
