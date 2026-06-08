import { useState } from 'react'
import { motion } from 'framer-motion'

const CSS3DCard = ({ children, className = '' }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotX = ((y - centerY) / centerY) * -10
    const rotY = ((x - centerX) / centerX) * 10

    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent rounded-2xl"
        style={{
          transform: 'translateZ(-20px)',
          filter: 'blur(10px)'
        }}
      />
      <div
        className="relative"
        style={{ transform: 'translateZ(0px)' }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default CSS3DCard
