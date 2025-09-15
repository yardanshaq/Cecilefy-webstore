import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { History, Package, Clock, CheckCircle, XCircle, AlertCircle, Trash2, CreditCard, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { toast } from 'sonner@2.0.3'
import { siteConfig } from '../config/site'

interface Transaction {
  orderId: string
  username: string
  email: string
  panelType: string
  package: {
    ram: number
    price: number
    label: string
  }
  timestamp: string
  status: 'pending' | 'paid' | 'active' | 'expired' | 'cancelled'
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Load transactions from localStorage
    const loadTransactions = () => {
      try {
        const saved = localStorage.getItem('cecilefy_orders')
        if (saved) {
          const orders = JSON.parse(saved)
          setTransactions(orders.reverse()) // Show newest first
        }
      } catch (error) {
        console.error('Error loading transactions:', error)
      }
    }

    loadTransactions()
    
    // Listen for storage changes (new orders)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cecilefy_orders') {
        loadTransactions()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically for new orders in same tab
    const interval = setInterval(loadTransactions, 2000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'active':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      paid: 'bg-green-500/20 text-green-300 border-green-500/30',
      active: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      expired: 'bg-red-500/20 text-red-300 border-red-500/30',
      cancelled: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
    
    const labels = {
      pending: 'Menunggu Pembayaran',
      paid: 'Sudah Bayar',
      active: 'Aktif',
      expired: 'Kadaluwarsa',
      cancelled: 'Dibatalkan'
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants] || variants.pending} border`}>
        {labels[status as keyof typeof labels] || 'Unknown'}
      </Badge>
    )
  }

  const handleCompletePayment = (transaction: Transaction) => {
    // Redirect to payment completion page or show payment modal
    const message = `Saya ingin menyelesaikan pembayaran untuk:%0AOrder ID: ${transaction.orderId}%0AUsername: ${transaction.username}%0APackage: ${transaction.package.label}%0AHarga: Rp ${transaction.package.price.toLocaleString('id-ID')}%0A%0AMohon bantuan untuk proses pembayaran.`
    const telegramUrl = `${siteConfig.contact.telegram.url}?text=${message}`
    window.open(telegramUrl, '_blank')
  }

  const handleContactCS = (transaction: Transaction) => {
    const message = `Halo, saya ingin bertanya tentang order:%0AOrder ID: ${transaction.orderId}%0AUsername: ${transaction.username}%0AStatus: ${transaction.status}%0A%0AMohon bantuan untuk penjelasan lebih lanjut.`
    const telegramUrl = `${siteConfig.contact.telegram.url}?text=${message}`
    window.open(telegramUrl, '_blank')
  }

  const handleDeleteTransaction = (transaction: Transaction) => {
    const saved = localStorage.getItem('cecilefy_orders')
    if (saved) {
      const orders = JSON.parse(saved)
      const updatedOrders = orders.filter((order: Transaction) => order.orderId !== transaction.orderId)
      localStorage.setItem('cecilefy_orders', JSON.stringify(updatedOrders))
      setTransactions(updatedOrders.reverse()) // Show newest first
      toast.success('Transaksi berhasil dihapus')
    }
  }

  const isPendingPayment = (status: string) => {
    return status === 'pending' || status === 'cancelled'
  }

  return (
    <section id="history" className="py-20 px-4 bg-black/20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <History className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Riwayat Transaksi
            </h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Lihat semua pesanan Panel Pterodactyl yang pernah Anda buat di perangkat ini
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {transactions.length === 0 ? (
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-8 text-center">
                <Package className="w-16 h-16 text-purple-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Belum Ada Transaksi
                </h3>
                <p className="text-gray-400 mb-6">
                  Anda belum pernah melakukan pemesanan Panel Pterodactyl di perangkat ini.
                </p>
                <Button
                  onClick={() => {
                    const element = document.querySelector('#purchase')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer"
                >
                  Buat Pesanan Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.orderId}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          Order #{transaction.orderId.split('_')[1]}
                        </CardTitle>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.timestamp).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Username:</span>
                            <span className="text-white font-medium">{transaction.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{transaction.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Panel:</span>
                            <span className="text-purple-300 capitalize">{transaction.panelType} Pterodactyl</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Paket:</span>
                            <span className="text-white">{transaction.package.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">RAM:</span>
                            <span className="text-white">
                              {transaction.package.ram === -1 ? 'Unlimited' : `${transaction.package.ram}GB`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Harga:</span>
                            <span className="text-purple-400 font-semibold">
                              Rp {transaction.package.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {transaction.status === 'pending' && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                          <p className="text-yellow-300 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Pesanan menunggu pembayaran. Klik "Selesaikan Pembayaran" untuk melanjutkan.
                          </p>
                        </div>
                      )}

                      {transaction.status === 'cancelled' && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                          <p className="text-red-300 text-sm flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Pesanan dibatalkan. Anda dapat membuat pesanan baru atau menghubungi CS.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {isPendingPayment(transaction.status) ? (
                          <Button
                            onClick={() => handleCompletePayment(transaction)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white cursor-pointer flex items-center gap-2"
                            size="sm"
                          >
                            <CreditCard className="w-4 h-4" />
                            Selesaikan Pembayaran
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleContactCS(transaction)}
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 cursor-pointer"
                          >
                            💬 Hubungi CS
                          </Button>
                        )}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-500/50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Hapus
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Transaksi</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                Anda yakin ingin menghapus transaksi ini? Data tidak dapat dikembalikan setelah dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-white/20 text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTransaction(transaction)}
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}