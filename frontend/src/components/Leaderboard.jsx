import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, TrendingUp, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState('global')
  const [rankings, setRankings] = useState([
    { rank: 1, name: 'EcoMaster2024', score: 9850, carbon: 95, badge: '👑', streak: 45, country: '🇺🇸' },
    { rank: 2, name: 'GreenNinja', score: 9720, carbon: 102, badge: '🥈', streak: 38, country: '🇬🇧' },
    { rank: 3, name: 'ClimateHero', score: 9680, carbon: 108, badge: '🥉', streak: 42, country: '🇨🇦' },
    { rank: 4, name: 'ZeroWasteKing', score: 9520, carbon: 115, badge: '⭐', streak: 31, country: '🇩🇪' },
    { rank: 5, name: 'SustainQueen', score: 9450, carbon: 118, badge: '⭐', streak: 29, country: '🇫🇷' },
    { rank: 6, name: 'PlanetSaver', score: 9380, carbon: 122, badge: '⭐', streak: 27, country: '🇯🇵' },
    { rank: 7, name: 'EcoWarrior99', score: 9280, carbon: 128, badge: '⭐', streak: 25, country: '🇦🇺' },
    { rank: 8, name: 'GreenRevolution', score: 9150, carbon: 135, badge: '⭐', streak: 23, country: '🇧🇷' },
    { rank: 9, name: 'CarbonCrusher', score: 9050, carbon: 140, badge: '⭐', streak: 21, country: '🇮🇳' },
    { rank: 10, name: 'YoungActivist', score: 8920, carbon: 145, badge: '⭐', streak: 18, country: '🇰🇷' },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRankings(prev => prev.map(user => ({
        ...user,
        score: user.score + Math.floor(Math.random() * 10)
      })).sort((a, b) => b.score - a.score).map((user, idx) => ({
        ...user,
        rank: idx + 1
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'country', label: 'Country', icon: '🏳️' },
    { id: 'friends', label: 'Friends', icon: '👥' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-accent animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
              Live Leaderboard
            </h2>
            <p className="text-sm text-textMuted">Compete with eco warriors worldwide</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          🏆
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-accent to-yellow-500 text-white shadow-lg'
                : 'bg-cardDark/50 text-textLight hover:bg-cardDark'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {rankings.slice(0, 3).sort((a, b) => a.rank - b.rank).map((user, idx) => {
          const heights = ['h-32', 'h-40', 'h-28']
          const positions = [1, 0, 2]
          const actualIdx = positions[idx]
          
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: actualIdx * 0.1 }}
              className={`relative order-${positions[idx]}`}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className={`${heights[actualIdx]} bg-gradient-to-br ${
                  user.rank === 1 ? 'from-yellow-500/30 to-yellow-600/30 border-yellow-500/50' :
                  user.rank === 2 ? 'from-gray-400/30 to-gray-500/30 border-gray-400/50' :
                  'from-orange-500/30 to-orange-600/30 border-orange-500/50'
                } border-2 rounded-t-2xl flex flex-col items-center justify-end p-4 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl mb-2"
                  >
                    {user.badge}
                  </motion.div>
                  <div className="text-sm font-bold text-white truncate w-full">{user.name}</div>
                  <div className="text-2xl font-bold text-accent">{user.score}</div>
                  <div className="text-xs text-textMuted">{user.carbon}kg CO₂</div>
                </div>
              </motion.div>
              
              <div className="bg-cardDark/80 p-2 text-center rounded-b-lg border border-white/10 border-t-0">
                <div className="text-3xl font-bold text-accent">#{user.rank}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Rest of rankings */}
      <div className="space-y-2">
        {rankings.slice(3).map((user, idx) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="bg-gradient-to-r from-cardDark/50 to-cardDark/30 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-textMuted w-8">#{user.rank}</div>
              <div className="text-2xl">{user.country}</div>
              <div>
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-xs text-textMuted flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-accent" />
                    {user.streak} days
                  </span>
                  <span>•</span>
                  <span>{user.carbon}kg CO₂</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold text-primary">{user.score.toLocaleString()}</div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{Math.floor(Math.random() * 50)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your ranking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-4 rounded-xl border-2 border-primary"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-primary">#156</div>
            <div className="text-2xl">🇺🇸</div>
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                You (Anonymous)
                <Crown className="w-4 h-4 text-accent" />
              </div>
              <div className="text-xs text-textMuted">12 day streak • 180kg CO₂</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">7,250</div>
            <div className="text-xs text-textMuted">Top 2%</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Leaderboard
