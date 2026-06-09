/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',      // Blue - Primary brand
        secondary: '#7C3AED',    // Purple - Secondary
        accent: '#F97316',       // Orange - Accent
        danger: '#EF4444',       // Red for high emissions
        success: '#10B981',      // Green for good results
        warning: '#F59E0B',      // Amber
        bgDark: '#020617',       // Deep dark blue-black
        bgDarker: '#010409',     // Even darker
        cardDark: '#111827',     // Card background
        cardLight: '#1F2937',    // Lighter card
        textLight: '#F8FAFC',
        textMuted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'gradient-analytics': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #F97316 100%)',
        'gradient-carbon': 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
        'gradient-dark': 'linear-gradient(180deg, #020617 0%, #010409 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #2563EB 0%, transparent 50%), radial-gradient(at 80% 80%, #7C3AED 0%, transparent 50%), radial-gradient(at 0% 50%, #F97316 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.3)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.3)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
        'glow-analytics': '0 0 40px rgba(37, 99, 235, 0.3), 0 0 80px rgba(124, 58, 237, 0.2), 0 0 120px rgba(249, 115, 22, 0.1)',
        'glow-multi': '0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(124, 58, 237, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(37, 99, 235, 0.2)',
        'neon': '0 0 5px rgba(37, 99, 235, 0.5), 0 0 10px rgba(37, 99, 235, 0.4), 0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'data-flow': 'dataFlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        dataFlow: {
          '0%, 100%': { opacity: 0.3, transform: 'translateY(0)' },
          '50%': { opacity: 1, transform: 'translateY(-10px)' },
        },
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
}
