// SkillsSection.tsx

import React from 'react'
import { skills, showEmojis } from '../data/myData'
import { isThin } from './Main'

const SkillsSection: React.FC = () => {
  return (
    <section className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">🛠</h1>}
        <h1 className="pixel-font text-6xl font-bold">SKILLS</h1>
      </div>
      {skills.map((category, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-blue-300">
            {category.title}
          </h2>
          <p className="mb-2 text-center text-xl text-white/50">
            {category.dates}
          </p>
          <div
            className={`mt-2 grid list-disc grid-flow-row grid-cols-2 text-sm ${
              !isThin &&
              (() => {
                switch (category.skills.length) {
                  case 2:
                    return 'grid-cols-3'
                  case 3:
                    return 'grid-cols-4'
                  case 4:
                    return 'grid-cols-5'
                  case 5:
                    return 'grid-cols-5'
                  default:
                    return 'grid-cols-4'
                }
              })()
            }`}
          >
            {category.skills.map((skill, i) => (
              <div key={i} className="mb-4">
                <h3 className="mb-2 text-2xl font-semibold text-fuchsia-300">
                  {skill.title}
                </h3>
                <ul className="ml-6 list-disc text-lg">
                  {skill.details.map((detail, j) => (
                    <li key={j}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default SkillsSection
