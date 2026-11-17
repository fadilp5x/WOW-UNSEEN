import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import FloatingStreakBadge from './components/Navbar/FloatingStreakBadge';
import LandingPage from './pages/LandingPage';
import HeartOnboarding from './pages/HeartOnboarding';
import SuitcaseOnboarding from './pages/SuitcaseOnboarding';
import Dashboard from './pages/Dashboard';
import TrackLossModal from './pages/TrackLossModal';
import UnseenAI from './pages/UnseenAI';
import ActionLoop from './pages/ActionLoop';
import MyImpact from './pages/MyImpact';
import Profile from './pages/Profile';
import AuthModal from './pages/AuthModal';

import { 
  getStoredUser, 
  saveStoredUser, 
  getStoredRecords, 
  saveRecord, 
  getStoredActions, 
  updateActionStatus, 
  addActionItem 
} from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [user, setUser] = useState(getStoredUser());
  const [records, setRecords] = useState(getStoredRecords());
  const [actions, setActions] = useState(getStoredActions());
  
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync state changes with persistence
  const handleUpdateUser = (newUser) => {
    setUser(newUser);
    saveStoredUser(newUser);
  };

  const handleSaveRecord = (newRecord) => {
    const updated = saveRecord(newRecord);
    setRecords(updated);
  };

  const handleUpdateActionStatus = (actionId, newStatus) => {
    const updated = updateActionStatus(actionId, newStatus);
    setActions(updated);
  };

  const handleAddAction = (newAction) => {
    const updated = addActionItem(newAction);
    setActions(updated);
  };

  const handleResetData = () => {
    localStorage.clear();
    setUser(getStoredUser());
    setRecords(getStoredRecords());
    setActions(getStoredActions());
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFDF7] text-[#021E18] flex flex-col font-sans selection:bg-[#C7FF00] selection:text-[#021E18]">
      
      {/* Top Navbar — shown unless in dedicated full-screen onboarding */}
      {activeTab !== 'heart_onboarding' && activeTab !== 'suitcase_onboarding' && (
        <>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenTrack={() => setIsTrackOpen(true)}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          {/* FLOATING DETACHED STREAK BUTTON WITH 7-DAY PROGRESS POPOVER */}
          <FloatingStreakBadge
            user={user}
            onOpenTrack={() => setIsTrackOpen(true)}
          />
        </>
      )}

      {/* MAIN VIEW SWITCHER WITH SMOOTH ANIMATED PAGE ENTER TRANSITIONS */}
      <main className="flex-1 pb-24 md:pb-10">
        <div key={activeTab} className="animate-page-enter">
          {activeTab === 'landing' && (
            <LandingPage
              onStartJourney={() => setActiveTab('heart_onboarding')}
              onExplore={() => setActiveTab('dashboard')}
              onOpenTrack={() => setIsTrackOpen(true)}
            />
          )}

          {activeTab === 'heart_onboarding' && (
            <HeartOnboarding
              currentInterests={user.interests}
              onComplete={(selectedInterests) => {
                handleUpdateUser({ ...user, interests: selectedInterests });
                setActiveTab('suitcase_onboarding');
              }}
              onSkip={() => setActiveTab('suitcase_onboarding')}
            />
          )}

          {activeTab === 'suitcase_onboarding' && (
            <SuitcaseOnboarding
              onAddExtractedRecord={(record) => {
                handleSaveRecord(record);
              }}
              onComplete={() => setActiveTab('dashboard')}
              onSkip={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              user={user}
              records={records}
              onOpenTrack={() => setIsTrackOpen(true)}
              onOpenAI={() => setActiveTab('ai')}
              onOpenLoop={() => setActiveTab('loop')}
            />
          )}

          {activeTab === 'ai' && (
            <UnseenAI
              records={records}
              onAddAction={(act) => handleAddAction(act)}
            />
          )}

          {activeTab === 'loop' && (
            <ActionLoop
              actions={actions}
              onUpdateStatus={handleUpdateActionStatus}
              onAddAction={handleAddAction}
            />
          )}

          {activeTab === 'impact' && (
            <MyImpact
              records={records}
              actions={actions}
            />
          )}

          {activeTab === 'profile' && (
            <Profile
              user={user}
              records={records}
              actions={actions}
              onUpdateUser={handleUpdateUser}
              onLogout={() => {
                handleUpdateUser({ ...user, isLoggedIn: false });
                setActiveTab('landing');
              }}
              onReopenHeart={() => setActiveTab('heart_onboarding')}
              onResetData={handleResetData}
            />
          )}
        </div>
      </main>

      {/* TRACK LOSS MODAL */}
      <TrackLossModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        onSaveRecord={handleSaveRecord}
      />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          handleUpdateUser(loggedInUser);
        }}
      />

    </div>
  );
}
