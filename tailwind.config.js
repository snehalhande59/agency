/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Travel Theme Core Tokens
        travel: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          primary: '#3898D8',
          'primary-dark': '#2479B0',
          light: '#DCEEFF',
          dark: '#153B5B',
          secondary: '#64748B',
          teal: '#19A89A',
          'teal-light': '#E6F7F5',
          border: '#E5EDF5',
          soft: '#EFF7FC'
        },
        // Mapped for backwards compatibility with existing UI components while rendering in light theme
        navy: {
          950: '#F8FAFC', // Main background (#F8FAFC)
          900: '#FFFFFF', // Card background (#FFFFFF)
          850: '#EFF7FC', // Soft background (#EFF7FC)
          800: '#F1F5F9', // Light secondary panel
          700: '#E5EDF5', // Light border (#E5EDF5)
          600: '#CBD5E1', // Border / Muted
          500: '#94A3B8',
          400: '#64748B',
          300: '#334155',
          200: '#1E293B',
          100: '#0F172A',
          dark: '#153B5B' // Dark text (#153B5B)
        },
        electric: {
          300: '#3898D8',
          400: '#3898D8', // Primary blue (#3898D8)
          500: '#2A82BF',
          600: '#3898D8', // Primary blue button (#3898D8)
          700: '#1E6A9E',
          glow: '#19A89A', // Accent teal (#19A89A)
          light: '#DCEEFF' // Light blue (#DCEEFF)
        },
        accent: {
          gold: '#F59E0B',
          amber: '#D97706',
          emerald: '#19A89A', // Accent teal (#19A89A)
          teal: '#19A89A',
          rose: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 4px 14px 0 rgba(56, 152, 216, 0.25)',
        'glow': '0 8px 25px -4px rgba(56, 152, 216, 0.35)',
        'glow-lg': '0 12px 35px -6px rgba(25, 168, 154, 0.35)',
        'travel-card': '0 4px 20px -2px rgba(21, 59, 91, 0.06)',
        'travel-card-hover': '0 12px 30px -4px rgba(56, 152, 216, 0.18)',
        'travel-nav': '0 4px 20px -2px rgba(21, 59, 91, 0.08)',
        'glass': '0 8px 30px rgba(21, 59, 91, 0.06)',
        'glass-card': '0 4px 20px -2px rgba(21, 59, 91, 0.06)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'kenburns': 'kenburns 15s ease-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        kenburns: {
          '0%': { transform: 'scale(1.0) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' }
        }
      }
    },
  },
  plugins: [],
}
