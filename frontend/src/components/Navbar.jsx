import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Home, Calculator, LayoutDashboard, Bot, Trophy, BookOpen, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/calculator', label: 'Calculator', icon: Calculator },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ai-advisor', label: 'AI Advisor', icon: Bot },
    { path: '/challenges', label: 'Challenges', icon: Trophy },
    { path: '/learning', label: 'Learning', icon: BookOpen },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cardDark/80 border-b border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-rainbow rounded-lg shadow-glow-rainbow"
            >
              <Leaf className="w-6 h-6 text-white drop-shadow-lg" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">GreenPulse AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-glow-green border border-primary/30'
                        : 'text-textMuted hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 text-textMuted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm px-6 py-2"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
