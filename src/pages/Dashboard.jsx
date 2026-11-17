import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import { 
  Clock, 
  Apple, 
  Zap, 
  Droplet, 
  Users, 
  PlusCircle, 
  Sparkles, 
  ArrowUpRight, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function Dashboard({ user, records = [], onOpenTrack, onOpenAI, onOpenLoop }) {
  const [scoutMessage, setScoutMessage] = useState("I'm monitoring your 5 resource streams. Let's make the invisible visible!");
  const [scoutExp, setScoutExp] = useState('idle');

  // Compute live aggregates from recorded loss entries
  const totalCostLost = records.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const totalEntries = records.length;

  // Estimated Loss Index (0-100 scale, where lower is better efficiency)
  const lossIndex = Math.min(100, Math.max(12, Math.round(totalCostLost / 6)));
  
  const getIndexColor = (score) => {
    if (score < 30) return { text: '#00545F', bg: '#E0F2F1', label: 'Optimal Flow', badge: 'Excellent' };
    if (score < 60) return { text: '#FFC000', bg: '#FFF8E6', label: 'Moderate Leaks Detected', badge: 'Attention' };
    return { text: '#FF2A00', bg: '#FFEAE5', label: 'High Resource Drain', badge: 'Action Needed' };
  };
  const statusInfo = getIndexColor(lossIndex);

  // Grouped category summaries
  const categoryStats = [
    {
      id: 'time',
      name: 'Time Loss',
      icon: Clock,
      color: '#00545F',
      bgLight: '#E6F4F6',
      total: '185 min',
      cost: '$112.50',
      trend: '+12%',
      trendUp: true,
      lastFinding: 'Unstructured status meetings'
    },
    {
      id: 'food',
      name: 'Food Waste',
      icon: Apple,
      color: '#FF2A00',
      bgLight: '#FFEAE5',
      total: '4.2 kg',
      cost: '$38.00',
      trend: '-8%',
      trendUp: false,
      lastFinding: 'Surplus buffet prep'
    },
    {
      id: 'electricity',
      name: 'Electricity Waste',
      icon: Zap,
      color: '#FFC000',
      bgLight: '#FFF8E6',
      total: '410 kWh',
      cost: '$65.60',
      trend: '+18%',
      trendUp: true,
      lastFinding: 'Overnight display standby'
    },
    {
      id: 'water',
      name: 'Water Waste',
      icon: Droplet,
      color: '#00545F',
      bgLight: '#E5F3F5',
      total: '90 Liters',
      cost: '$3.20',
      trend: '-22%',
      trendUp: false,
      lastFinding: 'Cafeteria tap drip repaired'
    },
    {
      id: 'waiting',
      name: 'Waiting Time',
      icon: Users,
      color: '#021E18',
      bgLight: '#E8EFEA',
      total: '65 min',
      cost: '$81.25',
      trend: '+5%',
      trendUp: true,
      lastFinding: 'Invoice sign-off queue'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* SCOUT 3D GREETING & COMPANION HERO BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#021E18] text-[#FFFFFF] border-2 border-[#0A3D31] shadow-tactile-deep mb-8 relative overflow-hidden">
        {/* Subtle green ambient light */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#C7FF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-6 text-center sm:text-left">
            <div 
              onClick={() => {
                setScoutExp('celebrate');
                setScoutMessage("Great job checking in today! Keeping eyes open is step 1.");
              }}
              className="cursor-pointer hover:scale-105 transition-transform shrink-0"
            >
              <Scout
                expression={scoutExp}
                size="md"
                interactive={false}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-black text-[#FFFFFF] font-display">
                  Hello, {user?.name || 'Explorer'}!
                </h1>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF00] shadow-glow-neon" />
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#ECFFB6] mt-1 max-w-lg leading-relaxed">
                "{scoutMessage}"
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs font-bold text-[#ECFFB6]/70 justify-center sm:justify-start">
                <span>🎯 Priorities: {user?.interests?.slice(0, 3).join(', ') || 'Environment, Budget'}</span>
                <span>•</span>
                <span>🔥 {user?.streakDays || 4} day streak</span>
              </div>
            </div>
          </div>

          {/* THE SINGLE PROMINENT PRIMARY CTA */}
          <button
            onClick={onOpenTrack}
            className="w-full sm:w-auto px-7 py-4 text-base font-black tracking-wide btn-tactile-lime flex items-center justify-center gap-2.5 shrink-0 shadow-tactile-lime"
          >
            <PlusCircle className="w-5 h-5 stroke-[3]" />
            <span>START TRACKING</span>
          </button>

        </div>
      </div>

      {/* TOP SECTION: ESTIMATED LOSS INDEX + KEY INSIGHT OF THE DAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Estimated Loss Index Card (Duolingo visual clarity) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#00545F]">
                Resource Health
              </span>
              <span 
                className="text-xs font-black px-2.5 py-1 rounded-lg uppercase"
                style={{ backgroundColor: statusInfo.bg, color: statusInfo.text }}
              >
                {statusInfo.badge}
              </span>
            </div>

            <h3 className="text-lg font-black text-[#021E18] mb-1">Estimated Loss Index</h3>
            <p className="text-xs text-[#021E18]/60">Lower index indicates tighter efficiency and minimal leaks.</p>
          </div>

          {/* Gauge visualization */}
          <div className="my-6 flex items-center justify-center">
            <div className="relative w-36 h-36 rounded-full border-8 border-[#F2F7F4] flex flex-col items-center justify-center shadow-inner">
              <span className="text-4xl font-black text-[#021E18] font-display">{lossIndex}</span>
              <span className="text-[10px] font-bold text-[#00545F] uppercase tracking-wider">/ 100 Index</span>
              
              {/* Outer indicator dot */}
              <div 
                className="absolute w-4 h-4 rounded-full border-2 border-[#FFFFFF] shadow-sm"
                style={{ 
                  backgroundColor: statusInfo.text,
                  top: '6px',
                  right: '18px'
                }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8EFEA] flex items-center justify-between text-xs">
            <span className="font-bold text-[#021E18]/70">Detected Monthly Over-drain:</span>
            <span className="font-black text-sm text-[#FF2A00]">${totalCostLost.toFixed(2)}</span>
          </div>
        </div>

        {/* Scout's Important Resource Insight of the Day */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#021E18] text-[#C7FF00] text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TODAY'S CHIEF FINDING</span>
              </div>
              <span className="text-xs font-bold text-[#00545F]">Scout 3D Telemetry</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#021E18] font-display mb-3">
              Overnight Standby Draw Spiked by 18%
            </h2>
            <p className="text-sm text-[#021E18]/70 leading-relaxed max-w-xl mb-6">
              "I detected 410 kWh in continuous idle draw between 11 PM and 5 AM. Lab display monitors and cafeteria vending refrigeration are the primary suspects."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E8EFEA]">
            <button
              onClick={onOpenAI}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-black btn-tactile-lime flex items-center justify-center gap-2"
            >
              <span>INVESTIGATE WITH SCOUT AI</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onOpenLoop}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold bg-[#F8FAF8] hover:bg-[#F2F7F4] text-[#021E18] rounded-xl border border-[#E2EBE5] transition-all flex items-center justify-center gap-2"
            >
              <span>View in Action Loop</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5 RESOURCE CATEGORIES MONITOR GRID */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-[#021E18] font-display">5 Resource Streams</h2>
            <p className="text-xs text-[#021E18]/60">Real-time status across tracked dimensions</p>
          </div>
          <button
            onClick={onOpenTrack}
            className="text-xs font-bold text-[#00545F] hover:text-[#021E18] underline"
          >
            Log new measurement
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryStats.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id}
                className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card hover:border-[#CADBCF] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: cat.bgLight }}
                    >
                      <Icon className="w-5 h-5 stroke-[2.5]" style={{ color: cat.color }} />
                    </div>

                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      cat.trendUp ? 'bg-[#FFEAE5] text-[#FF2A00]' : 'bg-[#E0F2F1] text-[#00545F]'
                    }`}>
                      {cat.trend}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-[#021E18] mb-0.5">{cat.name}</h3>
                  <div className="text-xl font-black text-[#021E18] font-display mb-1">{cat.total}</div>
                  <div className="text-xs font-bold text-[#00545F] mb-3">≈ {cat.cost}</div>
                </div>

                <div className="pt-3 border-t border-[#E8EFEA] text-[11px] text-[#021E18]/60 truncate">
                  Latest: {cat.lastFinding}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WEEKLY ACTIVITY & ACTION HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Progress Tracker */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-lg text-[#021E18]">Weekly Detective Progress</h3>
              <p className="text-xs text-[#021E18]/60">Consecutive days checking and logging leaks</p>
            </div>
            <span className="text-xs font-bold text-[#00545F]">Target: 5 days/wk</span>
          </div>

          {/* Days bar */}
          <div className="grid grid-cols-7 gap-2 text-center mb-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const completed = idx < 4;
              const isToday = idx === 3;
              return (
                <div 
                  key={day}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between ${
                    completed
                      ? 'bg-[#C7FF00]/25 border-[#8FB800]'
                      : 'bg-[#F8FAF8] border-[#E2EBE5]'
                  } ${isToday ? 'ring-2 ring-[#021E18]' : ''}`}
                >
                  <span className="text-[11px] font-bold text-[#021E18]/60 mb-2">{day}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                    completed ? 'bg-[#021E18] text-[#C7FF00]' : 'bg-[#E2EBE5] text-[#021E18]/40'
                  }`}>
                    {completed ? '✓' : '•'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F2F7F4] flex items-center justify-between text-xs">
            <span className="font-bold text-[#021E18]">🔥 4-Day Streak active! Keep logging daily to unlock the "Master Sleuth" badge.</span>
            <button 
              onClick={onOpenTrack}
              className="text-xs font-black text-[#00545F] underline"
            >
              Log Today
            </button>
          </div>
        </div>

        {/* Quick Action Loop preview card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#00545F]">Action Loop</span>
              <span className="text-xs font-bold bg-[#ECFFB6] px-2 py-0.5 rounded text-[#021E18]">2 in progress</span>
            </div>

            <h3 className="font-black text-lg text-[#021E18] mb-2">Active Reductions</h3>
            <p className="text-xs text-[#021E18]/65 mb-4 leading-relaxed">
              Assigned interventions waiting for resolution or before/after verification.
            </p>

            <div className="space-y-2 mb-4">
              <div className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EBE5] text-xs">
                <div className="font-bold text-[#021E18]">Install Smart Timer Plugs</div>
                <div className="text-[11px] text-[#00545F] mt-0.5">Assigned to Alex · Saves $75/mo</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EBE5] text-xs">
                <div className="font-bold text-[#021E18]">Cap Standup at 15 Minutes</div>
                <div className="text-[11px] text-[#00545F] mt-0.5">Action Taken · Saves 12 hrs/mo</div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenLoop}
            className="w-full py-2.5 text-xs font-extrabold btn-tactile-deep flex items-center justify-center gap-1.5"
          >
            <span>OPEN ACTION LOOP</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>

    </div>
  );
}
