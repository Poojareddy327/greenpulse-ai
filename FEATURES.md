# 🌟 GreenPulse AI - Feature Documentation

## Core Features Overview

### 🏠 1. Home Page
**Modern Landing Experience**

**Visual Design:**
- Dark theme with green-blue gradients
- Glassmorphism cards with backdrop blur
- Animated statistics showing global impact
- Hero section with compelling CTA buttons
- Responsive grid layout

**Key Elements:**
- Real-time community stats (50K+ users, 2.5M kg CO₂ reduced)
- Feature showcase cards
- Call-to-action buttons leading to calculator and dashboard
- Smooth scroll animations with Framer Motion

---

### 📊 2. Environmental Impact Calculator
**Comprehensive Footprint Assessment**

**Input Categories:**

**Transportation:**
- Weekly car miles
- Public transport hours
- Annual flight hours

**Energy Usage:**
- Monthly electricity consumption (kWh)
- Heating usage (therms)

**Water Consumption:**
- Daily shower duration
- Weekly laundry loads

**Lifestyle:**
- Diet type (Vegan, Vegetarian, Mixed, Meat-heavy)
- Recycling habits (Always, Often, Sometimes, Rarely)

**Output Metrics:**
- Carbon footprint (kg CO₂/month)
- Water footprint (liters/month)
- Sustainability score (0-100)
- Environmental rating (Excellent/Good/Fair/Needs Improvement)
- Personalized recommendations

**Calculation Logic:**
```
Carbon = Transport + Flights + Electricity + Heating + Diet
Water = Showers + Laundry + Diet
Score = 100 - (carbon_penalty + water_penalty) + recycling_bonus
```

---

### 📈 3. Analytics Dashboard
**Visual Data Insights**

**Components:**

**Stats Overview (4 Cards):**
- Carbon Footprint with trend
- Water Usage with trend
- Sustainability Score
- Green Points earned

**Charts:**
- Monthly Trends Line Chart (Carbon & Score over 6 months)
- Category Breakdown Bar Chart (Transport, Energy, Water, Diet, Waste)

**Achievement System:**
- Badge display (5 badges)
- Unlocked vs locked states
- Visual feedback with emojis

**Data Visualization:**
- Recharts library for interactive graphs
- Custom tooltips with dark theme
- Gradient fills and animations

---

### 🤖 4. AI Eco Advisor
**Intelligent Sustainability Assistant**

**Features:**
- Chat-based interface
- Real-time recommendations
- Context-aware responses
- Quick suggestion buttons

**Suggestion Topics:**
- Carbon footprint reduction strategies
- Easy eco-friendly habits
- Weekly sustainability goals

**Response Types:**
- Step-by-step action plans
- Impact projections
- Resource links
- Practical tips

**UI Elements:**
- Message bubbles (user vs AI)
- Typing indicators
- Glassmorphism chat cards
- Quick action chips

---

### 🎯 5. Sustainability Challenges
**Gamified Eco-Actions**

**Challenge Types:**

**Active Challenges:**
- Progress tracking with visual bars
- Day counters
- Point rewards
- Participant counts

**Examples:**
1. **Plastic-Free Week** (250 pts)
   - 7-day duration
   - Track daily progress
   
2. **Zero Food Waste** (300 pts)
   - 10-day challenge
   - Composting focused
   
3. **Energy Saver** (400 pts)
   - 30-day commitment
   - 20% reduction goal

**Completed Challenges:**
- Achievement timestamps
- Points earned display
- Checkmark indicators

**Stats Display:**
- Total points accumulated
- Challenges completed count
- Active challenges count

---

### 📚 6. Eco Learning Hub
**Educational Resource Center**

**Content Categories:**

1. **Climate Basics**
   - Understanding Carbon Footprint
   - What is Climate Change?
   - Greenhouse Effect Explained

2. **Sustainable Living**
   - Zero Waste Lifestyle Guide
   - 50 Eco-Friendly Habits
   - Sustainable Shopping Tips

3. **Energy & Water**
   - Home Energy Efficiency
   - Water Conservation Strategies
   - Renewable Energy 101

4. **Transportation**
   - Low-Carbon Transport Options
   - Electric Vehicles Guide
   - Bike Commuting Benefits

**Featured Content:**
- Trending articles section
- Read time estimates
- Content type indicators (article/guide/video)
- Interactive hover effects

---

### 🔐 7. Authentication System
**User Management**

**Login Page:**
- Email/password fields
- Clean form design
- Social auth ready (Firebase)
- Animated logo

**Register Page:**
- Name, email, password fields
- Form validation
- Terms acceptance
- Redirect to dashboard

**Auth Context:**
- Persistent sessions
- LocalStorage integration
- Protected routes
- User state management

---

## 🎨 Design System

### Color Palette (NeoGreen Dark)
```css
Primary: #22C55E (Green)
Secondary: #14B8A6 (Teal)
Background: #030712 (Deep Dark)
Card: #0F172A (Dark Slate)
Accent: #10B981 (Emerald)
Text: #F8FAFC (Light)
```

### Visual Effects
- **Glassmorphism**: Backdrop blur on cards
- **Gradient Borders**: Primary to secondary color flow
- **Glow Effects**: Shadow-glow-green on hover
- **Smooth Animations**: Framer Motion throughout
- **Responsive Grid**: Mobile-first design

### Typography
- Font: Inter (system fallback)
- Headings: Bold, gradient text
- Body: Regular, light color
- Small text: 60% opacity

---

## 🛠️ Technical Implementation

### Frontend Stack
- **React 18** - Component library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend Stack
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **SQLAlchemy** - ORM
- **PostgreSQL** - Production database
- **SQLite** - Development database

### State Management
- **Context API** - Auth state
- **Local State** - Component-level
- **LocalStorage** - Session persistence

---

## 🚀 Performance Features

- Code splitting with React lazy loading
- Optimized images and SVGs
- Debounced API calls
- Cached responses
- Lazy loaded charts
- Memoized components

---

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance

---

## 📱 Responsive Design

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Adaptive Elements:**
- Collapsible navigation
- Stacked cards on mobile
- Flexible grids
- Touch-friendly buttons
- Optimized chart sizes

---

## 🔮 Future Enhancements

### Phase 2
- Real-time notifications
- Social sharing features
- Export reports (PDF)
- Mobile app (React Native)
- Offline mode

### Phase 3
- Carbon offset marketplace
- Community forums
- Team challenges
- Corporate dashboards
- API for third parties

### Phase 4
- ML-based predictions
- IoT device integration
- Blockchain carbon credits
- AR/VR experiences
- Global leaderboards
