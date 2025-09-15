import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, X, Send, Users, Mail, Headphones } from 'lucide-react'
import { siteConfig } from '../config/site'

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  
  // Simulate online status (in real app, this would come from your support system)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1) // 90% chance to be online
    }, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const contactOptions = [
    {
      icon: Send,
      label: "Chat Telegram",
      href: siteConfig.contact.telegram.url,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Personal support"
    },
    {
      icon: Users,
      label: "Telegram Group",
      href: siteConfig.contact.telegram.group,
      color: "bg-teal-500 hover:bg-teal-600",
      description: "Community support"
    },
    {
      icon: Mail,
      label: "Email Support",
      href: `mailto:${siteConfig.contact.email}`,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Formal inquiry"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3 mb-2"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {/* Contact options */}
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                {/* Label tooltip */}
                <div className="bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-xl">
                  <p className="text-white text-sm font-medium whitespace-nowrap">{option.label}</p>
                  <p className="text-gray-400 text-xs">{option.description}</p>
                </div>
                
                {/* Contact button */}
                <motion.a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-all duration-300 ${option.color} cursor-pointer relative overflow-hidden group`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <option.icon className="w-5 h-5 relative z-10" />
                  <span className="sr-only">{option.label}</span>
                </motion.a>
              </motion.div>
            ))}
            
            {/* Status indicator */}
            <motion.div
              className="flex items-center justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20 flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="text-xs text-gray-300">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden group ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {/* Background pulse effect */}
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-75 animate-ping rounded-full"></div>
        )}
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 text-white" />
              {/* Online indicator */}
              {isOnline && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </>
          )}
        </motion.div>
        
        {/* Tooltip on hover when closed */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <p className="text-white text-sm font-medium whitespace-nowrap">Butuh Bantuan?</p>
            <p className="text-gray-400 text-xs">Klik untuk chat dengan kami</p>
            {/* Arrow */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}