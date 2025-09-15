import { useState, useEffect, useMemo } from 'react'
import { Router } from './components/Router'
import { Navigation } from './components/Navigation'
import { PurchaseForm } from './components/PurchaseForm'
import { FAQ } from './components/FAQ'
import { Features } from './components/Features'
import { Statistics } from './components/Statistics'
import { TransactionHistory } from './components/TransactionHistory'
import { Footer } from './components/Footer'
import { FloatingContact } from './components/FloatingContact'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Toaster } from './components/ui/sonner'

// Optimized HomePage component with error boundaries
function HomePage() {
  const components = useMemo(() => [
    { Component: PurchaseForm, key: 'purchase' },
    { Component: FAQ, key: 'faq' },
    { Component: Features, key: 'features' },
    { Component: Statistics, key: 'statistics' },
    { Component: TransactionHistory, key: 'history' }
  ], [])

  return (
    <>
      {components.map(({ Component, key }) => (
        <ErrorBoundary key={key}>
          <Component />
        </ErrorBoundary>
      ))}
    </>
  )
}

// Minimal loading fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Minimal initialization
    const initialize = () => {
      setIsReady(true)
    }

    // Very short timeout to prevent blocking
    const timer = setTimeout(initialize, 50)

    return () => clearTimeout(timer)
  }, [])

  // Force ready state after 1 second maximum
  useEffect(() => {
    const forceReady = setTimeout(() => {
      if (!isReady) {
        console.log('Force initializing app')
        setIsReady(true)
      }
    }, 1000)

    return () => clearTimeout(forceReady)
  }, [isReady])

  if (!isReady) {
    return <LoadingFallback />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
        {/* Minimal background pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <Navigation />
        <FloatingContact />
        
        <main>
          <Router>
            <HomePage />
          </Router>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}