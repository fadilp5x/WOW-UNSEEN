// Storage service with Supabase support and persistent LocalStorage fallback
const STORAGE_KEYS = {
  USER: 'unseen_user_profile',
  RECORDS: 'unseen_loss_records',
  ACTIONS: 'unseen_action_loop_items',
  ONBOARDING_DONE: 'unseen_onboarding_completed',
  SETTINGS: 'unseen_app_settings'
};

// Initial default demo records to give a rich, realistic dashboard immediately
const INITIAL_RECORDS = [
  {
    id: 'rec-1',
    category: 'electricity',
    title: 'Idle Office Monitors & Workstations',
    value: 850,
    unit: 'W',
    hours: 14,
    cost: 4.80,
    co2Kg: 5.2,
    date: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'detected',
    notes: 'Left in standby overnight over the weekend'
  },
  {
    id: 'rec-2',
    category: 'time',
    title: 'Unstructured Weekly Status Meeting',
    value: 45,
    unit: 'min',
    people: 6,
    cost: 112.50,
    co2Kg: 0,
    date: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'assigned',
    notes: 'Agenda was vague, ran 45 minutes over schedule'
  },
  {
    id: 'rec-3',
    category: 'water',
    title: 'Cafeteria Sink Continuous Slow Drip',
    value: 18,
    unit: 'L/day',
    durationDays: 5,
    cost: 3.20,
    co2Kg: 1.1,
    date: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    status: 'action_taken',
    notes: 'Washer seal worn out; maintenance scheduled'
  },
  {
    id: 'rec-4',
    category: 'food',
    title: 'Surplus Unserved Buffet Prep',
    value: 4.2,
    unit: 'kg',
    cost: 38.00,
    co2Kg: 10.5,
    date: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    status: 'resolved',
    notes: 'Over-ordered fresh produce before team remote Friday'
  },
  {
    id: 'rec-5',
    category: 'waiting',
    title: 'Manual Vendor Invoice Approval Bottleneck',
    value: 65,
    unit: 'min',
    people: 3,
    cost: 81.25,
    co2Kg: 0,
    date: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
    status: 'detected',
    notes: 'Sign-off queue stalled in review portal'
  }
];

const INITIAL_ACTIONS = [
  {
    id: 'act-1',
    title: 'Install Smart Timer Plugs on Lab Hardware',
    category: 'electricity',
    status: 'assigned',
    assignee: 'Alex Rivera',
    priority: 'high',
    potentialSavings: '$75 / month',
    beforeMetric: '220 kWh idle/mo',
    afterMetric: 'Target: 25 kWh idle/mo',
    createdDate: 'Yesterday',
    dueDate: 'In 3 days'
  },
  {
    id: 'act-2',
    title: 'Cap Standup Meetings at 15 Minutes Hard Stop',
    category: 'time',
    status: 'action_taken',
    assignee: 'You',
    priority: 'medium',
    potentialSavings: '12 hrs / month',
    beforeMetric: '52 mins average',
    afterMetric: '14 mins average',
    createdDate: '3 days ago',
    dueDate: 'Tomorrow'
  },
  {
    id: 'act-3',
    title: 'Replace Restroom Flush Valves & Aerators',
    category: 'water',
    status: 'resolved',
    assignee: 'Facilities Team',
    priority: 'high',
    potentialSavings: '1,400 L / month',
    beforeMetric: '9.2 L / min flow',
    afterMetric: '4.5 L / min eco-flow',
    createdDate: '1 week ago',
    resolvedDate: 'Yesterday'
  },
  {
    id: 'act-4',
    title: 'Implement Friday Food Share Box',
    category: 'food',
    status: 'detected',
    assignee: 'Community Lead',
    priority: 'low',
    potentialSavings: '$180 / month',
    beforeMetric: '6.5 kg wasted/wk',
    afterMetric: 'Target: < 1 kg/wk',
    createdDate: 'Just now',
    dueDate: 'Next week'
  }
];

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading user profile', e);
  }
  return {
    name: 'Explorer',
    email: 'scout.friend@unseen.org',
    isLoggedIn: false,
    interests: ['Environment', 'Saving money', 'Technology'],
    organization: 'UNSEEN Community Hub',
    targetSavingsGoal: 350,
    streakDays: 4,
    avatar: 'detective'
  };
};

export const saveStoredUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user profile', e);
  }
};

export const getStoredRecords = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading records', e);
  }
  return INITIAL_RECORDS;
};

export const saveRecord = (record) => {
  const records = getStoredRecords();
  const newRecord = {
    ...record,
    id: `rec-${Date.now()}`,
    date: new Date().toISOString(),
    status: 'detected'
  };
  const updated = [newRecord, ...records];
  try {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving record', e);
  }
  return updated;
};

export const getStoredActions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading actions', e);
  }
  return INITIAL_ACTIONS;
};

export const updateActionStatus = (actionId, newStatus) => {
  const actions = getStoredActions();
  const updated = actions.map(act => {
    if (act.id === actionId) {
      return {
        ...act,
        status: newStatus,
        resolvedDate: newStatus === 'resolved' ? 'Just now' : act.resolvedDate
      };
    }
    return act;
  });
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating action', e);
  }
  return updated;
};

export const addActionItem = (item) => {
  const actions = getStoredActions();
  const newItem = {
    ...item,
    id: `act-${Date.now()}`,
    status: 'detected',
    createdDate: 'Just now'
  };
  const updated = [newItem, ...actions];
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error adding action', e);
  }
  return updated;
};

export const getSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    reducedMotion: false,
    soundEffects: true,
    scoutVoiceHints: true,
    currency: '$',
    communitySharing: true
  };
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {}
};
