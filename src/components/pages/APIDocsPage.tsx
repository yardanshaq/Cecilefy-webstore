import { motion } from 'motion/react'
import { Code, Server, Key, Shield, Database, Zap } from 'lucide-react'

export function APIDocsPage() {
  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/servers",
      description: "Mendapatkan daftar semua server",
      params: "page, per_page"
    },
    {
      method: "POST",
      endpoint: "/api/servers",
      description: "Membuat server baru",
      params: "name, memory, disk, cpu"
    },
    {
      method: "GET",
      endpoint: "/api/servers/{id}",
      description: "Mendapatkan detail server",
      params: "id"
    },
    {
      method: "DELETE",
      endpoint: "/api/servers/{id}",
      description: "Menghapus server",
      params: "id"
    }
  ]

  const features = [
    {
      icon: Key,
      title: "Authentication",
      description: "Sistem autentikasi berbasis API key yang aman"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Perlindungan berlapis dengan rate limiting"
    },
    {
      icon: Database,
      title: "Real-time Data",
      description: "Data server dan statistik real-time"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Response time cepat dengan caching"
    }
  ]

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
              API Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            RESTful API untuk mengelola panel Pterodactyl secara programatis
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="liquid-glass rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* API Endpoints */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              API Endpoints
            </span>
          </h2>
          
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                className="liquid-glass rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-2 md:mb-0">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold mr-4 ${
                      endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-purple-300 font-mono">{endpoint.endpoint}</code>
                  </div>
                  <span className="text-gray-400 text-sm">Params: {endpoint.params}</span>
                </div>
                <p className="text-gray-300 mt-2">{endpoint.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Authentication Section */}
        <motion.div
          className="liquid-glass rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg mr-4">
              <Key className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Authentication</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Mendapatkan API Key</h4>
              <p className="text-gray-400 mb-4">
                Untuk menggunakan API, Anda memerlukan API key yang dapat diperoleh dari panel admin Pterodactyl Anda.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Login ke panel admin</li>
                <li>Navigasi ke Application API</li>
                <li>Buat API key baru</li>
                <li>Salin dan simpan API key</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Menggunakan API Key</h4>
              <p className="text-gray-400 mb-4">
                Sertakan API key dalam header Authorization pada setiap request:
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <code className="text-green-400 text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}