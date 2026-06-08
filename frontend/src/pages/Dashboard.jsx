import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingDown, Droplets, Zap, Award, Target, Calendar } from 'lucide-react'

const Dashboard = () => {
  // Mock data
  const monthlyData = [
    { month: 'Jan', carbon: 320, water: 4200, score: 65 },
    { month: 'Feb', carbon: 280, water: 3900, score: 72 },
    { month: 'Mar', carbon: 250, water: 3600, score: 78 },
    { month: 'Apr', carbon: 220, water: 3300, score: 82 },
    { month: 'May', carbon: 200, water: 3000, score: 85 },
    { month: 'Jun', carbon: 180, water: 2800, score: 88 },
  ]

  const categoryData = [
    { category: 'Transport', value: 35 },
    { category: 'Energy', value: 28 },
    { category: 'Water', value: 18 },
    { category: 'Diet', value: 12 },
    { category: 'Waste', value: 7 },
  ]

  const badges = [
    { name: 'Eco Starter', icon: '🌱', unlocked: true },
    { name: 'Water Saver', icon: '💧', unlocked: true },
    { name: 'Green Warrior', icon: '⚔️', unlocked: true },
    { name: 'Carbon Cutter', icon: '✂️', unlocked: false },
    { name: 'Planet Hero', icon: '🦸', unlocked: false },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Your <span className="gradient-text">Sustainability Dashboard</span>
          </h1>
          <p className="text-textLight/70">Track your environmental impact over time</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={TrendingDown}
            label="Carbon Footprint"
            value="180 kg"
            change="-10%"
            positive={true}
          />
          <StatCard
            icon={Droplets}
            label="Water Usage"
            value="2,800 L"
            change="-7%"
            positive={true}
          />
          <StatCard
            icon={Target}
            label="Sustainability Score"
            value="88/100"
            change="+3%"
            positive={true}
          />
          <StatCard
            icon={Award}
            label="Green Points"
            value="1,250"
            change="+150"
            positive={true}
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Monthly Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #22C55E' }}
                />
                <Line type="monotone" dataKey="carbon" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Impact by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #22C55E' }}
                />
                <Bar dataKey="value" fill="#22C55E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl text-center ${
                  badge.unlocked
                    ? 'bg-gradient-green shadow-glow-green'
                    : 'bg-cardDark/30 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="text-sm font-semibold">{badge.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, change, positive }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <Icon className="w-8 h-8 text-primary" />
      <span className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm text-textLight/60">{label}</div>
  </motion.div>
)

export default Dashboard
