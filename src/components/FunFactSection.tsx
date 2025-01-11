// FunFactSection.tsx

import React from 'react'
import { isMobile } from './Main'

const FunFactSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-bold">Fun Fact</h1>
      </div>

      <div className="mb-8">
        <h4 className="text-3xl font-bold text-emerald-300">
          Featured on Wikipedia
        </h4>
        <p className="mt-2 text-xl">
          Eric's track{' '}
          <a
            href="https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            "Small Talk (Build IV)"
          </a>{' '}
          is showcased on the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drum_and_bass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Drum and Bass
          </a>{' '}
          Wikipedia main page, representing the sole Drum and Bass example
          featured.
        </p>
      </div>
    </section>
  )
}

export default FunFactSection
