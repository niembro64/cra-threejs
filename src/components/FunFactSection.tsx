// FunFactSection.tsx

import React from 'react'
import { isThin } from './Main'
import ReactGA from 'react-ga4'
import { showEmojis } from '../data/myData'

const FunFactSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">✨</h1>}
        <h1 className="pixel-font text-6xl font-bold">TRIVIA</h1>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* Wikipedia */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          Wikipedia-Famous
        </h4>
        <p className="mt-2 text-xl">
          Niemo's track{' '}
          <a
            href="https://en.wikipedia.org/wiki/File:Ars_Niemo_-_Small_Talk_Build_IV.ogg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
            onClick={() => {
              ReactGA.event({
                category: 'Wikipedia',
                action: 'Click',
                label: 'Small Talk (Build IV)',
              })
            }}
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
            onClick={() => {
              ReactGA.event({
                category: 'Wikipedia',
                action: 'Click',
                label: 'Drum and Bass',
              })
            }}
          >
            Drum and Bass
          </a>{' '}
          and{' '}
          <a
            href="https://en.wikipedia.org/wiki/Liquid_funk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
            onClick={() => {
              ReactGA.event({
                category: 'Wikipedia',
                action: 'Click',
                label: 'Liquid Funk',
              })
            }}
          >
            Liquid Funk
          </a>{' '}
          Wikipedia pages - originally uploaded by editor "Ftiercel" on April
          15, 2012, this track remains the only audio sample from this extensive
          genre available on the site.
        </p>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* Ultimate Frisbee League */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">
          Ultimate Frisbee
        </h4>
        <p className="mt-2 text-xl">
          Niemo plays a sport called Ultimate Frisbee, which is a competitive
          mixed-gender team sport. He was executive manager of{' '}
          <a
            href="https://www.rokultimate.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
            onClick={() => {
              ReactGA.event({
                category: 'Ultimate Frisbee',
                action: 'Click',
                label: 'ROK-U',
              })
            }}
          >
            Republic of Korea Ultimate (ROK-U)
          </a>{' '}
          , the national ultimate frisbee league of South Korea, from 2015 -
          2016. He is currently a coordinator for{' '}
          <a
            href="https://www.wudi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-300 underline"
            onClick={() => {
              ReactGA.event({
                category: 'Ultimate Frisbee',
                action: 'Click',
                label: 'WUDI',
              })
            }}
          >
            Westchester Ultimate Disc Inc (WUDI)
          </a>
          {', '}
          an ultimate frisbee league in Westchester, NY.
        </p>
      </div>
      {/* /////////////////////////////////////////////// */}
      {/* MUSIC */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">Musician</h4>
        <p className="mt-2 text-xl">
          Niemo is a versatile musician—concert violinist, piano composer,
          flamenco guitarist, and electronic music DJ. He has performed with
          numerous orchestras, bands, and quartets and has composed music for
          television and video games. His DJing experience spans weddings,
          parties, and clubs across the USA and Korea.
        </p>
      </div>
      {/* /////////////////////////////////////////////// */}
      {/* BITCOIN */}
      {/* /////////////////////////////////////////////// */}
      <div className="mb-8">
        <h4 className="text-3xl font-bold text-fuchsia-300">Crypto</h4>
        <p className="mt-2 text-xl">
          Niemo began mining Bitcoin with professional-grade ASIC miners in
          2017, when it was valued at just $1,000. Through this experience, he
          gained a deep understanding of blockchain and cryptocurrency, which he
          now leverages to advise friends and coworkers.
        </p>
      </div>
    </section>
  )
}

export default FunFactSection
