import { useState, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { Users, Server, ShoppingBag } from 'lucide-react'
import { siteConfig } from '../config/site'

interface Stats {
  totalUsers: number
  totalServers: number
  totalPurchases: number
}

export function Statistics() {
  const [displayStats, setDisplayStats] = useState<Stats>({
    totalUsers: 0,
    totalServers: 0,
    totalPurchases: 0
  })

  // Get stats from config - memoized to prevent unnecessary recalculations
  const configStats = useMemo(() => siteConfig.statistics, [])

  useEffect(() => {
    // Animate numbers when component mounts
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    // Create animation for each stat
    const animateStats = () => {
      Object.keys(configStats).forEach((key) => {
        if (key === 'lastUpdated' || key === 'uptime') return // Skip non-numeric fields
        
        const target = configStats[key as keyof typeof configStats] as number
        if (typeof target !== 'number') return
        
        let current = 0
        const increment = target / steps

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setDisplayStats(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }))
        }, interval)
      })
    }

    // Start animation with a small delay
    const timeout = setTimeout(animateStats, 100)
    
    return () => {
      clearTimeout(timeout)
    }
  }, [configStats])

  const statItems = useMemo(() => [
    {
      icon: Users,
      title: "Total Pengguna",
      value: displayStats.totalUsers.toLocaleString('id-ID'),
      color: "from-purple-500 to-purple-700",
      description: "Pengguna aktif"
    },
    {
      icon: Server,
      title: "Server Aktif",
      value: displayStats.totalServers.toString(),
      color: "from-blue-500 to-blue-700",
      description: "Nodes operational"
    },
    {
      icon: ShoppingBag,
      title: "Panel Terjual",
      value: displayStats.totalPurchases.toLocaleString('id-ID'),
      color: "from-emerald-500 to-emerald-700",
      description: "Transaksi sukses"
    }
  ], [displayStats])

  return (
    <div className="py-20 bg-gradient-to-b from-black/20 to-black/40 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Statistik Real-Time
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Data terbaru dari platform Cecilefy yang menunjukkan performa dan kepercayaan pelanggan terhadap layanan kami
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Card */}
              <div className="liquid-glass rounded-xl p-6 h-full relative z-10 cursor-pointer">
                {/* Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${item.color} rounded-full group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
              
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-xl`}></div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            * Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </p>
        </motion.div>
      </div>
    </div>
  )
}