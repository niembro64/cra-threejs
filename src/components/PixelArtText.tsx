// PixelArtText.tsx
import React from 'react'

interface PixelArtTextProps {
  text: string
  pixelColor?: string
}

// A 5x7 pixel representation for each capital letter A-Z (plus '.' for demo).
const LETTERS: { [key: string]: string[] } = {
  A: ['  #  ', ' # # ', '#   #', '#####', '#   #', '#   #', '#   #'],
  B: ['#### ', '#   #', '#   #', '#### ', '#   #', '#   #', '#### '],
  C: [' ####', '#    ', '#    ', '#    ', '#    ', '#    ', ' ####'],
  D: ['#### ', '#   #', '#   #', '#   #', '#   #', '#   #', '#### '],
  E: ['#####', '#    ', '#    ', '#####', '#    ', '#    ', '#####'],
  F: ['#####', '#    ', '#    ', '#####', '#    ', '#    ', '#    '],
  G: [' ####', '#    ', '#    ', '#  ##', '#   #', '#   #', ' ####'],
  H: ['#   #', '#   #', '#   #', '#####', '#   #', '#   #', '#   #'],
  I: [' ### ', '  #  ', '  #  ', '  #  ', '  #  ', '  #  ', ' ### '],
  J: ['  ###', '   # ', '   # ', '   # ', '#  # ', '#  # ', ' ##  '],
  K: ['#   #', '#  # ', '# #  ', '##   ', '# #  ', '#  # ', '#   #'],
  L: ['#    ', '#    ', '#    ', '#    ', '#    ', '#    ', '#####'],
  M: ['#   #', '## ##', '# # #', '#   #', '#   #', '#   #', '#   #'],
  N: ['#   #', '##  #', '# # #', '#  ##', '#   #', '#   #', '#   #'],
  O: [' ### ', '#   #', '#   #', '#   #', '#   #', '#   #', ' ### '],
  P: ['#### ', '#   #', '#   #', '#### ', '#    ', '#    ', '#    '],
  Q: [' ### ', '#   #', '#   #', '#   #', '# # #', '#  # ', ' ## #'],
  R: ['#### ', '#   #', '#   #', '#### ', '# #  ', '#  # ', '#   #'],
  S: [' ####', '#    ', '#    ', ' ### ', '    #', '    #', '#### '],
  T: ['#####', '  #  ', '  #  ', '  #  ', '  #  ', '  #  ', '  #  '],
  U: ['#   #', '#   #', '#   #', '#   #', '#   #', '#   #', ' ### '],
  V: ['#   #', '#   #', '#   #', '#   #', '#   #', ' # # ', '  #  '],
  W: ['#   #', '#   #', '#   #', '# # #', '# # #', '## ##', '#   #'],
  X: ['#   #', '#   #', ' # # ', '  #  ', ' # # ', '#   #', '#   #'],
  Y: ['#   #', '#   #', ' # # ', '  #  ', '  #  ', '  #  ', '  #  '],
  Z: ['#####', '    #', '   # ', '  #  ', ' #   ', '#    ', '#####'],
  '.': ['     ', '     ', '     ', '     ', '     ', '     ', '  ## '],
}

const PixelArtText: React.FC<PixelArtTextProps> = ({
  text,
  pixelColor = '#000',
}) => {
  // Validate that every character in the text is a capital letter A-Z.
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (!LETTERS[char]) {
      throw new Error(
        `Unsupported character: "${char}". Only capital letters A-Z are allowed.`,
      )
    }
  }

  const letterHeight = 7
  const letterWidth = 5
  const spacing = 1 // one column of spacing between letters

  // Build the combined pixel grid rows.
  const combinedRows: string[] = Array(letterHeight).fill('')
  for (let i = 0; i < text.length; i++) {
    const letter = text[i]
    const letterPattern = LETTERS[letter]
    for (let row = 0; row < letterHeight; row++) {
      combinedRows[row] += letterPattern[row]
      // Add spacing between letters (except after the last one)
      if (i !== text.length - 1) {
        combinedRows[row] += ' '.repeat(spacing)
      }
    }
  }

  // Convert the combined rows into a 2D boolean grid.
  const grid: boolean[][] = combinedRows.map((row) =>
    row.split('').map((pixel) => (pixel === '#' ? true : false)),
  )

  const numRows = grid.length
  const numCols = grid[0].length
  // Calculate aspect ratio (for "contain" scaling)
  const aspectRatio = (numRows / numCols) * 100

  // Helper to generate a random hex color.
  const getRandomColor = (): string => {
    return (
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
    )
  }

  return (
    <div className="pixel-art-wrapper">
      <div
        className="pixel-art-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
        }}
      >
        {grid.flatMap((row, rowIndex) =>
          row.map((isPixel, colIndex) => {
            if (!isPixel) {
              return <div key={`${rowIndex}-${colIndex}`} />
            }
            // Instead of sequential delays, use random delays.
            const randomDelay = (Math.random() * 1).toFixed(2) + 's'
            // Random starting offset (in pixels) for coming in from different directions.
            const randomX = (Math.random() * 100 - 50).toFixed(0) + 'px'
            const randomY = (Math.random() * 100 - 50).toFixed(0) + 'px'
            const randomTransform = `translate(${randomX}, ${randomY})`
            // Generate a random color to transition through.
            const randomColor = getRandomColor()

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="pixel"
                style={
                  {
                    opacity: 0,
                    animation: `fadeIn 0.6s forwards`,
                    animationDelay: randomDelay,
                    // CSS variables used in the keyframes.
                    '--startTransform': randomTransform,
                    '--randomColor': randomColor,
                    '--finalColor': pixelColor,
                  } as React.CSSProperties
                }
              />
            )
          }),
        )}
      </div>
      <style>{`
        .pixel-art-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: ${aspectRatio}%;
        }
        .pixel-art-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        @keyframes fadeIn {
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
