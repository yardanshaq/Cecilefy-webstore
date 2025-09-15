import { motion } from 'motion/react'
import { siteConfig } from '../config/site'
import { LogoWithText } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Layanan",
      links: [
        { name: "Panel Pterodactyl", href: "/#purchase" },
        { name: "Layanan Hosting", href: siteConfig.contact.telegram.url },
        { name: "Support 24/7", href: siteConfig.contact.telegram.url },
        { name: "Reseller Program", href: "/reseller" },
        { name: "Custom Panel", href: siteConfig.contact.telegram.url }
      ]
    },
    {
      title: "Perusahaan",
      links: [
        { name: "Tentang Kami", href: "/about" },
        { name: "Karir", href: "/careers" }
      ]
    },
    {
      title: "Bantuan",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Dokumentasi", href: "/docs" },
        { name: "Panduan Setup", href: "/guide" },
        { name: "API Documentation", href: "/api-docs" },
        { name: "Status Server", href: "/status" }
      ]
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-black/60 to-black/80 border-t border-purple-500/20 backdrop-blur-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {/* Brand Section */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <LogoWithText size="md" />
              </div>
              
              <p className="text-gray-400 mb-4 leading-relaxed max-w-md">
                Platform terpercaya untuk Panel Pterodactyl hosting dengan teknologi terdepan dan dukungan 24/7 untuk kesuksesan server gaming Anda.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4 mb-6">
                <motion.a 
                  href={siteConfig.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all duration-300 border border-white/10 hover:border-purple-500/30 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href={siteConfig.social.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href={siteConfig.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 transition-all duration-300 border border-white/10 hover:border-pink-500/30 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1 border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-1 border border-white/10">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="xl:col-span-1">
              <motion.h3 
                className="font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {section.title}
              </motion.h3>
              <motion.ul 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                viewport={{ once: true }}
              >
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.href} 
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer group flex items-center"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 5 }}
                    >
                      <span className="group-hover:text-purple-400 transition-colors">
                        {link.name}
                      </span>
                      {link.href.startsWith('http') && (
                        <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          className="border-t border-purple-500/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Cecilefy. All rights reserved.
            </p>
            <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <p className="text-gray-500 text-xs">
              Powered by Indonesian Technology
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer">
              Syarat & Ketentuan
            </a>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer">
              Kebijakan Privasi
            </a>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}