import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Shield, User, Mail, Package, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'
import { siteConfig } from '../config/site'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { ConfirmationModal } from './ConfirmationModal'
import { PaymentPage } from './PaymentPage'

interface PanelPackage {
  ram: number
  price: number
  label: string
}

export function PurchaseForm() {
  const [formData, setFormData] = useState({
    panelType: '',
    username: '',
    email: '',
    packageId: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PanelPackage | null>(null)
  const [availablePackages, setAvailablePackages] = useState<PanelPackage[]>([])
  
  // Modal states
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false
  })
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    paymentData: null,
    orderId: '',
    orderData: null
  })
  
  // Show payment page
  const [showPaymentPage, setShowPaymentPage] = useState(false)

  // Update available packages when panel type changes
  useEffect(() => {
    if (formData.panelType) {
      const panelConfig = formData.panelType === 'private' 
        ? siteConfig.panels.private 
        : siteConfig.panels.public
      setAvailablePackages(panelConfig.packages)
      
      // Only reset package selection if current package is not available in new panel type
      const currentPackageExists = panelConfig.packages.some(pkg => pkg.label === formData.packageId)
      if (!currentPackageExists) {
        setFormData(prev => ({ ...prev, packageId: '' }))
        setSelectedPackage(null)
      }
    }
  }, [formData.panelType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.panelType || !formData.username || !formData.email || !formData.packageId) {
      toast.error('Harap lengkapi semua field')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Format email tidak valid')
      return
    }

    // Show confirmation modal instead of directly creating order
    setConfirmationModal({
      isOpen: true
    })
  }

  const handleConfirmOrder = async (paymentMethod: string) => {
    setIsLoading(true)
    
    try {
      // Generate order ID
      const orderId = `CEC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Prepare order data
      const orderData = {
        orderId,
        username: formData.username,
        email: formData.email,
        panelType: formData.panelType,
        package: selectedPackage,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      
      // Save to localStorage for transaction history
      const existingOrders = JSON.parse(localStorage.getItem('cecilefy_orders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('cecilefy_orders', JSON.stringify(existingOrders))
      
      // Send to backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b252ddda/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.payment) {
          toast.success('🎉 Pesanan berhasil dibuat!')
          toast.info('💳 Silakan lanjutkan pembayaran')
          
          // Close confirmation modal
          setConfirmationModal({ isOpen: false })
          
          // Show payment modal
          setPaymentModal({
            isOpen: true,
            paymentData: result.payment,
            orderId: result.orderId,
            orderData
          })
          
          // Show payment page instead of modal
          setShowPaymentPage(true)
          
          // Don't reset form data yet - wait until payment is complete
        } else {
          throw new Error(result.message || 'Gagal membuat pesanan')
        }
        
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal membuat pesanan')
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(`❌ ${error.message || 'Terjadi kesalahan, silakan coba lagi'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseConfirmationModal = () => {
    // Don't reset form data when closing confirmation modal
    setConfirmationModal({ isOpen: false })
  }

  const handleClosePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      paymentData: null,
      orderId: '',
      orderData: null
    })
    
    // Hide payment page
    setShowPaymentPage(false)
    
    // Only reset form after payment modal is closed
    setFormData({
      panelType: '',
      username: '',
      email: '',
      packageId: ''
    })
    setSelectedPackage(null)
    setAvailablePackages([])
  }

  const handlePackageChange = (packageId: string) => {
    setFormData(prev => ({ ...prev, packageId }))
    const pkg = availablePackages.find(p => p.label === packageId)
    setSelectedPackage(pkg || null)
  }

  return (
    <>
      {showPaymentPage ? (
        <PaymentPage
          paymentData={paymentModal.paymentData}
          orderId={paymentModal.orderId}
          orderData={paymentModal.orderData}
          onBack={handleClosePaymentModal}
        />
      ) : (
        <>
          <section id="purchase" className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
            <div className="container mx-auto">
              <motion.div 
                className="rounded-2xl max-w-2xl mx-auto shadow-2xl border border-white/20 overflow-hidden bg-black/60 backdrop-blur-xl shadow-white/10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                <div className="p-8">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-200 border border-purple-400/30 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-lg shadow-purple-500/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <strong className="block text-white text-xl mb-3 font-medium">
                      🎉 Selamat Datang di Cecilefy!
                    </strong>
                    <p className="text-purple-100 leading-relaxed">
                      Dapatkan Panel Pterodactyl premium dengan performa terbaik. 
                      Panel aktif dalam <span className="font-semibold text-white bg-purple-500/20 px-2 py-1 rounded">5-10 menit</span> setelah pembayaran dikonfirmasi.
                    </p>
                    <p className="text-purple-100 mt-2">
                      💬 Admin akan mengirimkan detail akun melalui email setelah pembayaran.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Panel Type */}
                    <div className="space-y-3">
                      <Label htmlFor="panelType" className="text-lg font-medium flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                          <Shield className="w-5 h-5 text-purple-300" />
                        </div>
                        Tipe Panel Pterodactyl
                      </Label>
                      <Select value={formData.panelType} onValueChange={(value) => setFormData(prev => ({ ...prev, panelType: value }))}>
                        <SelectTrigger className="w-full h-16 text-base liquid-glass text-white hover:border-purple-400/40 focus:border-purple-400/60">
                          <SelectValue placeholder="Pilih tipe panel" className="text-gray-300" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl shadow-white/10">
                          <SelectItem value="private" className="hover:bg-white/10 focus:bg-white/10 text-white">
                            Panel Private Pterodactyl - {siteConfig.panels.private.description}
                          </SelectItem>
                          <SelectItem value="public" className="hover:bg-white/10 focus:bg-white/10 text-white">
                            Panel Public Pterodactyl - {siteConfig.panels.public.description}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Username */}
                    <div className="space-y-3">
                      <Label htmlFor="username" className="text-lg font-medium flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                          <User className="w-5 h-5 text-purple-300" />
                        </div>
                        Username
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Masukkan username"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          className="h-16 text-base pl-12 liquid-glass text-white placeholder:text-gray-400 focus:border-purple-400/60"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-medium flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                          <Mail className="w-5 h-5 text-purple-300" />
                        </div>
                        Email
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Masukkan email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-16 text-base pl-12 liquid-glass text-white placeholder:text-gray-400 focus:border-purple-400/60"
                          required
                        />
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="space-y-3">
                      <Label htmlFor="package" className="text-lg font-medium flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                          <Package className="w-5 h-5 text-purple-300" />
                        </div>
                        Pilih Paket
                      </Label>
                      <Select 
                        value={formData.packageId} 
                        onValueChange={handlePackageChange}
                        disabled={!formData.panelType}
                      >
                        <SelectTrigger className="w-full h-16 text-base liquid-glass text-white hover:border-purple-400/40 focus:border-purple-400/60 disabled:opacity-50 disabled:cursor-not-allowed">
                          <SelectValue placeholder={formData.panelType ? "Pilih paket" : "Pilih tipe panel dulu"} className="text-gray-300" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl shadow-white/10">
                          {availablePackages.map((pkg) => (
                            <SelectItem key={pkg.label} value={pkg.label} className="hover:bg-white/10 focus:bg-white/10 text-white">
                              {pkg.label} - Rp {pkg.price.toLocaleString('id-ID')} / bulan
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Package Details */}
                    {selectedPackage && (
                      <motion.div 
                        className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20 shadow-lg shadow-purple-500/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-xl font-medium text-white mb-4">Detail Paket</h4>
                        
                        {/* Specifications */}
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <span className="text-gray-400 text-sm">RAM:</span>
                              <span className="text-white font-medium text-lg block">
                                {selectedPackage.ram === -1 ? '3072 MB' : `${selectedPackage.ram * 1024} MB`}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <span className="text-gray-400 text-sm">Disk:</span>
                              <span className="text-white font-medium text-lg block">
                                {selectedPackage.ram === -1 ? '3360 MB' : `${selectedPackage.ram * 1024 + 360} MB`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <span className="text-gray-400 text-sm">CPU:</span>
                              <span className="text-white font-medium text-lg block">
                                {selectedPackage.ram === -1 ? '120%' : `${Math.min(selectedPackage.ram * 25, 200)}%`}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <span className="text-gray-400 text-sm">Harga:</span>
                              <span className="text-red-400 font-medium text-lg block">
                                Rp {selectedPackage.price.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-4">
                          Performa ekstra untuk kebutuhan sedang
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          <p className="text-white font-medium mb-3">Fitur:</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400" />
                              <span>{selectedPackage.ram === -1 ? '3GB RAM' : `${selectedPackage.ram}GB RAM`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400" />
                              <span>{selectedPackage.ram === -1 ? '3GB Disk' : `${selectedPackage.ram}GB Disk`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400" />
                              <span>{selectedPackage.ram === -1 ? '120% CPU' : `${Math.min(selectedPackage.ram * 25, 200)}% CPU`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-green-400" />
                              <span>Support 24/7</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isLoading || confirmationModal.isOpen}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-16 text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 border-0 text-white cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          ⏳ Memproses...
                        </span>
                      ) : (
                        '🚀 Beli Sekarang'
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={confirmationModal.isOpen}
            onClose={handleCloseConfirmationModal}
            onConfirm={handleConfirmOrder}
            formData={formData}
            selectedPackage={selectedPackage}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  )
}