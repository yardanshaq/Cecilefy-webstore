import { motion } from 'motion/react'
import { Cookie, Settings, Shield, Eye, ArrowLeft, CheckCircle, AlertTriangle, FileText } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useEffect } from 'react'

export function CookiePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Cookie yang diperlukan untuk fungsi dasar website",
      examples: ["Session management", "Security tokens", "Login state"],
      canDisable: false,
      purpose: "Memastikan website berfungsi dengan baik dan aman"
    },
    {
      type: "Performance Cookies", 
      description: "Cookie untuk menganalisis performa website",
      examples: ["Page load times", "Error tracking", "Usage analytics"],
      canDisable: true,
      purpose: "Membantu kami meningkatkan kecepatan dan stabilitas layanan"
    },
    {
      type: "Functional Cookies",
      description: "Cookie untuk meningkatkan pengalaman pengguna",
      examples: ["Language preferences", "Theme settings", "Remember choices"],
      canDisable: true,
      purpose: "Menyimpan preferensi dan pengaturan pengguna"
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Analisis trafik website dan perilaku pengguna",
      data: "Anonymized usage data, page views, session duration",
      retention: "26 bulan",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      name: "Tripay",
      purpose: "Payment gateway untuk proses pembayaran",
      data: "Transaction data, payment status",
      retention: "5 tahun (sesuai regulasi keuangan)",
      optOut: "Tidak dapat dinonaktifkan (essential untuk pembayaran)"
    }
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cookie className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Cookie Policy
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Informasi lengkap tentang penggunaan cookie di website Cecilefy dan cara mengelolanya
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Terakhir diperbarui: 15 September 2024
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                GDPR & CCPA Compliant
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="liquid-glass">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-bold text-white">Apa itu Cookie?</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    Cookie adalah file teks kecil yang disimpan di perangkat Anda ketika mengunjungi website. 
                    Cookie membantu website "mengingat" informasi tentang kunjungan Anda, seperti preferensi bahasa 
                    dan pengaturan lainnya.
                  </p>
                  <p className="leading-relaxed">
                    Di Cecilefy, kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda, 
                    menganalisis performa website, dan memastikan keamanan layanan kami.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Jenis Cookie yang Kami Gunakan</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Penjelasan detail tentang berbagai jenis cookie dan tujuan penggunaannya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass h-full hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{cookie.type}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        cookie.canDisable 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                          : 'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
                        {cookie.canDisable ? 'Optional' : 'Essential'}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{cookie.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Contoh:</h4>
                        <ul className="space-y-1">
                          {cookie.examples.map((example, exIndex) => (
                            <li key={exIndex} className="text-xs text-gray-400 flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Tujuan:</h4>
                        <p className="text-xs text-gray-400">{cookie.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Layanan Pihak Ketiga</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kami menggunakan beberapa layanan pihak ketiga yang mungkin mengatur cookie mereka sendiri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass hover:border-purple-500/40 transition-colors duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-400" />
                      {service.name}
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Tujuan: </span>
                        <span className="text-gray-300">{service.purpose}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Data yang dikumpulkan: </span>
                        <span className="text-gray-300">{service.data}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Masa penyimpanan: </span>
                        <span className="text-gray-300">{service.retention}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Opt-out: </span>
                        {service.optOut.startsWith('http') ? (
                          <a 
                            href={service.optOut} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Klik di sini
                          </a>
                        ) : (
                          <span className="text-gray-300">{service.optOut}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Mengelola Cookie</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Anda memiliki kontrol penuh terhadap cookie yang disimpan di perangkat Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="liquid-glass">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-cyan-400" />
                  Pengaturan Browser
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>Anda dapat mengelola cookie melalui pengaturan browser:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      Blokir semua cookie (dapat mempengaruhi fungsi website)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      Hapus cookie yang sudah ada
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      Atur notifikasi sebelum cookie disimpan
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="liquid-glass">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  Cookie Preferences
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Kami menghormati pilihan Anda terkait cookie dan privasi.
                  </p>
                  <button 
                    onClick={() => alert('Cookie preferences akan segera tersedia!')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
                  >
                    Kelola Preferensi Cookie
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Pertanyaan tentang Cookie?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan tentang penggunaan cookie di website kami, jangan ragu untuk menghubungi tim kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@cecilefy.xyz?subject=Cookie Policy Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              >
                <span>Email Privacy Team</span>
                <span>🍪</span>
              </a>
              <a
                href="https://t.me/cecilefy_privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>Chat Support</span>
                <span>💬</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Documents */}
      <section className="py-12 px-4 bg-black/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Dokumen Terkait</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/privacy" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Kebijakan Privasi</span>
              </a>
              <a 
                href="/terms" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Syarat & Ketentuan</span>
              </a>
              <a 
                href="/about" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Tentang Kami</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}