import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, Zap, Flame, Award } from 'lucide-react'

const LiveCarbonCounter = () => {
  const [carbonSaved, setCarbonSaved] = useState(2847)
  const [activeSavers, setActiveSavers] = useState(1523)
  const [dailyStreak, setDailyStreak] = useState(12)
  const [showCelebration, setShowCelebration] = useState(false)

  // Animate carbon counter in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonSaved(prev => {
        const newValue = prev + Math.floor(Math.random() * 3) + 1
        if (newValue % 100 === 0) {
          setShowCelebration(true)
          setTimeout(() => setShowCelebration(false), 2000)
        }
        return newValue
      })
      
      setActiveSavers(prev => prev + Math.floor(Math.random() * 2))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 mb-8 relative overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: '100%',
              }}
              animate={{
                y: '-10%',
                x: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-4xl animate-pulse">🌍</span>
                <span className="text-white drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                  Global Impact - LIVE
                </span>
              </h2>
              <p className="text-sm text-green-400 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Live tracking across the platform
              </p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              ♻️
            </motion.div>
          </div>

          {/* Main counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Carbon Saved */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-shimmer" />
              <TrendingDown className="w-8 h-8 text-green-400 mb-3" />
              <div className="text-5xl font-bold text-green-400 mb-2 tracking-tight">
                <CountUp end={carbonSaved} duration={1} />
                <span className="text-2xl ml-2">kg</span>
              </div>
              <div className="text-sm text-textLight/70">CO₂ Saved Today</div>
              <div className="text-xs text-green-400 mt-2">
                +{Math.floor(carbonSaved / 60)}/hour
              </div>
            </motion.div>

            {/* Active Users */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-xl border border-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
              <Zap className="w-8 h-8 text-primary mb-3" />
              <div className="text-5xl font-bold text-primary mb-2 tracking-tight">
                <CountUp end={activeSavers} duration={1} />
              </div>
              <div className="text-sm text-textLight/70">Active Eco Warriors</div>
              <div className="text-xs text-primary mt-2 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                Online now
              </div>
            </motion.div>

            {/* Streak Counter */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-accent/20 to-yellow-500/20 p-6 rounded-xl border border-accent/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer" />
              <Flame className="w-8 h-8 text-accent mb-3 animate-pulse" />
              <div className="text-5xl font-bold text-accent mb-2 tracking-tight flex items-center gap-2">
                {dailyStreak}
                <span className="text-3xl">🔥</span>
              </div>
              <div className="text-sm text-textLight/70">Day Streak</div>
              <div className="text-xs text-accent mt-2">
                Keep it going!
              </div>
            </motion.div>
          </div>

          {/* Impact breakdown */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImpactStat icon="🌳" label="Trees Saved" value={Math.floor(carbonSaved / 21)} />
            <ImpactStat icon="💡" label="kWh Saved" value={Math.floor(carbonSaved * 1.2)} />
            <ImpactStat icon="🚗" label="Miles Not Driven" value={Math.floor(carbonSaved * 2.5)} />
            <ImpactStat icon="💧" label="Liters Saved" value={Math.floor(carbonSaved * 15)} />
          </div>
        </div>
      </motion.div>

      {/* Celebration popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 via-primary to-secondary p-8 rounded-2xl shadow-2xl text-center">
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 1 }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <div className="text-3xl font-bold text-white mb-2">Milestone!</div>
              <div className="text-lg text-white/90">{carbonSaved} kg CO₂ saved!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(end - 20)

  useEffect(() => {
    const increment = (end - count) / (duration * 60)
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= end) {
          clearInterval(timer)
          return end
        }
        return Math.min(prev + increment, end)
      })
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [end])

  return <>{Math.floor(count)}</>
}

const ImpactStat = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-cardDark/50 p-4 rounded-lg text-center border border-white/5"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
    <div className="text-xs text-textMuted mt-1">{label}</div>
  </motion.div>
)

export default LiveCarbonCounter
