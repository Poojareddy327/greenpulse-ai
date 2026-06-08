/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',      // Emerald green
        secondary: '#06B6D4',    // Cyan blue
        accent: '#8B5CF6',       // Purple accent
        warning: '#F59E0B',      // Amber
        success: '#22C55E',      // Green
        bgDark: '#0A0E27',       // Deep dark blue
        bgDarker: '#050816',     // Even darker
        cardDark: '#1A1F3A',     // Card background
        cardLight: '#252B48',    // Lighter card
        textLight: '#F1F5F9',
        textMuted: '#94A3B8',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-blue': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0E27 0%, #050816 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #10B981 0%, transparent 50%), radial-gradient(at 80% 80%, #06B6D4 0%, transparent 50%), radial-gradient(at 0% 50%, #8B5CF6 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
        'glow-blue': '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
        'glow-rainbow': '0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(6, 182, 212, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(16, 185, 129, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
