"use client";

import React, { useState, useEffect } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative pt-[88px] md:pt-[100px] pb-[100px] px-6 md:px-16" style={{ background: 'linear-gradient(to right, #3d4d58 0%, #6b4b3e 55%, #a0522d 100%)' }}>
      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gc'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gc)'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px', opacity: 0.28, mixBlendMode: 'overlay' }} />
      <div className="max-w-[960px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <p className="text-[15px] font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: 'rgba(249,245,239,0.55)' }}>Contact</p>
            <h2 className="text-[#ffffff] text-[40px] md:text-[52px] font-light leading-[1.1] tracking-[-0.02em] mb-6">
              Let's produce something worth <span className="font-serif italic">paying attention to.</span>
            </h2>
            <p className="text-[#ffffff]/60 text-[17px] leading-[1.5] mb-8">
              Flint takes on a limited number of new series each quarter. If you're planning a launch in the next 90 days, now is the time to reach out.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Strategy call', detail: 'Walk us through your goals and we\'ll map out a path.' },
                { label: 'Proposal request', detail: 'Tell us your scope and we\'ll send a detailed proposal.' },
                { label: 'General inquiry', detail: 'Questions, partnerships, press — we\'re here.' },
              ].map(({ label, detail }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#54819a] mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#ffffff] text-[16px] font-medium">{label}</p>
                    <p className="text-[#ffffff]/50 text-[14px] leading-[1.5]">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eeb20b] flex items-center justify-center mb-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[#ffffff] text-[22px] font-light">Message received.</p>
                <p className="text-[#ffffff]/55 text-[16px] leading-[1.5] max-w-[280px]">We'll be in touch within one business day.</p>
              </div>
            ) : !mounted ? null : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">
                {[
                  { name: 'name',    label: 'Your name',         type: 'text',  required: true },
                  { name: 'email',   label: 'Work email',        type: 'email', required: true },
                  { name: 'org',     label: 'Organization',      type: 'text',  required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name} className="flex flex-col gap-1.5" suppressHydrationWarning>
                    <label className="text-[#ffffff]/60 text-[12px] font-medium tracking-[0.05em] uppercase" suppressHydrationWarning>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      required={required}
                      autoComplete="off"
                      suppressHydrationWarning
                      className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-[#ffffff] text-[15px] placeholder-white/25 focus:outline-none focus:border-[#eeb20b]/60 transition-colors"
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
                    className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-[#ffffff] text-[15px] placeholder-white/25 focus:outline-none focus:border-[#eeb20b]/60 transition-colors resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-[13px]">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-[#ff7f29] hover:bg-[#e66e1e] disabled:opacity-60 disabled:cursor-not-allowed text-[#ffffff] font-semibold text-[15px] px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      Sending…
                    </>
                  ) : 'Send message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
