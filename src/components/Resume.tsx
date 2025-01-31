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
          <h3 className="pixel-font mb-2 w-full text-center text-6xl font-bold">
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
            <div className="flex flex-row items-center justify-center">
              <img
                className="w-4/5 py-8"
                src="/eric.jpg"
                alt="Picture of Eric"
              />
            </div>
            <h3 className="pixel-font mb-2 text-6xl font-bold">
              ERIC NIEMEYER
            </h3>
            <p className="pixel-font text-2xl uppercase text-blue-300">
              Stamford, Connecticut
            </p>

            <div className="flex h-40 flex-row items-center justify-center">
              <img
                className="pixel-art w-4/5"
                src="/smashed_small.gif"
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

      <ProjectsSection projects={projects} />

      {isMobile && (
        <>
          <div className="h-40" />
          <div className="h-40" />
        </>
      )}

      {!isMobile && (
        <section
          className={`px-4 py-12 ${
            isMobile ? 'bg-slate-900/50' : ''
          } text-center`}
        >
          <div className="h-40" />
          <div className="flex flex-row items-center justify-center">
            <img className="w-1/2 py-8" src="/eric.jpg" alt="Picture of Eric" />
          </div>
          <p className="bold text-2xl">{EricResumeDescription}</p>
          <div className="h-40" />
        </section>
      )}

      <WorkExperienceSection />

      <div className="h-40" />

      <EducationSection educations={educations} />

      <div className="h-40" />

      <FunFactSection />

      <div className="h-40" />

      <SocialMediaSection />
    </div>
  )
}
