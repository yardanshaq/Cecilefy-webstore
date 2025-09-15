import { motion } from 'motion/react'
import { Users, TrendingUp, Shield, Headphones, Award, DollarSign } from 'lucide-react'

export function ResellerPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Komisi Menarik",
      description: "Dapatkan hingga 30% komisi dari setiap penjualan",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "White Label",
      description: "Gunakan brand Anda sendiri dengan customisasi penuh",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Marketing Support",
      description: "Materi pemasaran dan training lengkap",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Shield,
      title: "Backup Support",
      description: "Tim technical support untuk customer Anda",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Headphones,
      title: "24/7 Partner Support",
      description: "Dedicated support khusus untuk partner reseller",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Award,
      title: "Bonus Tier",
      description: "Program bonus dan incentive untuk top performer",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const packages = [
    {
      name: "Starter",
      price: "10 juta",
      description: "Untuk reseller pemula",
      features: [
        "50 slot panel private",
        "100 slot panel public", 
        "Komisi 20%",
        "Basic support",
        "Marketing kit"
      ],
      popular: false
    },
    {
      name: "Professional", 
      price: "25 juta",
      description: "Untuk bisnis yang berkembang",
      features: [
        "150 slot panel private",
        "300 slot panel public",
        "Komisi 25%",
        "Priority support",
        "Advanced marketing tools",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "50 juta", 
      description: "Untuk skala enterprise",
      features: [
        "Unlimited slots",
        "Komisi 30%",
        "Dedicated support manager",
        "Full white label",
        "Custom development",
        "Priority tier benefits"
      ],
      popular: false
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
              Program Reseller
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bergabunglah dengan program reseller Cecilefy dan dapatkan penghasilan dari penjualan panel Pterodactyl
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="liquid-glass rounded-xl p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${benefit.color} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Packages */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Paket Reseller
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`liquid-glass rounded-xl p-8 relative ${
                  pkg.popular ? 'border-2 border-purple-500/50' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 mb-4">{pkg.description}</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Rp {pkg.price}
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Investment awal</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pilih Paket
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          className="liquid-glass rounded-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Syarat & Ketentuan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Persyaratan Umum</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Memiliki pengalaman di bidang hosting/gaming</li>
                <li>• Komitmen untuk promosi aktif</li>
                <li>• Memiliki customer base yang potensial</li>
                <li>• Sanggup memenuhi target penjualan minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Benefit yang Didapat</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Training lengkap tentang produk</li>
                <li>• Materi marketing dan branding</li>
                <li>• Support technical untuk customer</li>
                <li>• Dashboard monitoring real-time</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Siap Menjadi Partner?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Hubungi tim kami sekarang untuk mendiskusikan peluang kerjasama dan memulai bisnis reseller Anda
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://t.me/cecilefy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
            </motion.a>
            <motion.a
              href="/docs"
              className="flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Brochure
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}