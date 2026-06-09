import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, Zap, Target } from 'lucide-react'

const AdvancedMetrics = ({ data }) => {
  // Calculate advanced metrics
  const calculateTrend = (values) => {
    if (values.length < 2) return 0
    const recent = values.slice(-3)
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length
    const previous = values.slice(-6, -3)
    const prevAvg = previous.reduce((a, b) => a + b, 0) / previous.length
    return ((avg - prevAvg) / prevAvg) * 100
  }

  const carbonTrend = data.monthlyData ? calculateTrend(data.monthlyData.map(d => d.carbon)) : 0
  const scoreTrend = data.monthlyData ? calculateTrend(data.monthlyData.map(d => d.score)) : 0

  // Calculate carbon reduction rate
  const reductionRate = carbonTrend < 0 ? Math.abs(carbonTrend).toFixed(1) : 0

  // Estimate CO2 trees equivalent
  const treesEquivalent = data.currentCarbon ? (data.currentCarbon / 21).toFixed(1) : 0

  // Calculate efficiency score (improvement velocity)
  const efficiencyScore = Math.min(100, Math.max(0, 50 + scoreTrend * 5)).toFixed(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-primary" />
            {carbonTrend < 0 ? (
              <TrendingDown className="w-6 h-6 text-green-400" />
            ) : (
              <TrendingUp className="w-6 h-6 text-red-400" />
            )}
          </div>
          <div className="text-3xl font-bold mb-2 text-primary drop-shadow-[0_0_10px_rgba(37,99,235,0.6)]">
            {reductionRate}%
          </div>
          <div className="text-sm text-textLight/70">Carbon Reduction Rate</div>
          <div className="mt-3 text-xs text-textMuted">
            {carbonTrend < 0 ? '↓ Improving' : '↑ Needs attention'}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🌳</span>
            <div className="text-xs bg-secondary/20 px-2 py-1 rounded-full text-secondary">
              Offset
            </div>
          </div>
          <div className="text-3xl font-bold mb-2 text-secondary drop-shadow-[0_0_10px_rgba(124,58,237,0.6)]">
            {treesEquivalent}
          </div>
          <div className="text-sm text-textLight/70">Trees Equivalent</div>
          <div className="mt-3 text-xs text-textMuted">
            To offset your monthly CO₂
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-accent" />
            <Target className="w-6 h-6 text-accent" />
          </div>
          <div className="text-3xl font-bold mb-2 text-accent drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
            {efficiencyScore}
          </div>
          <div className="text-sm text-textLight/70">Efficiency Score</div>
          <div className="mt-3 text-xs text-textMuted">
            Improvement velocity metric
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdvancedMetrics
