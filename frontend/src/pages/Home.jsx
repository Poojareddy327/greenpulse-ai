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
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="glow-blob w-96 h-96 bg-primary top-0 left-0 animate-float" style={{ animationDelay: '0s' }} />
        <div className="glow-blob w-[500px] h-[500px] bg-secondary bottom-0 right-0 animate-float" style={{ animationDelay: '2s' }} />
        <div className="glow-blob w-80 h-80 bg-accent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '4s' }} />
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
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Measure, Understand & Reduce Your{' '}
                <span className="gradient-text">Carbon Footprint</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-textMuted mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              AI-powered sustainability platform. Calculate your emissions, 
              track your impact, and join the fight against climate change 🌍
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link to="/calculator" className="btn-primary flex items-center gap-2 group">
              Calculate Your Impact 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              View Dashboard
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="stat-card"
                >
                  <div className="relative z-10">
                    <Icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 ${stat.color} drop-shadow-lg`} />
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-textMuted">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="feature-card text-center"
                >
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow-green group-hover:shadow-glow-rainbow transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-textMuted leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-rainbow opacity-5" />
          <div className="shimmer absolute inset-0" />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg md:text-xl text-textMuted mb-8">
                Start your sustainability journey today and join our community of eco-warriors 🌱
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 group">
                Get Started Free 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
