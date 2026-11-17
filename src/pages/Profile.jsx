import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import { 
  User, 
  Settings, 
  Heart, 
  Download, 
  RotateCcw, 
  LogOut, 
  Check, 
  Shield, 
  Bell, 
  EyeOff,
  Flame,
  Plus,
  Trash2
} from 'lucide-react';

export default function Profile({ 
  user, 
  onUpdateUser, 
  onLogout, 
  onReopenHeart, 
  records = [], 
  actions = [], 
  onResetData 
}) {
  const [userName, setUserName] = useState(user?.name || 'Explorer');
  const [org, setOrg] = useState(user?.organization || 'UNSEEN Community Hub');
  const [targetGoal, setTargetGoal] = useState(user?.targetSavingsGoal || 350);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: userName,
      organization: org,
      targetSavingsGoal: Number(targetGoal)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const removeInterest = (interestToRemove) => {
    const updated = (user.interests || []).filter(i => i !== interestToRemove);
    onUpdateUser({ ...user, interests: updated });
  };

  const handleExportData = () => {
    const data = {
      user,
      records,
      actions,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unseen-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* PROFILE HEADER WITH SCOUT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#C7FF00] border-2 border-[#021E18] text-[#021E18] flex items-center justify-center font-black text-2xl shadow-tactile-lime">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#021E18] font-display">{userName}</h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#021E18] text-[#C7FF00]">
                Detective
              </span>
            </div>
            <p className="text-xs text-[#021E18]/60 mt-0.5">{user?.email || 'explorer@unseen.org'}</p>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-[#FF2A00]">
              <Flame className="w-4 h-4 fill-[#FF2A00]" />
              <span>{user?.streakDays || 4}-day detective streak active</span>
            </div>
          </div>
        </div>

        <Scout
          expression="wave"
          size="sm"
          interactive={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: EDIT DETAILS & PRIORITIES */}
        <div className="md:col-span-7 space-y-6">
          
          {/* USER INFO FORM */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card">
            <h3 className="font-black text-lg text-[#021E18] mb-4">Account Profile</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">
                  Organization / Community Hub
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#021E18]/70 mb-1">
                  Monthly Resource Savings Goal ($)
                </label>
                <input
                  type="number"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8] font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-black btn-tactile-lime flex items-center justify-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>SAVED!</span>
                  </>
                ) : (
                  <span>SAVE CHANGES</span>
                )}
              </button>
            </form>
          </div>

          {/* HEART PRIORITIES SECTION */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#FF2A00] fill-[#FF2A00]" />
                <h3 className="font-black text-lg text-[#021E18]">Close to Your Heart</h3>
              </div>
              <button
                onClick={onReopenHeart}
                className="text-xs font-black text-[#00545F] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Change Priorities</span>
              </button>
            </div>

            <p className="text-xs text-[#021E18]/60 mb-4">
              These active priorities guide Scout's algorithm to highlight relevant leaks.
            </p>

            <div className="flex flex-wrap gap-2">
              {(user?.interests || []).map((interest) => (
                <div
                  key={interest}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F2F7F4] border border-[#CADBCF] text-xs font-bold text-[#021E18]"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => removeInterest(interest)}
                    className="text-[#FF2A00] hover:text-[#B31D00]"
                    title="Remove preference"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {(!user?.interests || user.interests.length === 0) && (
                <span className="text-xs text-[#021E18]/40">No priorities selected yet.</span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PREFERENCES & DATA ACTIONS */}
        <div className="md:col-span-5 space-y-6">
          
          {/* PREFERENCES */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card">
            <h3 className="font-black text-base text-[#021E18] mb-4">Preferences</h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EBE5] cursor-pointer">
                <div>
                  <div className="font-bold text-[#021E18]">Reduced Motion</div>
                  <div className="text-[11px] text-[#021E18]/60">Restrain dynamic animations</div>
                </div>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="w-4 h-4 rounded text-[#021E18] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EBE5] cursor-pointer">
                <div>
                  <div className="font-bold text-[#021E18]">Scout Voice Hints</div>
                  <div className="text-[11px] text-[#021E18]/60">Show contextual tips in speech bubbles</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-4 h-4 rounded text-[#021E18] focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* DATA MANAGEMENT */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-tactile-card space-y-3">
            <h3 className="font-black text-base text-[#021E18] mb-2">Data & Sessions</h3>

            <button
              onClick={handleExportData}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#E2EBE5] hover:bg-[#F2F7F4] text-xs font-bold text-[#021E18] flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Measurements (JSON)</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all loss records and action loop tasks to initial demo state?')) {
                  onResetData();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#E2EBE5] hover:bg-[#FFEAE5] text-xs font-bold text-[#FF2A00] flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Demo Baseline</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full py-2.5 px-4 rounded-xl bg-[#021E18] text-[#FFFFFF] text-xs font-black flex items-center justify-center gap-2 hover:bg-[#052A22] transition-all shadow-tactile-deep"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
