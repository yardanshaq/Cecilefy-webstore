import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, ArrowLeft, HelpCircle } from 'lucide-react'

const faqData = [
  {
    question: "Apa itu Panel Pterodactyl dan apa kegunaannya?",
    answer: "Panel Pterodactyl adalah web interface yang memungkinkan Anda mengelola server game dengan mudah. Dengan Pterodactyl, Anda dapat membuat, mengatur, dan memonitor multiple server game seperti Minecraft, Discord Bot, dan aplikasi lainnya melalui dashboard yang user-friendly."
  },
  {
    question: "Apa perbedaan antara Panel Private dan Public?",
    answer: "Panel Private memberikan Anda kontrol penuh sebagai administrator dengan kemampuan membuat unlimited server dan user. Panel Public memberikan akses sebagai user biasa dengan batasan server sesuai paket yang dipilih. Private cocok untuk reseller atau yang butuh kontrol penuh, sementara Public cocok untuk penggunaan personal."
  },
  {
    question: "Bagaimana cara menginstal server Minecraft di panel?",
    answer: "Setelah login ke panel Pterodactyl Anda: 1) Klik \"Create Server\", 2) Pilih \"Minecraft Java Edition\" dari daftar eggs, 3) Atur nama server dan alokasi resources, 4) Klik \"Create\" dan tunggu proses instalasi, 5) Server akan otomatis terinstall dan siap digunakan. Proses biasanya memakan waktu 2-5 menit."
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Kami menerima berbagai metode pembayaran melalui Tripay: Bank Transfer (BCA, BRI, BNI, Mandiri), E-Wallet (OVO, Dana, ShopeePay, LinkAja), Virtual Account, dan QRIS. Pembayaran akan otomatis dikonfirmasi sistem dalam 1-5 menit setelah berhasil."
  },
  {
    question: "Seberapa aman data server saya di Cecilefy?",
    answer: "Server Anda dilindungi dengan: 1) Firewall berlapis dan DDoS protection, 2) SSL encryption untuk semua koneksi, 3) Backup otomatis harian ke multiple lokasi, 4) Monitoring 24/7 dan incident response, 5) Akses terbatas dengan two-factor authentication. Data center menggunakan sertifikasi ISO 27001."
  }
]

export function SimpleFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

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

      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang layanan hosting Cecilefy
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="liquid-glass rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left p-6 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/10">
                        <p className="text-gray-300 leading-relaxed pt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            <h2 className="text-3xl font-bold mb-4">Masih Butuh Bantuan?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Jika tidak menemukan jawaban yang Anda cari, tim support kami siap membantu 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://t.me/cecilefy_admin', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-lg transition-all duration-300 cursor-pointer"
              >
                💬 Chat dengan Support
              </button>
              <button
                onClick={() => window.open('mailto:gg@cecilefy.xyz?subject=FAQ Inquiry', '_blank')}
                className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-all duration-300 cursor-pointer"
              >
                📧 Email Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}