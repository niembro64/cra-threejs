// EducationSection.tsx

import React from 'react'
import { isMobile } from './Main'
import { Education } from '../data/resumeData'

interface EducationSectionProps {
  educations: Education[]
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-bold">Education</h1>
      </div>
      {educations.map((edu, idx) => (
        <div key={idx} className="mb-8">
          <h4 className="text-3xl font-bold text-blue-300">{edu.degree}</h4>
          <p className="text-xl italic text-fuchsia-300">{edu.school}</p>
          <ul className="ml-6 mt-2 list-disc text-xl">
            {edu.details.map((detail, i) => (
              <li key={i} className="mb-2">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default EducationSection
