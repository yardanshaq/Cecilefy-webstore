import { motion, AnimatePresence } from 'motion/react'
import { Search, ArrowLeft, HelpCircle, Book, Zap, CreditCard, Shield, ChevronDown, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Input } from '../ui/input'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export function FAQPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'Semua', icon: Search, color: 'bg-gradient-to-r from-purple-500 to-cyan-500' },
    { id: 'general', name: 'Umum', icon: Book, color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { id: 'technical', name: 'Teknis', icon: Zap, color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { id: 'billing', name: 'Billing', icon: CreditCard, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'security', name: 'Keamanan', icon: Shield, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ]

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'Apa itu Panel Pterodactyl dan apa kegunaannya?',
      answer: 'Panel Pterodactyl adalah web interface yang memungkinkan Anda mengelola server game dengan mudah. Dengan Pterodactyl, Anda dapat membuat, mengatur, dan memonitor multiple server game seperti Minecraft, Discord Bot, dan aplikasi lainnya melalui dashboard yang user-friendly.',
      tags: ['pterodactyl', 'panel', 'server management']
    },
    {
      id: 2,
      category: 'general',
      question: 'Apa perbedaan antara Panel Private dan Public?',
      answer: 'Panel Private memberikan Anda kontrol penuh sebagai administrator dengan kemampuan membuat unlimited server dan user. Panel Public memberikan akses sebagai user biasa dengan batasan server sesuai paket yang dipilih. Private cocok untuk reseller atau yang butuh kontrol penuh, sementara Public cocok untuk penggunaan personal.',
      tags: ['private', 'public', 'perbedaan', 'paket']
    },
    {
      id: 3,
      category: 'technical',
      question: 'Bagaimana cara menginstal server Minecraft di panel?',
      answer: 'Setelah login ke panel Pterodactyl Anda: 1) Klik "Create Server", 2) Pilih "Minecraft Java Edition" dari daftar eggs, 3) Atur nama server dan alokasi resources, 4) Klik "Create" dan tunggu proses instalasi, 5) Server akan otomatis terinstall dan siap digunakan. Proses biasanya memakan waktu 2-5 menit.',
      tags: ['minecraft', 'instalasi', 'server', 'tutorial']
    },
    {
      id: 4,
      category: 'technical',
      question: 'Apakah saya bisa upgrade RAM server kapan saja?',
      answer: 'Ya, Anda dapat upgrade RAM server kapan saja dengan menghubungi customer support kami. Upgrade akan diproses dalam 1x24 jam setelah pembayaran konfirmasi. Namun, downgrade RAM tidak dapat dilakukan dan server perlu direstart untuk menerapkan upgrade.',
      tags: ['upgrade', 'ram', 'resource', 'server']
    },
    {
      id: 5,
      category: 'billing',
      question: 'Metode pembayaran apa saja yang diterima?',
      answer: 'Kami menerima berbagai metode pembayaran melalui Tripay: Bank Transfer (BCA, BRI, BNI, Mandiri), E-Wallet (OVO, Dana, ShopeePay, LinkAja), Virtual Account, dan QRIS. Pembayaran akan otomatis dikonfirmasi sistem dalam 1-5 menit setelah berhasil.',
      tags: ['pembayaran', 'tripay', 'bank', 'ewallet']
    },
    {
      id: 6,
      category: 'billing',
      question: 'Apakah ada refund jika saya tidak puas?',
      answer: 'Kami menyediakan garansi uang kembali 100% dalam 7 hari pertama jika Anda tidak puas dengan layanan kami (khusus untuk pembelian pertama). Syarat refund adalah tidak ada pelanggaran terms of service dan penggunaan resources wajar.',
      tags: ['refund', 'garansi', 'uang kembali']
    },
    {
      id: 7,
      category: 'security',
      question: 'Seberapa aman data server saya di Cecilefy?',
      answer: 'Server Anda dilindungi dengan: 1) Firewall berlapis dan DDoS protection, 2) SSL encryption untuk semua koneksi, 3) Backup otomatis harian ke multiple lokasi, 4) Monitoring 24/7 dan incident response, 5) Akses terbatas dengan two-factor authentication. Data center menggunakan sertifikasi ISO 27001.',
      tags: ['keamanan', 'firewall', 'ddos', 'backup', 'ssl']
    },
    {
      id: 8,
      category: 'technical',
      question: 'Bagaimana cara backup server saya?',
      answer: 'Backup dapat dilakukan dengan beberapa cara: 1) Backup otomatis sistem (tersedia untuk paket tertentu), 2) Manual backup melalui panel dengan klik "Create Backup" di server settings, 3) Download files via SFTP untuk backup lokal. Kami rekomendasikan backup rutin setiap 3-7 hari.',
      tags: ['backup', 'restore', 'data', 'sftp']
    },
    {
      id: 9,
      category: 'general',
      question: 'Apakah ada batasan jumlah player online?',
      answer: 'Batasan player tergantung pada resources yang dialokasikan. Sebagai patokan: 1GB RAM = ~20-30 player Minecraft, 2GB RAM = ~40-60 player, dst. Untuk game lain, limitasi berbeda-beda. Anda bisa upgrade resources jika butuh menampung lebih banyak player.',
      tags: ['player limit', 'resources', 'minecraft', 'capacity']
    },
    {
      id: 10,
      category: 'technical',
      question: 'Bisakah saya install mod atau plugin custom?',
      answer: 'Ya, Anda memiliki akses penuh untuk install mod, plugin, atau custom software. Untuk Minecraft, Anda bisa install Forge mods, Bukkit/Spigot plugins, atau Fabric mods. Untuk server lain, Anda juga bisa upload file custom selama tidak melanggar terms of service.',
      tags: ['mods', 'plugins', 'custom', 'minecraft', 'forge']
    },
    {
      id: 11,
      category: 'billing',
      question: 'Bagaimana cara perpanjang layanan?',
      answer: 'Perpanjangan dapat dilakukan melalui: 1) Dashboard customer dengan klik "Renew Service", 2) Menghubungi customer support, 3) Pembayaran otomatis akan ditagihkan 3 hari sebelum expired (jika diaktifkan). Kami akan kirim reminder email 7 hari sebelum expiry.',
      tags: ['perpanjang', 'renewal', 'expired', 'auto renewal']
    },
    {
      id: 12,
      category: 'security',
      question: 'Apa yang harus dilakukan jika server di-hack?',
      answer: 'Jika mencurigai server di-hack: 1) Segera hubungi support team kami, 2) Ganti semua password (panel, SFTP, database), 3) Aktifkan 2FA jika belum, 4) Tim security kami akan investigasi dan membantu recovery, 5) Restore dari backup terakhir jika diperlukan.',
      tags: ['hack', 'security', 'password', '2fa', 'recovery']
    },
    {
      id: 13,
      category: 'technical',
      question: 'Mengapa server saya sering lag atau crash?',
      answer: 'Penyebab umum lag/crash: 1) Resources tidak cukup (upgrade RAM/CPU), 2) Too many plugins/mods (disable yang tidak perlu), 3) Memory leak (restart server secara berkala), 4) Network issue (hubungi support), 5) Corrupt world/data (restore backup). Kami provide monitoring tools untuk diagnosa.',
      tags: ['lag', 'crash', 'performance', 'resources', 'troubleshooting']
    },
    {
      id: 14,
      category: 'general',
      question: 'Apakah saya bisa menjalankan multiple server sekaligus?',
      answer: 'Untuk Panel Private: Ya, Anda bisa membuat unlimited server sesuai total resources yang tersedia. Untuk Panel Public: Terbatas sesuai paket (1-3 server). Setiap server akan menggunakan portion dari total RAM dan CPU yang dialokasikan.',
      tags: ['multiple server', 'private', 'public', 'resources']
    },
    {
      id: 15,
      category: 'billing',
      question: 'Bagaimana cara menjadi reseller Cecilefy?',
      answer: 'Untuk menjadi reseller: 1) Daftar paket Panel Private, 2) Hubungi tim sales untuk reseller agreement, 3) Dapatkan white-label branding dan custom domain, 4) Setup pricing dan payment gateway Anda, 5) Mulai jual hosting dengan support dari tim kami.',
      tags: ['reseller', 'white label', 'private panel', 'partnership']
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const popularFAQs = [1, 2, 3, 5, 7]

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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cari pertanyaan atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white/5 border-white/20 rounded-xl focus:border-purple-500 focus:ring-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{faqs.length}+</div>
                <div className="text-gray-400">Pertanyaan Dijawab</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-400">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">&lt;5 min</div>
                <div className="text-gray-400">Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
                <Badge className="bg-white/20 text-xs">
                  {category.id === 'all' ? faqs.length : faqs.filter(faq => faq.category === category.id).length}
                </Badge>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular FAQs */}
      {searchQuery === '' && activeCategory === 'all' && (
        <section className="py-8 px-4 bg-black/30">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">🔥 Pertanyaan Populer</h2>
              <p className="text-gray-400">Pertanyaan yang paling sering ditanyakan oleh pengguna kami</p>
            </motion.div>

            <div className="grid gap-4">
              {faqs.filter(faq => popularFAQs.includes(faq.id)).slice(0, 3).map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="liquid-glass hover:border-purple-500/40 transition-colors duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      >
                        <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                        <ChevronDown className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-white/10 mt-4">
                              <p className="text-gray-300 leading-relaxed mb-4">{faq.answer}</p>
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All FAQs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 
               activeCategory === 'all' ? 'Semua Pertanyaan' : 
               `Kategori: ${categories.find(cat => cat.id === activeCategory)?.name}`}
            </h2>
            <p className="text-gray-400">
              {filteredFAQs.length} pertanyaan ditemukan
            </p>
          </motion.div>

          {filteredFAQs.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Tidak Ada Hasil</h3>
              <p className="text-gray-400 mb-6">Coba kata kunci lain atau hubungi support kami</p>
              <Button
                onClick={() => window.open('https://t.me/cecilefy_support', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Tanya Support
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="liquid-glass hover:border-purple-500/40 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-start gap-4 flex-1">
                          {popularFAQs.includes(faq.id) && (
                            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                              Popular
                            </Badge>
                          )}
                          <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-white/10 mt-4">
                              <p className="text-gray-300 leading-relaxed mb-4">{faq.answer}</p>
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs cursor-pointer"
                                         onClick={() => setSearchQuery(tag)}>
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
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
              <Button
                onClick={() => window.open('https://t.me/cecilefy_support', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat dengan Support
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('mailto:support@cecilefy.xyz?subject=FAQ Inquiry', '_blank')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 cursor-pointer"
              >
                <span>Email Support</span>
                <span className="ml-2">📧</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}