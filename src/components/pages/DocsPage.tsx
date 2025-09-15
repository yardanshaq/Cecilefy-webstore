import { motion } from 'motion/react'
import { Book, Download, FileText, Search, ChevronRight } from 'lucide-react'

export function DocsPage() {
  const documentationSections = [
    {
      title: "Getting Started",
      description: "Panduan dasar untuk memulai dengan panel Pterodactyl",
      icon: Book,
      items: [
        "Instalasi dan Setup Awal",
        "Konfigurasi Dasar",
        "Membuat Server Pertama",
        "Pengelolaan User"
      ]
    },
    {
      title: "API Reference",
      description: "Dokumentasi lengkap untuk API Pterodactyl",
      icon: FileText,
      items: [
        "Authentication",
        "Server Management",
        "User Management",
        "File Management"
      ]
    },
    {
      title: "Troubleshooting",
      description: "Solusi untuk masalah umum yang sering terjadi",
      icon: Search,
      items: [
        "Server Won't Start",
        "Connection Issues",
        "Performance Problems",
        "Security Issues"
      ]
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
              Dokumentasi
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Panduan lengkap untuk menggunakan panel Pterodactyl dan semua fitur yang tersedia di platform Cecilefy
          </p>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {documentationSections.map((section, index) => (
            <motion.div
              key={index}
              className="liquid-glass rounded-xl p-8 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg mr-4">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              
              <p className="text-gray-400 mb-6">{section.description}</p>
              
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-8">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/api-docs"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5 mr-2" />
              API Documentation
            </motion.a>
            <motion.a
              href="/guide"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Book className="w-5 h-5 mr-2" />
              Setup Guide
            </motion.a>
            <motion.a
              href="#"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resources
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}