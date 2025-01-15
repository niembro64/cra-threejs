// WorkExperienceSection.tsx

import React from 'react'
import { isMobile } from './Main'
import { Job } from '../data/resumeData'

interface WorkExperienceSectionProps {
  jobs: Job[]
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  jobs,
}) => {
  return (
    <section className={`px-4 py-12 ${isMobile ? 'bg-black/70' : ''}`}>
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-bold">WORK EXPERIENCE</h1>
      </div>
      {jobs.map((job, idx) => (
        <div key={job.title + idx} className="mb-8">
          <h4 className="text-3xl font-bold text-blue-300">{job.company}</h4>
          <p className="text-2xl italic text-fuchsia-300">{job.title}</p>
          <p className="text-xl text-emerald-300">
            {job.location} • {job.dates}
          </p>
          <ul className="ml-6 mt-2 list-disc text-xl">
            {job.bullets.map((b, i) => (
              <li key={b + i} className="mb-2">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default WorkExperienceSection
