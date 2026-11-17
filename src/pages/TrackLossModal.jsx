import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import confetti from 'canvas-confetti';
import { 
  X, 
  Clock, 
  Apple, 
  Zap, 
  Droplet, 
  Users, 
  Check, 
  Sparkles, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function TrackLossModal({ isOpen, onClose, onSaveRecord }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('electricity');
  const [scoutState, setScoutState] = useState('investigate');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states for each category
  const [timeForm, setTimeForm] = useState({
    minutes: '45',
    reason: 'Unplanned meeting spillover',
    people: '4',
    hourlyRate: '35'
  });

  const [foodForm, setFoodForm] = useState({
    weightKg: '2.5',
    costPerKg: '8.00',
    itemType: 'Surplus buffet produce',
    disposal: 'Composted'
  });

  const [elecForm, setElecForm] = useState({
    wattage: '750',
    hours: '12',
    costPerKwh: '0.16',
    appliance: 'Office workstations left on standby'
  });

  const [waterForm, setWaterForm] = useState({
    leakRateLpm: '0.4',
    durationHours: '48',
    location: 'Cafeteria sink faucet'
  });

  const [waitingForm, setWaitingForm] = useState({
    people: '6',
    minutes: '30',
    serviceType: 'Contract approval queue'
  });

  // Calculate live estimates
  const getCalculations = () => {
    switch (activeTab) {
      case 'time': {
        const totalMinutes = (Number(timeForm.minutes) || 0) * (Number(timeForm.people) || 1);
        const cost = (totalMinutes / 60) * (Number(timeForm.hourlyRate) || 30);
        return {
          primary: `${totalMinutes} person-mins lost`,
          cost: `$${cost.toFixed(2)} estimated value lost`,
          impact: `${(totalMinutes / 60).toFixed(1)} work-hours`
        };
      }
      case 'food': {
        const kg = Number(foodForm.weightKg) || 0;
        const cost = kg * (Number(foodForm.costPerKg) || 8);
        const co2 = kg * 2.5;
        return {
          primary: `${kg} kg discarded`,
          cost: `$${cost.toFixed(2)} wasted cost`,
          impact: `≈ ${co2.toFixed(1)} kg CO₂e footprint`
        };
      }
      case 'electricity': {
        const watts = Number(elecForm.wattage) || 0;
        const hours = Number(elecForm.hours) || 0;
        const kwh = (watts * hours) / 1000;
        const cost = kwh * (Number(elecForm.costPerKwh) || 0.16);
        return {
          primary: `${kwh.toFixed(2)} kWh wasted`,
          cost: `$${cost.toFixed(2)} utility charge`,
          impact: `≈ ${(kwh * 0.4).toFixed(1)} kg carbon emissions`
        };
      }
      case 'water': {
        const lpm = Number(waterForm.leakRateLpm) || 0;
        const mins = (Number(waterForm.durationHours) || 0) * 60;
        const liters = lpm * mins;
        return {
          primary: `${liters.toFixed(0)} Liters lost`,
          cost: `$${(liters * 0.003).toFixed(2)} water utility cost`,
          impact: `≈ ${(liters / 10).toFixed(0)} average toilet flushes`
        };
      }
      case 'waiting': {
        const p = Number(waitingForm.people) || 0;
        const m = Number(waitingForm.minutes) || 0;
        const totalPmins = p * m;
        return {
          primary: `${totalPmins} person-minutes idle`,
          cost: `$${((totalPmins / 60) * 25).toFixed(2)} idle waiting cost`,
          impact: `${p} frustrated individuals`
        };
      }
      default:
        return { primary: '', cost: '', impact: '' };
    }
  };

  const calc = getCalculations();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    let recordData = {};

    if (activeTab === 'time') {
      if (!timeForm.minutes || Number(timeForm.minutes) <= 0) {
        setErrorMsg('Please enter valid minutes lost.');
        return;
      }
      recordData = {
        category: 'time',
        title: timeForm.reason,
        value: Number(timeForm.minutes),
        unit: 'min',
        cost: ((Number(timeForm.minutes) * Number(timeForm.people || 1)) / 60) * Number(timeForm.hourlyRate || 30),
        notes: `${timeForm.people} people affected`
      };
    } else if (activeTab === 'food') {
      if (!foodForm.weightKg || Number(foodForm.weightKg) <= 0) {
        setErrorMsg('Please enter valid weight in kg.');
        return;
      }
      recordData = {
        category: 'food',
        title: foodForm.itemType,
        value: Number(foodForm.weightKg),
        unit: 'kg',
        cost: Number(foodForm.weightKg) * Number(foodForm.costPerKg || 8),
        notes: `Disposal: ${foodForm.disposal}`
      };
    } else if (activeTab === 'electricity') {
      if (!elecForm.wattage || Number(elecForm.wattage) <= 0) {
        setErrorMsg('Please enter valid wattage.');
        return;
      }
      const kwh = (Number(elecForm.wattage) * Number(elecForm.hours || 1)) / 1000;
      recordData = {
        category: 'electricity',
        title: elecForm.appliance,
        value: Number(elecForm.wattage),
        unit: 'W',
        hours: Number(elecForm.hours || 1),
        cost: kwh * Number(elecForm.costPerKwh || 0.16),
        notes: `${kwh.toFixed(1)} kWh idle draw`
      };
    } else if (activeTab === 'water') {
      if (!waterForm.leakRateLpm || Number(waterForm.leakRateLpm) <= 0) {
        setErrorMsg('Please enter leak rate.');
        return;
      }
      const liters = Number(waterForm.leakRateLpm) * Number(waterForm.durationHours || 1) * 60;
      recordData = {
        category: 'water',
        title: waterForm.location,
        value: Number(waterForm.leakRateLpm),
        unit: 'L/min',
        cost: liters * 0.003,
        notes: `${liters.toFixed(0)} Liters total`
      };
    } else if (activeTab === 'waiting') {
      if (!waitingForm.minutes || Number(waitingForm.minutes) <= 0) {
        setErrorMsg('Please enter waiting minutes.');
        return;
      }
      const totalMins = Number(waitingForm.people || 1) * Number(waitingForm.minutes);
      recordData = {
        category: 'waiting',
        title: waitingForm.serviceType,
        value: Number(waitingForm.minutes),
        unit: 'min',
        cost: (totalMins / 60) * 25,
        notes: `${waitingForm.people} people waiting`
      };
    }

    // Trigger celebration & confetti
    setScoutState('celebrate');
    setSuccessAnimation(true);
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C7FF00', '#021E18', '#FFC000', '#00545F']
    });

    onSaveRecord(recordData);

    setTimeout(() => {
      setSuccessAnimation(false);
      onClose();
    }, 1500);
  };

  const tabs = [
    { id: 'electricity', label: 'Electricity', icon: Zap, color: '#FFC000' },
    { id: 'time', label: 'Time', icon: Clock, color: '#00545F' },
    { id: 'food', label: 'Food', icon: Apple, color: '#FF2A00' },
    { id: 'water', label: 'Water', icon: Droplet, color: '#00545F' },
    { id: 'waiting', label: 'Waiting', icon: Users, color: '#021E18' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#021E18]/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border-3 border-[#E2EBE5] shadow-2xl p-6 sm:p-8 my-8 text-left transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#021E18]/50 hover:text-[#021E18] hover:bg-[#F2F7F4] transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* HEADER & SCOUT COMPANION */}
        <div className="flex items-center gap-4 mb-6">
          <Scout
            expression={scoutState}
            size="sm"
            interactive={false}
          />
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#00545F] tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C7FF00]" />
              <span>Detect & Measure</span>
            </div>
            <h2 className="text-2xl font-black text-[#021E18] font-display">Log a Resource Leak</h2>
          </div>
        </div>

        {/* 5 CATEGORY TABS */}
        <div className="grid grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-[#F2F7F4] border border-[#E2EBE5] mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setScoutState('curious');
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#021E18] text-[#C7FF00] shadow-sm'
                    : 'text-[#021E18]/70 hover:text-[#021E18] hover:bg-[#FFFFFF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* TAB 1: ELECTRICITY */}
          {activeTab === 'electricity' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                  Appliance or Device
                </label>
                <input
                  type="text"
                  value={elecForm.appliance}
                  onChange={(e) => setElecForm({ ...elecForm, appliance: e.target.value })}
                  placeholder="e.g. Workstation monitors, idle AC, breakroom heater"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Wattage (Watts)
                  </label>
                  <input
                    type="number"
                    value={elecForm.wattage}
                    onChange={(e) => setElecForm({ ...elecForm, wattage: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Unnecessary Hours
                  </label>
                  <input
                    type="number"
                    value={elecForm.hours}
                    onChange={(e) => setElecForm({ ...elecForm, hours: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIME */}
          {activeTab === 'time' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                  Reason for Time Loss
                </label>
                <input
                  type="text"
                  value={timeForm.reason}
                  onChange={(e) => setTimeForm({ ...timeForm, reason: e.target.value })}
                  placeholder="e.g. Status meeting ran over, context switching"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Minutes Lost
                  </label>
                  <input
                    type="number"
                    value={timeForm.minutes}
                    onChange={(e) => setTimeForm({ ...timeForm, minutes: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Number of People
                  </label>
                  <input
                    type="number"
                    value={timeForm.people}
                    onChange={(e) => setTimeForm({ ...timeForm, people: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FOOD */}
          {activeTab === 'food' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                  Food Item / Context
                </label>
                <input
                  type="text"
                  value={foodForm.itemType}
                  onChange={(e) => setFoodForm({ ...foodForm, itemType: e.target.value })}
                  placeholder="e.g. Unserved cafeteria buffet, expired pantry inventory"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Weight Discarded (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={foodForm.weightKg}
                    onChange={(e) => setFoodForm({ ...foodForm, weightKg: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Cost per kg ($)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={foodForm.costPerKg}
                    onChange={(e) => setFoodForm({ ...foodForm, costPerKg: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WATER */}
          {activeTab === 'water' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                  Location / Fixture
                </label>
                <input
                  type="text"
                  value={waterForm.location}
                  onChange={(e) => setWaterForm({ ...waterForm, location: e.target.value })}
                  placeholder="e.g. Restroom 2nd floor urinal flush, pantry sink"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Leak Rate (L/min)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={waterForm.leakRateLpm}
                    onChange={(e) => setWaterForm({ ...waterForm, leakRateLpm: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Duration (Hours)
                  </label>
                  <input
                    type="number"
                    value={waterForm.durationHours}
                    onChange={(e) => setWaterForm({ ...waterForm, durationHours: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WAITING */}
          {activeTab === 'waiting' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                  Service / Queue Type
                </label>
                <input
                  type="text"
                  value={waitingForm.serviceType}
                  onChange={(e) => setWaitingForm({ ...waitingForm, serviceType: e.target.value })}
                  placeholder="e.g. Hardware requisition sign-off, cafeteria lunch line"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Number of People
                  </label>
                  <input
                    type="number"
                    value={waitingForm.people}
                    onChange={(e) => setWaitingForm({ ...waitingForm, people: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#021E18]/70 mb-1">
                    Waiting Minutes per Person
                  </label>
                  <input
                    type="number"
                    value={waitingForm.minutes}
                    onChange={(e) => setWaitingForm({ ...waitingForm, minutes: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* REAL-TIME CONVERSION PREVIEW BOX */}
          <div className="p-4 rounded-2xl bg-[#ECFFB6]/50 border border-[#C7FF00] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00545F] block">
                Calculated Impact
              </span>
              <span className="font-extrabold text-sm text-[#021E18]">{calc.primary}</span>
              <span className="text-[#021E18]/60 ml-2">({calc.impact})</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2A00] block">
                Monetary Loss
              </span>
              <span className="font-black text-sm text-[#FF2A00]">{calc.cost}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-[#FFEAE5] border border-[#FF2A00]/30 text-xs font-bold text-[#FF2A00] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ACTION BUTTON */}
          <button
            type="submit"
            className="w-full py-4 text-base font-black tracking-wide btn-tactile-lime flex items-center justify-center gap-2 mt-4"
          >
            {successAnimation ? (
              <>
                <Check className="w-5 h-5 stroke-[3]" />
                <span>SAVED TO UNSEEN!</span>
              </>
            ) : (
              <>
                <span>SAVE & UPDATE DASHBOARD</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
