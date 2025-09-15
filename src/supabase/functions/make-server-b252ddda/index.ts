import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"

const app = new Hono()

// Configure CORS
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}))

// Add logger
app.use('*', logger(console.log))

// In-memory storage for demo purposes (will reset on function restart)
let stats = {
  totalUsers: 127,
  totalServers: 5,
  totalPurchases: 89
}

const packages = [
  {
    id: 'basic',
    name: 'Panel Basic',
    price: 15000,
    specs: {
      cpu: '50%',
      ram: '1GB',
      storage: '5GB'
    },
    duration: '30 hari'
  },
  {
    id: 'premium',
    name: 'Panel Premium',
    price: 25000,
    specs: {
      cpu: '100%',
      ram: '2GB',
      storage: '10GB'
    },
    duration: '30 hari'
  },
  {
    id: 'enterprise',
    name: 'Panel Enterprise',
    price: 45000,
    specs: {
      cpu: '200%',
      ram: '4GB',
      storage: '20GB'
    },
    duration: '30 hari'
  }
]

const orders = new Map()
const emailOrders = new Map()

// Routes
app.get('/', (c) => {
  return c.json({ 
    message: 'Cecilefy API Server', 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    endpoints: ['/stats', '/packages', '/purchase', '/order/:id', '/init']
  })
})

app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Get statistics
app.get('/stats', (c) => {
  return c.json(stats)
})

// Get panel packages
app.get('/packages', (c) => {
  return c.json({ packages })
})

// Submit purchase order
app.post('/purchase', async (c) => {
  try {
    const body = await c.req.json()
    const { panelType, username, email, packageId } = body

    console.log('Received purchase request:', { panelType, username, email, packageId })

    // Validate required fields
    if (!panelType || !username || !email || !packageId) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Check if email already exists
    if (emailOrders.has(email)) {
      return c.json({ error: 'Email sudah pernah digunakan untuk pembelian' }, 400)
    }

    // Generate order ID
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create order data
    const orderData = {
      id: orderId,
      panelType,
      username,
      email,
      packageId,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Save order
    orders.set(orderId, orderData)
    emailOrders.set(email, orderData)

    // Update statistics
    stats.totalPurchases += 1
    stats.totalUsers += 1

    console.log('Order created successfully:', orderId)

    return c.json({
      success: true,
      orderId,
      message: 'Pesanan berhasil dibuat! Silakan hubungi CS untuk pembayaran.'
    })

  } catch (error) {
    console.error('Error creating purchase order:', error)
    return c.json({ error: 'Failed to create purchase order' }, 500)
  }
})

// Get order status
app.get('/order/:orderId', (c) => {
  try {
    const orderId = c.req.param('orderId')
    const order = orders.get(orderId)

    if (!order) {
      return c.json({ error: 'Order not found' }, 404)
    }

    return c.json({ order })
  } catch (error) {
    console.error('Error fetching order:', error)
    return c.json({ error: 'Failed to fetch order' }, 500)
  }
})

// Initialize default data
app.post('/init', (c) => {
  return c.json({ 
    success: true, 
    message: 'API initialized successfully', 
    stats,
    packagesCount: packages.length,
    ordersCount: orders.size
  })
})

// Test endpoint
app.get('/test', (c) => {
  return c.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    stats,
    ordersCount: orders.size
  })
})

Deno.serve(app.fetch)