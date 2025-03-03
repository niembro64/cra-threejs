// Resume.tsx

import React from 'react'
import { educations, EricResumeDescription } from '../data/myData'
import { isThin } from './Main'

// NEW IMPORTS
import EducationSection from './EducationSection'
import FunFactSection from './FunFactSection'
import ProjectsSection from './ProjectsSection'
import SocialMediaSection from './SocialMediaSection'
import WorkExperienceSection from './WorkExperienceSection'
import SkillsSection from './SkillsSection'
import WorkEnvironment from './WorkEnvironment'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  return (
    <div className="w-full py-4 md:px-12">
      {isThin && (
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
            className={`px-4 py-12 ${isThin ? 'bg-black/70' : ''} text-center`}
          >
            <div className="m-8 flex flex-row items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="transition-transform duration-500 hover:scale-105"
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

            <div className="mb-4 flex flex-row items-center justify-center">
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

      <ProjectsSection />

      {isThin && (
        <>
          <div className="h-40" />
          <div className="h-40" />
        </>
      )}

      {!isThin && (
        <section
          className={`px-4 py-12 ${
            isThin ? 'bg-slate-900/50' : ''
          } text-center`}
        >
          <div className="h-40" />
          <div className="my-8 flex flex-row items-center justify-center overflow-hidden">
            <div className={`w-1/2 overflow-hidden rounded-2xl`}>
              <img
                className="transition-transform duration-500 hover:scale-105"
                src="/eric.jpg"
                alt="Picture of Eric"
              />
            </div>
          </div>
          <p className="bold text-2xl">{EricResumeDescription}</p>
          <div className="h-40" />
        </section>
      )}

      <WorkExperienceSection />

      <div className="h-40" />

      <EducationSection />

      <div className="h-40" />

      <SkillsSection />

      <div className="h-40" />

      <WorkEnvironment />

      <div className="h-40" />

      <FunFactSection />

      <div className="h-40" />

      <SocialMediaSection />
    </div>
  )
}
