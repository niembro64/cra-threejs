import React, { useEffect, useRef } from 'react'

export const MatrixCodeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1)

    // Characters to display (matrix-like characters)
    const chars =
      'ドロイドハッカーサイボーグABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|/\\+=*&%$#@!?;:,.'

    let frameId: number

    // Animation function
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0' // Matrix green
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]

        // x = i * fontSize, y = value of drops[i] * fontSize
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Vary the color intensity randomly
        const alpha = Math.random() * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`

        ctx.fillText(char, x, y)

        // Randomly reset some drops to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drops down
        drops[i]++
      }

      frameId = requestAnimationFrame(draw)
    }

    // Start animation
    frameId = requestAnimationFrame(draw)

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Recalculate columns
      const newColumns = Math.floor(canvas.width / fontSize)

      // Resize drops array
      if (newColumns > drops.length) {
        // Add new columns
        drops.push(...Array(newColumns - drops.length).fill(1))
      } else {
        // Remove excess columns
        drops.length = newColumns
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.3 }}
    />
  )
}
