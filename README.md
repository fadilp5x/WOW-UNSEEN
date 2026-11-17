<div align="center">

# 🔍 UNSEEN
### *Make the Invisible Visible.*

**A premium, animated, mascot-driven Resource Intelligence Platform helping individuals, teams, and organizations detect, quantify, and eliminate invisible waste.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffadilp5x%2FWOW-UNSEEN)
[![GitHub Pages CI](https://github.com/fadilp5x/WOW-UNSEEN/actions/workflows/deploy.yml/badge.svg)](https://github.com/fadilp5x/WOW-UNSEEN/actions)
[![React 18](https://img.shields.io/badge/React-18.3-blue.svg?logo=react&style=flat-square)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](https://fadilp5x.github.io/WOW-UNSEEN/) • [Explore Features](#-core-features) • [Deployment](#-deployment-guide) • [Architecture](#-project-architecture)

</div>

---

## 🌟 What is UNSEEN?

Most critical resource losses never appear on an invoice or a monthly bill:
* ⏳ **Time** silently drained in repetitive, unstructured status updates.
* 🍱 **Food** prepped and discarded during mid-week cafeteria and pantry lulls.
* ⚡ **Electricity** siphoned continuously 24/7 by idle monitors, phantom standby bricks, and unused cooling.
* 💧 **Water** trickling invisibly from uncalibrated valve seals and fixture leaks.
* 🛑 **Waiting Friction** idling cross-functional teams in manual handoff and review bottlenecks.

**UNSEEN** transforms these elusive, intangible drains into **quantified, actionable intelligence** through a playful, companion-led tactile interface powered by **SCOUT**.

---

## 🕵️‍♂️ Meet SCOUT — The 3D Resource Detective

**SCOUT** is our original animated companion designed with a tactile **3D clay/vinyl aesthetic**:
- **Sphere Body**: Soft tactile lime body with subtle subsurface rim highlights and a playful sprout tuft.
- **Iconic Glasses**: Thick, dark teal circular detective frames with realistic specular gleams and bridge arc.
- **Expressive Eyes**: Glossy vertical pupils featuring organic double-blinks and dynamic directional tracking.
- **Telemetry Radar Ring**: Surrounds Scout in concentric deep-emerald radar waves, complemented by floating glassmorphic telemetry cards (real-time sparkline graph, status check badges, and leak mitigation counters).

```
          .---.
        /  *  *  \    [ SCOUT ]
       |  (o)-(o) |   "I can see what standard invoices miss!"
        \   ---  /
          '-----'
```

### 10 Expressive Mascot States
| Expression | Visual Behavior | Trigger Context |
| :--- | :--- | :--- |
| `idle` | Gentle sinusoidal floating + natural eye blinks | Default resting state |
| `blink` | Rapid curious double-blink | User hovers or taps Scout |
| `wave` | Cheerful raised-arm greeting gesture | Welcome on initial dashboard visit |
| `curious` | Inquisitive head tilt with raised eyebrow | Viewing mystery metrics & unknown streams |
| `investigate` | Crouched forward scan with neon inspection beam | Diagnostic scanning & audit modes |
| `think` | Pensive upward gaze with floating sparkle dots | AI diagnostic calculations |
| `surprise` | Wide-eyed startled recoil with squash/stretch | New high-volume leak discovered |
| `happy` | Joyful crescent-curve eyes with rosy cheeks | Successful leak mitigation recorded |
| `sad` | Empathetic drooping tilt with lowered pupils | Cumulative loss gauge in red zone |
| `celebrate` | Triumphant upward leap with confetti starbursts | Goal achieved or milestone reached |

```jsx
import Scout from './components/Scout/Scout';

<Scout 
  expression="investigate" 
  size="hero" 
  message="Scanning for idle overnight baseline power draw..." 
  interactive={true} 
/>
```

---

## 🔄 The 5-Step Closed Loop

UNSEEN enforces a closed-loop governance cycle:

```
┌────────────┐    ┌─────────────┐    ┌──────────────┐    ┌────────────┐    ┌────────────┐
│ 1. DETECT  │ ─► │ 2. MEASURE  │ ─► │3. UNDERSTAND │ ─► │ 4. REDUCE  │ ─► │ 5. VERIFY  │
└────────────┘    └─────────────┘    └──────────────┘    └────────────┘    └────────────┘
```

1. **DETECT**: Flag unnoticed friction, baseline idle draws, and repetitive bottlenecks.
2. **MEASURE**: Convert fuzzy waste into concrete physical metrics (\$ cost, kWh, Liters, work-hours, kg CO₂e).
3. **UNDERSTAND**: Scout breaks down the underlying root causes in plain, human-friendly terms.
4. **REDUCE**: Assign concrete operational interventions with explicit before/after targets.
5. **VERIFY**: Re-measure after intervention, compute verified permanent delta savings, and award detective badges!

---

## ⚡ 5 Specialized Resource Streams

UNSEEN keeps distinct physical units **strictly unbundled** (never carelessly summing kilowatt-hours with gallons):

| Stream | Measurement Units | Conversion Formulas | Typical Leaks Caught |
| :--- | :--- | :--- | :--- |
| **⏳ Time** | Hours / Week | `hours × attendees × hourly rate` | Unnecessary recurring meetings, duplicate check-ins |
| **🍱 Food** | kg / Week | `kg × $6.50/kg | 2.5 kg CO₂e/kg` | Over-prepped cafeteria stock, expired bulk storage |
| **⚡ Electricity** | kWh / Month | `(Watts × hours / 1000) × $0.18/kWh` | Overnight vampire draw, unmanaged server racks |
| **💧 Water** | Liters / Month | `liters × $0.004/L` | Running valve seals, unmonitored cooling towers |
| **🛑 Waiting** | Wait Hours / Cycle | `wait hours × impacted team size` | Approval delays, queue handoff deadlocks |

---

## 📱 Page Architecture & UX Flows

- **Landing Page (`/`)**: 
  - Architectural grid backdrop with deep emerald `#021E18` gradients.
  - Floating 3D mascot telemetry radar.
  - Interactive live category cost calculators.
  - Tactile 3D button physics with extruded neon borders.
  - Dynamic responsive desktop navigation & floating iOS dock for mobile devices.
- **Heart Onboarding (`/heart-onboarding`)**:
  - *"What's Close to Your Heart?"* — Scout interacts with a pulsating heart core.
  - Users select their primary focus areas (Environment, Personal Budget, Team Culture, Modern Tech).
- **Suitcase Onboarding (`/suitcase-onboarding`)**:
  - *"What's Inside Your Suitcase?"* — Drag-and-drop document intake for audit statements, invoices, and schedules with real-time parsed extraction.
- **Main Dashboard (`/dashboard`)**:
  - Estimated Loss Index radial gauge.
  - Unbundled 5-stream telemetry cards.
  - Interactive 7-day streak tracker and quick-action leak logger.
- **Action Loop Kanban (`/action-loop`)**:
  - 4-stage mitigation pipeline: `Detected` ➔ `Assigned` ➔ `Action Taken` ➔ `Resolved`.
  - Side-by-side Before/After validation metrics.
- **UNSEEN AI Detective (`/ai`)**:
  - Conversational detective interface with Scout for investigative diagnostic breakdowns.
- **My Impact (`/impact`)**:
  - Real-world carbon, cost, and physical units diverted.
  - Unlockable detective badges (`Phantom Hunter`, `Aqua Guardian`, `Focus Master`).
- **Profile & Export (`/profile`)**:
  - Target monthly savings configuration, reduced-motion accessibility mode, and one-click JSON backup export.

---

## 🎨 Design System & Palette

Carefully tuned high-contrast tactile dark theme engineered for visual clarity:

```css
--color-deep-green:   #021E18;  /* Dominant canvas and deep surfaces */
--color-neon-lime:    #C7FF00;  /* Primary brand signature & high-vis accents */
--color-bright-lime:  #D6FB00;  /* Active hover states & tactile button tops */
--color-pale-lime:    #ECFFB6;  /* Soft high-contrast text and badge cards */
--color-deep-teal:    #00545F;  /* Secondary detective frames & water accents */
--color-orange:       #FF2A00;  /* High-severity alert badges & CO2 footprint */
--color-yellow:       #FFC000;  /* Cautionary idle wattage indicators */
```

---

## 🔑 Environment Variables & API Keys

### 💡 Zero Mandatory API Keys Required!
**UNSEEN is 100% functional out of the box.** It features an internal **zero-config local persistent storage engine** with realistic simulation data, guest sessions, and real-time calculations.

You can deploy immediately to **Vercel** or **GitHub Pages** without configuring any secret keys!

### Optional: Cloud Synchronization (Supabase)
If you wish to synchronize records across devices using Supabase, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Required? | Default |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase project URL | **No** (Optional) | `none` (Local Storage) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous public key | **No** (Optional) | `none` (Local Storage) |
| `VITE_APP_ENV` | Environment identifier | **No** (Optional) | `production` |

---

## 🚀 Deployment Guide

### Option 1: Deploy to Vercel (1-Click Recommended)

1. Click the button below:  
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffadilp5x%2FWOW-UNSEEN)
2. Connect your GitHub account and select **`fadilp5x/WOW-UNSEEN`**.
3. Vercel automatically detects the Vite configuration and `vercel.json` SPA rewrite rules.
4. Click **Deploy** — your live site will be ready in under 60 seconds!

*Included `vercel.json`:*
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Option 2: Deploy to GitHub Pages (Automated CI/CD)

This repository includes a pre-configured GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. In your GitHub repository, go to **Settings** ➔ **Pages**.
2. Under **Build and deployment** ➔ **Source**, select **`GitHub Actions`**.
3. Every commit pushed to the `main` branch will build and deploy your site automatically!

---

### Option 3: Local Development

```bash
# 1. Clone the repository
git clone https://github.com/fadilp5x/WOW-UNSEEN.git
cd WOW-UNSEEN

# 2. Install dependencies
npm install

# 3. Start Vite dev server
npm run dev

# 4. Open in browser
# Local URL: http://localhost:5173
```

---

## 📁 Project Architecture

```
WOW-UNSEEN/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment
├── public/
│   └── scout-master.jpg          # Original design reference
├── src/
│   ├── assets/
│   │   └── scout-master.jpg
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx        # Responsive navigation & mobile dock
│   │   │   └── FloatingStreakBadge.jsx # 4-day streak button & progress modal
│   │   └── Scout/
│   │       ├── Scout.jsx         # 3D Vector Mascot (10 animation states)
│   │       └── ScoutHeroDisplay.jsx # Telemetry radar & live metric cards
│   ├── pages/
│   │   ├── ActionLoop.jsx        # 4-stage Kanban action loop
│   │   ├── AuthModal.jsx         # Authentication & guest access modal
│   │   ├── Dashboard.jsx         # Master resource intelligence dashboard
│   │   ├── HeartOnboarding.jsx   # Priority selection onboarding
│   │   ├── LandingPage.jsx       # Flagship landing page & calculators
│   │   ├── MyImpact.jsx          # Physical metric analytics & badges
│   │   ├── Profile.jsx           # Preferences, targets & JSON export
│   │   ├── SuitcaseOnboarding.jsx# Document intake & leak extraction
│   │   ├── TrackLossModal.jsx    # Real-time resource conversion modal
│   │   └── UnseenAI.jsx          # Conversational detective assistant
│   ├── services/
│   │   └── storage.js            # Offline persistent storage engine
│   ├── App.jsx                   # Master state router & navigation
│   ├── index.css                 # Tactile 3D button physics & keyframes
│   └── main.jsx                  # React DOM mount root
├── .env.example                  # Environment configuration template
├── .gitignore                    # Production cleanliness rules
├── index.html                    # HTML entry point with Plus Jakarta Sans & Fredoka
├── package.json                  # Dependencies & build scripts
├── postcss.config.js             # PostCSS Tailwind engine
├── tailwind.config.js            # Custom UNSEEN design palette
├── vercel.json                   # Zero-config Vercel SPA routing
├── vite.config.js                # Vite build config with './' asset base
└── README.md                     # Documentation
```

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <b>UNSEEN</b> — Engineered for the Buildathon with Scout the 3D Detective Companion.  
  <sub>"Make the Invisible Visible."</sub>
</div>

---

Part of [PROJECT WOW](https://github.com/fadilp5x/PROJECT-WOW), the umbrella home of UNSEEN, TIME TAX, EXHAUST and SHADOWPACT.
