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
        accent: '#8B5CF6',       // Purple
        warning: '#F59E0B',      // Amber
        danger: '#EF4444',       // Red
        success: '#22C55E',      // Green
        pink: '#EC4899',         // Pink
        indigo: '#6366F1',       // Indigo
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
        'gradient-pink': 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        'gradient-orange': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #10B981 0%, #06B6D4 33%, #8B5CF6 66%, #EC4899 100%)',
        'gradient-fire': 'linear-gradient(135deg, #EF4444 0%, #F59E0B 50%, #FBBF24 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0E27 0%, #050816 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #10B981 0%, transparent 50%), radial-gradient(at 80% 80%, #06B6D4 0%, transparent 50%), radial-gradient(at 0% 50%, #8B5CF6 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)',
        'glow-blue': '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)',
        'glow-orange': '0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)',
        'glow-rainbow': '0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(6, 182, 212, 0.2), 0 0 120px rgba(139, 92, 246, 0.1)',
        'glow-multi': '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(6, 182, 212, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(16, 185, 129, 0.2)',
        'neon': '0 0 5px rgba(16, 185, 129, 0.5), 0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
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
      },
    },
  },
  plugins: [],
}
