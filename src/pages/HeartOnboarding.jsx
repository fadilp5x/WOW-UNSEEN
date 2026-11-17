import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import { 
  Heart, 
  Leaf, 
  Users, 
  DollarSign, 
  GraduationCap, 
  Cpu, 
  Activity, 
  ArrowRight, 
  Check, 
  Info,
  Sparkles
} from 'lucide-react';

export default function HeartOnboarding({ onComplete, onSkip, currentInterests = [] }) {
  const [selected, setSelected] = useState(
    currentInterests.length > 0 ? currentInterests : ['Environment', 'Saving money']
  );
  const [scoutState, setScoutState] = useState('curious');
  const [isApproaching, setIsApproaching] = useState(false);

  const interestOptions = [
    {
      id: 'Environment',
      label: 'Environment',
      icon: Leaf,
      desc: 'Protecting habitats, stopping emissions & water conservation',
      color: '#00545F',
      bg: '#E0F2F1'
    },
    {
      id: 'Community',
      label: 'Community',
      icon: Users,
      desc: 'Collaborative neighbourhood sharing & collective well-being',
      color: '#021E18',
      bg: '#E8EFEA'
    },
    {
      id: 'Saving money',
      label: 'Saving Money',
      icon: DollarSign,
      desc: 'Cutting stealth overheads, utility drains & budget leaks',
      color: '#B38600',
      bg: '#FFF8E6'
    },
    {
      id: 'Education',
      label: 'Education',
      icon: GraduationCap,
      desc: 'Cultivating resource awareness & smart lifestyle habits',
      color: '#00545F',
      bg: '#E1F5FE'
    },
    {
      id: 'Technology',
      label: 'Technology',
      icon: Cpu,
      desc: 'Smart sensors, IoT meters & automated reduction loops',
      color: '#021E18',
      bg: '#EDE7F6'
    },
    {
      id: 'Healthy living',
      label: 'Healthy Living',
      icon: Activity,
      desc: 'Fresh nutrition, zero food spoilage & stress-free time',
      color: '#FF2A00',
      bg: '#FFEBEE'
    }
  ];

  const toggleInterest = (id) => {
    setIsApproaching(true);
    setScoutState('happy');
    
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }

    setTimeout(() => {
      setIsApproaching(false);
      setScoutState('curious');
    }, 1200);
  };

  const handleContinue = () => {
    setScoutState('celebrate');
    setTimeout(() => {
      onComplete(selected);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#021E18] text-[#C7FF00] font-black flex items-center justify-center text-sm">
            1/2
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00545F]">Onboarding: Priorities</span>
        </div>
        <button
          onClick={onSkip}
          className="text-xs font-bold text-[#021E18]/60 hover:text-[#021E18] underline transition-colors"
        >
          Skip this step
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="max-w-3xl mx-auto w-full text-center my-6">
        
        {/* SCOUT APPROACHING GLOWING HEART */}
        <div className="relative flex items-center justify-center mb-6 h-44">
          
          {/* Glowing Animated Heart in center */}
          <div className="relative flex items-center justify-center z-10">
            <div className="absolute w-28 h-28 rounded-full bg-[#FF2A00]/20 animate-pulse-glow -z-10" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF2A00] to-[#FF6B4A] flex items-center justify-center shadow-glow-heart border-3 border-[#FFFFFF]">
              <Heart className="w-10 h-10 text-[#FFFFFF] fill-[#FFFFFF] animate-breathe-slow" />
            </div>
          </div>

          {/* Scout Mascot positioned next to the Heart */}
          <div className={`absolute transition-all duration-700 ease-out ${
            isApproaching ? 'translate-x-14 scale-105' : 'translate-x-24 sm:translate-x-28'
          }`}>
            <Scout
              expression={scoutState}
              size="md"
              message={
                selected.length === 0
                  ? "Pick what matters most to you!"
                  : `Great choice! Scout is focusing on ${selected[selected.length - 1]}.`
              }
              interactive={true}
            />
          </div>

        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#021E18] font-display mb-3">
          WHAT'S CLOSE TO YOUR HEART?
        </h1>
        <p className="text-sm sm:text-base text-[#021E18]/70 max-w-xl mx-auto mb-8">
          Tell Scout your core focus areas. UNSEEN customizes your loss detection algorithm and prioritized action items around what you care about.
        </p>

        {/* Priority Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-left mb-8">
          {interestOptions.map((opt) => {
            const Icon = opt.icon;
            const isChecked = selected.includes(opt.id);

            return (
              <div
                key={opt.id}
                onClick={() => toggleInterest(opt.id)}
                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between ${
                  isChecked
                    ? 'bg-[#FFFFFF] border-[#021E18] shadow-tactile-deep scale-[1.02]'
                    : 'bg-[#FFFFFF] border-[#E2EBE5] hover:border-[#CADBCF] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: opt.bg }}
                    >
                      <Icon className="w-5 h-5 stroke-[2.5]" style={{ color: opt.color }} />
                    </div>

                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${
                      isChecked
                        ? 'bg-[#C7FF00] border-[#021E18] text-[#021E18]'
                        : 'border-[#CADBCF] bg-[#FFFFFF]'
                    }`}>
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-[#021E18] mb-1">{opt.label}</h3>
                  <p className="text-xs text-[#021E18]/65 leading-snug">{opt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E2EBE5] text-[11px] text-[#021E18]/70 mb-6">
          <Info className="w-4 h-4 text-[#00545F] shrink-0" />
          <span>You have full control. Preferences can be edited or deleted anytime from your Profile.</span>
        </div>

      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="max-w-md mx-auto w-full">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`w-full py-4 text-base font-black tracking-wide flex items-center justify-center gap-2 ${
            selected.length > 0
              ? 'btn-tactile-lime'
              : 'bg-[#CADBCF] text-[#FFFFFF] cursor-not-allowed rounded-2xl'
          }`}
        >
          <span>CONTINUE TO SUITCASE ({selected.length} SELECTED)</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
