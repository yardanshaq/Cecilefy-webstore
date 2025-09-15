import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, Zap } from 'lucide-react'

export function APIStatus() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div 
      className="fixed top-20 right-6 z-40 bg-black/60 backdrop-blur-lg rounded-lg px-3 py-2 border border-green-500/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 text-green-400">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Sistem Online</span>
      </div>
      
      <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
        <Zap className="w-3 h-3" />
        <span>Ready to process orders</span>
      </div>
    </motion.div>
  )
}