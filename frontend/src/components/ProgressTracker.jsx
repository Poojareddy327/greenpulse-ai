import { motion } from 'framer-motion'
import { Trophy, Star, Flame, Target } from 'lucide-react'

const ProgressTracker = ({ level = 5, xp = 1250, nextLevelXP = 1500 }) => {
  const progress = (xp / nextLevelXP) * 100

  const achievements = [
    { icon: Star, label: 'First Steps', unlocked: true },
    { icon: Flame, label: '7 Day Streak', unlocked: true },
    { icon: Trophy, label: 'Top 30%', unlocked: true },
    { icon: Target, label: 'Goal Crusher', unlocked: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            Level {level}
            <span className="text-accent">Eco Champion</span>
          </h3>
          <p className="text-sm text-textMuted mt-1">
            {nextLevelXP - xp} XP to next level
          </p>
        </div>
        <div className="text-5xl">🏆</div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-textLight">Experience Points</span>
          <span className="font-bold text-primary">{xp} / {nextLevelXP} XP</span>
        </div>
        <div className="w-full bg-bgDark rounded-full h-4 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Quick Achievements */}
      <div>
        <div className="text-sm font-semibold mb-3 text-textLight">Recent Achievements</div>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 rounded-xl text-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-accent/20 to-yellow-500/20 border border-accent/30'
                    : 'bg-cardDark/30 opacity-40 grayscale'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 ${
                  achievement.unlocked ? 'text-accent' : 'text-textMuted'
                }`} />
                <div className="text-[10px] font-medium">{achievement.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressTracker
