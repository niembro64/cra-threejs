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
          <h2 className="mb-4 text-4xl font-bold">{category.title}</h2>
          {category.skills.map((skill, i) => (
            <div key={i} className="mb-4 ml-4">
              <h3 className="text-2xl font-semibold text-blue-300">
                {skill.title}
              </h3>
              <ul className="ml-6 list-disc text-xl">
                {skill.details.map((detail, j) => (
                  <li key={j} className="mb-1">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default SkillsSection
