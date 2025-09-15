import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Server, Globe, Database, Wifi, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface ServerStatus {
  name: string
  status: 'online' | 'warning' | 'offline'
  uptime: number
  responseTime: number
  location: string
}

export function StatusPage() {
  const [servers, setServers] = useState<ServerStatus[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulate real-time server status
  useEffect(() => {
    const updateServerStatus = () => {
      const serverList: ServerStatus[] = [
        {
          name: "Panel Main (Jakarta)",
          status: Math.random() > 0.05 ? 'online' : 'warning',
          uptime: 99.7 + Math.random() * 0.25,
          responseTime: 45 + Math.random() * 30,
          location: "Jakarta, Indonesia"
        },
        {
          name: "Wings Node 1 (Singapore)",
          status: Math.random() > 0.03 ? 'online' : 'warning', 
          uptime: 99.8 + Math.random() * 0.15,
          responseTime: 35 + Math.random() * 25,
          location: "Singapore"
        },
        {
          name: "Wings Node 2 (US East)",
          status: Math.random() > 0.07 ? 'online' : 'warning',
          uptime: 99.5 + Math.random() * 0.4,
          responseTime: 120 + Math.random() * 50,
          location: "New York, USA"
        },
        {
          name: "Database Server",
          status: Math.random() > 0.02 ? 'online' : 'warning',
          uptime: 99.9 + Math.random() * 0.08,
          responseTime: 25 + Math.random() * 20,
          location: "Jakarta, Indonesia"
        },
        {
          name: "CDN Network",
          status: Math.random() > 0.01 ? 'online' : 'warning',
          uptime: 99.95 + Math.random() * 0.04,
          responseTime: 18 + Math.random() * 15,
          location: "Global"
        }
      ]
      
      setServers(serverList)
      setLastUpdate(new Date())
    }

    // Initial load
    updateServerStatus()
    
    // Update every 30 seconds for real-time feel
    const interval = setInterval(updateServerStatus, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'warning': return 'text-yellow-400' 
      case 'offline': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'offline': return <AlertCircle className="w-5 h-5 text-red-400" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/10 border-green-500/20'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'offline': return 'bg-red-500/10 border-red-500/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const overallStatus = servers.every(s => s.status === 'online') ? 'online' : 
                      servers.some(s => s.status === 'offline') ? 'offline' : 'warning'

  const averageUptime = servers.length > 0 ? servers.reduce((acc, s) => acc + s.uptime, 0) / servers.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Status Server
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Monitor real-time status dari semua komponen infrastruktur Cecilefy
          </p>
        </motion.div>

        {/* Overall Status */}
        <motion.div
          className={`liquid-glass rounded-xl p-8 mb-12 border-2 ${getStatusBg(overallStatus)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {getStatusIcon(overallStatus)}
              <div className="ml-4">
                <h2 className="text-2xl font-semibold">
                  <span className={getStatusColor(overallStatus)}>
                    {overallStatus === 'online' ? 'Semua Sistem Normal' :
                     overallStatus === 'warning' ? 'Beberapa Masalah Terdeteksi' :
                     'Gangguan Sistem'}
                  </span>
                </h2>
                <p className="text-gray-400">
                  Uptime rata-rata: {averageUptime.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                Terakhir diperbarui: {lastUpdate.toLocaleTimeString('id-ID')}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-green-400">Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Server Status List */}
        <div className="space-y-6">
          {servers.map((server, index) => (
            <motion.div
              key={index}
              className={`liquid-glass rounded-xl p-6 border ${getStatusBg(server.status)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center mb-4 lg:mb-0">
                  {getStatusIcon(server.status)}
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{server.name}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      {server.location}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`font-semibold capitalize ${getStatusColor(server.status)}`}>
                      {server.status}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Uptime</p>
                    <p className="font-semibold text-green-400">{server.uptime.toFixed(2)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Response Time</p>
                    <p className="font-semibold text-cyan-400">{Math.round(server.responseTime)}ms</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="liquid-glass rounded-xl p-6 text-center">
            <Server className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Infrastructure</h3>
            <p className="text-gray-400 text-sm">
              Multi-region deployment dengan load balancing otomatis
            </p>
          </div>
          
          <div className="liquid-glass rounded-xl p-6 text-center">
            <Database className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Database</h3>
            <p className="text-gray-400 text-sm">
              Backup otomatis setiap 6 jam dengan replikasi real-time
            </p>
          </div>
          
          <div className="liquid-glass rounded-xl p-6 text-center">
            <Wifi className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Network</h3>
            <p className="text-gray-400 text-sm">
              CDN global dengan DDoS protection tier enterprise
            </p>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-400 mb-4">
            Mengalami masalah? Tim support kami siap membantu 24/7
          </p>
          <motion.a
            href="https://t.me/cecilefy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}