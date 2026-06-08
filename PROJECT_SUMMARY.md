# 🌍 GreenPulse AI - Carbon Footprint Awareness Platform

## Project Overview

**GreenPulse AI** is a comprehensive **Carbon Footprint Awareness Platform** that helps individuals measure, understand, and reduce their CO₂ emissions through technology, education, and action.

---

## 🎯 Primary Focus: CARBON FOOTPRINT

This platform is specifically designed to raise awareness about carbon emissions and provide tools to combat climate change.

---

## 📱 Pages & Features

### 1. **Home** (`/`)
- Hero section emphasizing carbon footprint awareness
- "Measure, Understand & Reduce Your Carbon Footprint"
- Real-time global impact statistics
- Feature showcase
- Call-to-action buttons

### 2. **Carbon Calculator** (`/calculator`)
**Calculate your personal CO₂ emissions**
- Transportation (car, flights, public transport)
- Energy usage (electricity, heating)
- Water consumption
- Diet impact (vegan to meat-heavy)
- Waste & recycling habits

**Results:**
- Carbon footprint (kg CO₂/month)
- Water footprint (liters/month)
- Sustainability score (0-100)
- Environmental rating
- Personalized reduction recommendations

### 3. **Dashboard** (`/dashboard`)
**Track your carbon emissions over time**
- Monthly carbon emission trends (line chart)
- Category breakdown (bar chart): Transport, Energy, Water, Diet, Waste
- Current stats: Carbon, Water, Score, Points
- Achievement badges (Eco Starter, Water Saver, Green Warrior, etc.)

### 4. **Carbon Comparison** (`/comparison`) ⭐ NEW
**Understand your impact in global context**
- **Regional Averages:**
  - USA: 16,000 kg CO₂/year
  - EU: 7,000 kg CO₂/year
  - China: 8,000 kg CO₂/year
  - India: 1,900 kg CO₂/year
  - Paris Target: 2,000 kg CO₂/year

- **Real-World Equivalents:**
  - 100 kg CO₂ = 400 km driving
  - 1 ton CO₂ = 1 transatlantic flight
  - 1 ton = 40 trees needed to absorb

- **Activity Carbon Values:**
  - Beef (1 kg) = 27 kg CO₂
  - Flight (1000 km) = 250 kg CO₂
  - Electricity (1 kWh) = 0.5 kg CO₂

### 5. **Carbon Offset Marketplace** (`/offsets`) ⭐ NEW
**Purchase carbon credits to offset emissions**
- **Quick Packages:** 1, 5, or 10 ton bundles
- **Verified Projects:**
  - 🌳 Reforestation (Amazon) - $12/ton
  - 💨 Wind Energy (Texas) - $15/ton
  - ☀️ Solar Power (India) - $14/ton
  - 🌊 Ocean Cleanup (Pacific) - $18/ton
- Gold Standard & VCS certified
- Real impact metrics
- Shopping cart & checkout

### 6. **AI Carbon Advisor** (`/ai-advisor`)
**Get personalized carbon reduction tips**
- Chat interface with AI
- Ask questions about reducing carbon footprint
- Get specific recommendations
- Quick suggestion chips
- Context-aware responses

### 7. **Challenges** (`/challenges`)
**Gamified carbon reduction actions**
- Active challenges (Plastic-Free Week, Zero Food Waste, Energy Saver)
- Progress tracking
- Points & rewards system
- Participant counts
- Completed achievements

### 8. **Learning Hub** (`/learning`)
**Climate education & carbon awareness**
- Featured articles on carbon footprint
- Categories:
  - Climate Basics
  - Sustainable Living
  - Energy & Water
  - Transportation
- Read time estimates
- Trending content

---

## 🎨 Design Theme: NeoGreen Dark

### Color Palette
- Primary: `#22C55E` (Green)
- Secondary: `#14B8A6` (Teal)
- Background: `#030712` (Deep Dark)
- Card: `#0F172A` (Dark Slate)
- Accent: `#10B981` (Emerald)
- Text: `#F8FAFC` (Light)

### Visual Style
- Glassmorphism effects
- Smooth animations (Framer Motion)
- Green glow shadows
- Rounded corners
- Gradient text
- Responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Router** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - API calls

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **SQLAlchemy** - ORM (ready)
- **PostgreSQL** - Database (ready)

---

## 📊 Carbon Calculation Logic

### Transportation
```
Carbon = (car_miles × 0.4 × 4) + (flights × 90 / 12)
```

