import React, { useState } from 'react';
import Scout from './Scout';
import { 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Droplet,
  Clock,
  Apple
} from 'lucide-react';

export default function ScoutHeroDisplay({
  expression = 'idle',
  onScoutClick = null,
  totalSaved = '$7,568.60',
  itemsVerified = '182',
  className = ''
}) {
  const [activeExp, setActiveExp] = useState(expression);
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
    setActiveExp('investigate');
    setTimeout(() => setActiveCard(null), 2500);
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto flex items-center justify-center py-6 select-none ${className}`}>
      
      {/* 1. CONCENTRIC SONAR RADAR RINGS (From user reference image) */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        {/* Outermost ring */}
        <div className="w-[440px] h-[440px] rounded-full border border-[#C7FF00]/10 bg-[#021E18]/60 animate-pulse-slow" />
        {/* Middle ring */}
        <div className="absolute w-[330px] h-[330px] rounded-full border border-[#C7FF00]/15 bg-[#033027]/70" />
        {/* Inner ring */}
        <div className="absolute w-[230px] h-[230px] rounded-full border border-[#C7FF00]/25 bg-[#064236]/80" />
      </div>

      {/* 2. FLOATING CARD TOP-LEFT: SPARKLINE LOSS OVERHEAD */}
      <div 
        onClick={() => handleCardClick('graph')}
        className="absolute -top-3 -left-2 sm:left-2 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#1A2E2A]/90 backdrop-blur-md border border-[#C7FF00]/25 shadow-2xl hover:scale-105 transition-all cursor-pointer group"
      >
        {/* Glow mini sparkline SVG */}
        <div className="w-24 sm:w-28 h-10 mb-2">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7FF00" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#C7FF00" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path
              d="M 5 28 Q 18 12, 32 24 T 60 14 T 88 8 L 88 38 L 5 38 Z"
              fill="url(#sparkArea)"
            />
            {/* Wavy Line */}
            <path
              d="M 5 28 Q 18 12, 32 24 T 60 14 T 88 8"
              fill="none"
              stroke="#C7FF00"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Glowing endpoint node */}
            <circle cx="88" cy="8" r="3.5" fill="#C7FF00" className="animate-ping" />
            <circle cx="88" cy="8" r="3" fill="#FFFFFF" />
          </svg>
        </div>

        <div className="text-left">
          <div className="text-xs sm:text-sm font-black text-[#FFFFFF] font-display">
            {totalSaved}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#C7FF00] mt-0.5">
            <span>+1.4%</span>
            <span className="text-[#ECFFB6]/60">reclaimed</span>
          </div>
        </div>
      </div>

      {/* 3. FLOATING CARD TOP-RIGHT: VERIFIED CHECK BADGE */}
      <div 
        onClick={() => handleCardClick('check')}
        className="absolute -top-2 -right-2 sm:right-2 z-20 p-3 sm:p-3.5 rounded-2xl bg-[#1A2E2A]/90 backdrop-blur-md border border-[#C7FF00]/25 shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-[#C7FF00] text-[#021E18] flex items-center justify-center font-black shadow-sm shrink-0">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="text-left">
          <div className="w-16 h-1.5 rounded-full bg-[#FFFFFF]/80 mb-1.5" />
          <div className="w-10 h-1.5 rounded-full bg-[#FFFFFF]/40" />
        </div>
        <div className="text-[11px] font-black text-[#C7FF00] pl-1">
          ▲ 2.0%
        </div>
      </div>

      {/* 4. FLOATING CARD BOTTOM-LEFT: RADAR PULSE / TELEMETRY */}
      <div 
        onClick={() => handleCardClick('radar')}
        className="absolute -bottom-3 -left-2 sm:left-4 z-20 p-3 sm:p-3.5 rounded-2xl bg-[#1A2E2A]/90 backdrop-blur-md border border-[#C7FF00]/25 shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-4"
      >
        <div className="text-left space-y-1">
          <div className="w-12 h-1.5 rounded-full bg-[#C7FF00]" />
          <div className="flex gap-1">
            <span className="w-3 h-1.5 rounded-full bg-[#C7FF00]/70" />
            <span className="w-5 h-1.5 rounded-full bg-[#C7FF00]/40" />
          </div>
          <div className="flex gap-1 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00]/40" />
          </div>
        </div>

        {/* Glowing Radar Neon Dot */}
        <div className="relative flex items-center justify-center">
          <span className="absolute w-6 h-6 rounded-full bg-[#C7FF00]/30 animate-ping" />
          <span className="w-4 h-4 rounded-full bg-[#C7FF00] shadow-glow-neon" />
        </div>
      </div>

      {/* 5. FLOATING CARD BOTTOM-RIGHT: TICKET / LEAKS CLOSED */}
      <div 
        onClick={() => handleCardClick('ticket')}
        className="absolute -bottom-4 -right-2 sm:right-4 z-20 p-3 sm:p-3.5 rounded-2xl bg-[#1A2E2A]/90 backdrop-blur-md border border-[#C7FF00]/25 shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-3 text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-[#C7FF00] text-[#021E18] flex items-center justify-center font-black shrink-0">
          <Zap className="w-5 h-5 fill-[#021E18]" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#ECFFB6]/70 leading-none mb-1">
            Leaks Closed
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-[#FFFFFF] font-display">{itemsVerified}</span>
            <span className="text-[10px] font-bold text-[#C7FF00]">▲ +0.5%</span>
          </div>
        </div>
      </div>

      {/* 6. CENTERPIECE: MASTER SCOUT CHARACTER */}
      <div className="relative z-10 p-4">
        <Scout
          expression={activeExp}
          size="hero"
          interactive={true}
          onClick={(e) => {
            setActiveExp(prev => prev === 'celebrate' ? 'curious' : 'celebrate');
            if (onScoutClick) onScoutClick(e);
          }}
          message={
            activeCard === 'graph'
              ? "That's $7,568.60 in hidden waste we found!"
              : activeCard === 'check'
              ? "Verified 2.0% efficiency surge!"
              : activeCard === 'ticket'
              ? "182 waste leaks permanently closed!"
              : activeCard === 'radar'
              ? "Telemetry active: scanning all 5 streams."
              : "Click me or my floating telemetry cards!"
          }
        />
      </div>

    </div>
  );
}
