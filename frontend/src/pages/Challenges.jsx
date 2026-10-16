import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, Target, CheckCircle, Clock, Award, Users, Flame, Camera, 
  Sparkles, AlertCircle, ShieldCheck, Gift, Leaf, TreePine, Package, 
  Upload, X, ArrowRight, RefreshCw, Check, Lock, ChevronRight, Video,
  Image as ImageIcon, RefreshCcw
} from 'lucide-react'

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('streaks')
  const [streakCount, setStreakCount] = useState(14)
  const [isStreakCompletedToday, setIsStreakCompletedToday] = useState(false)
  const [freezeCount, setFreezeCount] = useState(1)
  const [ecoPoints, setEcoPoints] = useState(1850)
  
  // Snap Camera Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDimension, setSelectedDimension] = useState('plastic')
  const [inputMode, setInputMode] = useState('camera') // 'camera' | 'upload' | 'presets'
  const [isCameraLive, setIsCameraLive] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [plantModalOpen, setPlantModalOpen] = useState(false)
  
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  // Dimensions of practical daily eco actions
  const dimensions = [
    {
      id: 'plastic',
      name: 'Zero Single-Use Plastic',
      icon: '🥤',
      example: 'Steel/copper bottle, cloth tote bag, or reusable cup',
      co2: '0.35 kg',
      sampleImg: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
      sampleLabel: 'Stainless Steel Water Bottle on Desk'
    },
    {
      id: 'commute',
      name: 'Green Mobility / Commute',
      icon: '🚲',
      example: 'Bicycle handlebars, walking sneakers, or metro/bus ticket',
      co2: '1.20 kg',
      sampleImg: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
      sampleLabel: 'Bicycle Commute to Work'
    },
    {
      id: 'food',
      name: 'Zero Food Waste / Eco Meal',
      icon: '🍱',
      example: 'Clean plate after meal, plant-based bowl, or homemade lunchbox',
      co2: '0.85 kg',
      sampleImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      sampleLabel: 'Plant-Based Zero-Waste Lunch'
    },
    {
      id: 'energy',
      name: 'Power Saving & Nature Care',
      icon: '⚡',
      example: 'Working with daylight, AC at 24°C, or watering balcony plants',
      co2: '0.60 kg',
      sampleImg: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      sampleLabel: 'Tending to Balcony Plants'
    }
  ]

  // Start Live Webcam Stream
  const startLiveCamera = async () => {
    setCameraError(null)
    setIsCameraLive(false)
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API is not supported in this browser. Please use file upload.')
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(e => console.warn('Video play error:', e))
      }
      setIsCameraLive(true)
    } catch (err) {
      console.warn('Webcam access error:', err)
      setCameraError('Camera access was not granted or no camera was found. You can upload an image or choose one of the demo snapshots below.')
      setIsCameraLive(false)
    }
  }

  // Stop Webcam Stream
  const stopLiveCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCameraLive(false)
  }

  // Capture Photo from Live Webcam
  const captureLivePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      stopLiveCamera()
      setPhotoPreview(dataUrl)
      runAiVerification()
    }
  }

  // Manage Camera on modal open / mode change
  useEffect(() => {
    if (modalOpen && inputMode === 'camera' && !photoPreview) {
      startLiveCamera()
    } else {
      stopLiveCamera()
    }
    return () => {
      stopLiveCamera()
    }
  }, [modalOpen, inputMode, photoPreview])

  // Past EcoSnap Gallery
  const [snapTimeline, setSnapTimeline] = useState([
    {
      id: 1,
      day: 14,
      date: 'Today, 9:15 AM',
      dimension: 'Zero Single-Use Plastic',
      icon: '🥤',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
      caption: 'Filled up my 1L copper bottle before leaving home! 💧',
      co2Saved: '0.35 kg CO₂',
      status: 'Verified Real Proof'
    },
    {
      id: 2,
      day: 13,
      date: 'Yesterday, 8:40 AM',
      dimension: 'Green Mobility / Commute',
      icon: '🚲',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80',
      caption: 'Pedaled 4 km to university today instead of a cab 🚲',
      co2Saved: '1.20 kg CO₂',
      status: 'Verified Real Proof'
    },
    {
      id: 3,
      day: 12,
      date: '2 days ago, 1:20 PM',
      dimension: 'Zero Food Waste / Eco Meal',
      icon: '🍱',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
      caption: 'Clean plate club! 100% finished without throwing anything away 🌱',
      co2Saved: '0.85 kg CO₂',
      status: 'Verified Real Proof'
    },
    {
      id: 4,
      day: 11,
      date: '3 days ago, 6:00 PM',
      dimension: 'Power Saving & Nature Care',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=80',
      caption: 'Watered my terrace jade and snake plants with recycled water 🪴',
      co2Saved: '0.60 kg CO₂',
      status: 'Verified Real Proof'
    }
  ])

  // Active Challenges
  const activeChallenges = [
    {
      id: 1,
      title: 'Plastic-Free Week',
      description: 'Avoid single-use plastics for 7 consecutive days',
      progress: 4,
      goal: 7,
      points: 250,
      participants: 1250,
      icon: '🌊',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Zero Food Waste Sprint',
      description: 'Compost scraps and finish every meal without waste',
      progress: 5,
      goal: 10,
      points: 300,
      participants: 890,
      icon: '🍎',
      color: 'green'
    },
    {
      id: 3,
      title: 'Energy Saver Challenge',
      description: 'Reduce home electricity usage by 20% for 30 days',
      progress: 15,
      goal: 30,
      points: 400,
      participants: 2100,
      icon: '⚡',
      color: 'yellow'
    }
  ]

  // Completed Challenges
  const completedChallenges = [
    {
      id: 4,
      title: 'Water Conservation Hero',
      description: 'Saved over 500L of water with bucket baths & aerators',
      points: 200,
      completedDate: '2024-05-20',
      icon: '💧'
    },
    {
      id: 5,
      title: 'Public Transport Champion',
      description: 'Used metro and bus for 14 continuous days',
      points: 350,
      completedDate: '2024-05-15',
      icon: '🚌'
    }
  ]

  // Milestones Ladder
  const milestones = [
    {
      days: 7,
      title: 'Bronze Eco Spark',
      reward: 'Flame Master Badge & +250 Points',
      icon: '🥉',
      unlocked: true,
      current: false
    },
    {
      days: 30,
      title: 'Silver Planet Guardian',
      reward: 'Digital Sustainability Certificate + 2 Freezes',
      icon: '🥈',
      unlocked: false,
      current: true
    },
    {
      days: 60,
      title: 'Gold Nature Blazer',
      reward: 'Organic Bamboo Kit & Exclusive GreenPulse Merch',
      icon: '🥇',
      unlocked: false,
      current: false
    },
    {
      days: 100,
      title: '100-DAY GRAND EARTH CHAMPION',
      reward: '🪴 Real Live Indoor Plant Delivered to Doorstep + 🌳 Tree Planted in Your Name (GPS Cert)',
      icon: '👑',
      unlocked: false,
      current: false,
      isGrand: true
    }
  ]

  // Handle Photo selection from camera/file
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        stopLiveCamera()
        setPhotoPreview(reader.result)
        runAiVerification()
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Quick Sample Photo Test
  const handleSelectSample = (sampleUrl) => {
    stopLiveCamera()
    setPhotoPreview(sampleUrl)
    runAiVerification()
  }

  // AI Verification Simulation
  const runAiVerification = () => {
    setIsScanning(true)
    setScanResult(null)
    setTimeout(() => {
      setIsScanning(false)
      const currentDim = dimensions.find(d => d.id === selectedDimension)
      setScanResult({
        verified: true,
        matchScore: '98.4%',
        detectedItem: currentDim?.name || 'Sustainable Action',
        co2Saved: currentDim?.co2 || '0.50 kg',
        timestamp: 'Live Camera Capture'
      })
    }, 1800)
  }

  // Confirm and Post Snap
  const handlePostSnap = () => {
    if (!scanResult?.verified) return

    const newDay = streakCount + 1
    setStreakCount(newDay)
    setIsStreakCompletedToday(true)
    setEcoPoints(prev => prev + 50)

    const currentDim = dimensions.find(d => d.id === selectedDimension)
    const newSnap = {
      id: Date.now(),
      day: newDay,
      date: 'Just now',
      dimension: currentDim?.name,
      icon: currentDim?.icon,
      image: photoPreview,
      caption: `Day ${newDay} EcoSnap completed! Verified real-life action 🌿`,
      co2Saved: `${currentDim?.co2} CO₂`,
      status: 'Verified Real Proof'
    }

    setSnapTimeline([newSnap, ...snapTimeline])
    setModalOpen(false)
    setPhotoPreview(null)
    setScanResult(null)
    stopLiveCamera()
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-analytics rounded-2xl shadow-glow-analytics">
              <Flame className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              EcoStreak <span className="text-accent">&</span> Challenges
            </h1>
          </div>
          <p className="text-textLight max-w-2xl mx-auto text-sm md:text-base">
            Snap daily proof of practical green habits with live camera, protect your streak, and receive a <span className="text-emerald-400 font-semibold">Real Live Plant</span> at 100 days! 🪴🔥
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* SNAPCHAT-STYLE ECOSTREAK HERO CARD */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative glass-card p-6 md:p-8 neon-border overflow-hidden bg-gradient-to-br from-cardDark/90 via-cardDark/70 to-bgDark"
          style={{
            boxShadow: '0 0 50px rgba(249, 115, 22, 0.25), 0 0 80px rgba(37, 99, 235, 0.15)'
          }}
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Streak Counter & Status */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Snapchat-Style EcoStreak
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <motion.div 
                  animate={{ scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40 border border-orange-300/30"
                >
                  <span className="text-4xl md:text-5xl">🔥</span>
                </motion.div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                      {streakCount}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-accent">DAYS</span>
                  </div>
                  <p className="text-xs md:text-sm text-textMuted flex items-center gap-1.5 mt-0.5">
                    {isStreakCompletedToday ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Today's Streak Secured!
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Expires in 06h 42m (Action Pending)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Badges / Freezes */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-xs">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-textLight">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Streak Freeze: <b>{freezeCount}</b> available</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-textLight">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Total Eco Points: <b>{ecoPoints}</b></span>
                </div>
              </div>
            </div>

            {/* Middle: 100-Day Real Plant Progress Bar */}
            <div className="lg:col-span-4 bg-cardDark/60 rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" /> 100-Day Grand Prize:
                </span>
                <span className="text-emerald-400 font-bold">{streakCount}/100 Days ({streakCount}%)</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-3.5 bg-bgDark rounded-full p-0.5 border border-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(streakCount, 100)}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full relative"
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-textMuted pt-1">
                <span>Day 1 🌱</span>
                <span>Day 30 📜</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  Day 100 🪴 (Real Plant Shipped!)
                </span>
              </div>

              <button
                onClick={() => setPlantModalOpen(true)}
                className="w-full text-center text-xs text-primary hover:text-primary/80 transition underline pt-1 block cursor-pointer"
              >
                How does 100-Day Plant Delivery work? →
              </button>
            </div>

            {/* Right: Camera Action CTA */}
            <div className="lg:col-span-3 text-center lg:text-right flex flex-col justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setModalOpen(true)
                  setInputMode('camera')
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-bold text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isStreakCompletedToday ? "Snap Another Action 📸" : "Snap Today's Eco Action 📸"}
              </motion.button>
              
              <p className="text-[11px] text-textMuted text-center">
                Live Camera Snap or Upload • Real Proof Only
              </p>
            </div>

          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* TABS NAVIGATION */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TabButton
            active={activeTab === 'streaks'}
            onClick={() => setActiveTab('streaks')}
            icon="📸"
          >
            My EcoSnap Journal ({snapTimeline.length})
          </TabButton>
          <TabButton
            active={activeTab === 'rewards'}
            onClick={() => setActiveTab('rewards')}
            icon="🪴"
          >
            100-Day Rewards Ladder
          </TabButton>
          <TabButton
            active={activeTab === 'active'}
            onClick={() => setActiveTab('active')}
            icon="🎯"
          >
            Active Challenges ({activeChallenges.length})
          </TabButton>
          <TabButton
            active={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
            icon="✅"
          >
            Completed ({completedChallenges.length})
          </TabButton>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: SNAPCHAT-STYLE ECOSNAP JOURNAL */}
        {/* ============================================================ */}
        {activeTab === 'streaks' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-cardDark/40 p-4 rounded-xl border border-white/5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📸</span> Verified Daily EcoSnaps
                </h3>
                <p className="text-xs text-textMuted">
                  Every photo is analyzed by GreenPulse Vision AI for practical real-life proof before counting towards your streak.
                </p>
              </div>

              <button
                onClick={() => {
                  setModalOpen(true)
                  setInputMode('camera')
                }}
                className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" /> Snap Today's Habit
              </button>
            </div>

            {/* Grid of Snaps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {snapTimeline.map((snap) => (
                <motion.div
                  key={snap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col group relative"
                >
                  {/* Image with Snapchat-like Sticker Overlay */}
                  <div className="relative h-64 overflow-hidden bg-bgDark">
                    <img
                      src={snap.image}
                      alt={snap.dimension}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-transparent to-black/40" />

                    {/* Snapchat Top Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-accent flex items-center gap-1 border border-accent/30">
                        🔥 DAY {snap.day}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {snap.status}
                      </span>
                    </div>

                    {/* Snapchat Bottom Sticker */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white">
                        <span>{snap.icon}</span>
                        <span className="truncate">{snap.dimension}</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                        Saved: {snap.co2Saved}
                      </div>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-textLight/90 leading-relaxed italic mb-3">
                      "{snap.caption}"
                    </p>
                    <div className="text-[11px] text-textMuted flex items-center justify-between pt-2 border-t border-white/5">
                      <span>{snap.date}</span>
                      <span className="text-primary font-medium">+50 pts</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: 100-DAY REWARDS LADDER */}
        {/* ============================================================ */}
        {activeTab === 'rewards' && (
          <div className="space-y-8">
            {/* Grand Banner */}
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-cardDark to-teal-950/30 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30">
                  🪴 Tangible Real-World Reward
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  The 100-Day Earth Champion Prize
                </h2>
                <p className="text-textLight/90 text-sm md:text-base leading-relaxed">
                  Consistency changes the planet. When you reach 100 days of verified daily eco habits, GreenPulse AI rewards you with a <b>real physical plant shipped to your home address</b>, alongside a geo-tagged tree planted in your name.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 text-white">
                    <Package className="w-4 h-4 text-emerald-400" />
                    <span>Free Doorstep Shipping Worldwide</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 text-white">
                    <TreePine className="w-4 h-4 text-emerald-400" />
                    <span>Geo-Tagged Tree with GPS Certificate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m) => (
                <motion.div
                  key={m.days}
                  whileHover={{ scale: 1.03 }}
                  className={`glass-card p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    m.isGrand 
                      ? 'border-emerald-400/50 bg-emerald-950/20 shadow-lg shadow-emerald-500/20' 
                      : m.unlocked 
                        ? 'border-primary/40 bg-primary/10' 
                        : 'border-white/10 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl">{m.icon}</span>
                      {m.unlocked ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-white/5 text-textMuted text-xs font-semibold flex items-center gap-1 border border-white/10">
                          <Lock className="w-3 h-3" /> Day {m.days}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-xs text-textLight/80 leading-relaxed mb-4">
                      {m.reward}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs">
                    {streakCount >= m.days ? (
                      <span className="text-emerald-400 font-bold">Completed! 🎉</span>
                    ) : (
                      <span className="text-textMuted">
                        {m.days - streakCount} days left to unlock
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ACTIVE CHALLENGES */}
        {/* ============================================================ */}
        {activeTab === 'active' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: COMPLETED CHALLENGES */}
        {/* ============================================================ */}
        {activeTab === 'completed' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedChallenges.map((challenge) => (
              <CompletedCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* SNAP CAMERA VERIFICATION MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card max-w-2xl w-full p-6 md:p-8 rounded-3xl border border-white/20 bg-cardDark/95 relative shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  stopLiveCamera()
                  setModalOpen(false)
                  setPhotoPreview(null)
                  setScanResult(null)
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-textMuted hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs border border-accent/30 inline-block mb-2">
                  📸 Daily Proof Snap
                </span>
                <h2 className="text-2xl font-bold text-white">Capture Today's Real-Life Eco Action</h2>
                <p className="text-xs text-textMuted mt-1">
                  Take a live photo with your camera or upload proof. GreenPulse AI verifies real-life action authenticity.
                </p>
              </div>

              {/* Step 1: Pick Action Dimension */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold text-white/90 uppercase tracking-wider block">
                  1. Select Action Dimension:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {dimensions.map((dim) => (
                    <button
                      key={dim.id}
                      onClick={() => {
                        setSelectedDimension(dim.id)
                        if (photoPreview) runAiVerification()
                      }}
                      className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                        selectedDimension === dim.id
                          ? 'border-accent bg-accent/10 shadow-glow-orange text-white'
                          : 'border-white/10 bg-bgDark/50 text-textLight/70 hover:border-white/20'
                      }`}
                    >
                      <span className="text-2xl">{dim.icon}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold truncate text-white">{dim.name}</div>
                        <div className="text-[10px] text-textMuted truncate">{dim.example}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Camera Capture / Upload / Presets */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white/90 uppercase tracking-wider block">
                    2. Capture Photo Proof:
                  </label>
                  
                  {/* Mode Selector Tabs */}
                  {!photoPreview && (
                    <div className="flex items-center bg-bgDark rounded-xl p-1 border border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setInputMode('camera')
                          startLiveCamera()
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          inputMode === 'camera'
                            ? 'bg-accent text-white shadow-glow-orange'
                            : 'text-textMuted hover:text-white'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" /> Live Camera
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInputMode('upload')
                          stopLiveCamera()
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          inputMode === 'upload'
                            ? 'bg-primary text-white shadow-glow-blue'
                            : 'text-textMuted hover:text-white'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInputMode('presets')
                          stopLiveCamera()
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          inputMode === 'presets'
                            ? 'bg-emerald-600 text-white shadow-glow-green'
                            : 'text-textMuted hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Demo Snaps
                      </button>
                    </div>
                  )}
                </div>

                {/* Hidden File Input for Upload mode */}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  className="hidden"
                />

                {!photoPreview ? (
                  <div>
                    {/* MODE A: LIVE CAMERA STREAM */}
                    {inputMode === 'camera' && (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-accent/40 bg-black h-72 flex flex-col items-center justify-center">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full h-full object-cover ${!isCameraLive ? 'hidden' : ''}`}
                        />

                        {/* Camera Error / Fallback */}
                        {cameraError && (
                          <div className="p-6 text-center space-y-3 max-w-sm">
                            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                            <div className="text-sm font-bold text-white">Camera Access Notice</div>
                            <div className="text-xs text-textMuted leading-relaxed">{cameraError}</div>
                            <div className="flex gap-2 justify-center pt-2">
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="btn-primary text-xs py-2 px-3"
                              >
                                Upload Photo File
                              </button>
                              <button
                                onClick={() => setInputMode('presets')}
                                className="btn-secondary text-xs py-2 px-3"
                              >
                                Use Demo Snaps
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Connecting Spinner */}
                        {!isCameraLive && !cameraError && (
                          <div className="text-center space-y-2 p-6">
                            <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto" />
                            <div className="text-sm font-bold text-white">Opening Live Camera...</div>
                            <div className="text-xs text-textMuted">Please allow browser camera permissions when prompted</div>
                          </div>
                        )}

                        {/* Snapchat Viewfinder & Shutter Button Overlay */}
                        {isCameraLive && (
                          <>
                            {/* Viewfinder Target Grid */}
                            <div className="absolute inset-6 border border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
                              <span className="text-white/40 text-xs tracking-widest font-mono">ALIGN ECO ACTION</span>
                            </div>

                            {/* Shutter Button Bar */}
                            <div className="absolute bottom-4 inset-x-0 flex flex-col items-center">
                              <button
                                type="button"
                                onClick={captureLivePhoto}
                                className="w-16 h-16 rounded-full bg-white border-4 border-accent shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform cursor-pointer group"
                                title="Click to Capture Photo"
                              >
                                <div className="w-11 h-11 rounded-full bg-accent group-hover:scale-95 transition-transform flex items-center justify-center text-white">
                                  <Camera className="w-5 h-5 text-white" />
                                </div>
                              </button>
                              <span className="text-[10px] text-white/90 drop-shadow mt-1 font-semibold">
                                TAP TO SNAP PHOTO
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* MODE B: UPLOAD FILE */}
                    {inputMode === 'upload' && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/20 hover:border-primary/60 rounded-2xl p-10 text-center cursor-pointer transition bg-bgDark/40 hover:bg-bgDark/70 group"
                      >
                        <Upload className="w-10 h-10 mx-auto mb-3 text-textMuted group-hover:text-primary transition group-hover:scale-110" />
                        <div className="text-sm font-semibold text-white">Select Photo from Device</div>
                        <div className="text-xs text-textMuted mt-1">Accepts JPG, PNG, WEBP from your computer or phone gallery</div>
                      </div>
                    )}

                    {/* MODE C: DEMO SNAP PRESETS */}
                    {inputMode === 'presets' && (
                      <div className="space-y-3">
                        <div className="text-xs text-textMuted">
                          Click any realistic daily snapshot to instantly test the AI verification scanner:
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {dimensions.map(d => (
                            <div
                              key={d.id}
                              onClick={() => {
                                setSelectedDimension(d.id)
                                handleSelectSample(d.sampleImg)
                              }}
                              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-accent cursor-pointer transition bg-bgDark h-32 flex flex-col justify-end p-2.5"
                            >
                              <img
                                src={d.sampleImg}
                                alt={d.sampleLabel}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                              <div className="relative z-10">
                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <span>{d.icon}</span>
                                  <span className="truncate">{d.sampleLabel}</span>
                                </div>
                                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                                  Tap to test this snap →
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Photo Preview with AI Scanner */
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-bgDark">
                    <img
                      src={photoPreview}
                      alt="EcoSnap Preview"
                      className="w-full h-64 object-cover"
                    />

                    {/* Snapchat-Style Overlay Sticker */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-black text-amber-400 border border-amber-400/40">
                        🔥 DAY {streakCount + 1} ECOSNAP
                      </span>
                      <button
                        onClick={() => {
                          setPhotoPreview(null)
                          setScanResult(null)
                          if (inputMode === 'camera') startLiveCamera()
                        }}
                        className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCcw className="w-3 h-3" /> Retake
                      </button>
                    </div>

                    {/* Scanning Animation */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                        <div className="text-sm font-bold text-white">GreenPulse Vision AI Scanning...</div>
                        <div className="text-xs text-textMuted">Checking real-world object authenticity & EXIF date</div>
                      </div>
                    )}

                    {/* Scan Verified Banner */}
                    {scanResult?.verified && (
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-white space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" /> Real-Life Action Verified
                          </span>
                          <span>Confidence: {scanResult.matchScore}</span>
                        </div>
                        <div className="text-[11px] text-textLight/90">
                          Detected: <b>{scanResult.detectedItem}</b> • Estimated Reduction: <b>{scanResult.co2Saved}</b>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    stopLiveCamera()
                    setModalOpen(false)
                    setPhotoPreview(null)
                    setScanResult(null)
                  }}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-textLight font-semibold text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!scanResult?.verified || isScanning}
                  onClick={handlePostSnap}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                    scanResult?.verified && !isScanning
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 cursor-pointer'
                      : 'bg-white/10 text-textMuted cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" /> Post Snap & Extend Streak (+50 pts)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 100-DAY PLANT REWARD EXPLANATION MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {plantModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-lg w-full p-6 md:p-8 rounded-3xl border border-emerald-500/40 bg-cardDark/95 relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setPlantModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-textMuted hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <span className="text-4xl">🪴</span>
                <h3 className="text-2xl font-bold text-white">How the 100-Day Plant Works</h3>
                <p className="text-xs text-textMuted">
                  Every 100 days of verified streaks represents roughly 80+ kg of CO₂ avoided by your conscious choices.
                </p>
              </div>

              <div className="space-y-3 text-xs text-textLight/90 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex gap-3">
                  <span className="text-base">1️⃣</span>
                  <div>
                    <b className="text-white">Hit Day 100:</b> Once your daily streak flame reaches 100 consecutive days without breaking.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-base">2️⃣</span>
                  <div>
                    <b className="text-white">Claim Form Unlocks:</b> You enter your shipping address directly in the app.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-base">3️⃣</span>
                  <div>
                    <b className="text-white">Live Plant Dispatched:</b> A healthy indoor air-purifying plant (Snake Plant or Jade Plant in a biodegradable pot) is delivered to your doorstep.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-base">4️⃣</span>
                  <div>
                    <b className="text-white">Geo-Tagged Tree Sponsoring:</b> GreenPulse AI plants a native tree in an agroforestry reserve with satellite GPS coordinates in your name!
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPlantModalOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm cursor-pointer"
              >
                Got It! Let's Keep Streaking 🔥
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

// Subcomponents for Challenges
const ChallengeCard = ({ challenge }) => {
  const progress = (challenge.progress / challenge.goal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 rounded-2xl border border-white/10"
    >
      <div className="text-4xl mb-4">{challenge.icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{challenge.title}</h3>
      <p className="text-textMuted text-xs mb-4 leading-relaxed">{challenge.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5 font-medium">
          <span className="text-textMuted">Progress</span>
          <span className="text-primary font-semibold">
            {challenge.progress}/{challenge.goal} days
          </span>
        </div>
        <div className="w-full h-2 bg-bgDark rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-textMuted">
          <Users className="w-4 h-4 text-primary" />
          <span>{challenge.participants.toLocaleString()} joined</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="font-bold text-white">{challenge.points} pts</span>
        </div>
      </div>
    </motion.div>
  )
}

const CompletedCard = ({ challenge }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className="glass-card p-6 rounded-2xl relative overflow-hidden border border-emerald-500/30"
  >
    <div className="absolute top-4 right-4">
      <CheckCircle className="w-7 h-7 text-emerald-400" />
    </div>
    <div className="text-4xl mb-4">{challenge.icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{challenge.title}</h3>
    <p className="text-textMuted text-xs mb-4 leading-relaxed">{challenge.description}</p>
    <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs">
      <div className="flex items-center gap-2 text-textMuted">
        <Clock className="w-4 h-4" />
        <span>Completed: {challenge.completedDate}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Award className="w-4 h-4 text-yellow-400" />
        <span className="font-bold text-emerald-400">+{challenge.points} pts</span>
      </div>
    </div>
  </motion.div>
)

const TabButton = ({ active, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer ${
      active
        ? 'bg-gradient-analytics text-white shadow-glow-analytics border border-primary/40'
        : 'bg-cardDark/60 text-textLight/70 hover:text-white border border-white/5 hover:border-white/10'
    }`}
  >
    <span>{icon}</span>
    <span>{children}</span>
  </button>
)

export default Challenges
