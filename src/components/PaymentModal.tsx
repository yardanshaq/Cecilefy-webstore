import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Copy, Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Badge } from './ui/badge'
import { toast } from 'sonner@2.0.3'
import { siteConfig } from '../config/site'
import { ScrollArea } from './ui/scroll-area'

interface PaymentData {
  reference: string
  merchant_ref: string
  payment_method: string
  payment_name: string
  customer_name: string
  customer_email: string
  amount: number
  fee_merchant: number
  pay_code: string
  checkout_url?: string
  status: string
  expired_time: number
  qr_string?: string
  qr_url?: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  paymentData: PaymentData | null
  orderId: string
  orderData: any
}

export function PaymentModal({ isOpen, onClose, paymentData, orderId, orderData }: PaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'expired'>('pending')

  // Countdown timer
  useEffect(() => {
    if (!paymentData) return

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const expiredTime = paymentData.expired_time
      const diff = expiredTime - now

      if (diff <= 0) {
        setTimeLeft('Expired')
        setPaymentStatus('expired')
        clearInterval(interval)
      } else {
        const hours = Math.floor(diff / 3600)
        const minutes = Math.floor((diff % 3600) / 60)
        const seconds = diff % 60
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [paymentData])

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} berhasil disalin!`)
    } catch (error) {
      toast.error('Gagal menyalin ke clipboard')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (!paymentData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto bg-black/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl shadow-white/10 max-h-[90vh] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-b border-white/10 p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl text-white font-medium">
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <CreditCard className="w-6 h-6 text-purple-300" />
              </div>
              Detail Pembayaran
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              Silakan lakukan pembayaran sesuai detail di bawah ini. Admin akan mengkonfirmasi akun Anda setelah pembayaran berhasil.
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[60vh] px-6">
          <div className="space-y-6 py-6">
            {/* Status */}
            <div className="text-center">
              {paymentStatus === 'pending' && (
                <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 backdrop-blur-sm px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Menunggu Pembayaran
                </Badge>
              )}
              {paymentStatus === 'confirmed' && (
                <Badge className="bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-sm px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Pembayaran Berhasil
                </Badge>
              )}
              {paymentStatus === 'expired' && (
                <Badge className="bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-sm px-4 py-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Pembayaran Expired
                </Badge>
              )}
            </div>

            {/* Timer */}
            {paymentStatus === 'pending' && (
              <motion.div 
                className="text-center bg-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 shadow-lg shadow-purple-500/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-purple-300 mb-2">Waktu Pembayaran</p>
                <p className="text-3xl font-mono text-white font-bold">{timeLeft}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Method & Amount */}
              <div className="space-y-6">
                {/* Payment Method */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-lg shadow-white/5">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Metode Pembayaran</p>
                      <p className="text-lg font-medium text-purple-300">{paymentData.payment_name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total Pembayaran</p>
                      <p className="text-3xl font-bold text-white">{formatCurrency(paymentData.amount)}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Termasuk biaya admin: {formatCurrency(paymentData.fee_merchant)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-lg shadow-white/5">
                  <p className="text-lg font-medium text-purple-300 mb-4">Detail Pesanan</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Order ID:</span>
                      <span className="text-white font-mono text-xs">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Username:</span>
                      <span className="text-white">{orderData.username}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Panel:</span>
                      <span className="text-white capitalize">{orderData.panelType}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Paket:</span>
                      <span className="text-white">{orderData.package?.label}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions / QR Code */}
              <div className="space-y-6">
                {/* QR Code for QR-based payments */}
                {paymentData.qr_string && (
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20 shadow-lg shadow-purple-500/10 text-center">
                    <p className="text-lg font-medium text-purple-300 mb-4">Scan QR Code</p>
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      <img 
                        src={`data:image/png;base64,${paymentData.qr_string}`} 
                        alt="QR Code Payment"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                    <p className="text-sm text-purple-200">
                      Scan QR code di atas menggunakan aplikasi {paymentData.payment_name}
                    </p>
                  </div>
                )}

                {/* Virtual Account for VA payments */}
                {paymentData.pay_code && !paymentData.qr_string && (
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-5 border border-purple-400/20 shadow-lg shadow-purple-500/10">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-purple-300 font-medium">Nomor Virtual Account</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(paymentData.pay_code, 'Nomor Virtual Account')}
                        className="h-8 px-3 text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-400/30"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-2xl font-mono font-bold text-white bg-black/30 rounded-lg p-3 text-center border border-white/10">
                      {paymentData.pay_code}
                    </p>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-5 border border-blue-400/20 shadow-lg shadow-blue-500/10">
                  <p className="text-lg font-medium text-blue-300 mb-3">Cara Pembayaran:</p>
                  {paymentData.qr_string ? (
                    <ol className="text-sm text-blue-200 space-y-2 list-decimal list-inside">
                      <li>Buka aplikasi {paymentData.payment_name}</li>
                      <li>Pilih menu Scan QR atau bayar dengan QR</li>
                      <li>Scan QR code yang tersedia</li>
                      <li>Masukkan nominal sesuai total pembayaran</li>
                      <li>Konfirmasi pembayaran</li>
                    </ol>
                  ) : (
                    <ol className="text-sm text-blue-200 space-y-2 list-decimal list-inside">
                      <li>Buka aplikasi mobile banking atau ATM</li>
                      <li>Pilih menu Transfer/Virtual Account</li>
                      <li>Masukkan nomor virtual account di atas</li>
                      <li>Masukkan nominal sesuai total pembayaran</li>
                      <li>Konfirmasi pembayaran</li>
                    </ol>
                  )}
                </div>
              </div>
            </div>

            {/* Account Confirmation Notice */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-5 border border-green-400/20 shadow-lg shadow-green-500/10">
              <p className="text-lg font-medium text-green-300 mb-2 flex items-center gap-2">
                <span>📋</span> Konfirmasi Akun
              </p>
              <p className="text-sm text-green-200 leading-relaxed">
                Setelah pembayaran dikonfirmasi, admin akan mengirimkan detail akun panel Pterodactyl 
                Anda melalui email dalam waktu <span className="font-bold text-white">5-10 menit</span>.
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentData.checkout_url && (
              <Button
                onClick={() => window.open(paymentData.checkout_url, '_blank')}
                className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 text-lg font-medium"
              >
                🌐 Bayar di Browser
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 border-white/20 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm text-lg font-medium"
            >
              ✕ Tutup
            </Button>
          </div>

          {/* Contact Support */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-3">
              Butuh bantuan? Hubungi customer service
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const message = `Halo, saya butuh bantuan dengan pembayaran Order ID: ${orderId}`
                const whatsappUrl = `${siteConfig.contact.whatsapp.url}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="h-10 text-green-400 hover:text-green-300 hover:bg-green-500/10 border border-green-400/30 px-6"
            >
              💬 WhatsApp CS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}