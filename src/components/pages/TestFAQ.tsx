import { motion } from 'motion/react'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { useEffect } from 'react'

export function TestFAQ() {
  useEffect(() => {
    console.log('TestFAQ: Component mounted')
    window.scrollTo(0, 0)
  }, [])

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
                  FAQ Test Page
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Test halaman FAQ untuk debugging routing issue
            </p>
            
            <div className="space-y-6 max-w-2xl mx-auto text-left">
              <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Test Question 1</h3>
                <p className="text-gray-300">
                  Ini adalah test jawaban untuk pertanyaan pertama. Jika Anda dapat membaca ini, 
                  berarti halaman FAQ berhasil dimuat dengan benar.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Test Question 2</h3>
                <p className="text-gray-300">
                  Ini adalah test jawaban untuk pertanyaan kedua. Router dan rendering 
                  berfungsi dengan baik jika halaman ini tampil.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3 text-emerald-400">Router Status</h3>
                <p className="text-gray-300">
                  Current path: {window.location.pathname}<br />
                  Component: TestFAQ<br />
                  Status: ✅ Working
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}