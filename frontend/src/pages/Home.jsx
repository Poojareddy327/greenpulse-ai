import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingDown, Droplets, Zap, Users, ArrowRight, Leaf, Award, Target } from 'lucide-react'

const Home = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+', color: 'text-primary drop-shadow-lg' },
    { icon: TrendingDown, label: 'CO₂ Reduced', value: '2.5M kg', color: 'text-secondary drop-shadow-lg' },
    { icon: Droplets, label: 'Water Saved', value: '10M L', color: 'text-blue-400 drop-shadow-lg' },
    { icon: Zap, label: 'Energy Saved', value: '5M kWh', color: 'text-warning drop-shadow-lg' },
  ]

  const features = [
    {
      icon: Target,
      title: 'Track Your Impact',
      description: 'Calculate your carbon footprint, water usage, and sustainability score in real-time with advanced analytics.',
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Leaf,
      title: 'AI-Powered Insights',
      description: 'Get personalized AI recommendations to reduce your environmental impact effectively and sustainably.',
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Complete challenges, unlock badges, and compete with eco-warriors worldwide on our leaderboard.',
      gradient: 'from-accent to-primary'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="glow-blob w-[600px] h-[600px] bg-gradient-green top-[-10%] left-[-10%] animate-float" style={{ animationDelay: '0s' }} />
        <div className="glow-blob w-[700px] h-[700px] bg-gradient-ocean bottom-[-15%] right-[-15%] animate-float" style={{ animationDelay: '2s' }} />
        <div className="glow-blob w-[500px] h-[500px] bg-gradient-sunset top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '4s' }} />
        <div className="glow-blob w-[400px] h-[400px] bg-gradient-fire top-[20%] right-[10%] animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              {/* Floating Emoji Icons */}
              <motion.div 
                className="flex justify-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span 
                  className="text-6xl"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  🌍
                </motion.span>
                <motion.span 
                  className="text-6xl"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  🌱
                </motion.span>
                <motion.span 
                  className="text-6xl"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  ♻️
                </motion.span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Measure, Understand & Reduce Your{' '}
                <span className="gradient-text relative">
                  Carbon Footprint
                  <motion.span
                    className="absolute inset-0 bg-gradient-rainbow opacity-20 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-textMuted mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              AI-powered sustainability platform. Calculate your emissions, 
              track your impact, and join the fight against climate change 🌍✨
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link to="/calculator" className="btn-primary flex items-center gap-2 group">
              Calculate Your Impact 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/dashboard" className="btn-secondary flex items-center gap-2">
              View Dashboard
            </Link>
          </motion.div>

          {/* Enhanced Stats Grid with Neon Effects */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colors = ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B']
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -10,
                    rotateZ: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="stat-card neon-border cursor-pointer"
                  style={{
                    boxShadow: `0 0 30px ${colors[index]}40, 0 0 60px ${colors[index]}20`
                  }}
                >
                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 ${stat.color}`} />
                    </motion.div>
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold mb-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-textMuted">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Advanced Cards */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for <span className="gradient-text">Sustainable Living</span>
            </h2>
            <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto">
              Everything you need to understand, track, and reduce your environmental impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = ['gradient-green', 'gradient-ocean', 'gradient-sunset']
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  className="feature-card text-center neon-border"
                >
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.8 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${gradients[index]} flex items-center justify-center shadow-neon`}
                      style={{
                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)'
                      }}
                    >
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">{feature.title}</h3>
                    <p className="text-textMuted leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ultra CTA Section */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center relative overflow-hidden neon-border"
        >
          <div className="absolute inset-0 bg-gradient-rainbow opacity-5" />
          <div className="shimmer absolute inset-0" />
          <div className="particle-effect absolute inset-0" />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-4"
                animate={{ textShadow: ['0 0 20px rgba(16, 185, 129, 0.5)', '0 0 40px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(16, 185, 129, 0.5)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Ready to Make a Difference?
              </motion.h2>
              <p className="text-lg md:text-xl text-textMuted mb-8">
                Start your sustainability journey today and join our community of eco-warriors 🌱✨
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 group text-lg">
                Get Started Free 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
