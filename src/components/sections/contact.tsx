"use client";

import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#31393c] pt-[88px] md:pt-[100px] pb-[100px] px-6 md:px-16">
      <div className="max-w-[960px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: '#ffde5f', color: '#1a1a1a' }}>
              Contact
            </span>
            <h2 className="text-[#ffffff] text-[38px] md:text-[48px] font-light leading-[1.1] tracking-[-0.02em] mb-6">
              Let's build<br />
              something worth<br />
              <span className="font-serif italic">paying attention to.</span>
            </h2>
            <p className="text-[#ffffff]/60 text-[17px] leading-[1.7] mb-8">
              Whether you're ready to launch a branded podcast or just exploring what's possible — we'd love to hear from you.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Strategy call', detail: 'Walk us through your goals and we\'ll map out a path.' },
                { label: 'Proposal request', detail: 'Tell us your scope and we\'ll send a detailed proposal.' },
                { label: 'General inquiry', detail: 'Questions, partnerships, press — we\'re here.' },
              ].map(({ label, detail }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fac12c] mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#ffffff] text-[15px] font-medium">{label}</p>
                    <p className="text-[#ffffff]/50 text-[13px] leading-[1.6]">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fac12c] flex items-center justify-center mb-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#31393c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[#ffffff] text-[22px] font-light">Message received.</p>
                <p className="text-[#ffffff]/55 text-[15px] leading-[1.65] max-w-[280px]">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" suppressHydrationWarning>
                {[
                  { name: 'name',    label: 'Your name',         type: 'text',  required: true },
                  { name: 'email',   label: 'Work email',        type: 'email', required: true },
                  { name: 'org',     label: 'Organization',      type: 'text',  required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name} className="flex flex-col gap-1.5" suppressHydrationWarning>
                    <label className="text-[#ffffff]/60 text-[12px] font-medium tracking-[0.05em] uppercase">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      required={required}
                      suppressHydrationWarning
                      className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-[#ffffff] text-[15px] placeholder-white/25 focus:outline-none focus:border-[#fac12c]/60 transition-colors"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#ffffff]/60 text-[12px] font-medium tracking-[0.05em] uppercase">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-[#ffffff] text-[15px] placeholder-white/25 focus:outline-none focus:border-[#fac12c]/60 transition-colors resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-[#ff7f29] hover:bg-[#e66e1e] text-[#ffffff] font-semibold text-[15px] px-8 py-4 rounded-xl transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
