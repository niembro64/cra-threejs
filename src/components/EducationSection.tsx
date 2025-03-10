// EducationSection.tsx

import React from 'react'
import { educations, showEmojis } from '../data/myData'
import { isThin } from './Main'

const EducationSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">🎓</h1>}
        <h1 className="pixel-font text-6xl font-bold">EDUCATION</h1>
      </div>

      {educations.map((edu, idx) => (
        <div key={idx} className="mb-8">
          <h4 className="text-3xl font-bold text-blue-300">{edu.degree}</h4>
          <div className={`flex flex-col items-start justify-start`}>
            <p className="text-xl italic text-fuchsia-300">{edu.school}</p>
            <p className="text-xl italic text-cyan-300">{edu.year}</p>
          </div>
          {edu.image && (
            <a href={edu.image} target="_blank" rel="noopener noreferrer">
              <img
                className={`${isThin ? '' : 'w-1/3'} my-4 cursor-pointer rounded-2xl transition-transform duration-500 hover:scale-105`}
                src={edu.image}
                alt={edu.degree}
              />
            </a>
          )}
          <ul className="ml-6 mt-2 list-disc text-xl">
            {edu.details.map((detail, i) => (
              <li key={i} className="mb-3">
                {detail.title}
                <ul
                  className={`ml-6 mt-1 w-[90%] list-disc text-sm ${detail.lines.length > 7 && 'grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:w-1/2'}`}
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

export default EducationSection
