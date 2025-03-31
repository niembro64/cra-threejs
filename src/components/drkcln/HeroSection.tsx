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

      const targetText = 'Redefining digital fashion for the virtual realm.'
      const element = textRef.current
      element.textContent = ''

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
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-green-900/20 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          ref={brandNameRef}
          className="glitch-text relative mb-6 text-7xl font-bold tracking-tight md:text-9xl"
        >
          <span className="font-mono tracking-tighter text-green-400">
            &lt;drkcln/&gt;
          </span>
        </div>

        <h2
          ref={textRef}
          className="mb-8 h-8 text-xl font-light text-green-300 md:text-2xl"
        ></h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
          <button className="group relative overflow-hidden border border-green-500 bg-transparent px-8 py-3 text-green-400 transition-colors duration-300 hover:text-black">
            <span className="relative z-10">EXPLORE COLLECTION</span>
            <div className="absolute inset-0 -translate-x-full transform bg-green-400 transition-transform duration-300 group-hover:translate-x-0"></div>
          </button>

          <button className="group relative mt-4 overflow-hidden border border-green-500 bg-transparent px-8 py-3 text-green-400 transition-colors duration-300 hover:text-black md:mt-0">
            <span className="relative z-10">SHOP NOW</span>
            <div className="absolute inset-0 -translate-x-full transform bg-green-400 transition-transform duration-300 group-hover:translate-x-0"></div>
          </button>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-green-400">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-green-400"></div>
        </div>
      </div>
    </section>
  )
}
