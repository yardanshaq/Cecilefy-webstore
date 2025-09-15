import { useState, useEffect, useMemo } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { AboutPage } from './pages/AboutPage'
import { CareersPage } from './pages/CareersPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { SimpleFAQ } from './pages/SimpleFAQ'
import { CookiePage } from './pages/CookiePage'
import { DocsPage } from './pages/DocsPage'
import { APIDocsPage } from './pages/APIDocsPage'
import { GuidePage } from './pages/GuidePage'
import { StatusPage } from './pages/StatusPage'
import { ResellerPage } from './pages/ResellerPage'

interface RouterProps {
  children: React.ReactNode
}

export function Router({ children }: RouterProps) {
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    // Initialize current path
    const initializePath = () => {
      const path = window.location.pathname
      setCurrentPath(path)
    }

    // Handle path changes with simplified logic
    const handlePathChange = () => {
      const newPath = window.location.pathname
      if (newPath !== currentPath) {
        setCurrentPath(newPath)
      }
    }

    // Listen for browser navigation
    window.addEventListener('popstate', handlePathChange)
    
    // Set initial path
    initializePath()

    // Handle clicks on links with simplified logic
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href && target.href.startsWith(window.location.origin)) {
        const href = target.getAttribute('href')
        if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          // Handle anchor links on same page
          if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.getElementById(href.substring(1))
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
            return
          }
          
          // Handle combined path and anchor (e.g., "/#purchase")
          if (href.includes('#')) {
            e.preventDefault()
            const [path, anchor] = href.split('#')
            
            if (path === '/' || path === '') {
              if (window.location.pathname !== '/') {
                window.history.pushState({}, '', '/')
                handlePathChange()
              }
              setTimeout(() => {
                const element = document.getElementById(anchor)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }, 100)
            } else {
              window.history.pushState({}, '', path)
              handlePathChange()
              setTimeout(() => {
                const element = document.getElementById(anchor)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }, 100)
            }
            return
          }
          
          // Handle internal navigation
          e.preventDefault()
          window.history.pushState({}, '', href)
          handlePathChange()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePathChange)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [currentPath])

  // Memoize page components for better performance
  const currentPage = useMemo(() => {
    try {
      switch (currentPath) {
        case '/':
          return children
        case '/about':
          return <AboutPage />
        case '/careers':
          return <CareersPage />
        case '/terms':
          return <TermsPage />
        case '/privacy':
          return <PrivacyPage />
        case '/faq':
          return <SimpleFAQ />
        case '/cookies':
          return <CookiePage />
        case '/docs':
          return <DocsPage />
        case '/api-docs':
          return <APIDocsPage />
        case '/guide':
          return <GuidePage />
        case '/status':
          return <StatusPage />
        case '/reseller':
          return <ResellerPage />
        default:
          return children
      }
    } catch (error) {
      console.error('Router: Error rendering page:', error)
      // Return simplified error fallback
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl mb-4">Halaman Tidak Dapat Dimuat</h1>
            <p className="text-gray-400 mb-4">Terjadi kesalahan saat memuat halaman</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )
    }
  }, [currentPath, children])

  return <ErrorBoundary>{currentPage}</ErrorBoundary>
}