import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"

const app = new Hono()

// Configure CORS
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}))

// Add logger
app.use('*', logger(console.log))

// Simple KV store functions using Supabase
const kv = {
  async get(key: string) {
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )
      
      const { data, error } = await supabase
        .from('kv_store_b252ddda')
        .select('value')
        .eq('key', key)
        .single()
      
      if (error || !data) return null
      return JSON.parse(data.value)
    } catch (error) {
      console.error('KV get error:', error)
      return null
    }
  },

  async set(key: string, value: any) {
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )
      
      const { error } = await supabase
        .from('kv_store_b252ddda')
        .upsert({ key, value: JSON.stringify(value) })
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('KV set error:', error)
      return false
    }
  }
}

// Routes
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Get statistics
app.get('/stats', async (c) => {
  try {
    const users = await kv.get('total_users') || 127
    const servers = await kv.get('total_servers') || 5
    const purchases = await kv.get('total_purchases') || 89

    return c.json({
      totalUsers: users,
      totalServers: servers,
      totalPurchases: purchases
    })
  } catch (error) {
    console.log('Error fetching stats:', error)
    return c.json({
      totalUsers: 127,
      totalServers: 5,
      totalPurchases: 89
    })
  }
})

// Get panel packages
app.get('/packages', async (c) => {
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
    return c.json({
      packages: [
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
    })
  }
})

// Submit purchase order
app.post('/purchase', async (c) => {
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
app.get('/order/:orderId', async (c) => {
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
app.post('/init', async (c) => {
  try {
    // Set initial statistics if they don't exist
    const users = await kv.get('total_users')
    if (users === null) {
      await kv.set('total_users', 127)
    }

    const servers = await kv.get('total_servers')
    if (servers === null) {
      await kv.set('total_servers', 5)
    }

    const purchases = await kv.get('total_purchases')
    if (purchases === null) {
      await kv.set('total_purchases', 89)
    }

    return c.json({ success: true, message: 'Database initialized' })
  } catch (error) {
    console.log('Error initializing database:', error)
    return c.json({ error: 'Failed to initialize database' }, 500)
  }
})

Deno.serve(app.fetch)