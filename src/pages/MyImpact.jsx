import React from 'react';
import Scout from '../components/Scout/Scout';
import { 
  TrendingDown, 
  Award, 
  DollarSign, 
  Clock, 
  Apple, 
  Zap, 
  Droplet, 
  Users, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function MyImpact({ records = [], actions = [] }) {
  // Compute categorized totals
  const timeRecords = records.filter(r => r.category === 'time');
  const foodRecords = records.filter(r => r.category === 'food');
  const elecRecords = records.filter(r => r.category === 'electricity');
  const waterRecords = records.filter(r => r.category === 'water');
  const waitRecords = records.filter(r => r.category === 'waiting');

  const totalTimeMins = timeRecords.reduce((acc, c) => acc + (Number(c.value) || 0), 0);
  const totalFoodKg = foodRecords.reduce((acc, c) => acc + (Number(c.value) || 0), 0);
  const totalElecW = elecRecords.reduce((acc, c) => acc + (Number(c.value) || 0), 0);
  const totalWaterL = waterRecords.reduce((acc, c) => acc + (Number(c.value) || 0), 0);
  const totalWaitMins = waitRecords.reduce((acc, c) => acc + (Number(c.value) || 0), 0);

  const totalFinancialCost = records.reduce((acc, c) => acc + (Number(c.cost) || 0), 0);

  // Resolved actions savings
  const resolvedActions = actions.filter(a => a.status === 'resolved');
  const verifiedSavingsCount = resolvedActions.length;

  const badges = [
    {
      id: 'b1',
      title: 'First Detection',
      desc: 'Logged your very first invisible resource leak',
      unlocked: records.length >= 1,
      icon: '🔍',
      color: '#C7FF00'
    },
    {
      id: 'b2',
      title: 'Kilowatt Crusher',
      desc: 'Identified and tracked standby electricity draw',
      unlocked: elecRecords.length >= 1,
      icon: '⚡',
      color: '#FFC000'
    },
    {
      id: 'b3',
      title: 'Water Guardian',
      desc: 'Stopped continuous cafeteria or restroom leaks',
      unlocked: waterRecords.length >= 1,
      icon: '💧',
      color: '#00545F'
    },
    {
      id: 'b4',
      title: 'Time Reclaimer',
      desc: 'Capped meeting overflow or administrative queues',
      unlocked: timeRecords.length >= 1,
      icon: '⏱️',
      color: '#021E18'
    },
    {
      id: 'b5',
      title: 'Loop Closer',
      desc: 'Moved an action all the way to Verified Resolution',
      unlocked: verifiedSavingsCount >= 1,
      icon: '🎉',
      color: '#FF2A00'
    },
    {
      id: 'b6',
      title: 'Master Sleuth',
      desc: 'Maintain a 5-day streak and verify 3 reductions',
      unlocked: false,
      icon: '🏆',
      color: '#B38600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* HEADER — CLEAN, SPACIOUS, ZERO OVERLAPS ON ALL SCREENS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 text-left">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00545F] text-[#ECFFB6] text-xs font-black mb-3 shadow-tactile-teal">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>MEASURED REDUCTIONS & BENCHMARKS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#021E18] font-display tracking-tight mb-2">
            My Impact & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#021E18]/70 leading-relaxed">
            Unrelated units remain unbundled. Verified resolutions are distinguished from initial estimates.
          </p>
        </div>

        {/* Scout Companion with proper top clearance so the speech bubble is spacious */}
        <div className="pt-8 sm:pt-4 self-center sm:self-auto shrink-0">
          <Scout
            expression="happy"
            size="md"
            message="Your efforts diverted real waste this week!"
            interactive={true}
          />
        </div>
      </div>

      {/* TOP 3 SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card text-left">
          <div className="flex items-center justify-between text-xs font-bold text-[#021E18]/60 mb-2">
            <span>FINANCIAL OVERHEAD IDENTIFIED</span>
            <DollarSign className="w-4 h-4 text-[#FF2A00]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#021E18] font-display">
            ${totalFinancialCost.toFixed(2)}
          </div>
          <p className="text-xs text-[#00545F] font-semibold mt-2">
            Estimated monthly drain across all 5 streams
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#021E18] text-[#FFFFFF] shadow-tactile-deep text-left">
          <div className="flex items-center justify-between text-xs font-bold text-[#ECFFB6]/70 mb-2">
            <span>VERIFIED RESOLUTIONS</span>
            <ShieldCheck className="w-4 h-4 text-[#C7FF00]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#C7FF00] font-display">
            {verifiedSavingsCount} Closed
          </div>
          <p className="text-xs text-[#ECFFB6]/80 font-semibold mt-2">
            Successfully resolved through the Action Loop
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card text-left">
          <div className="flex items-center justify-between text-xs font-bold text-[#021E18]/60 mb-2">
            <span>DETECTIVE LOGS</span>
            <Sparkles className="w-4 h-4 text-[#FFC000]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#021E18] font-display">
            {records.length} Recorded
          </div>
          <p className="text-xs text-[#021E18]/60 font-semibold mt-2">
            Zero blind spots: small daily entries add up
          </p>
        </div>

      </div>

      {/* 5 CATEGORY BREAKDOWN — CLEAR AND ACCURATE UNITS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card mb-8">
        <h2 className="text-xl font-black text-[#021E18] font-display mb-1 text-left">
          Detailed Category Breakdown
        </h2>
        <p className="text-xs text-[#021E18]/60 mb-6 text-left">
          Specific metric indicators without blurring physical units together.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Time */}
          <div className="p-4 rounded-2xl bg-[#E6F4F6] border border-[#00545F]/20 text-left">
            <Clock className="w-5 h-5 text-[#00545F] mb-2" />
            <div className="text-xs font-bold text-[#00545F] uppercase">Time Loss</div>
            <div className="text-2xl font-black text-[#021E18] font-display mt-1">
              {totalTimeMins} mins
            </div>
            <div className="text-[11px] font-semibold text-[#021E18]/70 mt-1">
              ≈ {(totalTimeMins / 60).toFixed(1)} work-hours
            </div>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#00545F]">
              Estimated
            </span>
          </div>

          {/* Food */}
          <div className="p-4 rounded-2xl bg-[#FFEAE5] border border-[#FF2A00]/20 text-left">
            <Apple className="w-5 h-5 text-[#FF2A00] mb-2" />
            <div className="text-xs font-bold text-[#FF2A00] uppercase">Food Waste</div>
            <div className="text-2xl font-black text-[#021E18] font-display mt-1">
              {totalFoodKg.toFixed(1)} kg
            </div>
            <div className="text-[11px] font-semibold text-[#021E18]/70 mt-1">
              ≈ {(totalFoodKg * 2.5).toFixed(1)} kg CO₂e
            </div>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#FF2A00]">
              Verified weight
            </span>
          </div>

          {/* Electricity */}
          <div className="p-4 rounded-2xl bg-[#FFF8E6] border border-[#FFC000]/30 text-left">
            <Zap className="w-5 h-5 text-[#B38600] mb-2" />
            <div className="text-xs font-bold text-[#B38600] uppercase">Electricity Waste</div>
            <div className="text-2xl font-black text-[#021E18] font-display mt-1">
              {totalElecW} W
            </div>
            <div className="text-[11px] font-semibold text-[#021E18]/70 mt-1">
              Continuous baseline load
            </div>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#B38600]">
              Meter reading
            </span>
          </div>

          {/* Water */}
          <div className="p-4 rounded-2xl bg-[#E5F3F5] border border-[#00545F]/20 text-left">
            <Droplet className="w-5 h-5 text-[#00545F] mb-2" />
            <div className="text-xs font-bold text-[#00545F] uppercase">Water Waste</div>
            <div className="text-2xl font-black text-[#021E18] font-display mt-1">
              {totalWaterL} L
            </div>
            <div className="text-[11px] font-semibold text-[#021E18]/70 mt-1">
              ≈ {(totalWaterL / 15).toFixed(0)} wash cycles
            </div>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#00545F]">
              Duration calculated
            </span>
          </div>

          {/* Waiting */}
          <div className="p-4 rounded-2xl bg-[#E8EFEA] border border-[#021E18]/20 text-left">
            <Users className="w-5 h-5 text-[#021E18] mb-2" />
            <div className="text-xs font-bold text-[#021E18] uppercase">Waiting Time</div>
            <div className="text-2xl font-black text-[#021E18] font-display mt-1">
              {totalWaitMins} mins
            </div>
            <div className="text-[11px] font-semibold text-[#021E18]/70 mt-1">
              Queue & approval delays
            </div>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#021E18]">
              Reported
            </span>
          </div>

        </div>
      </div>

      {/* DETECTIVE ACHIEVEMENTS / BADGES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 className="text-xl font-black text-[#021E18] font-display">Detective Badges</h2>
            <p className="text-xs text-[#021E18]/60">Unlock milestones by detecting, reducing and verifying</p>
          </div>
          <span className="text-xs font-bold text-[#00545F]">
            {badges.filter(b => b.unlocked).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div 
              key={b.id}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                b.unlocked
                  ? 'bg-[#FFFFFF] border-[#CADBCF] shadow-sm'
                  : 'bg-[#F8FAF8] border-[#E2EBE5] opacity-60'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                b.unlocked
                  ? 'bg-[#ECFFB6] border border-[#C7FF00] shadow-tactile-lime'
                  : 'bg-[#E2EBE5] border border-[#CADBCF]'
              }`}>
                {b.unlocked ? b.icon : <Lock className="w-5 h-5 text-[#021E18]/40" />}
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-[#021E18]">{b.title}</h4>
                <p className="text-xs text-[#021E18]/60 mt-0.5">{b.desc}</p>
                {b.unlocked && (
                  <span className="inline-block text-[10px] font-black text-[#00545F] mt-1">
                    ✓ Unlocked & Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
