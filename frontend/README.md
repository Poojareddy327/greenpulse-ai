# GreenPulse AI - Frontend

React + Vite frontend application with modern dark theme.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Calculator.jsx
│   ├── Dashboard.jsx
│   ├── AIAdvisor.jsx
│   ├── Challenges.jsx
│   ├── Learning.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── components/      # Reusable components
│   └── Navbar.jsx
│
├── context/         # React Context
│   └── AuthContext.jsx
│
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Key Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_key
```

## Color Theme

```css
Primary: #22C55E (Green)
Secondary: #14B8A6 (Teal)
Background: #030712 (Deep Dark)
Card: #0F172A (Dark Slate)
```

## Build for Production

```bash
npm run build
```

Output in `dist/` folder.
