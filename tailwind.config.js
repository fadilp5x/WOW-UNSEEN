/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unseen: {
          deep: '#021E18',
          neon: '#C7FF00',
          orange: '#FF2A00',
          yellow: '#FFC000',
          pale: '#ECFFB6',
          bright: '#D6FB00',
          teal: '#00545F',
          darkSurface: '#052A22',
          lightBg: '#F7FAF7',
          cardBg: '#FFFFFF',
          borderSubtle: '#E2EBE5',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        rounded: ['Fredoka', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'tactile-lime': '0 4px 0 #8FB800',
        'tactile-lime-active': '0 1px 0 #8FB800',
        'tactile-deep': '0 4px 0 #01110E',
        'tactile-teal': '0 4px 0 #003840',
        'tactile-card': '0 4px 0 #D5DFD8',
        'tactile-white': '0 4px 0 #E2E8F0',
        'tactile-orange': '0 4px 0 #BD1F00',
        'glow-neon': '0 0 25px rgba(199, 255, 0, 0.45)',
        'glow-heart': '0 0 35px rgba(255, 42, 0, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        scanBeam: {
          '0%': { transform: 'rotate(-25deg)' },
          '50%': { transform: 'rotate(25deg)' },
          '100%': { transform: 'rotate(-25deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'float-slow': 'float 3.5s ease-in-out infinite',
        'breathe-slow': 'breathe 2.8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.2s ease-in-out infinite',
        'scan-beam': 'scanBeam 2.5s ease-in-out infinite',
        'wiggle-quick': 'wiggle 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
