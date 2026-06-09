import { motion } from 'framer-motion'
import { Users, Globe, Award, TrendingUp } from 'lucide-react'

const ComparisonWidget = ({ userScore, userCarbon }) => {
  // Global averages (kg CO2/month)
  const globalAverage = 350
  const nationalAverage = 310
  const efficientHouseholds = 150

  const percentageBetter = ((1 - userCarbon / globalAverage) * 100).toFixed(0)
  const percentageBetterNational = ((1 - userCarbon / nationalAverage) * 100).toFixed(0)

  const getComparisonColor = (userValue, avgValue) => {
    if (userValue < avgValue * 0.7) return 'text-green-400'
    if (userValue < avgValue) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const comparisons = [
    {
      icon: Globe,
      label: 'Global Average',
      value: globalAverage,
      difference: percentageBetter,
      color: getComparisonColor(userCarbon, globalAverage)
    },
    {
      icon: Users,
      label: 'National Average',
      value: nationalAverage,
      difference: percentageBetterNational,
      color: getComparisonColor(userCarbon, nationalAverage)
    },
    {
      icon: Award,
      label: 'Top 10% Efficient',
      value: efficientHouseholds,
      difference: ((userCarbon / efficientHouseholds - 1) * 100).toFixed(0),
      color: userCarbon < efficientHouseholds ? 'text-green-400' : 'text-red-400'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">How You Compare</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisons.map((comparison, index) => {
          const Icon = comparison.icon
          const isPositive = comparison.difference < 0 || (comparison.label === 'Top 10% Efficient' && userCarbon < comparison.value)

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-cardDark/50 to-cardDark/30 p-5 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-textLight/70">{comparison.label}</div>
              </div>

              <div className="mb-3">
                <div className="text-2xl font-bold text-textLight">
                  {comparison.value} <span className="text-sm text-textMuted">kg CO₂</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`text-lg font-bold ${comparison.color}`}>
                  {isPositive ? '↓' : '↑'} {Math.abs(comparison.difference)}%
                </div>
                <div className="text-xs text-textMuted">
                  {isPositive ? 'Better' : 'Higher'}
                </div>
              </div>

              {/* Visual bar comparison */}
              <div className="mt-4 relative">
                <div className="w-full bg-bgDark rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (userCarbon / comparison.value) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      userCarbon < comparison.value 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-textMuted">You: {userCarbon}</span>
                  <span className="text-[10px] text-textMuted">Avg: {comparison.value}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30"
      >
        <p className="text-sm text-center">
          {userCarbon < globalAverage ? (
            <>
              🎉 <span className="font-semibold text-green-400">Great job!</span> You're performing{' '}
              <span className="font-bold text-primary">{percentageBetter}% better</span> than the global average.
            </>
          ) : (
            <>
              💡 <span className="font-semibold text-yellow-400">Opportunity ahead!</span> With small changes, you can reduce your footprint significantly.
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ComparisonWidget
