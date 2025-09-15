import { motion } from 'motion/react'
import { Play, Download, Settings, Shield, CheckCircle } from 'lucide-react'

export function GuidePage() {
  const setupSteps = [
    {
      number: "01",
      title: "Persiapan Server",
      description: "Setup VPS dan install dependencies yang diperlukan",
      details: [
        "Minimal Ubuntu 18.04 atau CentOS 7",
        "RAM minimal 2GB (rekomendasi 4GB+)",
        "Storage minimal 20GB",
        "Koneksi internet stabil"
      ]
    },
    {
      number: "02", 
      title: "Install Pterodactyl",
      description: "Download dan install panel Pterodactyl",
      details: [
        "Download script installer",
        "Jalankan dengan permission root",
        "Konfigurasi database MySQL/MariaDB",
        "Setup web server (Nginx/Apache)"
      ]
    },
    {
      number: "03",
      title: "Konfigurasi Panel",
      description: "Setup dasar dan konfigurasi admin panel",
      details: [
        "Buat user admin pertama",
        "Konfigurasi email settings",
        "Setup SSL certificate",
        "Konfigurasi cache (Redis)"
      ]
    },
    {
      number: "04",
      title: "Install Wings",
      description: "Install daemon Wings untuk menjalankan server",
      details: [
        "Download Wings binary",
        "Konfigurasi systemd service",
        "Generate SSL certificates",
        "Connect ke panel"
      ]
    },
    {
      number: "05",
      title: "Setup Node & Location",
      description: "Buat node dan location untuk server",
      details: [
        "Buat location baru",
        "Tambah node ke location",
        "Konfigurasi allocations",
        "Test koneksi node"
      ]
    },
    {
      number: "06",
      title: "Buat Server Game",
      description: "Deploy server game pertama Anda",
      details: [
        "Pilih nest dan egg",
        "Alokasi resource (RAM, CPU, Disk)",
        "Set startup parameters",
        "Start server dan test"
      ]
    }
  ]

  const quickLinks = [
    {
      title: "Video Tutorial",
      description: "Panduan visual step-by-step",
      icon: Play,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Download Script",
      description: "Auto installer script",
      icon: Download,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Configuration",
      description: "Template konfigurasi",
      icon: Settings,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Security Guide",
      description: "Panduan keamanan",
      icon: Shield,
      color: "from-purple-500 to-violet-500"
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
              Panduan Setup
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Panduan lengkap untuk menginstall dan mengkonfigurasi panel Pterodactyl dari awal hingga siap digunakan
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              className="liquid-glass rounded-xl p-6 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${link.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{link.title}</h3>
              <p className="text-gray-400 text-sm">{link.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Setup Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Langkah-langkah Setup
            </span>
          </h2>
          
          <div className="space-y-8">
            {setupSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col lg:flex-row gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 liquid-glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="mt-16 text-center liquid-glass rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Butuh Bantuan?</h3>
          <p className="text-gray-400 mb-6">
            Tim support kami siap membantu Anda 24/7 untuk memastikan setup berjalan lancar
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://t.me/cecilefy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
            <motion.a
              href="/docs"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Full Documentation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}