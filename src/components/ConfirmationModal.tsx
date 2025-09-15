import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { X, Shield, HardDrive, Cpu, CreditCard, Banknote, Package } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { toast } from 'sonner@2.0.3'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface PanelPackage {
  ram: number
  price: number
  label: string
}

interface FormData {
  panelType: string
  username: string
  email: string
  packageId: string
}

interface PaymentMethod {
  code: string
  name: string
  type: string
  fee_merchant: {
    flat: number
    percent: number
  }
  fee_customer: {
    flat: number
    percent: number
  }
  total_fee: {
    flat: number
    percent: number
  }
  minimum_fee: number
  maximum_fee: number
  icon_url: string
  active: boolean
}

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (paymentMethod: string) => void
  formData: FormData
  selectedPackage: PanelPackage | null
  isLoading: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
  selectedPackage,
  isLoading
}: ConfirmationModalProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [loadingMethods, setLoadingMethods] = useState(false)

  // Fetch payment methods when modal opens
  useEffect(() => {
    if (isOpen && paymentMethods.length === 0) {
      fetchPaymentMethods()
    }
  }, [isOpen])

  const fetchPaymentMethods = async () => {
    setLoadingMethods(true)
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b252ddda/payment-methods`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          // Filter active payment methods
          const activeMethods = result.data.filter((method: PaymentMethod) => method.active)
          setPaymentMethods(activeMethods)
          
          // Auto select first method
          if (activeMethods.length > 0) {
            setSelectedPayment(activeMethods[0].code)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      toast.error('Gagal memuat metode pembayaran')
    } finally {
      setLoadingMethods(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateTotal = (basePrice: number, paymentCode: string) => {
    const method = paymentMethods.find(m => m.code === paymentCode)
    if (!method) return basePrice

    const flatFee = method.fee_customer.flat
    const percentFee = (basePrice * method.fee_customer.percent) / 100
    const totalFee = Math.max(flatFee + percentFee, method.minimum_fee)
    
    return basePrice + (method.maximum_fee ? Math.min(totalFee, method.maximum_fee) : totalFee)
  }

  const handleConfirm = () => {
    if (!selectedPayment) {
      toast.error('Silakan pilih metode pembayaran')
      return
    }
    onConfirm(selectedPayment)
  }

  const handleClose = () => {
    // Don't reset form data when closing
    onClose()
  }

  if (!selectedPackage) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl mx-auto glass-card text-white shadow-2xl shadow-white/10 max-h-[90vh] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10 p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl text-white font-medium">
              <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                <Shield className="w-6 h-6 text-blue-300" />
              </div>
              Konfirmasi Pembelian
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              Anda akan membeli <span className="font-semibold text-blue-300 capitalize">{formData.panelType} Panel</span> dengan paket <span className="font-semibold text-blue-300">{selectedPackage.label}</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[60vh] px-6">
          <div className="space-y-6 py-6">
            {/* Package Details */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 shadow-lg shadow-blue-500/10">
              <h4 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-300" />
                Detail Paket
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-blue-300" />
                  </div>
                  <span className="text-gray-400 block mb-1">RAM</span>
                  <span className="text-blue-300 font-medium text-lg">
                    {selectedPackage.ram === -1 ? 'Unlimited' : `${selectedPackage.ram} GB`}
                  </span>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <HardDrive className="w-6 h-6 text-green-300" />
                  </div>
                  <span className="text-gray-400 block mb-1">Disk</span>
                  <span className="text-green-300 font-medium text-lg">
                    {selectedPackage.ram === -1 ? 'Unlimited' : `${selectedPackage.ram * 2} GB`}
                  </span>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Cpu className="w-6 h-6 text-purple-300" />
                  </div>
                  <span className="text-gray-400 block mb-1">CPU</span>
                  <span className="text-purple-300 font-medium text-lg">
                    {selectedPackage.ram === -1 ? 'Unlimited' : `${Math.min(selectedPackage.ram * 25, 200)}%`}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <div className="text-gray-400 mb-2">Harga Paket</div>
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(selectedPackage.price)}
                </div>
                <div className="text-gray-400 text-sm mt-1">per bulan</div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg shadow-white/5">
              <h4 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-300" />
                Pilih Metode Pembayaran
              </h4>

              {loadingMethods ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-300">Memuat metode pembayaran...</span>
                </div>
              ) : (
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.code}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <RadioGroupItem 
                        value={method.code} 
                        id={method.code}
                        className="border-white/30 text-blue-400"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        {method.icon_url ? (
                          <img 
                            src={method.icon_url} 
                            alt={method.name}
                            className="w-8 h-8 rounded object-contain bg-white p-1"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center">
                            <Banknote className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1">
                          <Label htmlFor={method.code} className="text-white font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <div className="text-sm text-gray-400 mt-1">
                            {method.type === 'virtual_account' && 'Virtual Account'}
                            {method.type === 'ewallet' && 'E-Wallet'}
                            {method.type === 'qr_code' && 'QR Code'}
                            {method.type === 'bank_transfer' && 'Transfer Bank'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            + {formatCurrency(method.fee_customer.flat + (selectedPackage.price * method.fee_customer.percent / 100))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}
            </div>

            {/* Total Calculation */}
            {selectedPayment && selectedPackage && (
              <motion.div
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-400/20 shadow-lg shadow-green-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-medium text-white mb-4">Ringkasan Pembayaran</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400">Harga Paket:</span>
                    <span className="text-white">{formatCurrency(selectedPackage.price)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400">Biaya Admin:</span>
                    <span className="text-yellow-300">
                      {formatCurrency(calculateTotal(selectedPackage.price, selectedPayment) - selectedPackage.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 pt-4 border-t border-white/10">
                    <span className="text-lg font-medium text-white">Total Pembayaran:</span>
                    <span className="text-2xl font-bold text-green-300">
                      {formatCurrency(calculateTotal(selectedPackage.price, selectedPayment))}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notice */}
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-400/20">
              <p className="text-sm text-blue-200 text-center">
                Dengan menekan tombol "Lanjutkan Pembayaran", Anda akan diarahkan ke halaman pembayaran.
                <br />
                <span className="font-semibold text-white">Admin akan mengirimkan detail akun melalui email setelah pembayaran dikonfirmasi.</span>
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="h-12 border-white/20 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm text-lg font-medium"
            >
              ✕ Batal
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading || !selectedPayment || loadingMethods}
              className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 text-lg font-medium"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </span>
              ) : (
                '🚀 Lanjutkan Pembayaran'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}