import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car,
  Zap,
  Droplets,
  Utensils,
  Trash2,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Check,
  Info,
  Plane,
  Bus,
  Flame,
  TreePine,
  Award,
  Gauge,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Sliders,
} from 'lucide-react'
import AnimatedStats from '../components/AnimatedStats'
import ParticleBackground from '../components/ParticleBackground'
import CSS3DCard from '../components/CSS3DCard'

const Calculator = () => {
  // Preset Personas
  const personas = {
    student: {
      label: 'Student / Minimalist',
      icon: '🎓',
      desc: 'Bicycle/transit, shared apartment, vegetarian',
      carMiles: 15,
      publicTransport: 8,
      flights: 0,
      electricity: 120,
      heating: 15,
      showerMinutes: 6,
      laundry: 1,
      diet: 'vegetarian',
      recycling: 'always',
    },
    city: {
      label: 'Urban Professional',
      icon: '💼',
      desc: 'Hybrid commute, 2 BHK flat, balanced diet',
      carMiles: 65,
      publicTransport: 3,
      flights: 6,
      electricity: 280,
      heating: 35,
      showerMinutes: 9,
      laundry: 2,
      diet: 'mixed',
      recycling: 'often',
    },
    family: {
      label: 'Family Household',
      icon: '🏡',
      desc: 'Daily car driving, detached house, AC cooling',
      carMiles: 140,
      publicTransport: 0,
      flights: 14,
      electricity: 480,
      heating: 60,
      showerMinutes: 14,
      laundry: 5,
      diet: 'meat-heavy',
      recycling: 'sometimes',
    },
  }

  // Unit settings: Miles vs Kilometers
  const [unitSystem, setUnitSystem] = useState('miles') // 'miles' | 'km'

  // Input State initialized with realistic Urban Professional values
  const [formData, setFormData] = useState({
    carMiles: 50,
    publicTransport: 4,
    flights: 4,
    electricity: 250,
    heating: 30,
    showerMinutes: 8,
    laundry: 2,
    diet: 'mixed',
    recycling: 'often',
  })

  const [activePersona, setActivePersona] = useState('city')
  const [isSyncingApi, setIsSyncingApi] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Real-time calculation formula (runs on every slider adjustment)
  const calculationResult = useMemo(() => {
    // Miles converted if KM chosen
    const effectiveMiles = unitSystem === 'km' ? formData.carMiles * 0.621371 : formData.carMiles

    // Carbon breakdown (kg CO₂ / month)
    const carbonTransport = (effectiveMiles || 0) * 0.4 * 4 // weekly to monthly
    const carbonTransit = (formData.publicTransport || 0) * 0.08 * 4
    const carbonFlights = ((formData.flights || 0) * 90) / 12 // annual to monthly
    const carbonElectricity = (formData.electricity || 0) * 0.5
    const carbonHeating = (formData.heating || 0) * 5.3

    const dietFactors = { vegan: 1.5, vegetarian: 1.7, mixed: 2.5, 'meat-heavy': 3.3 }
    const carbonDiet = (dietFactors[formData.diet] || 2.5) * 30

    const totalCarbon =
      carbonTransport +
      carbonFlights +
      carbonElectricity +
      carbonHeating +
      carbonDiet -
      carbonTransit

    // Water breakdown (Liters / month)
    const waterShower = (formData.showerMinutes || 0) * 9 * 30
    const waterLaundry = (formData.laundry || 0) * 40 * 4
    const waterDiet = (dietFactors[formData.diet] || 2.5) * 1000
    const totalWater = waterShower + waterLaundry + waterDiet

    // Score calculation (0 to 100 scale)
    const carbonPenalty = Math.min(totalCarbon / 12, 50)
    const waterPenalty = Math.min(totalWater / 1200, 30)
    const recyclingBonus =
      { always: 12, often: 8, sometimes: 4, rarely: 0 }[formData.recycling] || 0
    const score = Math.min(
      100,
      Math.max(15, Math.round(100 - carbonPenalty - waterPenalty + recyclingBonus))
    )

    // Benchmark comparison (Average citizen = 420 kg CO₂ / mo)
    const nationalAverage = 420
    const diffPercent = Math.round(((nationalAverage - totalCarbon) / nationalAverage) * 100)

    // Dynamic tailored recommendations
    const recommendations = []
    if (carbonTransport > 60) {
      recommendations.push(
        'Replacing 1-2 driving days with metro or cycling cuts ~45 kg CO₂ monthly.'
      )
    }
    if (formData.electricity > 300) {
      recommendations.push(
        'Setting AC to 24°C and switching to LED fixtures saves ~30% on electricity emissions.'
      )
    }
    if (formData.showerMinutes > 10) {
      recommendations.push(
        'Shortening daily showers to 6-7 minutes saves over 1,200 liters of water every month.'
      )
    }
    if (formData.diet === 'meat-heavy') {
      recommendations.push(
        'Trying 2 plant-forward dinners each week lowers dietary emissions by ~25%.'
      )
    }
    if (recommendations.length === 0) {
      recommendations.push(
        'Outstanding footprint! Maintain your low-carbon habits and inspire others.'
      )
    }

    return {
      carbon: Math.max(20, Math.round(totalCarbon)),
      water: Math.round(totalWater),
      score,
      treesNeeded: Math.ceil(totalCarbon / 22),
      diffPercent,
      isGreener: diffPercent >= 0,
      rating:
        score >= 80
          ? 'Excellent'
          : score >= 65
            ? 'Good'
            : score >= 45
              ? 'Fair'
              : 'Needs Improvement',
      ratingColor:
        score >= 80
          ? 'text-emerald-400'
          : score >= 65
            ? 'text-primary'
            : score >= 45
              ? 'text-amber-400'
              : 'text-red-400',
      breakdown: {
        transport: Math.max(10, Math.round(carbonTransport + carbonFlights)),
        energy: Math.max(10, Math.round(carbonElectricity + carbonHeating)),
        diet: Math.max(10, Math.round(carbonDiet)),
        water: Math.max(5, Math.round(totalWater / 500)),
      },
      recommendations,
    }
  }, [formData, unitSystem])

  // Select Quick Persona
  const applyPersona = key => {
    setActivePersona(key)
    setFormData(personas[key])
  }

  // Handle generic slider / input change
  const handleSliderChange = (name, val) => {
    setActivePersona(null)
    setFormData(prev => ({ ...prev, [name]: parseFloat(val) || 0 }))
  }

  // Dedicated Diet selection
  const handleDietSelect = dietId => {
    setActivePersona(null)
    setFormData(prev => ({ ...prev, diet: dietId }))
  }

  // Dedicated Recycling selection
  const handleRecyclingSelect = recyclingId => {
    setActivePersona(null)
    setFormData(prev => ({ ...prev, recycling: recyclingId }))
  }

  // Handle API sync (optional backend post)
  const saveToDashboard = async () => {
    setIsSyncingApi(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://greenpulse-api-wv14.onrender.com'
      await fetch(`${API_URL}/api/calculate-impact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carMiles: parseFloat(formData.carMiles) || 0,
          publicTransport: parseFloat(formData.publicTransport) || 0,
          flights: parseFloat(formData.flights) || 0,
          electricity: parseFloat(formData.electricity) || 0,
          heating: parseFloat(formData.heating) || 0,
          showerMinutes: parseFloat(formData.showerMinutes) || 0,
          laundry: parseFloat(formData.laundry) || 0,
          diet: formData.diet,
          recycling: formData.recycling,
        }),
      }).catch(e => console.log('Backend sync offline fallback active'))

      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } finally {
      setIsSyncingApi(false)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 relative overflow-hidden">
      <ParticleBackground />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* ============================================================ */}
        {/* HEADER SECTION */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Real-Time Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your{' '}
            <span className="text-primary drop-shadow-[0_0_25px_rgba(37,99,235,0.8)]">
              Carbon Footprint & Impact
            </span>
          </h1>
          <p className="text-textLight max-w-2xl mx-auto text-sm md:text-base">
            Adjust the sliders below to see your monthly carbon and water footprint update live in
            real time.
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* 1-CLICK QUICK PERSONAS BAR */}
        {/* ============================================================ */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent" />
            <span>Quick Start with a Lifestyle Profile:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {Object.entries(personas).map(([key, p]) => (
              <button
                key={key}
                onClick={() => applyPersona(key)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 border ${
                  activePersona === key
                    ? 'bg-gradient-primary text-white border-primary shadow-glow-blue'
                    : 'bg-white/5 text-textLight/80 border-white/10 hover:border-white/20'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center bg-bgDark rounded-xl p-1 border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setUnitSystem('miles')}
              className={`px-3 py-1 rounded-lg transition ${unitSystem === 'miles' ? 'bg-primary text-white' : 'text-textMuted'}`}
            >
              Miles
            </button>
            <button
              onClick={() => setUnitSystem('km')}
              className={`px-3 py-1 rounded-lg transition ${unitSystem === 'km' ? 'bg-primary text-white' : 'text-textMuted'}`}
            >
              KM
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2-COLUMN MAIN LAYOUT: SLIDERS (LEFT) & LIVE RESULT (RIGHT) */}
        {/* ============================================================ */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: INTERACTIVE SLIDERS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Transportation */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 text-primary border-b border-white/10 pb-3">
                <Car className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">1. Transportation & Mobility</h3>
              </div>

              {/* Car Driving Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Car Travel per Week</span>
                  <span className="text-primary font-bold text-sm bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                    {formData.carMiles} {unitSystem} / week
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={unitSystem === 'km' ? '500' : '300'}
                  step="5"
                  value={formData.carMiles}
                  onChange={e => handleSliderChange('carMiles', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>0 (No Car)</span>
                  <span>50 (Normal Commute)</span>
                  <span>150+ (Highway)</span>
                </div>
              </div>

              {/* Public Transit Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Public Transit (Bus / Metro)</span>
                  <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {formData.publicTransport} hrs / week
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={formData.publicTransport}
                  onChange={e => handleSliderChange('publicTransport', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>0 hrs</span>
                  <span>5 hrs (Daily Commute)</span>
                  <span>15+ hrs</span>
                </div>
              </div>

              {/* Flights Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Airplane Flight Hours per Year</span>
                  <span className="text-amber-400 font-bold text-sm bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {formData.flights} flight hrs / yr
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={formData.flights}
                  onChange={e => handleSliderChange('flights', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>0 (No Flights)</span>
                  <span>4 hrs (~1 Domestic)</span>
                  <span>15+ hrs (International)</span>
                </div>
              </div>
            </div>

            {/* 2. Energy Usage */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 text-yellow-400 border-b border-white/10 pb-3">
                <Zap className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">2. Home Energy</h3>
              </div>

              {/* Electricity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Monthly Electricity (kWh)</span>
                  <span className="text-yellow-400 font-bold text-sm bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/20">
                    {formData.electricity} kWh / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="700"
                  step="10"
                  value={formData.electricity}
                  onChange={e => handleSliderChange('electricity', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>100 kWh (Studio)</span>
                  <span>250 kWh (2-BHK)</span>
                  <span>500+ kWh (House w/ AC)</span>
                </div>
              </div>

              {/* Heating Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Gas / Water Heating Intensity</span>
                  <span className="text-orange-400 font-bold text-sm bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                    {formData.heating} therms / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={formData.heating}
                  onChange={e => handleSliderChange('heating', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>Low / Warm Climate</span>
                  <span>Moderate Heating</span>
                  <span>Heavy Winter</span>
                </div>
              </div>
            </div>

            {/* 3. Water Usage */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 text-cyan-400 border-b border-white/10 pb-3">
                <Droplets className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">3. Water Footprint</h3>
              </div>

              {/* Shower Minutes Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Daily Shower Duration</span>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    {formData.showerMinutes} minutes / day
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={formData.showerMinutes}
                  onChange={e => handleSliderChange('showerMinutes', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>4 min (Quick Wash)</span>
                  <span>8 min (Average)</span>
                  <span>18+ min (Long Flow)</span>
                </div>
              </div>

              {/* Laundry Loads Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-textLight font-medium">Laundry Machine Loads / Week</span>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    {formData.laundry} loads / wk
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={formData.laundry}
                  onChange={e => handleSliderChange('laundry', e.target.value)}
                  className="w-full h-2 bg-bgDark rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* 4. Diet & Recycling Cards */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5 text-emerald-400 border-b border-white/10 pb-3">
                <Utensils className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">4. Diet & Circular Habits</h3>
              </div>

              {/* Diet Selection Cards */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-white">Choose Your Primary Diet:</label>
                  <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
                    Current: {formData.diet}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    {
                      id: 'vegan',
                      label: 'Vegan',
                      icon: '🌱',
                      tip: '-55% CO₂',
                      activeColor:
                        'border-emerald-500 bg-emerald-500/25 ring-2 ring-emerald-400 text-white',
                    },
                    {
                      id: 'vegetarian',
                      label: 'Vegetarian',
                      icon: '🧀',
                      tip: '-40% CO₂',
                      activeColor:
                        'border-amber-400 bg-amber-400/25 ring-2 ring-amber-300 text-white',
                    },
                    {
                      id: 'mixed',
                      label: 'Mixed',
                      icon: '🥗',
                      tip: 'Baseline',
                      activeColor: 'border-primary bg-primary/25 ring-2 ring-primary text-white',
                    },
                    {
                      id: 'meat-heavy',
                      label: 'Meat Heavy',
                      icon: '🥩',
                      tip: '+35% CO₂',
                      activeColor: 'border-red-500 bg-red-500/25 ring-2 ring-red-400 text-white',
                    },
                  ].map(d => {
                    const isSelected = formData.diet === d.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleDietSelect(d.id)}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer relative select-none ${
                          isSelected
                            ? `${d.activeColor} shadow-lg font-bold scale-[1.03]`
                            : 'border-white/10 bg-bgDark/60 text-textLight/70 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        <div className="text-2xl mb-1">{d.icon}</div>
                        <div className="text-xs font-bold truncate">{d.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 font-semibold ${isSelected ? 'text-white' : 'text-emerald-400'}`}
                        >
                          {d.tip}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Recycling Selection Chips */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-white">
                    How Consistently Do You Recycle?
                  </label>
                  <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
                    Current: {formData.recycling}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'always', label: 'Always (+12 pts)', icon: '♻️' },
                    { id: 'often', label: 'Often (+8 pts)', icon: '👍' },
                    { id: 'sometimes', label: 'Sometimes (+4 pts)', icon: '📦' },
                    { id: 'rarely', label: 'Rarely (0 pts)', icon: '🗑️' },
                  ].map(r => {
                    const isSelected = formData.recycling === r.id
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRecyclingSelect(r.id)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer truncate select-none ${
                          isSelected
                            ? 'border-primary bg-primary/30 text-white font-bold ring-2 ring-primary shadow-glow-blue scale-[1.02]'
                            : 'border-white/10 bg-bgDark/60 text-textLight/70 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        {r.icon} {r.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE RESULT & BENCHMARK SCORE (5 COLS STICKY) */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            {/* Live Score Dial Card */}
            <CSS3DCard>
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-cardDark/95 via-cardDark/85 to-bgDark text-center relative overflow-hidden shadow-2xl">
                {/* Radial Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-textMuted mb-4">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                  <span>Real-Time Green Score</span>
                </div>

                {/* Animated Circular Progress Gauge */}
                <div className="relative flex justify-center items-center my-2">
                  <svg
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    className="transform -rotate-90"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="18"
                    />
                    {/* Glowing Progress Arc */}
                    <motion.circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="url(#calculatorGradient)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray="565.48"
                      initial={{ strokeDashoffset: 565.48 }}
                      animate={{
                        strokeDashoffset: 565.48 - (565.48 * calculationResult.score) / 100,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="calculatorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Score Number */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <motion.span
                      key={calculationResult.score}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-white tracking-tighter drop-shadow-lg"
                    >
                      {calculationResult.score}
                    </motion.span>
                    <span className="text-xs uppercase tracking-widest font-bold text-textMuted -mt-1">
                      out of 100
                    </span>
                    <span className={`text-sm font-bold mt-1 ${calculationResult.ratingColor}`}>
                      {calculationResult.rating}
                    </span>
                  </div>
                </div>

                {/* Benchmark Pill */}
                <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-textMuted">National Citizen Average:</span>
                    <span className="text-white font-semibold">420 kg CO₂</span>
                  </div>
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-textLight">Your Footprint:</span>
                    <span className="text-primary">{calculationResult.carbon} kg CO₂ / mo</span>
                  </div>
                  <div
                    className={`pt-1 text-[11px] font-bold ${calculationResult.isGreener ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {calculationResult.isGreener
                      ? `🎉 ${calculationResult.diffPercent}% cleaner than the national average!`
                      : `⚠️ ${Math.abs(calculationResult.diffPercent)}% higher than the national baseline.`}
                  </div>
                </div>

                {/* Animated Stats Cards */}
                <div className="mt-6">
                  <AnimatedStats
                    carbon={calculationResult.carbon}
                    water={calculationResult.water}
                    trees={calculationResult.treesNeeded}
                    energy={formData.electricity}
                  />
                </div>

                {/* Recommendations */}
                <div className="mt-6 text-left space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" /> High-Impact Reductions:
                  </h4>
                  {calculationResult.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-textLight/90"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                {/* Save / Sync Action Button */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={saveToDashboard}
                    disabled={isSyncingApi}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-sm shadow-glow-analytics hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSyncingApi ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : savedSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    <span>
                      {savedSuccess
                        ? 'Saved to Your Profile! 🎉'
                        : 'Calculate & Save Impact to Dashboard'}
                    </span>
                  </button>
                </div>
              </div>
            </CSS3DCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
