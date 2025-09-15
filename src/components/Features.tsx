import { motion } from 'motion/react'
import { Shield, Zap, Clock, CreditCard } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description: "Hosting kami menjamin keamanan data dan aplikasi Anda dengan sistem keamanan berlapis dan SSL gratis.",
    color: "from-purple-500 to-purple-700"
  },
  {
    icon: Zap,
    title: "Performa Tinggi",
    description: "Nikmati performa server yang cepat dengan SSD storage dan CDN global untuk loading yang optimal.",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: Clock,
    title: "Uptime 99.9%",
    description: "Kami menjamin uptime server hingga 99.9% sehingga aplikasi Anda selalu online dan dapat diakses 24/7.",
    color: "from-indigo-500 to-indigo-700"
  },
  {
    icon: CreditCard,
    title: "Pembayaran Mudah",
    description: "Proses pembayaran yang mudah dan cepat dengan berbagai metode pembayaran yang tersedia di Indonesia.",
    color: "from-violet-500 to-violet-700"
  }
]

export function Features() {
  return (
    <div className="py-16 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Mengapa Memilih Cecilefy?
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Kami menyediakan layanan hosting premium terbaik dengan fitur lengkap dan harga terjangkau untuk semua kebutuhan Anda.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black/40 rounded-lg p-6 border border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/40 backdrop-blur-sm group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-full mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}