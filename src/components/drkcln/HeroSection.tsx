import React, { useEffect, useRef } from 'react'

export const HeroSection: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const brandNameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Glitch effect for brand name
    const glitchEffect = () => {
      if (!brandNameRef.current) return
      
      const element = brandNameRef.current
      
      // Add glitch class
      element.classList.add('glitch-effect')
      
      // Remove glitch class after a short time
      setTimeout(() => {
        element.classList.remove('glitch-effect')
      }, 200)
    }
    
    // Apply glitch effect at random intervals
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        glitchEffect()
      }
    }, 2000)
    
    // Typewriter effect
    const typewriterEffect = () => {
      if (!textRef.current) return
      
      const targetText = "Redefining digital fashion for the virtual realm."
      const element = textRef.current
      element.textContent = ""
      
      let i = 0
      const typeChar = () => {
        if (i < targetText.length) {
          element.textContent += targetText.charAt(i)
          i++
          setTimeout(typeChar, 60 + Math.random() * 40)
        }
      }
      
      typeChar()
    }
    
    typewriterEffect()
    
    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/20 to-black/90 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div 
          ref={brandNameRef}
          className="mb-6 text-7xl md:text-9xl font-bold tracking-tight relative glitch-text"
        >
          <span className="text-green-400 font-mono tracking-tighter">&lt;drkcln/&gt;</span>
        </div>
        
        <h2 
          ref={textRef}
          className="text-xl md:text-2xl text-green-300 mb-8 h-8 font-light"
        ></h2>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="group relative px-8 py-3 bg-transparent border border-green-500 text-green-400 hover:text-black transition-colors duration-300 overflow-hidden">
            <span className="relative z-10">EXPLORE COLLECTION</span>
            <div className="absolute inset-0 bg-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          
          <button className="group relative px-8 py-3 bg-transparent border border-green-500 text-green-400 hover:text-black transition-colors duration-300 overflow-hidden mt-4 md:mt-0">
            <span className="relative z-10">SHOP NOW</span>
            <div className="absolute inset-0 bg-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  )
}