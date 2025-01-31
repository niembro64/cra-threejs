// FunFactSection.tsx

import React from 'react'
import { isMobile } from './Main'

const FunFactSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-6xl font-bold">✨</h1>
        <h1 className="pixel-font text-6xl font-bold">FUN FACTS</h1>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* Wikipedia */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          Wikipedia-Famous!
        </h4>
        <p className="mt-2 text-xl">
          Niemo's track{' '}
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
          Wikipedia page; it is the sole example featured for this large
          electronic music genre.
        </p>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* WUDI Ultimate Frisbee League */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          WUDI Sports League
        </h4>
        <p className="mt-2 text-xl">
          Niemo manages the{' '}
          <a
            href="https://www.wudi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            WUDI Ultimate Frisbee League
          </a>{' '}
          in Stamford, Connecticut.
        </p>
      </div>
      {/* /////////////////////////////////////////////// */}
      {/* Republic of Korea Ultiamte Frisbee League */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          ROK-U Sports League
        </h4>
        <p className="mt-2 text-xl">
          Niemo was executive manager of{' '}
          <a
            href="https://www.rokultimate.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            WUDI Ultimate Frisbee League
          </a>{' '}
          in South Korea from 2015 - 2016.
        </p>
      </div>
    </section>
  )
}

export default FunFactSection
