import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Eye, 
  RotateCcw, 
  Activity, 
  Bot, 
  ArrowRight, 
  Plus, 
  User,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenTrack, user, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoEyeOffset, setLogoEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setLogoEyeOffset({ x, y });
  };

  const handleLogoMouseLeave = () => {
    setLogoEyeOffset({ x: 0, y: 0 });
  };

  // Cohesive, clean navigation links without clashing pills
  const navLinks = [
    { id: 'landing', label: 'About' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'loop', label: 'Action Loop' },
    { id: 'impact', label: 'My Impact' },
    { id: 'ai', label: 'Scout AI' },
  ];

  // Mobile dock strictly matching the 5 clean items
  const mobileDock = [
    { id: 'landing', label: 'About', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'track', label: 'Track', icon: Plus, isAction: true },
    { id: 'loop', label: 'Actions', icon: RotateCcw },
    { id: 'impact', label: 'Impact', icon: Activity },
  ];

  return (
    <>
      {/* DESKTOP / TABLET TOP NAVIGATION — REFINED, HARMONIOUS, STUNNING */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#FAFDF7]/85 backdrop-blur-2xl border-b border-[#E2EBE5]/90 shadow-sm shadow-[#021E18]/5 py-2.5' 
          : 'bg-[#FAFDF7]/95 backdrop-blur-md border-b border-[#E2EBE5] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* BRAND LOGO: ICONIC EYE CROSSHAIR + UNSEEN WORDMARK */}
          <div 
            onClick={() => setActiveTab('landing')}
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 44 44" className="w-full h-full overflow-visible">
                {/* Horizontal neon lime scanline */}
                <line 
                  x1="2" 
                  y1="22" 
                  x2="42" 
                  y2="22" 
                  stroke="#C7FF00" 
                  strokeWidth="3.4" 
                  strokeLinecap="round" 
                  className="transition-all duration-300 group-hover:stroke-[#D6FB00]"
                />
                {/* Arch curve */}
                <path
                  d="M 6 24 C 10 33, 34 33, 38 24"
                  stroke="#021E18"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Pupil with Interactive Gaze Offset */}
                <g 
                  style={{
                    transform: `translate(${logoEyeOffset.x}px, ${logoEyeOffset.y}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <circle cx="22" cy="22" r="6.5" fill="#C7FF00" stroke="#021E18" strokeWidth="2.4" className="shadow-glow-neon" />
                  <circle cx="22" cy="22" r="2.6" fill="#021E18" />
                </g>
              </svg>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#021E18] font-display leading-none group-hover:text-[#00545F] transition-colors">
                UNSEEN
              </span>
              <span className="text-[8px] sm:text-[9px] font-black text-[#00545F] tracking-widest uppercase hidden lg:block opacity-75 mt-0.5">
                Resource Intelligence
              </span>
            </div>
          </div>

          {/* HARMONIOUS DESKTOP LINKS — NO COMPETING CLASHING PILLS */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFFFF] px-2 py-1.5 rounded-full border border-[#E2EBE5] shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-[#021E18] text-[#C7FF00] shadow-sm'
                      : 'text-[#021E18]/65 hover:text-[#021E18] hover:bg-[#F2F7F4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C7FF00] shadow-glow-neon" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* SINGLE HARMONIOUS RIGHT-SIDE CALL TO ACTION */}
          <div className="flex items-center gap-3">
            
            {/* Primary Action Button — Explore UNSEEN with tactile down-press */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="group px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#021E18] text-[#C7FF00] font-black text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-tactile-deep hover:bg-[#052F27] active:translate-y-0.5 transition-all"
            >
              <span>Explore UNSEEN</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Profile Avatar or Minimal Sign In */}
            {user?.isLoggedIn ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ECFFB6] border-2 border-[#021E18] flex items-center justify-center font-black text-[#021E18] text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform shadow-sm"
                title={user.name}
              >
                {user.name.charAt(0)}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden lg:inline-block px-3 py-1.5 text-xs font-bold text-[#021E18]/65 hover:text-[#021E18] transition-colors"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </header>

      {/* MOBILE FLOATING DOCK — CLEAN, BALANCED, ERGONOMIC */}
      <nav className="md:hidden fixed bottom-4 inset-x-4 z-50 pointer-events-none">
        <div className="pointer-events-auto bg-[#FFFFFF]/92 backdrop-blur-2xl border border-[#CADBCF]/80 rounded-[30px] px-2 py-1.5 shadow-2xl shadow-[#021E18]/15 flex items-center justify-around transition-all">
          {mobileDock.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={onOpenTrack}
                  className="flex flex-col items-center justify-center min-w-[54px] min-h-[50px] py-1 rounded-2xl text-[#021E18] active:scale-90 transition-transform"
                  aria-label="Track Loss"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#C7FF00] text-[#021E18] flex items-center justify-center shadow-tactile-lime border border-[#8FB800]">
                    <Icon className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-[10px] font-black text-[#021E18] mt-0.5">{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center min-w-[54px] min-h-[50px] py-1 rounded-2xl active:scale-90 transition-all duration-200 ${
                  isActive ? 'bg-[#021E18]/5' : 'hover:bg-[#021E18]/5'
                }`}
              >
                <div className={`transition-all duration-200 ${
                  isActive ? '-translate-y-0.5 scale-110 text-[#021E18]' : 'text-[#021E18]/55'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                </div>

                <span className={`text-[10px] mt-0.5 transition-all duration-200 ${
                  isActive ? 'font-black text-[#021E18]' : 'font-semibold text-[#021E18]/55'
                }`}>
                  {item.label}
                </span>

                {/* Glowing Lime Indicator Dot under active item */}
                {isActive && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#C7FF00] shadow-glow-neon ring-1 ring-[#8FB800] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
