import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Logo({ className = "", size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main hexagon shape */}
        <polygon 
          points="50,5 85,25 85,65 50,85 15,65 15,25" 
          fill="url(#logoGradient)" 
          opacity="0.9"
          filter="url(#glow)"
        />
        
        {/* Inner design - stylized 'C' for Cecilefy */}
        <path 
          d="M35 35 Q35 25, 45 25 L60 25 Q70 25, 70 35 Q70 45, 60 45 L50 45 M60 45 Q70 45, 70 55 Q70 65, 60 65 L45 65 Q35 65, 35 55" 
          stroke="white" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
          opacity="0.95"
        />
        
        {/* Decorative dots */}
        <circle cx="25" cy="40" r="2" fill="white" opacity="0.7" />
        <circle cx="75" cy="40" r="2" fill="white" opacity="0.7" />
        <circle cx="50" cy="75" r="2" fill="white" opacity="0.7" />
      </svg>
    </div>
  )
}

export function LogoWithText({ className = "", size = 'md' }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl",
    xl: "text-3xl"
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={size} />
      <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent`}>
        Cecilefy
      </span>
    </div>
  )
}