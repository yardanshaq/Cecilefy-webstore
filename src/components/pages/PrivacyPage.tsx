import { motion } from 'motion/react'
import { Shield, Eye, Lock, Users, Database, Bell, ArrowLeft, UserCheck, AlertTriangle, FileText } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useEffect } from 'react'

export function PrivacyPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      id: "introduction",
      title: "1. Pendahuluan",
      icon: Shield,
      content: [
        "Cecilefy berkomitmen untuk melindungi privasi dan keamanan data pribadi pengguna kami.",
        "Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.",
        "Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.",
        "Kami mematuhi peraturan perlindungan data yang berlaku di Indonesia dan standar internasional."
      ]
    },
    {
      id: "collection",
      title: "2. Informasi yang Kami Kumpulkan",
      icon: Database,
      content: [
        "Data Akun: Username, email, password (terenkripsi), dan informasi profil dasar.",
        "Data Pembayaran: Informasi pembayaran yang diperlukan untuk memproses transaksi.",
        "Data Teknis: Alamat IP, browser, perangkat, dan log aktivitas untuk keamanan.",
        "Data Komunikasi: Pesan support, feedback, dan komunikasi dengan tim customer service."
      ]
    },
    {
      id: "usage",
      title: "3. Penggunaan Informasi",
      icon: UserCheck,
      content: [
        "Menyediakan dan memelihara layanan hosting sesuai dengan paket yang dipilih.",
        "Memproses pembayaran dan mengelola akun pengguna secara aman.",
        "Memberikan customer support dan merespons pertanyaan atau masalah teknis.",
        "Mengirim notifikasi penting tentang layanan, pembaruan keamanan, atau perubahan kebijakan."
      ]
    }
  ]

  const dataTypes = [
    { type: "Data Identitas", description: "Nama, email, username", protection: "Enkripsi database" },
    { type: "Data Teknis", description: "IP address, browser info", protection: "Log anonymization" },
    { type: "Data Pembayaran", description: "Transaksi history", protection: "Tokenization" },
    { type: "Data Komunikasi", description: "Support tickets, chat", protection: "Access control" }
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
              <Shield className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Kebijakan Privasi
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Komitmen kami dalam melindungi privasi dan keamanan data pribadi pengguna Cecilefy
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-green-400" />
                Terakhir diperbarui: 15 September 2024
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                Sertifikasi ISO 27001 compliant
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Protection Overview */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Ringkasan Perlindungan Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {dataTypes.map((data, index) => (
                <Card key={index} className="liquid-glass hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{data.type}</h3>
                    <p className="text-sm text-gray-400 mb-3">{data.description}</p>
                    <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-500/30">
                      {data.protection}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass hover:border-purple-500/40 transition-colors duration-300">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Kelola Data Pribadi Anda</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Sebagai pengguna, Anda memiliki hak penuh untuk mengakses, mengoreksi, atau menghapus data pribadi Anda
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <a
                href="mailto:data@cecilefy.xyz?subject=Data Access Request"
                className="inline-flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <Eye className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Akses Data</h3>
                  <p className="text-sm text-gray-400">Lihat data yang kami simpan</p>
                </div>
              </a>
              <a
                href="mailto:data@cecilefy.xyz?subject=Data Correction Request"
                className="inline-flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <UserCheck className="w-8 h-8 text-cyan-400" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Koreksi Data</h3>
                  <p className="text-sm text-gray-400">Perbarui informasi pribadi</p>
                </div>
              </a>
              <a
                href="mailto:data@cecilefy.xyz?subject=Data Deletion Request"
                className="inline-flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Hapus Data</h3>
                  <p className="text-sm text-gray-400">Permintaan penghapusan</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact DPO */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Hubungi Data Protection Officer</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Tim khusus kami siap membantu dengan pertanyaan privasi dan keamanan data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dpo@cecilefy.xyz?subject=Privacy Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
              >
                <span>Email DPO</span>
                <span>🔒</span>
              </a>
              <a
                href="https://t.me/cecilefy_privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>Chat Privacy Team</span>
                <span>💬</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Documents */}
      <section className="py-12 px-4">
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
                href="/terms" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Syarat & Ketentuan</span>
              </a>
              <a 
                href="/cookies" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Cookie Policy</span>
              </a>
              <a 
                href="/security" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Security Policy</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}