### Energy
```
Carbon = (electricity_kWh × 0.5) + (heating_therms × 5.3)
```

### Diet
```
Carbon = diet_factor × 30
- Vegan: 1.5
- Vegetarian: 1.7
- Mixed: 2.5
- Meat-heavy: 3.3
```

### Water
```
Water = (shower_min × 9 × 30) + (laundry × 40 × 4)
```

### Score
```
Score = 100 - (carbon_penalty + water_penalty) + recycling_bonus
```

---

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Backend
```bash
cd backend
python -m uvicorn main:app --reload
# Opens at http://127.0.0.1:8000
# API docs at http://127.0.0.1:8000/docs
```

---

## 📁 Project Structure

```
greenpulse-ai/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Calculator.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CarbonComparison.jsx ⭐ NEW
│   │   │   ├── CarbonOffsets.jsx ⭐ NEW
│   │   │   ├── AIAdvisor.jsx
│   │   │   ├── Challenges.jsx
│   │   │   ├── Learning.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
├── README.md
├── CARBON_FEATURES.md ⭐ NEW
└── PROJECT_SUMMARY.md ⭐ NEW
```

---

## 🌟 Key Differentiators

1. **Carbon-First Focus** - Every feature emphasizes CO₂ awareness
2. **Real Offset Marketplace** - Actually purchase carbon credits
3. **Global Comparison** - See yourself in worldwide context
4. **AI-Powered** - Personalized carbon reduction advice
5. **Educational** - Learn about climate while taking action
6. **Gamified** - Make carbon reduction engaging
7. **Beautiful UX** - Modern dark theme with smooth animations
8. **Comprehensive** - Calculator, tracking, comparison, offsets, education

---

## 📈 Carbon Metrics Tracked

### Personal Metrics
- Monthly CO₂ emissions (kg)
- Annual CO₂ projection
- Carbon per category
- Water footprint
- Sustainability score

### Comparisons
- vs Global average (4,800 kg/year)
- vs Regional averages
- vs Paris Agreement target (2,000 kg/year)
- vs Previous months

### Progress
- Emission reduction %
- Challenges completed
- Badges earned
- Carbon offset purchased
- Days carbon neutral

---

## 🎯 Target Audience

- 🌱 **Environmentally Conscious Individuals** - Want to reduce carbon
- 📊 **Data-Driven Users** - Want to track and measure impact
- 🎓 **Students & Educators** - Learning about climate change
- 🏢 **Companies** - Employee sustainability programs
- 🌍 **Climate Activists** - Taking personal action
- 💚 **General Public** - Raising awareness

---

## 🔮 Future Enhancements

### Phase 2
- [ ] Real payment integration for offsets
- [ ] Blockchain carbon credit tracking
- [ ] Carbon neutral certification
- [ ] Corporate carbon tracking
- [ ] API for third-party apps

### Phase 3
- [ ] IoT device integration (smart meters)
- [ ] Automated carbon tracking
- [ ] Mobile apps (iOS/Android)
- [ ] Carbon trading platform
- [ ] ML-based prediction models

---

## 📝 Documentation Files

- **README.md** - Main project overview
- **SETUP.md** - Detailed setup instructions
- **QUICKSTART.md** - 5-minute quick start
- **FEATURES.md** - Complete feature documentation
- **ARCHITECTURE.md** - Technical architecture
- **DEPLOYMENT.md** - Production deployment guide
- **CARBON_FEATURES.md** ⭐ - Carbon-specific features
- **PROJECT_SUMMARY.md** ⭐ - This file
- **TEST_GUIDE.md** - Testing checklist
- **CONTRIBUTING.md** - Contribution guidelines

---

## ✅ Status: COMPLETE & RUNNING

- ✅ Frontend server running on http://localhost:3000
- ✅ Backend API running on http://127.0.0.1:8000
- ✅ 8 fully functional pages
- ✅ Carbon calculator with real algorithms
- ✅ Dashboard with data visualization
- ✅ Carbon comparison tool with global data
- ✅ Carbon offset marketplace
- ✅ AI advisor with chat interface
- ✅ Challenges system
- ✅ Learning hub
- ✅ Authentication system
- ✅ Responsive design
- ✅ Modern dark theme
- ✅ Smooth animations

---

**GreenPulse AI - Empowering Carbon Awareness Through Technology** 🌍💚

Made with ❤️ for a carbon-neutral future
