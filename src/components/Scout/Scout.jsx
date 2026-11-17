import React, { useState, useEffect } from 'react';

/**
 * SCOUT — Master 3D Original Detective Mascot for UNSEEN
 * Re-architected to match the exact 3D clay/vinyl aesthetic from the design reference:
 * - Ultra-smooth lime-green spherical head with cute top hair tuft
 * - Dark emerald/teal round glasses with 3D depth and nose bridge
 * - Glossy expressive vertical oval eyes with specular highlights
 * - 10 animated states with fluid, soft physics
 */
export default function Scout({
  expression = 'idle',
  animation = '',
  size = 'md',
  message = '',
  interactive = true,
  onClick = null,
  showConcentricRings = false,
  className = ''
}) {
  const [currentExpression, setCurrentExpression] = useState(expression);
  const [isBlinking, setIsBlinking] = useState(false);
  const [bubbleText, setBubbleText] = useState(message);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  useEffect(() => {
    if (message) setBubbleText(message);
  }, [message]);

  // Periodic natural blinking
  useEffect(() => {
    if (currentExpression === 'blink' || currentExpression === 'celebrate') return;
    
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800 + Math.random() * 2500);

    return () => clearInterval(interval);
  }, [currentExpression]);

  // Size map
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56',
    hero: 'w-64 h-64 sm:w-80 sm:h-80',
  };

  const handleClick = (e) => {
    if (!interactive) return;

    const funReactions = [
      { exp: 'happy', msg: 'Every invisible leak matters!' },
      { exp: 'investigate', msg: 'I spy an unexpected power draw...' },
      { exp: 'curious', msg: 'Adjusting my glasses to look closer!' },
      { exp: 'celebrate', msg: 'Verified reduction achieved!' },
      { exp: 'think', msg: 'Calculating optimal resource flow...' },
      { exp: 'wave', msg: 'Hello detective!' }
    ];
    const picked = funReactions[Math.floor(Math.random() * funReactions.length)];
    setCurrentExpression(picked.exp);
    setBubbleText(picked.msg);

    if (onClick) onClick(e);

    setTimeout(() => {
      if (!message) setBubbleText('');
      setCurrentExpression(expression);
    }, 3500);
  };

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const active = currentExpression || 'idle';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      
      {/* Optional Concentric Sonar Radar Rings (from user image reference) */}
      {showConcentricRings && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none scale-150">
          <div className="w-[380px] h-[380px] rounded-full border border-[#C7FF00]/10 bg-[#052A22]/30 animate-pulse-slow" />
          <div className="absolute w-[290px] h-[290px] rounded-full border border-[#C7FF00]/15 bg-[#03382D]/40" />
          <div className="absolute w-[210px] h-[210px] rounded-full border border-[#C7FF00]/25 bg-[#0A473A]/50" />
        </div>
      )}

      {/* Tactile Speech Bubble — Fixed Width & Ergonomics so it never collapses or clips */}
      {(bubbleText || message) && (
        <div className="absolute -top-16 z-30 pointer-events-none animate-bounce-short">
          <div className="relative bg-[#021E18] text-[#ECFFB6] text-xs font-black py-2 px-3.5 rounded-2xl shadow-tactile-deep border border-[#C7FF00]/40 flex items-center gap-2 min-w-[160px] max-w-[240px] text-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#C7FF00] shrink-0 animate-ping" />
            <span className="leading-snug">{bubbleText || message}</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#021E18]" />
          </div>
        </div>
      )}

      {/* SCOUT 3D SVG CONTAINER */}
      <div
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(600px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className={`relative ${sizeMap[size] || sizeMap.md} ${
          interactive ? 'cursor-pointer group' : ''
        }`}
        title="Scout — Your UNSEEN Resource Detective"
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full overflow-visible drop-shadow-xl"
        >
          <defs>
            {/* 3D Sphere Shading — Smooth Studio Lighting matching user's image */}
            <radialGradient id="scout3DHead" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#E2FFA1" />
              <stop offset="25%" stopColor="#C7FF00" />
              <stop offset="55%" stopColor="#8ECA00" />
              <stop offset="85%" stopColor="#4D7F02" />
              <stop offset="100%" stopColor="#2D5400" />
            </radialGradient>

            {/* Top Tuft Gradient */}
            <radialGradient id="tuftGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E2FFA1" />
              <stop offset="60%" stopColor="#A8E200" />
              <stop offset="100%" stopColor="#4D7F02" />
            </radialGradient>

            {/* 3D Round Glasses Frame - Dark Teal Metallic Finish */}
            <linearGradient id="glassesRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B4B54" />
              <stop offset="50%" stopColor="#00333A" />
              <stop offset="100%" stopColor="#00181C" />
            </linearGradient>

            {/* Glasses Highlight Glint */}
            <linearGradient id="glassesGlint" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7EF5FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00333A" stopOpacity="0" />
            </linearGradient>

            {/* Eye Pupil 3D Depth */}
            <radialGradient id="scoutPupil" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#042621" />
              <stop offset="70%" stopColor="#011410" />
              <stop offset="100%" stopColor="#000705" />
            </radialGradient>
          </defs>

          {/* Cast Drop Shadow Underneath */}
          <ellipse
            cx="120"
            cy={active === 'celebrate' ? 224 : 216}
            rx={active === 'celebrate' ? 38 : 58}
            ry={active === 'celebrate' ? 10 : 16}
            fill="#01120E"
            opacity={active === 'celebrate' ? 0.18 : 0.38}
            className="transition-all duration-300"
          />

          {/* MAIN 3D CHARACTER BODY GROUP */}
          <g
            className={`transition-all duration-300 ${
              active === 'idle'
                ? 'animate-float-slow origin-center'
                : active === 'celebrate'
                ? '-translate-y-5 transition-transform'
                : active === 'curious'
                ? 'rotate-[-5deg] origin-center'
                : active === 'think'
                ? 'rotate-[4deg] -translate-y-1 origin-center'
                : active === 'investigate'
                ? 'translate-y-3 origin-center scale-[1.03]'
                : active === 'wave'
                ? 'rotate-[-2deg] origin-center'
                : ''
            }`}
          >
            {/* TINY EMERALD BACKPACK (Behind Body) */}
            <g id="scout-backpack" transform="translate(48, 102)">
              <rect
                x="0"
                y="0"
                width="28"
                height="42"
                rx="10"
                fill="#00332A"
                stroke="#001814"
                strokeWidth="2.5"
              />
              <rect x="10" y="8" width="8" height="6" rx="2" fill="#C7FF00" />
            </g>

            {/* TOP TUFT / HAIR SPROUT */}
            <g id="scout-tuft">
              <path
                d="M 108 48 C 104 32, 114 20, 120 18 C 126 20, 134 32, 132 48 Z"
                fill="url(#tuftGrad)"
                stroke="#3E6900"
                strokeWidth="2"
              />
              <ellipse cx="119" cy="22" rx="4" ry="3" fill="#E2FFA1" opacity="0.8" />
            </g>

            {/* MAIN ULTRA-SMOOTH 3D SPHERE HEAD */}
            <circle
              cx="120"
              cy="124"
              r="76"
              fill="url(#scout3DHead)"
              stroke="#2B5200"
              strokeWidth="2.5"
            />

            {/* Specular Soft Ambient Studio Light on Head */}
            <ellipse
              cx="98"
              cy="82"
              rx="32"
              ry="22"
              fill="#FFFFFF"
              opacity="0.32"
              transform="rotate(-20 98 82)"
            />

            {/* Soft Cheeks Blush */}
            <ellipse cx="76" cy="148" rx="12" ry="7" fill="#FF8A65" opacity="0.35" />
            <ellipse cx="164" cy="148" rx="12" ry="7" fill="#FF8A65" opacity="0.35" />

            {/* EYES BEHIND THE GLASSES */}
            <g id="scout-eyes">
              {/* Left Eye */}
              <g transform="translate(94, 122)">
                {isBlinking || active === 'blink' ? (
                  <path d="M -12 0 Q 0 8, 12 0" stroke="#011814" strokeWidth="4" strokeLinecap="round" fill="none" />
                ) : active === 'happy' || active === 'celebrate' ? (
                  <path d="M -12 2 Q 0 -8, 12 2" stroke="#011814" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                ) : (
                  <>
                    <ellipse
                      cx="0"
                      cy={active === 'investigate' ? 3 : 0}
                      rx="9.5"
                      ry="16"
                      fill="url(#scoutPupil)"
                    />
                    <circle cx="-2" cy={active === 'investigate' ? 0 : -5} r="3.5" fill="#FFFFFF" />
                    <circle cx="3" cy={active === 'investigate' ? 6 : 4} r="1.5" fill="#FFFFFF" opacity="0.8" />
                  </>
                )}
              </g>

              {/* Right Eye */}
              <g transform="translate(146, 122)">
                {isBlinking || active === 'blink' ? (
                  <path d="M -12 0 Q 0 8, 12 0" stroke="#011814" strokeWidth="4" strokeLinecap="round" fill="none" />
                ) : active === 'happy' || active === 'celebrate' ? (
                  <path d="M -12 2 Q 0 -8, 12 2" stroke="#011814" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                ) : (
                  <>
                    <ellipse
                      cx="0"
                      cy={active === 'investigate' ? 3 : 0}
                      rx="9.5"
                      ry="16"
                      fill="url(#scoutPupil)"
                    />
                    <circle cx="-2" cy={active === 'investigate' ? 0 : -5} r="3.5" fill="#FFFFFF" />
                    <circle cx="3" cy={active === 'investigate' ? 6 : 4} r="1.5" fill="#FFFFFF" opacity="0.8" />
                  </>
                )}
              </g>
            </g>

            {/* ROUND DETECTIVE GLASSES */}
            <g
              id="scout-glasses"
              className={`transition-transform duration-200 ${
                active === 'curious' ? 'rotate-[-3deg] origin-center' : ''
              }`}
            >
              <ellipse cx="94" cy="126" rx="27" ry="27" fill="#021E18" opacity="0.25" />
              <ellipse cx="146" cy="126" rx="27" ry="27" fill="#021E18" opacity="0.25" />

              {/* Left Lens Rim */}
              <circle
                cx="94"
                cy="122"
                r="25"
                fill="none"
                stroke="url(#glassesRim)"
                strokeWidth="7"
              />
              <circle
                cx="94"
                cy="122"
                r="28.5"
                fill="none"
                stroke="#00181C"
                strokeWidth="1.2"
              />

              {/* Right Lens Rim */}
              <circle
                cx="146"
                cy="122"
                r="25"
                fill="none"
                stroke="url(#glassesRim)"
                strokeWidth="7"
              />
              <circle
                cx="146"
                cy="122"
                r="28.5"
                fill="none"
                stroke="#00181C"
                strokeWidth="1.2"
              />

              {/* Glasses Bridge */}
              <path
                d="M 119 120 Q 120 114, 121 120"
                stroke="url(#glassesRim)"
                strokeWidth="7.5"
                strokeLinecap="round"
                fill="none"
              />

              <line x1="68" y1="120" x2="56" y2="116" stroke="url(#glassesRim)" strokeWidth="6" strokeLinecap="round" />
              <line x1="172" y1="120" x2="184" y2="116" stroke="url(#glassesRim)" strokeWidth="6" strokeLinecap="round" />

              <path
                d="M 80 102 A 25 25 0 0 1 108 102"
                stroke="url(#glassesGlint)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 132 102 A 25 25 0 0 1 160 102"
                stroke="url(#glassesGlint)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* MOUTH */}
            <g id="scout-mouth" transform="translate(120, 160)">
              {active === 'happy' || active === 'celebrate' ? (
                <path d="M -8 0 Q 0 10, 8 0 Z" fill="#FF2A00" stroke="#011410" strokeWidth="2" />
              ) : active === 'surprise' ? (
                <ellipse cx="0" cy="2" rx="5" ry="7" fill="#011410" />
              ) : active === 'sad' ? (
                <path d="M -6 4 Q 0 -1, 6 4" stroke="#011410" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M -5 0 Q 0 6, 5 0" stroke="#011410" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}
            </g>

            {/* ARMS / GESTURES */}
            {active === 'wave' && (
              <g className="animate-wiggle-quick origin-top-left" transform="translate(182, 130)">
                <path d="M 0 0 C 14 -10, 22 -24, 18 -36" stroke="#8ECA00" strokeWidth="12" strokeLinecap="round" fill="none" />
                <circle cx="18" cy="-36" r="6" fill="#C7FF00" stroke="#3A6400" strokeWidth="2" />
              </g>
            )}

            {active === 'celebrate' && (
              <>
                <g transform="translate(54, 126)">
                  <path d="M 0 0 C -12 -12, -18 -26, -14 -38" stroke="#8ECA00" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="-14" cy="-38" r="5.5" fill="#C7FF00" stroke="#3A6400" strokeWidth="2" />
                </g>
                <g transform="translate(186, 126)">
                  <path d="M 0 0 C 12 -12, 18 -26, 14 -38" stroke="#8ECA00" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="14" cy="-38" r="5.5" fill="#C7FF00" stroke="#3A6400" strokeWidth="2" />
                </g>
                <g transform="translate(120, 16)" className="animate-bounce-short">
                  <polygon points="0,-14 4,-4 14,-4 6,3 9,14 0,7 -9,14 -6,3 -14,-4 -4,-4" fill="#FFC000" />
                </g>
              </>
            )}

            {active === 'investigate' && (
              <g transform="translate(120, 182)">
                <polygon points="-30,0 30,0 80,60 -80,60" fill="#C7FF00" opacity="0.22" className="animate-pulse" />
              </g>
            )}

            {active === 'think' && (
              <g transform="translate(178, 54)" className="animate-pulse">
                <circle cx="0" cy="0" r="11" fill="#FFC000" />
                <rect x="-3" y="11" width="6" height="4" rx="1" fill="#021E18" />
              </g>
            )}

          </g>
        </svg>
      </div>

    </div>
  );
}
