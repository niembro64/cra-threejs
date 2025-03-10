// WorkExperienceSection.tsx

import React from 'react'
import { jobs, showEmojis } from '../data/myData'
import { isThin } from './Main'

const WorkExperienceSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">👔</h1>}
        <h1 className="pixel-font text-6xl font-bold">WORK</h1>
      </div>
      {jobs.map((job, idx) => (
        <div
          key={job.title + idx}
          className="mb-16 flex flex-col items-center justify-center"
        >
          <h4 className="mb-2 text-center text-3xl font-bold text-blue-300">
            {job.company}
          </h4>
          <p className="mb-2 text-center text-2xl italic text-fuchsia-300">
            {job.title}
          </p>
          <p className="mb-2 text-center text-xl text-teal-300">
            {job.location}
          </p>
          <p className="mb-2 text-center text-xl text-white/50">{job.dates}</p>
          <ul className="ml-6 mt-2 list-disc text-xl">
            {job.details.map((detail, i) => (
              <li key={i} className="mb-3">
                {detail.title}
                <ul
                  className={`text-md ml-6 mt-1 w-[90%] list-disc ${detail.lines.length > 10 && 'grid grid-flow-row grid-cols-2'}`}
                >
                  {detail.lines.map((l, j) => (
                    <li key={j}>{l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default WorkExperienceSection
