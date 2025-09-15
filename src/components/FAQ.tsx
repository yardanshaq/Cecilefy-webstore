import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    question: "Apa itu panel Pterodactyl?",
    answer: "Panel Pterodactyl adalah layanan hosting premium yang memberikan Anda kontrol penuh atas server virtual pribadi dengan antarmuka yang mudah digunakan. Anda dapat mengelola aplikasi, database, dan file dengan mudah."
  },
  {
    question: "Apakah saya bisa menjual ulang hosting?",
    answer: "Ya! Paket Reseller kami memungkinkan Anda untuk menjual kembali layanan hosting dengan white-label branding. Anda akan mendapatkan panel admin untuk mengelola klien dan paket hosting."
  },
  {
    question: "Bagaimana cara upgrade atau downgrade paket?",
    answer: "Anda dapat upgrade paket kapan saja melalui panel control atau dengan menghubungi customer service kami. Downgrade dapat dilakukan pada akhir periode billing untuk menghindari kehilangan data."
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima pembayaran melalui transfer bank, e-wallet (OVO, Dana, GoPay), dan payment gateway lainnya. Pembayaran akan dikonfirmasi dalam 1-24 jam."
  },
  {
    question: "Berapa lama hosting aktif setelah pembayaran?",
    answer: "Hosting akan aktif dalam 5-10 menit setelah pembayaran dikonfirmasi. Anda akan menerima email dengan detail akses dan panduan setup."
  },
  {
    question: "Apakah ada garansi uptime?",
    answer: "Ya, kami memberikan garansi uptime 99.9%. Jika server down lebih dari yang dijanjikan, Anda akan mendapatkan kompensasi berupa perpanjangan layanan."
  },
  {
    question: "Bagaimana cara backup data?",
    answer: "Sistem backup otomatis dilakukan setiap hari. Anda juga dapat membuat backup manual melalui panel control. Data backup disimpan selama 30 hari."
  },
  {
    question: "Apakah ada batasan bandwidth?",
    answer: "Semua paket kami menggunakan unlimited bandwidth dengan fair usage policy. Untuk traffic yang sangat tinggi, kami akan menghubungi Anda untuk diskusi upgrade."
  },
  {
    question: "Bagaimana cara migrasi dari hosting lain?",
    answer: "Tim kami dapat membantu migrasi gratis dari hosting lain. Silakan hubungi customer service dengan detail hosting lama Anda, dan kami akan mengurus prosesnya."
  },
  {
    question: "Bagaimana jika saya lupa password panel?",
    answer: "Anda dapat reset password melalui fitur 'Lupa Password' di halaman login, atau hubungi customer service kami dengan menyertakan email dan username akun Anda."
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="faq" className="py-16 bg-black/20 border-t border-purple-500/20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Pertanyaan Umum
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Masih bingung? Berikut adalah beberapa pertanyaan yang sering ditanyakan oleh pengguna kami.
        </motion.p>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black/40 border border-purple-500/20 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                className="flex justify-between items-center w-full text-left text-white font-semibold text-lg p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                {item.question}
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-4 text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}