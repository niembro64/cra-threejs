// PixelArtText.tsx
import React, { useEffect, useRef, useState } from 'react'
import { LETTERS_NICE } from '../data/textMappers'
import { isThin } from './Main'

interface PixelArtTextProps {
  text: string
  pixelColor?: string
  scrollContainerSelector?: string // Optional selector for custom scroll container
  totalHorzPixels?: number // Maximum horizontal pixels for the element
  colorOptions?: string[] // Array of hex colors to use for random color selection
}

const LETTERS_TO_USE = LETTERS_NICE

const PixelArtText: React.FC<PixelArtTextProps> = ({
  text,
  pixelColor = '#000',
  scrollContainerSelector,
  totalHorzPixels = 100,
  colorOptions = ['#3B82F6', '#D946EF', '#06B6D4'],
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [instanceId] = useState(() => {
    const randomNumber = Math.random()

    return `pixel-art-${randomNumber.toString(36).substring(2, 9)}`
  })

  // Validate that every character in the text is a capital letter A-Z.
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (!LETTERS_TO_USE[char]) {
      throw new Error(
        `Unsupported character: "${char}". Only capital letters A-Z are allowed.`,
      )
    }
  }

  // Set up Intersection Observer to detect when element is visible
  useEffect(() => {
    if (!wrapperRef.current) return

    // Get the scroll container element if a selector is provided
    let rootElement: Element | null = null
    if (scrollContainerSelector) {
      rootElement = document.querySelector(scrollContainerSelector)
    }

    const observerOptions = {
      root: rootElement, // Use the specified container or null (viewport)
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px', // No margin
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        // Element is visible
        setIsVisible(true)
        // Reset animation by changing the key
        setAnimationKey((prevKey) => prevKey + 1)
      } else {
        // Element is not visible
        setIsVisible(false)
      }
    }

    // Create and start the observer
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    )
    observer.observe(wrapperRef.current)

    // Clean up observer on component unmount
    return () => {
      observer.disconnect()
    }
  }, [scrollContainerSelector, text]) // Re-run if the container selector changes

  const letterHeight = LETTERS_TO_USE['A'].length
  const spacing = 1 // one column of spacing between letters

  // Build the combined pixel grid rows.
  const combinedRows: string[] = Array(letterHeight).fill('')
  for (let i = 0; i < text.length; i++) {
    const letter = text[i]
    const letterPattern = LETTERS_TO_USE[letter]
    for (let row = 0; row < letterHeight; row++) {
      combinedRows[row] += letterPattern[row]
      // Add spacing between letters (except after the last one)
      if (i !== text.length - 1) {
        combinedRows[row] += ' '.repeat(spacing)
      }
    }
  }

  // Convert the combined rows into a 2D boolean grid.
  let grid: boolean[][] = combinedRows.map((row) =>
    row.split('').map((pixel) => (pixel === '#' ? true : false)),
  )

  const totalHorizPixelsToUse = isThin ? null : totalHorzPixels

  // Apply horizontal padding if totalHorzPixels is provided
  if (totalHorizPixelsToUse) {
    const currentWidth = grid[0].length

    if (totalHorizPixelsToUse > currentWidth) {
      // Calculate how much padding to add on each side
      const totalPadding = totalHorizPixelsToUse - currentWidth
      const leftPadding = Math.floor(totalPadding / 2)
      const rightPadding = totalPadding - leftPadding

      // Add padding to each row
      grid = grid.map((row) => {
        // Create left padding array (all false values)
        const leftPad = Array(leftPadding).fill(false)
        // Create right padding array (all false values)
        const rightPad = Array(rightPadding).fill(false)
        // Return padded row
        return [...leftPad, ...row, ...rightPad]
      })
    }
  }

  const numRows = grid.length
  const numCols = grid[0].length
  // Calculate aspect ratio (for "contain" scaling)
  const aspectRatio = (numRows / numCols) * 100

  // Helper to generate a random hex color or select from provided colorOptions
  const getRandomColor = (): string => {
    // If colorOptions array is provided and not empty, use it to select a random color
    if (colorOptions && colorOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * colorOptions.length)
      return colorOptions[randomIndex]
    }

    // Otherwise, generate a random color
    return (
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
    )
  }

  // Create instance-specific class names
  const wrapperClass = `pixel-art-wrapper-${instanceId}`
  const gridClass = `pixel-art-grid-${instanceId}`
  const pixelClass = `pixel-${instanceId}`
  const animateClass = `animate-${instanceId}`

  return (
    <div
      className={`${wrapperClass} overflow-hidden`}
      ref={wrapperRef}
      data-visible={isVisible}
      data-instance-id={instanceId}
    >
      <div
        className={gridClass}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
        }}
      >
        {grid.flatMap((row, rowIndex) =>
          row.map((isPixel, colIndex) => {
            // Common base style for all grid cells to ensure consistent sizing
            const baseStyle: React.CSSProperties = {
              width: '100%',
              height: '100%',
              minWidth: '1px',
              minHeight: '1px',
            }

            if (!isPixel) {
              return <div key={`${rowIndex}-${colIndex}`} style={baseStyle} />
            }

            const offsetAmount = 200

            // Instead of sequential delays, use random delays.
            const randomDelay = (Math.random() * 1).toFixed(2) + 's'
            // Random starting offset (in pixels) for coming in from different directions.
            const randomX =
              (Math.random() * offsetAmount - offsetAmount / 2).toFixed(0) +
              'px'
            const randomY =
              (Math.random() * offsetAmount - offsetAmount / 2).toFixed(0) +
              'px'
            const randomTransform = `translate(${randomX}, ${randomY})`
            // Generate a random color to transition through.
            const randomColor = getRandomColor()

            return (
              <div
                key={`${rowIndex}-${colIndex}-${animationKey}`}
                className={`${pixelClass} ${isVisible ? animateClass : ''}`}
                style={
                  {
                    ...baseStyle,
                    opacity: 0,
                    '--startTransform': randomTransform,
                    '--randomColor': randomColor,
                    '--finalColor': pixelColor,
                    '--delay': randomDelay,
                  } as React.CSSProperties
                }
              />
            )
          }),
        )}
      </div>
      <style>{`
        .${wrapperClass} {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: ${aspectRatio}%;
        }
        .${gridClass} {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .${gridClass} > div {
          aspect-ratio: 1 / 1;
        }
        .${pixelClass}.${animateClass} {
          border: 0.5px solid white;
          animation: fadeIn-${instanceId} 0.6s forwards;
          animation-delay: var(--delay);
        }
        @keyframes fadeIn-${instanceId} {
          0% {
            opacity: 0;
            transform: var(--startTransform);
            background-color: transparent;
          }
          50% {
            opacity: 1;
            transform: translate(0, 0);
            background-color: var(--randomColor);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
            background-color: var(--finalColor);
          }
        }
      `}</style>
    </div>
  )
}

export default PixelArtText
