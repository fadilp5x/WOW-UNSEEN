import React, { useState } from 'react';
import ScoutHeroDisplay from '../components/Scout/ScoutHeroDisplay';
import Scout from '../components/Scout/Scout';
import { 
  Clock, 
  Apple, 
  Zap, 
  Droplet, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  Layers, 
  CheckCircle2, 
  Play
} from 'lucide-react';

export default function LandingPage({ onStartJourney, onExplore, onOpenTrack }) {
  const [heroScoutExp, setHeroScoutExp] = useState('curious');
  const [activeCategory, setActiveCategory] = useState(0);

  // Interactive Live Calculator demo for the 5 categories
  const [calcValues, setCalcValues] = useState({
    timeMinutes: 45,
    foodKg: 3.5,
    elecWatts: 600,
    waterDrips: 25,
    waitPeople: 8,
  });

  const categories = [
    {
      id: 'time',
      name: 'Time Loss',
      icon: Clock,
      color: '#00545F',
      bgLight: '#E6F4F6',
      badge: 'Productivity',
      description: 'Invisible meeting spillover, repetitive administrative friction, and scattered focus time.',
      stat: 'Avg. 3.2 hrs/week lost per person',
      calc: () => {
        const cost = (calcValues.timeMinutes * 5 * 0.45).toFixed(1);
        return {
          waste: `${(calcValues.timeMinutes * 5) / 60} hrs/week`,
          impact: `$${cost} lost productivity`
        };
      }
    },
    {
      id: 'food',
      name: 'Food Waste',
      icon: Apple,
      color: '#FF2A00',
      bgLight: '#FFEAE5',
      badge: 'Food & Nutrition',
      description: 'Surplus catering over-prep, expired cafeteria inventory, and uncollected portions.',
      stat: '33% of prepared food never gets eaten',
      calc: () => {
        const cost = (calcValues.foodKg * 4 * 8.5).toFixed(1);
        const co2 = (calcValues.foodKg * 4 * 2.5).toFixed(1);
        return {
          waste: `${(calcValues.foodKg * 4).toFixed(1)} kg/month`,
          impact: `$${cost} · ${co2}kg CO₂e`
        };
      }
    },
    {
      id: 'electricity',
      name: 'Electricity Waste',
      icon: Zap,
      color: '#FFC000',
      bgLight: '#FFF8E6',
      badge: 'Energy',
      description: 'Vampire draw from overnight displays, HVAC in empty wings, and unmanaged servers.',
      stat: '15-20% of commercial power is idle draw',
      calc: () => {
        const kwh = ((calcValues.elecWatts * 14 * 30) / 1000).toFixed(1);
        const cost = (kwh * 0.16).toFixed(1);
        return {
          waste: `${kwh} kWh/month`,
          impact: `$${cost} unnecessary bill`
        };
      }
    },
    {
      id: 'water',
      name: 'Water Waste',
      icon: Droplet,
      color: '#00545F',
      bgLight: '#E5F3F5',
      badge: 'Conservation',
      description: 'Silent toilet flush leaks, cafeteria sink drips, and miscalibrated irrigation timers.',
      stat: 'A single leaky faucet wastes 3,000 gal/yr',
      calc: () => {
        const liters = (calcValues.waterDrips * 60).toFixed(0);
        return {
          waste: `${liters} Liters/month`,
          impact: `≈ ${(liters / 150).toFixed(1)} full bathtubs`
        };
      }
    },
    {
      id: 'waiting',
      name: 'Waiting Time',
      icon: Users,
      color: '#021E18',
      bgLight: '#E8EFEA',
      badge: 'Human Experience',
      description: 'Queues at service desks, slow document review gates, and customer bottleneck delays.',
      stat: 'Queue delays diminish satisfaction by 40%',
      calc: () => {
        const total = (calcValues.waitPeople * 15 * 20) / 60;
        return {
          waste: `${total.toFixed(0)} person-hours/mo`,
          impact: `${calcValues.waitPeople * 20} delayed interactions`
        };
      }
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'DETECT',
      subtitle: 'Spot hidden leaks',
      desc: 'Scout scans daily routines, utility bills, and logs to flag invisible resource drains before they accumulate.',
      icon: '🔍',
    },
    {
      step: '02',
      title: 'MEASURE',
      subtitle: 'Quantify true impact',
      desc: 'Convert elusive waste into concrete financial metrics, carbon equivalents, and lost hours.',
      icon: '📏',
    },
    {
      step: '03',
      title: 'UNDERSTAND',
      subtitle: 'Conversational insights',
      desc: 'Ask Scout anything. Get plain-English explanations instead of complicated statistical jargon.',
      icon: '💡',
    },
    {
      step: '04',
      title: 'REDUCE',
      subtitle: 'Close the loop',
      desc: 'Assign immediate micro-actions with clear owners and automated reminders.',
      icon: '⚡',
    },
    {
      step: '05',
      title: 'VERIFY',
      subtitle: 'Celebrate progress',
      desc: 'Compare before-and-after results and see your collective savings multiply every week.',
      icon: '🎉',
    },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern text-[#021E18] overflow-hidden">
      
      {/* HERO SECTION — EXACT REPLICA OF USER REFERENCE MOCKUP */}
      <section className="relative pt-4 pb-16 sm:pt-10 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Headline & Actions matching user's image */}
          <div className="lg:col-span-6 text-left max-w-lg mx-auto lg:mx-0">
            
            {/* BADGE: ● RESOURCE INTELLIGENCE PLATFORM */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#021E18] text-[#C7FF00] text-xs font-black mb-5 tracking-wide shadow-tactile-deep">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF00] shadow-glow-neon animate-pulse" />
              <span>RESOURCE INTELLIGENCE PLATFORM</span>
            </div>

            {/* HEADLINE WITH INVISIBLE 3D BADGE */}
            <h1 className="text-[42px] sm:text-6xl lg:text-7xl font-black tracking-tight text-[#021E18] font-display leading-[1.08] mb-5">
              Make the <br />
              <span className="relative inline-block my-1.5">
                <span className="bg-[#021E18] text-[#C7FF00] px-4 py-1.5 rounded-2xl border-2 border-[#C7FF00] shadow-tactile-deep inline-block transform -rotate-1">
                  INVISIBLE
                </span>
              </span> <br />
              VISIBLE.
            </h1>

            {/* EXACT SUPPORTING COPY FROM MOCKUP */}
            <p className="text-sm sm:text-lg text-[#021E18]/80 font-medium max-w-md mb-7 leading-relaxed">
              Time wasted. Effort unnoticed. Privacy exposed. Discover the hidden losses happening around you — and turn awareness into action.
            </p>

            {/* EXACT BUTTONS: Explore Our Tools → AND Start Your Journey */}
            <div className="flex flex-col gap-3 sm:gap-4 max-w-md">
              <button
                onClick={() => {
                  const el = document.getElementById('tools-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 text-base font-black tracking-wide btn-tactile-lime flex items-center justify-center gap-2.5 shadow-tactile-lime"
              >
                <span>Explore Our Tools</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <button
                onClick={onStartJourney}
                className="w-full py-4 text-base font-extrabold btn-tactile-outline flex items-center justify-center gap-2"
              >
                <span>Start Your Journey</span>
              </button>
            </div>

            {/* Quick Proof Pills */}
            <div className="mt-8 pt-5 border-t border-[#E2EBE5] flex flex-wrap items-center gap-4 text-xs font-bold text-[#021E18]/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00545F]" />
                <span>Zero complex setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00545F]" />
                <span>3D Scout companion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00545F]" />
                <span>Verified 5-step loop</span>
              </div>
            </div>

          </div>

          {/* Right: 3D SCOUT MASCOT WITH RADAR CONCENTRIC RINGS AND TELEMETRY CARDS */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center mt-6 lg:mt-0">
            <div className="w-full">
              {/* State badges to test Scout's expressions */}
              <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap">
                {['curious', 'investigate', 'happy', 'wave', 'celebrate'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setHeroScoutExp(st)}
                    className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition-all ${
                      heroScoutExp === st
                        ? 'bg-[#021E18] text-[#C7FF00] font-black shadow-tactile-deep'
                        : 'bg-[#FFFFFF] text-[#021E18]/70 hover:text-[#021E18] border border-[#E2EBE5]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Master Telemetry Display */}
              <ScoutHeroDisplay
                expression={heroScoutExp}
                totalSaved="$7,568.60"
                itemsVerified="182"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE 5 RESOURCE TOOLS & DETECTORS */}
      <section id="tools-section" className="py-20 bg-[#FFFFFF] border-y border-[#E2EBE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#ECFFB6] text-[#021E18] border border-[#C7FF00]">
              5 Core Resource Drains
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#021E18] font-display mt-4 mb-4">
              Where Are Your Resources Slipping Away?
            </h2>
            <p className="text-base sm:text-lg text-[#021E18]/70">
              Most losses occur in small, continuous increments that slip beneath standard balance sheets.
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === idx;
              const calcResult = cat.calc();

              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border-2 text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#021E18] text-[#FFFFFF] border-[#021E18] shadow-tactile-deep scale-[1.02]'
                      : 'bg-[#F8FAF8] text-[#021E18] border-[#E2EBE5] hover:border-[#CADBCF] shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: isSelected ? '#C7FF00' : cat.bgLight }}
                      >
                        <Icon 
                          className="w-6 h-6 stroke-[2.5]" 
                          style={{ color: isSelected ? '#021E18' : cat.color }} 
                        />
                      </div>
                      <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-[#FFFFFF]/20 text-[#C7FF00]' : 'bg-[#FFFFFF] text-[#021E18] border border-[#E2EBE5]'
                      }`}>
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg mb-1">{cat.name}</h3>
                    <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-[#ECFFB6]/80' : 'text-[#021E18]/70'}`}>
                      {cat.description}
                    </p>
                  </div>

                  <div className={`pt-3 border-t ${isSelected ? 'border-[#FFFFFF]/20' : 'border-[#E2EBE5]'}`}>
                    <div className="text-[11px] font-bold opacity-75">Impact Estimate:</div>
                    <div className={`font-black text-sm ${isSelected ? 'text-[#C7FF00]' : 'text-[#00545F]'}`}>
                      {calcResult.impact}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Track Loss Action */}
          <div className="mt-12 text-center">
            <button
              onClick={onOpenTrack}
              className="px-8 py-3.5 text-base font-black btn-tactile-lime inline-flex items-center gap-2.5 shadow-tactile-lime"
            >
              <span>TRACK A LOSS NOW</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: THE 5-STEP WORKFLOW LOOP */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#00545F] text-[#ECFFB6]">
            The UNSEEN Loop
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#021E18] font-display mt-4 mb-4">
            Five Steps to Zero Waste
          </h2>
          <p className="text-base sm:text-lg text-[#021E18]/70">
            A friendly, iterative cycle engineered to turn invisible drain into verified savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((ws, i) => (
            <div 
              key={ws.step}
              className="relative p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card flex flex-col justify-between hover:border-[#CADBCF] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-[#021E18]/20 font-display">{ws.step}</span>
                  <span className="text-2xl">{ws.icon}</span>
                </div>
                <h3 className="text-xl font-black text-[#021E18] tracking-tight mb-1">{ws.title}</h3>
                <h4 className="text-xs font-bold text-[#00545F] mb-3">{ws.subtitle}</h4>
                <p className="text-xs text-[#021E18]/70 leading-relaxed">{ws.desc}</p>
              </div>

              {i < 4 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#C7FF00] border border-[#8FB800] text-[#021E18] text-xs font-black flex items-center justify-center">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: COMMUNITY IMPACT TICKER */}
      <section className="py-20 bg-[#021E18] text-[#FFFFFF] relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#C7FF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="lg:max-w-lg text-center lg:text-left">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md bg-[#C7FF00] text-[#021E18]">
                Real Collective Impact
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight mt-4 mb-4 text-[#FFFFFF]">
                Small Habits. <br />
                <span className="text-[#C7FF00]">Colossal Change.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#ECFFB6]/80 leading-relaxed mb-6">
                When communities track unnoticed losses together, small daily adjustments stop thousands of dollars and metric tons of waste from vanishing into thin air.
              </p>
              <button
                onClick={onStartJourney}
                className="px-6 py-3 font-extrabold text-sm btn-tactile-lime inline-flex items-center gap-2 shadow-tactile-lime"
              >
                <span>JOIN THE BUILDATHON COMMUNITY</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 w-full lg:max-w-xl">
              <div className="p-5 rounded-2xl bg-[#052A22] border border-[#C7FF00]/20">
                <Clock className="w-6 h-6 text-[#C7FF00] mb-2" />
                <div className="text-2xl sm:text-4xl font-black text-[#FFFFFF] font-display">24,190h</div>
                <div className="text-xs font-bold text-[#ECFFB6]/70 mt-1">Productive Time Reclaimed</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#052A22] border border-[#FF2A00]/20">
                <Apple className="w-6 h-6 text-[#FF2A00] mb-2" />
                <div className="text-2xl sm:text-4xl font-black text-[#FFFFFF] font-display">18,450kg</div>
                <div className="text-xs font-bold text-[#ECFFB6]/70 mt-1">Food Waste Diverted</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#052A22] border border-[#FFC000]/20">
                <Zap className="w-6 h-6 text-[#FFC000] mb-2" />
                <div className="text-2xl sm:text-4xl font-black text-[#FFFFFF] font-display">84,200kWh</div>
                <div className="text-xs font-bold text-[#ECFFB6]/70 mt-1">Standby Electricity Saved</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#052A22] border border-[#C7FF00]/20">
                <Droplet className="w-6 h-6 text-[#C7FF00] mb-2" />
                <div className="text-2xl sm:text-4xl font-black text-[#FFFFFF] font-display">1.6M L</div>
                <div className="text-xs font-bold text-[#ECFFB6]/70 mt-1">Clean Water Protected</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FFFFFF] border-t border-[#E2EBE5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#021E18] flex items-center justify-center shadow-tactile-deep">
              <span className="text-[#C7FF00] font-black text-lg">U</span>
            </div>
            <div>
              <span className="font-black text-lg text-[#021E18]">UNSEEN</span>
              <p className="text-xs text-[#00545F] font-semibold">Make the Invisible Visible</p>
            </div>
          </div>

          <div className="text-xs font-medium text-[#021E18]/60 text-center sm:text-right">
            <p>Crafted for the Buildathon with Scout the 3D Detective Mascot.</p>
            <p className="mt-1">© 2026 UNSEEN. Detect · Measure · Understand · Reduce · Verify.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
