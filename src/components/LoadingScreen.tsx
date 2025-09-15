import { useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Logo } from './Logo'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Memuat...')

  // Memoize onComplete to prevent unnecessary re-renders
  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const textStates = [
      'Memuat...',
      'Menghubungkan ke server...',
      'Menyiapkan dashboard...',
      'Hampir selesai...'
    ]
    
    let textIndex = 0
    let isComplete = false
    
    const textInterval = setInterval(() => {
      if (isComplete) return
      setLoadingText(textStates[textIndex % textStates.length])
      textIndex++
    }, 1000)

    const interval = setInterval(() => {
      if (isComplete) return
      
      setProgress(prev => {
        if (prev >= 100) {
          isComplete = true
          clearInterval(interval)
          clearInterval(textInterval)
          setTimeout(handleComplete, 500)
          return 100
        }
        return prev + 2 // Slightly faster loading
      })
    }, 30) // Shorter interval for smoother progress

    return () => {
      isComplete = true
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [handleComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="flex flex-col items-center relative z-10">
        {/* Logo with enhanced animation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOutBack" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Logo size="xl" className="relative drop-shadow-2xl" />
          </div>
        </motion.div>

        {/* Brand name with glitch effect */}
        <motion.h1 
          className="text-4xl font-bold text-white tracking-wider mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
            Cecilefy
          </span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Premium Pterodactyl Panel Provider
        </motion.p>

        {/* Enhanced progress bar */}
        <motion.div 
          className="w-80 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="h-3 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/50 shadow-inner backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-full relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-ping"></div>
            </motion.div>
          </div>
          <div className="flex justify-center mt-3">
            <span className="text-purple-400 font-medium text-sm">{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </motion.div>

        {/* Loading text with typing effect */}
        <motion.p 
          className="text-gray-300 text-center min-h-[1.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {loadingText}
        </motion.p>

        {/* Animated dots */}
        <motion.div 
          className="flex space-x-2 mt-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}