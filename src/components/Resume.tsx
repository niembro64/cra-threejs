// Resume.tsx

import React from 'react'
import { EricResumeDescription, showSmashedGif } from '../data/myData'
import { isThin } from './Main'
import PixelArtText from './PixelArtText'

import EducationSection from './EducationSection'
import ProjectsSection from './ProjectsSection'
import TriviaSection from './SectionTrivia'
import SkillsSection from './SkillsSection'
import SocialMediaSection from './SocialMediaSection'
import WorkEnvironment from './WorkEnvironment'
import WorkExperienceSection from './WorkExperienceSection'

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
          <PixelArtText pixelColor="#fff" text="NIEMO.IO" />
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
              {showSmashedGif ? (
                <img
                  className="pixel-art w-4/5"
                  src="/smashed_small.gif"
                  alt="gif"
                />
              ) : (
                <div className="mb-20" />
              )}
            </div>
            <p className="mb-4 p-8 text-2xl text-blue-100">
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
          <div className="mb-8 flex flex-col items-center justify-center">
            <p className="bold w-1/2 text-2xl">{EricResumeDescription}</p>
          </div>
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

      <TriviaSection />

      <div className="h-40" />

      <SocialMediaSection />
    </div>
  )
}
