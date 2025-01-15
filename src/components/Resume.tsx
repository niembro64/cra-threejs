// Resume.tsx

import React from 'react'
import { EricResumeDescription, projects } from '../data/projects'
import { educations, jobs } from '../data/resumeData'
import { isMobile } from './Main'

// NEW IMPORTS
import ProjectsSection from './ProjectsSection'
import WorkExperienceSection from './WorkExperienceSection'
import EducationSection from './EducationSection'
import FunFactSection from './FunFactSection'
import SocialMediaSection from './SocialMediaSection'

export const Resume: React.FC = () => {
  return (
    <div className="w-full py-4 md:px-12">
      {isMobile && (
        <>
          <div className="h-40" />
          <div className="h-40" />
          <div className="h-40" />
          <h3 className="mb-2 w-full text-center text-6xl font-bold">
            niemo.io
          </h3>
          <div className="h-40" />
          <div className="h-40" />
          <div className="h-40" />
          <section
            className={`px-4 py-12 ${
              isMobile ? 'bg-black/70' : ''
            } text-center`}
          >
            <h3 className="mb-2 text-6xl font-bold">ERIC NIEMEYER</h3>
            <p className="text-2xl uppercase text-blue-300">
              Stamford, Connecticut
            </p>

            <div className="flex h-40 flex-row items-center justify-center">
              <img
                className="pixel-art w-4/5"
                src="/videos2/smashed_small.gif"
                alt="gif"
              />
            </div>
            <p className="mb-4 text-2xl text-blue-100">
              {EricResumeDescription}
            </p>
          </section>
          <div className="h-40" />
          <div className="h-40" />
        </>
      )}

      {/* PROJECTS SECTION */}
      <ProjectsSection projects={projects} />

      {isMobile && (
        <>
          <div className="h-40" />
          <div className="h-40" />
        </>
      )}

      {/* Only displayed if NOT mobile */}
      {!isMobile && (
        <section
          className={`px-4 py-12 ${
            isMobile ? 'bg-slate-900/50' : ''
          } text-center`}
        >
          <div className="h-40" />
          <p className="bold text-3xl">{EricResumeDescription}</p>
          <div className="h-40" />
        </section>
      )}

      {/* WORK EXPERIENCE SECTION */}
      <WorkExperienceSection jobs={jobs} />

      <div className="h-40" />

      {/* EDUCATION SECTION */}
      <EducationSection educations={educations} />

      <div className="h-40" />

      {/* FUN FACT SECTION */}
      <FunFactSection />

      <div className="h-40" />

      {/* SOCIAL MEDIA SECTION */}
      <SocialMediaSection />
    </div>
  )
}
