import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  User, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  ChevronRight,
  TrendingDown,
  Zap,
  Droplet,
  Apple,
  Users
} from 'lucide-react';

export default function ActionLoop({ actions = [], onUpdateStatus, onAddAction }) {
  const [scoutState, setScoutState] = useState('idle');
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('electricity');
  const [newAssignee, setNewAssignee] = useState('You');
  const [newSavings, setNewSavings] = useState('$50 / month');
  const [newBefore, setNewBefore] = useState('');
  const [newAfter, setNewAfter] = useState('');

  const stages = [
    { id: 'detected', label: '1. Detected', color: '#00545F', bg: '#E0F2F1' },
    { id: 'assigned', label: '2. Assigned', color: '#B38600', bg: '#FFF8E6' },
    { id: 'action_taken', label: '3. Action Taken', color: '#FF2A00', bg: '#FFEAE5' },
    { id: 'resolved', label: '4. Resolved & Verified', color: '#021E18', bg: '#ECFFB6' }
  ];

  const handleStageAdvance = (actionId, currentStatus) => {
    let nextStatus = 'detected';
    if (currentStatus === 'detected') nextStatus = 'assigned';
    else if (currentStatus === 'assigned') nextStatus = 'action_taken';
    else if (currentStatus === 'action_taken') {
      nextStatus = 'resolved';
      // Celebrate verified resolution!
      setScoutState('celebrate');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C7FF00', '#021E18', '#FFC000', '#00545F']
      });
      setTimeout(() => setScoutState('happy'), 2200);
    } else {
      nextStatus = 'detected';
    }

    onUpdateStatus(actionId, nextStatus);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddAction({
      title: newTitle,
      category: newCategory,
      assignee: newAssignee,
      priority: 'high',
      potentialSavings: newSavings,
      beforeMetric: newBefore || 'Baseline leak',
      afterMetric: newAfter || 'Target zero waste'
    });

    setNewTitle('');
    setNewBefore('');
    setNewAfter('');
    setNewModalOpen(false);
    setScoutState('happy');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* HEADER WITH SCOUT — SPACIOUS AND RESPONSIVE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 text-left">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#021E18] text-[#C7FF00] text-xs font-black mb-3 shadow-tactile-deep">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>CLOSED-LOOP RESOURCE GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#021E18] font-display tracking-tight mb-2">
            The Action Loop
          </h1>
          <p className="text-xs sm:text-sm text-[#021E18]/70 leading-relaxed">
            DETECTED → ASSIGNED → ACTION TAKEN → RESOLVED. Advance tasks to verify real before-and-after savings.
          </p>
        </div>

        <div className="pt-8 sm:pt-4 flex items-center gap-4 self-center sm:self-auto shrink-0">
          <Scout
            expression={scoutState}
            size="md"
            message={scoutState === 'celebrate' ? "Verified improvement! Savings locked in!" : ""}
            interactive={true}
          />
          <button
            onClick={() => setNewModalOpen(true)}
            className="px-5 py-3 text-xs font-black btn-tactile-lime flex items-center gap-2 shadow-tactile-lime"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>CREATE ACTION</span>
          </button>
        </div>
      </div>

      {/* 4-STAGE PIPELINE COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const itemsInStage = actions.filter(a => a.status === stage.id);

          return (
            <div 
              key={stage.id}
              className="p-4 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card flex flex-col justify-between min-h-[480px]"
            >
              <div>
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8EFEA]">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: stage.color }} 
                    />
                    <span className="font-black text-sm text-[#021E18]">{stage.label}</span>
                  </div>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-lg bg-[#F2F7F4] text-[#021E18]/70">
                    {itemsInStage.length}
                  </span>
                </div>

                {/* Items in Column */}
                <div className="space-y-3">
                  {itemsInStage.map((act) => (
                    <div 
                      key={act.id}
                      className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E2EBE5] hover:border-[#CADBCF] transition-all text-left group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#00545F] mb-1.5">
                        <span className="uppercase tracking-wider font-black">{act.category}</span>
                        <span className="flex items-center gap-1 text-[#021E18]/60">
                          <User className="w-3 h-3" />
                          <span>{act.assignee}</span>
                        </span>
                      </div>

                      <h4 className="font-extrabold text-xs sm:text-sm text-[#021E18] mb-2 leading-snug">
                        {act.title}
                      </h4>

                      {/* Before and After Metric Box */}
                      <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E2EBE5] text-[11px] mb-3">
                        <div className="text-[#FF2A00] font-bold">
                          Before: <span className="text-[#021E18]/80">{act.beforeMetric}</span>
                        </div>
                        <div className="text-[#00545F] font-bold mt-0.5">
                          After: <span className="text-[#021E18] font-extrabold">{act.afterMetric}</span>
                        </div>
                      </div>

                      {/* Advance Stage Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E8EFEA]">
                        <span className="text-[10px] font-bold text-[#FFC000] bg-[#FFF8E6] px-1.5 py-0.5 rounded">
                          {act.potentialSavings}
                        </span>

                        <button
                          onClick={() => handleStageAdvance(act.id, act.status)}
                          className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-[#021E18] text-[#C7FF00] hover:bg-[#052A22] transition-colors flex items-center gap-1"
                          title="Advance to next stage"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>

                    </div>
                  ))}

                  {itemsInStage.length === 0 && (
                    <div className="p-8 text-center text-xs text-[#021E18]/40 border-2 border-dashed border-[#E2EBE5] rounded-2xl">
                      No actions in this stage.
                    </div>
                  )}
                </div>
              </div>

              {stage.id === 'resolved' && itemsInStage.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-[#ECFFB6] border border-[#C7FF00] text-center text-xs font-black text-[#021E18]">
                  ✨ Scout Verified: Savings are permanent!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE NEW ACTION MODAL */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#021E18]/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl border-3 border-[#E2EBE5] shadow-2xl p-6 text-left">
            <h3 className="text-xl font-black text-[#021E18] font-display mb-1">New Reduction Task</h3>
            <p className="text-xs text-[#021E18]/60 mb-4">Set clear targets and owners to eliminate detected waste.</p>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Action Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule smart power cutoff at 8 PM"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                  >
                    <option value="electricity">Electricity</option>
                    <option value="time">Time</option>
                    <option value="food">Food</option>
                    <option value="water">Water</option>
                    <option value="waiting">Waiting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Assignee</label>
                  <input
                    type="text"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Before State</label>
                  <input
                    type="text"
                    value={newBefore}
                    onChange={(e) => setNewBefore(e.target.value)}
                    placeholder="e.g. 750W idle draw"
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Target After State</label>
                  <input
                    type="text"
                    value={newAfter}
                    onChange={(e) => setNewAfter(e.target.value)}
                    placeholder="e.g. < 25W idle draw"
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">Potential Monthly Savings</label>
                <input
                  type="text"
                  value={newSavings}
                  onChange={(e) => setNewSavings(e.target.value)}
                  placeholder="e.g. $65 / month"
                  className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8EFEA]">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#021E18]/70 hover:text-[#021E18]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black btn-tactile-lime"
                >
                  Add Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
