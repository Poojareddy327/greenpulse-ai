/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C55E',
        secondary: '#14B8A6',
        bgDark: '#030712',
        cardDark: '#0F172A',
        accent: '#10B981',
        textLight: '#F8FAFC',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #030712 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.3)',
      },
    },
  },
  plugins: [],
}
