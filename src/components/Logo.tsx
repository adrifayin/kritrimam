import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  variant?: 'lockup' | 'monogram' | 'ghost';
  theme?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'lockup', theme = 'dark', className = '' }: LogoProps) {
  const markColor = theme === 'dark' ? '#A8481F' : '#14110F'; // laterite or ink
  const textColor = theme === 'dark' ? '#F3ECE1' : '#14110F'; // parchment or ink

  const MarkSvg = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill={markColor}
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-full h-full", className)}
    >
      {/* Left Pillar */}
      <rect x="18" y="30" width="10" height="50" />
      {/* Bottom Left Arc */}
      <path d="M 18 80 A 17 17 0 0 0 52 80 H 42 A 7 7 0 0 1 28 80 Z" />

      {/* Right Pillar */}
      <rect x="72" y="20" width="10" height="50" />
      {/* Top Right Arc */}
      <path d="M 82 20 A 17 17 0 0 0 48 20 H 58 A 7 7 0 0 1 72 20 Z" />

      {/* Central Split Circle */}
      {/* Top Half */}
      <path d="M 50 20 A 30 30 0 0 1 78.28 60 H 63 A 15 15 0 0 0 55 35 Z" />
      <path d="M 28 50 A 22 22 0 0 1 50 28 V 50 Z" />
      {/* Bottom Half */}
      <path d="M 50 80 A 30 30 0 0 1 21.72 40 H 37 A 15 15 0 0 0 45 65 Z" />
      <path d="M 72 50 A 22 22 0 0 1 50 72 V 50 Z" />
    </svg>
  );

  const Wordmark = () => (
    <span
      className="font-display font-black tracking-widest text-3xl md:text-4xl uppercase translate-y-[2px] select-none"
      style={{ color: textColor, transform: 'scaleY(1.15)', letterSpacing: '0.05em' }}
    >
      KRITRIMAM
    </span>
  );

  if (variant === 'ghost') {
    return (
      <div className={twMerge("opacity-[0.06] pointer-events-none select-none", className)}>
        <MarkSvg />
      </div>
    );
  }

  if (variant === 'monogram') {
    return (
      <div className={twMerge("inline-flex w-10 h-10", className)}>
        <MarkSvg />
      </div>
    );
  }

  // default: lockup
  return (
    <div className={twMerge("inline-flex items-center gap-5", className)}>
      <div className="w-14 h-14">
        <MarkSvg />
      </div>
      <Wordmark />
    </div>
  );
}
