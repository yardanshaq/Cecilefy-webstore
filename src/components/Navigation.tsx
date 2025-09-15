import { useState } from 'react'
import { motion } from 'motion/react'
import { Home, History, MessageCircle, Menu, X } from 'lucide-react'
import { siteConfig } from '../config/site'
import { LogoWithText } from './Logo'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { icon: Home, label: 'Home', href: '/', action: 'scroll' },
    { icon: History, label: 'Riwayat Transaksi', href: '#history', action: 'scroll' },
    { icon: MessageCircle, label: 'Community', href: siteConfig.contact.telegram.group, action: 'external' }
  ]

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.action === 'external') {
      e.preventDefault()
      window.open(item.href, '_blank')
    } else if (item.action === 'scroll' && item.href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.a 
          className="cursor-pointer" 
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogoWithText size="sm" />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              className="font-medium transition-colors flex items-center text-gray-300 hover:text-purple-400 cursor-pointer"
              href={item.href}
              onClick={(e) => handleNavClick(item, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-4 h-4 mr-1" />
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none transition-colors z-50 text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg shadow-lg border-t border-white/10 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0, 
          opacity: isMobileMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="text-gray-300 font-medium py-2 hover:text-purple-400 flex items-center transition-colors cursor-pointer"
              href={item.href}
              onClick={(e) => handleNavClick(item, e)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}