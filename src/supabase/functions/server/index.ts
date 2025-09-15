import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"
import * as kv from './kv_store.tsx'

const app = new Hono()

// Configure CORS
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}))

// Add logger
app.use('*', logger(console.log))

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

// Routes
app.get('/make-server-b252ddda/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Get statistics
app.get('/make-server-b252ddda/stats', async (c) => {
  try {
    const users = await kv.get('total_users') || 0
    const servers = await kv.get('total_servers') || 3
    const purchases = await kv.get('total_purchases') || 0

    return c.json({
      totalUsers: users,
      totalServers: servers,
      totalPurchases: purchases
    })
  } catch (error) {
    console.log('Error fetching stats:', error)
    return c.json({ error: 'Failed to fetch statistics' }, 500)
  }
})

// Get panel packages
app.get('/make-server-b252ddda/packages', async (c) => {
  try {
    const packages = await kv.get('packages') || [
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

    return c.json({ packages })
  } catch (error) {
    console.log('Error fetching packages:', error)
    return c.json({ error: 'Failed to fetch packages' }, 500)
  }
})

// Submit purchase order
app.post('/make-server-b252ddda/purchase', async (c) => {
  try {
    const body = await c.req.json()
    const { panelType, username, email, packageId } = body

    // Validate required fields
    if (!panelType || !username || !email || !packageId) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Check if email already exists
    const existingOrder = await kv.get(`order_${email}`)
    if (existingOrder) {
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
    await kv.set(`order_${orderId}`, orderData)
    await kv.set(`order_${email}`, orderData)

    // Update statistics
    const currentPurchases = await kv.get('total_purchases') || 0
    await kv.set('total_purchases', currentPurchases + 1)

    const currentUsers = await kv.get('total_users') || 0
    await kv.set('total_users', currentUsers + 1)

    return c.json({
      success: true,
      orderId,
      message: 'Pesanan berhasil dibuat! Silakan hubungi CS untuk pembayaran.'
    })

  } catch (error) {
    console.log('Error creating purchase order:', error)
    return c.json({ error: 'Failed to create purchase order' }, 500)
  }
})

// Get order status
app.get('/make-server-b252ddda/order/:orderId', async (c) => {
  try {
    const orderId = c.req.param('orderId')
    const order = await kv.get(`order_${orderId}`)

    if (!order) {
      return c.json({ error: 'Order not found' }, 404)
    }

    return c.json({ order })
  } catch (error) {
    console.log('Error fetching order:', error)
    return c.json({ error: 'Failed to fetch order' }, 500)
  }
})

// Initialize default data
app.post('/make-server-b252ddda/init', async (c) => {
  try {
    // Set initial statistics if they don't exist
    const users = await kv.get('total_users')
    if (users === null) {
      await kv.set('total_users', 0)
    }

    const servers = await kv.get('total_servers')
    if (servers === null) {
      await kv.set('total_servers', 3)
    }

    const purchases = await kv.get('total_purchases')
    if (purchases === null) {
      await kv.set('total_purchases', 0)
    }

    return c.json({ success: true, message: 'Database initialized' })
  } catch (error) {
    console.log('Error initializing database:', error)
    return c.json({ error: 'Failed to initialize database' }, 500)
  }
})

Deno.serve(app.fetch)