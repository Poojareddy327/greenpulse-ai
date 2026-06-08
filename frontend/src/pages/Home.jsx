import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingDown, Droplets, Zap, Users, ArrowRight, Leaf, Award, Target } from 'lucide-react'

const Home = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+', color: 'text-primary' },
    { icon: TrendingDown, label: 'CO₂ Reduced', value: '2.5M kg', color: 'text-secondary' },
    { icon: Droplets, label: 'Water Saved', value: '10M L', color: 'text-blue-400' },
    { icon: Zap, label: 'Energy Saved', value: '5M kWh', color: 'text-yellow-400' },
  ]

  const features = [
    {
      icon: Target,
      title: 'Track Your Impact',
      description: 'Calculate your carbon footprint, water usage, and sustainability score in real-time.',
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Leaf,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations to reduce your environmental impact effectively.',
      gradient: 'from-secondary to-primary'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Complete challenges, unlock badges, and compete with eco-warriors worldwide.',
      gradient: 'from-primary to-accent'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Measure, Understand & Reduce Your{' '}
              <span className="gradient-text">Carbon Footprint</span>
            </h1>
            <p className="text-xl text-textLight/70 mb-8 max-w-3xl mx-auto">
              AI-powered carbon footprint awareness platform. Calculate your CO₂ emissions, 
              track your impact, and take action to fight climate change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/calculator" className="btn-primary flex items-center gap-2">
              Calculate Your Impact <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              View Dashboard
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 text-center"
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-textLight/60">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for <span className="gradient-text">Sustainable Living</span>
            </h2>
            <p className="text-textLight/70 max-w-2xl mx-auto">
              Everything you need to understand, track, and reduce your environmental impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-glow-green group-hover:shadow-glow-teal transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-textLight/70">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-green opacity-10" />
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-textLight/70 mb-8">
              Start your sustainability journey today and join our community of eco-warriors
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
