import React from 'react'
import { isThin } from './Main'
import { showEmojis, workEnvironments } from '../data/myData'

const WorkEnvironment: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">🖥️</h1>}
        <h1 className="pixel-font text-6xl font-bold">WORKSPACE</h1>
        <p className="pixel-font pt-4 text-2xl text-blue-300">
          Native fluency developing with MacOS, Linux, & Windows - Remote &
          Office
        </p>
      </div>

      <div
        className={`grid ${isThin ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-10'}`}
      >
        {workEnvironments.map((desk, index) => (
          <div key={index}>
            <div className="h-100 overflow-hidden rounded-2xl">
              <img
                src={process.env.PUBLIC_URL + desk.image}
                alt={desk.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    process.env.PUBLIC_URL + '/qwhite_hardpixels_transbg.png'
                }}
              />
            </div>

            <div className="pb-6 pt-6">
              <h3 className="pixel-font mb-4 text-3xl uppercase text-teal-300">
                {desk.title}
              </h3>

              <ul className="ml-6 list-disc text-xl">
                {desk.description.map((point, i) => (
                  <li key={i} className="mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {isThin && <div className="h-8" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkEnvironment
