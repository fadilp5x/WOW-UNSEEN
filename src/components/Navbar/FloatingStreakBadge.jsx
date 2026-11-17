import React, { useState } from 'react';
import Scout from '../Scout/Scout';
import { 
  Flame, 
  Sparkles, 
  X, 
  Check, 
  Award, 
  Calendar,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function FloatingStreakBadge({ user, onOpenTrack }) {
  const [isOpen, setIsOpen] = useState(false);
  const streakDays = user?.streakDays || 4;

  const daysOfWeek = [
    { day: 'M', full: 'Mon', checked: true },
    { day: 'T', full: 'Tue', checked: true },
    { day: 'W', full: 'Wed', checked: true },
    { day: 'T', full: 'Thu', checked: true },
    { day: 'F', full: 'Fri', isToday: true, checked: true },
    { day: 'S', full: 'Sat', checked: false },
    { day: 'S', full: 'Sun', checked: false },
  ];

  return (
    <>
      {/* FLOATING DETACHED STREAK PILL — Visible on desktop/tablet so mobile remains completely unobstructed */}
      <div className="hidden sm:flex fixed top-24 right-6 z-40 animate-float-slow select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-xl border-2 border-[#FFC000]/60 text-[#021E18] shadow-xl shadow-[#FFC000]/15 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          title="Click to view Streak & Daily Rewards"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FFC000]/30 to-[#FF2A00]/30 blur-sm -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />

          {/* Flame Icon with Pulsing Beacon */}
          <div className="relative flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#FF2A00] fill-[#FF2A00] animate-bounce-short" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C7FF00] animate-ping" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className="font-black text-sm font-display tracking-tight text-[#021E18]">
              {streakDays}
            </span>
            <span className="text-[10px] font-black uppercase text-[#B38600] tracking-wider">
              Day Streak
            </span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF00] shadow-glow-neon" />
        </button>
      </div>

      {/* INTERACTIVE STREAK MODAL / POPOVER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#021E18]/65 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-[#FFFFFF] rounded-3xl border-3 border-[#E2EBE5] shadow-2xl p-6 text-center animate-page-enter">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#021E18]/40 hover:text-[#021E18] hover:bg-[#F2F7F4] rounded-xl transition-colors"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Scout with Celebration Flame */}
            <div className="relative flex flex-col items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FFF8E6] to-[#FFEAE5] border-2 border-[#FFC000] flex items-center justify-center shadow-tactile-card mb-2">
                <Flame className="w-9 h-9 text-[#FF2A00] fill-[#FF2A00] animate-bounce-short" />
              </div>
              <Scout
                expression="celebrate"
                size="sm"
                interactive={false}
              />
            </div>

            <h3 className="text-2xl font-black text-[#021E18] font-display mb-1">
              {streakDays} Day Streak!
            </h3>
            <p className="text-xs text-[#021E18]/70 max-w-xs mx-auto mb-6">
              You are keeping resource leaks in sight every single day. Scout is impressed!
            </p>

            {/* 7-DAY CALENDAR TRACKER */}
            <div className="grid grid-cols-7 gap-1.5 p-3 rounded-2xl bg-[#F8FAF8] border border-[#E2EBE5] mb-6">
              {daysOfWeek.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#021E18]/60">{d.day}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    d.checked
                      ? 'bg-[#C7FF00] text-[#021E18] border border-[#8FB800] shadow-sm'
                      : 'bg-[#E8EFEA] text-[#021E18]/40'
                  } ${d.isToday ? 'ring-2 ring-[#021E18]' : ''}`}>
                    {d.checked ? '✓' : '•'}
                  </div>
                </div>
              ))}
            </div>

            {/* Next Milestone Reward */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8E6] border border-[#FFC000]/40 flex items-center gap-3 text-left mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FFC000] text-[#021E18] flex items-center justify-center font-black shrink-0">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-[#B38600]">
                  Next Milestone: Day 5
                </div>
                <div className="text-xs font-extrabold text-[#021E18]">
                  Unlocks "Master Sleuth" Badge
                </div>
              </div>
            </div>

            {/* Action to log today */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenTrack) onOpenTrack();
              }}
              className="w-full py-3.5 text-xs font-black tracking-wide btn-tactile-lime flex items-center justify-center gap-2 shadow-tactile-lime"
            >
              <Zap className="w-4 h-4 fill-[#021E18]" />
              <span>LOG TODAY'S LEAK TO EXTEND STREAK</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
}
