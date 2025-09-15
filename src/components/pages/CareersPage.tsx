import { motion } from 'motion/react'
import { Briefcase, Users, Trophy, Heart, ArrowLeft, Globe, Shield, Code } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useEffect } from 'react'

export function CareersPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const benefits = [
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Jam kerja fleksibel dan lingkungan kerja yang mendukung keseimbangan hidup"
    },
    {
      icon: Trophy,
      title: "Penghargaan",
      description: "Kesempatan mendapatkan penghargaan dan bonus"
    },
    {
      icon: Users,
      title: "Tim yang Solid",
      description: "Bekerja dengan tim yang suportif dan berpengalaman di bidangnya"
    },
    {
      icon: Globe,
      title: "Remote Friendly",
      description: "Kesempatan kerja remote dan hybrid untuk fleksibilitas maksimal"
    }
  ]

  const openPositions = [
    {
      title: "Backend Developer",
      type: "Full Time",
      location: "Jakarta / Remote",
      department: "Engineering",
      description: "Kami mencari Backend Developer berpengalaman untuk mengembangkan dan memelihara infrastruktur server kami.",
      requirements: [
        "Pengalaman 2+ tahun dengan Node.js/Python",
        "Familiar dengan Docker dan Kubernetes",
        "Pengalaman dengan cloud providers (AWS/GCP)",
        "Pemahaman database PostgreSQL/MySQL"
      ],
      responsibilities: [
        "Mengembangkan API dan microservices",
        "Optimasi performa server dan database",
        "Implementasi security best practices",
        "Maintenance dan monitoring sistem"
      ]
    },
    {
      title: "Customer Support Specialist",
      type: "Full Time",
      location: "Jakarta / Remote",
      department: "Customer Success",
      description: "Bergabunglah dengan tim customer support kami untuk membantu pelanggan dengan pertanyaan teknis dan non-teknis.",
      requirements: [
        "Pengalaman customer service 1+ tahun",
        "Pemahaman dasar server dan hosting",
        "Komunikasi yang baik dalam Bahasa Indonesia dan Inggris",
        "Bisa bekerja shift termasuk weekend"
      ],
      responsibilities: [
        "Merespon ticket support pelanggan",
        "Troubleshooting masalah teknis",
        "Membuat dokumentasi dan FAQ",
        "Koordinasi dengan tim teknis"
      ]
    },
    {
      title: "DevOps Engineer",
      type: "Full Time",
      location: "Jakarta / Remote",
      department: "Engineering",
      description: "Kami membutuhkan DevOps Engineer untuk mengelola infrastruktur cloud dan automasi deployment.",
      requirements: [
        "Pengalaman 3+ tahun dengan Linux administration",
        "Expertise dengan Terraform dan Ansible",
        "Pengalaman dengan monitoring tools (Prometheus, Grafana)",
        "Knowledge networking dan security"
      ],
      responsibilities: [
        "Mengelola infrastruktur cloud",
        "Setup CI/CD pipelines",
        "Monitoring dan alerting sistem",
        "Incident response dan troubleshooting"
      ]
    },
    {
      title: "Frontend Developer",
      type: "Part Time",
      location: "Remote",
      department: "Engineering",
      description: "Kesempatan part-time untuk Frontend Developer yang ingin berkontribusi pada dashboard dan website kami.",
      requirements: [
        "Pengalaman 2+ tahun dengan React/Vue.js",
        "Familiar dengan Tailwind CSS",
        "Pemahaman responsive design",
        "Portfolio project yang dapat ditunjukkan"
      ],
      responsibilities: [
        "Develop dan maintain dashboard pelanggan",
        "Improve user experience website",
        "Kolaborasi dengan tim backend",
        "Testing dan bug fixing"
      ]
    }
  ]

  const workCulture = [
    {
      title: "Innovation First",
      description: "Kami mendorong inovasi dan eksperimen dalam setiap project"
    },
    {
      title: "Continuous Learning",
      description: "Budget khusus untuk training, conference, dan sertifikasi"
    },
    {
      title: "Open Communication",
      description: "Komunikasi terbuka di semua level tanpa hierarki yang kaku"
    },
    {
      title: "Result Oriented",
      description: "Focus pada hasil dan impact, bukan jam kerja yang panjang"
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
              <Briefcase className="w-12 h-12 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Karir di Cecilefy
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Bergabunglah dengan tim yang passionate dalam membangun masa depan hosting 
              dan cloud infrastructure di Indonesia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 cursor-pointer"
              >
                Lihat Posisi Terbuka
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:hr@cecilefy.xyz?subject=Spontaneous Application', '_blank')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 cursor-pointer"
              >
                Kirim CV Inititatif
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Mengapa Bergabung dengan Kami?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Benefit dan fasilitas yang akan Anda dapatkan sebagai bagian dari tim Cecilefy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
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
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Culture */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Budaya Kerja Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi lingkungan kerja di Cecilefy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workCulture.map((culture, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{culture.title}</h3>
                  <p className="text-gray-400">{culture.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Posisi yang Tersedia</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Temukan kesempatan karir yang sesuai dengan keahlian dan minat Anda
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="liquid-glass hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-2xl font-bold text-white mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {position.type}
                          </Badge>
                          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                            {position.location}
                          </Badge>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            {position.department}
                          </Badge>
                        </div>
                        <p className="text-gray-400">{position.description}</p>
                      </div>
                      <Button
                        onClick={() => window.open(`mailto:hr@cecilefy.xyz?subject=Application for ${position.title}&body=Hi,%0A%0AI'm interested in the ${position.title} position. Please find my CV attached.%0A%0ARegards`, '_blank')}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 flex-shrink-0 cursor-pointer"
                      >
                        Lamar Sekarang
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          Requirements
                        </h4>
                        <ul className="space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-sm text-gray-400 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <Code className="w-4 h-4 text-cyan-400" />
                          Responsibilities
                        </h4>
                        <ul className="space-y-1">
                          {position.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="text-sm text-gray-400 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Proses Rekrutment</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tahapan seleksi yang transparan dan profesional
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: "Aplikasi", description: "Kirim CV dan portfolio melalui email atau form online" },
                { step: 2, title: "Screening", description: "Review awal CV dan portfolio oleh tim HR" },
                { step: 3, title: "Technical Test", description: "Test teknis sesuai dengan posisi yang dilamar" },
                { step: 4, title: "Interview", description: "Wawancara dengan hiring manager dan tim terkait" },
                { step: 5, title: "Final Decision", description: "Keputusan final dan penawaran kerja" }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white">
                    {process.step}
                  </div>
                  <div className="flex-1 liquid-glass p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-1">{process.title}</h4>
                    <p className="text-gray-400 text-sm">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Pertanyaan Tentang Karir?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Tim HR kami siap membantu menjawab pertanyaan Anda tentang kesempatan karir di Cecilefy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open('mailto:hr@cecilefy.xyz?subject=Career Inquiry', '_blank')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 cursor-pointer"
              >
                <span>Email HR Team</span>
                <span className="ml-2">📧</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://t.me/cecilefy_hr', '_blank')}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 cursor-pointer"
              >
                <span>Chat via Telegram</span>
                <span className="ml-2">💬</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}