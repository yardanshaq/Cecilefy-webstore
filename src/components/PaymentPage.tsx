import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Copy, Clock, CreditCard, CheckCircle, AlertCircle, Download } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { toast } from 'sonner@2.0.3'
import { siteConfig } from '../config/site'

interface PaymentData {
  reference: string
  merchant_ref: string
  payment_method: string
  payment_name: string
  customer_name: string
  customer_email: string
  amount: number
  fee_merchant: number
  pay_code?: string
  checkout_url?: string
  status: string
  expired_time: number
  qr_string?: string
  qr_url?: string
}

interface PaymentPageProps {
  paymentData: PaymentData | null
  orderId: string
  orderData: any
  onBack: () => void
}

export function PaymentPage({ paymentData, orderId, orderData, onBack }: PaymentPageProps) {
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!paymentData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Form
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Invoice Pembayaran</h1>
            <p className="text-gray-400">Silakan lakukan pembayaran sebelum waktu habis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Invoice Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header */}
            <div className="glass-card rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Detail Invoice</h2>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Invoice: #{paymentData.reference}</p>
                    <p>Tanggal: {formatDate(Date.now() / 1000)}</p>
                    <p>Jatuh Tempo: {formatDate(paymentData.expired_time)}</p>
                  </div>
                </div>
                <div className="text-center">
                  {paymentStatus === 'pending' && (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 backdrop-blur-sm px-4 py-2 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Menunggu Pembayaran
                    </Badge>
                  )}
                  {paymentStatus === 'confirmed' && (
                    <Badge className="bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-sm px-4 py-2 mb-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Pembayaran Berhasil
                    </Badge>
                  )}
                  {paymentStatus === 'expired' && (
                    <Badge className="bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-sm px-4 py-2 mb-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Pembayaran Expired
                    </Badge>
                  )}
                  {paymentStatus === 'pending' && (
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Sisa Waktu</p>
                      <p className="text-lg font-mono text-white font-bold">{timeLeft}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Dari:</h3>
                  <div className="text-white">
                    <p className="font-medium">{siteConfig.name}</p>
                    <p className="text-sm text-gray-300">{siteConfig.description}</p>
                    <p className="text-sm text-gray-300">{siteConfig.contact.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Kepada:</h3>
                  <div className="text-white">
                    <p className="font-medium">{orderData.username}</p>
                    <p className="text-sm text-gray-300">{orderData.email}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Detail Pesanan:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <div>
                      <p className="text-white font-medium">Panel {orderData.panelType} - {orderData.package?.label}</p>
                      <p className="text-sm text-gray-400">Order ID: {orderId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(orderData.package?.price || 0)}</p>
                      <p className="text-xs text-gray-400">1 bulan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-white">{formatCurrency(orderData.package?.price || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Biaya Admin:</span>
                  <span className="text-yellow-300">{formatCurrency(paymentData.fee_merchant)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-lg font-medium text-white">Total:</span>
                  <span className="text-xl font-bold text-white">{formatCurrency(paymentData.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="glass-card rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-300" />
                Metode Pembayaran
              </h3>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <p className="text-purple-300 font-medium">{paymentData.payment_name}</p>
              </div>

              {/* QR Code Display */}
              {paymentData.qr_string && (
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-400 mb-3">Scan QR Code untuk pembayaran</p>
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img 
                      src={`data:image/png;base64,${paymentData.qr_string}`} 
                      alt="QR Code Payment"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                </div>
              )}

              {/* Virtual Account */}
              {paymentData.pay_code && !paymentData.qr_string && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400">Nomor Virtual Account</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(paymentData.pay_code!, 'Nomor Virtual Account')}
                      className="h-8 px-3 text-purple-300 hover:text-white hover:bg-purple-500/20"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                    <p className="text-lg font-mono font-bold text-white text-center">
                      {paymentData.pay_code}
                    </p>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20 mb-4">
                <p className="text-sm font-medium text-blue-300 mb-2">Cara Pembayaran:</p>
                {paymentData.qr_string ? (
                  <ol className="text-xs text-blue-200 space-y-1 list-decimal list-inside">
                    <li>Buka aplikasi {paymentData.payment_name}</li>
                    <li>Pilih menu Scan QR atau bayar dengan QR</li>
                    <li>Scan QR code yang tersedia</li>
                    <li>Konfirmasi pembayaran</li>
                  </ol>
                ) : (
                  <ol className="text-xs text-blue-200 space-y-1 list-decimal list-inside">
                    <li>Buka aplikasi mobile banking atau ATM</li>
                    <li>Pilih menu Transfer/Virtual Account</li>
                    <li>Masukkan nomor virtual account</li>
                    <li>Masukkan nominal sesuai total pembayaran</li>
                    <li>Konfirmasi pembayaran</li>
                  </ol>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {paymentData.checkout_url && (
                  <Button
                    onClick={() => window.open(paymentData.checkout_url, '_blank')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg"
                  >
                    💳 Bayar Sekarang
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    const message = `Halo, saya butuh bantuan dengan pembayaran Invoice #${paymentData.reference}`
                    const telegramUrl = `${siteConfig.contact.telegram.url}?text=${encodeURIComponent(message)}`
                    window.open(telegramUrl, '_blank')
                  }}
                >
                  💬 Hubungi CS
                </Button>
              </div>
            </div>

            {/* Account Notice */}
            <div className="glass-card rounded-xl p-4 border border-green-400/20">
              <p className="text-sm text-green-200 text-center">
                <span className="block font-medium text-green-300 mb-1">📋 Konfirmasi Akun</span>
                Admin akan mengirimkan detail akun panel melalui email setelah pembayaran dikonfirmasi dalam waktu 5-10 menit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}