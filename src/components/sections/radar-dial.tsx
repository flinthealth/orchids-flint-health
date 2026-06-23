"use client";

import React, { useEffect, useRef } from 'react';

const CHANNELS = [
  { angle: -90,  color: '#ff7f29', r: 0.82 },
  { angle: -45,  color: '#eeb20b', r: 0.74 },
  { angle:   0,  color: '#54819a', r: 0.78 },
  { angle:  45,  color: '#54819a', r: 0.68 },
  { angle:  90,  color: '#54819a', r: 0.80 },
  { angle: 135,  color: '#9c522e', r: 0.72 },
  { angle: 180,  color: '#eeb20b', r: 0.76 },
  { angle: -135, color: '#677283', r: 0.70 },
];

const SPEED = 0.35;

function toRad(deg: number) { return deg * Math.PI / 180; }

export default function RadarDial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = W * 0.43;

    let sweepAngle = -90;
    let animId: number;

    function drawBackground() {
      const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R);
      bg.addColorStop(0, '#3d4d58');
      bg.addColorStop(0.5, '#2b3a45');
      bg.addColorStop(1, '#1a2530');
      ctx!.fillStyle = bg;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fill();

      [0.25, 0.5, 0.75, 1.0].forEach(f => {
        ctx!.beginPath();
        ctx!.arc(cx, cy, R * f, 0, Math.PI * 2);
        ctx!.strokeStyle = f === 1 ? 'rgba(255,127,41,0.5)' : 'rgba(84,129,154,0.45)';
        ctx!.lineWidth = f === 1 ? 1.5 : 1;
        ctx!.stroke();
      });

      [-90, -45, 0, 45, 90, 135, 180, -135].forEach(deg => {
        const r = toRad(deg);
        ctx!.strokeStyle = 'rgba(84,129,154,0.2)';
        ctx!.lineWidth = 0.75;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + Math.cos(r) * R, cy + Math.sin(r) * R);
        ctx!.stroke();
      });

      const rim = ctx!.createRadialGradient(cx, cy, R - 8, cx, cy, R + 2);
      rim.addColorStop(0, 'rgba(255,127,41,0.4)');
      rim.addColorStop(1, 'rgba(255,127,41,0)');
      ctx!.fillStyle = rim;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 2, 0, Math.PI * 2);
      ctx!.arc(cx, cy, R - 10, 0, Math.PI * 2, true);
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(255,127,41,0.7)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      for (let i = 0; i < 72; i++) {
        const a = toRad(i * 5);
        const isMajor = i % 9 === 0;
        const inner = isMajor ? R - 12 : R - 6;
        ctx!.beginPath();
        ctx!.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx!.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx!.strokeStyle = isMajor ? 'rgba(238,178,11,0.75)' : 'rgba(61,77,88,0.4)';
        ctx!.lineWidth = isMajor ? 1.5 : 0.75;
        ctx!.stroke();
      }
    }

    function drawSweep() {
      const sweepRad = toRad(sweepAngle);
      const SWEEP_ARC = toRad(65);
      const SLICES = 48;
      for (let i = 0; i < SLICES; i++) {
        const t = i / SLICES;
        const a0 = sweepRad - SWEEP_ARC * (1 - t);
        const a1 = sweepRad - SWEEP_ARC * (1 - (i + 1) / SLICES);
        const alpha = Math.pow(t, 1.5) * 0.5;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.arc(cx, cy, R - 2, a0, a1);
        ctx!.closePath();
        ctx!.fillStyle = `rgba(255,127,41,${alpha})`;
        ctx!.fill();
      }
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(cx + Math.cos(sweepRad) * R, cy + Math.sin(sweepRad) * R);
      ctx!.strokeStyle = 'rgba(255,210,140,0.95)';
      ctx!.lineWidth = 2;
      ctx!.shadowColor = '#ff7f29';
      ctx!.shadowBlur = 14;
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    }

    function drawCenter() {
      const hub = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 30);
      hub.addColorStop(0, 'rgba(255,127,41,0.35)');
      hub.addColorStop(1, 'rgba(255,127,41,0)');
      ctx!.fillStyle = hub;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx!.fillStyle = '#ff7f29';
      ctx!.shadowColor = '#ff7f29';
      ctx!.shadowBlur = 12;
      ctx!.fill();
      ctx!.shadowBlur = 0;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx!.fillStyle = '#fff';
      ctx!.fill();
      }

    function frame() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 2, 0, Math.PI * 2);
      ctx!.clip();
      drawBackground();
      drawSweep();
      drawCenter();
      ctx!.restore();
      sweepAngle = (sweepAngle + SPEED) % 360;
      animId = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='gr'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23gr)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}