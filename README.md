# 🔍 UNSEEN — Make the Invisible Visible

> **A premium, animated, mascot-driven resource intelligence platform that helps people, communities, and organizations discover, measure, and eliminate invisible resource leaks.**

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Automated-green?style=for-the-badge&logo=github)](https://github.com/fadilp5x/WOW-UNSEEN)
[![React 18](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Product Identity & Philosophy

Most critical resource losses never show up on standard invoices:
- **Time** lost in recurring, unstructured status meetings.
- **Food** prepped and tossed before weekend cafeteria lulls.
- **Electricity** drawn continuously 24/7 by idle monitors and standby hardware.
- **Water** trickling invisibly from uncalibrated valve seals.
- **Waiting Time** spent in manual review queues and administrative bottlenecks.

**UNSEEN** transforms these elusive drains into quantified, actionable intelligence through a playful, companion-led experience driven by **SCOUT**.

---

## 🕵️‍♂️ Meet SCOUT — The 3D Resource Detective

**SCOUT** is an original, animated companion engineered with a tactile, 3D clay/vinyl aesthetic:
- **Silhouette**: Smooth spherical lime-green body with a top hair sprout.
- **Signature Specs**: Thick, dark teal circular detective glasses with realistic specular glints and an arched nose bridge.
- **Expressive Eyes**: Glossy vertical pupils with dynamic specular reflections and natural blinking physics.
- **Telemetry Display**: Floats within concentric deep emerald sonar waves surrounded by floating live sparklines, radar pulse beacons, and verified leak counters.

### Supported Mascot States:
1. `idle` — Breathing floating animation with natural eyelid blinks
2. `blink` — Rapid curious double-blink
3. `wave` — Cheerful arm wave greeting
4. `curious` — Puzzled head tilt with inquisitive eyebrow shift
5. `investigate` — Crouched scan with glowing neon inspection rays
6. `think` — Pensive gaze with floating thought sparkles
7. `surprise` — Wide-eyed recoil with bouncy physics
8. `happy` — Joyful crescent smile with rosy cheek blush
9. `sad` — Empathetic downward tilt
10. `celebrate` — Triumphant leap with confetti particles and golden starbursts

```jsx
import Scout from './components/Scout/Scout';

// Example usage
<Scout 
  expression="investigate" 
  size="hero" 
  message="Scanning for idle overnight baseline draw..." 
  interactive={true} 
/>
```

---

## 🔄 The 5-Step Closed Loop

UNSEEN enforces a closed-loop governance cycle:

```
[ DETECT ] ➔ [ MEASURE ] ➔ [ UNDERSTAND ] ➔ [ REDUCE ] ➔ [ VERIFY ]
```

1. **DETECT**: Flag recurring baseline patterns and unnoticed operational friction.
2. **MEASURE**: Convert vague waste into verifiable units ($ cost, kWh, Liters, work-hours, kg CO₂e).
3. **UNDERSTAND**: Conversational plain-English diagnostic breakdowns from Scout.
4. **REDUCE**: Assign concrete interventions with explicit target before-and-after states.
5. **VERIFY**: Compare real outcome metrics against baseline and celebrate permanent savings!

---

## 📱 Features & Page Architecture

| Module | Purpose & Core Capabilities |
| :--- | :--- |
| **Landing Hero** | Make the Invisible Visible hero, 3D Scout telemetry radar, live 5-category calculators, community ticker. |
| **Heart Onboarding** | *"What's Close to Your Heart?"* — Scout approaches glowing heart; users select core focus areas (Environment, Budget, Community, Tech). |
| **Suitcase Onboarding** | *"What's Inside Your Suitcase?"* — File upload for PDF/CSV/Excel, client-side leak extraction, confirmation & skip. |
| **Main Dashboard** | Scout companion greeting, Estimated Loss Index circular gauge, 5 category stream summaries, weekly streak progress. |
| **Track Loss Modal** | Real-time calculation engines for Time, Food, Electricity, Water, and Waiting, persistent saving & confetti reaction. |
| **UNSEEN AI** | Conversational detective interface with Scout explaining findings in short, friendly sentences. |
| **Action Loop** | 4-stage pipeline: Detected → Assigned → Action Taken → Resolved, with before-and-after comparison metrics. |
| **My Impact** | Quantified financial savings, unbundled physical metrics (never mixing kWh with Liters), and unlockable detective badges. |
| **Profile & Settings** | Priority editor, monthly target savings goal, reduced motion toggle, and JSON backup export. |

---

## 🎨 Brand Color Palette

- **Deep Green**: `#021E18` *(Main brand anchor)*
- **Neon Lime**: `#C7FF00` *(Primary action & neon accents)*
- **Bright Lime**: `#D6FB00` *(Active tactile hover states)*
- **Pale Lime**: `#ECFFB6` *(Readable card surfaces & badges)*
- **Deep Teal**: `#00545F` *(Secondary focus & conservation)*
- **Warning Orange**: `#FF2A00` *(Severe alerts & emissions footprint)*
- **Warm Yellow**: `#FFC000` *(Cautionary indicators & energy wattage)*

---

## ⚡ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Typography**: Plus Jakarta Sans & Fredoka (Google Fonts)
- **Deployment**: Vercel & GitHub Actions (Zero-config)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/fadilp5x/WOW-UNSEEN.git
cd WOW-UNSEEN
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for production
```bash
npm run build
```

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `fadilp5x/WOW-UNSEEN`.
3. Vercel automatically detects Vite and uses the included `vercel.json` rewrite rules.
4. Click **Deploy**!

### Deploy to GitHub Pages
1. Go to your repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **`GitHub Actions`**.
3. Every commit pushed to `main` triggers `.github/workflows/deploy.yml` and publishes automatically!

---

## 🔐 Environment Variables (Optional)

UNSEEN comes pre-configured with **Zero-Config Local Persistent Storage** that works immediately without any external database.

If you wish to link a cloud Supabase project:
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
2. Populate your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📄 License

MIT License © 2026 UNSEEN. Built for the Buildathon with Scout the 3D Detective Mascot.
