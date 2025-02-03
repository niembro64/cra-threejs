// FunFactSection.tsx

import React from 'react'
import { isMobile } from './Main'
import { showEmojis } from '../data/projects'

const FunFactSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">✨</h1>}
        <h1 className="pixel-font text-6xl font-bold">FUN FACTS</h1>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* Wikipedia */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          Wikipedia-Famous!
        </h4>
        {/* <p className="mt-2 text-xl">
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
          electronic music genre. An editor named "Ftiercel" added the track to
          the page on April 15th, 2012, and it remains there to this day. It is
          by far his most famous track, other artists have also remixed and
          covered it.
        </p> */}
        {/* <p className="mt-2 text-xl">
          Niemo's track{' '}
          <a
            href="https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            "Small Talk (Build IV)"
          </a>{' '}
          holds a unique place in electronic music history. It is featured on
          the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drum_and_bass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Drum and Bass
          </a>
          {' and '}
          <a
            href="https://en.wikipedia.org/wiki/Liquid_funk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Liquid Funk
          </a>{' '}
          Wikipedia pages, representing this vast and influential genre.
          Originally added by editor "Ftiercel" on April 15, 2012, the track
          remains the sole example of the genre to this day.
        </p> */}
        {/* <p className="mt-2 text-xl">
          Niemo's track{' '}
          <a
            href="https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            "Small Talk (Build IV)"
          </a>{' '}
          holds a dignified place in the annals of electronic music. It is
          prominently featured on the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drum_and_bass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Drum and Bass
          </a>{' '}
          and{' '}
          <a
            href="https://en.wikipedia.org/wiki/Liquid_funk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Liquid Funk
          </a>{' '}
          Wikipedia pages; originally uploaded by editor "Ftiercel" on April 15,
          2012, this audio track remains the only example of this vast genre
          shown on the site.
        </p> */}

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
          holds a dignified place in the annals of electronic music. It's
          prominently featured on both the{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drum_and_bass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Drum and Bass
          </a>{' '}
          and{' '}
          <a
            href="https://en.wikipedia.org/wiki/Liquid_funk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Liquid Funk
          </a>{' '}
          Wikipedia pages - originally uploaded by editor "Ftiercel" on April
          15, 2012, this track remains the only audio sample from this extensive
          genre available on the site.
        </p>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* WUDI Ultimate Frisbee League */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          Connecticut Frisbee
        </h4>
        <p className="mt-2 text-xl">
          Niemo helps coordinate{' '}
          <a
            href="https://www.wudi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Westchester Ultimate Disc Inc (WUDI)
          </a>
          {', '}
          an ultimate frisbee league in Westchester, NY.
        </p>
      </div>
      {/* /////////////////////////////////////////////// */}
      {/* Republic of Korea Ultiamte Frisbee League */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">Korea Frisbee</h4>
        <p className="mt-2 text-xl">
          Niemo was executive manager of{' '}
          <a
            href="https://www.rokultimate.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
          >
            Republic of Korea Ultimate (ROK-U)
          </a>{' '}
          , the national ultimate frisbee league of South Korea, from 2015 -
          2016.
        </p>
      </div>
    </section>
  )
}

export default FunFactSection
