import React, { useState } from 'react';
import Scout from '../components/Scout/Scout';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  Zap, 
  Clock, 
  Apple, 
  Droplet, 
  Users,
  Search,
  Plus
} from 'lucide-react';

export default function UnseenAI({ records = [], onAddAction }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'scout',
      text: "Hello! I'm Scout, your detective companion. I've been examining your resource logs.",
      expression: 'wave'
    },
    {
      id: 2,
      sender: 'scout',
      text: "I found a possible electricity loss in workstation standby. Overnight draw is 18% higher than average.",
      expression: 'investigate',
      suggestion: {
        title: "Overnight Standby Electricity Leak",
        category: "electricity",
        action: "Install smart timer power strips"
      }
    },
    {
      id: 3,
      sender: 'scout',
      text: "Would you like to investigate this, understand the source, or take immediate action?",
      expression: 'curious',
      actions: ['Investigate', 'Understand', 'Take action']
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [activeScoutState, setActiveScoutState] = useState('curious');

  const handleActionClick = (actionType) => {
    if (actionType === 'Investigate') {
      setActiveScoutState('investigate');
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: "Let's investigate this standby power leak." },
        { 
          id: Date.now() + 1, 
          sender: 'scout', 
          expression: 'investigate',
          text: "I examined the meter data. Between 11:30 PM and 5:00 AM, the lab monitors and desktop towers drew an unvarying 750 Watts. That equates to $65.60 wasted each month on an empty room."
        }
      ]);
    } else if (actionType === 'Understand') {
      setActiveScoutState('think');
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: "Help me understand why this is happening." },
        { 
          id: Date.now() + 1, 
          sender: 'scout', 
          expression: 'think',
          text: "Most team members lock their PCs rather than shutting down. Windows updates and RGB peripherals keep power supplies in active standby. A scheduled cutoff plug would solve this automatically."
        }
      ]);
    } else if (actionType === 'Take action') {
      setActiveScoutState('celebrate');
      if (onAddAction) {
        onAddAction({
          title: "Install Scheduled Smart Power Strips in Lab",
          category: "electricity",
          priority: "high",
          potentialSavings: "$65 / month",
          beforeMetric: "750 W baseline",
          afterMetric: "Target: 25 W standby",
          assignee: "Facilities Team"
        });
      }
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: "Let's take action and fix this." },
        { 
          id: Date.now() + 1, 
          sender: 'scout', 
          expression: 'celebrate',
          text: "Done! I created an action item in your Action Loop assigned to Facilities Team. We will measure the before-and-after change together!"
        }
      ]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');
    setActiveScoutState('think');

    const newMsgs = [
      ...messages,
      { id: Date.now(), sender: 'user', text: userText }
    ];
    setMessages(newMsgs);

    // Rule-based detective reasoning
    setTimeout(() => {
      let reply = "I am tracking your logged patterns. Try asking about 'food waste', 'meeting time', or 'water leaks'.";
      let exp = 'happy';

      const lower = userText.toLowerCase();
      if (lower.includes('food') || lower.includes('buffet') || lower.includes('eat')) {
        reply = "Your food waste logs indicate 4.2 kg discarded this week. The biggest culprit is pre-weekend over-ordering. Would you like me to recommend a portion cap?";
        exp = 'investigate';
      } else if (lower.includes('time') || lower.includes('meeting') || lower.includes('hour')) {
        reply = "Time logs reveal 185 minutes lost across status meetings with 4+ attendees. Capping meetings at 15 minutes saves an estimated 12 hours a month!";
        exp = 'curious';
      } else if (lower.includes('water') || lower.includes('tap') || lower.includes('leak')) {
        reply = "The cafeteria tap drip log was resolved! We saved approximately 90 Liters of water this week compared to last week.";
        exp = 'celebrate';
      } else if (lower.includes('electric') || lower.includes('power') || lower.includes('watt')) {
        reply = "Standby power represents 18% of your overall resource loss index. Shutting off power strips on Friday cuts $65.60/mo.";
        exp = 'investigate';
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('scout')) {
        reply = "Hello detective! I'm here to uncover whatever invisible loss you want to investigate next.";
        exp = 'wave';
      }

      setActiveScoutState(exp);
      setMessages(curr => [
        ...curr,
        { id: Date.now(), sender: 'scout', text: reply, expression: exp }
      ]);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title & Scout Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#021E18] text-[#C7FF00] text-xs font-black mb-2 shadow-tactile-deep">
            <Bot className="w-3.5 h-3.5" />
            <span>CONVERSATIONAL DETECTIVE INTERFACE</span>
          </div>
          <h1 className="text-3xl font-black text-[#021E18] font-display">UNSEEN AI with Scout</h1>
          <p className="text-xs sm:text-sm text-[#021E18]/70">
            Rule-based resource intelligence. Scout translates hidden data into plain, friendly advice.
          </p>
        </div>

        <div className="flex items-center gap-3 p-2 px-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#E2EBE5] shadow-sm">
          <Scout
            expression={activeScoutState}
            size="sm"
            interactive={false}
          />
          <div className="text-left text-xs">
            <span className="font-extrabold text-[#021E18] block">Scout Status</span>
            <span className="text-[#00545F] font-bold capitalize">{activeScoutState}</span>
          </div>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#E2EBE5] shadow-tactile-card p-4 sm:p-6 mb-4 min-h-[460px] flex flex-col justify-between">
        
        {/* Messages Stream */}
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg) => {
            const isScout = msg.sender === 'scout';

            return (
              <div 
                key={msg.id}
                className={`flex gap-3 text-left ${isScout ? 'justify-start' : 'justify-end'}`}
              >
                {isScout && (
                  <div className="w-9 h-9 rounded-xl bg-[#021E18] border border-[#C7FF00] flex items-center justify-center text-[#C7FF00] shrink-0 font-black text-sm">
                    S
                  </div>
                )}

                <div className={`max-w-md sm:max-w-lg p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                  isScout 
                    ? 'bg-[#F2F7F4] text-[#021E18] border border-[#E2EBE5]'
                    : 'bg-[#021E18] text-[#FFFFFF] shadow-tactile-deep'
                }`}>
                  <p>{msg.text}</p>

                  {/* Contextual Action Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#CADBCF]">
                      {msg.actions.map((act) => (
                        <button
                          key={act}
                          onClick={() => handleActionClick(act)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                            act === 'Take action'
                              ? 'btn-tactile-lime'
                              : 'btn-tactile-outline'
                          }`}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT PROMPT BAR */}
        <form onSubmit={handleSend} className="mt-4 pt-4 border-t border-[#E8EFEA] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Scout: e.g. 'How can I reduce meeting waste?' or 'What is our biggest leak?'"
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border-2 border-[#E2EBE5] focus:border-[#021E18] focus:outline-none bg-[#F8FAF8]"
          />

          <button
            type="submit"
            className="px-5 py-3 text-xs sm:text-sm font-black btn-tactile-deep flex items-center gap-2 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

      </div>

      {/* QUICK SUGGESTION PILLS */}
      <div className="flex items-center gap-2 flex-wrap text-xs text-[#021E18]/70">
        <span className="font-bold">Try asking:</span>
        {[
          "Analyze my electricity standby",
          "Where is our food waste highest?",
          "How much time do meetings waste?",
          "Explain the 5-step loop"
        ].map((promptText) => (
          <button
            key={promptText}
            onClick={() => {
              setInputVal(promptText);
            }}
            className="px-3 py-1 rounded-xl bg-[#FFFFFF] border border-[#E2EBE5] hover:border-[#CADBCF] text-[#021E18] font-semibold transition-colors"
          >
            "{promptText}"
          </button>
        ))}
      </div>

    </div>
  );
}
