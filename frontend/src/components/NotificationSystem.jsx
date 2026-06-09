import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, Award } from 'lucide-react'

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Listen for custom notification events
    const handleNotification = (event) => {
      addNotification(event.detail)
    }

    window.addEventListener('app-notification', handleNotification)
    return () => window.removeEventListener('app-notification', handleNotification)
  }, [])

  const addNotification = (notification) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { ...notification, id }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />
      case 'error': return <AlertCircle className="w-5 h-5" />
      case 'achievement': return <Award className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  const getColors = (type) => {
    switch (type) {
      case 'success': return 'from-green-500/20 to-green-600/20 border-green-500/50'
      case 'error': return 'from-red-500/20 to-red-600/20 border-red-500/50'
      case 'achievement': return 'from-accent/20 to-yellow-500/20 border-accent/50'
      default: return 'from-primary/20 to-primary/20 border-primary/50'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`glass-card p-4 bg-gradient-to-r ${getColors(notification.type)} border relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
            
            <div className="relative flex items-start gap-3">
              <div className={`${
                notification.type === 'success' ? 'text-green-400' :
                notification.type === 'error' ? 'text-red-400' :
                notification.type === 'achievement' ? 'text-accent' :
                'text-primary'
              }`}>
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">{notification.title}</div>
                <div className="text-xs text-textLight/70">{notification.message}</div>
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-textMuted hover:text-textLight transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Helper function to trigger notifications from anywhere
export const showNotification = (title, message, type = 'info') => {
  const event = new CustomEvent('app-notification', {
    detail: { title, message, type }
  })
  window.dispatchEvent(event)
}

export default NotificationSystem
