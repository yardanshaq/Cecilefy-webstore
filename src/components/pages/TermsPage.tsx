import { motion } from 'motion/react'
import { FileText, Shield, CreditCard, Users, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useEffect } from 'react'

export function TermsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      id: "acceptance",
      title: "1. Penerimaan Syarat",
      content: [
        "Dengan menggunakan layanan Cecilefy, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.",
        "Jika Anda tidak menyetujui sebagian atau seluruh syarat ini, Anda tidak diperkenankan menggunakan layanan kami.",
        "Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya."
      ]
    },
    {
      id: "services",
      title: "2. Layanan yang Disediakan",
      content: [
        "Cecilefy menyediakan layanan hosting Panel Pterodactyl dengan berbagai paket Private dan Public.",
        "Spesifikasi layanan (RAM, CPU, Storage) sesuai dengan paket yang dipilih dan tertera pada halaman pemesanan.",
        "Kami berusaha memberikan uptime 99.9% namun tidak memberikan garansi 100% tanpa downtime."
      ]
    },
    {
      id: "payment",
      title: "3. Pembayaran dan Penagihan",
      content: [
        "Pembayaran harus dilakukan sesuai dengan metode yang tersedia dan dalam mata uang Rupiah.",
        "Layanan akan diaktifkan setelah pembayaran dikonfirmasi oleh sistem kami.",
        "Tidak ada refund untuk layanan yang telah digunakan, kecuali dalam kasus force majeure."
      ]
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
              <FileText className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Syarat & Ketentuan
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Syarat dan ketentuan penggunaan layanan Cecilefy yang berlaku untuk semua pengguna
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Terakhir diperbarui: 15 September 2024
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                Berlaku untuk semua layanan
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-300 mb-2">Pemberitahuan Penting</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dengan menggunakan layanan Cecilefy, Anda dianggap telah membaca, memahami, dan menyetujui 
                      seluruh syarat dan ketentuan yang tercantum di bawah ini. Pastikan Anda membaca dengan seksama 
                      sebelum menggunakan layanan kami.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 leading-relaxed">{paragraph}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ada Pertanyaan Hukum?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, jangan ragu untuk menghubungi tim legal kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@cecilefy.xyz?subject=Terms and Conditions Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              >
                <span>Email Legal Team</span>
                <span>⚖️</span>
              </a>
              <a
                href="https://t.me/cecilefy_legal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>Chat Legal Support</span>
                <span>💬</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
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
                href="/cookies" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Cookie Policy</span>
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