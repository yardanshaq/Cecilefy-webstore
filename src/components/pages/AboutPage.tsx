import { motion } from 'motion/react'
import { Users, Target, Award, Heart, Shield, Zap, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useEffect } from 'react'

export function AboutPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const values = [
    {
      icon: Shield,
      title: "Keamanan Terdepan",
      description: "Infrastruktur server yang aman dengan sistem keamanan berlapis untuk melindungi data dan server Anda."
    },
    {
      icon: Zap,
      title: "Performa Tinggi",
      description: "Hardware premium dengan teknologi SSD NVMe dan koneksi jaringan berkecepatan tinggi."
    },
    {
      icon: Heart,
      title: "Dukungan 24/7",
      description: "Tim support yang berpengalaman siap membantu Anda kapanpun melalui berbagai channel komunikasi."
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description: "Uptime 99.9% dan SLA yang ketat untuk memastikan server Anda selalu online dan stabil."
    }
  ]

  const team = [
    {
      name: "Ahmad Cecile",
      role: "Founder & CEO",
      description: "Pengalaman 5+ tahun di bidang hosting dan server management dengan visi membuat hosting berkualitas terjangkau."
    },
    {
      name: "Sarah Teknologi",
      role: "CTO",
      description: "Expert dalam infrastruktur cloud dan keamanan server dengan sertifikasi internasional."
    },
    {
      name: "Budi Support",
      role: "Head of Customer Success",
      description: "Memimpin tim customer service terbaik dengan response time tercepat di industri."
    }
  ]

  const milestones = [
    { year: "2022", event: "Cecilefy didirikan dengan visi hosting yang terjangkau" },
    { year: "2023", event: "Mencapai 500+ pelanggan aktif dan ekspansi server" },
    { year: "2024", event: "Launching Panel Pterodactyl dan mencapai 1000+ users" },
    { year: "2025", event: "Target ekspansi internasional dan fitur AI support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Tentang Cecilefy
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Kami adalah penyedia hosting Panel Pterodactyl terpercaya yang berdedikasi untuk 
              memberikan layanan berkualitas tinggi dengan harga yang terjangkau untuk semua kalangan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
                <div className="text-gray-400">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                <div className="text-gray-400">Server Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                <div className="text-gray-400">Customer Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-purple-500" />
                <h2 className="text-3xl font-bold">Misi Kami</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Menyediakan layanan hosting Panel Pterodactyl yang berkualitas tinggi, aman, 
                dan terjangkau untuk membantu developers, gamers, dan komunitas dalam mengelola 
                server mereka dengan mudah dan efisien.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Kami berkomitmen untuk terus berinovasi dalam teknologi hosting dan memberikan 
                pengalaman terbaik kepada setiap pelanggan melalui layanan yang handal dan 
                dukungan teknis yang responsif.
              </p>
            </motion.div>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-cyan-500" />
                <h2 className="text-3xl font-bold">Visi Kami</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Menjadi penyedia hosting Panel Pterodactyl terdepan di Indonesia yang dikenal 
                karena kualitas layanan, inovasi teknologi, dan kepuasan pelanggan yang tinggi.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Kami ingin menciptakan ekosistem hosting yang memungkinkan setiap orang, 
                mulai dari individu hingga perusahaan, untuk menjalankan server mereka 
                dengan percaya diri dan tanpa hambatan teknis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap layanan yang kami berikan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Perjalanan Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Milestone penting dalam perkembangan Cecilefy
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white mr-6">
                  {milestone.year}
                </div>
                <div className="flex-1 liquid-glass p-4 rounded-lg">
                  <p className="text-gray-300">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Orang-orang berpengalaman yang berdedikasi untuk memberikan layanan terbaik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ada Pertanyaan?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Tim kami siap membantu Anda dengan pertanyaan apapun tentang layanan hosting kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/cecilefy_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              >
                <span>Hubungi Support</span>
                <span>📞</span>
              </a>
              <a
                href="mailto:support@cecilefy.xyz"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>Email Kami</span>
                <span>✉️</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}